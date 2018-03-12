class Coord {
    constructor(row, col, estimation, actDistance){
        this.row = row;
        this.col = col;
        this.estimation = estimation || 0;
        this.actDistance = actDistance || 0;
        //this.totalDist = estimation + actDistance || 0;
        this.before = null;
    }
    //Posición
    getRow(){
        return this.row;
    }
    getCol(){
        return this.col;
    }
    //Distancia desde origen a actual
    getDistFromOrigin(){
        return this.actDistance;
    }
    setDistFromOrigin(totalDist){
        this.actDistance = totalDist;
    }
    //Estimacion desde actual a final
    getEstimation(){
        return this.estimation;
    }
    setEstimation(estimation){
        this.estimation = estimation;
    }
    //Puntero al padre
    getBefore(){
        return this.before;
    }
    setBefore(coord){
        this.before = coord;
    }

    paintCoordPath(){
        let elem = $("td.f" + this.row + ".c" + this.col);
        elem.addClass("path");
    }

    paintCoordPirate(){
        let elem = $("td.f" + this.row + ".c" + this.col);
        elem.addClass("pirate");
    }
}
