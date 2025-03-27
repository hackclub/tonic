import all_tasks from './tasks/all.js';
import { mutant, hide_image, hide_tasks, play_sound, show_image, show_tasks, sleep } from './script.js';

// polyfill
function group_by (iterable, callbackfn) {
  const obj = Object.create(null)
  let i = 0
  for (const value of iterable) {
    const key = callbackfn(value, i++)
    key in obj ? obj[key].push(value) : (obj[key] = [value])
  }
  return obj
}

/**
 * Create a list group without appending it to the DOM.
 * @param {string} group_name
 * @param {Task[]} tasks
 * @returns 
 */
function create_list_group (group_name, tasks) {
  const list_group = document.createElement('div');
  // heading
  const heading = document.createElement('h3');
  heading.id = `task_heading_${group_name.split(' ').join('_').toLowerCase()}`;
  heading.innerHTML = group_name;
  list_group.appendChild(heading);
  // tasks
  for (const task of tasks) {
    const list_item = create_list_item(task);
    list_group.appendChild(list_item);
  }
  // divider
  const divider = document.createElement('p');
  divider.id = `task_divider_${group_name.split(' ').join('_').toLowerCase()}`;
  divider.classList.add('locked_divider');
  divider.innerHTML = 'Locked';
  list_group.appendChild(divider);
  // return
  return list_group;
}

/**
 * Update the list group with the given name after it has been appended to the
 * DOM by looking at the state of every Task in the group.
 * @param {string} group_name
 */
function update_list_group (group_name) {
  const tasks = Object.values(all_tasks)
    .filter(task => task.group === group_name);
  const sections = group_by(tasks, ({ state }) => {
    if (state === 3 || state === 4) {
      return 'unlocked';
    }
    if (state === 2) {
      return 'hidden_description';
    }
    if (state === 1) {
      return 'hidden_name';
    }
    return 'invisible';
  });
  const heading_element = document.getElementById(`task_heading_${group_name.split(' ').join('_').toLowerCase()}`);
  const unlocked = (sections.unlocked || []).map(task => task.element);
  const divider = document.getElementById(`task_divider_${group_name.split(' ').join('_').toLowerCase()}`);
  const hidden_description = (sections.hidden_description || []).map(task => task.element);
  const hidden_name = (sections.hidden_name || []).map(task => task.element);
  const invisible = (sections.invisible || []).map(task => task.element);
  if (invisible.length === tasks.length) {
    heading_element.classList.add('dn');
  } else {
    heading_element.classList.remove('dn');
  }
  if (hidden_description.length + hidden_name.length === 0) {
    divider.classList.add('dn');
  } else {
    divider.classList.remove('dn');
  }
  heading_element.after(
    ...unlocked,
    divider,
    ...hidden_description,
    ...hidden_name,
    ...invisible,
  );
}

/**
 * Create a list item for a Task without appending it to the DOM.
 * @param {Task} task
 * @returns 
 */
function create_list_item (task) {
  const list_item = document.createElement('p');
  list_item.id = task.id;
  list_item.className = 'dn';
  // icon
  const icon = document.createElement('img');
  icon.className = 'icon';
  list_item.appendChild(icon);
  // name
  const name = document.createElement('a');
  list_item.appendChild(name);
  // middot
  const middot = document.createElement('span');
  middot.className = 'task_middot dn';
  middot.innerHTML = '&middot;';
  list_item.appendChild(middot);
  // description
  const description = document.createElement('span');
  description.className = 'task_description dn';
  list_item.appendChild(description);
  // return
  return list_item;
}

/**
 * Update the list item for a Task after it has been appended to the DOM by
 * looking at the Task's state.
 * This updates the list group associated with the Task in the DOM.
 * @param {Task} task
 */
function update_list_item (task) {
  if (task.state === 0) {
    task.element.className = 'locked dn';
    // don't care about anything
  } else if (task.state === 1) {
    // the task is visible, but locked
    task.element.className = 'locked';
    task.icon_element.src = '/assets/ms/gray_question_mark.svg';
    // the name is visible, but obscured
    task.name_element.innerHTML = '???';
    // the description is not visible
    task.middot_element.className = 'task_middot dn';
    task.description_element.className = 'task_description dn';
    // don't care about the description's innerHTML
  } else if (task.state === 2) {
    // the task is visible, but locked
    task.element.className = 'locked';
    task.icon_element.src = '/assets/ms/gray_question_mark.svg';
    // the name is visible
    task.name_element.innerHTML = task.name;
    // the description is visible, but obscured
    task.middot_element.className = 'task_middot';
    task.description_element.className = 'task_description';
    task.description_element.innerHTML = '???';
  } else if (task.state === 3) {
    // the task is visible and unlocked
    task.element.className = '';
    task.icon_element.src = '/assets/ms/red_exclamation_mark.svg';
    // the name is visible
    task.name_element.innerHTML = task.name;
    // the description is visible
    task.middot_element.className = 'task_middot';
    task.description_element.className = 'task_description';
    task.description_element.innerHTML = task.description;
  } else if (task.state === 4) {
    // the task is visible and completed
    task.element.className = '';
    task.icon_element.src = '/assets/ms/tick.svg';
    // the name is visible
    task.name_element.innerHTML = task.name;
    // the description is visible
    task.middot_element.className = 'task_middot';
    task.description_element.className = 'task_description';
    task.description_element.innerHTML = task.description;
  }
  // onclick
  if (task.state === 1 || task.state === 2) {
    task.name_element.onclick = function () {
      play_sound('negative_click');
    }
  }
  // TODO: split here
  else if (task.state === 3 || task.state === 4) {
    task.name_element.onclick = async function () {
      play_sound('click');
      hide_tasks();
      await sleep(500);
      await task.callback();
      show_tasks();
      if (get_state(task.name) !== 3) return;
      document.getElementById('tasks_container').classList.add('in');
      await sleep(1000);
      play_sound('task_complete');
      set_state(task.name, 4);
      await sleep(1500);
      for (const entry of Object.entries(task.updates)) {
        const task_name = entry[0];
        const new_state = entry[1];
        const old_state = get_state(task_name);
        if (old_state < new_state) {
          play_sound('drum', { randomize: true });
          set_state(task_name, new_state);
          await sleep(333);
        }
      }
      document.getElementById('tasks_container').classList.remove('in');
    }
  }
  // update list group
  update_list_group(task.group);
}

/**
 * Add every single known Task to the DOM.
 */
function register_all () {
  const grouped = group_by(Object.values(all_tasks), ({ group }) => group);
  const tasks_container = document.getElementById('tasks_container');

  for (const entry of Object.entries(grouped)) {
    const group_name = entry[0];
    const tasks = entry[1];
    const list_group = create_list_group(group_name, tasks);
    tasks_container.appendChild(list_group);
  }

  for (const task of Object.values(all_tasks)) {
    update_list_item(task);
  }
}

function get_state (task_name) {
  const task = Object.values(all_tasks).find(task => task.name === task_name);
  return task.state;
}

/**
 * Set the state of the Task with the given name.
 * This updates the list item associated with the Task in the DOM.
 * @param {String} task_name
 * @param {number} state
 */
function set_state (task_name, state) {
  const task = Object.values(all_tasks).find(task => task.name === task_name);
  task.state = state;
  update_list_item(task);
}

export default {
  register_all,
  set_state,
}