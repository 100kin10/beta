// IE8 polyfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// Figure out scrollbar width in Firefox so that media query stuff happens at the same time.
var scrollBarWidth = 0;
if ($.browser.mozilla) {
  scrollBarWidth = window.innerWidth - jQuery("body").width();
}

// as the page loads, call these scripts
$(window).load(responsivequery);
$(window).resize(responsivequery);

function responsivequery() {
  /* getting viewport width */
  var responsive_viewport = $(window).width() + scrollBarWidth;

  var socialbuttons = $("#quizinart-share-buttons");

	$introHeight = $('#quizinart-intro.active').outerHeight(true);

	if ($introHeight) {
		// alert($introHeight);
		$('#quizinart-inner').height($introHeight);
		$('#quizinart-intro').addClass('currentQuestion');
	}
	else {
		$('.currentQuestion').height('auto');
		$currentHeight = $('.currentQuestion').outerHeight(true);
		$('#quizinart-inner').height($currentHeight);
	}

  if (responsive_viewport < 640) {
		if (socialbuttons.hasClass('largescreen')) {
			socialbuttons.detach();
			socialbuttons.appendTo('#video-container-inner').removeClass('largescreen').addClass('smallscreen');
		}
  }

  if (responsive_viewport >= 640) {
		if (socialbuttons.hasClass('smallscreen')) {
			socialbuttons.detach();
			socialbuttons.prependTo('#quizinart-inner-border').removeClass('smallscreen').addClass('largescreen');
		}
  }
};


$(document).ready(function () {

	$('#form-container input[type="radio"]').after('<div class="radio-button-outer-circle"><div class="radio-button-inner-circle"></div></div>');
	$('#form-container input[type="radio"]').on( 'change', function() {
		if ($(this).is(':checked')) {
			$('input[name="' + $(this).attr('name') + '"]').siblings(".radio-button-outer-circle").removeClass('checked');
			$(this).siblings(".radio-button-outer-circle").addClass('checked');
		}
	});


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
		
	
		if(!$isMobile){
			$('a.changing-number').unbind('hover');
			$('a.changing-number').hover(function() {
			    $(this).html($(this).data('answer'));
			}, function() {
			    $(this).html($(this).data('original'));
			});
		}
		
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
		$('#partner-contact-form').toggleClass('open');
		$('#partner-contact-form').toggleClass('closed');
	});
		
		
	function quizinart() {

		$('#quizinart-start-button').on( 'click', function(e) {

			$container = $('#quizinart-intro')
			$container.removeClass('currentQuestion').addClass('inactive').removeClass('active');

			$nextQuestion = $container.next( '.question-container' );
			$nextQuestionHeight = $nextQuestion.outerHeight('true');
			$('#quizinart-inner').height($nextQuestionHeight);

			$nextQuestion.addClass('currentQuestion');

		});

		$( 'label.selection-option').on( 'click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$formTarget = $(this).data('target');
			$dataAnswer = $(this).data('answer');
			$dataText = 'text' + $dataAnswer + '';
			
			$container = $(this).closest('.question-container');
			$container.removeClass('currentQuestion');
			
			$nextQuestion = $container.next( '.question-container' );
			$nextQuestionHeight = $nextQuestion.outerHeight('true');
			$('#quizinart-inner').height($nextQuestionHeight);
			
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
