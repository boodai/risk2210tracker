$(function() {
  // Handler for .ready() called.

  var functions = ['window.JST = {};'];
  $('.template').each( function(index, element){
    var func = 'window.JST["' + $(element).attr('id') + '"] = ' + _.template($(element).html()) + ';';
    functions.push(func);
  });

  document.write(functions.join(''));

});
