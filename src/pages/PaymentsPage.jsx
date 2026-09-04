import React from 'react';
import { CreditCard, CheckCircle2, Clock, IndianRupee, Building2, ShieldCheck, Download } from 'lucide-react';

export default function PaymentsPage({ pilots }) {
  const pilot = pilots && pilots.length > 0 ? pilots[0] : {
    pilotNumber: 'PIL-BHP-2026-01',
    startupName: 'EcoVision AI',
    departmentName: 'Bhopal Smart City Development Corp',
    budget: '₹ 14,200,000',
    milestones: [
      { id: 'm-1', name: 'Hardware Deployment & Vehicle Retrofit (250 trucks)', status: 'Completed', paymentPercentage: 25, paymentAmount: '₹ 3,550,000', releaseDate: '2026-09-01', verifiedBy: 'Rajesh Verma' },
      { id: 'm-2', name: 'Initial Telemetry Testing & GIS Calibration', status: 'Completed', paymentPercentage: 25, paymentAmount: '₹ 3,550,000', releaseDate: '2026-09-15', verifiedBy: 'Dr. Meera Nambiar' },
      { id: 'm-3', name: '3-Month Controlled Field Testing & KPI Benchmark', status: 'In Progress', paymentPercentage: 30, paymentAmount: '₹ 4,260,000', releaseDate: 'Pending', verifiedBy: 'Pending' },
      { id: 'm-4', name: 'Independent Validation Sign-off & Final Report', status: 'Upcoming', paymentPercentage: 20, paymentAmount: '₹ 2,840,000', releaseDate: 'Pending', verifiedBy: 'Pending' }
    ]
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-emerald-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
          <CreditCard className="w-4 h-4 text-emerald-300" />
          <span>Escrow Milestone Disbursal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Startup Milestone Payments</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Track milestone payout status, verified government sign-offs, and bank transfer receipts.
        </p>
      </div>

      {/* PAYMENTS STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="gov-card p-5 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Total Pilot Value</span>
          <div className="text-2xl font-black text-slate-900">{pilot.budget}</div>
        </div>
        <div className="gov-card p-5 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Disbursed to Date</span>
          <div className="text-2xl font-black text-emerald-700">₹ 7,100,000 (50%)</div>
        </div>
        <div className="gov-card p-5 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Escrow Locked</span>
          <div className="text-2xl font-black text-amber-600">₹ 7,100,000 (50%)</div>
        </div>
      </div>

      {/* MILESTONE PAYMENTS TABLE */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            Milestone Escrow Payout Schedule
          </h3>
          <span className="text-xs font-bold text-slate-500">Pilot #: {pilot.pilotNumber}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Deliverable Milestone</th>
                <th className="p-3">Share</th>
                <th className="p-3">Payout Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Sign-off Officer</th>
                <th className="p-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pilot.milestones.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{m.name}</td>
                  <td className="p-3 font-semibold text-slate-700">{m.paymentPercentage}%</td>
                  <td className="p-3 font-extrabold text-emerald-700">{m.paymentAmount}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      m.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{m.verifiedBy}</td>
                  <td className="p-3 text-right">
                    {m.status === 'Completed' ? (
                      <button 
                        onClick={() => alert(`Downloading payment receipt for ${m.name}`)}
                        className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Pending</span>
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
