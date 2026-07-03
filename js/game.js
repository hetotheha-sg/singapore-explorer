/* ==========================================================
   game.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    const Game = {

        version: "1.1.0",

        state: {
            started: false,
            completed: false,
            currentScene: 0
        },

        elements: {},

        initialized: false,

        init() {

            if (this.initialized) return;

            this.cacheElements();
            this.bindEvents();
            this.restore();

            this.showIntro();

            this.initialized = true;

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

            this.elements.startButton?.addEventListener(
                "click",
                () => this.startJourney()
            );

            this.elements.restartButton?.addEventListener(
                "click",
                () => this.restart()
            );

            window.addEventListener("resize", () => {

                window.UI?.resize?.();

            });

        },

        showScene(scene) {

            [
                this.elements.intro,
                this.elements.game,
                this.elements.ending
            ].forEach(section => {

                section?.classList.remove("active");

            });

            scene?.classList.add("active");

        },

        showIntro() {

            this.showScene(this.elements.intro);

        },

async startJourney() {

    if (this.state.started) return;

    this.state.started = true;

    await this.fadeOut();

    await window.Intro?.play?.();

    this.showScene(this.elements.game);

    try {
        console.log("1. UI");
        window.UI.init();

        console.log("2. Passport");
        window.Passport.init();

        console.log("3. Audio");
        window.AudioEngine.init();

        console.log("4. Scenes");
        window.Scenes.init(this.elements.viewport);

        console.log("5. Save");
        this.state.currentScene = 0;
        this.save();

    } catch (err) {

        console.error("STARTUP FAILED:", err);

    }

    await this.fadeIn();

}

        completeJourney() {

            this.state.completed = true;

            this.showScene(this.elements.ending);

            this.save();

        },

        restart() {

            window.Save?.clear?.();

            location.reload();

        },

        fadeOut() {

            return new Promise(resolve => {

                if (!this.elements.overlay) {

                    resolve();

                    return;

                }

                this.elements.overlay.classList.add("visible");

                setTimeout(resolve, 450);

            });

        },

        fadeIn() {

            return new Promise(resolve => {

                if (!this.elements.overlay) {

                    resolve();

                    return;

                }

                this.elements.overlay.classList.remove("visible");

                setTimeout(resolve, 450);

            });

        },

        save() {

            window.Save?.set?.("gameState", {

                version: this.version,
                started: this.state.started,
                completed: this.state.completed,
                currentScene: this.state.currentScene

            });

        },

        restore() {

    const data = window.Save?.get?.("gameState");

    if (!data) return;

    this.state.completed = !!data.completed;
    this.state.currentScene = data.currentScene || 0;

    // Never lock the Start button on page refresh.
    // Resume support will be implemented later.
    this.state.started = false;

}
    };

    window.Game = Game;

    document.addEventListener("DOMContentLoaded", () => {

        Game.init();

    });

})();
