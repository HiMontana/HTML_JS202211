//Single line Javascript Comment
/*
Multiline Javascript Comment
*/

// Defines variable to access properties of canvas by ID
var canvas= document.getElementById("canvas");
//Defines the drawing context  of Canvas Element
var ctx = canvas.getContext('2d');

//Draw stuff
//Set up color and outline style
ctx.fillStyle = "rgb(0,0,255)";
ctx.strokeStyle = "green";
ctx.lineWidth = "5";

//Draws a Rectangle fillrect(x,y,width,height)
ctx.fillRect(30,30,200,100);
ctx.strokeRect(30,30,200,100);

//draw lines
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(400,250);
ctx.lineTo(800,0);
ctx.stroke();

ctx.strokeStyle = "red";

ctx.beginPath();
ctx.moveTo(800,600);
ctx.lineTo(400,350);
ctx.lineTo(0,600);
ctx.stroke();

//draw a circle
ctx.beginPath();
ctx.arc(400,300,50,0,(3*Math.PI)/2,false);
ctx.lineTo(400,300);
ctx.closePath();
ctx.fill();
ctx.stroke()

//Random Shape
ctx.fillStyle = "#55ddef";
ctx.strokeStyle = "yellow"
ctx.lineWidth = "2"

ctx.beginPath()
ctx.moveTo(650,100)
ctx.lineTo(700,140)
ctx.lineTo(675,200)
ctx.lineTo(625,200)
ctx.lineTo(600,140)
ctx.closePath()
ctx.fill()
ctxs.stroke()
//Draw an image to the canvas
var mario = new Image()
mario.src = "images/mairio.png"
mario.onload = function(){
    ctx.drawImage(mario, 470,200,80,80)
}