import Task from '../Task.js';
import { mutant, hide_image, show_image, hide_code, show_code } from '../script.js';

const layouts = new Task({
  name: 'Layouts',
  description: 'Decide how each page should be structured.',
  group: 'Theme structure',
  updates_on_complete: {
    'Includes': 3,
  }
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.grinning.say('Earlier, I mentioned that you would be using *HTML* to create your theme.');
  await mutant.hushed.say('But what is it, and what is it actually used for?');
  await mutant.thinking.say('*HTML* is the language that websites are made of.', { image: 'html5', image_width: 150 });
  await mutant.grinning.say('If you think of a website like a building, then HTML is like the foundation!');
  await mutant.slight_smile.say("It may not look that pretty, but you can't build your site without it.");
  await mutant.thinking.say('HTML uses _tags_ to place content on a webpage.', { image: 'html_p', image_width: 400 });
  await mutant.thinking.say('Each tag has an opening part, some content, and a closing part.');
  await mutant.hand_over_mouth_open_eyes.say('Tags are allowed to contain other tags, like this...', { image: 'html_body' });
  await mutant.grinning.say('...and if you build up enough of them, you get a complete page!', { image: 'html' })
  await mutant.thinking.say('When you write individual pages using *Markdown*, like I showed you earlier...', { image: null });
  await mutant.thinking.say('Jekyll has to convert them into HTML before it can show you the contents of the page.');
  await mutant.slight_smile.say("In order to tell Jekyll how to make that conversion, you use what's called a *layout*!");
  await mutant.thinking.say("All of your theme's layouts live in a folder called *@_layouts*.", { image: 'layouts_folder', image_width: 200 });
  await mutant.hushed.say("The Tonic starter doesn't include this folder, so you'll have to create it yourself.")
  await mutant.thinking.say('You can create a new folder in your codespace by right-clicking underneath *tonic-starter.gemspec*...');
  await mutant.thinking.say('...then clicking *"New Folder..."*.');
  await mutant.slight_smile.say("Let's open your codespace and create the *@_layouts* folder now.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  await mutant.slight_smile.say('Creating a layout is as simple as adding a *.html* file to the @_layouts folder.', { image: null });
  await mutant.hand_over_mouth_open_eyes.say("To allow for different types of content, your theme can have as many layouts as you want.");
  await mutant.slight_smile.say("For now, though, let's right-click on the @_layouts folder and create just one file called *default.html*.");
  show_code(
`<html>
  <body>

  </body>
</html>`
  );
  await mutant.thinking.say("Here's the code I'd like you to put inside of it.");
  await mutant.thinking.say('This creates an HTML page with nothing in it except a *body* to hold the contents.');
  await mutant.grinning.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Fantastic!'),
  });
  hide_code();
  await mutant.hushed.say('But wait... how do we actually add our content?');
  show_code('{{ content }}');
  await mutant.slight_smile.say("There's a special keyword for that: *{{ content }}*.");
  await mutant.hand_over_mouth_open_eyes.say("This comes from a language called *Liquid*, which you'll learn about later.");
  await mutant.grinning.say('Add it inside the *body* tag, and Jekyll will fill in the content for each page automatically!');
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  hide_code();
  await mutant.slight_smile.say("I'll show you how to expand upon this layout in a little while.");
  await mutant.grinning.say("For now, let's use it on your theme's front page!");
  show_code('layout: default');
  await mutant.slight_smile.say('All you need to do is open *index.md* and add this line inside the front matter block.');
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grin.say('Wonderful!'),
  });
  hide_code();
  await mutant.hand_over_mouth_open_eyes.say('After all of these changes, your theme will still look exactly the same.');
  await mutant.grinning.say("However, these changes will be helpful to us later on!");
  await mutant.thinking.say('Can you commit your changes and give me the link?');
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.slight_smile.say("Let's move on.");
})

export default layouts;