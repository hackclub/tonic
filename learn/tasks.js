import all_tasks from './tasks/all.js';
import { mutant, hide_image, hide_tasks, play_sound, show_image, show_tasks, sleep, fade_bgm, play_bgm } from './script.js';

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
  name.onmouseenter = function () {
    play_sound('hover');
  }
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
  else if (task.state === 3) {
    task.name_element.onclick = async function () {
      play_sound('click');
      hide_tasks();
      await sleep(500);
      document.getElementById('current_task_name').innerHTML = task.name;
      await task.callback();
      document.getElementById('current_task_name').innerHTML = '';
      mutant.emote = 'slight_smile';
      mutant.text_element.innerHTML = '';
      show_tasks();
      document.getElementById('tasks_container').classList.add('in');
      await sleep(1000);
      play_sound('task_complete');
      await set_state(task.name, 4);
      const potentially_unlocked_mid_group_task = Object.values(all_tasks).find(t => t.requires_tasks?.includes(task.name));
      const required_tasks_for_potentially_unlocked_mid_group_task = Object.values(all_tasks).filter(t => potentially_unlocked_mid_group_task?.requires_tasks?.includes(t.name));
      if (Object.values(all_tasks).filter(t => t.group === task.group).every(t => t.state === 4)) {
        await fade_bgm();
        await sleep(500);
        play_sound('awoken_final');
        await sleep(4000);
        // const task_which_requires_group = Object.values(all_tasks).find(t => t.requires_group === task.group);
        // if (task_which_requires_group) {
        //   play_sound('drum', { randomize: true });
        //   await set_state(task_which_requires_group.name, 3);
        // }
      } else if (required_tasks_for_potentially_unlocked_mid_group_task.length > 0 && required_tasks_for_potentially_unlocked_mid_group_task.every(t => t.state === 4)) {
        // TODO: outdent?
        await sleep(1500);
        play_sound('drum', { randomize: true });
        await set_state(potentially_unlocked_mid_group_task.name, 3);
      } else {
        await sleep(1500);
      }
      for (const entry of Object.entries(task.updates_on_complete)) {
        const task_name = entry[0];
        const new_state = entry[1];
        const old_state = get_state(task_name);
        if (old_state < new_state) {
          play_sound('drum', { randomize: true });
          await set_state(task_name, new_state);
          await sleep(333);
        }
      }
      document.getElementById('tasks_container').classList.remove('in');
    }
  } else {
    task.name_element.onclick = async function () {
      play_sound('click');
      hide_tasks();
      await sleep(500);
      await mutant.thinking.say(`Do you want to go over *${task.name}* again?`);
      await mutant.thinking.choice2({
        option_a: 'Yes',
        option_b: 'No',
        callback_a: async () => {
          document.getElementById('current_task_name').innerHTML = task.name;
          await task.callback();
        },
        callback_b: async () => {},
      });
      document.getElementById('current_task_name').innerHTML = '';
      mutant.emote = 'slight_smile';
      mutant.text_element.innerHTML = '';
      show_tasks();
    }
  }
  // update list group
  update_list_group(task.group);
}

/**
 * Add every single known Task to the DOM.
 */
async function register_all (tasks_state_override = {}) {
  const grouped = group_by(Object.values(all_tasks), ({ group }) => group);
  const tasks_container = document.getElementById('tasks_container');
  tasks_container.querySelectorAll('div').forEach(div => div.remove());

  for (const entry of Object.entries(grouped)) {
    const group_name = entry[0];
    const tasks = entry[1];
    const list_group = create_list_group(group_name, tasks);
    tasks_container.appendChild(list_group);
  }

  const gate_divider = document.createElement('p');
  gate_divider.id = 'gate_divider';
  gate_divider.classList.add('locked_divider');
  gate_divider.innerHTML = 'More tasks coming soon';
  tasks_container.appendChild(gate_divider);

  const gate = document.createElement('p');
  gate.id = 'gate';
  gate.innerHTML = `Check back in <b>${gate_countdown()}</b>`;
  tasks_container.appendChild(gate);

  for (const task of Object.values(all_tasks)) {
    update_list_item(task);
  }

  for (const entry of Object.entries(tasks_state_override)) {
    const task_name = entry[0];
    const state_override = entry[1];
    await set_state(task_name, state_override);
  }

  if (!all_tasks_completed()) {
    gate_divider.classList.add('dn');
    gate.classList.add('dn');
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
async function set_state (task_name, state) {
  const task = Object.values(all_tasks).find(task => task.name === task_name);
  task.state = state;
  update_list_item(task);
  document.getElementById('tasks_container').scrollTop = document.getElementById('tasks_container').scrollHeight;
  if (state === 3) {
    if (Object.entries(task.updates_on_reveal).length > 0) {
      await sleep(666);
    }
    for (const entry of Object.entries(task.updates_on_reveal)) {
      const task_name = entry[0];
      const new_state = entry[1];
      const old_state = get_state(task_name);
      if (old_state < new_state) {
        play_sound('drum', { randomize: true });
        await set_state(task_name, new_state);
        await sleep(333);
      }
    }
  }
}

function gate_countdown () {
  const now = new Date;
  const drop = new Date(Date.UTC(2025, 3, 26, 16, 0, 0, 0));
  const time_to_drop = drop.getTime() - now.getTime();
  let h = Math.floor(time_to_drop / 3_600_000);
  let m = Math.floor((time_to_drop - (h * 3_600_000)) / 60_000);
  let s = Math.floor((time_to_drop - (h * 3_600_000) - (m * 60_000)) / 1000);
  const string_h = h < 10 ? `0${h}` : `${h}`;
  const string_m = m < 10 ? `0${m}` : `${m}`;
  const string_s = s < 10 ? `0${s}` : `${s}`;
  if (h === 0 && m === 0 && s === 0) {
    return `Refresh the page!`;
  } else {
    return `${string_h}:${string_m}:${string_s}`;
  }
}

function all_tasks_completed () {
  return Object.values(all_tasks).every(task => task.state === 4);
}

export default {
  all_tasks,
  register_all,
  set_state,
  all_tasks_completed,
  gate_countdown,
}