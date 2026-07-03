/* ==========================================================
   questions.js
   An Interactive Love Letter from Singapore
   ========================================================== */

(() => {
    "use strict";

    /*
        This file is the single source of truth for all journey content.
        Each scene represents one destination in Singapore.

        Future files (scenes.js, passport.js, etc.) consume this structure.
    */

    window.QUESTIONS = [

        {
            id: 1,
            slug: "arrival",

            location: "Changi Airport",

            title: "Welcome to Singapore",

            narration:
                "Every journey begins with a warm welcome. As you arrive in Singapore, your adventure starts not with a destination, but with curiosity.",

            passportStamp: "Arrival",

            background: "assets/scenes/changi-arrival.jpg",

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

        {
            id: 2,
            slug: "merlion",

            location: "Merlion Park",

            title: "The Symbol of Singapore",

            narration:
                "Standing proudly at Marina Bay, the Merlion represents Singapore's humble beginnings as a fishing village and its growth into a global city.",

            passportStamp: "Merlion",

            background: "assets/scenes/merlion.jpg",

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

        {
            id: 3,
            slug: "hawker",

            location: "Hawker Centre",

            title: "A Taste of Singapore",

            narration:
                "Singapore's hawker centres bring together generations of recipes, cultures and communities under one roof.",

            passportStamp: "Hawker",

            background: "assets/scenes/hawker.jpg",

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

        {
            id: 4,
            slug: "gardens",

            location: "Gardens by the Bay",

            title: "Nature Meets Innovation",

            narration:
                "Towering Supertrees and lush conservatories showcase Singapore's vision of becoming a City in Nature.",

            passportStamp: "Gardens",

            background: "assets/scenes/gardens.jpg",

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

        {
            id: 5,
            slug: "jewel",

            location: "Jewel Changi Airport",

            title: "A Perfect Farewell",

            narration:
                "Before your journey ends, pause beneath the Rain Vortex and reflect on the memories you've collected across Singapore.",

            passportStamp: "Departure",

            background: "assets/scenes/jewel.jpg",

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