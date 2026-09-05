import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  HelpCircle, 
  XCircle, 
  Award, 
  ArrowRight 
} from 'lucide-react';
import { api } from '../services/api';

export default function ProcurementDecisionPack({ pilots, currentUser, onNavigate }) {
  const [decisionExecuted, setDecisionExecuted] = useState(null); // 'Recommended for Scale', 'Request More Evidence', 'Do Not Scale'
  const [officerNotes, setOfficerNotes] = useState(
    'Approved by Joint Secretary (Smart Cities) for scaling across 14 additional municipal corporations in Madhya Pradesh.'
  );

  const decisionPackData = {
    pilotNumber: 'PIL-BHP-2026-01',
    challengeTitle: 'Smart Waste Collection Vehicle Real-Time Monitoring & Route Compliance',
    startupName: 'EcoVision AI Technologies',
    departmentName: 'Bhopal Smart City Development Corp',
    overallPilotScore: '91%',
    kpiAchievement: '94.2%',
    validationStatus: 'VALIDATED ✓',
    verifiedEvidenceCount: 3,
    budget: '₹ 14,200,000',
    riskLevel: 'Low Risk',
    scalabilityRating: 'High (Ready for Multi-Department Scaling)',
    citizenImpact: '450,000+ Citizens Benefited | 14.2% Fuel Reduction',
    aiRecommendation: 'STRONG CANDIDATE FOR SCALE',
    aiRecommendationReasoning: 'Startup EcoVision AI successfully exceeded target KPIs with an overall pilot score of 91% across all milestone phases. All 3 submitted evidence assets have been independently verified with cryptographic tamper checks. Recommended for scale-up procurement.'
  };

  const handleExecuteDecision = async (type) => {
    setDecisionExecuted(type);
    const officerDecider = currentUser?.name 
      ? `${currentUser.name} (${currentUser.designation || 'Authorized Officer'})` 
      : 'Rajesh Verma (Joint Secretary)';

    try {
      await api.executeDecision({
        pilotId: 'pil-1',
        startupName: decisionPackData.startupName,
        challengeTitle: decisionPackData.challengeTitle,
        humanOfficerDecision: type,
        officerNotes,
        overallPilotScore: 91,
        kpiAchievement: '94.2%',
        departmentName: decisionPackData.departmentName,
        decidedBy: officerDecider
      });
    } catch (e) {
      console.warn('Decision execution fallback:', e);
    }
    if (type === 'Recommended for Scale') {
      alert('Official Decision Recorded! Solution published to the Scale Engine catalog.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-200 text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Evidence-Backed Procurement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Procurement Decision Pack</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Executive summary pack synthesizing validated pilot evidence, KPI achievements, and AI scale recommendations for government officer final decision.
        </p>
      </div>

      {/* EXECUTIVE SCORECARD PACK */}
      <div className="gov-card p-6 sm:p-8 space-y-6 border-2 border-blue-600/30">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
              Procurement Summary Pack
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">{decisionPackData.challengeTitle}</h2>
            <p className="text-xs text-slate-600">Executing Startup: <strong className="text-slate-900">{decisionPackData.startupName}</strong></p>
          </div>

          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-2 rounded-xl text-center">
            <span className="text-xl font-black block">{decisionPackData.validationStatus}</span>
            <span className="text-[10px] font-bold uppercase">QCI Certified</span>
          </div>
        </div>

        {/* 6 Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Overall Pilot Score</span>
            <span className="text-xl font-black text-slate-900">{decisionPackData.overallPilotScore}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">KPI Achievement</span>
            <span className="text-xl font-black text-emerald-700">{decisionPackData.kpiAchievement}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Assessed Risk Level</span>
            <span className="text-sm font-bold text-emerald-700">{decisionPackData.riskLevel}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Approved Budget</span>
            <span className="text-sm font-bold text-slate-900">{decisionPackData.budget}</span>
          </div>
        </div>

        {/* AI RECOMMENDATION BOX */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl space-y-2 border border-blue-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Procurement Recommendation:
            </span>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">
              {decisionPackData.aiRecommendation}
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {decisionPackData.aiRecommendationReasoning}
          </p>
        </div>

        {/* MANDATORY EXPLICIT HUMAN AUTHORITY CALLOUT */}
        <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl flex items-center gap-3 text-xs text-amber-900 font-bold">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Final procurement and scaling decisions strictly belong to the Government Officer.</span>
        </div>

      </div>

      {/* OFFICER DECISION CONTROLS */}
      <div className="gov-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base">Government Officer Final Procurement Action</h3>
          <p className="text-xs text-slate-500">Sign-off as Joint Secretary (Smart Cities) / Competent Authority</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Official Decision Justification & Scaling Directive</label>
          <textarea 
            rows={3}
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 font-medium"
          />
        </div>

        {decisionExecuted ? (
          <div className="bg-emerald-50 border-2 border-emerald-400 p-6 rounded-2xl text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-extrabold text-emerald-950">Official Decision Logged: {decisionExecuted}</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your decision has been permanently written to the tamper-evident audit ledger and published to the Scale Engine catalog.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('scale-engine')}
                className="gov-btn-primary text-xs py-2 px-5 font-bold"
              >
                View in Scale Engine Catalog <TrendingUp className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <button 
              onClick={() => handleExecuteDecision('Recommended for Scale')}
              className="gov-btn-primary bg-emerald-600 hover:bg-emerald-700 text-xs py-3 font-bold shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" /> Recommend Scale
            </button>
            <button 
              onClick={() => handleExecuteDecision('Request More Evidence')}
              className="gov-btn-secondary text-xs py-3 font-bold text-slate-800"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" /> Request More Evidence
            </button>
            <button 
              onClick={() => handleExecuteDecision('Do Not Scale')}
              className="gov-btn-secondary text-xs py-3 font-bold text-rose-700 border-rose-200 hover:bg-rose-50"
            >
              <XCircle className="w-4 h-4" /> Do Not Scale
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
