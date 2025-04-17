import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const the_readme_file = new Task({
  name: 'The README file',
  description: "Add more information to your GitHub repository!",
  group: 'Show the world',
  requires_group: 'Going further',
  updates_on_reveal: {
    'Element showcase': 3,
    'Gems': 1,
    'Using your theme': 1,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default the_readme_file;