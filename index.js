class Ship{
    constructor(shiphull, firepower, accuracy){
        this.shiphull = shiphull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    //if Math.random() less than this.accuracy, then target takes damage equal
    //to this objects firepower
    fire(target){
        if(Math.random() < this.accuracy){
            target.takeDamage(this.firepower);
        }

    }

    //takeDamange equal to the firepower going against
    takeDamage(firepower){
            this.shiphull -= firepower;

    }

}//end Ship class

// The alien ships should each have the following ranged properties determined randomly:

// hull - between 3and 6
// firepower - between 2and 4
// accuracy - between .6and .8

class Aliens{
    constructor(){
        this.ships = [];
    }

    addAliens(){
        let numAliens = 6;

        for(let i = 0; i < numAliens; i++){
            let shiphull = Math.floor(Math.random()*(7-3))+3;
            let firepower= Math.floor(Math.random()*(5-2))+2;
            let accuracy = (Math.random()*(.8-.6)+.6).toFixed(1);
            let newAlienShip = new Ship(shiphull, firepower, accuracy);
            this.ships.push(newAlienShip);

        }
    }//add Aliens
}//end Aliens class

//if extending alien based on ship options
//super(Math.floor(Math.random()*(7-3))+3, Math.floor(Math.random()*(5-2))+2, (Math.random()*(.8-.6))+.6);
//(Math.floor(Math.random()*(8.1-6))+1)/10
//(Math.random()*(.8-.6))+.6

//Understanding Math.random() lecture review
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// let randomNum0 = Math.floor(Math.random()*((11 - 1) + 1));
// console.log(randomNum0);

// //same result below by adding 1 ouside of Math.floor
// let randomNum1 = Math.floor(Math.random()*10)+1;
// console.log(randomNum1);

//ship images
/* <img src="imgs/enemy_ship.png">
<img src="imgs/enemy_ship_dead.png">
<img src="imgs/USS_Ship.png"> */


const maverick = new Ship(20, 5, .7);

const alienShips = new Aliens();
alienShips.addAliens();

const startButton = document.getElementById("start-game");
//message on result of battle
const message = document.getElementById("message");
//images on screen
const enemyIntact = document.getElementById("untouched");
const enemyDestroyed = document.getElementById("destroyed");
const ship = document.getElementById("ship");

//counts to display on screen
let roundCount = 0;
const rounds = Array.from(document.getElementsByClassName("round-count"));

let mavWinCount = 0;
const mavWins = document.getElementById("mav-wins");
let enemiesDestroyed = 0;
const enemiesDown = document.getElementById("enemies-down");

const attackAliens = () => {
    let enemyFleet = alienShips.ships;
    let loseGameMessage = "The Maverick hath been Defeated!  The Universe is lost- Game Over";
    let winGameMessage = "The Maverick has been victorious!  They have saved the Universe from the enemy alien scourge!!!!!";
    console.log(enemyFleet);
    mavWins.innerHTML=mavWinCount;
    enemiesDestroyed = 0;
    enemiesDown.innerHTML = enemiesDestroyed;
   
    for(let i = 0; i < enemyFleet.length; i++){
        //alert(`The health of the Maverick Shiphull is: ${maverick.shiphull}
        //They are fighting Enemy Alien Battleship ${i+1}!`);
        message.innerHTML = `The health of the Maverick Shiphull is: ${maverick.shiphull}
        //They are fighting Enemy Alien Battleship ${i+1}!`;
        //check if ship is destoryed, if not keep fighting, if so, end game
        if(maverick.shiphull<=0){
            console.log(loseGameMessage);
            //alert(loseGameMessage);
            message.innerHTML = loseGameMessage;
            ship.style.width = "0%";
            ship.style.transition = "width 2s"
            loseGameMessage = "";
            break;

        } 

        while(maverick.shiphull > 0 && enemyFleet[i].shiphull > 0){
            console.log(`The current health of the Maverick's shiphull is ${maverick.shiphull}`);
            maverick.fire(enemyFleet[i]);
            //final self destruct attack in case an enemy is already downed
            enemyFleet[i].fire(maverick);
            console.log("_____________________________");
            
        
            if(enemyFleet[i].shiphull <= 0){
                console.log("Alien Ship " + (i+1) + " has been destroyed!!!!");
                enemiesDestroyed+=1;
                enemiesDown.innerHTML = enemiesDestroyed;

                break;
            }
        }//end while loop


    }//end for loop

    //congradulations output if maverick.shiphull is greater than zero
    if(maverick.shiphull > 0){
        console.log(winGameMessage);
        message.innerHTML = winGameMessage;
        enemyIntact.style.display = "none";
        enemyDestroyed.style.display = "block";
        mavWinCount+=1;
        mavWins.innerHTML=mavWinCount;
        enemiesDown.innerHTML = enemiesDestroyed;

        
    } else{
        //else if maverick.shipfull < 0 and the loseGameMessage is not empty (if empty this message was shown via the for loop)
        //give lose message
        if(loseGameMessage != ""){
            console.log(loseGameMessage);
            message.innerHTML = loseGameMessage;
           
            //shrink the ship over 2s
            ship.style.width = "0%";
            ship.style.transition = "width 2s"

            //reference on transition: https://developer.mozilla.org/en-US/docs/Web/CSS/transition

            //alert(loseGameMessage);
        }
    }//if else

    //in case of a tie
    if(enemiesDestroyed === 6 && maverick.shiphull<=0){
        message.innerHTML = "The Maverick fought till the end to save the Universe, a hero\'s send off...";
        enemyIntact.style.display = "none";
        enemyDestroyed.style.display = "block";
        //shrink the ship over 2s
        mavWinCount+=1;
        mavWins.innerHTML=mavWinCount;
        ship.style.width = "0%";
        ship.style.transition = "width 2s"
       

    }

}//attackAliens

startButton.addEventListener("click", (event) => {
    roundCount+=1;
    rounds.forEach(round => {
        round.innerHTML = roundCount;
        
    });

    console.log(event.target);
    //set some initial conditions before attackAliens so that the pictures are correct with 
    //further button presses post count #1
    enemyIntact.style.display = "block";
    enemyDestroyed.style.display = "none";
    ship.style.width = "100%";

    attackAliens();

    //reset initial conditions to prepare for further clicks
    //of the button
    maverick.shiphull = 20;
    alienShips.ships = [];
    alienShips.addAliens();

   

});//end startButton addEventListener

// //fix for the single button to play the game
// //and reload the page option location.reload()
// //for the startButton

// //create a variable outside of the event listener
// //to test if need to attackAliens or reload() the page
// let count = 0;
// startButton.addEventListener("click", (event) => {
//     //if count ===0 then attackAliens()
//     //increment count so that count = 1, so that next
//     //button click, it will reload() the page
//     if(count === 0){
//         attackAliens();
//         count++;
//     } else{
//         //reloads() the page because count = 1
//         //however, next count--, so that next time
//         //the button is clicked
//         //attackAliens is called because count = 0
//         count--;
//         location.reload();
       
//     }
// });//end startButton addEventListener

console.log(maverick);