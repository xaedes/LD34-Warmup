'use strict';

define(['phaser','components/entity','components/flying'], function(Phaser,Entity,Flying) {
    function Bullet(game) {
        // super constructor
        Phaser.Sprite.call(this, game, 0, 0, 'bullets', 0);

        Phaser.Utils.mixinPrototype(this,Entity.prototype);
        Entity.call(this);


        this.frame_rate = 8;
        this.animations.add("bullet",[0],this.frame_rate,true);
        this.manage_animation();

        // crisp pixels
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.anchor.set(0.5);

        this.speed = 128.;
        this.last_time = this.game.time.time;



        this.exists = false;
    };

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.reset_reusable = function () {
        this.exists = true;
        this.animations.stop(null,false);
        return this;
    };

    Bullet.prototype.manage_animation = function () {
        this.animations.play("bullet");
    };

    Bullet.prototype.fire = function (target_x, target_y, callback, callback_obj) {
        this.addComponent(new Flying(this)).start(target_x, target_y).onComplete.addOnce(function(){
            callback.call(callback_obj,this,target_x,target_y);
            this.exists = false;
        },this);

        return this;
    };

    Bullet.prototype.update = function () {
        this.updateComponents();
    }

    return Bullet;
});
