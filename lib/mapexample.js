// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
{
	playes: [
		{
			id: 1, // player id
			color: "red", // player color
			name: "Daniele", // player name (promped)
			civilization: "rome", // player civilization
			points: 0 // player game points
		}
		{
			id: 2, // player id
			color: "blue", // player color
			name: "Veneroni", // player name (promped)
			civilization: "greek", // player civilization
			points: 0 // player game points
		}
	]
    tiles: [
    	{
    		id: 11, // id of the tile, composed by xy where x is the x coordinate and y the y coordinate (i.e. the tile at x=4, y=5 -> id=45)
    		x: 1, // x coordinate
    		y: 1, // y coordinate
    		type: "grass", // grass, water, hill, mountain, snow, desert, marsh
    		fog: false, // is hidden by fog or not
    		nature: "forest", //forest, native village, barbarian village, natural wonder
    		resource: "none", // none or one of the many resource
    		improvement: "none", // none, camp, mine
    		street: false, // is a street bulid on the tile or not
    		culture: 0 // percentage of the culture of the tile
    	}
    ],
    units: [
    	{
    		player: 1, // the player that own the unit
    		color: "red", // the color of the player that own the unit
    		x: 3, // unit coordinate
    		y: 2, // unit coordinate
    		type: "archer", // the type of the unit
    		experience: 0, // experience of the unit, used to promote to veteran and elite
    		life: 1 // the life point of the unit
    	},
    	{
    		player: 2, // the player that own the unit
    		color: "blue", // the color of the player that own the unit
    		x: 3, // unit coordinate
    		y: 3, // unit coordinate
    		type: "settler", // the type of the unit
    		experience: 0, // experience of the unit, used to promote to veteran and elite
    		life: 1 // the life point of the unit
    	}
    ],
    cities: [
        {
        	player: 1, // the player that own the city
        	name: "rome", // name of the city
        	x: 3, // city coordinate
        	y: 3, // city coordinate
        	population: 1, // population of the city
        	buldings: ["granary", "walls"], // list of buildings in the city
        	currentbuild: "barraks", // the name of the current build
        	currentbuildcost: 40 // remaining cost of the current build
        }
    ]
}
