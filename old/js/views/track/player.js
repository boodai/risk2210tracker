window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Track = Views.Track || {};

  Views.Track.Player = Backbone.View.extend({
    tagName: 'li',
    className: 'bbv-track-player',

    events: {
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
      view._parent = options.parent || null;
      view._template = window.JST['track_player'];

      view._colorName = options.colorName;
      view._color = options.color;

    },
    render: function() {
      var view = this;
      view.$el.html(view._template());
      view.$('span').css('background-color',view._color);

      // Add all previous players to dropdown
      app.players.each(function(player) {
        view.$('.player-dropdown').append('<option value="' + player.get('id') + '">' + player.get('name') + '</option>');
      });

      return view;
    },
    getPlayer: function() {
      var view = this;
      // Return the color and id/new player if not set to empty
      var option = view.$('.player-dropdown').val();
      if(option == 'empty') {
        return null;
      } else if( option == 'new') {
        return { color : view._colorName, id: option, name: view.$('.player-name').val() };
      } else {
        return { color : view._colorName, id: option, name: null };
      }

    }


  });

})(Backbone, window.Models, window.Collections, window.Views);

