# Adding More Startup Profiles

## 📊 Current Startups in Database

```
1. ananya@ecovision.ai          → EcoVision AI
2. startup@startup.ai            → Generic Startup Inc
3. sample@techstartup.com        → TechStartup Labs
```

---

## ➕ How to Add More Startups

### Step 1: Decide on Email & Details
```
Email: your-founder@yourcompany.com
Name: Your Awesome Startup
Sector: AI/ML, Smart City, FinTech, etc.
Location: City, State
Founded: Year
Team Size: Number
```

### Step 2: Add to STARTUP_DATABASE
**File:** `src/pages/StartupProfile.jsx`

Find this section:
```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* ... */ },
  'startup@startup.ai': { /* ... */ },
  'sample@techstartup.com': { /* ... */ },
};
```

Add your new entry:
```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* ... */ },
  'startup@startup.ai': { /* ... */ },
  'sample@techstartup.com': { /* ... */ },
  'your-founder@yourcompany.com': {  // ← NEW ENTRY
    id: 'st-4',
    name: 'Your Startup Name',
    logo: 'https://images.unsplash.com/photo-YOUR-IMAGE?w=100',
    description: 'Brief description of what your startup does',
    technology: 'Your tech stack (e.g., React, Node.js, ML)',
    sector: 'Your sector',
    foundedYear: 2023,
    teamSize: 25,
    verified: true,
    dpiitRegistered: 'DPIIT-12345',
    location: 'City, State',
    deployments: 2,
    certifications: ['ISO 27001', 'Another Cert'],
    products: ['Product 1', 'Product 2', 'Product 3'],
    caseStudies: ['Case Study 1', 'Case Study 2'],
    pilotHistoryScore: 88,
    website: 'https://yourcompany.com'
  }
};
```

### Step 3: Update LoginPage (Optional)
If you want this email to be a selectable demo login in LoginPage.jsx:

Find the `userGroups` array around line 57 in LoginPage.jsx:
```javascript
{
  id: 'startup4',
  roleName: 'Startup',
  email: 'your-founder@yourcompany.com',  // ← YOUR EMAIL
  defaultPass: 'startup123',
  targetTab: 'startup-dashboard',
  // ... rest of config
}
```

---

## 🎨 Complete Example: Adding TechVision Analytics

### Before:
```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* ... */ },
  'startup@startup.ai': { /* ... */ },
  'sample@techstartup.com': { /* ... */ },
};
```

### After:
```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* ... */ },
  'startup@startup.ai': { /* ... */ },
  'sample@techstartup.com': { /* ... */ },
  
  // ✅ NEW STARTUP
  'admin@techvision.ai': {
    id: 'st-4',
    name: 'TechVision Analytics',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100',
    description: 'Real-time analytics platform for government data insights and predictive modeling.',
    technology: 'Python, TensorFlow, Kafka, PostgreSQL, Grafana',
    sector: 'Big Data & Analytics',
    foundedYear: 2022,
    teamSize: 32,
    verified: true,
    dpiitRegistered: 'DPIIT-89876',
    location: 'Hyderabad, TG',
    deployments: 5,
    certifications: ['ISO 27001', 'AWS Certified', 'BigQuery Certified'],
    products: ['DataCube Analytics', 'RealTime Dashboard', 'Predictive Engine'],
    caseStudies: ['Urban Traffic Optimization', 'Water Resource Management'],
    pilotHistoryScore: 94,
    website: 'https://techvision-analytics.ai'
  }
};
```

### Test Login:
```
Email: admin@techvision.ai
Password: startup123
Role: Startup
→ Should show TechVision Analytics profile ✅
```

---

## 📸 Using Real Images

### Unsplash Image URLs:
```
// Startup/Innovation related
https://images.unsplash.com/photo-1552664730-d307ca884978?w=100  // Tech product
https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100  // IoT/Hardware
https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100  // Analytics
https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=100  // AI
```

Or use company logos:
```
// Replace with actual URLs
'logo': 'https://your-company-logo-url.com/logo.png'
```

---

## 🗂️ Database Structure Reference

