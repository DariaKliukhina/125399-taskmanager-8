import {createElement} from './create-element.js';

class Task {
  constructor(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._dueDate = data.dueDate;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._type = data.type;
    this._color = data.color;

    this._dueDate = data.dueDate;

    this._element = null;
    this._state = {
      isEdit: false,
      isFavorite: false,
      isDone: false,
      isDeadline: false
    };

    // this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }
  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }
  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
  <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${this._title}</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                 ${this._tags.map((it) => `<span class="card__hashtag-inner">
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
              </span>`).join(``)}
              </div>
           
            </div>
          </div>
          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
            <img
              src="${this._picture}"
              alt="task picture"
              class="card__img"
            />
          </label>
        </div>
      </div>
    </form>
  </article>`.trim();
  }

  // bind() {
  //   this._element.querySelector(`.card__btn--edit`)
  //     .addEventListener(`click`, this._onEditButtonClick);
  // }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  // unbind() {
  //   this._element.querySelector(`.card__btn--edit`)
  //     .removeEventListener(`click`, this._onEditButtonClick);
  // }

  unrender() {
    // this.unbind();
    this._element = null;
  }

}

export default Task;
