(function () {
	'use strict';

	$('#home-version').text('v0.6.0');
	$('#home-credits').text('© 2013-2018 Daniele Veneroni');

	// locale

	window.STRINGS = {};
	window._ = function(id, placeholders) {
		var string = window.STRINGS && window.STRINGS[id] ? window.STRINGS[id] : id;
		if (placeholders) {
			string = string.replace(/\{\{[a-zA-Z0-9]+\}\}/g, function (x) {
				var prop = x.replace('{{', '').replace('}}', '');
				return placeholders[x] || x;
			});
		}
		return string;
	};

	// home - menu

	$('#home-menu-buttons').on('click', '[data-page]', function () {
		var page = $(this).data('page');
		$('#home').find('.page').hide();
		$('#' + page).show();
	});

	// home - new

	$('#home-new-back').on('click', function () {
		$('#home').find('.page').hide();
		$('#home-menu').show();
	});
	$('#home-new-start').on('click', function () {
		// TODO
		$('#home').hide();
	});

	// home - load

	$('#home-load-back').on('click', function () {
		$('#home').find('.page').hide();
		$('#home-menu').show();
	});
	$('#home-load-load').on('click', function () {
		// TODO
		$('#home').hide();
	});

	// home - help

	$('#home-help-back').on('click', function () {
		$('#home').find('.page').hide();
		$('#home-menu').show();
	});

	// home - settings

	$('#home-settings-back').on('click', function () {
		$('#home').find('.page').hide();
		$('#home-menu').show();
	});
	$('#home-settings-save').on('click', function () {
		// TODO
	});

})();
