/*
=========================================================
Singapore Explorer
intro.js
Arrival Experience
Version 1.0.1
=========================================================
*/

(function () {

    "use strict";

    console.log("Intro Module v1.0 Loaded");

    const Intro = {

        async play() {

            console.log("Intro.play() started");

            return new Promise(resolve => {

                const overlay = document.createElement("div");

                overlay.id = "intro-overlay";

                overlay.innerHTML = `
                    <div class="intro-card">
                        <h1 style="margin-bottom:20px;">Welcome to Singapore.</h1>
                        <p>An Interactive Love Letter</p>
                    </div>
                `;

                Object.assign(overlay.style, {
                    position: "fixed",
                    inset: "0",
                    background: "rgba(0,0,0,0.92)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999999",
                    color: "white",
                    opacity: "1"
                });

                document.body.appendChild(overlay);

                setTimeout(() => {

                    overlay.remove();

                    console.log("Intro finished");

                    resolve();

                }, 3000);

            });

        }

    };

    window.Intro = Intro;

})();
