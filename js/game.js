/* ==========================================================
   An Interactive Love Letter from Singapore
   game.js
   ========================================================== */

(() => {
    "use strict";

    const App = {
        version: "1.0.0",

        state: {
            started: false,
            completed: false,
            currentScene: 0
        },

        elements: {},

        init() {
            this.cacheElements();
            this.bindEvents();
            this.restore();
            this.showIntro();
        },

        cacheElements() {
            this.elements.intro = document.getElementById("intro-scene");
            this.elements.game = document.getElementById("game-scene");
            this.elements.ending = document.getElementById("ending-scene");

            this.elements.startButton = document.getElementById("startButton");
            this.elements.restartButton = document.getElementById("restartButton");

            this.elements.viewport = document.getElementById("sceneViewport");
            this.elements.overlay = document.getElementById("overlay");
        },

        bindEvents() {
            this.elements.startButton?.addEventListener("click", () => this.startJourney());

            this.elements.restartButton?.addEventListener("click", () => this.restart());

            window.addEventListener("resize", () => {
                if (window.UI?.resize) {
                    window.UI.resize();
                }
            });
        },

        showScene(sceneElement) {
            [
                this.elements.intro,
                this.elements.game,
                this.elements.ending
            ].forEach(scene => {
                if (!scene) return;
                scene.classList.remove("active");
            });

            sceneElement?.classList.add("active");
        },

        showIntro() {
            this.showScene(this.elements.intro);
        },

        async startJourney() {

            if (this.state.started) return;

            this.state.started = true;

            this.fadeOut();

            await this.wait(500);

            this.showScene(this.elements.game);

            this.fadeIn();

            if (window.Scenes?.init) {
                window.Scenes.init(this.elements.viewport);
            }

            if (window.UI?.init) {
                window.UI.init();
            }

            if (window.Passport?.init) {
                window.Passport.init();
            }

            if (window.AudioEngine?.init) {
                window.AudioEngine.init();
            }

            this.state.currentScene = 0;

            this.save();
        },

        completeJourney() {

            this.state.completed = true;

            this.showScene(this.elements.ending);

            this.save();
        },

        restart() {

            if (window.Save?.clear) {
                window.Save.clear();
            }

            location.reload();
        },

        fadeOut() {
            this.elements.overlay?.classList.add("visible");
        },

        fadeIn() {
            setTimeout(() => {
                this.elements.overlay?.classList.remove("visible");
            }, 100);
        },

        wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        save() {

            if (window.Save?.set) {

                window.Save.set("gameState", {
                    version: this.version,
                    started: this.state.started,
                    completed: this.state.completed,
                    currentScene: this.state.currentScene
                });

            }

        },

        restore() {

            if (!window.Save?.get) return;

            const save = window.Save.get("gameState");

            if (!save) return;

            this.state.started = !!save.started;
            this.state.completed = !!save.completed;
            this.state.currentScene = save.currentScene || 0;
        }
    };

    window.Game = App;

    document.addEventListener("DOMContentLoaded", () => {
        App.init();
    });

})();