/**
 * Created by stryker on 2014.03.05..
 */
define(['module/HUD'],function(HUD){

    //Private variables
    var _game = null;
    //var _alienGroups = [];
    var _playerShip = null;

    //Private class
    //This is a wrapper for the aliengroup
    //Instead of extending Phaser group, i wrap it up in a class
    var _Aliens = function(configuration){
        var _alienGroup = _game.add.group(),
            _cols = configuration.cols,
            _rows = configuration.rows,
            _scoreValue = configuration.scoreValue,
            _firingTime = configuration.firingTime,
            _bulletSpeed = configuration.bulletSpeed,
            _health = configuration.health,
            _easing = configuration.easing,
            _alien = null,
            _tween = null,
            _bulletGroup = null,
            _bullet = null,
            _explosionGroup = null,
            _explosion = null,
            _livingAlien = [],
            _randomAlienIndex = null,
            _shooter = null,
            _shootingEvent = null;            

        _alienGroup.enableBody = true;
        _alienGroup.physicsBodyType = Phaser.Physics.ARCADE;
        _createAllienGroup();

        function _createAllienGroup(){
            //making aliens
            for(var i=0;i < _cols;i++){
                for(var j=0; j < _rows;j++){
                    _alien = _alienGroup.create(i * 48, j * 50, 'invader');

                    //custome properties
                    _alien.health = _health;
                    _alien.myScore = _scoreValue;

                    _alien.anchor.setTo(0.5, 0.5);
                    _alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                    _alien.play('fly');
                    _alien.body.moves = false;
                }
            }
                       

            //setting aliens postition
            _alienGroup.x = 100;
            _alienGroup.y = 50;

            //  All this does is basically start the invaders moving.
            _tween = _game.add.tween(_alienGroup).to( { x: 200 }, 2000, _easing, true, 0, 1000, true);
           
        }



        var _fireBullet = function(){
            _bullet = _bulletGroup.getFirstExists(false);
            
            _livingAlien = [];
            
            _alienGroup.forEachAlive(function(alien){
                _livingAlien.push(alien);
            });
                        
            if(_bullet && _livingAlien.length > 0){

                //_bullet.lifespan = _game.height / (_bulletSpeed/1000);
                _bullet.checkWorldBounds = true;
                
                _randomAlienIndex = _game.rnd.integerInRange(0,_livingAlien.length);

                _shooter = _livingAlien[_randomAlienIndex];
                
                if(_shooter){
                    _bullet.reset(_shooter.body.x,_shooter.body.y);

                    _game.physics.arcade.moveToObject(_bullet,_playerShip,_bulletSpeed);
                }
            //all alien died
            }else if(_livingAlien.length == 0){
                _game.state.start('End');
            }

        };

        var _collisionHandler = function(bullet, alien){

            alien.damage(bullet.bulletDamage);
            bullet.kill();
            
            if(alien.health == 0){
                _explosion = _explosionGroup.getFirstExists(false);
                _explosion.reset(alien.body.x,alien.body.y);
                _explosion.play('kaboom',30,false,true);
            }

            HUD.updateScoreText(alien.myScore);
        };

        //Public functions
        return{
            setBulletGroup: function(bullets){
                _bulletGroup = bullets.getBulletGroup();
            },
            getBulletGroup: function(){
                return _bulletGroup;
            },
            setExplosionGroup: function(explosions){
                _explosionGroup = explosions.getExplosionGroup();
            },
            startShooting: function(){
                _shootingEvent = _game.time.events.loop(_firingTime,_fireBullet,this);
            },
            stopShooting: function(){
                _game.time.events.remove(_shootingEvent);
            },
            createOverLap: function(bulletGroup){
                _game.physics.arcade.overlap(bulletGroup, _alienGroup, _collisionHandler, null, this);
            },
            getAlienGroup: function(){
                return _alienGroup;
            }

        }

    };//End of _Aliens

    //Public functions
    return{
        init: function(game){
            _game = game;
        },
        preload: function(){
            _game.load.spritesheet('invader', 'assets/img/invader32x32x4.png', 32, 32);
        },
        create: function(configuration){
            return( new _Aliens(configuration) );
        },                
        setPlayerShip: function(playerShip){
            _playerShip = playerShip;
        }
    }
});