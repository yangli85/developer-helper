function checkMenu(window) {
		if (window.scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
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