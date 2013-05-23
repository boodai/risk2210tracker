window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.GamePlayer = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameId' : null,
      'playerId' : null,
      'color' : null
    },
    initialize: function(attributes, options) {
      var model = this;
      // lets give it a nice guid id, if it does not have one
      if(model.id == null) { model.set('id', uuid()); }
    },
    player : function() { var gamePlayer = this;
      return window.collections.players.get(gamePlayer.get('playerId'));
    }
  });

  Collections.GamePlayers = Backbone.Collection.extend({
    model: window.Models.GamePlayer,
    initialize: function(models, options) {
      options || (options = {});
      if (options.game) {
        // add route to game
        this.game = options.game;
        this.localStorage = new Backbone.LocalStorage("Risk:Game:" + options.game.id + ":GamePlayer:");
      } else { this.game = null; }
      // setup events
      this.on("add", function(model, collection, options) {
        model.game = collection.game;
        model.set('gameId', collection.game.get('id'));
      });
    }
  });

})(Backbone, window.Models, window.Collections);

