# CivJS Roadmap

_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

This document outlines the general goals for CivJS ongoing development.

### Version 0.4.0 (May 2013)

Done

* Refactor gold and commerce, new tiles
* buildings & units maintenance cost
* Add new nature: Jungle, Atoll
* Update EaselJS and remove useless libraries
* Implemented streets
* Add new units: Worker, Scout, Catapult, Horseman, Galleon, Knight, Spearman, Swordsman, Trireme, Lancer
* Updated units production cost
* Updated city graphics
* Add new buildings: bank
* Updated buildings production cost
* Updated to PhoneGap 2.7.0
* Improved random map generation

Todo

* Add other nature elements (marsh, natural wonder, river, fallout)
* Implement more buildings
* better discoverTiles() (implementare la distanza di visuale, ovvero se stai su una collina vedi più lontano, su una montagna ancora di più. Colline, montagne, foreste e giungle tuttavia possono bloccare la visuale.) (_PARTIAL_)
* Code optimizations and Bug Fixes

### Version 0.5.0 (Unsheduled)

* Basic enemy AI

### Version 1.0.0 (Unscheduled)

* First major release.
* Complete revision of the code for bugfix and tweaks

### Unscheduled

_Bugs & technical features_

* Possible performance boost: paint only items that will be showed inside the camera view (however, that means a renderMap() every time the camera move...)
* Export in-code styling on the external CSS _(PARTIAL)_
* better generateMap() _(ALWAYS ON STACK)_

_Game Features_

* spend gold to build or accelerate builds
* implement happyness?
* technologies unlock improvements and bonuses/effects
* Implement resources
* Implement improvements (function buildImprovement() already set)
* Implement more units
* Implement points
* Implement civilizations abilities
* Implement politics (aka Society)
* Map Editor
