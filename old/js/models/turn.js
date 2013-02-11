window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Turn = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'yearId' : null,
      'playerId' : null,
      'number' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this;
      // lets give it a nice guid id
      model.set('id', uuid());
    }
  });

  Collections.Turns = Backbone.Collection.extend({
    model: window.Models.Turn,
    initialize: function(models, options) {
      options || (options = {});
      if (options.year) {
        this.year = options.year;
      } else { this.year = null; }
      // setup events
      this.on("add", function(model, collection, options) {
        model.year = collection.year;
        model.set('yearId', collection.year.get('id'));
      });
    }
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections);

