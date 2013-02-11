describe("Model::Year", function() {

  beforeEach(function() {

  });

  describe("initialize() - setup the model", function() {
//    it("should error when territories not passed in options", function() {
////      expect(function(){ x = new window.Models.Data.Continent(); } ).toThrow('Territories were not passed in options hash.');
//    });
  });

});

describe("Collection::Year", function() {

//  beforeEach(function() {
//
//  });

  describe("initialize() - ", function() {
    it("should set the game if passed in options", function() {
      var game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
      var y = new window.Collections.Years(null, {game:game});
      expect(y.game).toEqual(game);
    });

    it("sets the event for when adding a gamePlayer to tie to the game", function() {
      var game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
      var y = new window.Collections.Years(null, {game:game});
      y.add({ gameId : '5', number : '5' });
      expect(y.at(0).game).toEqual(game);
      expect(y.at(0).get('gameId')).toEqual(game.id);
    });

  });

});