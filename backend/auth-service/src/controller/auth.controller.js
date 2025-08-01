// again writing as auth.controller.js is just a convention
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import crypto from 'crypto';

import { generateKey } from "crypto";
import { User } from "../models/user.model.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerficationEmail } from "../zohoEmail/emails.js";
import { sendWelcomeEmail } from "../zohoEmail/emails.js";
import { sendPasswordResetEmail, sendResetSuccessEmail } from "../zohoEmail/emails.js";

export const signup = async (req, res) => {

    // user sends some stuff
    const {email, password, name} = req.body;

    // we created this mongodb transaction so that incase user isnt verfied then the transaction rolls back 
    // only commit user.save() after the email is successfully sent. //

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }


    // now hashPassword 
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is our salt, if you use https then TLS/SSL protects your password during transmission

    const verificationToken = generateVerificationToken(); // in utils folder
    // now create a new user
    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken, // user gets this as an email and can verify their account
        verificationTokenExpiresAt: Date.now() + 24*60*60*1000, // 24 hours in milliseconds
    });

    // save the user to our database
    await user.save();

    // now just lets create an authentication for them and send them a verification token in an email
    // jwt
    generateTokenAndSetCookie(res, user._id); // mongodb stores id as _id

    // sending verification email
    await sendVerficationEmail(user.email, verificationToken);

    await session.commitTransaction(); // All good
    session.endSession();

    res.status(201).json({
        success:true,
        message: "User successfully created",
        user: {
            ...user._doc, // take every field but not password
            password:undefined // make password undefine
        }
    });
}

// to verify your email against the verification code 
export const verifyEmail = async (req, res) => {
    // assume there is an ui to put 6 digit code = 1 2 3 4 5 6 and its present in the body
    const {code} = req.body; // code passed by the user
    try {

        if(!code) {
            return res.status(400).json({message: 'Verification code is required'});
        }

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: new Date() } // token must not be expired, this finds tokens whose verificationTokenExpiresAt is greater than the current date
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        user.isVerified = true;
        user.verificationToken = undefined; // remove your verification token
        user.verificationTokenExpiresAt = undefined;

        await user.save(); // save the user in database

        await sendWelcomeEmail(user.email, user.name); // send welcome email to user

        return res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        console.error('Email verification error:', error);
        return res.status(500).json({ success: false, message: 'Something went wrong during email verification' });
    }
};

export const login = async (req, res) => {
    
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success:false, message: "We couldn't find an account with that email address."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // compare entered password with user password (in db)
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Incorrect password. Please try again."}); // always return a response its imp to use return else sometimes you may get errors
        }

        generateTokenAndSetCookie(res, user._id); // generates the jwt token and sets the cookie

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login ", error);
        return res.status(400).json({success: false, message: error.message});
    }
};

export const forgotPassword = async (req, res) => {

    const {email} = req.body;
    try {
        const user = await User.findOne({email}); // see if user with this email exists

        if(!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        // generate reset token using the crypto module
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordTokenExpiresAt = Date.now() + 1*60*60*1000; // expires 1 hours from now

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

        // save to db
        await user.save();

        // send an email
        // console.log("CLIENT_URL =", process.env.CLIENT_URL);

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`); // this is also supposed to take you to a reset password url link 

        // return the response
        return res.status(200).json({success: true, message: "Password reset link sent to your email"});

    } catch (error) {
        console.log("Error in forgotPassword ", error);
        return res.status(400).json({success: false, message: error.message});
    }
};

export const resetPassword = async (req, res) => {

    try {
        // get the token
        const {token} = req.params;

        // get password and forgotPassword
        const {password, confirmPassword} = req.body;

        // we check for password and confirmPassword equality in both FE and BE
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        // find user using the resetPasswordToken
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now()},
        });

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired reset token"});
        }

        // now the token is valid so you can safely edit the password
        const hashedPassword = await bcrypt.hash(password, 10); // hash with a pinch of salt
        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();

        // now send the reset success email
        await sendResetSuccessEmail(user.email);

        // return the response
        return res.status(200).json({success: true, message: "Password reset success sent to your email"});
    }
    catch (error) {
        console.log("Error in sending email for successful password reset ", error);
        return res.status(400).json({success: false, message: error.message});
    }


}

export const checkAuth = async (req, res) => {

    try {
        const user = await User.findById(req.userId).select("-password"); // see if the user exists in your DB, password with a - means unselect the password
        if(!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        return res.status(200).json({success: true, user});

    } catch (error) {
        console.log("Error in checkAuth: ", error);
        return res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    
    // just clear everything user has in the browser, delete the cookie stored, as of now delete the cookie
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}