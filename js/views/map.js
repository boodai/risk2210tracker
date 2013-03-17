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
            // Create the path
            var terrSVG = view.paper.path(territory.get('display').svg);

            // update the internal conversion chart
            view.mapToPaper[territory.id] = terrSVG.id;

            // Border
            terrSVG.attr({ stroke : continent.get('color'), cursor : 'pointer', 'stroke-width' : 3 });

            // TODO make this work
            //view.labelPath(paper, terrSVG, territory.get('name'));

            // color the Territory
            view.colorTerritory(territory, terrSVG);

            // Store the territory id on the svg
            terrSVG.data('id', territory.id);

            // click events
            terrSVG.click(function() { view.territoryClick(territory,this) });

            terrSVG.dblclick(function() {  view.territoryDoubleClick(territory,this) });

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
    colorTerritory : function(territory, terrSVG) { var view = this;
      if(view.game.board[territory.id] == view.game.get('devastatedKey')) {
        // devastated territory
        terrSVG.attr({ fill :  'url(img/devastate-100.png)' });
      } else if(view.game.board[territory.id] != null) {
        // already owned
        var color = view.model.gameType.get('players').colors[view.game.gamePlayers.where({playerId : view.game.board[territory.id]})[0].get('color')]['rgba'];
        terrSVG.attr({ fill :  color });
      } else {
        // not owned
        terrSVG.attr({ fill : '#FFFFFF' });
      }
    },
    territoryClick : function(territory, terrSVG) { var view = this;
      // Check if devastated or if current player already owns
      if( view.game.board[territory.id] != view.game.get('devastatedKey')
          && view.game.board[territory.id] != view.gamePlayer.get('playerId') ) {

        // add to history
        view.history.push({ territoryId : territory.id, playerId : view.game.board[territory.id] });

        // Add the action
        window.app.newAction(territory.id, view.gamePlayer.get('playerId'));

        view.colorTerritory(territory, terrSVG);
      }
    },
    territoryDoubleClick : function(territory, terrSVG) { var view = this;
      if( view.game.board[territory.id] != view.game.get('devastatedKey') ) {
        // Not a devastated territory

        // add to history
        view.history.push({ territoryId : territory.id, playerId : view.game.board[territory.id] })

        // add action
        window.app.newAction(territory.id, null);

        view.colorTerritory(territory, terrSVG);
      }
    },
    undoAction : function() { var view = this;
      var lastActionTerrId = window.app.lastAction().get('territoryId');

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

