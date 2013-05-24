# CivJS Changelog

_Copyright (c) 2013 Daniele Veneroni. Released under MIT License._

### Update 24/05/2013

* Add new units: Catapult, Horseman, Galleon, Knight, Spearman, Swordsman, Trireme, Lancer
* Add unit obsolescence

### Update 23/05/2013

* Add new nature element: atoll
* Updated to PhoneGap 2.7.0
* Improved random map generation

### Update 22/05/2013

* Add unit image on build list
* Add new unit: scout
* Updated unit production cost
* Add new buildings: bank
* Updated buildings production cost
* Update manual

### Update 21/05/2013

* Updated EaselJS library to version 0.6.1
* Removed unused libraries SoundJS, TweenJS and PreloadJS
* Updated ReadMe
* Implemented streets
* Add New unit: worker
* Updated city graphics
* Add automated build shell script

### Update 16/05/2013

* Reintroduced Gold instead of Commerce
* Refactored food/prod/gold values
* New tiles tundra and plain
* New nature element Jungle
* Base science production is equal to the cities population
* Buildings and unit maintenance cost

### Update 10/05/2013 (Version 0.3.0)

* Tagged version 0.3.0
* Fix messages callback behaviour
* Updated manual.txt

### Update 09/05/2013

* Add oasis
* Add hill and mountain tiles require more Mov to enter
* Unit action bar shows remaining Mov instead of unit max Mov
* Navigation tech renamed Sailing
* Introducing Commerce instead of Gold
* Update Gold production
* Update Science production
* Add Market
* New HUD graphics

### Update 08/05/2013

* Decreased rendering FPS to 10
* Update Granary give now +3 food
* Add if no research is specified, half the science is converted to gold
* Implemented Temple, University, Aqueduct
* Update messages now have colors based on the source of the message
* Update ReadMe
* Update index.html
* Code optimizations and Bug Fixes
* A finished build message trigger a showCityManager()
* Fix "Discard" on settling
* New City Manager Layout

### Update 07/05/2013

* Update to jQuery Mobile 1.3.1
* Update to jQuery 2.0.0
* Update manifest.appcache
* Update manual.txt
* Optimized HUD images
* Implemented Barracks, Granary, Monument, Library
* Implemented science research
* Add Empire Overview
* Removed players stats from the toolbar
* Code optimizations and Bug Fixes
* Redesigned movement rules
* Update textmap.json

### Update 06/05/2013 (2)

* Notifications
* Update CSS
* Add Barracks building
* Add city population growth
* Update createBuildingsList()

### Update 06/05/2013 (Version 0.2.0)

* Tagging version 0.2.0
* Update RoadMap
* Player receives gold produced by his cities each turn

### Update 05/05/2013

* Better generateMap()
* Fix tiles and nature food/prod/gold stats
* Add getNearTiles() and refactored where is useful
* Add Atk/Def modifiers on tiles
* Code Optimizations and Bug Fixs

### Update 04/05/2013

* (1) A settler cannot settle near (or on) a city
* (1) A city cannot have a name already taken by another city
* (1) City starting population increased to 2
* (2) Only coastal city can build naval units

### Update 03/05/2013

* Updated unitsDB
* New buildingsDB
* Continued implementing city management (almost finished)

### Update 02/05/2013

* Decreased rendering FPS to 24 from 60
* Continued implementing city management (still partial)

### Update 01/05/2013

* Updated Instructions Manual
* Updated RoadMap
* Fixed version numer on index.html
* Fixed zoom rendering
* New city management (partial)

### Update 30/04/2013

* Introduced more debug controls
* Changed preset map sizes
* Added favicon images
* Added webapp icons
* Fix icons & spash screens on iOS
* Better manage of ActionBar actions
* New settle city
* Reduced buttons border
* Removed text on buttons (only icon)

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
