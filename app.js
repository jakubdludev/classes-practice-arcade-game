const game = new Game()
let username = prompt('what is your name ?') || '?'
let color = prompt('choose a color: red, green, blue, yellow, purple') || 'red'
const player1 = new Player(username,color)


//array of all instances Player Objects
let players = [player1]

//array of all instances Projectile objects
let projectiles = []
//array of all instancces Enemy object
let enemies = []
let deadEnemies = []
let highscore = localStorage.getItem('highscore')
let lastSpawned = Date.now()
let projectileSpeed = 25;
let detectingCollisions = false;
let enemySpeed = 1500
let enemiesToSpawn = 1;
let intervals = []
let lifesLeft = 3;
let gameOver = false;
let score = 0;
let usedCoordinates = []

const board = document.querySelector('.board')
board.innerHTML = game.makeTiles();

//render game
const update  = setInterval(() => {
  game.detectCollision();
  if(!game.detectingCollisions) {
    deadEnemies.forEach(e => {
      e.destroy()
    })
    enemies.forEach(enemy=>{
      enemy.attack();
    })
    projectiles.forEach(projectile=>{
      projectile.shoot()
    })
    game.render(players,enemies,projectiles)
    if (lifesLeft <= 0) {
      gameOver = true;
      intervals.forEach(interval => {
        clearInterval(interval);
      })
    }
  }
}, 5 );

intervals.push(update)

const spawner  = setInterval(() => {
  for(let i=0; i<enemiesToSpawn; i++){
    setTimeout(() => {
      const enemy = new Enemy(enemySpeed, usedCoordinates);
      enemies.push(enemy)
      usedCoordinates.push(enemy.position.x)
    }, Math.floor(Math.random()*1000));
  }
  usedCoordinates = []
}, 2000);

intervals.push(spawner)

const speedIncreaser = setInterval(() => {
  if(enemySpeed > 100) {
    enemySpeed-= 20
  }
}, 3000);

intervals.push(speedIncreaser)

const enemiesIncreaser = setInterval(() => {
  if (enemiesToSpawn < 8) {
    enemiesToSpawn++
  }
}, 12000);

intervals.push(enemiesIncreaser)













