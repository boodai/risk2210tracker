window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Turn = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-turn',

    events: {
      'click .btn.end-turn' : 'endTurn',
      'click .btn.next-map' : 'nextMap'
    },
    initialize: function(options) { var view = this;
      options = options || {};
      view._template = window.JST['turn'];

      // create the maps array
      view.maps = [];
      view._currentMap = 0;
      view.stats = new Views.Stats({ model : view.model });
    },
    render: function() { var view = this;
      var player = view.model.years.last().turns.last().player();
      var gamePlayer = view.model.gamePlayers.where({ playerId : player.id })[0];
      // need the maps
      view.model.gameType.maps.each(function(map) {
        view.maps.push(new Views.Map({ model : map, gamePlayer : gamePlayer, game : view.model }));
      });

      // need the stats

      // dunno what else we need

      var data = {
        player : player.get('name')
      };

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template(data));
      }

      // prepend on the map
      view.$el.prepend(view.maps[view._currentMap].render().el);
      // append the stats
      view.$el.append(view.stats.render().el);

      return view;
    },
    endTurn : function() { var view = this;
      window.app.endTurn();
    },
    nextMap : function() { var view = this;
      view._currentMap++;
      if(view._currentMap >= view.maps.length) {
        view._currentMap = 0;
      }

      // TODO  slide these things instead of just removing and adding them :)

      view.$('.bbv-map').remove();
      view.$el.prepend(view.maps[view._currentMap].render().el);
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

