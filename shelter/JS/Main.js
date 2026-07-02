function getCardsCount() {
  const width = window.innerWidth;
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
}

function shuffleSetCards(setCards) {
  const result = [...setCards];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function excludeCurrentCards(currSetCards, setCards) {
  return setCards.filter(
    (card) => !currSetCards.some((curr) => curr.name === card.name),
  );
}

function getNextSetCards(currSetCards, setCards, count) {
  const available = excludeCurrentCards(currSetCards, setCards);
  const shuffled = shuffleSetCards(available);
  return shuffled.slice(0, count);
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

function createSetCardsHTML(setCards) {
  return setCards.map(createCardHTML).join('');
}

function slideRight(nextSetCards, shift) {
  sliderTrack.insertAdjacentHTML('beforeend', createSetCardsHTML(nextSetCards));

  requestAnimationFrame(() => {
    sliderTrack.style.transition = 'transform 0.5s';
    sliderTrack.style.transform = `translateX(-${shift}px)`;
  });
}

function slideLeft(nextSetCards, shift) {
  sliderTrack.insertAdjacentHTML(
    'afterbegin',
    createSetCardsHTML(nextSetCards),
  );

  sliderTrack.style.transition = 'none';
  sliderTrack.style.transform = `translateX(-${shift}px)`;

  sliderTrack.offsetWidth;

  requestAnimationFrame(() => {
    sliderTrack.style.transition = 'transform 0.5s';
    sliderTrack.style.transform = 'translateX(0)';
  });
}

function finishSlide(direction, cardsCount, nextSetCards) {
  sliderTrack.addEventListener(
    'transitionend',
    () => {
      if (direction === 'right') {
        for (let i = 0; i < cardsCount; i++) {
          sliderTrack.firstElementChild.remove();
        }
      } else {
        for (let i = 0; i < cardsCount; i++) {
          sliderTrack.lastElementChild.remove();
        }
      }

      sliderTrack.style.transition = 'none';
      sliderTrack.style.transform = 'translateX(0)';

      sliderState.currentSetCards = nextSetCards;
      sliderState.isAnimating = false;

      prevBtn.disabled = false;
      nextBtn.disabled = false;
    },
    { once: true },
  );
}

function slide(direction) {
  if (sliderState.isAnimating) return;

  sliderState.isAnimating = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  const cardsCount = getCardsCount();

  const nextSetCards = getNextSetCards(
    sliderState.currentSetCards, pets, cardsCount,
  );

  const cardWidth = sliderTrack.firstElementChild.offsetWidth;
  const gap = parseFloat(getComputedStyle(sliderTrack).gap);
  const shift = (cardWidth + gap) * cardsCount;

  if (direction === 'right') {
    slideRight(nextSetCards, shift);
  } else {
    slideLeft(nextSetCards, shift);
  }

  finishSlide(direction, cardsCount, nextSetCards);
}

const sliderTrack = document.querySelector('.our-friend-slider-track');
const prevBtn = document.querySelector('.our-friend-slider-button.prev-btn');
const nextBtn = document.querySelector('.our-friend-slider-button.next-btn');

let pets = [];

let sliderState = {
  currentSetCards: [],
  isAnimating: false,
};

async function init() {
  const res = await fetch('../JS/pets.json');
  pets = await res.json();

  const initialCards = getNextSetCards([], pets, getCardsCount());

  sliderState.currentSetCards = initialCards;

  sliderTrack.insertAdjacentHTML(
    'afterbegin',
    createSetCardsHTML(initialCards),
  );
}

init();

prevBtn.addEventListener('click', () => slide('left'));
nextBtn.addEventListener('click', () => slide('right'));
