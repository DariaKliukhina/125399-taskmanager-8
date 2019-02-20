'use strict';
const filter = document.querySelector(`.main__filter`);
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

let element;

const filterRender = (id, count, checked = false, disabled = false) =>{
  const input = `<input type="radio" id="filter__${id}" class="filter__input visually-hidden" ${disabled && `disabled`} name="filter" ${checked && `checked`}/>`;
  const label = `<label for="filter__${id}" class="filter__label">${id} <span class="filter__${id}-count">${count}</span></label>`;

  element = `${input} ${label}`;
  return element;
};

const addElement = (parent, currentElement) => {
  parent.insertAdjacentHTML(`beforeEnd`, currentElement);
};

const createFilterElement = (parent, id, count, checked, disabled) => {
  let currentFilter = filterRender(id, count, checked, disabled);
  addElement(parent, currentFilter);
};

const createAllFilters = (array) => {
  array.forEach(function (el) {
    createFilterElement(filter, el.type, el.count, el.checked, el.disabled);
  });
};

createAllFilters(allFilters);

