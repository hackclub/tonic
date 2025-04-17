import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const more_elements = new Task({
  name: 'More elements',
  description: "Learn about lists, code blocks, tables, and more.",
  group: 'Going further',
  requires_group: 'Theme structure',
  updates_on_reveal: {
    '404': 3,
    'Liquid': 3,
    'A feature of your own': 1,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default more_elements;