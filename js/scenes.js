/* ==========================================================
   scenes.js
   An Interactive Love Letter from Singapore
   Version 3.0.0
   ========================================================== */

(() => {

"use strict";

const Scenes = {

    viewport: null,
    index: 0,

    init(viewport) {

        this.viewport = viewport;
        this.index = 0;

        this.render();

    },

    render() {

        const scene = window.QUESTIONS?.[this.index];

        if (!scene) {

            window.Game?.completeJourney?.();
            return;

        }

        const page = window.UI.createScene({

            image: scene.background,
            background: "linear-gradient(135deg,#0B2742,#174D73)"

        });

        page.style.gap = "18px";

        //--------------------------------------------------
        // Location
        //--------------------------------------------------

        const location = document.createElement("div");

        location.textContent = scene.location;

        location.style.cssText =
            "letter-spacing:.25em;" +
            "text-transform:uppercase;" +
            "color:#D8B36A;" +
            "font-size:.82rem;";

        page.appendChild(location);

        //--------------------------------------------------
        // Title + Narration
        //--------------------------------------------------

        page.appendChild(
            window.UI.createTitle(scene.title)
        );

        page.appendChild(
            window.UI.createBody(scene.narration)
        );

        //--------------------------------------------------
        // Question Card
        //--------------------------------------------------

        const card = document.createElement("div");

        card.style.cssText =
            "width:min(760px,100%);" +
            "padding:32px;" +
            "border-radius:22px;" +
            "background:rgba(255,255,255,.08);" +
            "backdrop-filter:blur(12px);" +
            "border:1px solid rgba(255,255,255,.1);";

        const question = document.createElement("h3");

        question.textContent = scene.question.prompt;

        question.style.cssText =
            "text-align:center;" +
            "margin:0 0 24px;" +
            "color:white;";

        card.appendChild(question);

        //--------------------------------------------------
        // Answers
        //--------------------------------------------------

        let answered = false;

        scene.question.options.forEach((option, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "primary-button";

            button.textContent = option;

            button.style.display = "block";
            button.style.width = "100%";
            button.style.margin = "12px 0 0";

            button.onclick = async () => {

                if (answered) return;

                //--------------------------------------------------
                // Wrong Answer
                //--------------------------------------------------

                if (index !== scene.question.answer) {

                    window.AudioEngine?.playError?.();

                    button.style.filter = "brightness(.75)";

                    setTimeout(() => {

                        button.style.filter = "";

                    }, 250);

                    return;

                }

                answered = true;

                //--------------------------------------------------
                // Disable Buttons
                //--------------------------------------------------

                card.querySelectorAll("button").forEach(btn => {

                    btn.disabled = true;

                });

                //--------------------------------------------------
                // Success
                //--------------------------------------------------

                window.AudioEngine?.playSuccess?.();

                await Promise.resolve(
                    window.Passport?.collect?.(scene.id)
                );

                //--------------------------------------------------
                // Love Letter
                //--------------------------------------------------

                await window.Letter?.show?.(

                    scene.letter || {

                        title: "Dear Traveller",

                        body:
                            "The best journeys are never measured by the places visited, but by the memories quietly carried home."

                    }

                );

                //--------------------------------------------------
                // Next Scene
                //--------------------------------------------------

                this.index++;

                if (!window.QUESTIONS?.[this.index]) {

                    window.Game?.completeJourney?.();

                    return;

                }

                this.render();

            };

            card.appendChild(button);

        });

        page.appendChild(card);

        window.UI.transition(page);

    }

};

window.Scenes = Scenes;

})();
