var repeat = true;
//asks whether or not you want to play again
while(repeat){
    //initializes player
    var playerName = window.prompt("Name your gladiator!", "");
    console.log(playerName);
    var playerHealth = 100;
    var playerAttack = 10;
    var playerMoney = 10;

    //initializes attacker
    var attackerNames = ["Roberto", "Bender", "C3-P0"];
    //commences fight
    for(var i=0; i<3; i++){
        var attackerHealth = 50;
        var attackerAttack = 12;
        fight(attackerNames[i]);
    }
    //propmpt user for repeat answer
    repeat = window.confirm("Another round?!");
}
//supposed to close tab but doesnt
window.close();

function fight(attacker){
    window.alert("Welcome to the robot gladitorial arena!");
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
            var confirm = window.prompt("Are you sure you want to skip? There will be a 2 gold penaly. (Yes or y for yes, anything else for no): ");
            confirm = confirm.toLowerCase();
            if(confirm === "yes" || confirm === "y"){
                window.alert("You have chosen to skip this fight!");
                playerMoney -= 2;
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
    } else{
        window.alert("You Lose!");
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