const path = require('path');

const srcPath = '../src';
const storiesPath = '../stories';

module.exports = ({ config }) => {
  // Решение отсюда: https://github.com/storybookjs/storybook/issues/6188#issuecomment-487705465
  // Решение немного изменено на случай, если в Storybook будет изменен ключ test
  config.module.rules = config.module.rules.map(rule => {
    if (String(rule.test).includes('svg') && String(rule.loader).includes('file-loader')) {
      const ruleTest = String(rule.test)
        .replace('svg|', '')
        .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      return {
        ...rule,
        test: new RegExp(ruleTest),
      }
    }
    return rule;
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
    ],
    include: path.resolve(__dirname, srcPath),
  });
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    options: {
      symbolId: filePath => {
        const fileName = path.basename(filePath).replace('.svg', '');
        return `st-${fileName}`;
      }
    },
    include: path.resolve(__dirname, srcPath),
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, srcPath),
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, storiesPath),
  });

  return config;
};
