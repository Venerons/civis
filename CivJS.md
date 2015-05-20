CivJS - rebuilt

le cose scritte tra parentesi quadre [] sono cose che occorre vedere se implementare o no, in generale sono cose non essenziali

#########################################################################################
Appunti tecnici

progettare da subito:
- preloading
- set grafici intercambiabili
- Dimensioni relative (vedi livelli di zoom)
- menù e popup pensati per adattarsi bene al touch e schermi piccoli

inserire attributo 'description' nel database unità, ricerca, società ecc. dove serve che verrà poi utilizzato per metterno nell'attributo title degli elementi HTML relativi dove serve in modo tale da avere una descrizione 'da manuale' con il mouseover. (nota: multilingua!)

------------------------------------------------------------------------

# Turno

Da fare in più nel Fine turno del giocatore:

1. autosave
2. chiudi popup vari
3. resetta notifiche

Da fare in più nell'Inizio Turno del giocatore:

1. avanzamento turno e anno

Fine turno:

1. cura unità del giocatore di turno se fortificate

Inizio Turno:

0. cambiare il giocatore di turno (turnPlayer)
1. riattiva le unità del giocatore di turno
2. produzione oro
3. pagamento mantenimento unità e città
4. produzione scienza
5. produzione cultura
6. produzione edifici
7. crescita città
8. aggiornamento mappa

------------------------------------------------------------------------

endTurn(player)
startTurn(player)
playAITurn(player)

cityOverview(city)
showOverview(player) // gestisce tutte le overview (tranne la città che è a sè stante)
focusNext(player) // trova la prossima azione disponibile (ed eventualmente centra la visuale della mappa se il player è il giocatore)
info(message) // sostituto per alert()
ask(message) // sostituto per prompt()
dialog(message, buttons) // i.e. dialog('cosa vuoi fare?', { 'Farmi una Pizza': func1, 'Mi bevo una Birra': function () { ... } })

battle(unit1, unit2)
unitOrder(order, options) // i.e. unitOrder('move', { x: 1, y: 2 })

getCityProduction(city, type) // i.e. getCityProduction(city, 'gold')

renderCity(city)
renderTile(tile)

------------------------------------------------------------------------

for (var i = 0; i < array.length; i++) {
	(function (i) {
		array[i] = function () {
			qualcosa dove utilizzi anche 'i' magari
		}
	})(i);
}

------------------------------------------------------------------------

Interfaccia HUD

Tasto per 'focus next' e 'end turn' (end turn dovrebbe notificare per una conferma se ci sono ancora azioni disponibili)
Tasto 'Overview' che permette l' accesso alle schermate di statistiche, scienza, società, diplomazia ecc.

#########################################################################################
# Mappa

a quadrati, piano cartesiano

- (nebbia), acqua, deserto, pianura, collina, montagna, neve, [prateria], [tundra]

Tile      | Food  | Production | Gold  | Movement | Modifiers  
--------- | :---: | :--------: | :---: | :------: | :---:  
Grassland | 2     | -          | -     | -        | -  
Plain     | 1     | 1          | -     | -        | -  
Hill      | -     | 2          | -     | +1       | +50% Atk/Def  
Mountain  | -     | 1          | 1     | +2       | +100% Atk/Def  
Desert    | -     | -          | -     | -        | -  
Tundra    | 1     | -          | -     | -        | -  
Snow      | -     | -          | -     | -        | -50% Atk/Def  
Water     | 1     | -          | 1     | -        | -  

Some tiles also can host a nature element, that modify the values of the tile

Nature         | Food  | Production | Gold  | Modifiers      | Base Tile  
-------------- | :---: | :--------: | :---: | :------------: | :---:  
Fallout        | -3    | -3         | -3    | -50% Atk/Def   | Any  
Forest         | -1    | +1         | -     | +50% Atk/Def   | Grassland  
Jungle         | +1    | -1         | -     | +50% Atk/Def   | Plain  
Marsh          | -1    | -          | -     | -50% Atk/Def   | Grassland  
Oasis          | +3    | -          | +1    | -              | Desert  
River          | -     | -          | +1    | -              | Any  
Atoll          | -     | +1         | -1    | -              | Water  
Natural Wonder | -     | +2         | +3    | -              | Any  


#########################################################################################
# Vittoria

- tecnologica: completa tutti i percorsi di ricerca e scopri per primo la tecnologia futura
- dominazione: controlla tutte le città in gioco
- militare:
- [economica]: possiedi [?] oro
- [culturale]: possiedi [?] punti cultura
- [diplomatica]: 

