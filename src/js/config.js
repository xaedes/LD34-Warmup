'use strict';

require.config({
    paths: {
        // JavaScript folders.
        app: 'app',

        // Libraries
        phaser: 'lib/phaser.debug',
        socketio: '../../bower_components/socket.io-client/socket.io'
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        phaser: {
            exports: 'Phaser'
        },
        socketio: {
            exports: 'io'
        }
    }
});

// Initialize the application with the main application file.
require(['phaser', 'app', "socketio"], function (Phaser, App, io) {
    var app = new App();
    app.start();
});
