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
  await mutant.thinking.say("You'll want to click the *+* at the top right, and select *\"New repository\"*.", { image: 'new_repository' });
  await mutant.slight_smile.say("Make sure that _you're the owner_, then give the repository a _fun name_.", { image: 'repository_name' });
  await mutant.hushed.say("Don't just call it *\"my-theme\"*, like I've done here!");
  await mutant.thinking.say('Next, make sure the repository is set to *Public*...', { image: 'repository_settings' });
  await mutant.thinking.say('...and *"Add a README file"* is checked.');
  await mutant.grinning.say("We'll update this file later on!");
  await mutant.slight_smile.say('Finally, click *"Create repository"*.', { image: 'create_repository', image_width: 200 });
  await mutant.grinning.say("Come back here when you're done and I'll ask you for the repository link!", { image: null });
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
  await mutant.hand_over_mouth_open_eyes.say("The way I'll have you push commits depends on how _experienced_ you are.");
  await mutant.thinking.say("I'd like to ask you...");
  await mutant.thinking.say('Do you already know how to use GitHub from a *terminal*?');
  await mutant.thinking.choice2({
    option_a: 'Yes, I do',
    option_b: "No, I don't",
    callback_a: async () => await mutant.grinning.say('Amazing!'),
    callback_b: async () => {
      await mutant.grinning.say("That's okay! There's another option.");
      await mutant.grinning.say("I'm going to have you download a tool called *GitHub Desktop*!");
      await mutant.thinking.say('After you install it, all you need to do is *sign in* with your GitHub account...', { image: 'github_desktop_sign_in', image_width: 200 });
      await mutant.thinking.say('...and *clone* the repository that we just made.', { image: 'github_desktop_clone', image_width: 400 });
      await mutant.grinning.say('Then, after you make changes, you *commit them* at the bottom left!', { image: 'github_desktop_commit' });
      await mutant.slight_smile.say("Let's download ^GitHub Desktop$https://github.com/apps/desktop^ now.", { image: null });
      await mutant.slight_smile.choice1({
        option_a: 'I did it',
        callback_a: async () => await mutant.grinning.say('Wonderful!'),
      });
    }
  });
  await mutant.slight_smile.say("I'll trust that you're ready to push commits to your repository on your own.");
  await mutant.grinning.say("Let's move on to the next task!");
})

export default github_setup;