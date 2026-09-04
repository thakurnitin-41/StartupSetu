import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export default function KPIDashboard({ pilots, kpis, onNavigate }) {
  const pilot = pilots && pilots.length > 0 ? pilots[0] : {
    id: 'pil-1',
    pilotNumber: 'PIL-BHP-2026-01',
    startupName: 'EcoVision AI',
    challengeTitle: 'Smart Waste Collection Vehicle Real-Time Monitoring',
    overallScore: 91
  };

  const kpiList = kpis || [
    { metric: 'Route Completion Rate', target: 90, actual: 94.2, unit: '%', status: 'Exceeded' },
    { metric: 'Vehicle Tracking Telemetry Uptime', target: 95, actual: 97.8, unit: '%', status: 'Exceeded' },
    { metric: 'Missed Waste Collection Frequency', target: 10, actual: 5.8, unit: '%', status: 'Achieved' },
    { metric: 'Fuel Expense Reduction', target: 12, actual: 14.2, unit: '%', status: 'Exceeded' }
  ];

  const trendData = [
    { week: 'Week 1', Target: 90, Actual: 82.0 },
    { week: 'Week 2', Target: 90, Actual: 86.5 },
    { week: 'Week 3', Target: 90, Actual: 89.1 },
    { week: 'Week 4', Target: 90, Actual: 91.8 },
    { week: 'Week 5', Target: 90, Actual: 93.4 },
    { week: 'Week 6', Target: 90, Actual: 94.2 }
  ];

  const barComparisonData = kpiList.map(k => ({
    name: k.metric.split(' ')[0] + ' ' + (k.metric.split(' ')[1] || ''),
    Target: k.target,
    Actual: k.actual
  }));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-200 text-xs font-semibold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>Real-Time Telemetry Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Controlled Pilot KPI Performance Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Independent quantitative metric tracking contrasting target contract benchmarks against verified actual telemetry.
        </p>
      </div>

      {/* OVERALL SCORE GAUGE SUMMARY CARD */}
      <div className="gov-card p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">Target vs Actual Performance Metric</span>
          <h2 className="text-xl font-extrabold">{pilot.challengeTitle}</h2>
          <p className="text-xs text-slate-300">Executing Startup: <strong className="text-amber-300">{pilot.startupName}</strong> • {pilot.pilotNumber}</p>
        </div>

        <div className="flex items-center gap-6 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
          <div className="text-center">
            <span className="text-4xl font-black text-emerald-400">94.2%</span>
            <span className="block text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">KPI Achievement</span>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div className="text-center">
            <span className="text-3xl font-bold text-amber-400">{pilot.overallScore}%</span>
            <span className="block text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">Overall Health</span>
          </div>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiList.map((kpi, idx) => (
          <div key={idx} className="gov-card p-5 space-y-3 hover:border-blue-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 line-clamp-1">{kpi.metric}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {kpi.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-2xl font-black text-slate-900">{kpi.actual}{kpi.unit}</span>
                <span className="text-[10px] text-slate-400 block font-semibold">Actual Telemetry</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-blue-700">{kpi.target}{kpi.unit}</span>
                <span className="text-[10px] text-slate-400 block font-semibold">Target Benchmark</span>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (kpi.actual / kpi.target) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* RECHARTS VISUALIZATION SECTION */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Weekly Telemetry Trend Line Chart */}
        <div className="lg:col-span-7 gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Route Completion Telemetry Trend (6 Weeks)
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live AWS IoT Stream
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fontWeight: 600 }} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Target" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="Actual" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Target vs Actual Bar Comparison */}
        <div className="lg:col-span-5 gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              Target vs Actual Contrast
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Quantitative Audit</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Target" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ACTION FOOTER */}
      <div className="gov-card p-4 flex items-center justify-between bg-slate-50">
        <span className="text-xs text-slate-600 font-medium">
          Telemetry data verified against raw AWS IoT Core logs.
        </span>
        <button 
          onClick={() => onNavigate('evidence-passport')}
          className="gov-btn-primary text-xs py-2 px-4 font-bold shadow-md"
        >
          View Evidence Passport & Verification Logs <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
