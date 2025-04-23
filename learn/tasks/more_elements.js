import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const more_elements = new Task({
  name: 'More elements',
  description: "Learn about lists, code blocks, tables, and more.",
  group: 'Going further',
  requires_group: 'Theme structure',
  requires_tasks: ['The config file', 'Layouts', 'Includes', 'Sass'],
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.hand_over_mouth_open_eyes.say('Back in *Your first page*, I showed you some of the most important Markdown elements...');
  await mutant.slight_smile.say('...including plain, bold, and italic text, headings, and links.');
  await mutant.grinning.say("However, those aren't the only things that Markdown provides!");
})

export default more_elements;