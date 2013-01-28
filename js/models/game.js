window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function(Backbone, Models, Collections ){

  Models.Game = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameType' : null,
      'numYears' : null,
      'createdAt' : null
    },
    //localStorage: new Store('Risk::Model::Game'),
    initialize: function(attributes, options) {
      var model = this;
      options || (options = {});

      // lets give it a nice guid id
      model.set('id', uuid());
      // lets set the date
      model.set('createdAt', new Date());

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
      var playerId;

      if( Object.toType(player) == 'object') {
        try {
          playerId = player.get('id');
        } catch(err) {}
      } else if( Object.toType(player) == 'string') {
        playerId = player;
      }

      // Check if player exists in game players collection
      var newPlayers = model._gamePlayers.where({playerId: playerId});
      if( newPlayers[0] ) {
        model._gamePlayers.remove(newPlayers[0]);
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

