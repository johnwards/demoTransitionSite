/* Author: 

*/


function resizePages() {
	var h = $(window).height();
    var w = $(window).width();
	var height  =  h < 480 ? 480 : h;
    var width  =  w;
    $('#container').css('width',width).css('height',height);
    var pageContainerWidth = 0;
	$('.page').each(function(){
        var $this = $(this);
        var currentHeight = $this.css('height').replace(/[^0-9]/gi, '');
        if(currentHeight < height) {
            $this.css('height',height);
        }

        $this.css('width',width);
        pageContainerWidth += width;
    });
    $('#page-container').css('width',pageContainerWidth).css('height',height);
}

function pageTurn(direction) {
	var newPage;
	if (direction == 'next' && $('.page.selected').index() < $('.page').length-1)  newPage = $('.page.selected').next();
	else if (direction == 'prev' && $('.page.selected').index() > 0) newPage = $('.page.selected').prev();
	if (newPage) {
		$('.page').removeClass('selected');
		newPage.addClass('selected');

        var pageNumber = newPage.attr("id").replace(/[^0-9]/gi, '');
        var width = newPage.css('width').replace(/[^0-9]/gi, '');
        var left = (pageNumber-1) * width;

        newPage.parent().animate({'left': "-"+left+"px"}, 1200, "easeOutBack");
	}
}

$(document).ready(function() {

    $("#container").swipe( {threshold:100, swipeLeft: function(event) {
        pageTurn("next");
    }, swipeRight: function(event) {
        pageTurn("prev");
    }} );

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
