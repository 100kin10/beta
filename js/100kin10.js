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
		$containerHeight 	= $("#ajax-container").height(),
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


	// cross browser alternative to console.log
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
		bindHoverFx();
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
		console.log('running');
		var browserheight = $(window).height();
		var browserWidth = $(window).width();
		var halfWidth = browserWidth / 2;
		var threeQuarterWidth = browserWidth * .75;	

		if (!$isMobile) {
			$newHeight = browserheight;
			console.log('running again');
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
				
				$(".fill-browser-inner-quizinart").each(function() {
						var $thisinner = $(this).height();
						var $extraspace = ( (browserheight - $thisinner) / 2 ) - $headerHeight;
						
						if ($extraspace > 0){
							$(this).css('margin-top', $extraspace);
						}
						
						
				});
		
			});
			
		}	
	}
	

	
	
	function quizinart() {

		$(".quizinart-text-input").keyup(function(event){
			
		    if(event.keyCode == 13){
		        $container = $(this).closest('.question-container');
						$container.addClass('questionCompleted');
						$container.removeClass('questionNotCompleted');
						$container.removeClass('currentQuestion');
						
						if ($(this).attr('id') == 'question0') {
							console.log('true');
							$nextQuestion = $( '#question-2' );
						} else {
							$nextQuestion = $container.next( '.question-container' );
						};
						
						$nextQuestion.addClass('currentQuestion');
						$nextInput = $nextQuestion.find('.quizinart-input-container input');
						$nextInput.select();
				
						$formTarget = $(this).data('target');
						
						$enteredValue = $(this).val();
						$($formTarget).val($enteredValue);
		    }
		});
		
		 
		$('a.selection-option').unbind('click');
		$('a.selection-option').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$formTarget = $(this).data('target');
			$dataAnswer = $(this).data('answer');
			if ($formTarget == "#s4-submit") {
				$('#s4-submit').click();
				_gaq.push(['_trackEvent', 'Submit', 'Section Four Submit', 'Section Four Submit']);
			} else {
					if (!$(this).hasClass('ignore-selection')) {
							if ($(this).hasClass('radio-selection')) {
								$newThis = $($formTarget).find('input');
								$dataAnswer = '[value="' + $dataAnswer + '"]';
								$($newThis).filter($dataAnswer).prop('checked', true);
							} else {
									$($formTarget)[0].selectedIndex = $dataAnswer - 1;
									/*$($formTarget).prop('checked',true);*/
									$($formTarget).attr("selected","selected");
							};
					
					};
				
			};
			
			
			$(this).addClass('optionSelected');
	        $container = $(this).closest('.question-container');
			$container.addClass('questionCompleted');
			$container.removeClass('questionNotCompleted');
			$container.removeClass('currentQuestion');
			$nextQuestion = $container.next( '.question-container' );
			$nextQuestion.addClass('currentQuestion');
			$nextInput = $nextQuestion.find('.quizinart-input-container input');
			$nextInput.select();
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
