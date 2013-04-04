window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Turn = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'yearId' : null,
      'playerId' : null,
      'number' : null
    },
    initialize: function(attributes, options) {
      var turn = this;
      // lets give it a nice guid id
      turn.set('id', uuid());

      // create actions collection
      turn.actions = new Collections.Actions(null, { turn:turn });

      // make sure on save, that we save all children
      turn.on('sync', function(){
        turn.actions.each(function(m) { m.save(); });
      }, this);
    },
    player : function() { var turn = this;
      return window.collections.players.get(turn.get('playerId'));
    }
  });

  Collections.Turns = Backbone.Collection.extend({
    model: window.Models.Turn,
    localStorage: new Backbone.LocalStorage("Risk::Model::Turn"),
    initialize: function(models, options) {
      options || (options = {});
      if (options.year) {
        this.year = options.year;
      } else { this.year = null; }
      // setup events
      this.on("add", function(model, collection, options) {
        model.year = collection.year;
        model.set('yearId', collection.year.get('id'));
      });
      // add handlers for when syncing to make sure to sync the children
      this.on('reset', function() {
        this.each(function(turn){
          turn.actions.fetch();
        });
      });
    },
    comparator : function(turn) {
      return turn.get("number");
    }
  });

})(Backbone, window.Models, window.Collections);

