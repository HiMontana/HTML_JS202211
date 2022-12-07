var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var timer = requestAnimationFrame(main)
var gameOver = true
var score = 0 
var highScore = 0 
var currentState = 0
var gameState = []




//asteroid variables
var numAsteroids = 50
var asteroids = []

//player ship VARIABLE
var ship = new PlayerShip()

// create keybored event handlers
document.addEventListener("keydown", pressKeyDown)
document.addEventListener("keyup", pressKeyup)

function pressKeyDown(e) {
    if (!gameOver) {
        if (e.keyCode == 87) {
            //Code for up W
            ship.up = true
        }
        if (e.keyCode == 65) {
            //Code for left A
            ship.left = true
        }
        if (e.keyCode == 68) {
            //Code for right D
            ship.right = true
        }
        if (e.keyCode == 83) {
            //Code for down S
            ship.down = true
        }
    }
//menu inputs
    if(gameOver){
        if(e.keyCode == 32){
            if(currentState ==2){
                //game over input
                currentState = 0
                numAsteroids = 20
                asteroids = []
                score = 0
                //start game
                main()
                gameStart()
                
            }else{
                //main menu
            gameOver = false
            gameStart() 
            
            currentState = 1
            
            main()
            scoreTimer()

            }


            
        }
    }

}
function pressKeyup(e) {
    if (!gameOver) {
        if (e.keyCode == 87) {
            //Code for up W
            ship.up = false
        }
        if (e.keyCode == 65) {
            //Code for left A
            ship.left = false
        }
        if (e.keyCode == 68) {
            //Code for right D
            ship.right = false
        }
        if (e.keyCode == 83) {
            //Code for down S
            ship.down = false
        }
    }

}



//asteroid class
function Asteroid() {
    //properties to draw the asteroids
    this.radius = randomRange(15, 2)
    this.x = randomRange(canvas.width - this.radius, this.radius)
    this.y = randomRange(canvas.height - this.radius, this.radius) - canvas.height
    this.vy = randomRange(10, 5)
    this.color = "grey"

    //methods functions to draw asteroids
    this.drawAsteroid = function () {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}

function PlayerShip() {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.width = 20
    this.height = 20
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.vx = 0
    this.vy = 0
    this.flameLength = 30

    this.drawShip = function () {
        ctx.save()
        ctx.translate(this.x, this.y)

        //draw flame
        if(this.up || this.left || this.right){
            ctx.save()
            if(this.flameLength == 30){
                this.flameLength = 20
                ctx.fillStyle = "yellow"
            }else{
                this.flameLength = 30
                ctx.fillStyle = "orange"
            }
            //draw flame
            ctx.beginPath()
            ctx.moveTo(0,this.flameLength)
            ctx.lineTo(5,5)
            ctx.lineTo(-5,5)
            ctx.lineTo(0,this.flameLength)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }

        //draw ship
        ctx.fillStyle = "Blue"
        ctx.beginPath()
        ctx.moveTo(0, -10)
        ctx.lineTo(10, 10)
        ctx.lineTo(-10, 10)
        ctx.lineTo(0, -10)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
       
    }

    this.moveShip = function () {
        this.x += this.vx
        this.y += this.vy

        //adding screen boundaries
        //bottom
        if (this.y > canvas.height - this.height / 2) {
            this.y = canvas.height - this.height / 2
            this.vy = 0
        }

        //top
        if (this.y < this.height / 2) {
            this.y = this.height / 2
            this.vy = 0
        }
        //right
        if (this.x > canvas.width - this.width / 2) {
            this.x = canvas.width - this.width / 2
            this.vx = 0
        }

        //top
        if (this.x < this.width / 2) {
            this.x = this.width / 2
            this.vx = 0
        }
    }
}


function main() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    gameState[currentState]()
    if (!gameOver) {                       
        //refresh screen
        timer = requestAnimationFrame(main)
    }

      

}

//Game state Machine 

//main menu state
gameState[0] = function(){
    //code for main menu
    ctx.save()
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Asteroid Avoider",canvas.width/2, canvas.height/2-30)
    ctx.font = "15px Arial"
    ctx.fillText("Press Space to Start", canvas.width/2,canvas.height/2+20)
    ctx.restore()
}

//play game state
gameState[1] = function(){
    // code for asteroids
    ctx.save()
    ctx.font = "15 px Arial"
    ctx.fillStyle ="white"
    ctx.fillText("Sore: "+ score.toString(), canvas.width - 150, 30)
    ctx.restore()

    //vertical
    if (ship.up) {
        ship.vy = -10
    } else if (ship.down) {
        ship.vy = 10
    } else {
        ship.vy = 0
    }
    //horizontal
    if (ship.left) {
        ship.vx = -3
    } else if (ship.right) {
        ship.vx = 3
    } else {
        ship.vx = 0
    }

    for (var i = 0; i < asteroids.length; i++) {
        var dX = ship.x - asteroids[i].x
        var dY = ship.y - asteroids[i].y
        var distance = Math.sqrt((dX * dX) + (dY * dY))

        //collision detection happenes here
        if (detectCollision(distance, (ship.height / 2 + asteroids[i].radius))) {
            //console.log("Hit Asteroid")
            gameOver = true
            currentState = 2
            main()
            return
        }


        if (asteroids[i].y > canvas.height + asteroids[i].radius) {
            asteroids[i].y = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius) - canvas.height
            asteroids[i].x = randomRange(canvas.width - asteroids[i].radius, asteroids[i].radius)

        }

        asteroids[i].y += asteroids[i].vy
        asteroids[i].drawAsteroid()


    }

    //drawship
    ship.moveShip()
    ship.drawShip()

   while(asteroids.length<numAsteroids){
     asteroids.push(new Asteroid())

        }
}

//game over state
gameState[2] = function(){
    //game over code
    if(score > highScore){
    highScore = score
    ctx.save()
    ctx.font = "30px Times New Roman"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("GameOver, Your score was "+ score.toString(),canvas.width/2, canvas.height/2 - 60)
    ctx.fillText("Your New High Score is "+ highScore.toString(),canvas.width/2, canvas.height/2 - 30)
    ctx.fillText("New Record ",canvas.width/2, canvas.height/2)
    ctx.font = "15px Times New Roman"
    ctx.fillText("Press Space to Play again",canvas.width/2, canvas.height/2  +20)
    ctx.restore()
    }else{
    ctx.save()
    ctx.font = "30px arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("GameOver, Your score was "+ score.toString(),canvas.width/2, canvas.height/2 - 60)
    ctx.fillText("Your High Score is "+ highScore.toString(),canvas.width/2, canvas.height/2 - 60)
    ctx.font = "15px arial"
    ctx.fillText("Press Space to Play again",canvas.width/2, canvas.height/2  +20)
    ctx.restore()
}
    }

    
  

//utility function
function gameStart(){
    //for loop to instansiate astriods for game
for (var i = 0; i < numAsteroids; i++) {
    asteroids[i] = new Asteroid()
}
ship = new PlayerShip();
}

function randomRange(high, low) {
    return Math.random() * (high - low) + low
}

function detectCollision(distance, calcDistance) {
    return distance < calcDistance
}

function scoreTimer(){
    if(!gameOver){
        score++
        if(score % 5 ==0){
            numAsteroids += 5 
            console.log(numAsteroids)
        }
        //calls score timer every second
        setTimeout(scoreTimer, 1000)
    }
}