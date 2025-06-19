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

async function scrapeAllTasks() {
  const allText = [];
  for (const task of tasks) {
    const text = await scrapeTextFromTask(task);
    allText.push(text);
  }
  return allText;
}

async function main() {
  try {
    const allText = await scrapeAllTasks();
    await fs.writeFile('./taskText.json', JSON.stringify(allText, null, 2));
    console.log('All task text scraped and saved to sentences.json');
  } catch (error) {
    console.error('Error scraping task text:', error);
  }
}

main().catch(console.error);
