describe("Model::Year", function() {
  var year;

  beforeEach(function() {
    year = new window.Models.Year({ number : 5 });
  });

  describe("initialize() - setup the model", function() {
    it("should create the turns collection", function() {
      expect( exists(year.turns) ).toEqual(true);
      expect( year.turns ).toEqual(jasmine.any(Object));
    });

    it("should make sure number is an integer", function() {
      // TODO
    });
  });

});

describe("Collection::Years", function() {
  var game;

  beforeEach(function() {
    game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
  });


  describe("initialize() - ", function() {
    it("should set the game if passed in options", function() {
      var y = new window.Collections.Years(null, {game:game});
      expect(y.game).toEqual(game);
    });

    it("sets the event for when adding a year to tie to the game", function() {
      var y = new window.Collections.Years(null, {game:game});
      y.add({ gameId : '5', number : '5' });
      expect(y.at(0).game).toEqual(game);
      expect(y.at(0).get('gameId')).toEqual(game.id);
    });

  });

  describe("comparator() - ", function() {
    it("should keep the years in order", function() {
      var y = new window.Collections.Years(null, {game:game});
      y.add({ number : 3 });
      y.add({ number : 2 });
      y.add({ number : 1 });

      expect(y.last().get('number')).toEqual(3);
    });
  });

});