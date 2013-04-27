// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

// GLOBAL DECLARATION OF THE MAP
var map;

// GENERATE A NEW MAP/GAME
function generateMap(pname, civ, nplayers, nrows, ncols) {
    var basemap = {
        "game": {
            "turn": 1,
            "year": -4000,
            "yearstep": 10
        },
        "players": [],
        "tiles": [],
        "units": [],
        "cities": []
    }

    var baseplayer = {
        "id": 1,
        "color": "",
        "name": "",
        "civilization": "",
        "points": 0,
        "gold": 0,
        "society": "dispotism",
        "culture": 0
    }

    var basetile = {
        "id": 11,
        "x": 1,
        "y": 1,
        "type": "water",
        "fog": false,
        "nature": "none",
        "resource": "none",
        "improvement": "none",
        "street": false,
        "culture": 0
    }

    var baseunit = {
        "id": 0,
        "player": 2,
        "x": 3,
        "y": 2,
        "type": "archer",
        "experience": 10,
        "life": 2,
        "maxlife": 2,
        "fortified": false,
        "active": true
    }

    var colors = ["blue", "red", "yellow", "orange", "purple"];
    var tiletypes = ["grass", "water", "hill", "mountain", "snow", "desert", "marsh"];
    var nature = ["none", "forest"];

    // INSERT THE PLAYER 1

    var p = jQuery.extend(true, {}, baseplayer);
    p.id = 0;
    p.color = colors[0];
    p.name = pname;
    p.civilization = civ;
    p.points = 0;
    p.gold = 0;
    p.society = "dispotism";
    p.culture = 0;
    basemap.players.push(p);

    // INSERT THE OTHER PLAYERS (AI)

    for (var i = 1; i < nplayers; i++) {
        p = jQuery.extend(true, {}, baseplayer);
        p.id = i;
        p.color = colors[i];
        p.name = "AI" + i;
        p.civilization = "civilization" + i;
        p.points = 0;
        p.gold = 0;
        p.society = "dispotism";
        p.culture = 0;

        basemap.players.push(p);
    }

    // TILES GENERATION

    for (var i = 0; i < nrows; i++) {
        var row = [];
        for (var j = 0; j < ncols; j++) {

            // TODO the type of the tile must be more controlled, and must add a "nature" and "resource" elements

            var t = jQuery.extend(true, {}, basetile);
            t.x = j + 1;
            t.y = i + 1;
            t.id = String(t.x) + String(t.y)
            t.type = tiletypes[Math.floor(Math.random() * tiletypes.length)];
            t.fog = true;

            // add eventual nature element
            if (t.type == "grass" || t.type == "hill") {
                t.nature = nature[Math.floor(Math.random() * nature.length)];
            } else {
                t.nature = "none";
            }
            t.resource = "none";
            t.improvement = "none";
            t.street = false;
            t.culture = 0;

            row.push(t);
        }

        basemap.tiles.push(row);
    }

    // FIRST UNIT PLACEMENT

    for (var i = 0; i < nplayers; i++) {

        // TODO the coordinate of the starting unit must be more controlled

        var found = false;
        var targetx;
        var targety;
        while (!found) {
            targetx = Math.floor(Math.random() * ncols) + 1;
            targety = Math.floor(Math.random() * nrows) + 1;
            var len = basemap.tiles.length;
            for (index = 0; index < len; index++) {
                var len2 = basemap.tiles[index].length;
                for (j = 0; j < len2; j++) {
                    if (basemap.tiles[index][j].x == targetx && basemap.tiles[index][j].y == targety) {
                        if (basemap.tiles[index][j].type == "grass" || basemap.tiles[index][j].type == "hill") {
                            var len3 = basemap.units.length;
                            var occupied = false;
                            for (i3 = 0; i3 < len3; i3++) {
                                if (basemap.units[i3].x == targetx && basemap.units[i3].y == targety) {
                                    occupied = true;
                                    break;
                                }
                            }
                            if (!occupied) {
                                found = true;
                                break;
                            }
                        }
                    }
                }
                if (found) break;
            }
        }

        var u1 = jQuery.extend(true, {}, baseunit);
        u1.id = "p" + String(i) + "u1";
        u1.player = i;
        u1.x = targetx;
        u1.y = targety;
        u1.type = "settler";
        u1.experience = 0;
        u1.life = 1;
        u1.maxlife = 1;
        u1.fortified = false;
        u1.active = true;

        basemap.units.push(u1);
    }

	return basemap;
}

function presetMap (mapname) {
    $.getJSON('scripts/preset/' + mapname + '.json', function(data) {
        map = JSON.parse(JSON.stringify(data));
    });
}

function exportMap () {
    var content = '<h3>Export Map</h3><textarea style="width:100%;height:200px">';
    content += JSON.stringify(map);
    content += '</textarea>'
    $('#popupcontent').html(content);
    openPopup();
}

function endTurn () {
    autoSaveGame(); // save the game as right before calling endTurn
    closeActionbar();
    // INSERT HERE THE AIs ACTIONS
    map.game.turn++;
    map.game.year += map.game.yearstep;
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        map.units[i].active = true;
    }
    renderMap();
}

