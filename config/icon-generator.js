const testFolder = './src/assets/icons/';
const fs = require('fs');

const icons = [];

fs.readdirSync(testFolder).forEach(file => {
  if(!file.includes('.svg')) {
    return;
  }
  icons.push(file.slice(0, -4));
});

const json = JSON.stringify(icons);

fs.writeFile('./src/assets/icons/icons.json', json, 'utf8', (err) => {
  if(err) {
    console.error(err);
  }
  console.log('Generated icons JSON file');
});

let iconsFileTemplate = '';
// TODO: разробраться с импортом
// error  Unexpected '!' in '!svg-sprite-loader!../assets/icons/alert.svg'. Do not use import syntax to configure webpack loaders - import/no-webpack-loader-syntax
// error  Unexpected use of file extension "svg" for "!svg-sprite-loader!../assets/icons/alert.svg"
iconsFileTemplate += `/* eslint import/no-webpack-loader-syntax: 0 */
/* eslint import/no-unresolved: 0 */
`;

icons.forEach(icon => {
  iconsFileTemplate += `import '!svg-sprite-loader!../assets/icons/${icon}.svg';\n`;
});

fs.writeFile('./src/utils/icons.ts', iconsFileTemplate, 'utf8', (err) => {
  if(err) {
    console.error(err);
  }
  console.log('Generated icons TS file');
});
