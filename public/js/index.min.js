jQuery(document).ready(function($) {

  function init(){
    $('a.page-link').each(function(i){
      var $a = $(this);
      $a.attr('baseurl', $a.attr('href'));
    });
  };



  $('.session-select').change(onSelectChange);

  function onSelectChange(event){
    // console.log('onSelectChange', event);
    var selected_op = $('option:selected', this).val();
    // console.log(selected_op);

    $('a.page-link').each(function(i){
      var $a = $(this);
      var href = $a.attr('baseurl');
      $a.attr('href', href+'/'+selected_op);
    });

  };


  init();
});