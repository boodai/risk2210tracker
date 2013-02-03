window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function(Backbone, Models, Collections, window ){

  Models.Game = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameTypeId' : null,
      'numYears' : null,
      'createdAt' : null
    },
    //localStorage: new Store('Risk::Model::Game'),
    initialize: function(attributes, options) {
      var model = this; attributes || (attributes = {}); options || (options = {});

      if( !exists(attributes.gameTypeId) || attributes.gameTypeId == null ) { throw 'gameTypeId is required.'; }
      if( !exists(attributes.numYears) || attributes.numYears == null ) { throw 'numYears is required.'; }

      model._gameType = window.collections.data.gameTypes.get(attributes.gameTypeId);
      if(!model._gameType) { throw 'Game type not found.' }

      var numYears = parseInt(attributes.numYears),
          min = model._gameType.get('years').min,
          max = model._gameType.get('years').max;
      if( numYears < min || numYears > max ) { throw numYears + ' must be between ' + min + ' and ' + max; }

      model.set('numYears', numYears);

      // lets give it a nice guid id
      model.set('id', uuid());
      // lets set the date
      model.set('createdAt', new Date());

      // load up game players collection if need be
      model._gamePlayers = new window.Collections.GamePlayers(null, { gameId : model.get('id') });
    },
    // Set players
    addPlayer: function(player, color) {
      var model = this; color || (color = null);

      // find player - Shouldn't matter if they passed in an id or a model
      var newPlayer = window.collections.players.get(player);
      if(!newPlayer) { throw 'Player not found.' }

      if( color == null ) { throw 'color is required.'; }

      // validate color
      if(color) {
        var colors = Object.keys(model._gameType.get('players').colors);
        // make sure valid color
        if(!_.contains(colors, color)) { throw color + ' must be one of [' + colors.join() + '].' }
        // TODO :: make sure no repeats of color

      }

      // make sure not already at max players
      var max = model._gameType.get('players').max;
      if(model._gamePlayers.length >= max) { throw 'Already at max of ' + max + ' players.' }

      // add the player
      model._gamePlayers.add({ gameId : model.get('id'), playerId : newPlayer.get('id'), color : color });
      return model;  // hopefully so we can chain
    },
    removePlayer: function(player) {
      var model = this, playerId;

      // Get correct playerID
      if( Object.toType(player) == 'object') {
        try { playerId = player.get('id'); } catch(err) {}
      } else if( Object.toType(player) == 'string') {
        playerId = player;
      }

      // Check if player exists in game players collection
      var newPlayers = model._gamePlayers.where({playerId: playerId});
      if( !newPlayers[0] ) { throw 'Player not found in game.' }

      // Remove the player
      model._gamePlayers.remove(newPlayers[0]);
      return model;

    },
    startGame : function() {
      // make sure when start game that everyone has a color
      // make sure have minimum number of players
    },
    // randomize board
    randomizeBoard: function() {}
    // Start new year
  });

  Collections.Games = Backbone.Collection.extend({
    model: window.Models.Game,
    localStorage: new Backbone.LocalStorage('Risk::Model::Game')
  });


})(Backbone, window.Models, window.Collections, window);

