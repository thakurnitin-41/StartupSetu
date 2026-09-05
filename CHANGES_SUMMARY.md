# Profile Fix - Changes Summary

## 🎯 Problem
When multiple users login, they all see the SAME profile (EcoVision AI). Profile should be DIFFERENT based on who's logged in.

---

## 🔧 Fix Overview

### Change 1️⃣: App.jsx - Line ~287
**Make StartupProfile component receive user data**

```diff
case 'startups':
case 'startup-profile':
-   return <StartupProfile onNavigate={setActiveTab} />;
+   return <StartupProfile currentUser={currentUser} startups={startups} onNavigate={setActiveTab} />;
```

**Why:** StartupProfile needs to know WHO is logged in to show THEIR profile.

---

### Change 2️⃣: StartupProfile.jsx - Complete Rewrite
**Replace entire file with fixed version**

#### OLD (Hardcoded):
```javascript
export default function StartupProfile({ startup, onNavigate }) {
  const st = startup || {
    id: 'st-1',
    name: 'EcoVision AI',  // ❌ ALWAYS SAME
    logo: 'https://...',
    // ... hardcoded data
  };

  return ( /* shows same data */ );
}
```

#### NEW (Dynamic):
```javascript
const STARTUP_DATABASE = {
  'ananya@ecovision.ai': { /* EcoVision profile */ },
  'startup@startup.ai': { /* Different startup */ },
};

export default function StartupProfile({ currentUser, startups = [], onNavigate }) {
  const [st, setSt] = useState(null);

  useEffect(() => {
    if (currentUser?.originalEmail) {
      const userEmail = currentUser.originalEmail.toLowerCase();
      const startupData = STARTUP_DATABASE[userEmail];
      setSt(startupData);  // ✅ DYNAMIC based on email
    }
  }, [currentUser]);

  if (!st) return <div>No profile found for {currentUser?.originalEmail}</div>;
  
  return ( /* shows user's profile */ );
}
```

**Why:** Profile now looks up the logged-in user's email in a database and shows THEIR startup, not hardcoded data.

---

## 🔄 How It Works Now

```
LOGIN FORM
    ↓ User enters: ananya@ecovision.ai / startup123
    ↓
App.jsx: handleRoleChange('Startup', 'ananya@ecovision.ai')
    ↓ STORES EMAIL
    ↓
setCurrentUser({ 
  email: 'ananya@ecovision.ai',  ✅ Real email
  originalEmail: 'ananya@ecovision.ai'  ✅ For lookups
})
    ↓
User clicks "Startup Profile"
    ↓
<StartupProfile currentUser={currentUser} />  ✅ Passes user
    ↓
useEffect() runs:
  - Gets email: 'ananya@ecovision.ai'
  - Looks up in STARTUP_DATABASE
  - Finds EcoVision AI profile
    ↓
RENDERS EcoVision AI (Correct!)
```

---

## 📋 Detailed Changes

### File 1: `src/App.jsx`

**Location: Line ~78-98 (handleRoleChange function)**

Change this:
```javascript
const roleAvatars = {
  'Startup': { name: 'Ananya Sharma', email: 'ananya@ecovision.ai', ... }
};
```

To this:
```javascript
const roleAvatars = {
  'Startup': { 
    defaultName: 'Startup Representative',
    defaultEmail: 'startup@startup.ai',  // Generic
    ...
  }
};
```

Change this:
```javascript
setCurrentUser({
  id: `u-${Date.now()}`,
  role: newRole,
  name: details.name,  // ❌ Old: hardcoded
  email: email || details.email,  // ❌ Old: maybe used
  organization: details.org,
  avatar: details.avatar
});
```

To this:
```javascript
// Extract name from email
const nameFromEmail = email 
  ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  : details.defaultName;

setCurrentUser({
  id: `u-${Date.now()}`,
  role: newRole,
  name: email ? nameFromEmail : details.defaultName,  // ✅ From email
  email: userEmail,
  organization: details.defaultOrg,
  avatar: details.defaultAvatar,
  originalEmail: email  // ✅ NEW: For profile lookup
});
```

**Location: Line ~287**

Change this:
```javascript
case 'startups':
case 'startup-profile':
  return <StartupProfile onNavigate={setActiveTab} />;  // ❌ No props
```

To this:
```javascript
case 'startups':
case 'startup-profile':
  return <StartupProfile currentUser={currentUser} startups={startups} onNavigate={setActiveTab} />;  // ✅ Passes user
```

---

### File 2: `src/pages/StartupProfile.jsx`

**Complete file replacement needed.**

Key additions:
1. ✅ `STARTUP_DATABASE` object with email-to-profile mapping
2. ✅ Accept `currentUser` prop
3. ✅ `useEffect` that looks up user's profile by email
4. ✅ Error state for users not in database
5. ✅ Display which email is logged in

---

## 🧪 Test It

### Before Fix:
```
Login 1: user1@company.com → See EcoVision AI
Login 2: user2@other.com → See EcoVision AI (SAME!)  ❌
Login 3: user3@tech.io → See EcoVision AI (SAME!)  ❌
```

### After Fix:
```
Login 1: ananya@ecovision.ai → See EcoVision AI  ✅
Login 2: startup@startup.ai → See Generic Startup Inc  ✅
Login 3: sample@techstartup.com → See TechStartup Labs  ✅
```

---

## 📁 Files to Modify

```
src/
├── App.jsx  ← Change ~2 places
└── pages/
    └── StartupProfile.jsx  ← Complete rewrite with NEW file
```

---

## ⚡ Quick Implementation

1. **Copy** `App.jsx.FIXED` content → `src/App.jsx`
2. **Copy** `StartupProfile.jsx.FIXED` content → `src/pages/StartupProfile.jsx`
3. **Test** by logging in as different users
4. **Add** more startups to `STARTUP_DATABASE` as needed

---

## 🎉 Result

```javascript
// Before
Every user → Same profile ❌

// After
Each user → Their own profile ✅
```

The profile component is now **DATA-DRIVEN** instead of **HARDCODED**.
