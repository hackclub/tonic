import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const using_your_theme = new Task({
  name: 'Using your theme',
  description: "Learn how to use your published theme!",
  group: 'Show the world',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default using_your_theme;