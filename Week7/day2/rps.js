//canvas drawing stuff
var canvas = document.getElementById("c");
var ctx= canvas.getContext("2d")

var rock = new Image()
var paper = new Image()
var scissors = new Image()
var hrock = new Image()
var hpaper = new Image()
var hscissors = new Image()

rock.src = "images/rock.jpg"
paper.src = "images/paper.jpg"
scissors.src = "images/scissors.jpg"

hrock.src = "images/rock2.jpg"
hpaper.src = "images/paper2.jpg"
hscissors.src = "images/scissors2.jpg"

document.addEventListener("keydown",onKeyDown)
document.addEventListener("keyup",onKeyUp)

var gameOver = true
var results = "Select Rock, Paper, Scissors Above"

function onKeyDown(e){
   console.log(e.keyCode)
}
function onKeyUp(e){
   if(e.keyCode == 32){
      console.log("You've pressed the spacebar")
      gameOver = false
      draw(rock, paper,scissors,rock,paper,scissors)
   }

}
function draw(rock, paper,scissors,crock,cpaper,cscissors){
   if(gameOver == true){
    //drawing fonts
   ctx.font = "40px Ariel"
   ctx.fillStyle= "blue"
   ctx.strokeStyle="purple"
   ctx.textAlign = "center"
   ctx.fillText("WELCOME TO THE RPS GAME",canvas.width/2, 280)
   ctx.fillText("Press SPACE to start",canvas.width/2, 320)
   ctx.strokeText("WELCOME TO THE RPS GAME",canvas.width/2, 280)
   }
   else{

      ctx.save()
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.font = "30px Ariel"
      ctx.tectAlign = "center"
      ctx.fillStyle = "pink"
      ctx.fillText("Player Choice", canvas.width/2,100)
      ctx.drawImage(rock, canvas.width/2- rock.width/2 - 100, 150)
      ctx.drawImage(paper, canvas.width/2-paper.width/2, 150)
      ctx.drawImage(scissors, canvas.width/2- scissors.width/2 + 100, 150)
      //computer choice
      ctx.fillText("Computer Choice", canvas.width/2,325)
      ctx.drawImage(crock, canvas.width/2 -crock.width/2 - 100, 375)
      ctx.drawImage(cpaper, canvas.width/2 -cpaper.width/2, 375)
      ctx.drawImage(cscissors, canvas.width/2- cscissors.width/2 + 100, 375)

      ctx.fillText(results, canvas.width/2, 525)
      ctx.restore()
   }
}

draw()


//alert("Select rock, paper, or scissors!");
var rps = ["rock","paper","scissors"];
//console.log(rps[0]);

document.getElementById("rock").addEventListener('click',function(e){//alert("You Picked " + rps[0]);
playGame(rps[0])}); 

document.getElementById("paper").addEventListener('click',function(e){//alert("You Picked " + rps[1]);
playGame(rps[1])});

document.getElementById("scissors").addEventListener('click',function(e){//alert("You Picked " + rps[2])
playGame(rps[2])});

function playGame(playerChoice){
   if(gameOver == true){
      return
   } else{
       var cpuChoice =Math.floor (Math.random() *2.99);
    console.log(cpuChoice, playerChoice);
    switch(playerChoice) {
        case "rock":
         if(cpuChoice == 0){
            //rock
            //alert("Cpu chose rock. Its a Tie")
            results ="Cpu chose Rock. Its a tie"
            draw(hrock, paper,scissors,hrock,paper,scissors)
         }   
         else if(cpuChoice == 1){
            //paper
           //alert("Cpu chose Paper. You lose")
           results = "Cpu chose Paper. You lose"
           draw(hrock, paper,scissors,rock,hpaper,scissors)
         }
        else{
           // alert("Cpu chose Scissors. You win")
           results = "Cpu chose Scissors. You win"
           draw(hrock, paper,scissors,rock,paper,hscissors)
        }
        
        break;

        case "paper":
            if(cpuChoice == 0){
               //rock
               //alert("Cpu chose rock. You win!")
               resutls = "Cpu Chose rock. You win"
               draw(rock, hpaper,scissors,hrock,paper,scissors)
            }   
            else if(cpuChoice == 1){
               //paper
               //alert("Cpu chose Paper. It's a tie!")
               results = "Cpu chose Paper. It's a Tie"
               draw(rock, hpaper,scissors,rock,hpaper,scissors)
            }
           else{
               //alert("Cpu chose Scissors. You lose!")
               results = "Cpu chose Scissors. You lose!"
               draw(rock, hpaper,scissors,rock,paper,hscissors)
           }

           break;

           case "scissors":
            if(cpuChoice == 0){
               //rock
               //alert("Cpu chose rock. You lose!")
               results = "Cpu chose rock. You lose"
               draw(rock, paper,hscissors,hrock,paper,scissors)
            }   
            else if(cpuChoice == 1){
               //paper
               //alert("Cpu chose Paper. You win!")
               results = " Cpu Chose paper. You Win!"
               draw(rock, paper,hscissors,rock,hpaper,scissors)
            }
           else{
               //alert("Cpu chose Scissors. It's a tie!")
               results = "Cpu Chose Scissors. It's A Tie!"
               draw(rock, paper,hscissors,rock,paper,hscissors)
           }
           
           break;
           
          
   }
   
       }
}