class AStar{
    constructor(init, end, matrix){
        this.init = init;
        this.end = end;
        this.opened = new Array();
        this.closed = new Array();
        this.found = false;
        this.hasPath = false;
        this.matrix = matrix;
    }

    start(){
        this.insertIntoOpened(new Coord(this.init.getRow(), this.init.getCol(), 0));    //Insertamos el inicio en abierta
        while(!this.found && this.hasPath){

        }
    }

    pathFound(){
        return this.found;
    }

    getLowestOpened(){
        this.opened.pop();
    }

    insertIntoOpened(coord){
        this.opened.push(coord);
        this.opened.sort(this.compareFunction);
    }

    insertIntoClosed(coord){
        this.closed.push(coord);
    }

    expandNode(coord){
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; J++){

            }
        }
    }
    //Probar
    //función para ordenar los arrays de mayor a menor, para hacer pop por la derecha.
    compareFunction(a, b) {
        if(a.getValue() > b.getValue())
            return -1;
        if(a.getValue() === b.getValue())
            return 0;
        if(a.getValue() < b.getValue())
            return 1;
    }


    estimate(coord) {
        let row = coord.getRow();
        let col = coord.getCol();
        if (row == this.destination.getRow() && col == this.destination.getCol())
            return 0;
        else if (row === this.destination.getRow())
            return Math.abs(col - this.destination.getCol());
        else if (col === this.destination.getCol())
            return Math.abs(row - this.destination.getRow());
        else {
            let dRow = Math.abs(row - this.destination.getRow());
            let dCol = Math.abs(col - this.destination.getCol());
            return Math.sqrt(Math.pow(dRow), Math.pow(dCol));
        }
    }

    estimateSurrounded(coord) {
        let row = coord.getRow();
        let col = coord.getCol();
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i !== row && j !== col && this.matrix.inMatrixLimit(new Coord(i,j))) {
                    let elem = $(".f" + i + " .c" + j);
                    if (matrix[i][j] === "blank") { 
                        this.matrix[i][j].estimated = this.estimate(i, j);
                        if(i !== row && j !== col)  //nos movemos en diagonal
                            this.matrix[i][j].acumulated = this.matrix[row][col].acumulated + Math.sqrt(1,1);
                        else
                            this.matrix[i][j].acumulated = this.matrix[row][col].acumulated + 1;
                    }
                }
            }
        }
    }
}
