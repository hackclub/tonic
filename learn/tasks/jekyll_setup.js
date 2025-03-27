import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const jekyll_setup = new Task({
  name: 'Jekyll setup',
  description: 'Set up Jekyll so you can start building your theme!',
  group: 'Setting up',
  updates_on_complete: {
    'Your first page': 3
  },
}).with_callback(async () => {
  await mutant.hand_over_mouth_open_eyes.say('Admittedly, Jekyll is a little complicated.');
  await mutant.sweat_smile.say("There are a few different things you'll need to download to get started!");
  await mutant.slight_smile.say("Don't worry, though - I have a script that can help.");
})

export default jekyll_setup;