

$('[data-delete-doc]').click(function(ev) {
  ev.preventDefault();
  
  var id = $(this).attr('data-delete-doc');
      
  if (confirm("Really Delete (there's no undo)?")) {
    
    $.ajax({
        url: id,
        type: 'DELETE',
        data: {
          _csrf: $('meta[name=csrf-token]').attr('content')
        },
        success: function(result) {
          if (result.success) {
            document.location.reload();            
          } else {
            alert("Didn't work");
          }
        }
    });
    
  }
  
});

$('[data-save-doc]').click(function(ev){
  ev.preventDefault();
  
  var values = {};
  $('[data-property]:not([data-template]), input[data-property]:not([data-template])').each(function(index, element) {
  
    var attr = $(element).data('property');
    
    if ($(element).prop('tagName').match('INPUT|TEXTAREA|SELECT')) var content = $(element).val();
    else if ($(element).prop('tagName').match('IMG')) var content = $(element).attr('src');
    else if ($(element).data('value')) var content = $(element).data('value');
    else var content = $(element).html();
    if ($(element).prop('tagName').match('INPUT') && $(element).attr('type') == 'checkbox') {
      var content = undefined;
      if ($(element).parents('.checkbox.checked').length > 0 ) content = true;
    }
  
    values[attr] = content;
  });
  values['_csrf'] = $('meta[name=csrf-token]').attr('content');
  
  $.ajax({
      url: $(ev.target).data('save-doc'),
      type: 'PUT',
      data: values,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function(result) {
        if (result.success) {
          document.location.href = document.referrer;            
        } else {
          alert("Didn't work");
        }
      }
  });
  return values;

});

$('.ui.category.search.references').on('click', '.result', function(ev) {
  ev.preventDefault();
  var reference = $(this).attr('href');
  var source = window.location.pathname;
  var workspace = source.split('/')[1];
  var id = shortid.generate();
  var referenceDocument = {          
        _csrf: $('meta[name=csrf-token]').attr('content'),
        basename: id,
        source: source.replace( '/' + workspace + '/',''),
        afterSuccess: '/' + workspace + '/list/' + source.split('/')[2],
        reference: reference.replace('/' + workspace + '/','')
      };
      
  if (workspace)
    $.ajax({
        url: '/' + workspace + '/references/new',
        type: 'POST',
        data: referenceDocument,
        success: function(result) {
          document.location.reload();
        }
    });
  
  
});
