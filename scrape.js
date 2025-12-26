import { promises as fs } from 'fs';
const tasks = await fs.readdir('./learn/tasks');

class Sentence {
  constructor(name, string) {
    this.name = name;
    this.string = string;
    this.sentence = this.getSentenceFromString();
    this.quote = null;
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
    return this.string.substring(startIndex + 1, endIndex);
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
      if (sentence.sentence) {
        taskText.sentences.push(sentence.sentence);
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
    taskList = null,
  } = options;

  const validateOptions = () => {
    if (typeof scrapeAllTasks !== 'boolean') {
      throw new Error('scrapeAllTasks must be a boolean');
    }
    if (!taskList && !scrapeAllTasks) {
      scrapeAllTasks = true;
      console.warn('No tasksList provided, defaulting to scrape all tasks.');
    }
    if (taskList && !Array.isArray(taskList)) {
      throw new Error('tasksList must be an array of task names');
    }
    if (!scrapeAllTasks && taskList.length === 0) {
      throw new Error('tasksList cannot be empty if scrapeAllTasks is false');
    }
    if (scrapeAllTasks && taskList) {
      throw new Error(
        'Cannot scrape all tasks and provide a specific tasks list at the same time'
      );
    }

    if (taskList) {
      taskList = taskList.map((task) => {
        if (!task.includes('.') && !task.endsWith('.js')) {
          return task + '.js';
        }
        return task;
      });

      for (const task of taskList) {
        if (!tasks.includes(task)) {
          throw new Error(
            `Task "${task}" does not exist in the tasks directory`
          );
        }
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
      taskList = tasks;
    }
    const allText = await scrapeTasks(taskList);

    if (convertToJSON) {
      await fs.writeFile(outputJSONFile, JSON.stringify(allText, null, 2));
      console.log(`All task text scraped and saved to ${outputJSONFile}`);
    }

    if (convertToMarkdown) {
      await saveMarkdownFile(allText, outputMarkdownFile);
      console.log(
        `Task text from ${taskList.join(
          ', '
        )} converted to Markdown and saved to ${outputMarkdownFile}`
      );
    }
  } catch (error) {
    console.error('Error scraping task text:', error);
  }
}

main().catch(console.error);
