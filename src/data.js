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

const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};

const tagsCountMax = 3;

const task = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
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
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': false,
    'sa': true,
    'su': false,
  },
  color: [`black`, `yellow`, `blue`, `green`, `pink`],
  isFavorite: false,
  isDone: false,
  type: [`repeat`, `deadline`, ``],
  getHashtags() {
    let tags = [];
    const setArrayTags = [...this.tags];
    const tagsCount = getRandomNum(tagsCountMax);
    for (let i = 0; i <= tagsCount; i++) {
      const newTagsElement = setArrayTags[getRandomNum(setArrayTags.length)];
      tags.push(newTagsElement);
    }
    return tags.map((it) => `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${it}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`).join(``);
  }
};


export {task, allFilters};
