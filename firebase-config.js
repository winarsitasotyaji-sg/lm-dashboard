// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration
// Fill in your project values from:
//   Firebase Console → Project Settings → Your Apps → Web app → SDK setup
// ─────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket:     "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId:             "REPLACE_WITH_YOUR_APP_ID"
};

// ─────────────────────────────────────────────────────────────────────────────
// Allowed email domains — only users from these domains can access the site
// ─────────────────────────────────────────────────────────────────────────────
const ALLOWED_DOMAINS = ["spxexpress.com", "shopee.com"];
