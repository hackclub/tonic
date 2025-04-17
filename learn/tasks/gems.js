import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const gems = new Task({
  name: 'Gems',
  description: "Use RubyGems to publish your Jekyll theme!",
  group: 'Show the world',
  requires_tasks: ['The README file', 'Element showcase'],
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
})

export default gems;