// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
"use strict";

var stage;
var canvas;
var camera = {x: 0, y: 0, prevx: 0, prevy: 0};
var maptiles = []; // {id, bmp}
var mapunits = []; // {id, unitBmp, hitBmp}
var mapcities = []; // {id, labelBmp, hitBmp, cityBmp}
var mapelements = []; // just bmp
var mapselections = []; // {x, y, bmp}
var loadingMessage = false;
var imageCache = {};

var SCALE = 1;
var TILESIZE = Math.floor(101 * SCALE);
var UNITSIZE = Math.floor(56 * SCALE);
var UNITOFFSET = Math.floor((TILESIZE - UNITSIZE) / 2);

// ON LOAD
window.addEventListener("load", function() {
     init();
}, 0);

function init() {
	preloadImages();

	canvas = document.getElementById("mapcanvas");
	canvas.width = $(window).width() - 10;
	canvas.height = $(window).height() - 60;

	stage = new createjs.Stage(canvas);

	loadMap();
	keyboardMapping();
	$("#focusnextbutton").click(function () { focusNext(); });
	$("#endturnbutton").click(function () { endTurn(); });
	$("#mainmenubutton").click(function () { mainMenu(); });

	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(window);

	renderMap();
}

function tick(elapsedTime) {
	stage.update();
	//console.log("FPS: " + createjs.Ticker.getMeasuredFPS()); // DEBUG REAL FPS
}

// LOAD/DRAW THE MAP
function loadMap() {
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
    	var playerName = getUrlVars()["name"];
    	var civilization = getUrlVars()["civ"];
        var nplayers = getUrlVars()["players"];
        var ncols = getUrlVars()["ncols"];
        var nrows = getUrlVars()["nrows"];
		map = JSON.parse(JSON.stringify(generateMap(playerName, civilization, nplayers, nrows, ncols)));
	}
    if (action == "preset") {
    	var mapname = getUrlVars()["map"];
        presetMap(mapname);
        alert(mapname + " Map Loaded");
    }
}

function preloadImages () {
	imageCache.upImg = new Image().src = "images/hud/up.png";
	imageCache.downImg = new Image().src = "images/hud/down.png";
	imageCache.leftImg = new Image().src = "images/hud/left.png";
	imageCache.rightImg = new Image().src = "images/hud/right.png";

	imageCache.desert = new Image().src = "images/tiles/desert.jpg";
	imageCache.fog = new Image().src = "images/tiles/fog.jpg";
	imageCache.grass = new Image().src = "images/tiles/grass.jpg";
	imageCache.hill = new Image().src = "images/tiles/hill.jpg";
	imageCache.marsh = new Image().src = "images/tiles/marsh.jpg";
	imageCache.mountain = new Image().src = "images/tiles/mountain.jpg";
	imageCache.snow = new Image().src = "images/tiles/snow.jpg";
	imageCache.water = new Image().src = "images/tiles/water.jpg";

	imageCache.forest = new Image().src = "images/tiles/forest.png";
	imageCache.city = new Image().src = "images/tiles/city.png";
}

function toggleLoadingMessage () {
	loadingMessage = !loadingMessage;
	if (loadingMessage) {
		$("#actionbar").html('<p align="center">LOADING, PLEASE WAIT...<p>');
		openActionbar();
	} else {
		closeActionbar();
	}
}

