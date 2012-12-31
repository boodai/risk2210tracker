window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};

(function(Backbone, Models, Collections, Views){

  Views.Track = Views.Track || {};

  Views.Track.Options = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-track-options  setting-block',
    LOG: 'Views.Track.Options',

    events: {
      'click .js-start' : 'startGame',
      'change .game-type' : 'changePlayers'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
      view._parent = options.parent || null;
      view._template = window.JST['track_options'];
      view._playerViews = [];
    },
    render: function() {
      var view = this;

      view.$el.html(view._template());

      var options = [];
      app.boardGames.each(function(boardGame){
        options.push('<option value="' + boardGame.get('id') + '">' + boardGame.get('name') + '</option>');
      });
      view.$('.game-type').html(options.join(''));
      // Trigger the change players
      view.$('.game-type').trigger('change');
      return view;
    },
    changePlayers : function(event) {
      console.log(this.LOG + '::changePlayers');
      var view = this;
      var selected = $(event.currentTarget).val();
      var colors = app.boardGames.get(selected).get('players').colors;
      for (var key in colors) {
        view._playerViews.push( new window.Views.Track.Player({ color: colors[key], colorName: key }) );
      }
      _.each(view._playerViews, function(pv) {
        view.$('.player-list').append(pv.render().el);
      });
//      view._playersView =  new window.Views.Track.Players({ players: app.boardGames.get(selected).get('players') });
//      view.$('.players-holder').html(view._playersView.render().el);

    },
    startGame : function(event) {
      console.log(this.LOG + '::startGame');
      var view = this,
          player;
      if($(event.currentTarget).hasClass('disabled')) {
        return view;
      }

      // Get Data
      var data = {
        type: view.$('.game-type').val(),
        randomStart : true,
        players : []
      };

      // Get Players
      var playerNames = [];
      // Add in all current player names
      app.players.each(function(player) {
        playerNames.push(player.get('name'));
      });
      _.each(view._playerViews, function(pv) {
        player = pv.getPlayer();
        if(player != null && player.id == 'new') {
          // Check if name already exists
          if($.inArray(player.name, playerNames) < 0) {
            data.players.push(player);
            playerNames.push(player.name);
          } else {
            alert('Player name: ' + player.name + ' has already been taken.');
          }
        } else if(player != null) {
          // Not new, no need to check
          data.players.push(player);
        }
      });

      // Validate data
      if(data.players.length >= app.boardGames.get(data.type).get('players').min) {
        app.track.startGame(data);
      } else {
        alert('not enough players. possibly disable button until enough. or some dynamic thing going on in the player list');
      }
    }

  });

})(Backbone, window.Models, window.Collections, window.Views);

