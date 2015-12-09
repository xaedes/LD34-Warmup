'use strict';

define(['phaser'], function(Phase) {
    function Bullseye(game, x, y) {
        // super constructor
        Phaser.Sprite.call(this, game, x, y, 'bullseye', 0);

        this.frame_rate = 8;
        this.animations.add("bullseye",[0],this.frame_rate,true);
        this.animations.add("bullseye2",[1],this.frame_rate,true);
        this.manage_animation();

        // crisp pixels
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.anchor.set(0.5);

    };

    Bullseye.prototype = Object.create(Phaser.Sprite.prototype);
    Bullseye.prototype.constructor = Bullseye;

    Bullseye.prototype.manage_animation = function () {
        this.animations.play("bullseye");
        this.animations.stop();
    };

    // Bullseye.prototype.update = function () {
    // };

    return Bullseye;
});
