window.Models = window.Models || {};
window.Collections = window.Collections || {};

(function( Backbone, Models, Collections ){

  Models.Player = Backbone.Model.extend({
    defaults: {
      'id' : null,
      'name' : null
    },
    initialize: function(attributes, options) {
      var model = this;
      // lets give it a nice guid id
      if(model.id == null) {
        model.set('id', uuid());
      }


    }
  });

  Collections.Players = Backbone.Collection.extend({
    model: window.Models.Player,
    localStorage: new Backbone.LocalStorage("Risk::Model::Player"),
    comparator : function(action) {
      return action.get("name");
    }
  });

})(Backbone, window.Models, window.Collections);

