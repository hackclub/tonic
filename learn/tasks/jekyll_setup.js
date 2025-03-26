import Task from '../Task.js';
import { mutant } from '../script.js';

const jekyll_setup = new Task({
  name: 'Jekyll setup',
  description: 'Set up Jekyll so you can start building your theme!',
  group: 'Setting up',
}).callback(async () => {
})

export default jekyll_setup;