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





// var form = document.querySelector('.selection-form');
// var name = document.querySelector('.about-cat__data--name');
// var submitBtn = document.querySelector('.submit-form__button');
//
// form.addEventListener('submit', function(evt) {
//   if (name.value =="" || name.value ==" ") {
//     // evt.preventDefault();
//     name.classList.add('error');
//   }
// });




// var form = popup.querySelector(".form-feedback");
//   var name = popup.querySelector(".feed-name");
//   var mail = popup.querySelector(".feed-mail");
  // form.addEventListener("submit", function() {
  //   if (name.value == "") {
  //     // evt.preventDefault();
  //     name.classList.remove("error");
  //     name.offsetWidth = name.offsetWidth;
  //     name.classList.add("error");
  //     console.log("Не заполнены поля");
  //   }
  // });
