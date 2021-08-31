$(document).ready(function () {
  $('#intro-slider').slick( {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    dots: true,
    infinite: true,
    centerPadding: "120px 0px 500px",
    asNavFor: '#nav-for-intro',
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerMode: true,
          centerPadding: "80px 0px 400px",
        }
      },
      {
        breakpoint: 1400,
        settings: {
          centerMode: true,
          centerPadding: "40px 0px 100px",
        }
      },
      {
        breakpoint: 1001,
        settings: {
          centerMode: true,
          centerPadding: "40px 0px 100px",
          arrows: false
        }
      },
      {
        breakpoint: 900,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          dots: false,
          arrows: false
        }
      }
    ]
  });
  $('#nav-for-intro').slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    asNavFor: "#intro-slider",
    dots: false,
  });
  $('#insp-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    centerMode: true,
    centerPadding: "540px 0px 0px",
    infinite: true,
    asNavFor: "#nav-for-insp",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          centerMode: true,
          centerPadding: "400px 0px 0px",
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "100px 0px 0px",
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "80px"
        } 
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px"
        } 
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        } 
      },
    ]
  });
  $('#nav-for-insp').slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    asNavFor: "#insp-slider",
    dots: false,
  });
  $('.tips__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: false
        }
      }
    ]
  })
  $('#menu-toggle').click(function(){
    $(this).toggleClass('burger_open');
    $('.header__block').toggleClass('header__block_visible')
  })
  function windowSize() {
    if($(window).width() < '1001') {
      $('.nav__item').removeClass('nav__item_desktop');
      
    } else {
      $('.nav__item').addClass('nav__item_desktop')
    }
  }
  $(window).on('load resize', windowSize);
  
  $('.nav__item').on('click', function(){
    if(!($(this).hasClass('nav__item_desktop'))) {
      $(this).children('.nav__subnav').slideToggle();
    }
    
  })
});


