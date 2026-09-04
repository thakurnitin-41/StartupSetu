import React, { useState } from 'react';
import { 
  Send, 
  Save, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Building2, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Paperclip
} from 'lucide-react';

export default function ProposalSubmission({ 
  challenges, 
  selectedChallengeId, 
  onNavigate, 
  onSubmitProposalSuccess 
}) {
  const challenge = challenges ? (challenges.find(c => c.id === selectedChallengeId) || challenges[0]) : null;

  const [formData, setFormData] = useState({
    solutionTitle: 'EcoVision AI TrashCam & RouteOptima Gov Telematics Suite',
    proposedSolution: 'Integrated AI dual-camera vehicle telemetry hardware mounted on sanitation compaction trucks coupled with RouteOptima Gov cloud engine.',
    technicalApproach: 'Deploy 250 TrashCam Edge AI units with dual 1080p cameras running onboard MobileNet V3 models to verify bin emptying and check truck fill levels.',
    implementationPlan: 'Month 1: Hardware installation. Month 2: Route GIS mapping & driver training. Months 3-5: Live telemetry field testing. Month 6: Final report.',
    teamDetails: 'Led by Ananya Sharma (Ex-ISRO Robotics Lead) and 8 senior IoT & Computer Vision engineers.',
    previousExperience: 'Deployed 120 units in Indore Smart City (achieved 94% route compliance) and 80 units in Surat Sanitation Fleet.',
    expectedOutcomes: '94% route completion rate, 97% GPS tracking uptime, missed collections reduced to 6%, fuel savings of 14.2%.',
    pilotPlan: 'Controlled pilot covering 4 municipal zones (Zones 3, 7, 11, 14) in Bhopal, serving 450,000 citizens.',
    budget: '₹ 14,200,000',
    timeline: '6 Months',
    attachedFiles: ['Technical_Architecture.pdf', 'STQC_Security_Certificate.pdf', 'Indore_Case_Study.pdf']
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitProposalSuccess) {
      onSubmitProposalSuccess({
        challengeId: challenge ? challenge.id : 'ch-1',
        startupId: 'st-1',
        startupName: 'EcoVision AI',
        ...formData
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-blue-800/40">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-400/30">
          Startup Application Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Submit Innovation Pilot Proposal</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Apply to execute a controlled, KPI-driven pilot for government operational challenges.
        </p>
      </div>

      {/* Target Challenge Card Summary */}
      {challenge && (
        <div className="gov-card p-5 bg-blue-50/50 border-blue-200 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Target Challenge:</div>
          <h3 className="font-extrabold text-slate-900 text-base">{challenge.title}</h3>
          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
            <span><Building2 className="w-3.5 h-3.5 inline text-blue-600 mr-1" /> {challenge.departmentName}</span>
            <span><IndianRupee className="w-3.5 h-3.5 inline text-emerald-600 mr-1" /> Budget: {challenge.budget}</span>
            <span><Clock className="w-3.5 h-3.5 inline text-amber-600 mr-1" /> Duration: {challenge.pilotDuration}</span>
          </div>
        </div>
      )}

      {/* STATUS TRACKER BAR */}
      <div className="gov-card p-4 space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Application Lifecycle Status:</div>
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          {[
            { stage: 'Submitted', active: true },
            { stage: 'Under Evaluation', active: submitted },
            { stage: 'Shortlisted', active: false },
            { stage: 'Pilot Selected', active: false },
            { stage: 'Pilot Running', active: false },
            { stage: 'Completed', active: false }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`p-2 rounded-lg font-bold border transition-all text-[11px] ${
                item.active 
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs' 
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              {idx + 1}. {item.stage}
            </div>
          ))}
        </div>
      </div>

      {submitted ? (
        <div className="gov-card p-10 text-center space-y-4 border-2 border-emerald-500/50 bg-emerald-50/30 animate-in fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Proposal Submitted Successfully!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your proposal for <span className="font-bold text-slate-900">{challenge?.title}</span> has been logged into the tamper-evident ledger and routed to the Evaluation Committee.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button onClick={() => onNavigate('marketplace')} className="gov-btn-secondary text-xs px-4 py-2">
              Back to Marketplace
            </button>
            <button onClick={() => onNavigate('evaluator-scoring')} className="gov-btn-primary text-xs px-5 py-2 font-bold">
              Proceed to Committee Evaluation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="gov-card p-6 sm:p-8 space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2">
              1. Technical Solution & Approach
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Proposal Solution Title</label>
              <input 
                type="text"
                required
                value={formData.solutionTitle}
                onChange={(e) => setFormData({ ...formData, solutionTitle: e.target.value })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 font-semibold"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Solution</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.proposedSolution}
                  onChange={(e) => setFormData({ ...formData, proposedSolution: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Technical Approach</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.technicalApproach}
                  onChange={(e) => setFormData({ ...formData, technicalApproach: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2">
              2. Implementation & Previous Deployments
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Implementation Plan</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.implementationPlan}
                  onChange={(e) => setFormData({ ...formData, implementationPlan: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Previous Experience & Track Record</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.previousExperience}
                  onChange={(e) => setFormData({ ...formData, previousExperience: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2">
              3. Pilot Plan, Budget & Team
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Budget</label>
                <input 
                  type="text"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-700 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Timeline</label>
                <input 
                  type="text"
                  required
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Team Details</label>
                <input 
                  type="text"
                  required
                  value={formData.teamDetails}
                  onChange={(e) => setFormData({ ...formData, teamDetails: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pilot Execution Methodology</label>
              <textarea 
                rows={2}
                required
                value={formData.pilotPlan}
                onChange={(e) => setFormData({ ...formData, pilotPlan: e.target.value })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Documents Simulator */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700">Supporting Certificates & Architecture Docs</label>
            <div className="flex flex-wrap gap-2">
              {formData.attachedFiles.map((file, idx) => (
                <div key={idx} className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 font-medium">
                  <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                  <span>{file}</span>
                </div>
              ))}
              <button type="button" onClick={() => alert('Simulated document upload: Security Certificate added.')} className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Attach Document
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button type="button" onClick={() => alert('Draft saved successfully.')} className="gov-btn-secondary text-xs px-4 py-2.5">
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button type="submit" className="gov-btn-primary text-xs px-6 py-2.5 font-bold shadow-md">
              <Send className="w-4 h-4" /> Submit Proposal to Government
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
