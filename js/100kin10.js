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
			socialbuttons.insertAfter('#video-click').removeClass('largescreen').addClass('smallscreen');
		}
  }

  if (responsive_viewport >= 640) {
		if (socialbuttons.hasClass('smallscreen')) {
			socialbuttons.detach();
			socialbuttons.prependTo('#quizinart-inner-border').removeClass('smallscreen').addClass('largescreen');
		}
  }
};

function fbs_click($shareurl,$sharetitle) {
	u=$shareurl;
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u),'sharer','toolbar=0,status=0,width=626,height=436');
	return false;
};


$(document).ready(function () {


	// Quiz stuff
	// ----------------------------------------

	function quizinart() {

		$('#quizinart-start-button').on( 'click', function(e) {

			$container = $('#quizinart-intro')
			$nextQuestion = $container.next( '.question-container' );
			$nextQuestionHeight = $nextQuestion.outerHeight('true');

			$container.removeClass('currentQuestion').addClass('inactive').removeClass('active');
			$('#quizinart-inner').height($nextQuestionHeight);
			$nextQuestion.addClass('currentQuestion');

		});

		$('.quizinart-selections label').on( 'click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var quip = $(this).data('quip');
			if (!quip) {
				quip = ' ';
			}
			$container = $(this).closest('.question-container');
			$nextQuestion = $container.next('.question-container');

			$container.removeClass('currentQuestion');
			$nextQuestion.addClass('currentQuestion').find('.question-header').prepend(quip + ' ');

			$nextQuestionHeight = $nextQuestion.outerHeight('true'); //Important to define this AFTER the previous question's intro has been prepended.
			$('#quizinart-inner').height($nextQuestionHeight);

			if ($nextQuestion.is('#processing')) {
		    setTimeout(function(){
					$container = $('#processing');
					$nextQuestion = $container.next('.question-container');
					$container.removeClass('currentQuestion');
					$nextQuestion.addClass('currentQuestion');
					$nextQuestionHeight = $nextQuestion.outerHeight('true');
					$('#quizinart-inner').height($nextQuestionHeight);
		    },4000);
			}

		});

		var list = $("#question-2 .button-container");
		//make default state _not_ a special case by adding a class to it
		$("label:not(.one,.two,.three,.four)", list).addClass("default"); 
		//declare cycle transition function
		var cycleClass = function(classFrom, classTo){
			list.delegate("label.no."+classFrom, "mouseover", function(){
				$(this).toggleClass(classFrom + " " + classTo);
			});
		};
		cycleClass("default", "two");
		cycleClass("one", "two");
    cycleClass("two", "three");
		cycleClass("three", "four");
		cycleClass("four", "default");

	}

	quizinart();

	// YouTube video on main page
	// ----------------------------------------

	function videoclick() {
		$('#video-click').on('click', function(e) {
			$(this).off('click').removeAttr('href').removeClass('video-click').addClass('video-click-active');
			vid = $(this).data("video-id");
			e.preventDefault();
			$('#playbutton').fadeOut(500, function() {
				$('#the-video-inner').html('<iframe src="//www.youtube.com/embed/' + vid + '?wmode=transparent&showinfo=0&controls=0&rel=0&autoplay=1&enablejsapi=1" frameborder="0" allowfullscreen></iframe>');
			});
			$('#the-video').fadeIn(1000);
			$('.closebutton').fadeIn(1000);
		});

		$('.closebutton').on('click', function() {
			$('#the-video').hide( 1, function() {
				videoclick();
				$(this).css('overflow', 'visible');
			});
			$('#the-video-inner').html('');
			$('#playbutton').show();
			$('.video-click-active').removeClass('video-click-active').addClass('video-click');
		});
	}

	videoclick();

	// Find the select boxes and change them to fancy fake select boxes and radio buttons
	// ----------------------------------------
	$('.ss-select select').each(function() {
	  var $this = $(this);
	  var $name = $this.attr('name');
    $this.wrap('<div class="giantChecklist-outerwrap"></div>').before('<div class="fake-select"></div>').wrap('<div class="giantChecklist-wrap"><div class="giantChecklist"><ul class="ss-choices"></ul></div></div>');

		$this.find('option').each(function(i, e) { // get the options
			$value = $(this).val();
			if ($value) {
		    $('<li class="ss-choice-item"><label><input type="radio" name="' + $name + '" value="' + $value +'" /><span class="ss-choice-label">' + $value +'</span></label></li>') // create a radio element
	        .appendTo($(this).parents('.ss-choices')); // prepend to some visible place
	     }
		});
		$this.remove();
	});

	// Find the lists of checkboxes with more than 12 options and turn them into a fake select box that allows multiple choice
	// ----------------------------------------
	$('.ss-checkbox .ss-choices').each(function() {
	  var $this = $(this);
	  if ($this.find('.ss-choice-item').length > 12) {
      $this.wrap('<div class="giantChecklist-outerwrap"></div>').before('<div class="fake-select"></div>').wrap('<div class="giantChecklist-wrap"><div class="giantChecklist"></div></div>');
	  }
	});

	// Adding fancy radio buttons, updating them on change
	// ----------------------------------------
	$('#form-container input[type="radio"]')
	.hide()
	.after('<div class="radio-button-outer"><div class="radio-button-inner"></div></div>')
	.on( 'change', function() {

		var selectionName = $(this).parents('.ss-choice-item').find('.ss-choice-label').text();

		if ($(this).is(':checked')) {
			$('input[name="' + $(this).attr('name') + '"]').siblings(".radio-button-outer").removeClass('checked');
			$(this).parents('.giantChecklist-outerwrap').find('.fake-select').html('<span title="' + selectionName + '">' + selectionName + '</span>');
			$(this).siblings(".radio-button-outer").addClass('checked');
			$('.giantChecklist-outerwrap').removeClass('listOpen'); // If it was inside one of the fake select boxes, let's close it
		}
	});

	// Adding fancy checkboxes, updating fake checkboxes on change, and updating selection inside fake select boxes
	// ----------------------------------------
	$('#form-container input[type="checkbox"]')
	.hide()
	.after('<div class="checkbox-outer"><div class="checkbox-inner">✓</div></div>')
	.on( 'change', function() {

		var selectionName = $(this).parents('.ss-choice-item').find('.ss-choice-label').text();

		if ($(this).is(':checked')) {
			$(this).siblings(".checkbox-outer").addClass('checked');
			$(this).parents('.giantChecklist-outerwrap').find('.fake-select').append('<span title="' + selectionName + '">' + selectionName + '</span>');
		} else {
			$(this).siblings(".checkbox-outer").removeClass('checked');
			$(this).parents('.giantChecklist-outerwrap').find('span[title="' + selectionName + '"]').remove();
		}
	});

	// Toggle dropdown from fake select element
	// ----------------------------------------
	$('.fake-select').on( 'click', function() {
		if ($(this).parents('.giantChecklist-outerwrap').hasClass('listOpen')) {
			$(this).parents('.giantChecklist-outerwrap').removeClass('listOpen');	 // If the one we clicked on it open, close it
		} else {
			$('.giantChecklist-outerwrap').removeClass('listOpen');
			$(this).parents('.giantChecklist-outerwrap').addClass('listOpen'); // If the one we clicked on is NOT open, close them ALL and THEN open it.
		}
	});

	// Remove dropdown when you click away from it
	// ----------------------------------------
	$(document).mouseup(function (e) {
		var container = $('.giantChecklist-outerwrap');
		if (!container.is(e.target) && container.has(e.target).length === 0) { // if the target of the click isn't the container nor a descendant of the container
		  container.removeClass('listOpen');
		}
	});


	// Add question numbers at the top of each question
	// ----------------------------------------

	var $questionNumber = 0;
	$('.ss-form-question').each(function() {
	  $questionNumber++;
	  $(this).prepend('<label class="question-number">Question ' + $questionNumber + '</label>');
	});
	$('.ss-form-question .question-number').append('/' + $questionNumber);










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
		// quizinart();
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
	
	init();

});
