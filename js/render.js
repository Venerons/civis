// Copyright (c) 2013-2015 Daniele Veneroni.
// Released under GPLv3 License. See LICENSE.md for further information.
(function () {
	'use strict';

	function Renderer() {
		var t = this;
		t.paper = Snap('#paper');
		t.width = window.innerWidth;
		t.height = window.innerHeight - 35;
		t.camera = { x: 0, y: 0 };
		t.tileSize = 100;
		t.tileGap = 1;
		t.shapes = {};

		t.paper.attr({
			width: t.width,
			height: t.height,
			viewBox: t.camera.x + ' ' + t.camera.y + ' ' + t.width + ' ' + t.height
		});

		$(window).on('resize', function () {
			t.width = window.innerWidth;
			t.height = window.innerHeight - 35;
			t.paper.attr({
				width: t.width,
				height: t.height,
				viewBox: t.camera.x + ' ' + t.camera.y + ' ' + t.width + ' ' + t.height
			});
		});
		t.paper.mousemove(function (e) {
			var step = 10;
			if (e.pageX < 30) { t.camera.x -= step; }
			if (e.pageX > t.width - 30) { t.camera.x += step; }
			if (e.pageY < 60) { t.camera.y -= step; }
			if (e.pageY > t.height - 30) { t.camera.y += step; }
			t.paper.attr({
				viewBox: t.camera.x + ' ' + t.camera.y + ' ' + t.width + ' ' + t.height
			});
		});

		Snap.load('img/units.svg', function (f) {
			t.units = f;
		});
	}

	// ##############################################
	// # COORDINATE                                 #
	// ##############################################

	Renderer.prototype.coordinate = function (n) {
		var t = this;
		return n * t.tileSize + n * t.tileGap;
	};

	// ##############################################
	// # RENDER MAP                                 #
	// ##############################################

	Renderer.prototype.renderMap = function (map) {
		//console.log('renderMap', map);
		var t = this;
		map = map || window.MAP;

		var tiles = {
			'mountain': 'img/map/tiles/mountain.jpg',
			'forest': 'img/map/tiles/grass.jpg',
			'plain': 'img/map/tiles/plain.jpg',
			'desert': 'img/map/tiles/desert.jpg',
			'water': 'img/map/tiles/water.jpg'
		};

		for (var x = 0; x < map.width; ++x) {
			for (var y = 0; y < map.height; ++y) {
				var tileID = 'x' + x + 'y' + y;
				t.shapes[tileID] = t.paper.image(tiles[map.tiles[tileID].type], t.coordinate(x), t.coordinate(y), t.tileSize, t.tileSize);
				/*.attr({
					opacity: 0.5
				});*/
				/*
				t.paper.text(t.coordinate(x) + (t.tileSize / 2), t.coordinate(y) + (t.tileSize / 2), x + ', ' + y).attr({
					'fill': 'white',
					'font-size': 15,
					'font-family': 'inherit'
				});
				*/
			}
		}
	};

	// ##############################################
	// # RENDER UNIT                                #
	// ##############################################

	Renderer.prototype.renderUnit = function (unit) {
		//console.log('renderUnit', unit);
		var t = this,
			size = t.tileSize * 0.6,
			x = t.coordinate(unit.x) + ((t.tileSize - size) / 2),
			y = t.coordinate(unit.y) + ((t.tileSize - size) / 2),
			unitSVG = t.units.select('#' + unit.type).clone(),
			matrix = Snap.matrix();
		matrix.translate(x, y);
		matrix.scale(0.12, 0.12, 0, 0);
		unitSVG.attr({ fill: MAP.players[unit.player].color, transform: matrix });
		unitSVG.prepend(t.paper.rect(0, 0, 512, 512).attr({ fill: 'whitesmoke' }));

		unitSVG.data('info', unit.type);

		unitSVG.hover(function () {
			$('#popup').html('<p>' + this.data('info') + '</p>').show();
		}, function () {
			$('#popup').hide();
		});

		t.paper.append(unitSVG);
		t.shapes[unit.id] = unitSVG;
		return unitSVG;
	};

	// ##############################################
	// # RENDER MOVE                                #
	// ##############################################

	Renderer.prototype.renderMove = function (unit, coordX, coordY) {
		//console.log('renderMove', unit, coordX, coordY);
		var t = this,
			unitShape = t.shapes[unit.id],
			size = t.tileSize * 0.6,
			x = t.coordinate(coordX) + ((t.tileSize - size) / 2),
			y = t.coordinate(coordY) + ((t.tileSize - size) / 2),
			matrix = Snap.matrix();
		matrix.translate(x, y);
		matrix.scale(0.12, 0.12, 0, 0);
		unitShape.animate({ transform: matrix }, 500, mina.easeinout);
	};

	// ##############################################
	// # RENDER DESTINATION                         #
	// ##############################################

	Renderer.prototype.renderDestination = function (tile, callback) {
		//console.log('renderDestination', tile, callback);
		var t = this,
			raggio = t.tileSize / 4,
			x = t.coordinate(tile.x) + (t.tileSize / 2),
			y = t.coordinate(tile.y) + (t.tileSize / 2),
			circle = t.paper.circle(x, y, raggio).attr({
				'stroke': 'yellow',
				'stroke-width': 3,
				'fill': 'gold',
				'opacity': 0.7,
				'cursor': 'pointer'
			}),
			text = t.paper.text(x, y, '1').attr({
				'fill': 'white',
				'font-size': 20,
				'font-weight': 'bold',
				'font-family': 'inherit',
				'cursor': 'pointer',
				'text-anchor': 'middle',
				'dominant-baseline': 'middle'
			}),
			destination = t.paper.group(circle, text);
		destination.click(callback);
	};

	window.Renderer = Renderer;
})();
