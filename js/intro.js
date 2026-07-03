/*
=========================================================
Singapore Explorer
intro.js
Arrival Experience
Version 2.0.0
=========================================================
*/

(function () {

    "use strict";

    console.log("Intro Module v2.0 Loaded");

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const Intro = {

        async play() {

            const overlay = document.createElement("div");

            overlay.id = "intro-overlay";

            Object.assign(overlay.style, {
                position: "fixed",
                inset: "0",
                background: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "999999",
                color: "#fff",
                fontFamily: "Georgia, serif"
            });

            document.body.appendChild(overlay);

            const showText = async (text, size = "42px") => {

                overlay.innerHTML = "";

                const div = document.createElement("div");

                div.textContent = text;

                Object.assign(div.style, {
                    opacity: "0",
                    transition: "opacity 1.2s ease",
                    fontSize: size,
                    maxWidth: "900px",
                    textAlign: "center",
                    lineHeight: "1.6",
                    padding: "40px"
                });

                overlay.appendChild(div);

                requestAnimationFrame(() => {
                    div.style.opacity = "1";
                });

                await wait(2800);

                div.style.opacity = "0";

                await wait(1200);

            };

            await showText(
                "Every journey begins with an arrival."
            );

            await showText(
                "Some arrivals change where you are."
            );

            await showText(
                "Some change how you see a place forever."
            );

            overlay.remove();

        }

    };

    window.Intro = Intro;

})();
