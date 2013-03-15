window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Map = Backbone.View.extend({
    tagName: 'div',
    className: function() {return 'bbv-map '+this.model.id},

    events: {
      'click .btn.undo' : 'undoAction',
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
      view.game = options.game || null;
      view.gamePlayer = options.gamePlayer || null;
      view._template = window.JST['map'];
      view.mapToPaper = {};
      view.history = [];
    },
    render: function() { var view = this;
      var color;

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());
      }

      view.$el.css({ height : view.model.get('display').svg.height/2, width : view.model.get('display').svg.width/2 });

      view.paper = Raphael(view.el, view.model.get('display').svg.width, view.model.get('display').svg.height);

      view.model.continents.each(function(continent) {
        continent.territories.each(function(territory) {
          if( exists(territory.get('display').svg) ) {
            var item = view.paper.path(territory.get('display').svg);

            // update the internal converstion chart
            view.mapToPaper[territory.id] = item.id;

            item.attr({ stroke : continent.get('color'), cursor : 'pointer', 'stroke-width' : 3 });
            // TODO make this work
            //view.labelPath(paper, item, territory.get('name'));
            if(view.game.board[territory.id] != null) {
              // already owned
              var color = view.model.gameType.get('players').colors[view.game.gamePlayers.where({playerId : view.game.board[territory.id]})[0].get('color')]['rgba'];
              item.attr({ fill :  color });
            } else {
              item.attr({ fill : '#FFFFFF' });

            }

            item.data('id', territory.id);


            item.click(function() {
              // add to history
              view.history.push({ territoryId : territory.id, playerId : view.game.board[territory.id] })

              // Fill with characters color
              var color = view.model.gameType.get('players').colors[view.gamePlayer.get('color')]['rgba'];
              this.attr("fill", color);
              // add action
              window.app.newAction(territory.id, view.gamePlayer.get('playerId'));
            });

            item.dblclick(function() {
              // add to history
              view.history.push({ territoryId : territory.id, playerId : view.game.board[territory.id] })

              // Fill with characters color
              this.attr("fill", '#FFFFFF');
              // add action
              window.app.newAction(territory.id, null);
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
      paper.rect( bbox.x,  bbox.y,  bbox.width,  bbox.height);
      paper.text( bbox.x , bbox.y , 'woot' );
//      console.log(bbox);
//      var textObj = paper.text( bbox.x , bbox.y , text ); //.attr( textattr );
//      return textObj;
    },
    undoAction : function() { var view = this;
      var last = view.history.pop();
      if(last) {
        // get paper id
        var paperId = view.mapToPaper[last.territoryId];
        // get paper item
        var item = view.paper.getById(paperId);
        if(last.playerId != null) {
          var color = view.game.gamePlayers.where({playerId : last.playerId})[0].get('color');
        } else {
          var color = '#FFFFFF';
        }

        item.attr({ fill : color });

        // remove the action
        window.app.undoAction();
      }
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

