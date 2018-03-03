class Matrix {
    //Al pulsar sobre generar matriz rellenara una matriz con blanks excepto los bloques que pondrá block,
//el destino tendrá destination
    //Para marcar las posiciones en el array, añadiremos clases m + numero de ficha
    constructor(rows, cols, destination) {
        this.rows = rows;
        this.cols = cols;
        this.destination = destination;
        this.matrix = [];
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                this.matrix[i][j] = "blank";
                if (i === this.rowD && j === this.colD)
                    this.matrix[i][j] = "destination";
            }
        }
    }

    getPossitionValue(row, col) {
        let elem = $(".f" + row + " .c" + col);
        if (elem.prop("id") == "destination")
            return "destination";
        else {
            if (elem.hasClass("block"))
                return "block";
            else if (elem.hasClass("selected"))
                return "init";
            else
                return "clear";
        }
    }

    addInitialCoord(row, col) {
        if (!this.initCoords)
            this.initCoords = new Array();
        let coord = new Coord(row, col);
        this.initCoords.push(coord);
    }

    removeInitialCoord(row, col) {
        let coord = new Coord(row, col);
        let i = 0;
        this.initCoords.forEach(element => {
            if (element === coord)
                element.splice(i, 1);
            i++;
        });
    }

    addBlockCoord(row, col) {
        this.matrix[i][j] = "block";
    }

    removeBlockCoord(row, col) {
        this.matrix[i][j] = "blank";
    }

    inMatrixLimit(coord){
        if(coord.getCol() < 0 || coord.getCol() >= this.cols || coord.getRow() < 0 || coord.getRow() >= this.cols)
            return false;
        return true;
    }

    
}