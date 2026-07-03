
/* ==========================================================
   scenes.js
   An Interactive Love Letter from Singapore
   Launch Sprint MVP v4.0
   ========================================================== */

(() => {
"use strict";

const Scenes = {

    viewport:null,
    index:0,
    moments:null,

    init(viewport){
        this.viewport = viewport;
        this.moments = window.MOMENTS || window.QUESTIONS || [];
        this.index = 0;
        this.play();
    },

    async play(){

        const scene = this.moments[this.index];

        if(!scene){
            if(window.Moments?.untilWeMeetAgain){
                return window.Moments.untilWeMeetAgain();
            }
            return window.Game?.completeJourney?.();
        }

        switch(scene.slug){
            case "arrival":
                return window.Moments.arrival(scene);
            case "jewel":
                return window.Moments.jewel(scene);
            default:
                return window.Moments.generic(scene);
        }
    },

    next(){
        this.index++;
        this.play();
    }

};

window.Scenes = Scenes;

})();