### Required Fields:
```javascript
{
  id: 'st-X',                    // Unique ID (st-1, st-2, etc)
  name: 'Company Name',          // Display name
  logo: 'https://...',           // Company logo URL
  description: 'What they do',   // Short description
  technology: 'Tech stack',      // Technologies used
  sector: 'Industry',            // Business sector
  foundedYear: 2023,             // Year founded
  teamSize: 20,                  // Number of employees
  verified: true,                // DPIIT verification status
  dpiitRegistered: 'DPIIT-XXXXX',// Registration ID
  location: 'City, State',       // Headquarters location
  deployments: 3,                // Number of cities with deployments
  certifications: ['ISO...'],    // List of certs
  products: ['Product 1'],       // List of products
  caseStudies: ['Case 1'],       // List of implementations
  pilotHistoryScore: 90,         // Score out of 100
  website: 'https://...'         // Company website
}
```

---

## 🚀 Advanced: Adding 10+ Startups

For demo purposes, copy-paste template:

```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* existing */ },
  
  // ✅ Startup #1
  'email1@startup1.com': {
    id: 'st-5',
    name: 'Startup 1',
    logo: 'https://images.unsplash.com/photo-X?w=100',
    description: 'Description',
    technology: 'Tech',
    sector: 'Sector',
    foundedYear: 2023,
    teamSize: 20,
    verified: true,
    dpiitRegistered: 'DPIIT-99901',
    location: 'City1, ST',
    deployments: 2,
    certifications: ['ISO 27001'],
    products: ['Product1'],
    caseStudies: ['Case1'],
    pilotHistoryScore: 85,
    website: 'https://startup1.com'
  },
  
  // ✅ Startup #2
  'email2@startup2.com': {
    id: 'st-6',
    // ... copy structure above, change values
  },
  
  // ✅ Startup #3
  'email3@startup3.com': {
    id: 'st-7',
    // ... copy structure
  }
};
```

---

## 🔐 Password Notes

All startup logins use same default password from LoginPage.jsx:
```javascript
defaultPass: 'startup123'
```

In LoginPage.jsx, line 81:
```javascript
{
  id: 'startup',
  roleName: 'Startup',
  email: 'ananya@ecovision.ai',
  defaultPass: 'startup123',  // ← Same for all startups
  // ...
}
```

---

## ✅ Verification Checklist

After adding a new startup:

```javascript
☐ Added email→profile in STARTUP_DATABASE
☐ Used unique id (st-5, st-6, etc)
☐ Filled all required fields
☐ Logo URL is valid (use Unsplash or own)
☐ dpiitRegistered format matches (DPIIT-XXXXX)
☐ pilotHistoryScore is 0-100
☐ Arrays (certifications, products, caseStudies) are filled
☐ Test login with new email
☐ Verify profile displays correctly
☐ Test switching between different users
```

---

## 🎯 Test Scenario: 3 Different Startups

```javascript
// LoginPage shows these options:
// 1. EcoVision AI (ananya@ecovision.ai) → EcoVision profile ✅
// 2. TechVision Analytics (admin@techvision.ai) → TechVision profile ✅
// 3. DataFlow Systems (ceo@dataflow.io) → DataFlow profile ✅

// Login as #1 → See EcoVision profile
// Switch role → Login as #2 → See TechVision profile
// Switch role → Login as #3 → See DataFlow profile
```

---

## 💡 Tips

- **Logo URLs:** Use Unsplash (free) or company's actual logo
- **Descriptions:** Make them 1-2 sentences, professional
- **Technology:** List actual tech stack separated by commas
- **Score:** Be realistic (80-95 range is good)
- **Test emails:** Make them look professional
- **Location:** Use real Indian cities for authenticity

---

## 🚀 Next Step: Backend Integration

For production, instead of hardcoding, create API:

```javascript
// server/routes.js
app.get('/api/startup/:email', (req, res) => {
  const email = req.params.email.toLowerCase();
  // Query database for startup
  const startup = db.query(`SELECT * FROM startups WHERE email = ?`, [email]);
  res.json(startup);
});
```

Then in StartupProfile.jsx:
```javascript
useEffect(() => {
  fetch(`/api/startup/${currentUser.originalEmail}`)
    .then(r => r.json())
    .then(setSt);
}, [currentUser]);
```

---

## 📚 Done!

You now know how to:
✅ Add new startup profiles  
✅ Make them appear in login  
✅ Have different profiles for different users  
✅ Scale to production backend
