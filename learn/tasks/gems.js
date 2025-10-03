import Task from "../Task.js";
import { mutant, hide_image, show_image } from "../script.js";

const gems = new Task({
  name: "Gems",
  description: "Use RubyGems to publish your Jekyll theme!",
  group: "Show the world",
  updates_on_complete: {
    "Submit your theme!": 3,
  },
}).with_callback(async () => {
  mutant.emote = "slight_smile";
  await mutant.grinning.say(
    "So, you've built an amazing Jekyll theme and shared it on GitHub."
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "But at this point, you're probably wondering something..."
  );
  await mutant.hushed.say(
    "*How do I make it easy for others to actually use my theme?*"
  );
  await mutant.slight_smile.say("This is where RubyGems comes to the rescue!");
  await mutant.thinking.say(
    "RubyGems is the package manager for Ruby, and Jekyll themes can be published as gems."
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "Instead of making people download and copy files..."
  );
  await mutant.grinning.say(
    "They can just add one line to their Gemfile and run *bundle install*!"
  );
  await mutant.thinking.say(
    "To publish your theme as a gem, you'll need a *@.gemspec* file in your repository root."
  );
  await mutant.thinking.say(
    "This file tells RubyGems everything it needs to know about your theme."
  );
  await mutant.grinning.say("Let's create one!");
  await mutant.thinking.say(
    "A basic gemspec includes your theme name, version, description, author info, and which files to include."
  );
  await mutant.thinking.say(
    "The most important parts are the *files* list and the *add_runtime_dependency* for Jekyll."
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "Make sure to exclude development files like *.git*, *node_modules*, and any build artifacts!"
  );
  await mutant.slight_smile.say(
    "You should also set a proper *homepage* URL pointing to your GitHub repository."
  );
  await mutant.thinking.say(
    "Once you have your gemspec file ready, there's one more step..."
  );
  await mutant.hushed.say("Does this all make sense so far?", { image: null });
  await mutant.hushed.choice1({
    option_a: "I think so",
    callback_a: async () => await mutant.grinning.say("Excellent!"),
  });
  await mutant.hand_over_mouth_open_eyes.say(
    "Now you need to create an account on *rubygems.org* and get your API key."
  );
  await mutant.thinking.say(
    "Once you have that, you can build and push your gem with just two commands:"
  );
  await mutant.thinking.say(
    "*gem build your-theme-name.gemspec* and *gem push your-theme-name-*.gem*"
  );
  await mutant.grinning.say(
    "Let's set up your gemspec file and publish your first version!"
  );
  await mutant.slight_smile.say(
    "Create a *.gemspec* file for your theme, then let me know when you've done that.",
    { image: null }
  );
  await mutant.slight_smile.choice1({
    option_a: "All done",
    callback_a: async () => await mutant.grinning.say("Wonderful!"),
  });
  await mutant.thinking.say(
    "What is the link to the commit where you added your gemspec file?"
  );
  await mutant.thinking.text_entry({
    placeholder: "github.com/x/y/commit/...",
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say("Looks good to me!"),
  });
  await mutant.hand_over_mouth_open_eyes.say(
    "Before we wrap up, here are three important tips for gem publishing:"
  );
  await mutant.thinking.say(
    "First, always test your gem locally before publishing by running *gem build* and *gem install* with the generated *.gem* file."
  );
  await mutant.thinking.say(
    "Second, use semantic versioning - start with *0.1.0* and increment appropriately for bug fixes, features, and breaking changes."
  );
  await mutant.grinning.say(
    "Third, consider adding a *_sass* folder and proper file organization to make your gem more professional!"
  );
  await mutant.thinking.say(
    "Remember, once your gem is published, people can install your theme by adding it to their Gemfile:",
    { image: null }
  );
  await mutant.thinking.say('*gem "your-theme-name"* - just like that!');
  await mutant.hand_over_mouth_open_eyes.say(
    "They'll also need to update their *@_config.yml* to set *theme: your-theme-name*..."
  );
  await mutant.hand_over_mouth.say(
    "...and then run *bundle install* to get everything set up automatically."
  );
  await mutant.slight_smile.say(
    "Congratulations - you're now ready to share your theme with the world!",
    { image: null }
  );
});

export default gems;
