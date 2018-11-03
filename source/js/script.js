var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.control-menu__btn');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function() {
      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
      } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }
    });

    navToggle.addEventListener('click', function() {
        if (navMain.classList.contains('main-nav--closed')) {
          navToggle.classList.remove('control-menu__close');
          navToggle.classList.add('control-menu__hamburger');
        } else {
          navToggle.classList.remove('control-menu__hamburger');
          navToggle.classList.add('control-menu__close');
        }
      });
