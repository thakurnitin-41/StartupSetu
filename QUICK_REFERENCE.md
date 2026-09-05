# 🚀 Quick Reference Card

## Problem → Solution

```
PROBLEM:                          SOLUTION:
All users see same profile  →     Each user sees their profile
(EcoVision AI)                    (based on login email)
```

---

## ⚡ 60-Second Fix

### 1. Replace `src/App.jsx`
Copy content from `App.jsx.FIXED` (2 changes needed)

### 2. Replace `src/pages/StartupProfile.jsx`
Copy content from `StartupProfile.jsx.FIXED` (complete rewrite)

### 3. Test
```bash
npm run dev
# Login: ananya@ecovision.ai / startup123
# Go to Startup Profile → See EcoVision AI ✅
# Logout, login as: startup@startup.ai
# Go to Startup Profile → See different profile ✅
```

---

## 📍 Exact Changes Needed

### App.jsx

**Location 1:** Line ~78-98 (handleRoleChange)
- Use provided `email` parameter
- Store `originalEmail: email` in currentUser
- Extract name from email

**Location 2:** Line ~287
```javascript
// BEFORE:
return <StartupProfile onNavigate={setActiveTab} />;

// AFTER:
return <StartupProfile currentUser={currentUser} startups={startups} onNavigate={setActiveTab} />;
```

### StartupProfile.jsx

- Add `STARTUP_DATABASE` object at top
- Accept `currentUser` prop
- Add `useEffect` to look up profile by email
- Handle "no profile found" state
- Use `currentUser.originalEmail` as key

---

## 🧪 Test Emails

```
Email 1: ananya@ecovision.ai
Pass: startup123
Result: See "EcoVision AI" profile ✅

Email 2: startup@startup.ai
Pass: startup123
Result: See "Generic Startup Inc" profile ✅

Email 3: sample@techstartup.com
Pass: startup123
Result: See "TechStartup Labs" profile ✅

Email 4: unknown@test.com
Pass: anything
Result: See "No Profile Found" message ✅
```

---

## 🎯 How It Works

```
Login Email
    ↓
App.jsx: handleRoleChange(role, EMAIL)
    ↓ (NOW USES EMAIL)
currentUser.originalEmail = EMAIL
    ↓
Pass to StartupProfile
    ↓
Look up EMAIL in STARTUP_DATABASE
    ↓
Get user's startup data
    ↓
Render user's profile ✅
```

---

## ✅ Verification Checklist

- [ ] Copied App.jsx.FIXED → src/App.jsx
- [ ] Copied StartupProfile.jsx.FIXED → src/pages/StartupProfile.jsx
- [ ] npm run dev (no errors)
- [ ] Login Test 1 passes
- [ ] Login Test 2 passes
- [ ] Login Test 3 passes
- [ ] Logout/switch works
- [ ] Other pages unaffected

---

## 🆘 Quick Fixes

**"Same profile still showing"**
- Check: Did you pass `currentUser` to StartupProfile?
- Check: Did you restart npm?

**"Cannot read originalEmail"**
- Check: currentUser is passed as prop
- Check: useEffect uses currentUser?.originalEmail

**"No profile found"**
- Use test emails above OR
- Add email to STARTUP_DATABASE

---

## 📊 Profiles Included

| Email | Startup | Sector |
|-------|---------|--------|
| ananya@ecovision.ai | EcoVision AI | Smart City |
| startup@startup.ai | Generic Startup | Tech |
| sample@techstartup.com | TechStartup Labs | AI |

To add more: See `ADD_MORE_STARTUPS.md`

---

## 🎊 Before & After

### Before ❌
```
User 1 email: alice@company.com → See: EcoVision AI
User 2 email: bob@startup.io    → See: EcoVision AI (WRONG!)
User 3 email: carol@tech.com    → See: EcoVision AI (WRONG!)
```

### After ✅
```
User 1 email: ananya@ecovision.ai     → See: EcoVision AI
User 2 email: startup@startup.ai      → See: Generic Startup Inc
User 3 email: sample@techstartup.com  → See: TechStartup Labs
```

---

## 🔑 Key Lines Changed

### App.jsx Line 78-98:
```javascript
// OLD: name: details.name (hardcoded)
// NEW: name: email ? nameFromEmail : details.defaultName
//      (from email if available)
```

### App.jsx Line 287:
```javascript
// OLD: <StartupProfile onNavigate={setActiveTab} />
// NEW: <StartupProfile currentUser={currentUser} startups={startups} onNavigate={setActiveTab} />
```

### StartupProfile.jsx:
```javascript
// NEW: const STARTUP_DATABASE = { 'email@domain': {...}, ... }
// NEW: useEffect to look up profile by currentUser.originalEmail
```

---

## 💾 File Locations

```
Your Project:
├── src/
│   ├── App.jsx ← FIX #1
│   └── pages/
│       └── StartupProfile.jsx ← FIX #2
│
This Package:
├── App.jsx.FIXED ← Copy from here
├── StartupProfile.jsx.FIXED ← Copy from here
├── README_FIXES.md (detailed guide)
├── IMPLEMENTATION_GUIDE.md (step-by-step)
├── ADD_MORE_STARTUPS.md (scaling)
└── ... (other docs)
```

---

## ⏱️ Time Required

- **Reading docs:** 5 min
- **Copying files:** 2 min
- **Testing:** 3 min
- **Total:** ~10 minutes

---

## 🎯 Success Looks Like

```
✅ Login as User A
✅ See Profile A
✅ Logout
✅ Login as User B
✅ See Profile B
✅ Profiles are DIFFERENT
✅ Each shows correct data
✅ No errors
```

---

## 📞 Stuck?

1. Check: Troubleshooting in README_FIXES.md
2. Read: IMPLEMENTATION_GUIDE.md
3. Review: ARCHITECTURE_DIAGRAM.md
4. Look at: The fixed source files

---

## 🚀 Ready?

1. Copy the 2 fixed files
2. Run npm dev
3. Test with provided emails
4. Done! ✅

**You now have dynamic profiles!** 🎉
