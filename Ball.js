
function Ball(position, color) {
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpritesByColor(color)
    this.inHole = false
    this.visible = true
}

Ball.prototype.update = function (delta) {
    this.position.addTo(this.velocity.mult(delta))

    this.score()

    //friction magic
    this.velocity = this.velocity.mult(0.984)

    if (this.velocity.length() < 5) {
        this.velocity = new Vector2()
        this.moving = false;
    }
}

Ball.prototype.draw = function () {
    if (this.inHole === false) {
        Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN)
    }
}

Ball.prototype.shoot = function (power, angle) {

    this.velocity = new Vector2(power * Math.cos(angle), power * Math.sin(angle));
    this.moving = true;
}
Ball.prototype.collideWithBall = function(ball){

    if (ball.inHole || this.inHole){
        return;
    }

    //normal vector: n = (x1 - x2, y1 - y2)
    const n = this.position.subtract(ball.position)

    //distance between the centers of the balls
    const d = n.length();

    if (d > BALL_DIAMETER){
        return;
    }

    //finding the min translation dist
    const mtd = n.mult((BALL_DIAMETER - d) / d)

    //push/pull balls appart
    this.position = this.position.add(mtd.mult(1/2))
    ball.position = ball.position.subtract(mtd.mult(1/2))

    //unit normal vector 
    const un = n.mult(1/n.length());

    //unit tangent vector
    const ut = new Vector2(-un.y, un.x);

    //project velocities onto un and ut vectors
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    //finding new normal velocities
    let v1nTag = v2n;
    let v2nTag = v1n;

    //converting the sn and t velocities into vectors
    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t)

    //updating the velocities
    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;

}

Ball.prototype.collideWithTable = function(table) {

    let collision = false;

    if (this.position.y <= table.TopY + BALL_RADIUS) {
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collision = true
    }

    if (this.position.x >= table.RightX - BALL_RADIUS) {
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collision = true
    }

    if (this.position.y >= table.BottomY - BALL_RADIUS) {
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collision = true
    }

    if (this.position.x <= table.LeftX + BALL_RADIUS) {
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collision = true
    }
}

Ball.prototype.collideWith = function(object) {

    if (object instanceof Ball) {
        this.collideWithBall(object)
    }else {
        this.collideWithTable(object)
    }
}

Ball.prototype.score = function() {
    if(!this.moving || this.inHole)
        return;

    var newPos = this.position.add(this.velocity.mult(DELTA));

    if(PoolGame.policy.isInsideHole(newPos)){
        if (this.sprite == sprites.whiteBall){
            GAMEOVER = true;
            return;
        }
        this.position = newPos;
        this.inHole = true;
        setTimeout(function(){
            this.visible= false;
            this.velocity = Vector2();
        }, 100);
		return;
    }
}