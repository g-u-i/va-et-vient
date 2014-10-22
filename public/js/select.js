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
	

	var keys = [
		{ key : 101, selector : "champignons" },
		{ key : 121, selector : "algues" },
		{ key : 102, selector : "bettrave" },
		{ key : 103, selector : "tomate" },
		{ key : 114, selector : "carotte" },
		{ key : 100, selector : "epautre" },
		{ key : 104, selector : "tofu" },
		{ key : 116, selector : "mousse" },
		{ key : 117, selector : "pita" },
		{ key : 115, selector : "pois" },
		{ key : 106, selector : "chutney" },
		{ key : 119, selector : "camembert" }
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
		setTimeout(function(){
			$('#end-message').css('display', 'block');
			$('#end-message p.infos-id').empty();
			$('#end-message p.infos-id').append(req.recipe.session + req.recipe.id + "<br>" + req.recipe.humanTime );
		}, 500);
		setTimeout(reset, 10000);
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

		$('.ingredients .number-ingredients').empty();
		$('.ingredients .number-ingredients').append("0");

		$('.boutons li').animate({
			width:"40px", 
			height:"40px",
			left: 0,
			top: 0
		}).css('box-shadow', 'none');
		$("#start-message").css("display", "block");

		console.log(recipe, firstTime);
	};

	function start(){
		$("#start-message").css("display", "none");
		firstTime = false;
		updateProgress();
	};

	function init(){

		reset();

		$(document).keypress(function(e){
			
			console.log(e.which, firstTime);

			if(firstTime) start();
			else if(e.which == 32) sendRecipe();
			else {
				$.each(keys, function(arrayKey, value){
					if(e.which == value.key) {	 
						if(choiceCount() < 8){
							
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
			$('.btn-'+selector).animate({
				width:"40px", 
				height:"40px", 
				left: 0,
				top: 0
			}).css('box-shadow', 'none');
		}else if(state){
			$('#'+selector).fadeIn('slow').addClass('active');
			$('.btn-'+selector).animate({
				width:"60px", 
				height:"60px", 
				left: -10,
				top: -10
			}).css('box-shadow', '2px 2px 10px grey');
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
			console.log(i);
			$(".ingredients:nth-child("+(8-i+1)+")").addClass('active');
		}
	} 

	function sendRecipe(){
		console.log("sendRecipe");
		console.log('test recipe',choiceCount());

		if(choiceCount() > 4 && choiceCount() < 9 ){
			socket.emit('newRecipe', {recipe: recipe});
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
		var max = 15; // one minute
		var add = 1.67 / max;
		if (current < 100 && !firstTime) {
				current += add;
				$(".time").css("width", current + "%");
				setTimeout(updateProgress, 60); // update every second
		}else if(current > 99) {
			console.log('fin du temps délimité');
			$('#endtime-message').css('display', 'block');
			setTimeout(function(){
				$('#endtime-message').css('display', 'none');
			sendRecipe();
			}, 5000);
		}
	};

	function resetProgress(){
		$(".time").css("width", 0 + "%");
		progress = ( 100 * parseFloat($('.time').css('width')) / parseFloat($('.time').parent().css('width')) );
		current = progress;
	};


});