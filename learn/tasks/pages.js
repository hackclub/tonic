import Task from '../Task.js';
import { mutant, show_code, hide_code, hide_image } from '../script.js';

const github_pages = new Task({
  name: 'GitHub Pages',
  description: "Host it for free!",
  group: 'Going further',
  requires_group: 'Theme structure',
}).with_callback(async () => {
  mutant.emote = 'slight_smile';
  await mutant.thinking.say("After making this beautiful theme, you may want to show it to the world");
  await mutant.starry_eyes.say("To get millions and millions of downloads");
  await mutant.grinning.say("The best way to showcase a theme is with a demo!");

  await mutant.exhausted.say("But you don't want to let Jekyll run 24/7 just to show it");
  await mutant.sunglasses_face.say("That's where GitHub Pages comes to save you");
  await mutant.smile_hearts.say("It lets you host a static website on their domain for free");

  await mutant.hushed.say("The thing is that you don't have control over how it will look on the user's end");
  await mutant.hushed.say("Because they have a ^whitelist$https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#themes^ for what we can use")
  await mutant.relaxed.say("But don't worry, GitHub also has a wonderful tool called...");
  await mutant.heart_eyes.say("... Workflows!");
  await mutant.grinning.say("Instead of letting GitHub build our site, we'll do it ourself");

  await mutant.grinning.say("First, we'll need to create a file named 'jekyll.yml' inside '.github/workflows' that you also need to make");
  await mutant.slight_smile.choice1({
    option_a: 'All done',
    callback_a: async () => await mutant.grinning.say('Great!'),
  });

  await mutant.thinking.say("Now, let's write our workflow")
  show_code(`name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1.263.0
        with:
          ruby-version: '3.4'
          bundler-cache: true
          cache-version: 0

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "\${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`);
  await mutant.slight_smile.choice1({
    option_a: 'I did it',
    callback_a: async () => await mutant.smile_hearts.say('Lovely!'),
  });
  hide_code();
  
  await mutant.thinking.say('Can you commit your changes and give me the link?');
  await mutant.thinking.text_entry({
    placeholder: 'github.com/x/y/commit/...',
    exp: /^(https:\/\/)?github.com\/[\w-]+\/[\w-]+\/commit\/[0-9a-f]{40}$/gm,
    callback: async () => await mutant.grinning.say('Looks good to me!'),
  });

  await mutant.yawn.say("We now build our site ourselves without GitHub restrictions ⛓️‍💥");
  await mutant.grin.say("We just need to tell GitHub to use our workflow, which is even easier");

  await mutant.grinning.say("Just go back to your GitHub repository and straight to Settings", { image: 'github_pages_workflow', image_width: 400 });
  await mutant.grinning.say("In the Pages section, just change 'Deploy from a branch' to 'GitHub Actions'", { image: 'github_pages_workflow', image_width: 400 });
  await mutant.sunglasses_face.say("After waiting a bit for your site to deploy...");
  await mutant.sunglasses_face.say("You can go to https://username.github.io/repo and see your beautiful site");

  await mutant.slight_smile.choice1({
    option_a: 'I see it!',
    callback_a: async () => await mutant.smile_hearts.say('Beautiful!'),
  });
  hide_image();
})

export default github_pages;
