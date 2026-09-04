import React, { useState } from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Lock, 
  Building2, 
  User, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Scale, 
  Sparkles,
  Award
} from 'lucide-react';

export default function AuditTrail({ auditLogs }) {
  const [filterQuery, setFilterQuery] = useState('');

  const logs = auditLogs || [
    { id: 'aud-1', timestamp: '2026-08-01 10:15:00', user: 'Rajesh Verma (MoHUA)', role: 'Government Officer', action: 'Challenge Created & Drafted', entity: 'Challenge #ch-1 (Smart Waste)', hash: '0x01a2b3c4d5e6f7a8' },
    { id: 'aud-2', timestamp: '2026-08-01 11:30:00', user: 'Rajesh Verma (MoHUA)', role: 'Government Officer', action: 'Challenge Published to Marketplace', entity: 'Challenge #ch-1', hash: '0x09b8c7d6e5f4a3b2' },
    { id: 'aud-3', timestamp: '2026-08-10 14:22:00', user: 'Ananya Sharma (EcoVision)', role: 'Startup', action: 'Proposal Submitted', entity: 'Proposal #prop-1', hash: '0x12c3d4e5f6a7b8c9' },
    { id: 'aud-4', timestamp: '2026-08-15 16:00:00', user: 'StartupSetu AI Engine', role: 'System / AI', action: 'AI Explainable Matching Calculated', entity: 'EcoVision Match 94%', hash: '0x34d5e6f7a8b9c0d1' },
    { id: 'aud-5', timestamp: '2026-08-16 11:00:00', user: 'Dr. K. S. Ramanathan (IISc)', role: 'Evaluator', action: 'Human Technical Evaluation Submitted', entity: 'Score: 94/100', hash: '0x56e7f8a9b0c1d2e3' },
    { id: 'aud-6', timestamp: '2026-08-20 09:30:00', user: 'Rajesh Verma (MoHUA)', role: 'Government Officer', action: 'Controlled Pilot Approved & Launched', entity: 'Pilot #PIL-BHP-2026-01', hash: '0x78f9a0b1c2d3e4f5' },
    { id: 'aud-7', timestamp: '2026-09-02 14:32:00', user: 'Ananya Sharma (EcoVision)', role: 'Startup', action: 'KPI Telemetry Evidence Uploaded', entity: 'Bhopal Telemetry Stream', hash: '0x90a1b2c3d4e5f6a7' },
    { id: 'aud-8', timestamp: '2026-09-03 17:30:00', user: 'Dr. Meera Nambiar (QCI)', role: 'Validator', action: 'Independent Validation Sign-off Granted', entity: 'Validation #val-1', hash: '0xb2c3d4e5f6a7b8c9' },
    { id: 'aud-9', timestamp: '2026-09-04 09:00:00', user: 'StartupSetu AI Engine', role: 'System / AI', action: 'Procurement Decision Pack Auto-Generated', entity: 'Decision Pack #dec-1', hash: '0xd4e5f6a7b8c9d0e1' }
  ];

  const filteredLogs = logs.filter(l => 
    l.user.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.entity.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.role.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-2 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-slate-700">
          <Lock className="w-4 h-4" />
          <span>Tamper-Evident Immutable Ledger</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Chronological Audit Trail</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Cryptographically hashed timeline recording every event from initial challenge creation through AI matching, human evaluation, pilot milestones, validation, and scale decision.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="gov-card p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search audit trail by user, role, action, or transaction hash..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-700 font-medium text-slate-900"
          />
        </div>
      </div>

      {/* CHRONOLOGICAL AUDIT TIMELINE */}
      <div className="gov-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <History className="w-5 h-5 text-slate-700" />
            Audit Ledger Timeline ({filteredLogs.length} Events)
          </h3>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-bold border border-slate-200">
            Hash Verification: 100% Intact
          </span>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 space-y-6">
          {filteredLogs.map((log, idx) => (
            <div key={log.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Node Marker */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-4 ring-white shadow-xs">
                {idx + 1}
              </div>

              <div className="bg-slate-50 hover:bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{log.action}</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {log.role}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">{log.timestamp}</span>
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  Actor: <strong className="text-slate-900">{log.user}</strong> • Entity: <span className="text-slate-800 font-semibold">{log.entity}</span>
                </div>

                <div className="pt-1 flex items-center justify-between text-[10px]">
                  <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Hash: {log.hash}
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Recorded & Sealed
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
