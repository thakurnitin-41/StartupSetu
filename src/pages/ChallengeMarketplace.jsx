import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Users, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  Send,
  X,
  FileText
} from 'lucide-react';

export default function ChallengeMarketplace({ 
  challenges, 
  onSelectChallenge, 
  onNavigate, 
  currentUser 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedChallengeModal, setSelectedChallengeModal] = useState(null);

  const sectors = ['All', 'Smart City', 'IoT', 'CleanTech', 'AI/ML', 'Healthcare', 'Agriculture', 'Cybersecurity'];

  const filteredChallenges = challenges ? challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || c.sector.toLowerCase() === selectedSector.toLowerCase();
    return matchesSearch && matchesSector;
  }) : [];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-blue-800/40">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-2.5 py-1 rounded border border-amber-400/30">
          Startup Discovery Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Government Innovation Challenges</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Discover high-impact operational challenges published by central ministries, state departments, and smart city corporations.
        </p>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="gov-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search government challenges by keyword, department, or sector..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium text-slate-900"
            />
          </div>

          {/* Sector Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSector === sector
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* CHALLENGES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((c) => (
          <div 
            key={c.id} 
            className="gov-card p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group"
          >
            <div className="space-y-3">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                  {c.sector}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  c.status === 'Active Pilot' ? 'bg-amber-100 text-amber-800' :
                  c.status === 'Completed Validation' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {c.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                {c.title}
              </h3>

              {/* Department & Location */}
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{c.departmentName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{c.location}</span>
                </div>
              </div>

              {/* Problem Snippet */}
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-1 border-t border-slate-100">
                {c.problemStatement}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
                <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block font-normal">Pilot Budget</span>
                  <span className="text-emerald-700 font-extrabold">{c.budget}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block font-normal">Duration</span>
                  <span className="font-bold text-slate-900">{c.pilotDuration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <strong className="text-slate-900">{c.applicantCount || 0}</strong> Applicants
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Deadline: {c.applicationDeadline}
                </span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  onClick={() => setSelectedChallengeModal(c)}
                  className="gov-btn-secondary text-xs py-2 w-full"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" /> Details
                </button>
                <button 
                  onClick={() => {
                    if (onSelectChallenge) onSelectChallenge(c.id);
                    onNavigate('proposal-submission');
                  }}
                  className="gov-btn-primary text-xs py-2 w-full font-bold"
                >
                  <Send className="w-3.5 h-3.5" /> Apply Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CHALLENGE DETAILS MODAL */}
      {selectedChallengeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                  {selectedChallengeModal.sector}
                </span>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                  {selectedChallengeModal.status}
                </span>
              </div>
              <button 
                onClick={() => setSelectedChallengeModal(null)} 
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">{selectedChallengeModal.title}</h2>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-blue-600" /> {selectedChallengeModal.departmentName}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> {selectedChallengeModal.location}</span>
                <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-emerald-600" /> {selectedChallengeModal.budget}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-600" /> {selectedChallengeModal.pilotDuration}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200 text-xs">
                <h4 className="font-bold text-slate-900">Problem Statement:</h4>
                <p className="text-slate-600 leading-relaxed">{selectedChallengeModal.problemStatement}</p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-xl space-y-2 border border-blue-100 text-xs">
                <h4 className="font-bold text-blue-950">Target Outcome:</h4>
                <p className="text-blue-900 leading-relaxed">{selectedChallengeModal.targetOutcome}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Technical Requirements:</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedChallengeModal.technicalRequirements}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Eligibility Criteria:</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedChallengeModal.eligibilityCriteria}</p>
                </div>
              </div>

              {selectedChallengeModal.kpiTargets && (
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-900 text-xs">Target Outcome KPIs:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedChallengeModal.kpiTargets.map((k, i) => (
                      <div key={i} className="bg-slate-100 p-2.5 rounded-lg flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-800">{k.metric}</span>
                        <span className="font-extrabold text-blue-700">{k.target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => setSelectedChallengeModal(null)} className="gov-btn-secondary text-xs px-4 py-2">
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedChallengeModal(null);
                  if (onSelectChallenge) onSelectChallenge(selectedChallengeModal.id);
                  onNavigate('proposal-submission');
                }} 
                className="gov-btn-primary text-xs px-5 py-2 font-bold"
              >
                Apply for this Challenge <Send className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
