describe("Model::Data::Territory", function() {
  var territory;
  var northwesternOilEmpire = window.Data.gameTypes.risk2210.maps.earth;

  beforeEach(function() {
    territory = new window.Models.Data.Territory({ id : 'earth',
        name : northwesternOilEmpire.name,
        display : northwesternOilEmpire.display,
        continentId : 'northwesternOilEmpire' }
      , { parent: 1 });
  });

  describe("initialize() - setup the model", function() {
    it("should error when parent not passed in options", function() {
      expect(function(){ x = new window.Models.Data.Territory(); } ).toThrow('Parent was not passed in options hash.');
    });

    it("sets the parent", function() {
      expect(territory._continent).toEqual(1);
    });
  });

});