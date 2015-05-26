// Copyright (c) 2013-2015 Daniele Veneroni.
// Released under GPLv3 License. See LICENSE.md for further information.

'use strict';

// ##############################################
// # INITIALIZE                                 #
// ##############################################

window.RENDER = new Renderer();
window.LANGUAGE = 'en-GB'; // navigator.language || navigator.userLanguage || navigator.browserLanguage || 'en-GB'
window.STRINGS = {};

function _(stringID, options) {
	var string = STRINGS[stringID];
	if (options) {
		string = string.replace(/\{\{[a-zA-Z0-9]+\}\}/g, function (x) {
			return options[x.replace('{{', '').replace('}}', '')];
		});
	}
	return string;
}

function loadLanguage(languageTag) {
	console.log('loadLanguage', languageTag);
	return $.getJSON('locales/' + languageTag + '.json')
		.fail(function () {
			alert('Oops! Error while loading language!');
		})
		.done(function (data) {
			window.LANGUAGE = languageTag;
			window.STRINGS = data;
			localforage.setItem('language', languageTag);
			$('html').attr('lang', languageTag);
		});
}

localforage.getItem('language', function (error, value) {
	loadLanguage(value || LANGUAGE).done(function () {
		// ##############################################
		// # MAIN SCREEN HOME                           #
		// ##############################################

		$('#home-new').attr({ title: _('newGame') }).on('click', function () {
			// TESTING
			test();
			$('#main-screen').css('top', '-100%');
		}).find('p').text(_('newGame'));

		$('#home-load').attr({ title: _('loadGame') }).on('click', function () {
			$('.main-screen-page').hide();
			$('#main-screen-content-load').show();
		}).find('p').text(_('loadGame'));

		$('#home-manual').attr({ title: _('manual') }).on('click', function () {
			$('.main-screen-page').hide();
			$('#main-screen-content-manual').show();
		}).find('p').text(_('manual'));

		$('#home-settings').attr({ title: _('settings') }).on('click', function () {
			$('.main-screen-page').hide();
			$('#main-screen-content-settings').show();
		}).find('p').text(_('settings'));

		// ##############################################
		// # MAIN SCREEN SETTINGS                       #
		// ##############################################

		$('#settings-language').html('<i class="icon-language"></i> ' + _('language'));
		$('#settings-language-select').val(LANGUAGE);
		$('#settings-save').text(_('save')).on('click', function () {
			loadLanguage($('#settings-language-select').val()).done(function () {
				alert(_('configurationSaved') + '\n\n' + _('mayReloadGame'));
			});
		});
		$('#load-back, #manual-back, #settings-back').text(_('back')).on('click', function () {
			$('.main-screen-page').hide();
			$('#main-screen-content-home').show();
		});

		// ##############################################
		// # HEADER                                     #
		// ##############################################

		$('#header-menu-button').on('click', function () {
			$('#menu').css('top', '50%');
		});
		$('#header-science, #header-science-image').attr({ title: _('science') });
		$('#header-gold, #header-gold-image').attr({ title: _('gold') });
		$('#header-culture, #header-culture-image').attr({ title: _('culture') });
		$('#header-turn-text').text(_('turn'));

		// MENU
		/*
		$$('#menu-return').localize('returnToMap').on('click', function () {
			$$('#menu').slideOut();
		});
		$$('#menu-manual').localize('manual');
		$$('#menu-save').localize('save').on('click', function () {
			GAME.saveGame('auto');
			$$('#menu').slideOut();
		});
		$$('#menu-load').localize('load').on('click', function () {
			GAME.loadGame('auto');
			$$('#menu').slideOut();
		});
		$$('#menu-exit').localize('exit').on('click', function () {
			if (confirm(_('exitConfirm'))) {
				$$('#main-screen').slideIn('0');
				$$('#menu').slideOut();
			}
		});
		*/

		// SIDEBAR
		$('#sidebar-overview').attr({ title: _('overview') });
		$('#sidebar-focusnext').attr({ title: _('focusNext') });
		$('#sidebar-nextturn').attr({ title: _('endTurn') });
	});
});

// ##############################################
// # TEST                                       #
// ##############################################

function test() {
	window.MAP = GAME.generateMap();
	RENDER.renderMap();

	RENDER.renderUnit({
		id: 'p0u1',
		player: 'player0',
		x: 0,
		y: 0,
		type: 'warrior'
	});
	RENDER.renderUnit({
		id: 'p1u1',
		player: 'player1',
		x: 1,
		y: 0,
		type: 'spearman'
	});
	RENDER.renderUnit({
		id: 'p2u1',
		player: 'player2',
		x: 2,
		y: 0,
		type: 'archer'
	});
	RENDER.renderUnit({
		id: 'p3u1',
		player: 'player3',
		x: 3,
		y: 0,
		type: 'axeman'
	});

	var unit1 = {
		id: 'p0u2',
		player: 'player0',
		x: 2,
		y: 3,
		type: 'warrior'
	};

	RENDER.renderUnit(unit1);
	GAME.selectDestinations(unit1);
}
