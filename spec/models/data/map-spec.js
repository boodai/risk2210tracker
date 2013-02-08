describe("Model::Data::Map", function() {
  var map;
  var earth = window.Data.gameTypes.risk2210.maps.earth;

  beforeEach(function() {
    map = new window.Models.Data.Map({ id : 'earth',
                                        name : earth.name,
                                        display : earth.display,
                                        gameTypeId : 'risk2210' }
                                      , { continents : earth.continents, parent : 1 });
  });

  describe("initialize() - setup the model", function() {
    it("should error when maps not passed in options", function() {
      expect(function(){ x = new window.Models.Data.Map(); } ).toThrow('Continents were not passed in options hash.');
    });

    it("should error when parent not passed in options", function() {
      expect(function(){ x = new window.Models.Data.Map({}, { continents: {} }); } ).toThrow('Parent was not passed in options hash.');
    });

    it("should load the continents", function() {
      expect(map.continents.length).toEqual(11);
    });

    it("sets the parent", function() {
      expect(map.gameType).toEqual(1);
    });
  });

});