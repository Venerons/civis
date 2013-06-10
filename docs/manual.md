_Copyright (c) 2013 Daniele Veneroni. Released under GPLv3 License. See LICENSE.md for further information._

Welcome to CivJS, the JavaScript Civilization Game!

## Index
* [Winning](#winning)
* [Controls](#controls)
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

## Controls
`spacebar` - End turn  
`up` `left` `right` `down` - move the camera through the map  
`ctrl + e` - Export map  
`ctrl + a` - Discover All  
`ctrl + q` - Zoom out  
`ctrl + w` - Zoom in  

## The Map
The map is the playground of the game. Each tile can be of one of these types:

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

## Units
Each unit have 5 stats:

* **Life:** Remaining life points of the unit. If the unit have less than 1 life point, it dies.
* **Exp:** Experience points of the unit. A unit can gain Exp by surviving in a fight. When a unit reach 5 Exp, it becomes Veteran, and gain +50% Atk/Def. When a unit reach 10 Exp, it becomes Elite, and gain +100% Atk/Def.
* **Atk:** Attack power of the unit, used to deal damage in a fight.
* **Def:** Defence power of the unit, used to prevent damage in a fight.
* **Mov:** Movement points of the unit, used to move around the map.

A unit can do various actions. Actions can be:

* **Move:** Move the unit to another tile. To move, a unit requires Mov points and consumes a Mov point every tiles moved. Some tiles consumes more Mov than others, see the section _The Map_ for futher informations.
* **Fortify:** Fortify the unit, that gain a +25% Atk/Def until it's fortified. Moving the unit de-fortify the unit.
* **Kill:** Kill the unit to gain a small amount of gold. The unit will be removed.
* **No Orders:** Issue no orders to the unit, that will be left as it is.

Some units have also special orders, depending to the unit type. Actions can be:

* **Settle:** Settle a city in the tile where the unit is. Only available for settlers.
* **Build Streer:** Build a street on the tile where the unit stands. A street reduce the Mov needed to enter the tile.
* **Build Improvement:** Build an improvement. An improvement can improve a tile Food/Production/Gold values.

### Fighting
A fight is resolved this way:

1. Each unit deal damage to the other unit, and the damage dealt is egual to the Atk of the unit minus the Def of the other unit (Damage dealt = Atk - Def).
2. The damage dealt decrease the life points of the units, and if a unit have no remaining life points, it dies. In a fight could die one, both or none of the units.
3. The surviving units (if any) gain an Exp. If a unit is promoted this way to the Elite or Veteran rank, the max life of the unit will be doubled and all the life points will be restored.
4. If the attacker kill the defender, it take its position. By the way, if the attacker get killed by the defender, the defender cannot gain the position, and stand on its tile.

### Settling
settling instructions

### Unit List
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
Galley             | 45    | 1     | 1     | 1     | 1            | Sailing          | Optics  
_CLASSICAL ERA_    |       |       |       |       |              |                  |  
Catapult           | 75    | 4     | 1     | 1     | 1            | Engineering      | Gunpowder  
Swordsman          | 75    | 2     | 2     | 1     | 1            | Iron Working     | Metal Casting  
Horseman           | 75    | 2     | 1     | 2     | 1            | Horse Riding     | Code of Chivalry  
Trireme            | 75    | 2     | 2     | 2     | 1            | Optics           | Astronomy  
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

## Cities
cities about
each turn will be consumed 2 food per citizen. Eventual remaining will be used to increase population. If negative, population may decrease.

### Buildings
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


## Science
Science is produced by the player's cities and is used to pay the cost of the research of technologies.  
Each turn a city produce science and the total science from all of the player's cities is used to pay the cost of the player current technology research.  
A city produce science equal to the half of its commerce production, plus eventual bonus granted by buildings, tiles, technologies and societies.  
If no research is in queue at the end of the turn, the science produced is converted to gold.

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
Sailing            | 40    | Fishing                         | Unlock Galley  
Divine Right       | 80    | Theology                        | Unlock Monarchy  
Education          | 80    | Theology, Mathematics           | Unlock Republic, University  
Currency           | 80    | Mathematics                     | -  
Masonry            | 80    | Mining                          | -  
Bronze Working     | 80    | Mining                          | Unlock Barracks, Spearman  
Horse Riding       | 80    | Breeding                        | Unlock Horseman  
Optics             | 80    | Archery, Sailing                | Unlock Trireme  
Art                | 160   | Divine Right, Education         | -  
Literature         | 160   | Education                       | -  
Engineering        | 160   | Mathematics, Masonry            | Unlock Aqueduct, Catapult  
Iron Working       | 160   | Bronze Working                  | Unlock Swordsman  
Code of Chivalry   | 160   | Horse Riding, Currency          | Unlock Knight  
Astronomy          | 160   | Optics                          | Unlock Galleon  
Music              | 320   | Art, Literature                 | -  
Banking            | 320   | Divine Right, Currency          | -  
Mechanics          | 320   | Engineering                     | -  
Physics            | 320   | Engineering                     | -  
Metal Casting      | 320   | Iron Working                    | Unlock Lancer  
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
Anarchy      | -            | No production, commerce, gold, science or food.  
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
