import Task from '../Task.js';
import { mutant, hide_image, show_image, show_code, hide_code } from '../script.js';

const sass = new Task({
  name: 'Sass',
  description: "Make your theme look a little nicer!",
  group: 'Theme structure',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.hushed.say("This task is a difficult one, but I promise it'll be worth it!");
  await mutant.thinking.say("You've probably noticed that your theme looks a little... plain.", { image: 'my_theme', image_width: 400 });
  await mutant.hand_over_mouth_open_eyes.say("Every other website out there has a style that makes it unique...");
  await mutant.hushed.say('But right now, your theme has no style at all!');
  await mutant.grinning.say("This is the task where you'll learn to change that.");
  await mutant.thinking.say('The language that styles are made of is called *CSS*.', { image: 'css', image_width: 200 });
  await mutant.thinking.say('CSS uses _style rules_ to determine how a webpage should look.', { image: 'css_rule' });
  await mutant.thinking.say('Each style rule has a _selector_ and some _properties_...');
  await mutant.grinning.say('...and if you build up enough of them, you can make your website look however you want!');
  await mutant.hand_over_mouth_open_eyes.say('Jekyll supports CSS out of the box, of course...', { image: null });
  await mutant.hushed.say('...but it also supports another language called *Sass*.');
  await mutant.thinking.say('*Sass* describes itself as a _"CSS extension language"_.', { image: 'sass' });
  await mutant.thinking.say("It adds a few features on top of CSS to improve the code you're able to write.");
  await mutant.grinning.say("So, I'm going to teach you how to use Sass for your Jekyll theme instead!");
  await mutant.slight_smile.say("Don't worry - if you know CSS already, it's not too big of a change.");
  await mutant.thinking.say("All of your theme's Sass code lives in a folder called *@_sass*.", { image: null });
  await mutant.hand_over_mouth.say("This is the last main folder you'll create that starts with an underscore!");
  await mutant.slight_smile.say("Let's open your codespace and create the *@_sass* folder now.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  await mutant.thinking.say("Each *.scss* file in the @_sass folder is understood to be a single *partial*.");
  await mutant.thinking.say("That means they each contain _one part_ of the styles for your site.")
  await mutant.thinking.say('For example, you could have one partial for basic styles, one for text, and one for other elements.');
  await mutant.slight_smile.say("Let's add a file to the @_sass folder called *base.scss*.");
  show_code(
`body {
  background-color: #fff;
  font-family: sans-serif;
  margin: auto;
  max-width: 70ch;
  color: #000;
}`
  );
  await mutant.thinking.say("Here's the code I'd like you to put inside of it.");
  await mutant.thinking.say('This is a single CSS rule that changes five properties on the *body* tag.');
  await mutant.hand_over_mouth_open_eyes.say('The first two properties set a background color and a nicer font for the body...');
  await mutant.hand_over_mouth.say('...and the next two provide a simple way to center the contents of the page.');
  await mutant.grinning.say('Finally, the last property sets a text color for the body.');
  await mutant.slight_smile.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  hide_code();
  await mutant.thinking.say("To tell Jekyll to apply this style rule, we'll need to make changes in two more places.");
  await mutant.thinking.say('First, we need to create another *.scss* file to _import_ the partial.');
  await mutant.slight_smile.say("Let's make a new folder called *assets*.");
  await mutant.slight_smile.say("Inside, create a new *.scss* file with the _same name as your theme._", { image: 'my_theme_scss' });
  show_code(
`---
---

@import "base.scss";`
  );
  await mutant.thinking.say("This is the code I'd like you to put inside that file.", { image: null });
  await mutant.thinking.say('All it does is import the partial that we added to the *@_sass* folder.');
  await mutant.slight_smile.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Fantastic!'),
  });
  hide_code();
  await mutant.hand_over_mouth_open_eyes.say('From now on, you might see an error coming from this new file.', { image: 'scss_error', image_width: 400 });
  await mutant.hushed.say("Don't worry - this error can be safely ignored!");
  await mutant.slight_smile.say("Because the file has a front matter block inside, Jekyll will know what to do with it.");
  await mutant.grinning.say('Lastly, we need to tell Jekyll to actually use the styles that we added!');
  await mutant.slight_smile.say("Let's go to the *head.html* file in the *@_includes* folder...");
  await mutant.slight_smile.say('...and add a *link* tag inside the *head* tag.');
  show_code(
`<link rel="stylesheet" href="{{ 'assets/my-theme.scss' | relative_url }}">`
  );
  await mutant.thinking.say("Here's an example of what that tag should look like.", { image: null });
  await mutant.thinking.say('It uses some Liquid keywords in the *href* to make sure Jekyll uses the right file location.');
  await mutant.hushed.say("Be careful - you'll need to change the *\"my-theme.scss\"* part to match what you named your file!");
  await mutant.grinning.say("Let me know when you've added one of these tags.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Great!'),
  });
  hide_code();
  await mutant.grinning.say('Now, if you run *jekyll serve*, you should see something like this!', { image: 'styled_index_md', image_width: 400 });
  await mutant.slight_smile.say("Doesn't that look a lot nicer?");
  await mutant.hand_over_mouth_open_eyes.say("There's only one problem that I can see...");
  await mutant.hushed.say('The colors are still the same!');
  await mutant.slight_smile.say("I'd like you to go back to the *base.scss* file in the *@_sass* folder and change the colors.");
  await mutant.hand_over_mouth_open_eyes.say('For each color code, if you click on the square next to it...', { image: 'background_color' });
  await mutant.grinning.say("...it'll open up a _color picker!_", { image: 'color_picker' });
  await mutant.hushed.say("Pick whichever colors you want - just make sure you can still read the text!");
  await mutant.slight_smile.say("Let me know when you've changed both of the colors.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Amazing!'),
  });

  await mutant.starry_eyes.say("Going forward, the example theme I'll be showing you will be pink!", { image: 'pink_index_md' });
  await mutant.thinking.say('Can you commit all of your changes and give me the link?', { image: null });
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.hand_over_mouth_open_eyes.say("At this point, I'm going to let you move on, but there's a catch...");
  await mutant.hushed.say("Now that you know the basics of Sass, I'd like to see you do some more with it.");
  await mutant.shush.say("Later on, you'll be able to access a *gallery* of all the themes that users have made here.");
  await mutant.hushed.say('Adding some styles of your own will help your theme stand out from all the others!');
  await mutant.thinking.say('Maybe you could add a subtle _background image_ to the *body*...');
  await mutant.thinking.say('...or replace the solid color with a _gradient_.')
  await mutant.hand_over_mouth_open_eyes.say('You could use a site like *Google Fonts* to find a more exciting font than _sans-serif_...');
  await mutant.hand_over_mouth.say('...or add variables in a *:root* rule to provide a dark theme for users who prefer it.');
  await mutant.thinking.say('If you already have a website, maybe you could make your theme look like that instead?');
  await mutant.grinning.say('Or you could do all of these things and more!');
  await mutant.slight_smile.say("The point is to go further, _do some research_, and make something you're *really proud of.*")
  await mutant.grinning.say('The choice is yours. This step is optional, but *highly recommended!*');
  await mutant.slight_smile.say('Just remember to keep pushing commits to your repository as you work.', { sleep_ms: 1500 });
  await mutant.slight_smile.say("I wonder what happens next?");
})

export default sass;
