import React from 'react';
import { 
  FileText, 
  Users, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  PlusCircle, 
  SlidersHorizontal, 
  Scale, 
  Eye 
} from 'lucide-react';

export default function GovDashboard({ challenges, pilots, currentUser, onNavigate, onSelectChallenge }) {
  const activeChallenges = challenges ? challenges.filter(c => c.status === 'Open for Proposals' || c.status === 'Active Pilot').length : 3;
  const totalApps = challenges ? challenges.reduce((acc, c) => acc + (c.applicantCount || 0), 0) : 17;
  const activePilotsCount = pilots ? pilots.filter(p => p.status === 'Pilot Running').length : 1;
  const completedPilotsCount = pilots ? pilots.filter(p => p.status === 'Completed Validation' || p.status === 'Scaled / Recommended').length : 1;
  const pendingValidations = 2;
  const scaleRecommended = 2;

  const statCards = [
    { title: 'Active Challenges', count: activeChallenges, icon: FileText, color: 'bg-blue-500' },
    { title: 'Startup Applications', count: totalApps, icon: Users, color: 'bg-indigo-500' },
    { title: 'Active Pilots', count: activePilotsCount, icon: Activity, color: 'bg-amber-500' },
    { title: 'Completed Pilots', count: completedPilotsCount, icon: CheckCircle2, color: 'bg-emerald-500' },
    { title: 'Pending Validations', count: pendingValidations, icon: ShieldCheck, color: 'bg-purple-500' },
    { title: 'Recommended for Scale', count: scaleRecommended, icon: TrendingUp, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{currentUser?.organization || 'Ministry of Housing & Urban Affairs (MoHUA)'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentUser?.name ? `${currentUser.name} | Officer Command Dashboard` : 'Government Officer Command Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser?.designation ? `Authorized Officer: ${currentUser.designation} (${currentUser.email || 'Verified User'}). ` : ''}Convert municipal operational problems into structured challenges, discover startups, and oversee evidence-backed pilots.
          </p>
        </div>

        {/* Quick Launchpad Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button 
            onClick={() => onNavigate('ai-builder')} 
            className="gov-btn-accent text-xs px-4 py-2.5 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            Create Challenge (AI)
          </button>
          <button 
            onClick={() => onNavigate('matching')} 
            className="gov-btn-secondary text-xs px-4 py-2.5 text-slate-800 bg-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            Explainable AI Match
          </button>
        </div>
      </div>

      {/* TOP STATISTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="gov-card p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 leading-tight">{stat.title}</span>
                <div className={`p-2 rounded-lg text-white ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mt-3">{stat.count}</div>
            </div>
          );
        })}
      </div>

      {/* ACTION LAUNCHPAD BAR */}
      <div className="gov-card p-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Action Shortcuts:</span>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => onNavigate('ai-builder')} className="gov-btn-primary text-xs py-1.5 px-3">
            <PlusCircle className="w-3.5 h-3.5" /> Create Challenge
          </button>
          <button onClick={() => onNavigate('startups')} className="gov-btn-secondary text-xs py-1.5 px-3">
            <Building2 className="w-3.5 h-3.5" /> View Startups
          </button>
          <button onClick={() => onNavigate('pilots')} className="gov-btn-secondary text-xs py-1.5 px-3">
            <Activity className="w-3.5 h-3.5" /> View Pilots
          </button>
          <button onClick={() => onNavigate('evidence-passport')} className="gov-btn-secondary text-xs py-1.5 px-3">
            <ShieldCheck className="w-3.5 h-3.5" /> View Evidence
          </button>
          <button onClick={() => onNavigate('procurement-decisions')} className="gov-btn-accent text-xs py-1.5 px-3">
            <Scale className="w-3.5 h-3.5" /> Procurement Decisions
          </button>
        </div>
      </div>

      {/* TABLES SECTION */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Recent Challenges Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Recent Municipal Challenges
            </h3>
            <button onClick={() => onNavigate('marketplace')} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Challenge Title</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Apps</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {challenges && challenges.slice(0, 4).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900 max-w-[200px] truncate">{c.title}</td>
                      <td className="p-3 text-slate-600">{c.departmentName}</td>
                      <td className="p-3 font-bold text-blue-700">{c.applicantCount || 0}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Active Pilot' ? 'bg-amber-100 text-amber-800' :
                          c.status === 'Completed Validation' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => {
                            if (onSelectChallenge) onSelectChallenge(c.id);
                            onNavigate('matching');
                          }} 
                          className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
                        >
                          Match AI
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Pilots Table */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-600" />
              Active & Validated Pilots
            </h3>
            <button onClick={() => onNavigate('pilots')} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Manage Pilots <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Startup</th>
                    <th className="p-3">KPI Achievement</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pilots && pilots.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">
                        <div>{p.startupName}</div>
                        <div className="text-[10px] text-slate-500">{p.pilotNumber}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {p.kpiAchievement}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'Completed Validation' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => onNavigate('procurement-decisions')}
                          className="text-amber-700 font-bold hover:underline"
                        >
                          Decision Pack
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
