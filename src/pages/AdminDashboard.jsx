import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  FileText, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Settings, 
  Search,
  Check,
  X
} from 'lucide-react';

export default function AdminDashboard({ startups, users, challenges, pilots, onNavigate }) {
  const [startupList, setStartupList] = useState(
    startups || [
      { id: 'st-1', name: 'EcoVision AI', sector: 'Smart City', verified: true, dpiit: 'DPIIT-89412' },
      { id: 'st-2', name: 'SmartTech Solutions', sector: 'IoT', verified: true, dpiit: 'DPIIT-67123' },
      { id: 'st-3', name: 'UrbanSense', sector: 'CleanTech', verified: true, dpiit: 'DPIIT-99214' },
      { id: 'st-4', name: 'WasteX', sector: 'Smart City', verified: true, dpiit: 'DPIIT-41290' }
    ]
  );

  const toggleVerify = (id) => {
    setStartupList(startupList.map(s => s.id === id ? { ...s, verified: !s.verified } : s));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <Settings className="w-4 h-4 text-blue-400" />
          <span>National Platform Operations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">StartupSetu Admin Command Center</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage system users, verify DPIIT startup compliance, oversee department allocations, and audit platform security logs.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Registered Startups</span>
          <div className="text-2xl font-black text-slate-900">{startupList.length}</div>
        </div>
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active Challenges</span>
          <div className="text-2xl font-black text-blue-700">{challenges ? challenges.length : 5}</div>
        </div>
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active & Scaled Pilots</span>
          <div className="text-2xl font-black text-emerald-700">{pilots ? pilots.length : 2}</div>
        </div>
        <div className="gov-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Audit Events Sealed</span>
          <div className="text-2xl font-black text-amber-600">142</div>
        </div>
      </div>

      {/* STARTUP VERIFICATION TABLE */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            DPIIT Startup Verification Directory
          </h3>
          <span className="text-xs text-slate-500 font-medium">Toggle verification badges</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Startup Name</th>
                <th className="p-3">Sector</th>
                <th className="p-3">DPIIT Reg #</th>
                <th className="p-3">Trust Badge Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {startupList.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3 text-slate-600">{s.sector}</td>
                  <td className="p-3 font-mono text-slate-700">{s.dpiit}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      s.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {s.verified ? 'Verified Startup ✓' : 'Unverified'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => toggleVerify(s.id)}
                      className={`text-xs py-1 px-3 rounded font-bold ${
                        s.verified ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {s.verified ? 'Revoke Verification' : 'Verify Startup ✓'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
