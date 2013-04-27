_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

Welcome to CivJS, the JavaScript Civilization Game!

## Index
* [Winning](#winning)
* [The Map](#the-map)
* [Units](#units)
* [Settling](#settling)
* [Fighting](#fighting)

## Winning
winning instructions

## The Map
The map is the playground of the game. Each tile can be of one of these types:

* **Grass** a normal plain tile. Nothing special here.
* **Hill** an hill.
* **Mountain** a mountain.
* **Desert** a land covered of warm sand.
* **Marsh** a rotten marsh.
* **Snow** a tile entirely covered of snow or ice.
* **Water** water tiles
* **Fog** undiscovered tiles will be covered of fog of war. Once discovered, the tile type will be showed.

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

## Settling
settling instructions

## Fighting
A fight is resolved this way:

1. Each unit deal damage to the other unit, and the damage dealt is egual to the Atk of the unit minus the Def of the other unit (Damage dealt = Atk - Def).
2. The damage dealt decrease the life points of the units, and if a unit have no remaining life points, it dies. In a fight could die one, both or none of the units.
3. The surviving units (if any) gain an Exp. If a unit is promoted this way to the Elite or Veteran rank, all the life points will restored.
4. If the attacker kill the defender, it take its position. By the way, if the attacker get killed by the defender, the defender cannot gain the position, and stand on its tile.