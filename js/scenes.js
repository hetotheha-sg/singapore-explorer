/* ==========================================================
   scenes.js
   An Interactive Love Letter from Singapore
   Production replacement (v2)
   ========================================================== */

(() => {
"use strict";

const Scenes = {

    viewport:null,
    index:0,

    init(viewport){
        this.viewport = viewport;
        this.index = 0;
        this.render();
    },

    render(){

        const scene = window.QUESTIONS?.[this.index];

        if(!scene){
            window.Game?.completeJourney?.();
            return;
        }

        const page = window.UI.createScene({
            image: scene.background,
            background:"linear-gradient(135deg,#0B2742,#174D73)"
        });

        page.style.gap="18px";

        const location=document.createElement("div");
        location.textContent=scene.location;
        location.style.cssText="letter-spacing:.25em;text-transform:uppercase;color:#D8B36A;font-size:.82rem;";
        page.appendChild(location);

        page.appendChild(window.UI.createTitle(scene.title));
        page.appendChild(window.UI.createBody(scene.narration));

        const card=document.createElement("div");
        card.style.cssText="width:min(760px,100%);padding:32px;border-radius:22px;background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);";

        const q=document.createElement("h3");
        q.textContent=scene.question.prompt;
        q.style.cssText="text-align:center;margin:0 0 24px;color:white;";
        card.appendChild(q);

        scene.question.options.forEach((opt,i)=>{
            const b=document.createElement("button");
            b.type="button";
            b.textContent=opt;
            b.className="primary-button";
            b.style.display="block";
            b.style.width="100%";
            b.style.margin="12px 0 0";

            b.onclick=async()=>{

                if(i!==scene.question.answer){
                    window.AudioEngine?.playError?.();
                    b.style.filter="brightness(.75)";
                    setTimeout(()=>b.style.filter="",300);
                    return;
                }

                window.AudioEngine?.playSuccess?.();
                window.Passport?.collect?.(scene.id);

                this.index++;

                const next=window.QUESTIONS?.[this.index];

                if(!next){
                    setTimeout(()=>window.Game?.completeJourney?.(),500);
                    return;
                }

                const nextPage=window.UI.createScene({
                    image:next.background,
                    background:"linear-gradient(135deg,#0B2742,#174D73)"
                });

                setTimeout(()=>this.render(),300);
            };

            card.appendChild(b);
        });

        page.appendChild(card);

        window.UI.transition(page);

    }

};

window.Scenes=Scenes;

})();
