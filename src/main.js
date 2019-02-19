'use strict';
const filter = document.querySelector(`.main__filter`);
const arr = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const randomNum = () => {
  return Math.floor(Math.random() * arr.length);
};

// Вариант 1
const filterRender = (id, count, checked = false, disabled = false) =>{
  const input = `<input type="radio" id="filter__${id}" class="filter__input visually-hidden" ${disabled && `disabled`} name="filter" ${checked && `checked`}/>`;
  const label = `<label for="filter__${id}" class="filter__label">${id}<span class="filter__${id}-count">${count}</span></label>`;
  const div = document.createElement(`div`);
  div.innerHTML = input + label;
  filter.appendChild(div);
};

// Вариант 2
// const filterRender = (id, count, checked = false, disabled = false) =>{
//   const label = document.createElement(`label`);
//   const input = document.createElement(`input`);
//   const innerLabel = `${id}<span class="filter__${id}-count">${count}</span>`;
//
//   label.setAttribute(`for`, `filter__${id}`);
//   label.classList.add(`filter__label`);
//   input.setAttribute(`type`, `radio`);
//   input.setAttribute(`checked`, `${checked ? "checked" : ""}`);
//   input.setAttribute(`id`, `filter__${id}`);
//   input.classList.add(`filter__input`, `visually-hidden`);
//   input.setAttribute(`name`, `filter`);
//   label.innerHTML = innerLabel;
//   filter.appendChild(input);
//   filter.appendChild(label);
// };

arr.forEach(function (el) {
  filterRender(el, randomNum());
});
