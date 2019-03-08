const allFilters = [
  {
    type: `all`,
    count: 3,
    checked: false,
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
    checked: false,
    disabled: false
  },
  {
    type: `repeating`,
    count: 7,
    checked: true,
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

const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getBoolean = () => {
  const boolean = [true, false];
  return boolean[getRandomNum(2)];
};


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const tagsCountMax = 3;

const task = {
  titles: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ],
  get title() {
    return getRandomElement(this.titles);
  },
  dueDate: Date.now() + 1 + Math.random() * 7 * 24 * 60 * 60 * 1000,
  tagsSet: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `sleep`,
  ]),
  getPicture() {
    const basePictureName = `//picsum.photos/100/100?r=`;
    const currentPictureName = basePictureName + Math.random();
    return currentPictureName;
  },
  repeatingDays: {
    'mo': getBoolean(),
    'tu': getBoolean(),
    'we': getBoolean(),
    'th': getBoolean(),
    'fr': getBoolean(),
    'sa': getBoolean(),
    'su': getBoolean(),
  },
  colors: [`black`, `yellow`, `blue`, `green`, `pink`],
  get color() {
    return getRandomElement(this.colors);
  },
  isFavorite: getBoolean(),
  isDeadline: getBoolean(),
  isDone: getBoolean(),
  get tags() {
    const tags = [...this.tagsSet];
    const tagsCount = getRandomNum(tagsCountMax);
    shuffleArray(tags);
    return tags.slice(0, tagsCount);
  }
};

const createCardData = (count, data) => {
  const newTasks = [];

  for (let i = 0; i < count; i++) {
    newTasks.push({
      title: data.title,
      tags: data.tags,
      picture: data.getPicture(),
      repeatingDays: data.repeatingDays,
      color: data.color,
      isFavorite: data.isFavorite,
      isDone: data.isDone,
    });
  }
  return newTasks;
};

const generateData = () => {
  const cardData = {};
  for (const el of allFilters) {
    const currentType = el.type;
    const currentData = createCardData(el.count, task);
    cardData[`${currentType}`] = currentData;
  }
  return cardData;
};

const cards = generateData();
export {cards, allFilters};
