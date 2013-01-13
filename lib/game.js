// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

// UNITS DATABASE
var unitsDB = {
    "settler": 
        {
            "atk": 0,
            "def": 0,
            "mov": 2
        },
    "archer": 
        {
            "atk": 2,
            "def": 2,
            "mov": 1
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

function moveUnit(i) {
    selectDestinations(i);
    $('td').on('click.moveto', function() {
        var destination = this.id;
        var destinationx = parseInt(this.id[0]);
        var destinationy = parseInt(this.id[1]);
        var from = String(map.units[i].x) + String(map.units[i].y);

        // here goes the controls if the unit can go on the selected destination
        this.innerHTML = document.getElementById(from).innerHTML;
        // here goes the controls if there is something like nature or resources to draw again in the tile that the unit left
        document.getElementById(from).innerHTML = "";

        map.units[i].x = destinationx;
        map.units[i].y = destinationy;

        closeActionbar();
        $('td').off('click.moveto');
        deselectDestinations(from, map.units[i].color);
    });
}

function selectDestinations(i) {
    // TODO find the destinations to be selected...
    document.getElementById("31").className += " " + map.units[i].color + "-unit";
}

function deselectDestinations(from, color) {
    // TODO find the selected destinations...
    var toremove = " " + color + "-unit";
    document.getElementById("31").className = document.getElementById("31").className.replace(toremove, "");
}

function fortifyUnit(unit) {
    // some code here...
}
