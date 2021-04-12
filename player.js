
class Player {
  constructor(name,color) {
    this.name = name;
    this.color = color;
    this.position = {x:Math.floor(Math.random()*10), y:9};
    document.addEventListener("keydown", event => {
      if (event.key == "ArrowUp") {
       // this.moveUp();
      } else if (event.key == "ArrowDown") {
       // this.moveDown();
      } else if (event.key == "ArrowLeft") {
        !gameOver && this.moveLeft();
      } else if (event.key == "ArrowRight") {
        !gameOver && this.moveRight();
      } else if (event.key == " ") {
        !gameOver && this.fire()
      }  else if (event.key == "Enter") {
        gameOver && navigator.re
      }
  })
  }

  
  moveRight(){
    if (this.position.x < 9) {
      this.position.x ++
    }
      return this;
  }
  moveLeft(){
      if (this.position.x >0) {
      this.position.x --
    }
      return this;
  }
    moveUp(){
      if (this.position.y >0) {
      this.position.y --
    }
    return this
  }
    moveDown(){
      if (this.position.y <9) {
      this.position.y ++
    }
    return this;
  } 
    fire() {
      if (!gameOver) {
        const projectile = new Projectile(this,projectileSpeed);
        projectiles.push(projectile)
      }
    }
}