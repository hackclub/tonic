import Task from '../Task.js';
import { mutant } from '../script.js';

const github_setup = new Task({
  name: 'GitHub setup',
  description: 'Use GitHub to store the code for your theme!',
  group: 'Setting up',
}).callback(async () => {
})

export default github_setup;