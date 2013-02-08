describe("Model::Data::GameType", function() {
  var gameType;
  var risk2210 = window.Data.gameTypes.risk2210;

  beforeEach(function() {
    gameType = new window.Models.Data.GameType({ id : 'risk2210',
                                                 name : risk2210.name,
                                                 years : risk2210.years,
                                                 players : risk2210.players }
                                               , { maps : risk2210.maps });
  });

  describe("initialize() - setup the model", function() {
    it("should error when maps not passed in options", function() {
      expect(function(){ x = new window.Models.Data.GameType(); } ).toThrow('Maps were not passed in options hash.');
    });

    it("should load the maps", function() {
      expect(gameType.maps.length).toEqual(2);
    });
  });

});