
/* ==========================================================
   moments.js
   An Interactive Love Letter from Singapore
   Launch Sprint MVP v1.0
   ========================================================== */

(() => {
"use strict";

const wait = (ms)=>new Promise(r=>setTimeout(r,ms));

async function showLetter(title, body, button="Continue"){
    if(window.Letter?.show){
        return window.Letter.show({title,body,button});
    }
}

async function showDiscovery(text){
    return showLetter(
        "A Discovery",
        text,
        "Continue"
    );
}

async function collectMemory(scene){
    if(window.Passport?.collect){
        Passport.collect(scene.id);
    }
    if(window.Keepsakes?.collect){
        Keepsakes.collect(scene.memory || scene.passportStamp || scene.location);
    }
}

const Moments = {

async arrival(scene){

    await showLetter(
        "Welcome.",
`Every memorable journey begins with a first step.

Whether these streets have long been part of your story,
or today is your first encounter,

thank you for spending a little time here.

Shall we begin?

— Singapore`,
        "Turn the Page"
    );

    const name = prompt("Passenger Name") || "Traveller";

    await showDiscovery(
`Changi Airport was designed so that the journey itself becomes part of the destination.

Welcome, ${name}.`
    );

    await collectMemory(scene);

    await showLetter(
        "A Memory",
        "Your Boarding Pass has been added to your journey.",
        "Continue"
    );

    if(window.Scenes?.next){
        Scenes.next();
    }
},

async jewel(scene){

    await showLetter(
        "Look Up.",
        "Before continuing, pause for a moment and imagine standing beneath the Rain Vortex.",
        "I Looked Up"
    );

    await showDiscovery(
        "Jewel's Rain Vortex is the world's tallest indoor waterfall."
    );

    await collectMemory(scene);

    if(window.Scenes?.next) Scenes.next();
},

async generic(scene){

    if(scene.letter){
        await showLetter(
            scene.letter.title || scene.title,
            scene.letter.body,
            "Continue"
        );
    }

    if(scene.discovery){
        await showDiscovery(scene.discovery.body || scene.discovery);
    }

    await collectMemory(scene);

    if(window.Scenes?.next) Scenes.next();
}

};

window.Moments = Moments;

})();
