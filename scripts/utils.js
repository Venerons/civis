// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
//"use strict";

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
    $('#popup').html('<div id="popupcontent"><br/></div><button class="gradient button closebutton" onclick="closePopup()" title="Close"><img src="images/hud/close.png" width="20"></button>');
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

// MAIN MENU
function mainMenu() {
    resetPopup();
    var content = '<br/><br/><br/><button class="gradient button menubutton" onclick="saveGame()" title="Save Game" alt="Save Game"><img src="images/hud/save.png" class="buttonimage"> Save Game</button>'
                + '<br/><button class="gradient button menubutton" onclick="loadGame()" title="Load Game" alt="Load Game"><img src="images/hud/load.png" class="buttonimage"> Load Game</button>'
                + '<br/><button class="gradient button menubutton" onclick="manual()" title="Instructions Manual" alt="Instructions Manual"><img src="images/hud/manual.png" class="buttonimage"> Manual</button>'
                + '<br/><button class="gradient button menubutton" onclick="exitGame()" title="Exit Game" alt="Exit Game"><img src="images/hud/exit.png" class="buttonimage"> Exit Game</button>';
    $('#popupcontent').html(content);
    openPopup();
}

// MANUAL SAVE GAME
function saveGame() {
    var answer = confirm("Are you sure to Save?\nThis action will overwrite your previous Manual Save Game!");
    if (answer){
        localStorage.manualsave =  JSON.stringify(map);
        alert("Game Saved.");
    }
}

// MANUAL LOAD GAME
function loadGame() {
    var answer = confirm("Are you sure to Load?\nAll unsaved actions will be lost!");
    if (answer){
        map = JSON.parse(localStorage.manualsave);
        renderMap();
        alert("Game Loaded.");
    }
}

// INSTRUCTIONS MANUAL
function manual() {
    resetPopup();
    $('#popupcontent').load('docs/manual.txt');
    openPopup();
}

// EXIT GAME
function exitGame() {
    var answer = confirm("Are you sure to Exit?\nAll unsaved actions will be lost!");
    if (answer){
        autoSaveGame();
        window.location.href = "index.html";
    }
}

// LOAD THE PRESET MAP SPECIFIED
function presetMap (mapname) {
    $.getJSON('scripts/preset/' + mapname + '.json', function(data) {
        map = JSON.parse(JSON.stringify(data));
    });
}

// EXPORT AS JSON THE CURRENT MAP
function exportMap () {
    var content = '<h3>Export Map</h3><textarea style="width:100%;height:200px">';
    content += JSON.stringify(map);
    content += '</textarea>'
    $('#popupcontent').html(content);
    openPopup();
}

// GET THE ATK OF A UNIT COUNTING ALL VARIABLES
function getAtk(unit) {
    var unitAtk = unitsDB[unit.type].atk;
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

// GET THE DEF OF A UNIT COUNTING ALL VARIABLES
function getDef(unit) {
    var unitDef = unitsDB[unit.type].def;
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

// GET THE MOV OF A UNIT COUNTING ALL VARIABLES
function getMov(unit) {
    return unitsDB[unit.type].mov;
}

// GET IF THE UNIT IS VETERAN
function isVeteran(unit) {
    if (unit.experience >= 5) return true;
    return false;
}

// GET IF THE UNIT IS ELITE
function isElite(unit) {
    if (unit.experience >= 10) return true;
    return false;
}

// GET IF THE UNIT CAN MOVE ON WATER
function isNaval(unit) {
    return unitsDB[unit.type].naval;
}

// GET IF THE UNIT CAN MOVE ON TERRAIN
function isTerrain(unit) {
    return unitsDB[unit.type].terrain;
}

// GET A UNIT PRODUCTION COST
function getProductionCost(unit) {
    return unitsDB[unit.type].productioncost;
}

// FIND A PLAYER BY ID
function findPlayerById(id) {
    var len = map.players.length;
    for (var i = 0; i < len; i++) {
        if (map.players[i].id == id) {
            return map.players[i];
        }
    }
}

// FIND A TILE BY X/Y COORDINATE
function findTileByXY(x, y) {
    var len = map.tiles.length;
    for (var i = 0; i < len; i++) {
        if ((i + 1) == y) {
            var len2 = map.tiles[i].length;
            for (var j = 0; j < len2; j++) {
                if (map.tiles[i][j].x == x && map.tiles[i][j].y == y) {
                    return map.tiles[i][j];
                }
            }
        }
    }
}

// FIND A UNIT BY ID
function findUnitById(id) {
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        if (map.units[i].id == id) {
            return map.units[i];
        }
    }
}

// REMOVE UNIT FROM THE GAME (I.E. IF KILLED, SACRIFIED ETC.)
function removeUnit(unit) {
    var indexunit;
    var len = map.units.length;
    var i = 0;
    var trovato = false;
    while (i < len && trovato == false) {
        if (map.units[i].id == unit.id) {
            indexunit = i;
            trovato = true;
        }
        i++;
    }
    map.units.splice(indexunit, 1);
}

// DISCOVER TILES
function discoverTiles() {
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
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

// FOCUS ON THE FIRS UNIT OF THE PLAYER THAT IS ACTIVE AND NOT FORTIFIED
function focusNext () {
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        var unit = map.units[i];
        if (unit.player == map.players[0].id) { // the unit is owned by the player
            if (unit.active && !unit.fortified) { // the unit is active and not fortified
                centerCameraOnXY(unit.x, unit.y);
                return; 
            }
        }
    }
    $("#actionbar").html('<p align="center">You have no active units. You should End Turn. (Press SPACE)<p>');
    openActionbar();
}
