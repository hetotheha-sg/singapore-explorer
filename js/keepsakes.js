/*
==========================================================
Singapore Explorer
Phase 2
Keepsakes Module
Version 1.0.0
==========================================================
*/

(function () {

    "use strict";

    const Keepsakes = {

        version: "1.0.0",

        items: [],

        init() {
            console.log("Keepsakes Module v1.0 Loaded");
        },

        add(item) {

            if (!item || !item.id) return false;

            const exists = this.items.some(i => i.id === item.id);

            if (exists) return false;

            this.items.push({
                ...item,
                collectedAt: new Date().toISOString()
            });

            console.log("Keepsake Collected:", item.title);

            return true;

        },

        get(id) {
            return this.items.find(item => item.id === id);
        },

        getAll() {
            return [...this.items];
        },

        count() {
            return this.items.length;
        },

        clear() {
            this.items = [];
        }

    };

    window.Keepsakes = Keepsakes;

    Keepsakes.init();

})();
