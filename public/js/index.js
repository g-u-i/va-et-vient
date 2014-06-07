jQuery(document).ready(function($) {

  $('#session-select').change(onSessionSelectChange);
  $('#page-select').change(onPageSelectChange);


  function onSessionSelectChange(event){
    // console.log('onSessionSelectChange', event);
    var selected_op = $('option:selected', this).val();
    // console.log(selected_op);

    $('#page-select option').each(function(i){
      $(this).attr('value', function( i, val ) {
        return val +'/'+ selected_op;
      });
    });

    $('#page-select').removeAttr('disabled').focus();

  };

  function onPageSelectChange(event){
    // console.log('onPageSelectChange', event);
    var selected_page = $('option:selected', this).val();
    // console.log(selected_page);

    $(this).parents('form').attr("action", selected_page);

    $('input[value="GO"]').removeAttr('disabled').removeClass('btn-default').addClass('btn-primary').focus();
  };

});