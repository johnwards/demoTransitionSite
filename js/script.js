/* Author: 

*/


function resizePages() {
	var h = $(window).height();
    var w = $(window).width();
	var height  =  h < 480 ? 480 : h;
    var width  =  w;

    $('#container').css({
		width:width,
		height:height
	});
	
	// set the widths to the container
	$('.page').width(width)
	
	// and any pages shorter than the height, to the height
		.filter(function(){
			return $(this).height() < height;
		}).height(height);
	
	
	$('html.touch #page-container').css({
		width:width * $('.page').size(),
		height:height
	});
}

//returns a function that will turn the page in a given direction
function pageTurn(direction) {
	return function(){
		var newPage = $.proxy($.fn[direction], $('.page.selected'))();

		if (newPage.size()) {
			$('.page').removeClass('selected');
			newPage.addClass('selected');
	        if($("html").hasClass("touch")) {
	            var pageNumber = newPage.index();
	            var width = newPage.width();
	            var left = pageNumber * width * -1;

	            newPage.parent().animate({left: left}, 1200, 'easeOutBack');
	        } else {
	            jQuery.scrollTo.window().queue([]).stop();
	            $(window).scrollTo(newPage,1200,{easing:'easeOutBack'});
	        }
		}
	};
}

$(document).ready(function() {

	$('html.touch #container').swipe({
		threshold:100, 
		swipeLeft: pageTurn('next'), 
		swipeRight: pageTurn('prev')
	});

    $('.page .next').click(pageTurn('next'));

    $('.page .prev').click(pageTurn('prev'));

    //resize
	$(window).resize(resizePages).resize();

    $(window).scroll(function(e) {
		var top = $(document).scrollTop();
		var wHeight = Math.max(640,$(window).height());

		if (top < $('.page.selected').offset().top-wHeight/2) {
			var index = $('.page.selected').index();
			$('.page').removeClass('selected');
			$('.page').eq(Math.max(0,index-1)).addClass('selected');
		} else if (top > $('.page.selected').offset().top + wHeight/2) {
			var index = $('.page.selected').index();
			$('.page').removeClass('selected');
			$('.page').eq(Math.min($('.page').length-1,index+1)).addClass('selected');
		}
	});
});
