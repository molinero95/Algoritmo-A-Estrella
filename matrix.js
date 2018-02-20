export class Matrix {
    //Atributos:
    //fils -> Number
    //cols -> Number
    //Lo de abajo no, vamos a tener una matriz [][] y le vamos a añadir los elementos
    //destination -> Coord
    //initCoords -> Array de Coords
    //blockCoords -> Array de Coords
    constructor(fils, cols, filD, colD) {
        this.fils = fils;
        this.cols = cols;
        this.destination = new Coord(filD, colD);
    }


    addInitialCoord(fil, col) {
        if (!this.initCoords)
            this.initCoords = new Array[];
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
        if (!this.blockCoords)
            this.blockCoords = new Array[];
        let coord = new Coord(fil, col);
        this.blockCoords.push(coord);
    }

    removeBlockCoord(fil, col) {
        let coord = new Coord(fil, col);
        let i = 0;
        this.blockCoords.forEach(element => {
            if (element === coord)
                element.splice(i, 1);
            i++;
        });
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