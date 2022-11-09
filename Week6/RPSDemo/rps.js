//canvas drawing stuff
var canvas = document.getElementById("c");
var ctx= canvas.getContext("2d")

ctx.font = "40px Ariel"
ctx.fillStyle= "blue"
ctx.strokeStyle="purple"
ctx.fillText("WELCOM TO THE RPS GAME",125, 280)
ctx.strokeText("WELCOM TO THE RPS GAME",125, 280)

//alert("Select rock, paper, or scissors!");
var rps = ["rock","paper","scissors"];
//console.log(rps[0]);

document.getElementById("rock").addEventListener('click',function(e){alert("You Picked " + rps[0]);
playGame(rps[0])}); 

document.getElementById("paper").addEventListener('click',function(e){alert("You Picked " + rps[1]);
playGame(rps[1])});

document.getElementById("scissors").addEventListener('click',function(e){alert("You Picked " + rps[2])
playGame(rps[2])});

function playGame(playerChoice){
    var cpuChoice =Math.floor (Math.random() *2.99);
    console.log(cpuChoice, playerChoice);
    switch(playerChoice) {
        case "rock":
         if(cpuChoice == 0){
            //rock
            alert("Cpu chose rock. Its a Tie")
         }   
         else if(cpuChoice == 1){
            //paper
            alert("Cpu chose Paper. You lose")
         }
        else{
            alert("Cpu chose Scissors. You win")
        }
        
        break;

        case "paper":
            if(cpuChoice == 0){
               //rock
               alert("Cpu chose rock. You win!")
            }   
            else if(cpuChoice == 1){
               //paper
               alert("Cpu chose Paper. It's a tie!")
            }
           else{
               alert("Cpu chose Scissors. You lose!")
           }

           break;

           case "scissors":
            if(cpuChoice == 0){
               //rock
               alert("Cpu chose rock. You lose!")
            }   
            else if(cpuChoice == 1){
               //paper
               alert("Cpu chose Paper. You win!")
            }
           else{
               alert("Cpu chose Scissors. It's a tie!")
           }
           
           break;
           
          
    }
}