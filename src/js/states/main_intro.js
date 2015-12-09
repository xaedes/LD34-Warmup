'use strict';

define(['phaser'], function(Phaser) {
    function MainIntroState() {}

    MainIntroState.prototype = {
        create: function() {
            var title_text = this.game.add.text(this.game.world.centerX,this.game.world.centerY, 
                "Tanks", 
                {font: "60px shmupfont", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
            title_text.fixedToCamer = false;
            title_text.anchor.setTo(0.5, 0.5);
            title_text.wordWrap = true;
            title_text.wordWrapWidth = (0.95 * this.game.world.width);
            title_text.alpha = 0

            // this.title_text = this.add.bitmapText(8, 364, 'shmupfont', "Tanks", 24);
            this.tweenFadeState(title_text);
        },
        
        tweenFadeState: function(title_text) {
            this.game.add.tween(title_text)
                .to({alpha: 1}, 2000,"Cubic.easeOut",true)
                .onComplete.add(function() {
                    this.game.state.start('main-menu');
                }, this);
        }
    };

    return MainIntroState;
});
