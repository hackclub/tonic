import tasks from "./tasks.js";

window.addEventListener('DOMContentLoaded', () => {
  fetch('/auth', {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      if (!data.auth) {
        window.location.href = window.location.origin;
      }
    });
})

window.addEventListener('beforeunload', e => e.preventDefault());

const bgm = new Howl({
  src: '/assets/audio/bgm.wav',
  html5: true,
  loop: true,
});
const bgm_final = new Howl({
  src: '/assets/audio/bgm_final.wav',
  html5: true,
  // loop: true,
});
let bgm_id;

const riser = new Howl({
  src: '/assets/audio/riser.wav',
  volume: 0.15,
  html5: true,
});
let riser_id;

const sounds = {
  awoken_blip: new Howl({ src: '/assets/audio/awoken_blip.wav' }),
  awoken_c: new Howl({ src: '/assets/audio/awoken_c.wav' }),
  awoken_d: new Howl({ src: '/assets/audio/awoken_d.wav' }),
  awoken_e: new Howl({ src: '/assets/audio/awoken_e.wav' }),
  awoken_f: new Howl({ src: '/assets/audio/awoken_f.wav' }),
  awoken_final: new Howl({ src: '/assets/audio/awoken_final.wav', }),
  click: new Howl({ src: '/assets/audio/click.wav' }),
  drum: new Howl({ src: '/assets/audio/drum.wav' }),
  hover: new Howl({ src: '/assets/audio/hover.wav' }),
  negative_click: new Howl({ src: '/assets/audio/negative_click.wav' }),
  task_complete: new Howl({ src: '/assets/audio/task_complete.wav' }),
};

Howler.volume(0.5);

const TIME_SCALE = 1;
let overrides_enabled = false;

let music_enabled = true;
// let sound_enabled = true;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms / TIME_SCALE));
}

export function play_sound (sound, { randomize = false } = {}) {
  if (randomize) {
    sounds[sound].rate(1.0 + Math.random());
  }
  sounds[sound].play();
}

export function play_bgm () {
  if (music_enabled) {
    bgm_id = bgm.play();
  }
}

export async function fade_bgm () {
  if (music_enabled) {
    bgm.fade(1, 0, 1500, bgm_id);
    await sleep(1500);
  }
}

export function show_image (src) {
  document.getElementById('mutant_container').className = '';
  document.getElementById('mutant_image').src = '/assets/img/' + src + '.png';
  document.getElementById('image_container').classList.remove('hidden-w');
}

export function hide_image () {
  document.getElementById('mutant_container').className = 'recenter';
  document.getElementById('image_container').classList.add('hidden-w');
}

export function show_code (code) {
  document.getElementById('mutant_container').className = '';
  document.getElementById('mutant_code').innerText = code;
  document.getElementById('code_container').classList.remove('hidden-w');
}

export function hide_code () {
  document.getElementById('mutant_container').className = 'recenter';
  document.getElementById('code_container').classList.add('hidden-w');
}

// TODO: remove the copy button!
document.getElementById('mutant_code_copy').onclick = async function () {
  navigator.clipboard.writeText(document.getElementById('mutant_code').innerText);
  document.getElementById('mutant_code_copy').innerHTML = 'Copied!';
  await sleep(1500);
  document.getElementById('mutant_code_copy').innerHTML = 'Copy';
}

export function show_tasks () {
  document.getElementById('mutant_container').className = '';
  document.getElementById('tasks_container').classList.remove('hidden-w');
  document.getElementById('tasks_container').classList.remove('in');
}

export function hide_tasks () {
  document.getElementById('mutant_container').className = 'recenter';
  document.getElementById('tasks_container').classList.add('hidden-w');
  document.getElementById('tasks_container').classList.add('in');
}

