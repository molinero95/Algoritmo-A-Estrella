class Matrix {
    //Al pulsar sobre generar matriz rellenara una matriz con blanks excepto los bloques que pondrá block,
//el destino tendrá destination
    //Para marcar las posiciones en el array, añadiremos clases m + numero de ficha
    constructor(rows, cols, destination) {
        this.rows = rows;
        this.cols = cols;
        this.destination = destination;
        this.matrix = [];
        this.initCoord = undefined;
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
        let elem = $(".f" + row)[col];
        if (elem.id === "destination")
            return "destination";
        else {
            if (elem.classList[2] === "block")
                return "block";
            else if (elem.classList[2] === "selected")
                return "init";
            else if(elem.classList[2] === "wind")
                return "wind";
            else
                return "clear";
        }
    }

    hasInitialCoord(){
        return this.initCoord? true: false;
    }

    addInitialCoord(row, col) {
        let coord = new Coord(row, col);
        this.initCoord = coord;
    }

    removeInitialCoord() {
        this.initCoord = undefined;
    }

    addBlockCoord(row, col) {
        this.matrix[i][j] = "block";
    }

    removeBlockCoord(row, col) {
        this.matrix[i][j] = "blank";
    }

    inMatrixLimit(coord){
        if(coord.getCol() < 0 || coord.getCol() >= this.cols || coord.getRow() < 0 || coord.getRow() >= this.rows)
            return false;
        return true;
    }
    
}