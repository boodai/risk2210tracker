window.collections = window.collections || {};
window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};


(function(window, collections, Models, Collections, Views, Data){

  window.app = {
    init: function() { var app = this;
      console.info('app::init');

      // Get the collections up and running
      collections.games = new Collections.Games();
      collections.players = new Collections.Players();
      // load up saved players
      collections.players.fetch();

      // setup current game variable
      app._currentGame = null;

      app.importData();

      app.homeView();
    },
    // Need to import the games and boards
    importData : function() { var app = this;
      console.info('app::importData');

      // clear out old stuff and setup collections
      collections.data = {};
      collections.data.gameTypes = new Collections.Data.GameTypes();
      collections.data.maps = new Collections.Data.Maps();
      collections.data.continents = new Collections.Data.Continents();
      collections.data.territories = new Collections.Data.Territories();

      if( !exists(Data.gameTypes) ) {
        throw 'No game types found.';
      }

      _.each(Data.gameTypes, function(type, type_key, list) {
        // Add gameType to collection
        var type_model = new Models.Data.GameType({ id : type_key,
                                                    name : type.name,
                                                    years : type.years,
                                                    players : type.players }
                                                  , { maps : type.maps });
        collections.data.gameTypes.add(type_model);
      });

    },
    createGame : function(gameTypeId) { var app = this;
      console.info('app::createGame');

      // make sure is a valid gameType
      if( !(gameType = collections.data.gameTypes.get(gameTypeId)) ) {
        throw 'Game type not found.';
      }
      app._currentGame = new Models.Game({ gameTypeId:gameTypeId});
      collections.games.add(app._currentGame);

      // show setup View
      app.gameSetupView();
    },
    startGame : function(data) { var app = this;
      // update years
      app._currentGame.setYears(data.years);

      // TODO add some validation to make sure proper number of players

      data.players.each(function(player) {
        var currentPlayer = window.collections.players.get(player);
        if(!currentPlayer) {
          // player doesn't exist yet, create them
          currentPlayer = new window.Models.Player({ id : player.id, name : player.get('name') });
          window.collections.players.add(currentPlayer);
          currentPlayer.save();
        }
        app._currentGame.addPlayer( currentPlayer, data.playerColors[currentPlayer.id] );
      });

      // start the game up
      app._currentGame.setupBoard();
      app.newYear();
      app._currentGame.save();
    },
    newYear : function() { var app = this;
      // add a year to the game
      app._currentGame.addYear();
      app._currentGame.save();

      // display turn order screen
      app.turnOrderView();
    },
    updateYear : function(data) { var app = this;
      // set the player order
      app._currentGame.setPlayerOrderForYear(app._currentGame.years.last(), data.order);
      app._currentGame.save();
      // start a turn
      app.newTurn();
    },
    newTurn : function() { var app = this;
      // add a turn to the year
      app._currentGame.addTurn();
      app._currentGame.save();
      // display the map
      app.turnView();
    },
    newAction :  function(territoryId, playerId) { var app = this;
      app._currentGame.addAction(territoryId, playerId);
      app._currentGame.save();
      app._currentGame.trigger('newAction');
    },
    undoAction :  function() { var app = this;
      app._currentGame.removeLastAction();
      app._currentGame.save();
      app._currentGame.trigger('newAction');
    },
    endTurn : function() { var app = this;
      // check if turns all used up this year
      if(app._currentGame.years.last().turns.last().get('number') == app._currentGame.gamePlayers.length) {
        if(app._currentGame.years.last().get('number') == app._currentGame.get('numYears')) {
          // end of game
          app.endGame();
        } else {
          // needs new year
          app.newYear();
        }
      } else {
        app.newTurn();
      }
      // if last turn, check years
      // if last year, end game
    },
    endGame : function() {
      // TODO end game stuff
      app._currentGame.save();
      app.endGameView();
    },
    // TODO move these into a better place...
    homeView : function () {
      console.info('app::homeView');

      this.view = new Views.Start();
      $('.app').html(this.view.render().el);
    },
    gameSetupView : function () {
      console.info('app::gameSetupView');

      if(this.view != null) {
        this.view.remove();
      }

      this.view = new Views.GameSetup({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    },
    turnOrderView : function () {
      console.info('app::turnOrderView');

      if(this.view != null) {
        this.view.remove();
      }

      this.view = new Views.TurnOrder({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    },
    turnView : function () {
      console.info('app::turnView');

      if(this.view != null) {
        this.view.remove();
      }

      this.view = new Views.Turn({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    },
    endGameView : function () {
      console.info('app::endGameView');

      if(this.view != null) {
        this.view.remove();
      }

      this.view = new Views.EndGame({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    }


  }
})( window, window.collections, window.Models, window.Collections, window.Views, window.Data);

