# CivJS Changelog

_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

### Update 29/04/2013

* Update config.xml
* Corrected testmap.json
* Cure unit when is fortified (+1 normal, +2 if veteran, +3 if elite)
* New (not definitive) graphic for desert, fog, water and snow tiles

### Update 28/04/2013

* (1) Update unitsDB
* (1) Cleaned up generateMap()
* (1) New createNewUnit()
* (1) New promoteUnit()
* (2) Add attack preview on the attack confirm
* (2) New full civilization selection on New Custom Map
* (2) Updated civsDB
* (2) Update random civilization and leader name for the AIs
* (2) Update testmap.json
* (2) Removed marsh tile (future implementation as nature element)
* (2) Updated roadmap

### Update 27/04/2013 (2)

* New database.js that will contains all DBs
* New map size selection on new custom map
* New test map
* Changed some utility functions
* Removed some useless utility functions
* Lot of bug fixs

### Update 27/04/2013 (Version 0.1.0)

* Complete conversion of the rendering engine from DOM rendering to Canvas rendering
* Infinite list of bug fixs and performance boosts.
* Lots of new features, like focusNext(), info messages, and many others
* Preload images at startup
* New docs and wiki
* New project structure
* New graphics (not yet final, however)
* New export map data pressing [ctlr] + [e]
* New custom initial map settings

### Update 20/01/2013

* Add utils.js where can be found all the utility functions
* Update map.js
* Update game.js
* Update ReadMe adding Play Store link

### Update 18/01/2013

* Update better findTileByXY()
* Add discoverTiles()
* Add random nature elements on map
* Update now coordinate of the first unit are more controlled
* Add keyboard mapping using kibo.js (pressing "space" trigger endTurn())

### Update 17/01/2013

* (1) Update fortify order (+25% Atk/Def instead of +50%)
* (1) Add Menu that contains all buttons previously on the top bar
* (1) Add Kill unit order, that remove the unit to gain a small admount of gold
* (1) Fix various bugfix
* (2) Add new random game or new from example map
* (2) Update instructions manual
* (2) Add new player colors
* (2) Update HUD
* (2) Add now generateMap() return a random map (too random for the moment...)

### Update 16/01/2013

* (1) Update ReadMe
* (1) Add Turn System
* (1) Add find tile by XY or ID functions
* (1) Update some optimization and bugfix
* (2) a unit promoted to Elite or Veteran rank get full health restored
* (2) a unit can fortify (+50% Atk/Def)

### Update 15/01/2013

* (1) Add new full support for PhoneGap Build
* (1) Add Instructions Manual on main menu
* (1) Add Logo on main menu
* (1) Update CivJS Logo on map
* (2) Add Fight management
* (2) Add Promotions for the units (Veteran and Elite)
* (2) Update Action Bar now shows also the unit title (Veteran or Elite) and the stats with the promotion bonus
* (2) Add iOS.js to better experience with iOS web app
* (2) Update leaving a tile now redesign nature elements
* (2) Update manual.txt

### Update 14/01/2013

* Add new units
* Minor HUD graphics update

### Update 13/01/2013

* (1) Add comments
* (1) Update map JSON scheme
* (1) Update compressed images
* (1) Add HUD images
* (1) Add initial manual scheme
* (2) Add preliminary Move order
* (2) Add more player stats on HUD
* (3) Update Move order now is almost complete

### Update 12/01/2013

* Update Fonts
* Add Popup
* Update loadMap()
* Update loadGame()
* Update manual()
* Add Popup and ActionBar open and close methods
* Update reloadMap()
* Update generateMap() _it returns an example mini-map at the moment_
* Add Player Stats on menu
* Update ReadMe
* Add InfoPopup
* Add Action Bar visible when an owned unit is clicked
* Add various utiliy functions

### Update 11/01/2013

* First commit
* Add Action Bar
* New tiles
