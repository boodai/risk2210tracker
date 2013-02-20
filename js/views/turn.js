window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Turn = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-turn',

    events: {
      'click .btn.end-turn' : 'endTurn'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
      view._template = window.JST['turn'];

      // create the maps array
      view.maps = [];
    },
    render: function() { var view = this;
      var player = view.model.years.last().turns.last().player();
      console.log(player.id);
      var gamePlayer = view.model.gamePlayers.where({ playerId : player.id })[0];
      // need the maps
      // just sending earth for now
      var earth = view.model.gameType.maps.first();
      view.maps.push(new Views.Map({ model : earth, gamePlayer : gamePlayer, game : view.model }));

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
      view.$el.prepend(view.maps[0].render().el);

      return view;
    },
    endTurn : function() {
      window.app.endTurn();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

