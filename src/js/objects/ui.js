'use strict';

define(['phaser'], function(Phaser) {
    function Ui(game) {
        Phaser.Group.call(this, game, game.world, 'ui', true, true);
    };
    Ui.prototype = Object.create(Phaser.Group.prototype);
    Ui.prototype.constructor = Ui;

    return Ui;
});
