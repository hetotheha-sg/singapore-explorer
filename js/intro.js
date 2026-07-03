/*
=========================================================
Singapore Explorer
intro.js
Arrival Experience
Version 1.0.0
=========================================================
*/

(function () {

    "use strict";

    const Intro = {

        async play() {

            return new Promise(resolve => {

                const overlay = document.createElement("div");

                overlay.id = "intro-overlay";

                overlay.innerHTML = `
                    <div class="intro-card">

                        <div class="intro-small">
                            An Interactive Love Letter
                        </div>

                        <h1>Welcome to Singapore.</h1>

                        <p>
                            Singapore never asks the traveller to be impressed.
                        </p>

                        <p>
                            It simply shares its story honestly.
                        </p>

                        <p class="intro-final">
                            The traveller decides how to feel.
                        </p>

                    </div>
                `;

                Object.assign(overlay.style, {

                    position: "fixed",
                    inset: "0",
                    background: "rgba(0,0,0,0.88)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "99999",
                    opacity: "0",
                    transition: "opacity 600ms"

                });

                const card = overlay.querySelector(".intro-card");

                Object.assign(card.style, {

                    color: "white",
                    textAlign: "center",
                    maxWidth: "720px",
                    padding: "48px",
                    lineHeight: "1.8",
                    fontFamily: "Georgia, serif"

                });

                document.body.appendChild(overlay);

                requestAnimationFrame(() => {

                    overlay.style.opacity = "1";

                });

                setTimeout(() => {

                    overlay.style.opacity = "0";

                    setTimeout(() => {

                        overlay.remove();

                        resolve();

                    }, 700);

                }, 5000);

            });

        }

    };

    window.Intro = Intro;

})();
