$(function () {
    $("#aceptar").on("click", aceptarClick);
    initTable();
});

function aceptarClick() {
    $("table").empty();
    let fils = $("#numFils").prop("value");
    let cols = $("#numCols").prop("value");
    let dFil = $("#filDest").prop("value");
    let dCol = $("#colDest").prop("value");
    initTable(fils, cols, dFil, dCol);
}

function initTable(fils, cols, dFil, dCol) {
    let table = $("table");

    for (let i = 0; i < fils; i++) {
        let fila = $("<tr></tr>");
        for (let j = 0; j < cols; j++) {
            let col = $("<td></td>");
            col.addClass("f" + i);
            col.addClass("c" + j);
            col.on("click", clickPosition);
            fila.append(col);
        }
        table.append(fila);
    }
}

function clickPosition(event) {
    console.log(event);
    let fila = event.target.classList[0];
    let col = event.target.classList[1];
    let item = $("." + fila + "." + col);
    if ($("#initSelected").is(":checked")) {  //casilla marcada
        if (!item.hasClass("block")) {
            if (!item.hasClass("selected")) {
                $("." + fila + "." + col).css("background-color", "green");
                item.addClass("selected");
            }
            else {
                $("." + fila + "." + col).css("background-color", "gray");
                item.removeClass("selected");
            }
        }
    }
    else {   //casilla no marcada
        if (!item.hasClass("selected")) {//no seleccionado como inicio
            if (!item.hasClass("block")) {
                $("." + fila + "." + col).css("background-color", "black");
                item.addClass("block");
            }
            else {
                $("." + fila + "." + col).css("background-color", "gray");
                item.removeClass("block");
            }
        }
    }
}