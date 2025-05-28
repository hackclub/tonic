import Task from '../Task.js';
import { mutant, hide_image, show_image, show_code, hide_code } from '../script.js';

// can't use a number :)
const four_oh_four = new Task({
  name: '404',
  description: "Let people know when a page is missing.",
  group: 'Going further',
  requires_tasks: ['The config file', 'Layouts', 'Includes', 'Sass'],
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.grinning.say('This task will be another easy one!');
  await mutant.slight_smile.say("So far, I've showed you how to add all kinds of content to your Jekyll theme.");
  await mutant.hushed.say("But with all the pages you might add, what happens if somebody lands on a page that isn't there?");
  await mutant.thinking.say('It depends on where your theme is being served from...');
  await mutant.hushed.say("...but in your codespace, you'll see something like this!", { image: 'not_found', image_width: 200 });
  await mutant.thinking.say("The result has no styles, so it won't leave a very good impression.");
  await mutant.grinning.say("Lucky for us, we have a way to make it better!");
  await mutant.thinking.say("When you go to a page that isn't there, the error you get has an internal code of *404*.", { image: null });
  await mutant.hushed.say("If you add a page called *404.md* at the top level of your site...");
  await mutant.grinning.say('...then Jekyll will show that page instead!');
  await mutant.slight_smile.say("Let's go to your codespace and create a *404.md* file now.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Great!'),
  });
  show_code(
`---
title: 404
layout: default
---`
  );
  await mutant.grinning.say("First, we'll add this front matter block at the top of the file.");
  await mutant.hand_over_mouth_open_eyes.say("This page will use the same layout as all the other pages we've made so far...");
  await mutant.slight_smile.say('...but the contents will be a little different.');
  await mutant.grinning.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  show_code(
`Sorry, we couldn't find that page.

You can go back to the <a href="{{ '/' | absolute_url }}">home page</a> if you wish.`
  );
  await mutant.grinning.say("Next, we'll add this code underneath the front matter block.");
  await mutant.hushed.say("Once again, it uses some *Liquid* code, this time to produce a link to your theme's front page.");
  await mutant.grinning.say("Let me know when you've added this code.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Amazing!'),
  });
  hide_code();
  await mutant.hand_over_mouth_open_eyes.say("Now, if you go to a page that isn't there, it should look something like this!", { image: 'pretty_not_found', image_width: 400 });
  await mutant.grinning.say("Doesn't that look a lot nicer?");
  await mutant.hushed.say("But wait - what happened to the apostrophe in \"couldn't\"?");
  await mutant.thinking.say('In your *@_config.yml* file, we told Jekyll to use an encoding of *utf-8*.', { image: null });
  await mutant.thinking.say('This is supposed to overwrite the default encoding, which is *ISO-8859-1*.');
  await mutant.hushed.say('However, in this one specific case, GitHub ignores our wishes!');
  await mutant.hushed.say("That's why the apostrophe changes.")
  await mutant.sweat_smile.say("You'll just have to trust me when I say that this is supposed to happen!");
  await mutant.slight_smile.say("Later on, once your theme makes it out of your codespace, this won't happen anymore.");
  await mutant.thinking.say('Now, can you commit your changes and give me the link?');
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.slight_smile.say("Let's move on.");
})

export default four_oh_four;