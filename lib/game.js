// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

// UNITS DATABASE
var unitsDB = {
    "settler": 
        {
            "atk": 0,
            "def": 0,
            "mov": 2,
            "naval": false,
            "terrain": true
        },
    "warrior": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": false,
            "terrain": true
        },
    "archer": 
        {
            "atk": 2,
            "def": 2,
            "mov": 1,
            "naval": false,
            "terrain": true
        },
    "galley": 
        {
            "atk": 1,
            "def": 1,
            "mov": 1,
            "naval": true,
            "terrain": false
        }
};

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

function getAtk(unit) {
    var unitAtk = getAtkByType(unit.type);
    if (isElite(unit)) { // +100% Atk/Def (AtK/Def * 2)
        unitAtk *= 2;
    } else {
        if (isVeteran(unit)) { // +50% Atk/Def (AtK/Def + 1/2 Atk/Def)
            unitAtk += Math.round(unitAtk / 2);
        }
    }
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
    return unitDef;
}

function endTurn() {
    autoSaveGame();
    map.game.turn++;
    map.game.year += map.game.yearstep;
    var len = map.units.length;
    for (i = 0; i < len; i++) {
        map.units[i].active = true;
    }
    reloadMap();
}

function showUnitOptions(i) {
    if (map.units[i].player == map.players[0].id) {
        var unittitle = "";
        if (isElite(map.units[i])) {
            unittitle = "Elite ";
        } else {
            if (isVeteran(map.units[i])) {
                unittitle = "Veteran ";
            }
        }
        var content = '<span style="position: relative; top: 5px; left: 10px; height: 40px; margin-right: 20px; vertical-align: middle;"><img src="lib/units/' + map.units[i].type + '.png" alt="' + unittitle + map.units[i].type + '" title="' + unittitle + map.units[i].type + '" class="buttonimage"> <strong>' 
                    + unittitle + map.units[i].type.toUpperCase() 
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><img src="lib/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' + map.units[i].life + ' <img src="lib/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' + map.units[i].experience + ' <img src="lib/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + getAtk(map.units[i]) + ' <img src="lib/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' + getDef(map.units[i]) + ' <img src="lib/hud/move.png" alt="Mov" title="Mov" class="buttonimage"> ' + getMovByType(map.units[i].type) + '</span>' 
                    + '<button class="menubutton" onclick="moveUnit(' + i + ')"><img src="lib/hud/move.png" class="buttonimage"> Move</button>'
                    + '<button class="menubutton" onclick="fortifyUnit(' + i + ')"><img src="lib/hud/fortify.png" class="buttonimage"> Fortify</button>'
                    + '<button class="menubutton" onclick="closeActionbar()"><img src="lib/hud/kill.png" class="buttonimage"> Kill</button>'
                    + '<button class="menubutton" onclick="closeActionbar()"><img src="lib/hud/noorders.png" class="buttonimage"> No Orders</button>';
        $("#actionbar").html(content);
        openActionbar();
    }
}

function moveUnit(unit) {
    if (!map.units[unit].active) {
        alert("This unit have already moved this turn.");
        return;
    }
    selectDestinations(unit);
    $('td').on('click.moveto', function() {
        var destination = this.id;
        var destinationx = parseInt(this.id[0]);
        var destinationy = parseInt(this.id[1]);
        var from = String(map.units[unit].x) + String(map.units[unit].y);

        if (isAttainable(destinationx, destinationy, unit)) {
            // here goes more controls if there is an enemy unit on the tile
            var len = map.units.length;
            var i = 0;
            var attack = false;
            while (!attack && i < len) {
                if (map.units[i].x == destinationx && map.units[i].y == destinationy && map.units[i].player != map.players[0].id) { // a unit of a different player is already on that tile
                    var answer = confirm("Are you sure to attack?")
                    if (answer){
                        attackUnit(map.units[unit], unit, map.units[i], i);
                        attack = true;
                    } else {
                        return;
                    }
                }
                i++;
            }

            if (!attack) {
                map.units[unit].x = destinationx;
                map.units[unit].y = destinationy;
            }
            
            map.units[unit].active = false;

            closeActionbar();
            $('td').off('click.moveto');
            deselectDestinations(from, map.units[unit].color);
            reloadMap();
        } else {
            alert("The selected destination is not attainable");
        }
    });
}

