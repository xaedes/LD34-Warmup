'use strict';

define(['phaser','objects/tank'], function(Phase,Tank) {
    function Tanks(game) {
        Phaser.Group.call(this, game, game.world, 'tanks', true, true, Phaser.Physics.ARCADE);
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
