/**
 * Created by stryker on 2014.03.05..
 * Player module
 */
define(['module/HUD'],function(HUD){

    //Private Variables
    var _game = null,
        _health = null,
        _lives = null,
        _score = null,
        _firingTime = null,
        _ship = null,
        _cursors = null,
        _bulletGroup = null,
        _bullet = null,
        _explosionGroup = null,
        _explosion = null,
        _alienGroup = null,
        _aliens = null,
        _shootingEvent = null,
        _bulletSpeed = null;

    var _fireBullet = function(){
        _bullet = _bulletGroup.getFirstExists(false);

        if(_bullet){
            //_bullet.lifespan = _game.height / (_bulletSpeed/1000);
            _bullet.checkWorldBounds = true;
            _bullet.reset(_ship.x,_ship.y+8);
            _bullet.body.velocity.y = -_bulletSpeed;
        }
    };

    var _collisionHandler = function(ship,bullet){

        ship.damage(bullet.bulletDamage);

        bullet.kill();
        HUD.updateHealthText(ship.health);
        
        //ship lose a life
        if(ship.health == 0){            
            this.stopShooting();
            _explosion = _explosionGroup.getFirstExists(false);
            _explosion.reset(_ship.body.x,_ship.body.y);
            _explosion.play('kaboom',30,false,true);
            
            _lives--;
            HUD.updateLivesText(_lives);
            
            //lose life
            if(_lives > 0){                
                ship.revive(_health);
                this.startShooting();
            //dead
            }else{
                _game.state.start('End');
            }
        }

    };

    return{
        init: function(game){
            _game = game;            
        },
        preload: function(){
            _game.load.image('ship', 'assets/img/player.png');
        },
        create: function(configuration){
            _ship = _game.add.sprite(400,500,'ship');
            _ship.anchor.setTo(0.5,0.5);
            _game.physics.enable(_ship,Phaser.Physics.ARCADE);
            _ship.body.collideWorldBounds = true;
            _ship.health = configuration.health;
            _health = configuration.health;
            _lives = configuration.lives;
            _score = configuration.score;
            _firingTime = configuration.firingTime;
            _bulletSpeed = configuration.bulletSpeed;

            _cursors = _game.input.keyboard.createCursorKeys();
        },
        update: function(){
            _ship.body.velocity.setTo(0,0);

            if(_cursors.left.isDown){
                _ship.body.velocity.x = -200;
            }else if(_cursors.right.isDown){
                _ship.body.velocity.x = 200;
            }
        },
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
        getPlayerShip: function(){
            return _ship;
        },
        createOverLap: function(bulletGroup){
            _game.physics.arcade.overlap(_ship,bulletGroup,_collisionHandler,null,this);
        },
        setAliensAndAlienGroup: function(aliens){
            _aliens = aliens;
            _alienGroup=aliens.getAlienGroup();
        }
    }
});