// Copyright (c) 2013 Daniele Veneroni. Released under MIT License
//"use strict";

// ON LOAD
window.addEventListener("load", function() {
    init();
}, 0);

function init () {
    $("#customgamebutton").click(function () { customGame(); });
    $("#presetmapbutton").click(function () { presetGame(); });
    $('#manualcontent').load('docs/manual.txt');

    var civs = [];

    $.each(civsDB, function(key, val) {
        civs.push(key);
    });

    var civsList = '<option>Civilization</option><option value="' + civs[0] + '" selected>' + civs[0] + '</option>';
    for (var i = 1, len = civs.length; i < len; i++) {
        civsList += '<option value="' + civs[i] + '">' + civs[i] + '</option>';
    }

    $("#customCiv").html(civsList);
}

function customGame() {
    var customPlayers;

    var radios = document.getElementsByName('customPlayers');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            customPlayers = radios[i].value;
        }
    }

    var customPlayerName = document.getElementById("customPlayerName").value;
    var customCiv = document.getElementById("customCiv").value;

    var mapSize = document.getElementById("mapSize").value;
    var ncols, nrows;
    if (mapSize == "small") { ncols = 10; nrows = 10; }
    if (mapSize == "medium") { ncols = 20; nrows = 20; }
    if (mapSize == "large") { ncols = 30; nrows = 30; }
    if (mapSize == "xlarge") { ncols = 50; nrows = 50; }

    var param = "game.html?action=new&name=" + customPlayerName + "&civ=" + customCiv + "&players=" + customPlayers + "&ncols=" + ncols + "&nrows=" + nrows;
    window.location.href = param;
}

function presetGame() {
    window.location.href = "game.html?action=preset&map=" + document.getElementById("preset").value;
}
