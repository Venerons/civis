# CivJS Roadmap

_Copyright (c) 2013 Daniele Veneroni. Released under GPLv3 License. See LICENSE.md for further information._

This document outlines the general goals for CivJS ongoing development.

### Version 0.5.0 (August 2013)

**Done**

* New main menu screen
* New License (from MIT License to GNU GPLv3)
* Changed Galley with Trireme
* Updated to PhoneGap 2.9.0
* Toolbars overflow to minimal support small screens
* Block screen orientation to landscape
* MinAndroidSDK set to 7 (Android 2.1)

**Todo**

* Add other nature elements (natural wonder, river, fallout)
* Implement more buildings
* Add new units
* Implement railways
* Implement improvements (function buildImprovement() already set)
* Remove nature element when settling
* better discoverTiles() (implementare la distanza di visuale, ovvero se stai su una collina vedi più lontano, su una montagna ancora di più. Colline, montagne, foreste e giungle tuttavia possono bloccare la visuale.) _(PARTIAL)_
* Code optimizations and Bug Fixes

### Version 0.6.0 (October 2013)

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
* Implement more units
* Implement points
* Implement civilizations abilities
* Implement politics (aka Society)
* Map Editor
