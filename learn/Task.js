export default class Task {
  constructor (opts) {
    this.name = opts.name;
    this.description = opts.description;
    this.group = opts.group;
    this.requires_group = opts.requires_group || null;
    this.updates_on_reveal = opts.updates_on_reveal || {};
    this.updates_on_complete = opts.updates_on_complete || {};
    this.state = 0;
    return this;
  }
  with_callback (c) {
    this.callback = c;
    return this;
  }
  get id () {
    return `task_${this.name.split(' ').join('_').toLowerCase()}`;
  }
  get element () {
    return document.getElementById(this.id);
  }
  get icon_element () {
    return this.element.querySelector('img');
  }
  get name_element () {
    return this.element.querySelector('a');
  }
  get middot_element () {
    return this.element.querySelector('.task_middot');
  }
  get description_element () {
    return this.element.querySelector('.task_description');
  }
}