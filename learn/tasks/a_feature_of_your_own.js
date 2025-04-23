import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const a_feature_of_your_own = new Task({
  name: 'A feature of your own',
  description: "Time to get creative!",
  group: 'Going further',
  requires_tasks: ['More elements', '404', 'Liquid'],
  updates_on_complete: {
    'The README file': 3,
    'Element showcase': 3,
    'Gems': 1,
    'Using your theme': 1,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default a_feature_of_your_own;