'use strict';

define(['objects/tanks','objects/tank','objects/bullseye', 'objects/ui'], function(Tanks,Tank,Bullseye,Ui) {
    function GameplayState() {}

    GameplayState.prototype = {
        create: function() {
            // add tank
            // control tank with wasd and with arrows
            // add mouse controlled bullseye
            // click causes tank to shoot
            // bullet flies in parable, height causes upscaling, simply use tween?
            this.tanks = new Tanks(this.game);
            this.ui = new Ui(this.game);
            this.bullseye = new Bullseye(this.game,0,0);
            this.ui.add(this.bullseye);
            this.tank = this.tanks.add_tank(100,100);

            this.cursors = this.input.keyboard.createCursorKeys();
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

            // if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //     this.weapons[this.currentWeapon].fire(this.player);
            // }
            this.bullseye.x = this.game.input.x;
            this.bullseye.y = this.game.input.y;
        }
    };

    return GameplayState;
});
