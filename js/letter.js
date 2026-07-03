/*
==========================================================
Singapore Explorer
Phase 2
Love Letter Module
Version 1.0
==========================================================
*/

(function () {

    "use strict";

    const Letter = {

        version: "1.0.0",

        init() {
            console.log("Letter Module v1.0 Loaded");
        },

        show() {
            console.log("Letter.show() called");
        }

    };

    window.Letter = Letter;

    Letter.init();

})();
