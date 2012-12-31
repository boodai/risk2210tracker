// Simply checks if a variable exists or not
function exists(variable) {
  return (typeof(variable) != 'undefined');
}

// Shuffle an array using the Fisher-Yates method
// http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

// Setup the app
(function(window){

  window.app = {
    mode: 'development',
    storeName : 'RiskTrack',
    init: function() {
      // Setup boards
      this.boardGames = new window.Collections.BoardGames( window.Data.Risk2210 );

      // Setup Player Games
      this.playerGames = new window.Collections.Games();
      this.playerGames.fetch();

      // Get all the current players
      this.players = new window.Collections.Players();
      this.players.fetch();

      // Bind app the sub objects
      this.track._app = this;

      // Start up the router
      this.router = new window.Routers.App();
      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start({pushState: false});

    },
    updateScreen: function(html) {
      $('.app').html(html);
    },
    track : {
      startGame: function(data) {
        console.log('app::track::startGame');

        var game = data.board || 'risk2210',
            randomStart = data.randomStart || true,
            players = {};

        // Setup Players
        _.each(data.players, function(player) {
          if(player.id == 'new') {
            var newPlayer = new window.Models.Player({ name: player.name });
            newPlayer.save();
            players[newPlayer.get('id')] = player.color;
          } else {
            players[player.id] = player.color;
          }
        });

        // Setup Game
        game = new window.Models.Game({ game: game, randomStart: randomStart, players: players });
        // Randomize
        if(randomStart) {
          game.randomize();
        }

        // Save Game
        game.save();

        // Redirect to Year 1
        app.router.navigate('track/' + game.get('id') + '/year/1', {trigger: true});


        // Board is randomized, let users select turn order
        // TODO: create turn order page

        // instead we are going directly to the map for the moment.
//        var view = new window.Views.Boards.Board({ model: this._app.boardGames.get(game.get('game')).boards.get('Earth'),
//                                                   game: game
//                                                });
//        this._app.updateScreen(view.render().el);

      }

    }

  };

})( window);


// Set underscore to us <@  @> for interpolation instead of ruby (<% %>)
_.templateSettings = {
  interpolate: /\<\@\=(.+?)\@\>/gim,
  evaluate: /\<\@(.+?)\@\>/gim
};


// Overwriting console.log
//if (typeof console !== "undefined") {
//  console.originalLog = console.log;
//  if (app.mode == 'development') {
//    console.log = function() {
//      var canGroup = typeof console.groupCollapsed !== 'undefined';
//      if (canGroup) {
//        console.groupCollapsed.apply(this, arguments);
//      } else {
//        console.originalLog.apply(this, arguments);
//      }
//      if (typeof console.trace !== 'undefined') {
//        console.trace();
//      } else {
//        var stack = new Error().stack;
//        console.originalLog(stack);
//      }
//      if (canGroup) {
//        console.groupEnd();
//      }
//    };
//  } else {
//    console.log = function() {};
//  }
//}

$(function() {
  // Handler for .ready() called.

  // find all templates and load them into the JST object ( so do not have to rerun template)
  window.JST = {};
  $('.template').each( function(index,element) {
    window.JST[$(element).attr('id')] = _.template($(element).html());
  });

  // START
  // Initiate the router
  app.init();


});