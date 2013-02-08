window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections, window ){

  Models.Data = Models.Data || {};
  Models.Data.Map = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null,
      'display' : null,
      'gameTypeId' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this; options || (options = {});
      if( !exists(options.continents) ) { throw 'Continents were not passed in options hash.'; }
      if( !exists(options.parent) ) { throw 'Parent was not passed in options hash.'; }


      model.continents = new Collections.Data.Continents();
      model.gameType = options.parent;

      // Now we need the continents
      _.each(options.continents, function(continent, continentKey, list) {
        var continentModel = new Models.Data.Continent({ id : continentKey,
                                                          name : continent.name,
                                                          bonus : continent.bonus,
                                                          color : continent.color,
                                                          type : continent.type,
                                                          mapId : attributes.id }
                                                        , { parent : model, territories : continent.territories });
        window.collections.data.continents.add(continentModel);
        // add it to the gameType
        model.continents.add(continentModel);
      });
    }
  });

  Collections.Data = Collections.Data || {};
  Collections.Data.Maps = Backbone.Collection.extend({
    model: window.Models.Data.Map
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections, window);
