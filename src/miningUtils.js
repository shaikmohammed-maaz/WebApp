// Utility functions for mining logic
export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;
export const MS_IN_DAY = 24 * MS_IN_HOUR;

export function getTimeRemaining(targetTimestamp) {
  const now = Date.now();
  const diff = Math.max(targetTimestamp - now, 0);
  const hours = Math.floor(diff / MS_IN_HOUR);
  const minutes = Math.floor((diff % MS_IN_HOUR) / MS_IN_MINUTE);
  const seconds = Math.floor((diff % MS_IN_MINUTE) / MS_IN_SECOND);
  return { hours, minutes, seconds, total: diff };
}

export function formatTime({ hours, minutes, seconds }) {
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getRandomBonus(min = 1, max = 3) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getStoredMiningState() {
  const state = localStorage.getItem('miningState');
  return state ? JSON.parse(state) : null;
}

export function setStoredMiningState(state) {
  localStorage.setItem('miningState', JSON.stringify(state));
}
