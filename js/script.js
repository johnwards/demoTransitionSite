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
    if($("html").hasClass("touch")) {
        $('#page-container').css('width',pageContainerWidth).css('height',height);
    }
}

function pageTurn(direction) {
	var newPage;
	if (direction == 'next' && $('.page.selected').index() < $('.page').length-1)  newPage = $('.page.selected').next();
	else if (direction == 'prev' && $('.page.selected').index() > 0) newPage = $('.page.selected').prev();
	if (newPage) {
		$('.page').removeClass('selected');
		newPage.addClass('selected');
        if($("html").hasClass("touch")) {
            var pageNumber = newPage.attr("id").replace(/[^0-9]/gi, '');
            var width = newPage.css('width').replace(/[^0-9]/gi, '');
            var left = (pageNumber-1) * width;

            newPage.parent().animate({'left': "-"+left+"px"}, 1200, "easeOutBack", function(){
                turning = false;
            });
        } else {
            jQuery.scrollTo.window().queue([]).stop();
            $(window).scrollTo(newPage,1200,{easing:'easeOutBack', onAfter:function(){
                turning = false;
            }});
        }
	}
}
var turning = false;
$(document).ready(function() {

    if($("html").hasClass("touch")) {
        $("#container").swipe( {threshold:100, swipeLeft: function(event) {
            turning = true;
            pageTurn("next");
        }, swipeRight: function(event) {
            turning = true;
            pageTurn("prev");
        }} );
    }

    $('.page .next').click(function(e) {
        turning = true;
		pageTurn('next');
	});

    $('.page .prev').click(function(e) {
        turning = true;
		pageTurn('prev');
	});

    //resize
	$(window).resize(function(e) {
		resizePages();
	});
	resizePages();

    $(window).scroll(function(e) {
		var top = $(document).scrollTop();
		var wHeight = 200;
        
		if (turning === false && top < $('.page.selected').offset().top-wHeight/2) {
			var index = $('.page.selected').index();

			$('.page').removeClass('selected');

            var newPage = $('.page').eq(Math.max(0,index-1));
			newPage.addClass('selected');

            turning = true;
            $(window).scrollTo(newPage,1200,{easing:'easeOutBack', onAfter:function(){
                turning = false;
            }});

		} else if (turning === false && top > $('.page.selected').offset().top + wHeight/2) {
			var index = $('.page.selected').index();

            $('.page').removeClass('selected');

            var newPage = $('.page').eq(Math.min($('.page').length-1,index+1));
			newPage.addClass('selected');

            turning = true;
            $(window).scrollTo(newPage,1200,{easing:'easeOutBack', onAfter:function(){
                turning = false;
            }});
		}
	});
});
