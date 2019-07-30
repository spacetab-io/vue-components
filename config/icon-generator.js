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
icons.forEach(icon => {
  iconsFileTemplate += `import '!svg-sprite-loader!../assets/icons/${icon}.svg';\n`;
});

fs.writeFile('./src/utils/icons.ts', iconsFileTemplate, 'utf8', (err) => {
  if(err) {
    console.error(err);
  }
  console.log('Generated icons TS file');
});
