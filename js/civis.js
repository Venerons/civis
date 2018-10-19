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
			width: settings && settings.width ? settings.width : 16,
			height: settings && settings.height ? settings.height : 16,
			turn: 1,
			players: {},
			tiles: {}
		};

		if (settings && settings.players) {
			map.players = settings.players;
		} else {
			var colors = ['crimson', 'orangered', 'darkorange', 'gold', 'limegreen', 'mediumaquamarine', 'dodgerblue', 'mediumslateblue', 'mediumvioletred'],
				civs = Object.keys(DATABASE.civs);
			for (var i = 0; i < 4; ++i) {
				var player = {
					id: 'player' + (i + 1),
					type: i === 0 ? 'human' : 'cpu',
					name: 'Player ' + (i + 1),
					color: colors[Math.floor(Math.random() * colors.length)],
					civ: civs[Math.floor(Math.random() * civs.length)]
				};
				map.players[player.id] = player;
			}
		}

		//var tile_type = ['mountain', 'forest', 'plain', 'desert', 'water'];
		for (var y = 0; y < map.height; ++y) {
			for (var x = 0; x < map.width; ++x) {
				var tile = {
					id: 'x' + x + 'y' + y,
					x: x,
					y: y,
					type: null, //tile_type[Math.floor(Math.random() * tile_type.length)],
					fog: true
				};
				var number = Math.floor(Math.random() * 100) + 1;
				if (number >= 1 && number <= 10) {
					tile.type = 'mountain';
				} else if (number >= 11 && number <= 30) {
					tile.type = 'forest';
				} else if (number >= 31 && number <= 60) {
					tile.type = 'plain';
				} else if (number >= 61 && number <= 70) {
					tile.type = 'desert';
				} else {
					tile.type = 'water';
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
			tile_size = 100,
			tile_gap = 1,
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
		paper.drag(function (dx, dy) {
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

		var tiles = {
			mountain: '#9ba0a6',
			forest: '#629246',
			plain: '#a9d78e',
			desert: '#bd986c',
			water: '#136c96'
		};

		/*
		for (var x = 0; x < map.width; ++x) {
			for (var y = 0; y < map.height; ++y) {
				var tileID = 'x' + x + 'y' + y;
				shapes.tiles[tileID] = paper.rect(x * (tile_size + tile_gap), y * (tile_size + tile_gap), tile_size, tile_size).attr({ fill: tiles[map.tiles[tileID].type] });
			}
		}
		*/

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
		var w = 2 * tile_size,
			h = Math.sqrt(3) * tile_size;
		for (var x = 0; x < map.width; ++x) {
			for (var y = 0; y < map.height; ++y) {
				var tileID = 'x' + x + 'y' + y,
					cx = (x + 1) * (w * (3/4)),
					cy = (y + 1) * h;
				if (x % 2 === 0) {
					cy += h / 2;
				}
				paper.polyline(getHexPolyline(cx, cy, tile_size)).attr({ fill: tiles[map.tiles[tileID].type] });
				paper.text(cx, cy, x + ', ' + y).attr({ 'text-anchor': 'middle', 'alignment-baseline': 'middle' });
			}
		}

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

	Civis.getNearTiles = function (x, y) {
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

	window.Civis = Civis;
})();
