/* ==========================================================
   ui.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    const UI = {

        initialized: false,

        viewport: null,

        currentSceneElement: null,

        loadingOverlay: null,

        init() {

            if (this.initialized) return;

            this.viewport = document.getElementById("sceneViewport");

            this.createLoadingOverlay();

            this.initialized = true;
        },

        createLoadingOverlay() {

            if (this.loadingOverlay) return;

            const overlay = document.createElement("div");

            overlay.id = "ui-loading-overlay";

            overlay.style.position = "absolute";
            overlay.style.inset = "0";
            overlay.style.display = "none";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.background = "rgba(6,21,35,.55)";
            overlay.style.backdropFilter = "blur(6px)";
            overlay.style.zIndex = "999";

            overlay.innerHTML = `
                <div style="
                    width:56px;
                    height:56px;
                    border:4px solid rgba(255,255,255,.15);
                    border-top-color:#D8B36A;
                    border-radius:50%;
                    animation:ui-spin 1s linear infinite;
                "></div>
            `;

            this.viewport.appendChild(overlay);

            this.loadingOverlay = overlay;

            if (!document.getElementById("ui-spin-style")) {

                const style = document.createElement("style");

                style.id = "ui-spin-style";

                style.textContent = `
                    @keyframes ui-spin{
                        from{transform:rotate(0deg);}
                        to{transform:rotate(360deg);}
                    }
                `;

                document.head.appendChild(style);

            }

        },

        showLoading() {

            if (!this.loadingOverlay) return;

            this.loadingOverlay.style.display = "flex";

        },

        hideLoading() {

            if (!this.loadingOverlay) return;

            this.loadingOverlay.style.display = "none";

        },

        clearViewport() {

            if (!this.viewport) return;

            [...this.viewport.children].forEach(child => {

                if (child !== this.loadingOverlay) {

                    child.remove();

                }

            });

            this.currentSceneElement = null;

        },

        mount(element) {

            if (!this.viewport || !element) return;

            this.clearViewport();

            this.viewport.appendChild(element);

            this.currentSceneElement = element;

        },

        createScene(options = {}) {

            const scene = document.createElement("section");

            scene.className = "experience-scene";

            scene.style.width = "100%";
            scene.style.height = "100%";
            scene.style.position = "relative";
            scene.style.display = "flex";
            scene.style.flexDirection = "column";
            scene.style.justifyContent = "center";
            scene.style.alignItems = "center";
            scene.style.padding = "64px";
            scene.style.color = "#fff";

            if (options.background) {

                scene.style.background = options.background;

            }

            if (options.image) {

                scene.style.backgroundImage = `url('${options.image}')`;
                scene.style.backgroundSize = "cover";
                scene.style.backgroundPosition = "center";

            }

            return scene;

        },

        createTitle(text) {

            const title = document.createElement("h1");

            title.textContent = text;

            title.style.margin = "0";
            title.style.fontFamily = "'Cormorant Garamond', serif";
            title.style.fontWeight = "600";
            title.style.fontSize = "clamp(2.6rem,4vw,4.5rem)";
            title.style.textAlign = "center";
            title.style.maxWidth = "900px";

            return title;

        },

        createBody(text) {

            const body = document.createElement("p");

            body.textContent = text;

            body.style.maxWidth = "720px";
            body.style.marginTop = "24px";
            body.style.lineHeight = "1.8";
            body.style.fontSize = "1.08rem";
            body.style.textAlign = "center";
            body.style.color = "rgba(255,255,255,.88)";

            return body;

        },

        createPrimaryButton(label, callback) {

            const button = document.createElement("button");

            button.className = "primary-button";

            button.textContent = label;

            button.type = "button";

            button.style.marginTop = "36px";

            button.addEventListener("click", callback);

            return button;

        },

        fadeOut(duration = 500) {

            return new Promise(resolve => {

                const overlay = document.getElementById("overlay");

                if (!overlay) {

                    resolve();

                    return;

                }

                overlay.classList.add("visible");

                setTimeout(resolve, duration);

            });

        },

        fadeIn(duration = 500) {

            return new Promise(resolve => {

                const overlay = document.getElementById("overlay");

                if (!overlay) {

                    resolve();

                    return;

                }

                overlay.classList.remove("visible");

                setTimeout(resolve, duration);

            });

        },

        async transition(nextScene) {

            await this.fadeOut();

            this.mount(nextScene);

            await this.fadeIn();

        },

        resize() {

            if (!this.currentSceneElement) return;

            // Reserved for future responsive scene logic.

        }

    };

    window.UI = UI;

})();