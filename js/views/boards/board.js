window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Boards = Views.Boards || {};

  Views.Boards.Board = Backbone.View.extend({
    tagName: 'div',
    className: 'board',

    events: {
    },
    initialize: function(options) {
      var view = this;
      view._game = options.game || null;
      view._colonyViews = [];
      view.model.colonies.each(function(colony){
        view._colonyViews.push( new window.Views.Boards.Colony({model: colony, game: view._game}) );
      });
    },

    render: function() {
      var view = this;
      for(var c=0; c<view._colonyViews.length; c++) {
        view.$el.append(view._colonyViews[c].render().el);
      }

      return view;
    }

  });

})(Backbone, window.Models, window.Collections, window.Views);

