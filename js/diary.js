/*
==========================================================
Singapore Explorer
Phase 2
Traveller Diary Module
Version 1.0.0
==========================================================
*/

(function () {

    "use strict";

    const Diary = {

        version: "1.0.0",

        entries: [],

        init() {
            console.log("Diary Module v1.0 Loaded");
        },

        add(entry) {

            this.entries.push({
                ...entry,
                timestamp: new Date().toISOString()
            });

            console.log("Diary Entry Added:", entry.title);

        },

        getAll() {
            return [...this.entries];
        },

        clear() {
            this.entries = [];
        }

    };

    window.Diary = Diary;

    Diary.init();

})();
