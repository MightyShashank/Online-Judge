// We typically store unverified users in the database (that is who couldnt verify themselves using the email we send) for 24 hours aka the time for which the verficationToken Exists
// once the verification token expires if the user hasnt verified himself (aka false) then delete him from DB

// for this above cleanup we use node-cron (simple and common for periodic backrgound tasks), it runs as a schedule background job/task

import nodeCron from "node-cron";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { connectDB } from './db/connectDB.js';

// connect to DB
await connectDB();

cron.schedule('0 * * * *', async () => { // every hour "Run this task once every hour, exactly when the clock hits :00."
  try {
    const result = await User.deleteMany({
      isVerified: false,
      verificationTokenExpiresAt: { $lt: new Date() }
    });
    console.log(`Cleanup done. Deleted ${result.deletedCount} unverified users.`);
  } catch (err) {
    console.error('Cleanup error:', err);
  }
});

// run it as node cleanup.js

// above we use a job queue
// A job queue is a system that manages background tasks — operations that are not required to run immediately or in the user's request-response cycle.
/*
✅ Why Use a Job Queue?
For:
Sending emails (e.g., welcome/verification)
Image/video processing
Data scraping or syncing
Scheduling tasks (e.g., daily reports)
Retrying failed jobs
Throttling load on main server
*/

// job queues are a type of message queue
// job queues are built on top of message queues
// above we will be using BullMQ job queue over a redis message queue
