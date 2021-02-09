var repeat = true;
//asks whether or not you want to play again
while(repeat){
    //initializes player
    var playerName = window.prompt("Name your gladiator!", "");
    console.log(playerName);
    var playerHealth = 100;
    var playerAttack = 10;
    var playerMoney = 10;
    var playerAlive = true;

    //initializes attacker
    var attackerNames = ["Roberto", "Bender", "C3-P0"];
    //commences fight
    for(var i=0; i<3; i++){
        if(!playerAlive) break;
        var attackerHealth = 50;
        var attackerAttack = 12;
        window.alert("Welcome to the robot gladitorial arena!\n\nRound " + (i+1) + " of " + attackerNames.length + "!\n\nFight!");
        fight(attackerNames[i], i+1, attackerNames.length);
    }
    //propmpt user for repeat answer
    repeat = window.confirm("Another round?!");
}
//supposed to close tab but doesnt
window.close();

function fight(attacker){
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
            
            attack(attacker);
        }
        else{
            attack(attacker);
        }
    }
    if(playerHealth > 0){
        window.alert(playerName + " Wins!");
        playerMoney += 20;
        window.alert("You gained 20 gold!");
    } else{
        window.alert("You Lose!");
        playerAlive = false;
    }
}

//employing DRY
function attack(attacker){
    attackerHealth -= playerAttack;
    // Log a resulting message to the console so we know that it worked.
    window.alert(attacker + "'s Health: " + attackerHealth + ", decreased by " + playerAttack + " from " + (attackerHealth+playerAttack));
    if(attackerHealth === 0){
        window.alert(attacker + " has died!");
        //kills while loop
        return;
    }
    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    playerHealth -= attackerAttack;
    // Log a resulting message to the console so we know that it worked.
    window.alert(playerName + "'s Health: " + playerHealth + ", decreased by " + attackerAttack + " from " + (playerHealth+attackerAttack));
    if(playerHealth === 0){
        window.alert(playerName + " has died!");
    }
}