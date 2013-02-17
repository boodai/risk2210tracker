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
      var game = this; attributes || (attributes = {}); options || (options = {});

      if( !exists(attributes.gameTypeId) || attributes.gameTypeId == null ) { throw 'gameTypeId is required.'; }
      if( !exists(attributes.numYears) || attributes.numYears == null ) { throw 'numYears is required.'; }

      game._gameType = window.collections.data.gameTypes.get(attributes.gameTypeId);
      if(!game._gameType) { throw 'Game type not found.' }

      var numYears = parseInt(attributes.numYears),
          min = game._gameType.get('years').min,
          max = game._gameType.get('years').max;
      if( numYears < min || numYears > max ) { throw numYears + ' must be between ' + min + ' and ' + max; }

      game.set('numYears', numYears);

      // lets give it a nice guid id
      game.set('id', uuid());
      // lets set the date
      game.set('createdAt', new Date());

      // load up game players collection if need be
      game._gamePlayers = new Collections.GamePlayers(null, { game:game });
      // create years collection
      game.years = new Collections.Years(null, { game:game });

      // Create and display the initial view
    },
    // Set players
    addPlayer: function(player, color) {
      var game = this; color || (color = null);

      // find player - Shouldn't matter if they passed in an id or a model
      var newPlayer = window.collections.players.get(player);
      if(!newPlayer) { throw 'Player not found.' }

      if( color == null ) { throw 'color is required.'; }

      // validate color
      if(color) {
        var colors = Object.keys(game._gameType.get('players').colors);
        // make sure valid color
        if(!_.contains(colors, color)) { throw color + ' must be one of [' + colors.join() + '].' }
        usedColors = game._gamePlayers.pluck('color');
        if(_.contains(usedColors, color)) { throw color + ' has already been used.' }
      }

      // make sure not already at max players
      var max = game._gameType.get('players').max;
      if(game._gamePlayers.length >= max) { throw 'Already at max of ' + max + ' players.' }

      // add the player
      game._gamePlayers.add({ playerId : newPlayer.get('id'), color : color });
      return game;  // hopefully so we can chain
    },
    removePlayer: function(player) {
      var game = this, playerId;

      // Get correct playerID
      if( Object.toType(player) == 'object') {
        try { playerId = player.get('id'); } catch(err) {}
      } else if( Object.toType(player) == 'string') {
        playerId = player;
      }

      // Check if player exists in game players collection
      var newPlayers = game._gamePlayers.where({playerId: playerId});
      if( !newPlayers[0] ) { throw 'Player not found in game.' }

      // Remove the player
      game._gamePlayers.remove(newPlayers[0]);
      return game;

    },
    startGame : function() {
      var game = this;
      // TODO : make sure have minimum number of players

      // first, create the board in memory
      game.createBoard();
      // randomize the board for start (only land territories)
      game.randomizeBoard();
      // Create year
      game.addYear();
      // get turn order
      // start first year, first player

    },
    createBoard: function() {
      var game = this;

      game._board = {};

      game._gameType.maps.each(function(map) {
        map.continents.each(function(continent) {
          continent.territories.each(function(territory) {
            game._board[territory.id] = null;
          });
        });
      });
    },
    // randomize board
    randomizeBoard: function() {
      var game = this, landTerritories = [], territory;

      // get all land territories
      _.each(game._board, function(owner, key) {
        territory = window.collections.data.territories.get(key);
        if(territory.continent.get('type') ==  'land') {
          landTerritories.push(key);
        }
      });

      // randomize the array
      fisherYates(landTerritories);

      // Territories per player
      var numEach = parseInt(landTerritories.length/game._gamePlayers.length);

      game._gamePlayers.each(function(player) {
        for(var y=0; y < numEach; y++) {
          var terrKey =  landTerritories.pop();
          game._board[terrKey] = player.get('playerId');
        }
      });

      // fill up remainder
      var remainder = landTerritories.length;
      for(var y=0; y < remainder; y++) {
        var terrKey =  landTerritories.pop();
        // random player
        var rand = Math.floor(Math.random()*(game._gamePlayers.length));
        var player = game._gamePlayers.at(rand);
        game._board[terrKey] = player.get('playerId');
      }
    },
    // Start new year
    addYear : function() {
      var game = this;

      if(game.years.length >= game.get('numYears')) { throw 'Already played all years.' }

      game.years.add({ gameId : game.get('id'), number : game.years.length+1 });
    },
    setPlayerOrderForYear : function(year, players) {
      year.set('playerOrder',players);
    },
    addTurn : function() {
      var game = this, turnNumber;

      var year = game.years.last();
      // Check if all turns done
      if(year.turns.length >= game._gamePlayers.length) { throw 'All turns played for year.' }

      // what turn are we
      var lastTurn = year.turns.last();
      if(lastTurn) {
        turnNumber = lastTurn.get('number') + 1;
      } else {
        turnNumber = 1;
      }

      var playerId = year.get('playerOrder')[turnNumber-1];

      // add the turn
      year.turns.add({ number : turnNumber, playerId : playerId });

      return game;
    }
  });

  Collections.Games = Backbone.Collection.extend({
    model: window.Models.Game
    //localStorage: new Backbone.LocalStorage('Risk::Model::Game')
  });


})(Backbone, window.Models, window.Collections, window);

