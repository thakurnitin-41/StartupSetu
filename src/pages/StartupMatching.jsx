import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Users, 
  TrendingUp, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { api } from '../services/api';

export default function StartupMatching({ 
  challenges, 
  selectedChallengeId, 
  onNavigate, 
  onSelectStartupForPilot 
}) {
  const [activeChallengeId, setActiveChallengeId] = useState(selectedChallengeId || 'ch-1');
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchMatches(activeChallengeId);
  }, [activeChallengeId]);

  const fetchMatches = async (cId) => {
    setLoading(true);
    try {
      const data = await api.matchStartups(cId);
      setMatchData(data);
      if (data.matches && data.matches.length > 0) {
        setSelectedMatch(data.matches[0]);
      }
    } catch (err) {
      console.error('Error fetching AI startup matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const getChartData = (breakdown) => {
    if (!breakdown) return [];
    return [
      { factor: 'Tech Fit (30%)', score: breakdown.technicalFit, max: 30 },
      { factor: 'Innovation (20%)', score: breakdown.innovation, max: 20 },
      { factor: 'Cost Fit (15%)', score: breakdown.cost, max: 15 },
      { factor: 'Scalability (15%)', score: breakdown.scalability, max: 15 },
      { factor: 'Team (10%)', score: breakdown.teamCapability, max: 10 },
      { factor: 'Pilot Plan (10%)', score: breakdown.pilotPlan, max: 10 }
    ];
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-3 border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Explainable Match Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Explainable AI Startup Matching</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Transparent multi-factor ranking evaluating startup technical capability, budget compatibility, DPIIT verification, and pilot readiness.
        </p>
      </div>

      {/* MANDATORY HUMAN-IN-THE-LOOP WARNING BANNER */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-extrabold text-amber-900 text-sm uppercase tracking-wider">
            AI Recommendation — Human Decision Required
          </h4>
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            StartupSetu AI matching is assistive and transparent. AI models suggest candidates based on quantitative parameters, but final startup selection for pilot execution strictly belongs to the Government Officer.
          </p>
        </div>
      </div>

      {/* CHALLENGE SELECTOR BAR */}
      <div className="gov-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Select Government Challenge:</span>
          <div className="font-bold text-slate-900 text-sm">
            {matchData?.challenge?.title || 'Loading Challenge...'}
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <select 
            value={activeChallengeId}
            onChange={(e) => setActiveChallengeId(e.target.value)}
            className="w-full sm:w-72 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
          >
            {challenges && challenges.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* MAIN MATCHING CONTENT GRID */}
      {loading ? (
        <div className="gov-card p-12 text-center text-slate-500 font-medium text-xs">
          <Sparkles className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
          Calculating Multi-Factor Explainable AI Match Scores...
        </div>
      ) : matchData ? (
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Candidate List (Left) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Ranked Candidates ({matchData.matches.length})
            </h3>

            <div className="space-y-3">
              {matchData.matches.map((m, index) => {
                const isSelected = selectedMatch?.startupId === m.startupId;
                return (
                  <div
                    key={m.startupId}
                    onClick={() => setSelectedMatch(m)}
                    className={`gov-card p-4 cursor-pointer transition-all border-2 ${
                      isSelected ? 'border-blue-600 bg-blue-50/40 shadow-md' : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs text-slate-400">#{index + 1}</span>
                        <img src={m.logo} alt={m.startupName} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {m.startupName}
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div className="text-[11px] text-slate-500">{m.badge}</div>
                        </div>
                      </div>

                      {/* Percentage Badge */}
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-xl">
                          {m.matchScore}%
                        </div>
                        <span className="text-[9px] text-slate-400 font-medium uppercase">Match Score</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Score Breakdown & AI Explanation (Right) */}
          {selectedMatch && (
            <div className="lg:col-span-7 space-y-6">
              
              <div className="gov-card p-6 space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                      Selected Candidate Breakdown
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-1">{selectedMatch.startupName}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-emerald-600">{selectedMatch.matchScore}%</span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Verified Compatibility</span>
                  </div>
                </div>

                {/* Score Breakdown Chart */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Weighted Criteria Score Breakdown (100% Total):
                  </h4>
                  
                  <div className="h-48 w-full bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getChartData(selectedMatch.scoringBreakdown)} layout="vertical">
                        <XAxis type="number" domain={[0, 30]} />
                        <YAxis dataKey="factor" type="category" width={110} tick={{ fontSize: 11, fontWeight: 600 }} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#2563EB" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Clear Explanations List */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Explainable AI Match Rationales:
                  </h4>
                  <div className="space-y-2">
                    {selectedMatch.explanations.map((exp, idx) => (
                      <div key={idx} className="bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded-lg text-xs font-semibold text-emerald-950 flex items-center gap-2">
                        <span>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Human Officer Sign-off required to initiate pilot.
                  </span>
                  <button 
                    onClick={() => {
                      if (onSelectStartupForPilot) onSelectStartupForPilot(selectedMatch);
                      onNavigate('pilots');
                    }}
                    className="gov-btn-primary text-xs px-5 py-2.5 font-bold shadow-md"
                  >
                    Select {selectedMatch.startupName} for Pilot Execution
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      ) : null}

    </div>
  );
}
