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
            "productioncost": 30
        },
    "warrior": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 10
        },
    "archer": 
        {
            "atk": 2,
            "def": 2,
            "mov": 1,
            "naval": false,
            "terrain": true,
            "productioncost": 25
        },
    "galley": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": true,
            "terrain": false,
            "productioncost": 30
        }
};

// CIVILIZATIONS DATABASE
var civsDB = {
    "America": null,
    "Arabia": null,
    "Aztec": null,
    "Babylon": null,
    "China": null,
    "Denmark": null,
    "Egypt": null,
    "England": null,
    "France": null,
    "Germany": null,
    "Greece": null,
    "Inca": null,
    "India": null,
    "Iroquois": null,
    "Japan": null,
    "Mongolia": null,
    "Ottoman Empire": null,
    "Persia": null,
    "Polynesia": null,
    "Rome": null,
    "Russia": null,
    "Siam": null,
    "Songhai": null,
    "Spain": null
};
