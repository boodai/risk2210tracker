window.Routers = window.Routers || {};
window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views, Routers){

  Routers.App = Backbone.Router.extend({
    routes: {
      "track"       :    "track",
      "replay"      :    "replay",
      "stats"       :    "stats",
      "track/:game/year/:year"  :    "trackYear",
      "*actions"    :    "default"   // default Route
    },
    LOG : 'Routers.App',
    initialize: function(options) {



    },
    default: function() {
      var router = this;
      console.log(router.LOG + '::default');

      var view = new window.Views.Start();

      // Put it on the screen
      app.updateScreen(view.render().el);
    },

    track: function() {
      var router = this;
      console.log(router.LOG + '::track');

      var view = new window.Views.Track.Options();
      app.updateScreen(view.render().el);
    },
    trackYear: function(game, year) {
      var router = this;
      console.log(router.LOG + '::trackYear');

      var view = new window.Views.Track.Year({game: game, year: year});
      app.updateScreen(view.render().el);
    },
    replay: function() {
      var router = this;
      console.log(router.LOG + '::replay');

      app.updateScreen('replay');
    },
    stats: function() {
      var router = this;
      console.log(router.LOG + '::stats');

      app.updateScreen('stats');
    }

  });

})(Backbone, window.Models, window.Collections, window.Views, window.Routers);

