// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

// GLOBAL DECLARATION OF THE MAP
var map;

// LOAD OR CREATE A NEW GAME
function loadMap(){
    document.getElementById('popup').style.visibility = "hidden";
    document.getElementById('actionbar').style.visibility = "hidden";

	var action = getUrlVars()["action"];
	if (action == "load") {
		var save = getUrlVars()["save"];
		if (save == "auto") {
            if (localStorage.autosave != "") {
                map = JSON.parse(localStorage.autosave);
            }
		} else {
            if (localStorage.manualsave != "") {
                map = JSON.parse(localStorage.manualsave);
            }
		}
	} 
    if (action == "new") {
        var nplayers = getUrlVars()["players"];
        var ncols = getUrlVars()["ncols"];
        var nrows = getUrlVars()["nrows"];
		map = JSON.parse(JSON.stringify(generateMap(nplayers, nrows, ncols)));
	}
    if (action == "example") {
        map = JSON.parse(JSON.stringify(exampleMap()));
    }

	reloadMap();

    // Keyboard mapping using Kibo.js
    var k = new Kibo();
    k.down(['space'], function() { 
        endTurn(); 
        return false; // used to prevent default action on keypress
    });
}

// MAIN MENU
function mainMenu() {
    resetPopup();
    var content = '<br/><br/><br/><button class="menubutton" onclick="saveGame()" title="Save Game" alt="Save Game"><img src="lib/hud/save.png" class="buttonimage"> Save Game</button>'
                + '<br/><button class="menubutton" onclick="loadGame()" title="Load Game" alt="Load Game"><img src="lib/hud/load.png" class="buttonimage"> Load Game</button>'
                + '<br/><button class="menubutton" onclick="manual()" title="Instructions Manual" alt="Instructions Manual"><img src="lib/hud/manual.png" class="buttonimage"> Manual</button>'
                + '<br/><button class="menubutton" onclick="exitGame()" title="Exit Game" alt="Exit Game"><img src="lib/hud/exit.png" class="buttonimage"> Exit Game</button>';
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
		reloadMap();
		alert("Game Loaded.");
	}
}

