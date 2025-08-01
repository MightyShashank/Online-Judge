import React from 'react'
import Sidebar from '@/components/ui/sidebar'
import { Icon } from '@iconify/react'
import { Button } from "@/components/ui/button"
import { useState } from 'react';

function CandidateHomePage() {

  const [currentUserOption, setCurrentUserOption] = useState("home");

  return (
    <div className="flex">
      <Sidebar/>
      {/* Main content */}
      <div className="flex flex-col flex-1">
        <div className="w-full bg-zinc-700 border-b border-zinc-600 h-16 flex justify-between items-center px-6">

          {/* Search bar */}
          <div className="flex items-center bg-zinc-600 text-zinc-300 px-3 py-2 rounded-md w-full max-w-xs h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-zinc-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1110 3a7 7 0 016.65 13.65z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search problems, groups..."
              className="bg-transparent outline-none text-sm placeholder-zinc-400 w-full"
            />
          </div>

          <div className="flex gap-x-2 items-center">
            <div className="text-xs p-2 bg-zinc-600 flex gap-x-1 items-center rounded-md">
              <Icon icon="la:user-friends" width="14" height="14" className="text-green-400" />
              <div className="text-white">3 members online</div>
            </div>
            <div className="text-xs p-2 bg-zinc-600 flex gap-x-1 items-center rounded-md">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <div className="text-white">Live Session</div>
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <div className="w-8 h-8 rounded-sm bg-zinc-600 flex items-center justify-center cursor-pointer">
              <Icon icon="streamline-flex-color:ai-chip-robot" width="20" height="20" />
            </div>
            <div className="w-8 h-8 rounded-sm bg-zinc-600 flex items-center justify-center cursor-pointer">
              <Icon icon="mynaui:sun" width="20" height="20" className="text-white" />
            </div>
            <div className="w-8 h-8 rounded-sm bg-zinc-600 flex items-center justify-center cursor-pointer">
              <Icon icon="nimbus:notification" width="16" height="16" className="text-white" />
            </div>
            <div className="w-5 h-5 p-1 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer text-white">JD</div>
          </div>

            
        </div>

        {/* Main center if given home page*/}
        <div className="flex-1 bg-zinc-800 p-4 text-white flex items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="text-lg text-white font-semibold text-center">Welcome to CodeCollab, John Doe!</div>
            <div className="text-xs text-gray-500 text-center">Start by creating a group or joining a coding session</div>
            <div className="flex gap-x-2">
              <Button className="bg-blue-500 text-white">Manage Groups</Button>
              <Button variant="outline" className="">Start Session</Button>
              <Button variant="secondary" className="">Back To Home</Button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CandidateHomePage