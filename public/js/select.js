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
		{ key : 115, selector : "pois" },
		{ key : 97, selector : "chutney" },
		{ key : 113, selector : "camembert" }
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
			$('#end-message p.infos-id').append(req.recipe.session + req.recipe.id + "<br>" + req.recipe.time );
		}, 500);
		
		setTimeout(reset, 10000);
		// reset();
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
		$('.alert').css('display', 'none');
		$('.ingredients .number-ingredients').empty();
		$('.ingredients .number-ingredients').append("0");
		$('.boutons li').animate({width:"80px", height:"80px"});
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
			console.log(e.which);
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
							$('#alert-elements').css('display', 'block');
							setTimeout(function(){
								$('#alert-elements').css('display', 'none');
							}, 5000);
						}
					}      
				});
			}
		});
	}

	function toogleAnimVisibility(selector){
		if($('#'+selector).hasClass('active')){
			$('#'+selector).css('display', 'none').removeClass('active');
			$('.btn-'+selector).animate({width:"80px", height:"80px"});
		}else{
			$('#'+selector).css('display', 'block').addClass('active');
			$('.btn-'+selector).animate({width:"120px", height:"120px"});
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
			socket.emit('newRecipe', {recipe: recipe});
			console.log('recette validée');

		}else {
			// $('#nonvalide-message').css('display', 'block');
			// setTimeout(function(){
			// 	$('#nonvalide-message').css('display', 'none');
			// }, 5000);
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
			// $('#endtime-message').css('display', 'block');
			// setTimeout(function(){
			// 	$('#endtime-message').css('display', 'none');
			sendRecipe();
			// }, 5000);
		}
	};

	function resetProgress(){
		$(".time").css("width", 0 + "%");
		progress = ( 100 * parseFloat($('.time').css('width')) / parseFloat($('.time').parent().css('width')) );
		current = progress;
	};



});