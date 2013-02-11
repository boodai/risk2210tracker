describe("Model::GamePlayer", function() {

//  beforeEach(function() {
//
//  });
//
//  xdescribe("initialize() - setup the model", function() {
//
//  });

});

describe("Collection::GamePlayer", function() {

//  beforeEach(function() {
//
//  });

  describe("initialize() - ", function() {
    it("should set the game if passed in options", function() {
      var game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
      var c = new window.Collections.GamePlayers(null, {game:game});
      expect(c.game).toEqual(game);
    });

    it("sets the event for when adding a gamePlayer to tie to the game", function() {
      var game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
      var c = new window.Collections.GamePlayers(null, {game:game});
      c.add({ gameId : '5', playerId : '5', color : 'blue' });
      expect(c.at(0).game).toEqual(game);
      expect(c.at(0).get('gameId')).toEqual(game.id);
    });

  });

});