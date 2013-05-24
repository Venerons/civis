// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
"use strict";

// UNITS DATABASE
var unitsDB = {
    "settler": 
        {
            "atk": 0,
            "def": 0,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 50,
            "initialLife": 1,
            "techrequired": "none",
            "obsolete": "none"
        },
    "worker": 
        {
            "atk": 0,
            "def": 0,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 45,
            "initialLife": 1,
            "techrequired": "none",
            "obsolete": "none"
        },
    "scout": 
        {
            "atk": 0,
            "def": 1,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 25,
            "initialLife": 1,
            "techrequired": "none",
            "obsolete": "Scientific Theory"
        },
    "warrior": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 40,
            "initialLife": 1,
            "techrequired": "none",
            "obsolete": "Iron Working"
        },
    "archer": 
        {
            "atk": 1,
            "def": 2,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 40,
            "initialLife": 1,
            "techrequired": "Archery",
            "obsolete": "Gunpowder"
        },
    "galley": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": true,
            "terrain": false,
            "productioncost": 45,
            "initialLife": 1,
            "techrequired": "Sailing",
            "obsolete": "Optics"
        },
    "spearman": 
        {
            "atk": 2,
            "def": 1,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 56,
            "initialLife": 1,
            "techrequired": "Bronze Working",
            "obsolete": "Iron Working"
        },
    "catapult": 
        {
            "atk": 4,
            "def": 1,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 75,
            "initialLife": 1,
            "techrequired": "Engineering",
            "obsolete": "Gunpowder"
        },
    "horseman": 
        {
            "atk": 2,
            "def": 1,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 75,
            "initialLife": 1,
            "techrequired": "Horse Riding",
            "obsolete": "Code of Chivalry"
        },
    "swordsman": 
        {
            "atk": 2,
            "def": 2,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 75,
            "initialLife": 1,
            "techrequired": "Iron Working",
            "obsolete": "Metal Casting"
        },
    "trireme": 
        {
            "atk": 2,
            "def": 2,
            "mov": 2,
            "naval": true,
            "terrain": false,
            "productioncost": 75,
            "initialLife": 1,
            "techrequired": "Optics",
            "obsolete": "Astronomy"
        },
    "galleon": 
        {
            "atk": 3,
            "def": 3,
            "mov": 3,
            "naval": true,
            "terrain": false,
            "productioncost": 120,
            "initialLife": 1,
            "techrequired": "Astronomy",
            "obsolete": "Steam Energy"
        },
    "knight": 
        {
            "atk": 4,
            "def": 2,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 120,
            "initialLife": 1,
            "techrequired": "Code of Chivalry",
            "obsolete": "Metal Casting"
        },
    "lancer": 
        {
            "atk": 4,
            "def": 3,
            "mov": 2,
            "naval": false,
            "terrain": true,
            "productioncost": 125,
            "initialLife": 1,
            "techrequired": "Metal Casting",
            "obsolete": "Rifling"
        }
};

// BUILDINGS DATABASE
var buildingsDB = {
    "Granary": // +3 food
        {
            "productioncost": 60,
            "techrequired": "Agriculture",
            "buildingrequired": "none",
            "maintenance": 1
        },
    "Barracks": // +5 exp to the unit created on that city
        {
            "productioncost": 75,
            "techrequired": "Bronze Working",
            "buildingrequired": "none",
            "maintenance": 1
        },
    "Library": // +1 science per 2 citizen (+ (popultation / 2) science)
        {
            "productioncost": 75,
            "techrequired": "Writing",
            "buildingrequired": "none",
            "maintenance": 1
        },
    "Monument": // +2 culture
        {
            "productioncost": 40,
            "techrequired": "Mysticism",
            "buildingrequired": "none",
            "maintenance": 1
        },
    "Temple": // +1 culture per 2 citizen (+ (popultation / 2) culture)
        {
            "productioncost": 75,
            "techrequired": "Theology",
            "buildingrequired": "Monument",
            "maintenance": 1
        },
    "University": // +1 science per 2 citizen (+ (popultation / 2) science)
        {
            "productioncost": 160,
            "techrequired": "Education",
            "buildingrequired": "Library",
            "maintenance": 1
        },
    "Aqueduct": // +50% food
        {
            "productioncost": 100,
            "techrequired": "Engineering",
            "buildingrequired": "none",
            "maintenance": 1
        },
    "Market": // +2 Gold +25% gold
        {
            "productioncost": 100,
            "techrequired": "Currency",
            "buildingrequired": "none",
            "maintenance": 1
        },
    "Bank": // +2 Gold +25% gold
        {
            "productioncost": 200,
            "techrequired": "Banking",
            "buildingrequired": "Market",
            "maintenance": 1
        }
};

