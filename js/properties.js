$(document).ready(function($) {
	// browser window scroll (in pixels) after which the "menu" link is shown
	var offset = 300;

	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');

	//hide or show the "menu" link
	checkMenu();

	getProperties();

	$(window).scroll(function() {
		checkMenu();
	});

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function() {
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});

	function getProperties() {
		$.ajax({
			url: 'http://10.29.2.70:9292/get_listings', // 跳转到 action    
			type: 'get',
			datatype:'json',
			success: function(data) {
				  for(i=0;i < data.length;i++){
				  	$("#cd-gallery-items").append(format_html(data[i]));
				  }			
			},
			error: function() {
				// view("异常！");    
				alert("异常！");
			}
		});
	}
	
	function format_html(json_obj){
		return "<li><div class='pic'><a href ='./report.html?listingId="
		     + json_obj['listing_id']
		     + "'><img src='"
		     + json_obj['picture']
		     + "'/></a><div class='overlay'>$"
		     + json_obj['price']
		     + "</div></div>"
		     + "<div><div class='skin agents'>"
			 + json_obj['agentName']
			 + "</div><div class='skin'>"
			 + json_obj['address']
			 + "</div><div class='skin'>"
			 + json_obj['description']
			 + "</div></div></li>"
	}
	
	function checkMenu() {
		if ($(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
			navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
				mainNavigation.addClass('has-transitions');
			});
		} else if ($(window).scrollTop() <= offset) {
			//check if the menu is open when scrolling up
			if (mainNavigation.hasClass('is-visible') && !$('html').hasClass('no-csstransitions')) {
				//close the menu with animation
				mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
					//wait for the menu to be closed and do the rest
					mainNavigation.removeClass('is-visible is-hidden has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
				});
				//check if the menu is open when scrolling up - fallback if transitions are not supported
			} else if (mainNavigation.hasClass('is-visible') && $('html').hasClass('no-csstransitions')) {
				mainNavigation.removeClass('is-visible has-transitions');
				navigationContainer.removeClass('is-fixed');
				$('.cd-nav-trigger').removeClass('menu-is-open');
				//scrolling up with menu closed
			} else {
				navigationContainer.removeClass('is-fixed');
				mainNavigation.removeClass('has-transitions');
			}
		}
	}
});