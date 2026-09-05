import mockSeedData from './mockData.json';

const STORAGE_KEY = 'startupsetu_db_v1';

function getLocalStore() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }
  } catch (e) {
    console.warn('LocalStorage unavailable, using in-memory store:', e);
  }
  const cloned = JSON.parse(JSON.stringify(mockSeedData));
  saveLocalStore(cloned);
  return cloned;
}

function saveLocalStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function logLocalAudit(store, user, role, action, entity) {
  const hash = '0x' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
  const newLog = {
    id: `aud-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    user: user || 'Official User',
    role: role || 'Government Officer',
    action,
    entity,
    hash,
    status: 'Recorded & Sealed'
  };
  store.auditLogs = [newLog, ...(store.auditLogs || [])];
  return newLog;
}

// Client-side AI Challenge Builder fallback for static deployments
export function clientGenerateStructuredChallenge(problemStatement) {
  const text = (problemStatement || '').toLowerCase();
  let title = 'AI-Assisted Municipal Operational Solution';
  let sector = 'Smart City';
  let budget = '₹ 15,000,000';
  let budgetAmount = 15000000;
  let duration = '6 Months';

  let kpis = [
    { metric: 'Target outcome achievement', target: '> 90%', benchmark: 90 },
    { metric: 'System telemetry uptime', target: '> 95%', benchmark: 95 },
    { metric: 'Operational delay reduction', target: '< 10%', benchmark: 10 },
    { metric: 'Incident response time', target: '< 5 mins', benchmark: 5 }
  ];

  if (text.includes('garbage') || text.includes('waste') || text.includes('vehicle') || text.includes('trash')) {
    title = 'Smart Waste Collection Vehicle Real-Time Monitoring & Route Compliance';
    sector = 'Smart City';
    budget = '₹ 15,000,000';
    budgetAmount = 15000000;
    duration = '6 Months';
    kpis = [
      { metric: 'Route completion rate', target: '> 90%', benchmark: 90 },
      { metric: 'Vehicle tracking telemetry uptime', target: '> 95%', benchmark: 95 },
      { metric: 'Missed waste collection frequency', target: '< 10%', benchmark: 10 },
      { metric: 'Incident alert response time', target: '< 5 mins', benchmark: 5 }
    ];
  } else if (text.includes('water') || text.includes('leak') || text.includes('pipe') || text.includes('hydro')) {
    title = 'Acoustic AI Leakage Detection & Non-Revenue Water Reduction in Urban Networks';
    sector = 'CleanTech';
    budget = '₹ 25,000,000';
    budgetAmount = 25000000;
    duration = '9 Months';
    kpis = [
      { metric: 'Leak detection accuracy', target: '> 92%', benchmark: 92 },
      { metric: 'Localization precision', target: '< 5 meters', benchmark: 5 },
      { metric: 'Non-revenue water loss reduction', target: '> 25%', benchmark: 25 },
      { metric: 'Mean time to alert', target: '< 120 mins', benchmark: 120 }
    ];
  } else if (text.includes('traffic') || text.includes('signal') || text.includes('road') || text.includes('vehicle count')) {
    title = 'AI Signal Control & Adaptive Traffic Management for High-Density Corridors';
    sector = 'AI/ML';
    budget = '₹ 30,000,000';
    budgetAmount = 30000000;
    duration = '6 Months';
    kpis = [
      { metric: 'Peak hour travel time reduction', target: '> 20%', benchmark: 20 },
      { metric: 'Ambulance green-wave success rate', target: '> 98%', benchmark: 98 },
      { metric: 'Queue length measurement accuracy', target: '> 90%', benchmark: 90 },
      { metric: 'System controller uptime', target: '> 99.5%', benchmark: 99.5 }
    ];
  } else if (text.includes('health') || text.includes('patient') || text.includes('phc') || text.includes('hospital')) {
    title = 'Offline-First Portable AI Screening Kits for Rural Primary Health Centers';
    sector = 'Healthcare';
    budget = '₹ 18,000,000';
    budgetAmount = 18000000;
    duration = '6 Months';
    kpis = [
      { metric: 'Diagnostic sensitivity vs lab gold standard', target: '> 90%', benchmark: 90 },
      { metric: 'Offline data synchronization reliability', target: '> 99%', benchmark: 99 },
      { metric: 'Patient screening turnaround time', target: '< 15 mins', benchmark: 15 },
      { metric: 'ABDM health record link rate', target: '> 95%', benchmark: 95 }
    ];
  } else if (text.includes('agri') || text.includes('farm') || text.includes('crop') || text.includes('irrigation')) {
    title = 'Micro-Climate Precision Drip Irrigation & Soil Moisture Automation Network';
    sector = 'Agriculture';
    budget = '₹ 12,000,000';
    budgetAmount = 12000000;
    duration = '4 Months';
    kpis = [
      { metric: 'Water usage efficiency improvement', target: '> 30%', benchmark: 30 },
      { metric: 'Sensor node uptime', target: '> 98%', benchmark: 98 },
      { metric: 'Automated irrigation cycle execution', target: '> 99%', benchmark: 99 },
      { metric: 'Energy consumption reduction', target: '> 20%', benchmark: 20 }
    ];
  }

  return {
    title,
    sector,
    budget,
    budgetAmount,
    pilotDuration: duration,
    problemStatement,
    targetOutcome: `Structured automated AI deployment addressing the operational bottlenecks described in: "${problemStatement}". Target is achieving zero unmonitored anomalies and 95%+ telemetry uptime.`,
    technicalRequirements: 'Low-power IoT hardware, Edge AI inference processing, cloud dashboard with REST API integration, ISO 27001 data compliance, and mobile app alerts for department officers.',
    expectedImpact: 'Reduce operational inefficiencies by up to 30%, increase citizen satisfaction to > 90%, and create an audit-ready digital paper trail for procurement verification.',
    suggestedKPIs: kpis,
    eligibilityCriteria: 'DPIIT recognized startup, prior field deployment experience, capability to execute controlled pilot within specified timeline.',
    evaluationCriteria: 'Technical Capability (30%), Innovation (20%), Cost & ROI (15%), Scalability (15%), Team Experience (10%), Pilot Methodology (10%)'
  };
}

// Client-side Startup Matching fallback for static deployments
export function clientMatchStartupsForChallenge(challenge, startups) {
  return (startups || []).map(startup => {
    let score = 50;
    const explanations = [];

    const techFit = startup.sector === challenge.sector ? 28 : (challenge.title.toLowerCase().includes(startup.sector.toLowerCase()) ? 24 : 18);
    score += (techFit - 20);
    if (techFit > 22) explanations.push(`Domain Alignment: Strong sector synergy in ${startup.sector}`);

    const innovation = (startup.certifications && startup.certifications.length >= 2) ? 19 : 15;
    score += (innovation - 15);
    if (innovation > 16) explanations.push(`Compliance: Verified certifications (${(startup.certifications || []).join(', ')})`);

    const costFit = 14;
    score += 2;

    const scalability = (startup.deployments && startup.deployments >= 3) ? 14 : 10;
    score += (scalability - 10);
    if (scalability > 12) explanations.push(`Proven Track Record: Deployed in ${startup.deployments} Indian cities`);

    const teamCapability = (startup.teamSize && startup.teamSize >= 20) ? 9 : 7;
    const pilotPlan = 9;

    const matchScore = Math.min(Math.max(techFit + innovation + costFit + scalability + teamCapability + pilotPlan, 65), 98);

    return {
      startupId: startup.id,
      startupName: startup.name,
      logo: startup.logo,
      sector: startup.sector,
      location: startup.location,
      dpiitRegistered: startup.dpiitRegistered,
      matchScore,
      scoringBreakdown: {
        technicalFit: techFit,
        innovation,
        cost: costFit,
        scalability,
        teamCapability,
        pilotPlan
      },
      explanations
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// Safe Universal Fetch with Automatic Static Mock Fallback
async function safeFetch(url, options = {}, fallbackGetter) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Network error or offline / static host
  }
  return fallbackGetter();
}

export const api = {
  async getInitialData() {
    const store = getLocalStore();
    const [challenges, startups, proposals, pilots, kpis, evidence, auditLogs, scaleItems] = await Promise.all([
      safeFetch('/api/challenges', {}, () => store.challenges || []),
      safeFetch('/api/startups', {}, () => store.startups || []),
      safeFetch('/api/proposals', {}, () => store.proposals || []),
      safeFetch('/api/pilots', {}, () => store.pilots || []),
      safeFetch('/api/kpis', {}, () => store.kpis || []),
      safeFetch('/api/evidence', {}, () => store.evidence || []),
      safeFetch('/api/audit-logs', {}, () => store.auditLogs || []),
      safeFetch('/api/scale-engine', {}, () => store.scaleEngineItems || [])
    ]);

    return {
      challenges,
      startups,
      proposals,
      pilots,
      kpis,
      evidence,
      auditLogs,
      scaleItems
    };
  },

  async publishChallenge(newChallengeData) {
    return safeFetch('/api/challenges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newChallengeData)
    }, () => {
      const store = getLocalStore();
      const newChallenge = {
        ...newChallengeData,
        id: `ch-${Date.now()}`,
        status: 'Open for Proposals',
        applicantCount: 0,
        createdAt: new Date().toISOString().substring(0, 10)
      };
      store.challenges = [newChallenge, ...(store.challenges || [])];
      logLocalAudit(store, newChallengeData.publishedBy || 'Government Officer', 'Government Officer', 'Challenge Created & Published', `Challenge: ${newChallenge.title}`);
      saveLocalStore(store);
      return newChallenge;
    });
  },

  async generateAIChallenge(problemStatement) {
    return safeFetch('/api/ai/generate-challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemStatement })
    }, () => {
      return clientGenerateStructuredChallenge(problemStatement);
    });
  },

  async matchStartups(challengeId) {
    return safeFetch('/api/ai/match-startups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeId })
    }, () => {
      const store = getLocalStore();
      const challenge = (store.challenges || []).find(c => c.id === challengeId) || (store.challenges || [])[0];
      const matches = clientMatchStartupsForChallenge(challenge, store.startups || []);
      logLocalAudit(store, 'StartupSetu AI Engine', 'System / AI', 'AI Startup Matching Executed', `Matched ${matches.length} startups for Challenge #${challengeId}`);
      saveLocalStore(store);
      return { challenge, matches };
    });
  },

  async submitProposal(proposalData) {
    return safeFetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proposalData)
    }, () => {
      const store = getLocalStore();
      const newProposal = {
        ...proposalData,
        id: `prop-${Date.now()}`,
        status: 'Submitted',
        submittedAt: new Date().toISOString().substring(0, 10)
      };
      store.proposals = [newProposal, ...(store.proposals || [])];
      
      // Update challenge applicant count
      store.challenges = (store.challenges || []).map(c => 
        c.id === proposalData.challengeId ? { ...c, applicantCount: (c.applicantCount || 0) + 1 } : c
      );

      logLocalAudit(store, proposalData.startupName || 'Startup Founder', 'Startup', 'Proposal Submitted', `Proposal #${newProposal.id} for Challenge #${proposalData.challengeId}`);
      saveLocalStore(store);
      return newProposal;
    });
  },

  async submitEvaluation(evalData) {
    return safeFetch('/api/evaluations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evalData)
    }, () => {
      const store = getLocalStore();
      const newEval = {
        ...evalData,
        id: `eval-${Date.now()}`,
        submittedAt: new Date().toISOString().substring(0, 10)
      };
      store.evaluations = [newEval, ...(store.evaluations || [])];
      logLocalAudit(store, evalData.evaluatorName || 'Dr. K. S. Ramanathan', 'Evaluator', 'Proposal Evaluated', `Evaluation Score: ${evalData.totalScore}/100`);
      saveLocalStore(store);
      return newEval;
    });
  },

  async updateEvidence(evidenceId, updateData) {
    return safeFetch(`/api/evidence/${evidenceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    }, () => {
      const store = getLocalStore();
      store.evidence = (store.evidence || []).map(e => 
        e.id === evidenceId ? { ...e, ...updateData } : e
      );
      logLocalAudit(store, updateData.validatorName || 'Validator', 'Validator', `Evidence Verification ${updateData.status}`, `Evidence #${evidenceId} status updated to ${updateData.status}`);
      saveLocalStore(store);
      return store.evidence.find(e => e.id === evidenceId);
    });
  },

  async signOffValidation(valData) {
    return safeFetch('/api/validations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(valData)
    }, () => {
      const store = getLocalStore();
      const newVal = {
        ...valData,
        id: `val-${Date.now()}`,
        signedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        digitalSignature: `SIG-QCI-${Date.now().toString().slice(-6)}-VAL`
      };
      store.validations = [newVal, ...(store.validations || [])];

      if (valData.pilotId) {
        store.pilots = (store.pilots || []).map(p => 
          p.id === valData.pilotId ? { ...p, status: 'Completed Validation', currentStageIndex: 5 } : p
        );
      }

      logLocalAudit(store, valData.validatorName || 'Dr. Meera Nambiar', 'Validator', 'Independent Validation Sign-Off Granted', `Validation Signed for Pilot #${valData.pilotId}`);
      saveLocalStore(store);
      return newVal;
    });
  },

  async executeDecision(decisionData) {
    return safeFetch('/api/decisions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decisionData)
    }, () => {
      const store = getLocalStore();
      const newDecision = {
        ...decisionData,
        id: `dec-${Date.now()}`,
        decidedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      store.scaleDecisions = [newDecision, ...(store.scaleDecisions || [])];

      if (decisionData.humanOfficerDecision === 'Recommended for Scale') {
        store.pilots = (store.pilots || []).map(p => 
          p.id === decisionData.pilotId ? { ...p, status: 'Scaled / Recommended' } : p
        );

        store.scaleEngineItems = store.scaleEngineItems || [];
        if (!store.scaleEngineItems.some(i => i.startupName === decisionData.startupName)) {
          store.scaleEngineItems.push({
            id: `scale-${Date.now()}`,
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

      logLocalAudit(store, decisionData.decidedBy || 'Government Officer', 'Government Officer', `Procurement Decision Executed: ${decisionData.humanOfficerDecision}`, `Pilot #${decisionData.pilotId}`);
      saveLocalStore(store);
      return newDecision;
    });
  },

  async releaseMilestone(pilotId, milestoneId, verifiedBy) {
    return safeFetch(`/api/pilots/${pilotId}/milestones/${milestoneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed', verifiedBy })
    }, () => {
      const store = getLocalStore();
      store.pilots = (store.pilots || []).map(p => {
        if (p.id === pilotId) {
          const updatedMilestones = (p.milestones || []).map(m => 
            m.id === milestoneId ? { ...m, status: 'Completed', verifiedBy, releaseDate: new Date().toISOString().substring(0, 10) } : m
          );
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      });

      logLocalAudit(store, verifiedBy || 'Government Officer', 'Government Officer', 'Pilot Milestone Released', `Milestone ${milestoneId} payout authorized for Pilot #${pilotId}`);
      saveLocalStore(store);
      return store.pilots.find(p => p.id === pilotId);
    });
  }
};
