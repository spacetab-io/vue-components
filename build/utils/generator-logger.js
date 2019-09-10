const TEXT_BLUE = '\x1b[34m';
const TEXT_GREEN = '\x1b[32m';
const TEXT_RED = '\x1b[31m';
const TEXT_BLACK = '\x1b[35m';

class GeneratorLogger {
  constructor(name) {
    this.name = name;
  }

  info(message) {
    if (!this.name) {
      console.log(TEXT_BLACK, message);
      return;
    }
    console.log(TEXT_BLUE, `${this.name}:`, TEXT_BLACK, message);
  }

  fail(message) {
    if (!this.name) {
      console.log(TEXT_RED, message);
      return;
    }
    console.log(TEXT_BLUE, `${this.name}:`, TEXT_RED, message);
  }

  success(message) {
    if (!this.name) {
      console.log(TEXT_GREEN, message);
      return;
    }
    console.log(TEXT_BLUE, `${this.name}:`, TEXT_GREEN, message);
  }
}

module.exports = GeneratorLogger;
