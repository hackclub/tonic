import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const github_setup = new Task({
  name: 'Includes',
  description: "Move parts of your theme into their own files.",
  group: 'Theme structure',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default github_setup;