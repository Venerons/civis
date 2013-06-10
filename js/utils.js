// Copyright (c) 2013 Daniele Veneroni.
// Released under GPLv3 License. See LICENSE.md for further information.
"use strict";

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
    if (document.getElementById('popup').style.visibility === "hidden") {
        document.getElementById('popup').style.visibility = "visible";
    }
}

// CLOSE POPUP WINDOW
function closePopup() {
    if (document.getElementById('popup').style.visibility === "visible") {
        document.getElementById('popup').style.visibility = "hidden";
    }
}

// OPEN ACTION BAR
function openActionbar() {
    if (document.getElementById('actionbar').style.visibility === "hidden") {
        document.getElementById('actionbar').style.visibility = "visible";
    }
}

// CLOSE ACTION BAR
function closeActionbar() {
    if (document.getElementById('actionbar').style.visibility === "visible") {
        document.getElementById('actionbar').style.visibility = "hidden";
    }
}

// MAIN MENU
function mainMenu() {
    var content = '<br/><br/><br/><button class="gradient button menubutton" id="saveBtn" title="Save Game" alt="Save Game"><img src="' + localStorage.hudset + '/save.png" class="buttonimage"> Save Game</button>'
                + '<br/><button class="gradient button menubutton" id="loadBtn" title="Load Game" alt="Load Game"><img src="' + localStorage.hudset + '/load.png" class="buttonimage"> Load Game</button>'
                + '<br/><button class="gradient button menubutton" id="manualBtn" title="Instructions Manual" alt="Instructions Manual"><img src="' + localStorage.hudset + '/manual.png" class="buttonimage"> Manual</button>'
                + '<br/><button class="gradient button menubutton" id="exitBtn" title="Exit Game" alt="Exit Game"><img src="' + localStorage.hudset + '/exit.png" class="buttonimage"> Exit Game</button>';
    $('#popupcontent').html(content);
    $("#saveBtn").click(function () { saveGame(); });
    $("#loadBtn").click(function () { loadGame(); });
    $("#manualBtn").click(function () { manual(); });
    $("#exitBtn").click(function () { exitGame(); });
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
    content += '</textarea>';
    $('#popupcontent').html(content);
    openPopup();
}

// GET THE ATK OF A UNIT COUNTING ALL VARIABLES
function getAtk(unit) {
    var baseAtk = unitsDB[unit.type.toLowerCase()].atk;
    if (isElite(unit)) {
        baseAtk *= 2; // +100% Atk/Def (AtK/Def * 2)
    } else {
        if (isVeteran(unit)) { baseAtk += Math.round(baseAtk / 2); } // +50% Atk/Def (AtK/Def + 1/2 Atk/Def)
    }
    var unitAtk = baseAtk + 0;
    var tile = findTileByXY(unit.x, unit.y);
    var tileType = tile.type;
    var tileNature = tile.nature;
    if (unit.fortified) { unitAtk += Math.round(baseAtk / 4); } // +25% Atk/Def (AtK/Def + 1/4 Atk/Def) calcolata sulla base
    if (tileType === "hill") { unitAtk += Math.round(baseAtk / 2); } // +50% Atk/Def calcolata sulla base
    if (tileType === "mountain") { unitAtk += baseAtk; } // +100% Atk/Def calcolata sulla base
    if (tileType === "snow") { unitAtk -= Math.round(baseAtk / 2); } // -50% Atk/Def calcolata sulla base
    if (tileNature === "fallout") { unitAtk -= Math.round(baseAtk / 2); } // -50% Atk/Def calcolata sulla base
    if (tileNature === "forest") { unitAtk += Math.round(baseAtk / 2); } // +50% Atk/Def calcolata sulla base
    if (tileNature === "jungle") { unitAtk += Math.round(baseAtk / 2); } // +50% Atk/Def calcolata sulla base
    if (tileNature === "marsh") { unitAtk -= Math.round(baseAtk / 2); } // -50% Atk/Def calcolata sulla base
    return unitAtk;
}

