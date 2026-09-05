# Architecture: Before vs After

## ❌ BEFORE (Broken)

```
┌─────────────────────────────────────────────────────────────┐
│                      LOGIN PAGE                              │
│  Email: ananya@ecovision.ai                                 │
│  Password: ****                                              │
│  [LOGIN]                                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              App.jsx: handleRoleChange()                     │
│                                                              │
│  const roleAvatars = {                                      │
│    'Startup': {                                             │
│      name: 'Ananya Sharma',    ← HARDCODED                  │
│      email: 'ananya@ecovision.ai'  ← HARDCODED             │
│      org: '...'  ← HARDCODED                                │
│    }                                                         │
│  };                                                          │
│                                                              │
│  setCurrentUser({ ...hardcoded data })                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           StartupProfile.jsx (receives: onNavigate)          │
│                                                              │
│  const st = startup || {                                    │
│    id: 'st-1',                                              │
│    name: 'EcoVision AI',  ← HARDCODED                       │
│    description: '...',   ← HARDCODED                        │
│    // ... all hardcoded data                                │
│  };                                                          │
│                                                              │
│  return (Display EcoVision AI)  ← ALWAYS SAME               │
└─────────────────────────────────────────────────────────────┘

PROBLEM:
┌────────────────────────────────────────┐
│ User 1 (ananya@ecovision.ai)          │ → See EcoVision AI
│ User 2 (different@company.com)        │ → See EcoVision AI  ❌
│ User 3 (another@startup.io)           │ → See EcoVision AI  ❌
└────────────────────────────────────────┘

All users see the SAME profile!
```

---

## ✅ AFTER (Fixed)

```
┌─────────────────────────────────────────────────────────────┐
│                      LOGIN PAGE                              │
│  Email: ananya@ecovision.ai                                 │
│  Password: ****                                              │
│  [LOGIN]                                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              App.jsx: handleRoleChange()                     │
│                                                              │
│  const roleAvatars = {                                      │
│    'Startup': {                                             │
│      defaultName: 'Startup Rep',  ← GENERIC                │
│      defaultEmail: 'default@...'  ← GENERIC                │
│      defaultOrg: '...'  ← GENERIC                           │
│    }                                                         │
│  };                                                          │
│                                                              │
│  ✅ USE PROVIDED EMAIL:                                     │
│  const userEmail = email || details.defaultEmail;           │
│                                                              │
│  setCurrentUser({                                            │
│    email: 'ananya@ecovision.ai',  ← FROM LOGIN FORM        │
│    originalEmail: 'ananya@ecovision.ai',  ← FOR LOOKUPS    │
│    name: nameFromEmail,  ← EXTRACTED                        │
│  })                                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│    StartupProfile.jsx (receives: currentUser, startups)      │
│                                                              │
│  const STARTUP_DATABASE = {                                 │
│    'ananya@ecovision.ai': { ... EcoVision profile ... },    │
│    'startup@startup.ai': { ... Different startup ... },    │
│    'sample@techstartup.com': { ... Another startup ... }   │
│  };                                                          │
│                                                              │
│  useEffect(() => {                                           │
│    if (currentUser?.originalEmail) {                         │
│      const email = currentUser.originalEmail;               │
│      const startup = STARTUP_DATABASE[email];  ← LOOKUP     │
│      setSt(startup);  ← DYNAMIC                             │
│    }                                                         │
│  }, [currentUser]);                                          │
│                                                              │
│  return (Display st) ← Different for each user              │
└─────────────────────────────────────────────────────────────┘

SOLUTION:
┌────────────────────────────────────────┐
│ User 1 (ananya@ecovision.ai)          │ → Look up email → See EcoVision AI ✅
│ User 2 (startup@startup.ai)           │ → Look up email → See Generic Startup ✅
│ User 3 (sample@techstartup.com)       │ → Look up email → See TechStartup Labs ✅
└────────────────────────────────────────┘

Each user sees THEIR OWN profile!
```

---

## 🔄 Data Flow Comparison

### Before (Hardcoded):
```
LOGIN EMAIL → IGNORED
             ↓
          HARDCODED DATA
             ↓
          SAME PROFILE (EcoVision AI)
             ↓
          DISPLAY
```

