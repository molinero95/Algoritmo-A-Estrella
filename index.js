$(function () {
    $("#aceptar").on("click", acceptClick);
    $("#calcular").on("click", startClick);
    initTable();
    acceptClick();
    let tdPd = $("td").css("padding");

});
var matrix;
var mouseDown;

function startClick() {
    clearPirateIcons();
    clearBoatIcons();
    let dFil = Number($("#filDest").prop("value")) - 1;
    let dCol = Number($("#colDest").prop("value")) - 1;
    let star = null;
    let elem = $("td.selected");
    let split = $(elem).attr("class").split(" ");
    let initCoord = new Coord(Number(split[0].slice(1)), Number(split[1].slice(1)));
    let prob = $("#probPirate").prop("value");
    if (prob > 100 || prob < 0)
        alert("Probabilidad no valida");
    else {
        star = new AStar(initCoord, new Coord(dFil, dCol), matrix, prob);
        star.start();
    }
}

function clearBoatIcons() {
    $(".path").each(function (index, elem) {
        $(elem).removeClass("path");
    });
}

function clearPirateIcons() {
    $(".pirate").each(function (index, elem) {
        $(elem).removeClass("pirate");
    });
}

function acceptClick() {
    $("#calcular").prop("disabled", false);
    $("table").empty();
    let fils = Number($("#numFils").prop("value"));
    let cols = Number($("#numCols").prop("value"));
    let dFil = Number($("#filDest").prop("value")) - 1;
    let dCol = Number($("#colDest").prop("value")) - 1;
    let prob = $("#probPirate").prop("value");
    if (fils > 40 || cols > 40) {
        alert("Demasiado grande");
        $("#calcular").prop("disabled", true);
    }
    else if (fils <= 0 || cols <= 0) {
        alert("Demasiado pequeño");
        $("#calcular").prop("disabled", true);
    }
    else if (dFil < 0 || dCol < 0 || dFil > fils || dCol > cols) {
        alert("Posición destino no válida");
        $("#calcular").prop("disabled", true);
    }
    else {
        matrix = new Matrix(fils, cols, dFil, dCol);
        initTable(fils, cols, dFil, dCol);
    }
}

function initTable(fils, cols, dFil, dCol) {
    let table = $("table");
    table.on("mousedown", function () {
        mouseDown = true;
    });
    table.on("mouseup", function () {
        mouseDown = false;
    });

    for (let i = 0; i < fils; i++) {
        let fila = $("<tr></tr>");
        for (let j = 0; j < cols; j++) {
            let col = $("<td></td>");
            col.addClass("f" + i);
            col.addClass("c" + j);
            if (i === dFil && j === dCol)
                col.prop("id", "destination");
            col.on("click", clickPosition);
            col.on("mouseover", function (event) {
                if (mouseDown)
                    clickPosition(event);
            })
            fila.append(col);
        }
        table.append(fila);
    }

    if (cols / 20 > 1) {
        $("td").each(function (key, elem) {
            $(this).css("padding", 20 - (cols / 7))
        });
    }

}

function clickPosition(event) {
    let fila = event.target.classList[0];
    let filaPos = fila.split('f')[1];
    let col = event.target.classList[1];
    let colPos = col.split('c')[1];
    let item = $("." + fila + "." + col);
    if (item.prop("id") !== "destination") {
        if ($("#initSelected").is(":checked")) {  //casilla marcada
            if (!item.hasClass("block")) {
                if (!item.hasClass("selected")) {
                    if (matrix.hasInitialCoord()) {
                        alert("Ya hay una coordenada de origen");
                    }
                    else {
                        $("." + fila + "." + col).css("background-color", "green");
                        item.addClass("selected");
                        matrix.addInitialCoord(filaPos, colPos);
                    }
                }
                else {
                    $("." + fila + "." + col).css("background-color", "cornflower   ");
                    item.removeClass("selected");
                    matrix.removeInitialCoord();
                }
            }
        }
        else {   //casilla no marcada
            if (!item.hasClass("selected")) {//no seleccionado como inicio
                if (!item.hasClass("block"))
                    item.addClass("block");
                else
                    item.removeClass("block");
            }
        }
    }
}