// ==========================================================================
// Project:   Kadhir
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Kadhir */

Kadhir = SC.Application.create();

Kadhir.Task = SC.Object.extend({
    title: null,
    isDone: false
});

Kadhir.CreateTaskView = SC.TextField.extend({
    insertNewline: function() {
                       var value = this.get('value');

                       if (value) {
                           Kadhir.taskListController.createTask(value);
                           this.set('value', '');
                       }
                   }
});


Kadhir.MarkDoneView = SC.Checkbox.extend({
    titleBinding: '.parentView.content.title',
    valueBinding: '.parentView.content.isDone'
});


Kadhir.StatsView = SC.TemplateView.extend({
    remainingBinding: 'Kadhir.taskListController.remaining',

    displayRemaining: function() {
        var remaining = this.get('remaining');
        return remaining + (remaining === 1 ? " item" : " items");
    }.property('remaining')
});


SC.ready(function() {
    Kadhir.mainPane = SC.TemplatePane.append({
        layerId: 'kadhir',
        templateName: 'kadhir'
    });
});

Kadhir.taskListController = SC.ArrayController.create({

    // Initialize the array controller with an empty array.
    content: [],

    // Creates a new todo with the passed title, then adds it
    // to the array.
    createTask: function(title) {
        var task = Kadhir.Task.create({ title: title });
        this.pushObject(task);
    },

    remaining: function() {
        return this.filterProperty('isDone', false).get('length');
    }.property('@each.isDone'),

    clearCompletedTodos: function() {
        this.filterProperty('isDone', true).forEach(this.removeObject, this);
    },
    
    allAreDone: function(key, value) {
        if (value !== undefined) {
            this.setEach('isDone', value);
            return value;
        } else {
            return this.get('length') && this.everyProperty('isDone', true);
        }
    }.property('@each.isDone')

});


