import React from 'react';
import { Play, CheckCircle2, ArrowRight, X, Sparkles, Building2, Rocket, CheckSquare, ShieldCheck, Scale } from 'lucide-react';

export default function DemoFlowModal({ isOpen, onClose, onExecuteStep }) {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      role: 'Government Officer',
      action: 'Login as Government Officer & Open AI Builder',
      desc: 'Enter natural language problem (e.g. "Municipal garbage collection vehicle monitoring...")',
      targetTab: 'ai-builder',
      roleToSet: 'Government Officer'
    },
    {
      step: 2,
      role: 'Government Officer',
      action: 'AI Challenge Builder Execution',
      desc: 'AI structures parameters, KPIs, duration, and budget. Officer reviews, edits, and publishes challenge.',
      targetTab: 'ai-builder',
      roleToSet: 'Government Officer'
    },
    {
      step: 3,
      role: 'Startup',
      action: 'Startup Discovers Challenge & Applies',
      desc: 'Switch to Startup role (EcoVision AI), browse Marketplace, and submit structured proposal.',
      targetTab: 'marketplace',
      roleToSet: 'Startup'
    },
    {
      step: 4,
      role: 'Government Officer',
      action: 'Explainable AI Startup Matching',
      desc: 'View AI match scores (EcoVision 94%), factor radar breakdown, and "AI Recommendation — Human Decision Required" banner.',
      targetTab: 'matching',
      roleToSet: 'Government Officer'
    },
    {
      step: 5,
      role: 'Evaluator',
      action: 'Human Technical Evaluation',
      desc: 'Switch to Evaluator role (Dr. Ramanathan), evaluate proposal criterion sliders, and submit human evaluation.',
      targetTab: 'evaluator-scoring',
      roleToSet: 'Evaluator'
    },
    {
      step: 6,
      role: 'Government Officer',
      action: 'Controlled Pilot Launch & Milestones',
      desc: 'Approve pilot, progress through 6-stage lifecycle, and trigger milestone payments.',
      targetTab: 'pilots',
      roleToSet: 'Government Officer'
    },
    {
      step: 7,
      role: 'Government Officer',
      action: 'Real-Time KPI Dashboard',
      desc: 'Inspect Recharts Target vs Actual metrics (94.2% route completion vs 90% target).',
      targetTab: 'kpi-analytics',
      roleToSet: 'Government Officer'
    },
    {
      step: 8,
      role: 'Validator',
      action: 'Independent Evidence Validation',
      desc: 'Switch to Validator role (Dr. Meera Nambiar / QCI), review raw system logs, and grant digital sign-off.',
      targetTab: 'evidence-passport',
      roleToSet: 'Validator'
    },
    {
      step: 9,
      role: 'Government Officer',
      action: 'Evidence Passport & Decision Pack',
      desc: 'Open Digital Evidence Passport, review AI Procurement Decision Pack, and click "Recommend Scale".',
      targetTab: 'procurement-decisions',
      roleToSet: 'Government Officer'
    },
    {
      step: 10,
      role: 'Government Officer',
      action: 'Scale Engine & Audit Trail',
      desc: 'View solution published in Scale Engine catalog and verify tamper-evident audit log timeline.',
      targetTab: 'scale-engine',
      roleToSet: 'Government Officer'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 border border-amber-400/40 rounded-lg text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">StartupSetu End-to-End Hackathon Demo Flow</h2>
              <p className="text-xs text-blue-200">Follow the complete innovation-to-procurement story step by step</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Flow Steps */}
        <div className="p-6 overflow-y-auto space-y-3 bg-slate-50 flex-1">
          {steps.map((s) => (
            <div 
              key={s.step} 
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 transition-all flex items-start justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{s.action}</span>
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {s.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onExecuteStep(s.roleToSet, s.targetTab);
                  onClose();
                }}
                className="gov-btn-secondary text-xs py-1.5 px-3 whitespace-nowrap shrink-0 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                Jump to Step <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Tagline: Discover innovation. Prove impact. Scale what works.
          </span>
          <button onClick={onClose} className="gov-btn-primary text-xs px-4 py-2">
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
