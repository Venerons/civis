# CivJS Roadmap

_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

This document outlines the general goals for CivJS ongoing development.

### April 2013

* Publish updated Instructions Manual
* Complete revision of the code for bugfix and tweaks

### May 2013

_Bugs & technical features_

* Se un unità attacca da più di una casella di distanza, dopo l'attacco deve essere messa nella casella accanto a quella in cui ha combattuto (e non tornare dove era prima)
* better selectDestinations():
	* decidere se un unità può spostarsi direttamente su un tile coperto da nebbia o se deve prima scoprirlo passandoci accanto (permetterebbe un grosso risparmio di calcoli, ma sarebbe limitativo per le unità che hanno tanti Mov).
	* Ora un unità può "scavalcare" una casella d'acqua. Non dovrebbe?
* better discoverTiles() (implementare la distanza di visuale, ovvero se stai su una collina vedi più lontano, su una montagna ancora di più. Colline, montagne, foreste e giungle tuttavia possono bloccare la visuale.)
* Possible performance boost: paint only items that will be showed inside the camera view (however, that means a renderMap() every time the camera move...)
* Automated production build process
* better generateMap()

_Game Features_

* Add nature elements (forest, marsh, jungle, natural wonder, oasis, river, lake)
* Tiles bonus/malus and food/production/gold values
* Implement civilizations abilities
* Implement politics (aka Society)
* Implement science research

### Version 1.0.0 (Unscheduled)

* First major release.
* Complete revision of the code for bugfix and tweaks

### Not Yet Planned

* Map Editor
