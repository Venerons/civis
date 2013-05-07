// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
//"use strict";

// UNITS DATABASE
var unitsDB = {
    "settler": 
        {
            "atk": 0,
            "def": 0,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 30,
            "initialLife": 1,
            "techrequired": "none"
        },
    "warrior": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 10,
            "initialLife": 1,
            "techrequired": "none"
        },
    "archer": 
        {
            "atk": 1,
            "def": 2,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 10,
            "initialLife": 1,
            "techrequired": "Bronze Working"
        },
    "galley": 
        {
            "atk": 1,
            "def": 1,
            "mov": 2,
            "naval": true,
            "terrain": false,
            "productioncost": 30,
            "initialLife": 1,
            "techrequired": "none"
        }
};

// BUILDINGS DATABASE
var buildingsDB = {
    "Granary": // +2 food
        {
            "productioncost": 40,
            "techrequired": "Agriculture",
            "buildingrequired": "none"
        },
    "Barracks": // +5 exp to the unit created on that city
        {
            "productioncost": 40,
            "techrequired": "Bronze Working",
            "buildingrequired": "none"
        },
    "Library": // +1 science per 2 citizen (+ (popultation / 2) science)
        {
            "productioncost": 40,
            "techrequired": "Writing",
            "buildingrequired": "none"
        },
    "Monument": // +2 culture
        {
            "productioncost": 20,
            "techrequired": "Mysticism",
            "buildingrequired": "none"
        }
};

// TECHNOLOGIES DATABASE
var techDB = {
    "Agriculture": 
        {
            "productioncost": 20,
            "techrequired": []
        }
};

// CIVILIZATIONS DATABASE
var civsDB = {
    "America": {
        "leaders": ["Abraham Lincoln", "Washington", "Roosevelt"]
    },
    "Arabia": {
        "leaders": ["Saladin", "Harun al-Rashid"]
    },
    "Assyria": {
        "leaders": ["Ashurbanipal"]
    },
    "Austria": {
        "leaders": ["Maria Theresa"]
    },
    "Aztec": {
        "leaders": ["Montezuma II"]
    },
    "Babylon": {
        "leaders": ["Nebuchadnezzar II"]
    },
    "Brazil": {
        "leaders": ["Pedro"]
    },
    "Byzantio": {
        "leaders": ["Theodora"]
    },
    "Carthagine": {
        "leaders": ["Dido"]
    },
    "Celts": {
        "leaders": ["Boudica"]
    },
    "China": {
        "leaders": ["Mao Zedong", "Wu Zetian", "Qin Shi Huang"]
    },
    "Denmark": {
        "leaders": ["Harald Bluetooth"]
    },
    "Dutch": {
        "leaders": ["William"]
    },
    "Egypt": {
        "leaders": ["Cleopatra", "Ramesses II", "Hatshepsut"]
    },
    "England": {
        "leaders": ["Elizabeth I", "Victoria I", "Henry VIII", "Winston Churchill"]
    },
    "Ethiopian": {
        "leaders": ["Haile Selassie"]
    },
    "France": {
        "leaders": ["Napoleon", "Louis XIV", "Joan d'Arc"]
    },
    "Germany": {
        "leaders": ["Otto von Bismark", "Frederick II"]
    },
    "Greece": {
        "leaders": ["Alexander III"]
    },
    "Hun": {
        "leaders": ["Attila"]
    },
    "Inca": {
        "leaders": ["Pachacuti", "Huayna Capac"]
    },
    "India": {
        "leaders": ["Mohatma Gandhi", "Asoka"]
    },
    "Iroquois": {
        "leaders": ["Hiawatha"]
    },
    "Japan": {
        "leaders": ["Tokugawa Ieyasu", "Oda Nobunaga"]
    },
    "Korea": {
        "leaders": ["Sejong"]
    },
    "Maya": {
        "leaders": ["Pacal"]
    },
    "Mali": {
        "leaders": ["Mansa Musa"]
    },
    "Mongolia": {
        "leaders": ["Genghis Khan", "Kublai Khan"]
    },
    "Ottoman Empire": {
        "leaders": ["Suleiman"]
    },
    "Persia": {
        "leaders": ["Darius", "Cyrus", "Xerxes"]
    },
    "Polish": {
        "leaders": ["Casimir"]
    },
    "Polynesia": {
        "leaders": ["Kamehameha"]
    },
    "Portugal": {
        "leaders": ["Maria"]
    },
    "Rome": {
        "leaders": ["Julius Caesar", "Augustus Caesar"]
    },
    "Russia": {
        "leaders": ["Catherine II", "Peter I", "Vladimir Lenin"]
    },
    "Siam": {
        "leaders": ["Ramkhamhaeng"]
    },
    "Songhai": {
        "leaders": ["Askia"]
    },
    "Spain": {
        "leaders": ["Isabella I"]
    },
    "Sweden": {
        "leaders": ["Gustavus Adolphus"]
    },
    "Zulu": {
        "leaders": ["Shaka"]
    }
};
