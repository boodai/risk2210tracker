window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Track = Views.Track || {};

  Views.Track.Year = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-track-year  setting-block',
    LOG: 'Views.Track.Year',

    events: {
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
      view._parent = options.parent || null;
      view._template = window.JST['track_year'];

      // Load up game if need be
      if(typeof options.game == 'string') {
        options.game = app.playerGames.get(options.game);
      }
      view._game = options.game;
    },
    render: function() {
      var view = this;
      var html;

      view.$el.html(view._template());

      _.each(view._game.get('players'), function(color, key) {

        html = "<li>" + key + "</li>";
        view.$('.js-turn-list').append(html);
        console.log(color);
        console.log(key);
      });

      view.$('.js-turn-list').sortable({
        placeholder: 'ui-state-highlight',
        change: function (e,ui){
          $(ui.placeholder).hide().slideDown();
        }
      });
      view.$('.js-turn-list').disableSelection();

      return view;
    }


  });

})(Backbone, window.Models, window.Collections, window.Views);

