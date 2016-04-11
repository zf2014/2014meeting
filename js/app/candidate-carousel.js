;(function($){


	var $carouselContainer = $('#J-candidateCarousel3DContainer'),

		// 间隔时间
		delay = 2500,
		carouselDeg = 0,
		n = 1
	;

	function run(){
		carouselDeg = (n++)*45;
		$carouselContainer.css({
			'transform' : 'rotateY(' + carouselDeg +'deg)'
		});

		window.setTimeout(function(){
			run();
		}, delay)
	}

	window.setTimeout(function(){
		run();
	}, 500);


}(Zepto));