function showUnitOptions (unitid) {
    deselectDestinations(); // deselect eventual selected destinations
    unit = findUnitById(unitid);
    if (unit.player == map.players[0].id) {
        var unittitle = "";
        if (isElite(unit)) {
            unittitle = "Elite ";
        } else {
            if (isVeteran(unit)) {
                unittitle = "Veteran ";
            }
        }
        var content = '<span style="position: relative; top: 5px; left: 10px; height: 40px; margin-right: 20px; vertical-align: middle;"><img src="images/units/' + unit.type + '.png" alt="' + unittitle + unit.type + '" title="' + unittitle + unit.type + '" class="buttonimage"> <strong>' 
                    + unittitle + unit.type.toUpperCase() 
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><img src="images/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' + unit.life + ' <img src="images/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' + unit.experience + ' <img src="images/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + getAtk(unit) + ' <img src="images/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' + getDef(unit) + ' <img src="images/hud/move.png" alt="Mov" title="Mov" class="buttonimage"> ' + getMovByType(unit.type) + '</span>' 
                    + '<button class="button gradient topbarbutton" onclick="moveUnit(\'' + unit.id + '\')"><img src="images/hud/move.png" class="buttonimage"> Move</button>'
                    + '<button class="button gradient topbarbutton" onclick="fortifyUnit(\'' + unit.id + '\')"><img src="images/hud/fortify.png" class="buttonimage"> Fortify</button>'
                    + '<button class="button gradient topbarbutton" onclick="killUnit(\'' + unit.id + '\')"><img src="images/hud/kill.png" class="buttonimage"> Kill</button>'
                    + '<button class="button gradient topbarbutton" onclick="closeActionbar()"><img src="images/hud/close.png" class="buttonimage"> No Orders</button>';
        $("#actionbar").html(content);
        openActionbar();
    }
}

function make_handler(selected, unit) {
    return function (e) {
        unit.fortified = false;
        var len = map.units.length;
        var i = 0;
        var attack = false;
        while (!attack && i < len) {
            if (map.units[i].x == selected.x && map.units[i].y == selected.y && map.units[i].player != map.players[0].id) { // a unit of a different player is already on that tile
                var answer = confirm("Are you sure to attack?")
                if (answer){
                    attackUnit(unit, map.units[i]);
                    attack = true;
                } else {
                    return;
                }
            }
            i++;
        }

        if (!attack) { // the unit have not been involved in an attack
            unit.x = selected.x;
            unit.y = selected.y;
        }
        
        unit.active = false;

        closeActionbar();
        deselectDestinations();

        // animazione che sposta
        /* 
        var unitGraphics = findGraphics("unit", unit.id);
        destx = coordinate(Math.floor(e.stageX / 101) + 1);
        desty = coordinate(Math.floor(e.stageY / 101) + 1);
        diffx = unitGraphics.unitBmp.x - destx;
        diffy = unitGraphics.unitBmp.y - desty;
        createjs.Tween.get(unitGraphics.unitBmp).to({
            x: destx, 
            y: desty
        }, 300);
        createjs.Tween.get(unitGraphics.hitBmp).to({
            x: -diffx, 
            y: -diffy
        }, 300);
        */

        renderMap();
    };
}

function moveUnit(unitid) {
    var unit = findUnitById(unitid);
    if (!unit.active) {
        alert("This unit have already moved this turn.");
        return;
    }
    selectDestinations(unit);
    closeActionbar();

    var len = mapselections.length;
    for (var i = 0; i < len; i++) {
        mapselections[i].bmp.onClick = make_handler(mapselections[i], unit);
    }
}

function attackUnit(unit1, unit2) {
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
                + '<td style="text-align: center;"><img src="images/units/' + unit1.type + '.png"><br/><span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span><br/><img src="images/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' 
                + unit1.life + '<br/><img src="images/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' 
                + unit1.experience + '<br/><img src="images/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' 
                + unit1Atk + '<br/><img src="images/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' 
                + unit1Def + '</td><td style="text-align: center;"><img src="images/units/' + unit2.type + '.png"><br/><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span><br/><img src="images/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' 
                + unit2.life + '<br/><img src="images/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' 
                + unit2.experience + '<br/><img src="images/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' 
                + unit2Atk + '<br/><img src="images/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' 
                + unit2Def + '</td>'
                + '</tr></tbody></table>';

    content += '<br/><center><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> deal <strong>' + damage1 + '</strong> damage to <span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span><br/>';
    content += '<span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span> deal <strong>' + damage2 + '</strong> damage to <span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span>';
    
    unit1.experience++;
    unit2.experience++;

    if ((unit1.life - damage1) <= 0) {
        content += '<br/><span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        removeUnit(unit1);
    } else {
        unit1.life -= damage1;
        if (unit1.experience == 5 || unit1.experience == 10) unit1.life = unit1.maxlife;
    } 
    if ((unit2.life - damage2) <= 0) {
        content += '<br/><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        unit1.x = unit2.x;
        unit1.y = unit2.y;
        removeUnit(unit2);
    } else {
        unit2.life -= damage2;
        if (unit2.experience == 5 || unit2.experience == 10) unit2.life = unit2.maxlife;
    } 
    $('#popupcontent').html(content);
    openPopup();
}

function fortifyUnit(unitid) {
    var unit = findUnitById(unitid);
    unit.fortified = true;
    closeActionbar();
    focusNext();
}

function killUnit(unitid) {
    var unit = findUnitById(unitid);
    var gold = Math.round(getProductionCost(unit) / 4);
    var answer = confirm("Do you want to kill this unit to gain " + gold + " gold?");
    if (answer){
        closeActionbar();
        player = findPlayerById(unit.player);
        removeUnit(unit);
        player.gold += gold;
        renderMap();
    }
    focusNext();
}
