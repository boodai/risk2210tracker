window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){
  Views.EndGame = Views.EndGame || {};

  Views.EndGame.Overview = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-end-game-overview',

    events: {
      'click .btn' : 'goHome'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['end-game-overview'];
      view._childViews = [];
      view.model.gamePlayers.each( function(gamePlayer) {
        view._childViews.push(new Views.EndGame.Player({ model : view.model, gamePlayer : gamePlayer } ));
      });

    },
    render: function() { var view = this;
      var lastTurn = view.model.years.last().turns.last();
      var lastBoard = lastTurn.actions.last().get('boardState');

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());
        _.each(this._childViews, function(childView) {
          view.$el.append(childView.render().el)
        });
      }

      return view;
    },
    goHome : function() {
      window.location.reload();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

