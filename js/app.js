window.collections = window.collections || {};
window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};


(function(window, collections, Models, Collections, Views, Data){

  window.app = {
    init: function() { var app = this;
      console.info('app::init');

      // Get the collections up and running
      collections.players = new Collections.Players();

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

      // show setup View
      app.gameSetupView();
    },
    startGame : function(data) { var app = this;
      // update years
      app._currentGame.setYears(data.years);

      // TODO update game with info from screen

      // cheating by adding some players quickly
      var players = {
        'Cory' : 'red',
        'Nick' : 'green',
        'Derek' : 'gold'
      };
      _.each(players, function(color, name) {
        var test = new window.Models.Player({ name : name });
        window.collections.players.add(test);
        app._currentGame.addPlayer( test, color );
      });

      // start the game up
      app._currentGame.setupBoard();
      app.newYear();
    },
    newYear : function() { var app = this;
      // add a year to the game
      app._currentGame.addYear();

      // display turn order screen
      app.turnOrderView();
    },
    updateYear : function(data) { var app = this;
      // set the player order
      app._currentGame.setPlayerOrderForYear(app._currentGame.years.last(), data.order);
      // start a turn
      app.newTurn();
    },
    newTurn : function() { var app = this;
      // add a turn to the year
      app._currentGame.addTurn();
      // display the map
      app.turnView();
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

      this.view = new Views.GameSetup({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    },
    turnOrderView : function () {
      console.info('app::turnOrderView');

      this.view = new Views.TurnOrder({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    },
    turnView : function () {
      console.info('app::turnView');

      this.view = new Views.Turn({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    },
    endGameView : function () {
      console.info('app::endGameView');

      this.view = new Views.EndGame({ model : app._currentGame });
      $('.app').html(this.view.render().el);
    }


  }
})( window, window.collections, window.Models, window.Collections, window.Views, window.Data);

