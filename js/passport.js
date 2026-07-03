/* ==========================================================
   passport.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    const Passport = {

        initialized: false,

        panel: null,

        progressText: null,

        stampContainer: null,

        totalStops: 0,

        collected: new Set(),

        init() {

            if (this.initialized) return;

            this.panel = document.getElementById("passportPanel");

            if (!this.panel) return;

            this.totalStops = Array.isArray(window.QUESTIONS)
                ? window.QUESTIONS.length
                : 0;

            this.render();

            this.restore();

            this.initialized = true;

        },

        render() {

            this.panel.innerHTML = "";

            const card = document.createElement("div");

            card.style.background = "rgba(8,22,38,.78)";
            card.style.backdropFilter = "blur(18px)";
            card.style.border = "1px solid rgba(255,255,255,.12)";
            card.style.borderRadius = "22px";
            card.style.padding = "22px";
            card.style.boxShadow = "0 20px 40px rgba(0,0,0,.28)";
            card.style.pointerEvents = "auto";

            const title = document.createElement("h3");

            title.textContent = "Traveller's Passport";

            title.style.margin = "0";
            title.style.fontFamily = "'Cormorant Garamond', serif";
            title.style.fontWeight = "600";
            title.style.fontSize = "1.9rem";
            title.style.color = "#FFFFFF";

            this.progressText = document.createElement("div");

            this.progressText.style.marginTop = "8px";
            this.progressText.style.color = "rgba(255,255,255,.78)";
            this.progressText.style.fontSize = ".95rem";

            this.stampContainer = document.createElement("div");

            this.stampContainer.style.marginTop = "20px";
            this.stampContainer.style.display = "grid";
            this.stampContainer.style.gridTemplateColumns = "repeat(2,1fr)";
            this.stampContainer.style.gap = "12px";

            card.appendChild(title);
            card.appendChild(this.progressText);
            card.appendChild(this.stampContainer);

            this.panel.appendChild(card);

            this.buildStampSlots();

            this.updateProgress();

        },

        buildStampSlots() {

            this.stampContainer.innerHTML = "";

            if (!Array.isArray(window.QUESTIONS)) return;

            window.QUESTIONS.forEach(scene => {

                const stamp = document.createElement("div");

                stamp.className = "passport-stamp";

                stamp.dataset.id = scene.id;

                stamp.style.border = "1px dashed rgba(216,179,106,.45)";
                stamp.style.borderRadius = "16px";
                stamp.style.padding = "12px";
                stamp.style.minHeight = "82px";
                stamp.style.display = "flex";
                stamp.style.flexDirection = "column";
                stamp.style.justifyContent = "center";
                stamp.style.alignItems = "center";
                stamp.style.transition = "all .35s ease";
                stamp.style.background = "rgba(255,255,255,.03)";
                stamp.style.opacity = ".35";

                const icon = document.createElement("div");

                icon.textContent = "◌";

                icon.style.fontSize = "1.4rem";
                icon.style.color = "#D8B36A";

                const label = document.createElement("div");

                label.textContent = scene.passportStamp;

                label.style.marginTop = "6px";
                label.style.fontSize = ".82rem";
                label.style.textAlign = "center";
                label.style.color = "#FFFFFF";

                stamp.appendChild(icon);
                stamp.appendChild(label);

                this.stampContainer.appendChild(stamp);

            });

        },

        collect(sceneId) {

            if (this.collected.has(sceneId)) return;

            this.collected.add(sceneId);

            const stamp = this.stampContainer.querySelector(
                `[data-id="${sceneId}"]`
            );

            if (stamp) {

                stamp.style.opacity = "1";
                stamp.style.background =
                    "linear-gradient(135deg,#D8B36A,#C99845)";
                stamp.style.color = "#13263E";
                stamp.style.border = "none";
                stamp.style.transform = "scale(1.04)";

                const icon = stamp.firstElementChild;

                if (icon) {

                    icon.textContent = "✓";
                    icon.style.color = "#13263E";

                }

            }

            this.updateProgress();

            this.save();

        },

        updateProgress() {

            if (!this.progressText) return;

            this.progressText.textContent =
                `${this.collected.size} of ${this.totalStops} passport stamps collected`;

        },

        save() {

            if (!window.Save?.set) return;

            window.Save.set(
                "passportProgress",
                Array.from(this.collected)
            );

        },

        restore() {

            if (!window.Save?.get) return;

            const data = window.Save.get("passportProgress");

            if (!Array.isArray(data)) return;

            data.forEach(id => {

                this.collected.add(id);

            });

            this.collected.forEach(id => {

                const stamp = this.stampContainer.querySelector(
                    `[data-id="${id}"]`
                );

                if (!stamp) return;

                stamp.style.opacity = "1";
                stamp.style.background =
                    "linear-gradient(135deg,#D8B36A,#C99845)";
                stamp.style.border = "none";

                const icon = stamp.firstElementChild;

                if (icon) {

                    icon.textContent = "✓";
                    icon.style.color = "#13263E";

                }

            });

            this.updateProgress();

        },

        reset() {

            this.collected.clear();

            this.buildStampSlots();

            this.updateProgress();

            if (window.Save?.remove) {

                window.Save.remove("passportProgress");

            }

        }

    };

    window.Passport = Passport;

})();