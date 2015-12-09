'use strict';

define(['../objects/tank'], function(Tank) {
    function GameplayState() {}

    GameplayState.prototype = {
        create: function() {
            // add tank
            // control tank with wasd and with arrows
            // add mouse controlled bullseye
            // click causes tank to shoot
            // bullet flies in parable, height causes upscaling, simply use tween?
            this.tank = new Tank(this.game, 100, 100);
            this.speed = 32;
            this.physics.arcade.enable(this.tank.sprite);
            this.tank.sprite.body.collideWorldBounds = true;

            this.cursors = this.input.keyboard.createCursorKeys();
        },

        update: function() {
            this.tank.sprite.body.velocity.set(0);
            if (this.cursors.left.isDown) {
                this.tank.facing = "left";
                this.tank.moving = true;
                this.tank.sprite.body.velocity.x = -this.speed;
            }
            else if (this.cursors.right.isDown) {
                this.tank.facing = "right";
                this.tank.moving = true;
                this.tank.sprite.body.velocity.x = +this.speed;
            }
            else if (this.cursors.up.isDown) {
                this.tank.facing = "up";
                this.tank.moving = true;
                this.tank.sprite.body.velocity.y = -this.speed;
            }
            else if (this.cursors.down.isDown) {
                this.tank.facing = "down";
                this.tank.moving = true;
                this.tank.sprite.body.velocity.y = +this.speed;
            } else {
                this.tank.moving = false;
            }

            // if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //     this.weapons[this.currentWeapon].fire(this.player);
            // }
        }
    };

    return GameplayState;
});
