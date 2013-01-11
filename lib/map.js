// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
var map;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function loadMap(){
	var action = getUrlVars()["action"];
	//alert(action); debug
	if (action == "load") {
		var save = getUrlVars()["save"];
		if (save == "auto") {
			map = JSON.parse(localStorage.autosave);
		} else {
			map = JSON.parse(localStorage.manualsave);
		}
	} else {
		map = JSON.parse(generateMap());
	}
	alert(map); // debug
	reloadMap();
}

function saveGame() {
	var answer = confirm("Are you sure to Save?\nThis action will overwrite your previous Manual Save Game!")
	if (answer){
		localStorage.manualsave =  JSON.stringify(map);
		alert("Game Saved.")
	}
}

function autoSaveGame() {
	localStorage.autosave =  JSON.stringify(map);
}

function loadGame() {
	var answer = confirm("Are you sure to Load?\nAll unsaved actions will be lost!")
	if (answer){
		map = localStorage.manualsave;
		reloadMap();
		alert("Game Loaded.")
	}
}

function manual() {
	if (document.getElementById('actionbar').style.visibility == "hidden") {
		document.getElementById('actionbar').style.visibility = "visible";
	} else {
		document.getElementById('actionbar').style.visibility = "hidden";
	}
	
}

function exitGame() {
	var answer = confirm("Are you sure to Exit?\nAll unsaved actions will be lost!")
	if (answer){
		localStorage.autosave =  JSON.stringify(map);
		window.location.href = "index.html"
	}
}

function reloadMap() {
	//used to reload the map after loading a saved game and to load the map on beginning
	/*
	var design = '<table border="0" cellspacing="1"><tbody>';

	design += '</tbody></table>';
	document.getElementById("map").innerHTML = design;
	*/
}

function generateMap() {
	// generate a random map, used when a new game begin
	return "ciao";
}
