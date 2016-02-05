var shortid = require('shortid');

mediumEditors = [];

$(document).ready(function() {
  //$('.ui.dropdown').dropdown();
  /*
  $('.ui.checkbox').checkbox();
  if (window['referenceSearchSource'] ) { 
    $('.ui.search.references').search({ source: referenceSearchSource });
  }
  $('select').dropdown();
  */
  
  $('[data-link-destination]').click(function(ev) {
    document.location.href = $(this).data('link-destination');
  });
  
  // modals (broken)
  
  $('[data-modal-target]').click(function(ev){
    ev.preventDefault();
    $($(this).data('modal-target'))
      .modal('setting', 'transition', 'scale')          
      .modal({"inverted": true, "blurring": true})
      .modal('show');
  });
  
});

// workspace nav ui-166
$("a.ui-workspace-menu-trigger").click(function(e){
	e.preventDefault();
  $('.ui-144').show();
	$(".ui-144 .ui-outer").fadeIn(400);
});
$(".ui-144  a.ui-close").click(function(e){
	e.preventDefault();
  $('.ui-144').hide();
	$(".ui-144 .ui-outer").fadeOut(400);
});
