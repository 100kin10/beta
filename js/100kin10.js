$(document).ready(function () {

	var base				= $('#blogURL').attr('href'),
		$firstPostLink		= $('#first-post-link').attr('href'),
		$mainContent		= $("#ajax-container"),
		$innerContainer		= $('#content'),
		$searchInput		= $("#s"),
		$allLinks			= $("a"),
		$historySupported	= false,
		$currentFeature		= 1,
		$mouseOver	 		= false,
		$finishedLoading 	= false,
		$currentWidth		= '',
		$newWidth			= '',
		$isMobile			= false,
		$whoYouTweetingAt = "",
		$el;
		
	// detect if it is mobile
	if (navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/)) {
		$isMobile = true;
		$('html').addClass('mobile-device');
	} else {
		$isMobile = false;
		$('html').addClass('not-mobile-device');
	};
		
	function isiPad(){
	    if (navigator.userAgent.match(/iPad/i) != null) {
			$('html').addClass('is-iPad');
		}
	}		

	// cross browser console.log
	function debug(text) {
	    if ((typeof(Debug) !== 'undefined') && Debug.writeln) {
	        Debug.writeln(text);
	    }
	    if (window.console && window.console.log) {
	        window.console.log(text);
	    }
	    if (window.opera) {
	        window.opera.postError(text);
	    }
	    if (window.debugService) {
	        window.debugService.trace(text);
	    }
	}

	function init() {
		quizinart();
		fullScreenSlide();
		mediaQueryCalculator();	
	}
	
	
	$(window).resize(function() {
		fullScreenSlide();
		mediaQueryCalculator();
	});
	
	function mediaQueryCalculator() {
		var width = $(window).width();
		if (width >= 0 && width <= 479) {
			$newWidth = 'width-0-479';
		} else if (width >= 480 && width <= 767) {
			$newWidth = 'width-480-767';
		} else if (width >= 768 && width <= 1023) {
			$newWidth = 'width-768-1024';
		} else if (width >= 1024 && width <= 1199) {
			$newWidth = 'width-1024-1199';
		} else if (width >= 1200) {
			$newWidth = 'width-1200';
		}
		
		$('body').removeClass($currentWidth).addClass($newWidth);
		$currentWidth = $newWidth;
	}
	
	function fullScreenSlide() {
		var browserheight = $(window).height();
		var browserWidth = $(window).width();
		var halfWidth = browserWidth / 2;
		var threeQuarterWidth = browserWidth * .75;	

		if (!$isMobile) {
			$newHeight = browserheight;

			$('.fillscreen-section').css('min-height', $newHeight);

			$('body').addClass('fullscreen-sections');

			$('#content').imagesLoaded(function() {
				$('body').addClass('imagesloaded');
				$(".fill-browser-inner").each(function() {
						var $thisinner = $(this).outerHeight();
						var $extraspace = ( ($newHeight - $thisinner) / 2 );
						if ($extraspace > 0){
							$(this).css('margin-top', $extraspace);
						}
				});
				
				$(".vertically-center").each(function() {
						var $thisinner = $(this).outerHeight();
						var $parentHeight = $(this).parents('.vertical-parent').height();
						var $extraspace = ( ($parentHeight - $thisinner) / 2 );
						if ($extraspace > 0){
							$(this).css('margin-top', $extraspace);
						}
				});
				
				$(".fill-browser-inner-quizinart").each(function() {
						var $thisinner = $(this).height();
						var $extraspace = ( (browserheight - $thisinner) / 2 );
						
						if ($extraspace > 0){
							$(this).css('margin-top', $extraspace);
						}
						
						
				});
		
			});
			
		}	
	}
	
	
	$('a.open-form').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#partner-contact-form').addClass('open');
	});
		
		
	function quizinart() {
		
		$( 'a.selection-option').on( 'click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$formTarget = $(this).data('target');
			$dataAnswer = $(this).data('answer');
			$dataText = 'text' + $dataAnswer + '';
			
			$container = $(this).closest('.question-container');
			$container.removeClass('currentQuestion');
			
			$nextQuestion = $container.next( '.question-container' );
			
			$dataResponse = $nextQuestion.data($dataText);
			$responseTarget = $nextQuestion.find('.response-target');			
			$responseTarget.text($dataResponse);
			
			$nextQuestion.addClass('currentQuestion');

		});


		
		
		$('a.firstQuestion-selection-option').unbind('click');
		$('a.firstQuestion-selection-option').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			 $container = $(this).closest('.question-container');
			 $container.removeClass('currentQuestion');
			 $container.addClass('questionCompleted');
			
			 
			 if($isMobile || ($('body').hasClass('width-0-479'))){
				 
	 			if ($(this).data('answer') == 'yes') {
	 				$('#mobile-question-0-1').addClass('currentQuestion');
	 			} else {
	 				$('#mobile-question-0-2').addClass('currentQuestion');
	 			}
				 
				 
			 } else {
	 			if ($(this).data('answer') == 'yes') {
	 				$('#question-0-1').addClass('currentQuestion');
	 			} else {
	 				$('#enter-no').addClass('currentQuestion');
	 			}
			 }
			 	
			
			
		});

	}
	
	init();
});
