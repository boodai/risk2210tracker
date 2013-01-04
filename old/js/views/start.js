window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Start = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-start setting-block',

    events: {
      'click .btn' : 'chooseType'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
      view._parent = options.parent || null;
      view._template = window.JST['start']
    },
    render: function() {
      var view = this;

      view.$el.html(view._template());

      return view;
    },
    chooseType : function(event) {
      var view = this;
      if($(event.currentTarget).hasClass('disabled')) {
        return view;
      }

      var type = $(event.currentTarget).data('type');
      app.router.navigate(type, {trigger: true});
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

