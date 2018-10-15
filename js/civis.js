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
			width: 16,
			height: 16,
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

		var tile_type = ['mountain', 'forest', 'plain', 'desert', 'water'];
		for (var y = 0; y < map.height; ++y) {
			for (var x = 0; x < map.width; ++x) {
				var tile = {
					id: 'x' + x + 'y' + y,
					x: x,
					y: y,
					type: tile_type[Math.floor(Math.random() * tile_type.length)],
					fog: true
				};
				map.tiles[tile.id] = tile;
			}
		}

		console.log(map);
	};

	Civis.renderMap = function (map) {
		var paper = Snap('#main-paper'),
			width = window.innerWidth,
			height = window.innerHeight,
			camera = { x: 0, y: 0 },
			tileSize = 100,
			tileGap = 1,
			shapes = {};

		paper.attr({
			width: width,
			height: height,
			viewBox: camera.x + ' ' + camera.y + ' ' + width + ' ' + height
		});

		$(window).on('resize', function () {
			width = window.innerWidth;
			height = window.innerHeight;
			paper.attr({
				width: width,
				height: height,
				viewBox: camera.x + ' ' + camera.y + ' ' + width + ' ' + height
			});
		});
		paper.mousemove(function (e) {
			var step = 10;
			if (e.pageX < 30) { camera.x -= step; }
			if (e.pageX > width - 30) { camera.x += step; }
			if (e.pageY < 60) { camera.y -= step; }
			if (e.pageY > height - 30) { camera.y += step; }
			paper.attr({
				viewBox: camera.x + ' ' + camera.y + ' ' + width + ' ' + height
			});
		});

		/*
		var units;
		Snap.load('img/units.svg', function (f) {
			units = f;
		});
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
