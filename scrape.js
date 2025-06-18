const fs = require('fs').promises;
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
    this.sentence = this.string.substring(startIndex + 1, endIndex);
    return this.sentence;
  }
}
