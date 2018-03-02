class Coord {
    constructor(row, col, value){
        this.row = row;
        this.col = col;
        this.value = value || 0;
    }

    getRow(){
        return this.row;
    }

    getCol(){
        return this.col;
    }

    getValue(){
        return this.value;
    }
}