const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.ts',
      '.d.ts',
    ],
    alias: {
      '@': resolve('src'),
    },
  },
};
