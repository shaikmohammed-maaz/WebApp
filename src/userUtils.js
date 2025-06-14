// Utility functions for user profile management

const USER_KEY = 'userProfile';

export function getUserProfile() {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setUserProfile(profile) {
  localStorage.setItem(USER_KEY, JSON.stringify(profile));
}

export function clearUserProfile() {
  localStorage.removeItem(USER_KEY);
}

// Call this to initialize the user profile if not present
export function ensureUserProfile(defaultProfile) {
  if (!getUserProfile()) {
    setUserProfile(defaultProfile);
  }
}
