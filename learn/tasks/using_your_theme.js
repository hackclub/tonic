import Task from "../Task.js";
import { mutant, hide_image, show_image } from "../script.js";

const using_your_theme = new Task({
  name: "Submit your theme!",
  description: "Submit your theme and get a free sticker sheet!",
  group: "Show the world",
}).with_callback(async () => {
  mutant.emote = "slight_smile";
});

export default using_your_theme;
