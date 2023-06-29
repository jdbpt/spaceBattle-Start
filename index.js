class Ship{
    constructor(shiphull, firepower, accuracy){
        this.shiphull = shiphull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    fire(target){
        if(Math.random() < this.accuracy){
            target.takeDamage();
        }

    }

    takeDamage(name){
        if(this.shiphull >= 0){
            this.shiphull -= this.firepower;
        console.log(name + " took " + this.firepower + " of damage!");
        } else{
            console.log(name + " has been destroyed!");
        }    

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
            let accuracy = (Math.random()*(.8-.6))+.6;
            let newAlienShip = new Ship(shiphull, firepower, accuracy);
            this.ships.push(newAlienShip);

        }
    }
}//end Aliens class

//if extending alien based on ship options
//super(Math.floor(Math.random()*(7-3))+3, Math.floor(Math.random()*(5-2))+2, (Math.random()*(.8-.6))+.6);
//(Math.floor(Math.random()*(9-6))+1)/10
//(Math.random()*(.8-.6))+.6

class Battle{
    //handles the battles
}//end Battle class

class Game{
    //handles the game, calls the Battle

}//end Game class


//Understanding Math.random() lecture review
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// let randomNum0 = Math.floor(Math.random()*((11 - 1) + 1));
// console.log(randomNum0);

// //same result below by adding 1 ouside of Math.floor
// let randomNum1 = Math.floor(Math.random()*10)+1;
// console.log(randomNum1);

const maverick = new Ship(20, 5, .7);
console.log(maverick);

const alienShips = new Aliens();
alienShips.addAliens();
console.log(alienShips);

