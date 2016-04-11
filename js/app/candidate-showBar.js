;(function($){

	var $bars = $('.J-showRankBar'),
		$amouts = $('.J-showRankAmount'),
		minHeight = 190,
		riseMaxHeight = 250,
		voteTop3AmountS = [],
		barHeights = [],
		maxAmount,

		intervalTime,

		delay = 50,
		duration = 40000,
		step,
		total = minHeight
	;

	$bars.each(function(){
		var voteNum = +$(this).data('voteAmount');
		voteTop3AmountS.push(voteNum);
	});
	maxAmount = Math.max.apply(null, voteTop3AmountS);

	$bars.each(function(idx){
		barHeights.push(Math.round(minHeight + riseMaxHeight*voteTop3AmountS[idx]/maxAmount));
	})

	step = (delay*((riseMaxHeight + minHeight)/duration))


	// intervalTime = window.setInterval(function(){

	// 	$bars.each(function(idx){
	// 		var self = this;
	// 		if(total < barHeights[idx]){
	// 			$(self).css({height: total});
	// 			$('.J-showRankAmount').eq(idx).html(Math.round( ( (total-minHeight)*voteTop3AmountS[idx]/(barHeights[idx] - minHeight) ) + 0.5 ) );
	// 		}

	// 	});

	// 	if(total > (riseMaxHeight + minHeight) ){
	// 		window.clearInterval(intervalTime);
	// 	}

	// 	total += step;

	// }, delay);


	window.startRise = function(){
		window.setInterval(function(){
			$bars.each(function(idx){
				var self = this;
				if(total < barHeights[idx]){
					$(self).css({height: total});
					$('.J-showRankAmount').eq(idx).html(Math.round( ( (total-minHeight)*voteTop3AmountS[idx]/(barHeights[idx] - minHeight) ) + 0.5 ) );
				}

			});
			if(total > (riseMaxHeight + minHeight) ){
				window.clearInterval(intervalTime);
			}
			total += step;
		}, delay);
	}




}(Zepto));