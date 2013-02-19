window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.TurnOrder = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-turn-order',

    events: {
      'click .btn' : 'startTurn'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['turn-order'];
    },
    render: function() { var view = this;

      var data = {
        name : view.model.gameType.get('name'),
        year : view.model.years.last().get('number'),
        players : {}
      };
      // add in the players and colors
      view.model.gamePlayers.each(function(gp) {
        data.players[gp.get('playerId')] = {
          name : gp.player().get('name'),
          color : view.model.gameType.get('players').colors[gp.get('color')].rgba
        }
      });

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template(data));
      }

      view.$( "#sortable" ).sortable({
        placeholder: "ui-state-highlight"
      });
      view.$( "#sortable" ).disableSelection();

      return view;
    },
    startTurn : function() { var view = this;
      var data = {
        order : []
      };
      view.$('li').map(function() {
        data.order.push($(this).data('id'));
      });
      window.app.updateYear(data);
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

