jQuery(document).ready(function($) {

  document.forms['pageSelector'].reset();

  $('#session-select').change(onSessionSelectChange);
  $('#page-select').change(onPageSelectChange);
  $('#modeleur-select').change(onModeleurSelectChange);
  var action = {};

  function onSessionSelectChange(event){
    // console.log('onSessionSelectChange', event);
    var selected_op = $('option:selected', this).val();

    $('#page-select').removeAttr('disabled').focus();

    action.param2 = selected_op;
    udpateAction();

  };

  function onPageSelectChange(event){
    // console.log('onPageSelectChange', event);
    var selected_page = $('option:selected', this).val();

    if(selected_page.search("capture")==-1){
      action.param3 = false;
      $('#modeleur-select').parents('li').addClass('hide');
      $('input[value="GO"]').removeAttr('disabled').removeClass('btn-default').addClass('btn-primary').focus();
    } else{
      console.log("yes capture");
      $('#modeleur-select').parents('li').removeClass('hide');
      $('#modeleur-select').focus();
    }
    action.param1 = selected_page;
    udpateAction();

  };

  function onModeleurSelectChange(event){
    // console.log('onModeleurSelectChange', event);
    var selected_modeleur = $('option:selected', this).val();

    action.param3 = selected_modeleur;
    udpateAction();

  }

  function udpateAction(){

    var actiontarget = "";
    if( action.param1 )
      actiontarget = action.param1;
    if( action.param2 )
      actiontarget = actiontarget +"/"+ action.param2;
    if( action.param3 )
      actiontarget = actiontarget + action.param3;

    $('#content form').attr("action",actiontarget);

  }

});