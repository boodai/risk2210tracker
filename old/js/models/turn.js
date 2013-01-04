window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.Turn = Backbone.Model.extend({
    defaults: {
      'player' : null
    },
    initialize: function(attributes, options) {
      var model = this;
      //model.territories = new window.Collections.Territories();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

