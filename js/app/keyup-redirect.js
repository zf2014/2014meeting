;(function($){

	var keyboard = {
		// key 1
		'49': 'wall.jspa',
		// key 3
		'51': 'manShortlisted.jspa',
		// key 4
		'52': 'womanShortlisted.jspa',
		// key 5
		'53': 'showShortlisted.jspa',
		// key 6
		'54': 'manResult.jspa',
		// key 7
		'55': 'womanResult.jspa',
		// key 8
		'56': 'showResult.jspa',
		// key 9
		'57': 'show.jspa?showSort=1',
		// key 0
		'48': 'index.jspa',

		// key r
		'82': 'addVoteResult.jspa',

		// key ->
		'39': function(){
			var searchStr = window.location.search,
				queryKeys,
				val,
				nextVal,

				url = 'show.jspa'
			;
			if(!searchStr){
				return;
			}

			queryKeys = searchStr.split('=');
			val = queryKeys[1];
			nextVal = (+val) + 1;
			if(nextVal > 11){
				nextVal = 11;
			}

			window.location.href = url + queryKeys[0] + '=' + nextVal


			// window.location.href = 'show.jspa?showSort=1';
		},
		// key <-
		'37': function(){
			var searchStr = window.location.search,
				queryKeys,
				val,
				nextVal,

				url = 'show.jspa'
			;
			if(!searchStr){
				return;
			}

			queryKeys = searchStr.split('=');
			val = queryKeys[1];
			nextVal = (+val) - 1;
			if(nextVal > 11){
				nextVal = 11;
			}

			window.location.href = url + queryKeys[0] + '=' + nextVal
		},

		// key d
		'68': function(){
			$('.wxq-main').addClass('wxq-no-signin');
		},
		// key s
		'83': function(){
			$('.wxq-main').removeClass('wxq-no-signin');
		},

		// key b
		'66': function(){
			if(window.startRise){
				window.startRise();
				window.startRise = null;
			}
		},

		// key a
		'65': 'leftIndex.jspa',

		// key z
		'90': 'rightIndex.jspa'
	}

	$(document).on('keyup', function(event){
		var code = event.which,
			redirectAction
		;

		redirectAction = keyboard[code];

		if(typeof redirectAction === 'string'){
			window.location.href = redirectAction;
		}else if(typeof redirectAction === 'function'){
			redirectAction();
		}else{
			console.log(code)
		}

		return false;
	});

}(Zepto));