'use strict';

define(['phaser'], function(Phaser) {
    function Tank(game, x, y, parent) {
        // super constructor
        Phaser.Group.call(this, game, parent, 'tank', true, true, Phaser.Physics.ARCADE);
        this.wheels = new Phaser.Sprite(game, x, y, 'wheels', 0);
        this.turret = new Phaser.Sprite(game, x, y, 'turret', 0);
        // this.wheels.scale.set(2);
        // this.turret.scale.set(2);
        this.add(this.wheels);
        this.add(this.turret);
        this.wheels.frame_rate = 32;
        this.turret.shoot_rate = 8;
        this.wheels.animations.add("moving",[0,1],this.wheels.frame_rate,true);
        this.turret.animations.add("shooting",[0,1],this.turret.shoot_rate,false);
        this._facing = "right";
        this._shooting = false;
        this._moving = false;
        this.manage_animation();

        // crisp pixels
        // this.turret.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.wheels.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        // anchor to the center of the sprite
        this.turret.anchor.set(0.5);
        this.wheels.anchor.set(0.5);

        this.speed = 32;

        this.game.physics.arcade.enable(this.wheels);
        this.wheels.body.collideWorldBounds = true;
    }

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

    Tank.prototype.manage_animation = function () {
        this.wheels.animations.play("moving");
        this.turret.animations.play("shooting");


        if(!this.moving){
            this.wheels.animations.stop();
        }
        if(!this.shooting){
            this.turret.animations.stop();
        }


        if(this._facing == "left"){
            this.wheels.rotation = Math.atan2(-1,0);
        } else if(this._facing == "right"){
            this.wheels.rotation = Math.atan2(+1,0);
        } else if(this._facing == "up"){
            this.wheels.rotation = Math.atan2(0,-1);
        } else if(this._facing == "down"){
            this.wheels.rotation = Math.atan2(0,+1);
        }
    };

    Tank.prototype.move = function (direction) {
        this.wheels.body.velocity.set(0);
        if (direction == "left") {
            this.facing = direction;
            this.moving = true;
            this.wheels.body.velocity.x = -this.speed;
        }
        else if (direction == "right") {
            this.facing = direction;
            this.moving = true;
            this.wheels.body.velocity.x = +this.speed;
        }
        else if (direction == "up") {
            this.facing = direction;
            this.moving = true;
            this.wheels.body.velocity.y = -this.speed;
        }
        else if (direction == "down") {
            this.facing = direction;
            this.moving = true;
            this.wheels.body.velocity.y = +this.speed;
        }
    };

    Tank.prototype.face_turret = function (x,y) {
        this.turret.rotation = Math.atan2(y-this.turret.y,x-this.turret.x);
        this.turret.rotation -= Math.PI/2;
        this.turret.rotation = Math.round(this.turret.rotation / (Math.PI/4))*(Math.PI/4);
    };
    Tank.prototype.rest = function () {
        this.wheels.body.velocity.set(0);
        this.moving = false;
    };
    Tank.prototype.fire = function (callback,obj) {
        if(!this.shooting){
            this.turret.animations.currentAnim.onComplete.addOnce(function(){
                this.shooting = false;
                callback.call(obj);
            },this);
            this.shooting = true;
        }
    };
    Tank.prototype.stop_fire = function () {
        this.shooting = false;
    };


    Tank.prototype.update = function () {
        this.turret.x = this.wheels.x;
        this.turret.y = this.wheels.y;
    };

    return Tank;
});
