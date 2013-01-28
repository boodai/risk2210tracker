window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.GameType = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null,
      'years' : null,
      'players' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this;
    }
  });

  Collections.GameTypes = Backbone.Collection.extend({
    model: window.Models.GameType
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections);

