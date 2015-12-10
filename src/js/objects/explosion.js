'use strict';

define(['phaser'], function(Phase) {
    function Explosion(game) {
        // super constructor
        Phaser.Sprite.call(this, game, 0, 0, 'explosion', 0);

        this.frame_rate = 8;
        this.animations.add("explosion",[0,1,2,3,4],this.frame_rate,false);

        // crisp pixels
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.anchor.set(0.5);

        this.animations.play("explosion",null,false,false);
    };

    Explosion.prototype = Object.create(Phaser.Sprite.prototype);
    Explosion.prototype.constructor = Explosion;

    Explosion.prototype.reset_reusable = function () {
        this.exists = true;
        this.animations.stop("explosion",false);
        this.animations.currentAnim.onComplete.addOnce(function(){
            this.exists = false;
            console.log(1);
            // this.animations.currentAnim.setFrame(0);
        }, this);
        return this;
    };

    return Explosion;
});
