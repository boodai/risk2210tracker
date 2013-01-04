window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Board = Backbone.Model.extend({
    defaults: {
      'id' : '',
      'name' : ''
    },
    initialize: function(attributes, options) {
      var model = this;

      // build out the colonies
      var colonyArray = [],
          colony;
      for (var typeKey in attributes.types) {
        // First is types (land,water,space)
        for (var colonyKey in attributes.types[typeKey]) {
          colony = attributes.types[typeKey][colonyKey];
          colony.id = colonyKey;
          colony.name = colonyKey;
          colony.type = typeKey;
          colonyArray.push(colony);
        }
      }

      model.colonies = new window.Collections.Colonies(colonyArray, { parent : model });
      // remove the scruff
      model.unset('types');
    }
  });

  Collections.Boards = Backbone.Collection.extend({
    model: window.Models.Board,
    initialize: function(models, options) {
      var collection = this;
      options = options || {};
      collection._parent = options.parent || null;
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

