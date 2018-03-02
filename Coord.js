class Coord {
    constructor(row, col, value){
        this.row = row;
        this.col = col;
        this.value = value || 0;
        this.before = null;
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

    getBefore(){
        return this.before;
    }
    setBefore(coord){
        this.before = coord;
    }
}