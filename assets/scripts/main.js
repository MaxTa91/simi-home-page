jQuery(document).ready(function ($) {


    $('#contact_form').on('submit', function () {
        var data = $(this).serialize();
        console.log(data);

        $.ajax({
            url: "/test-ajax/submit-success.php",
            method: "POST",
            data: data,
            dataType: "json"
        }).done(function(data) {
            if(data.success == true) {

            }else{

            }
        }).fail(function() {
            alert( "error" );
        }).always(function() {
            //alert( "complete" );
        });

        return false;
    });

    //SLIDER

    var swiper = new Swiper('#news-slider', {
       slidesPerView: 3,
       autoplay: 3500,
       speed: 1000,
        nextButton: '#news-next-btn',
        prevButton: '#news-prev-btn',
        spaceBetween: 50,
        grabCursor: true
    });

    //MOBILE MENU
   /* $('#btn-mobile').on("click", function () {
        var submenu = $('#mobile-nav');
        if (submenu.is(":visible")) {
            submenu.slideUp();
        }
        else {
            submenu.slideDown();
        }
        // return false;
    });*/

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 1200) {
            $('#btn-scroll-top').removeClass('hidden');
            $('#btn-scroll-top').fadeIn();
        }
        if ($(window).scrollTop() < 1200) {
            $('#btn-scroll-top').fadeOut();
        }
    });

    $("#btn-scroll-top").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    });


    /* SMOOTH SCROLL */
    /*$('.smooth-dir').on('click', function (e) {
     e.preventDefault();

     // add remove class active header-nav
     $('.smooth-dir').each(function () {
     $(this).parent().removeClass('current-menu-item');
     });
     $(this).parent().addClass('current-menu-item');

     var target = this.hash,
     menu = target;
     $target = $(target);
     $('html, body').stop().animate({
     'scrollTop': $target.offset().top - 80
     }, 800, 'swing', function () {
     window.location.hash = target;
     });
     });*/
    /* END SMOOTH SCROLL */

    $('#preloader').remove();
});
