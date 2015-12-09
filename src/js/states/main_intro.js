'use strict';

define(['phaser'], function(Phaser) {
    function MainIntroState() {}

    MainIntroState.prototype = {
        create: function() {
            var title_text = this.game.add.text(this.game.world.centerX,this.game.world.centerY, 
                "Tanks", 
                {font: "200px shmupfont", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
            title_text.fixedToCamer = false;
            title_text.anchor.setTo(0.5, 0.5);
            title_text.wordWrap = true;
            title_text.wordWrapWidth = (0.95 * this.game.world.width);
            title_text.alpha = 0;
            title_text.scale.x = 0;
            title_text.scale.y = 0;

            // this.title_text = this.add.bitmapText(8, 364, 'shmupfont', "Tanks", 24);
            this.tweenFadeState(title_text);
        },
        
        tweenFadeState: function(title_text) {
            var scaleIn = this.game.add.tween(title_text.scale)
                .to({x:1,y:1}, 1000,"Cubic.easeOut");
            var fadeIn = this.game.add.tween(title_text)
                .to({alpha: 1}, 1000,"Cubic.easeOut");
            fadeIn.onComplete.add(function() {
                    this.game.state.start('main-menu');
                }, this);

            scaleIn.start();
            fadeIn.start();
        }
    };

    return MainIntroState;
});
