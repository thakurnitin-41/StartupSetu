import React from 'react';

export default function Logo({ size = 'md', variant = 'dark' }) {
  const isDark = variant === 'dark';
  
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center">
        <svg className={size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Ring / Gov shield */}
          <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logo-grad)" />
          
          {/* Bridge Arch */}
          <path d="M10 27 C 10 18, 30 18, 30 27" stroke="white" strokeWidth="3" strokeLinecap="round" />
          
          {/* Vertical Pillars */}
          <line x1="15" y1="27" x2="15" y2="21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="25" y1="27" x2="25" y2="21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Innovation Nodes */}
          <circle cx="20" cy="12" r="3" fill="#F59E0B" />
          <circle cx="10" cy="27" r="2.5" fill="#60A5FA" />
          <circle cx="30" cy="27" r="2.5" fill="#34D399" />

          {/* Network Connections */}
          <line x1="10" y1="27" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.8" />
          <line x1="30" y1="27" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.8" />

          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B2545" />
              <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'} ${isDark ? 'text-slate-900' : 'text-white'}`}>
            Startup<span className="text-blue-600">Setu</span>
          </span>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
            GovTech
          </span>
        </div>
        {size !== 'sm' && (
          <span className={`text-[10px] font-medium tracking-wide uppercase ${isDark ? 'text-slate-500' : 'text-blue-200'}`}>
            Innovation Procurement Bridge
          </span>
        )}
      </div>
    </div>
  );
}
