window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Colony = Backbone.Model.extend({
    defaults: {
      'id' : '',
      'name' : '',
      'type' : null,
      'bonus' : null,
      'color' : null
    },
    initialize: function(attributes, options) {
      var model = this;

      // build out the territories
      var territoryArray = [],
          territory;
      for (var territoryKey in attributes.territories) {
        territory = attributes.territories[territoryKey];
        territory.id = territoryKey;
        territory.name = territoryKey;
        territory.type = model.get('type');
        territoryArray.push(territory);
      }

      model.territories = new window.Collections.Territories(territoryArray, { parent : model });
      // remove the scruff
      model.unset('territories');
    }
  });

  Collections.Colonies = Backbone.Collection.extend({
    model: window.Models.Colony,
    initialize: function(models, options) {
      var collection = this;
      options = options || {};
      collection._parent = options.parent || null;
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

