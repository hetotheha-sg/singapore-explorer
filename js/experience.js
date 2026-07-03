/*
==========================================================
Singapore Explorer
Experience Engine
Launch Sprint Edition
Version 2.0.0
==========================================================
*/

(function () {

"use strict";

const Experience = {

    version: "2.0.0",

    currentMoment: 0,

    async begin() {

        // Opening
        if (window.Intro?.play) {
            await Intro.play();
        }

        // Opening Letter
        if (window.Letter?.show) {

            await Letter.show({

                title: "Welcome.",

                body:
`Some places are visited.

Others become part of who we are.

Whether these streets are already familiar,
or today marks a very first encounter,
there are always stories waiting to be noticed.

Perhaps a few are waiting for you today.`,

                button: "Turn the Page"

            });

        }

        // Initialise journey systems

        Passport?.init?.();

        Diary?.init?.();

        Keepsakes?.init?.();

        Journey?.init?.();

        // Begin the first destination

        this.goToArrival();

    },

    goToArrival() {

        console.log("Arrival");

        if (window.Game?.start) {

            Game.start();

            return;

        }

        console.log(
            "Waiting for destination implementation..."
        );

    },

    nextMoment() {

        this.currentMoment++;

        console.log(
            "Next Moment:",
            this.currentMoment
        );

    }

};

window.Experience = Experience;

Experience.init = function () {

    console.log(
        "Experience Engine v2 Loaded"
    );

};

Experience.init();

})();
