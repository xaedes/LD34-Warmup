'use strict';

define([], function() {
    function Boot() {}

    Boot.prototype = {
        preload: function() {
            // load preloader assets
            this.load.spritesheet('tank', 'assets/blue/result-sprite.png', 16, 16, 12, 0, 0);
            this.load.spritesheet('bullseye', 'assets/bullseye.png', 16, 16, 2, 0, 0);
            this.load.spritesheet('bullets', 'assets/bullets_1.png', 8, 16, 1, 0, 0);
        },

        create: function() {
            // setup game environment
            // scale, input etc..
            
            this.game.state.start('preload');
        }
    };

    return Boot;
});
