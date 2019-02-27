import makeFilter from './make-filter.js';
import makeCard from './make-card.js';

const allFilters = [
  {
    type: `all`,
    count: 3,
    checked: true,
    disabled: false
  },
  {
    type: `overdue`,
    count: 5,
    checked: false,
    disabled: false
  },
  {
    type: `today`,
    count: 3,
    checked: false,
    disabled: false
  },
  {
    type: `favorites`,
    count: 2,
    checked: true,
    disabled: false
  },
  {
    type: `repeating`,
    count: 7,
    checked: false,
    disabled: false
  },
  {
    type: `tags`,
    count: 2,
    checked: false,
    disabled: true
  },
  {
    type: `archive`,
    count: 3,
    checked: false,
    disabled: false
  }
];

const dataStorage = {
  types: [`repeat`, `deadline`, ``],
  colors: [`black`, `pink`, `yellow`, `blue`],
  descriptions: [
    `Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?`,
    `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    `Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
  ],
};

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

const createCardData = (count, currentData) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      type: getRandomElement(currentData.types),
      color: getRandomElement(currentData.colors),
      description: getRandomElement(currentData.descriptions),
    });
  }
  return data;
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
    const currentDataArray = createCardData(count, dataStorage);
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
