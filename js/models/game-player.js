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
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this;
      // lets give it a nice guid id
      model.set('id', uuid());
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
      } else { this.game = null; }
      // setup events
      this.on("add", function(model, collection, options) {
        model.game = collection.game;
        model.set('gameId', collection.game.get('id'));
      });
    }
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections);

