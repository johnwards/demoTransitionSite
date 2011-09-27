/* Author: 

*/


function resizePages() {
	var h = $(window).height();
	var height  =  h < 640 ? 640 : h;
	$('.page').each(function(){
        var $this = $(this);
        var currentHeight = $this.css('height').replace(/[^0-9]/gi, '');
        if(currentHeight < height) {
            $this.css('height',height);
        }
    });
}

function pageTurn(direction) {
	var newPage;
	if (direction == 'next' && $('.page.selected').index() < $('.page').length-1)  newPage = $('.page.selected').next();
	else if (direction == 'prev' && $('.page.selected').index() > 0) newPage = $('.page.selected').prev();
	if (newPage) {
		$('.page').removeClass('selected');
		newPage.addClass('selected');
		jQuery.scrollTo.window().queue([]).stop();
		$(window).scrollTo(newPage,1200,{easing:'easeOutQuint'});

	}
}

$(document).ready(function() {

    $('.page .next').click(function(e) {
		pageTurn('next');
	});

    $('.page .prev').click(function(e) {
		pageTurn('prev');
	});

    //resize
	$(window).resize(function(e) {
		resizePages();
	});
	resizePages();

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
