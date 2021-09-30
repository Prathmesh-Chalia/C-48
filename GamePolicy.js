function GamePolicy() {

    this.topCenterHolePos = new Vector2(750,32);
    this.bottomCenterHolePos = new Vector2(750,794);
    this.topLeftHolePos = new Vector2(62,62);
    this.topRightHolePos = new Vector2(1435,62);
    this.bottomLeftHolePos = new Vector2(62,762)
    this.bottomRightHolePos = new Vector2(1435,762);
}

GamePolicy.prototype.isOutsideBorder = function(pos,origin){
    return this.isXOutsideLeftBorder(pos,origin) || this.isXOutsideRightBorder(pos,origin) || 
    this.isYOutsideTopBorder(pos, origin) || this.isYOutsideBottomBorder(pos , origin);
}

GamePolicy.prototype.isInsideTopLeftHole = function(pos){
    return this.topLeftHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideTopRightHole = function(pos){
    return this.topRightHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideBottomLeftHole = function(pos){
    return this.bottomLeftHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideBottomRightHole = function(pos){
    return this.bottomRightHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideTopCenterHole = function(pos){
    return this.topCenterHolePos.distanceFrom(pos) < (HOLE_RADIUS + 6);
}

GamePolicy.prototype.isInsideBottomCenterHole = function(pos){
    return this.bottomCenterHolePos.distanceFrom(pos) < (HOLE_RADIUS + 6);
}

GamePolicy.prototype.isInsideHole = function(pos){
    return this.isInsideTopLeftHole(pos) || this.isInsideTopRightHole(pos) || 
            this.isInsideBottomLeftHole(pos) || this.isInsideBottomRightHole(pos) ||
            this.isInsideTopCenterHole(pos) || this.isInsideBottomCenterHole(pos);
}