describe("Model::Game", function() {
  var game, player, playerOrder;

  beforeEach(function() {
    game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
  });

  describe("initialize() - setup the model", function() {
    it("should require the gameType", function() {
      expect(function(){ new window.Models.Game() } ).toThrow('gameTypeId is required.');
    });

    it("should validate the gameType", function() {
      expect(function(){ new window.Models.Game({ gameTypeId : 'blah', numYears : 5 }) } ).toThrow('Game type not found.');
    });

    it("should default numYears", function() {
      // TODO
    });

    it("should link to the gameType data model", function() {
      expect( exists(game.gameType) ).toEqual(true);
      expect( game.gameType ).toEqual(jasmine.any(Object));
    });

    it("should create the gamePlayers collection", function() {
      expect( exists(game.gamePlayers) ).toEqual(true);
      expect( game.gamePlayers ).toEqual(jasmine.any(Object));
    });

    it("should create the years collection", function() {
      expect( exists(game.years) ).toEqual(true);
      expect( game.years ).toEqual(jasmine.any(Object));
    });

  });

  describe("setYears() - setup the years for the game", function() {
    it("should validate the years", function() {
      expect(function(){ game.setYears(0) } ).toThrow('0 must be between 2 and 99');
      expect(function(){ game.setYears(100) } ).toThrow('100 must be between 2 and 99');
    });

    it("should set the years", function() {
      game.setYears(10);
      expect( game.get('numYears') ).toEqual(10);
    });

  });

  describe(".addPlayer(player, color) - add a player to the game", function() {
    beforeEach(function() {
      player = new window.Models.Player({ name : 'Cory' });
      window.collections.players.add(player);
    });

    it("should error when player is not found", function() {
      expect(function(){ game.addPlayer({}) } ).toThrow('Player not found.');
      expect(function(){ game.addPlayer('123') } ).toThrow('Player not found.');
    });

    it("should error when color is not found or invalid", function() {
      expect(function(){ game.addPlayer(player) } ).toThrow('color is required.');
      expect(function(){ game.addPlayer(player, 'blah') } ).toThrow('blah must be one of [red,black,gold,blue,green].');
    });

    it("should error when color is already used", function() {
      var test = new window.Models.Player({ name : 'Test' });
      window.collections.players.add(test);
      game.addPlayer( test, 'red' );

      expect(function(){ game.addPlayer(player, 'red') } ).toThrow('red has already been used.');
    });

    it("should add the player by id", function() {
      game.addPlayer( player.get('id'), 'red' );
      expect(game.gamePlayers.length).toEqual(1);
      expect(game.gamePlayers.at(0).get('playerId')).toEqual(player.get('id'));
      expect(game.gamePlayers.at(0).get('color')).toEqual('red');
    });

    it("should add the player by model", function() {
      game.addPlayer( player, 'red' );
      expect(game.gamePlayers.length).toEqual(1);
      expect(game.gamePlayers.at(0).get('playerId')).toEqual(player.get('id'));
    });

    it("should error when trying to add more than max players", function() {
      // setting max players to 3
      game.gameType.get('players').max = 3;
      _.each(['red','black','gold'], function(color) {
        var test = new window.Models.Player({ name : 'Test' });
        window.collections.players.add(test);
        game.addPlayer( test, color );
      });
      expect(game.gamePlayers.length).toEqual(3);
      var num5 = new window.Models.Player({ name : 'Test' });
      window.collections.players.add(num5);
      expect( function(){ game.addPlayer( num5, 'blue' ) } ).toThrow('Already at max of 3 players.');
      expect(game.gamePlayers.length).toEqual(3);

      // setting max players back to 5
      game.gameType.get('players').max = 5;
    });
  });

  describe(".removePlayer(player) - remove a player from the game", function() {
    beforeEach(function() {
      player = new window.Models.Player({ name : 'Cory' });
      window.collections.players.add(player);

      game.addPlayer( player , 'red');
    });

    it("should error when player is not found", function() {
      expect(function(){ game.removePlayer({}) } ).toThrow('Player not found in game.');
      expect(function(){ game.removePlayer('123') } ).toThrow('Player not found in game.');
    });

    it("should remove the player by id", function() {
      game.removePlayer( player.get('id') );
      expect(game.gamePlayers.length).toEqual(0);
    });

    it("should remove the player by model", function() {
      game.removePlayer( player );
      expect(game.gamePlayers.length).toEqual(0);
    });
  });

  describe(".createBoard() - ", function() {
    it("creates the board with the right number of territories", function() {
      game.createBoard();
      expect(exists(game.board)).toEqual(true);
      expect(Object.keys(game.board).length).toEqual(69);
    });
  });

  describe(".randomizeBoard() - ", function() {
    beforeEach(function() {
      game.createBoard();
      _.each(['red','black','gold', 'blue'], function(color) {
        var test = new window.Models.Player({ name : 'Test' + color });
        window.collections.players.add(test);
        game.addPlayer( test, color );
      });
    });

    it("should randomly equally assign land territories between the players", function() {
      game.randomizeBoard();

      var numAssignedTerritories = 0;
      _.each(game.board, function(player, key) {
        if(player) { numAssignedTerritories++; }
      });
      expect(numAssignedTerritories).toEqual(42);
    });
  });

  describe(".newYear() - ", function() {
    it("should error when all years played", function() {
      var bad_game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 2 });
      bad_game.addYear();
      bad_game.addYear();

      expect(function() { bad_game.addYear() }).toThrow('Already played all years.');
    });

    it("adds a year", function() {
      game.addYear();
      expect(game.years.length).toEqual(1);
    });
  });

  describe(".setPlayerOrderForYear(year, players) - ", function() {
    beforeEach(function() {
      game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
      game.addYear();
      playerOrder = [];

      // add some players
      _.each(['red','black','gold'], function(color) {
        var test = new window.Models.Player({ name : 'Test' + color });
        window.collections.players.add(test);
        game.addPlayer( test, color );
        playerOrder.push(test.get('id'));
      });

    });

    it("should error no year passed", function() {
      // TODO
    });

    it("should error no players passed", function() {
      // TODO
    });

    it("should error players array is invalid", function() {
      // TODO
    });

    it("should update the player order for the year", function() {
      game.setPlayerOrderForYear(game.years.at(0), playerOrder);
      expect(game.years.at(0).get('playerOrder')).toEqual(playerOrder);
    });
  });

  describe(".addTurn() - ", function() {
    beforeEach(function() {
      var playerOrder = [];

      // add players to the game
      _.each(['red','black','gold'], function(color) {
        var test = new window.Models.Player({ name : 'Test' });
        window.collections.players.add(test);
        game.addPlayer( test, color );
        playerOrder.push(test.get('id'));
      });

      // add a year
      game.addYear();
      // Set player order
      game.setPlayerOrderForYear(game.years.at(0), playerOrder);

    });

    it("should error when all turns played", function() {
      // TODO

      //expect(function() { bad_game.addTurn() }).toThrow('All turns played for year.');
    });

    it("adds a turn", function() {
      game.addTurn();
      game.addTurn();
      expect(game.years.first().turns.length).toEqual(2);
    });
  });


});