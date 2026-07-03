/* ==========================================================
   audio.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    const AudioEngine = {

        initialized: false,

        enabled: true,

        context: null,

        masterGain: null,

        musicGain: null,

        sfxGain: null,

        ambientOscillators: [],

        init() {

            if (this.initialized) return;

            try {

                const AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext;

                if (!AudioContext) return;

                this.context = new AudioContext();

                this.masterGain = this.context.createGain();
                this.musicGain = this.context.createGain();
                this.sfxGain = this.context.createGain();

                this.musicGain.connect(this.masterGain);
                this.sfxGain.connect(this.masterGain);
                this.masterGain.connect(this.context.destination);

                this.masterGain.gain.value = 0.8;
                this.musicGain.gain.value = 0.12;
                this.sfxGain.gain.value = 0.4;

                this.initialized = true;

                this.restore();

                this.startAmbient();

            } catch (e) {

                console.warn("Audio unavailable.", e);

            }

        },

        resume() {

            if (!this.context) return;

            if (this.context.state === "suspended") {

                this.context.resume();

            }

        },

        startAmbient() {

            if (!this.context || !this.enabled) return;

            if (this.ambientOscillators.length > 0) return;

            const notes = [196, 246.94, 293.66];

            notes.forEach((frequency, index) => {

                const oscillator = this.context.createOscillator();
                const gain = this.context.createGain();

                oscillator.type = "sine";
                oscillator.frequency.value = frequency;

                gain.gain.value = 0.015;

                oscillator.connect(gain);
                gain.connect(this.musicGain);

                oscillator.start();

                this.ambientOscillators.push({
                    oscillator,
                    gain
                });

                this.animateGain(gain, index);

            });

        },

        animateGain(gainNode, seed) {

            if (!this.enabled) return;

            const animate = () => {

                if (!this.context) return;

                const target =
                    0.008 +
                    Math.random() * 0.018;

                gainNode.gain.cancelScheduledValues(
                    this.context.currentTime
                );

                gainNode.gain.linearRampToValueAtTime(
                    target,
                    this.context.currentTime + 4 + seed
                );

                setTimeout(animate, 4000 + seed * 500);

            };

            animate();

        },

        stopAmbient() {

            this.ambientOscillators.forEach(item => {

                try {

                    item.oscillator.stop();

                } catch (_) {}

            });

            this.ambientOscillators = [];

        },

        playSuccess() {

            this.playTone(880, 0.12, "triangle");

            setTimeout(() => {

                this.playTone(1174, 0.18, "triangle");

            }, 90);

        },

        playError() {

            this.playTone(180, 0.18, "sawtooth");

        },

        playStamp() {

            this.playTone(620, 0.05, "square");

            setTimeout(() => {

                this.playTone(930, 0.08, "triangle");

            }, 45);

        },

        playClick() {

            this.playTone(420, 0.03, "triangle");

        },

        playTone(frequency, duration, type = "sine") {

            if (!this.enabled) return;

            if (!this.context) return;

            this.resume();

            const oscillator =
                this.context.createOscillator();

            const gain =
                this.context.createGain();

            oscillator.type = type;
            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(
                0.0001,
                this.context.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.18,
                this.context.currentTime + 0.01
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                this.context.currentTime + duration
            );

            oscillator.connect(gain);
            gain.connect(this.sfxGain);

            oscillator.start();

            oscillator.stop(
                this.context.currentTime + duration + 0.05
            );

        },

        setEnabled(value) {

            this.enabled = !!value;

            if (!this.enabled) {

                this.stopAmbient();

            } else if (this.initialized) {

                this.startAmbient();

            }

            this.save();

        },

        toggle() {

            this.setEnabled(!this.enabled);

        },

        save() {

            if (!window.Save?.set) return;

            window.Save.set("audioEnabled", this.enabled);

        },

        restore() {

            if (!window.Save?.get) return;

            const value =
                window.Save.get("audioEnabled");

            if (typeof value === "boolean") {

                this.enabled = value;

            }

        }

    };

    window.AudioEngine = AudioEngine;

})();