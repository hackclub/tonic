import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

// can't use a number :)
const four_oh_four = new Task({
  name: '404',
  description: "Let people know when a page is missing.",
  group: 'Going further',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default four_oh_four;