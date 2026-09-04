import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  TrendingUp, 
  FileText, 
  Activity, 
  BarChart3, 
  History, 
  Award,
  Users,
  Shield,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function LandingPage({ onNavigate, onSelectRole }) {
  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-blue-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-Assisted GovTech Procurement & Innovation Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            From Government Problems to <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">Proven Startup Solutions</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            StartupSetu helps government departments discover startups, run controlled pilots, validate impact, and confidently scale solutions — without replacing GeM.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate('gov-dashboard')} 
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('marketplace')} 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              Explore Challenges
            </button>
          </div>

          {/* VISUAL LIFECYCLE BAR */}
          <div className="pt-10 border-t border-slate-800/80 mt-10">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Innovation Procurement Lifecycle
            </div>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-center">
              {[
                { name: 'Government Problem', icon: Building2 },
                { name: 'AI Challenge Builder', icon: Sparkles },
                { name: 'Explainable Match', icon: Rocket },
                { name: 'Controlled Pilot', icon: Activity },
                { name: 'KPI Measurement', icon: BarChart3 },
                { name: 'Independent Validation', icon: ShieldCheck },
                { name: 'Scale Decision', icon: Scale },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-slate-800 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-200 leading-tight">{step.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: THE PROBLEM */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Section 1 — The GovTech Gap</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">Why Traditional Public Procurement Stalls Innovation</h3>
          <p className="text-slate-600 text-sm">Government departments know the outcome they want, but face 3 critical blind spots:</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="gov-card p-6 border-t-4 border-t-rose-500">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold mb-4">01</div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Discovery Bottleneck</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Departments struggle to identify which startup possesses the exact technological capability required to solve niche operational problems.
            </p>
          </div>

          <div className="gov-card p-6 border-t-4 border-t-amber-500">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold mb-4">02</div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Uncontrolled Pilot Risks</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Without structured pilot frameworks and milestone-based payments, testing unproven software risks budget waste and operational disruption.
            </p>
          </div>

          <div className="gov-card p-6 border-t-4 border-t-blue-500">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">03</div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Lack of Validated Evidence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Government officers lack independent third-party evidence proof required to justify large-scale scaling and procurement decisions.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR SOLUTION */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 max-w-6xl mx-auto shadow-xl">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Section 2 — Our Solution</h2>
          <h3 className="text-3xl font-extrabold">StartupSetu Platform Pillars</h3>
          <p className="text-slate-300 text-sm">An end-to-end evidence-based innovation engine surrounding public procurement.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'AI Challenge Builder', desc: 'Converts natural language problems into structured outcome challenges with editable KPIs.', icon: Sparkles },
            { title: 'Explainable AI Matching', desc: 'Transparent 6-factor score breakdown with human-in-the-loop decision controls.', icon: Rocket },
            { title: 'Controlled Pilot Framework', desc: '6-stage lifecycle progress with automated milestone payment release triggers.', icon: Activity },
            { title: 'Milestone Payments', desc: 'Escrow-backed milestone payouts released only upon verified milestone completion.', icon: Award },
            { title: 'Evidence Passport', desc: 'Cryptographically hashed system logs, field test results, and sensor telemetry.', icon: ShieldCheck },
            { title: 'Independent Validation', desc: 'Dedicated third-party validator sign-off from auditors like IISc and QCI.', icon: CheckCircle2 },
            { title: 'Procurement Decision Pack', desc: 'Executive summary pack combining AI recommendations with officer decision authority.', icon: Scale },
            { title: 'Tamper-Evident Audit Trail', desc: 'Chronological immutable event ledger tracking every action from creation to scale.', icon: History }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:border-blue-500/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Section 3 — Workflow</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">How StartupSetu Works Step-by-Step</h3>
        </div>

        <div className="relative border-l-2 border-blue-200 ml-4 md:ml-32 space-y-8">
          {[
            { role: 'Government Officer', title: '1. Create Challenge with AI', desc: 'Officer enters problem statement. AI auto-generates structured KPIs, duration, and budget for approval.' },
            { role: 'AI Engine', title: '2. Explainable Startup Matching', desc: 'AI ranks applicants with weighted scoring and clear text explanations for every match percentage.' },
            { role: 'Startup', title: '3. Proposal Submission', desc: 'Startup submits technical plan, implementation strategy, budget, and supporting certifications.' },
            { role: 'Evaluator', title: '4. Human Committee Scoring', desc: 'Independent technical experts evaluate proposals side-by-side using 6 structured criteria.' },
            { role: 'Government Officer', title: '5. Controlled Pilot Launch', desc: 'Selected startup executes pilot under 6-stage lifecycle tracking with live KPI dashboards.' },
            { role: 'Validator', title: '6. Evidence Passport Sign-off', desc: 'Third-party auditor checks telemetry logs and signs digital validation certificate.' },
            { role: 'Government Officer', title: '7. Procurement / Scale Decision', desc: 'Officer reviews Procurement Decision Pack and recommends solution for state-wide scaling.' }
          ].map((step, idx) => (
            <div key={idx} className="relative pl-8 group">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center ring-4 ring-white shadow-md">
                {idx + 1}
              </div>
              <div className="gov-card p-5 hover:border-blue-300 transition-all">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded border border-blue-100 mb-2 inline-block">
                  {step.role}
                </span>
                <h4 className="font-bold text-slate-900 text-base mb-1">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: BENEFITS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Section 4 — Benefits</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">Value for Every Stakeholder</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="gov-card p-6 bg-gradient-to-b from-blue-50/50 to-white">
            <Building2 className="w-8 h-8 text-blue-600 mb-4" />
            <h4 className="font-bold text-slate-900 text-lg mb-3">For Government</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lower-risk innovation procurement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Faster startup discovery via AI</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Audit-ready, evidence-backed decisions</span>
              </li>
            </ul>
          </div>

          <div className="gov-card p-6 bg-gradient-to-b from-emerald-50/50 to-white">
            <Rocket className="w-8 h-8 text-emerald-600 mb-4" />
            <h4 className="font-bold text-slate-900 text-lg mb-3">For Startups</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct access to real government demand</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent scoring & match explanations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guaranteed milestone-based payouts</span>
              </li>
            </ul>
          </div>

          <div className="gov-card p-6 bg-gradient-to-b from-amber-50/50 to-white">
            <Users className="w-8 h-8 text-amber-600 mb-4" />
            <h4 className="font-bold text-slate-900 text-lg mb-3">For Citizens</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Faster access to proven civic solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent municipal performance metrics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>High-impact public infrastructure improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BANNER */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-10 text-center space-y-6 shadow-2xl relative overflow-hidden border border-blue-700/50">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-3xl font-extrabold">Turn a government problem into a proven solution.</h3>
            <p className="text-slate-300 text-sm">Join India's AI-assisted GovTech innovation procurement engine today.</p>
          </div>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('ai-builder')} 
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Launch AI Challenge Builder
            </button>
            <button 
              onClick={() => onNavigate('marketplace')} 
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 transition-all text-sm"
            >
              Browse Active Challenges
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
