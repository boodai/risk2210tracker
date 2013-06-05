window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){
  Views.EndGame = Views.EndGame || {};

  Views.EndGame.Player = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-end-game-player',

    events: {
      'click .btn.add' : 'addInfluence',
      'click .btn.remove' : 'removeInfluence'
    },
    initialize: function(options) { var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['end-game-player'];
      view._gamePlayer = options['gamePlayer'];
    },
    render: function() { var view = this;
      view._gamePlayer.fetch();
      var lastTurn = view.model.years.last().turns.last();
      var lastBoard = lastTurn.actions.last().get('boardState');

      var data = {
        player : view._gamePlayer.player().get('name'),
        continentNames : '',
        territories : 0,
        continentBonuses : 0,
        colonialInfluence : view._gamePlayer.get('colonialInfluence'),
        total : 0
      };

      view.model.gameType.maps.each(function(map){
        map.continents.each(function(continent) {
          var terrNum = 0;
          continent.territories.each(function(terr){
            if(lastBoard[terr.id] == view._gamePlayer.player().id) {
              terrNum++;
            }
          });
          if(terrNum == continent.territories.length) {
            // owns that continent
            if(data['continentNames'].length > 0) { data['continentNames'] = data['continentNames'] + ', '}
            data['continentNames'] = data['continentNames'] + continent.get('name');
            data['continentBonuses'] = data['continentBonuses'] + continent.get('bonus');
          }
        });

        // Get number of territories
        _.each(lastBoard, function(item,key) {
          if(item == view._gamePlayer.player().id) { data['territories']++; }
        });

        data['total'] = data['continentBonuses'] + data['territories'] + data['colonialInfluence'];

        // TODO  fix this stupidity so specs work better
        if(view._template != undefined ) {
          view.$el.html(view._template(data));
        }

      });

      return view;
    },
    addInfluence : function() { var view = this;
      view._gamePlayer.addInfluence();
      view.render();
      return false;
    },
    removeInfluence : function() { var view = this;
      view._gamePlayer.removeInfluence();
      view.render();
      return false;
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

