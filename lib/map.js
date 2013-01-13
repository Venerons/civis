// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

// GLOBAL DECLARATION OF THE MAP
var map;

// GET URL VARS
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// LOAD OR CREATE A NEW GAME
function loadMap(){
    document.getElementById('popup').style.visibility = "hidden";
    document.getElementById('actionbar').style.visibility = "hidden";
	var action = getUrlVars()["action"];
	if (action == "load") {
		var save = getUrlVars()["save"];
		if (save == "auto") {
			map = JSON.parse(localStorage.autosave);
		} else {
			map = JSON.parse(localStorage.manualsave);
		}
	} else {
		map = JSON.parse(JSON.stringify(generateMap()));
	}
	reloadMap();
}

// MANUAL SAVE GAME
function saveGame() {
	var answer = confirm("Are you sure to Save?\nThis action will overwrite your previous Manual Save Game!")
	if (answer){
		localStorage.manualsave =  JSON.stringify(map);
		alert("Game Saved.")
	}
}

// AUTO SAVE GAME
function autoSaveGame() {
	localStorage.autosave =  JSON.stringify(map);
}

// MANUAL LOAD GAME
function loadGame() {
	var answer = confirm("Are you sure to Load?\nAll unsaved actions will be lost!")
	if (answer){
		map = JSON.parse(localStorage.manualsave);
		reloadMap();
		alert("Game Loaded.")
	}
}

// INSTRUCTIONS MANUAL
function manual() {
    $('#popupcontent').load('lib/manual.txt');
    openPopup();
}

// EXIT GAME
function exitGame() {
	var answer = confirm("Are you sure to Exit?\nAll unsaved actions will be lost!")
	if (answer){
		localStorage.autosave =  JSON.stringify(map);
		window.location.href = "index.html"
	}
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

// RELOAD MAP USED TO PAINT THE MAP ON LOADING A GAME OR LOADING THE MAP ON BEGINNING
function reloadMap() {
    // PLAYERS SETTING
    document.getElementById('playerstats').innerHTML = '<strong>Player:</strong> <span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + map.players[0].color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + map.players[0].name + ' (' + map.players[0].civilization + ') &nbsp;&nbsp;&nbsp;<strong>Points:</strong> ' + map.players[0].points + ' &nbsp;&nbsp;&nbsp;<strong>Gold:</strong> ' + map.players[0].gold + ' &nbsp;&nbsp;&nbsp;<strong>Culture:</strong> ' + map.players[0].culture + ' &nbsp;&nbsp;&nbsp;<strong>Society:</strong> ' + map.players[0].society + ' &nbsp;&nbsp;&nbsp;<strong>Turn:</strong> ' + map.game.turn + ' &nbsp;&nbsp;&nbsp;<strong>Year:</strong> ' + map.game.year;

    // TILES SETTING
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
			if (map.tiles[i][j].nature == "none") {
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
        var id = String(map.units[i].x) + String(map.units[i].y);
        document.getElementById(id).innerHTML = '<img src="lib/units/' + map.units[i].type + '.png" class="' + map.units[i].color + '-unit" onclick="showUnitOptions(' + i + ')" alt="' + map.units[i].type + '"  title="' + map.units[i].type + '">';
    }

    // CITIES SETTING

    // some code here...
}

// SHOW TILE INFO POPUP
function showInfo(id) {
    var t = "#" + String(id);
    $(t).mouseenter(function(event){
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
        $("#infopopup").html(htmlcode).css({'top': event.pageY, 'left': event.pageX, 'visibility': 'visible'});  
    });
    $(function(){
        $(t).mouseout(function(event){
            $("#infopopup").css({'visibility': 'hidden'});
        });
    });
}

// GENERATE A NEW MAP/GAME
function generateMap() {
	var example = {
    "game": {
        "turn": 1,
        "year": -4000
    },
	"players": [
		{
			"id": 1,
			"color": "red",
			"name": "Daniele",
			"civilization": "rome",
			"points": 0,
            "gold": 0,
            "society": "dispotism",
            "culture": 0
		},
		{
			"id": 2,
			"color": "blue",
			"name": "Veneroni",
			"civilization": "greek",
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
                "nature": "none",
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
                "nature": "forest",
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
    		"player": 1,
    		"color": "red",
    		"x": 3,
    		"y": 2,
    		"type": "archer",
    		"experience": 0,
    		"life": 1
    	},
    	{
    		"player": 2,
    		"color": "blue",
    		"x": 3,
    		"y": 3,
    		"type": "settler",
    		"experience": 0,
    		"life": 1
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
