# Learn to build a Jekyll theme

Hello! I'm thrilled to guide you through building your very own Jekyll theme. Together, we'll create something beautiful that you can share with others and use for your own projects.

## Setting up

Let's start with the basics: setting up your environment and getting Jekyll running.

### GitHub setup

Before I can teach you how to build a Jekyll theme, we'll need a place for your Jekyll theme to live! We're going to use a website called *GitHub* for this.

Have you heard of *GitHub* before?

You really only need to remember two things about GitHub. First, it lets you _share_ your code with others, and second, it lets you keep track of all the _changes_ you've made to your code over time! Also, using GitHub will make it really easy for people to use your Jekyll theme on their site.

As you work on your tasks, I might ask you to open another page or add some code to your theme. When you do that, *remember not to close this page.* Otherwise, you might have to start the whole task over again!

Do you already have a GitHub account? If you do, let's go to [GitHub](https://github.com) and *sign in*. If you don't, let's go to [GitHub](https://github.com) and *sign up*!

We're going to create a *new repository* to store your Jekyll theme in. We'll be using a _template repository_ called *tonic-starter* as a baseline. Let's visit the [tonic-starter](https://github.com/hackclub/tonic-starter) repository now.

Now, click *"Use this template"*, then click *"Create a new repository"*. Make sure that _you're the owner_, then give your new repository a _fun name_. Don't just call it *"my-theme"*!

Make sure the repository is set to *Public* so anyone can see it, then, click *"Create repository"*! Come back here when you're done and I'll ask you for the repository link.

Great work getting that online. Just one more thing before we move on!

Each time you upload changes to GitHub, your repository gains one *commit*. I'm going to have you *regularly push commits* to the repository you just made and give me *direct links* to them afterwards. That means no uploading your entire theme all at once at the end!

To accomplish this, I'd like to have you create a *codespace*. This is a feature provided by GitHub that lets you develop your theme completely online. If you know what you're doing, it's possible to push commits without one, however, I *strongly recommend* that you set one up! It'll make installing Jekyll and other required tools *much easier*. If you aren't allowed to download things on your computer, it might even be your only option!

So, how do you create a codespace? You'll want to go to your repository and click *"Code"*. Click *"Codespaces"*, then click *"Create codespace on main"*. This will open a fresh codespace in a new tab! It'll take a couple of minutes to set itself up for the first time, but as soon as you see something like a command prompt, that means it's all done!

Let's go to your repository and create a codespace now.

I'll show you how to push a commit from your codespace in a little while. Let's move on to the next task!

### Hackatime setup

Now that you've set up the Tonic starter and created a codespace, there's something that I'd like you to install inside it! I want to have you track the *amount of time* you spend working on your theme by setting up a tool called *Hackatime*.

It doesn't really matter if you spend more or less time than others, I'm happy to help, no matter how much time you need! I just want to make sure we're doing good work together, and your amount of time spent is one piece of that puzzle. Does that sound okay?

*Hackatime* has to connect to a tool called *WakaTime* in order to do any time tracking. To set it up in your codespace, you'll need to install the *WakaTime extension*.

First, open your codespace and click on the extensions icon on the left side. Then, search for *"WakaTime"*, and click *"Install"* on the top result. When you do this, you'll get a warning asking if you trust the publisher. Click *"Trust Publisher & Install"* to install the extension!

Let me know when you've completed these steps.

Now, we need to connect the WakaTime extension to *Hackatime*. Let's go to [Hackatime](https://hackatime.hackclub.com/) and *sign in with Slack*.

You'll want to click *Settings*, on the left side of the screen, then click *Set up time tracking*, under _Time tracking wizard_. Then, click on *Advanced/Custom Setup*. Here, you'll be able find your *API key*. This string lets WakaTime know who you are!

Copy *just the API key* from here (everything after *api@_key =*), then, we'll head back to your codespace to paste it. Press *Control+Shift+P* or *Command+Shift+P*, then search for *"API Key"* and press *Enter*. Then, paste your API key in the box that appears, and press *Enter* again.

Now, the WakaTime extension knows whose time to track, but not where to send it! To fix this, the last thing we need to do is provide an *API URL*. Go back to your codespace, and press *Control+Shift+P* or *Command+Shift+P* again, but this time, search for *"API URL*" and press *Enter*.

This is the URL you need to provide:
```
https://hackatime.hackclub.com/api/hackatime/v1
```

As before, paste it in the box, then press *Enter*.

That was a lot of ground to cover, but we made it through! If all goes well, you should start to see a time on the bottom of the screen as you work. I'm going to trust that you were able to do this - I won't ask you for a link this time. I just need you to promise me that you did it all...

