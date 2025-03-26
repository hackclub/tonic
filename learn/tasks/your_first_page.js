import Task from '../Task.js';
import { mutant } from '../script.js';

const your_first_page = new Task({
  name: 'Your first page',
  description: 'Give your theme a front page!',
  group: 'Setting up',
}).callback(async () => {
})

export default your_first_page;