#########################################################################################
# Civiltà

ogni civiltà dovrebbe avere almeno un tratto particolare, che sia semplice da implementare e sia equilibrato.
possibilimente dovrebbe avere anche almeno un'unità unica e un edificio unico.

http://it.wikipedia.org/wiki/Civilt%C3%A0#Elenco_di_civilt.C3.A0_.28secondo_Toynbee_e_Huntington.29

DATABASE

'Romans': {
	strings: {
		name: {
			it: 'Romani',
			en: 'Romans'
		},
		desc: {
			it: 'questa descrizione comparirà nel campo title dove serve ecc.',
			en: 'this description will appear on field title where it\'s needed etc.'
		}
	},
	greeting: 'Ave',
	leaders: ['Gaius Iulius Cæsar', 'Gaius Iulius Cæsar Octavianus Augustus'], // i nomi dei leaders dovrebbero essere nella loro lingua originale, non tradotti
	cities: ['Roma', 'Pisa', 'Firenze', 'Venezia'] // lista ordinata di nomi di città per suggerimenti e scelta nomi per le AI
}

Civiltà				| Unità 	| Edificio 	| Leader
-
Romani				| Legione	| 			| Gaius Iulius Cæsar, Gaius Iulius Cæsar Octavianus Augustus
Greci				| Oplita	| 			| Alessandro
Normanni			| Berserker	| 			| Harald, Guglielmo
Celti				| 			| 			| Vercingetorix, Boudica
Egizi				| 			| 			| Ramses, Tutankamen, Cleopatra
Babilonesi			| 			| 			| 
Persiani			| Immortale |			| Dario I
Arabi				| 			| 			| Saladino
Nativi americani	| 			| 			| Hiawatwa
Maya				|			|			| Pacal
Aztechi				|			|			| Montezuma I
Incas				|			|			|
Indù				|			|			| Ashoka, Ghandi
Khmer				|			|			|
Cinesi				|			|			| Mao
Mongoli				|			|			| Gengis Khan, Kubilai Khan
Giapponesi			|			|			| Tokugawa, Nobunaga [Yamamoto]


Russia (Pietro, Caterina, Stalin, Lenin)
Spagna (Isabella)
Francia (Napoleone, Giovanna d'Arco)
Germania (Bismark, Barbarossa, Hitler)
Inghilterra (Elisabetta I, Vittoria)
Zimbabwe
Zulu
[Sumeri]
[Ittiti (Turchi)]
[Fenici]

#########################################################################################
# Città

le città vanno fondate dai coloni.
dovrebbero rendere le risorse (produzione, oro, cibo, cultura, ecc.) in maniera semplice, legato al territorio attorno.
inoltre la rendita dovrebbe essere legata in qualche modo alla popolazione, per permettere una rendita progressiva.
gli edifici e le ricerche dovrebbero consentire di aumentare la rendita.

cibo (base = ) (crescita)
produzione (base = )
oro (base = )
scienza (base = popolazione)
cultura (base = popolazione / 2)

var city = {
	id: 'x1y1-Argolunia',
	name: 'Argolunia',
	player: 0,
	x: 1,
	y: 1,
	population: 2,
	growth: 0,
	buildings: [],
	build: {
		name: 'nothing',
		cost: 0
	}
};

## Costruzione -------------------------------------------------------------------------------



### Edifici -------------------------------------------------------------------------------

DATABASE

'Granary': {
	strings: {
		name: {
			it: 'Granaio',
			en: 'Granary'
		},
		desc: {
			it: 'questa descrizione comparirà nel campo title dove serve ecc.',
			en: 'this description will appear on field title where it\'s needed etc.'
		}
	},
	cost: 10, // production cost
	requireTech: 'XXXXX', // tech required
	requireBuild: 'XXXX', // building required
	maintenance: 1 //maintenance cost. (to be removed, and fix a constant maintenance cost of 1?)
}

in generale gli edifici dovrebbero dare bonus semplici, a parte qualche edificio particolare che magari dà comportamenti particolari gli edifici dovrebbero dare bonus tipo +oro, +produzione, +cibo, +ricerca e simili.

Building         | Cost  | Tech Required  | Building Required | Effect  
---------------- | :---: | :------------: | :---------------: | :---  
Barracks         | 75    | Bronze Working | -                 | Units produced are automatically Veterans (+5 exp)  
Granary          | 60    | Agriculture    | -                 | +3 Food  
Library          | 75    | Writing        | -                 | +1 Science each 2 population  
Monument         | 40    | Mysticism      | -                 | +2 Culture  
Temple           | 75    | Theology       | Monument          | +1 Culture each 2 population  
University       | 160   | Education      | Library           | +1 Science each 2 population (combinable with the Library)  
Aqueduct         | 100   | Engineering    | -                 | +50% Food  
Market           | 100   | Currency       | -                 | +25% Gold, +2 base Gold  
Bank             | 200   | Banking        | Market            | +25% Gold, +2 base Gold  

Harbor - +1 food in sea tiles
Workshop - Provides +2 production from hills
Iron Mine - Mountain tiles give +4 production 
Walls - Gives +100% defensive bonus
Cathedral - Replaces temple and gives +2 culture for each citizen 
Courthouse - Increases the city's workable tile region (or reduce >:( )
Factory - Doubles the city's production 

Food Buildings
-
Hospital
Medical Lab


Production Buildings
-
Stable (must have access to hourse resource, +2 production)
Forge
Nuclear Plant
Recycling center
Solar plant


Gold Buildings
-
Lighthouse (must be near water, +1 commerce in sea tiles)
Stock exchange


Culture Buildings
-
Academy
Amphitheater (+3 culture, require monument)
Opera House
Theater
Museum
Broadcast Tower


Science Buildings
-
Observatory
Public School
Research Lab


Other Buildings
-
Circus (+2 :) )
Colosseum (+ 3 :) )
Stadium
Castle
Armory
Arsenal
Military Academy
Police Station
Military Base
Garden
Water Mill (must be near a river, +2 food and +1 production)
Windmill

