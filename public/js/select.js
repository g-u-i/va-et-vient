jQuery(document).ready(function($) {

	var serverBaseUrl = document.domain;
	var socket = io.connect();
	var sessionId = '';

	var maxIng = 6;

	/**
	* Events
	*/
	/* sockets */
	socket.on('connect', onSocketConnect);
	socket.on('error', onSocketError);
	socket.on('newRecipeId', onNewRecipeId)
	

	var keys = [
		{ key : 101, selector : "salsifis" },
		{ key : 121, selector : "chicoree" },
		{ key : 102, selector : "radis" },
		{ key : 103, selector : "navet" },
		{ key : 114, selector : "fromage" },
		{ key : 100, selector : "carottes2" },
		{ key : 104, selector : "champignons2" },
		{ key : 116, selector : "potimarron" },
		{ key : 117, selector : "pain" },
		{ key : 115, selector : "tofu2" },
		{ key : 106, selector : "legumes" },
		{ key : 119, selector : "chataignes" }
	],
	recipe = {},firstTime, current, progress;
	
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

	function onNewRecipeId(req){
		var imageToAdd = "<img class='myrecipe' src='/"+req.recipe.session+"/"+req.recipe.id+".png' alt='recette' />";
		$("body").append(imageToAdd);
		$("canvas").hide();
		setTimeout(function(){
			$('#end-message').css('display', 'block');
			$('#end-message .infos-id').empty();
			$('#end-message .infos-id').append("<div class='recipe-data'><span class='numero'>"+req.recipe.session + req.recipe.id + "</span><br><span class='recipe-time'>" + req.recipe.humanTime +"</span>");
		}, 3000);

		setTimeout(reset, 15000);
	}
	//
	function setRecipe(){
		var time  = new Date();
		
		recipe = {
			session : app.session,
			id      : 0,
			time    : time.getTime(),
			choices  : [ 0,0,0,0,0,0,0,0,0,0,0,0 ]
		}
	};

	function reset(){
		firstTime = true;
		resetProgress();
		setRecipe();

		$('canvas').css('display', 'none');
		$('.alert').css('display', 'none');

		$('footer').css('display', 'block');
		$('.boutons').css('display', 'block');
		$('.boutons .outside').css('opacity', '0');

		$("#start-message").css("display", "block");
		
		updateJaugeIngredients();
		
	};

	function start(){
		$("img.myrecipe").remove();
		$("#start-message").css("display", "none");
		firstTime = false;
		updateProgress();
	};

	function init(){

		reset();

		$(document).keypress(function(e){
			
			//console.log(e.which, firstTime);

			if(firstTime) start();
			else if(e.which == 32) sendRecipe();
			else {
				$.each(keys, function(arrayKey, value){
					if(e.which == value.key) {	 
						if(choiceCount() < maxIng){
							
							recipe.choices[arrayKey] = !recipe.choices[arrayKey];
							toogleAnimVisibility(value.selector, recipe.choices[arrayKey]);

							$('.ingredients .number-ingredients').empty();
							$('.ingredients .number-ingredients').append(choiceCount());
						}else if(recipe.choices[arrayKey]){
							toogleAnimVisibility(value.selector);
							recipe.choices[arrayKey] = !recipe.choices[arrayKey];
							$('.ingredients .number-ingredients').empty();
							$('.ingredients .number-ingredients').append(choiceCount());
						}else{
							console.log("Vous avez choisi assez d'élements vous ne pouvez plus en ajouter");
							$('#alert-elements').css('display', 'block');
							setTimeout(function(){
								$('#alert-elements').css('display', 'none');
							}, 5000);
						}
					}      
				});
			}
			updateJaugeIngredients();
		});
	}

	function toogleAnimVisibility(selector, state){
		if(!state){
			$('#'+selector).fadeOut('slow').removeClass('active');
			$('.btn-'+selector+ ' .outside').animate({
				opacity: 0,
			});
		}else if(state){
			$('#'+selector).fadeIn('slow').addClass('active');
			$('.btn-'+selector + ' .outside').animate({
				opacity: 1,
			});
		}
	};

	function choiceCount(){
		var i=0;
		$.each( recipe.choices , function( arrayKey, value ){ if(value) i++; });
		return i;
	}

	function updateJaugeIngredients(){
		$(".ingredients").removeClass('active');
		for(i=choiceCount(); i>0; i--){
			//console.log(i);
			$(".ingredients:nth-child("+(i)+")").addClass('active');
		}
	} 

	function sendRecipe(){
		console.log("sendRecipe");
		console.log('test recipe',choiceCount());

		if(choiceCount() > 3 && choiceCount() < 7 ){
			$('footer').css('display', 'none');
			$('.boutons').css('display', 'none');
			
			setTimeout(
				function(){
					console.log("send !")
					socket.emit('newRecipe', {recipe: recipe});
				}
				,100);
			console.log('recette validée');
		}else {
			$('#nonvalide-message').css('display', 'block');
			setTimeout(function(){
				$('#nonvalide-message').css('display', 'none');
			}, 5000);
			console.log("recette non valide !");
		}
	}

	function updateProgress() {
		myCounter.start();
	};

	function resetProgress(){
		$(".chrono .time").css("border", "2px solid #000");
		$currentElement= $(".chrono .time").eq(0);
		border=2;
  	counter=1;
		myCounter.stop();
	};


});

 //  var $elementTime = $(".chrono .time");
	// var arrayTime = [];
	// $elementTime.each(function(){
	// 	arrayTime.push($(this));
	// });
	// var $firstElement = arrayTime[0];

var myCounter = new Countdown({  
  seconds:120,  // number of seconds to count down
  border:2,
  counter:1,
  $currentElement: $(".chrono .time").eq(0),
  onUpdateStatus: function(sec){
  	//console.log(sec);
  	border ++;
  	
  	if((120 - sec) >= 20 * counter){
  		counter ++;
  		border = 2;
  		$currentElement = $currentElement.next('.time');
  		$currentElement.css("border", border + "px solid #000");
  		console.log(border);
  		console.log($currentElement);
  	}
  	else{
  		$currentElement.css("border", border + "px solid #000");
  		console.log("ELse", border);
  		console.log($currentElement);
  	}
  }, // callback for each second
  onCounterEnd: function(){ 
  	$('#endtime-message').css('display', 'block');
		setTimeout(function(){
			$('#endtime-message').css('display', 'none');
			sendRecipe();
		}, 5000);
  } // final action
});

function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  //custom fonction
  $currentElement = options.$currentElement;
  counter = options.counter;
  border = options.border;

  function decrementCounter() {
    updateStatus(seconds, counter, $currentElement);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}