var canvas = document.querySelector('canvas')
var ctx = canvas.getContext("2d")
var timer = requestAnimationFrame(main)
var speed = 5

//random number function
function randomRange(high, low){
    return Math.random()* (high - low) + low
}

function GameObject(){
    //examples of properties of a class
    this.width = randomRange(50,10);
    this.height = this.width;
    this.radius = randomRange(50,2)
    this.x = randomRange(canvas.width, 0)
    this.y = randomRange(canvas.height,0)
    this.vx = randomRange (speed,-speed)
    this.vy = randomRange (speed,-speed)
    this.color = `rgb(${randomRange(255,0)}, ${randomRange(255,0)}, ${randomRange(255,0)})`


    //example of a method or function
    this.drawSquare = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    this.drawCircle = function(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
        ctx.closePath()
        ctx.fill()
    }

    this.move= function(){
        this.x += this.vx
        this.y += this.vy

        //bottom
        if(this.y > canvas.height - this.radius){
            // make sure doesnt leave the screen
            this.y = canvas.height - this.radius
            this.vy = -this.vy
        }
        //top
        if(this.y < this.radius){
            this.y = this.radius 
            this.vy = this.vy * -1
        }
        //right side
        if(this.x > canvas.width - this.radius){
            this.x = canvas.width - this.radius
            this.vx = -this.vx
        }
        if(this.x < this.radius){
            this.x = this.radius
            this.vx = this.vx* -1
        }
    }
}

//makes a new instance of the square
var square = new GameObject()

//use dot syntax to draw the square
square.drawSquare()

var square2 =new GameObject()
square2.drawSquare()

var squares =[];

/*square[0]= new GameObject()
square[1]= new GameObject()
square[2]= new GameObject()
square[3]= new GameObject()
square[4]= new GameObject()
square[5]= new GameObject()
square[6]= new GameObject()
square[7]= new GameObject()
square[8]= new GameObject()

square{0}.drawSquare()
square{1}.drawSquare()
square{2}.drawSquare()
square{3}.drawSquare()
square{4}.drawSquare()
square{5}.drawSquare()
square{6}.drawSquare()
square{7}.drawSquare()
square{8}.drawSquare()*/

 /*var numSquares = 70
 for(var i = 0; i<numSquares; i++){
    squares[i] = new GameObject()
    squares[i].drawSquare();   
 }*/

var circles = []
var numCircles = 69

for(var i = 0; i<numCircles;i++){
    circles[i] = new GameObject()
    circles[i].drawCircle()
}

function main(){
    //clear canvas
    ctx.clearRect(0,0,canvas.width, canvas.height)


    for(var i = 0; i< circles.length; i++){
        circles[i].move()
        //draw the circles to the screen
        circles[i].drawCircle()
    }
    //request animation frame
    timer = requestAnimationFrame(main)
}
main()