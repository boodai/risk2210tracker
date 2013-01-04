window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Year = Backbone.Model.extend({
    defaults: {
      'number' : 1
    },
    initialize: function(attributes, options) {
      var model = this;
      //model.territories = new window.Collections.Territories();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

