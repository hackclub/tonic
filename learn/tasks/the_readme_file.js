import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const the_readme_file = new Task({
  name: 'The README file',
  description: "Add more information to your GitHub repository!",
  group: 'Show the world',
  requires_group: 'Going further',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default the_readme_file;