// TECHNOLOGIES DATABASE
var techDB = {
    "Agriculture": // agricoltura
        {
            "productioncost": 20,
            "techrequired": []
        },
    "Writing": // scrittura
        {
            "productioncost": 20,
            "techrequired": []
        },
    "Mysticism": // misticismo
        {
            "productioncost": 20,
            "techrequired": []
        },
    "Hunting": // caccia
        {
            "productioncost": 20,
            "techrequired": []
        },
    "Fishing": // pesca
        {
            "productioncost": 20,
            "techrequired": []
        },
    "Theology": // teologia
        {
            "productioncost": 40,
            "techrequired": ["Mysticism", "Writing"]
        },
    "Mathematics": // matematica
        {
            "productioncost": 40,
            "techrequired": ["Writing", "Wheel"]
        },
    "Wheel": // ruota
        {
            "productioncost": 40,
            "techrequired": ["Agriculture"]
        },
    "Mining": // estrazione mineraria
        {
            "productioncost": 40,
            "techrequired": ["Agriculture"]
        },
    "Breeding": // allevamento
        {
            "productioncost": 40,
            "techrequired": ["Agriculture", "Hunting"]
        },
    "Archery": // tiro con l'arco
        {
            "productioncost": 40,
            "techrequired": ["Hunting"]
        },
    "Sailing": // navigazione
        {
            "productioncost": 40,
            "techrequired": ["Fishing"]
        },
    "Divine Right": // diritto divino
        {
            "productioncost": 80,
            "techrequired": ["Theology"]
        },
    "Education": // educazione
        {
            "productioncost": 80,
            "techrequired": ["Theology", "Mathematics"]
        },
    "Currency": // valuta
        {
            "productioncost": 80,
            "techrequired": ["Mathematics"]
        },
    "Masonry": // muratura
        {
            "productioncost": 80,
            "techrequired": ["Mining"]
        },
    "Bronze Working": // lavorazione del bronzo
        {
            "productioncost": 80,
            "techrequired": ["Mining"]
        },
    "Horse Riding": // equitazione
        {
            "productioncost": 80,
            "techrequired": ["Breeding"]
        },
    "Optics": // ottica
        {
            "productioncost": 80,
            "techrequired": ["Archery", "Sailing"]
        },
    "Art": // arte
        {
            "productioncost": 160,
            "techrequired": ["Divine Right", "Education"]
        },
    "Literature": // letteratura
        {
            "productioncost": 160,
            "techrequired": ["Education"]
        },
    "Engineering": // ingegneria
        {
            "productioncost": 160,
            "techrequired": ["Mathematics", "Masonry"]
        },
    "Iron Working": // lavorazione del ferro
        {
            "productioncost": 160,
            "techrequired": ["Bronze Working"]
        },
    "Code of Chivalry": // codice cavalleresco
        {
            "productioncost": 160,
            "techrequired": ["Horse Riding", "Currency"]
        },
    "Astronomy": // astronomia
        {
            "productioncost": 160,
            "techrequired": ["Optics"]
        },
    "Music": // musica
        {
            "productioncost": 320,
            "techrequired": ["Art", "Literature"]
        },
    "Banking": // sistema bancario
        {
            "productioncost": 320,
            "techrequired": ["Divine Right", "Currency"]
        },
    "Mechanics": // meccanica
        {
            "productioncost": 320,
            "techrequired": ["Engineering"]
        },
    "Physics": // fisica
        {
            "productioncost": 320,
            "techrequired": ["Engineering"]
        },
    "Metal Casting": // fusione del metallo
        {
            "productioncost": 320,
            "techrequired": ["Iron Working"]
        },
    "Scientific Theory": // teoria scientifica
        {
            "productioncost": 640,
            "techrequired": ["Astronomy", "Physics"]
        },
    "Economy": // economia
        {
            "productioncost": 640,
            "techrequired": ["Banking"]
        },
    "Steel": // acciaio
        {
            "productioncost": 640,
            "techrequired": ["Metal Casting"]
        },
    "Steam Energy": // energia a vapore
        {
            "productioncost": 1024,
            "techrequired": ["Code of Chivalry", "Steel"]
        },
    "Gunpowder": // polvere da sparo
        {
            "productioncost": 1024,
            "techrequired": ["Physics", "Steel"]
        },
    "Rifling": // rigatura delle canne
        {
            "productioncost": 2048,
            "techrequired": ["Mechanics", "Gunpowder"]
        },
    "Chemistry": // chimica
        {
            "productioncost": 2048,
            "techrequired": ["Gunpowder"]
        },
    "Independent Pieces": // pezzi indipendenti
        {
            "productioncost": 2048,
            "techrequired": ["Steam Energy"]
        },
    "Electricity": // elettricità
        {
            "productioncost": 2048,
            "techrequired": ["Steam Energy", "Scientific Theory"]
        },
    "Radio": // radio
        {
            "productioncost": 4096,
            "techrequired": ["Music", "Electricity"]
        },
    "Combustion": // combustione
        {
            "productioncost": 4096,
            "techrequired": ["Rifling", "Chemistry"]
        },
    "Plastic": // plastica
        {
            "productioncost": 4096,
            "techrequired": ["Chemistry", "Electricity"]
        },
    "Flight": // volo
        {
            "productioncost": 4096,
            "techrequired": ["Independent Pieces"]
        },
    "Mass Media": // mass media
        {
            "productioncost": 8192,
            "techrequired": ["Radio"]
        },
    "Electronics": // elettronica
        {
            "productioncost": 8192,
            "techrequired": ["Radio"]
        },
    "Rocketry": // missilistica
        {
            "productioncost": 8192,
            "techrequired": ["Flight", "Combustion"]
        },
    "Atomic Theory": // teoria atomica
        {
            "productioncost": 8192,
            "techrequired": ["Combustion"]
        },
    "Computers": // computer
        {
            "productioncost": 16384,
            "techrequired": ["Electronics"]
        },
    "Nuclear Fission": // fissione nucleare
        {
            "productioncost": 16384,
            "techrequired": ["Atomic Theory", "Rocketry"]
        },
    "Globalization": // globalizzazione
        {
            "productioncost": 32768,
            "techrequired": ["Economy", "Computers"]
        },
    "Robotics": // robotica
        {
            "productioncost": 32768,
            "techrequired": ["Computers"]
        },
    "Particle Physics": // fisica delle particelleù
        {
            "productioncost": 65536,
            "techrequired": ["Atomic Theory", "Robotics"]
        },
    "Nanotechnology": // nanotecnologia
        {
            "productioncost": 131072,
            "techrequired": ["Particle Physics", "Plastic"]
        },
    "Future Technology": // tecnologia futura
        {
            "productioncost": 262144,
            "techrequired": ["Nanotechnology", "Nuclear Fission"]
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