class Mutant {
  /**
   * Constructor method.
   * Instead of returning a class instance, this function returns a Proxy
   * which sets Mutant's emote when attempting to access any unknown property.
   * @returns {Proxy}
   */
  constructor () {
    this.stage = 0;
    this.image_width = 400;
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop];
        } else {
          this.emote = prop;
          return this;
        }
      }
    });
  }
  async wake_up () {
    this.stage = 1;
    this.emote = 'flushed';
    this.clickable = false;
    play_sound('awoken_blip');
    await sleep(2100);
    this.apologize();
  }
  async apologize () {
    this.stage = 2;
    play_sound('awoken_c');
    await this.sweat_smile.say('Oh, this is so embarrassing...');
    play_sound('awoken_d');
    await this.pensive.say('I must have fallen asleep!');
    play_sound('awoken_c');
    await this.yawn.say('Sorry...');
    await this.pensive.choice2({
      option_a: 'Who are you?',
      option_b: 'Are you okay?',
      callback_a: async () => await this.smile_with_tear.say('Who am _I_?'),
      callback_b: async () => await this.hand_over_mouth.say('Never better!'),
    });
    await this.grinning.say("I'm *Mutant*!", { sleep_ms: 500 });
    play_sound('awoken_final');
  }
  async introduction () {
    this.stage = 3;
    await this.hand_over_mouth_open_eyes.say("I don't know very much...");
    await this.hand_over_mouth.say('And yet, I know a lot!');
    await this.content.choice2({
      option_a: 'About what?',
      option_b: 'What do you mean?',
      callback_a: async () => await this.grinning.say('Only my favorite thing in the world!'),
      callback_b: async () => await this.hand_over_mouth_open_eyes.say('Well, you see...'),
    });
    await this.hushed.say('I want to teach you...');
    await this.starry_eyes.say('About *Jekyll*!');
    await this.thinking.say('Have you heard of *Jekyll* before?');
    await this.thinking.choice2({
      option_a: 'Yes, I have',
      option_b: "No, I haven't",
      callback_a: async () => await this.grinning.say("Great! But I'll remind you about it, just in case."),
      callback_b: async () => await this.grinning.say("That's okay! Let me tell you about it..."),
    });
    await this.thinking.say('*Jekyll* is a tool that can help you _build a website_.', { image: 'jekyll-logo-2x' });
    await this.slight_smile.say('With Jekyll, you can write just a little bit of code...', { image: 'jekyll-new-code' });
    await this.grinning.say("...and get a beautiful site in return!", { image: 'jekyll-new' });
    await this.slight_smile.say('You just need to pick a *theme* to decide how it looks.');
    await this.slight_smile.say("Let's look at a few different themes now.");
    await this.thinking.say("This theme is all about purple...", { image: 'nimmoi' });
    await this.slight_smile.say("This one's more yellow, like an old sheet of paper...", { image: 'parchment' });
    await this.grinning.say("And this one's a nice, bright white!", { image: 'lifeblood' });
    await this.thinking.say('A Jekyll theme can be as simple or as complex as you want.');
    await this.thinking.say("Look at this one: it has some navigation that the other themes don't.");
    await this.grin.say('The only limit is your imagination!');
    await this.hand_over_mouth_open_eyes.say("But I don't just want you to pick an existing theme...", { image: null });
    await this.grinning.say('I want to teach you how to build your own!');
    await this.grinning.say('What do you think?');
    await this.slight_smile.choice2({
      option_a: 'Sounds like fun',
      option_b: 'Sounds complicated',
      callback_a: async () => await this.grin.say('Wonderful!'),
      callback_b: async () => await this.grinning.say("I promise it's not as hard as you think!"),
    });
    await this.thinking.say("I'll give you a list of *tasks*...");
    await this.halo.say('And guide you through them, every step of the way!');
    await this.smile_hearts.say("At the end, you'll have a beautiful Jekyll theme published for the world to see!");
    await this.grinning.say('Ready to see the first task?');
    await this.slight_smile.choice1({
      option_a: "Let's go",
      callback_a: async () => this.introduce_tasks(),
    })
  }
  async introduce_tasks () {
    this.stage = 4;
    show_tasks();
    document.getElementById('tasks_container').classList.add('in');
    await sleep(1500);
    play_sound('drum', { randomize: true });
    await tasks.set_state('GitHub setup', 3);
    await sleep(666);
    play_sound('drum', { randomize: true });
    await tasks.set_state('Hackatime setup', 1);
    await sleep(333);
    play_sound('drum', { randomize: true });
    await tasks.set_state('Jekyll setup', 1);
    await sleep(333);
    play_sound('drum', { randomize: true });
    await tasks.set_state('Your first page', 1);
    await sleep(1000);
    await this.grinning.say('These are *your tasks*!');
    await this.slight_smile.say("Every time you come here, you'll see these first.");
    await this.slight_smile.say("You'll start at the top, and work your way down the list...");
    await this.grinning.say('...learning more and more about Jekyll as you go!');
    await this.hand_over_mouth_open_eyes.say("I'll always save your progress, so you can keep track of what to do next...");
    await this.hand_over_mouth.say("...and you can always go back to a task you've already finished, too.");
    await this.grinning.say('Sound good?')
    await this.slight_smile.choice1({
      option_a: 'I think so',
      callback_a: async () => await this.grinning.say('Great!'),
    });
    await this.grinning.say('Click *GitHub setup* to get started!');
    document.getElementById('tasks_container').classList.remove('in');
  }
  async greeting () {
    this.stage = 5;
    this.clickable = false;
    await sleep(500);
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 11) {
      await this.grinning.say('Good morning! Ready to get back to it?');
    } else if (hour >= 12 && hour <= 16) {
      await this.grinning.say('Afternoon! How are you?');
    } else if (hour >= 17 && hour <= 22) {
      await this.grinning.say('Evening! Ready to work on that theme?');
    } else {
      await this.hushed.say('Burning the midnight oil, are we?');
    }
    this.emote = 'slight_smile';
    this.text_element.innerHTML = '';
    show_tasks();
  }
  async complete () {
    this.stage = 6;
    hide_tasks();
    await sleep(1500);
    await this.grinning.say('You did it!');
    await this.grinning.say("You've completed all the tasks I have for you so far.");
    await this.slight_smile.say('Starting from a simple template, you now have the beginnings of your very own Jekyll theme.');
    await this.smile_with_tear.say('I knew you could do it!');
    await this.hushed.say('But what about showing it to the world?');
    await this.hand_over_mouth_open_eyes.say("For that, I'll need some more time to collect my thoughts...");
    await this.slight_smile.say('More tasks will become available very soon.');
    await this.grinning.say("I hope to see you then!");
    this.emote = 'slight_smile';
    this.text_element.innerHTML = '';
    show_tasks();
    await sleep(1500);
    document.getElementById('tasks_container').classList.add('in');
    play_sound('drum', { randomize: true });
    document.getElementById('gate_divider').classList.remove('dn');
    document.getElementById('gate').classList.remove('dn');
    document.getElementById('tasks_container').scrollTop = document.getElementById('tasks_container').scrollHeight;
    await sleep(1000);
    document.getElementById('tasks_container').classList.remove('in');
  }
  /**
   * Make Mutant say something, awaiting a promise which resolves when Mutant
   * finishes saying it.
   * Make text bold by placing `*` on either side.
   * Make text italic by placing `_` on either side.
   * @param {string} text
   * @param {object} [param1]
   * @param {string|null} [param1.image]
   * @param {number} [param1.image_width]
   * @param {number} [param1.sleep_ms] Sleep duration after the promise resolves.
   */
  async say (text, {
    sleep_ms = 1000,
    image = undefined,
    image_width = this.image_width,
    code = undefined,
  } = {}) {
    this.text_element.innerHTML = '';
    this.text_element.classList.remove('hidden-h');
    const link = text.match(/\^(.+?)\$(.+?)\^/) || [];
    const link_href = link[2];
    const escaped = text.match(/@(.)/) || [];
    const escaped_char = escaped[1];
    let element_to_append_to = this.text_element;
    if (typeof image === 'string') {
      show_image(image);
    } else if (image === null) {
      hide_image();
    }
    if (typeof image_width === 'number') {
      this.image_width = image_width;
    }
    document.getElementById('mutant_image').style.width = `${this.image_width}px`;
    if (typeof code === 'string') {
      show_code(code);
    } else if (code === null) {
      hide_code();
    }
    await new Promise(resolve => {
      yap(
        text.replace(/\^(.+?)\$(.+?)\^/, '^$1^').replace(/@./, '@'),
        {
          baseRate: 3.5 * TIME_SCALE,
          rateVariance: 2,
          letterCallback: async ({letter, sound}) => {
            if (letter === '*') {
              if (element_to_append_to === this.text_element) {
                const b = document.createElement('b');
                this.text_element.appendChild(b);
                element_to_append_to = b;
              } else {
                element_to_append_to = this.text_element;
              }
            } else if (letter === '_') {
              if (element_to_append_to === this.text_element) {
                const i = document.createElement('i');
                this.text_element.appendChild(i);
                element_to_append_to = i;
              } else {
                element_to_append_to = this.text_element;
              }
            } else if (letter === '^') {
              if (element_to_append_to === this.text_element) {
                const a = document.createElement('a');
                a.href = link_href;
                a.setAttribute('target', '_blank');
                this.text_element.appendChild(a);
                element_to_append_to = a;
              } else {
                element_to_append_to = this.text_element;
              }
            } else if (letter === '@') {
              element_to_append_to.innerHTML += escaped_char;
            } else if (letter === '&') {
              element_to_append_to.innerHTML += '&amp;';
            } else if (letter === '>') {
              element_to_append_to.innerHTML += '&lt;';
            } else {
              element_to_append_to.innerHTML += letter;
            }
          },
          endCallback: () => {
            resolve();
          }
        }
      );
    });
    await sleep(sleep_ms);
  }
  /**
   * Await a promise which resolves when the user clicks a button.
   * Mutant's response is determined by a provided callback.
   * @param {object} object
   * @param {string} object.option_a
   * @param {function} object.callback_a
   */
  async choice1 (object) {
    await new Promise(resolve => {
      let { option_a, callback_a } = object;
      document.getElementById('choice_container').classList.remove('hidden-h');
      document.getElementById('choice_1').className = '';
      document.getElementById('choice_2').className = 'dn';
      document.getElementById('choice_1').innerHTML = option_a;
      document.getElementById('choice_1').onclick = async function () {
        play_sound('click');
        document.getElementById('choice_container').classList.add('hidden-h');
        document.activeElement.blur();
        await sleep(500);
        await callback_a();
        resolve();
      }
    });
  }
  /**
   * Await a promise which resolves when the user clicks one of two buttons.
   * Mutant's response is determined by the provided callbacks.
   * @param {object} object
   * @param {string} object.option_a
   * @param {string} object.option_b
   * @param {function} object.callback_a
   * @param {function} object.callback_b
   */
  async choice2 (object) {
    await new Promise(resolve => {
      let { option_a, option_b, callback_a, callback_b } = object;
      document.getElementById('choice_container').classList.remove('hidden-h');
      document.getElementById('choice_1').className = '';
      document.getElementById('choice_2').className = '';
      document.getElementById('choice_1').innerHTML = option_a;
      document.getElementById('choice_2').innerHTML = option_b;
      document.getElementById('choice_1').onclick = async function () {
        play_sound('click');
        document.getElementById('choice_container').classList.add('hidden-h');
        document.activeElement.blur();
        await sleep(500);
        await callback_a();
        resolve();
      }
      document.getElementById('choice_2').onclick = async function () {
        play_sound('click');
        document.getElementById('choice_container').classList.add('hidden-h');
        document.activeElement.blur();
        await sleep(500);
        await callback_b();
        resolve();
      }
    });
  }
  async repeatable (object) {
    let { question, response, callback } = object;
    let chose_option_a = false;
    while (!chose_option_a) {
      await callback();
      hide_image();
      await question();
      await this.choice2({
        option_a: 'I think so',
        option_b: 'Show me that again',
        callback_a: async () => chose_option_a = true,
        callback_b: () => {},
      });
    }
    await response();
  }
  async text_entry (object) {
    await new Promise(resolve => {
      let { placeholder, exp, callback } = object;
      document.getElementById('text_entry_container').classList.remove('hidden-h');
      document.getElementById('text_entry').value = '';
      document.getElementById('text_entry').placeholder = placeholder;
      document.getElementById('text_entry').onkeydown = async function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (!e.shiftKey) return;
          if (!document.getElementById('text_entry').value.match(exp)) {
            play_sound('negative_click');
            return;
          }
          riser_id = riser.play();
          const S = await fetch('/scrap', {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              task: document.getElementById('current_task_name').innerText,
              text_entry: document.getElementById('text_entry').value,
            }),
          }).then(response => response.json());
          riser.fade(1, 0, 250, riser_id);
          if (!S.success) {
            play_sound('negative_click');
            if (S.lost_id) {
              alert("Somehow, Mutant lost track of your user ID! This shouldn't happen. Send a message in #tonic on the Hack Club Slack!");
            }
            return;
          }
          play_sound('click');
          document.getElementById('text_entry_container').classList.add('hidden-h');
          document.activeElement.blur();
          await sleep(500);
          await callback();
          resolve();
        }
      }
    });
  }
  get element () {
    return document.getElementById('mutant');
  }
  get text_element () {
    return document.getElementById('mutant_text');
  }
  get clickable () {
    return this.element.className === 'clickable';
  }
  set clickable (v) {
    this.element.className = v ? 'clickable' : '';
  }
  set emote (e) {
    this.element.src = '/assets/ms/' + e + '.svg';
  }
}