Let's move on.

### Jekyll setup

This task will be an easy one! Now that you've set up the Tonic starter and created a codespace, the last thing we need to do before we begin is install *Jekyll*!

Jekyll is based on a programming language called *Ruby*. If you wanted to work on your theme offline, you'd have to install Ruby yourself first, which can be a little tricky! Luckily, your codespace already has it installed!

Let's go to your codespace now.

To install Jekyll, we'll need to run a couple of commands in your codespace's *terminal*. All you need to do is click on the *Terminal* tab in your codespace, type in this command, and press *Enter*:

```
sudo gem install bundler jekyll
```

This will install both *Jekyll* and a tool called *Bundler* which is needed by the codespace. After a minute or two, you'll see a line that reads _"Successfully installed jekyll-4.4.1"_. That means Jekyll is ready to use!

To see what the Tonic starter looks like, type in this command:

```
bundle exec jekyll serve --watch
```

This is the command you'll use every time you want to see your theme in action! The *--watch* flag will allow you to see your changes every time you refresh the page.

If you're crafty, you'll have seen a popup in the bottom right corner. If you missed that, there's another way to see what the popup is talking about. Click on the *Ports* tab, and find the port labeled *4000*. Right-click on the *forwarded address*, then choose *Open in Browser*.

The end result should be... Well, that's not very exciting, is it? Don't worry, though - in a little while I'll teach you how to make it look amazing!

Again, I'm going to trust that you were able to do this. I just need you to promise me that you did it...

Let's move on!

### Your first page

Now that you've installed Jekyll, it's time to give your Jekyll theme a front page! In the next section, you'll use *HTML* and *CSS* to start building your theme. However, when other people use your theme, they create pages using a language called *Markdown*. So, it's important that you learn about it, too!

Markdown is known for its simplicity. In fact, you don't need any extra symbols to write most of the content on a page! However, there are a few symbols that you need to know about.

You can make text *bold* by adding two asterisks on either side, and make text _italic_ by adding one asterisk on either side. Headings can be added to a page using up to 6 *#*'s before a line of text, and links to other pages can be added by combining parentheses and square brackets.

Finally, there's the *front matter block*. You can see one of these in the *index.md* file in your codespace. The front matter block is completely unique to Jekyll, and allows you to _configure_ a page. For example, if you wanted to set a page's title or layout, you'd do it here.

I'd like you to update the *index.md* file in your codespace. This is the file that Jekyll will show as the front page of your whole theme! So, you should update this file with information about it. Whether you're making something light, dark, or space-themed, the *index.md* file is where you need to tell that to the world!

This is what that file looks like now. Let me show you an example of what I'd like you to do to it! First, update it to use the name of your theme, instead of *tonic-starter*. Then, add a sentence or two describing what your theme is going to look like. Finally, add the line *title: Home* inside the front matter block! This line won't have any effect for now, but it will be important in a little bit.

Let me know when you're done, and I'll show you how to commit your changes!

Do you see this icon on the left side of the codespace? It's the icon for *Source Control*, and it allows you to upload the changes you make to your theme! If you click on it, you should see something like a list of changes. You'll want to write a short message describing the changes you made, then, click *"Commit"*!

The first time you do this, you'll get a warning about staged changes. The easiest thing to do is just click *"Always"*. That way, every time you click *"Commit"*, it'll add *all* of the changes that you made automatically.

Finally, the *"Commit"* button will be replaced with *"Sync Changes"*. Click on it, and you'll get another warning. This time, click *"OK, Don't Show Again"*.

Now, your commit is pushed, and anybody will be able to see the changes you made in the history! Let me know when your commit is pushed, and I'll ask you for the link to it.

If you look towards the bottom half of the screen, you'll see a section labeled *"Graph"*. Right-click on your new commit, then click *"Open on GitHub"* to get the link to it!

Great work getting that uploaded. I'll trust that you're ready to push commits on your own from now on! I wonder what happens next?

## Theme structure

Now let's build the core structure of your Jekyll theme. This is where it really starts to take shape!

### The config file

So, you've created a codespace and set up Jekyll inside of it. At this point, you're probably wondering something... *How is a Jekyll theme actually built?* This is the section of the task list where we'll find out.

The Tonic starter is purposely missing several key parts of a complete Jekyll theme. Before I teach you how to add them, however, I should teach you about the one key part that's already there!

In your codespace, there's a file called *_config.yml*. Jekyll uses this file to apply settings to your entire theme. Let's look inside!

