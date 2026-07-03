/* ==========================================================
   save.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    const STORAGE_PREFIX = "sg-explorer::";

    const Save = {

        isAvailable() {

            try {

                const testKey = STORAGE_PREFIX + "__test__";

                localStorage.setItem(testKey, "1");
                localStorage.removeItem(testKey);

                return true;

            } catch (_) {

                return false;

            }

        },

        buildKey(key) {

            return STORAGE_PREFIX + key;

        },

        set(key, value) {

            if (!this.isAvailable()) return false;

            try {

                localStorage.setItem(
                    this.buildKey(key),
                    JSON.stringify(value)
                );

                return true;

            } catch (error) {

                console.warn("Unable to save data.", error);

                return false;

            }

        },

        get(key, fallback = null) {

            if (!this.isAvailable()) return fallback;

            try {

                const raw = localStorage.getItem(
                    this.buildKey(key)
                );

                if (raw === null) {

                    return fallback;

                }

                return JSON.parse(raw);

            } catch (error) {

                console.warn("Unable to load save data.", error);

                return fallback;

            }

        },

        has(key) {

            if (!this.isAvailable()) return false;

            return (
                localStorage.getItem(
                    this.buildKey(key)
                ) !== null
            );

        },

        remove(key) {

            if (!this.isAvailable()) return;

            localStorage.removeItem(
                this.buildKey(key)
            );

        },

        clear() {

            if (!this.isAvailable()) return;

            Object.keys(localStorage).forEach(storageKey => {

                if (storageKey.startsWith(STORAGE_PREFIX)) {

                    localStorage.removeItem(storageKey);

                }

            });

        },

        export() {

            if (!this.isAvailable()) return {};

            const data = {};

            Object.keys(localStorage).forEach(storageKey => {

                if (!storageKey.startsWith(STORAGE_PREFIX)) {

                    return;

                }

                const cleanKey = storageKey.replace(
                    STORAGE_PREFIX,
                    ""
                );

                try {

                    data[cleanKey] = JSON.parse(
                        localStorage.getItem(storageKey)
                    );

                } catch (_) {

                    data[cleanKey] =
                        localStorage.getItem(storageKey);

                }

            });

            return data;

        },

        import(saveObject) {

            if (!this.isAvailable()) return false;

            if (
                typeof saveObject !== "object" ||
                saveObject === null
            ) {

                return false;

            }

            Object.entries(saveObject).forEach(
                ([key, value]) => {

                    this.set(key, value);

                }
            );

            return true;

        }

    };

    window.Save = Save;

})();