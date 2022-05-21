/**
 * Created by stryker on 2014.03.05..
 */
require(['state/Load','state/Start','state/Play','state/End','lib/phaser-no-physics.min'],function(Load,Start,Play,End){

    var _game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    
    //Load state
    Load.init(_game,'Start'); //args: game object, next state
    _game.state.add('Load',Load.getLoadState()); //args: state name, geting the load state
    
    //Start State
    Start.init(_game,'Play');
    _game.state.add('Start',Start.getStartState());
    
    //Play State
    Play.init(_game,'End');
    _game.state.add('Play',Play.getPlayState());
    
    //End State
    End.init(_game,'Play');
    _game.state.add('End',End.getEndState());
    
    //Starting the Load state
    _game.state.start('Load');
    
});
