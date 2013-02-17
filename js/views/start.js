window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Start = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-start',

    events: {
      'click .btn' : 'setupGame'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['start'];
    },
    render: function() {
      var view = this;

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());

      }

      return view;
    },
    setupGame : function() {
      // TODO better way to do this not accessing controller directly
      app.gameSetupView();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