// RELOAD MAP USED TO PAINT THE MAP ON LOADING A GAME OR LOADING THE MAP ON BEGINNING
function renderMap() {
	createjs.Ticker.setPaused(true);
	
	// CLEAR ALL THE GRAPHICS DATA
	stage.removeAllChildren();
	maptiles = [];
	mapunits = [];
	mapcities = [];
	mapelements = [];

    // PLAYERS SETTING
    document.getElementById('playerstats').innerHTML = '<img src="images/hud/stats.png" class="buttonimage" alt="Turn" title="Turn"> ' + map.game.turn + ' &nbsp;<img src="images/hud/time.png" class="buttonimage" alt="Year" title="Year"> ' + map.game.year + ' &nbsp;&nbsp;<strong>Players:</strong> ';
    var len = map.players.length;
    for (var i = 0; i < len; i++) {
        var divid = "player" + i;
        var dividquery = "#" + divid;
        document.getElementById('playerstats').innerHTML += '<span id="' + divid + '"><span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + map.players[i].color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + map.players[i].name + ' (' + map.players[i].civilization + ')</span> &nbsp;&nbsp;&nbsp;';
    }
    var len = map.players.length;
    for (var i = 0; i < len; i++) {
        var divid = "player" + i;
        var dividquery = "#" + divid;
        $(dividquery).mouseover(function(event){
            var n = this.id.charAt(this.id.length-1);
            var htmlcode = '<strong>Name:</strong> <span style="width: 15px; height: 15px; border: 1px solid black; background-color:' + map.players[n].color + '">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' + map.players[n].name
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
	var leny = map.tiles.length;
	for (var y = 0; y < leny; y++) {
		var lenx = map.tiles[y].length;
		for (var x = 0; x < lenx; x++) {
			var t = map.tiles[y][x];
			addTileToMap(t);
		}
	}

    // CITIES SETTING

    var len = map.cities.length;
    for (var i = 0; i < len; i++) {
        var city = map.cities[i];
        if (!(findTileByXY(city.x, city.y).fog)) {
        	addCityToMap(city);
        }
    }

    // UNITS SETTING
    var len = map.units.length;
    for (var i = 0; i < len; i++) {
        var unit = map.units[i];
        if (!(findTileByXY(unit.x, unit.y).fog)) {
        	addUnitToMap(unit);
        }
    }

    // SETUP HUD
	setupHUD();

	// FOCUS ON THE FIRST ACTION
	focusNext();

    // RENDERING
    createjs.Ticker.setPaused(false);
    stage.update();

    console.log("RENDERMAP -", "Tiles:", maptiles.length, "Units:", mapunits.length, "Cities:", mapcities.length, "Elements:", mapelements.length);
}

// SETUP HUD WITH ARROWS
function setupHUD() {
	var up = new createjs.Bitmap(imageCache.upImg).setTransform(150*SCALE/3, 0, SCALE/3, SCALE/3);
	var down = new createjs.Bitmap(imageCache.downImg).setTransform(150*SCALE/3, 150*SCALE/3, SCALE/3, SCALE/3);
	var left = new createjs.Bitmap(imageCache.leftImg).setTransform(0, 75*SCALE/3, SCALE/3, SCALE/3);
	var right = new createjs.Bitmap(imageCache.rightImg).setTransform(300*SCALE/3, 75*SCALE/3, SCALE/3, SCALE/3);

	up.onClick = function (e) {
		moveCamera(0, 100);
	}
	down.onClick = function (e) {
		moveCamera(0, -100);
	}
	left.onClick = function (e) {
		moveCamera(100, 0);
	}
	right.onClick = function (e) {
		moveCamera(-100, 0);
	}

	stage.addChild(up, down, left, right);
}

// Keyboard mapping using Kibo.js
function keyboardMapping() {
	var k = new Kibo();
	k.down(['ctrl e'], function(){
		exportMap();
		return false;
	});
	k.down(['space'], function() { 
	    endTurn();
	    return false; // used to prevent default action on keypress
	});
	k.down(['up'], function() { 
	    moveCamera(0, 100);
	    return false; // used to prevent default action on keypress
	});
	k.down(['down'], function() { 
	    moveCamera(0, -100);
	    return false; // used to prevent default action on keypress
	});
	k.down(['left'], function() { 
	    moveCamera(100, 0);
	    return false; // used to prevent default action on keypress
	});
	k.down(['right'], function() { 
	    moveCamera(-100, 0);
	    return false; // used to prevent default action on keypress
	});
}

// MOVE RELATIVE GAME CAMERA
function moveCamera(x, y) {
	camera.x += x;
	camera.y += y;
	updateMap();
}

// CENTER THE CAMERA ON SPECIFIED X AND Y COORDINATE
function centerCameraOnXY(x, y) {
	var newx = ((x - 1) * TILESIZE);
	var newy = ((y - 1) * TILESIZE);
	newx = -newx + (canvas.width / 2) - (TILESIZE / 2);
	newy = -newy + (canvas.height / 2) - (TILESIZE / 2);
	camera.x = newx;
	camera.y = newy;
	updateMap();
}

// UPDATE MAP LOCATION BASED ON THE CAMERA
function updateMap() {
	var len = maptiles.length;
	for (var i = 0; i < len; i++) {
		maptiles[i].bmp.x = maptiles[i].bmp.x - camera.prevx + camera.x;
		maptiles[i].bmp.y = maptiles[i].bmp.y - camera.prevy + camera.y;
	}
	len = mapunits.length;
	for (var i = 0; i < len; i++) {
		mapunits[i].unitBmp.x = mapunits[i].unitBmp.x - camera.prevx + camera.x;
		mapunits[i].unitBmp.y = mapunits[i].unitBmp.y - camera.prevy + camera.y;
		mapunits[i].hitBmp.x = mapunits[i].hitBmp.x - camera.prevx + camera.x;
		mapunits[i].hitBmp.y = mapunits[i].hitBmp.y - camera.prevy + camera.y;
	}
	len = mapcities.length;
	for (var i = 0; i < len; i++) {
		mapcities[i].labelBmp.x = mapcities[i].labelBmp.x - camera.prevx + camera.x;
		mapcities[i].labelBmp.y = mapcities[i].labelBmp.y - camera.prevy + camera.y;
		mapcities[i].hitBmp.x = mapcities[i].hitBmp.x - camera.prevx + camera.x;
		mapcities[i].hitBmp.y = mapcities[i].hitBmp.y - camera.prevy + camera.y;
		mapcities[i].cityBmp.x = mapcities[i].cityBmp.x - camera.prevx + camera.x;
		mapcities[i].cityBmp.y = mapcities[i].cityBmp.y - camera.prevy + camera.y;
	}
	len = mapelements.length;
	for (var i = 0; i < len; i++) {
		mapelements[i].x = mapelements[i].x - camera.prevx + camera.x;
		mapelements[i].y = mapelements[i].y - camera.prevy + camera.y;
	}
	len = mapselections.length;
	for (var i = 0; i < len; i++) {
		mapselections[i].bmp.x = mapselections[i].bmp.x - camera.prevx + camera.x;
		mapselections[i].bmp.y = mapselections[i].bmp.y - camera.prevy + camera.y;
	}
	camera.prevx = camera.x;
	camera.prevy = camera.y;
}

// RETURN THE X OR Y FOR A UNIT/ELEMENT TO BE DRAW AT THE COORDINATE index
function coordinate(index) {
	return (index - 1) * TILESIZE + UNITOFFSET;
}

// ADD A UNIT TO THE MAP
function addUnitToMap(unit) {
	var element = new Image().src = "images/units/" + unit.type + ".png";
	var unitImage = new createjs.Bitmap(element).setTransform(coordinate(unit.x) + camera.x, coordinate(unit.y) + camera.y, SCALE, SCALE);
	
	var hit = new createjs.Shape();
	hit.graphics
		.setStrokeStyle(1)
		.beginStroke(findPlayerById(unit.player).color)
		.beginFill(findPlayerById(unit.player).color)
		.drawRect(coordinate(unit.x) + camera.x, coordinate(unit.y) + camera.y, UNITSIZE, UNITSIZE);
	hit.alpha = 0.5;
	unitImage.hitArea = hit;

	if (unit.player == 0) {
		hit.onClick = function (e) {
			showUnitOptions(unit.id);
		}
	}

	var paintUnit = {};
	paintUnit.id = unit.id;
	paintUnit.unitBmp = unitImage;
	paintUnit.hitBmp = hit;
	mapunits.push(paintUnit);

	stage.addChild(hit, unitImage);
}

// ADD A TILE TO THE MAP
function addTileToMap(tile) {
	var elementimg;
	if (tile.fog) { 
		elementimg = imageCache.fog; 
	} else {
		if (tile.type == "desert") elementimg = imageCache.desert;
		if (tile.type == "grass") elementimg = imageCache.grass;
		if (tile.type == "hill") elementimg = imageCache.hill;
		if (tile.type == "marsh") elementimg = imageCache.marsh;
		if (tile.type == "mountain") elementimg = imageCache.mountain;
		if (tile.type == "snow") elementimg = imageCache.snow;
		if (tile.type == "water") elementimg = imageCache.water;
	}
	
	var assey = (tile.y - 1) * TILESIZE + camera.y;
	var assex = (tile.x - 1) * TILESIZE + camera.x;
	var elementBmp;
	try {
		elementBmp = new createjs.Bitmap(elementimg).setTransform(assex, assey, SCALE, SCALE);
	} catch(err) {
	  console.log(err);
	  console.trace();
	}
	
	var paintTile = {};
	paintTile.id = tile.id;
	paintTile.bmp = elementBmp;
	maptiles.push(paintTile);

	stage.addChild(elementBmp);

	// set eventual nature element
	if (!(tile.nature == "none" || tile.fog)) {
		addElementToMap(tile.nature, tile.x, tile.y);
	}
}

// ADD A CITY LABEL TO THE X, Y COORDINATE
function addCityToMap(city) {
	var cityBitmap = new createjs.Bitmap(imageCache.city).setTransform(coordinate(city.x) + camera.x, coordinate(city.y) + camera.y, SCALE, SCALE);

	var label = new createjs.Text(city.name, "normal 12px Arial", findPlayerById(city.player).color);
	var tx = ((city.x - 1) * TILESIZE) + ((TILESIZE - label.getMeasuredWidth()) / 2) + camera.x;
	var ty = ((city.y - 1) * TILESIZE) + (TILESIZE - label.getMeasuredHeight() - 10) + camera.y;
	label.setTransform(tx, ty);

	var hit = new createjs.Shape();
	hit.graphics
		.setStrokeStyle(1)
		.beginStroke(findPlayerById(city.player).color)
		.beginFill("#E8E5E5")
		.drawRect(tx - 5, ty - 5, label.getMeasuredWidth() + 10, label.getMeasuredHeight() + 10);
	label.hitArea = hit;

	var paintCity = {};
	paintCity.id = city.id;
	paintCity.labelBmp = label;
	paintCity.hitBmp = hit;
	paintCity.cityBmp = cityBitmap;
	mapcities.push(paintCity);

	stage.addChild(cityBitmap, hit, label);
}

// ADD AN ELEMENT TO THE MAP
function addElementToMap(element, x, y) {
	var elementimg;
	if (element == "forest") elementimg = imageCache.forest;

	var elementBmp = new createjs.Bitmap(elementimg).setTransform(coordinate(x) - 10 + camera.x, coordinate(y) - 10 + camera.y, SCALE * 0.50, SCALE * 0.50);
	mapelements.push(elementBmp);
	stage.addChild(elementBmp);
}

function findGraphics(type, id) {
	var array;
	if (type == "unit") array = mapunits;
	if (type == "tile") array = maptiles;
	if (type == "city") array = mapcities;
	if (type == "element") array = mapelements;

	var len = array.length;
	for (var i = 0; i < len; i++) {
		if (array[i].id == id) return array[i];
	}
}

// SELECT DESTINATIONS FOR THE UNIT
function selectDestinations(unit) {
    var len = map.tiles.length;
    for (var x = 0; x < len; x++) {
        var len2 = map.tiles[x].length;
        for (var y = 0; y < len2; y++) {
        	var tile = map.tiles[x][y];
            var distance = Math.sqrt(Math.pow(unit.x - tile.x, 2) + Math.pow(unit.y - tile.y, 2));
            if (distance <= getMovByType(unit.type)) {
            	// the tile is (possibly) attainable

            	var assey = (tile.y - 1) * TILESIZE + camera.y;
            	var assex = (tile.x - 1) * TILESIZE + camera.x;

            	var rect = new createjs.Shape();
            	rect.graphics
            		.setStrokeStyle(1)
            		.beginStroke(findPlayerById(unit.player).color)
            		.beginFill(findPlayerById(unit.player).color)
            		.drawRect(assex, assey, TILESIZE, TILESIZE);
            	rect.alpha = 0.3;

            	var selezione = {};
                selezione.x = tile.x;
                selezione.y = tile.y;
                selezione.bmp = rect;

                if (!(tile.x == unit.x && tile.y == unit.y)) { // the tile is the same of the unit position
                	var unitsLen = map.units.length;
                	var trovato = false;
	                var i = 0;
	                while (i < unitsLen && !trovato) {
	                	if (map.units[i].x == tile.x && map.units[i].y == tile.y && map.units[i].player == map.players[0].id) trovato = true; // a unit of the same player is already on that tile
	                	i++;
	                }
	                if (!trovato) {
	                	if (tile.type == "water" && isNaval(unit.type)) { // the tile is water and the unit can go in water
	                    	// add rect
	            			mapselections.push(selezione);
							stage.addChild(selezione.bmp);
                    	} else {
                        	if (tile.type != "water" && isTerrain(unit.type)) { // the tile is not water and the unit can go on terrain
	                            // add rect
	                            mapselections.push(selezione);
								stage.addChild(selezione.bmp);
                        	}
                    	}
	                }
                }
            }
        }
    }
}

// DESELECT SELECTED DESTINATIONS
function deselectDestinations() {
	var len = mapselections.length;
	for (var i = 0; i < len; i++) {
		stage.removeChild(mapselections[i].bmp);
	}
	mapselections.splice(0, len);
}