### After (Dynamic):
```
LOGIN EMAIL → STORED IN currentUser.originalEmail
             ↓
          LOOKUP in STARTUP_DATABASE
             ↓
          MATCHED STARTUP DATA
             ↓
          UNIQUE PROFILE (matches user)
             ↓
          DISPLAY
```

---

## 📊 Component Communication

### Before:
```
LoginPage
    ↓ (email captured but not used)
App.jsx 
    ↓ (ignores email)
StartupProfile
    ↓ (no currentUser prop)
    ↓ (uses hardcoded data)
    → Display: Always "EcoVision AI"
```

### After:
```
LoginPage
    ↓ (email passed to App)
App.jsx 
    ↓ (stores email in currentUser)
    ↓ (passes currentUser to StartupProfile)
StartupProfile
    ↓ (receives currentUser prop)
    ↓ (looks up email in database)
    ↓ (finds user's startup profile)
    → Display: User's actual startup profile
```

---

## 🎯 State Management Flow

### Before:
```javascript
// No email tracking
currentUser = {
  role: 'Startup',
  name: 'Ananya Sharma',      // Hardcoded
  email: 'ananya@ecovision.ai', // Hardcoded
  organization: '...',          // Hardcoded
}

// StartupProfile doesn't get currentUser
<StartupProfile onNavigate={...} />  // ❌ Empty
```

### After:
```javascript
// Email from form is tracked
currentUser = {
  role: 'Startup',
  name: 'Ananya',                    // From email
  email: 'ananya@ecovision.ai',      // From form
  originalEmail: 'ananya@ecovision.ai', // For lookups
  organization: '...',                // Generic
}

// StartupProfile gets currentUser
<StartupProfile currentUser={currentUser} startups={startups} />  // ✅ User data passed
```

---

## 🗄️ Startup Database Schema

### Simple (In-Memory):
```javascript
STARTUP_DATABASE = {
  'email@domain.com': {
    id: 'st-X',
    name: 'Startup Name',
    logo: 'url',
    description: 'desc',
    // ... more fields
  },
  'another@email.com': {
    // ... different startup
  }
}
```

### Advanced (Backend API):
```
┌──────────────────────────────┐
│   Frontend (React)            │
├──────────────────────────────┤
│  currentUser.originalEmail    │
│  = 'ananya@ecovision.ai'     │
└──────────┬───────────────────┘
           │ GET /api/startup/ananya@ecovision.ai
           ↓
┌──────────────────────────────┐
│   Backend (Node/Express)      │
├──────────────────────────────┤
│  Database Lookup:             │
│  SELECT * FROM startups       │
│  WHERE email = '...'          │
└──────────┬───────────────────┘
           │ JSON response
           ↓
┌──────────────────────────────┐
│  StartupProfile Component     │
├──────────────────────────────┤
│  setState(startupData)        │
│  Render user's profile        │
└──────────────────────────────┘
```

---

## 🔐 Security Improvement

### Before:
```
Anyone can change their name/org after login
(all data is generic anyway)
```

### After:
```
Email is the source of truth
Lookup is immutable database
More secure for production
```

---

## 📈 Scalability Path

```
Phase 1 (Now): STARTUP_DATABASE object in component
                ↓
                Quick, works for <10 startups
                
Phase 2 (Soon): Backend API endpoint
                ↓
                Fetch from database
                ↓
                Works for 100+ startups
                
Phase 3 (Future): Full backend integration
                  ↓
                  User management system
                  ↓
                  Audit logs
                  ↓
                  Production-ready
```

---

## ✅ Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Email Used?** | No ❌ | Yes ✅ |
| **Data Source** | Hardcoded ❌ | Database ✅ |
| **Profile Type** | Same for all ❌ | Different per user ✅ |
| **Props to Component** | None ❌ | currentUser ✅ |
| **Lookup Logic** | None ❌ | Email-based ✅ |
| **Scalability** | Limited ❌ | Unlimited ✅ |
| **Multi-user Support** | No ❌ | Yes ✅ |

---

## 🎉 Result

```
┌──────────────────────────────────────────────┐
│ BEFORE: One profile for all users           │
│ AFTER:  Unique profile for each user        │
│                                              │
│ THE LOGIN EMAIL NOW ACTUALLY MATTERS! ✅    │
└──────────────────────────────────────────────┘
```
