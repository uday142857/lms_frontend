// ═══════════════════════════════════════════════════════════════════════════
// userStore.js  —  Single source of truth for the logged-in user's profile.
//
// HOW IT WORKS:
//   • UserProfile.jsx reads and writes this object.
//   • MidSection.jsx reads `currentUser.name` for the greeting.
//   • Any other dashboard component can import { currentUser } directly.
//
// In production replace this with a React Context / Redux / API call.
// ═══════════════════════════════════════════════════════════════════════════

export const currentUser = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Uday Kumar",
  firstName: "Uday", // used in greet card: "Welcome back, Uday!"
  email: "uday.kumar@email.com",
  phone: "+91 98765 43210",
  location: "Hyderabad, India",
  role: "Student",
  bio: "Passionate learner exploring AI, machine learning, and full-stack development. Always curious, always building.",
  avatar: null, // set to a URL string to show a photo
  joined: "January 2024",

  // ── Learning stats (shown in MidSection assessment cards) ─────────────────
  testsAssigned: 49,
  testsCompleted: 24,
  questionsAttempted: 634,
  totalTimeMins: 518,

  // ── Course progress ────────────────────────────────────────────────────────
  enrolledCourses: 7,
  completedCourses: 3,
  certificatesEarned: 2,
  currentStreak: 12, // days

  // ── Badges ────────────────────────────────────────────────────────────────
  badges: [
    { label: "First Enroll", icon: "bi-star-fill", color: "#f59e0b" },
    {
      label: "Quick Learner",
      icon: "bi-lightning-charge-fill",
      color: "#6366f1",
    },
    { label: "Top 10%", icon: "bi-trophy-fill", color: "#10b981" },
    { label: "7-Day Streak", icon: "bi-fire", color: "#ef4444" },
  ],
};

// ── Helper: get first name only ───────────────────────────────────────────────
export function getFirstName() {
  return currentUser.firstName || currentUser.name.split(" ")[0];
}
