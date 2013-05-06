_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

Welcome to CivJS, the JavaScript Civilization Game!

## Index
* [Winning](#winning)
* [The Map](#the-map)
* [Units](#units)
	* [Fighting](#fighting)
	* [Settling](#settling)
	* [Unit List](#unit-list)
* [Cities](#cities)
	* [Buildings](#buildings)
* [Science](#science)
	* [Technologies](#technologies)
* [Society](#society)

## Winning
A victory can be achieved in four different ways.

* Domination: capture all cities of the game.
* Culture: Obtain 10,000 culture point.
* Economic: Acquire 10,000 Gold.
* Technological: Be the first to discover Tecnologia Futura. 

As a civilization nears one of the above mentioned victory conditions, all other civilizations will usually declare war on it in an attempt to delay or stop it from winning.

## The Map
The map is the playground of the game. Each tile can be of one of these types:

Tile | Food | Production | Gold | Modifiers
--- | :---: | :---: | :---: | :---:
Grass | 2 | - | - | -
Hill | 1 | 1 | - | +50% Atk/Def
Mountain | - | 2 | 1 | +100% Atk/Def
Water | 1 | - | 1 | -
Desert | - | - | - | -
Snow | - | - | - | -50% Atk/Def

Some tiles also can host a nature element, that modify the values of the tile

Nature | Food | Production | Gold | Modifiers
--- | :---: | :---: | :---: | :---:
Forest | - | +1 | - | +50% Atk/Def
Jungle | +1 | -1 | - | +50% Atk/Def
Marsh | -1 | - | - | -50% Atk/Def
Oasis | +3 | - | +2 | -
River | - | - | +1 | -
Natural Wonder | - | +2 | +3 | -

## Units
Each unit have 5 stats:

* **Life:** Remaining life points of the unit. If the unit have less than 1 life point, it dies.
* **Exp:** Experience points of the unit. A unit can gain Exp by surviving in a fight. When a unit reach 5 Exp, it becomes Veteran, and gain +50% Atk/Def. When a unit reach 10 Exp, it becomes Elite, and gain +100% Atk/Def.
* **Atk:** Attack power of the unit, used to deal damage in a fight.
* **Def:** Defence power of the unit, used to prevent damage in a fight.
* **Mov:** Maximum movement that the unit can do in a turn. The movement still have to be a unique movement.

A unit can do various actions, depending to the unit type. Actions can be:

* **Move:** Move the unit to another tile. A unit can move only one time in a turn.
* **Fortify:** Fortify the unit, that gain a +25% Atk/Def until it's fortified. Moving the unit de-fortify the unit.
* **Kill:** Kill the unit to gain a small amount of gold. The unit will be removed.
* **No Orders:** Issue no orders to the unit, that will be left as it is.
* **Settle:** Settle a city in the tile where the unit is. Only available for settlers.

### Fighting
A fight is resolved this way:

1. Each unit deal damage to the other unit, and the damage dealt is egual to the Atk of the unit minus the Def of the other unit (Damage dealt = Atk - Def).
2. The damage dealt decrease the life points of the units, and if a unit have no remaining life points, it dies. In a fight could die one, both or none of the units.
3. The surviving units (if any) gain an Exp. If a unit is promoted this way to the Elite or Veteran rank, the max life of the unit will be doubled and all the life points will be restored.
4. If the attacker kill the defender, it take its position. By the way, if the attacker get killed by the defender, the defender cannot gain the position, and stand on its tile.

### Settling
settling instructions

### Unit List
Unit | Atk | Def | Mov | Initial Life | Requirements
--- | :---: | :---: | :---: | :---: | ---
Settler | 0 | 0 | 2 | 1 | -
Warrior | 1 | 1 | 1 | 1 | -
Archer | 1 | 2 | 1 | 1 | Tiro con l'Arco
Galley | 1 | 1 | 2 | 1 | Navigazione

## Cities
cities about
each turn will be consumed 2 food per citizen. Eventual remaining will be used to increase population. If negative, population may decrease.

### Buildings
list of buildings

Building | Cost | Tech Required | Building Required | Effect
--- | :---: | :---: | :---: | :---
Barracks | 40 | ? | - | Units produced are automatically Veterans (+5 exp)
Granary | 40 | ? | - | Plains tiles give +2 food (or +X food constant)
Harbor | ? | ? | - | +1 food in sea tiles
Workshop | ? | ? | - | Provides +2 production from hills
Iron Mine | ? | ? | - | Mountain tiles give +4 production 
Walls | ? | ? | - | Gives +100% defensive bonus
Library | ? | ? | - | Doubles city science production (or +1 science each 2 citizen -> +(population/2) science)
University | ? | ? | - | Replaces library, x4 science production
Temple | ? | ? | - | +1 culture for every citizen in city
Cathedral  | ? | ? | - | Replaces temple and gives +2 culture for each citizen 
Aqueduct | ? | ? | - | Increases city's growth by half 
Market | ? | ? | - | Doubles city gold production
Bank | ? | ? | - | Replaces market, x4 gold production 
Courthouse | ? | ? | - | Increases the city's workable tile region (or reduce >:( )
Factory | ? | ? | - | Doubles the city's production 

Food Buildings
---
Hospital
Medical Lab


Production Buildings
---
Stable (must have access to hourse resource, +2 production)
Forge
Nuclear Plant
Recycling center
Solar plant


Gold Buildings
---
Lighthouse (must be near water, +1 gold in sea tiles)
Stock exchange


Culture Buildings
---
Monument (see temple, +2 culture)
Amphitheater (+3 culture, require monument)
Opera House
Theater
Museum
Broadcast Tower


Science Buildings
---
Observatory
Public School
Research Lab


Other Buildings
---
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


## Science
Science is produced by the player's cities and is used to pay the cost of the research of technologies.
Each turn a city produce science and the total science from all of the player's cities is used to pay the cost of the player current technology research.

### Technologies
Technology | Cost | Technologies Required | Advantages Unlocked
--- | :---: | --- | ---
Misticismo | - | - | -
Scrittura | - | - | -
Agricoltura | - | - | -
Caccia | - | - | -
Pesca | - | - | -
Teologia | - | Misticismo, Scrittura | -
Matematica | - | Scrittura, Ruota | -
Ruota | - | Agricoltura | -
Estrazione Mineraria | - | Agricoltura | -
Allevamento | - | Agricoltura, Caccia | -
Tiro con l'Arco | - | Caccia | -
Navigazione | - | Pesca | -
Diritto Divino | - | Teologia | -
Educazione | - | Teologia, Matematica | -
Valuta | - | Matematica | -
Muratura | - | Estrazione Mineraria | -
Lavorazione Bronzo | - | Estrazione Mineraria | -
Equitazione | - | Allevamento | -
Ottica | - | Tiro con l'Arco, Navigazione | -
Arte | - | Diritto Divino, Educazione | -
Letteratura | - | Educazione | -
Ingegneria | - | Matematica, Muratura | -
Lavorazione Ferro | - | Lavorazione Bronzo | -
Codice Cavalleresco | - | Equitazione, Valuta | -
Astronomia | - | Ottica | -
Musica | - | Arte, Letteratura | -
Sistema Bancario | - | Diritto Divino, Valuta | -
Meccanica | - | Ingegneria | -
Fisica | - | Ingegneria | -
Fusione del metallo | - | Lavorazione Ferro | -
Teoria Scientifica | - | Astronomia, Fisica | -
Musica | - | Arte, Letteratura | -
Economia | - | Sistema Bancario | -
Acciaio | - | Fusione del metallo | -
Energia a Vapore | - | Codice Cavalleresco, Acciaio | -
Polvere da Sparo | - | Fisica, Acciaio | -
Rigatura delle Canne | - | Meccanica, Polvere da Sparo | -
Chimica | - | Polvere da Sparo | -
Pezzi indipendenti | - | Energia a Vapore | -
Elettricità | - | Energia a Vapore, Teoria Scientifica | -
Radio | - | Musica, Elettricità | -
Mass Media | - | Radio | -
Elettronica | - | Radio | -
Computer | - | Elettronica | -
Globalizzazione | - | Economia, Computer | -
Robotica | - | Computer | -
Combustione | - | Rigatura delle Canne, Chimica | -
Plastica | - | Chimica, Elettricità | -
Volo | - | Pezzi indipendenti | -
Missilistica | - | Volo, Combustione | -
Teoria Atomica | - | Combustione | -
Fissione Nucleare | - | Teoria Atomica, Missilistica | -
Fisica Particelle | - | Teoria Atomica, Robotica | -
Nanotecnologia | - | Fisica Particelle, Plastica | -
Tecnologia Futura | - | Nanotecnologia, Fissione Nucleare | -


## Society
Each civilization have a society system

Society | Requirements | Effects
--- | --- | ---
Anarchy | - | No production, gold, science or food.
Dispotism | - | No special effects.
Monarchy | Diritto Divino | -
Republic | Educazione | -
Teocracy | Teologia | +XX% culture
Democracy | - | +50% gold and +50% science but you can't declare war.
Socialism | - | -
Nationalism | Economia | -
Communism | Energia a Vapore oppure Pezzi indipendenti | +XX% production
Fascism | Mass Media | -
Police State | Computer oppure Combustione | -
