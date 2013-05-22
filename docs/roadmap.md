# CivJS Roadmap

_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

This document outlines the general goals for CivJS ongoing development.

### Version 0.4.0 (May 2013)

* Refactor gold and commerce, new tiles _(DONE)_
* buildings & units maintenance cost _(DONE)_
* Add new nature: Jungle _(DONE)_
* Update EaselJS and remove useless libraries _(DONE)_
* Implemented streets _(DONE)_
* Add new units: worker, scout _(DONE)_
* Updated units production cost _(DONE)_
* Updated city graphics _(DONE)_
* Add new buildings: bank _(DONE)_
* Updated buildings production cost _(DONE)_

* Add other nature elements (marsh, natural wonder, river, atoll, fallout)
* Implement more buildings
* better discoverTiles() (implementare la distanza di visuale, ovvero se stai su una collina vedi più lontano, su una montagna ancora di più. Colline, montagne, foreste e giungle tuttavia possono bloccare la visuale.)
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
* better generateMap()

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
