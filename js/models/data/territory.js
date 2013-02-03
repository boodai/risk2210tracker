window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections, window ){
  Models.Data = Models.Data || {};
  Models.Data.Territory = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null,
      'display' : null,
      'continentId' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      if( !exists(options) || !exists(options.parent) ) {
        throw 'Parent was not passed in options hash.';
      }

      var model = this;
      model._continent = options.parent;
    }
  });

  Collections.Data = Collections.Data || {};
  Collections.Data.Territories = Backbone.Collection.extend({
    model: window.Models.Data.Territory
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections, window);

