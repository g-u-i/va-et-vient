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
	socket.on('newRecipeId', onNewRecipeId)
	
	$('canvas').css('display', 'none');

	var keys = [
		{ key : 101, selector : "champignons" },
		{ key : 121, selector : "algues" },
		{ key : 102, selector : "bettrave" }
	],
	recipe = {};

	function resetRecipe(){
		var time  = new Date();
		
		recipe = {
			session : app.session,
			id      : 0,
			time    : time.getTime(),
			choices  : [ 0,0,0,0,0,0,0,0,0,0,0,0 ]
		}
	}

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
		console.log("hello number" + req.recipeId)
	}

	function start(e){
		$("#start-message").css("display", "none");
		countDown();
		jaugeProgress();
	}

	function init(){

		resetRecipe();

		$(document).keypress(function(e){
			$.each( keys, function( arrayKey, value ){
				if(e.which == value.key) {
					if(choiceCount() < 8){
						toogleAnimVisibility(value.selector);
						recipe.choices[arrayKey] = !recipe.choices[arrayKey];
					}
				}

				socket.emit('newRecipe', {recipe: recipe});

			});

			// compteur éléments
			// $('.ingredients .number-ingredients').empty();
			// $('.ingredients .number-ingredients').append(active);
			
			// // 
			// if(active <= 8 && active >= 5 ){
			//   console.log("Vous pouvez valider votre recette");
			//   validRecette(e);
			// }else if(active >= 8){
			//   removeAnim(e);
			//   $('.valide').css('display', 'block');
			//   validRecette(e);
			//   console.log("Vous ne pouvez pas rajouter d'élements à votre recette");
			// }

		});
	}

	function toogleAnimVisibility(selector){
		if($('#'+selector).hasClass('active')){
			$('#'+selector).css('display', 'none').removeClass('active');
			$('.'+selector).css('background-color', 'transparent').animate({width:"80px", height:"80px"});
		}else{
			$('#'+selector).css('display', 'block').addClass('active');
			$('.'+selector).css('background-color', '#CF8B56').animate({width:"120px", height:"120px"});
		}
	}
	function choiceCount(){
		var i=0;
		$.each( recipe.choices , function( arrayKey, value ){ if(value) i++; });
		return i;
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
});