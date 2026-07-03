/*
=========================================================
Singapore Explorer
intro.js
Launch Sprint Edition
Version 3.0.0
=========================================================
*/

(function () {

"use strict";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Intro = {

    async play() {

        if (!window.UI) return;

        const scene = UI.createScene({
            background:
                "linear-gradient(180deg,#071B2D,#0B2D47,#123F61)"
        });

        scene.style.justifyContent = "center";
        scene.style.alignItems = "center";
        scene.style.padding = "80px";

        const card = document.createElement("div");

        Object.assign(card.style, {
            maxWidth: "820px",
            textAlign: "center",
            color: "#ffffff",
            opacity: "0",
            transition: "opacity 1.5s ease"
        });

        const lines = [

            "Some places are visited.",

            "Others become part of who we are.",

            "",

            "Whether these streets are already familiar,",

            "or today marks a very first encounter,",

            "there are always stories waiting to be noticed.",

            "",

            "Perhaps a few are waiting for you today.",

            "",

            "Welcome.",

            "",

            "— Singapore"

        ];

        lines.forEach(text => {

            const p = document.createElement("p");

            p.textContent = text;

            Object.assign(p.style, {

                margin: text === "" ? "22px 0" : "10px 0",

                fontFamily: "Cormorant Garamond, serif",

                fontSize:
                    text === "Welcome."
                        ? "2rem"
                        : "1.45rem",

                lineHeight: "1.8",

                letterSpacing: ".3px",

                color:
                    text === "— Singapore"
                        ? "#D8B36A"
                        : "#ffffff"

            });

            card.appendChild(p);

        });

        scene.appendChild(card);

        await UI.transition(scene);

        await wait(250);

        card.style.opacity = "1";

        await wait(7000);

        card.style.opacity = "0";

        await wait(1600);

    }

};

window.Intro = Intro;

})();
