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
});