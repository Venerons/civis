// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
var unitsDB = {
    "settler": 
        {
            "atk": 0,
            "def": 0,
            "mov": 2
        },
    "archer": 
        {
            "atk": 2,
            "def": 2,
            "mov": 1
        }
};

function showUnitOptions(i) {
    if (map.units[i].player == map.players[0].id) {
        var content = '<span style="position: relative; top: 5px; left: 10px; height: 40px; margin-right: 20px;"><strong>' 
                    + map.units[i].type.toUpperCase() 
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Life:</strong> ' + map.units[i].life + ' <strong>Exp:</strong> ' + map.units[i].experience + ' <strong>Atk:</strong> ' + getAtkByType(map.units[i].type) + ' <strong>Def:</strong> ' + getDefByType(map.units[i].type) + ' <strong>Mov:</strong> ' + getMovByType(map.units[i].type) + '</span>' 
                    + '<button class="menubutton" onclick="moveUnit(' + i + ')">Move</button>'
                    + '<button class="menubutton" onclick="fortifyUnit(' + i + ')">Fortify</button>'
                    + '<button class="menubutton" onclick="javascript:$(\'#actionbar\').css({\'visibility\': \'hidden\'});">No Orders</button>';
        $("#actionbar").html(content);
        $("#actionbar").css({'visibility': 'visible'});
    }
}

function getAtkByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.atk;
        case "archer": return unitsDB.archer.atk;
    }
}

function getDefByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.def;
        case "archer": return unitsDB.archer.def;
    }
}

function getMovByType(type) {
    switch (type) {
        case "settler": return unitsDB.settler.mov;
        case "archer": return unitsDB.archer.mov;
    }
}
