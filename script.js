const bgm = new Howl({
  src: 'assets/audio/bgm.wav',
  html5: true,
  loop: true,
});
let bgm_id;

const sounds = {
  awoken_blip: new Howl({ src: 'assets/audio/awoken_blip.wav' }),
  awoken_c: new Howl({ src: 'assets/audio/awoken_c.wav' }),
  awoken_d: new Howl({ src: 'assets/audio/awoken_d.wav' }),
  awoken_e: new Howl({ src: 'assets/audio/awoken_e.wav' }),
  awoken_f: new Howl({ src: 'assets/audio/awoken_f.wav' }),
  awoken_final: new Howl({ src: 'assets/audio/awoken_final.wav', }),
};

Howler.volume(0.5);

const TIME_SCALE = 2;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms / TIME_SCALE));
}

function play_sound (sound) {
  sounds[sound].play();
}

function show_image (src) {
  document.getElementById('mutant_image').src = 'assets/img/' + src + '.png';
  document.getElementById('image_container').classList.remove('hidden-w');
}

function hide_image () {
  document.getElementById('image_container').classList.add('hidden-w');
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
  async introduction () {
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
    show_image('jekyll-logo-2x');
    await this.thinking.say('*Jekyll* is a tool that can help you _build a website_.');
    show_image('jekyll-new-code');
    await this.slight_smile.say('With Jekyll, you can write just a little bit of code...');
    show_image('jekyll-new');
    await this.grinning.say("...and get a beautiful site in return!");
    await this.slight_smile.say('You just need to pick a *theme* to decide how it looks.');
    await this.slight_smile.say("Let's look at a few different themes now.");
    show_image('nimmoi');
    await this.thinking.say("This theme is all about purple...");
    show_image('parchment');
    await this.slight_smile.say("This one's more yellow, like an old sheet of paper...");
    show_image('lifeblood');
    await this.grinning.say("And this one's a nice, bright white!");
    await this.thinking.say('A Jekyll theme can be as simple or as complex as you want.');
    await this.thinking.say("Look at *lifeblood*: it has some _navigation_ that the other themes didn't.");
    await this.grin.say('The only limit is your imagination!');
    hide_image();
    await this.hand_over_mouth_open_eyes.say("But I don't just want you to pick an existing theme...");
    await this.grinning.say('I want to teach you how to build your own!');
    hide_image();
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
    await this.choice1({
      option_a: "Let's go",
      callback_a: async () => {},
    })
  }
  async say (text, { sleep_ms = 1000 } = {}) {
    this.text_element.innerHTML = '';
    this.text_element.classList.remove('hidden-h');
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
  async choice1 (object) {
    await new Promise(resolve => {
      let { option_a, callback_a } = object;
      document.getElementById('choice_container').classList.remove('hidden-h');
      document.getElementById('choice_1').className = '';
      document.getElementById('choice_2').className = 'dn';
      document.getElementById('choice_1').innerHTML = option_a;
      document.getElementById('choice_1').onclick = async function () {
        document.getElementById('choice_container').classList.add('hidden-h');
        document.activeElement.blur();
        await sleep(500);
        await callback_a();
        resolve();
      }
    });
  }
  async choice2 (object) {
    await new Promise(resolve => {
      let { option_a, option_b, callback_a, callback_b } = object;
      document.getElementById('choice_container').classList.remove('hidden-h');
      document.getElementById('choice_1').className = '';
      document.getElementById('choice_2').className = '';
      document.getElementById('choice_1').innerHTML = option_a;
      document.getElementById('choice_2').innerHTML = option_b;
      document.getElementById('choice_1').onclick = async function () {
        document.getElementById('choice_container').classList.add('hidden-h');
        document.activeElement.blur();
        await sleep(500);
        await callback_a();
        resolve();
      }
      document.getElementById('choice_2').onclick = async function () {
        document.getElementById('choice_container').classList.add('hidden-h');
        document.activeElement.blur();
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

sounds.awoken_final.on('end', function () {
  bgm_id = bgm.play();
  mutant.introduction();
});