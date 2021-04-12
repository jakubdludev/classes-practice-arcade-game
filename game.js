
class Game {
  constructor() { 
    this.detectingCollisions = false;
    this.lastExplosionsCleared = Date.now()
  }
  render() {
    //clear all tiles
    const squares = document.querySelectorAll('.square')
    squares.forEach(square => {
      square.innerHtml = ''
      square.innerText = ''
      square.classList.remove('player')
      square.classList.remove('hit')
      square.classList.remove('enemy')
      square.style.backgroundColor = 'black'
    })
    //render player
    players.forEach(p => {
      let squareNumber = p.position.x + p.position.y * 10;
      document.getElementById(`${squareNumber}`).style.backgroundColor = p.color;
      document.getElementById(`${squareNumber}`).innerText = p.name[0]
      document.getElementById(`${squareNumber}`).classList.add('player')
    });
    //render all enemies
        enemies.forEach(enemy => {
            let squareNumber = enemy.id
            document.getElementById(`${squareNumber}`).innerText = enemy.icon 
            document.getElementById(`${squareNumber}`).classList.add('enemy')
        });
    //render projectiles 
    if (projectiles.length > 0) {
      projectiles.forEach(projectile => {
        let squareNumber = projectile.id
        let square = document.getElementById(`${squareNumber}`)
        if (square) {
          square.innerHTML = '<div class="bullet"></div>'
          square.classList.add('hit')
          square.classList.add('explosion')
          square.children[0].style.backgroundColor=projectile.color;
        }
      })
    }
    //render dead enemies
    if (deadEnemies.length > 0) {
      deadEnemies.forEach(enemy => {
        let squareNumber = enemy.position.x + enemy.position.y * 10;
        let square = document.getElementById(squareNumber)
          square.innerHTML = `<div class="deadEnemy">${enemy.icon}</div>`;
      })
    }

    //render health
     document.getElementById('lifes').innerText = `${lifesLeft == 3 ? '❤️❤️❤️' : lifesLeft == 2 ? '❤️❤️' : lifesLeft == 1 ? '❤️' : ''}`
    
    //render score
    document.getElementById('score').innerText = score

    //render highscore
    document.getElementById('highscore').innerText = `${highscore > score ? highscore : score}`
     return this
    }


detectCollision(){
  this.detectingCollisions = true;
  let collidedSquares = Array.from(document.querySelectorAll('.hit.enemy'))
  collidedSquares.forEach(square => {
   let enemy = enemies.find(e=>e.id == square.id)
   let projectile = projectiles.find(p=>p.id == square.id)
   score+= 10;
   highscore = localStorage.getItem('highscore')
   if(score > highscore) {
     localStorage.setItem('highscore', score)
   }
    let deadEnemy = new DeadEnemy(enemy)
    deadEnemies.push(deadEnemy)
    enemy && enemy.destroy();
    projectile && projectile.destroy();
  })
  this.detectingCollisions = false;
 }
  
  makeTiles () {
    //generate a 10x10 grid 
    let tilesHtml = ''
    for (let i=0; i<10; i++){
      for(let j=0; j<10; j++){
      tilesHtml += `<div class="square" id="${i*10+j}"></div>`
      }
    }
    return tilesHtml
  }


}






