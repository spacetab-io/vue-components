const TEXT_BLUE = '\x1b[34m';
const TEXT_GREEN = '\x1b[32m';
const TEXT_RED = '\x1b[31m';
const TEXT_BLACK = '\x1b[30m';

class GeneratorLogger {
  constructor(name) {
    this.name = name;
  }

  info(message) {
    console.log(TEXT_BLUE, `${this.name}:`, TEXT_BLACK, message);
  }

  fail(message) {
    console.log(TEXT_BLUE, `${this.name}:`, TEXT_RED, message);
  }

  success(message) {
    console.log(TEXT_BLUE, `${this.name}:`, TEXT_GREEN, message);
  }
}

module.exports = GeneratorLogger;
