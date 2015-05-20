// Copyright (c) 2013-2015 Daniele Veneroni.
// Released under GPLv3 License. See LICENSE.md for further information.

'use strict';

// ##############################################
// # UNITS                                      #
// ##############################################
/*

Unit-name-archer "Arciere"
Unit-desc-archer "questa descrizione comparirà nel campo title dove serve ecc."

*/

window.UNITSDB = {
	'warrior' : {
		type: 'land', // land, sea, air
		strength: 1,
		toughness: 1,
		movement: 1,
		cost: 2,
		require: null,
		obsolete: null
	}
};

// ##############################################
// # BUILDINGS                                  #
// ##############################################
/*

Building-name-granary "Granaio"
Building-desc-granary "questa descrizione comparirà nel campo title dove serve ecc."

*/

window.BUILDINGSDB = {
	'granary': {
		cost: 10, // production cost
		requireTech: 'XXXXX', // tech required
		requireBuild: 'XXXX', // building required
		maintenance: 1 //maintenance cost. (to be removed, and fix a constant maintenance cost of 1?)
	}
};

// ##############################################
// # CIVILIZATIONS                              #
// ##############################################
/*

Civ-name-rome "Romani"
Civ-desc-rome "questa descrizione comparirà nel campo title dove serve ecc."

*/

window.CIVSDB = {

	// ANCIENTS CIVILIATIONS

	'rome': {
		greeting: 'Ave',
		leaders: ['Gaius Iulius Cæsar', 'Gaius Iulius Cæsar Octavianus Augustus'], // i nomi dei leaders dovrebbero essere nella loro lingua originale, non tradotti
		cities: ['Roma', 'Pisa', 'Firenze', 'Venezia'] // lista ordinata di nomi di città per suggerimenti e scelta nomi per le AI
	},
	'celts': {
		greeting: 'Duw a rhoddodd da i chi',
		leaders: ['Vercingetorix', 'Boudica'],
		cities: ['Lutetia', 'Alesia', 'Gergovia']
	},
	'greece': {
		greeting: 'Hello',
		leaders: ['Alexander'],
		cities: ['Atene']
	},
	'nordmans': {
		greeting: 'Hello',
		leaders: ['Harald', 'Guglielmo'],
		cities: []
	},

	/*
	Egizi				| 			| 			| Ramses, Tutankamen, Cleopatra
	Babilonesi			| 			| 			| 
	Persiani			| Immortale |			| Dario I
	Maya				|			|			| Pacal
	Aztechi				|			|			| Montezuma I
	Incas				|			|			|
	Indù				|			|			| Ashoka, Ghandi
	Khmer				|			|			|
	Cinesi				|			|			| Mao
	Mongoli				|			|			| Gengis Khan, Kubilai Khan
	Giapponesi			|			|			| Tokugawa, Nobunaga [Yamamoto]
	Arabi				| 			| 			| Saladino
	Nativi americani	| 			| 			| Hiawatwa
	*/

	// MODERN CIVILIZATIONS

	'america': {
		greeting: 'Hello',
		leaders: ['George Washington'],
		cities: ['Washington']
	},
	'russia': {
		greeting: 'Hello',
		leaders: ['Katerina'],
		cities: ['Mosca']
	},
	'germany': {
		greeting: 'Hello',
		leaders: ['Bismark'],
		cities: ['Berlino']
	}
};
