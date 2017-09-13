
jQuery(document).ready(function ($) {


    //Alert messages Box:
    var customErrors = $('.custom-errors');
    customErrors.hide();
    customErrors.on('click', function (e) {
        $(this).hide();
    });

    //Radio button:
    $('#contact_form input[type = radio]').on('click', function(){
        $.each($('#contact_form input[type = radio]'), function(){
            $(this).removeAttr('checked');
        });
        $(this).attr('checked', 'checked');
    });

    //Contact Form:
    $('#contact_form').on('submit', function (e) {
        e.preventDefault();

        var acceptFields = ['firstName', 'website', 'platform', 'email'];
        var ajaxData = $('#contact_form input:not([type = submit])');
        var ajaxUrl = '/test-ajax/submit.php';

        var testAjax = new CustomAjax(ajaxData, acceptFields, ajaxUrl);

        //Test:
        var a = testAjax.getSendData();
        console.log(a);


        // $.ajax({
        //     url: "/test-ajax/submit.php",
        //     method: "POST",
        //     data: {testData : data},
        //     dataType: "json"
        // }).done(function (data) {
        //     if (data.success === true) {
        //         console.log(data.message);
        //         console.log(data);
        //     } else {
        //         console.log(data.message);
        //     }
        // }).fail(function () {
        //     alert("AJAX fail!");
        // }).always(function () {
        //     //alert( "complete" );
        // });
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

