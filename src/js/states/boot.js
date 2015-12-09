'use strict';

define([], function() {
    function Boot() {}

    Boot.prototype = {
        preload: function() {
            // load preloader assets
            this.load.spritesheet('tank', 'assets/blue/result-sprite.png', 16, 16, 12, 0, 0);
        },

        create: function() {
            // setup game environment
            // scale, input etc..
            
            this.game.state.start('preload');
        }
    };

    return Boot;
});
