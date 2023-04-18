SpaceInvaders
=============
This is a remake of the space invader phaser example, which you can find here:
http://examples.phaser.io/

This remake is made with require.js, which breaks up the code into modules.
Modules are in assets/javascript/module

Code is more organized thanks to State and Statemanager class from Phaser.
You can find the states in assets/javascript/state

I used Phaser 2.0.1(no Physics) from the Dev branch.
The dev branch has a lot of bug fixes so it's recommended to use it.

Thanks to require.js, i made an optimized version of my game,
which can be viewed with indexOpt.html. This use the "compiled" code, which can be found in assets/javascript/built

Known issue: In every new play state(after the end state) the game makes new DOM nodes.
The cause: in every cycle i make a new text to show the score.
I tried to destroy the texts but i never succeed.

You can play with it here: http://strykerkkd.github.io/SpaceInvaders/
