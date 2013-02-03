// adding a lovely toType function to object so we can know what variables are
// http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
Object.toType = (function toType(global) {
  return function(obj) {
    if (obj === global) {
      return "global";
    }
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }
})(this);


// Simply checks if a variable exists or not
var exists = function(variable) {
  return (typeof(variable) != 'undefined');
};

// Guids - http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
var uuid = function() {
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  return uuid;
};

// UTC Date
function utc() {
  var now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

// Overwriting console.log
if (typeof console !== "undefined") {
  console.originalLog = console.log;
  console.log = function() {

    var canGroup = typeof console.groupCollapsed !== 'undefined';
    if (canGroup) {
      console.groupCollapsed.apply(this, arguments);
    } else {
      console.originalLog.apply(this, arguments);
    }
    if (typeof console.trace !== 'undefined') {
      console.trace();
    } else {
      var stack = new Error().stack;
      console.originalLog(stack);
    }
    if (canGroup) {
      console.groupEnd();
    }
  };
}