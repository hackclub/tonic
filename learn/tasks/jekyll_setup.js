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
  await mutant.hand_over_mouth_open_eyes.say('Admittedly, Jekyll can be a little tricky to set up.');
  await mutant.sweat_smile.say("There are a few things you'll need to download before we can continue!");
  await mutant.slight_smile.say("Don't worry, though - I have a script that can help.");
  await mutant.hushed.say('I have one question for you...');
  await mutant.thinking.say('What kind of computer do you have?');
  await mutant.thinking.choice2({
    option_a: 'Windows',
    option_b: 'macOS or Linux',
    callback_a: async () => {
      await mutant.thinking.say('In that case, I have a *PowerShell script* for you to run.');
      await mutant.thinking.say("It'll do most of the hard work for you...");
      await mutant.grinning.say('...and give you a simple baseline to build your theme on top of!');
      await mutant.hushed.say("You'll just need to download *Ruby* before you can run it.");
      await mutant.hand_over_mouth_open_eyes.say('Could you go to ^RubyInstaller$https://rubyinstaller.org^ and download the *Ruby+Devkit 3.3.7-1 (x64)* file?');
      await mutant.hand_over_mouth_open_eyes.choice1({
        option_a: 'I did it',
        callback_a: async () => await mutant.grinning.say('Great!'),
      });
      await mutant.thinking.say("You'll want to open it, and accept RubyInstaller's license.", { image: 'rubyinstaller_license', image_width: 200 });
      await mutant.thinking.say('Then, have it install Ruby to the _default folder_...', { image: 'rubyinstaller_destination', image_width: 400 });
      await mutant.thinking.say('...and make sure to check *both boxes*.');
      await mutant.hand_over_mouth_open_eyes.say('After that, make sure *all* of the additional components are checked...', { image: 'rubyinstaller_components' });
      await mutant.grinning.say('...and click *Next* to install Ruby!');
      await mutant.hushed.say('At the end, make sure you check the box *"Run \'ridk install\'"*.', { image: 'rubyinstaller_ridk' });
      await mutant.grinning.say('This will open one more window - just press *Enter* on it, and wait for it to finish!');
      await mutant.hand_over_mouth_open_eyes.say("I'll leave you to it now...", { image: null });
      await mutant.hand_over_mouth_open_eyes.choice1({
        option_a: 'All done',
        callback_a: async () => await mutant.grinning.say('Fantastic!'),
      });
      await mutant.slight_smile.say("Now you'll be able to run the *PowerShell script* I mentioned.");
      await mutant.thinking.say('You need to run the script from the *same folder* that you *cloned your theme* into.');
      await mutant.thinking.say('You can open PowerShell in that folder if you go there in File Explorer...');
      await mutant.thinking.say('...hold *Shift*, and then *right-click*.');
      await mutant.thinking.say('Find it?');
      await mutant.thinking.choice1({
        option_a: 'I found it',
        callback_a: async () => await mutant.grinning.say('Excellent!'),
      });
      show_code(
`iwr -UseBasicParsing ${window.location.origin}/scripts/tonic-setup.ps1 | iex`
      );
      await mutant.hand_over_mouth_open_eyes.say('Could you run this PowerShell command?');
      await mutant.slight_smile.say("It'll pull a script called *tonic-setup.ps1* from the Internet and run it afterwards.");
      await mutant.grinning.say("The script will install Jekyll, ask you a few questions, and then set up your theme!");
      await mutant.grinning.say("Come back here when it finishes, and I'll show you what to do next!");
      await mutant.hand_over_mouth_open_eyes.choice1({
        option_a: 'All done',
        callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
      });
    },
    callback_b: async () => {},
  });
  hide_code(); 
})

export default jekyll_setup;