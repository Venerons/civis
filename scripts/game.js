// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
//"use strict";

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

    var colors = ["#1E74FF", "red", "yellow", "orange", "purple"];
    var tiletypes = ["grass", "water", "hill", "mountain", "snow", "desert"];
    var nature = ["none", "forest"];
    var civs = [];

    $.each(civsDB, function(key, val) {
        civs.push(key);
    });

    // TILES TYPE BY SECTOR
    var poles = ["water", "water", "snow"];
    var cold = ["snow", "grass", "grass", "mountain", "water", "water"];
    var middle = ["grass", "mountain", "hill", "water", "water"];
    var center = ["desert", "desert", "grass", "hill", "mountain", "water", "water"];

    // INSERT THE PLAYER 1

    var p = {};
    p.id = 0;
    p.color = colors[0];
    p.name = pname;
    p.civilization = civ;
    p.points = 0;
    p.gold = 0;
    p.society = "dispotism";
    p.culture = 0;
    p.tech = [];
    p.unitsCounter = 1;

    basemap.players.push(p);

    // INSERT THE OTHER PLAYERS (AI)

    for (var i = 1; i < nplayers; i++) {
        p = {};
        p.id = i;
        p.color = colors[i];

        var civ;
        var trovato = false;
        while (!trovato) {
            civ = civs[Math.floor(Math.random() * civs.length)];
            var uguale = false;
            var j = 0;
            var len = basemap.players.length;
            while (!uguale && j < len) {
                if (basemap.players[j].civilization == civ) uguale = true;
                j++;
            }
            if (!uguale) trovato = true;
        }
        p.civilization = civ;

        p.name = civsDB[p.civilization].leaders[Math.floor(Math.random() * civsDB[p.civilization].leaders.length)];
        p.points = 0;
        p.gold = 0;
        p.society = "dispotism";
        p.culture = 0;
        p.tech = [];
        p.unitsCounter = 1;

        basemap.players.push(p);
    }

    // TILES GENERATION

    for (var y = 0; y < nrows; y++) {
        var row = [];
        for (var x = 0; x < ncols; x++) {

            // TODO the type of the tile must be more controlled, and must add a "nature" and "resource" elements

            var t = {};
            t.x = x + 1;
            t.y = y + 1;
            t.id = "x" + t.x + "y" + t.y;
            t.fog = true;

            // tile type
            //t.type = tiletypes[Math.floor(Math.random() * tiletypes.length)];
            if (t.y <= 2 || t.y >= (nrows - 1)) 
                t.type = poles[Math.floor(Math.random() * poles.length)];
            else
                if (t.y == 3 || t.y == 8) 
                    t.type = cold[Math.floor(Math.random() * cold.length)];
                else
                    if (t.y == 4 || t.y == 7)
                        t.type = middle[Math.floor(Math.random() * middle.length)];
                    else
                        t.type = center[Math.floor(Math.random() * center.length)];
            

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
            for (var index = 0; index < len; index++) {
                var len2 = basemap.tiles[index].length;
                for (j = 0; j < len2; j++) {
                    if (basemap.tiles[index][j].x == targetx && basemap.tiles[index][j].y == targety) {
                        if (basemap.tiles[index][j].type == "grass" || basemap.tiles[index][j].type == "hill") {
                            var len3 = basemap.units.length;
                            var occupied = false;
                            for (var i3 = 0; i3 < len3; i3++) {
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

        var u1 = {};

        u1.id = "p" + String(i) + "u1";
        u1.player = i;
        u1.x = targetx;
        u1.y = targety;
        u1.type = "settler";
        u1.experience = 0;
        u1.life = unitsDB["settler"].initialLife;
        u1.maxlife = unitsDB["settler"].initialLife;
        u1.fortified = false;
        u1.active = true;

        basemap.units.push(u1);
    }

	return basemap;
}

function endTurn () {
    autoSaveGame(); // save the game as right before calling endTurn
    closeActionbar();

    // INSERT HERE THE AIs ACTIONS

    // UNITS END TURN
    // re-active all units and cure if fortified
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        var unit = map.units[i];
        unit.active = true;
        
        if (unit.fortified) {
            // detect the admount of heal
            var heal = 1;
            if (isElite(unit)) {
                heal = 3;
            } else {
                if (isVeteran(unit)) {
                    heal = 2;
                }
            }
            // heal the unit
            var newlife = unit.life + heal;
            if (newlife >= unit.maxlife) {
                unit.life = unit.maxlife;
            } else {
                unit.life = newlife;
            }
        }
    }

    // CITY END TURN
    len = map.cities.length;
    for (var i = 0; i < len; i++) {
        var city = map.cities[i];
        var cityprod = getCityProd(city)
        if (city.build.name != "nothing" && city.build.cost - cityprod <= 0) {
            // build finished
            if (city.build.type === "unit") {
                createNewUnit(findPlayerById(city.player), city.build.name, city.x, city.y);
            } else {
                city.buildings.push(city.build.name);
            }
            city.build.name = "nothing";
            city.build.cost = 0;
        } else {
            // build continued
            if (city.build.name != "nothing") city.build.cost -= cityprod;
        }

    }

    map.game.turn++;
    map.game.year += map.game.yearstep;
    
    renderMap();
}

function showUnitOptions (unitid) {
    deselectDestinations(); // deselect eventual selected destinations
    var unit = findUnitById(unitid);
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
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><img src="images/hud/life.png" alt="Life" title="Life" class="buttonimage"> ' + unit.life + ' <img src="images/hud/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' + unit.experience + ' <img src="images/hud/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + getAtk(unit) + ' <img src="images/hud/def.png" alt="Def" title="Def" class="buttonimage"> ' + getDef(unit) + ' <img src="images/hud/move.png" alt="Mov" title="Mov" class="buttonimage"> ' + getMov(unit) + '</span>' 
                    + '&nbsp;&nbsp;<span id="specialOrders"></span>'
                    + '<button class="button gradient topbarbutton" alt="Move" title="Move" id="moveUnit"><img src="images/hud/move.png" class="buttonimage"></button>'
                    + '<button class="button gradient topbarbutton" alt="Fortify" title="Fortify" id="fortifyUnit"><img src="images/hud/fortify.png" class="buttonimage"></button>'
                    + '<button class="button gradient topbarbutton" alt="Kill" title="Kill" id="killUnit"><img src="images/hud/kill.png" class="buttonimage"></button>'
                    + '<button class="button gradient topbarbutton" alt="No Orders" title="No Orders" id="noOrders"><img src="images/hud/close.png" class="buttonimage"></button>';
        $("#actionbar").html(content);

        $("#moveUnit").click(function () { moveUnit(unit.id); });
        $("#fortifyUnit").click(function () { fortifyUnit(unit.id); });
        $("#killUnit").click(function () { killUnit(unit.id); });
        $("#noOrders").click(function () { closeActionbar(); });

        var specialOrders = "";
        if (unit.type == "settler") {
            specialOrders = '<button class="button gradient topbarbutton" alt="Settle" title="Settle" id="settleCity"><img src="images/hud/settle.png" class="buttonimage"></button>';
            $("#specialOrders").html(specialOrders);
            $("#settleCity").click(function () { settleCity(unit.id); });
        }

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
            if (map.units[i].x == selected.x && map.units[i].y == selected.y && map.units[i].player != map.players[0].id) { 
                // a unit of a different player is already on that tile
                var unit2 = map.units[i];

                var unit1title = findPlayerById(unit.player).civilization + " ";
                if (isElite(unit)) {
                    unit1title += "Elite ";
                } else {
                    if (isVeteran(unit)) {
                        unit1title += "Veteran ";
                    }
                }
                var unit2title = findPlayerById(unit2.player).civilization + " ";
                if (isElite(unit2)) {
                    unit2title += "Elite ";
                } else {
                    if (isVeteran(unit2)) {
                        unit2title += "Veteran ";
                    }
                }
                var confront = unit1title + unit.type.toUpperCase() + "  -  VS  -  " + unit2title + unit2.type.toUpperCase();

                var answer = confirm(confront + "\n\nAre you sure to attack?")
                if (answer){
                    attackUnit(unit, unit2);
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
        if (unit1.experience == 5 || unit1.experience == 10) promoteUnit(unit1);
    } 
    if ((unit2.life - damage2) <= 0) {
        content += '<br/><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        unit1.x = unit2.x;
        unit1.y = unit2.y;
        removeUnit(unit2);
    } else {
        unit2.life -= damage2;
        if (unit2.experience == 5 || unit2.experience == 10) promoteUnit(unit2);
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
        var player = findPlayerById(unit.player);
        removeUnit(unit);
        player.gold += gold;
        renderMap();
    }
    focusNext();
}

function settleCity(unitid) {
    var unit = findUnitById(unitid);

    if (!cityIsNear(unit.x, unit.y, 2) && findTileByXY(unit.x, unit.y).type != "water") {
        var cityname = prompt("Name of the city","MyCity");
        var trovato = false, i = 0, len = map.cities.length;
        while (!trovato && i < len) {
            if (map.cities[i].name === cityname) {
                trovato = true;
            }
            i++;
        }
        if (cityname != null && !trovato) {
            var city = {};
            city.id = "x" + unit.x + "y" + unit.y + "-" + cityname;
            city.name = cityname;
            city.player = unit.player;
            city.x = unit.x;
            city.y = unit.y;
            city.population = 2;
            city.buildings = [];
            city.build = { name: "nothing", cost: 0 };

            map.cities.push(city);

            removeUnit(unit);

            renderMap();

            showCityManager(city.id);
        } else {
            alert("\"I cannot give this name to my city. Maybe it's already taken.\"\n\n- The Settler");
        }
    } else {
        alert("\"Cannot settle a city here, it's too near to another city.\"\n\n- The Settler");
    }
}

function showCityManager(cityid) {
    var city = findCityById(cityid);
    resetPopup();

    var cityproduction = getCityProd(city);

    var list = "<h4>Buildings</h4><ul>";
    var len = city.buildings.length;
    for (var i = 0; i < len; i++) {
        list += '<li>' + city.buildings[i] + '</li>';
    }
    list += '</ul>';

    var content = '<table style="width: 100%"><tbody>'
                + '<tr><td style="width: 70%"><table><tbody>'
                + '<tr><td><strong>Name:</strong></td><td>' + city.name + '</td></tr>'
                + '<tr><td><strong>Population:</strong></td><td>' + city.population + '</td></tr>'
                + '<tr><td><strong>Food:</strong></td><td>' + getCityFood(city) + '</td></tr>'
                + '<tr><td><strong>Production:</strong></td><td>' + cityproduction + '</td></tr>'
                + '<tr><td><strong>Gold:</strong></td><td>' + getCityGold(city) + '</td></tr>'
                + '<tr><td><strong>Current Build:</strong></td><td>' + city.build.name + ' (' + Math.ceil(city.build.cost/cityproduction) + ' Turns)</td></tr>'
                + '<tr><td><br/><button id="changebuildBtn" class="gradient button">Change Current Build</button></td></tr>'
                + '</tbody></table></td>'
                + '<td style="width: 30%;">'
                + list
                + '</td></tr></tbody></table>';

    $('#popupcontent').html(content);

    $("#changebuildBtn").click(function () { createBuildingsList(cityid); });
    
    openPopup();
}

function createBuildingsList(cityid) {
    closePopup();
    resetPopup();

    var city = findCityById(cityid);

    var cityIsNearWater = false; // TODO

    var content = "<h4>Available Units</h4>";

    $.each(unitsDB, function(key, val) {
        if (val.techrequired === "none" || playerHaveTech(city.player, val.techrequired)) {
            if (val.terrain || (val.naval && cityIsNearWater)) {
                content += '<button onclick="setBuild(\'' + cityid + '\', \'unit\', \'' + key + '\')" style="width: 100%; margin-bottom: 5px;" class="gradient button">' + key + ' (' + val.productioncost + ')</button><br/>';
            }
        }
    });

    content += '<h4>Available Buildings</h4>'

    $.each(buildingsDB, function(key, val) {
        if (val.techrequired === "none" || playerHaveTech(city.player, val.techrequired)) {
            if (val.buildingrequired === "none" || cityHaveBuilding(city, val.buildingrequired)) {
                content += '<button onclick="setBuild(\'' + cityid + '\', \'building\', \'' + key + '\')" style="width: 100%; margin-bottom: 5px;" class="gradient button">' + key + " (" + val.productioncost + ')</button><br/>';
            }
        }
    });

    $('#popupcontent').html(content);

    openPopup();
}

function setBuild(cityid, target, building) {
    var city = findCityById(cityid);
    var build = {};
    build.name = building;
    build.type = target;
    if (target === "unit") {
        build.cost = getUnitProductionCost({type:building});
    } else {
        build.cost = getBuildingProductionCost({name:building});
    }
    
    city.build = build;
    closePopup();
}
