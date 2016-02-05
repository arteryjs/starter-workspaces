$(document).ready(function() {

  $('[data-delete-workspace]').click(function(ev) {
    ev.preventDefault();
  
    var id = $(this).attr('data-delete-workspace');
      
    if (confirm("Really Delete (there's no undo)?")) {
    
      $.ajax({
          url: '/workspaces/' + id,
          type: 'DELETE',
          data: {
            _csrf: $('meta[name=csrf-token]').attr('content')
          },
          success: function(result) {
            document.location.reload();
          }
      });
    
    }
  
  });

});