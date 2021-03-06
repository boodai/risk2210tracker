window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function(Backbone, Models, Collections, window ){

  Models.Game = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameTypeId' : null,
      'numYears' : null,
      'initialBoard' : null,
      'startedAt' : null,
      'finishedAt' : null,
      'devastatedKey' : 666
    },
    initialize: function(attributes, options) { var game = this;
      attributes || (attributes = {}); options || (options = {});

      if( !exists(attributes.gameTypeId) || attributes.gameTypeId == null ) { throw 'gameTypeId is required.'; }

      game.gameType = window.collections.data.gameTypes.get(attributes.gameTypeId);
      if(!game.gameType) { throw 'Game type not found.' }

      // default numYears
      if( !exists(attributes.numYears) || attributes.numYears == null ) {
        attributes.numYears = game.gameType.get('years').default;
      }

      game.setYears(attributes.numYears);

      // lets give it a nice guid id, if it does not have one
      if(game.id == null) { game.set('id', uuid()); }
      // lets set the date
      game.set('startedAt', new Date());

      // load up game players collection if need be
      game.gamePlayers = new Collections.GamePlayers(null, { game:game });
      // create years collection
      game.years = new Collections.Years(null, { game:game });

      // make sure on save, that we save all children
      game.on('sync', function(){
        game.gamePlayers.each(function(m) { m.save(); });
        game.years.each(function(m) { m.save(); });
      }, this);
    },
    setYears : function(years) { var game = this;
      var numYears = parseInt(years),
        min = game.gameType.get('years').min,
        max = game.gameType.get('years').max;
      if( numYears < min || numYears > max ) { throw numYears + ' must be between ' + min + ' and ' + max; }

      game.set('numYears', numYears);
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
        var colors = Object.keys(game.gameType.get('players').colors);
        // make sure valid color
        if(!_.contains(colors, color)) { throw color + ' must be one of [' + colors.join() + '].' }
        usedColors = game.gamePlayers.pluck('color');
        if(_.contains(usedColors, color)) { throw color + ' has already been used.' }
      }

      // make sure not already at max players
      var max = game.gameType.get('players').max;
      if(game.gamePlayers.length >= max) { throw 'Already at max of ' + max + ' players.' }

      // add the player
      game.gamePlayers.add({ playerId : newPlayer.get('id'), color : color });
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
      var newPlayers = game.gamePlayers.where({playerId: playerId});
      if( !newPlayers[0] ) { throw 'Player not found in game.' }

      // Remove the player
      game.gamePlayers.remove(newPlayers[0]);
      return game;

    },
    setupBoard : function() {
      var game = this;
      // TODO : make sure have minimum number of players

      // first, create the board in memory
      game.createBoard();
      // randomize the board for start (only land territories)
      game.randomizeBoard();
      // save the initial board
      game.set('initialBoard', game.board);
    },
    createBoard: function() {
      var game = this;
      var territoriesForDevastation = [];

      game.board = {};

      game.gameType.maps.each(function(map) {
        territoriesForDevastation = [];

        map.continents.each(function(continent) {
          continent.territories.each(function(territory) {
            game.board[territory.id] = null;

            if(map.get('devastate') > 0 && continent.get('isStartingContinent')) {
              territoriesForDevastation.push(territory.id)
            }
          });
        });

        if(map.get('devastate') > 0) {
          // need to devastate some territories, randomize them
          fisherYates(territoriesForDevastation);
          for(var x = 0; x < map.get('devastate'); x++ ) {
            game.board[territoriesForDevastation[x]] = game.get('devastatedKey');
          }
        }
      });
    },
    // randomize board
    randomizeBoard: function() {
      var game = this, startingTerritories = [], territory;

      // get all starting continent territories per map
      _.each(game.board, function(value, key) {
        territory = window.collections.data.territories.get(key);
        if(territory.continent.get('isStartingContinent') ) {
          if( value != game.get('devastatedKey') ) {
            startingTerritories.push(key);
          }
        }
      });

      // randomize the array
      fisherYates(startingTerritories);

      // Territories per player
      var numEach = parseInt(startingTerritories.length/game.gamePlayers.length);

      game.gamePlayers.each(function(player) {
        for(var y=0; y < numEach; y++) {
          var terrKey =  startingTerritories.pop();
          game.board[terrKey] = player.get('playerId');
        }
      });

      // fill up remainder
      var remainder = startingTerritories.length;
      for(var y=0; y < remainder; y++) {
        var terrKey =  startingTerritories.pop();
        // random player
        var rand = Math.floor(Math.random()*(game.gamePlayers.length));
        var player = game.gamePlayers.at(rand);
        game.board[terrKey] = player.get('playerId');
      }
    },
    addYear : function() {
      var game = this;

      if(game.years.length >= game.get('numYears')) { throw 'Already played all years.' }

      game.years.add({ gameId : game.get('id'), number : game.years.length+1 });
    },
    setPlayerOrderForYear : function(year, players) {
      // TODO make sure players are players in the game
      year.set('playerOrder',players);
    },
    addTurn : function() {
      var game = this, turnNumber;

      var year = game.years.last();
      // Check if all turns done
      if(year.turns.length >= game.gamePlayers.length) { throw 'All turns played for year.' }

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

      // add a default action to keep the state for this turn
      var actions = year.turns.last().actions;
      actions.add({ territoryId : null, playerId : null, number : 0, boardState : game.board });

      return game;
    },
    addAction : function(territoryId, playerId) { var game = this;
      var actions = game.years.last().turns.last().actions;
      actions.add({ territoryId : territoryId, playerId : playerId, number : actions.length+2, boardState : game.board });
      game.board[territoryId] = playerId;
    },
    removeLastAction : function() { var game = this;
      var last = game.years.last().turns.last().actions.last();
      if(last && last.get('number') > 0) {
        last.destroy();
        // update board to last actions board
        var newLast = game.years.last().turns.last().actions.last();
        game.board = newLast.get('boardState');
      }
    }
  });

  Collections.Games = Backbone.Collection.extend({
    model: window.Models.Game,
    localStorage: new Backbone.LocalStorage("Risk:Game:"),
    initialize : function () { var games = this;
      // add handlers for when syncing to make sure to sync the children
      games.on('reset', function() {
        games.each(function(game){
          game.gamePlayers.fetch();
          game.years.fetch();
        });
      });
    }
  });


})(Backbone, window.Models, window.Collections, window);

