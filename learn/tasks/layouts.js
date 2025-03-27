import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const github_setup = new Task({
  name: 'Layouts',
  description: 'Decide how each page should be structured.',
  group: 'Theme structure',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default github_setup;