### Unità -------------------------------------------------------------------------------

DATABASE:

'archer' : {
	strings: {
		name: {
			it: 'arciere',
			en: 'archer'
		},
		desc: {
			it: 'questa descrizione comparirà nel campo title dove serve ecc.',
			en: 'this description will appear on field title where it\'s needed etc.'
		}
	},
	atk: 1,
	def: 2,
	mov: 1,
	cost: 40,
	movtype: 'earth' // 'earth' || 'sea' || 'air' (that means both)
	initialLife: 1,
	require: '', // tech required
	obsolete: '' // tech in which it become obsolete
}

UNITA'

var unit = {
	id: 'p0u1',
	player: 'player0',
	x: 1,
	y: 1,
	type: 'archer',
	exp: 0,
	life: 1,
	maxlife: 1,
	fortified: false,
	active: 2
};

Stats:

Life: punti vita rimanenti. Se un unità possiede meno di 1 punto vita, muore.
Exp: punti esperienza. Li guadagna combattento. A 5 exp diventa veterano e guadagna +50% Atk/Def. A 10 exp diventa elite e guadagna +100% Atk/Def
Atk: punti attacco, usati per infliggere danno
Def: punti difesa, usati per prevenire il danno
Mov: punti movimento, usati per muoversi nella mappa

Azioni:

Move: muovi l'unità. Consuma Mov in relazione ai tile attraversati
Fortify: fortifica, guadagnando +25% Atk/Def finchè è fortificata. Muoverla la de-fortifica. Alla fine del turno se è fortificata si cura di un po' in base alla sua esperienza.
Kill: sacrifica l'unità per guadagnare oro
No Orders: nessun ordine

Azioni speciali (disponibili solo per particolari unità):

Settle: fonda una città. l'unità scompare.
Build Street: costruisci una strada nel tile. la strada riduce i Mov necessari ad entrare nel tile.
Build Railroad: costruisci una ferrovia nel tile. la ferrovia riduce i Mov necessari ad entrare nel tile (più della strada)
Build Improvement: costruisci un miglioramento. un miglioramento modifica la produzione di risorse del tile.


### Unit List -------------------------------------------------------------------------------

