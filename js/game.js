// Copyright (c) 2013-2015 Daniele Veneroni.
// Released under GPLv3 License. See LICENSE.md for further information.
(function () {
	'use strict';

	window.GAME = {};

	// ##############################################
	// # GENERATE MAP                               #
	// ##############################################

	GAME.generateMap = function (options) {
		options = options || {
			players: 4,
			playerName: 'Daniele',
			playerCiv: 'rome',
			playerColor: 'dodgerblue'
		};

		var map = {
			width: 16,
			height: 16,
			turn: 1,
			players: {},
			tiles: {}
		};

		// PLAYERS
		var colors = ['crimson', 'orangered', 'darkorange', 'gold', 'limegreen', 'mediumaquamarine', 'dodgerblue', 'mediumslateblue', 'mediumvioletred'],
			civs = [];

		for (var civ in CIVSDB) {
			if (CIVSDB.hasOwnProperty(civ)) {
				civs.push(civ);
			}
		}

		// ADD PLAYER TO MAP
		for (var i = 0; i < options.players; ++i) {
			var player = {
				id: 'player' + i,
				type: i === 0 ? 'human' : 'AI',
				name: i === 0 ? options.playerName : 'AI' + i,
				color: i === 0 ? options.playerColor : colors[Math.floor(Math.random() * colors.length)],
				civ: i === 0 ? options.playerCiv : civs[Math.floor(Math.random() * civs.length)],
				gold: 0,
				culture: 0,
				techs: [],
				cities: {},
				units: {}
			};
			map.players[player.id] = player;
		}

		// TILES
		var tileType = ['mountain', 'forest', 'plain', 'desert', 'water'];
		for (var y = 0; y < map.height; ++y) {
			for (var x = 0; x < map.width; ++x) {
				var tile = {
					id: 'x' + x + 'y' + y,
					x: x,
					y: y,
					type: tileType[Math.floor(Math.random() * tileType.length)],
					fog: true
				};
				map.tiles[tile.id] = tile;
			}
		}

		// EXPOSE MAP
		console.log(map);
		return map;
	};

	// ##############################################
	// # SAVE GAME                                  #
	// ##############################################

	GAME.saveGame = function (name) {
		localforage.getItem('saves', function (value) {
			var saves = null;
			if (value) {
				saves = value;
			} else {
				// create saves object
				saves = {};
			}
			if (name) {
				// save over named slot
				saves[name] = window.MAP;
				localforage.setItem('saves', saves);
			} else {
				// open save game destination panel
				// TODO
			}
		});
	};

	// ##############################################
	// # LOAD GAME                                  #
	// ##############################################

	GAME.loadGame = function (name) {
		localforage.getItem('saves', function (value) {
			var saves = null;
			if (value) {
				saves = value;
			} else {
				alert('No saved game available!');
				return;
			}
			if (name) {
				// load over named slot
				window.MAP = saves[name];
				RENDER.paper.clear();
				RENDER.renderMap(MAP);
			} else {
				// open load game destination panel
				// TODO
			}
		});
	};

	// ##############################################
	// # PLAY TURN                                  #
	// ##############################################
	/*

	TURN

	1. Start of Turn
		Any player may one or many of these actions:
		* Build a city by sacrifing a scout (Note: cannot move now)
		* Change governments (se si cambia si va in anarchia: per quel turno non è possibile eseguire azioni nella capitale)

	2. Trade
		- Collect trade from any city (max 27 trade points at a time)

	3. City Management
		For every city take one of the following actions:
		* produce a unit
		* produce a building
		* gain culture points (1 + simboli C negli outskirts. used to advance culture level and achieve culture events or great people)
		* harvest a resource

	4. Movement
		For every unit: move a number of spaces on the board equal to the civilization available (min: 2. techs may increase this)

	5. Research
		Players may spend trade points to research new technologies

	*/
	GAME.playTurn = function () {
		// 0. AUTOSAVE
		// TODO

		// 1. START OF TURN
		// TODO

		// 2. TRADE
		// TODO

		// 3. CITY MANAGEMENT
		// TODO

		// 4. MOVEMENT
		// TODO

		// 5. RESEARCH
		// TODO
	};

	// ##############################################
	// # END TURN                                   #
	// ##############################################

	GAME.endTurn = function () {
		// 1. AUTOSAVE
		GAME.saveGame('auto');
		console.log('Game saved');

		// 2. CLOSE POPUPS
		$$('#menu, #popup, #container').slideOut();
		console.log('Popups closed');

		// 3. RESET NOTIFICATIONS
		$$('#notifications').empty();
		console.log('Notifications resetted');

		// 4. CURE UNITS IF FORTIFIED
		for (var unit in MAP.players.player0.units) {
			if (unit.fortified) {
				var heal = 1;
				if (unit.exp >= 10) { // ELITE
					heal = 3;
				} else if (unit.exp >= 5) { // VETERAN
					heal = 2;
				}
				unit.life = unit.life + heal > unit.maxlife ? unit.maxlife : unit.life + heal;
				console.log('Unit ' + unit.id + ' cured, now have ' + unit.life + '/' + unit.maxlife + ' life.');
			}
		}

		// 5. AI PLAYERS TURNS
		for (var player in MAP.players) {
			// FOR EACH AI PLAYER
			if (MAP.players.hasOwnProperty(player) && player != 'player0') {
				console.group(player + '\'s turn');
				MAP.game.turnPlayer = player;
				console.log('Now playing ' + MAP.game.turnPlayer);

				// 5.1 ACTIVATE PLAYER UNITS
				for (var unit in MAP.players[player].units) {
					unit.active = UNITSDB.getMov(unit);
					console.log('Unit ' + unit.id + ' activated.');
				}

				// 5.2 GOLD PRODUCTION
				for (var city in MAP.players[player].cities) {
					MAP.players[player].gold += GAME.getCityGold(city);
				}
				console.log(MAP.game.turnPlayer + '\'s gold: ' + MAP.players[player].gold);

				// 5.3 MAINTENANCE COST
				MAP.players[player].gold -= Object.keys(MAP.players[player].units).length; // -1 gold for each unit
				console.log(MAP.game.turnPlayer + '\'s gold after maintenance: ' + MAP.players[player].gold);

				// 5.4 SCIENCE PRODUCTION
				// TODO

				// 5.5 CULTURE PRODUCTION
				// TODO

				// 5.6 BUILDINGS PRODUCTION
				// TODO

				// 5.7 CITIES GROWTH
				// TODO

				// 5.8 AI ACTIONS + UPDATE MAP
				// TODO

				// 5.9 CURE PLAYER UNITS IF FORTIFIED
				for (var unit in MAP.players[player].units) {
					if (unit.fortified) {
						var heal = 1;
						if (unit.exp >= 10) { // ELITE
							heal = 3;
						} else if (unit.exp >= 5) { // VETERAN
							heal = 2;
						}
						unit.life = unit.life + heal > unit.maxlife ? unit.maxlife : unit.life + heal;
						console.log('Unit ' + unit.id + ' cured, now have ' + unit.life + '/' + unit.maxlife + ' life.');
					}
				}
				console.groupEnd();
			}
		}

		// 6. STEP FORWARD TURN AND YEAR
		MAP.game.turn++;
		MAP.game.year += MAP.game.yearStep;
		MAP.game.turnPlayer = 'player0'; // id of the human player
		console.log('Turn: ' + MAP.game.turn + ' - Year: ' + MAP.game.year + ' - Now playing: ' +  MAP.game.turnPlayer);

		// 7. ACTIVATE PLAYER UNITS
		for (var unit in MAP.players.player0.units) {
			unit.active = UNITSDB.getMov(unit);
			console.log('Unit ' + unit.id + ' activated.');
		}

		// 8. GOLD PRODUCTION
		for (var city in MAP.players.player0.cities) {
			MAP.players.player0.gold += GAME.getCityGold(city);
		}
		console.log(MAP.game.turnPlayer + '\'s gold: ' + MAP.players.player0.gold);

		// 9. MAINTENANCE COST
		MAP.players.player0.gold -= Object.keys(MAP.players.player0.units).length; // -1 gold for each unit
		console.log(MAP.game.turnPlayer + '\'s gold after maintenance: ' + MAP.players.player0.gold);

		// 10. SCIENCE PRODUCTION
		// TODO

		// 11. CULTURE PRODUCTION
		// TODO

		// 12. BUILDINGS PRODUCTION
		// TODO

		// 13. CITIES GROWTH
		// TODO

		// 14. UPDATE MAP
		$$('#header-science').text(MAP.players.player0.science.points.toString());
		$$('#header-gold').text(MAP.players.player0.gold.toString());
		$$('#header-culture').text(MAP.players.player0.culture.toString());
		$$('#header-turn-number').text(MAP.game.turn.toString());
		$$('#header-turn-year').text(MAP.game.year.toString());
	};

	// ##############################################
	// # CREATE UNIT                                #
	// ##############################################

	/*
	GAME.createUnit({
		player: MAP.players.player0,
		x: 1,
		y: 2,
		type: 'archer'
	});
	*/
	GAME.createUnit = function (obj) {
		return {
			id: '' + obj.player.id + 'u' + $$.guid(),
			player: obj.player.id,
			x: obj.x,
			y: obj.y,
			type: obj.type,
			exp: 0,
			life: 1,
			maxlife: 1,
			fortified: false,
			active: UNITSDB.getMov({ type: obj.type })
		};
	};

	// ##############################################
	// # GET NEAR TILES                             #
	// ##############################################

	GAME.getNearTiles = function (x, y) {
		var list = [];
		if (y !== 0) {
			if (x !== 0) {
				list.push('x' + (x-1) + 'y' + (y-1));
			}
			list.push('x' + x + 'y' + (y-1));
			if (x !== MAP.width - 1) {
				list.push('x' + (x+1) + 'y' + (y-1));
			}
		}
		if (x !== 0) {
			list.push('x' + (x-1) + 'y' + y);
		}
		list.push('x' + x + 'y' + y);
		if (x !== MAP.width - 1) {
			list.push('x' + (x+1) + 'y' + y);
		}
		if (y !== MAP.height - 1) {
			if (x !== 0) {
				list.push('x' + (x-1) + 'y' + (y+1));
			}
			list.push('x' + x + 'y' + (y+1));
			if (x !== MAP.width - 1) {
				list.push('x' + (x+1) + 'y' + (y+1));
			}
		}
		return list;
	};

	// ##############################################
	// # SELECT DESTINATIONS                        #
	// ##############################################

	GAME.selectDestinations = function (unit) {
		var tiles = GAME.getNearTiles(unit.x, unit.y);
		for (var i = 0; i < tiles.length; i++) {
			var tile = MAP.tiles[tiles[i]];
			(function (tile) {
				RENDER.renderDestination(tile, function () {
					RENDER.renderMove({ id: 'p0u2' }, tile.x, tile.y);
				});
			})(tile);
		}
	};

	// ##############################################
	// # GET CITY GOLD                              #
	// ##############################################

	GAME.getCityGold = function (city) {
		/*
		var basegold = 0,
			tiles = GAME.getNearTiles(city.x, city.y);
		for (var j = 0, len = tiles.length; j < len; j++) {
			basegold += getGoldFromTile(tiles[j]);
		}

		if (cityHaveBuilding(city, "Market")) { basegold += 2; } // +2
		if (cityHaveBuilding(city, "Bank")) { basegold += 2; } // +2

		var gold = basegold;

		if (cityHaveBuilding(city, "Market")) { gold += Math.round(basegold / 4); } // +25%
		if (cityHaveBuilding(city, "Bank")) { gold += Math.round(basegold / 4); } // +25%

		for (var i = 0, len = city.buildings.length; i < len; i++) {
			gold -= buildingsDB[city.buildings[i]].maintenance;
		}

		return gold;
		*/
		return 0;
	};

})();
