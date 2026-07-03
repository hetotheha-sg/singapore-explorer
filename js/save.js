class SaveManager {
  constructor() {
    this.storageKey = 'singaporeExplorer_save';
    this.statsKey = 'singaporeExplorer_stats';
  }

  save(gameState) {
    try {
      const data = {
        passport: gameState.passport.toJSON(),
        currentScene: gameState.currentScene,
        answeredQuestions: gameState.answeredQuestions || [],
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Load failed:', e);
      return null;
    }
  }

  saveStats(stats) {
    try {
      const existingStats = this.loadStats();
      const allStats = Array.isArray(existingStats) ? existingStats : [];
      allStats.push({
        ...stats,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(this.statsKey, JSON.stringify(allStats));
      return true;
    } catch (e) {
      console.error('Stats save failed:', e);
      return false;
    }
  }

  loadStats() {
    try {
      const data = localStorage.getItem(this.statsKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Stats load failed:', e);
      return [];
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (e) {
      console.error('Clear failed:', e);
      return false;
    }
  }

  getLastGame() {
    const data = this.load();
    return data && (Date.now() - new Date(data.timestamp).getTime()) < 24 * 60 * 60 * 1000 ? data : null;
  }
}

const saveManager = new SaveManager();