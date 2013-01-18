describe("Game Model", function() {
  var game, player;

  beforeEach(function() {
    game = new window.Models.Game;
    window.collections.players.add({ name : 'Cory' });
    player = collections.players.at(0);
  });

  it("initialize() - should setup the model", function() {
    expect( exists(game._gamePlayers) ).toEqual(true);
    expect( game._gamePlayers ).toEqual(jasmine.any(Object));
  });

  describe(".addPlayer(player) - should add a player to the game", function() {
    it("should error when player is not found", function() {
      expect(function(){ game.addPlayer({}) } ).toThrow('Player not found.');
      expect(function(){ game.addPlayer('123') } ).toThrow('Player not found.');
    });

    it("should add the player by id", function() {
      game.addPlayer( player.get('id') );
      expect(game._gamePlayers.length).toEqual(1);
      expect(game._gamePlayers.at(0).get('playerId')).toEqual(player.get('id'));
    });

    it("should add the player by model", function() {
      game.addPlayer( player );
      expect(game._gamePlayers.length).toEqual(1);
      expect(game._gamePlayers.at(0).get('playerId')).toEqual(player.get('id'));
    });
  });

  describe(".addPlayer(player) - should add a player to the game", function() {
    it("should error when player is not found", function() {
      expect(function(){ game.addPlayer({}) } ).toThrow('Player not found.');
      expect(function(){ game.addPlayer('123') } ).toThrow('Player not found.');
    });

    it("should add the player by id", function() {
      game.addPlayer( player.get('id') );
      expect(game._gamePlayers.length).toEqual(1);
      expect(game._gamePlayers.at(0).get('playerId')).toEqual(player.get('id'));
    });

    it("should add the player by model", function() {
      game.addPlayer( player );
      expect(game._gamePlayers.length).toEqual(1);
      expect(game._gamePlayers.at(0).get('playerId')).toEqual(player.get('id'));
    });
  });

});