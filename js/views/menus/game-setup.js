window.Models = window.Models || {};
window.Collections = window.Collections || {};
window.Views = window.Views || {};
window.JST = window.JST || {};

(function(Backbone, Models, Collections, Views){
  Views.Menus = Views.Menus || {};

  Views.Menus.GameSetup = Backbone.View.extend({
    tagName: 'div',
    className: 'bbv-game-setup menu',

    events: {
      'click .btn.start-game' : 'startGame',
      'click .btn.select-player' : 'selectPlayer',
      'click .btn.remove-player' : 'removePlayer',
      'click .btn.add-player' : 'addPlayer'
    },
    initialize: function(options) {
      var view = this;
      options = options || {};
//      view._parent = options.parent || null;
      view._template = window.JST['game-setup'];
      view.availablePlayers = window.collections.players.clone();
      view.selectedPlayers = new Collections.Players;
      view.availablePlayersView = new Views.Partials.Setup.AvailablePlayers({ collection : view.availablePlayers });
      view.selectedPlayersView = new Views.Partials.Setup.SelectedPlayers({ collection : view.selectedPlayers, colors : view.model.gameType.get('players').colors });
    },
    render: function() { var view = this;
      var players = {};
      window.collections.players.each(function(player){
        players[player.id] = player.get('name');
      });

      var data = {
        years :  view.model.gameType.get('years'),
        players : players
      };


      // TODO  fix this stupidity so specs work better
      if(view._template != undefined ) {
        view.$el.html(view._template(data));
        view.$('.available-players-holder').prepend( view.availablePlayersView.render().el);
        view.$('.selected-players-holder').html( view.selectedPlayersView.render().el);
      }

      return view;
    },
    startGame : function() { var view = this;
      var playerColors = view.selectedPlayersView.playerColors;
      var players = view.selectedPlayers;

      var data = {
        years : view.$('#years').val(),
        playerColors : playerColors,
        players : players
      };

      app.startGame(data);
    },
    selectPlayer : function() { var view = this;
      var selectedId = view.$('.available-players').find(":selected").val();
      var selected = view.availablePlayers.get(selectedId);
      view.availablePlayers.remove(selected);
      view.selectedPlayers.add(selected);
      view.availablePlayersView.render();
      view.selectedPlayersView.render();

      view.checkButtons();
    },
    removePlayer : function(e) { var view = this;
      var selectedId = e.currentTarget.dataset.id;
      var selected = view.selectedPlayers.get(selectedId);
      view.selectedPlayers.remove(selected);
      view.availablePlayers.add(selected);
      view.availablePlayersView.render();
      view.selectedPlayersView.render();

      view.checkButtons();
    },
    addPlayer : function() { var view = this;
      newName = view.$('#new_player').val();
      if(newName.length > 0) {
        view.selectedPlayers.add({ name : newName });
      }
      view.$('#new_player').val('');
      view.selectedPlayersView.render();

      view.checkButtons();
    },
    checkButtons : function () { var view = this;
      // Select Player button
      if(view.selectedPlayers.length >= view.model.gameType.get('players').max || view.availablePlayers.length < 1) {
        view.$('.btn.select-player').hide();
      } else if(view.availablePlayers.length >= 1) {
        view.$('.btn.select-player').show();
      }
      // Add Player button
      if(view.selectedPlayers.length >= view.model.gameType.get('players').max) {
        view.$('.btn.add-player').hide();
      } else {
        view.$('.btn.add-player').show();
      }
      // Start game button
      if(view.selectedPlayers.length >= view.model.gameType.get('players').min) {
        view.$('.start-game').show();
      } else {
        view.$('.start-game').hide();
      }

    }
  });

})(Backbone, window.Models, window.Collections, window.Views);

