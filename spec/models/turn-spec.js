describe("Model::Turn", function() {
  var turn;

  beforeEach(function() {
    turn = new window.Models.Turn({ number : 5 });
  });

  describe("initialize() - setup the model", function() {
    it("should create the actions collection", function() {
//      expect( exists(turn.actions) ).toEqual(true);
//      expect( turn.actions ).toEqual(jasmine.any(Object));
    });

    it("should make sure number is an integer", function() {
      // TODO
    });
  });

});

describe("Collection::Turns", function() {
  var game, years, year;

  beforeEach(function() {
    game = new window.Models.Game({ gameTypeId : 'risk2210', numYears : 5 });
    years = new window.Collections.Years(null, {game:game});
    year = years.add({ 'number' : 1 });
  });


  describe("initialize() - ", function() {
    var turns;

    beforeEach(function() {
      turns = new window.Collections.Turns(null, {year:year});
    });

    it("should set the year if passed in options", function() {
      expect(turns.year).toEqual(year);
    });

    it("sets the event for when adding a turn to tie to the year", function() {
      turns.add({ number : 1 });
      expect(turns.at(0).year).toEqual(year);
      expect(turns.at(0).get('yearId')).toEqual(year.id);
    });

  });

  describe("comparator() - ", function() {
    it("should keep the turns in order", function() {
      var turns = new window.Collections.Turns(null, {year:year});
      turns.add({ number : 3 });
      turns.add({ number : 2 });
      turns.add({ number : 1 });

      expect(turns.last().get('number')).toEqual(3);
    });
  });

});