'use strict';

define(['phaser','components/component'], function(Phaser,Component) {
    function Flying(entity) {
        // super constructor
        Component.call(this, entity, "Flying");
        this.speed = 128.;
        this.startTime = null;
        this.onComplete = new Phaser.Signal();
    }

    Flying.prototype = Object.create(Component.prototype);
    Flying.prototype.constructor = Flying;

    Object.defineProperty(Component.prototype, "progress", {
        get: function () {
            if(this.startTime === null) return null;
            var timeSinceStart = this.entity.game.time.time - this.startTime;
            var progress = (timeSinceStart/1000.) / this.duration;
            progress = Math.min(Math.max(progress,0.),1.);
            return progress;
        }
    });

    Flying.prototype.start = function (targetX, targetY) {
        this.startTime = this.entity.game.time.time;
        this.startX = this.entity.x;
        this.startY = this.entity.y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.dx = this.targetX - this.startX;
        this.dy = this.targetY - this.startY;
        this.d = Math.sqrt(this.dx*this.dx+this.dy*this.dy);
        this.duration = this.d / this.speed;
        this.maximum = (this.d / 200.);

        this.entity.rotation = Math.atan2(this.dy, this.dx);
        this.entity.rotation -= Math.PI/2;
        this.entity.rotation = Math.round(this.entity.rotation / (Math.PI/8))*(Math.PI/8);
        return this;
    };
    Flying.prototype.update = function () {
        var p = this.progress;
        var height = Math.sin(p * Math.PI);
        // var scale = ;

        this.entity.x = this.startX + p * this.dx;
        this.entity.y = this.startY + p * this.dy;
        this.entity.scale.set(1 + this.maximum * height);
        this.entity.alpha = height;

        if(p >= 1){
            this.entity = null;
            this.onComplete.dispatch();
        }

    };


    return Flying;
});
