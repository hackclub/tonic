import Task from "../Task.js";
import { mutant, hide_image, show_image } from "../script.js";

const the_readme_file = new Task({
  name: "The README file",
  description: "Add more information to your GitHub repository!",
  group: "Show the world",
  requires_group: "Going further",
  updates_on_complete: {
    Gems: 3,
  },
}).with_callback(async () => {
  await mutant.grinning.say(
    "You've come so far in building your Jekyll theme!"
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "At this point, you probably want to share it with the world..."
  );
  await mutant.hushed.say(
    "*But how will people know what your theme is about?*"
  );
  await mutant.slight_smile.say("That's where a great README file comes in!");
  await mutant.thinking.say(
    "Right now, your GitHub repository probably has a pretty basic README.md file."
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "But we can make it so much better..."
  );
  await mutant.hand_over_mouth.say(
    "...by adding information that helps people understand and use your theme!"
  );
  await mutant.thinking.say(
    "A good README should tell people what your theme does, how to install it, and how to use it."
  );
  await mutant.grinning.say("Let's think about what to include!");
  await mutant.thinking.say(
    "Your README should have a clear *title*, a *description* of what makes your theme special..."
  );
  await mutant.thinking.say(
    "...a *features* list showing off what you've built..."
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "...and *installation instructions* so people can actually use it!"
  );
  await mutant.slight_smile.say(
    "You should also mention that you built this theme as part of *Tonic*!"
  );
  await mutant.thinking.say(
    "Add a link to *tonic.hackclub.com* so people can learn about this awesome event."
  );
  await mutant.thinking.say(
    "Maybe something like: 'Built with ❤️ using Tonic (tonic.hackclub.com) - a Hack Club event for learning Jekyll!'"
  );
  await mutant.hushed.say("Does this sound like a good plan?", { image: null });
  await mutant.hushed.choice1({
    option_a: "Absolutely!",
    callback_a: async () => await mutant.grinning.say("Fantastic!"),
  });
  await mutant.hand_over_mouth_open_eyes.say(
    "Now, go ahead and update your README.md file with all this information."
  );
  await mutant.hushed.say(
    "Make it personal! Tell people what inspired your theme and what makes it unique."
  );
  await mutant.hushed.say(
    "Include screenshots if you can - people love to see what they're getting!"
  );
  await mutant.grinning.say(
    "Don't forget to commit your changes when you're done!"
  );
  await mutant.slight_smile.say(
    "Let me know when you've updated your README, and I'll ask you for the commit link.",
    { image: null }
  );
  await mutant.slight_smile.choice1({
    option_a: "All done",
    callback_a: async () => await mutant.grinning.say("Amazing work!"),
  });
  await mutant.thinking.say("What is the link to the commit you made?");
  await mutant.thinking.text_entry({
    placeholder: "github.com/x/y/commit/...",
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/,
    callback: async () => await mutant.grinning.say("Looks perfect!"),
  });
  await mutant.hand_over_mouth_open_eyes.say(
    "Here are some pro tips for making your README even better!"
  );
  await mutant.thinking.say(
    "First, use *badges* to show things like license type, gem version, or build status."
  );
  await mutant.thinking.say(
    "You can create these easily with services like shields.io!"
  );
  await mutant.grinning.say(
    "Second, organize your content with clear headings and sections."
  );
  await mutant.thinking.say(
    "People should be able to quickly find installation instructions, usage examples, and contribution guidelines."
  );
  await mutant.grinning.say(
    "Third, don't forget to include a license section!"
  );
  await mutant.slight_smile.say(
    "Most Jekyll themes use the MIT license, which is very permissive."
  );
  await mutant.thinking.say(
    "Finally, consider adding a *Contributing* section to welcome other developers."
  );
  await mutant.thinking.say(
    "You never know - someone might want to help improve your theme!"
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "And remember to keep that Tonic reference in there..."
  );
  await mutant.hand_over_mouth.say(
    "...so people can discover this amazing way to learn Jekyll too!"
  );
  await mutant.slight_smile.say(
    "Your theme is looking more professional already!",
    { image: null }
  );
});

export default the_readme_file;
