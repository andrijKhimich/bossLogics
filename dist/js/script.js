const humburger = $('.js-humburger');
const headerMenu = $('.header-content');
const nav = $('.nav');
const logoImg = $('.logo img');
const header = $('.header');
const scrollBtn = $('.scroll-btn');
const socialList = $('.js-social');
const modal = $('.modal');
const overlay = $('.modal-overlay');

function openModal() {
  modal.fadeIn();
  overlay.fadeIn();
}

function closeModal() {
  modal.fadeOut();
  overlay.fadeOut();
}

function openMenu() {
  humburger.addClass('open');
  headerMenu.addClass('open');
  setTimeout(function () {
    socialList.addClass('open');
  }, 600);
  setTimeout(function () {
    nav.addClass('open');
  }, 600);
}

function closeMenu() {
  humburger.removeClass('open');
  headerMenu.removeClass('open');
  setTimeout(function () {
    socialList.removeClass('open');
  }, 400);
  setTimeout(function () {
    nav.removeClass('open');
  }, 400);
}

function showContent() {
  $('.main-wrapper').removeClass('js-fadeIn');
}

function showBanner() {
  $('.js-show-on-load').removeClass('js-slideRight');
  $('.js-show-on-load').removeClass('js-slideLeft');
}

function showOnLoad() {
  showContent();
  setTimeout(function () {
    showBanner();
  }, 400);
}

function setInnerHeader() {
  logoImg.attr("src", logoWhiteUrl);
  header.addClass('header_inner');
}


function setHomeHeader() {
  logoImg.attr("src", logoMainUrl);
  header.removeClass('header_inner');
}

function setBlueLogo() {
  logoImg.attr("src", logoMainUrl);
}


if ($('.mix').length > 0) {
  var containerEl = document.querySelector('.blog__content');
  var mixer = mixitup(containerEl, {
    animation: {
      effects: 'fade translateZ(-100px)'
    }
  });
}

function slideOrder() {
  $('.order-cart__item-wrapper').slideToggle();
}

function shareListToggle() {
  $('.share-list').slideToggle();
}

$(document).ready(function () {
  $('.together-tab__list li').on('click', function (evt) {
    $('.together-tab__list li').removeClass('active');
    $(this).addClass('active');
    var tabs = this.getAttribute('data-target');
    $('.together-tab__item').removeClass('active').filter(tabs).addClass('active');
  });
  $('.js-modal').click(function () {
    openModal();
  });

  overlay.click(function () {
    closeModal();
  });

  $('.modal-close').click(function () {
    closeModal();
  });

  showOnLoad();


  $(document).mousemove(function (e) {
    if ($(window).width() > 991) {
      $('.move.move-speed-4').parallax(-200, e);
      $('.move.move-speed-3').parallax(-100, e);
      $('.move.move-speed-2').parallax(-50, e);
      $('.move.move-speed-1').parallax(-20, e);
      $('.move.move-speed-5').parallax(200, e);
    }
  });

  showOnScroll($(window).scrollTop());

  // TOGGLE MAIN MENU ON MOBILE DEVICES //
  humburger.click(function () {
    if ($(this).hasClass('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  scrollBtn.click(function (id) {
    let link = $($(this).attr('href'))
    $('html, body').animate({
      scrollTop: link.offset().top + 100
    }, 1000);
  });

  $(window).scroll(function () {
    const scrollValue = $(this).scrollTop();
    showOnScroll(scrollValue);
    scrollValue >= 1 ? closeMenu() : null;

    $('.odometer').each(function () {
      let counter = $(this),
        num = counter.attr('data-num');
      if (counter.offset().top - scrollValue < $(window).height() / 1.2) {
        counter.html(num);
      } else {
        return false
      }
    });
  });

  if ($('.js-inner-header').length > 0) {
    setInnerHeader();
  } else {
    setHomeHeader();
  }

  if ($('.article-section, .page-article').length > 0) {
    setInnerHeader();
    setBlueLogo();
  }


  if ($('.office-gallery-section').length > 0) {
    $('.office-gallery__link').magnificPopup({
      callbacks: {
        open: function () {
          $('.mfp-bottom-bar').hide();
        }

      },
      type: 'image',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'cubic-bezier(.7, 0, .3, 1)',
        opener: function (openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  }

  if ($('.video-section').length > 0) {
    $('.video-wrapper').magnificPopup({
      callbacks: {
        open: function () {
          $('.mfp-bottom-bar').hide();
        }
      },
      type: 'iframe',
      iframe: {
        patterns: {
          vimeo: {
            index: 'https://vimeo.com/422835734',
            id: '/',
            src: '//player.vimeo.com/video/%id%?autoplay=1'
          },
        },
        srcAction: 'iframe_src',
      },

      zoom: {
        enabled: true,
        duration: 300,
        easing: 'cubic-bezier(.7, 0, .3, 1)',
        opener: function (openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  }

  $('.order-cart__header').click(function () {
    slideOrder();
  });
  $('.share-link').click(function () {
    shareListToggle();
  });
});

function showOnScroll(scrollValue) {
  $('.js-scroll').each(function () {
    let elem = $(this);
    let sectionPos = elem.offset().top;
    let windowPos = $(window).scrollTop() + $(window).height() / 1.2;
    if (sectionPos < windowPos) {
      elem.removeClass('js-fadeIn js-slideLeft js-slideRight js-slideTop');
    }
  });
}