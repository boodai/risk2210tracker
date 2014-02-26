window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){
  Views.Menus = Views.Menus || {};

  Views.Menus.PreviousGames = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-previous-games menu',

    events: {
      'click .btn.back' : 'goHome',
      'click .btn.view' : 'viewEndGame',
      'click .btn.continue' : 'continueGame'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['previous-games'];
    },
    render: function() { var view = this;

      var data = {

      };

      // TODO  fix this stupidity so specs work bfter
      if(view._template != undefined ) {
        view.$el.html(view._template());
      }

      view.collection.each( function(game) {
        var lastTurn = 0;
        if(game.years.last().turns.length > 0) {
          lastTurn = game.years.last().turns.last().get('number');
        }

        var html = "<p>";
        html = html + "<strong>Started: </strong>" + game.get('startedAt');
        html = html + "<strong>Time Played: </strong>";
        html = html + " <strong>Last Year:</strong>: </strong>" + game.years.last().get('number');
        html = html + " <strong>Last Turn:</strong>: </strong>" + lastTurn;
        html = html + " <strong>Players: </strong>";
        game.gamePlayers.each(function(gp) {
          html = html + gp.player().get('name') + ", ";
        });

        if(game.get('finishedAt') != null) {
          html = html + "</p> <button class='btn view' data-game-id='" + game.id + "'>view end game</button>";
        } else {
          html = html + "</p> <button class='btn continue' data-game-id='" + game.id + "'>continue game</button>";
        }
        view.$el.append(html);
      });

      return view;
    },
    goHome : function() {
      window.location.reload();
    },
    viewEndGame : function(e) {
      var gameId = e.currentTarget.dataset['gameId'];
      var game = window.collections.games.get(gameId);
      window.app.endGameView(game);
    },
    continueGame : function(e) {
      var gameId = e.currentTarget.dataset['gameId'];
      var game = window.collections.games.get(gameId);
      window.app.continueGame(game);
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

