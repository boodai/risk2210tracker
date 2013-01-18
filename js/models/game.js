window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function(Backbone, Models, Collections ){

  Models.Game = Backbone.Model.extend({
    defaults: {
      'id' : uuid(),
      'gameTypeId' : null,
      'numYears' : null,
      'createdAt' : new Date()
    },
    //localStorage: new Store('Risk::Model::Game'),
    initialize: function(attributes, options) {
      var model = this;

      // load up game players collection if need be
      model._gamePlayers = new window.Collections.GamePlayers(null, { gameId : model.get('id') });
    },
    // Set players
    addPlayer: function(player) {
      var model = this;
      // Shouldn't matter if they passed in an id or a model
      var newPlayer = window.collections.players.get(player);
      if(newPlayer) {
        model._gamePlayers.add({ gameId : model.get('id'), playerId : newPlayer.get('id') });
        return model;  // hopefully so we can chain
      } else {
        throw 'Player not found.'
      }
    },
    removePlayer: function(player) {
      var model = this;
      // Check if player exists in game players collection
      var newPlayer = model._gamePlayers.get(playerId);
      if( newPlayer ) {
        model._gamePlayers.remove(newPlayer);
        return model;
      } else {
        throw 'Player not found in game.'
      }
    },
    // randomize board
    randomizeBoard: function() {}
    // Start new year
  });

  Collections.Games = Backbone.Collection.extend({
    model: window.Models.Game,
    localStorage: new Backbone.LocalStorage('Risk::Model::Game')
  });


})(Backbone, window.Models, window.Collections);

