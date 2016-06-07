$(document).scroll(function() {
	var navbar = document.getElementById('dh');
	if(($(document).scrollTop()>=650) && ($(document).scrollTop()<=1800)){
		navbar.className="nav nav-pills navtop2 navbar-fixed-top";
	}
	else {
		navbar.className="nav nav-pills navtop1";
	}
	console.log($(document).scrollTop());
});