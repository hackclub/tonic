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

async function scrapeSentenceFromTask(task) {
  const sentences = [];
  const content = await fs.readFile(`./learn/tasks/${task}`, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('await mutant')) {
      const sentence = new Sentence(task, line);
      const extractedSentence = sentence.sentence;
      if (extractedSentence) {
        sentences.push({
          name: task,
          sentence: extractedSentence,
          quote: sentence.quote,
        });
      }
    }
  }
  return sentences;
}

async function scrapeAllTasks() {
  const allSentences = [];
  for (const task of tasks) {
    const sentences = await scrapeSentenceFromTask(task);
    allSentences.push(...sentences);
    console.log(allSentences);
  }
  return allSentences;
}

async function main() {
  try {
    const sentences = await scrapeAllTasks();
    await fs.writeFile('./sentences.json', JSON.stringify(sentences, null, 2));
    console.log('Sentences scraped and saved to sentences.json');
  } catch (error) {
    console.error('Error scraping sentences:', error);
  }
}

main().catch(console.error);
