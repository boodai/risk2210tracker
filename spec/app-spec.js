describe("The App", function() {

  beforeEach(function() {

  });

  describe(".init() - should setup the app", function() {
    it("setup the app", function() {
      window.app.init();

      expect( exists(window.collections) ).toEqual(true);
      expect( window.collections ).toEqual(jasmine.any(Object));
      expect( exists(window.collections.players) ).toEqual(true);
      expect( window.collections.players ).toEqual(jasmine.any(Object));
      expect( window.app._currentGame ).toEqual(null);

      // todo check calls import data and homeView
    });

  });

  describe(".importData() - imports the game data into the app", function() {
    it("should error when game types are not found", function() {
      spyOn(window, 'exists').andReturn(false);
      expect(function(){ window.app.importData({}) } ).toThrow('No game types found.');
    });

    it("should generate the gameType collections", function() {
      window.app.importData({});
      expect( exists(window.collections.data.gameTypes) ).toEqual(true);
      expect( window.collections.data.gameTypes ).toEqual(jasmine.any(Object));
      expect( exists(window.collections.data.maps) ).toEqual(true);
      expect( window.collections.data.maps ).toEqual(jasmine.any(Object));
      expect( exists(window.collections.data.continents) ).toEqual(true);
      expect( window.collections.data.continents ).toEqual(jasmine.any(Object));
      expect( exists(window.collections.data.territories) ).toEqual(true);
      expect( window.collections.data.territories ).toEqual(jasmine.any(Object));

      expect(window.collections.data.gameTypes.length).toEqual(1);
    });

  });

  describe(".createGame() - creates the current game", function() {
    it("should error when game type is not found", function() {
      spyOn(window.collections.data.gameTypes, 'get').andReturn(undefined);
      expect(function(){ window.app.createGame('blah', 7) } ).toThrow('Game type not found.');
    });

    it("should create the current game", function() {
      window.app.importData({});
      window.app.createGame('risk2210');
      expect( window.app._currentGame ).toEqual(jasmine.any(Object));
    });
//
////    it("should error when years is less than gameType allows", function() {
////      expect(function(){ window.app.createGame('risk2210', 0) } ).toThrow('Years must at least be 2');
////    });
////
////    it("should error when years is more than gameType allows", function() {
////      expect(function(){ window.app.createGame('risk2210', 101) } ).toThrow('Years must less than 100');
////    });
//
////    it("should default the years", function() {
////      window.app.createGame('risk2210');
////      expect(window.app._currentGame.get('numYears')).toEqual(5);
////    });
//
//


  });
});