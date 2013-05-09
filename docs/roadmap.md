# CivJS Roadmap

_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

This document outlines the general goals for CivJS ongoing development.

### Version 0.3.0 (May 2013)

* End Turn Messages with infos about what happened _(DONE)_
* Update to jQuery Mobile 1.3.1 _(DONE)_
* Update to jQuery 2.0.0 _(DONE)_
* Update manual.txt _(DONE)_
* Optimized HUD images _(DONE)_
* Implement science research _(DONE)_
* Implemented Barracks, Granary, Monument, Library, Temple, University, Aqueduct _(DONE)_
* Add Empire overview _(DONE)_
* Removed players stats on the toolbar _(DONE)_
* Redesigned movement rules, hill and mountain tiles require more Mov to enter _(DONE)_
* Update textmap.json _(DONE)_
* Decreased rendering FPS to 10 _(DONE)_
* Update Granary give now +3 food _(DONE)_
* Add if no research is specified, half the science is converted to gold _(DONE)_
* Add oasis _(DONE)_
* Tiles does not provide Gold, but Commerce, and Science and Gold base production is based on the half of Commerce production _(DONE)_

* Fix messages callback behaviour
* Implement more buildings
* Code optimizations and Bug Fixes

### Version 1.0.0 (Unscheduled)

* First major release.
* Complete revision of the code for bugfix and tweaks

_Bugs & technical features_

* better discoverTiles() (implementare la distanza di visuale, ovvero se stai su una collina vedi più lontano, su una montagna ancora di più. Colline, montagne, foreste e giungle tuttavia possono bloccare la visuale.)
* Possible performance boost: paint only items that will be showed inside the camera view (however, that means a renderMap() every time the camera move...)
* Automated production build process (using Closure Compiler & HTML Compressor)
* Export in-code styling on the external CSS
* better generateMap()

_Game Features_

* Implement more units
* Implement culture
* Implement points
* Add other nature elements (marsh, jungle, natural wonder, river)
* Implement civilizations abilities
* Implement politics (aka Society)
* Implement enemy AIs

### Not Yet Planned

* Map Editor
