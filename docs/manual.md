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
* Culture: Obtain 20,000 culture point.
* Economic: Acquire 20,000 Gold.
* Technological: Be the first to discover Tecnologia Futura. 

As a civilization nears one of the above mentioned victory conditions, all other civilizations will usually declare war on it in an attempt to delay or stop it from winning.

## The Map
The map is the playground of the game. Each tile can be of one of these types:

Tile     | Food  | Production | Gold  | Modifiers
-------- | :---: | :--------: | :---: | :---:
Grass    | 2     | -          | -     | -
Hill     | 1     | 1          | -     | +50% Atk/Def
Mountain | -     | 2          | 1     | +100% Atk/Def
Water    | 1     | -          | 1     | -
Desert   | -     | -          | -     | -
Snow     | -     | -          | -     | -50% Atk/Def

Some tiles also can host a nature element, that modify the values of the tile

Nature         | Food  | Production | Gold  | Modifiers
-------------- | :---: | :--------: | :---: | :---:
Forest         | -     | +1         | -     | +50% Atk/Def
Jungle         | +1    | -1         | -     | +50% Atk/Def
Marsh          | -1    | -          | -     | -50% Atk/Def
Oasis          | +3    | -          | +2    | -
River          | -     | -          | +1    | -
Natural Wonder | -     | +2         | +3    | -

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
Unit             | Atk   | Def   | Mov   | Initial Life | Requirements
---------------- | :---: | :---: | :---: | :----------: | ---
Settler          | 0     | 0     | 2     | 1            | -
Warrior          | 1     | 1     | 1     | 1            | -
Archer           | 1     | 2     | 1     | 1            | Tiro con l'Arco
Galley           | 1     | 1     | 2     | 1            | Navigazione

## Cities
cities about
each turn will be consumed 2 food per citizen. Eventual remaining will be used to increase population. If negative, population may decrease.

### Buildings
Building         | Cost  | Tech Required  | Building Required | Effect
---------------- | :---: | :------------: | :---------------: | :---
Barracks         | 40    | Bronze Working | -                 | Units produced are automatically Veterans (+5 exp)
Granary          | 40    | Agriculture    | -                 | +3 food
Library          | 40    | Writing        | -                 | +1 science each 2 population
Monument         | 20    | Mysticism      | -                 | +2 culture
Temple           | 40    | Theology       | Monument          | +1 culture each 2 population
University       | 80    | Education      | Library           | +1 science each 2 population (combinable with the Library)
Aqueduct         | 100   | Engineering    |                   | +50% food

Harbor | ? | ? | - | +1 food in sea tiles
Workshop | ? | ? | - | Provides +2 production from hills
Iron Mine | ? | ? | - | Mountain tiles give +4 production 
Walls | ? | ? | - | Gives +100% defensive bonus
Cathedral  | ? | ? | - | Replaces temple and gives +2 culture for each citizen 
Market | ? | ? | - | Doubles city gold production
Bank | ? | ? | - | Replaces market, x4 gold production 
Courthouse | ? | ? | - | Increases the city's workable tile region (or reduce >:( )
Factory | ? | ? | - | Doubles the city's production 

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
Lighthouse (must be near water, +1 gold in sea tiles)
Stock exchange


Culture Buildings
-
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


## Science
Science is produced by the player's cities and is used to pay the cost of the research of technologies.  
Each turn a city produce science and the total science from all of the player's cities is used to pay the cost of the player current technology research.  
A city produce science equal to the half of its population, plus eventual bonus granted by buildings, tiles, technologies and societies.  
If no research is in queue at the end of the turn, half the science produced is converted to gold.

### Technologies
Technology         | Cost  | Technologies Required           | Advantages Unlocked
------------------ | :---: | ------------------------------- | -------------------
Mysticism          | 20    | -                               | Unlock Monument
Writing            | 20    | -                               | Unlock Library
Agriculture        | 20    | -                               | Unlock Granary
Hunting            | 20    | -                               | -
Fishing            | 20    | -                               | -
Theology           | 40    | Mysticism, Writing              | Unlock Theocracy, Temple
Mathematics        | 40    | Writing, Wheel                  | -
Wheel              | 40    | Agriculture                     | -
Mining             | 40    | Agriculture                     | -
Breeding           | 40    | Agriculture, Hunting            | -
Archery            | 40    | Hunting                         | Unlock Archer
Navigation         | 40    | Fishing                         | Unlock Galley
Divine Right       | 80    | Theology                        | Unlock Monarchy
Education          | 80    | Theology, Mathematics           | Unlock Republic, University
Currency           | 80    | Mathematics                     | -
Masonry            | 80    | Mining                          | -
Bronze Working     | 80    | Mining                          | Unlock Barracks
Horse Riding       | 80    | Breeding                        | -
Optics             | 80    | Archery, Navigation             | -
Art                | 160   | Divine Right, Education         | -
Literature         | 160   | Education                       | -
Engineering        | 160   | Mathematics, Masonry            | Unlock Aqueduct
Iron Working       | 160   | Bronze Working                  | -
Code of Chivalry   | 160   | Horse Riding, Currency          | -
Astronomy          | 160   | Optics                          | -
Music              | 320   | Art, Literature                 | -
Banking            | 320   | Divine Right, Currency          | -
Mechanics          | 320   | Engineering                     | -
Physics            | 320   | Engineering                     | -
Metal Casting      | 320   | Iron Working                    | -
Scientific Theory  | 640   | Astronomy, Physics              | -
Economy            | 640   | Banking                         | Unlock Nationalism
Steel              | 640   | Metal Casting                   | -
Steam Energy       | 1024  | Code of Chivalry, Steel         | Unlock Communism
Gunpowder          | 1024  | Physics, Steel                  | -
Rifling            | 2048  | Mechanics, Gunpowder            | -
Chemistry          | 2048  | Gunpowder                       | -
Independent Pieces | 2048  | Steam Energy                    | -
Electricity        | 2048  | Steam Energy, Scientific Theory | -
Radio              | 4096  | Music, Electricity              | -
Combustion         | 4096  | Rifling, Chemistry              | -
Plastic            | 4096  | Chemistry, Electricity          | -
Flight             | 4096  | Independent Pieces              | -
Mass Media         | 8192  | Radio                           | Unlock Fascism
Electronics        | 8192  | Radio                           | -
Rocketry           | 8192  | Flight, Combustion              | -
Atomic Theory      | 8192  | Combustion                      | -
Computers          | 16384 | Electronics                     | Unlock Police State
Nuclear Fission    | 16384 | Atomic Theory, Rocketry         | -
Globalization      | 32768 | Economy, Computers              | -
Robotics           | 32768 | Computers                       | -
Particle Physics   | 65536 | Atomic Theory, Robotics         | -
Nanotechnology     | 131072 | Particle Physics, Plastic       | -
Future Technology  | 262144 | Nanotechnology, Nuclear Fission | -

## Society
Each civilization have a society system

Society      | Requirements | Effects
------------ | ------------ | ---
Anarchy      | -            | No production, gold, science or food.
Dispotism    | -            | No special effects. Available on the beginning of the game.
Monarchy     | Divine Right | -
Republic     | Education    | -
Teocracy     | Theology     | +XX% culture
Democracy    | -            | +50% gold and +50% science but you can't declare war.
Socialism    | -            | -
Nationalism  | Economy      | -
Communism    | Steam Energy | +XX% production
Fascism      | Mass Media   | -
Police State | Computers    | -
