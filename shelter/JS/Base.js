//============== BURGER MENU SCRIPT ===================
const burgerMenu = document.querySelector('.header-burger-menu');
const burgerNav = document.querySelector('.header-burger-nav');

function closeOrOpenMenu() {
  burgerMenu.classList.toggle('active');
  burgerNav.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
}

burgerMenu.addEventListener('click', closeOrOpenMenu);
burgerNav.addEventListener('click', closeOrOpenMenu);

//================= POPUP SCRIPT ======================

