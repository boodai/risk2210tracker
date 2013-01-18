

// Setup the app
(function(window){
  window.app = {
    init: function() {
      // Get the collections up and running
      window.collections = {};
      window.collections.players = new window.Collections.Players();

    }
  }
})( window );

// Handler for .ready() called.
$(function() {
  // start the app
  window.app.init();
});