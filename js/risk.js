// Simply checks if a variable exists or not
function exists(variable) {
  return (typeof(variable) != 'undefined');
}

// Guids - http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function uuid() {
  uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  uuid = uuid.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  return uuid;
}

// Setup the app
(function(window){
  console.log('test');
})( window );