window.collections = window.collections || {};

(function(window, collections, Models, Collections, Data){

  window.app = {
    init: function() {
      // Get the collections up and running
      collections.players = new Collections.Players();
      collections.data = window.collections.data || {};
      collections.data.gameTypes = new Collections.Data.GameTypes();
      collections.data.maps = new Collections.Data.Maps();
      collections.data.continents = new Collections.Data.Continents();
      collections.data.territories = new Collections.Data.Territories();

    },
    // Need to import the games and boards
    importData : function() { var app = this;
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
        window.collections.data.gameTypes.add(type_model);
      });

    },
    createGame : function(gameType, years) { var app = this;

      // make sure is a valid gameType
      console.log( Object.keys(app.gameTypes));
      if( Object.keys(app.gameTypes).lastIndexOf(gameType) < 0 ) {
        throw 'Game type not found.';
      }
      var gameData = Data.gameTypes[gameType];
      //years || (years = gameData.years.default);

      // check the years for the game
      if(parseInt(years) < gameData.years.min) {
        throw 'Years must at least be ' + gameData.years.min;
      }
      if(parseInt(years) > gameData.years.max) {
        throw 'Years must less than ' + (gameData.years.max+1);
      }

      app._currentGame = Models.Game({ gameType:gameType, numYears:years});
    }


  }
})( window, window.collections, window.Models, window.Collections, window.Data);

