import Task from '../Task.js';
import { mutant, hide_image, hide_tasks, show_image, show_tasks } from '../script.js';

const github_setup = new Task({
  name: 'GitHub setup',
  description: 'Use GitHub to store the code for your theme!',
  group: 'Setting up',
  updates: {
    'Jekyll setup': 3,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.say('Before I can teach you how to make a Jekyll theme...');
  await mutant.grinning.say("...we'll need a place for your Jekyll theme to live!");
})

export default github_setup;