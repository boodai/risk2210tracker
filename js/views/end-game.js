window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.EndGame = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-end-game',

    events: {
      'click .btn' : 'goHome'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['end-game'];
    },
    render: function() { var view = this;
      var lastTurn = view.model.years.last().turns.last();
      var lastBoard = lastTurn.actions.last().get('boardState');

      var data = {
        player : lastTurn.player().get('name'),
        year : view.model.years.last().get('number'),
        players : {}
      };

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());
      }


      view.model.gamePlayers.each( function(gamePlayer) {
        // get continent names and bonuses
        var continentNames = '', continentBonuses = 0;

        view.model.gameType.maps.each(function(map){
          map.continents.each(function(continent) {
            var terrNum = 0;
            continent.territories.each(function(terr){
              if(lastBoard[terr.id] == gamePlayer.player().id) {
                terrNum++;
              }
            });
            if(terrNum == continent.territories.length) {
              // owns that continent
              if(continentNames.length > 0) { continentNames = continentNames + ', '}
              continentNames = continentNames + continent.get('name');
              continentBonuses = continentBonuses + continent.get('bonus');
            }
          });
        });


        // Get number of territories
        var territories = 0;
        _.each(lastBoard, function(item,key) {
          if(item == gamePlayer.player().id) { territories++; }
        });

        var html = "<p>";
        html = html + "<strong>Player: </strong>" + gamePlayer.player().get('name') + "<br>";
        html = html + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Continents Owned: " + continentNames + "<br>";
        html = html + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number Territories: " + territories + "<br>";
        html = html + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Continent Bonus: " + continentBonuses + "<br>";
        html = html + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total: " + (territories + continentBonuses) + "<br>";
        view.$el.append(html);
      });

      return view;
    },
    goHome : function() {
      window.location.reload();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

