const fs = require('fs');
const render = require('json-templater/string');
const endOfLine = require('os').EOL;

const generatorLogger = (isSuccess, ...args) => {
  const blueText = '\x1b[34m';
  const greenText = '\x1b[32m';
  const redText = '\x1b[31m';
  const messageStyle = isSuccess ? greenText : redText;
  console.log(blueText, 'Icon Generator:', messageStyle, ...args);
};

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
    // Рабочее решение для сторибука, но не для проекта
    // `import '!svg-sprite-loader?symbolId=st-[name]!${iconsImportPath}/{{icon}}.svg';`
    `import '!svg-sprite-loader!${iconsImportPath}/{{icon}}.svg';`,
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
      generatorLogger(false, `ERROR! \n ${error}`);
    }
    generatorLogger(true, `JSON file with icon list was generated! \n Path: ${iconsListJsonPath}`);
  }
);
fs.writeFile(
  iconsListScriptPath,
  resultTemplate,
  'utf8',
  error => {
    if (error) {
      generatorLogger(false, `ERROR! \n ${error}`);
    }
    generatorLogger(true, `Script file with imports of icons was generated! \n Path: ${iconsListScriptPath}`);
  }
);
