/**
 * Created by stryker on 2014.03.22..
 */
define(['module/Background','module/Player','module/Aliens','module/Bullets','module/Explosions','module/HUD'],function(Background,Player,Aliens,Bullets,Explosions,HUD){
    
    var _game = null,
        _nextStage = null;
    
    //Loading State
    var _Load = {        
        preload: function(){
        
            //Background
            Background.init(_game,0,'easy');
            Background.preload();

            //Hud
            HUD.init(_game);

            //Player            
            Player.init(_game);
            Player.preload();
            
            //Aliens
            Aliens.init(_game);
            Aliens.preload();

            //Bullets
            Bullets.init(_game);
            Bullets.preload();
            
            //Exploisons
            Explosions.init(_game);
            Explosions.preload();
                
        },
        create: function(){
            _game.state.start(_nextStage);
        }
    }
    
    return{
        init: function(game,nextStage){
            _game = game;
            _nextStage = nextStage;
        },
        getLoadState: function(){
            return(_Load);
        }
        
    }
})