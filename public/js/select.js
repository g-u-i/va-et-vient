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
		{ key : 122, selector : "epautre" },
		{ key : 104, selector : "tofu" },
		{ key : 116, selector : "mousse" },
		{ key : 117, selector : "pita" },
		{ key : 115, selector : "pois" }
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
		reset();
		console.log(req.recipe);
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
		setRecipe();
		resetProgress();
		$('canvas').css('display', 'none');
		$("#start-message").css("display", "block");
	};

	function start(){
		$("#start-message").css("display", "none");
		firstTime = false;
		updateProgress();
	};

	function init(){

		reset();

		$(document).keypress(function(e){
			if(firstTime) start();
			else if(e.which == 32) sendRecipe();
			else {
				$.each( keys, function( arrayKey, value ){
					if(e.which == value.key) {

	 
						if(choiceCount() < 9){
							toogleAnimVisibility(value.selector);
							recipe.choices[arrayKey] = !recipe.choices[arrayKey];
						}else if(recipe.choices[arrayKey]){
							toogleAnimVisibility(value.selector);
							recipe.choices[arrayKey] = !recipe.choices[arrayKey];
						}else{
							console.log("Vous avez choisi assez d'élements vous ne pouvez plus en ajouter");
						}
					}      
				});
			}
		});
	}

	function toogleAnimVisibility(selector){
		if($('#'+selector).hasClass('active')){
			$('#'+selector).css('display', 'none').removeClass('active');
			$('.btn-'+selector).css('background-color', 'transparent').animate({width:"80px", height:"80px"});
		}else{
			$('#'+selector).css('display', 'block').addClass('active');
			$('.btn-'+selector).css('background-color', '#CF8B56').animate({width:"120px", height:"120px"});
		}
		$('.ingredients .number-ingredients').empty();
		$('.ingredients .number-ingredients').append(choiceCount());
	};

	function choiceCount(){
		var i=0;
		$.each( recipe.choices , function( arrayKey, value ){ if(value) i++; });
		return i+1;
	}

	function sendRecipe(){

		console.log('test recipe',choiceCount());

		if(choiceCount() > 4 && choiceCount() < 9 ){
			
			$('.valide').css('background-color', 'green');
			socket.emit('newRecipe', {recipe: recipe});
			console.log('recette validée');

		}else{
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
		}else{
			console.log('fin du temps délimité');
			sendRecipe();
		}
	};

	function resetProgress(){
		$(".time").css("width", 0 + "%");
		progress = ( 100 * parseFloat($('.time').css('width')) / parseFloat($('.time').parent().css('width')) );
		current = progress;
	};



});