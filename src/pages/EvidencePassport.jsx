import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  QrCode, 
  Download, 
  Building2, 
  Calendar, 
  Award, 
  Lock, 
  Upload, 
  ExternalLink,
  Check
} from 'lucide-react';

export default function EvidencePassport({ pilots, evidenceList, onNavigate }) {
  const pilot = pilots && pilots.length > 0 ? pilots[0] : {
    id: 'pil-1',
    pilotNumber: 'PIL-BHP-2026-01',
    startupName: 'EcoVision AI',
    challengeTitle: 'Smart Waste Collection Vehicle Real-Time Monitoring',
    departmentName: 'Bhopal Smart City Development Corp',
    startDate: '2026-08-20',
    endDate: '2027-02-20'
  };

  const records = evidenceList || [
    {
      id: 'evid-1',
      title: 'Bhopal Municipal Sanitation Telemetry Log Stream',
      type: 'System Logs',
      filename: 'bhopal_sanitation_telemetry_raw_2026.json',
      filesize: '42.8 MB',
      uploadedBy: 'Ananya Sharma (EcoVision AI)',
      uploadedAt: '2026-09-02 14:32:00',
      status: 'Verified',
      hash: '0x7f8a91b2c3d4e5f60123456789abcdef',
      verificationNotes: 'Cryptographic hash validated against AWS IoT Core server logs. Zero data tampering detected.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    },
    {
      id: 'evid-2',
      title: 'Route Completion & GPS Waypoint Verification Audit Report',
      type: 'KPI Reports',
      filename: 'route_compliance_bhopal_q3.pdf',
      filesize: '8.4 MB',
      uploadedBy: 'Ananya Sharma (EcoVision AI)',
      uploadedAt: '2026-09-03 09:15:00',
      status: 'Verified',
      hash: '0x99a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
      verificationNotes: 'Sample audit of 50 vehicles verified over 14 consecutive shifts.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    },
    {
      id: 'evid-3',
      title: 'Independent Field Inspection & Bin Dumping Verification Dataset',
      type: 'Field Test Results',
      filename: 'bhopal_ward_field_inspection.xlsx',
      filesize: '14.1 MB',
      uploadedBy: 'Dr. Meera Nambiar (QCI Inspector)',
      uploadedAt: '2026-09-03 16:45:00',
      status: 'Verified',
      hash: '0x33b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8',
      verificationNotes: 'Physical on-ground inspection confirmed camera AI bin fill accuracy at 96.4%.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-emerald-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Tamper-Proof Audit Vault</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Digital Evidence Passport</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Cryptographically verified repository of raw IoT system logs, independent field test audits, and validator sign-off certificates.
        </p>
      </div>

      {/* PASSPORT CARD DOCUMENT */}
      <div className="gov-card p-6 sm:p-8 border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 via-white to-white shadow-xl space-y-6">
        
        {/* Passport Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                VALIDATED EVIDENCE PASSPORT ✓
              </span>
              <span className="text-xs font-bold text-slate-500">{pilot.pilotNumber}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 pt-1">{pilot.startupName}</h2>
            <p className="text-xs font-medium text-slate-600">{pilot.challengeTitle}</p>
          </div>

          {/* QR Code & Passport Verification Badge */}
          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <QrCode className="w-10 h-10" />
            </div>
            <div className="text-left text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Verification Hash</span>
              <span className="font-mono font-bold text-slate-800 text-[11px]">0x7F8A...89AF</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Status: Verified ✓</span>
            </div>
          </div>
        </div>

        {/* 6 Verified Checkmark Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'System Logs', verified: true },
            { label: 'KPI Reports', verified: true },
            { label: 'Field Test Results', verified: true },
            { label: 'Performance Data', verified: true },
            { label: 'Validator Report', verified: true },
            { label: 'Government Feedback', verified: true }
          ].map((item, idx) => (
            <div key={idx} className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center space-y-1">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-950 block">{item.label}</span>
              <span className="text-[9px] font-bold text-emerald-700 uppercase">Verified</span>
            </div>
          ))}
        </div>

        {/* Passport Scores Breakdown */}
        <div className="grid grid-cols-3 gap-4 bg-slate-900 text-white p-5 rounded-2xl">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">94.2%</span>
            <span className="block text-[10px] text-slate-300 uppercase tracking-wider font-semibold">KPI Achievement</span>
          </div>
          <div className="text-center border-x border-slate-800">
            <span className="text-2xl sm:text-3xl font-black text-blue-400">89%</span>
            <span className="block text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Technical Performance</span>
          </div>
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">87%</span>
            <span className="block text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Citizen Impact</span>
          </div>
        </div>

      </div>

      {/* EVIDENCE DOCUMENTS TABLE */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Verified Evidence Artifacts
          </h3>
          <button 
            onClick={() => onNavigate('validator-signoff')}
            className="gov-btn-secondary text-xs py-1.5 px-3"
          >
            Validator Sign-off Portal
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Evidence Artifact Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Uploaded By</th>
                <th className="p-3">Cryptographic Hash</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">
                    <div>{r.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{r.filename} ({r.filesize})</div>
                  </td>
                  <td className="p-3 font-medium text-slate-700">{r.type}</td>
                  <td className="p-3 text-slate-600">{r.uploadedBy}</td>
                  <td className="p-3 font-mono text-[10px] text-blue-700 truncate max-w-[120px]">{r.hash}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" /> {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => alert(`Downloading verified evidence artifact: ${r.filename}`)}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
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
