describe("Model::Data::Continent", function() {
  var continent;
  var northAmerica = window.Data.gameTypes.risk2210.maps.earth.continents.northAmerica;

  beforeEach(function() {
    continent = new window.Models.Data.Continent({ id : 'northAmerica',
                                                    name : northAmerica.name,
                                                    bonus : northAmerica.bonus,
                                                    color : northAmerica.color,
                                                    type : northAmerica.type,
                                                    mapId : 'earth' }
                                                  , { territories : northAmerica.territories, parent : 1 });
  });

  describe("initialize() - setup the model", function() {
    it("should error when territories not passed in options", function() {
      expect(function(){ x = new window.Models.Data.Continent(); } ).toThrow('Territories were not passed in options hash.');
    });

    it("should error when parent not passed in options", function() {
      expect(function(){ x = new window.Models.Data.Continent({}, { territories: {} }); } ).toThrow('Parent was not passed in options hash.');
    });

    it("should load the continents", function() {
      expect(continent.territories.length).toEqual(9);
    });

    it("sets the parent", function() {
      expect(continent.map).toEqual(1);
    });
  });

});