The Tonic starter config includes four keys: *title*, *description*, *encoding*, and *exclude*. *title* and *description* are self-explanatory. *encoding* should always be set to *utf-8*. Finally, *exclude* takes a list of files which should not be included when the site is served.

If you look in the *_site* folder, you'll notice that the only file inside is *index.html*. That means when you bring it online with *jekyll serve*, none of the other files will be accessible.

Does all of this make sense?

There's something wrong with your _config.yml file right now. The title still says *"tonic-starter"*, and the description is empty! Let's update the _config.yml file to use your theme's name, and add a short description inside the quotes. Remember to commit your changes, too!

Let me know when you've done that, and I'll ask you for the link.

Before we move on, there are three more important things you should keep in mind. First, every time you change the _config.yml file, you'll have to *fully restart Jekyll* to see the changes. That means pressing *Control+C* in the terminal and running *bundle exec jekyll serve --watch* again.

Second, you can add your own options to the _config.yml file! For example, you might want to add an option to allow people to use a dark mode provided by your theme. This is not part of Jekyll by default - you'd have to write the code to make this happen yourself! I'll show you how to do that later on.

Lastly, any option in the _config.yml file can be *overwritten* by a site that uses it. For example, look at this *footer* option from the *nimmoi* theme, by sporeball. On nimmoi's website, the footer links to _sporeball_'s website, since she's the one who made it, but if you wanted to use nimmoi on your own site, you could use your own _config.yml file to change it.

Let's move on.

### Layouts

Earlier, I mentioned that you would be using *HTML* to create your theme. But what is it, and what is it actually used for?

*HTML* is the language that websites are made of. If you think of a website like a building, then HTML is like the foundation! It may not look that pretty, but you can't build your site without it.

HTML uses _tags_ to place content on a webpage. Each tag has an opening part, some content, and a closing part. Tags are allowed to contain other tags, like this, and if you build up enough of them, you get a complete page!

When you write individual pages using *Markdown*, like I showed you earlier, Jekyll has to convert them into HTML before it can show you the contents of the page. In order to tell Jekyll how to make that conversion, you use what's called a *layout*!

All of your theme's layouts live in a folder called *_layouts*. The Tonic starter doesn't include this folder, so you'll have to create it yourself. You can create a new folder in your codespace by right-clicking underneath *tonic-starter.gemspec*, then clicking *"New Folder..."*.

Let's open your codespace and create the *_layouts* folder now.

Creating a layout is as simple as adding a *.html* file to the _layouts folder. To allow for different types of content, your theme can have as many layouts as you want. For now, though, let's right-click on the _layouts folder and create just one file called *default.html*.

Here's the code I'd like you to put inside of it:

```html
<html>
  <body>

  </body>
</html>
```

This creates an HTML page with nothing in it except a *body* to hold the contents. Let me know when you've added this code.

But wait... how do we actually add our content? There's a special keyword for that: *{{ content }}*. This comes from a language called *Liquid*, which you'll learn about later. Add it inside the *body* tag, and Jekyll will fill in the content for each page automatically!

I'll show you how to expand upon this layout in a little while. For now, let's use it on your theme's front page! All you need to do is open *index.md* and add this line inside the front matter block:

```
layout: default
```

After all of these changes, your theme will still look exactly the same. However, these changes will be helpful to us later on! Can you commit your changes and give me the link?

Let's move on.

### Includes

In the last task, I showed you how to add a basic layout to your Jekyll theme using HTML. As you add more features, however, that layout will become more difficult to manage.

Let's say you wanted to add some navigation to your theme, like in sporeball's theme *lifeblood*. Wouldn't it be nice if you could split things up and keep all the navigation code in its own file? That way, the main layout file could stay nice and clean.

Luckily, Jekyll has a feature called *includes* that allows you to do exactly that! All of your theme's includes live in a folder called *_includes*. Similar to layouts, you create an include by adding a *.html* file to this folder, and you can have as many of them as you want. This time, however, the files don't have to be full pages!

Let's open your codespace and create the *_includes* folder now.

We're going to make an include for the HTML *head* tag. Rather than containing content you can see, like the *body* tag, the *head* tag allows you to _configure_ a page using settings you can't always see. It's sort of like HTML's version of the _config.yml file!

Let's create a file inside the _includes folder called *head.html*. Here's the code I'd like you to put inside of it:

