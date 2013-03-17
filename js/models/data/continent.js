window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections, window ){
  Models.Data = Models.Data || {};
  Models.Data.Continent = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null,
      'bonus' : null,
      'color' : null,
      'type' : null,
      'mapId' : null,
      'isStartingContinent' : null
    },
    //localStorage: new Store(app.storeName + '::Player'),
    initialize: function(attributes, options) {
      var model = this; options || (options = {});

      if( !exists(options.territories) ) { throw 'Territories were not passed in options hash.'; }
      if( !exists(options.parent) ) { throw 'Parent was not passed in options hash.'; }

      model.territories = new Collections.Data.Territories();
      model.map = options.parent;

      // Now we need the territories
      _.each(options.territories, function(territory, territoryKey, list) {
        var territoryModel = new Models.Data.Territory({ id : territoryKey,
                                                          name : territory.name,
                                                          display : territory.display,
                                                          continentId : attributes.id }
                                                        , { parent : model });
        window.collections.data.territories.add(territoryModel);
        // add it to the gameType
        model.territories.add(territoryModel);
      });
    }
  });

  Collections.Data = Collections.Data || {};
  Collections.Data.Continents = Backbone.Collection.extend({
    model: window.Models.Data.Continent
    //localStorage: new Store(app.storeName + '::Player')
  });

})(Backbone, window.Models, window.Collections, window);

