import makeFilter from './make-filter.js';
import makeCard from './make-card.js';
import {cards, allFilters} from './data.js';

const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const startFilter = cards.repeating;

const addElement = (parent, currentElement) => {
  parent.insertAdjacentHTML(`beforeEnd`, currentElement);
};

const createFilterElement = (parent, id, count, checked, disabled) => {
  const currentFilter = makeFilter(id, count, checked, disabled);
  addElement(parent, currentFilter);
};

const createAllFilters = (array) => {
  for (const el of array) {
    createFilterElement(filter, el.type, el.count, el.checked, el.disabled);
  }
};

createAllFilters(allFilters);

const createCardElement = (parent, data) => {
  const currentCard = makeCard(data);
  addElement(parent, currentCard);
};

const createAllCards = (array) => {
  for (const el of array) {
    createCardElement(boardTasks, el);
  }
};

const clearBlock = (block) => {
  block.innerHTML = ``;
};

const filterInput = document.querySelectorAll(`.filter__input`);


const getCurrentFilter = (target) => {
  const currentId = target.getAttribute(`id`);
  return currentId.split(`__`)[1];
};

const renderCards = (target, data) => {
  const filterTarget = getCurrentFilter(target);
  createAllCards(data[`${filterTarget}`]);
};

for (const el of filterInput) {
  el.addEventListener(`change`, function (e) {
    const target = e.target;
    clearBlock(boardTasks);
    renderCards(target, cards);
  });
}

createAllCards(startFilter);
