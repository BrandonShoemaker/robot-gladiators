
function startGame(){
    var repeat = true;
    var player = {
        name: getPlayerName(),
        health: randomNumber(70, 110),
        attack: randomNumber(8, 13),
        money: 10,
        alive: true,
        reset: function(){
            this.health = randomNumber(70, 110);
            this.attack = randomNumber(8, 13);
            this.money = 10;
            this.alive = true;
        },
        refillHealth: function(){
            if(this.money <10){
                window.alert("You don't have enough money for this. Continuing to the next match.\n\nGood luck, Pit Dog");
                shopChoice = "3";
                return;
            }
            if((this.health += 20) > 100) {
                this.health = 100;
                this.money -=10;
            }
            else {
                //does 2 +20's for some reason, don't know why, reducing to 10 to acheive outcome of healing of 20
                this.health += 10;
                this.money -= 10;
            }
        },
        increaseAttack: function(){
            if(this.money <20){
                if(this.money <10){
                    window.alert("You don't have enough money for this. Continuing to the next match.\n\nGood luck, Pit Dog");
                    shopChoice = "3";
                    return;
                }
                window.alert("You don't have enough money for this.\n\nGood luck, Pit Dog");
                return;

            }
            this.attack +=3;
            this.money -= 20;
        }
    };
    var names = ["Roberto", "Bender", "C3-P0"];
    var attackers = {
        name: "",
        health: 50,
        attack: 12
    };
    var shopChoice;
    var playerStats;

    while(repeat && player.name !== undefined && player.name !== null){
        player.reset();
        shopChoice = 1;
        //commences fight
        for(var i=0; i<names.length; i++){
            if(!player.alive) break;
            shopChoice = 1;
            if(i>0){
                while(shopChoice != "3"){

                    shopChoice = window.prompt("Welcome to the shop, You can 1.Refill: 10 gold, 2.Upgrade: 20 gold, 3.Leave\n\nYour Health: "+ player.health +
                     "\nYour Attack: " + player.attack +
                     "\nYour gold: "+ player.money +"\n\nEnter 1, 2, or 3:");

                    while(shopChoice != 1 && shopChoice != 2 && shopChoice != 3) shopChoice = window.prompt("ERROR: Invalid selection, your selection, " + shopChoice + ". Acceptable selections are 1, 2, 3.\n\nWelcome to the shop, You can 1.Refill: 10 gold, 2.Upgrade: 20 gold, 3.Leave\n\nYour gold: "+ player.money +"\n\nEnter 1, 2, or 3:");
                    switch(shopChoice){
                        case "1":   player.refillHealth();
                                    break;
                        
                        case "2":   player.increaseAttack();  
                                    
                        
                        default:     break;
                    }
                }
                
            }
            attackers.name = names[i];
            window.alert("Welcome to the robot gladitorial arena!\n\nRound " + (i+1) + " of " + names.length + "!\n\nFight!");
            attackers.health = randomNumber(40, 70);
            attackers.attack = randomNumber(10, 15);
            playerStats = fight(attackers, player);
            player = playerStats;
        }
        if(i == names.length && player.alive == true) window.alert("Congratulations, Grand Champion of The Arena!!!");
        repeat = window.confirm("Play again?!");
    }
}

function fight(attackers, player){
    var healths;
    var isPlayerTurn;
    if(Math.random() > .5) isPlayerTurn = true;
    else isPlayerTurn = false;

    //Subtract the value of `player.attack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    while(attackers.health > 0 && player.health > 0){
        //defaults to let them pick their answer
        var skip = "a";
        //controls error message prompt
        var i = 0;
        //checks valid answers
        while(skip !== "Skip" && skip !== "SKIP" && skip !== "skip" && skip!== "s" && skip !== "Fight" && skip !== "FIGHT" && skip !== "fight" && skip !== "f"){
            //if they type an incorrect value
            if(i > 0){
                skip = window.prompt("ERROR: Invalid selection, your selection, " + skip + ". Valid options are SKIP, Skip, skip, s and FIGHT, Fight, fight, f. \n\nDo You wish to FIGHT or SKIP this battle?!")
                continue;
            }
            //first round through answering, no error yet
            else{
                skip = window.prompt("Do You wish to FIGHT or SKIP this battle?!");
                //escalates to error if needed
                i++;
            }
        }
        skip = skip.toLowerCase();
        if(skip === "s" || skip === "skip"){
            var confirm = window.confirm("Are you sure you want to skip? There will be a 10 gold penalty.");
            if(player.money <= 0) window.alert("You have no money to left!\n\nBack to the fight with you, Pit Dog!")
            else if(confirm){
                        window.alert("You have chosen to skip this fight!");
                        player.money -= 10;
                        window.alert("You lost 10 gold!");
                        continue;
            }
        }
        if(isPlayerTurn){
            attackers = attackEnemy(attackers, player);
            player = attackPlayer(attackers, player);
        }
        else{
            player = attackPlayer(attackers, player);
            attackers = attackEnemy(attackers, player);
        }
    }
    if(player.health > 0){
        window.alert(player.name + " Wins!");
        player.money += 20;
        window.alert("You gained 20 gold!");
        return player;
    } else{
        window.alert("You Lose!");
        player.alive = false;
        return player;
    }
}

//employing DRY
function attackEnemy(attackers, player){

    if((attackers.health-player.attack) < 0) attackers.health = 0;
    else {
        var damage = randomNumber(player.attack-3, player.attack);
        attackers.health -= Math.max(0, damage);
    }
    // Log a resulting message to the console so we know that it worked.
    window.alert(attackers.name + "'s Health: " + attackers.health + ", decreased by " + player.attack + " from " + (attackers.health+player.attack));
    if(attackers.health === 0){
        window.alert(attackers.name + " has died!");
        //kills while loop
        return attackers;
    }
    return attackers;
}

function attackPlayer(attackers, player){
    // Subtract the value of `enemyAttack` from the value of `player.health` and use that result to update the value in the `player.health` variable.
    if((player.health-attackers.attack) < 0) player.health = 0;
    else {
        var damage = randomNumber(attackers.attack-3, attackers.attack);
        player.health -= Math.max(0, damage);
    }
    // Log a resulting message to the console so we know that it worked.
    window.alert(player.name + "'s Health: " + player.health + ", decreased by " + attackers.attack + " from " + (player.health+attackers.attack));
    if(player.health === 0){
        window.alert(player.name + " has died!");
   }
   return player;
}

function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function getPlayerName(){
    var name = window.prompt("Name your gladiator!");
    while(name === ""){
        name = window.prompt("ERROR: You must enter at least one character for your name to be valid.\n\nName your gladiator!");
    }
    return name;
}

startGame();