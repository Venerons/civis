var DATABASE = {

	// CIVILIZATIONS

	civs: {
		romans: {
			name: {
				en: 'Romans',
				it: 'Romani'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Ave',
			leaders: ['Gaius Iulius Cæsar', 'Gaius Iulius Cæsar Octavianus Augustus'],
			cities: ['Roma', 'Pisa', 'Firenze', 'Venezia']
		},
		celts: {
			name: {
				en: 'Celts',
				it: 'Celti'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Duw a rhoddodd da i chi',
			leaders: ['Vercingetorix', 'Boudica'],
			cities: ['Lutetia', 'Alesia', 'Gergovia']
		},
		greeks: {
			name: {
				en: 'Greeks',
				it: 'Greci'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Alexander'],
			cities: ['Atene']
		},
		vikings: {
			name: {
				en: 'Vikings',
				it: 'Vichinghi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Harald', 'Guglielmo'],
			cities: []
		},
		chinese: {
			name: {
				en: 'Chinese',
				it: 'Cinesi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Mao'],
			cities: ['北京 (Beijing)', '上海有 (Shanghai)', '西安 (Xi\'an)']
		},
		egyptians: {
			name: {
				en: 'Egyptians',
				it: 'Egizi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Ramses', 'Tutankamen', 'Cleopatra'],
			cities: []
		},
		germans: {
			name: {
				en: 'Germans',
				it: 'Germanici'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Bismark', 'Barbarossa', 'Hitler'],
			cities: ['Berlin']
		},
		russians: {
			name: {
				en: 'Russians',
				it: 'Russi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Pietro', 'Katerina', 'Stalin', 'Lenin'],
			cities: ['Москва (Moskva)']
		},
		francs: {
			name: {
				en: 'Francs',
				it: 'Franchi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Napoleone', 'Giovanna d\'Arco'],
			cities: []
		},
		english: {
			name: {
				en: 'English',
				it: 'Inglesi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Elisabetta I', 'Vittoria'],
			cities: []
		},
		japanese: {
			name: {
				en: 'Japanese',
				it: 'Giapponesi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Tokugawa', 'Nobunaga'],
			cities: []
		},
		mongols: {
			name: {
				en: 'Mongols',
				it: 'Mongoli'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Gengis Khan', 'Kubilai Khan'],
			cities: []
		},
		khmer: {
			name: {
				en: 'Khmer',
				it: 'Khmer'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: [],
			cities: []
		},
		native_americans: {
			name: {
				en: 'Native Americans',
				it: 'Nativi Americani'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Hiawatwa'],
			cities: []
		},
		arabs: {
			name: {
				en: 'Arabs',
				it: 'Arabi'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			greeting: 'Hello',
			leaders: ['Saladino'],
			cities: []
		}
	},

	// BUILDINGS

	buildings: {
		granary: {
			name: {
				en: 'Granary',
				it: 'Granaio'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			cost: 10,
			require: null
		}
	},
	
	// TECHNOLOGIES

	techs: {
		writing: {
			name: {
				en: 'Writing',
				it: 'Scrittura'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			cost: 10,
			require: null
		}
	},

	// UNITS

	units: {
		warrior: {
			name: {
				en: 'Warrior',
				it: 'Guerriero'
			},
			description: {
				en: 'Description',
				it: 'Descrizione'
			},
			strength: 1,
			toughness: 1,
			movement: 1,
			cost: 2,
			require: null,
			obsolete: null
		}
	}
};
