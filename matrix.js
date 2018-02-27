class Matrix {
    //Al pulsar sobre generar matriz rellenara una matriz con blanks excepto los bloques que pondrá block,
//el destino tendrá destination
    //Para marcar las posiciones en el array, añadiremos clases m + numero de ficha
    constructor(fils, cols, filD, colD) {
        this.fils = fils;
        this.cols = cols;
        this.destination = new Coord(filD, colD);
        this.matrix = []
        for (let i = 0; i < fils; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                this.matrix[i][j] = "blank";
                if (i === filD && j === colD)
                    this.matrix[i][j] = "destination";
            }
        }
    }

    getPossitionValue(fil, col) {
        let elem = $(".f" + fil + " .c" + col);
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

    addInitialCoord(fil, col) {
        if (!this.initCoords)
            this.initCoords = new Array();
        let coord = new Coord(fil, col);
        this.initCoords.push(coord);
    }

    removeInitialCoord(fil, col) {
        let coord = new Coord(fil, col);
        let i = 0;
        this.initCoords.forEach(element => {
            if (element === coord)
                element.splice(i, 1);
            i++;
        });
    }

    addBlockCoord(fil, col) {
        this.matrix[i][j] = "block";
    }

    removeBlockCoord(fil, col) {
        this.matrix[i][j] = "blank";
    }

    //Estimacion = hipotenuza
    start() {
        
    }


    estimate(fil, col) {
        if (fil == this.destination.getFil() && col == this.destination.getCol())
            return 0;
        else if (fil === this.destination.getFil())
            return Math.abs(col - this.destination.getCol());
        else if (col === this.destination.getCol())
            return Math.abs(fil - this.destination.getFil());
        else {
            let dFil = Math.abs(fil - this.destination.getFil());
            let dCol = Math.abs(col - this.destination.getCol());
            return Math.sqrt(Math.pow(dFil), Math.pow(dCol));
        }
    }

    //TODO: no estimar si hay bloque, si está marcada y si hay una ficha en esa posición.
    estimateSurrounded(fil, col) {
        for (let i = fil - 1; i <= fil + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i !== fil && j !== col && i >= 0 && i < this.fils && j >= 0 && j < this.cols) {
                    let elem = $(".f" + i + " .c" + j);
                    if (matrix[i][j] === "blank") { 
                        this.matrix[i][j].estimated = this.estimate(i, j);
                        if(i !== fil && j !== col)  //nos movemos en diagonal
                            this.matrix[i][j].acumulated = this.matrix[fil][col].acumulated + Math.sqrt(1,1);
                        else
                            this.matrix[i][j].acumulated = this.matrix[fil][col].acumulated + 1;
                    }
                }
            }
        }
    }
}

class Coord {
    constructor(fil, col) {
        this.fil = fil;
        this.col = col;
    }
    getFil() {
        return this.fil;
    }
    getCol() {
        return this.col;
    }
}
