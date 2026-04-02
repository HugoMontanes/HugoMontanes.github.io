/*-----------------------------------------------------------------------------------

    Theme Name: Zain
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function() {

    "use strict";

    var wind = $(window);



    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -80            // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar");

        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
        } else {
            navbar.removeClass("nav-scroll");
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });


    // progress bar
    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object =
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });


    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){

        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });


});


// === window When Loading === //

$(window).on("load", function (){

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    if ($.fn.stellar) {
        wind.stellar();
    }


    // isotope
    var $gallery = $('.gallery');
    if ($gallery.length && $.fn.isotope) {
        $gallery = $gallery.isotope({
            itemSelector: '.items',
            layoutMode: 'masonry',
            percentPosition: true,
            masonry: {
                columnWidth: '.width2',
                gutter: 0
            },
            transitionDuration: '0.5s'
        });

        // filter items on button click
        $('.filtering').on('click', 'span', function () {

            var filterValue = $(this).attr('data-filter');
            $gallery.isotope({ filter: filterValue });
            $(this).addClass('active').siblings().removeClass('active');

        });
    }


    // contact form validator
    var $contactForm = $('#contact-form');
    $contactForm.on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $contactForm.find('.messages').html(alertBox);
                        $contactForm[0].reset();
                    }
                }
            });
            return false;
        }
    });
    if ($contactForm.length && $.fn.validator) {
        $contactForm.validator();
    }

});
