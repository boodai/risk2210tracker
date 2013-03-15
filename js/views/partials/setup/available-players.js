window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Partials = Views.Partials || {};
  Views.Partials.Setup = Views.Partials.Setup || {};
  Views.Partials.Setup.AvailablePlayers = Backbone.View.extend({
    tagName: 'select',
    className: 'available-players',

    events: {
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
//      view._template = window.JST['setup-available-player'];
    },
    render: function() { var view = this;
      var html = '';
      view.collection.each(function(player){
        html = html + '<option value="' + player.id + '">' + player.get('name') + '</option>';
      });

      view.$el.html(html);

      return view;
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

