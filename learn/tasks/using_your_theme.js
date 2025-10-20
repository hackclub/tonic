import Task from "../Task.js";
import { mutant, hide_image, show_image } from "../script.js";

const using_your_theme = new Task({
  name: "Submit your theme!",
  description: "Submit your theme and get a free sticker sheet!",
  group: "Show the world",
}).with_callback(async () => {
  mutant.emote = "slight_smile";
  await mutant.grinning.say(
    "Congratulations! You've built an amazing Jekyll theme!"
  );
  await mutant.starry_eyes.say(
    "Now it's time to show it to the world and get your free sticker sheet!"
  );
  await mutant.thinking.say(
    "You've learned so much about Jekyll - from basic setup to advanced features like Sass and layouts."
  );
  await mutant.hand_over_mouth_open_eyes.say(
    "Your theme is a real accomplishment that you should be proud of!"
  );
  await mutant.grinning.say(
    "Ready to submit your theme and claim your sticker sheet?"
  );
  await mutant.grinning.choice2({
    option_a: "Yes! Get my stickers!",
    option_b: "Let me review my theme first",
    callback_a: async () => {
      await mutant.starry_eyes.say("Excellent! Time to get your reward!");
      await mutant.thinking.say(
        "Head over to our submission form to claim your sticker sheet!"
      );
      await mutant.grinning.say(
        "Just fill out the form with your theme details: *^Submit Theme & Get Stickers$https://forms.fillout.com/t/tonic-theme-submission^*"
      );
      await mutant.smile_with_tear.say(
        "Thank you for participating in Tonic and building such a great Jekyll theme!"
      );
      await mutant.slight_smile.say(
        "I hope you enjoyed learning Jekyll with me!",
        { image: null }
      );
    },
    callback_b: async () => {
      await mutant.slight_smile.say(
        "Good idea! Take your time to make sure everything is perfect."
      );
      await mutant.thinking.say(
        "Make sure your README is complete, your theme works well, and you're proud of what you've built!"
      );
      await mutant.grinning.say(
        "Come back when you're ready to submit - your stickers will be waiting!"
      );
    },
  });
});

export default using_your_theme;
