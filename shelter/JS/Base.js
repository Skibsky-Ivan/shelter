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
const sliderCards = document.querySelector('.slider-cards');
const popupOverlay = document.querySelector('.popup-overfloy');
const popupContent = document.querySelector('.popup-content');

let pets = [];

async function init() {
  const res = await fetch('../JS/pets.json');
  pets = await res.json();
}

init();

sliderCards.addEventListener('click', (e) => {
  const card = e.target.closest('.our-friend-slider-card');
  if (!card) return;

  const petName = card.dataset.name;
  const pet = pets.find(p => p.name === petName);

  if (!pet) return;

  openPopup(pet);
});

function openPopup(pet) {
  popupContent.innerHTML = createPopup(pet);

  popupOverlay.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closePopup() {
  popupOverlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.popup-close')) {
    closePopup();
  }

  if (e.target === popupOverlay) {
    closePopup();
  }
});

function createPopup(card) {
  return `
    <img
      class="popup-img"
      src="${card.img}"
      alt="${card.type} ${card.name}" />
    <div class="popup-info">
      <h2 class="popup-info-title header-3">${card.name}</h2>
      <span class="popup-info-subtitle header-4">
        ${card.type}-${card.breed}
      </span>
      <p class="popup-info-text  header-5">${card.description}</p>
      <ul class="popup-parameters header-5">
        <li class="popup-parameters-item">
          <strong>Age:</strong> ${card.age}
        </li>
        <li class="popup-parameters-item">
          <strong>Inoculations:</strong> ${card.inoculations.join(', ')}
        </li>
        <li class="popup-parameters-item">
          <strong>Diseases:</strong> ${card.diseases.join(', ')}
        </li>
        <li class="popup-parameters-item">
          <strong>Parasites:</strong> ${card.parasites.join(', ')}
        </li>
      </ul>
    </div>
  `;
}
