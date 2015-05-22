$(document).ready(function($) {
	$(".sign-in").click(function() {
		$.ajax({
			url: 'http://10.29.2.70:9292/login', // 跳转到 action    
			data: {
				developer_key: $("#developer_key").val(),
				password: $("#password").val()
			},
			type: 'post',
			cache: false,
			success: function(data) {
				window.location.href = "http://10.29.3.148:8020/developer-helper/view/properties.html"
			},
			error: function() {
				// view("异常！");    
				alert("异常！");
			}
		});
	})
})