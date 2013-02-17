window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.GameSetup = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-game-setup',

    events: {
      'click .btn' : 'startGame'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['game-setup'];
    },
    render: function() {
      var view = this;

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());
      }

      return view;
    },
    startGame : function() {
      // TODO find a wy to not call directly into window.app
      window.app.createGame('risk2210', 5 )
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

