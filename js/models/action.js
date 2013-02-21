window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Action = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'turnId' : null,
      'territoryId' : null,
      'playerId' : null,
      'number' : null
    },
    initialize: function(attributes, options) {
      var action = this;
      // lets give it a nice guid id
      action.set('id', uuid());
    }
  });

  Collections.Actions = Backbone.Collection.extend({
    model: window.Models.Action,
    localStorage: new Backbone.LocalStorage("Risk::Model::Action"),
    initialize: function(models, options) {
      options || (options = {});
      if (options.turn) {
        this.turn = options.turn;
      } else { this.turn = null; }
      // setup events
      this.on("add", function(model, collection, options) {
        model.turn = collection.turn;
        model.set('turnId', collection.turn.get('id'));
      });
    },
    comparator : function(action) {
      return action.get("number");
    }
  });

})(Backbone, window.Models, window.Collections);

