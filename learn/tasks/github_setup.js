import Task from '../Task.js';
import { mutant, hide_image, show_image } from '../script.js';

const github_setup = new Task({
  name: 'GitHub setup',
  description: 'Use GitHub to store the code for your theme!',
  group: 'Setting up',
  updates_on_complete: {
    'Jekyll setup': 3,
  },
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.say('Before I can teach you how to build a Jekyll theme...');
  await mutant.grinning.say("...we'll need a place for your Jekyll theme to live!");
  await mutant.hushed.say("We're going to use a website called *GitHub* for this.");
  await mutant.thinking.say('Have you heard of *GitHub* before?');
  await mutant.thinking.choice2({
    option_a: 'Yes, I have',
    option_b: "No, I haven't",
    callback_a: async () => await mutant.grinning.say('Amazing!'),
    callback_b: async () => await mutant.grinning.say("That's okay!"),
  });
  await mutant.thinking.say('You really only need to remember two things about GitHub.', { image: 'manufacturetocat' });
  await mutant.hand_over_mouth_open_eyes.say('First, it lets you _share_ your code with others...');
  await mutant.grinning.say("...and second, it lets you keep track of all the _changes_ you've made to your code over time!");
  await mutant.slight_smile.say('Also, using GitHub will make it really easy for people to use your Jekyll theme on their site.');
  await mutant.thinking.say('As you work on your tasks, I might ask you to open another page or add some code to your theme.', { image: null });
  await mutant.hushed.say('When you do that, *remember not to close this page.*');
  await mutant.smile_with_tear.say('Otherwise, you might have to start the whole task over again!');
  await mutant.grinning.say('Sound good?');
  await mutant.slight_smile.choice1({
    option_a: 'I think so',
    callback_a: async () => await mutant.grinning.say('Fantastic!'),
  });
  await mutant.thinking.say('Do you already have a GitHub account?');
  await mutant.thinking.choice2({
    option_a: 'Yes, I do',
    option_b: "No, I don't",
    callback_a: async () => await mutant.slight_smile.say("In that case, let's go to ^GitHub$https://github.com^ and *sign in*."),
    callback_b: async () => await mutant.grinning.say("In that case, let's go to ^GitHub$https://github.com^ and *sign up*!")
  });
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  await mutant.slight_smile.say("We're going to create a *new repository* to store your Jekyll theme in.")
  await mutant.thinking.say("We'll be using a _template repository_ called *tonic-starter* as a baseline.", { image: 'tonic_starter', image_width: 300 });
  await mutant.slight_smile.say("Let's visit the ^tonic-starter$https://github.com/hackclub/tonic-starter^ repository now.");
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  })
  await mutant.thinking.say('Now, click *"Use this template"*, then click *"Create a new repository"*.', { image: 'use_this_template' });
  await mutant.slight_smile.say("Make sure that _you're the owner_, then give your new repository a _fun name_.", { image: 'repository_name' });
  await mutant.hushed.say("Don't just call it *\"my-theme\"*, like I've done here!");
  await mutant.thinking.say('Make sure the repository is set to *Public* so anyone can see it...', { image: 'repository_visibility', image_width: 400 });
  await mutant.grinning.say('Then, click *"Create repository"*!', { image: 'create_repository', image_width: 200 });
  await mutant.slight_smile.say("Come back here when you're done and I'll ask you for the repository link.", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Excellent!'),
  });
  await mutant.thinking.say('What is the link to your GitHub repository?');
  await mutant.thinking.text_entry({
    placeholder: 'github.com/username/theme-name',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });
  await mutant.slight_smile.say('Great work getting that online.');
  await mutant.grinning.say('Just one more thing before we move on!');
  await mutant.thinking.say('Each time you upload changes to GitHub, your repository gains one *commit*.');
  await mutant.thinking.say("I'm going to have you *regularly push commits* to the repository you just made...");
  await mutant.thinking.say('...and give me *direct links* to them afterwards.');
  await mutant.hushed.say('That means no uploading your entire theme all at once at the end!');
  await mutant.grinning.say("To accomplish this, I'd like to have you create a *codespace*.");
  await mutant.slight_smile.say('This is a feature provided by GitHub that lets you develop your theme completely online.');
  await mutant.hand_over_mouth_open_eyes.say("If you know what you're doing, it's possible to push commits without one...");
  await mutant.grinning.say('However, I *strongly recommend* that you set one up!');
  await mutant.slight_smile.say("It'll make installing Jekyll and other required tools *much easier*.");
  await mutant.hushed.say("If you aren't allowed to download things on your computer, it might even be your only option!");
  await mutant.grinning.say("So, how do you create a codespace?");
  await mutant.thinking.say("You'll want to go to your repository and click *\"Code\"*.", { image: 'code_button', image_width: 200 });
  await mutant.thinking.say('Click *"Codespaces"*, then click *"Create codespace on main"*.', { image: 'create_codespace_on_main', image_width: 400 });
  await mutant.grinning.say('This will open a fresh codespace in a new tab!');
  await mutant.slight_smile.say("It'll take a couple of minutes to set itself up for the first time...");
  await mutant.grinning.say("...but as soon as you see something like this, that means it's all done!", { image: 'shell_prompt' });
  // TODO: use the same link that the user provided in text entry
  await mutant.slight_smile.say("Let's go to your repository and create a codespace now.", { image: null });
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.grinning.say('Wonderful!'),
  });
  await mutant.slight_smile.say("I'll show you how to push a commit from your codespace during the next task.");
  await mutant.grinning.say('Speaking of which...');
})

export default github_setup;