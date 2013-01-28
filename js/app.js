(function(window){

  window.app = {
    init: function() {
      // Get the collections up and running
      window.Data = window.Data || {};
      window.collections = window.collections || {};
      window.collections.players = new window.Collections.Players();
      window.collections.gameTypes = new window.Collections.GameTypes();

    },
    // Need to import the games and boards
    importData : function() { var app = this;
      if( !exists(window.Data.gameTypes) ) {
        throw 'No game types found.'
      }

      app.gameTypes = {};
      _.each(window.Data.gameTypes, function(type, key, list) {
        app.gameTypes[key] = type.name;
      });

//      if( exists(window.Data.gameTypes) ) {
//        _.each(window.Data.gameTypes, function(type, key, list) {
//          // Create the game type
//          window.collections.gameTypes.add({ id : type.id, name : type.name, years : type.years, players : type.players });
//        });
//      }
    },
    createGame : function(gameType, years) { var app = this;

      // make sure is a valid gameType
      console.log( Object.keys(app.gameTypes));
      if( Object.keys(app.gameTypes).lastIndexOf(gameType) < 0 ) {
        throw 'Game type not found.'
      }
      var gameData = window.Data.gameTypes[gameType];
      //years || (years = gameData.years.default);

      // check the years for the game
      if(parseInt(years) < gameData.years.min) {
        throw 'Years must at least be ' + gameData.years.min;
      }
      if(parseInt(years) > gameData.years.max) {
        throw 'Years must less than ' + (gameData.years.max+1);
      }

      app._currentGame = window.Models.Game({ gameType:gameType, numYears:years});
    }


  }
})( window );

