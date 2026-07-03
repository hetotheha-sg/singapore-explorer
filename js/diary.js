/* ==========================================================
   diary.js
   An Interactive Love Letter from Singapore
   Version 1.0.0
   ========================================================== */

(() => {

"use strict";

const Diary = {

    version: "1.0.0",

    entries: [],

    init() {

        this.restore();

        console.log("Diary v1.0 Loaded");

    },

    add(scene) {

        if (!scene) return;

        const exists = this.entries.some(
            entry => entry.id === scene.id
        );

        if (exists) return;

        this.entries.push({

            id: scene.id,

            location: scene.location,

            title: scene.title,

            narration: scene.narration,

            date: new Date().toLocaleDateString()

        });

        this.save();

    },

    getAll() {

        return [...this.entries];

    },

    clear() {

        this.entries = [];

        this.save();

    },

    save() {

        window.Save?.set?.(

            "travelDiary",

            this.entries

        );

    },

    restore() {

        const data = window.Save?.get?.(

            "travelDiary",

            []

        );

        this.entries = Array.isArray(data)

            ? data

            : [];

    },

    exportText() {

        let output = "";

        this.entries.forEach(entry => {

            output +=
`📍 ${entry.location}

${entry.narration}

----------------------------------

`;

        });

        return output;

    }

};

window.Diary = Diary;

Diary.init();

})();
