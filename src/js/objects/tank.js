'use strict';

define(['phaser'], function(Phase) {
    function Tank(game, x, y) {
        // super constructor
        // game, parent, name, addToStage, enableBody, physicsBodyType
        // Phaser.Group.call(this, game, game.world, 'tank', true, true, Phaser.Physics.ARCADE);
        Phaser.Sprite.call(this, game, x, y, 'tank', 0);
        // Phaser.Group.call(this, game, game.world, 'tank', false, true, Phaser.Physics.ARCADE);

        this.frame_rate = 8;
        this.animations.add("down",[0,1],this.frame_rate,true);
        this.animations.add("down-shoot",[0,7],this.frame_rate,true);
        this.animations.add("left",[2,3],this.frame_rate,true);
        this.animations.add("left-shoot",[2,9],this.frame_rate,true);
        this.animations.add("right",[4,5],this.frame_rate,true);
        this.animations.add("right-shoot",[4,8],this.frame_rate,true);
        this.animations.add("up",[10,11],this.frame_rate,true);
        this.animations.add("up-shoot",[10,6],this.frame_rate,true);
        this._facing = "right"
        this._shooting = false;
        this._moving = false;
        this.manage_animation();

        // crisp pixels
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.anchor.set(0.5);

        this.speed = 32;

        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
    };

    Tank.prototype = Object.create(Phaser.Sprite.prototype);
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
        this.animations.play(frame);
        if(!this.moving){
            this.animations.stop();
        }
    };

    Tank.prototype.move = function (direction) {
        this.body.velocity.set(0);
        if (direction == "left") {
            this.facing = direction;
            this.moving = true;
            this.body.velocity.x = -this.speed;
        }
        else if (direction == "right") {
            this.facing = direction;
            this.moving = true;
            this.body.velocity.x = +this.speed;
        }
        else if (direction == "up") {
            this.facing = direction;
            this.moving = true;
            this.body.velocity.y = -this.speed;
        }
        else if (direction == "down") {
            this.facing = direction;
            this.moving = true;
            this.body.velocity.y = +this.speed;
        }
    };
    Tank.prototype.rest = function () {
        this.body.velocity.set(0);
        this.moving = false;
    }

    // Tank.prototype.update = function () {
    // };

    return Tank;
});
