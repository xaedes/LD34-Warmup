'use strict';

define(['../objects/tank'], function(Tank) {
    function GameplayState() {}

    GameplayState.prototype = {
        create: function() {
            // add tank
            // control tank with wasd and with arrows
            // add mouse controlled bullseye
            // click causes tank to shoot
            // bullet flies in parable, height causes upscaling, simply use tween?
            var tank = new Tank(this.game, 100, 100);
        }
    };

    return GameplayState;
});
