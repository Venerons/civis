
## Victory

* Culturale -> raggiungi la fine del culture track
* Tecnologica -> ricerca "Volo Spaziale" (tecnologia livello 5)
* Economica -> colleziona 15 monete
* Militare -> conquista una capitale nemica

## Civilizations

ogni civiltà dovrebbe avere almeno un tratto particolare, che sia semplice da implementare e sia equilibrato.
possibilimente dovrebbe avere anche almeno un'unità unica e un edificio unico.

http://it.wikipedia.org/wiki/Civilt%C3%A0#Elenco_di_civilt.C3.A0_.28secondo_Toynbee_e_Huntington.29

## Map

blocchi da 4x4

2 giocatori -> 8 blocchi -> 16x8
3 giocatori -> 10 blocchi -> 16x10
4 giocatori -> 16 blocchi -> 16x16

Tile      | Production (P) | Trade (T)
--- | :---: | :---: | :---: | :---:
Mountain | 1 | -
Forest | 2 | -
Plain | - | -
Desert | - | 1
Water | - | 1

Se meraviglia naturale +1C

Villaggi e accampamenti barbari

## Turn

1. Init
	1. Autosave
	2. Close Popups
	3. Reset Notifications
	4. Increase turn counter
	5. Activate all units

2. Upkeep
	1. Gather Trade, Production, Culture and Gold
	2. Pay upkeep for cities and units

3. Trade

4. Cities Management
	1. For every city, choose between (a) Produce a unit or (b) Produce a building

5. Units Management
	1. For every unit, move a number of spaces on the board equal to the civilization available (min: 2. techs may increase this)

6. Research
	1. Players may spend trade points to research new technologies

## Cities

* Max 3 città per giocatore
* Per fondare una città serve uno scout sulla casella (viene sacrificato)

La casella:
	- non deve essere acqua
	- deve are 8 tile rivelati (no al limite della mappa)
	- non deve essere vicino ad un villaggio o un accampamento
	- non deve essere vicino ad una unità nemica
	- deve essere distante almeno 3 tile da ogni altra città, comprese le diagonali

* il centro non genera nulla
* le caselle immediatamente adiacenti (outskirts) generano a meno che non ci sia sulla casella un unità nemica

## Production

si può convertire 3T in 1P

Scout -> 6P (non possono entrare in villaggi e accampamenti e vengono uccisi se attaccati)
Rank 1 Unit -> 5P strength 1-3
Rank 2 Unit -> 7P strength 2-4
Rank 3 Unit -> 9P strength 3-5
Rank 4 Unit -> 11P strength 4-6
Aircraft Unit -> 12P strength 5-7 (does not trumps or get trumped)

## Buildings

porto 		water
shipyard 	water		grants combat bonuses
stazione commerciale	Deserto
bottega > miniera	montagna
biblioteca > università 	pianura
granaio (5) > acquedotto (8)	pianura
mercato > banca		* (no acqua)
tempio > cattedrale		* (no acqua)
caserma > accademia		* (no acqua)
mura	centro		+4 in difesa

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
Stable (must have access to horse resource, +2 production)
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

## Units

Each unit has the following statistics:

* **Strength.** Attack power of the unit, used to deal damage in a fight.
* **Toughness.** Defence power of the unit, used to prevent damage in a fight.
* **Movement.** Number of tiles the unit can move during the Units Management phase.
* **Experience.** Number of battles that the unit has survived.

A unit during the Units Management phase can do the following actions:

* **Move.** A unit can move on the map a number of tiles up to its Movement statistic. A unit can start a battle if its movement ends on an enemy unit or city.
* **Sacrifice.** The unit is removed, and the owner gets a small amount of Trade.
* **Rest.** The unit will stand and do no special action.

Unit | Strength | Toughness | Movement | Keywords | Requirements
--- | --- | --- | --- | ---
Warrior | 1 | 1 | 1 | Melee, Infantry, Sword
Swordsman | 2 | 1 | 1 | Melee, Infantry, Sword
Archer | 1 | 1 | 1 | Ranged, Infantry, Bow
Longbowman | 2 | 1 | 1 | Ranged, Infantry, Bow
Hourseman | 1 | 1 | 2 | Melee, Monted, Spear
Knight | 2 | 1 | 2 | Melee, Monted, Spear
Catapult | 1 | 1 | 1 | Ranged, Artillery
Trebuchet | 2 | 1 | 1 | Ranged, Artillery

## Battle

+2 per ogni caserma
+4 per ogni accademia
+4 per ogni grande generale
+6 se difendendo una città non capitale (+10 se con mura)
+12 se difendendo la capitale (+16 se con mura)

tutte le ferite spariscono alla fine della battaglia (o no?)
ogni unità arreca danno alla altra unità uguale alla propria forza
se l'unità subisce un danno pari o maggiore della propria forza, viene uccisa

Trump

Infantry > Mounted
Mounted > Artillery
Artillery > Infantry

se un unità trumps, attacca per prima. se uccide l'unità avversaria, non subisce danno. il trump va considerato sia in attacco che in difesa.

## Research

ricercare consuma tutto il commercio accumulato dal giocatore, a prescindere dal costo.

Livello 1	6T
Livello 2	11T
Livello 3	16T
Livello 4	21T
Livello 5	26T

4-5 percorsi paralleli che si distinguono per focalizzazione, es:

* Tecnologia Militare: (incentrata sull'ottenere nuove unità e potenziamenti)
* Crescita & Sviluppo: (incentrata sulla crescita della popolazione e l'economia)
* Cultura: (incentrata sulla generazione della cultura)
* Architettura: (incentrata sull'ottenere nuovi edifici)
* Scienze Sociali: (incentrata sull'ottenere nuove forme di governo e bonus di gestione)
