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
				return placeholders[prop] || x;
			});
		}
		return string;
	};

	// home

	$('#home').on('click', '[data-page]', function () {
		var page = $(this).data('page');
		$('#home').find('.page').hide();
		$('#' + page).show();
	});

	// home - new

	$('#home-new-start').on('click', function () {
		// TODO
		$('#home').hide();
	});

	// home - load

	$('#home-load-load').on('click', function () {
		// TODO
		$('#home').hide();
	});

	// home - settings

	$('#home-settings-save').on('click', function () {
		// TODO
	});

	// main - menu
	$('#main-header-menu').on('click', function () {
		var dialog = document.querySelector('#main-menu');
		dialogPolyfill.registerDialog(dialog);
		dialog.showModal();
	});

	$('#main-menu').on('click', 'button', function () {
		var dialog = document.querySelector('#main-menu');
		dialog.close();
	});

})();
