/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js


****************************************************/

(function ($) {
  "use strict";

  var windowOn = $(window);
  ////////////////////////////////////////////////////
  // 01. PreLoader Js
  windowOn.on("load", function () {
    $("#loading").fadeOut(500);
  });

  // const colorInput = document.querySelector('input[type=color]');
  // const colorVariable = '--tp-theme-1';

  // colorInput.addEventListener('change', function(e){
  // 	var clr = e.target.value;
  // 	document.documentElement.style.setProperty(colorVariable, clr);
  // })

  // photo gallery popup
  $(".gallery__images").magnificPopup({
    delegate: "a.popup-image", // Target <a> elements with class popup-image
    type: "image",
    gallery: {
      enabled: true, // Enable gallery mode to navigate between images
    },
    image: {
      titleSrc: function (item) {
        return item.el.find("img").attr("alt"); // Use image alt text as caption
      },
    },
  });

  ////////////////////////////////////////////////////
  // 02. Mobile Menu Js
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fal fa-plus"></i>'],
  });

  ////////////////////////////////////////////////////
  // 03. Sidebar Js
  $(".tp-menu-toggle").on("click", function () {
    $(".tp-sidebar-menu").addClass("sidebar-opened");
    $(".body-overlay").addClass("opened");
  });
  $(".sidebar-close").on("click", function () {
    $(".tp-sidebar-menu").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 04. Body overlay Js
  $(".body-overlay").on("click", function () {
    $(".tp-sidebar-menu").removeClass("sidebar-opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 05. Search Js
  $(".search-toggle").on("click", function () {
    $(".search__area").addClass("opened");
  });
  $(".search-close-btn").on("click", function () {
    $(".search__area").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 06. Sticky Header Js
  windowOn.on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $("#header-sticky").removeClass("header-sticky");
    } else {
      $("#header-sticky").addClass("header-sticky");
    }
  });

  ////////////////////////////////////////////////////
  // 07. Nice Select Js
  $("select").niceSelect();

  // mainSlider
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      fade: true,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: false,
            arrows: false,
          },
        },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();

  $(".slider__inner").slick({
    dots: false,
    infinite: false,
    speed: 300,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  });

  ////////////////////////////////////////////////////
  // 08. slider__active Slider Js
  if (jQuery(".slider__active").length > 0) {
    let sliderActive1 = ".slider__active";
    let sliderInit1 = new Swiper(sliderActive1, {
      // Optional parameters
      slidesPerView: 1,
      slidesPerColumn: 1,
      paginationClickable: true,
      loop: true,
      effect: "fade",

      autoplay: {
        delay: 5000,
      },

      // If we need pagination
      pagination: {
        el: ".main-slider-paginations",
        // dynamicBullets: true,
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      a11y: false,
    });

    function animated_swiper(selector, init) {
      let animated = function animated() {
        $(selector + " [data-animation]").each(function () {
          let anim = $(this).data("animation");
          let delay = $(this).data("delay");
          let duration = $(this).data("duration");

          $(this)
            .removeClass("anim" + anim)
            .addClass(anim + " animated")
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration,
            })
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $(this).removeClass(anim + " animated");
              }
            );
        });
      };
      animated();
      // Make animated when slide change
      init.on("slideChange", function () {
        $(sliderActive1 + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
    }

    animated_swiper(sliderActive1, sliderInit1);
  }

  var sliderr = new Swiper(".active-class", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".testimonial-pagination-6",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<span class="' +
          className +
          '">' +
          "<button>" +
          (index + 1) +
          "</button>" +
          "</span>"
        );
      },
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  ////////////////////////////////////////////////////
  // 14. Wow Js
  new WOW().init();

  ////////////////////////////////////////////////////
  // 23. InHover Active Js
  $(".hover__active").on("mouseenter", function () {
    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find(".hover__active")
      .removeClass("active");
  });
})(jQuery);
