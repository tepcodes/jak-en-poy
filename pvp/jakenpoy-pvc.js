//Goal of game
    //Hit the opponent until his HP reaches 0.
//Rules of game
    //Each player starts with 50 HP.
    //The round starts by selecting an action.
    //Based on the action chosen, damage calculation takes place.
    //The first player to reach 0 HP loses.
    //The game ends when a player has 0 HP.
//Main game logic
    //Players
        //User is the user.
        //Computer is the computer.
    //Each action corresponds to a change in HP:
        //Attack - deals 10 dagame to opponent's HP.
        //Defend - negates any changes to your HP.
        //Heal - adds 5 to your HP.
    //User selects an action.
        //User clicks a button for the action.
    //Computer selects an action.        
        //Random selection via Math.random()
    //Damage calculation (player, action):
        //User Attack && Computer Attack
            //User -10 HP, Computer -10 HP.
        //User Attack && Computer Defend
        //User Defend && Computer Attack
        //User Defend && Computer Defend
            //No HP change.
        //User Attack && Computer Heal
            //User no change HP, Computer -10 HP +5 HP.
        //User Defend && Computer Heal
            //User no change HP, Computer +5 HP.
        //User Heal && Computer Attack
            //User +5 HP -10 HP, Computer no change HP.
        //User Heal && Computer Defend
            //User +5 HP, Computer no change HP.
        //User Heal && Computer Heal
            //User +5 HP, Computer +5 HP.
    //Game result
        //If User HP <= 0 && Computer HP <= 0 "Draw!"
        //If User HP > 0 && Computer HP <= 0 "You win!"
        //If User HP <= 0 && Computer HP > 0 "Computer wins!"
    //Reset game
        //If game result is displayed, disable all the action buttons and enable the restart game button.
//Display message
    //Display actions taken ("User (action)).
    //Display damage calcutaion.
    //Display remaining HP.
    //Display result.


//