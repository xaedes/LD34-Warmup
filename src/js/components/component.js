'use strict';

define(['phaser'], function(Phaser) {
    function Component(entity, name) {
        this._entity = entity;
        this._name = name;
        this.onEntitySet = new Phaser.Signal();
        this.onNameSet = new Phaser.Signal();
    }
    Component.prototype.constructor = Component;
    
    Object.defineProperty(Component.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        set: function (value) {
            this._entity = value;
            this.onEntitySet.dispatch(this._entity);
        }
    });
    Object.defineProperty(Component.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.onNameSet.dispatch(this._entity);
        }
    });

    return Component;
});
