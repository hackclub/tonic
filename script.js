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
    await this.say('sweat_smile', 'Oh, this is so embarrassing...');
    play_sound('awoken_d');
    await this.say('sweat_smile', 'I must have fallen asleep!');
    play_sound('awoken_c');
    await this.say('grimace', "That's unbecoming of a mutant like me...");
    play_sound('awoken_d');
    await this.say('grinning', 'No matter!');
    play_sound('awoken_e')
    await this.say('hand_over_mouth_open_eyes', "Now that you've woken me up...");
    play_sound('awoken_f');
    await this.say('heart_eyes', 'I can help you with Jekyll!');
    play_sound('awoken_final');
    await this.say('grinning', 'So, what do you want to know?');
  }
  async say (emote, text) {
    document.getElementById('mutant_text').innerText = '';
    this.emote = emote;
    await new Promise(resolve => {
      yap(text, {
        baseRate: 3.5,
        rateVariance: 2,
        letterCallback: async ({letter, sound}) => {
          document.getElementById('mutant_text').innerHTML += letter
        },
        endCallback: () => {
          resolve()
        }
      })
    })
    await sleep(1000);
  }
  get element () {
    return document.getElementById('mutant');
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