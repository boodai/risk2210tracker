window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.PreviousGames = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-previous-games',

    events: {
      'click .btn.back' : 'goHome',
      'click .btn.view' : 'viewEndGame'
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
        var html = "<p>";
        html = html + "<strong>Date: </strong>" + game.get('createdAt');
        html = html + " <strong>Players: </strong>";
        game.gamePlayers.each(function(gp) {
          html = html + gp.player().get('name') + ", ";
        });
        html = html + "</p> <button class='btn view' data-game-id='" + game.id + "'>view end game</button>";
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
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

