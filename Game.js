
function Game() {

}

Game.prototype.init = function () {

    this.gameWorld = new GameWorld();
    this.policy = new GamePolicy();
}

Game.prototype.start = function () {

    PoolGame.init();
    
    PoolGame.mainLoop();
    
}

Game.prototype.mainLoop = function () {

    console.log(GAMEOVER)
    Canvas.clear()
    if (GAMEOVER == true) {
        console.log(GAMEOVER)
        Canvas._canvasContext.font = '48px serif';
        Canvas._canvasContext.fillText("GAME OVER \nYou potted the white ball refresh the page to play again", Canvas._canvas.width / 2 - 700, Canvas._canvas.height / 2)
    }else {
        PoolGame.gameWorld.update()
        PoolGame.gameWorld.draw()
        Mouse.reset()    
    }

    requestAnimationFrame(PoolGame.mainLoop)
}

let PoolGame = new Game()