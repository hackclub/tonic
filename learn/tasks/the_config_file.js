import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

// TODO: whenever you change the _config.yml file, you will need to fully restart the Jekyll server

const the_config_file = new Task({
  name: 'The config file',
  description: 'Apply settings to your entire theme.',
  group: 'Theme structure',
  requires_group: 'Setting up',
  updates_on_complete: {
    'Layouts': 3,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.grinning.say("So, you've created a codespace and set up Jekyll inside of it.");
  await mutant.hand_over_mouth_open_eyes.say("At this point, you're probably wondering something...");
  await mutant.hushed.say('*How is a Jekyll theme actually built?*')
  await mutant.slight_smile.say("This is the section of the task list where we'll find out.");
  await mutant.thinking.say('The Tonic starter is purposely missing several key parts of a complete Jekyll theme.');
  await mutant.hand_over_mouth_open_eyes.say("Before I teach you how to add them, however...");
  await mutant.hand_over_mouth.say("I should teach you about the one key part that's already there!");
  await mutant.thinking.say("In your codespace, there's a file called *@_config.yml*.", { image: 'config_yml', image_width: 200 });
  await mutant.thinking.say('Jekyll uses this file to apply settings to your entire theme.');
  await mutant.grinning.say("Let's look inside!");
  await mutant.thinking.say('The Tonic starter config includes four keys: *title*, *description*, *encoding*, and *exclude*.', { image: 'config_yml_contents', image_width: 400 });
  await mutant.thinking.say('*title* and *description* are self-explanatory.');
  await mutant.hand_over_mouth_open_eyes.say('*encoding* should always be set to *utf-8*.');
  await mutant.slight_smile.say('Finally, *exclude* takes a list of files which should not be included when the site is served.');
  await mutant.thinking.say("If you look in the *@_site* folder, you'll notice that the only file inside is *index.html*.", { image: 'site_contents', image_width: 200 });
  await mutant.thinking.say('That means when you bring it online with *jekyll serve*, none of the other files will be accessible.');
  await mutant.hushed.say('Does all of this make sense?', { image: null });
  await mutant.hushed.choice1({
    option_a: 'I think so',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  await mutant.hand_over_mouth_open_eyes.say("There's something wrong with your @_config.yml file right now.", { image: 'config_yml_contents', image_width: 400 });
  await mutant.hushed.say('The title still says *"tonic-starter"*, and the description is empty!');
  await mutant.hushed.say("Let's update the @_config.yml file to use your theme's name, and add a short description inside the quotes.");
  await mutant.grinning.say('Remember to commit your changes, too!');
  await mutant.slight_smile.say("Let me know when you've done that, and I'll ask you for the link.", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Wonderful!'),
  });
  await mutant.thinking.say('What is the link to the commit you made?');
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.hand_over_mouth_open_eyes.say('Before we move on, there are two more important things you should keep in mind.');
  await mutant.grinning.say('First, you can add your own options to the @_config.yml file!');
  await mutant.thinking.say('For example, you might want to add an option to allow people to use a dark mode provided by your theme.', { image: 'enable_dark_theme' });
  await mutant.grinning.say("This is not part of Jekyll by default - you'd have to write the code to make this happen yourself!")
  await mutant.slight_smile.say("I'll show you how to do that later on.");
  await mutant.thinking.say('Second, any option in the @_config.yml file can be *overwritten* by a site that uses it.', { image: 'footer', image_width: 400 });
  await mutant.thinking.say('For example, look at this *footer* option from the *nimmoi* theme, by sporeball.');
  await mutant.hand_over_mouth_open_eyes.say("On nimmoi's website, the footer links to _sporeball_'s website, since she's the one who made it...");
  await mutant.hand_over_mouth.say('...but if you wanted to use nimmoi on your own site, you could use your own @_config.yml file to change it.');
  await mutant.slight_smile.say("Let's move on.", { image: null });
})

export default the_config_file;