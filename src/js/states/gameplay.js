'use strict';

define(['objects/tanks','objects/tank','objects/bullseye', 'objects/ui', 'objects/bullets', 'objects/explosions'], 
    function(Tanks,Tank,Bullseye,Ui,Bullets,Explosions) {
    function GameplayState() {}

    GameplayState.prototype = {
        create: function() {
            // add tank
            // control tank with wasd and with arrows
            // add mouse controlled bullseye
            // click causes tank to shoot
            // bullet flies in parable, height causes upscaling, simply use tween?
            // add explosions when bullets land
            this.world.scale.set(2);
            this.tanks = new Tanks(this.game);
            this.bullets = new Bullets(this.game);
            this.explosions = new Explosions(this.game);
            this.ui = new Ui(this.game);
            this.bullseye = new Bullseye(this.game,0,0);
            this.ui.add(this.bullseye);
            this.tank = this.tanks.add_tank(100,100);

            this.cursors = this.input.keyboard.createCursorKeys();

            this.fire_interval = 100;
            this.last_fire_time = this.game.time.time;
        },

        update: function() {
            if (this.cursors.left.isDown) {
                this.tank.move("left");
            }
            else if (this.cursors.right.isDown) {
                this.tank.move("right");
            }
            else if (this.cursors.up.isDown) {
                this.tank.move("up");
            }
            else if (this.cursors.down.isDown) {
                this.tank.move("down");
            } else {
                this.tank.rest();
            }
            if(this.game.input.mousePointer.isDown){
                this.tank.face_turret(this.game.input.x/2, this.game.input.y/2);
                this.tank.fire(function(){
                    this.bullets.add_bullet(this.tank.wheels.x,this.tank.wheels.y)
                                .fire(this.game.input.x/2, this.game.input.y/2, function(bullet,x,y){
                                    this.explosions.add_explosion(x,y,bullet.rotation);
                                }, this);
                },this);
            } else {
                this.tank.stop_fire();
            }
            // if(this.game.input.mousePointer.isDown && (this.game.time.time > this.last_fire_time + this.fire_interval) ){
                // this.last_fire_time = this.game.time.time;
            // }
            this.bullseye.x = this.game.input.x;
            this.bullseye.y = this.game.input.y;
        }
    };

    return GameplayState;
});
