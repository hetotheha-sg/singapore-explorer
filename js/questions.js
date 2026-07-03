/* ==========================================================
   questions.js
   An Interactive Love Letter from Singapore
   Version 2.0.0
   ========================================================== */

(() => {

"use strict";

window.QUESTIONS = [

/* ==========================================================
   1. CHANGI AIRPORT
   ========================================================== */

{
    id: 1,

    slug: "arrival",

    location: "Changi Airport",

    title: "Welcome to Singapore",

    narration:
        "Every journey begins with a warm welcome. As you arrive in Singapore, your adventure starts not with a destination, but with curiosity.",

    passportStamp: "Arrival",

    background: "assets/scenes/changi-arrival.jpg",

    letter: {

        title: "Dear Traveller",

        body:
            "Every unforgettable journey begins with a single arrival. We hope the warmth you feel today stays with you long after your footprints leave Singapore."

    },

    question: {

        type: "multiple-choice",

        prompt:
            "What is Singapore's world-famous airport called?",

        options: [

            "Marina Airport",
            "Lion Airport",
            "Changi Airport",
            "Merlion Airport"

        ],

        answer: 2

    }

},

/* ==========================================================
   2. MERLION
   ========================================================== */

{
    id: 2,

    slug: "merlion",

    location: "Merlion Park",

    title: "The Symbol of Singapore",

    narration:
        "Standing proudly beside Marina Bay, the Merlion tells the story of Singapore's journey from a humble fishing village to a thriving global city.",

    passportStamp: "Merlion",

    background: "assets/scenes/merlion.jpg",

    letter: {

        title: "Dear Traveller",

        body:
            "Every city has landmarks. But the places we truly remember are those where stories, dreams and history quietly meet."

    },

    question: {

        type: "multiple-choice",

        prompt:
            "The Merlion has the head of a lion and the body of a...",

        options: [

            "Dragon",
            "Fish",
            "Tiger",
            "Dolphin"

        ],

        answer: 1

    }

},

/* ==========================================================
   3. HAWKER CENTRE
   ========================================================== */

{
    id: 3,

    slug: "hawker",

    location: "Hawker Centre",

    title: "A Taste of Singapore",

    narration:
        "At Singapore's hawker centres, recipes are passed from one generation to the next, bringing together cultures through every shared meal.",

    passportStamp: "Hawker",

    background: "assets/scenes/hawker.jpg",

    letter: {

        title: "Dear Traveller",

        body:
            "The flavour of a nation is found not only in its food, but in the people who prepare it with pride, patience and generations of tradition."

    },

    question: {

        type: "multiple-choice",

        prompt:
            "Which organisation recognised Singapore's hawker culture as Intangible Cultural Heritage?",

        options: [

            "ASEAN",
            "UNESCO",
            "World Bank",
            "IOC"

        ],

        answer: 1

    }

},

/* ==========================================================
   4. GARDENS BY THE BAY
   ========================================================== */

{
    id: 4,

    slug: "gardens",

    location: "Gardens by the Bay",

    title: "Nature Meets Innovation",

    narration:
        "Towering Supertrees and breathtaking conservatories reflect Singapore's vision of becoming a City in Nature.",

    passportStamp: "Gardens",

    background: "assets/scenes/gardens.jpg",

    letter: {

        title: "Dear Traveller",

        body:
            "Progress is at its most beautiful when it grows alongside nature. Singapore reminds us that imagination and sustainability can flourish together."

    },

    question: {

        type: "multiple-choice",

        prompt:
            "What are the iconic vertical structures at Gardens by the Bay called?",

        options: [

            "Sky Trees",
            "Supertrees",
            "Green Towers",
            "Nature Columns"

        ],

        answer: 1

    }

},

/* ==========================================================
   5. JEWEL CHANGI AIRPORT
   ========================================================== */

{
    id: 5,

    slug: "jewel",

    location: "Jewel Changi Airport",

    title: "A Perfect Farewell",

    narration:
        "Before your journey comes to an end, pause beneath the Rain Vortex and take a quiet moment to remember every story collected along the way.",

    passportStamp: "Departure",

    background: "assets/scenes/jewel.jpg",

    letter: {

        title: "Until We Meet Again",

        body:
            "Every farewell carries the promise of another hello. Wherever your next destination may be, may a small part of Singapore travel with you."

    },

    question: {

        type: "multiple-choice",

        prompt:
            "What is the name of the world's tallest indoor waterfall at Jewel?",

        options: [

            "Sky Cascade",
            "Rain Vortex",
            "Crystal Falls",
            "Cloud Fountain"

        ],

        answer: 1

    }

}

];

})();
