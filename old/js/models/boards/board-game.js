window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Models.BoardGame = Backbone.Model.extend({
    defaults: {
      'name' : '',
      'shortName' : '',
      'years' : null,
      'players' : null
    },
    initialize: function(attributes, options) {
      var model = this;
      model._originalData = attributes;
      // build out the boards
      var boardArray = [],
          board;
      for (var boardKey in attributes.boards) {
        board = {};
        board.id = boardKey;
        board.name = boardKey;
        board.types = attributes.boards[boardKey];
        boardArray.push(board);
      }
      model.boards = new window.Collections.Boards(boardArray, { parent : model });
      // remove the scruff
      model.unset('boards');
    },
    territories: function() {
      var model = this;
      var territories = [];
      model.boards.each(function(board){
        board.colonies.each(function(colony){
          colony.territories.each(function(territory){
            territories.push(territory);
          });
        });
      });
      return territories;
    }
  });

  Collections.BoardGames = Backbone.Collection.extend({
    model: window.Models.BoardGame
  });

})(Backbone, window.Models, window.Collections, window.Views);

