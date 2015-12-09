'use strict';

define(['phaser','objects/bullet'], function(Phase,Bullet) {
    function Bullets(game) {
        Phaser.Group.call(this, game, game.world, 'bullets', true, true, Phaser.Physics.ARCADE);
        this.scale.set(2);
    };
    Bullets.prototype = Object.create(Phaser.Group.prototype);
    Bullets.prototype.constructor = Bullets;


    Bullets.prototype.add_bullet = function (x, y) {
        var bullet = new Bullet(this.game, x, y);
        this.add(bullet);
        return bullet;
    };

    return Bullets;
});
