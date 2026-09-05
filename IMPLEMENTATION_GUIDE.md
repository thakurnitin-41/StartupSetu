# Dynamic Profile Implementation Guide

## 🎯 Quick Summary
Your app now has **user-specific profiles** instead of hardcoded data. When a user logs in with their email, they see their own startup profile.

---

## 📝 STEP 1: Replace App.jsx

**File:** `src/App.jsx`

### Key Changes:
```javascript
// Line ~285-287: BEFORE
case 'startups':
case 'startup-profile':
  return <StartupProfile onNavigate={setActiveTab} />;

// AFTER
case 'startups':
case 'startup-profile':
  return <StartupProfile currentUser={currentUser} startups={startups} onNavigate={setActiveTab} />;
```

### What was fixed:
1. ✅ `handleRoleChange()` now stores the **actual logged-in email**
2. ✅ Uses email from login form instead of hardcoded data
3. ✅ Passes `currentUser` to StartupProfile component
4. ✅ Extracts username from email (ananya → Ananya)

### How it works:
```javascript
// LOGIN: ananya@ecovision.ai
setCurrentUser({
  email: 'ananya@ecovision.ai',  // ✅ ACTUAL email from form
  originalEmail: 'ananya@ecovision.ai',  // ✅ For lookups
  // ... other data
});
```

---

## 📝 STEP 2: Replace StartupProfile.jsx

**File:** `src/pages/StartupProfile.jsx`

### Key Changes:
1. ✅ Added `STARTUP_DATABASE` object with email-to-profile mapping
2. ✅ Component now accepts `currentUser` prop
3. ✅ Fetches profile based on logged-in user's email
4. ✅ Shows helpful error if email not found

### Database Structure:
```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': {
    name: 'EcoVision AI',
    sector: 'Smart City',
    // ... other fields
  },
  'startup@startup.ai': {
    name: 'Generic Startup Inc',
    // ... other fields
  }
};
```

---

## 🔧 STEP 3: Add More Startup Profiles

### Option A: Add to STARTUP_DATABASE (Quick)
In `StartupProfile.jsx`, add new entries:

```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* ... existing */ },
  'your-email@yourcompany.com': {
    id: 'st-new',
    name: 'Your Startup Name',
    logo: 'https://images.unsplash.com/photo-...',
    description: 'Your description here',
    technology: 'Your tech stack',
    sector: 'Your sector',
    foundedYear: 2023,
    teamSize: 20,
    verified: true,
    dpiitRegistered: 'DPIIT-12345',
    location: 'Your City, State',
    deployments: 3,
    certifications: ['ISO 27001', 'Your Cert'],
    products: ['Product 1', 'Product 2'],
    caseStudies: ['Case 1', 'Case 2'],
    pilotHistoryScore: 90,
    website: 'https://yoursite.com'
  }
};
```

### Option B: Backend Integration (Recommended)
Create an API endpoint:

```javascript
// server/routes.js - Add new route
app.get('/api/startup/:email', (req, res) => {
  const email = req.params.email.toLowerCase();
  const startup = db.startups.find(s => s.email === email);
  if (startup) {
    res.json(startup);
  } else {
    res.status(404).json({ error: 'Startup not found' });
  }
});
```

Then update StartupProfile.jsx:
```javascript
useEffect(() => {
  if (currentUser && currentUser.originalEmail) {
    const userEmail = currentUser.originalEmail.toLowerCase();
    
    // Fetch from backend instead of hardcoded DB
    fetch(`/api/startup/${userEmail}`)
      .then(r => r.json())
      .then(data => setSt(data))
      .catch(err => setSt(null));
  }
  setLoading(false);
}, [currentUser]);
```

---

## 🧪 TESTING

### Test Case 1: Login with known email
1. Go to Login → Select "Startup"
2. Email: `ananya@ecovision.ai`
3. Password: `startup123`
4. Navigate to "Startup Profile"
5. ✅ Should see "EcoVision AI" profile

### Test Case 2: Login with unknown email
1. Go to Login → Select "Startup"
2. Email: `unknown@test.com`
3. Password: `startup123`
4. Navigate to "Startup Profile"
5. ✅ Should see "No Startup Profile Found" message
6. ✅ Should show test login emails for reference

### Test Case 3: Multiple users
1. Login as `ananya@ecovision.ai` → See EcoVision AI
2. Switch role to different startup user
3. Should see different startup profile

---

## 🚀 How Login Now Works

```
User enters email in LoginPage
        ↓
LoginPage calls: onLoginSuccess('Startup', 'ananya@ecovision.ai')
        ↓
App.jsx handleRoleChange() receives email
        ↓
setCurrentUser({
  email: 'ananya@ecovision.ai',      // ✅ ACTUAL email
  originalEmail: 'ananya@ecovision.ai',  // ✅ For DB lookups
  // ... other data
})
        ↓
User navigates to Startup Profile
        ↓
StartupProfile component mounts
        ↓
useEffect() triggers with currentUser
        ↓
Looks up email in STARTUP_DATABASE
        ↓
Renders correct startup profile
        ↓
✅ Shows EcoVision AI (not hardcoded data)
```

---

## 📊 Comparing OLD vs NEW

### OLD (Broken):
```javascript
// Always same data regardless of who logged in
const roleAvatars = {
  'Startup': { name: 'Ananya Sharma', email: 'ananya@ecovision.ai', ... }
};

// Every startup user sees EcoVision AI
<StartupProfile /> // No props, uses hardcoded data
```

### NEW (Fixed):
```javascript
// Uses actual login email
setCurrentUser({
  email: 'actual-user@company.com',  // From login form
  originalEmail: 'actual-user@company.com'  // For lookups
});

// StartupProfile finds user's startup profile
<StartupProfile currentUser={currentUser} startups={startups} />
// Looks up: STARTUP_DATABASE['actual-user@company.com']
```

---

## 🔐 Security Notes

1. ✅ Email-based lookup is OK for demo/MVP
2. ⚠️ Production: Use database with proper auth tokens
3. ⚠️ Never trust email alone - verify with backend
4. ✅ Current implementation is demo-safe

---

## 📋 Files to Update

| File | Changes |
|------|---------|
| `src/App.jsx` | Pass currentUser to StartupProfile |
| `src/pages/StartupProfile.jsx` | Make it dynamic + add DB |
| `src/pages/LoginPage.jsx` | ✅ No changes needed |
| `server/routes.js` | (Optional) Add API endpoint |

---

## ❓ FAQ

**Q: What if user email is not in database?**
A: Shows "No Startup Profile Found" with helpful test emails

**Q: Can I add more startups?**
A: Yes! Add to `STARTUP_DATABASE` object or create API endpoint

**Q: Does this work with existing code?**
A: Yes! It's backward compatible

**Q: How to persist data across page reloads?**
A: Add localStorage in App.jsx:
```javascript
useEffect(() => {
  const saved = localStorage.getItem('currentUser');
  if (saved) setCurrentUser(JSON.parse(saved));
}, []);

useEffect(() => {
  if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
}, [currentUser]);
```

---

## ✅ Done!

Your profile is now **DYNAMIC**! 🎉

Users see their actual startup profiles based on the email they login with, not hardcoded data.
