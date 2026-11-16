const key = (level) => `highscore_level${level}`;

export function getHighScore(level) {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(key(level))) || 0;
}

export function saveHighScore(level, score) {
  if (score > getHighScore(level)) {
    localStorage.setItem(key(level), String(score));
  }
}