class Enemy { 
  constructor(speed,usedCoordinates){
    this.usedCoordinates = usedCoordinates;
    this.position = {x: this.findX(this.usedCoordinates), y: 0}
    this.id =  this.position.x + this.position.y * 10;
    this.icon = ['🛸','👽','👾','💣'][Math.floor(Math.random()*4)]
    this.speed = speed;
    this.interval;
    this.isMoving = false
    this.lastMove = Date.now()
  }

  destroy(){
    clearInterval(this.interval);
    let newEnemiesArray = enemies.filter(enemy => enemy != this)
    enemies = newEnemiesArray;
    delete this;
  }

  findX(){
    let taken;
    while(true){
      let x = Math.floor(Math.random()*10)
      if (this.usedCoordinates.length > 0){
        taken = this.usedCoordinates.includes(x)
      } else {taken = false}
      if (!taken) {
        console.log('square is free, spawning enemy');
        return x;
      } else if (taken) {
        console.log('square is taken, recalculating...');
      }
  }
}

   attack(){
    if(!game.detectingCollisions && !this.isMoving) {
      this.isMoving = true
      let thisMove = Date.now()
      if (thisMove - this.lastMove > this.speed) {
          if(this.position.y < 9) {
            this.position.y ++
            this.id = this.position.x + this.position.y * 10;
          } else {
          console.log('enemy breached defense lines');
            lifesLeft--
            this.destroy();
          }
          this.lastMove = thisMove
  }
  this.isMoving = false
}}
}


class DeadEnemy {
  constructor(enemy){
    this.enemyIcon = enemy.icon
    this.position = {x: enemy.position.x, y: enemy.position.y}
    this.spawnedTime = Date.now()
    this.icon = this.getIcon(enemy.icon)
  }

  getIcon(enemyIcon) {
    console.log(enemyIcon);
    if (enemyIcon == '🛸') {
      return '🔥'
    } else if (enemyIcon == '👽') {
      return '💀'
    } else if (enemyIcon == '👾') {
      return  '🦠'
    } else {
      return '💥'
    }
  }

  destroy(){
    let time = Date.now()
      if (time - this.spawnedTime > 500) {
       let newDeadEnemies =  deadEnemies.filter(e=> e != this)
       deadEnemies = newDeadEnemies;
       delete this;
     }
  }

}