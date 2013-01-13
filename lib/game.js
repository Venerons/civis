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
    "archer": 
        {
            "atk": 2,
            "def": 2,
            "mov": 1,
            "naval": false,
            "terrain": true
        }
};

function getAtkByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.atk;
        case "archer": return unitsDB.archer.atk;
    }
}

function getDefByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.def;
        case "archer": return unitsDB.archer.def;
    }
}

function getMovByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.mov;
        case "archer": return unitsDB.archer.mov;
    }
}

function isNaval(type) {
    switch (type) {
        case "settler": return unitsDB.settler.naval;
        case "archer": return unitsDB.archer.naval;
    }
}

function isTerrain(type) {
    switch (type) {
        case "settler": return unitsDB.settler.terrain;
        case "archer": return unitsDB.archer.terrain;
    }
}

function showUnitOptions(i) {
    if (map.units[i].player == map.players[0].id) {
        var content = '<span style="position: relative; top: 5px; left: 10px; height: 40px; margin-right: 20px; vertical-align: middle;"><img src="lib/units/' + map.units[i].type + '.png" alt="' + map.units[i].type + '" title="' + map.units[i].type + '" class="buttonimage"> <strong>' 
                    + map.units[i].type.toUpperCase() 
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><img src="lib/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' + map.units[i].life + ' <img src="lib/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' + map.units[i].experience + ' <img src="lib/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + getAtkByType(map.units[i].type) + ' <img src="lib/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' + getDefByType(map.units[i].type) + ' <img src="lib/hud/move.png" alt="Mov" title="Mov" class="buttonimage"> ' + getMovByType(map.units[i].type) + '</span>' 
                    + '<button class="menubutton" onclick="moveUnit(' + i + ')"><img src="lib/hud/move.png" class="buttonimage"> Move</button>'
                    + '<button class="menubutton" onclick="fortifyUnit(' + i + ')"><img src="lib/hud/fortify.png" class="buttonimage"> Fortify</button>'
                    + '<button class="menubutton" onclick="closeActionbar()"><img src="lib/hud/noorders.png" class="buttonimage"> No Orders</button>'
                    + '<button class="menubutton" onclick="closeActionbar()"><img src="lib/hud/kill.png" class="buttonimage"> Kill</button>';
        $("#actionbar").html(content);
        openActionbar();
    }
}

function moveUnit(unit) {
    selectDestinations(unit);
    $('td').on('click.moveto', function() {
        var destination = this.id;
        var destinationx = parseInt(this.id[0]);
        var destinationy = parseInt(this.id[1]);
        var from = String(map.units[unit].x) + String(map.units[unit].y);

        if (isAttainable(destinationx, destinationy, unit)) {
            // here goes more controls if there is an enemy unit on the tile
            var len = map.units.length;
            for (i = 0; i < len; i++) {
                if (map.units[i].x == destinationx && map.units[i].y == destinationy && map.units[i].player != map.players[0].id) { // a unit of a different player is already on that tile
                    var answer = confirm("Are you sure to attack?")
                    if (answer){
                        alert("ATTACK!"); // TODO gestione attacco
                    } else {
                        return;
                    }
                }
            }

            this.innerHTML = document.getElementById(from).innerHTML;

            // here goes the controls if there is something like nature or resources to draw again in the tile that the unit left
            document.getElementById(from).innerHTML = "";

            map.units[unit].x = destinationx;
            map.units[unit].y = destinationy;

            closeActionbar();
            $('td').off('click.moveto');
            deselectDestinations(from, map.units[unit].color);
        } else {
            alert("The selected destination is not attainable");
        }
    });
}

// CONTROLS IF THE DESTINATION TILE IS ATTAINABLE FOR THAT UNIT
// CONTROLS IF IS THE SAME TILE, THE DISTANCE OF THE TILE, THE TYPE OF THE TILE AND IF ON THE TILE ALREADY EXIST A UNIT OWNED BY THE SAME PLAYER
function isAttainable(desx, desy, unit) {
    var t = Math.sqrt(Math.pow(map.units[unit].x - desx, 2) + Math.pow(map.units[unit].y - desy, 2));
    var tiletype;
    var len = map.tiles.length;
    for (i = 0; i < len; i++) {
        var len2 = map.tiles[i].length;
        for (j = 0; j < len2; j++) {
            if (map.tiles[i][j].x == desx && map.tiles[i][j].y == desy) {
                tiletype = map.tiles[i][j].type;
            }
        }
    }
    if (t <= getMovByType(map.units[unit].type)) { // distance of the tile
        if (!(desx == map.units[unit].x && desy == map.units[unit].y)) { // is the same tile
            var len = map.units.length;
            for (i = 0; i < len; i++) {
                if (map.units[i].x == desx && map.units[i].y == desy && map.units[i].player == map.players[0].id) return false; // a unit of the same player is already on that tile
            }
            if (tiletype == "water" && isNaval(map.units[unit].type)) { // is a water tile and the unit isNaval
                return true;
            } else {
                if (isTerrain(map.units[unit].type) && tiletype != "water") { // is not a water tile and the unit isTerrain
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

function fortifyUnit(unit) {
    // some code here...
}
