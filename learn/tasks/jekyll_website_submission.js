import Task from "../Task.js";
import { mutant, hide_image, show_image } from "../script.js";

const jekyll_website_submission = new Task({
  name: "Submit to Jekyll.rb",
  description: "Add your theme to the official Jekyll website and get a hat!",
  group: "Going further",
  state: 3, // Always unlocked
  updates_on_complete: {},
}).with_callback(async () => {
  mutant.emote = "slight_smile";
  await mutant.grinning.say("Ready for the ultimate Jekyll challenge?");
  await mutant.starry_eyes.say(
    "You can submit your theme to the *official Jekyll website*!"
  );
  await mutant.thinking.say(
    "This is completely optional, but if you get it approved..."
  );
  await mutant.grinning.say("...you'll get a special *hat* as a reward!");
  await mutant.hand_over_mouth_open_eyes.say(
    "To do this, you'll need to make a pull request to the main Jekyll codebase."
  );
  await mutant.thinking.say(
    "Head over to *^https://github.com/jekyll/jekyll$https://github.com/jekyll/jekyll^* and fork the repository."
  );
  await mutant.slight_smile.say(
    "Then, you'll need to add your theme to the themes showcase on *^jekyllrb.com$https://jekyllrb.com^*."
  );
  await mutant.thinking.say(
    "Look for the themes section in their documentation or website files."
  );
  await mutant.hand_over_mouth.say(
    "Your pull request should include your theme's name, description, and a link to your repository."
  );
  await mutant.grinning.say(
    "Make sure your theme follows Jekyll's best practices and has good documentation!"
  );
  await mutant.hushed.say(
    "This is a real contribution to the Jekyll community - pretty exciting, right?"
  );
  await mutant.hushed.choice2({
    option_a: "I'm ready to try!",
    option_b: "Maybe later",
    callback_a: async () => await mutant.grinning.say("That's the spirit!"),
    callback_b: async () =>
      await mutant.slight_smile.say(
        "No worries - you can always come back to this!"
      ),
  });
  await mutant.thinking.say("Here's what your pull request should include:");
  await mutant.thinking.say("1. Add your theme to the appropriate themes list");
  await mutant.thinking.say(
    "2. Include a clear description of what makes your theme special"
  );
  await mutant.thinking.say(
    "3. Make sure all links work and point to your live theme"
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "The Jekyll maintainers will review your submission..."
  );
  await mutant.grinning.say(
    "...and if they approve it, your theme will be featured on the official Jekyll website!"
  );
  await mutant.starry_eyes.say(
    "Plus, you'll get that special hat as recognition for contributing to the Jekyll ecosystem!"
  );
  await mutant.slight_smile.say(
    "Ready to make your mark on the Jekyll community?",
    { image: null }
  );
  await mutant.slight_smile.choice1({
    option_a: "Let's do this!",
    callback_a: async () =>
      await mutant.grin.say("Excellent! Go make that pull request!"),
  });
  await mutant.thinking.say(
    "Once you've made your pull request and are ready to claim your hat..."
  );
  await mutant.grinning.say("Come back here when you're all done!");
  await mutant.starry_eyes.say(
    "Ready to submit your project and get your hat?"
  );
  await mutant.starry_eyes.choice2({
    option_a: "All done! Get my hat!",
    option_b: "Still working on it",
    callback_a: async () => {
      await mutant.grin.say("Fantastic! Time to claim your reward!");
      await mutant.thinking.say(
        "Head over to our submission form to get your hat!"
      );
      await mutant.grinning.say(
        "Just fill out the form with your project details and PR link: *^Submit for Hat$https://forms.fillout.com/t/your-form-id^*"
      );
      await mutant.smile_with_tear.say(
        "You've built a Jekyll theme *and* contributed it to the community - that's amazing!"
      );
      await mutant.slight_smile.say(
        "Thank you for being part of the Jekyll ecosystem!",
        { image: null }
      );
    },
    callback_b: async () =>
      await mutant.slight_smile.say(
        "No worries! Take your time and come back when you're ready!"
      ),
  });
});

export default jekyll_website_submission;
