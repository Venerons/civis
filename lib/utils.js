// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

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

// GET URL VARS
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// AUTO SAVE GAME
function autoSaveGame() {
    localStorage.autosave =  JSON.stringify(map);
}

// OPEN POPUP WINDOW
function openPopup() {
    if (document.getElementById('popup').style.visibility == "hidden") {
        document.getElementById('popup').style.visibility = "visible";
    }
}

// CLOSE POPUP WINDOW
function closePopup() {
    if (document.getElementById('popup').style.visibility == "visible") {
        document.getElementById('popup').style.visibility = "hidden";
    }
}

// RESET POPUP WINDOW
function resetPopup() {
    $('#popup').html('<div id="popupcontent"><br/></div><button class="popupbutton" style="position: absolute; top: 20px; right: 20px;" onclick="closePopup()" title="Close"><img src="lib/hud/close.png" width="20"></button>');
}

// OPEN ACTION BAR
function openActionbar() {
    if (document.getElementById('actionbar').style.visibility == "hidden") {
        document.getElementById('actionbar').style.visibility = "visible";
    }
}

// CLOSE ACTION BAR
function closeActionbar() {
    if (document.getElementById('actionbar').style.visibility == "visible") {
        document.getElementById('actionbar').style.visibility = "hidden";
    }
}

function getAtkByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.atk;
        case "warrior": return unitsDB.warrior.atk;
        case "archer": return unitsDB.archer.atk;
        case "galley": return unitsDB.galley.atk;
    }
}

function getDefByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.def;
        case "warrior": return unitsDB.warrior.def;
        case "archer": return unitsDB.archer.def;
        case "galley": return unitsDB.galley.def;
    }
}

function getMovByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.mov;
        case "warrior": return unitsDB.warrior.mov;
        case "archer": return unitsDB.archer.mov;
        case "galley": return unitsDB.galley.mov;
    }
}

function isNaval(type) {
    switch (type) {
        case "settler": return unitsDB.settler.naval;
        case "warrior": return unitsDB.warrior.naval;
        case "archer": return unitsDB.archer.naval;
        case "galley": return unitsDB.galley.naval;
    }
}

function isTerrain(type) {
    switch (type) {
        case "settler": return unitsDB.settler.terrain;
        case "warrior": return unitsDB.warrior.terrain;
        case "archer": return unitsDB.archer.terrain;
        case "galley": return unitsDB.galley.terrain;
    }
}

function getProductionCost(unit) {
    switch (unit.type) {
        case "settler": return unitsDB.settler.productioncost;
        case "warrior": return unitsDB.warrior.productioncost;
        case "archer": return unitsDB.archer.productioncost;
        case "galley": return unitsDB.galley.productioncost;
    }
}

function getAtk(unit) {
    var unitAtk = getAtkByType(unit.type);
    if (isElite(unit)) { // +100% Atk/Def (AtK/Def * 2)
        unitAtk *= 2;
    } else {
        if (isVeteran(unit)) { // +50% Atk/Def (AtK/Def + 1/2 Atk/Def)
            unitAtk += Math.round(unitAtk / 2);
        }
    }
    if (unit.fortified) unitAtk += Math.round(unitAtk / 4); // +25% Atk/Def (AtK/Def + 1/4 Atk/Def)
    return unitAtk;
}

function getDef(unit) {
    var unitDef = getDefByType(unit.type);
    if (isElite(unit)) { // +100% Atk/Def (AtK/Def * 2)
        unitDef *= 2;
    } else {
        if (isVeteran(unit)) { // +50% Atk/Def (AtK/Def + 1/2 Atk/Def)
            unitDef += Math.round(unitDef / 2);
        }
    }
    if (unit.fortified) unitDef += Math.round(unitDef / 4); // +25% Atk/Def (AtK/Def + 1/4 Atk/Def)
    return unitDef;
}

// FIND A PLAYER BY ID
function findPlayerById(id) {
    var len = map.players.length;
    for (i = 0; i < len; i++) {
        if (map.players[i].id == id) {
            return map.players[i];
        }
    }
}

// FIND A TILE BY X/Y COORDINATE
function findTileByXY(x, y) {
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        if ((i + 1) == y) {
            var len2 = map.tiles[i].length;
            for (j = 0; j < len2; j++) {
                if (map.tiles[i][j].x == x && map.tiles[i][j].y == y) {
                    return map.tiles[i][j];
                }
            }
        }
    }
}

