
function startGame(){
    var playerName = window.prompt("Name your gladiator!", "");
    console.log(playerName);
    var attackerNames = ["Roberto", "Bender", "C3-P0"];
    var playerHealth = randomNumber(70, 110);
    var playerAttack = randomNumber(8, 13);
    var playerMoney = 10;
    var playerAlive = true;
    var shopChoice = 1;
    var attackerHealth = randomNumber(40, 70);
    var attackerAttack = randomNumber(10, 15);
    //commences fight
    for(var i=0; i<attackerNames.length; i++){
        if(!playerAlive) break;
        shopChoice = 1;
        if(i>0){
            while(shopChoice != "3"){
                shopChoice = window.prompt("Welcome to the shop, You can 1.Refill: 10 gold, 2.Upgrade: 20 gold, 3.Leave\n\nYour gold: "+ playerMoney +"\n\nEnter 1, 2, or 3:");
                while(shopChoice != 1 && shopChoice != 2 && shopChoice != 3) shopChoice = window.prompt("ERROR: Invalid selection, your selection, " + shopChoice + ". Acceptable selections are 1, 2, 3.\n\nWelcome to the shop, You can 1.Refill: 10 gold, 2.Upgrade: 20 gold, 3.Leave\n\nYour gold: "+ playerMoney +"\n\nEnter 1, 2, or 3:");
                switch(shopChoice){
                    case "1":     if(playerMoney <10){
                                    window.alert("You don't have enough money for this. Continuing to the next match.\n\nGood luck, Pit Dog");
                                    shopChoice = "3";
                                    break;
                                }
                                if((playerHealth += 30) > 100) playerHealth = 100;
                                else playerHealth +=30;
                                playerMoney -= 10;
                                break;
                    
                    case "2":     
                                if(playerMoney <20){
                                    if(playerMoney <10){
                                        window.alert("You don't have enough money for this. Continuing to the next match.\n\nGood luck, Pit Dog");
                                        shopChoice = "3";
                                        break;
                                    }
                                    window.alert("You don't have enough money for this.\n\nGood luck, Pit Dog");
                                    break;

                                }
                                playerAttack += 3;
                                playerMoney -= 20;
                    
                    default:     break;
                }
            }
            
        }
        window.alert("Welcome to the robot gladitorial arena!\n\nRound " + (i+1) + " of " + attackerNames.length + "!\n\nFight!");
        var playerStats = fight(attackerNames[i], attackerHealth, attackerAttack, playerAlive, playerAttack, playerHealth, playerName, playerMoney);
        playerHealth = playerStats[0];
        attackerAttack = playerStats[1];
        playerMoney = playerStats[2];
        playerAlive = playerStats[3];
    }
    if(i == attackerNames.length && playerAlive == true) window.alert("Congratulations, Grand Champion of The Arena!!!");
    var repeat = window.confirm("Play again?!");
    if(repeat) startGame();
}

function fight(attacker, attackerHealth, attackerAttack, playerAlive, playerAttack, playerHealth, playerName, playerMoney){
    var healths;
    //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    while(attackerHealth > 0 && playerHealth > 0){
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
            if(playerMoney <= 0) window.alert("You have no money to left!\n\nBack to the fight with you, Pit Dog!")
            else if(confirm){
                        window.alert("You have chosen to skip this fight!");
                        playerMoney -= 10;
                        window.alert("You lost 10 gold!");
                        continue;
            }
            
            healths = attack(attacker, attackerAttack, attackerHealth, playerHealth, playerName, playerAttack);
            attackerHealth = healths[0];
            playerHealth = healths[1];
        }
        else{
            healths = attack(attacker, attackerAttack, attackerHealth, playerHealth, playerName, playerAttack);
            attackerHealth = healths[0];
            playerHealth = healths[1];
        }
    }
    if(playerHealth > 0){
        window.alert(playerName + " Wins!");
        playerMoney += 20;
        window.alert("You gained 20 gold!");
        return [playerHealth, playerAttack, playerMoney, playerAlive];
    } else{
        window.alert("You Lose!");
        playerAlive = false;
        return [playerHealth, playerAttack, playerMoney, playerAlive];
    }
}

//employing DRY
function attack(attacker, attackerAttack, attackerHealth, playerHealth, playerName, playerAttack){
    if((attackerHealth-playerAttack) < 0) attackerHealth = 0;
    else {
        var damage = randomNumber(playerAttack-3, playerAttack);
        attackerHealth -= Math.max(0, damage);
    }
    // Log a resulting message to the console so we know that it worked.
    window.alert(attacker + "'s Health: " + attackerHealth + ", decreased by " + playerAttack + " from " + (attackerHealth+playerAttack));
    if(attackerHealth === 0){
        window.alert(attacker + " has died!");
        //kills while loop
        return [attackerHealth, playerHealth];
    }
    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    if((playerHealth-attackerAttack) < 0) playerHealth = 0;
    else {
        var damage = randomNumber(attackerAttack-3, attackerAttack);
        playerHealth -= Math.max(0, damage);
    }
    // Log a resulting message to the console so we know that it worked.
    window.alert(playerName + "'s Health: " + playerHealth + ", decreased by " + attackerAttack + " from " + (playerHealth+attackerAttack));
    if(playerHealth === 0){
        window.alert(playerName + " has died!");
   }
   return [attackerHealth, playerHealth];
}

function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

startGame();