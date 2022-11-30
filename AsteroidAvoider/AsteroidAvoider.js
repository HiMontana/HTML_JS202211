var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var timer = requestAnimationFrame(main)

//asteroid variables
var numAsteroids = 30
var asteroids = []



//asteroid class
function Asteroid(){
    //properties to draw the asteroids
    this.radius = randomRange(15,2)
    this.x = randomRange(canvas.width-this.radius, this.radius)
    this.y = randomRange(canvas.height-this.radius, this.radius)-canvas.height
    this.vy = randomRange(10,5)
    this.color="grey"

    //methods functions to draw asteroids
        this.drawAsteroid = function(){
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }
}

//for loop to instansiate astriods for game
for(var i = 0; i<numAsteroids;i++){
    asteroids[i]= new Asteroid()
}

function main(){
    //clear canvas
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height)

    for(var i=0; i<asteroids.length;i++){
        if(asteroids[i].y > canvas.height + asteroids[i].radius){
            asteroids[i].y = randomRange(canvas.height-asteroids[i].radius, asteroids[i].radius)-canvas.height
            asteroids[i].x = randomRange(canvas.width-asteroids[i].radius,asteroids[i].radius)

        }

        asteroids[i].y += asteroids[i].vy
        asteroids[i].drawAsteroid()

    
    }

    //refresh screen
    timer = requestAnimationFrame(main)
}

//utility function

function randomRange(high,low){
    return Math.random()*(high-low)+low
}