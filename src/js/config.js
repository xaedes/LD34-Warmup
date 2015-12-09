'use strict';

require.config({
    paths: {
        // JavaScript folders.
        app: 'app',

        // Libraries
        phaser: 'lib/phaser.debug',
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        phaser: {
            exports: 'Phaser'
        },
    }
});

// Initialize the application with the main application file.
require(['phaser', 'app'], function (Phaser, App) {
    var app = new App();
    app.start();
});
