import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'store.json');

// Helper to generate hash strings
function generateHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return '0x' + Math.abs(hash).toString(16).padStart(16, '0') + Math.abs(hash * 31).toString(16).padStart(16, '0');
}

const INITIAL_DATA = {
  users: [
    {
      id: 'u-1',
      name: 'Rajesh Verma',
      email: 'officer@mohua.gov.in',
      role: 'Government Officer',
      organization: 'Ministry of Housing & Urban Affairs',
      designation: 'Joint Secretary (Smart Cities)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 'u-2',
      name: 'Ananya Sharma',
      email: 'ananya@ecovision.ai',
      role: 'Startup',
      organization: 'EcoVision AI Technologies',
      designation: 'Co-Founder & CEO',
      startupId: 'st-1',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    {
      id: 'u-3',
      name: 'Dr. K. S. Ramanathan',
      email: 'evaluator@iisc.ac.in',
      role: 'Evaluator',
      organization: 'IISc Center for GovTech Evaluation',
      designation: 'Senior Technical Advisor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 'u-4',
      name: 'Dr. Meera Nambiar',
      email: 'validator@qci.org.in',
      role: 'Validator',
      organization: 'Quality Council of India (QCI)',
      designation: 'Chief Audit Officer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'
    },
    {
      id: 'u-5',
      name: 'Vikramaditya Das',
      email: 'admin@startupsetu.gov.in',
      role: 'Admin',
      organization: 'StartupSetu National Platform Admin',
      designation: 'Director of Platform Operations',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  ],

  departments: [
    { id: 'dept-1', name: 'Ministry of Housing & Urban Affairs', code: 'MoHUA', location: 'New Delhi' },
    { id: 'dept-2', name: 'Bhopal Smart City Development Corp', code: 'BSCDCL', location: 'Bhopal, MP' },
    { id: 'dept-3', name: 'Ministry of Jal Shakti', code: 'MoJS', location: 'New Delhi' },
    { id: 'dept-4', name: 'Ministry of Road Transport & Highways', code: 'MoRTH', location: 'New Delhi' },
    { id: 'dept-5', name: 'Karnataka Health & Family Welfare', code: 'KHFWS', location: 'Bengaluru, KA' }
  ],

  startups: [
    {
      id: 'st-1',
      name: 'EcoVision AI',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
      description: 'Computer vision and IoT solution for urban waste tracking, route optimization, and vehicle monitoring.',
      technology: 'Computer Vision, IoT Sensors, Edge AI, Route Optimization Algorithms',
      sector: 'Smart City',
      foundedYear: 2021,
      teamSize: 28,
      verified: true,
      dpiitRegistered: 'DPIIT-89412',
      location: 'Bengaluru, KA',
      deployments: 4,
      certifications: ['ISO 27001', 'CMMI Level 3', 'STQC Certified'],
      products: ['TrashCam Edge', 'RouteOptima Gov', 'BinSense Telemetry'],
      caseStudies: ['Indore Municipal Sanitation Smart Monitoring (2023)', 'Surat Waste Fleet AI Tracking'],
      pilotHistoryScore: 92,
      website: 'https://ecovision.ai'
    },
    {
      id: 'st-2',
      name: 'SmartTech Solutions',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
      description: 'Enterprise IoT tracking and GIS mapping platform for civic logistics and public transport fleet management.',
      technology: 'GPS Telematics, LoRaWAN, GIS Mapping, Predict Analytics',
      sector: 'IoT',
      foundedYear: 2020,
      teamSize: 45,
      verified: true,
      dpiitRegistered: 'DPIIT-67123',
      location: 'Pune, MH',
      deployments: 6,
      certifications: ['ISO 9001', 'CERT-In Security Cleared'],
      products: ['FleetPulse', 'CityGrid Telematics'],
      caseStudies: ['Pune Mahanagar Parivahan Route Efficiency Pilot'],
      pilotHistoryScore: 88,
      website: 'https://smarttechsol.co.in'
    },
    {
      id: 'st-3',
      name: 'UrbanSense',
      logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100',
      description: 'Acoustic and pressure IoT sensors for detecting water pipeline leaks, pressure drops, and non-revenue water loss.',
      technology: 'Acoustic Sensing, Edge Computing, Hydrodynamic AI Models',
      sector: 'CleanTech',
      foundedYear: 2022,
      teamSize: 18,
      verified: true,
      dpiitRegistered: 'DPIIT-99214',
      location: 'Hyderabad, TS',
      deployments: 2,
      certifications: ['ISO 14001', 'CE Certified Sensors'],
      products: ['AquaHydro Acoustic Bug', 'PipeWatch Cloud'],
      caseStudies: ['Hyderabad Metropolitan Water Supply NRW Reduction'],
      pilotHistoryScore: 85,
      website: 'https://urbansense.io'
    },
    {
      id: 'st-4',
      name: 'WasteX',
      logo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=100',
      description: 'Automated municipal solid waste weighing and RFID dump yard entry automation system.',
      technology: 'RFID, Automated Weighbridge Integration, Mobile Apps',
      sector: 'Smart City',
      foundedYear: 2019,
      teamSize: 32,
      verified: true,
      dpiitRegistered: 'DPIIT-41290',
      location: 'Ahmedabad, GJ',
      deployments: 5,
      certifications: ['BIS Compliant Hardware'],
      products: ['DumpGate RFID', 'WeightSync Engine'],
      caseStudies: ['Ahmedabad Municipal Corporation Waste Weighing'],
      pilotHistoryScore: 78,
      website: 'https://wastex.in'
    },
    {
      id: 'st-5',
      name: 'AquaCheck IoT',
      logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100',
      description: 'Sub-surface water quality monitoring and leak detection network with real-time contamination alerts.',
      technology: 'Multi-parameter Water Quality Sensors, Cellular IoT',
      sector: 'CleanTech',
      foundedYear: 2021,
      teamSize: 22,
      verified: true,
      dpiitRegistered: 'DPIIT-78119',
      location: 'Chennai, TN',
      deployments: 3,
      certifications: ['ISO 17025 Compliant'],
      products: ['AquaSense Pro', 'FlowGuard Telemetry'],
      caseStudies: ['Chennai Metro Water Quality Automation'],
      pilotHistoryScore: 86,
      website: 'https://aquacheck.co.in'
    },
    {
      id: 'st-6',
      name: 'HealthPulse Diagnostics',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100',
      description: 'Portable AI-powered diagnostic kits for rural primary health centers with offline sync capability.',
      technology: 'Point-of-Care Diagnostics, AI Image Analysis, Tele-consultation',
      sector: 'Healthcare',
      foundedYear: 2020,
      teamSize: 35,
      verified: true,
      dpiitRegistered: 'DPIIT-55210',
      location: 'Mysuru, KA',
      deployments: 4,
      certifications: ['CDSCO Approved', 'ISO 13485 Medical Device'],
      products: ['PulseBox Telehealth Kit', 'AI Diagnostic Scanner'],
      caseStudies: ['Rural Karnataka PHC Tele-screening Pilot'],
      pilotHistoryScore: 90,
      website: 'https://healthpulse.org.in'
    },
    {
      id: 'st-7',
      name: 'AgriSense Robotics',
      logo: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=100',
      description: 'Solar-powered automated drip irrigation controllers with soil moisture & micro-climate AI integration.',
      technology: 'Soil Moisture Sensors, Micro-climate Stations, LoRa Automation',
      sector: 'Agriculture',
      foundedYear: 2022,
      teamSize: 15,
      verified: true,
      dpiitRegistered: 'DPIIT-91024',
      location: 'Nagpur, MH',
      deployments: 2,
      certifications: ['IP67 Weatherproof Standard'],
      products: ['AgriFlow Valve Controller', 'MoistureGrid Sensor'],
      caseStudies: ['Vidarbha Micro-Irrigation Efficiency Trial'],
      pilotHistoryScore: 84,
      website: 'https://agrisense.tech'
    },
    {
      id: 'st-8',
      name: 'CyberGuard India',
      logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100',
      description: 'AI threat detection & zero-trust security monitoring for critical municipal & state government digital infrastructure.',
      technology: 'SIEM AI Engine, Network Anomaly Detection, Zero-Trust Architecture',
      sector: 'Cybersecurity',
      foundedYear: 2021,
      teamSize: 40,
      verified: true,
      dpiitRegistered: 'DPIIT-33901',
      location: 'New Delhi',
      deployments: 7,
      certifications: ['CERT-In Empanelled Auditor Partner', 'ISO 27001'],
      products: ['GovShield Threat Platform', 'Sentinel AI Guard'],
      caseStudies: ['State Data Center Vulnerability Shield'],
      pilotHistoryScore: 94,
      website: 'https://cyberguard.gov.in'
    }
  ],

  challenges: [
    {
      id: 'ch-1',
      title: 'Smart Waste Collection Vehicle Real-Time Monitoring & Route Compliance',
      departmentId: 'dept-2',
      departmentName: 'Bhopal Smart City Development Corp',
      location: 'Bhopal, Madhya Pradesh',
      sector: 'Smart City',
      budget: '₹ 15,000,000',
      budgetAmount: 15000000,
      pilotDuration: '6 Months',
      applicationDeadline: '2026-10-15',
      applicantCount: 4,
      status: 'Active Pilot',
      problemStatement: 'Our municipal corporation is facing major operational challenges with garbage collection vehicle monitoring. Vehicles frequently miss designated routes, bypass ward locations, and officers cannot monitor fuel usage or live positions in real time.',
      targetOutcome: 'Full real-time GPS & camera telemetry across 250 municipal sanitation vehicles, automated alert trigger when a vehicle strays > 100m from route, and public transparency dashboard.',
      technicalRequirements: 'Ruggedized IP67 IoT telemetry hardware, dual-camera video feeds for bin dumping verification, low-latency GIS dashboard, REST APIs for municipal integration.',
      expectedImpact: 'Decrease missed waste collection routes by 85%, reduce fuel consumption by 15%, and increase citizen satisfaction score to > 90%.',
      kpiTargets: [
        { metric: 'Route completion rate', target: '> 90%', benchmark: 90 },
        { metric: 'Vehicle tracking uptime', target: '> 95%', benchmark: 95 },
        { metric: 'Missed collection frequency', target: '< 10%', benchmark: 10 },
        { metric: 'Incident alert response time', target: '< 5 mins', benchmark: 5 }
      ],
      eligibilityCriteria: 'DPIIT-recognized startup, prior IoT/GIS software deployment in at least 1 Indian city, ISO 27001 certified data handling.',
      evaluationCriteria: 'Technical Capability (30%), Innovation (20%), Cost & ROI (15%), Scalability (15%), Team Experience (10%), Pilot Methodology (10%)',
      createdAt: '2026-08-01',
      publishedBy: 'Rajesh Verma'
    },
    {
      id: 'ch-2',
      title: 'Acoustic AI Leakage Detection & Non-Revenue Water Reduction in Urban Distribution Networks',
      departmentId: 'dept-3',
      departmentName: 'Ministry of Jal Shakti / Jal Jeevan Mission',
      location: 'Jaipur, Rajasthan',
      sector: 'CleanTech',
      budget: '₹ 25,000,000',
      budgetAmount: 25000000,
      pilotDuration: '9 Months',
      applicationDeadline: '2026-10-30',
      applicantCount: 5,
      status: 'Open for Proposals',
      problemStatement: 'Urban water distribution pipelines lose up to 38% of drinking water due to undetected underground leakages and pressure anomalies before water reaches end-user households.',
      targetOutcome: 'Non-invasive acoustic IoT sensor deployment on primary distribution mains, detecting leaks within 5 meters precision within 2 hours of pipe micro-fracture.',
      technicalRequirements: 'Battery-powered acoustic noise loggers (5-year lifespan), NB-IoT connectivity, machine learning transient pressure surge detection model.',
      expectedImpact: 'Save over 4.5 million liters of potable water daily, reduce energy cost by 18%, and lower municipal repair expenditures.',
      kpiTargets: [
        { metric: 'Leak detection accuracy', target: '> 92%', benchmark: 92 },
        { metric: 'Localization precision', target: '< 5 meters', benchmark: 5 },
        { metric: 'Non-revenue water loss reduction', target: '> 25%', benchmark: 25 },
        { metric: 'Mean time to alert', target: '< 120 mins', benchmark: 120 }
      ],
      eligibilityCriteria: 'Hardware & software IP owned by startup, proven field test in urban water utility.',
      evaluationCriteria: 'Technical Solution (30%), Innovation (20%), Cost (15%), Scalability (15%), Team (10%), Pilot Plan (10%)',
      createdAt: '2026-08-15',
      publishedBy: 'Rajesh Verma'
    },
    {
      id: 'ch-3',
      title: 'AI Signal Control & Adaptive Traffic Management for High-Density Corridors',
      departmentId: 'dept-4',
      departmentName: 'Ministry of Road Transport & Highways',
      location: 'Bengaluru, Karnataka',
      sector: 'AI/ML',
      budget: '₹ 30,000,000',
      budgetAmount: 30000000,
      pilotDuration: '6 Months',
      applicationDeadline: '2026-11-10',
      applicantCount: 3,
      status: 'Open for Proposals',
      problemStatement: 'Static pre-timed traffic signals cause severe congestion, emergency vehicle delays, and increased fuel emissions along major arterial urban highways.',
      targetOutcome: 'Adaptive AI traffic signal controllers adjusting green light timings dynamically based on real-time junction video queue length.',
      technicalRequirements: 'Edge AI camera processors, green-wave prioritization for emergency vehicles (ambulances/fire engines), cloud central command dashboard.',
      expectedImpact: 'Reduce average corridor travel time by 22%, reduce ambulance delay times by 40%, and cut vehicle idle emissions.',
      kpiTargets: [
        { metric: 'Peak hour travel time reduction', target: '> 20%', benchmark: 20 },
        { metric: 'Ambulance green-wave success rate', target: '> 98%', benchmark: 98 },
        { metric: 'Queue length measurement accuracy', target: '> 90%', benchmark: 90 },
        { metric: 'System controller uptime', target: '> 99.5%', benchmark: 99.5 }
      ],
      eligibilityCriteria: 'Proven AI vision model with Indian traffic vehicle mix handling (auto-rickshaws, two-wheelers, heavy vehicles).',
      evaluationCriteria: 'Technical Capability (30%), Innovation (20%), Cost (15%), Scalability (15%), Team (10%), Pilot Plan (10%)',
      createdAt: '2026-08-20',
      publishedBy: 'Rajesh Verma'
    },
    {
      id: 'ch-4',
      title: 'Offline-First Portable AI Screening Kits for Rural Primary Health Centers',
      departmentId: 'dept-5',
      departmentName: 'Karnataka Health & Family Welfare',
      location: 'Raichur & Yadgir, Karnataka',
      sector: 'Healthcare',
      budget: '₹ 18,000,000',
      budgetAmount: 18000000,
      pilotDuration: '6 Months',
      applicationDeadline: '2026-09-30',
      applicantCount: 2,
      status: 'Completed Validation',
      problemStatement: 'Primary Health Centers (PHCs) in remote rural districts lack specialist doctors, leading to delayed diagnosis of non-communicable diseases and maternal health complications.',
      targetOutcome: 'Deploy portable diagnostic kits capable of ECG, blood parameters, and screening for diabetic retinopathy with local AI triage and store-and-forward tele-consultation.',
      technicalRequirements: 'Battery-operated handheld unit, offline AI inference on Android tablets, CDSCO registered diagnostic sensors, integration with ABDM (Ayushman Bharat Digital Mission).',
      expectedImpact: 'Screen 50,000 rural residents, detect early stage risks in 12% of high-risk patients, and lower referral travel costs for villagers.',
      kpiTargets: [
        { metric: 'Diagnostic sensitivity vs lab gold standard', target: '> 90%', benchmark: 90 },
        { metric: 'Offline data synchronization reliability', target: '> 99%', benchmark: 99 },
        { metric: 'Patient screening turnaround time', target: '< 15 mins', benchmark: 15 },
        { metric: 'ABDM health record link rate', target: '> 95%', benchmark: 95 }
      ],
      eligibilityCriteria: 'CDSCO compliant medical device, native Indian language voice support.',
      evaluationCriteria: 'Technical Solution (30%), Clinical Accuracy (20%), Cost (15%), Scalability (15%), Team (10%), Pilot Plan (10%)',
      createdAt: '2026-06-10',
      publishedBy: 'Rajesh Verma'
    },
    {
      id: 'ch-5',
      title: 'Micro-Climate Precision Drip Irrigation & Soil Moisture Automation Network',
      departmentId: 'dept-1',
      departmentName: 'Ministry of Housing & Urban Affairs (Urban Farming & Horticulture)',
      location: 'Nagpur, Maharashtra',
      sector: 'Agriculture',
      budget: '₹ 12,000,000',
      budgetAmount: 12000000,
      pilotDuration: '4 Months',
      applicationDeadline: '2026-10-05',
      applicantCount: 3,
      status: 'Evaluation Phase',
      problemStatement: 'Municipal parks, urban forestry zones, and Peri-urban farms suffer from excessive water wastage due to manual flood irrigation without soil moisture feedback.',
      targetOutcome: 'Solar LoRaWAN automated valve controllers linked with ground moisture and weather forecast API to automate watering cycles.',
      technicalRequirements: 'Sub-surface soil moisture sensors at 15cm & 45cm depths, wireless solenoid actuators, solar power supply, cloud mobile app control.',
      expectedImpact: 'Reduce landscape irrigation water consumption by 35% and lower municipal electricity pumping costs.',
      kpiTargets: [
        { metric: 'Water usage efficiency improvement', target: '> 30%', benchmark: 30 },
        { metric: 'Sensor node uptime', target: '> 98%', benchmark: 98 },
        { metric: 'Automated irrigation cycle execution', target: '> 99%', benchmark: 99 },
        { metric: 'Energy consumption reduction', target: '> 20%', benchmark: 20 }
      ],
      eligibilityCriteria: 'DPIIT recognized, weather-hardened IP67 agricultural hardware.',
      evaluationCriteria: 'Technical (30%), Cost (20%), Energy Efficiency (15%), Scalability (15%), Team (10%), Plan (10%)',
      createdAt: '2026-07-18',
      publishedBy: 'Rajesh Verma'
    }
  ],

  proposals: [
    {
      id: 'prop-1',
      challengeId: 'ch-1',
      startupId: 'st-1',
      startupName: 'EcoVision AI',
      solutionTitle: 'EcoVision AI TrashCam & RouteOptima Gov Telematics Suite',
      proposedSolution: 'Integrated AI dual-camera vehicle telemetry hardware mounted on garbage compaction trucks coupled with RouteOptima Gov cloud engine for dynamic route enforcement, automated missed bin alerts, and fuel monitoring.',
      technicalApproach: 'Deploy 250 TrashCam Edge AI units with dual 1080p cameras running onboard MobileNet V3 models to verify bin emptying and check truck fill levels. Route tracking is updated every 3 seconds via 4G/GPS.',
      implementationPlan: 'Month 1: Hardware installation on 250 vehicles. Month 2: Route GIS mapping & driver onboard training. Months 3-5: Field testing & live telemetry. Month 6: Final evaluation & report.',
      teamDetails: 'Led by Ananya Sharma (Ex-ISRO Robotics Lead) and 8 senior IoT & Computer Vision engineers.',
      previousExperience: 'Deployed 120 units in Indore Smart City (achieved 94% route compliance) and 80 units in Surat Sanitation Fleet.',
      expectedOutcomes: '94% route completion, 97% GPS tracking uptime, missed collections reduced to 6%, fuel savings of 14.2%.',
      pilotPlan: 'Controlled pilot covering 4 municipal zones (Zones 3, 7, 11, 14) in Bhopal, serving 450,000 citizens.',
      budget: '₹ 14,200,000',
      timeline: '6 Months',
      supportingDocs: ['Technical_Architecture.pdf', 'STQC_Security_Certificate.pdf', 'Indore_Case_Study.pdf'],
      submittedAt: '2026-08-10',
      status: 'Pilot Running',
      matchScore: 94
    },
    {
      id: 'prop-2',
      challengeId: 'ch-1',
      startupId: 'st-2',
      startupName: 'SmartTech Solutions',
      solutionTitle: 'FleetPulse Civic IoT Route Compliance Engine',
      proposedSolution: 'Rugged GPS telematics loggers paired with driver tablet displays showing turn-by-turn route compliance indicators.',
      technicalApproach: 'Hardware OBD-II & GPS devices connected via cellular 4G to FleetPulse GIS cloud.',
      implementationPlan: 'Month 1: Fleet retrofit. Months 2-5: Live tracking. Month 6: Analytics report.',
      teamDetails: 'Team of 14 telematics engineers with 6 years experience in public transport management.',
      previousExperience: 'Tracked Pune public transport buses across 400 routes.',
      expectedOutcomes: '89% route compliance, 95% vehicle tracking uptime.',
      pilotPlan: 'Pilot across 2 municipal zones in Bhopal.',
      budget: '₹ 14,800,000',
      timeline: '6 Months',
      supportingDocs: ['FleetPulse_Spec.pdf', 'ISO_Cert.pdf'],
      submittedAt: '2026-08-12',
      status: 'Shortlisted',
      matchScore: 89
    },
    {
      id: 'prop-3',
      challengeId: 'ch-1',
      startupId: 'st-4',
      startupName: 'WasteX',
      solutionTitle: 'DumpGate RFID & WeighBridge Automated Log',
      proposedSolution: 'RFID bin tags and RFID gate scanners at waste transfer stations to record truck arrival times and net payload weights.',
      technicalApproach: 'Ultra-high frequency RFID readers installed at 12 transfer stations in Bhopal.',
      implementationPlan: 'Month 1: Hardware deployment. Months 2-6: Operations.',
      teamDetails: 'Team of 10 RFID hardware engineers.',
      previousExperience: 'Ahmedabad Municipal waste weighing automation.',
      expectedOutcomes: 'Accurate dump station logging, payload verification.',
      pilotPlan: 'Pilot across all 12 main waste transfer hubs.',
      budget: '₹ 12,500,000',
      timeline: '6 Months',
      supportingDocs: ['WasteX_Proposal.pdf'],
      submittedAt: '2026-08-14',
      status: 'Under Evaluation',
      matchScore: 78
    },
    {
      id: 'prop-4',
      challengeId: 'ch-4',
      startupId: 'st-6',
      startupName: 'HealthPulse Diagnostics',
      solutionTitle: 'PulseBox Telehealth & AI Diagnostic Screening Kit',
      proposedSolution: 'Portable diagnostic briefcase containing 12-lead ECG, blood glucose, hemoglobinometer, digital stethoscope, and offline AI screening app.',
      technicalApproach: 'Android app performing local ML triage for ECG arrhythmia and diabetic retinopathy images. Auto-syncs to Ayushman Bharat Digital Mission (ABDM) when internet reconnects.',
      implementationPlan: 'Month 1: Distribution of 30 PulseBox kits to Raichur PHCs. Months 2-5: Field screening. Month 6: Final clinical audit.',
      teamDetails: 'Co-founded by Dr. Rajesh Kumar (MBBS, AIIMS) and 12 medical hardware specialists.',
      previousExperience: 'Screened 35,000 patients in Mysore district rural PHCs.',
      expectedOutcomes: '93% diagnostic sensitivity, 99.4% offline sync reliability, 12 min screening duration.',
      pilotPlan: '30 PHCs in Raichur & Yadgir districts.',
      budget: '₹ 16,500,000',
      timeline: '6 Months',
      supportingDocs: ['CDSCO_License.pdf', 'Clinical_Validation_Report.pdf'],
      submittedAt: '2026-06-18',
      status: 'Completed',
      matchScore: 92
    },
    {
      id: 'prop-5',
      challengeId: 'ch-2',
      startupId: 'st-3',
      startupName: 'UrbanSense',
      solutionTitle: 'AquaHydro Acoustic Leak Detection Bug Network',
      proposedSolution: 'Sub-surface acoustic clamp-on sensors deployed on primary water feeder lines with AI transient pressure wave analysis.',
      technicalApproach: 'Deploy 150 acoustic bug sensors every 300 meters on Jaipur water pipeline grid.',
      implementationPlan: 'Months 1-2: Sensor clamping & calibration. Months 3-8: Continuous monitoring.',
      teamDetails: 'Hydrodynamics researchers and IoT hardware team from IIT Hyderabad.',
      previousExperience: 'Hydropolitan water supply NRW reduction pilot in Hyderabad.',
      expectedOutcomes: 'Detect leaks within 3 meters precision, save 4.8 million liters of water daily.',
      pilotPlan: 'Jaipur North Water Supply Zone.',
      budget: '₹ 22,800,000',
      timeline: '9 Months',
      supportingDocs: ['UrbanSense_Tech_Whitepaper.pdf'],
      submittedAt: '2026-08-25',
      status: 'Under Evaluation',
      matchScore: 88
    }
  ],

  evaluations: [
    {
      id: 'ev-1',
      proposalId: 'prop-1',
      evaluatorId: 'u-3',
      evaluatorName: 'Dr. K. S. Ramanathan',
      scores: {
        technicalSolution: 29, // max 30
        innovation: 19,        // max 20
        cost: 14,              // max 15
        scalability: 14,       // max 15
        teamCapability: 9,     // max 10
        pilotPlan: 9          // max 10
      },
      totalScore: 94,
      comments: 'Exceptional proposal with proven computer vision hardware and strong track record in Indore. Dual camera fill verification adds distinct value over plain GPS loggers. Highly recommended for pilot approval.',
      submittedAt: '2026-08-16'
    },
    {
      id: 'ev-2',
      proposalId: 'prop-4',
      evaluatorId: 'u-3',
      evaluatorName: 'Dr. K. S. Ramanathan',
      scores: {
        technicalSolution: 28,
        innovation: 18,
        cost: 14,
        scalability: 14,
        teamCapability: 9,
        pilotPlan: 9
      },
      totalScore: 92,
      comments: 'CDSCO certified hardware with excellent ABDM compliance. Passed clinical verification with flying colors.',
      submittedAt: '2026-06-25'
    }
  ],

  pilots: [
    {
      id: 'pil-1',
      pilotNumber: 'PIL-BHP-2026-01',
      challengeId: 'ch-1',
      challengeTitle: 'Smart Waste Collection Vehicle Real-Time Monitoring & Route Compliance',
      startupId: 'st-1',
      startupName: 'EcoVision AI',
      departmentName: 'Bhopal Smart City Development Corp',
      governmentOfficer: 'Rajesh Verma',
      startDate: '2026-08-20',
      endDate: '2027-02-20',
      budget: '₹ 14,200,000',
      status: 'Pilot Running',
      currentStageIndex: 3, // 0: Deployment, 1: Initial Testing, 2: Field Testing, 3: KPI Measurement, 4: Validation, 5: Final Review
      overallScore: 91,
      kpiAchievement: '94%',
      milestones: [
        { id: 'm-1', name: 'Hardware Deployment & Vehicle Retrofit (250 trucks)', status: 'Completed', paymentPercentage: 25, paymentAmount: '₹ 3,550,000', releaseDate: '2026-09-01', verifiedBy: 'Rajesh Verma' },
        { id: 'm-2', name: 'Initial Telemetry Testing & GIS Calibration', status: 'Completed', paymentPercentage: 25, paymentAmount: '₹ 3,550,000', releaseDate: '2026-09-15', verifiedBy: 'Dr. Meera Nambiar' },
        { id: 'm-3', name: '3-Month Controlled Field Testing & KPI Benchmark', status: 'In Progress', paymentPercentage: 30, paymentAmount: '₹ 4,260,000', releaseDate: 'Pending', verifiedBy: 'Pending' },
        { id: 'm-4', name: 'Independent Validation Sign-off & Final Report', status: 'Upcoming', paymentPercentage: 20, paymentAmount: '₹ 2,840,000', releaseDate: 'Pending', verifiedBy: 'Pending' }
      ]
    },
    {
      id: 'pil-2',
      pilotNumber: 'PIL-RCH-2026-04',
      challengeId: 'ch-4',
      challengeTitle: 'Offline-First Portable AI Screening Kits for Rural Primary Health Centers',
      startupId: 'st-6',
      startupName: 'HealthPulse Diagnostics',
      departmentName: 'Karnataka Health & Family Welfare',
      governmentOfficer: 'Rajesh Verma',
      startDate: '2026-07-01',
      endDate: '2026-12-31',
      budget: '₹ 16,500,000',
      status: 'Completed Validation',
      currentStageIndex: 5,
      overallScore: 94,
      kpiAchievement: '96%',
      milestones: [
        { id: 'm-21', name: 'Kit Distribution to 30 Rural PHCs', status: 'Completed', paymentPercentage: 30, paymentAmount: '₹ 4,950,000', releaseDate: '2026-07-10', verifiedBy: 'Rajesh Verma' },
        { id: 'm-22', name: 'Field Screening Phase (15,000 patients)', status: 'Completed', paymentPercentage: 30, paymentAmount: '₹ 4,950,000', releaseDate: '2026-08-15', verifiedBy: 'Dr. Meera Nambiar' },
        { id: 'm-23', name: 'ABDM Integration & Clinical Audit', status: 'Completed', paymentPercentage: 20, paymentAmount: '₹ 3,300,000', releaseDate: '2026-08-25', verifiedBy: 'Dr. Meera Nambiar' },
        { id: 'm-24', name: 'Independent Validation & Scale Recommendation', status: 'Completed', paymentPercentage: 20, paymentAmount: '₹ 3,300,000', releaseDate: '2026-09-01', verifiedBy: 'Dr. Meera Nambiar' }
      ]
    }
  ],

  kpis: [
    {
      id: 'kpi-1',
      pilotId: 'pil-1',
      metric: 'Route Completion Rate',
      target: 90,
      actual: 94.2,
      unit: '%',
      status: 'Exceeded',
      trend: [
        { day: 'Week 1', target: 90, actual: 82.0 },
        { day: 'Week 2', target: 90, actual: 86.5 },
        { day: 'Week 3', target: 90, actual: 89.1 },
        { day: 'Week 4', target: 90, actual: 91.8 },
        { day: 'Week 5', target: 90, actual: 93.4 },
        { day: 'Week 6', target: 90, actual: 94.2 }
      ]
    },
    {
      id: 'kpi-2',
      pilotId: 'pil-1',
      metric: 'Vehicle Tracking Telemetry Uptime',
      target: 95,
      actual: 97.8,
      unit: '%',
      status: 'Exceeded',
      trend: [
        { day: 'Week 1', target: 95, actual: 94.1 },
        { day: 'Week 2', target: 95, actual: 96.0 },
        { day: 'Week 3', target: 95, actual: 97.2 },
        { day: 'Week 4', target: 95, actual: 97.5 },
        { day: 'Week 5', target: 95, actual: 97.8 },
        { day: 'Week 6', target: 95, actual: 97.8 }
      ]
    },
    {
      id: 'kpi-3',
      pilotId: 'pil-1',
      metric: 'Missed Waste Collection Frequency',
      target: 10, // target is less than 10%
      actual: 5.8,
      unit: '%',
      status: 'Achieved',
      trend: [
        { day: 'Week 1', target: 10, actual: 14.5 },
        { day: 'Week 2', target: 10, actual: 11.2 },
        { day: 'Week 3', target: 10, actual: 8.7 },
        { day: 'Week 4', target: 10, actual: 7.1 },
        { day: 'Week 5', target: 10, actual: 6.2 },
        { day: 'Week 6', target: 10, actual: 5.8 }
      ]
    },
    {
      id: 'kpi-4',
      pilotId: 'pil-1',
      metric: 'Fuel Expense Reduction',
      target: 12,
      actual: 14.2,
      unit: '%',
      status: 'Exceeded',
      trend: [
        { day: 'Week 1', target: 12, actual: 4.0 },
        { day: 'Week 2', target: 12, actual: 8.5 },
        { day: 'Week 3', target: 12, actual: 11.0 },
        { day: 'Week 4', target: 12, actual: 12.8 },
        { day: 'Week 5', target: 12, actual: 13.9 },
        { day: 'Week 6', target: 12, actual: 14.2 }
      ]
    },
    {
      id: 'kpi-5',
      pilotId: 'pil-2',
      metric: 'Diagnostic Sensitivity vs Lab Benchmark',
      target: 90,
      actual: 93.6,
      unit: '%',
      status: 'Exceeded',
      trend: [
        { day: 'Month 1', target: 90, actual: 89.0 },
        { day: 'Month 2', target: 90, actual: 91.5 },
        { day: 'Month 3', target: 90, actual: 93.6 }
      ]
    }
  ],

  evidence: [
    {
      id: 'evid-1',
      pilotId: 'pil-1',
      title: 'Bhopal Municipal Sanitation Telemetry Log Stream',
      type: 'System Logs',
      filename: 'bhopal_sanitation_telemetry_raw_2026.json',
      filesize: '42.8 MB',
      uploadedBy: 'Ananya Sharma (EcoVision AI)',
      uploadedAt: '2026-09-02 14:32:00',
      status: 'Verified',
      hash: generateHash('bhopal_sanitation_telemetry_raw_2026.json-ecovision'),
      verificationNotes: 'Cryptographic hash validated against AWS IoT Core server logs. Zero data tampering detected.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    },
    {
      id: 'evid-2',
      pilotId: 'pil-1',
      title: 'Route Completion & GPS Waypoint Verification Audit Report',
      type: 'KPI Reports',
      filename: 'route_compliance_bhopal_q3.pdf',
      filesize: '8.4 MB',
      uploadedBy: 'Ananya Sharma (EcoVision AI)',
      uploadedAt: '2026-09-03 09:15:00',
      status: 'Verified',
      hash: generateHash('route_compliance_bhopal_q3.pdf'),
      verificationNotes: 'Sample audit of 50 vehicles verified over 14 consecutive shifts.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    },
    {
      id: 'evid-3',
      pilotId: 'pil-1',
      title: 'Independent Field Inspection & Bin Dumping Verification Dataset',
      type: 'Field Test Results',
      filename: 'bhopal_ward_field_inspection.xlsx',
      filesize: '14.1 MB',
      uploadedBy: 'Dr. Meera Nambiar (QCI Inspector)',
      uploadedAt: '2026-09-03 16:45:00',
      status: 'Verified',
      hash: generateHash('bhopal_ward_field_inspection.xlsx'),
      verificationNotes: 'Physical on-ground inspection confirmed camera AI bin fill accuracy at 96.4%.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    },
    {
      id: 'evid-4',
      pilotId: 'pil-2',
      title: 'Raichur Rural PHC Diagnostic Clinical Accuracy Audit Log',
      type: 'Validator Report',
      filename: 'raichur_phc_clinical_audit_final.pdf',
      filesize: '18.9 MB',
      uploadedBy: 'Dr. Meera Nambiar (QCI)',
      uploadedAt: '2026-08-30 11:20:00',
      status: 'Verified',
      hash: generateHash('raichur_phc_clinical_audit_final.pdf'),
      verificationNotes: 'Independent panel of 3 cardiologists cross-verified 500 ECG diagnostic triage readings.',
      validatorName: 'Dr. Meera Nambiar (QCI)'
    }
  ],

  validations: [
    {
      id: 'val-1',
      pilotId: 'pil-1',
      validatorId: 'u-4',
      validatorName: 'Dr. Meera Nambiar (QCI)',
      overallValidationStatus: 'Verified & Approved',
      kpiClaimsVerified: true,
      dataIntegrityVerified: true,
      fieldTestVerified: true,
      comments: 'All 4 KPI metrics claimed by EcoVision AI have been independently verified using raw server telemetry and physical municipal inspection. Route completion exceeds benchmark by +4.2%. System performance is robust, reliable, and audit-ready for government scale.',
      signedAt: '2026-09-03 17:30:00',
      digitalSignature: 'SIG-QCI-2026-889104-VAL'
    },
    {
      id: 'val-2',
      pilotId: 'pil-2',
      validatorId: 'u-4',
      validatorName: 'Dr. Meera Nambiar (QCI)',
      overallValidationStatus: 'Verified & Approved',
      kpiClaimsVerified: true,
      dataIntegrityVerified: true,
      fieldTestVerified: true,
      comments: '100% compliant with CDSCO regulations and ABDM health record interoperability. Screening sensitivity verified at 93.6%. Excellent performance in remote rural PHC conditions.',
      signedAt: '2026-09-01 10:00:00',
      digitalSignature: 'SIG-QCI-2026-551092-VAL'
    }
  ],

  scaleDecisions: [
    {
      id: 'dec-1',
      pilotId: 'pil-2',
      pilotNumber: 'PIL-RCH-2026-04',
      challengeTitle: 'Offline-First Portable AI Screening Kits for Rural Primary Health Centers',
      startupName: 'HealthPulse Diagnostics',
      departmentName: 'Karnataka Health & Family Welfare',
      overallPilotScore: 94,
      kpiAchievement: '96%',
      validationStatus: 'VALIDATED ✓',
      budget: '₹ 16,500,000',
      riskLevel: 'Low Risk',
      scalabilityScore: '95/100',
      citizenImpact: '50,000+ Rural Patients Screened',
      aiRecommendation: 'STRONG CANDIDATE FOR SCALE',
      aiRecommendationReasoning: 'Startup HealthPulse achieved 93.6% diagnostic sensitivity in 30 rural PHCs, exceeding the 90% target. Independent QCI audit verified 100% data integrity and CDSCO regulatory compliance. Estimated cost savings per rural screening is ₹ 450.',
      humanOfficerDecision: 'Recommended for Scale', // 'Recommended for Scale', 'Request More Evidence', 'Do Not Scale'
      officerComments: 'Approved by MoHUA / Health Advisory Panel for full rollout across 450 rural PHCs in Karnataka.',
      decidedBy: 'Rajesh Verma',
      decidedAt: '2026-09-02 14:00:00'
    }
  ],

  scaleEngineItems: [
    {
      id: 'scale-1',
      startupName: 'HealthPulse Diagnostics',
      solutionTitle: 'PulseBox Rural AI Tele-Diagnostic Kit',
      sector: 'Healthcare',
      pilotScore: '94%',
      kpiAchievement: '96%',
      validationStatus: 'Validated ✓',
      riskLevel: 'Low Risk',
      scaleRecommendation: 'Recommended ✓',
      originalDepartment: 'Karnataka Health & Family Welfare',
      adoptableBy: 'All State Health Departments & National Rural Health Mission',
      estimatedDeployTime: '30 Days',
      provenMetrics: '50,000+ Rural Screenings | 93.6% Accuracy | ABDM Sync'
    },
    {
      id: 'scale-2',
      startupName: 'EcoVision AI',
      solutionTitle: 'TrashCam Edge & RouteOptima Sanitation Fleet Management',
      sector: 'Smart City',
      pilotScore: '91%',
      kpiAchievement: '94%',
      validationStatus: 'Validated ✓',
      riskLevel: 'Low Risk',
      scaleRecommendation: 'Recommended ✓',
      originalDepartment: 'Bhopal Smart City Development Corp',
      adoptableBy: 'All Urban Local Bodies (ULBs) & Smart City SPVs',
      estimatedDeployTime: '45 Days',
      provenMetrics: '250 Vehicles Tracked | 94.2% Route Compliance | 14.2% Fuel Cut'
    }
  ],

  auditLogs: [
    {
      id: 'aud-1',
      timestamp: '2026-08-01 10:15:00',
      user: 'Rajesh Verma (Government Officer)',
      role: 'Government Officer',
      action: 'Challenge Created & Drafted',
      entity: 'Challenge #ch-1 (Smart Waste Collection)',
      hash: generateHash('aud-1-ch-1-create'),
      status: 'Recorded'
    },
    {
      id: 'aud-2',
      timestamp: '2026-08-01 11:30:00',
      user: 'Rajesh Verma (Government Officer)',
      role: 'Government Officer',
      action: 'Challenge Published to Public Marketplace',
      entity: 'Challenge #ch-1',
      hash: generateHash('aud-2-ch-1-publish'),
      status: 'Recorded'
    },
    {
      id: 'aud-3',
      timestamp: '2026-08-10 14:22:00',
      user: 'Ananya Sharma (Startup)',
      role: 'Startup',
      action: 'Proposal Submitted',
      entity: 'Proposal #prop-1 by EcoVision AI',
      hash: generateHash('aud-3-prop-1-submit'),
      status: 'Recorded'
    },
    {
      id: 'aud-4',
      timestamp: '2026-08-15 16:00:00',
      user: 'StartupSetu AI Engine',
      role: 'System / AI',
      action: 'AI Explainable Matching Calculation Executed',
      entity: 'Challenge #ch-1 (EcoVision Match Score: 94%)',
      hash: generateHash('aud-4-ai-match'),
      status: 'Recorded'
    },
    {
      id: 'aud-5',
      timestamp: '2026-08-16 11:00:00',
      user: 'Dr. K. S. Ramanathan (Evaluator)',
      role: 'Evaluator',
      action: 'Human Technical Evaluation Submitted (Score: 94/100)',
      entity: 'Proposal #prop-1 Evaluation',
      hash: generateHash('aud-5-eval-submit'),
      status: 'Recorded'
    },
    {
      id: 'aud-6',
      timestamp: '2026-08-20 09:30:00',
      user: 'Rajesh Verma (Government Officer)',
      role: 'Government Officer',
      action: 'Controlled Pilot Approved & Launched',
      entity: 'Pilot #pil-1 (PIL-BHP-2026-01)',
      hash: generateHash('aud-6-pilot-launch'),
      status: 'Recorded'
    },
    {
      id: 'aud-7',
      timestamp: '2026-09-02 14:32:00',
      user: 'Ananya Sharma (Startup)',
      role: 'Startup',
      action: 'KPI Telemetry Evidence Added',
      entity: 'Evidence #evid-1 (Bhopal Telemetry Stream)',
      hash: generateHash('aud-7-evid-add'),
      status: 'Recorded'
    },
    {
      id: 'aud-8',
      timestamp: '2026-09-03 17:30:00',
      user: 'Dr. Meera Nambiar (Validator)',
      role: 'Validator',
      action: 'Independent Validation Sign-off Granted',
      entity: 'Validation #val-1 for Pilot #pil-1',
      hash: generateHash('aud-8-val-approve'),
      status: 'Recorded'
    },
    {
      id: 'aud-9',
      timestamp: '2026-09-04 09:00:00',
      user: 'StartupSetu AI Engine',
      role: 'System / AI',
      action: 'Procurement Decision Pack Auto-Generated',
      entity: 'Decision Pack for Pilot #pil-2',
      hash: generateHash('aud-9-dec-pack'),
      status: 'Recorded'
    }
  ]
};

class Store {
  constructor() {
    this.data = this.load();
  }

  load() {
    if (fs.existsSync(DATA_FILE)) {
      try {
        const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        return { ...INITIAL_DATA, ...fileData };
      } catch (err) {
        console.error('Error loading store.json, re-initializing with seed data:', err);
      }
    }
    this.save(INITIAL_DATA);
    return INITIAL_DATA;
  }

  save(dataToSave) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave || this.data, null, 2));
  }

  get(collection) {
    return this.data[collection] || [];
  }

  getById(collection, id) {
    const list = this.get(collection);
    return list.find(item => item.id === id);
  }

  add(collection, item) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const newItem = { id: `${collection.substring(0, 3)}-${Date.now()}`, ...item };
    this.data[collection].unshift(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    const list = this.get(collection);
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[collection][index] = { ...this.data[collection][index], ...updates };
      this.save();
      return this.data[collection][index];
    }
    return null;
  }

  logAudit(user, role, action, entity) {
    const auditItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user,
      role,
      action,
      entity,
      hash: generateHash(`aud-${Date.now()}-${action}-${entity}`),
      status: 'Recorded'
    };
    this.data.auditLogs.unshift(auditItem);
    this.save();
    return auditItem;
  }
}

export const db = new Store();
