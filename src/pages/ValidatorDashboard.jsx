import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  FileCheck, 
  Building2, 
  Send, 
  Lock, 
  Award,
  AlertCircle,
  FileText
} from 'lucide-react';
import { api } from '../services/api';

export default function ValidatorDashboard({ pilots, evidenceList, onNavigate }) {
  const [evidenceItems, setEvidenceItems] = useState(
    evidenceList && evidenceList.length > 0 ? evidenceList : [
      { id: 'evid-1', title: 'Bhopal Sanitation Telemetry Log Stream', type: 'System Logs', status: 'Verified', notes: 'AWS IoT log checksum matched.' },
      { id: 'evid-2', title: 'Route Completion Audit Report', type: 'KPI Reports', status: 'Verified', notes: 'Sample verification passed.' },
      { id: 'evid-3', title: 'On-Ground Bin Dumping Dataset', type: 'Field Test Results', status: 'Pending Review', notes: 'Physical inspection completed.' }
    ]
  );

  const [validationComments, setValidationComments] = useState(
    'All claimed KPIs have been independently cross-verified using physical municipal audits and server telemetry. Zero data tampering detected. Recommended for full evidence passport certification.'
  );

  const [signedOff, setSignedOff] = useState(false);

  const handleUpdateStatus = async (id, newStatus) => {
    const updated = evidenceItems.map(item => item.id === id ? { ...item, status: newStatus } : item);
    setEvidenceItems(updated);
    try {
      await api.updateEvidence(id, {
        status: newStatus,
        validatorName: 'Dr. Meera Nambiar (QCI)',
        verificationNotes: newStatus === 'Verified' ? 'Independently verified and approved.' : 'Rejected upon audit inspection.'
      });
    } catch (e) {
      console.warn('Evidence update fallback:', e);
    }
  };

  const handleSignOffValidation = async (e) => {
    e.preventDefault();
    setSignedOff(true);
    try {
      await api.signOffValidation({
        pilotId: pilots && pilots.length > 0 ? pilots[0].id : 'pil-1',
        validatorName: 'Dr. Meera Nambiar (QCI)',
        auditRemarks: validationComments,
        status: 'Approved'
      });
    } catch (err) {
      console.warn('Signoff fallback:', err);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-amber-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/60 text-amber-200 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Independent Quality Assurance & Audit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Third-Party Validator Portal</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Independent verification portal for auditors (Quality Council of India / IISc). Audit pilot telemetry, accept or reject evidence claims, and grant digital validation certificates.
        </p>
      </div>

      {/* EVIDENCE AUDIT LIST */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            Review & Verify Uploaded Pilot Evidence
          </h3>
          <span className="text-xs font-bold text-slate-500">Auditor: Dr. Meera Nambiar (QCI)</span>
        </div>

        <div className="space-y-3">
          {evidenceItems.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{item.title}</span>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">{item.notes}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => handleUpdateStatus(item.id, 'Verified')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    item.status === 'Verified' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Accept & Verify
                </button>

                <button 
                  onClick={() => handleUpdateStatus(item.id, 'Rejected')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    item.status === 'Rejected' ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-rose-700 border border-rose-300 hover:bg-rose-50'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL SIGN-OFF FORM */}
      <form onSubmit={handleSignOffValidation} className="gov-card p-6 sm:p-8 space-y-6">
        
        <div className="border-b border-slate-200 pb-3">
          <h3 className="font-extrabold text-slate-900 text-lg">Digital Validation Certificate Sign-off</h3>
          <p className="text-xs text-slate-500">Issuing official independent audit seal for Pilot #PIL-BHP-2026-01</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Validator Audit Remarks & Certificate Notes</label>
          <textarea 
            rows={3}
            value={validationComments}
            onChange={(e) => setValidationComments(e.target.value)}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-600 font-medium"
          />
        </div>

        {signedOff ? (
          <div className="bg-emerald-950 text-white p-6 rounded-2xl border-2 border-emerald-500 text-center space-y-2 animate-in fade-in">
            <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-emerald-400">Independent Validation Completed ✓</h2>
            <p className="text-xs text-slate-300">
              Digital Signature <strong className="font-mono text-amber-300">SIG-QCI-2026-889104-VAL</strong> issued. Evidence Passport certified.
            </p>
            <div className="pt-2">
              <button 
                type="button" 
                onClick={() => onNavigate('procurement-decisions')}
                className="gov-btn-accent text-xs py-2 px-5 font-bold"
              >
                Proceed to Procurement Decision Pack <FileCheck className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button type="submit" className="gov-btn-primary bg-amber-600 hover:bg-amber-700 text-xs px-6 py-2.5 font-bold shadow-md">
              <FileCheck className="w-4 h-4" /> Issue Independent Validation Sign-off
            </button>
          </div>
        )}

      </form>

    </div>
  );
}
