import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DemoFlowModal from './components/DemoFlowModal';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GovDashboard from './pages/GovDashboard';
import AIChallengeBuilder from './pages/AIChallengeBuilder';
import ChallengeMarketplace from './pages/ChallengeMarketplace';
import StartupMatching from './pages/StartupMatching';
import ProposalSubmission from './pages/ProposalSubmission';
import EvaluatorDashboard from './pages/EvaluatorDashboard';
import PilotManagement from './pages/PilotManagement';
import KPIDashboard from './pages/KPIDashboard';
import EvidencePassport from './pages/EvidencePassport';
import ValidatorDashboard from './pages/ValidatorDashboard';
import ProcurementDecisionPack from './pages/ProcurementDecisionPack';
import ScaleEngine from './pages/ScaleEngine';
import AuditTrail from './pages/AuditTrail';
import AdminDashboard from './pages/AdminDashboard';
import StartupProfile from './pages/StartupProfile';

export default function App() {
  // Start with unauthenticated state so the user lands directly on the Login Page
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState('ch-1');

  // Shared Data States
  const [challenges, setChallenges] = useState([]);
  const [startups, setStartups] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [chRes, stRes, prRes, piRes, kpRes, evRes, auRes] = await Promise.all([
        fetch('/api/challenges'),
        fetch('/api/startups'),
        fetch('/api/proposals'),
        fetch('/api/pilots'),
        fetch('/api/kpis'),
        fetch('/api/evidence'),
        fetch('/api/audit-logs')
      ]);

      const [chData, stData, prData, piData, kpData, evData, auData] = await Promise.all([
        chRes.json(),
        stRes.json(),
        prRes.json(),
        piRes.json(),
        kpRes.json(),
        evRes.json(),
        auRes.json()
      ]);

      setChallenges(chData);
      setStartups(stData);
      setProposals(prData);
      setPilots(piData);
      setKpis(kpData);
      setEvidenceList(evData);
      setAuditLogs(auData);
    } catch (err) {
      console.error('Error loading API data:', err);
    }
  };

  const handleRoleChange = (newRole, email, targetTabOverride = null) => {
    const roleAvatars = {
      'Government Officer': { name: 'Rajesh Verma', email: 'officer@mohua.gov.in', org: 'Ministry of Housing & Urban Affairs', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', defaultTab: 'gov-dashboard' },
      'Startup': { name: 'Ananya Sharma', email: 'ananya@ecovision.ai', org: 'EcoVision AI Technologies', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', defaultTab: 'startup-dashboard' },
      'Evaluator': { name: 'Dr. K. S. Ramanathan', email: 'evaluator@iisc.ac.in', org: 'IISc GovTech Evaluation', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', defaultTab: 'evaluator-dashboard' },
      'Validator': { name: 'Dr. Meera Nambiar', email: 'validator@qci.org.in', org: 'Quality Council of India (QCI)', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', defaultTab: 'validator-dashboard' },
      'Admin': { name: 'Vikramaditya Das', email: 'admin@startupsetu.gov.in', org: 'National Platform Admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', defaultTab: 'admin-dashboard' }
    };

    const details = roleAvatars[newRole] || roleAvatars['Government Officer'];
    setCurrentUser({
      id: `u-${Date.now()}`,
      role: newRole,
      name: details.name,
      email: email || details.email,
      organization: details.org,
      avatar: details.avatar
    });

    setActiveTab(targetTabOverride || details.defaultTab);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('login');
  };

  const handlePublishChallenge = async (newChallengeData) => {
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChallengeData)
      });
      const published = await res.json();
      setChallenges([published, ...challenges]);
    } catch (err) {
      console.error('Error publishing challenge:', err);
    }
  };

  const handleExecuteDemoStep = (roleToSet, targetTab) => {
    handleRoleChange(roleToSet, null, targetTab);
  };

  // Role-Based Allowed Tabs Map
  const roleAllowedTabs = {
    'Government Officer': ['gov-dashboard', 'marketplace', 'ai-builder', 'startups', 'matching', 'proposals', 'pilots', 'kpi-analytics', 'evidence-passport', 'procurement-decisions', 'scale-engine', 'audit-trail', 'settings', 'landing', 'login', 'auth'],
    'Startup': ['startup-dashboard', 'marketplace', 'proposals', 'proposal-submission', 'pilots', 'evidence-passport', 'payments', 'startup-profile', 'landing', 'login', 'auth'],
    'Evaluator': ['evaluator-dashboard', 'proposals', 'evaluator-scoring', 'evaluator-compare', 'audit-trail', 'landing', 'login', 'auth'],
    'Validator': ['validator-dashboard', 'pilots', 'evidence-passport', 'validator-signoff', 'audit-trail', 'landing', 'login', 'auth'],
    'Admin': ['admin-dashboard', 'admin-users', 'admin-departments', 'startups', 'marketplace', 'pilots', 'kpi-analytics', 'scale-engine', 'audit-trail', 'settings', 'landing', 'login', 'auth']
  };

  const renderContent = () => {
    if (activeTab === 'landing') {
      return <LandingPage onNavigate={setActiveTab} onSelectRole={handleRoleChange} />;
    }

    if (activeTab === 'login' || activeTab === 'auth' || !currentUser) {
      return (
        <LoginPage 
          onLoginSuccess={(role, email, targetTab) => handleRoleChange(role, email, targetTab)} 
          onNavigate={setActiveTab} 
        />
      );
    }

    // Role-based Route Guard
    const allowed = roleAllowedTabs[currentUser.role] || [];
    if (!allowed.includes(activeTab)) {
      const defaultRoleTab = {
        'Government Officer': 'gov-dashboard',
        'Startup': 'startup-dashboard',
        'Evaluator': 'evaluator-dashboard',
        'Validator': 'validator-dashboard',
        'Admin': 'admin-dashboard'
      }[currentUser.role] || 'gov-dashboard';

      return (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl font-bold">
            🔒
          </div>
          <h3 className="text-xl font-extrabold text-amber-950">Access Restricted by Role</h3>
          <p className="text-xs text-amber-800 leading-relaxed">
            Your current logged-in role (<strong className="text-amber-950">{currentUser.role}</strong>) does not have authorization to view the target module.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => setActiveTab(defaultRoleTab)}
              className="gov-btn-primary text-xs py-2 px-4 font-bold"
            >
              Return to {currentUser.role} Dashboard
            </button>
            <button 
              onClick={handleLogout}
              className="gov-btn-secondary text-xs py-2 px-4"
            >
              Switch Role
            </button>
          </div>
        </div>
      );
    }
    switch (activeTab) {
      case 'landing':
        return <LandingPage onNavigate={setActiveTab} onSelectRole={handleRoleChange} />;

      case 'login':
      case 'auth':
        return (
          <LoginPage 
            onLoginSuccess={(role, email, targetTab) => handleRoleChange(role, email, targetTab)} 
            onNavigate={setActiveTab} 
          />
        );

      case 'gov-dashboard':
        return (
          <GovDashboard 
            challenges={challenges} 
            pilots={pilots} 
            onNavigate={setActiveTab} 
            onSelectChallenge={setSelectedChallengeId} 
          />
        );

      case 'startup-dashboard':
        return (
          <GovDashboard 
            challenges={challenges} 
            pilots={pilots} 
            onNavigate={setActiveTab} 
            onSelectChallenge={setSelectedChallengeId} 
          />
        );

      case 'evaluator-dashboard':
        return <EvaluatorDashboard proposals={proposals} onNavigate={setActiveTab} />;

      case 'validator-dashboard':
        return <ValidatorDashboard pilots={pilots} evidenceList={evidenceList} onNavigate={setActiveTab} />;

      case 'admin-dashboard':
      case 'admin-users':
      case 'admin-departments':
      case 'settings':
        return <AdminDashboard startups={startups} challenges={challenges} pilots={pilots} onNavigate={setActiveTab} />;

      case 'ai-builder':
        return <AIChallengeBuilder onPublishChallenge={handlePublishChallenge} onNavigate={setActiveTab} />;

      case 'marketplace':
        return (
          <ChallengeMarketplace 
            challenges={challenges} 
            onSelectChallenge={setSelectedChallengeId} 
            onNavigate={setActiveTab} 
            currentUser={currentUser}
          />
        );

      case 'matching':
        return (
          <StartupMatching 
            challenges={challenges} 
            selectedChallengeId={selectedChallengeId} 
            onNavigate={setActiveTab} 
          />
        );

      case 'proposals':
      case 'proposal-submission':
        return (
          <ProposalSubmission 
            challenges={challenges} 
            selectedChallengeId={selectedChallengeId} 
            onNavigate={setActiveTab} 
          />
        );

      case 'evaluator-scoring':
      case 'evaluator-compare':
        return <EvaluatorDashboard proposals={proposals} onNavigate={setActiveTab} />;

      case 'pilots':
        return <PilotManagement pilots={pilots} onNavigate={setActiveTab} />;

      case 'kpi-analytics':
        return <KPIDashboard pilots={pilots} kpis={kpis} onNavigate={setActiveTab} />;

      case 'evidence-passport':
        return <EvidencePassport pilots={pilots} evidenceList={evidenceList} onNavigate={setActiveTab} />;

      case 'validator-signoff':
        return <ValidatorDashboard pilots={pilots} evidenceList={evidenceList} onNavigate={setActiveTab} />;

      case 'procurement-decisions':
        return <ProcurementDecisionPack pilots={pilots} onNavigate={setActiveTab} />;

      case 'scale-engine':
        return <ScaleEngine onNavigate={setActiveTab} />;

      case 'audit-trail':
        return <AuditTrail auditLogs={auditLogs} />;

      case 'startups':
      case 'startup-profile':
        return <StartupProfile onNavigate={setActiveTab} />;

      default:
        return <GovDashboard challenges={challenges} pilots={pilots} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar 
        currentUser={currentUser} 
        onRoleChange={handleRoleChange} 
        onNavigate={setActiveTab} 
        activeTab={activeTab}
        onOpenDemoFlow={() => setShowDemoModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Layout Area */}
      <div className="flex flex-1">
        
        {/* Role-Specific Sidebar (Hidden on Landing Page & Login Page) */}
        {activeTab !== 'landing' && activeTab !== 'login' && activeTab !== 'auth' && (
          <Sidebar 
            activeRole={currentUser ? currentUser.role : 'Government Officer'} 
            activeTab={activeTab} 
            onSelectTab={setActiveTab} 
          />
        )}

        {/* Dynamic Page Content View */}
        <main className={`flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden ${
          activeTab === 'landing' || activeTab === 'login' || activeTab === 'auth' ? 'max-w-7xl' : ''
        }`}>
          {renderContent()}
        </main>
      </div>

      {/* Hackathon Interactive Story Walkthrough Modal */}
      <DemoFlowModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
        onExecuteStep={handleExecuteDemoStep}
      />

    </div>
  );
}