// INSTRUCTIONS MANUAL
function manual() {
    resetPopup();
    $('#popupcontent').load('lib/manual.txt');
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

// SHOW TILE INFO POPUP
function showInfo(id) {
    var t = "#" + String(id);
    $(t).mouseover(function(event){
        var len = map.tiles.length;
        var htmlcode = "";
        for (i = 0; i < len; i++) {
            var len2 = map.tiles[i].length;
            for (j = 0; j < len2; j++) {
                if (id == map.tiles[i][j].id) {
                    if (map.tiles[i][j].fog) {
                        htmlcode = '<strong>X:</strong> ' + map.tiles[i][j].x
                             + ' <strong>Y:</strong> ' + map.tiles[i][j].y
                             + '<br/>Undiscovered';
                    } else {
                        htmlcode = '<strong>X:</strong> ' + map.tiles[i][j].x
                             + ' <strong>Y:</strong> ' + map.tiles[i][j].y
                             + '<br/><strong>Type:</strong> ' + map.tiles[i][j].type
                             + '<br/><strong>Resources:</strong> ' + map.tiles[i][j].nature;
                    }
                }
            }
        }
        $("#infopopup").html(htmlcode).css({'top': event.pageY, 'left': event.pageX, 'visibility': 'visible', 'height' : '55px'});  
    });
    $(function(){
        $(t).mouseout(function(event){
            $("#infopopup").css({'visibility': 'hidden'});
        });
    });
}

// RELOAD MAP USED TO PAINT THE MAP ON LOADING A GAME OR LOADING THE MAP ON BEGINNING
function reloadMap() {
    // PLAYERS SETTING
    document.getElementById('playerstats').innerHTML = '<img src="lib/hud/stats.png" class="buttonimage" alt="Turn" title="Turn"> ' + map.game.turn + ' &nbsp;<img src="lib/hud/time.png" class="buttonimage" alt="Year" title="Year"> ' + map.game.year + ' &nbsp;&nbsp;<strong>Players:</strong> ';
    var len = map.players.length;
    for (i = 0; i < len; i++) {
        var divid = "player" + i;
        var dividquery = "#" + divid;
        document.getElementById('playerstats').innerHTML += '<span id="' + divid + '"><span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + map.players[i].color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + map.players[i].name + ' (' + map.players[i].civilization + ')</span> &nbsp;&nbsp;&nbsp;';
    }
    var len = map.players.length;
    for (i = 0; i < len; i++) {
        var divid = "player" + i;
        var dividquery = "#" + divid;
        $(dividquery).mouseover(function(event){
            var n = this.id.charAt(this.id.length-1);
            htmlcode = '<strong>Name:</strong> <span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + map.players[n].color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + map.players[n].name
                     + '<br/><strong>Civilization:</strong> ' + map.players[n].civilization
                     + '<br/><strong>Points:</strong> ' + map.players[n].points
                     + '<br/><strong>Gold:</strong> ' + map.players[n].gold
                     + '<br/><strong>Culture:</strong> ' + map.players[n].culture
                     + '<br/><strong>Society:</strong> ' + map.players[n].society;
            $("#infopopup").html(htmlcode).css({'top': event.pageY, 'left': event.pageX, 'visibility': 'visible', 'height' : '120px'});  
        });
        $(function(){
            $(dividquery).mouseout(function(event){
                $("#infopopup").css({'visibility': 'hidden'});
            });
        });
    }

    // TILES SETTING
    discoverTiles();
	var design = '<table border="0" cellspacing="1"><tbody>';
	var len = map.tiles.length;
	for (i = 0; i < len; i++) {
		design += '<tr>';
		var len2 = map.tiles[i].length;
		for (j = 0; j < len2; j++) {
			var classes = "";
			if (map.tiles[i][j].fog) {
				classes += "fog";
			} else {
				classes += map.tiles[i][j].type;
			}
			var content = "";
			if (map.tiles[i][j].nature == "none" || map.tiles[i][j].fog) {
				content += '<br/>';
			} else {
				content += '<img src="lib/tiles/' + map.tiles[i][j].nature + '.png" class="nature" alt="' + map.tiles[i][j].nature + '" title="' + map.tiles[i][j].nature + '">'
			}
			design += '<td id="' + map.tiles[i][j].id + '" class="' + classes + '" onmouseover="showInfo(' + map.tiles[i][j].id + ')">' + content + '</td>';
		}
		design += '</tr>';
	}
	design += '</tbody></table>';
	document.getElementById("map").innerHTML = design;

    // UNITS SETTING
    var len = map.units.length;
    for (i = 0; i < len; i++) {
        var unit = map.units[i];
        var id = String(unit.x) + String(unit.y);
        var index = i;
        if (!(findTileById(id).fog)) {
            document.getElementById(id).innerHTML = '<img src="lib/units/' + unit.type + '.png" class="' + unit.color + '-unit" onclick="showUnitOptions(' + index + ')" alt="' + unit.type + '"  title="' + unit.type + '">';
        }
    }

    // CITIES SETTING

    // some code here...
}

// GENERATE A NEW MAP/GAME
function generateMap(nplayers, nrows, ncols) {
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
        "player": 2,
        "color": "red",
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

    for (i = 0; i < nplayers; i++) {
        p = jQuery.extend(true, {}, baseplayer);
        p.id = i;
        p.color = colors[i];
        p.name = "player" + i;
        p.civilization = "civilization" + i;
        p.points = 0;
        p.gold = 0;
        p.society = "dispotism";
        p.culture = 0;

        basemap.players.push(p);
    }

    var tiletypes = ["grass", "water", "hill", "mountain", "snow", "desert", "marsh"];
    var nature = ["none", "forest"];

    for (i = 0; i < nrows; i++) {
        row = [];
        for (j = 0; j < ncols; j++) {

            // TODO the type of the tile must be more controlled, and must add a "nature" and "resource" elements

            t = jQuery.extend(true, {}, basetile);
            t.x = j + 1;
            t.y = i + 1;
            t.id = String(t.x) + String(t.y)
            t.type = tiletypes[Math.floor(Math.random() * tiletypes.length)];
            t.fog = true;
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

    for (i = 0; i < nplayers; i++) {

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

        u1 = jQuery.extend(true, {}, baseplayer);
        u1.player = i;
        u1.color = basemap.players[i].color;
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

function exampleMap() {
    var example = {
        "game": {
            "turn": 1,
            "year": -4000,
            "yearstep": 10
        },
        "players": [
            {
                "id": 1,
                "color": "blue",
                "name": "Daniele",
                "civilization": "Rome",
                "points": 0,
                "gold": 0,
                "society": "dispotism",
                "culture": 0
            },
            {
                "id": 2,
                "color": "red",
                "name": "Veneroni",
                "civilization": "Greek",
                "points": 0,
                "gold": 0,
                "society": "dispotism",
                "culture": 0
            }
        ],
        "tiles": [
            [
                {
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
                },
                {
                    "id": 21,
                    "x": 2,
                    "y": 1,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id": 31,
                    "x": 3,
                    "y": 1,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":41,
                    "x": 4,
                    "y": 1,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id": 51,
                    "x": 5,
                    "y": 1,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                }
            ],
            [
                {
                    "id": 12,
                    "x": 1,
                    "y": 2,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id": 22,
                    "x": 2,
                    "y": 2,
                    "type": "grass",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id": 32,
                    "x": 3,
                    "y": 2,
                    "type": "grass",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":42,
                    "x": 4,
                    "y": 2,
                    "type": "grass",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":52,
                    "x": 5,
                    "y": 2,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                }
            ],
            [
                {
                    "id":13,
                    "x": 1,
                    "y": 3,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":23,
                    "x": 2,
                    "y": 3,
                    "type": "grass",
                    "fog": false,
                    "nature": "forest",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":33,
                    "x": 3,
                    "y": 3,
                    "type": "hill",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":43,
                    "x": 4,
                    "y": 3,
                    "type": "desert",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":53,
                    "x": 5,
                    "y": 3,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                }
            ],
            [
                {
                    "id":14,
                    "x": 1,
                    "y": 4,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":24,
                    "x": 2,
                    "y": 4,
                    "type": "grass",
                    "fog": false,
                    "nature": "forest",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":34,
                    "x": 3,
                    "y": 4,
                    "type": "snow",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":44,
                    "x": 4,
                    "y": 4,
                    "type": "desert",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":54,
                    "x": 5,
                    "y": 4,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                }
            ],
            [
                {
                    "id":15,
                    "x": 1,
                    "y": 5,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":25,
                    "x": 2,
                    "y": 5,
                    "type": "mountain",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":35,
                    "x": 3,
                    "y": 5,
                    "type": "marsh",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":45,
                    "x": 4,
                    "y": 5,
                    "type": "hill",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":55,
                    "x": 5,
                    "y": 5,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                }
            ],
            [
                {
                    "id":16,
                    "x": 1,
                    "y": 6,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":26,
                    "x": 2,
                    "y": 6,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":36,
                    "x": 3,
                    "y": 6,
                    "type": "water",
                    "fog": true,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":46,
                    "x": 4,
                    "y": 6,
                    "type": "water",
                    "fog": true,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                },
                {
                    "id":56,
                    "x": 5,
                    "y": 6,
                    "type": "water",
                    "fog": false,
                    "nature": "none",
                    "resource": "none",
                    "improvement": "none",
                    "street": false,
                    "culture": 0
                }
            ]
        ],
        "units": [
            {
                "player": 2,
                "color": "red",
                "x": 3,
                "y": 2,
                "type": "archer",
                "experience": 10,
                "life": 2,
                "maxlife": 2,
                "fortified": false,
                "active": true
            },
            {
                "player": 1,
                "color": "blue",
                "x": 4,
                "y": 2,
                "type": "archer",
                "experience": 9,
                "life": 2,
                "maxlife": 2,
                "fortified": false,
                "active": true
            },
            {
                "player": 1,
                "color": "blue",
                "x": 5,
                "y": 2,
                "type": "galley",
                "experience": 0,
                "life": 1,
                "maxlife": 1,
                "fortified": false,
                "active": true
            },
            {
                "player": 2,
                "color": "red",
                "x": 3,
                "y": 3,
                "type": "settler",
                "experience": 0,
                "life": 1,
                "maxlife": 1,
                "fortified": false,
                "active": true
            }
        ],
        "cities": [
            {
                "player": 1,
                "name": "rome",
                "x": 3,
                "y": 3,
                "population": 1,
                "buldings": ["granary", "walls"],
                "currentbuild": "barraks",
                "currentbuildcost": 40
            }
        ]
    }

    return example;
}
