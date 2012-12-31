window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Player = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null
    },
    localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this;
      //model.territories = new window.Collections.Territories();
    }
  });

  Collections.Players = Backbone.Collection.extend({
    model: window.Models.Player,
    localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections, window.Views);

