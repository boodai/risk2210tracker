window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function(Backbone, Models, Collections ){

  Models.Game = Backbone.Model.extend({
    defaults: {
      'gameTypeId' : null,
      'num_years' : null,
      'created_at' : new Date()
    },
    //localStorage: new Store('Risk::Model::Game'),
    initialize: function(attributes, options) {
      var model = this;
    },
    // Set players
    addPlayer: function() {},
    removePlayer: function() {},
    // randomize board
    randomizeBoard: function() {}
    // Start new year
  });

  Collections.Games = Backbone.Collection.extend({
    model: window.Models.Game,
    localStorage: new Backbone.LocalStorage('Risk::Model::Game')
  });


})(Backbone, window.Models, window.Collections);

