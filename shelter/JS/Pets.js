function getCardsCount() {
  const width = window.innerWidth;
  if (width >= 1280) return 8;
  if (width >= 768) return 6;
  return 3;
}

function shuffleSetCards(setCards) {
  const result = [...setCards];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getAllSlide(arrCopiesCount, arr) {
  const allCardsInSlider = [];

  const shuffleArr = shuffleSetCards(arr);
  const arrA = shuffleArr.slice(0, 6);
  const arrB = shuffleArr.slice(6);

  for (let i = 0; i < arrCopiesCount; i++) {
    allCardsInSlider.push(...shuffleSetCards(arrA));
    allCardsInSlider.push(...shuffleSetCards(arrB));
  }

  const cardsCount = getCardsCount();
  const allSlide = [];

  for (let i = 0; i < allCardsInSlider.length; i += cardsCount) {
    allSlide.push(allCardsInSlider.slice(i, i + cardsCount));
  }

  return allSlide;
}

function createCardHTML(card) {
  return `
    <article class="our-friend-slider-card" data-name="${card.name}">
      <img class="our-friend-slider-card-img" src="${card.img}" alt="${card.name}">
      <h3 class="our-friend-slider-card-title">${card.name}</h3>
      <button class="button-secondary" tabindex="1">Learn more</button>
    </article>
  `;
}

function createBlockCardsHTML(setCards) {
  return `
    <div class="our-friend-slider-track-block">
      ${setCards.map(createCardHTML).join('')}
    </div>
  `;
}

function slideRight(allSlide, targetIndex) {
  sliderTrack.insertAdjacentHTML(
    'beforeend',
    createBlockCardsHTML(allSlide[targetIndex]),
  );

  requestAnimationFrame(() => {
    sliderTrack.style.transition = 'transform 0.5s';
    sliderTrack.style.transform = `translateX(-100%)`;
  });
}

function slideLeft(allSlide, targetIndex) {
  sliderTrack.insertAdjacentHTML(
    'afterbegin',
    createBlockCardsHTML(allSlide[targetIndex]),
  );

  sliderTrack.style.transition = 'none';
  sliderTrack.style.transform = `translateX(-100%)`;

  void sliderTrack.offsetWidth;

  requestAnimationFrame(() => {
    sliderTrack.style.transition = 'transform 0.5s';
    sliderTrack.style.transform = 'translateX(0)';
  });
}

function finishSlide(targetIndex) {
  sliderTrack.addEventListener(
    'transitionend',
    () => {
      if (targetIndex > sliderState.currSlideNumber) {
        sliderTrack.firstElementChild.remove();
      } else {
        sliderTrack.lastElementChild.remove();
      }

      sliderTrack.style.transition = 'none';
      sliderTrack.style.transform = 'translateX(0)';

      sliderState.currSlideNumber = targetIndex;

      updateButtons();
      sliderState.isAnimating = false;

      const buttons = sliderNav.querySelectorAll('[data-action]');

      buttons.forEach((button) => {
        button.disabled = false;
      });
    },
    { once: true },
  );
}

function updateButtons() {
  const isFirst = sliderState.currSlideNumber === 0;
  const isLast = sliderState.currSlideNumber === allSlide.length - 1;

  sliderNav
    .querySelector('[data-action="first-slide"]')
    .classList.toggle('inactive', isFirst);

  sliderNav
    .querySelector('[data-action="prev-slide"]')
    .classList.toggle('inactive', isFirst);

  sliderNav
    .querySelector('[data-action="next-slide"]')
    .classList.toggle('inactive', isLast);

  sliderNav
    .querySelector('[data-action="last-slide"]')
    .classList.toggle('inactive', isLast);
}

function getTargetSlide(action) {
  switch (action) {
    case 'first-slide':
      return 0;
    case 'prev-slide':
      return sliderState.currSlideNumber - 1;
    case 'next-slide':
      return sliderState.currSlideNumber + 1;
    case 'last-slide':
      return allSlide.length - 1;
  }
}

function slide(allSlide, action) {
  if (sliderState.isAnimating) return;

  sliderState.isAnimating = true;
  const buttons = sliderNav.querySelectorAll('[data-action]');

  buttons.forEach((button) => {
    button.disabled = true;
  });

  const targetIndex = getTargetSlide(action);

  if (targetIndex > sliderState.currSlideNumber) {
    slideRight(allSlide, targetIndex);
  } else {
    slideLeft(allSlide, targetIndex);
  }

  pageNumber.textContent = targetIndex + 1;

  finishSlide(targetIndex);
}

const sliderTrack = document.querySelector('.our-friend-slider-track');
const sliderNav = document.querySelector('.our-friend-slider-nav');
const pageNumber = document.querySelector('.our-friend-slider-nav-page');

let pets = [];
const petsCopiesCount = 6;
let sliderState = {
  currSlideNumber: 0,
  isAnimating: false,
};

let allSlide = [];

async function init() {
  const res = await fetch('../JS/pets.json');
  pets = await res.json();

  allSlide = getAllSlide(petsCopiesCount, pets);

  sliderTrack.insertAdjacentHTML(
    'afterbegin',
    createBlockCardsHTML(allSlide[sliderState.currSlideNumber]),
  );

  updateButtons();
}

init();

sliderNav.addEventListener('click', (e) => {
  const button = e.target.closest('[data-action]');

  if (!button) return;
  if (button.classList.contains('inactive')) return;

  slide(allSlide, button.dataset.action);
});
