window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Boards = Views.Boards || {};

  Views.Boards.Colony = Backbone.View.extend({
    tagName: 'div',
    className: 'colony',

    events: {
    },

    initialize: function(options) {
      var view = this;
      view._game = options.game || null;

      view._territoryViews = [];
      view.model.territories.each(function(territory){
        view._territoryViews.push( new window.Views.Boards.Territory({model: territory, game: view._game}) );
      });
    },

    render: function() {
      var view = this;
      view.$el.css({'border-color': view.model.get('color'), 'border-width': '2px'});

      for(var c=0; c<view._territoryViews.length; c++) {
        view.$el.append(view._territoryViews[c].render().el);
      }

      return view;


      return view;
    }

  });

})(Backbone, window.Models, window.Collections, window.Views);

