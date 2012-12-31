window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Territory = Backbone.Model.extend({
    defaults: {
      'id' : '',
      'name' : '',
      'type' : null,
      'top' : 0,
      'left' : 0,
      'width' : 0,
      'height' : 0
    },
    initialize: function(attributes, options) {
      var model = this;
    }
  });

  Collections.Territories = Backbone.Collection.extend({
    model: window.Models.Territory,
    initialize: function(models, options) {
      var collection = this;
      options = options || {};
      collection._parent = options.parent || null;
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

