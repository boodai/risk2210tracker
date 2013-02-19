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

      var data = {
        player : view.model.years.last().turns.last().player().get('name'),
        year : view.model.years.last().get('number'),
        players : {}
      };

      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template());
      }

      return view;
    },
    goHome : function() {
      window.location.reload();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

