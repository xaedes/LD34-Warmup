'use strict';

define(['phaser','objects/explosion'], function(Phase,Explosion) {
    function Explosions(game) {
        Phaser.Group.call(this, game, game.world, 'explosions', true, true, Phaser.Physics.ARCADE);
        this.scale.set(2);
    };
    Explosions.prototype = Object.create(Phaser.Group.prototype);
    Explosions.prototype.constructor = Explosions;


    Explosions.prototype.add_explosion = function (x, y, rotation) {
        var explosion = new Explosion(this.game, x, y, rotation);
        this.add(explosion);
        return explosion;
    };

    return Explosions;
});
