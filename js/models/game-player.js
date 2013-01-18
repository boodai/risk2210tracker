window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.GamePlayer = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameId' : null,
      'playerId' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this;
      // lets give it a nice guid id
      model.set('id', uuid());
    }
  });

  Collections.GamePlayers = Backbone.Collection.extend({
    model: window.Models.GamePlayer,
    initialize: function(models, options) {
      options || (options = {});
      if (options.gameId) {
        // passed in a game id to tie this collection to
        this._gameId = options.gameId;
      }
      var collection = this;
    }
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections);

