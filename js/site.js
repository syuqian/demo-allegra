const preloadingTime = 3000;

//loader
function loader() {
    var pathEls = document.querySelectorAll('#main-bottle path');
      for (var i = 0; i < pathEls.length; i++) {
        var pathEl = pathEls[i];
        var offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute('stroke-dashoffset', offset);
        anime({
          targets: pathEl,
          strokeDashoffset: [offset, 0],
        //   duration: anime.random(5000, 7000),
            duration: preloadingTime,
        //   delay: anime.random(0, 1000),
          loop: false,
          direction: 'normal',
          easing: 'easeInOutQuart',
          autoplay: true
        });
    }

    $('#count span').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            // duration: anime.random(5000, 7000),
            duration: preloadingTime,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

function sliderClick() {
    $('.rotating-slider .slides li.edp-slider-0:not(.active)').unbind().on('click', function(){
        rotateEDP(0);
        selectEDP(0);
      });
      $('.rotating-slider .slides li.edp-slider-1:not(.active)').unbind().on('click', function(){
        rotateEDP(-26);
        selectEDP(1);
      });
      $('.rotating-slider .slides li.edp-slider-2:not(.active)').unbind().on('click', function(){
        rotateEDP(-51);
        selectEDP(2);
      });
      $('.rotating-slider .slides li.edp-slider-3:not(.active)').unbind().on('click', function(){
        rotateEDP(-77);
        selectEDP(3);
      });
      $('.rotating-slider .slides li.edp-slider-4:not(.active)').unbind().on('click', function(){
        rotateEDP(-103);
        selectEDP(4);
      });
      $('.rotating-slider .slides li.edp-slider-5:not(.active)').unbind().on('click', function(){
        rotateEDP(-129);
        selectEDP(5);
      });
      $('.rotating-slider .slides li.edp-slider-6:not(.active)').unbind().on('click', function(){
        rotateEDP(-154);
        selectEDP(6);
      });
    
      
      setTimeout(function () {
        $('.rotating-slider .slides li.active').on('click', function(){
            fullpage_api.moveTo(3);
          });
        }, 1000);
}

function selectEDP(edp){
    var name = "selection-"+edp;
    var currentEDP = $('.rotating-slider .active .active-bottle').attr('src');
    
    $('.edp-slider-'+edp).addClass('active').siblings().removeClass('active').siblings().addClass('outro');
    setTimeout(function () {
        $('.edp-slider-'+edp).addClass('hoverable').siblings().removeClass('hoverable').siblings().removeClass('outro');
    }, 1000);
    $('body').attr('id', name);
    $('.edp-info').slick('slickGoTo',edp);
    $('.passenger img').attr('src',currentEDP);
    $('.edp-label.label-'+edp).show().siblings().hide();

    sliderClick();
};

function rotateEDP(edp){
    $('ul.slides').css('transform', 'translateX(-50%) rotate('+edp+'deg)');
    sliderClick();
    
}

$(document).ready( function() {
    loader();
    $(".anim").css("opacity",'1');

    $('#fullpage').fullpage({
        scrollOverflow: true,
        normalScrollElements: '.rotating-slider .slides li',
        fixedElements: '.lift',
        
        onLeave: function(origin, destination, direction){
            //after leaving section 0
            if(origin.index == 0 && direction =='down'){
                $('#loading').addClass('outro');
                $('.edp-section').addClass('intro');
                setTimeout(function() { 
                    $('.edp-section').addClass('done');
                }, 4000);

                fullpage_api.setAllowScrolling(false);

                setTimeout(function() { 
                    fullpage_api.setAllowScrolling(true);
                }, 2000); 
            }
            else if(origin.index == 1 && direction == 'up'){
                $('#loading').removeClass('outro');

                fullpage_api.setAllowScrolling(false);

                setTimeout(function() { 
                    fullpage_api.setAllowScrolling(true);
                }, 2000); 
            }

            // entering magnifying
            if(origin.index == 1 && direction =='down'){
                $('.lift').addClass('featured').css('opacity','1');
                $('.stage-vignette').addClass('show');
                $('.magnifying').addClass('intro').addClass('lights-on');
                setTimeout(function() { 
                    $('.magnifying').addClass('done');
                }, 5000);
                
                fullpage_api.setAllowScrolling(false);
                    setTimeout(function() { 
                        fullpage_api.setAllowScrolling(true);
                    }, 2000); 
            } else if(origin.index == 2 && direction =='up'){
                $('.lift').css('opacity','0');
                $('.stage-vignette').removeClass('show');
                $('.magnifying').removeClass('intro').removeClass('lights-on');
                $('.magnifying').removeClass('done');

                fullpage_api.setAllowScrolling(false);

                setTimeout(function() { 
                    $('.lift').removeClass('featured')
                    fullpage_api.setAllowScrolling(true);
                }, 2000); 
            }   

            // entering form
            if(origin.index == 2 && direction =='down'){
                $('.lift').css('opacity','0');
                $('header .logo img').hide();

                fullpage_api.setAllowScrolling(false);

                setTimeout(function() { 
                    fullpage_api.setAllowScrolling(true);
                }, 2000); 

            } else if(origin.index == 3 && direction =='up') {
                $('.lift').css('opacity','1');
                $('header .logo img').show();

                fullpage_api.setAllowScrolling(false);
                setTimeout(function() { 
                    fullpage_api.setAllowScrolling(true);
                }, 2000); 
            }

        },
        afterLoad: function(origin, destination, direction){
            if (origin.index == 2 && direction =='up') {
                $('.lift').removeClass('featured').css('opacity','0');
            }
        }
        
	});

    fullpage_api.setAllowScrolling(false);

    if($(window).height() < 700){
        // $.fn.fullpage.setAutoScrolling(false);
    }
});



$(window).on('load', function() {
    $("body").removeClass("preload").addClass('bg');

    Promise.all(Array.from(document.images).map(img => {
        if (img.complete)
            return Promise.resolve(img.naturalHeight !== 0);
        return new Promise(resolve => {
            img.addEventListener('load', () => resolve(true));
            img.addEventListener('error', () => resolve(false));
        });
    })).then(results => {
        // if (results.every(res => res)){
            setTimeout(function() { 
                $('body').addClass('loaded').removeClass('loading');
            }, preloadingTime);
            setTimeout(function() { 
                $('body').addClass('loaded2')
            }, preloadingTime + 200);
            setTimeout(function() { 
                $('body').addClass('zoom');
            }, preloadingTime + 3000);
            setTimeout(function() { 
                $('body').addClass('on');
                fullpage_api.setAllowScrolling(true);
            }, preloadingTime + 5000);
        // }
    });

    $('.rotating-slider').rotatingSlider({
        slideHeight : 200,
        slideWidth : 100,
        autoRotate : false,
    });

    $('.edp-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        initialSlide: 3,
        arrows: false,
        fade: true,
    });

    $('.edp-info').on('setPosition', function(slick){
        var currentSlide = $('.edp-info').slick('slickCurrentSlide');
        if (currentSlide == 0) {
            rotateEDP(0);
            selectEDP(0);
        } else if (currentSlide == 1) {
            rotateEDP(-26);
            selectEDP(1);
        } else if (currentSlide == 2) {
            rotateEDP(-51);
            selectEDP(2);
        } else if (currentSlide == 3) {
            rotateEDP(-77);
            selectEDP(3);
        } else if (currentSlide == 4) {
            rotateEDP(-103);
            selectEDP(4);
        } else if (currentSlide == 5) {
            rotateEDP(-129);
            selectEDP(5);
        } else if (currentSlide == 6) {
            rotateEDP(-154);
            selectEDP(6);
        }
    });

    $('.magnifying-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.magnifying-slider',
        speed: 700,
    });
    $('.magnifying-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.magnifying-info',
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: '26%',
        speed: 700,
        arrows: true,
    });   

    sliderClick();
    
});

$( window ).on( "orientationchange", function( event ) {
    location.reload();
});

// We can't do this because when keyboard in mobile appear, it will also reload the page.
// $(window).on('resize', function () {
//     location.reload();
// });