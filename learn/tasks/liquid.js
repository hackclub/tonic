import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const liquid = new Task({
  name: 'Liquid',
  description: "Do more complex things with your Jekyll theme!",
  group: 'Going further',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default liquid;