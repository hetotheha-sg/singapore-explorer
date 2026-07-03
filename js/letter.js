/*
==========================================================
Singapore Explorer
Phase 2
Love Letter Module
Version 2.0.0
==========================================================
*/

(function () {

    "use strict";

    const Letter = {

        version: "2.0.0",

        overlay: null,

        showing: false,

        init() {

            console.log("Letter Module v2.0 Loaded");

        },

        async show(letter = {}) {

            if (this.showing) return;

            this.showing = true;

            return new Promise(resolve => {

                const title =
                    letter.title ||
                    "Dear Traveller";

                const body =
                    letter.body ||
                    "Every journey leaves us with memories. Some stay only for a moment. Others quietly become part of who we are.";

                //--------------------------------------------------
                // Overlay
                //--------------------------------------------------

                const overlay = document.createElement("div");

                overlay.id = "letter-overlay";

                Object.assign(overlay.style, {

                    position: "fixed",
                    inset: "0",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    background: "rgba(5,12,22,.82)",
                    backdropFilter: "blur(12px)",

                    opacity: "0",
                    transition: "opacity .6s ease",

                    zIndex: "999999"

                });

                //--------------------------------------------------
                // Card
                //--------------------------------------------------

                const card = document.createElement("div");

                Object.assign(card.style, {

                    width: "min(760px,90vw)",

                    padding: "64px",

                    borderRadius: "30px",

                    background:
                        "linear-gradient(180deg,rgba(26,38,54,.96),rgba(16,27,40,.96))",

                    border: "1px solid rgba(216,179,106,.25)",

                    boxShadow:
                        "0 30px 90px rgba(0,0,0,.45)",

                    color: "#FFFFFF",

                    textAlign: "center"

                });

                //--------------------------------------------------
                // Label
                //--------------------------------------------------

                const label = document.createElement("div");

                label.textContent = "A LOVE LETTER";

                Object.assign(label.style, {

                    color: "#D8B36A",

                    letterSpacing: ".35em",

                    textTransform: "uppercase",

                    fontSize: ".75rem",

                    marginBottom: "26px",

                    fontFamily: "Inter, sans-serif"

                });

                //--------------------------------------------------
                // Title
                //--------------------------------------------------

                const heading = document.createElement("h2");

                heading.textContent = title;

                Object.assign(heading.style, {

                    margin: "0",

                    color: "#FFFFFF",

                    fontFamily: "Cormorant Garamond, serif",

                    fontWeight: "600",

                    fontSize: "clamp(2.4rem,4vw,3.8rem)"

                });

                //--------------------------------------------------
                // Body
                //--------------------------------------------------

                const paragraph = document.createElement("p");

                paragraph.textContent = body;

                Object.assign(paragraph.style, {

                    margin: "34px auto",

                    maxWidth: "560px",

                    lineHeight: "2",

                    color: "rgba(255,255,255,.88)",

                    fontSize: "1.08rem",

                    fontFamily: "Inter, sans-serif"

                });

                //--------------------------------------------------
                // Continue Button
                //--------------------------------------------------

                const button = document.createElement("button");

                button.type = "button";

                button.className = "primary-button";

                button.textContent = "Continue Journey";

                //--------------------------------------------------
                // Assemble
                //--------------------------------------------------

                card.appendChild(label);
                card.appendChild(heading);
                card.appendChild(paragraph);
                card.appendChild(button);

                overlay.appendChild(card);

                document.body.appendChild(overlay);

                this.overlay = overlay;

                requestAnimationFrame(() => {

                    overlay.style.opacity = "1";

                });

                //--------------------------------------------------
                // Close
                //--------------------------------------------------

                const close = () => {

                    overlay.style.opacity = "0";

                    setTimeout(() => {

                        overlay.remove();

                        this.overlay = null;

                        this.showing = false;

                        document.removeEventListener(
                            "keydown",
                            onKey
                        );

                        resolve();

                    }, 500);

                };

                //--------------------------------------------------
                // ESC Support
                //--------------------------------------------------

                const onKey = (event) => {

                    if (event.key === "Escape") {

                        close();

                    }

                };

                document.addEventListener(
                    "keydown",
                    onKey
                );

                button.addEventListener(
                    "click",
                    close
                );

            });

        }

    };

    window.Letter = Letter;

    Letter.init();

})();
