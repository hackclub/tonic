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
  await mutant.slight_smile.say("In this task, I want to teach you about three more types of elements.");
  await mutant.repeatable({
    question: async () => await mutant.hushed.say('Does all of this make sense?'),
    response: async () => await mutant.smile_hearts.say('Lovely!'),
    callback: async () => {
      await mutant.thinking.say("First, let's look at *lists*.", { image: 'markdown_ul', image_width: 200 });
      await mutant.thinking.say('You can add a bulleted list to a page by adding a dash before each of the items...');
      await mutant.thinking.say('...and add a numbered list to a page by numbering each of the items.', { image: 'markdown_ol' });
      await mutant.slight_smile.say('Both types of lists can have as many items as you want.');
      await mutant.thinking.say("Second, *blockquotes*.", { image: 'markdown_blockquote', image_width: 400 });
      await mutant.hushed.say('Have you ever wanted to add something to a page that was said by somebody else?');
      await mutant.slight_smile.say('You can do that by adding *>* before what was said.');
      await mutant.thinking.say('Last but not least, *images*.', { image: 'markdown_image' });
      await mutant.hand_over_mouth_open_eyes.say('These work exactly like *links* do, combining parentheses and square brackets...');
      await mutant.hand_over_mouth.say('...except this time, you have to add an *exclamation mark* at the very beginning.');
      await mutant.slight_smile.say('The text you provide inside the square brackets will be used as _alt text_.');
    }
  });
  await mutant.hushed.say("I'd like you to create a new file called *elements.scss* inside the *@_sass* folder.");
  await mutant.slight_smile.say('At the same time, go to the *assets* folder and _import_ *elements.scss* on a new line underneath *base.scss*.');
  await mutant.thinking.say("Let me know when you've done both of these things.");
  await mutant.thinking.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  })
  await mutant.hand_over_mouth_open_eyes.say("Now, you're going to pick one or more of the elements I just showed you...");
  await mutant.grinning.say('...and use Sass to make them look amazing!');
  await mutant.thinking.say('That could mean changing lists to add more space between each item...', { image: 'pretty_list', image_width: 200 });
  await mutant.thinking.say('...improving the default look of blockquotes...', { image: 'pretty_blockquote', image_width: 400 });
  await mutant.thinking.say('...or updating images to add a border, or a shadow.', { image: 'pretty_image', image_width: 200 });
  await mutant.slight_smile.say("The styles you add are up to you, and they'll depend on what kind of theme you're building.", { image: null });
  await mutant.grinning.say("When you're done, commit your changes like usual, and I'll ask you for the link!");
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grin.say('Wonderful!'),
  });
  await mutant.thinking.say('What is the link to the commit you made?', { image: null });
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.hand_over_mouth_open_eyes.say("Let's move on.");
})

export default more_elements;