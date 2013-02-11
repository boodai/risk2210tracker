window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Year = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'gameId' : null,
      'number' : null,
      'playerOrder' : []
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this;
      // lets give it a nice guid id
      model.set('id', uuid());
    }
  });

  Collections.Years = Backbone.Collection.extend({
    model: window.Models.Year,
    initialize: function(models, options) {
      options || (options = {});
      if (options.game) {
        this.game = options.game;
      } else { this.game = null; }
      // setup events
      this.on("add", function(model, collection, options) {
        model.game = collection.game;
        model.set('gameId', collection.game.get('id'));
      });
    }
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections);

