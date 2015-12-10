'use strict';

define(['phaser'], function(Phase) {
    function Bullet(game, x, y) {
        // super constructor
        Phaser.Sprite.call(this, game, x, y, 'bullets', 0);

        this.frame_rate = 8;
        this.animations.add("bullet",[0],this.frame_rate,true);
        this.manage_animation();

        // crisp pixels
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.anchor.set(0.5);

        this.speed = 128.;
        this.last_time = this.game.time.time;

        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
    };

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;


    Bullet.prototype.manage_animation = function () {
        this.animations.play("bullet");
    };

    Bullet.prototype.fire = function (target_x, target_y, callback, callback_obj) {
        this.target_x = target_x;
        this.target_y = target_y;
        var dx = this.target_x - this.x;
        var dy = this.target_y - this.y;
        var d = Math.sqrt(dx*dx+dy*dy);
        var dur = d / this.speed;
        console.log(dur);
        var maximum = 1+(d / 200.);
        var height_tween = this.game.add.tween(this.scale).to({x:maximum,y:maximum}, 1000 * dur / 2, "Linear");
        var height_tween_back = this.game.add.tween(this.scale).to({x:1,y:1}, 1000 * dur / 2, "Linear");
        height_tween.chain(height_tween_back);
        var alpha_tween = this.game.add.tween(this).to({alpha:0.4}, 1000 * dur / 2, "Linear");
        var alpha_tween_back = this.game.add.tween(this).to({alpha:1}, 1000 * dur / 2, "Linear");
        alpha_tween.chain(alpha_tween_back);
        var move_tween = this.game.add.tween(this)
                .to({x:this.target_x,y:this.target_y}, 1000 * dur, "Linear");
        move_tween.onComplete.add(function() {
            callback.call(callback_obj,this,this.target_x,this.target_y);
            this.destroy();
        }, this);
        alpha_tween.start();
        height_tween.start();
        move_tween.start();
        this.body.velocity.set(0);
        if(d>0){
            this.rotation = Math.atan2(dy, dx);
            this.rotation -= Math.PI/2;
            this.rotation = Math.round(this.rotation / (Math.PI/8))*(Math.PI/8);
        }
        return this;
    };

    Bullet.prototype.update = function () {
        // var dt = (this.game.time.time - this.last_time)/1000.;
        // this.last_time = this.game.time.time;
        // var dx = this.target_x - this.x;
        // var dy = this.target_y - this.y;
        // var d = Math.sqrt(dx*dx+dy*dy);

    };

    return Bullet;
});
