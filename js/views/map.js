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
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
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

      window.cory = view.el;
      var paper = Raphael(view.el, view.model.get('display').svg.width, view.model.get('display').svg.height);

      view.model.continents.each(function(continent) {
        continent.territories.each(function(territory) {
          if( exists(territory.get('display').svg) ) {
            var item = paper.path(territory.get('display').svg);
            item.attr("fill", continent.get('color'));
          }
        });
      });


      return view;
    },
    selectTerritory : function() {
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

