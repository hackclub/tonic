import Task from '../Task.js';
import { mutant, hide_image, show_image, show_code, hide_code } from '../script.js';

const jekyll_setup = new Task({
  name: 'Jekyll setup',
  description: 'Set up Jekyll so you can start building your theme!',
  group: 'Setting up',
  updates_on_complete: {
    'Your first page': 3
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.grinning.say('This task will be an easy one!');
  await mutant.hand_over_mouth_open_eyes.say("Now that you've set up the Tonic starter and created a codespace...");
  await mutant.grinning.say('...the last thing we need to do before we begin is install *Jekyll*!');
  await mutant.thinking.say('Jekyll is based on a programming language called *Ruby*.', { image: 'ruby-logo-2x', image_width: 125 });
  await mutant.thinking.say("If you wanted to work on your theme offline, you'd have to install Ruby yourself first...");
  await mutant.hushed.say('...which can be a little tricky!');
  await mutant.grinning.say('Luckily, your codespace already has it installed!');
  await mutant.slight_smile.say("Let's go to your codespace now.", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'I have it open',
    callback_a: async () => await mutant.grinning.say('Great!'),
  })
  await mutant.slight_smile.say("To install Jekyll, we'll need to run a couple of commands in your codespace's *terminal*.");
  await mutant.thinking.say("All you need to do is click on the *Terminal* tab in your codespace...", { image: 'terminal_tab', image_width: 400 });
  show_code(`sudo gem install bundler jekyll`);
  await mutant.thinking.say('...type in this command, and press *Enter*.', { image: null });
  await mutant.thinking.say('This will install both *Jekyll* and a tool called *Bundler* which is needed by the codespace.');
  await mutant.thinking.say("After a minute or two, you'll see a line that reads _\"Successfully installed jekyll-4.4.1\".");
  await mutant.grinning.say('That means Jekyll is ready to use!');
  await mutant.slight_smile.say("Let me know when this command is done.");
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Wonderful!'),
  });
  show_code(`bundle exec jekyll serve`);
  await mutant.thinking.say('To see what the Tonic starter looks like, type in this command.');
  await mutant.grinning.say("This is the command you'll use every time you want to see your theme in action!");
  await mutant.slight_smile.say("Let me know when this command is done.");
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  hide_code();
  await mutant.relaxed.say("If you're crafty, you'll have seen this popup in the bottom right corner.", { image: 'application_is_available' });
  await mutant.hand_over_mouth_open_eyes.say("If you missed that, there's another way to see what the popup is talking about.");
  await mutant.thinking.say('Click on the *Ports* tab, and find the port labeled *4000*.', { image: 'ports_tab' });
  await mutant.thinking.say('Right-click on the *forwarded address*, then choose *Open in Browser*.', { image: 'forwarded_address' });
  await mutant.grinning.say('The end result should be...', { image: 'tonic_starter', sleep_ms: 1500 });
  await mutant.grimace.say("Well, that's not very exciting, is it?");
  await mutant.grinning.say("Don't worry, though - in a little while I'll teach you how to make it look amazing!");
  await mutant.slight_smile.say("I'm going to trust that you were able to do this - I won't ask you for any links this time.", { image: null });
  await mutant.hand_over_mouth_open_eyes.say("However, I'm going to ask you for one in the next task, so be prepared.");
  await mutant.grinning.say("Let's move on!");
})

export default jekyll_setup;