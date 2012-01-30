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
  }
});


