import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  Building2, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Building,
  Sparkles
} from 'lucide-react';

export default function AuthModal({ onLogin, onNavigate }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Government Officer');

  const demoAccounts = [
    {
      role: 'Government Officer',
      name: 'Rajesh Verma',
      email: 'officer@mohua.gov.in',
      org: 'Ministry of Housing & Urban Affairs',
      icon: Building2,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      role: 'Startup',
      name: 'Ananya Sharma',
      email: 'ananya@ecovision.ai',
      org: 'EcoVision AI Technologies',
      icon: Rocket,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      role: 'Evaluator',
      name: 'Dr. K. S. Ramanathan',
      email: 'evaluator@iisc.ac.in',
      org: 'IISc GovTech Evaluation',
      icon: CheckCircle2,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      role: 'Validator',
      name: 'Dr. Meera Nambiar',
      email: 'validator@qci.org.in',
      org: 'Quality Council of India (QCI)',
      icon: ShieldCheck,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      role: 'Admin',
      name: 'Vikramaditya Das',
      email: 'admin@startupsetu.gov.in',
      org: 'National Platform Admin',
      icon: UserCheck,
      color: 'bg-slate-100 text-slate-800 border-slate-300'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role, email || 'demo@startupsetu.gov.in');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid md:grid-cols-12">
        
        {/* Left Side: Form */}
        <div className="md:col-span-7 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              {isRegister ? 'Already registered? Log In' : 'Need an account? Register'}
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isRegister ? 'Create StartupSetu Account' : 'Welcome to StartupSetu'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Secure role-based authentication for GovTech procurement & innovation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.gov.in"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Platform Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Government Officer">Government Officer</option>
                <option value="Startup">Startup</option>
                <option value="Evaluator">Evaluator</option>
                <option value="Validator">Validator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="gov-btn-primary w-full text-xs py-2.5 mt-2">
              {isRegister ? 'Complete Registration' : 'Log In to Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Side: Demo Quick Role Switcher */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm">Demo Quick Login</h3>
            </div>
            <p className="text-xs text-slate-300">
              Click any realistic pre-configured account below to log in instantly:
            </p>

            <div className="space-y-2.5 pt-2">
              {demoAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <button
                    key={account.role}
                    onClick={() => onLogin(account.role, account.email)}
                    className="w-full text-left p-3 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                          {account.role}
                        </div>
                        <div className="text-[10px] text-slate-400">{account.name} • {account.org}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-400">
            Role-based access control enabled. Government Officer decisions require verified evidence.
          </div>
        </div>

      </div>
    </div>
  );
}
