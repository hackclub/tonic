import Task from '../Task.js';
import { mutant, hide_image, show_image, show_code, hide_code } from '../script.js';

const hackatime_setup = new Task({
  name: 'Hackatime setup',
  description: 'Use Hackatime to track time spent working on your theme!',
  group: 'Setting up',
  updates_on_complete: {
    'Jekyll setup': 3,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.hand_over_mouth_open_eyes.say("Now that you've set up the Tonic starter and created a codespace...");
  await mutant.grinning.say("...there's something that I'd like you to install inside it!");
  await mutant.hushed.say('I want to have you track the *amount of time* you spend working on your theme...');
  await mutant.thinking.say("...by setting up a tool called *Hackatime*.");
  await mutant.slight_smile.say("It doesn't really matter if you spend more or less time than others...");
  await mutant.grinning.say("I'm happy to help, no matter how much time you need!");
  await mutant.hand_over_mouth_open_eyes.say("I just want to make sure we're doing good work together...");
  await mutant.hand_over_mouth.say('...and your amount of time spent is one piece of that puzzle.');
  await mutant.hushed.say('Does that sound okay?');
  await mutant.hushed.choice1({
    option_a: 'Sure thing',
    callback_a: async () => await mutant.grin.say('Wonderful!'),
  });
  await mutant.thinking.say('*Hackatime* has to connect to a tool called *WakaTime* in order to do any time tracking.');
  await mutant.thinking.say("To set it up in your codespace, you'll need to install the *WakaTime extension*.");
  await mutant.thinking.say('First, open your codespace and click on this icon on the left side.', { image: 'extensions_icon', image_width: 50 });
  await mutant.hushed.say('Then, search for *"WakaTime"*, and click *"Install"* on the top result.', { image: 'wakatime_extension', image_width: 300 });
  await mutant.thinking.say("When you do this, you'll get a warning asking if you trust the publisher.", { image: 'trust_publisher', image_width: 400 });
  await mutant.thinking.say('Click *"Trust Publisher & Install"* to install the extension!');
  await mutant.grinning.say("Let me know when you've completed these steps.", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Fantastic!'),
  });
  await mutant.hushed.say('Now, we need to connect the WakaTime extension to *Hackatime*.');
  await mutant.slight_smile.say("Let's go to ^Hackatime$https://hackatime.hackclub.com/^ and *sign in with Slack*.");
  await mutant.thinking.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  await mutant.thinking.say("You'll want to click *Settings*, on the left side of the screen...", { image: 'hackatime_settings', image_width: 200 });
  await mutant.thinking.say('...then click *Set up time tracking*, under _Time tracking wizard_.', { image: 'time_tracking_wizard', image_width: 400 });
  await mutant.thinking.say('Then, click on *Advanced/Custom Setup*.', { image: 'advanced_custom_setup', image_width: 200 });
  await mutant.hushed.say("Here, you'll be able find your *API key*.", { image: 'api_key', image_width: 400 });
  await mutant.grinning.say('This string lets WakaTime know who you are!');
  await mutant.hand_over_mouth_open_eyes.say('Copy *just the API key* from here (everything after *api@_key =*)...', { image: 'api_key_highlighted' });
  await mutant.grinning.say("Then, we'll head back to your codespace to paste it.");
  await mutant.thinking.say('Press *Control+Shift+P* or *Command+Shift+P*, then search for *"API Key"* and press *Enter*.', { image: 'command_palette_api_key' });
  await mutant.thinking.say('Then, paste your API key in the box that appears, and press *Enter* again.', { image: 'api_key_input' });
  await mutant.grinning.say("Let me know when you've completed these steps.", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Great!'),
  });
  await mutant.hushed.say("Now, the WakaTime extension knows whose time to track, but not where to send it!");
  await mutant.grinning.say('To fix this, the last thing we need to do is provide an *API URL*.');
  await mutant.thinking.say('Go back to your codespace, and press *Control+Shift+P* or *Command+Shift+P* again...', { image: 'command_palette_api_url' });
  await mutant.thinking.say('...but this time, search for *"API URL*" and press *Enter*.');
  show_code('https://hackatime.hackclub.com/api/hackatime/v1');
  await mutant.thinking.say("This is the URL you need to provide.", { image: null });
  await mutant.grinning.say("It's a link that goes directly to the Hackatime servers!");
  await mutant.slight_smile.say('As before, paste it in the box, then press *Enter*.');
  await mutant.grinning.say("Let me know when you've completed these steps.")
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  hide_code();
  await mutant.hand_over_mouth_open_eyes.say('That was a lot of ground to cover...');
  await mutant.grinning.say('But we made it through!');
  await mutant.slight_smile.say('If all goes well, you should start to see a time on the bottom of the screen as you work.', { image: '30m', image_width: 100 });
  await mutant.slight_smile.say("I'm going to trust that you were able to do this - I won't ask you for a link this time.", { image: null });
  await mutant.hand_over_mouth_open_eyes.say('I just need you to promise me that you did it all...');
  await mutant.hand_over_mouth_open_eyes.text_entry({
    placeholder: 'I promise!',
    exp: /^I promise!$/gm,
    callback: async () => await mutant.grinning.say('Perfect!'),
  });
  await mutant.slight_smile.say("Let's move on.");
})

export default hackatime_setup;