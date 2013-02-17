describe("Model::Action", function() {
  var action;

  beforeEach(function() {
    action = new window.Models.Action({ number : 5 });
  });

  describe("initialize() - setup the model", function() {

    it("should make sure number is an integer", function() {
      // TODO
    });
  });

});

describe("Collection::Actions", function() {
  var turn;

  beforeEach(function() {
    turn = new window.Models.Turn({ number : 1 });
  });


  describe("initialize() - ", function() {
    var actions;

    beforeEach(function() {
      actions = new window.Collections.Actions(null, { turn:turn });
    });

    it("should set the turn if passed in options", function() {
      expect(actions.turn).toEqual(turn);
    });

    it("sets the event for when adding a turn to tie to the year", function() {
      actions.add({ number : 1 });
      expect(actions.at(0).turn).toEqual(turn);
      expect(actions.at(0).get('turnId')).toEqual(turn.id);
    });

  });

  describe("comparator() - ", function() {
    it("should keep the actions in order", function() {
      var actions = new window.Collections.Actions(null, {turn:turn});
      actions.add({ number : 3 });
      actions.add({ number : 2 });
      actions.add({ number : 1 });

      expect(actions.last().get('number')).toEqual(3);
    });
  });

});