export const mutant = new Mutant;
// OVERRIDES
async function override () {
  mutant.clickable = false;
  mutant.emote = 'slight_smile';
  bgm_id = bgm.play();
  // mutant.introduce_tasks();
  mutant.greeting();
  const tasks_state_override = {
    'GitHub setup': 4,
    'Hackatime setup': 4,
    'Jekyll setup': 4,
    'Your first page': 4,
    'The config file': 4,
    'Layouts': 4,
    'Includes': 4,
    'Sass': 4,
    'The README file': 3,
    'Gems': 1,
    'Using your theme': 1,
  };
  await tasks.register_all(tasks_state_override);
}
window.onkeydown = async function (e) {
  if (e.key === '*' && !overrides_enabled) {
    if (!window.location.origin.startsWith('http://localhost')) return;
    overrides_enabled = true;
    await override();
  }
}

// await tasks.register_all();

document.getElementById('music_toggle').onmouseenter = function () {
  play_sound('hover');
}
document.getElementById('music_toggle').onclick = function () {
  play_sound('click');
  music_enabled = !music_enabled;
  if (music_enabled) {
    bgm_id = bgm.play();
  } else {
    bgm.stop(bgm_id);
  }
  document.getElementById('music_toggle_icon').src = music_enabled ? '/assets/ms/speaker_medium_volume.svg' : '/assets/ms/speaker_muted.svg';
}

