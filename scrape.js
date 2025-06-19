import { promises as fs } from 'fs';
const tasks = await fs.readdir('./learn/tasks');
const regex = /await\smutant\.\w+\(["'`]((?:\\.|[^"'`\\])*?)["'`]\)/g;

class Sentence {
  constructor(name, string) {
    this.name = name;
    this.string = string;
    this.sentence = this.getSentenceFromString();
    this.quote = null;
  }

  getSentenceFromStringUsingRegex() {
    const match = this.string.match(regex);
    if (match && match.length > 0) {
      this.sentence = match[0]
        .replace(/await\.mutant\.\w+\(["'`]/, '')
        .replace(/["'`]$/, '');
      return this.sentence;
    }
    return null;
  }

  getSentenceFromString() {
    const singleQuoteIndex = this.string.indexOf("'");
    const doubleQuoteIndex = this.string.indexOf('"');

    let startIndex;
    if (singleQuoteIndex === -1 && doubleQuoteIndex === -1) {
      // No quotes found
      return null;
    } else if (singleQuoteIndex === -1) {
      startIndex = doubleQuoteIndex;
      this.quote = '"';
    } else if (doubleQuoteIndex === -1) {
      startIndex = singleQuoteIndex;
      this.quote = "'";
    } else {
      // Take the first occurring quote
      startIndex = Math.min(singleQuoteIndex, doubleQuoteIndex);
      this.quote = singleQuoteIndex < doubleQuoteIndex ? "'" : '"';
    }

    const endIndex = this.string.indexOf(this.quote, startIndex + 1);
    if (endIndex === -1) {
      // No closing quote found
      return null;
    }
    this.sentence = this.string.substring(startIndex + 1, endIndex);
    return this.sentence;
  }
}

async function scrapeTextFromTask(task) {
  const taskText = {
    name: task,
    sentences: [],
    quotes: [],
  };
  const content = await fs.readFile(`./learn/tasks/${task}`, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('await mutant')) {
      const sentence = new Sentence(task, line);
      const extractedSentence = sentence.sentence;
      if (extractedSentence) {
        taskText.sentences.push(extractedSentence);
        taskText.quotes.push(sentence.quote);
      }
    }
  }
  return taskText;
}

async function scrapeTasks(tasks) {
  const allText = [];
  for (const task of tasks) {
    const text = await scrapeTextFromTask(task);
    allText.push(text);
  }
  return allText;
}

async function convertToMarkdown(taskText) {
  const markdownLines = [];

  if (taskText.sentences.length === 0) {
    return `# ${taskText.name}\nNo sentences found.\n\n`;
  }

  markdownLines.push(`# ${taskText.name}`);
  markdownLines.push('## Sentences');
  taskText.sentences.forEach((sentence, index) => {
    markdownLines.push(`- ${sentence}`);
    if (taskText.quotes[index]) {
      markdownLines.push(`  > Quote: ${taskText.quotes[index]}`);
    }
  });
  markdownLines.push('\n');
  return markdownLines.join('\n');
}

async function saveMarkdownFile(text, outputFile) {
  const markdownContent = text.map(convertToMarkdown);
  await fs.writeFile(outputFile, markdownContent);
}

async function main(options = {}) {
  let {
    convertToJSON = false,
    convertToMarkdown = true,
    outputJSONFile = './taskText.json',
    outputMarkdownFile = './taskText.md',
    scrapeAllTasks = false,
    tasksList = null,
  } = options;

  const validateOptions = () => {
    if (typeof scrapeAllTasks !== 'boolean') {
      throw new Error('scrapeAllTasks must be a boolean');
    }
    if (!tasksList && !scrapeAllTasks) {
      scrapeAllTasks = true;
      console.warn('No tasksList provided, defaulting to scrape all tasks.');
    }
    if (tasksList && !Array.isArray(tasksList)) {
      throw new Error('tasksList must be an array of task names');
    }
    if (!scrapeAllTasks && tasksList.length === 0) {
      throw new Error('tasksList cannot be empty if scrapeAllTasks is false');
    }
    if (scrapeAllTasks && tasksList) {
      throw new Error(
        'Cannot scrape all tasks and provide a specific tasks list at the same time'
      );
    }
    for (const task of tasksList || tasks) {
      if (!tasks.includes(task)) {
        throw new Error(`Task "${task}" does not exist in the tasks directory`);
      }
    }

    if (typeof convertToMarkdown !== 'boolean') {
      throw new Error('convertToMarkdown must be a boolean');
    }
    if (
      typeof outputJSONFile !== 'string' ||
      !outputJSONFile.endsWith('.json')
    ) {
      throw new Error('outputJSONFile must be a valid JSON file path');
    }
    if (
      typeof outputMarkdownFile !== 'string' ||
      !outputMarkdownFile.endsWith('.md')
    ) {
      throw new Error('outputMarkdownFile must be a valid Markdown file path');
    }
  };

  validateOptions();

  try {
    if (scrapeAllTasks) {
      tasksList = tasks;
    }
    const allText = await scrapeTasks(tasksList);

    if (convertToJSON) {
      await fs.writeFile(outputJSONFile, JSON.stringify(allText, null, 2));
      console.log(`All task text scraped and saved to ${outputJSONFile}`);
    }

    if (convertToMarkdown) {
      await saveMarkdownFile(allText, outputMarkdownFile);
      console.log(
        `Task text from ${tasksList.join(
          ', '
        )} converted to Markdown and saved to ${outputMarkdownFile}`
      );
    }
  } catch (error) {
    console.error('Error scraping task text:', error);
  }
}

main().catch(console.error);
