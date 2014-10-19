jQuery(document).ready(function($) {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  /**
  * Events
  */
  /* sockets */
  socket.on('connect', onSocketConnect);
  socket.on('error', onSocketError);

  /* dom */
//  $('#send').on('click', sendNewLine);
  
  
  $('canvas').css('display', 'none');
  listenEventStart($(document)); 
  init();


  /**
  * handlers
  */
  /* sockets */
  function onSocketConnect() {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
    socket.emit('newUser', {id: sessionId, name: app.session});
  };
  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  function start(e){
    $("#start-message").css("display", "none");
    countDown();
    jaugeProgress();
  }

  function init(e){
    $(document).keypress(function(e){
      
    //   var data = {
    //     var time  = new Date();
    //     var recipe = {
    //     session : app.session,
    //     id : sessionId,
    //     time    : time.getTime(),
    //     choices  : {
    //       [0] : 1,
    //       [1] : 1,
    //       [2] : 0,
    //       [3] : 0,
    //     }
    //   }
    //   console.log(data);
    // }

    var newChoices = ''; 
    if($('canvas').hasClass('active')){
      var newChoices = true;
    }
    else{
      var newChoices = false;;
    }

    var choices = [];
    i = 0;
    $('canvas').each(function(){
        choices[i++] = this.id;    
    })

    var elements = $(document).find('canvas').length;
    for(i = 0; i < elements; i++){

    }

    console.log(choices);
      
      declencheAnim(e);
      
      var active = $(document).find('.active').length;


      console.log(active);
      $('.ingredients .number-ingredients').empty();
      $('.ingredients .number-ingredients').append(active);
      
      if(active <= 8 && active >= 5 ){
          console.log("Vous pouvez valider votre recette");
          validRecette(e);
      }

      else if(active >= 8){
          removeAnim(e);
          $('.valide').css('display', 'block');
          validRecette(e);
          console.log("Vous ne pouvez pas rajouter d'élements à votre recette");
      }
  
    });
  }

  function jaugeProgress(){
        var corrent;
        var progress = ( 100 * parseFloat($('.time').css('width')) / parseFloat($('.time').parent().css('width')) );
        corrent = progress;
        function updateProgress() {
          var max = 15; // one minute
          var add = 1.67 / max;
          if (corrent < 100) {
              corrent += add;
              $(".time").css("width", corrent + "%");
              setTimeout(updateProgress, 70); // update every second
          }
        }
        updateProgress();
  }

  function declencheAnim(e){
      // $(document).keypress(function(e){
          console.log(e.which, " is keydown");
          console.log("declenche anim");
          switch (e.which){
              case 101:
                  if($('#champignons').hasClass('active')){
                      $('#champignons').css('display', 'none');
                      $('#champignons').removeClass('active');
                      $('.champignons').css('background-color', 'transparent');
                      $('.champignons').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#champignons').css('display', 'block');
                      $('#champignons').addClass('active');
                      $('.champignons').css('background-color', '#CF8B56');
                      $('.champignons').animate({width:"120px", height:"120px"});
                  }
              break;
              case 121:
                  if($('#algues').hasClass('active')){
                      $('#algues').css('display', 'none');
                      $('#algues').removeClass('active');
                      $('.algues').css('background-color', 'transparent');
                      $('.algues').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#algues').css('display', 'block');
                      $('#algues').addClass('active');
                      $('.algues').css('background-color', '#3A668F');
                      $('.algues').animate({width:"120px", height:"120px"});
                  }
              break;
              case 102:
                  if($('#bettrave').hasClass('active')){
                      $('#bettrave').css('display', 'none');
                      $('#bettrave').removeClass('active');
                      $('.bettrave').css('background-color', 'transparent');
                      $('.bettrave').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#bettrave').css('display', 'block');
                      $('#bettrave').addClass('active');
                      $('.bettrave').css('background-color', '#E43B82');
                      $('.bettrave').animate({width:"120px", height:"120px"});
                  }
              break;
              case 103: 
                  if($('#tomate').hasClass('active')){
                      $('#tomate').css('display', 'none');
                      $('#tomate').removeClass('active');
                      $('.tomate').css('background-color', 'transparent');
                      $('.tomate').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#tomate').css('display', 'block');
                      $('#tomate').addClass('active');
                      $('.tomate').css('background-color', '#E9284A');
                      $('.tomate').animate({width:"120px", height:"120px"});
                  }
              break;
               case 114: 
                  if($('#carotte').hasClass('active')){
                      $('#carotte').css('display', 'none');
                      $('#carotte').removeClass('active');
                      $('.carotte').css('background-color', 'transparent');
                      $('.carotte').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#carotte').css('display', 'block');
                      $('#carotte').addClass('active');
                      $('.carotte').css('background-color', '#F0655D');
                      $('.carotte').animate({width:"120px", height:"120px"});
                  }
              break;
              case 122: 
                  if($('#epautre').hasClass('active')){
                      $('#epautre').css('display', 'none');
                      $('#epautre').removeClass('active');
                      $('.epautre').css('background-color', 'transparent');
                      $('.epautre').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#epautre').css('display', 'block');
                      $('#epautre').addClass('active');
                      $('.epautre').css('background-color', '#F88721');
                      $('.epautre').animate({width:"120px", height:"120px"});
                  }
              break;
              case 104: 
                  if($('#tofu').hasClass('active')){
                      $('#tofu').css('display', 'none');
                      $('#tofu').removeClass('active');
                      $('.tofu').css('background-color', 'transparent');
                      $('.tofu').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#tofu').css('display', 'block');
                      $('#tofu').addClass('active');
                      $('.tofu').css('background-color', '#F7C352');
                      $('.tofu').animate({width:"120px", height:"120px"});
                  }
              break;
              case 116: 
                  if($('#mousse').hasClass('active')){
                      $('#mousse').css('display', 'none');
                      $('#mousse').removeClass('active');
                      $('.mousse').css('background-color', 'transparent');
                      $('.mousse').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#mousse').css('display', 'block');
                      $('#mousse').addClass('active');
                      $('.mousse').css('background-color', '#05BAA3');
                      $('.mousse').animate({width:"120px", height:"120px"});
                  }
              break;
              case 117: 
                  if($('#pita').hasClass('active')){
                      $('#pita').css('display', 'none');
                      $('#pita').removeClass('active');
                      $('.pita').css('background-color', 'transparent');
                      $('.pita').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#pita').css('display', 'block');
                      $('#pita').addClass('active');
                      $('.pita').css('background-color', '#563354');
                      $('.pita').animate({width:"120px", height:"120px"});
                  }
              break;
              case 115: 
                  if($('#pois').hasClass('active')){
                      $('#pois').css('display', 'none');
                      $('#pois').removeClass('active');
                      $('.pois').css('background-color', 'transparent');
                      $('.pois').animate({width:"80px", height:"80px"});
                  }
                  else{
                      $('#pois').css('display', 'block');
                      $('#pois').addClass('active');
                      $('.pois').css('background-color', '#F8AEAF');
                      $('.pois').animate({width:"120px", height:"120px"});
                  }
              break;

          }
      // });
  }

  function removeAnim(e){
      console.log("remove anim");
      switch (e.which){
          case 101:
              if($('#champignons').hasClass('active')){
                  $('#champignons').css('display', 'none');
                  $('#champignons').removeClass('active');
                  $('.champignons').css('background-color', 'transparent');
                  $('.champignons').animate({width:"80px", height:"80px"});
              }
          break;
          case 121:
              if($('#algues').hasClass('active')){
                  $('#algues').css('display', 'none');
                  $('#algues').removeClass('active');
                  $('.algues').css('background-color', 'transparent');
                  $('.algues').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 102:
              if($('#bettrave').hasClass('active')){
                  $('#bettrave').css('display', 'none');
                  $('#bettrave').removeClass('active');
                  $('.bettrave').css('background-color', 'transparent');
                  $('.betterave').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 103: 
              if($('#tomate').hasClass('active')){
                  $('#tomate').css('display', 'none');
                  $('#tomate').removeClass('active');
                  $('.tomate').css('background-color', 'transparent');
                  $('.tomate').animate({width:"80px", height:"80px"});
              }
          
          break;
           case 114: 
              if($('#carotte').hasClass('active')){
                  $('#carotte').css('display', 'none');
                  $('#carotte').removeClass('active');
                  $('.carotte').css('background-color', 'transparent');
                  $('.carotte').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 122: 
              if($('#epautre').hasClass('active')){
                  $('#epautre').css('display', 'none');
                  $('#epautre').removeClass('active');
                  $('.epautre').css('background-color', 'transparent');
                  $('.epautre').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 104: 
              if($('#tofu').hasClass('active')){
                  $('#tofu').css('display', 'none');
                  $('#tofu').removeClass('active');
                  $('.tofu').css('background-color', 'transparent');
                  $('.tofu').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 116: 
              if($('#mousse').hasClass('active')){
                  $('#mousse').css('display', 'none');
                  $('#mousse').removeClass('active');
                  $('.mousse').css('background-color', 'transparent');
                  $('.mousse').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 117: 
              if($('#pita').hasClass('active')){
                  $('#pita').css('display', 'none');
                  $('#pita').removeClass('active');
                  $('.pita').css('background-color', 'transparent');
                  $('.pita').animate({width:"80px", height:"80px"});
              }
          
          break;
          case 115: 
              if($('#pois').hasClass('active')){
                  $('#pois').css('display', 'none');
                  $('#pois').removeClass('active');
                  $('.pois').css('background-color', 'transparent');
                  $('.pois').animate({width:"80px", height:"80px"});
              }
          
          break;

      }
  }

  function validRecette(e){
      if(e.which == 32){
          console.log("recette_validée");
      }
  }

  function countDown(){
      setTimeout(function() {
          console.log("recette_validée");
      }, 60000);
  }

  function listenEventStart($context){
      $context.keypress(start);
=======
  function init(){
>>>>>>> 3b5798c23a3ea3462b937757ef1be569b73ad1c1
  }
});