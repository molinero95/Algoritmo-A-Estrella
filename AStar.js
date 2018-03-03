class AStar {
    constructor(init, end, matrix) {
        this.init = init;
        this.end = end;
        this.opened = new Array();
        this.closed = new Array();
        this.found = false;
        this.hasPath = true;
        this.matrix = matrix;
    }

    start() {
        this.insertIntoOpened(new Coord(this.init.getRow(), this.init.getCol(), this.estimate(this.init)));    //Insertamos el inicio en abierta
        let actual;
        while (!this.found && this.hasPath) {
            actual = this.getFromOpened();  //obtenemos el menor valor de abierta
            this.expandNode(actual);
            this.insertIntoClosed(actual);
            if (this.matrix.getPossitionValue(actual.getRow(), actual.getCol()) !== "end")  //es solucion
                this.found = true;
            else {  //caso base, final

                if (this.opened.length === 0 && !this.found)
                    this.hasPath = false;
            }

        }
        if (this.found) {
            return sort(buildSolutionPath); //devolver camino
        }
    }

    expandNode(coord) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; J++) {
                let row = coord.getRow() + i;
                let col = coord.getCol() + j;
                let actual = new Coord(row, col);
                if (this.matrix.inMatrixLimit(actual) && i !== 0 && j !== 0) {
                    actual.setBefore(coord);    //padre es coord
                    actual.setEstimation(this.estimate(actual));
                    //valor del anterior + distancia entre padre e hijo + estimación
                    actual.setDistFromOrigin(coord.getDistFromOrigin() + getDistance(coord, actual));
                    let inOpened = this.opened.find(function (elem) {
                        if (elem.getRow() === i && elem.getCol() === j) {
                            if (actual.getDistFromOrigin() + actual.getEstimation() < elem.getDistFromOrigin() + elem.getEstimation())
                                elem = actual;
                            return true;
                        }
                    });
                    if(!inOpened){
                        
                    }

                    //this.insertIntoOpened(actual);
                }
            }
        }
        this.opened.sort(this.compareFunction); //reordenamos despues de cada expansión
    }

    getDistance(coord1, coord2){
        let row = coord1.getRow();
        let col = coord1.getCol();
        if (row == coord2.getRow() && col == coord2.getCol())
            return 0;
        else if (row === coord2.getRow())
            return Math.abs(col - coord2.getCol());
        else if (col === coord2.getCol())
            return Math.abs(row - coord2.getRow());
        else {
            let dRow = Math.abs(row - coord2.getRow());
            let dCol = Math.abs(col - coord2.getCol());
            return Math.sqrt(Math.pow(dRow), Math.pow(dCol));
        }
    }



    buildSolutionPath() {
        if (this.found) {
            buildSolutionPathRec(this.end);
            return this.solution;
        }
    }

    buildSolutionPathRec(act) {
        if (act.before)
            this.solution.push(this.buildSolutionPathRec(act.before));
        else {
            this.solution = [];
            this.solution.push(act);
        }

    }

    pathFound() {
        return this.found;
    }

    getFromOpened() {
        return this.opened.pop();
    }

    insertIntoOpened(coord) {
        this.opened.push(coord);
    }

    insertIntoClosed(coord) {
        this.closed.push(coord);
    }


    //Probar
    //función para ordenar los arrays de mayor a menor, para hacer pop por la derecha.
    compareFunction(a, b) {
        let aT = a.getEstimation() + a.getDistFromOrigin();
        let bT = b.getEstimation() + b.getDistFromOrigin();
        if (aT > bT)
            return -1;
        if (aT === bT)
            return 0;
        if (aT < bT)
            return 1;
    }


    estimate(coord) {
        let row = coord.getRow();
        let col = coord.getCol();
        if (row == this.end.getRow() && col == this.end.getCol())
            return 0;
        else if (row === this.end.getRow())
            return Math.abs(col - this.end.getCol());
        else if (col === this.end.getCol())
            return Math.abs(row - this.end.getRow());
        else {
            let dRow = Math.abs(row - this.end.getRow());
            let dCol = Math.abs(col - this.end.getCol());
            return Math.sqrt(Math.pow(dRow), Math.pow(dCol));
        }
    }

    estimateSurrounded(coord) {
        let row = coord.getRow();
        let col = coord.getCol();
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i !== row && j !== col && this.matrix.inMatrixLimit(new Coord(i, j))) {
                    let elem = $(".f" + i + " .c" + j);
                    if (matrix[i][j] === "blank") {
                        this.matrix[i][j].estimated = this.estimate(new Coord(i, j));
                        if (i !== row && j !== col)  //nos movemos en diagonal
                            this.matrix[i][j].acumulated = this.matrix[row][col].acumulated + Math.sqrt(1, 1);
                        else
                            this.matrix[i][j].acumulated = this.matrix[row][col].acumulated + 1;
                    }
                }
            }
        }
    }
}
