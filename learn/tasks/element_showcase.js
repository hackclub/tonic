import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const element_showcase = new Task({
  name: 'Element showcase',
  description: "All your theme's elements in one central place!",
  group: 'Show the world',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default element_showcase;