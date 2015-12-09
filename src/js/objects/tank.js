'use strict';

define(['phaser'], function(Phase) {
    function Tank(game, x, y) {
        // super constructor
        // game, parent, name, addToStage, enableBody, physicsBodyType
        Phaser.Group.call(this, game, game.world, 'tank', true, true, Phaser.Physics.ARCADE);
        // Phaser.Group.call(this, game, game.world, 'tank', false, true, Phaser.Physics.ARCADE);

        this.frame_rate = 2;
        this.sprite = new Phaser.Sprite(game, x, y, 'tank', 0);
        this.add(this.sprite);
        this.sprite.animations.add("down",[0,1],this.frame_rate,true);
        this.sprite.animations.add("down-shoot",[0,7],this.frame_rate,true);
        this.sprite.animations.add("left",[2,3],this.frame_rate,true);
        this.sprite.animations.add("left-shoot",[2,9],this.frame_rate,true);
        this.sprite.animations.add("right",[4,5],this.frame_rate,true);
        this.sprite.animations.add("right-shoot",[4,8],this.frame_rate,true);
        this.sprite.animations.add("up",[10,11],this.frame_rate,true);
        this.sprite.animations.add("up-shoot",[10,6],this.frame_rate,true);
        this.facing = "right"
        this.shooting = false;
        this.moving = false;
        this.face("right");

        // crisp pixels
        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.sprite.anchor.set(0.5);

    };

    Tank.prototype = Object.create(Phaser.Group.prototype);
    Tank.prototype.constructor = Tank;

    Tank.prototype.current_animation_name = function () {
        var frame = this.facing;
        if(this.shooting){
            frame += "-shoot";
        }
        return frame;
    };

    Tank.prototype.manage_animation = function () {
        var frame = this.current_animation_name();
        this.sprite.animations.play(frame);
        if(!this.moving){
            this.sprite.animations.stop();
        }
    };

    Tank.prototype.face = function (direction) {
        if (["down","right","left","up"].indexOf(direction) != -1){
            this.facing = direction;
            this.manage_animation();
        }
    };



    // Tank.prototype.update = function () {
    // };

    return Tank;
});
