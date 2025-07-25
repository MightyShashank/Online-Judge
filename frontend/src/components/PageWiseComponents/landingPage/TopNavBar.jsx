import React from 'react';
import { Icon } from '@iconify/react';
import Login from './Login';
import SignUP from './SignUp';

export default function TopNavBar() {
    return (
        <div className="bg-zinc-800 flex justify-between w-full h-16 items-center">
            
            {/* Icon with CodeCollab */}
            <div className="flex gap-x-2 items-center">
                {/* Icon */}
                <div className="bg-indigo-500 rounded-md p-1">
                    <Icon icon="material-symbols:code-rounded" width="26" height="26"  className='text-white' />
                </div>
                <div className="text-lg font-semibold text-white">CodeCollab</div>
            </div>

            {/* Options */}
            <div className="flex gap-x-5 text-white items-center">
                <div className="text-base font-normal cursor-pointer hover:text-indigo-500">Features</div>
                <div className="text-base font-normal cursor-pointer hover:text-indigo-500">About</div>
                <div className="text-base font-normal cursor-pointer hover:text-indigo-500">Contact</div>
            </div>

            {/* Login or Signup*/}
            <div className="flex gap-x-4 text-white items-center">
                <Login/>
                <SignUP/>
            </div>

        </div>
    );
}