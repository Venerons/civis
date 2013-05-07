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
* Implemented Barracks, Granary, Monument, Library _(DONE)_

* redesign movement rules
* Implement more buildings

### Version 1.0.0 (Unscheduled)

* First major release.
* Complete revision of the code for bugfix and tweaks

_Bugs & technical features_

* Se un unità attacca da più di una casella di distanza, dopo l'attacco deve essere messa nella casella accanto a quella in cui ha combattuto (e non tornare dove era prima)
* better selectDestinations():
	* rivedere il movimento. Magari fare un movimento alla volta, e le unità "consumano" Mov. Questo risolverebbe i problemi descritti sotto (e risparmia calcoli, perché sai perfettamente quali sono le caselle immediatamente adiacenti!)
	* decidere se un unità può spostarsi direttamente su un tile coperto da nebbia o se deve prima scoprirlo passandoci accanto (permetterebbe un grosso risparmio di calcoli, ma sarebbe limitativo per le unità che hanno tanti Mov).
	* Ora un unità può "scavalcare" una casella d'acqua. Non dovrebbe?
* better discoverTiles() (implementare la distanza di visuale, ovvero se stai su una collina vedi più lontano, su una montagna ancora di più. Colline, montagne, foreste e giungle tuttavia possono bloccare la visuale.)
* Possible performance boost: paint only items that will be showed inside the camera view (however, that means a renderMap() every time the camera move...)
* Automated production build process (using Closure Compiler & HTML Compressor)
* Export in-code styling on the external CSS
* better generateMap()

_Game Features_

* Implement more units
* Implement culture
* Implement points
* Add other nature elements (marsh, jungle, natural wonder, oasis, river)
* Implement civilizations abilities
* Implement politics (aka Society)
* Implement enemy AIs

### Not Yet Planned

* Map Editor
