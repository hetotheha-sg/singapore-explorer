
/* ==========================================================
   diary.js
   Traveller's Diary
   Launch Sprint MVP v2.0
   ========================================================== */

(() => {
"use strict";

const Diary = {

version:"2.0.0",
entries:[],

init(){
    this.restore();
},

add(scene){

    if(!scene) return;

    if(this.entries.find(e=>e.id===scene.id)) return;

    this.entries.push({

        id:scene.id,
        location:scene.location,
        title:scene.title,
        date:new Date().toLocaleDateString(),

        letter:scene.letter?.body || "",

        memory:scene.memory || scene.passportStamp || "",

        discovery:
            scene.discovery?.body ||
            scene.discovery ||
            ""

    });

    this.save();

},

save(){
    window.Save?.set?.(
        "travellersDiary",
        this.entries
    );
},

restore(){
    this.entries =
        window.Save?.get?.(
            "travellersDiary",
            []
        ) || [];
},

getAll(){
    return [...this.entries];
},

clear(){
    this.entries=[];
    this.save();
},

exportText(){

    return this.entries.map(entry=>`

📍 ${entry.location}

❤️ Letter
${entry.letter}

📸 Memory
${entry.memory}

🧠 Discovery
${entry.discovery}

----------------------------------------
`).join("");

}

};

window.Diary = Diary;

Diary.init();

})();