// GET THE DEF OF A UNIT COUNTING ALL VARIABLES
function getDef(unit) {
    var baseDef = unitsDB[unit.type.toLowerCase()].def;
    if (isElite(unit)) {
        baseDef *= 2; // +100% Atk/Def (AtK/Def * 2)
    } else {
        if (isVeteran(unit)) { baseDef += Math.round(baseDef / 2); } // +50% Atk/Def (AtK/Def + 1/2 Atk/Def)
    }
    var unitDef = baseDef + 0;
    var tile = findTileByXY(unit.x, unit.y);
    var tileType = tile.type;
    var tileNature = tile.nature;
    if (unit.fortified) { unitDef += Math.round(baseDef / 4); } // +25% Def/Def (AtK/Def + 1/4 Atk/Def) calcolata sulla base
    if (tileType === "hill") { unitDef += Math.round(baseDef / 2); } // +50% Atk/Def calcolata sulla base
    if (tileType === "mountain") { unitDef += baseDef; } // +100% Atk/Def calcolata sulla base
    if (tileType === "snow") { unitDef -= Math.round(baseDef / 2); } // -50% Atk/Def calcolata sulla base
    if (tileNature === "fallout") { unitDef -= Math.round(baseDef / 2); } // -50% Atk/Def calcolata sulla base
    if (tileNature === "forest") { unitDef += Math.round(baseDef / 2); } // +50% Atk/Def calcolata sulla base
    if (tileNature === "jungle") { unitDef += Math.round(baseDef / 2); } // +50% Atk/Def calcolata sulla base
    if (tileNature === "marsh") { unitDef -= Math.round(baseDef / 2); } // -50% Atk/Def calcolata sulla base
    return unitDef;
}

// GET THE MOV OF A UNIT COUNTING ALL VARIABLES
function getMov(unit) {
    return unitsDB[unit.type.toLowerCase()].mov;
}

// GET A UNIT PRODUCTION COST
function getUnitProductionCost(unit) {
    return unitsDB[unit.type.toLowerCase()].productioncost;
}

// GET IF THE UNIT IS VETERAN
function isVeteran(unit) {
    if (unit.experience >= 5) { return true; }
    return false;
}

// GET IF THE UNIT IS ELITE
function isElite(unit) {
    if (unit.experience >= 10) { return true; }
    return false;
}

// GET IF THE UNIT CAN MOVE ON WATER
function isNaval(unit) {
    return unitsDB[unit.type.toLowerCase()].naval;
}

// GET IF THE UNIT CAN MOVE ON TERRAIN
function isTerrain(unit) {
    return unitsDB[unit.type.toLowerCase()].terrain;
}

// GET A BUILDING PRODUCTION COST
function getBuildingProductionCost(building) {
    return buildingsDB[building.name].productioncost;
}

// GET A TECHNNOLOGY PRODUCTION COST
function getTechProdCost(techname) {
    return techDB[techname].productioncost;
}

// FIND A PLAYER BY ID
function findPlayerById(id) {
    var len = map.players.length;
    for (var i = 0; i < len; i++) {
        if (map.players[i].id === id) {
            return map.players[i];
        }
    }
}

