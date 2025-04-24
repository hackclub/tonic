import Task from '../Task.js';
import { mutant, hide_image, show_image, show_code } from '../script.js';

const your_first_page = new Task({
  name: 'Your first page',
  description: 'Give your theme a front page!',
  group: 'Setting up',
  updates_on_complete: {
    'The config file': 3,
    'Layouts': 2,
    'Includes': 2,
    'Sass': 2,
  },
}).with_callback(async () => {
  await mutant.hushed.say("Now that you've installed Jekyll...");
  await mutant.grinning.say("...it's time to give your Jekyll theme a front page!");
  await mutant.thinking.say("In the next section, you'll use *HTML* and *CSS* to start building your theme.");
  await mutant.thinking.say('However, when other people use your theme, they create pages using a language called *Markdown*.');
  await mutant.hushed.say("So, it's important that you learn about it, too!");
  await mutant.repeatable({
    question: async () => await mutant.hushed.say('Does all of this make sense?'),
    response: async () => await mutant.grinning.say('Excellent!'),
    callback: async () => {
      await mutant.slight_smile.say('Markdown is known for its simplicity.', { image: 'markdown_paragraph', image_width: 400 });
      await mutant.grinning.say("In fact, you don't need any extra symbols to write most of the content on a page!");
      await mutant.slight_smile.say('However, there are a few symbols that you need to know about.');
      await mutant.thinking.say('You can make text *bold* by adding two asterisks on either side...', { image: 'markdown_bold' });
      await mutant.thinking.say('...and make text _italic_ by adding one asterisk on either side.', { image: 'markdown_italic' });
      await mutant.hand_over_mouth_open_eyes.say("Headings can be added to a page using up to 6 *#*'s before a line of text...", { image: 'markdown_headings', image_width: 200 });
      await mutant.slight_smile.say('...and links to other pages can be added by combining parentheses and square brackets.', { image: 'markdown_link', image_width: 400 });
      await mutant.hushed.say("Finally, there's the *front matter block*.", { image: 'empty_front_matter_block', image_width: 200 });
      await mutant.hushed.say('You can see one of these in the *index.md* file in your codespace.');
      await mutant.thinking.say('The front matter block is completely unique to Jekyll, and allows you to _configure_ a page.');
      // TODO: update image to say "layout: default"?
      await mutant.thinking.say("For example, if you wanted to set a page's title or layout, you'd do it here.", { image: 'front_matter_block' });
    },
  });
  await mutant.thinking.say("I'd like you to update the *index.md* file in your codespace.");
  await mutant.grinning.say("This is the file that Jekyll will show as the front page of your whole theme!")
  await mutant.grinning.say('So, you should update this file with information about it.');
  await mutant.slight_smile.say("Whether you're making something light, dark, or space-themed...");
  await mutant.grinning.say('...the *index.md* file is where you need to tell that to the world!');
  await mutant.slight_smile.say('This is what that file looks like now.', { image: 'tonic_starter_index' });
  await mutant.grinning.say("Let me show you an example of what I'd like you to do to it!")
  await mutant.slight_smile.say('First, update it to use the name of your theme, instead of *tonic-starter*.', { image: 'tonic_starter_index_2' });
  await mutant.slight_smile.say('Then, add a sentence or two describing what your theme is going to look like.', { image: 'tonic_starter_index_3', image_width: 400 });
  await mutant.grinning.say('Finally, add the line *title: Home* inside the front matter block!', { image: 'tonic_starter_index_4' });
  await mutant.slight_smile.say("This line won't have any effect for now, but it will be important in a little bit.");
  await mutant.grinning.say("Let me know when you're done, and I'll show you how to commit your changes!", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  await mutant.thinking.say('Do you see this icon on the left side of the codespace?', { image: 'source_control_icon', image_width: 50 });
  await mutant.thinking.say("It's the icon for *Source Control*...");
  await mutant.grinning.say('...and it allows you to upload the changes you make to your theme!');
  await mutant.grinning.say('If you click on it, you should see something like this.', { image: 'source_control', image_width: 400 });
  await mutant.hushed.say("You'll want to write a short message describing the changes you made...", { image: 'source_control_with_message' });
  await mutant.grinning.say('Then, click *"Commit"*!');
  await mutant.thinking.say("The first time you do this, you'll get a warning about staged changes.", { image: 'no_staged_changes' });
  await mutant.thinking.say('The easiest thing to do is just click *"Always"*.');
  await mutant.hand_over_mouth_open_eyes.say('That way, every time you click *"Commit"*...');
  await mutant.hand_over_mouth.say("it'll add *all* of the changes that you made automatically.");
  await mutant.thinking.say('Finally, the *"Commit"* button will be replaced with *"Sync Changes"*.', { image: 'sync_changes' });
  await mutant.hand_over_mouth_open_eyes.say("Click on it, and you'll get another warning.", { image: 'pull_and_push' });
  await mutant.slight_smile.say("This time, click *\"OK, Don't Show Again\"*.");
  await mutant.slight_smile.say('Now, your commit is pushed...', { image: null });
  await mutant.grinning.say('...and anybody will be able to see the changes you made in the history!');
  await mutant.slight_smile.say("Let me know when your commit is pushed, and I'll ask you for the link to it.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Fantastic!'),
  });
  await mutant.thinking.say('If you look towards the bottom half of the screen...', { image: 'source_control_graph' });
  await mutant.thinking.say("...you'll see a section labeled *\"Graph\"*.");
  await mutant.grinning.say('Right-click on your new commit, then click *"Open on GitHub"* to get the link to it!');
  await mutant.hushed.say('Find it?', { image: null });
  await mutant.hushed.choice1({
    option_a: 'I found it',
    callback_a: async () => await mutant.grinning.say('Wonderful!'),
  });
  await mutant.thinking.say('What is the link to the commit you made?');
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.slight_smile.say('Great work getting that uploaded.');
  await mutant.grinning.say("I'll trust that you're ready to push commits on your own from now on!");
  await mutant.hushed.say('I wonder what happens next?');
})

export default your_first_page;