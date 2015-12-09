'use strict';

define(['phaser'], function(Phase) {
    function Tank(game, x, y) {
        // super constructor
        // game, parent, name, addToStage, enableBody, physicsBodyType
        Phaser.Group.call(this, game, game.world, 'tank', true, true, Phaser.Physics.ARCADE);
        // Phaser.Group.call(this, game, game.world, 'tank', false, true, Phaser.Physics.ARCADE);

        this.frame_rate = 8;
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
        this._facing = "right"
        this._shooting = false;
        this._moving = false;
        this.manage_animation();

        // crisp pixels
        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.sprite.anchor.set(0.5);

    };

    Tank.prototype = Object.create(Phaser.Group.prototype);
    Tank.prototype.constructor = Tank;

    Object.defineProperty(Tank.prototype, "moving", {
        get: function () {
            return this._moving;
        },
        set: function (value) {
            this._moving = value;
            this.manage_animation();
        }
    });
    Object.defineProperty(Tank.prototype, "shooting", {
        get: function () {
            return this._shooting;
        },
        set: function (value) {
            this._shooting = value;
            this.manage_animation();
        }
    });
    Object.defineProperty(Tank.prototype, "facing", {
        get: function () {
            return this._facing;
        },
        set: function (value) {
            if (["down","right","left","up"].indexOf(value) != -1){
                this._facing = value;
                this.manage_animation();
            }
        }
    });


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

    // Tank.prototype.update = function () {
    // };

    return Tank;
});
