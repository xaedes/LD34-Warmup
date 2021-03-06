'use strict';

define(['phaser','objects/tank'], function(Phaser,Tank) {
    function Tanks(game) {
        Phaser.Group.call(this, game, game.world, 'tanks', true, true, Phaser.Physics.ARCADE);
        this.scale.set(2);
    };
    Tanks.prototype = Object.create(Phaser.Group.prototype);
    Tanks.prototype.constructor = Tanks;


    Tanks.prototype.add_tank = function (x, y) {
        var tank = new Tank(this.game, x, y);
        this.add(tank);
        return tank;
    };

    return Tanks;
});
