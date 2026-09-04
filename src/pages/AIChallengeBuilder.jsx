import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Save, 
  Send, 
  HelpCircle, 
  Edit3, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Building2,
  Clock,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

export default function AIChallengeBuilder({ onPublishChallenge, onNavigate }) {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form state after AI generation
  const [challengeData, setChallengeData] = useState(null);

  // Preset example problem statements
  const presets = [
    {
      label: 'Waste Fleet Monitoring',
      text: 'Our municipal corporation is facing problems with garbage collection vehicle monitoring. Vehicles sometimes miss routes and officers cannot monitor them in real time.'
    },
    {
      label: 'Water Pipeline Leakage',
      text: 'Urban water distribution pipelines lose up to 38% of drinking water due to undetected underground leakages and pressure drops before water reaches end-user households.'
    },
    {
      label: 'AI Traffic Management',
      text: 'Static pre-timed traffic signals cause severe congestion and emergency ambulance delays along high-density urban corridors during peak morning and evening hours.'
    },
    {
      label: 'Rural PHC Tele-Diagnostics',
      text: 'Primary Health Centers (PHCs) in remote rural districts lack specialist doctors, leading to delayed diagnosis of heart conditions and maternal health risks.'
    }
  ];

  const handleGenerateAI = async () => {
    if (!naturalLanguageInput.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemStatement: naturalLanguageInput })
      });
      const data = await res.json();
      setChallengeData(data);
    } catch (err) {
      console.error('Error generating AI challenge:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKpiChange = (index, field, value) => {
    const newKpis = [...challengeData.suggestedKPIs];
    newKpis[index][field] = value;
    setChallengeData({ ...challengeData, suggestedKPIs: newKpis });
  };

  const handleAddKpi = () => {
    setChallengeData({
      ...challengeData,
      suggestedKPIs: [
        ...challengeData.suggestedKPIs,
        { metric: 'New Custom Metric', target: '> 90%', benchmark: 90 }
      ]
    });
  };

  const handleRemoveKpi = (index) => {
    const newKpis = challengeData.suggestedKPIs.filter((_, i) => i !== index);
    setChallengeData({ ...challengeData, suggestedKPIs: newKpis });
  };

  const handleSaveAndPublish = () => {
    if (!challengeData) return;
    onPublishChallenge({
      title: challengeData.title,
      departmentId: 'dept-2',
      departmentName: 'Bhopal Smart City Development Corp',
      location: 'Bhopal, MP',
      sector: challengeData.sector || 'Smart City',
      budget: challengeData.budget,
      budgetAmount: challengeData.budgetAmount || 15000000,
      pilotDuration: challengeData.pilotDuration,
      applicationDeadline: '2026-10-15',
      problemStatement: challengeData.problemStatement,
      targetOutcome: challengeData.targetOutcome,
      technicalRequirements: challengeData.technicalRequirements,
      expectedImpact: challengeData.expectedImpact,
      kpiTargets: challengeData.suggestedKPIs,
      eligibilityCriteria: challengeData.eligibilityCriteria,
      evaluationCriteria: challengeData.evaluationCriteria,
      status: 'Open for Proposals',
      publishedBy: 'Rajesh Verma (MoHUA)'
    });
    alert('Challenge successfully published to the Public Challenge Marketplace!');
    onNavigate('marketplace');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800/40 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Officer Co-Pilot</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">AI Challenge Builder</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Describe your operational bottleneck in natural language. Our AI assistant will convert it into a structured, audit-ready municipal challenge with KPI benchmarks.
        </p>
      </div>

      {/* STEP 1: NATURAL LANGUAGE INPUT */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-blue-600" />
            Step 1: Enter Operational Problem in Natural Language
          </label>
          <span className="text-[11px] text-slate-500 font-medium">Instant AI Structuring</span>
        </div>

        <textarea 
          rows={4}
          value={naturalLanguageInput}
          onChange={(e) => setNaturalLanguageInput(e.target.value)}
          placeholder="Describe your municipal operational problem here in plain text..."
          className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium text-slate-900"
        />

        {/* Preset Buttons */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Try Preset Problem Statements:</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setNaturalLanguageInput(preset.text)}
                className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 transition-all font-medium"
              >
                + {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button 
            onClick={handleGenerateAI}
            disabled={!naturalLanguageInput.trim() || isGenerating}
            className="gov-btn-accent text-xs px-5 py-3 shadow-md"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Structuring Challenge with AI...
              </span>
            ) : (
              <span className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4" /> Generate Challenge with AI
              </span>
            )}
          </button>
        </div>
      </div>

      {/* STEP 2: STRUCTURED AI OUTPUT & OFFICER EDITOR */}
      {challengeData && (
        <div className="gov-card p-6 space-y-6 border-2 border-blue-600/30 animate-in fade-in duration-300">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="font-extrabold text-slate-900 text-lg">AI Generated Challenge Schema</h2>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> AI Suggestions Editable — Officer Sign-off Required
            </span>
          </div>

          {/* Editable Fields Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Challenge Title</label>
              <input 
                type="text"
                value={challengeData.title}
                onChange={(e) => setChallengeData({ ...challengeData, title: e.target.value })}
                className="w-full p-2.5 text-xs font-bold bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Sector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Sector Category</label>
              <select 
                value={challengeData.sector}
                onChange={(e) => setChallengeData({ ...challengeData, sector: e.target.value })}
                className="w-full p-2.5 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="Smart City">Smart City</option>
                <option value="IoT">IoT</option>
                <option value="CleanTech">CleanTech</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>

            {/* Budget & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Estimated Budget</label>
                <input 
                  type="text"
                  value={challengeData.budget}
                  onChange={(e) => setChallengeData({ ...challengeData, budget: e.target.value })}
                  className="w-full p-2.5 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Pilot Duration</label>
                <input 
                  type="text"
                  value={challengeData.pilotDuration}
                  onChange={(e) => setChallengeData({ ...challengeData, pilotDuration: e.target.value })}
                  className="w-full p-2.5 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Target Outcome */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Target Outcome</label>
              <textarea 
                rows={2}
                value={challengeData.targetOutcome}
                onChange={(e) => setChallengeData({ ...challengeData, targetOutcome: e.target.value })}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Technical Requirements */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Technical Requirements</label>
              <textarea 
                rows={3}
                value={challengeData.technicalRequirements}
                onChange={(e) => setChallengeData({ ...challengeData, technicalRequirements: e.target.value })}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Expected Impact */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Expected Impact</label>
              <textarea 
                rows={3}
                value={challengeData.expectedImpact}
                onChange={(e) => setChallengeData({ ...challengeData, expectedImpact: e.target.value })}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

          </div>

          {/* SUGGESTED KPIS SECTION */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Suggested Quantitative KPIs (Outcome-Based)</h3>
              <button 
                onClick={handleAddKpi}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Custom KPI
              </button>
            </div>

            <div className="space-y-2">
              {challengeData.suggestedKPIs.map((kpi, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex-1">
                    <input 
                      type="text"
                      value={kpi.metric}
                      onChange={(e) => handleKpiChange(idx, 'metric', e.target.value)}
                      className="w-full p-1.5 text-xs font-semibold bg-white border border-slate-300 rounded"
                    />
                  </div>
                  <div className="w-32">
                    <input 
                      type="text"
                      value={kpi.target}
                      onChange={(e) => handleKpiChange(idx, 'target', e.target.value)}
                      className="w-full p-1.5 text-xs font-bold text-blue-700 text-center bg-white border border-slate-300 rounded"
                    />
                  </div>
                  <button 
                    onClick={() => handleRemoveKpi(idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button 
              onClick={() => alert('Draft challenge saved to your account.')}
              className="gov-btn-secondary text-xs px-4 py-2.5"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowPreviewModal(true)}
                className="gov-btn-secondary text-xs px-4 py-2.5 text-slate-800"
              >
                <Eye className="w-4 h-4 text-blue-600" /> Preview Challenge
              </button>
              <button 
                onClick={handleSaveAndPublish}
                className="gov-btn-primary text-xs px-5 py-2.5 font-bold shadow-md"
              >
                <Send className="w-4 h-4" /> Publish Challenge
              </button>
            </div>
          </div>

        </div>
      )}

      {/* PREVIEW MODAL */}
      {showPreviewModal && challengeData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                Challenge Preview
              </span>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">{challengeData.title}</h2>
              
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4 text-blue-600" /> Bhopal Smart City</span>
                <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4 text-emerald-600" /> {challengeData.budget}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-amber-600" /> {challengeData.pilotDuration}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 text-xs">
                <h4 className="font-bold text-slate-900">Problem Statement:</h4>
                <p className="text-slate-600 leading-relaxed">{challengeData.problemStatement}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Suggested Outcome KPIs:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {challengeData.suggestedKPIs.map((k, i) => (
                    <div key={i} className="bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800">{k.metric}</span>
                      <span className="font-extrabold text-blue-700">{k.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button onClick={() => setShowPreviewModal(false)} className="gov-btn-primary text-xs px-5 py-2">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
