$(function () {
    $("#aceptar").on("click", acceptClick);
    initTable();
    acceptClick();
    let tdPd = $("td").css("padding");

});
let matrix;


function acceptClick() {
    $("#calcular").prop("disabled", false);
    $("table").empty();
    let fils = Number($("#numFils").prop("value"));
    let cols = Number($("#numCols").prop("value"));
    let dFil = Number($("#filDest").prop("value")) - 1;
    let dCol = Number($("#colDest").prop("value")) - 1;
    if (fils <= 0 || cols <= 0 || fils > 100 || cols > 100){
        alert("Demasiado grande");
        $("#calcular").prop("disabled", true);
    }
    else if(dFil < 0 || dCol < 0 || dFil > fils || dCol > cols)
        alert("Posición destino no válida");
    else{
        matrix = new Matrix(fils, cols, dFil, dCol);
        initTable(fils, cols, dFil, dCol);
    }
}

function initTable(fils, cols, dFil, dCol) {
    let table = $("table");

    for (let i = 0; i < fils; i++) {
        let fila = $("<tr></tr>");
        for (let j = 0; j < cols; j++) {
            let col = $("<td></td>");
            col.addClass("f" + i);
            col.addClass("c" + j);
            if (i === dFil && j === dCol)
                col.prop("id", "destination");
            col.on("click", clickPosition);
            fila.append(col);
        }
        table.append(fila);
    }

    if(cols / 20 > 1){
        console.log("ESTOY");
        $("td").each(function(key, elem) {
            $(this).css("padding", 20 - (cols / 7))
        });
    }

}

function clickPosition(event) {
    let fila = event.target.classList[0];
    let col = event.target.classList[1];
    let item = $("." + fila + "." + col);
    if (item.prop("id") !== "destination") {
        if ($("#initSelected").is(":checked")) {  //casilla marcada
            if (!item.hasClass("block")) {
                if (!item.hasClass("selected")) {
                    $("." + fila + "." + col).css("background-color", "green");
                    item.addClass("selected");    
                    matrix.addInitialCoord(fila, col);
                }
                else {
                    $("." + fila + "." + col).css("background-color", "lightgray");
                    item.removeClass("selected");
                    matrix.removeInitialCoord(fila, col);
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
                    $("." + fila + "." + col).css("background-color", "lightgray");
                    item.removeClass("block");
                }
            }
        }
    }
}