export default (id, count, isChecked = false, isDisabled = false) =>{
  const input = `<input type="radio" id="filter__${id}" class="filter__input visually-hidden" ${isDisabled ? `disabled` : ``} name="filter" ${isChecked ? `checked` : ``}/>`;
  const label = `<label for="filter__${id}" class="filter__label">${id} <span class="filter__${id}-count">${count}</span></label>`;

  return `${input} ${label}`;
};
