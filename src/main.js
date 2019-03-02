import makeFilter from './make-filter.js';
import makeCard from './make-card.js';
import {task, allFilters} from './data.js';

const startCardsCount = 7;

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};


const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

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

const createCardData = (count, data) => {
  const newTasks = [];

  for (let i = 0; i < count; i++) {
    newTasks.push({
      title: getRandomElement(data.title),
      tags: data.getHashtags(),
      picture: data.getPicture(),
      repeatingDays: data.repeatingDays,
      type: getRandomElement(data.type),
      color: getRandomElement(data.color),
      isFavorite: data.isFavorite,
      isDone: data.isDone,
    });
  }
  return newTasks;
};


const createCardElement = (parent, data) => {
  const currentCard = makeCard(data);
  addElement(parent, currentCard);
};

const createAllCards = (array) => {
  for (const el of array) {
    createCardElement(boardTasks, el);
  }
};

const filterInput = document.querySelectorAll(`.filter__input`);

const clearBlock = (block) => {
  block.innerHTML = ``;
};


const createNewCards = (count) => {
  if (typeof (count) === `number`) {
    const currentDataArray = createCardData(count, task);
    createAllCards(currentDataArray);
  }
};

for (const element of filterInput) {
  element.addEventListener(`change`, function (e) {
    const currentLabel = e.target.nextElementSibling;
    const currentCount = Number(currentLabel.querySelector(`span`).textContent);
    clearBlock(boardTasks);
    createNewCards(currentCount);
  });
}

createNewCards(startCardsCount);
