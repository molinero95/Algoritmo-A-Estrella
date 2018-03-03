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
            this.insertIntoClosed(actual);
            this.expandNode(actual);
            if (actual.getRow() === this.end.getRow() && actual.getCol() === this.end.getCol())  //es solucion
                this.found = true;
            else {  //caso base, final

                if (this.opened.length === 0 && !this.found)
                    this.hasPath = false;
            }

        }
        if (this.found) {
            return this.buildSolutionPath().sort(); //devolver camino
        }
    }

    expandNode(coord) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let row = coord.getRow() + i;
                let col = coord.getCol() + j;
                let actual = new Coord(row, col);
                if (this.matrix.inMatrixLimit(actual) && (i !== 0 || j !== 0)) {
                    actual.setBefore(coord);    //padre es coord
                    actual.setEstimation(this.estimate(actual));
                    //valor del anterior + distancia entre padre e hijo + estimación
                    actual.setDistFromOrigin(coord.getDistFromOrigin() + this.getDistance(coord, actual));
                    let inOpened = this.opened.find(function (elem) {//busco si n esta en abierta
                        if (elem.getRow() === i && elem.getCol() === j) {
                            if (actual.getDistFromOrigin() < elem.getDistFromOrigin())
                                elem = actual;
                            return true;
                        }
                    });
                    if(!inOpened){
                        //comprobar si esta en cerrada
                        let inClosed = false;
                        if(!inClosed)  //ni en abierta ni en cerrada
                            this.insertIntoOpened(actual);
                    }
                    

                    //this.insertIntoOpened(actual);
                }
            }
        }
        this.opened = this.opened.sort(this.compareFunction); //reordenamos despues de cada expansión
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
            this.buildSolutionPathRec(this.end);
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
        let first = this.opened[0];
        this.opened.splice(0,1);
        return first;
    }

    insertIntoOpened(coord) {
        this.opened.push(coord);
    }

    insertIntoClosed(coord) {
        this.closed.push(coord);
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
            return Math.sqrt(Math.pow(dRow, 2), Math.pow(dCol, 2));
        }
    }
}
