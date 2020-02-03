
(function() {

  var container = document.querySelector('.overlay');
  var burgerMenu = document.querySelectorAll('.b-menu');
  var burgerNav = document.querySelector('.overlay nav');
  var opacity = document.querySelector('#opacity');
  var burger = document.querySelector('.burger');
  var shop = document.querySelectorAll('.shop');
  var menuBurger = document.querySelector('#menu-burger');
  var menuShop = document.querySelector('#menu-shop');

  for(var i = 0; i<burgerMenu.length; i++){
    toggleMenu(burgerMenu[i]);
  }

  burger.addEventListener('click', function toggleClasses() {
    opacity.classList.add('opacity');
    menuBurger.classList.remove('hidden');
    menuShop.classList.add('hidden');
  }, false);

  for(var i=0; i<shop.length; i++){
    shop[i].addEventListener('click', function toggleClasses() {
      opacity.classList.remove('opacity');
      menuBurger.classList.add('hidden');
      menuShop.classList.remove('hidden');
    }, false);
  }

/*
  container.addEventListener('click', function toggleClasses() {
    [container, burgerNav].forEach(function (el) {
      el.classList.remove('open');
    });
    opacity.classList.remove('opacity');
  }, false);
*/

  function toggleMenu(click){
    click.addEventListener('click', function toggleClasses() {
      [container, burgerNav].forEach(function (el) {
        el.classList.toggle('open');
      });
    }, false);
  }
})();

