'use strict';

define(['phaser'], function(Phaser) {
    function Entity() {
        this.components = {};
        this.onComponentAdded = new Phaser.Signal();
        this.onComponentRemoved = new Phaser.Signal();
    }
    Entity.prototype.constructor = Entity;

    Entity.prototype.addComponent = function(component) {
        this.components[component.name] = component;
        this.components[component.name].entity = this;
        component.onEntitySet.addOnce(function(newEntity){
            if(newEntity != this){
                this.removeComponent(component);
            }
        },this);
        this.onComponentAdded.dispatch(component);
        return component;
    };

    Entity.prototype.removeComponent = function(component) {
        delete this.components[component.name];
        if(component.entity == this){
            component.entity = null;
        }
        this.onComponentRemoved.dispatch(component);
    };

    Entity.prototype.updateComponents = function() {
        Object.keys(this.components).forEach(function(a, b, c) {
            this.components[a].update();
        }, this);
    };

    return Entity;
});
