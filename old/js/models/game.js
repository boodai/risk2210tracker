window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Game = Backbone.Model.extend({
    defaults: {
      'game' : null,
      'players' : null,
      'years' : 5,
      randomStart : true
    },
    localStorage: new Store(app.storeName + '::Game'),
    initialize: function(attributes, options) {
      var model = this;
      model.boardGame = app.boardGames.get(model.get('game'));

      // create the board snapshot
      var board = {};
      _.each(model.boardGame.territories(), function(terr) {
        board[terr.get('id')] = null;
      });
      model.set({'board': board})
    },
    randomize: function() {
      var model = this;
      var randomable = [],
          players = [];
      // get list of all randomable territory ids
      _.each(model.boardGame.territories(), function(terr) {
        if(terr.get('type') == model.boardGame.get('randomable')) {
          randomable.push(terr.get('id'));
        }
      });
      // player id array
      for (var key in model.get('players')) {
        players.push(key);
      }

      // shuffle list
      randomable = shuffle(randomable.slice(0));
      var perUser = randomable.length / players.length;
      for(var x = 0; x < players.length;x++ ) {
        _.each(randomable.slice(x*perUser,(x+1)*perUser), function(terr) {
          model.get('board')[terr] = players[x];
        });
      }
    }
  });

  Collections.Games = Backbone.Collection.extend({
    model: window.Models.Game,
    localStorage: new Store(app.storeName + '::Game')
  });


})(Backbone, window.Models, window.Collections, window.Views);

