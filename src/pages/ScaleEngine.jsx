import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ScaleEngine({ scaleItems, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const items = scaleItems || [
    {
      id: 'scale-1',
      startupName: 'HealthPulse Diagnostics',
      solutionTitle: 'PulseBox Rural AI Tele-Diagnostic Kit',
      sector: 'Healthcare',
      pilotScore: '94%',
      kpiAchievement: '96%',
      validationStatus: 'Validated ✓',
      riskLevel: 'Low Risk',
      scaleRecommendation: 'Recommended ✓',
      originalDepartment: 'Karnataka Health & Family Welfare',
      adoptableBy: 'All State Health Departments & National Rural Health Mission',
      estimatedDeployTime: '30 Days',
      provenMetrics: '50,000+ Rural Screenings | 93.6% Accuracy | ABDM Sync'
    },
    {
      id: 'scale-2',
      startupName: 'EcoVision AI',
      solutionTitle: 'TrashCam Edge & RouteOptima Sanitation Fleet Telematics',
      sector: 'Smart City',
      pilotScore: '91%',
      kpiAchievement: '94.2%',
      validationStatus: 'Validated ✓',
      riskLevel: 'Low Risk',
      scaleRecommendation: 'Recommended ✓',
      originalDepartment: 'Bhopal Smart City Development Corp',
      adoptableBy: 'All Urban Local Bodies (ULBs) & Smart City SPVs',
      estimatedDeployTime: '45 Days',
      provenMetrics: '250 Vehicles Tracked | 94.2% Route Compliance | 14.2% Fuel Cut'
    }
  ];

  const filteredItems = items.filter(item => 
    item.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.solutionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-teal-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 text-teal-200 text-xs font-semibold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-emerald-300" />
          <span>National Innovation Scaling Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">StartupSetu Scale Engine</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Proven, validated startup solutions ready for instant replication across government departments and municipal bodies nationwide.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="gov-card p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search validated scale-ready solutions by technology, sector, or startup..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium text-slate-900"
          />
        </div>
      </div>

      {/* SCALE CATALOG TABLE */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Startup & Solution</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Pilot Score</th>
                <th className="p-4">KPI Achievement</th>
                <th className="p-4">Validation</th>
                <th className="p-4">Assessed Risk</th>
                <th className="p-4">Scale Directive</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="text-sm font-extrabold text-slate-900">{item.solutionTitle}</div>
                    <div className="text-xs text-blue-700 font-semibold">{item.startupName}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{item.provenMetrics}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded text-[10px] border border-blue-100">
                      {item.sector}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900 text-sm">{item.pilotScore}</td>
                  <td className="p-4 font-extrabold text-emerald-700 text-sm">{item.kpiAchievement}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      {item.validationStatus}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-700">{item.riskLevel}</td>
                  <td className="p-4 font-extrabold text-teal-700">{item.scaleRecommendation}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => alert(`Initiating replication of ${item.solutionTitle} for your department!`)}
                      className="gov-btn-primary bg-teal-700 hover:bg-teal-800 text-xs py-1.5 px-3 font-bold"
                    >
                      Replicate Solution <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
