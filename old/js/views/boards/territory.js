window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Boards = Views.Boards || {};

  Views.Boards.Territory = Backbone.View.extend({
    tagName: 'div',
    className: 'territory',

    events: {
    },
    initialize: function(options) {
      var view = this;
      view._game = options.game || null;

    },
    render: function() {
      var view = this;
      view.$el.addClass(view.model.get('type').toLowerCase());
      view.$el.html(view.model.get('name'));
      view.$el.css({
        'background-color': view.model.collection._parent.get('color'),
        top: view.model.get('top') + 'pt',
        left: view.model.get('left') + 'pt',
        width: view.model.get('width') + 'pt',
        height: view.model.get('height') + 'pt',
        'padding-top': (view.model.get('height')*.4)  + 'pt'
      });

      // Check if someone owns this territory
      var ownerId = view._game.get('board')[view.model.get('id')],
          playerColorId, colorHex;
      if(view._game != null) {
        if(ownerId != null) {
          playerColorId = view._game.get('players')[ownerId];
          colorHex = view._game.boardGame.get('players').colors[playerColorId];
          view.$el.css('background-color', colorHex);
        }
      }
      return view;
    }

  });

})(Backbone, window.Models, window.Collections, window.Views);

