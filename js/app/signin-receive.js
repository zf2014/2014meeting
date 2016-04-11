;(function($){

	var current = 0,
		next,
		$signinNumContainer = $('#J-signinNumCardContainer'),
		$signinCards = $('.J-signinNumCard'),
		$signinLastCard = $('#J-signinNumLastCard'),
		signinCardShiftClassname = 'card-figure__is-shift',

		ajaxUrl,


		$signinUserListContainer = $('#J-signinUserinfoList'),
		MAX_SIGNIN_RECORD_SIZE = 4
	;

	ajaxUrl = $signinNumContainer.data('ajaxUrl');

	// current = +$signinNumContainer.data('signinNum');

	function changeSigninNumToArray(num, maxLenght){
		maxLenght = maxLenght || 3;

		var arrs = new Array( maxLenght ),
			numStr = num.toString(),
			newNumStrs,
			i
		;

		if(numStr.length > maxLenght){
			return false;
		}

		newNumStrs = (num/(Math.pow(10, maxLenght - 1))).toString().split('.')

		arrs[0] = +newNumStrs[0];

		if( (num % (Math.pow(10, maxLenght - 1)) ) !== 0 ){
			newNumStrs[1].split('').forEach(function(val, idx){
				arrs[idx+1] = +val;
			});
		}


		for(i = 0  ; i < maxLenght; i++){
			// console.log(arrs[i]);
			if(typeof arrs[i] === 'undefined'){
				arrs[i] = 0;
			}
		}
		return arrs;
	}
	


	function prepareNextShowSignNum(nextNum){

		var currentSigninNums,
			nextSigninNums
		;
		next = nextNum || (current + 1);

		currentSigninNums = changeSigninNumToArray(current);
		nextSigninNums = changeSigninNumToArray(next);

		$signinCards.each(function(idx){
			var nextDigit = nextSigninNums[idx],
				$card,
				$firstDigit
			;
			if(currentSigninNums[idx] !== nextDigit){
				$card = $signinCards.eq(idx);
				$firstDigit = $card.find('.card-figure');
				$card.append('<span class="card-figure">'+nextDigit+'</span>');
				$firstDigit.addClass(signinCardShiftClassname);
			}
		})

	}


	function getSigninedContent(){
		$.ajax({
			url: ajaxUrl,
			type: 'POST',
			dataType: 'json',
			success: function(result){
				var signinData = result.rst.userInfo;
				if(signinData){
					removeLastSigninRecord();
					appendSigninRecord(signinData);
					prepareNextShowSignNum();
				}
			},
			error: function(err){
			}
		});
	}

	$signinLastCard.on('transitionend', '.card-figure', function(){
		window.setTimeout(function(){
			$('.card-figure__is-shift').remove();
		}, 500);
		current = next;

	});



	function removeLastSigninRecord(){
		var $signinRecords = $signinUserListContainer.find('li');
		if($signinRecords.size() < MAX_SIGNIN_RECORD_SIZE ){
			return;
		}
		$signinUserListContainer.find('li').eq(MAX_SIGNIN_RECORD_SIZE-1).remove();
	}


	function appendSigninRecord(data){
		var signinRecordItem = [];
		signinRecordItem.push('<li class="entered-employee--item employee-item__insert">');
			signinRecordItem.push('<div class="entered-employee--left">');
				signinRecordItem.push('<div class="employee-avatar entered-avatar"><img src="'+data.userHead+'"></div>');
			signinRecordItem.push('</div>');

			signinRecordItem.push('<div class="entered-employee--right">');
				signinRecordItem.push('<div class="entered-txt">'+data.userName+'</div>');
				signinRecordItem.push('<div class="entered-txt">进入现场</div>');
			signinRecordItem.push('</div>');
		signinRecordItem.push('</li>');
		$signinUserListContainer.prepend(signinRecordItem.join(''))
	}

    window.setTimeout(function(){
    	prepareNextShowSignNum(+$signinNumContainer.data('signinNum'));
    	doRecord();
    }, 100)


    function doRecord(){
	    window.setTimeout(function(){
			getSigninedContent();
			doRecord();
		}, 1000);
    }



    // window.setInterval(function(){
    // 	getSigninedContent();
    // }, 1000)

}(Zepto));