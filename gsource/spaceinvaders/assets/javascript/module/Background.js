/**
 * Created by stryker on 2014.03.05..
 */
define(function(){

    //Private variables
    var _game = null,
        _starfield = null;

    return{
        init: function(game,level,mode){
            _game = game;
        },
        preload: function(){
            _game.load.image('starfield', 'assets/img/starfield.png');            
        },
        create: function(){
            _starfield = _game.add.tileSprite(0, 0,800,600, 'starfield');
        },
        update: function(){
            _starfield.tilePosition.y +=2;
        }

    }
});