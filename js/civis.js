(function () {
	'use strict';

	var Civis = Object.create(null);

	Civis.saveGame = function () {
		localforage.getItem('saves', function (value) {
			var saves = null;
			if (value) {
				saves = value;
			} else {
				// create saves object
				saves = {};
			}
			if (window.MAP) {
				saves[MAP.id] = MAP;
				localforage.setItem('saves', saves);
			}
		});
	};

	Civis.loadGame = function (id) {
		localforage.getItem('saves', function (value) {
			var saves = null;
			if (value) {
				saves = value;
			} else {
				alert('No saved game available!');
				return;
			}
			if (id && saves[id]) {
				window.MAP = saves[id];
				Civis.renderMap(MAP);
			}
		});
	};

	Civis.generateMap = function (settings) {
		var map = {
			id: Date.now().toString(),
			width: settings && settings.width ? settings.width : 32,
			height: settings && settings.height ? settings.height : 16,
			turn: 0,
			phase: 'init',
			players: settings && settings.players ? settings.players : {},
			tiles: {},
			cities: {},
			units: {}
		};

		for (var y = 0; y < map.height; ++y) {
			for (var x = 0; x < map.width; ++x) {
				var tile = {
					id: 'x' + x + 'y' + y,
					x: x,
					y: y,
					type: null,
					fog: true
				};
				var number = Math.floor(Math.random() * 100) + 1;
				if (number >= 1 && number <= 10) {
					tile.type = 'mountain'; // 10 %
				} else if (number >= 11 && number <= 30) {
					tile.type = 'forest'; // 20 %
				} else if (number >= 31 && number <= 60) {
					tile.type = 'plain'; // 30 %
				} else if (number >= 61 && number <= 70) {
					tile.type = 'desert'; // 10 %
				} else {
					tile.type = 'water'; // 30 %
				}
				map.tiles[tile.id] = tile;
			}
		}

		//console.log(map);
		return map;
	};

	Civis.renderMap = function (map) {
		var paper = Snap('#main-paper'),
			width = window.innerWidth,
			height = window.innerHeight,
			camera = { x: 0, y: 0, zoom: 1 },
			tile_size = 50,
			shapes = { tiles: {} };

		var getViewBox = function () {
			return (camera.x * camera.zoom) + ' ' + (camera.y * camera.zoom) + ' ' + (width * camera.zoom) + ' ' + (height * camera.zoom);
		};

		paper.clear();
		paper.attr({
			width: width,
			height: height,
			viewBox: getViewBox()
		});
		$(window).off('resize').on('resize', function () {
			width = window.innerWidth;
			height = window.innerHeight;
			paper.attr({
				width: width,
				height: height,
				viewBox: getViewBox()
			});
		});
		paper.undrag().drag(function (dx, dy) {
			camera.x = camera.x_predrag - dx;
			camera.y = camera.y_predrag - dy;
			paper.attr({ viewBox: getViewBox() });
		}, function () {
			camera.x_predrag = camera.x;
			camera.y_predrag = camera.y;
		}, function () {
			delete camera.x_predrag;
			delete camera.y_predrag;
		});
		$('#main-paper').off('wheel').on('wheel', function (e) {
			camera.zoom = Math.max(0.5, Math.min(1.5, e.originalEvent.deltaY > 0 ? camera.zoom + 0.05 : camera.zoom - 0.05));
			paper.attr({ viewBox: getViewBox() });
		});

		var tiles_colors = {
			mountain: '#9ba0a6',
			forest: '#629246',
			plain: '#a9d78e',
			desert: '#bd986c',
			water: '#136c96'
		};

		var getHexPolyline = function (x, y, radius) {
			var h = (radius * Math.sqrt(3)) / 2;
			return [
				[x - radius / 2, y + h],
				[x + radius / 2, y + h],
				[x + radius, y],
				[x + radius / 2, y - h],
				[x - radius / 2, y - h],
				[x - radius, y],
				[x - radius / 2, y + h]
			];
		};

		// https://www.redblobgames.com/grids/hexagons/
		for (var x = 0; x < map.width; ++x) {
			for (var y = 0; y < map.height; ++y) {
				var tileID = 'x' + x + 'y' + y,
					cx = tile_size * 3/2 * x,
					cy = tile_size * Math.sqrt(3) * (y + 0.5 * (x & 1));
				shapes.tiles[tileID] = paper.polyline(getHexPolyline(cx, cy, tile_size)).attr({ fill: tiles_colors[map.tiles[tileID].type] });
				paper.text(cx, cy, x + ', ' + y).attr({ 'text-anchor': 'middle', 'alignment-baseline': 'middle' });
			}
		}

		Object.keys(map.tiles).forEach(function (tileID) {
			var tile = map.tiles[tileID],
				shape = shapes.tiles[tile.id];
			shape.mouseover(function () {
				var n = Civis.getNeighborsTiles(tile.x, tile.y);
				n.forEach(function (nID) {
					var s = shapes.tiles[nID];
					if (s) {
						s.attr({ stroke: 'yellow', 'stroke-width': 4, 'stroke-linecap': 'round' });
					}
				});
			});
			shape.mouseout(function () {
				var n = Civis.getNeighborsTiles(tile.x, tile.y);
				n.forEach(function (nID) {
					var s = shapes.tiles[nID];
					if (s) {
						s.attr({ stroke: '', 'stroke-width': 0 });
					}
				});
			});
		});

		/*
		var units;
		Snap.load('img/units.svg', function (f) {
			units = f;
		});

		var renderUnit = function (unit) {
			//console.log('renderUnit', unit);
			var size = tile_size * 0.6,
				x = (unit.x * (tile_size + tile_gap)) + ((tile_size - size) / 2),
				y = (unit.y * (tile_size + tile_gap)) + ((tile_size - size) / 2),
				unitSVG = units.select('#unit-' + unit.type).clone(),
				matrix = Snap.matrix();
			matrix.translate(x, y);
			matrix.scale(0.06, 0.06, 0, 0);
			unitSVG.attr({ fill: MAP.players[unit.player].color, transform: matrix });
			unitSVG.prepend(paper.rect(0, 0, 1024, 1024).attr({ fill: 'whitesmoke' }));
			paper.append(unitSVG);
			shapes[unit.id] = unitSVG;
			return unitSVG;
		};

		var renderMove = function (unit, coordX, coordY) {
			//console.log('renderMove', unit, coordX, coordY);
			var unitShape = shapes[unit.id],
				size = tile_size * 0.6,
				x = (coordX * (tile_size + tile_gap)) + ((tile_size - size) / 2),
				y = (coordY * (tile_size + tile_gap)) + ((tile_size - size) / 2),
				matrix = Snap.matrix();
			matrix.translate(x, y);
			matrix.scale(0.06, 0.06, 0, 0);
			unitShape.animate({ transform: matrix }, 500, mina.easeinout);
		};

		var renderDestination = function (tile, callback) {
			//console.log('renderDestination', tile, callback);
			var raggio = tile_size / 4,
				x = (tile.x * (tile_size + tile_gap)) + (tile_size / 2),
				y = (tile.y * (tile_size + tile_gap)) + (tile_size / 2),
				circle = paper.circle(x, y, raggio).attr({
					'stroke': 'yellow',
					'stroke-width': 3,
					'fill': 'gold',
					'opacity': 0.7,
					'cursor': 'pointer'
				}),
				text = paper.text(x, y, '1').attr({
					'fill': 'white',
					'font-size': 20,
					'font-weight': 'bold',
					'font-family': 'inherit',
					'cursor': 'pointer',
					'text-anchor': 'middle',
					'dominant-baseline': 'middle'
				}),
				destination = paper.group(circle, text);
			destination.click(callback);
		};
		*/
	};

	Civis.getNeighborsTiles = function (x, y) {
		var oddq_directions = [
			[[x + 1, y], [x + 1, y - 1], [x, y - 1], [x - 1, y - 1], [x - 1,  y], [x, y + 1]],
			[[x + 1, y + 1], [x + 1,  y], [x, y - 1], [x - 1, y], [x - 1, y + 1], [x, y + 1]]
		];
		var array = oddq_directions[x & 1],
			list = [];
		array.forEach(function (item) {
			list.push('x' + item[0] + 'y' + item[1]);
		});
		return list;
	};

	Civis.executePhase = function (phase) {
		if (phase === 'init') {
			$('#main-sidebar-phase').text('Init');
			// autosave
			// TODO
			// close popups
			// TODO
			// reset notifications
			// TODO
			// increase turn counter
			MAP.turn += 1;
		} else if (phase === 'upkeep') {
			$('#main-sidebar-phase').text('Upkeep');
			// gather production, research, culture and trade points
			Object.keys(MAP.cities).forEach(function (cityID) {
				var city = MAP.cities[cityID],
					player = MAP.players[city.player];
				// gather resources from neighbors tiles
				var tiles = Civis.getNeighborsTiles(city.x, city.y);
				tiles.forEach(function (tileID) {
					var tile = MAP.tiles[tileID];
					if (tile) {
						if (tile.type === 'mountain') {
							city.production += 1;
						} else if (tile.type === 'forest') {
							city.production += 2;
						} else if (tile.type === 'desert') {
							player.trade += 1;
						} else if (tile.type === 'water') {
							player.trade += 1;
						}
					}
				});
				// gather resources from city buildings
				// TODO
			});
			// pay upkeep for cities and units
			// TODO
		} else if (phase === 'trade') {
			$('#main-sidebar-phase').text('Trade');
			// TODO
		} else if (phase === 'production') {
			$('#main-sidebar-phase').text('Production');
			// for every city, choose between (a) Produce a unit or (b) Produce a building or (c) do nothing
			// TODO
		} else if (phase === 'movement') {
			$('#main-sidebar-phase').text('Movement');
			// activate all units
			// TODO
			// for every unit, move a number of spaces on the board equal to the civilization available (min: 2. techs may increase this)
			// TODO
		} else if (phase === 'research') {
			$('#main-sidebar-phase').text('Research');
			// players may spend research points to research new technologies
			// TODO
		}
	};

	window.Civis = Civis;
})();
