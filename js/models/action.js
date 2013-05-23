window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Action = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'turnId' : null,
      'territoryId' : null,
      'playerId' : null,
      'boardState' : null,
      'number' : null
    },
    initialize: function(attributes, options) {
      var action = this;
      // lets give it a nice guid id, if it does not have one
      if(action.id == null) { action.set('id', uuid()); }
    }
  });

  Collections.Actions = Backbone.Collection.extend({
    model: window.Models.Action,
    initialize: function(models, options) {
      options || (options = {});
      if (options.turn) {
        this.turn = options.turn;
        this.localStorage = new Backbone.LocalStorage("Risk:Game:" + options.turn.collection.year.collection.game.id + ":Year:" +  options.turn.collection.year.id + ":Turn:" +  options.turn.id + ":Action:");
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

