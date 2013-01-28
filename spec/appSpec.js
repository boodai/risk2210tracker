describe("The App", function() {

  beforeEach(function() {
    window.app.init();
  });

  describe(".init() - should setup the app", function() {
    it("setup the collections", function() {
      expect( exists(window.collections) ).toEqual(true);
      expect( window.collections ).toEqual(jasmine.any(Object));
      expect( exists(window.collections.players) ).toEqual(true);
      expect( window.collections.players ).toEqual(jasmine.any(Object));
    });

  });

  describe(".importData() - imports the game data into the app", function() {
    it("should error when game types are not found", function() {
      spyOn(window, 'exists').andReturn(false);
      expect(function(){ window.app.importData({}) } ).toThrow('No game types found.');
    });

    it("should generate the gameType collections", function() {
      window.app.importData({});
      expect( Object.keys(window.app.gameTypes).length).toEqual(1);
    });

  });

  describe(".createGame() - creates the current game for the app", function() {
    it("should error when game type is not found", function() {
      spyOn(window.app, 'gameTypes').andReturn({});
      expect(function(){ window.app.createGame('blah', 7) } ).toThrow('Game type not found.');
    });

    it("should error when years is less than gameType allows", function() {
      expect(function(){ window.app.createGame('risk2210', 0) } ).toThrow('Years must at least be 2');
    });

    it("should error when years is more than gameType allows", function() {
      expect(function(){ window.app.createGame('risk2210', 101) } ).toThrow('Years must less than 100');
    });

    it("should default the years", function() {
      window.app.createGame('risk2210');
      expect(window.app._currentGame.get('numYears')).toEqual(5);
    });


    it("should create the current game", function() {
//      window.app.importData({});
//      expect( Object.keys(window.app.gameTypes).length).toEqual(1);
    });

  });
});