// FIND A TILE BY X/Y COORDINATE
function findTileByXY(x, y) {
    var len = map.tiles.length;
    for (var i = 0; i < len; i++) {
        if ((i + 1) === y) {
            var len2 = map.tiles[i].length;
            for (var j = 0; j < len2; j++) {
                if (map.tiles[i][j].x === x && map.tiles[i][j].y === y) {
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
        if (map.units[i].id === id) {
            return map.units[i];
        }
    }
}

// FIND A CITY BY ID
function findCityById(id) {
    var len = map.cities.length;
    for (var i = 0; i < len; i++) {
        if (map.cities[i].id === id) {
            return map.cities[i];
        }
    }
}

function createNewUnit(player, type, exp, x, y) {
    var unit = {};
    player.unitsCounter++;
    unit.id = "p" + player.id + "u" + player.unitsCounter;
    unit.player = player.id;
    unit.x = x;
    unit.y = y;
    unit.type = type;
    unit.experience = exp;
    var initialLife;
    if (exp === 5) {
        initialLife = unitsDB[type].initialLife * 2;
    } else {
        initialLife = unitsDB[type].initialLife;
    }
    unit.life = initialLife;
    unit.maxlife = initialLife;
    unit.fortified = false;
    unit.active = getMov({"type":type});

    map.units.push(unit);
}

// PROMOTE A UNIT. IT DOUBLE THE MAXLIFE AND DO A FULL HEAL
function promoteUnit(unit) {
    unit.maxlife = unit.maxlife * 2; // VARIANT: = unitsDB[unit.type].initialLife * (unit.experience / 5 + 1); initialLife*2 when Veteran, initialLife*3 when Elite
    unit.life = unit.maxlife;
}

// REMOVE UNIT FROM THE GAME (I.E. IF KILLED, SACRIFIED ETC.)
function removeUnit(unit) {
    var indexunit;
    var len = map.units.length;
    var i = 0;
    var trovato = false;
    while (i < len && trovato === false) {
        if (map.units[i].id === unit.id) {
            indexunit = i;
            trovato = true;
        }
        i++;
    }
    map.units.splice(indexunit, 1);
}

// GET A LIST OF TILES WITH THE TILES AROUND THE SPECIFIED COORDINATE (INCLUDING THE SPECIFIC COORDINATE TILE ITSELF)
function getNearTiles(x, y) {
    var list = [];

    if (y !== 1) {
        if (x !== 1) { list.push(findTileByXY(x-1, y-1)); }
        list.push(findTileByXY(x, y-1));
        if (x !== map.tiles[y-1].length) { list.push(findTileByXY(x+1, y-1)); }
    }

    if (x !== 1) { list.push(findTileByXY(x-1, y)); }
    list.push(findTileByXY(x, y));
    if (x !== map.tiles[y-1].length) { list.push(findTileByXY(x+1, y)); }

    if (y !== map.tiles.length) {
        if (x !== 1) { list.push(findTileByXY(x-1, y+1)); }
        list.push(findTileByXY(x, y+1));
        if (x !== map.tiles[y-1].length) { list.push(findTileByXY(x+1, y+1)); }
    }

    return list;
}

// DISCOVER TILES
function discoverTiles() {
    /*
    for (var i = 0, len = map.units.length; i < len; i++) {
        if (map.units[i].player === map.players[0].id) {
            var tiles = getNearTiles(map.units[i].x, map.units[i].y);
            for (var j = 0, len2 = tiles.length; j < len2; j++) {
                tiles[j].fog = false;
            }
        }
    }
    */


    for (var i = 0, len = map.units.length; i < len; i++) {
        if (map.units[i].player === map.players[0].id) {
            var x = map.units[i].x;
            var y = map.units[i].y;
            var tile;

            // upper orizontal axis
            if (y !== 1) {
                if (x !== 1) { findTileByXY(x-1, y-1).fog = false; }

                tile = findTileByXY(x, y-1);
                tile.fog = false;
                if ((y-1 !== 1) && (tile.type !== "hill") && (tile.type !== "mountain") && (tile.nature !== "forest") && (tile.nature !== "jungle")) {
                    tile = findTileByXY(x, y-2);
                    tile.fog = false;
                }

                if (x !== map.tiles[y-1].length) { findTileByXY(x+1, y-1).fog = false; }
            }

            // middle orizontal axis
            if (x !== 1) { // SX
                tile = findTileByXY(x-1, y);
                tile.fog = false;
                if ((x-1 !== 1) && (tile.type !== "hill") && (tile.type !== "mountain") && (tile.nature !== "forest") && (tile.nature !== "jungle")) {
                    tile = findTileByXY(x-2, y);
                    tile.fog = false;
                }
            }

            findTileByXY(x, y).fog = false; // unit's tile

            if (x !== map.tiles[y-1].length) { // DX
                tile = findTileByXY(x+1, y);
                tile.fog = false;
                if ((x+1 !== map.tiles[y-1].length) && (tile.type !== "hill") && (tile.type !== "mountain") && (tile.nature !== "forest") && (tile.nature !== "jungle")) {
                    tile = findTileByXY(x+2, y);
                    tile.fog = false;
                }
            }

            // bottom orizontal axis
            if (y !== map.tiles.length) {
                if (x !== 1) { findTileByXY(x-1, y+1).fog = false; }

                tile = findTileByXY(x, y+1);
                tile.fog = false;
                if ((y+1 !== map.tiles.length) && (tile.type !== "hill") && (tile.type !== "mountain") && (tile.nature !== "forest") && (tile.nature !== "jungle")) {
                    tile = findTileByXY(x, y+2);
                    tile.fog = false;
                }
                
                if (x !== map.tiles[y-1].length) { findTileByXY(x+1, y+1).fog = false; }
            }

        }
    }
}

// DISCOVER ALL TILES (DEBUG FEATURE)
function discoverAll() {
    var leny = map.tiles.length;
    for (var y = 0; y < leny; y++) {
        var lenx = map.tiles[y].length;
        for (var x = 0; x < lenx; x++) {
            map.tiles[y][x].fog = false;
        }
    }
}

// FOCUS ON THE FIRS UNIT OF THE PLAYER THAT IS ACTIVE AND NOT FORTIFIED
function focusNext () {
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        var unit = map.units[i];
        if (unit.player === map.players[0].id) { // the unit is owned by the player
            if (unit.active > 0 && !unit.fortified) { // the unit is active and not fortified
                centerCameraOnXY(unit.x, unit.y);
                return; 
            }
        }
    }
    $("#actionbar").html('<p class="center">You have no active units. You should End Turn. (Press SPACE)<p>');
    openActionbar();
}

function getFoodFromTile(tile) {
    var food = 0;
    
    if (tile.type === "grass") { food = 2; }
    else if (tile.type === "plain") { food = 1; }
    else if (tile.type === "water") { food = 1; }
    else if (tile.type === "tundra") { food = 1; }

    if (tile.nature === "jungle") { food++; }
    else if (tile.nature === "marsh") { food--; }
    else if (tile.nature === "forest") { food--; }
    else if (tile.nature === "fallout") { food -= 3; }
    else if (tile.nature === "oasis") { food += 3; }

    if (food < 0) { food = 0; }

    return food;
}

function getProdFromTile(tile) {
    var prod = 0;
    
    if (tile.type === "plain") { prod = 1; }
    else if (tile.type === "hill") { prod = 2; }
    else if (tile.type === "mountain") { prod = 1; }

    if (tile.nature === "forest") { prod++; }
    else if (tile.nature === "jungle") { prod--; }
    else if (tile.nature === "fallout") { prod -= 3; }
    else if (tile.nature === "atoll") { prod++; }
    else if (tile.nature === "natural wonder") { prod += 2; }

    if (prod < 0) { prod = 0; }

    return prod;
}

function getGoldFromTile(tile) {
    var gold = 0;

    if (tile.type === "water") { gold = 1; }
    else if (tile.type === "mountain") { gold = 1; }

    if (tile.nature === "oasis") { gold += 1; }
    else if (tile.nature === "river") { gold++; }
    else if (tile.nature === "atoll") { gold--; }
    else if (tile.nature === "fallout") { gold -= 3; }
    else if (tile.nature === "natural wonder") { gold += 3; }

    return gold;
}

function getCityFood(city) {
    var food = 0;
    var tiles = getNearTiles(city.x, city.y);
    for (var j = 0, len = tiles.length; j < len; j++) {
        food += getFoodFromTile(tiles[j]);
    }
    if (cityHaveBuilding(city, "Granary")) { food += 3; }
    if (cityHaveBuilding(city, "Aqueduct")) { food += Math.ceil(food / 2); }
    return food;
}

function getCityProd(city) {
    var prod = 0;
    var tiles = getNearTiles(city.x, city.y);
    for (var j = 0, len = tiles.length; j < len; j++) {
        prod += getProdFromTile(tiles[j]);
    }
    return prod;
}

function getCityGold(city) {
    var basegold = 0;
    var tiles = getNearTiles(city.x, city.y);
    for (var j = 0, len = tiles.length; j < len; j++) {
        basegold += getGoldFromTile(tiles[j]);
    }

    if (cityHaveBuilding(city, "Market")) { basegold += 2; } // +2
    if (cityHaveBuilding(city, "Bank")) { basegold += 2; } // +2

    var gold = basegold;

    if (cityHaveBuilding(city, "Market")) { gold += Math.round(basegold / 4); } // +25%
    if (cityHaveBuilding(city, "Bank")) { gold += Math.round(basegold / 4); } // +25%

    for (var i = 0, len = city.buildings.length; i < len; i++) {
        gold -= buildingsDB[city.buildings[i]].maintenance;
    }

    return gold;
}

function getCityScience(city) {
    var science = city.population; // base science = population
    if (cityHaveBuilding(city, "Library")) { science += Math.round(city.population / 2); }
    if (cityHaveBuilding(city, "University")) { science += Math.round(city.population / 2); }
    return science;
}

function getCityCulture(city) {
    var culture = Math.floor(city.population / 2); // base culture = population / 2
    if (cityHaveBuilding(city, "Monument")) { culture += 2; }
    if (cityHaveBuilding(city, "Temple")) { culture += Math.round(city.population / 2); }
    return culture;
}

function playerHaveTech(playerid, techname) {
    for (var i = 0, len = map.players.length; i < len; i++) {
        if (map.players[i].id === playerid) {
            for (var j = 0, len2 = map.players[i].tech.length; j < len2; j++) {
                if (map.players[i].tech[j] === techname) {
                    return true; // tech found
                }
            }
            return false; // tech not found
        }
    }
}

function playerHaveRequiredTechs(playerid, techsrequired) {
    for (var i = 0, len = techsrequired.length; i < len; i++) {
        if (!playerHaveTech(playerid, techsrequired[i])) { return false; }
    }
    return true;
}

function cityHaveBuilding(city, buildingname) {
    for (var i = 0, len = city.buildings.length; i < len; i++) {
        if (city.buildings[i] === buildingname) {
            return true; // building found
        }
    }
    return false; // building not found
}

// A CITY IS NEAR THE POINT X,Y ENTER THE RAY R
function cityIsNear(x, y, r) {
    var distance;
    for (var i = 0, len = map.cities.length; i < len; i++) {
        distance = Math.sqrt(Math.pow(x - map.cities[i].x, 2) + Math.pow(y - map.cities[i].y, 2));
        if (distance < r) { return true; }
    }
    return false;
}

// THE POINT X,Y HAVE A TILE TYPE ADIACENT ITSELF
function pointIsNearTile(x, y, type) {
    var tiles = getNearTiles(x, y);
    for (var j = 0, len = tiles.length; j < len; j++) {
        if (tiles[j].type === type) {
            return true; // tile found
        }
    }
    return false; // not found
}
