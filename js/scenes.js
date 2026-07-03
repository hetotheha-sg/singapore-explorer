/* ==========================================================
   scenes.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    const Scenes = {

        viewport: null,

        currentIndex: 0,

        init(viewport) {

            this.viewport = viewport;
            this.currentIndex = 0;

            this.renderCurrentScene();

        },

        renderCurrentScene() {

            if (!window.UI) return;

            const scene = window.QUESTIONS[this.currentIndex];

            if (!scene) {

                if (window.Game) {
                    window.Game.completeJourney();
                }

                return;
            }

            const page = window.UI.createScene({
                background:
                    "linear-gradient(135deg,#0B2742,#174D73)"
            });

            page.style.padding = "72px";
            page.style.gap = "18px";

            /* ---------- Location ---------- */

            const location = document.createElement("div");

            location.textContent = scene.location;

            location.style.fontSize = ".85rem";
            location.style.letterSpacing = ".28em";
            location.style.textTransform = "uppercase";
            location.style.color = "#D8B36A";

            page.appendChild(location);

            /* ---------- Title ---------- */

            page.appendChild(
                window.UI.createTitle(scene.title)
            );

            /* ---------- Narration ---------- */

            page.appendChild(
                window.UI.createBody(scene.narration)
            );

            /* ---------- Question ---------- */

            const card = document.createElement("div");

            card.style.width = "min(760px,100%)";
            card.style.marginTop = "34px";
            card.style.padding = "34px";
            card.style.borderRadius = "24px";
            card.style.background = "rgba(255,255,255,.08)";
            card.style.border =
                "1px solid rgba(255,255,255,.10)";
            card.style.backdropFilter = "blur(12px)";

            const prompt = document.createElement("h3");

            prompt.textContent = scene.question.prompt;

            prompt.style.margin = "0 0 28px";
            prompt.style.fontWeight = "600";
            prompt.style.lineHeight = "1.5";
            prompt.style.textAlign = "center";

            card.appendChild(prompt);

            const answers = document.createElement("div");

            answers.style.display = "grid";
            answers.style.gridTemplateColumns = "1fr";
            answers.style.gap = "14px";

            scene.question.options.forEach((option, index) => {

                const button = document.createElement("button");

                button.type = "button";

                button.textContent = option;

                button.style.padding = "18px";
                button.style.borderRadius = "14px";
                button.style.border =
                    "1px solid rgba(255,255,255,.15)";
                button.style.background =
                    "rgba(255,255,255,.06)";
                button.style.color = "#FFFFFF";
                button.style.cursor = "pointer";
                button.style.fontSize = "1rem";
                button.style.transition = ".25s";

                button.onmouseenter = () => {

                    button.style.background =
                        "rgba(255,255,255,.14)";

                };

                button.onmouseleave = () => {

                    button.style.background =
                        "rgba(255,255,255,.06)";

                };

                button.onclick = () => {

                    const correct =
                        index === scene.question.answer;

                    if (correct) {

                        button.style.background =
                            "#D8B36A";

                        button.style.color = "#13263E";

                        window.AudioEngine?.playSuccess();

                        window.Passport?.collect(scene.id);

                        setTimeout(() => {

                            this.currentIndex++;

                            this.renderCurrentScene();

                        }, 900);

                    } else {

                        button.style.background =
                            "#A63C3C";

                        window.AudioEngine?.playError();

                        setTimeout(() => {

                            button.style.background =
                                "rgba(255,255,255,.06)";

                        }, 450);

                    }

                };

                answers.appendChild(button);

            });

            card.appendChild(answers);

            page.appendChild(card);

            window.UI.mount(page);

        }

    };

    window.Scenes = Scenes;

})();