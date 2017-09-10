jQuery(document).ready(function ($) {

    //Alert messages Box:
    var customErrors = $('.custom-errors');
    customErrors.hide();

    customErrors.on('click', function (e) {
        $(this).hide();
    });

    //Contact Form:
    $('#contact_form').on('submit', function (e) {
        e.preventDefault();

        var validateResult = validateContactForm();

        if(validateResult === true){
            var data = $('#contact_form').serialize();
            // console.log(data);


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

            /////////////////////////////////////////// PROTOTYPE AJAX

            var prototypeAjax = new Ajax.Request ('test-ajax/submit.php', {
                method: 'post',
                parameters: {'testData' : data},
                onSuccess: prototypeAjaxSuccess,
                onFailure: prototypeAjaxFail
            });


            function prototypeAjaxSuccess(responseData){
                if(responseData.status === 200){
                    console.log(responseData);
                    console.log(responseData.responseText.evalJSON());
                }
                return false;
            }

            function prototypeAjaxFail(){
                alert('Prototype AJAX failed!');
            }
        }
    });

    function validateContactForm(data) {
        // Select form inputs by name attr:
        var firstName = $("#contact_form input[name=firstName]");
        var email = $("#contact_form input[name=email]");
        var platform = $("#contact_form input[name=platform]");
        var website = $("#contact_form input[name=website]");

        //Take value inputs:
        var firstNameVal = firstName.val();
        var emailVal = email.val();
        var platformVal = platform.val();
        var websiteVal = website.val();

        // console.log(firstNameVal);
        // console.log(emailVal);
        // console.log(platformVal);
        // console.log(websiteVal);

        //REG:
        var nameReg = /^[A-za-z]+$/;
        var numberReg =  /^[0-9]+$/;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        //Validate:
        if(firstNameVal == ""){
            showErrors('Please enter your name!');
            return false;
        }
        else if(!nameReg.test(firstNameVal)){
            showErrors('Letters only');
            return false;
        }

        if(emailVal == ""){
            showErrors('Please enter your email!');
            return false;
        }
        else if(!emailReg.test(emailVal)){
            showErrors('Please enter a valid email address!');
            return false;
        }

        if(platformVal == ""){
            showErrors('Please choose an option!')
            return false;
        }
        else if(!numberReg.test(platformVal)){
            showErrors('Some errors with option, please try again later!');
            return false;
        }

        if(websiteVal == ""){
            showErrors('Please give us an example of your own domain name.');
            return false;
        }

        return true;
    }

    function showErrors(messages) {
        customErrors.text(messages);
        customErrors.show();
    }


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

