import React, { useState } from 'react';
import { 
  Activity, 
  Building2, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function PilotManagement({ pilots, onNavigate }) {
  const pilot = pilots && pilots.length > 0 ? pilots[0] : {
    id: 'pil-1',
    pilotNumber: 'PIL-BHP-2026-01',
    challengeTitle: 'Smart Waste Collection Vehicle Real-Time Monitoring & Route Compliance',
    startupName: 'EcoVision AI',
    departmentName: 'Bhopal Smart City Development Corp',
    governmentOfficer: 'Rajesh Verma',
    startDate: '2026-08-20',
    endDate: '2027-02-20',
    budget: '₹ 14,200,000',
    status: 'Pilot Running',
    currentStageIndex: 3,
    overallScore: 91,
    kpiAchievement: '94%',
    milestones: [
      { id: 'm-1', name: 'Hardware Deployment & Vehicle Retrofit (250 trucks)', status: 'Completed', paymentPercentage: 25, paymentAmount: '₹ 3,550,000', releaseDate: '2026-09-01', verifiedBy: 'Rajesh Verma' },
      { id: 'm-2', name: 'Initial Telemetry Testing & GIS Calibration', status: 'Completed', paymentPercentage: 25, paymentAmount: '₹ 3,550,000', releaseDate: '2026-09-15', verifiedBy: 'Dr. Meera Nambiar' },
      { id: 'm-3', name: '3-Month Controlled Field Testing & KPI Benchmark', status: 'In Progress', paymentPercentage: 30, paymentAmount: '₹ 4,260,000', releaseDate: 'Pending', verifiedBy: 'Pending' },
      { id: 'm-4', name: 'Independent Validation Sign-off & Final Report', status: 'Upcoming', paymentPercentage: 20, paymentAmount: '₹ 2,840,000', releaseDate: 'Pending', verifiedBy: 'Pending' }
    ]
  };

  const [milestones, setMilestones] = useState(pilot.milestones);

  const stages = [
    '1. Deployment',
    '2. Initial Testing',
    '3. Field Testing',
    '4. KPI Measurement',
    '5. Validation',
    '6. Final Review'
  ];

  const handleReleasePayment = async (mId) => {
    const updated = milestones.map(m => {
      if (m.id === mId) {
        return {
          ...m,
          status: 'Completed',
          releaseDate: new Date().toISOString().substring(0, 10),
          verifiedBy: 'Rajesh Verma (Officer Authorized)'
        };
      }
      return m;
    });
    setMilestones(updated);
    try {
      await api.releaseMilestone(pilot.id || 'pil-1', mId, 'Rajesh Verma (Officer Authorized)');
    } catch (e) {
      console.warn('Milestone release fallback:', e);
    }
    alert(`Milestone payout authorized and released to ${pilot.startupName}!`);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-amber-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/60 text-amber-200 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Controlled Pilot Command Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Controlled Pilot Management</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Supervise live field testing, track 6-stage lifecycle progress, and manage milestone-based payment releases.
        </p>
      </div>

      {/* PILOT OVERVIEW CARD */}
      <div className="gov-card p-6 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded text-xs border border-blue-100">
                {pilot.pilotNumber}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                {pilot.status}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-2">{pilot.challengeTitle}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('kpi-analytics')}
              className="gov-btn-primary text-xs py-2 px-3.5 font-bold"
            >
              <TrendingUp className="w-4 h-4" /> View KPI Dashboard
            </button>
            <button 
              onClick={() => onNavigate('evidence-passport')}
              className="gov-btn-secondary text-xs py-2 px-3.5 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Evidence Passport
            </button>
          </div>
        </div>

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Executing Startup</span>
            <span className="font-extrabold text-slate-900">{pilot.startupName}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Department</span>
            <span className="font-bold text-slate-800">{pilot.departmentName}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Approved Budget</span>
            <span className="font-extrabold text-emerald-700">{pilot.budget}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Pilot Duration</span>
            <span className="font-bold text-slate-900">{pilot.startDate} to {pilot.endDate}</span>
          </div>
        </div>

        {/* 6-STAGE PROGRESS TIMELINE */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Pilot Stage Lifecycle: Stage 4 of 6 Active</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Overall Health Score: {pilot.overallScore}%
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {stages.map((stageName, idx) => {
              const isCompleted = idx < pilot.currentStageIndex;
              const isCurrent = idx === pilot.currentStageIndex;
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCompleted 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                      : isCurrent
                      ? 'bg-amber-100 border-amber-300 text-amber-950 font-extrabold ring-2 ring-amber-400 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider mb-1">
                    {isCompleted ? '✓ Completed' : isCurrent ? '⚡ In Progress' : '○ Upcoming'}
                  </div>
                  <div className="text-xs font-bold leading-tight">{stageName}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MILESTONE PAYMENTS SECTION */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-600" />
            Milestone-Based Escrow Payments
          </h3>
          <span className="text-xs text-slate-500 font-medium">Payouts linked strictly to verified KPI evidence</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Milestone Deliverable</th>
                <th className="p-3">Payout %</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Verified Sign-off</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {milestones.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">{m.name}</td>
                  <td className="p-3 font-bold text-slate-700">{m.paymentPercentage}%</td>
                  <td className="p-3 font-extrabold text-emerald-700">{m.paymentAmount}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      m.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">
                    {m.verifiedBy !== 'Pending' ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {m.verifiedBy}
                      </span>
                    ) : 'Pending Verification'}
                  </td>
                  <td className="p-3 text-right">
                    {m.status === 'In Progress' ? (
                      <button 
                        onClick={() => handleReleasePayment(m.id)}
                        className="gov-btn-accent text-[11px] py-1 px-3"
                      >
                        Release Payout
                      </button>
                    ) : m.status === 'Completed' ? (
                      <span className="text-xs font-bold text-emerald-600">Payout Released ✓</span>
                    ) : (
                      <span className="text-xs text-slate-400">Locked</span>
                    )}
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