// FIND A TILE BY ID
function findTileById(id) {
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        var len2 = map.tiles[i].length;
        for (j = 0; j < len2; j++) {
            if (map.tiles[i][j].id == id) {
                return map.tiles[i][j];
            }
        }
    }
}

// DISCOVER TILES
function discoverTiles() {
    var len = map.units.length;
    for (i = 0; i < len; i++) {
        var p = map.units[i].player;
        var pid = map.players[0].id;
        if (map.units[i].player == map.players[0].id) {
            var x = map.units[i].x;
            var y = map.units[i].y;
            if (!(y == 1)) {
                if (!(x == 1)) findTileByXY(x-1, y-1).fog = false;
                findTileByXY(x, y-1).fog = false;
                if (!(x == map.tiles[y-1].length)) findTileByXY(x+1, y-1).fog = false;
            }

            if (!(x == 1)) findTileByXY(x-1, y).fog = false;
            findTileByXY(x, y).fog = false;
            if (!(x == map.tiles[y-1].length)) findTileByXY(x+1, y).fog = false;

            if (!(y == map.tiles.length)) {
                if (!(x == 1)) findTileByXY(x-1, y+1).fog = false;
                findTileByXY(x, y+1).fog = false;
                if (!(x == map.tiles[y-1].length)) findTileByXY(x+1, y+1).fog = false;
            }
        }
    }
}

// CONTROLS IF THE DESTINATION TILE IS ATTAINABLE FOR THAT UNIT
// CONTROLS IF IS THE SAME TILE, THE DISTANCE OF THE TILE, THE TYPE OF THE TILE AND IF ON THE TILE ALREADY EXIST A UNIT OWNED BY THE SAME PLAYER
function isAttainable(desx, desy, indexunit) {
    var unit = map.units[indexunit];
    var t = Math.sqrt(Math.pow(unit.x - desx, 2) + Math.pow(unit.y - desy, 2));
    var tiletype = findTileByXY(desx, desy).type;

    if (t <= getMovByType(unit.type)) { // distance of the tile
        if (!(desx == unit.x && desy == unit.y)) { // is the same tile
            var len = map.units.length;
            for (i = 0; i < len; i++) {
                if (map.units[i].x == desx && map.units[i].y == desy && map.units[i].player == map.players[0].id) return false; // a unit of the same player is already on that tile
            }
            if (tiletype == "water" && isNaval(unit.type)) { // is a water tile and the unit isNaval
                return true;
            } else {
                if (isTerrain(unit.type) && tiletype != "water") { // is not a water tile and the unit isTerrain
                    return true;
                }
            }
        }
    }
    return false;
}

// SELECT DESTINATIONS FOR THE UNIT
function selectDestinations(unit) {
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        var len2 = map.tiles[i].length;
        for (j = 0; j < len2; j++) {
            var t = Math.sqrt(Math.pow(map.units[unit].x - map.tiles[i][j].x, 2) + Math.pow(map.units[unit].y - map.tiles[i][j].y, 2));
            if (t <= getMovByType(map.units[unit].type)) {
                var tileid = map.tiles[i][j].id;
                if (!(map.tiles[i][j].x == map.units[unit].x && map.tiles[i][j].y == map.units[unit].y)) {
                    if (map.tiles[i][j].type == "water" && isNaval(map.units[unit].type)) {
                        document.getElementById(tileid).className += " " + map.units[unit].color + "-unit";
                    } else {
                        if (isTerrain(map.units[unit].type) && map.tiles[i][j].type != "water") {
                            document.getElementById(tileid).className += " " + map.units[unit].color + "-unit";
                        }
                    }
                }
            }
        }
    }
}

// DESELECT DESTINATIONS FOR THE UNIT
function deselectDestinations(from, color) {
    var toremove = " " + color + "-unit";
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        var len2 = map.tiles[i].length;
        for (j = 0; j < len2; j++) {
            var tileid = map.tiles[i][j].id;
            document.getElementById(tileid).className = document.getElementById(tileid).className.replace(toremove, "");
        }
    }
}

function isVeteran(unit) {
    if (unit.experience >= 5) return true;
    return false;
}

function isElite(unit) {
    if (unit.experience >= 10) return true;
    return false;
}
