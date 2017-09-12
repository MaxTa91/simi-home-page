function CustomAjax(formInputs, acceptFields, url, method) {
    //Setting AJAX:
    this.inputs = formInputs;
    this.acceptFields = acceptFields;
    this.url = url;
    this.method = method ? method : 'post';
    this.errors = {};
    //Count Errors:
    this.hasNoErrors = function () {
        for (var key in this.errors) {
            if (this.errors.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    //Data to submit:
    this.sendData = {};

    //SET Setting AJAX:
    this.setURL = function (url) {
        this.url = url;
    };
    this.setMethod = function (method) {
        this.method = method;
    };
    this.setAcceptFields = function (fields) {
        this.acceptFields = fields;
    };
    this.setErrors = function(error, mess){
        this.errors[error] = mess;
    };
    this.setSendData = function(key, val){
        this.sendData[key] = val;
    };

    //GET Setting AJAX:
    this.getURL = function(){
      return this.url;
    };
    this.getMethod = function(){
        return this.method;
    };
    this.getAcceptFields = function(){
        return this.acceptFields;
    };
    this.getErrors = function(){
        return this.errors;
    };
    this.getSendData = function(){
        return this.sendData;
    };

    //AJAX handle:
    this.sendAjax = function(){
        var prototypeAjax = new Ajax.Request(this.url, {
            method: this.method,
            parameters: {'testData': this.sendData},
            onSuccess: prototypeAjaxSuccess,
            onFailure: prototypeAjaxFail
        });
        function prototypeAjaxSuccess(responseData) {
            if (responseData.status === 200) {
                console.log(responseData);
                console.log(responseData.responseText.evalJSON());
                return;
            }
            return false;
        }
        function prototypeAjaxFail() {
            alert('Prototype AJAX failed!');
        }
    };

    //Validate Rules:
    this.textReg = /^[A-za-z]+$/;
    this.numberReg = /^[0-9]+$/;
    this.emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.websiteReg = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    //Check value if ok then push to sendData for submit AJAX:
    this.checkAndPushValue = function (value, name, mess, checkType) {
        if (checkType.test(value)) {
            this.sendData[name] = value;
        } else {
            this.errors[name] = mess;
        }
    };

    //Validate handle:
    this.dataValidate = function(){
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            if (this.acceptFields.indexOf(input.name) === -1) {
                this.errors[input.name] = input.name + ' is not valid [Type: Mass Assignment]';
            }
            if (input.value == '') {
                this.errors['notEnoughInput'] = 'Missing input to submit!';
            } else {
                switch (input.type) {
                    case 'text':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be string!', this.textReg);
                        break;
                    case 'email':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be an email!', this.emailReg);
                        break;
                    case 'number':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be number!', this.numberReg);
                        break;
                    case 'url':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be number!', this.websiteReg);
                        break;
                    case 'radio':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be number!', this.numberReg);
                        break;
                    default:
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' not valid!', this.textReg);
                        break;
                }
            }
        }
    };


    this.dataValidate();
    //Check if error.count() === 0 then do AJAX:
    if (this.hasNoErrors()) {
        this.sendAjax();
    } else {
        console.log('Some error:');
        console.log(this.errors);
    }
}

//import { CustomAjax } from 'CustomAjax';

jQuery(document).ready(function ($) {
    //Alert messages Box:
    var customErrors = $('.custom-errors');
    customErrors.hide();
    customErrors.on('click', function (e) {
        $(this).hide();
    });

    //Contact Form:
    var acceptFields = ['firstName', 'website', 'platform', 'email'];
    var ajaxData = $('#contact_form input:not([type = submit])');
    var ajaxUrl = '/test-ajax/submit-success.php';

    $('#contact_form').on('submit', function (e) {
        e.preventDefault();
        var testAjax = new CustomAjax(ajaxData, acceptFields, ajaxUrl, 'post');
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

