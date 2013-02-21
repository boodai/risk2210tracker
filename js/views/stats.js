window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Stats = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-stats',

    events: {
//      'click .btn' : 'startTurn'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['stats'];

      view.model.on('newAction', this.render, this);
    },
    render: function() { var view = this;
      var player, territories = 0, mods = 0, energy = 0;
      player = view.model.years.last().turns.last().player();

      _.each(view.model.board, function(item,key) {
        if(item == player.id) { territories++; }
      });

      // base mods
      mods = Math.floor((territories-9)/3)+3;
      // now need ot know if user owns a country
      view.model.gameType.maps.each(function(map){
        map.continents.each(function(continent) {
          var terrNum = 0;
          continent.territories.each(function(terr){
            if(view.model.board[terr.id] == player.id) {
              terrNum++;
            }
          });
          if(terrNum == continent.territories.length) {
            // owns that continent
            mods = mods + continent.get('bonus');
          }
        });
      });
      energy = mods;


      var data = {
        player : player.get('name'),
        year : view.model.years.last().get('number'),
        territories : territories,
        mods : mods,
        energy : energy
      };

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template(data));
      }

      return view;
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

