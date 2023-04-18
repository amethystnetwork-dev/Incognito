/**
 * Created by stryker on 2014.03.05..
 */
define(function(){
    var _game = null;

    var _Bullets = function(quantity,type,damage){
        var _bulletGroup = _game.add.group();
        _bulletGroup.enableBody = true;
        _bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        _bulletGroup.createMultiple(quantity,type);
        _bulletGroup.setAll('anchor.x',0.5);
        _bulletGroup.setAll('anchor.y',1);
        _bulletGroup.setAll('outOfBoundsKill',true);

        //costume property
        _bulletGroup.setAll('bulletDamage',damage);

        return{
            getBulletGroup : function(){
                return _bulletGroup;
            }
        }

    };

    return{
        init: function(game){
            _game = game;
        },
        preload: function(){
            _game.load.image('bullet','assets/img/bullet.png');
            _game.load.image('enemyBullet','assets/img/enemy-bullet.png');
        },
        create: function(quantity,type,damage){
            return( new _Bullets(quantity,type,damage) );
        }
    }
});