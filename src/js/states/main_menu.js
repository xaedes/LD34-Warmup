'use strict';

define(['phaser'], function(Phaser) {
    function MainMenuState() {}

    MainMenuState.prototype = {
        create: function() {
            var menu = this.game.add.group();

            var title_text = this.game.add.text(0,0, 
                "Tanks", 
                {font: "200px shmupfont", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
            title_text.anchor.setTo(0.5, 0.5);
            title_text.wordWrap = true;
            title_text.wordWrapWidth = (0.95 * this.game.world.width);
            title_text.alpha = 1

            var subtitle_text = this.game.add.text(0,210, 
                "[press ENTER to start]", 
                {font: "18px shmupfont", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
            subtitle_text.anchor.setTo(0.5, 0.5);
            subtitle_text.wordWrap = true;
            subtitle_text.wordWrapWidth = (0.95 * this.game.world.width);
            subtitle_text.alpha = 1

            menu.add(subtitle_text)
            menu.add(title_text);

            menu.x = this.game.world.centerX;
            menu.y = this.game.world.centerY;
            menu.fixedToCamer = false;

            this.subtitle_text = subtitle_text;
            this.title_text = title_text;
            this.menu = menu;


            this.enterKey = this.game.input.keyboard
                .addKey(Phaser.Keyboard.ENTER);

            this.enterKey.onDown.add(this.tweenPlayState, this);
        },

        tweenPlayState: function() {
            var selectionFeedback = this.game.add.tween(this.subtitle_text.scale)
            .to({x:1.5 , y:1.5},500,"Elastic.easeOut");
            selectionFeedback.onComplete.add(function(){
                var tweenMenuShrink = this.game.add.tween(this.menu.scale)
                        .to({x: 0, y: 0}, 200);

                var tweenFadeOut = this.game.add.tween(this.menu)
                        .to({alpha: 0}, 200);

                tweenFadeOut.onComplete.add(function() {
                    this.game.state.start('gameplay');
                }, this);
                
                tweenFadeOut.start();                
                tweenMenuShrink.start();                
            }, this)
            selectionFeedback.start()


        }
    };

    return MainMenuState;
});
