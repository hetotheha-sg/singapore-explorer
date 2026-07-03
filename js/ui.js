/* ==========================================================
   ui.js
   An Interactive Love Letter from Singapore
   Production replacement (v2)
   ========================================================== */

(() => {
"use strict";

const UI = {

    initialized:false,
    viewport:null,
    overlay:null,
    loading:null,
    currentScene:null,

    init(){

        if(this.initialized) return;

        this.viewport=document.getElementById("sceneViewport");
        this.overlay=document.getElementById("overlay");

        if(!this.viewport){
            throw new Error("sceneViewport not found.");
        }

        this.createLoading();

        this.initialized=true;
    },

    createLoading(){

        this.loading=document.createElement("div");
        this.loading.id="ui-loading";
        Object.assign(this.loading.style,{
            position:"absolute",
            inset:"0",
            display:"none",
            alignItems:"center",
            justifyContent:"center",
            background:"rgba(5,18,32,.45)",
            backdropFilter:"blur(4px)",
            zIndex:"999"
        });

        const spinner=document.createElement("div");
        Object.assign(spinner.style,{
            width:"52px",
            height:"52px",
            border:"4px solid rgba(255,255,255,.15)",
            borderTop:"4px solid #D8B36A",
            borderRadius:"50%",
            animation:"uiSpin 1s linear infinite"
        });

        this.loading.appendChild(spinner);
        this.viewport.appendChild(this.loading);

        if(!document.getElementById("ui-spin-style")){
            const style=document.createElement("style");
            style.id="ui-spin-style";
            style.textContent="@keyframes uiSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}";
            document.head.appendChild(style);
        }
    },

    showLoading(){
        if(this.loading) this.loading.style.display="flex";
    },

    hideLoading(){
        if(this.loading) this.loading.style.display="none";
    },

    clearViewport(){

        [...this.viewport.children].forEach(node=>{
            if(node!==this.loading){
                node.remove();
            }
        });

        this.currentScene=null;
    },

    mount(element){

        if(!element) return;

        this.clearViewport();

        this.currentScene=element;

        this.viewport.appendChild(element);

        if(this.loading){
            this.viewport.appendChild(this.loading);
        }
    },

    createScene(options={}){

        const scene=document.createElement("section");

        Object.assign(scene.style,{
            position:"relative",
            width:"100%",
            height:"100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            padding:"72px",
            overflow:"hidden"
        });

        if(options.image){
            scene.style.backgroundImage=`url("${options.image}")`;
            scene.style.backgroundSize="cover";
            scene.style.backgroundPosition="center";
        }else{
            scene.style.background=options.background ||
                "linear-gradient(135deg,#0A2742,#164E76)";
        }

        return scene;
    },

    createTitle(text){

        const h=document.createElement("h1");
        h.textContent=text;

        Object.assign(h.style,{
            margin:"0",
            color:"#fff",
            textAlign:"center",
            fontFamily:"Cormorant Garamond, serif",
            fontWeight:"600",
            fontSize:"clamp(2.6rem,4vw,4.6rem)"
        });

        return h;
    },

    createBody(text){

        const p=document.createElement("p");
        p.textContent=text;

        Object.assign(p.style,{
            maxWidth:"760px",
            marginTop:"24px",
            color:"rgba(255,255,255,.9)",
            textAlign:"center",
            lineHeight:"1.8",
            fontSize:"1.05rem"
        });

        return p;
    },

    async transition(nextScene){

        await this.fadeOut();

        this.mount(nextScene);

        await this.fadeIn();
    },

    fadeOut(){

        return new Promise(resolve=>{

            if(!this.overlay){
                resolve();
                return;
            }

            this.overlay.classList.add("visible");

            setTimeout(resolve,350);

        });
    },

    fadeIn(){

        return new Promise(resolve=>{

            if(!this.overlay){
                resolve();
                return;
            }

            this.overlay.classList.remove("visible");

            setTimeout(resolve,350);

        });
    },

    resize(){}

};

/* ==========================================================
   Experience Framework
   Phase 2 Enhancement 001
   ========================================================== */

UI.Experience = {

    version: "1.0.0",

    active: false,

    current: null,

    async show(config = {}) {

        this.active = true;
        this.current = config;

        console.log(
            "[Experience]",
            config.type || "card",
            config.title || ""
        );

        return Promise.resolve();

    },

    async hide() {

    this.active = false;

    const card = document.getElementById("experience-card");

    if (card) {

        card.style.opacity = "0";

        await new Promise(resolve => setTimeout(resolve, 350));

        card.remove();

    }

    this.current = null;

    return Promise.resolve();

},

isShowing() {

    return this.active;

}

};

   /* ==========================================================
   Export
   ========================================================== */

window.UI = UI;

})();
