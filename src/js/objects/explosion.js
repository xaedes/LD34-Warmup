'use strict';

define(['phaser'], function(Phase) {
    function Explosion(game, x, y, rotation) {
        // super constructor
        Phaser.Sprite.call(this, game, x, y, 'explosion', 0);

        this.frame_rate = 8;
        this.rotation = rotation;
        this.animations.add("explosion",[0,1,2,3,4],this.frame_rate,true);

        // crisp pixels
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.anchor.set(0.5);

        this.animations.play("explosion",null,false,true);
    };

    Explosion.prototype = Object.create(Phaser.Sprite.prototype);
    Explosion.prototype.constructor = Explosion;

    return Explosion;
});
