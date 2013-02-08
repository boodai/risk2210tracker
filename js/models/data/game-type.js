window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections, window ){
  Models.Data = Models.Data || {};
  Models.Data.GameType = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null,
      'years' : null,
      'players' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this; options || (options = {});
      if( !exists(options.maps) ) { throw 'Maps were not passed in options hash.'; }

      model.maps = new Collections.Data.Maps();

      // Now that we have a game, we need the maps
      _.each(options.maps, function(map, mapKey, list) {
        var mapModel = new Models.Data.Map({ id : mapKey,
                                              name : map.name,
                                              display : map.display,
                                              gameTypeId : attributes.id }
                                            , { parent : model, continents : map.continents });
        window.collections.data.maps.add(mapModel);
        // add it to the gameType
        model.maps.add(mapModel);
      });
    }
  });

  Collections.Data = Collections.Data || {};
  Collections.Data.GameTypes = Backbone.Collection.extend({
    model: window.Models.Data.GameType
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections, window);

