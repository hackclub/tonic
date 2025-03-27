import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const your_first_page = new Task({
  name: 'Your first page',
  description: 'Give your theme a front page!',
  group: 'Setting up',
}).with_callback(async () => {
  await mutant.hushed.say("Now that you've installed Jekyll...");
  await mutant.grinning.say("...it's time to give your Jekyll theme a front page!");
})

export default your_first_page;