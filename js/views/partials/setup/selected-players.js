window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){

  Views.Partials = Views.Partials || {};
  Views.Partials.Setup = Views.Partials.Setup || {};
  Views.Partials.Setup.SelectedPlayers = Backbone.View.extend({
    tagName: 'ol',
    className: 'selected-players',

    events: {
      'change li select' : 'changeColor'
    },
    initialize: function(options) { var view = this;
      options = options || {};

      view.colors = options.colors;
      view.playerColors = {};


//      view._parent = options.parent || null;
//      view._template = window.JST['setup-available-player'];
    },
    render: function() { var view = this;
      var html = '';
      view.collection.each(function(player){
        html = html + "<li>" + player.get('name') + view.colorsHtml(player) + "<button class='btn remove-player' data-id='" + player.id + "'>remove</button></li>";
      });

      view.$el.html(html);

      return view;
    },
    colorsHtml : function(player) { var view = this;
      var selectHtml = "<select size='1' data-id='" + player.id + "'>";

      _.each(view.colors, function(value, key){
        var selected = false;
        if(exists(view.playerColors[player.id])) {
          // player has a color, check if current
          if(view.playerColors[player.id] == key) {
            selected = true;
          }
        } else {
          // player does not have a color
          if( _.indexOf(_.values(view.playerColors), key) == -1 ) {
            // this color is not used, assign it to user
            view.playerColors[player.id] = key;
            selected = true;
          }
        }

        var optionHtml = "<option value='" + key + "'";
        if(selected) {
          optionHtml = optionHtml + " selected='selected'";
        }
        optionHtml = optionHtml + ">" + value.name + "</option>";

        selectHtml = selectHtml + optionHtml;
      });
      selectHtml = selectHtml + "</select>";

      return selectHtml;
    },
    changeColor : function(e) { var view = this;

      var newColor = e.currentTarget.selectedOptions[0].value;
      var playerId = e.currentTarget.dataset.id;
      // get old value for this player
      var oldColor = view.playerColors[playerId];

      // check if someone else has new color
      var inverted = _.invert(view.playerColors);
      if(_.has(inverted, newColor) ) {
        // someone else has the color, lets just swap them
        var otherPlayerId = inverted[newColor];
        view.playerColors[otherPlayerId] = oldColor;
        view.playerColors[playerId] = newColor;
      } else {
        // no one else has the new color, just switch it
        view.playerColors[playerId] = newColor;
      }

      view.render();
    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