```html
<head>
  <title>{{ page.title }} | {{ site.title }}</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

The first line inside the head tag uses some keywords from Liquid to fill in the page title, and the next two lines contain some settings that are used on almost every website. In particular, the last line will help your Jekyll theme look good on both desktop and mobile devices.

Let me know when you've added this code.

Next, open *default.html* in the *_layouts* folder, and add this code on a new line above the *body* tag:

```
{% include head.html %}
```

Let me know when you've added this code.

Now, when you run *jekyll serve*, the page will still look the same, but the title of the page will change, to match what we put in the include!

Can you commit your changes and give me the link?

Let's move on.

### Sass

This task is a difficult one, but I promise it'll be worth it! You've probably noticed that your theme looks a little... plain. Every other website out there has a style that makes it unique, but right now, your theme has no style at all! This is the task where you'll learn to change that.

The language that styles are made of is called *CSS*. CSS uses _style rules_ to determine how a webpage should look. Each style rule has a _selector_ and some _properties_, and if you build up enough of them, you can make your website look however you want!

Jekyll supports CSS out of the box, of course, but it also supports another language called *Sass*. *Sass* describes itself as a _"CSS extension language"_. It adds a few features on top of CSS to improve the code you're able to write. So, I'm going to teach you how to use Sass for your Jekyll theme instead! Don't worry - if you know CSS already, it's not too big of a change.

All of your theme's Sass code lives in a folder called *_sass*. This is the last main folder you'll create that starts with an underscore! Let's open your codespace and create the *_sass* folder now.

Each *.scss* file in the _sass folder is understood to be a single *partial*. That means they each contain _one part_ of the styles for your site. For example, you could have one partial for basic styles, one for text, and one for other elements.

Let's add a file to the _sass folder called *base.scss*. Here's the code I'd like you to put inside of it:

```scss
body {
  background-color: #fff;
  font-family: sans-serif;
  margin: auto;
  max-width: 70ch;
  color: #000;
}
```

This is a single CSS rule that changes five properties on the *body* tag. The first two properties set a background color and a nicer font for the body, and the next two provide a simple way to center the contents of the page. Finally, the last property sets a text color for the body.

Let me know when you've added this code.

To tell Jekyll to apply this style rule, we'll need to make changes in two more places. First, we need to create another *.scss* file to _import_ the partial. Let's make a new folder called *assets*. Inside, create a new *.scss* file with the _same name as your theme._

This is the code I'd like you to put inside that file:

```scss
---
---

@import "base.scss";
```

All it does is import the partial that we added to the *_sass* folder. Let me know when you've added this code.

From now on, you might see an error coming from this new file. Don't worry - this error can be safely ignored! Because the file has a front matter block inside, Jekyll will know what to do with it.

Lastly, we need to tell Jekyll to actually use the styles that we added! Let's go to the *head.html* file in the *_includes* folder, and add a *link* tag inside the *head* tag.

Here's an example of what that tag should look like:

```html
<link rel="stylesheet" href="{{ '/assets/my-theme.css' | relative_url }}">
```

It uses some Liquid keywords in the *href* to make sure Jekyll uses the right file location. Be careful - you'll need to change the *"my-theme.css"* part to match what you named your file! Let me know when you've added one of these tags.

Now, if you run *jekyll serve*, you should see something much nicer! Doesn't that look a lot nicer?

There's only one problem that I can see... The colors are still the same! I'd like you to go back to the *base.scss* file in the *_sass* folder and change the colors. For each color code, if you click on the square next to it, it'll open up a _color picker!_ Pick whichever colors you want - just make sure you can still read the text! Let me know when you've changed both of the colors.

Going forward, the example theme I'll be showing you will be pink!

Can you commit all of your changes and give me the link?

At this point, I'm going to let you move on, but there's a catch... Now that you know the basics of Sass, I'd like to see you do some more with it. Later on, you'll be able to access a *gallery* of all the themes that users have made here. Adding some styles of your own will help your theme stand out from all the others!

Maybe you could add a subtle _background image_ to the *body*, or replace the solid color with a _gradient_. You could use a site like *Google Fonts* to find a more exciting font than _sans-serif_, or add variables in a *:root* rule to provide a dark theme for users who prefer it. If you already have a website, maybe you could make your theme look like that instead? Or you could do all of these things and more!

The point is to go further, _do some research_, and make something you're *really proud of.* The choice is yours. This step is optional, but *highly recommended!* Just remember to keep pushing commits to your repository as you work.

I wonder what happens next?

## Going further

Now that you have the basics down, let's explore more advanced features to make your theme stand out!

### More elements

Back in *Your first page*, I showed you some of the most important Markdown elements, including plain, bold, and italic text, headings, and links. However, those aren't the only things that Markdown provides!
