import React, { useState } from 'react';
import { Home, Users, Play, Settings } from 'lucide-react';
import { Icon } from '@iconify/react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <Users size={20} />, label: 'Groups' },
    { icon: <Play size={20} />, label: 'Join Session' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`flex flex-col h-screen bg-zinc-700 text-white border-r border-zinc-600
          transition-all duration-300 ease-in-out overflow-hidden
          ${collapsed ? 'w-16' : 'w-64'}
        `}
        style={{ transitionProperty: 'width' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700 relative">
          {/* Left side: Logo */}
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-500 text-white p-1 rounded-md flex-shrink-0">
                <Icon
                  icon="material-symbols:code-rounded"
                  width="26"
                  height="26"
                />
              </div>
              <span className="text-lg font-semibold transition-all duration-300">
                CodeCollab
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              {/* Toggle replaces logo when collapsed */}
              <button
                onClick={toggleSidebar}
                className="text-white p-1 hover:bg-zinc-600 rounded-md transition-colors"
              >
                <Icon
                  icon="tabler:layout-sidebar-right-collapse"
                  width="26"
                  height="26"
                />
              </button>
            </div>
          )}

          {/* Right side: Toggle */}
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="text-white p-1 hover:bg-zinc-600 rounded-md transition-colors"
            >
              <Icon
                icon="tabler:layout-sidebar-left-collapse"
                width="26"
                height="26"
              />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-2 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-zinc-600 ${
                index === 0 ? 'bg-indigo-500 text-white' : 'text-zinc-300'
              } transition-colors duration-200`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span
                className={`ml-3 transition-all duration-300 ease-in-out ${
                  collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                } overflow-hidden whitespace-nowrap`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 mt-auto flex items-center space-x-3">
          <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
            JD
          </div>
          <div
            className={`flex flex-col text-sm transition-all duration-300 ${
              collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            } overflow-hidden`}
          >
            <span className="font-medium">John Doe</span>
            <span className="text-emerald-400">● Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
