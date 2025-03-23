const sounds = {
  awoken_blip: new Howl({ src: 'assets/audio/awoken_blip.wav' }),
  awoken_c: new Howl({ src: 'assets/audio/awoken_c.wav' }),
  awoken_d: new Howl({ src: 'assets/audio/awoken_d.wav' }),
  awoken_e: new Howl({ src: 'assets/audio/awoken_e.wav' }),
  awoken_f: new Howl({ src: 'assets/audio/awoken_f.wav' }),
  awoken_final: new Howl({ src: 'assets/audio/awoken_final.wav' }),
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function play_sound (sound) {
  sounds[sound].volume(0.4);
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
    this.element.style.top = '-40px';
    play_sound('awoken_c');
    await this.sweat_smile.say('Oh, this is so embarrassing...');
    play_sound('awoken_d');
    await this.pensive.say('I must have fallen asleep!');
    play_sound('awoken_c');
    await this.yawn.say('Sorry...');
    this.emote = 'pensive';
  }
  async say (text) {
    document.getElementById('mutant_text').innerText = '';
    let element_to_append_to = this.text_element;
    await new Promise(resolve => {
      yap(
        text,
        {
          baseRate: 3.5,
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
    await sleep(1000);
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