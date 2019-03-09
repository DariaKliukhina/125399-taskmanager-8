import makeFilter from './make-filter.js';
import {cards, allFilters} from './data.js';
import Task from './task.js';
import TaskEdit from "./task-edit.js";

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
  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data);
  taskComponent.onEdit = () => {
    editTaskComponent.render();
    parent.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    parent.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

  addTask(parent, taskComponent);
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
