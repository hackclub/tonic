const sounds = {
  awoken_blip: new Howl({ src: 'assets/audio/awoken_blip.wav' }),
  awoken_c: new Howl({ src: 'assets/audio/awoken_c.wav' }),
  awoken_d: new Howl({ src: 'assets/audio/awoken_d.wav' }),
  awoken_e: new Howl({ src: 'assets/audio/awoken_e.wav' }),
  awoken_f: new Howl({ src: 'assets/audio/awoken_f.wav' }),
  awoken_final: new Howl({ src: 'assets/audio/awoken_final.wav' }),
}

Howler.volume(0.5);

const TIME_SCALE = 1;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms / TIME_SCALE));
}

function play_sound (sound) {
  sounds[sound].play();
}

class Mutant {
  constructor () {
    this.state = 'asleep';
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
    this.state = 'awoken';
    this.emote = 'flushed';
    this.clickable = false;
    play_sound('awoken_blip');
    await sleep(2100);
    this.apologize();
  }
  async apologize () {
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
  async say (text, { sleep_ms = 1000 } = {}) {
    this.text_element.innerHTML = '';
    this.text_element.classList.remove('hidden');
    let element_to_append_to = this.text_element;
    await new Promise(resolve => {
      yap(
        text,
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
  async choice2 (object) {
    await new Promise(resolve => {
      let { option_a, option_b, callback_a, callback_b } = object;
      document.getElementById('choice_container').classList.remove('hidden');
      document.getElementById('choice_1').innerHTML = option_a;
      document.getElementById('choice_2').innerHTML = option_b;
      document.getElementById('choice_1').onclick = async function () {
        document.getElementById('choice_container').classList.add('hidden');
        await sleep(500);
        await callback_a();
        resolve();
      }
      document.getElementById('choice_2').onclick = async function () {
        document.getElementById('choice_container').classList.add('hidden');
        await sleep(500);
        await callback_b();
        resolve();
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
    this.element.src = 'assets/ms/' + e + '.svg';
  }
}

let mutant = new Mutant;

mutant.element.onclick = function () {
  if (mutant.state === 'asleep') {
    mutant.wake_up();
  }
}