window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Map = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-map',

    events: {
//      'click .btn' : 'endTurn'
    },
    initialize: function(options) {
      console.log(options);
      var view = this;
      options = options || {};
      view.game = options.game || null;
      view.gamePlayer = options.gamePlayer || null;
      view._template = window.JST['map'];
    },
    render: function() { var view = this;

      // need the maps

      // need the stats

      // dunno what else we need


      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());
      }

      var paper = Raphael(view.el, view.model.get('display').svg.width, view.model.get('display').svg.height);

      view.model.continents.each(function(continent) {
        continent.territories.each(function(territory) {
          if( exists(territory.get('display').svg) ) {
            var item = paper.path(territory.get('display').svg);
            item.attr({ stroke : continent.get('color'), cursor : 'pointer', 'stroke-width' : 3 });
            view.labelPath(paper, item, territory.get('name'));
            if(view.game.board[territory.id] != null) {
              // already owned
              item.attr({ fill : view.game.gamePlayers.where({playerId : view.game.board[territory.id]})[0].get('color')  });
            } else {
              item.attr({ fill : '#FFFFFF' });
            }

            item.data('id', territory.id);
            item.click(function() {
              // Fill with characters color
              this.attr("fill", view.gamePlayer.get('color'));
              // add action
              window.app.newAction(territory.id, view.gamePlayer.get('playerId'));
            });
          }
        });
      });


      return view;
    },
    labelPath : function(paper, pathObj, text, textattr ) { var view = this;
      if ( textattr == undefined )
        textattr = { 'font-size': 20, fill: '#000', stroke: 'none', 'font-family': 'Arial,Helvetica,sans-serif', 'font-weight': 400 };
      var bbox = pathObj.getBBox();
      console.log(bbox);
      var textObj = paper.text( bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, text ); //.attr( textattr );
      return textObj;
    },
    selectTerritory : function() {
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

