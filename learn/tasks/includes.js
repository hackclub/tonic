import Task from '../Task.js';
import { mutant, hide_image, show_image, hide_code, show_code } from '../script.js';

const includes = new Task({
  name: 'Includes',
  description: "Move parts of your theme into their own files.",
  group: 'Theme structure',
  updates_on_complete: {
    'Sass': 3,
  }
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.grinning.say('In the last task, I showed you how to add a basic layout to your Jekyll theme using HTML.');
  await mutant.hand_over_mouth_open_eyes.say('As you add more features, however, that layout will become more difficult to manage.');
  await mutant.thinking.say("Let's say you wanted to add some navigation to your theme, like in sporeball's theme *lifeblood*.", { image: 'lifeblood_navigation' });
  await mutant.thinking.say("Wouldn't it be nice if you could split things up and keep all the navigation code in its own file?");
  await mutant.thinking.say("That way, the main layout file could stay nice and clean.");
  await mutant.grinning.say('Luckily, Jekyll has a feature called *includes* that allows you to do exactly that!');
  await mutant.thinking.say("All of your theme's includes live in a folder called *@_includes*.", { image: 'includes_folder', image_width: 200 });
  await mutant.hand_over_mouth_open_eyes.say('Similar to layouts, you create an include by adding a *.html* file to this folder...');
  await mutant.hand_over_mouth_open_eyes.say('...and you can have as many of them as you want.')
  await mutant.hand_over_mouth.say("This time, however, the files don't have to be full pages!");
  await mutant.slight_smile.say("Let's open your codespace and create the *@_includes* folder now.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Fantastic!'),
  });
  await mutant.hushed.say("We're going to make an include for the HTML *head* tag.", { image: null });
  await mutant.thinking.say('Rather than containing content you can see, like the *body* tag...');
  await mutant.thinking.say("...the *head* tag allows you to _configure_ a page using settings you can't always see.");
  await mutant.grinning.say("It's sort of like HTML's version of the @_config.yml file!");
  await mutant.slight_smile.say("Let's create a file inside the @_includes folder called *head.html*.");
  show_code(
`<head>
  <title>{{ page.title }} | {{ site.title }}</title>
  
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>`
  );
  await mutant.thinking.say("Here's the code I'd like you to put inside of it.");
  await mutant.thinking.say('The first line inside the head tag uses some keywords from Liquid to fill in the page title...');
  await mutant.hand_over_mouth_open_eyes.say('...and the next two lines contain some settings that are used on almost every website.');
  await mutant.thinking.say("In particular, the last line will help your Jekyll theme look good on both desktop and mobile devices.");
  await mutant.grinning.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  show_code(`{% include head.html %}`);
  await mutant.thinking.say('Next, open *default.html* in the *@_layouts* folder, and add this code on a new line above the *body* tag.');
  await mutant.grinning.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  hide_code();
  await mutant.hand_over_mouth_open_eyes.say("Now, when you run *jekyll serve*, the page will still look the same...", { image: 'my_theme', image_width: 400 });
  await mutant.hand_over_mouth.say('...but the title of the page will change, to match what we put in the include!', { image: 'title', image_width: 200 });
  await mutant.thinking.say('Can you commit your changes and give me the link?', { image: null });
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.slight_smile.say("Let's move on.");
})

export default includes;