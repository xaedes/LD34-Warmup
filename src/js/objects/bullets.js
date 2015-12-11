'use strict';

define(['phaser','objects/bullet'], function(Phaser,Bullet) {
    function Bullets(game) {
        Phaser.Group.call(this, game, game.world, 'bullets', true, true, Phaser.Physics.ARCADE);
        this.scale.set(2);
    };

    Bullets.prototype = Object.create(Phaser.Group.prototype);
    Bullets.prototype.constructor = Bullets;


    Bullets.prototype.add_bullet = function (x, y) {
        var bullet = this.getFirstExists(false);
        if(bullet === null){
            bullet = new Bullet(this.game);
            this.add(bullet);
        }
        bullet.reset_reusable().reset(x,y);
        return bullet;
    };

    return Bullets;
});
