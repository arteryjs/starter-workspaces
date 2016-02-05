

// custom equal heights functionality, depends on Harvey

var Equalize = {};
Equalize.activate = function () {
  // quick and dirty equal height columns
  $('.row.equal').each(function() {
    var cols = $(this).find('> [class|="col"]');
    var heights = Array.prototype.map.call(cols, function(col) {
      var thisHeight = $(col).height();
      //$(col).attr('data-original-height', thisHeight) // save for later
      $(col).addClass('equalized'); // just add a class to
      return thisHeight
    });
    var targetHeight = Math.max.apply(null, heights);
    $(cols).height(targetHeight);      
  });
};
Equalize.deactivate = function () {
    $('[class|="col"].equalized').css('height','').removeClass('equalized');
};

Harvey.attach('screen and (min-width:940px)', {
  on: Equalize.activate, // called each time the query is activated
  off: Equalize.deactivate // called each time the query is deactivated
});
