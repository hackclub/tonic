import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const github_setup = new Task({
  name: 'The config file',
  description: 'Apply settings to your entire theme.',
  group: 'Theme structure',
  requires_group: 'Setting up',
  updates_on_reveal: {
    'Layouts': 2,
    'Includes': 2,
    'Sass': 2,
  },
  updates_on_complete: {
    'Layouts': 3,
    'Includes': 3,
    'Sass': 3,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default github_setup;