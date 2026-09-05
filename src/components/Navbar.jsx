import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Building2, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  Bell, 
  Search, 
  LogOut, 
  User, 
  ChevronDown,
  Sparkles,
  PlayCircle
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onRoleChange, 
  onNavigate, 
  activeTab, 
  onOpenDemoFlow,
  onLogout
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles = [
    { name: 'Government Officer', email: 'officer@mohua.gov.in', icon: Building2, color: 'bg-blue-600' },
    { name: 'Startup', email: 'ananya@ecovision.ai', icon: Rocket, color: 'bg-emerald-600' },
    { name: 'Evaluator', email: 'evaluator@iisc.ac.in', icon: CheckCircle2, color: 'bg-purple-600' },
    { name: 'Validator', email: 'validator@qci.org.in', icon: ShieldCheck, color: 'bg-amber-600' },
    { name: 'Admin', email: 'admin@startupsetu.gov.in', icon: UserCheck, color: 'bg-slate-700' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('landing')} 
            className="cursor-pointer flex items-center shrink-0"
          >
            <Logo size="md" />
          </div>

          {/* Quick Nav Links for Public */}
          {!currentUser ? (
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('landing')} className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => onNavigate('marketplace')} className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Explore Challenges</button>
              <button onClick={() => onNavigate('scale-engine')} className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Scale Engine</button>
              <button onClick={() => onNavigate('audit-trail')} className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">Audit Trail</button>
            </div>
          ) : (
            /* Search Bar for Authenticated View */
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search government challenges, startups, pilots, evidence..." 
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* Demo Story Flow Guide Button */}
            <button 
              onClick={onOpenDemoFlow}
              className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
              title="View step-by-step hackathon demo flow"
            >
              <PlayCircle className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Demo Guide</span>
            </button>

            {/* Quick Role Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline text-slate-500">Role:</span>
                <span className="font-semibold text-slate-900">{currentUser ? currentUser.role : 'Select Role'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Switch Active Demo Role
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = currentUser && currentUser.role === r.name;
                    return (
                      <button
                        key={r.name}
                        onClick={() => {
                          onRoleChange(r.name, r.email);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50/70 font-semibold text-blue-900' : 'text-slate-700'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-md text-white ${r.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{r.name}</div>
                            <div className="text-[10px] text-slate-500">{r.email}</div>
                          </div>
                        </div>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notifications */}
            {currentUser && (
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                      <span className="font-semibold text-sm text-slate-900">Notifications</span>
                      <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">3 New</span>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs p-2 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="font-semibold text-blue-900">AI Match Completed</p>
                        <p className="text-slate-600 mt-0.5">EcoVision AI scored 94% match for Garbage Telematics Challenge.</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                      </div>
                      <div className="text-xs p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                        <p className="font-semibold text-emerald-900">Evidence Validated</p>
                        <p className="text-slate-600 mt-0.5">Dr. Meera Nambiar signed off on Raichur PHC diagnostic kit logs.</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full ring-2 ring-blue-600/20 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=0D8ABC&color=fff`;
                  }}
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[130px]">{currentUser.organization}</div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  title="Log Out / Switch Account"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('login')}
                  className="gov-btn-secondary text-xs px-3.5 py-1.5"
                >
                  Log In
                </button>
                <button 
                  onClick={() => onNavigate('login')}
                  className="gov-btn-primary text-xs px-3.5 py-1.5"
                >
                  Register
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
