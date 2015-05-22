$(document).ready(function($) {
	listingId = getQueryString('listingId')
	get_property_detail(listingId);
	$("#picture").attr('src','../images/listing'+listingId+'.jpg' );
	var offset = 300;

	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');

	//hide or show the "menu" link
	checkMenu();

	$(window).scroll(function() {
		checkMenu();
	});

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function() {
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});

	function get_property_detail(listingId) {
		$.ajax({
			url: 'http://10.29.2.70:9292/' + listingId + '/get_listings_details', // 跳转到 action    
			type: 'get',
			cache: false,
			success: function(data) {
				draw_chart(data['exposures'], 'exposures');
				draw_chart(data['engagements'], 'engagements');
				draw_chart(data['enquires'], 'enquires');
			},
			error: function() {
				alert("异常！");
			}
		});
	}

	function draw_chart(values, obj_id) {
		require.config({
			paths: {
				echarts: 'http://echarts.baidu.com/build/dist'
			}
		});

		// 使用
		require(
			[
				'echarts',
				'echarts/chart/pie'
			],
			function(ec) {
				var myChart = ec.init(document.getElementById(obj_id));

				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					series: [{
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: values
					}]
				};
				myChart.setOption(option);
			}
		);
	}

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
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
})