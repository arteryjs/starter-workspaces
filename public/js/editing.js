$(document).ready(function() {

  // tables or other elements with add/remove ability
  $('.add-remove').on('click', '.removable i.remove', function(ev) {
    ev.preventDefault();
    $(ev.target).parents('.removable').remove();
    
  });
  
  $('.add-remove').on('click', '.add-action', function(ev) {
    ev.preventDefault();
    var newThing = $(this).closest('.add-remove').find('.template').clone().removeClass('template');
    var nextIndex =  $(this).closest('.add-remove').find('.removable:not(.template)').length;
    newThing.find('[data-template]').removeAttr('data-template');
    
    
    // calculate indices dynamically
    // #nextIndex for arrays
    // #generateId# for unique ids 
    
    newThing.find('[data-property]').each(function(item) {
      var propertyValue = $(this).data('property').replace('#nextIndex#',nextIndex);
      propertyValue = propertyValue.replace('#generateId#',shortid.generate());
      console.log(nextIndex);
      console.log(propertyValue);
      $(this).attr('data-property', propertyValue);
    });
    var context = $(ev.target).closest('.add-action').before(newThing[0].outerHTML);
    initMediumEditors();
    $new = context.closest('.add-remove').find('.remove').last().closest('.removable').find('[data-property]').first();    
    context
  });
  
  initMediumEditors();

});

function initMediumEditors() {

  var mediumEditorInlineOptions = {
    autoLink: true,    
    disableReturn: true,
    toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: false,
        buttons: ['bold', 'italic', 'underline', 'anchor'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        standardizeSelectionStart: false,
        static: false,
        relativeContainer: null,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false,
    }
  };
      
  var inlineEditor = new MediumEditor('span[data-property]:not([data-template]),td[data-property]:not([data-template]),th[data-property]:not([data-template]),p[data-property]:not([data-template]),h1[data-property]:not([data-template]),h2[data-property]:not([data-template]),h3[data-property]:not([data-template]),h4[data-property]:not([data-template]),h5[data-property]:not([data-template]),h6[data-property]:not([data-template])', mediumEditorInlineOptions);
  
  var blockEditor = new MediumEditor('div[data-property]:not([data-template])', {
      autoLink: true,    
      toolbar: {
          /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
          allowMultiParagraphSelection: true,
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          standardizeSelectionStart: false,
          static: false,
          relativeContainer: null,
          /* options which only apply when static is true */
          align: 'center',
          sticky: false,
          updateOnEmptySelection: false,
      }
  });

};
