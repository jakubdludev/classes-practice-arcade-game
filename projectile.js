class Projectile {
  constructor(player,speed){
    this.position = {x: player.position.x, y: player.position.y-1}
    this.id =  this.position.x + this.position.y * 10;
    this.speed = speed;
    this.color = player.color
    this.isFiring = false
    this.interval;
    this.lastMove = Date.now()
    this.speed = speed
  }

  destroy() {
    console.log('destroying projectile');
    clearInterval(this.interval) 
    let newProjectiles = projectiles.filter(p=>p!=this)
    projectiles = newProjectiles;
    delete this;
  }

  shoot(){
    let thisMove = Date.now()
      if (thisMove - this.lastMove > this.speed && !game.detectingCollisions) {
        this.position.y --;
        this.id = this.position.x + this.position.y * 10;
        this.lastMove = thisMove;
     }
    else if (this.position.y <= 0) {
      this.destroy()
    } 
}

}