// document.getElementById('sound_toggle').onclick = function () {
//   sound_enabled = !sound_enabled;
//   let volume = sound_enabled ? 1 : 0;
//   // ?
//   document.getElementById('sound_toggle_icon').src = sound_enabled ? '/assets/ms/speaker_medium_volume.svg' : '/assets/ms/speaker_muted.svg';
// }

mutant.element.onmouseenter = function () {
  if (mutant.clickable) {
    play_sound('hover');
  }
}

mutant.element.onclick = function () {
  if (mutant.clickable) {
    mutant.clickable = false;
    play_sound('click');
    riser_id = riser.play();
    fetch('/scraps', { credentials: 'include' })
      .then(response => response.json())
      .then(async (data) => {
        mutant.clickable = false;
        riser.fade(1, 0, 250, riser_id);
        if (!data.success) {
          mutant.clickable = true;
          return;
        }
        if (data.records.length === 0) {
          await tasks.register_all();
          mutant.wake_up();
        } else {
          let tasks_state = {};
          data.records.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
          const filtered_records = data.records.filter((x, i, r) => r.findIndex(x2 => x2.fields['Task'] === x.fields['Task']) === i);
          for (const record of filtered_records) {
            const task_name = record.fields['Task'];
            const task = Object.values(tasks.all_tasks).find(task => task.name === task_name);
            tasks_state[task_name] = 4;
            for (const u_task_name of Object.keys(task.updates_on_complete)) {
              tasks_state[u_task_name] = task.updates_on_complete[u_task_name];
            }
          }
          const tasks_which_should_be_unlocked_based_on_required_tasks = Object.values(tasks.all_tasks).filter(task => {
            if (task.requires_tasks.length === 0) return false;
            if (tasks_state[task.name] < 3 && task.requires_tasks.every(t => tasks_state[t] === 4)) return true;
            return false;
          });
          // console.log(tasks_state);
          for (const task of tasks_which_should_be_unlocked_based_on_required_tasks) {
            tasks_state[task.name] = 3;
          }
          // TODO: update state in the case that the user has only completed "GitHub setup"
          await tasks.register_all(tasks_state);
          mutant.emote = 'slight_smile';
          bgm_id = bgm.play();
          mutant.greeting();
        }
      });
  }
}

document.getElementById('choice_1').onmouseenter = function () {
  if (document.getElementById('choice_container').className === '') {
    play_sound('hover');
  }
}

document.getElementById('choice_2').onmouseenter = function () {
  if (document.getElementById('choice_container').className === '') {
    play_sound('hover');
  }
}

sounds.awoken_final.on('end', function () {
  if (tasks.all_tasks_completed()) {
    bgm_id = bgm_final.play();
    mutant.complete();
  } else {
    bgm_id = bgm.play();
  }
  if (mutant.stage === 2) {
    mutant.introduction();
  }
});

bgm_final.on('end', function () {
  bgm_id = bgm.play();
})

function update_gate_countdown () {
  if (document.getElementById('gate') !== null) {
    document.getElementById('gate').innerHTML = tasks.gate_countdown();
  }
};
setInterval(update_gate_countdown, 1000);