class AudioManager {
  constructor() {
    this.enabled = true;
    this.audioContext = null;
    this.ambience = null;
    this.currentScene = null;
    this.loadSettings();
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  loadSettings() {
    const saved = localStorage.getItem('audioEnabled');
    this.enabled = saved !== null ? saved === 'true' : true;
  }

  saveSettings() {
    localStorage.setItem('audioEnabled', this.enabled);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.saveSettings();
    return this.enabled;
  }

  playSound(frequency = 440, duration = 0.1, type = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = frequency;
    osc.type = type;

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  playPassportStamp() {
    // Double beep for stamp
    this.playSound(800, 0.1);
    setTimeout(() => this.playSound(1000, 0.1), 150);
  }

  playSuccess() {
    // Three ascending tones
    this.playSound(523, 0.1); // C5
    setTimeout(() => this.playSound(659, 0.1), 100); // E5
    setTimeout(() => this.playSound(784, 0.2), 200); // G5
  }

  playError() {
    // Two descending tones
    this.playSound(400, 0.1);
    setTimeout(() => this.playSound(300, 0.2), 100);
  }

  playClick() {
    this.playSound(600, 0.05);
  }
}

const audioManager = new AudioManager();