window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Year = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameId' : null,
      'number' : null,
      'playerOrder' : []
    },
    initialize: function(attributes, options) {
      var year = this;
      // lets give it a nice guid id
      year.set('id', uuid());

      // create turns collection
      year.turns = new Collections.Turns(null, { year:year });

      // make sure on save, that we save all children
      year.on('sync', function(){
        year.turns.each(function(m) { m.save(); });
      }, this);
    }
  });

  Collections.Years = Backbone.Collection.extend({
    model: window.Models.Year,
    initialize: function(models, options) {
      options || (options = {});
      if (options.game) {
        this.game = options.game;
        this.localStorage = new Backbone.LocalStorage("Risk::Game::" + options.game.id + "::Year::");
      } else { this.game = null; }
      // setup events
      this.on("add", function(model, collection, options) {

        // TODO : either check to make sure that game is passed in or dont do this if its null
        model.game = collection.game;
        model.set('gameId', collection.game.get('id'));
      });
      // add handlers for when syncing to make sure to sync the children
      this.on('reset', function() {
        this.each(function(year){
          year.turns.fetch();
        });
      });
    },
    comparator : function(year) {
      return year.get("number");
    }
  });

})(Backbone, window.Models, window.Collections);

