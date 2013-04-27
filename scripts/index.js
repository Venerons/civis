// Copyright (c) 2013 Daniele Veneroni. Released under MIT License

// ON LOAD
window.addEventListener("load", function() {
    init();
}, 0);

function init () {
    $("#customgamebutton").click(function () { customGame(); });
    $('#manualcontent').load('docs/manual.txt');
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
    var customNcols = document.getElementById("customNcols").value;
    var customNrows = document.getElementById("customNrows").value;
    var param = "game.html?action=new&name=" + customPlayerName + "&civ=" + customCiv + "&players=" + customPlayers + "&ncols=" + customNcols + "&nrows=" + customNrows;
    window.location.href = param;
}