// FIND A TILE BY X/Y COORDINATE
function findTileByXY(x, y) {
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        var len2 = map.tiles[i].length;
        for (j = 0; j < len2; j++) {
            if (map.tiles[i][j].x == x && map.tiles[i][j].y == y) {
                return map.tiles[i][j];
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

function deselectDestinations(from, color) {
    var toremove = " " + color + "-unit";
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        var len2 = map.tiles[i].length;
        for (j = 0; j < len2; j++) {
            var tileid = String(map.tiles[i][j].x) + String(map.tiles[i][j].y);
            document.getElementById(tileid).className = document.getElementById(tileid).className.replace(toremove, "");
        }
    }
}

function attackUnit(unit1, indexunit1, unit2, indexunit2) {
    resetPopup();

    var unit1title = "";
    if (isElite(unit1)) {
        unit1title = "Elite ";
    } else {
        if (isVeteran(unit1)) {
            unit1title = "Veteran ";
        }
    }
    var unit2title = "";
    if (isElite(unit2)) {
        unit2title = "Elite ";
    } else {
        if (isVeteran(unit2)) {
            unit2title = "Veteran ";
        }
    }

    var unit1Atk = getAtk(unit1);
    var unit2Atk = getAtk(unit2);
    var unit1Def = getDef(unit1);
    var unit2Def = getDef(unit2);

    var damage1 = unit2Atk - unit1Def;
    var damage2 = unit1Atk - unit2Def;
    if (damage1 < 0) damage1 = 0; 
    if (damage2 < 0) damage2 = 0;

    var content = '<table style="width: 100%;"><tbody><tr>'
                + '<td style="text-align: center;"><img src="lib/units/' + unit1.type + '.png"><br/><span style="color: ' + unit1.color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span><br/><img src="lib/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' 
                + unit1.life + '<br/><img src="lib/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' 
                + unit1.experience + '<br/><img src="lib/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' 
                + unit1Atk + '<br/><img src="lib/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' 
                + unit1Def + '</td><td style="text-align: center;"><img src="lib/units/' + unit2.type + '.png"><br/><span style="color: ' + unit2.color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span><br/><img src="lib/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' 
                + unit2.life + '<br/><img src="lib/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' 
                + unit2.experience + '<br/><img src="lib/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' 
                + unit2Atk + '<br/><img src="lib/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' 
                + unit2Def + '</td>'
                + '</tr></tbody></table>';

    content += '<br/><center><span style="color: ' + unit2.color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> deal <strong>' + damage1 + '</strong> damage to <span style="color: ' + unit1.color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span><br/>';
    content += '<span style="color: ' + unit1.color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span> deal <strong>' + damage2 + '</strong> damage to <span style="color: ' + unit2.color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span>';
    
    unit1.experience++;
    unit2.experience++;

    if ((unit1.life - damage1) <= 0) {
        content += '<br/><span style="color: ' + unit1.color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        map.units.splice(indexunit1, 1);
    } else {
        unit1.life -= damage1;
    } 
    if ((unit2.life - damage2) <= 0) {
        content += '<br/><span style="color: ' + unit2.color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        unit1.x = unit2.x;
        unit1.y = unit2.y;
        map.units.splice(indexunit2, 1);
    } else {
        unit2.life -= damage2;
    } 
    $('#popupcontent').html(content);
    openPopup();
}

function isVeteran(unit) {
    if (unit.experience >= 5) return true;
    return false;
}

function isElite(unit) {
    if (unit.experience >= 10) return true;
    return false;
}

function fortifyUnit(unit) {
    // some code here...
}
