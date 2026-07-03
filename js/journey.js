/*
=========================================================
Singapore Explorer
journey.js
Journey Timeline & Story Summary
=========================================================
*/

(function () {
    "use strict";

    const Journey = {

        buildTimeline() {

            if (!window.GameState) return [];

            const completed = [];

            const scenes = GameState.completedScenes || [];

            scenes.forEach(scene => {

                completed.push({
                    title: scene.title || "Journey Stop",
                    location: scene.location || "",
                    category: scene.category || "",
                    completedAt: scene.completedAt || Date.now()
                });

            });

            return completed;

        },

        render() {

            const container = document.getElementById("journey-panel");

            if (!container) return;

            const timeline = this.buildTimeline();

            container.innerHTML = "";

            if (timeline.length === 0) {

                container.innerHTML = `
                    <div class="journey-empty">
                        <h2>Your Journey Begins</h2>
                        <p>
                            Every place you discover in Singapore will become
                            part of your personal travel story.
                        </p>
                    </div>
                `;

                return;

            }

            const wrapper = document.createElement("div");
            wrapper.className = "journey-wrapper";

            timeline.forEach((stop, index) => {

                const item = document.createElement("div");
                item.className = "journey-item";

                item.innerHTML = `
                    <div class="journey-dot"></div>

                    <div class="journey-content">

                        <div class="journey-number">
                            Stop ${index + 1}
                        </div>

                        <h3>${stop.title}</h3>

                        ${stop.location
                            ? `<p class="journey-location">${stop.location}</p>`
                            : ""}

                        ${stop.category
                            ? `<p class="journey-category">${stop.category}</p>`
                            : ""}

                    </div>
                `;

                wrapper.appendChild(item);

            });

            container.appendChild(wrapper);

        },

        open() {

            const panel = document.getElementById("journey-panel");

            if (!panel) return;

            this.render();

            panel.classList.remove("hidden");

        },

        close() {

            const panel = document.getElementById("journey-panel");

            if (!panel) return;

            panel.classList.add("hidden");

        },

        toggle() {

            const panel = document.getElementById("journey-panel");

            if (!panel) return;

            if (panel.classList.contains("hidden")) {

                this.open();

            } else {

                this.close();

            }

        }

    };

    window.Journey = Journey;

})();
