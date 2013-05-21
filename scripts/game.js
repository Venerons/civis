// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
"use strict";

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
    };

    var colors = ["#1E74FF", "red", "yellow", "orange", "purple"];
    var civs = [];

    $.each(civsDB, function(key, val) {
        civs.push(key);
    });

    // TILES TYPE BY SECTOR
    var poles = ["water", "water", "snow"]; // 10 % - 0-10 & 90-100
    var cold = ["tundra", "tundra", "plain", "mountain", "water", "water"]; // 10% - 11-20 & 80-89
    var middle = ["grass", "grass", "plain", "plain", "mountain", "hill", "hill", "water", "water", "water"]; // 21-40 & 60-79
    var center = ["desert", "desert", "plain", "hill", "mountain", "water", "water"]; // 20% - 41-59

    var nature = ["none", "forest"];

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
    p.research = { tech: "", cost: 0 };
    p.unitsCounter = 1;

    basemap.players.push(p);

    // INSERT THE OTHER PLAYERS (AI)

    for (var i = 1; i < nplayers; i++) {
        p = {};
        p.id = i;
        p.color = colors[i];

        var civis;
        var trovato = false;
        while (!trovato) {
            civis = civs[Math.floor(Math.random() * civs.length)];
            var uguale = false;
            var j = 0;
            var len = basemap.players.length;
            while (!uguale && j < len) {
                if (basemap.players[j].civilization === civis) { uguale = true; }
                j++;
            }
            if (!uguale) { trovato = true; }
        }
        p.civilization = civis;

        p.name = civsDB[p.civilization].leaders[Math.floor(Math.random() * civsDB[p.civilization].leaders.length)];
        p.points = 0;
        p.gold = 0;
        p.society = "dispotism";
        p.culture = 0;
        p.tech = [];
        p.research = { tech: "", cost: 0 };
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
            var sector = t.y * 100 / nrows;
            if (sector <= 10 || sector >= 90) {
                t.type = poles[Math.floor(Math.random() * poles.length)];
            } else {
                if (sector <= 20 || sector >= 80) {
                    t.type = cold[Math.floor(Math.random() * cold.length)];
                } else {
                    if (sector <= 40 || sector >= 60) {
                        t.type = middle[Math.floor(Math.random() * middle.length)];
                    } else {
                        t.type = center[Math.floor(Math.random() * center.length)];
                    }
                }
            }
            

            // add eventual nature element
            if (t.type === "grass") {
                if (Math.floor(Math.random() * 100 + 1) <= 30) { t.nature = "forest"; } // 30 % forest
            } else if (t.type === "plain"){
                if (Math.floor(Math.random() * 100 + 1) <= 30) { t.nature = "jungle"; } // 30 % jungle
            } else if (t.type === "desert"){
                if (Math.floor(Math.random() * 100 + 1) <= 15) { t.nature = "oasis"; } // 15 % oasis
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
                for (var j = 0; j < len2; j++) {
                    if (basemap.tiles[index][j].x === targetx && basemap.tiles[index][j].y === targety) {
                        if (basemap.tiles[index][j].type === "grass" || basemap.tiles[index][j].type === "hill") {
                            var len3 = basemap.units.length;
                            var occupied = false;
                            for (var i3 = 0; i3 < len3; i3++) {
                                if (basemap.units[i3].x === targetx && basemap.units[i3].y === targety) {
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
                if (found) { break; }
            }
        }

        var u1 = {};

        u1.id = "p" + String(i) + "u1";
        u1.player = i;
        u1.x = targetx;
        u1.y = targety;
        u1.type = "settler";
        u1.experience = 0;
        u1.life = unitsDB.settler.initialLife;
        u1.maxlife = unitsDB.settler.initialLife;
        u1.fortified = false;
        u1.active = unitsDB.settler.mov;

        basemap.units.push(u1);
    }

	return basemap;
}

function endTurn () {
    autoSaveGame(); // save the game as right before calling endTurn
    closeActionbar();
    var notifications = [];

    // INSERT HERE THE AIs ACTIONS

    // UNITS END TURN
    // re-active all units and cure if fortified
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        var unit = map.units[i];
        unit.active = getMov(unit); // restore full movement
        
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
        var player = findPlayerById(city.player);

        // CITY PRODUCTION
        var cityprod = getCityProd(city);
        if (city.build.name !== "nothing" && city.build.cost - cityprod <= 0) {
            // build finished
            if (city.build.type === "unit") {
                if (cityHaveBuilding(city, "Barracks")) {
                    createNewUnit(player, city.build.name, 5, city.x, city.y);
                } else {
                    createNewUnit(player, city.build.name, 0, city.x, city.y);
                }
                if (city.build.name === "settler") { city.population--; }
            } else {
                city.buildings.push(city.build.name);
            }
            var message = {};
            message.info = "A " + city.build.name + " was built in " + city.name;
            message.type = "city-notif";
            message.callback = makeCallback("city", {"id": city.id});
            notifications.push(message);
            city.build.name = "nothing";
            city.build.cost = 0;
        } else {
            // build continued
            if (city.build.name !== "nothing") { city.build.cost -= cityprod; }
        }

        // CITY GOLD
        player.gold += getCityGold(city);

        // CITY SCIENCE
        if (player.research.tech !== "") {
            player.research.cost -= getCityScience(city);
            if (player.research.cost <= 0) { 
                // research ended
                player.tech.push(player.research.tech);
                var message = {};
                message.info = "Technology " + player.research.tech + " discovered";
                message.type = "science-notif";
                message.callback = makeCallback("research", {});
                notifications.push(message);
                player.research = { tech: "", cost: 0 };
            }
        } else {
            player.gold += getCityScience(city); // if no research is in queue, the science is converted to gold
        }

        // CITY CULTURE
        player.culture += getCityCulture(city);

        // CITY GROWTH
        city.growth += getCityFood(city) - city.population * 2;
        if (city.growth < 0) { // if growth < 0, one citizen die
            city.growth = 0;
            city.population--;
            var message = {};
            message.info = "A citizen died for food in " + city.name;
            message.type = "city-notif";
            message.callback = makeCallback("camera", {"x": city.x, "y": city.y});
            notifications.push(message);
        }
        var step = Math.floor(15 + 6 * (city.population - 1) + Math.pow(city.population - 1, 1.8));
        if (city.growth >= step) { // if there is enougth food to grow, add a citizen and reset the growth (exeded food is maintained)
            city.growth -= step;
            city.population++;
            var message = {};
            message.info = city.name + " has grown to " + city.population + " of population";
            message.type = "city-notif";
            message.callback = makeCallback("camera", {"x": city.x, "y": city.y});
            notifications.push(message);
        }
    }

    // UNIT MAINTENANCE COST
    for (var i = 0, len = map.units.length; i < len; i++) {
        if (map.units[i].player === map.players[0].id) {
            map.players[0].gold -= 1;
        }
    }

    map.game.turn++;
    map.game.year += map.game.yearstep;

    if (notifications.length >= 1) {
        var htmlcode = '<h4 class="center">Notifications</h4>';
        for (var i = 0, len = notifications.length; i < len; i++) {
            htmlcode += '<span class="notification ' + notifications[i].type + '" id="notification' + i + '">' + notifications[i].info + '</span><br/><br/>';
        }
        $("#infopopup").html(htmlcode);
        for (var i = 0, len = notifications.length; i < len; i++) {
            $("#notification" + i).click(notifications[i].callback);
        }
        $("#infopopup").css({'top': 55, 'left': 0, 'visibility': 'visible', 'height': 'auto', 'width': 'auto'});
    } else {
        $("#infopopup").css({'visibility': 'hidden'});
    }
    
    
    renderMap();
    focusNext();
}

function makeCallback(type, object) {
    if (type === "camera") {
        return function () { centerCameraOnXY(object.x, object.y); };
    }
    if (type === "research") {
        return function () { showResearchManagement(); };
    }
    if (type === "city") {
        return function () { showCityManager(object.id); };
    }
}

function showUnitOptions(unitid) {
    deselectDestinations(); // deselect eventual selected destinations
    var unit = findUnitById(unitid);
    if (unit.player === map.players[0].id) {
        var unittitle = "";
        if (isElite(unit)) {
            unittitle = "Elite ";
        } else {
            if (isVeteran(unit)) {
                unittitle = "Veteran ";
            }
        }
        
        var content = '<span style="position: relative; top: 5px; left: 10px; height: 40px; margin-right: 20px; vertical-align: middle;"><img src="' + localStorage.tileset + '/units/' + unit.type + '.png" alt="' + unittitle + unit.type + '" title="' + unittitle + unit.type + '" class="buttonimage"> <strong>' 
                    + unittitle + unit.type.toUpperCase() 
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><img src="' + localStorage.hudset + '/life.png" alt="Life" title="Life" class="buttonimage"> ' + unit.life + ' <img src="' + localStorage.hudset + '/exp.png" alt="Exp" title="Exp" class="buttonimage">  ' + unit.experience + ' <img src="' + localStorage.hudset + '/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + getAtk(unit) + ' <img src="' + localStorage.hudset + '/def.png" alt="Def" title="Def" class="buttonimage"> ' + getDef(unit) + ' <img src="' + localStorage.hudset + '/move.png" alt="Mov" title="Mov" class="buttonimage"> ' + unit.active + '</span>' 
                    + '&nbsp;&nbsp;<span id="specialOrders"></span>'
                    + '<button class="button gradient topbarbutton" alt="Move" title="Move" id="moveUnit"><img src="' + localStorage.hudset + '/move.png" class="buttonimage"></button>'
                    + '<button class="button gradient topbarbutton" alt="Fortify" title="Fortify" id="fortifyUnit"><img src="' + localStorage.hudset + '/fortify.png" class="buttonimage"></button>'
                    + '<button class="button gradient topbarbutton" alt="Kill" title="Kill" id="killUnit"><img src="' + localStorage.hudset + '/kill.png" class="buttonimage"></button>'
                    + '<button class="button gradient topbarbutton" alt="No Orders" title="No Orders" id="noOrders"><img src="' + localStorage.hudset + '/close.png" class="buttonimage"></button>';
        $("#actionbar").html(content);

        $("#moveUnit").click(function () { moveUnit(unit.id); });
        $("#fortifyUnit").click(function () { fortifyUnit(unit.id); });
        $("#killUnit").click(function () { killUnit(unit.id); });
        $("#noOrders").click(function () { closeActionbar(); });

        var specialOrders = "";
        if (unit.type === "settler") {
            specialOrders = '<button class="button gradient topbarbutton" alt="Settle" title="Settle" id="settleCity"><img src="' + localStorage.hudset + '/settle.png" class="buttonimage"></button>';
            $("#specialOrders").html(specialOrders);
            $("#settleCity").click(function () { settleCity(unit.id); });
        } else if (unit.type === "worker") {
            specialOrders = '<button class="button gradient topbarbutton" alt="Build Street" title="Build Street" id="buildStreet"><img src="' + localStorage.hudset + '/street.png" class="buttonimage"></button>'
                          + '<button class="button gradient topbarbutton" alt="Build Improvement" title="Build Improvement" id="buildImprovement"><img src="' + localStorage.hudset + '/improvement.png" class="buttonimage"></button>';
            $("#specialOrders").html(specialOrders);
            $("#buildStreet").click(function () { buildStreet(unit.id); });
            $("#buildImprovement").click(function () { buildImprovement(unit.id); });
        }

        openActionbar();
    }
}

function moveUnit(unitid) {
    var unit = findUnitById(unitid);
    if (unit.active <= 0) {
        alert("This unit have already moved this turn, or cannot move.");
        return;
    }
    selectDestinations(unit);
    closeActionbar();

    var len = mapselections.length;
    for (var i = 0; i < len; i++) {
        mapselections[i].bmp.onClick = make_handler(mapselections[i], unit);
    }
}

function make_handler(selected, unit) {
    return function (e) {
        unit.fortified = false;
        var len = map.units.length;
        var i = 0;
        var attack = false;
        while (!attack && i < len) {
            if (map.units[i].x === selected.x && map.units[i].y === selected.y && map.units[i].player !== map.players[0].id) { 
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

                var answer = confirm(confront + "\n\nAre you sure to attack?");
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
        
        // decrease movement based on the destination tile type
        var tile = findTileByXY(unit.x, unit.y);
        var tiletype = tile.type;
        var tilenature = tile.nature;

        if (tile.nature === "forest" || tile.nature === "jungle" || tile.nature === "marsh" || tile.nature === "fallout") { unit.active --; }
        
        if (tiletype === "hill") { unit.active -= 2; }
        else if (tiletype === "mountain") { unit.active -= 3; }
        else { unit.active--; }

        if (tile.street) {
            unit.active += 0.5;
        }

        if (unit.active > 0) { // riattiva di nuovo le destinazioni
            deselectDestinations();
            renderMap();
            selectDestinations(unit);
            var len = mapselections.length;
            for (var i = 0; i < len; i++) {
                mapselections[i].bmp.onClick = make_handler(mapselections[i], unit);
            }
        } else {
            unit.active = 0;
            deselectDestinations();
            closeActionbar();
            renderMap();
            focusNext();
        }
        

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
    };
}

function attackUnit(unit1, unit2) {
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
    if (damage1 < 0) { damage1 = 0; }
    if (damage2 < 0) { damage2 = 0; }

    var content = '<table class="w100"><tbody><tr>'
                + '<td class="center"><img src="' + localStorage.tileset + '/units/' + unit1.type + '.png">' 
                + '<br/><span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span>' 
                + '<br/><img src="' + localStorage.hudset + '/life.png" alt="Life" title="Life" class="buttonimage"> ' + unit1.life 
                + '<br/><img src="' + localStorage.hudset + '/exp.png" alt="Exp" title="Exp" class="buttonimage"> ' + unit1.experience 
                + '<br/><img src="' + localStorage.hudset + '/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + unit1Atk 
                + '<br/><img src="' + localStorage.hudset + '/def.png" alt="Def" title="Def" class="buttonimage"> ' + unit1Def 
                + '</td><td class="center"><img src="' + localStorage.tileset + '/units/' + unit2.type + '.png">' 
                + '<br/><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span>' 
                + '<br/><img src="' + localStorage.hudset + '/life.png" alt="Life" title="Life" class="buttonimage"> ' + unit2.life 
                + '<br/><img src="' + localStorage.hudset + '/exp.png" alt="Exp" title="Exp" class="buttonimage"> ' + unit2.experience 
                + '<br/><img src="' + localStorage.hudset + '/atk.png" alt="Atk" title="Atk" class="buttonimage"> ' + unit2Atk 
                + '<br/><img src="' + localStorage.hudset + '/def.png" alt="Def" title="Def" class="buttonimage"> ' + unit2Def + '</td></tr></tbody></table>';

    content += '<br/><center><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> deal <strong>' + damage1 + '</strong> damage to <span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span><br/>';
    content += '<span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span> deal <strong>' + damage2 + '</strong> damage to <span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span>';
    
    unit1.experience++;
    unit2.experience++;

    if ((unit1.life - damage1) <= 0) {
        content += '<br/><span style="color: ' + findPlayerById(unit1.player).color + '"><strong>' + unit1title + unit1.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        removeUnit(unit1);
    } else {
        unit1.life -= damage1;
        if (unit1.experience === 5 || unit1.experience === 10) { promoteUnit(unit1); }
    } 
    if ((unit2.life - damage2) <= 0) {
        content += '<br/><span style="color: ' + findPlayerById(unit2.player).color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        unit1.x = unit2.x;
        unit1.y = unit2.y;
        removeUnit(unit2);
    } else {
        unit2.life -= damage2;
        if (unit2.experience === 5 || unit2.experience === 10) { promoteUnit(unit2); }
    } 
    $('#popupcontent').html(content + '</center>');
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
    var gold = Math.round(getUnitProductionCost(unit) / 4);
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

    if (!cityIsNear(unit.x, unit.y, 2) && findTileByXY(unit.x, unit.y).type !== "water") {
        var cityname = prompt("Name of the city","MyCity");
        if (cityname !== null) {
            var trovato = false, i = 0, len = map.cities.length;
            while (!trovato && i < len) {
                if (map.cities[i].name === cityname) {
                    trovato = true;
                }
                i++;
            }
            if (!trovato) {
                closeActionbar();
                
                var city = {};
                city.id = "x" + unit.x + "y" + unit.y + "-" + cityname;
                city.name = cityname;
                city.player = unit.player;
                city.x = unit.x;
                city.y = unit.y;
                city.population = 2;
                city.growth = 0;
                city.buildings = [];
                city.build = { name: "nothing", cost: 0 };

                map.cities.push(city);

                removeUnit(unit);

                renderMap();

                showCityManager(city.id);
            } else {
                alert("\"I cannot give this name to my city. Maybe it's already taken.\"\n\n- The Settler");
            }
        }
    } else {
        alert("\"Cannot settle a city here, it's too near to another city.\"\n\n- The Settler");
    }
}

function showCityManager(cityid) {
    var city = findCityById(cityid);
    var cityproduction = getCityProd(city);

    var list = "<ul>";
    var len = city.buildings.length;
    for (var i = 0; i < len; i++) {
        list += '<li>' + city.buildings[i] + '</li>';
    }
    list += '</ul>';

    var step = Math.floor(15 + 6 * (city.population - 1) + Math.pow(city.population - 1, 1.8));
    var bilancio = getCityFood(city) - city.population * 2;
    var btext;
    if (bilancio < 0) {
        btext = '' + bilancio;
    } else {
        btext = '+&nbsp;' + bilancio;
    }

    var content = '<h3 class="center"><img src="' + localStorage.tileset + '/elements/city.png" width="25" height="25">&nbsp;&nbsp;' + city.name + '&nbsp;&nbsp;&nbsp;<em>(Population ' + city.population + ')</em></h3><table class="w100"><tbody>'
                + '<tr><td class="w70"><table class="w100"><tbody><tr><td class="w33 center"><img src="' + localStorage.hudset + '/food.png" alt="Food" title="Food" width="20" height="20">&nbsp;&nbsp;' + getCityFood(city) + '</td><td class="w33 center"><img src="' + localStorage.hudset + '/prod.png" alt="Production" title="Production" width="20" height="20">&nbsp;&nbsp;' + cityproduction + '</td><td class="w33 center"><img src="' + localStorage.hudset + '/gold.png" alt="Gold" title="Gold" width="20" height="20">&nbsp;&nbsp;' + getCityGold(city) + '</td></tr></tbody></table>'
                + '<br/><table class="w100"><tbody><tr><td class="w33 center"><strong>Growth:</strong> ' + btext + ' (' + city.growth + '/' + step + ')</td><td class="w33 center"><img src="' + localStorage.hudset + '/research.png" alt="Science" title="Science" width="30" height="30">&nbsp;+&nbsp;' + getCityScience(city) + '</td><td class="w33 center"><img src="' + localStorage.hudset + '/culture.png" alt="Culture" title="Culture" width="20" height="20">&nbsp;+&nbsp;' + getCityCulture(city) + '</td></tr></tbody></table>'
                + '<br/><br/><strong>Current Build:</strong> ' + city.build.name + ' (' + Math.ceil(city.build.cost/cityproduction) + ' Turns)&nbsp;&nbsp;&nbsp;<button id="changebuildBtn" class="gradient button w33">Change Build</button></td>'
                + '<td class="w30" style="border-style: solid; border-width: 1px"><h4 class="center">Buildings</h4>' + list + '</td></tr></tbody></table>';

    $('#popupcontent').html(content);

    $("#changebuildBtn").click(function () { createBuildingsList(cityid); });
    
    openPopup();
}

function createBuildingsList(cityid) {
    closePopup();

    var city = findCityById(cityid);
    var cityproduction = getCityProd(city);
    var cityIsNearWater = pointIsNearWater(city.x, city.y);

    var content = '<h4 class="center">Available Units</h4>';

    $.each(unitsDB, function(key, val) {
        if (val.techrequired === "none" || playerHaveTech(city.player, val.techrequired)) {
            if (val.terrain || (val.naval && cityIsNearWater)) {
                content += '<button onclick="setBuild(\'' + cityid + '\', \'unit\', \'' + key + '\')" style="margin-bottom: 5px;" class="gradient button w100"><strong>' + key + '</strong> (Cost: ' + val.productioncost + ' - ' + Math.ceil(val.productioncost/cityproduction) + ' Turns)</button><br/>';
            }
        }
    });

    content += '<h4 class="center">Available Buildings</h4>';

    $.each(buildingsDB, function(key, val) {
        if (!cityHaveBuilding(city, key)) {
            if (val.techrequired === "none" || playerHaveTech(city.player, val.techrequired)) {
                if (val.buildingrequired === "none" || cityHaveBuilding(city, val.buildingrequired)) {
                    content += '<button onclick="setBuild(\'' + cityid + '\', \'building\', \'' + key + '\')" style="margin-bottom: 5px;" class="gradient button w100"><strong>' + key + "</strong> (Cost: " + val.productioncost + ' - ' + Math.ceil(val.productioncost/cityproduction) + ' Turns)</button><br/>';
                }
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

function showResearchManagement() {
    closePopup();

    var player = map.players[0];
    var scienceproduction = 0;
    for (var i = 0, len = map.cities.length; i < len; i++) {
        var city = map.cities[i];
        if (city.player === player.id) {
            scienceproduction += getCityScience(city);
        }
    }

    var content = '<h3 class="center"><img src="' + localStorage.hudset + '/research.png" alt="Gold" title="Gold" width="25" height="25">&nbsp;&nbsp;Technology Research</h3>';
    if (map.players[0].research.tech !== "") {
        var current = getTechProdCost(player.research.tech);
        var status = current - player.research.cost;
        content += '<strong>Current Research:</strong> ' + player.research.tech + ' (' + status + '/' + current +  ') - ' + Math.ceil(player.research.cost/scienceproduction) + ' Turns';
    } else {
        content += '<strong>Current Research:</strong> Nothing';
    }

    content += '<h4 class="center">Available Research</h4>';
    

    $.each(techDB, function(key, val) {
        if (!playerHaveTech(player.id, key) && (player.research.tech !== key)) {
            if (val.techrequired.length < 1 || playerHaveRequiredTechs(player.id, val.techrequired)) {
                content += '<button onclick="setResearch(\'' + key + '\')" style="margin-bottom: 5px;" class="gradient button w100"><strong>' + key + "</strong> (Cost: " + val.productioncost + ' - ' + Math.ceil(val.productioncost/scienceproduction) + ' Turns)</button><br/>';
            }
        }
    });

    content += '<h4 class="center">Technologies Discovered</h4><ul>';
    for (var i = 0, len = player.tech.length; i < len; i++) {
        content += '<li>' + player.tech[i] + '</li>';
    }
    content += '</ul>';

    $('#popupcontent').html(content);
    openPopup();
}

function setResearch(techname) {
    var research = {};
    research.tech = techname;
    research.cost = getTechProdCost(techname);
    map.players[0].research = research;
    closePopup();
}

function showSocietyManagement() {
    closePopup();

    var content = '<h3 class="center"><img src="' + localStorage.hudset + '/society.png" alt="Gold" title="Gold" width="25" height="25">&nbsp;&nbsp;Society</h3>';
    content += '<strong>Current Society:</strong> ' + map.players[0].society;
    content += '<h4 class="center">Available Societies</h4>';

    $('#popupcontent').html(content);
    openPopup();
}

function showEmpireOverview() {
    closePopup();

    var player = map.players[0];

    var content = '<h3 class="center"><img src="' + localStorage.hudset + '/empire.png" alt="Gold" title="Gold" width="25" height="25">&nbsp;&nbsp;Empire Overview</h3><h4 class="center"><span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + player.color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + player.name + ' (' + player.civilization + ')</h4>';
    content += '<table class="w100"><tbody><tr><td class="w33 center"><strong>Points:</strong> ' + player.points;
    content += '</td><td class="w33 center"><img src="' + localStorage.hudset + '/gold.png" alt="Gold" title="Gold" width="20" height="20">&nbsp;&nbsp;' + player.gold;
    content += '</td><td class="w33 center"><img src="' + localStorage.hudset + '/culture.png" alt="Culture" title="Culture" width="20" height="20">&nbsp;&nbsp;' + player.culture;
    content += '</td></tr></tbody></table><h3 class="center"><img src="' + localStorage.hudset + '/diplomacy.png" alt="Gold" title="Gold" width="25" height="25">&nbsp;&nbsp;Diplomacy</h3>';

    for (var i = 1, len = map.players.length; i < len; i++) {
        content += '<span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + map.players[i].color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + map.players[i].name + ' (' + map.players[i].civilization + ')<br/><br/>';
    }

    $('#popupcontent').html(content);
    openPopup();
}

function buildStreet(unitid) {
    var unit = findUnitById(unitid);
    var tile = findTileByXY(unit.x, unit.y);

    if (unit.active === 0) {
        alert("\"I'm just arrived here, be quiet! Wait the next turn.\"\n\n- The Worker");
        return;
    }

    if (!tile.street) {
        tile.street = true;
        unit.active = 0;
        renderMap();
        closeActionbar();
    } else {
        alert("\"A street is already set on this tile\"\n\n- The Worker");
    }
}

function buildImprovement(unitid) {
    var unit = findUnitById(unitid);
    var tile = findTileByXY(unit.x, unit.y);

    if (unit.active === 0) {
        alert("\"I'm just arrived here, be quiet! Wait the next turn.\"\n\n- The Worker");
        return;
    }

    // SET THE IMPROVEMENT // TODO
}
