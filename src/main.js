import makeFilter from './templates/make-filter.js';
import {cards, allFilters} from './data/data.js';
import Task from './components/task/task.js';
import TaskEdit from './components/task/task-edit.js';

const filter = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

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

const addTask = (parent, currentElement) => {
  parent.appendChild(currentElement.render());
};

const createCardElement = (parent, data) => {
  const task = new Task(data);
  const editTask = new TaskEdit(data);
  task.onEdit = () => {
    editTask.render();
    parent.replaceChild(editTask.element, task.element);
    task.unrender();
  };
  //
  // editTask.onSubmit = () => {
  //   task.render();
  //   parent.replaceChild(task.element, editTask.element);
  //   editTask.unrender();
  // };

  editTask.onSubmit = (newObject) => {
    task.title = newObject.title;
    task.tags = newObject.tags;
    task.color = newObject.color;
    task.repeatingDays = newObject.repeatingDays;
    task.dueDate = newObject.dueDate;

    task.update(task);
    task.render();
    tasksContainer.replaceChild(task.element, editTask.element);
    editTask.unrender();
  };

  addTask(parent, task);
};

const createAllCards = (array) => {
  for (const el of array) {
    createCardElement(tasksContainer, el);
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
    clearBlock(tasksContainer);
    renderCards(target, cards);
  });
}

createAllCards(startFilter);
