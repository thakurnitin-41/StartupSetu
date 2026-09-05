import express from 'express';
import { db } from './db.js';
import { generateStructuredChallenge, matchStartupsForChallenge, generateProcurementDecisionPack } from './aiEngine.js';

const router = express.Router();

// Auth Endpoints
router.post('/auth/login', (req, res) => {
  const { email, role, name, organization, designation } = req.body;
  const users = db.get('users');
  let user = null;
  
  if (email) {
    user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  
  if (!user && name) {
    user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
  }

  const demoEmails = ['officer@mohua.gov.in', 'ananya@ecovision.ai', 'evaluator@iisc.ac.in', 'validator@qci.org.in', 'admin@startupsetu.gov.in'];

  if (user && name && user.name.toLowerCase() !== name.toLowerCase() && demoEmails.includes((email || '').toLowerCase())) {
    user = null; // Create dedicated new user record
  }

  if (!user && role && !name) {
    user = users.find(u => u.role === role);
  }
  
  if (!user) {
    const safeName = name || (email ? email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Official Delegate');
    user = db.add('users', {
      name: safeName,
      email: email && !demoEmails.includes(email.toLowerCase()) ? email : `${safeName.toLowerCase().replace(/\s+/g, '')}@startupsetu.gov.in`,
      role: role || 'Government Officer',
      organization: organization || (role === 'Startup' ? `${safeName} Innovations` : 'Department of Urban Development'),
      designation: designation || (role === 'Startup' ? 'Founder & CEO' : 'Official Officer'),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=0D8ABC&color=fff`,
      createdAt: new Date().toISOString().substring(0, 10)
    });
  } else if (name && user.name !== name) {
    user = db.update('users', user.id, { 
      name, 
      ...(organization ? { organization } : {}), 
      ...(designation ? { designation } : {}) 
    });
  }

  db.logAudit(user.name, user.role, 'User Logged In', `Session initialized for ${user.name} (${user.email})`);
  res.json({ success: true, user, token: `token_${user.id}_${Date.now()}` });
});

router.post('/auth/register', (req, res) => {
  const { name, email, role, organization, designation, password } = req.body;
  if (!email || !role || !name) {
    return res.status(400).json({ error: 'Name, Email, and Role are required for registration.' });
  }

  const users = db.get('users');
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  let user;
  if (existingUser) {
    user = db.update('users', existingUser.id, {
      name,
      role,
      organization: organization || existingUser.organization,
      designation: designation || existingUser.designation
    });
  } else {
    user = db.add('users', {
      name,
      email,
      role,
      organization: organization || (role === 'Startup' ? `${name} Technologies` : 'Government Department'),
      designation: designation || (role === 'Startup' ? 'Founder' : 'Official Delegate'),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date().toISOString().substring(0, 10)
    });
  }

  db.logAudit(user.name, user.role, 'User Account Registered', `New user registered with ${user.email} as ${user.name} (${user.role})`);
  res.json({ success: true, user, token: `token_${user.id}_${Date.now()}` });
});

router.get('/auth/users', (req, res) => {
  const users = db.get('users');
  res.json(users);
});

router.get('/auth/me', (req, res) => {
  const users = db.get('users');
  res.json({ user: users[0] });
});

// Challenges Endpoints
router.get('/challenges', (req, res) => {
  const challenges = db.get('challenges');
  res.json(challenges);
});

router.get('/challenges/:id', (req, res) => {
  const challenge = db.getById('challenges', req.params.id);
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
  res.json(challenge);
});

router.post('/challenges', (req, res) => {
  const challengeData = req.body;
  const newChallenge = db.add('challenges', {
    ...challengeData,
    status: 'Open for Proposals',
    applicantCount: 0,
    createdAt: new Date().toISOString().substring(0, 10)
  });

  db.logAudit(
    challengeData.publishedBy || 'Government Officer',
    'Government Officer',
    'Challenge Created & Published',
    `Challenge #${newChallenge.id}: ${newChallenge.title}`
  );

  res.status(201).json(newChallenge);
});

// AI endpoints
router.post('/ai/generate-challenge', (req, res) => {
  const { problemStatement } = req.body;
  if (!problemStatement) {
    return res.status(400).json({ error: 'Problem statement is required' });
  }

  const structured = generateStructuredChallenge(problemStatement);
  res.json(structured);
});

router.post('/ai/match-startups', (req, res) => {
  const { challengeId } = req.body;
  const challenge = db.getById('challenges', challengeId);
  const startups = db.get('startups');

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  const matched = matchStartupsForChallenge(challenge, startups);

  db.logAudit(
    'StartupSetu AI Engine',
    'System / AI',
    'AI Startup Matching Executed',
    `Matched ${matched.length} startups for Challenge #${challengeId}`
  );

  res.json({ challenge, matches: matched });
});

// Startups Endpoints
router.get('/startups', (req, res) => {
  const startups = db.get('startups');
  res.json(startups);
});

router.get('/startups/:id', (req, res) => {
  const startup = db.getById('startups', req.params.id);
  if (!startup) return res.status(404).json({ error: 'Startup not found' });
  res.json(startup);
});

// Proposals Endpoints
router.get('/proposals', (req, res) => {
  let proposals = db.get('proposals');
  if (req.query.challengeId) {
    proposals = proposals.filter(p => p.challengeId === req.query.challengeId);
  }
  if (req.query.startupId) {
    proposals = proposals.filter(p => p.startupId === req.query.startupId);
  }
  res.json(proposals);
});

router.post('/proposals', (req, res) => {
  const proposalData = req.body;
  const newProposal = db.add('proposals', {
    ...proposalData,
    status: 'Submitted',
    submittedAt: new Date().toISOString().substring(0, 10)
  });

  // Increment applicant count on challenge
  const challenge = db.getById('challenges', proposalData.challengeId);
  if (challenge) {
    db.update('challenges', challenge.id, { applicantCount: (challenge.applicantCount || 0) + 1 });
  }

  db.logAudit(
    proposalData.startupName || 'Startup Founder',
    'Startup',
    'Proposal Submitted',
    `Proposal #${newProposal.id} for Challenge #${proposalData.challengeId}`
  );

  res.status(201).json(newProposal);
});

// Evaluations Endpoints
router.get('/evaluations', (req, res) => {
  const evaluations = db.get('evaluations');
  res.json(evaluations);
});

router.post('/evaluations', (req, res) => {
  const evalData = req.body;
  const newEval = db.add('evaluations', {
    ...evalData,
    submittedAt: new Date().toISOString().substring(0, 10)
  });

  // Update proposal status
  if (evalData.proposalId) {
    db.update('proposals', evalData.proposalId, { status: 'Under Evaluation' });
  }

  db.logAudit(
    evalData.evaluatorName || 'Technical Evaluator',
    'Evaluator',
    'Proposal Evaluated',
    `Evaluation Score: ${evalData.totalScore}/100 for Proposal #${evalData.proposalId}`
  );

  res.status(201).json(newEval);
});

// Pilots Endpoints
router.get('/pilots', (req, res) => {
  const pilots = db.get('pilots');
  res.json(pilots);
});

router.get('/pilots/:id', (req, res) => {
  const pilot = db.getById('pilots', req.params.id);
  if (!pilot) return res.status(404).json({ error: 'Pilot not found' });
  res.json(pilot);
});

router.post('/pilots', (req, res) => {
  const pilotData = req.body;
  const newPilot = db.add('pilots', {
    ...pilotData,
    pilotNumber: `PIL-GOV-${Date.now().toString().slice(-4)}`,
    status: 'Pilot Running',
    currentStageIndex: 0,
    startDate: new Date().toISOString().substring(0, 10)
  });

  db.logAudit(
    pilotData.governmentOfficer || 'Government Officer',
    'Government Officer',
    'Controlled Pilot Approved & Launched',
    `Pilot #${newPilot.pilotNumber} assigned to ${pilotData.startupName}`
  );

  res.status(201).json(newPilot);
});

router.put('/pilots/:id/milestones/:milestoneId', (req, res) => {
  const { id, milestoneId } = req.params;
  const { status, verifiedBy } = req.body;

  const pilot = db.getById('pilots', id);
  if (!pilot) return res.status(404).json({ error: 'Pilot not found' });

  const updatedMilestones = pilot.milestones.map(m => {
    if (m.id === milestoneId) {
      return { ...m, status, verifiedBy, releaseDate: new Date().toISOString().substring(0, 10) };
    }
    return m;
  });

  const updatedPilot = db.update('pilots', id, { milestones: updatedMilestones });

  db.logAudit(
    verifiedBy || 'Officer',
    'Government Officer',
    'Pilot Milestone Released',
    `Milestone ${milestoneId} payout authorized for Pilot #${pilot.pilotNumber}`
  );

  res.json(updatedPilot);
});

// KPIs Endpoints
router.get('/kpis', (req, res) => {
  let kpis = db.get('kpis');
  if (req.query.pilotId) {
    kpis = kpis.filter(k => k.pilotId === req.query.pilotId);
  }
  res.json(kpis);
});

// Evidence Endpoints
router.get('/evidence', (req, res) => {
  let evidence = db.get('evidence');
  if (req.query.pilotId) {
    evidence = evidence.filter(e => e.pilotId === req.query.pilotId);
  }
  res.json(evidence);
});

router.post('/evidence', (req, res) => {
  const evidenceData = req.body;
  const newEvidence = db.add('evidence', {
    ...evidenceData,
    uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    status: 'Pending Review',
    hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`
  });

  db.logAudit(
    evidenceData.uploadedBy || 'User',
    'Startup',
    'Evidence Uploaded to Passport',
    `Evidence #${newEvidence.id}: ${newEvidence.title}`
  );

  res.status(201).json(newEvidence);
});

router.put('/evidence/:id', (req, res) => {
  const { id } = req.params;
  const { status, validatorName, verificationNotes } = req.body;

  const updated = db.update('evidence', id, { status, validatorName, verificationNotes });

  db.logAudit(
    validatorName || 'Validator',
    'Validator',
    `Evidence Verification ${status}`,
    `Evidence #${id} status changed to ${status}`
  );

  res.json(updated);
});

// Validations Endpoints
router.get('/validations', (req, res) => {
  const validations = db.get('validations');
  res.json(validations);
});

router.post('/validations', (req, res) => {
  const valData = req.body;
  const newVal = db.add('validations', {
    ...valData,
    signedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    digitalSignature: `SIG-QCI-${Date.now().toString().slice(-6)}-VAL`
  });

  // Update pilot status
  if (valData.pilotId) {
    db.update('pilots', valData.pilotId, { status: 'Completed Validation', currentStageIndex: 5 });
  }

  db.logAudit(
    valData.validatorName || 'Dr. Meera Nambiar',
    'Validator',
    'Independent Validation Sign-Off Granted',
    `Validation Signed for Pilot #${valData.pilotId}`
  );

  res.status(201).json(newVal);
});

// Decisions Endpoints (Procurement Decision Pack)
router.get('/decisions', (req, res) => {
  const decisions = db.get('scaleDecisions');
  res.json(decisions);
});

router.post('/decisions/generate', (req, res) => {
  const { pilotId } = req.body;
  const pilot = db.getById('pilots', pilotId) || db.get('pilots')[0];
  const kpis = db.get('kpis').filter(k => k.pilotId === pilotId);
  const validations = db.get('validations').filter(v => v.pilotId === pilotId);
  const evidenceList = db.get('evidence').filter(e => e.pilotId === pilotId);

  const pack = generateProcurementDecisionPack(pilot, kpis, validations, evidenceList);

  res.json(pack);
});

router.post('/decisions', (req, res) => {
  const decisionData = req.body;
  const newDecision = db.add('scaleDecisions', {
    ...decisionData,
    decidedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });

  // Update pilot if recommended for scale
  if (decisionData.humanOfficerDecision === 'Recommended for Scale') {
    db.update('pilots', decisionData.pilotId, { status: 'Scaled / Recommended' });
    
    // Add to Scale Engine Catalog if not present
    const scaleItems = db.get('scaleEngineItems');
    if (!scaleItems.some(item => item.startupName === decisionData.startupName)) {
      db.add('scaleEngineItems', {
        startupName: decisionData.startupName,
        solutionTitle: decisionData.challengeTitle,
        sector: 'Smart City',
        pilotScore: `${decisionData.overallPilotScore || 92}%`,
        kpiAchievement: decisionData.kpiAchievement || '95%',
        validationStatus: 'Validated ✓',
        riskLevel: 'Low Risk',
        scaleRecommendation: 'Recommended ✓',
        originalDepartment: decisionData.departmentName || 'Government Department',
        adoptableBy: 'All Government Departments & ULBs',
        estimatedDeployTime: '30 Days',
        provenMetrics: `${decisionData.citizenImpact || 'Validated Impact'} | Audit Ready`
      });
    }
  }

  db.logAudit(
    decisionData.decidedBy || 'Government Officer',
    'Government Officer',
    `Procurement Decision Executed: ${decisionData.humanOfficerDecision}`,
    `Decision for Pilot #${decisionData.pilotId} - Status: ${decisionData.humanOfficerDecision}`
  );

  res.status(201).json(newDecision);
});

// Scale Engine Endpoints
router.get('/scale-engine', (req, res) => {
  const items = db.get('scaleEngineItems');
  res.json(items);
});

// Audit Logs Endpoint
router.get('/audit-logs', (req, res) => {
  const logs = db.get('auditLogs');
  res.json(logs);
});

// Admin Stats
router.get('/admin/stats', (req, res) => {
  res.json({
    totalChallenges: db.get('challenges').length,
    totalStartups: db.get('startups').length,
    activePilots: db.get('pilots').filter(p => p.status === 'Pilot Running').length,
    completedPilots: db.get('pilots').filter(p => p.status === 'Completed Validation' || p.status === 'Scaled / Recommended').length,
    scaledSolutions: db.get('scaleEngineItems').length,
    totalProposals: db.get('proposals').length,
    auditEventCount: db.get('auditLogs').length
  });
});

export default router;
