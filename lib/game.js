// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

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
                    + '<button class="topbarbutton" onclick="moveUnit(' + i + ')"><img src="lib/hud/move.png" class="buttonimage"> Move</button>'
                    + '<button class="topbarbutton" onclick="fortifyUnit(' + i + ')"><img src="lib/hud/fortify.png" class="buttonimage"> Fortify</button>'
                    + '<button class="topbarbutton" onclick="killUnit(' + i + ')"><img src="lib/hud/kill.png" class="buttonimage"> Kill</button>'
                    + '<button class="topbarbutton" onclick="closeActionbar()"><img src="lib/hud/close.png" class="buttonimage"> No Orders</button>';
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
        var destinationtile = findTileById(this.id);
        var destinationx = destinationtile.x;
        var destinationy = destinationtile.y;
        var from = String(map.units[unit].x) + String(map.units[unit].y);

        if (isAttainable(destinationx, destinationy, unit)) {
            map.units[unit].fortified = false;
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
        if (unit1.experience == 5 || unit1.experience == 10) unit1.life = unit1.maxlife;
    } 
    if ((unit2.life - damage2) <= 0) {
        content += '<br/><span style="color: ' + unit2.color + '"><strong>' + unit2title + unit2.type.toUpperCase() + '</strong></span> is <strong>dead!</strong>';
        unit1.x = unit2.x;
        unit1.y = unit2.y;
        map.units.splice(indexunit2, 1);
    } else {
        unit2.life -= damage2;
        if (unit2.experience == 5 || unit2.experience == 10) unit2.life = unit2.maxlife;
    } 
    $('#popupcontent').html(content);
    openPopup();
}

function fortifyUnit(indexunit) {
    map.units[indexunit].fortified = true;
    closeActionbar();
}

function killUnit(indexunit) {
    var gold = Math.round(getProductionCost(map.units[indexunit]) / 4);
    var answer = confirm("Do you want to kill this unit to gain " + gold + " gold?");
    if (answer){
        closeActionbar();
        player = findPlayerById(map.units[indexunit].player);
        map.units.splice(indexunit, 1);
        player.gold += gold;
        reloadMap();
    }
}
