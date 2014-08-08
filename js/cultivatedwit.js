$(document).ready(function () { // HTML5 Boilerplate with Ajax and html5 history push states // Updated Feb 2014 by Adam Peterson

	var base				= $('#blogURL').attr('href'), // a hidden link in the header generated with bloginfo('url') allows us to get the blog URL dynamically
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
		$el;
		
		var headerHeight = $('#absolute-to-fixed-bar').height();
		
		
		
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
	
	function isSupportedBrowserHistory() {
		return !!(window.history && history.pushState);
	}

	function popStateHandler(event) {
		if(event.state != null) {
			(event.preventDefault) ? event.preventDefault() : event.returnValue = false;	// Prevents the links default action
			ajaxLoadContent(event.state);
		}
	}
	

	

	function init() {

		$finishedLoading = true;
		isiPad();
		
		bindLayzy();
		updateBindFunctions();

		$('.cultivated-img').fancybox();
		
		$("ul li:last-child").addClass("last-item");

		$historySupported = isSupportedBrowserHistory();
		if($historySupported) {
			var current = location.protocol + '//' + location.hostname + location.pathname;
			if (base + '/' != current) {
				var diff = current.replace(base, '');
				history.replaceState(diff, base + diff, diff);
			} else {
				history.replaceState(' ', base, '');
			}
			window.onpopstate = popStateHandler;
		} else {
			// dont do anything. fallback for browsers that don't support history states
		}
		aolResize();	
		$(window).trigger('resize');
			
	}
	
	function scrollarama() {

		sTop = $(window).scrollTop();
		scrollOffset = $(window).height() / 2;

		if ($('body').hasClass('home') && $('body').hasClass('wide-enough-for-sidebar')) {
			
	    startDistance = $('#our-services-inner').offset().top - headerHeight;
		
			stopDistance = $('#services-panel-4').offset().top - headerHeight + 200;
		
			panel1Distance = $('#services-panel-1').offset().top - scrollOffset;
		
			panel2Distance = $('#services-panel-2').offset().top - scrollOffset;
		
			panel3Distance = $('#services-panel-3').offset().top - scrollOffset;
		
			panel4Distance = $('#services-panel-4').offset().top - scrollOffset;
		
			var distanceFromTop = $('#home-page-intro').height() + $('#home-page-tagline-container').height();
		
		
			if ((sTop >= startDistance) && (sTop <= stopDistance)) {
				$('#services-info-sidebar').addClass('sidebar-fixed');

			} else {
			
				if (sTop < startDistance) {
					$('#services-info-sidebar').addClass('before-sidebar');
			
				} else {
				
					$('#services-info-sidebar').removeClass('before-sidebar');
				}
			
				if (sTop > stopDistance) {
					$('#services-info-sidebar').addClass('after-sidebar');
			
				} else {
				
					$('#services-info-sidebar').removeClass('after-sidebar');
				}
			
			
				$('#services-info-sidebar').removeClass('sidebar-fixed');
			
			}
		
			if (sTop < panel1Distance) {
				$('#our-services-container').data('current', 1);
				$('#our-services-container').addClass('panel1');
			
				$('#our-services-container').removeClass('panel2');
				$('#our-services-container').removeClass('panel3');
				$('#our-services-container').removeClass('panel4');
			}
		
			if (sTop > panel1Distance) {
				$('#our-services-container').data('current', 1);
				$('#our-services-container').addClass('panel1');
				var v0 = $("#services-panel-1 video")[0];
				if (typeof(v0) != "undefined"){
						v0.play();
				}
			
				$('#our-services-container').removeClass('panel2');
				$('#our-services-container').removeClass('panel3');
				$('#our-services-container').removeClass('panel4');
			
			} 
		
			if (sTop > panel2Distance){
				$('#our-services-container').data('current', 2);
				$('#our-services-container').addClass('panel2');
				var v1 = $("#services-panel-2 video")[0];
				if (typeof(v1) != "undefined"){
						v1.play();
				}
			
				$('#our-services-container').removeClass('panel1');
				$('#our-services-container').removeClass('panel3');
				$('#our-services-container').removeClass('panel4');
			} 
		
			if (sTop > panel3Distance){
				$('#our-services-container').data('current', 3);
				$('#our-services-container').addClass('panel3');
				var v2 = $("#services-panel-3 video")[0];
				if (typeof(v2) != "undefined"){
						v2.play();
				}
				$('#our-services-container').removeClass('panel2');
				$('#our-services-container').removeClass('panel1');
				$('#our-services-container').removeClass('panel4');
			} 
		
			if (sTop > panel4Distance){
				$('#our-services-container').data('current', 4);
				$('#our-services-container').addClass('panel4');
				var v3 = $("#services-panel-4 video")[0];
				if (typeof(v3) != "undefined"){
						v3.play();
				}
				$('#our-services-container').removeClass('panel2');
				$('#our-services-container').removeClass('panel3');
				$('#our-services-container').removeClass('panel1');
			}
		
		
			$panel = '#sidebar-panel-' + $('#our-services-container').data('current');
		
			if (!$($panel).hasClass('current-panel')) {
				$('.last-panel').removeClass('last-panel');
				$('.current-panel').addClass('last-panel');
				$('.last-panel').removeClass('current-panel');
				setTimeout(function() { $('.last-panel').removeClass('last-panel'); }, 500);
				$($panel).addClass('current-panel');
			
			}
		
			
		}

    

	}
	
	


	
/*

  var scroll_pos = 0;
  var animation_begin_pos = 1795; //where you want the animation to begin
	
  var animation_end_pos = 4500; //where you want the animation to stop

  var beginning_color = new $.Color( 'rgb(255,143,73)' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
  var ending_color = new $.Color( 'rgb(147,208,233)' ); ;//what color we want to use in the end
	
  $(document).scroll(function() {
      scroll_pos = $(this).scrollTop(); 
      if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) { 
         // console.log( 'scrolling and animating' );
          //we want to calculate the relevant transitional rgb value
          var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );
          var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
          var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
          var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
          var newColor = new $.Color( newRed, newGreen, newBlue );
          //console.log( newColor.red(), newColor.green(), newColor.blue() );
          $('#services-info-sidebar').animate({ backgroundColor: newColor }, 0);
      } else if ( scroll_pos > animation_end_pos ) {
           $('#services-info-sidebar').animate({ backgroundColor: ending_color }, 0);
      } else if ( scroll_pos < animation_begin_pos ) {
         
      } else { }
  });
	
	
	*/

	
	function updateBindFunctions() {
		mediaQueryCalculator();
		fullScreenSlide();
		bindHoverFx();
		bindScroll();
		
		section4();
				
		setTimeout(function(){
			if ($('html').hasClass('lazy-loading')){
				$heroUrl = 'url(' + $('img.lazy-source').attr('src') + ')';
				$('.layzy').css('background', $heroUrl);
				$('.layzy').addClass('fadeIn');
				$('html').removeClass('lazy-loading');
				$('html').addClass('lazy-loaded');
				aolResize();
			}
		},1000);
		
		setTimeout(function(){
				aolResize();
		},2000);
			 
		homeLabelFix();
		$("#content").fitVids();

		jQuery.get('/wp-content/plugins/contact-form-7/includes/js/scripts.js', function(data) { eval(data); });
	}
	
	function aolResize() {

		$("object").each(function() {
			var orig = $(this);
			var ratio = orig.outerHeight() / orig.outerWidth();
			var parWidth = orig.parents().find(".post").width();
				orig.css("width", parWidth).css("height", (parWidth * ratio));
		});
		
		$("video").each(function() {
			var orig = $(this);
			var ratio = orig.outerHeight() / orig.outerWidth();
			var parWidth = orig.parents().find(".post").width();
				orig.css("width", parWidth).css("height", (parWidth * ratio));
				$(this).parent().css("width", parWidth).css("height", (parWidth * ratio));
				$('#playbuttonDiv0').css("width", parWidth).css("height", (parWidth * ratio));
				$('#playButtonCanvas_0').css("width", parWidth).css("height", (parWidth * ratio));	
		});

	}
	
	function scriptExecuter() {
		$script = $('.script-executer').data('script');
		var scriptContent = $script.html(); //Grab the content of this tag					
		console.log(scriptContent);
		eval(scriptContent);
			

	}
	
	function findUrls( text )
	{
	    var source = (text || '').toString();
	    var urlArray = [];
	    var url;
	    var matchArray;

	    // Regular expression to find FTP, HTTP(S) and email URLs.
	    var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

	    // Iterate through any URLs in the text.
	    while( (matchArray = regexToken.exec( source )) !== null )
	    {
	        var token = matchArray[0];
	        urlArray.push( token );
	    }

	    return urlArray;
	}
	
	
	
	function section4() {

		$(".section4-text-input").keyup(function(event){
			
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
						$nextInput = $nextQuestion.find('.section4-input-container input');
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
			$nextInput = $nextQuestion.find('.section4-input-container input');
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
	
	
	function homeLabelFix() {
		
	}
	
	
	function pageSpecificUpdates() {
		if ( $('body').hasClass('home') ){
			if (!$isMobile) {
				$('.home #access').animate({top: "-80px"}, 1000);

				$('.home #cultivated-logo').animate({opacity: "0"}, 1000);

				
			};
			
				
		}

	}
	
	
	
	function bindLayzy() {
		
		$('img.lazy-source').unbind("load");
		$('img.lazy-source').bind("load", function() {
        	$heroUrl = 'url(' + $(this).attr('src') + ')';
			$('.layzy').css('background', $heroUrl);
			$('.layzy').addClass('fadeIn');
			$('html').removeClass('lazy-loading');
			$('html').addClass('lazy-loaded');
		})
	}
	
	

	function ajaxLoadContent(path) {
		$finishedLoading = false;
		
		$containerHeight = $mainContent.height();
		$mainContent.css('height', $containerHeight);

		$.ajax({
			type: "GET",
			url: base + path,
			dataType: "html",
			success: function(out){
				$innerContainer.fadeOut(300, function() {
					$mainContent.empty();
					$('#absolute-to-fixed-bar').css('display', 'none');
					var result = $(out);
					var pageContent = $(out).find("#content");
					$('html, body').animate({ scrollTop: 0},	 0);
					$('html').addClass('lazy-loading');
					$('html').removeClass('lazy-loaded');
					$mainContent.append(pageContent.fadeIn(300, function() {
						if ($('body').hasClass('blog') || $('.single-post article').hasClass('category-aol-video')) {
							window.location.reload(true);
						};
						
						$(window).trigger('resize');
						controlHeight();
						$finishedLoading = true;
						$(window).unbind('scroll');
						updateBindFunctions();
						$mainContent.css('height', 'auto');
						fixPlaceholders();
					}));
					
					

					$("#project-overview h2:first-child").addClass("first-item");
					updateBindFunctions();
					
					$innerContainer	= pageContent;
					document.title =  $innerContainer.data('title');

					var classList = $innerContainer.attr('class').split(/\s+/); // gets the body classes from the new content  

					$('body').removeClass(); // removes the classes from the body tag

					$.each( classList, function(index, item){  
						$('body').addClass(item); // adds the ajaxed body classes to the current body tag
					});
					pageSpecificUpdates();
				});
				
            }
       });
	}

	// Loads most internal links with Ajax
	$('a:urlInternal').live('click', function(event) { // Test to see if link is an internal link
		if($historySupported) { // Test to see if the history push state is supported in the browser
			$el = $(this);
			// Test to make sure the link clicked is not one of the links that needs to perform its' default action 
			// The WP admin bar, the comment reply/cancel reply link, or the edit post link.
			if ((!$el.hasClass("comment-reply-link")) &&
			($el.attr("id") != 'cancel-comment-reply-link') &&
			(!$el.hasClass('ab-item')) && 
			(!$el.hasClass('post-edit-link')) &&
			(!$el.hasClass('cultivated-img')) &&
			(!$el.hasClass('form-submit')) &&
			(!$el.parent().hasClass('no-ajax')) &&
			(!$el.hasClass('no-ajax')) ) 
			{ 
				(event.preventDefault) ? event.preventDefault() : event.returnValue = false;	// Prevents the links default action
				var path = $el.attr('href').replace(base, ''); // get link's URL, removes base domain URL
				history.pushState(path , base + path, path);  // Set state object, title | description,  Update URL to the path
				ajaxLoadContent(path); // fetches and fades in Ajaxed content of path
				$(".current_page_item").removeClass("current_page_item");
				$allLinks.removeClass("current_link");
				$el.addClass("current_link").parent().addClass("current_page_item");
				_gaq.push(['_trackPageview']);
				return;
			}
		}	
	});

	$('#searchform').submit(function(event) {
		if($historySupported) { 
			(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
			var s = $searchInput.val();
			if (s) {			
				var path = '/?s=' + s;
				history.pushState(path , base + path, path);  // Set state object, title | description,  Update URL to the path
				ajaxLoadContent(path); // fetches and fades in Ajaxed content of path
				
				$('#search-container').fadeToggle();
				$('#search-container').toggleClass('container-active');				
				$('html').toggleClass('overlay-active');
				
				$(".current_page_item").removeClass("current_page_item");
				$allLinks.removeClass("current_link");
			}
			return false;
		}
	});
	

	$(window).resize(function() {
		updateBindFunctions();
		mediaQueryCalculator();
		
		
		
		
		
	});
	
	function mediaQueryCalculator() {
		var width = $(window).width();

		if (width >= 0 && width <= 479) {
			$('body').removeClass('wide-enough-for-sidebar');
			$newWidth = 'width-0-479';
		} else if (width >= 480 && width <= 767) {
			$('body').removeClass('wide-enough-for-sidebar');
			$newWidth = 'width-480-767';
		} else if (width >= 768 && width <= 1023) {
			$('body').addClass('wide-enough-for-sidebar');
			$newWidth = 'width-768-1024';
		} else if (width >= 1024 && width <= 1199) {
			$('body').addClass('wide-enough-for-sidebar');
			$newWidth = 'width-1024-1199';
		} else if (width >= 1200) {
			$('body').addClass('wide-enough-for-sidebar');
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
		

		
		if (!$isMobile)  {
			$headerHeight = $('#absolute-to-fixed-bar').height() - 4;
			$newHeight = browserheight - $headerHeight;
			$fullVideoHeight = $newHeight + 200;
			
			$('.fill-browser').css('min-height', $newHeight);
			$('.fill-browser.background-video').css('min-height', $fullVideoHeight);
			
			var width = $(window).width();
			if (width >= 780 && $('body').hasClass('wide-enough-for-sidebar')) {
				$('#services-info-sidebar').css('height', $newHeight);
			} else {
				$('#services-info-sidebar').css('height', 'auto');
			}
				
			
			
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
				
				$(".fill-browser-inner-section4").each(function() {
						var $thisinner = $(this).height();
						var $extraspace = ( (browserheight - $thisinner) / 2 ) - $headerHeight;
						
						if ($extraspace > 0){
							$(this).css('margin-top', $extraspace);
						}
						
						
				});
		
			});
			
		
			var $recentImageHeight = $('.recent-image').outerHeight(true);
			
			$(".recent-work-info-container .recent-info").each(function() {

					var $recentTextHeight = $(this).outerHeight();
					var $recentMargin = ( (($recentImageHeight - $recentTextHeight) / 2) );
					
					if ($recentMargin > 0){
						$(this).css('margin-top', $recentMargin);
					}
					
					
			});
		}
		

  		setTimeout(function(){
  			$('.control-height').removeClass('control-height');
  			$('#ajax-container').attr('style', '');
  		},500);

	}	
	
	function controlHeight() {
		$('html, body, #ajax-container, #content').addClass('control-height');

	}
	
	
	function bindHoverFx() {
		$('.not-mobile-device .recent-work-sample').unbind('hover');
		$('.not-mobile-device .recent-work-sample').hover(function() {
		    $(this).addClass('show-recent-info');
			console.log('hovered');
		}, function() {
		    $(this).removeClass('show-recent-info');
		});
		
		
		$('.not-mobile-device #access').unbind('hover');
		$('.not-mobile-device #access').hover(function() {
		    $(this).addClass('menu-open');
		}, function() {
		    $(this).removeClass('menu-open');
		});
		
		$('.footer-column').unbind('hover');
		$('.footer-column').hover(function() {
		    $(this).addClass('beingHovered');
		}, function() {
		    $(this).removeClass('beingHovered');
		});
		
		
		$('.recent-work-sample h3.recent-title').unbind('hover');
		$('.recent-work-sample h3.recent-title').hover(function() {
		    $(this).closest('.recent-work-sample').addClass('specialHover');
		}, function() {
		    $(this).closest('.recent-work-sample').removeClass('specialHover');
		});
		
		$('#recent-work-container .recent-image').unbind('hover');
		$('#recent-work-container .recent-image').hover(function() {
		    $(this).closest('.recent-work-sample').addClass('specialHover');
		}, function() {
		    $(this).closest('.recent-work-sample').removeClass('specialHover');
		});
		
		$('.page-template-page-projects-php .recent-title').unbind('hover');
		$('.page-template-page-projects-php .recent-title').hover(function() {
		    $(this).closest('.work-post').addClass('specialHover');
		}, function() {
		    $(this).closest('.work-post').removeClass('specialHover');
		});
		
		$('#blog-newsletter-bar').unbind('hover');
		$('#blog-newsletter-bar').hover(function() {
		    $(this).addClass('beingHovered');
		}, function() {
		    $(this).removeClass('beingHovered');
		});
		
		$('#newsletter-input-2').unbind('hover');
		$('#newsletter-input-2').hover(function() {
		    $('#blog-newsletter-bar').addClass('beingHovered');
		}, function() {
		    $('#blog-newsletter-bar').removeClass('beingHovered');
		});
		
		
		$('a.scroll-arrow').unbind('click');
		$('a.scroll-arrow' ).click(function() {
		    event.preventDefault();
		    var target = $(this).attr('href');
		    $('html, body').animate({
		        scrollTop: $(target).offset().top - $('#absolute-to-fixed-bar').height()
		    }, 700, "swing");
		});
		
		
		
		
		$('.mobile-device #access').unbind('click');
		$('.mobile-device #access').click(function() {
		    $(this).toggleClass('menu-open');
		});
		
		$('.mobile-device #mobile-menu-button').unbind('click');
		$('.mobile-device #mobile-menu-button').click(function() {
		    $('body').addClass('mobile-menu-active');
		});
		
		$('.mobile-device #mobile-menu-close-button').unbind('click');
		$('.mobile-device #mobile-menu-close-button').click(function() {
		    $('body').removeClass('mobile-menu-active');
		});
		
		$('.mobile-device #menu-cw-menu li a').unbind('click');
		$('.mobile-device #menu-cw-menu li a').click(function() {
		    $('body').removeClass('mobile-menu-active');
		});
		
		$('a#join-section-four').unbind('click');
		$('a#join-section-four').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		    $('#section4-mobile-form').addClass('open-form');
		});
		
		$('#follow-inner #close-button ').unbind('click');
		$('#follow-inner #close-button ').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		    $('#follow-container').fadeToggle();
			$('#follow-container').toggleClass('container-active');
			$('html').toggleClass('overlay-active');
		});
		
		$('#follow-inner .whiskey-friday-link ').unbind('click');
		$('#follow-inner .whiskey-friday-link ').click(function(e) {
		    $('#follow-container').fadeToggle();
			$('#follow-container').toggleClass('container-active');
			$('html').toggleClass('overlay-active');
		});
		
		
		$('li.follow-link').unbind('click');
		$('li.follow-link').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		    $('#follow-container').fadeToggle();
			$('#follow-container').toggleClass('container-active');
			$('html').toggleClass('overlay-active');
		});
		
		
		
		$('#search-inner #close-button ').unbind('click');
		$('#search-inner #close-button ').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		    $('#search-container').fadeToggle();
			$('#search-container').toggleClass('container-active');
			$('html').toggleClass('overlay-active');
			
		});
		
		$('li.search-button').unbind('click');
		$('li.search-button').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		    $('#search-container').fadeToggle();
			$('#search-container').toggleClass('container-active');
			$('html').toggleClass('overlay-active');
		});

		$('#facebook-share').unbind('click');
		$('#facebook-share').click(function() {
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'Icons', 'Facebook share clicked', $linkTitle]);
		});
		
		$('#twitter-share').unbind('click');
		$('#twitter-share').click(function() {
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'Icons', 'Twitter share clicked', $linkTitle]);
			
		});
		
		
		if(!$isMobile){
			$('a.changing-number').unbind('hover');
			$('a.changing-number').hover(function() {
			    $(this).html($(this).data('answer'));
			}, function() {
			    $(this).html($(this).data('original'));
			});
		}
		
		
		$('a#reset-roulette').unbind('click');
		$('a#reset-roulette').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			$('.roulette-text').each(function() {
			  $(this).text($(this).data('original'));
			  $(this).data('currentNumber', 0);
			});
			
		});
		
		$('a#randomize-roulette').unbind('click');
		$('a#randomize-roulette').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
				var min = 0;
				var max = 3;
			$('.roulette-text').each(function() {
				$text = $(this);
				$num = Math.floor(Math.random() * (max - min + 1)) + min;
				while ($num == $(this).data('currentNumber')) {
					$num = Math.floor(Math.random() * (max - min + 1)) + min;
				}
				$words = [];				
				
				$words[0] = $text.data('original');
				$words[1] = $text.data('words1');
				$words[2] = $text.data('words2');
				$words[3] = $text.data('words3');				
				
				$text.text($words[$num]);
				$text.data('currentNumber', $num);

			});
			
		});
		
		if(!$isMobile){
			var $sidebarHeight = $('#right-sidebar').outerHeight(true) + 200;
			$('#recent-post-inner').css('min-height', $sidebarHeight);
		}
		
		var $num = 0;
		
		if(!$isMobile){
			
			$('.roulette-text').each(function() {
			  $(this).data('currentNumber', 0);
			});
			
		/*
			
					$('.roulette-text').unbind('click');
					$('.roulette-text').click(function(e) {

							$text = $(this);
							$num = $text.data('currentNumber');
							$num++;
							if($num >= 4){
								$num = 0;
							}
							$words = [];

							$words[0] = $text.data('original');
							$words[1] = $text.data('words1');
							$words[2] = $text.data('words2');
							$words[3] = $text.data('words3');				

							$text.text($words[$num]);
							
							
							$text.data('currentNumber', $num);
							
							
						});
					
					*/
		
			
			

						$('.roulette-text').unbind('hover');
						$('.roulette-text').hover(function() {
							$text = $(this);
							$num = $text.data('currentNumber');
							$words = [];
							
							if ($num >= 4 ) {
								$num = 0;
							} else {
								$num++;	
							}
							
							
							$words[0] = $text.data('original');
							$words[1] = $text.data('words1');
							$words[2] = $text.data('words2');
							$words[3] = $text.data('words3');				
							
							$text.text($words[$num]);
							$num++;	
								timer = setInterval(function(){
									if(( $num > 0 ) && ( $num < 4 )){
										$text.text($words[$num]);
										$num++;
										if ($num >= 4) {
											$num = 0;
										}
										$text.data('currentNumber', $num);						
									} else {
										$text.text($words[$num]);
										$num++;
										
									
										if($num >= 4){
											$num = 0;
										}
										$text.data('currentNumber', $num);
									}
								},200);
								
								
						}, function() {
							clearInterval(timer);
							if($num >= 4){
								$num = 0;
							}
							$text.data('currentNumber', $num);
						});
			
		}
		
		
		$('article').unbind('hover');
		$('article').hover(function() {
		    $(this).addClass('beingHovered');
		}, function() {
		    $(this).removeClass('beingHovered');
		});
		
			$('section').unbind('hover');
			$('section').hover(function() {
			    $(this).addClass('sectionHovered');
			}, function() {
			    $(this).removeClass('sectionHovered');
			});
		
		$('#we-make-fun').lettering();
		
		$('#neat-title').lettering();
		
	}
	
	
	function rouletteMe() {
		
	}
	
	
	
	function fixPlaceholders() {
		
		$('input.wpcf7-text').each(function() {
			if (!$(this).val()) {
				$(this).val($(this).attr('title'));
			}
			if ($(this).val() == $(this).data('originalValue')) {
				$(this).val('');
			}
		});		
				
		$('input.wpcf7-text, textarea ').focus(function() {
			if (!$(this).data('originalValue')) {
				$(this).data('originalValue', $(this).val());
			}
			if ($(this).val() == $(this).data('originalValue')) {
				$(this).val('');
			}
		}).blur(function(){
			if ($(this).val() == '') {
				$(this).val($(this).data('originalValue'));
			}
		});

		$('#mc_mv_EMAIL').val('Email Address');

	    $('#mc_mv_EMAIL').focus(function() {
	        if (!$(this).data('originalValue')) {
	            $(this).data('originalValue', $(this).val());
	        }
	        if ($(this).val() == $(this).data('originalValue')) {
	            $(this).val('');
	        }
	    }).blur(function(){
	        if ($(this).val() == '') {
	            $(this).val($(this).data('originalValue'));
	        }
	    });
	}
	
	function bindScroll() {
		
		var distance = 0,
			blur = 0,
			maxShadow = 10,
			yOffset = 0,
			$bar = $('#absolute-to-fixed-bar'),
			$div = $('#scroll-top-detector'),
			$sideBar = $('.single #fixed-detector'),
			$shareCont = $('#share-contents'),
			$body = $('#ajax-container, #header-container'),
			userAgent = navigator.userAgent,
			sTop = $(window).scrollTop();
		
		if ($finishedLoading === true) {

			if ($div.offset().top <= sTop) {
				$body.addClass('fixed-at-top');
			} else {
				$body.removeClass('fixed-at-top');
			}
			$bar.css('display','block');
			
			// only lock the sharing sidebar on single pages that aren't single column
			
			if ($('body').hasClass('single')){
				if ($('body').hasClass('width-480-767')){
					
				} else if ($('body').hasClass('width-0-479')){

				} else {
					
				}
			}
			
			$(window).unbind('scroll');
			
			$(window).bind('scroll', function(e) {
				
				sTop = $(window).scrollTop();
			
			
				if ((!$isMobile) && (!$('body').hasClass('width-480-767'))) {
					/*
						$('.fade-out-on-scroll').each(function() {
												var offset = sTop - $(this).offset().top;
										    var opacity = ( (offset - $(this).height() ) / 1000 ) * -1;
												$(this).css('opacity', opacity );
											});*/
					


						scrollarama();
				}
				
				
				
				if (sTop > 50) {
					$('html').addClass('scrolled-a-bit');
				} else {
					$('html').removeClass('scrolled-a-bit');
				}
				
				if (sTop > 200) {
					$('html').addClass('scrolled-enough-for-menu');
				} else {
					$('html').removeClass('scrolled-enough-for-menu');
				}
				
			    if ($div.offset().top <= sTop) {
					$body.addClass('fixed-at-top');
				} else {
					$body.removeClass('fixed-at-top');
				}

				var distance = sTop - $div.offset().top;
				if ( $('html').hasClass('mobile-device')) {
					
				}
				else {

				  	if (distance <= 0 ) {
						blur = 0;
					} else if ( (distance > 0 ) && (distance <= 80 ) ){
						blur = distance * .125;
					} else {
						blur = maxShadow;
					}
					$('#absolute-to-fixed-bar').animate({boxShadow: '0 0 '+blur+'px 0 #888'}, 1);
				}
				
				// only lock the sharing sidebar on single pages that aren't single column
				
				if ($('body').hasClass('single')){
					if ($('body').hasClass('width-480-767')){
						
					} else if ($('body').hasClass('width-0-479')){

					} else {
						$scrollTop = $(window).scrollTop();
						if ($sideBar.length){
							if ($sideBar.offset().top != null){
								if ($sideBar.offset().top <= $scrollTop + 72) {
									var $shareMargin = (sTop - $sideBar.offset().top) + 40;
									$shareCont.css('padding-top', $shareMargin);
								} else {
									$shareCont.css('padding-top', '');
								}
							}
						}
					}
				}
				
				
				/*
					Reveal the menu on the homepage when scrolling
				*/

				if (!$isMobile) {
					if ( (distance >= 0) && (distance <= 160) ){
						var $menuOffset = -80 + (distance/2);
						$('.home #access').css('top', $menuOffset);
						var $logoOpacity = distance /160;
						$('.home #cultivated-logo').css('opacity', $logoOpacity);

					} else if (distance > 160){
						$('.home #access').css('top', 0);
						$('.home #cultivated-logo').css('opacity', 1);

					}
				};
				
				

				
			});
		}
	}

	init();

});
