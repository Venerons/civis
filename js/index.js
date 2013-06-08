// Copyright (c) 2013 Daniele Veneroni.
// Released under GPLv3 License. See LICENSE.txt for further information.
//"use strict";

Lungo.init({
    name: 'civjs'
});

// ON LOAD
window.addEventListener("load", function() {
    init();
}, 0);

function init () {
    $("#customgamebtn").click(function () { customGame(); });
    $("#presetmapbtn").click(function () { presetGame(); });

    $("#loadautobtn").click(function () { loadAuto(); });
    $("#loadmanualbtn").click(function () { loadManual(); });

    $("#asideloadautobtn").click(function () { loadAuto(); });
    $("#asideloadmanualbtn").click(function () { loadManual(); });

    var civs = [];

    $.each(civsDB, function(key, val) {
        civs.push(key);
    });

    var civsList = '<option value="' + civs[0] + '" selected>' + civs[0] + '</option>';
    for (var i = 1, len = civs.length; i < len; i++) {
        civsList += '<option value="' + civs[i] + '">' + civs[i] + '</option>';
    }

    $("#customCiv").html(civsList);
    $("#scenarioCiv").html(civsList);

    $('#manualcontent').load('docs/manual.txt');
}

function customGame() {
    var customPlayers = document.getElementById('customPlayers').value;
    var customPlayerName = document.getElementById("customPlayerName").value;
    var customCiv = document.getElementById("customCiv").value;
    var mapSize = document.getElementById("mapSize").value;

    if (customPlayerName === "" || customPlayerName == null) {
        Lungo.Notification.error("Error", "You must insert a player name", "cancel", 3);
        return;
    }

    var ncols, nrows;
    if (mapSize == "small") { ncols = 16; nrows = 10; }
    if (mapSize == "medium") { ncols = 25; nrows = 16; }
    if (mapSize == "large") { ncols = 32; nrows = 20; }
    if (mapSize == "xlarge") { ncols = 50; nrows = 30; }

    var param = "game.html?action=new&name=" + customPlayerName + "&civ=" + customCiv + "&players=" + customPlayers + "&ncols=" + ncols + "&nrows=" + nrows;
    window.location.href = param;
}

function presetGame() {
    window.location.href = "game.html?action=preset&map=" + document.getElementById("preset").value;
}

function loadAuto() {
    Lungo.Notification.confirm({
        icon: 'user',
        title: 'Load Last Auto Save',
        description: 'Are you sure to load the last auto saved game?',
        accept: {
            icon: 'checkmark',
            label: 'Accept',
            callback: function(){ window.location.href = "game.html?action=load&save=auto"; }
        },
        cancel: {
            icon: 'close',
            label: 'Cancel',
            callback: function(){}
        }
    });
}

function loadManual() {
    Lungo.Notification.confirm({
        icon: 'user',
        title: 'Load Manual Save',
        description: 'Are you sure to load the manual saved game?',
        accept: {
            icon: 'checkmark',
            label: 'Accept',
            callback: function(){ window.location.href = "game.html?action=load&save=manual"; }
        },
        cancel: {
            icon: 'close',
            label: 'Cancel',
            callback: function(){}
        }
    });
}