Unit               | Cost  | Atk   | Def   | Mov   | Initial Life | Requirements     | Obsolete  
------------------ | :---: | :---: | :---: | :---: | :----------: | ---------------- | ---  
_NON COMBAT UNITS_ |       |       |       |       |              |                  |  
Settler            | 50    | 0     | 0     | 2     | 1            | -                | -  
Worker             | 45    | 0     | 0     | 2     | 1            | -                | -  
_ANCIENT ERA_      |       |       |       |       |              |                  |  
Scout              | 25    | 0     | 1     | 2     | 1            | -                | Scientific Theory  
Warrior            | 40    | 1     | 1     | 1     | 1            | -                | Iron Working  
Spearman           | 56    | 2     | 1     | 1     | 1            | Bronze Working   | Iron Working 
Archer             | 40    | 1     | 2     | 1     | 1            | Archery          | Gunpowder  
Trireme            | 45    | 1     | 1     | 1     | 1            | Sailing          | Optics  
_CLASSICAL ERA_    |       |       |       |       |              |                  |  
Catapult           | 75    | 4     | 1     | 1     | 1            | Engineering      | Gunpowder  
Swordsman          | 75    | 2     | 2     | 1     | 1            | Iron Working     | Metal Casting  
Horseman           | 75    | 2     | 1     | 2     | 1            | Horse Riding     | Code of Chivalry  
Galley             | 75    | 2     | 2     | 2     | 1            | Optics           | Astronomy  
_MEDIEVAL ERA_     |       |       |       |       |              |                  |  
Knight             | 120   | 4     | 2     | 2     | 1            | Code of Chivalry | Metal Casting  
Galleon            | 120   | 3     | 3     | 3     | 1            | Astronomy        | Steam Energy  
_RENAISSANCE ERA_  |       |       |       |       |              |                  |  
Lancer             | 125   | 4     | 3     | 2     | 1            | Metal Casting    | Rifling  
_INDUSTRIAL ERA_   |       |       |       |       |              |                  |  
-                  | -     | -     | -     | -     | -            | -                | -  
_MODERN ERA_       |       |       |       |       |              |                  |  
-                  | -     | -     | -     | -     | -            | -                | -  
_ATOMIC ERA_       |       |       |       |       |              |                  |  
-                  | -     | -     | -     | -     | -            | -                | -  
_INFORMATION ERA_  |       |       |       |       |              |                  |  
-                  | -     | -     | -     | -     | -            | -                | -  
_FUTURE ERA_       |       |       |       |       |              |                  |  
-                  | -     | -     | -     | -     | -            | -                | -  

Infantry           | 375   | ?     | ?     | ?     | 1            | Independent Pieces |  
Tank               | 375   | ?     | ?     | ?     | 1            | Combustion         |  
Marine             | 400   | ?     | ?     | ?     | 1            | Plastic            |  
Submarine          | 325   | ?     | ?     | ?     | 1            | Plastic            |  

MEDIEVAL ERA
Crossbowman
Trebuchet
Longswordman
Pikeman

RENAISSANCE ERA
Cannon
Musketman
Frigate

INDUSTRIAL ERA
Artillery
Rifleman
Cavalry
Ironclad

MODERN ERA
Infantry
Battleship
Submarine
Landship
Triplane

ATOMIC ERA
Rocket Artillery
Marine
Tank
Bomber
Fighter
Helicopter
Atomic Bomb

INFORMATION ERA
Mechanized infantry
Cruiser
Modern armor
Stealth bomber
Jet fighter
Nuclear missile
Guided missile

FUTURE ERA
Mech (siege unit)
Drone (airplane unit)
Robot Soldier
Cyborg Trooper


#########################################################################################
# Combattimento

un combattimento viene risolto in questo modo:

1. ogni unità infligge danno all'altra unità (danno = Atk attaccante - Def difensore)
2. il danno riduce i punti vita delle unità, e se non hanno più punti vita muoiono. Possono morire entrambe, nessuna o solo una delle unità.
3. le unità sopravvissute (se ce ne sono) guadagnano 1 Exp. Se è promossa a Veterano o Elite il massimo dei punti vita viene raddoppiato e l'unità viene curata del tutto.
4. se l'attaccante uccide il difensore, ne prende la posizione. se l'attaccante è ucciso dal difensore, il difensore non può muoversi. Se entrambe sopravvivono, rimangono ai loro posti.

#########################################################################################
# Ricerca

4-5 percorsi paralleli che si distinguono per focalizzazione, es:

* Tecnologia Militare: (incentrata sull'ottenere nuove unità e potenziamenti)
* Crescita & Sviluppo: (incentrata sulla crescita della popolazione e l'economia)
* Cultura: (incentrata sulla generazione della cultura)
* Architettura: (incentrata sull'ottenere nuovi edifici)
* Scienze Sociali: (incentrata sull'ottenere nuove forme di governo e bonus di gestione)

#########################################################################################
# Società
