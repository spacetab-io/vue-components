const GeneratorLogger = require('./utils/generator-logger');

const fs = require('fs');
const render = require('json-templater/string');
const endOfLine = require('./utils/end-of-line').EOL;;

const generatorLogger = new GeneratorLogger('Icon Generator');

const iconsSvgDirectory = './src/assets/icons';
const iconsListJsonPath = iconsSvgDirectory + '/_icons.generated.json';
const iconsListScriptPath = './src/components/icon/_icons.generated.ts';

const iconsList = [];
const iconsImportPath = '../../assets/icons';

let resultTemplate = `/* eslint-disable */
{{importIconList}}
`;
let importIconList = [];

fs.readdirSync(iconsSvgDirectory).forEach(file => {
  if(!file.includes('.svg')) {
    return;
  }

  let fileName = file.replace('.svg', '');
  iconsList.push(fileName);

  importIconList.push(render(
    `import '!@spacetabs/svg-sprite-loader?symbolId=st-[name]!${iconsImportPath}/{{icon}}.svg';`,
    {
      icon: fileName
    }
  ));
});

resultTemplate = render(resultTemplate, {
  importIconList: importIconList.join(endOfLine),
});

fs.writeFile(
  iconsListJsonPath,
  JSON.stringify(iconsList),
  'utf8',
  error => {
    if (error) {
      generatorLogger.fail(`ERROR! \n ${error}`);
    }
    generatorLogger.info('JSON file with icon list was generated!');
    generatorLogger.success(`Path: ${iconsListJsonPath}`);
  }
);
fs.writeFile(
  iconsListScriptPath,
  resultTemplate,
  'utf8',
  error => {
    if (error) {
      generatorLogger.fail(`ERROR! \n ${error}`);
    }
    generatorLogger.info('Script file with imports of icons was generated!');
    generatorLogger.success(`Path: ${iconsListScriptPath}`);
  }
);
