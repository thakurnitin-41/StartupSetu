import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  Building2, 
  Search, 
  SlidersHorizontal, 
  Send, 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  Scale, 
  History, 
  Settings, 
  CreditCard, 
  User, 
  CheckSquare, 
  Scale as ScaleIcon, 
  FileCheck, 
  Users, 
  FolderTree, 
  TrendingUp, 
  ShieldAlert,
  Compass
} from 'lucide-react';

export default function Sidebar({ activeRole, activeTab, onSelectTab }) {
  // Navigation menus per role as specified in prompt section 24
  const menus = {
    'Government Officer': [
      { id: 'gov-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'marketplace', label: 'Challenges', icon: FileText },
      { id: 'ai-builder', label: 'AI Challenge Builder', icon: Sparkles, badge: 'AI' },
      { id: 'startups', label: 'Startups', icon: Building2 },
      { id: 'matching', label: 'AI Startup Matching', icon: SlidersHorizontal, badge: 'AI' },
      { id: 'proposals', label: 'Proposals', icon: Send },
      { id: 'pilots', label: 'Pilots', icon: Activity },
      { id: 'kpi-analytics', label: 'KPI Analytics', icon: BarChart3 },
      { id: 'evidence-passport', label: 'Evidence Passport', icon: ShieldCheck },
      { id: 'procurement-decisions', label: 'Procurement Decisions', icon: Scale },
      { id: 'scale-engine', label: 'Scale Engine', icon: TrendingUp },
      { id: 'audit-trail', label: 'Audit Trail', icon: History },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],

    'Startup': [
      { id: 'startup-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'marketplace', label: 'Discover Challenges', icon: Compass },
      { id: 'proposals', label: 'My Applications', icon: Send },
      { id: 'pilots', label: 'My Pilots', icon: Activity },
      { id: 'evidence-passport', label: 'Evidence', icon: ShieldCheck },
      { id: 'payments', label: 'Payments', icon: CreditCard },
      { id: 'startup-profile', label: 'Profile', icon: User },
    ],

    'Evaluator': [
      { id: 'evaluator-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'proposals', label: 'Assigned Proposals', icon: FileText },
      { id: 'evaluator-scoring', label: 'Evaluation', icon: CheckSquare },
      { id: 'evaluator-compare', label: 'Comparison', icon: SlidersHorizontal },
      { id: 'audit-trail', label: 'Reports & Logs', icon: History },
    ],

    'Validator': [
      { id: 'validator-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'pilots', label: 'Assigned Pilots', icon: Activity },
      { id: 'evidence-passport', label: 'Evidence Review', icon: ShieldCheck },
      { id: 'validator-signoff', label: 'Validation Sign-off', icon: FileCheck },
      { id: 'audit-trail', label: 'Audit Log Reports', icon: History },
    ],

    'Admin': [
      { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'admin-users', label: 'Users', icon: Users },
      { id: 'admin-departments', label: 'Departments', icon: FolderTree },
      { id: 'startups', label: 'Startups', icon: Building2 },
      { id: 'marketplace', label: 'Challenges', icon: FileText },
      { id: 'pilots', label: 'Pilots', icon: Activity },
      { id: 'kpi-analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'scale-engine', label: 'Scale Engine', icon: TrendingUp },
      { id: 'audit-trail', label: 'Audit Logs', icon: History },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  };

  const currentMenu = menus[activeRole] || menus['Government Officer'];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0 shadow-lg select-none">
      <div className="space-y-6">
        
        {/* Role Badge Indicator */}
        <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/60">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Current Workspace
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{activeRole}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-900/80 text-blue-300 border border-blue-700/50'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center justify-between font-semibold text-slate-400">
          <span>StartupSetu GovTech</span>
          <span className="text-emerald-400">v2.4.0</span>
        </div>
        <p className="text-[10px]">Tamper-Evident Audit Active</p>
      </div>
    </aside>
  );
}
