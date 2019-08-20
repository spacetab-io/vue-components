const GeneratorLogger = require('./utils/generator-logger');

const fs = require('fs');
const render = require('json-templater/string');
const endOfLine = require('os').EOL;

const generatorLogger = new GeneratorLogger('Theme Generator');

const DIRECTORIES = {
  themes: './src/assets/scss/themes/',
  components: './src/components/',
};
const HELPERS = {
  themeSuffix: '.theme.scss',
  variablePrefix: '_',
};
const PATHS = {
  componentStyles: '../../../components',
  themeStyles: '.',
};
const themeTemplate = `/* Generated with build/theme-generator.js */

// Variables
{{variablesImport}}

// Components
{{componentsImport}}
`;

const defaultComponentsList = fs.readdirSync(DIRECTORIES.components)
  .map(component => {
    const componentPath = DIRECTORIES.components + component;
    if (fs.lstatSync(componentPath).isDirectory()) {
      return component;
    }
  })
  .filter(Boolean);

const getImportString = (path) => {
  return `@import '${path}';`;
};

const writeThemeFile = (themeName, template) => {
  const themePath = DIRECTORIES.themes + themeName + HELPERS.themeSuffix;
  fs.writeFile(
    themePath,
    template,
    'utf8',
    error => {
      if (error) {
        generatorLogger.fail(`ERROR! \n ${error}`);
      }
      generatorLogger.info(`Theme "${themeName}" was created!`);
      generatorLogger.success(`Path: ${themePath}`);
    }
  );
};

const createDefaultTheme = () => {
  const mainVariables = '../utils/_variables';
  const componentsImportList = defaultComponentsList.map(component => {
    return getImportString(`${PATHS.componentStyles}/${component}/style`);
  });
  const resultTemplate = render(themeTemplate, {
    variablesImport: getImportString(mainVariables),
    componentsImport: componentsImportList.join(endOfLine),
  });
  writeThemeFile('default', resultTemplate);
};

const createCustomThemes = () => {
  fs.readdirSync(DIRECTORIES.themes).forEach(theme => {
    const themePath = DIRECTORIES.themes + theme;
    if (!fs.lstatSync(themePath).isDirectory()) {
      return;
    }

    const themeFiles = fs.readdirSync(themePath).reduce((acc, file) => {
      const fileName = file.replace('.scss', '');
      if (fileName.charAt(0) === HELPERS.variablePrefix) {
        acc.variables.push(fileName);
      } else {
        acc.components.push(fileName);
      }
      return acc;
    }, {
      variables: [],
      components: [],
    });

    const variablesImportList = themeFiles.variables.map(variable => {
      return getImportString(`${PATHS.themeStyles}/${theme}/${variable}`);
    });
    const componentsImportList = defaultComponentsList.map(component => {
      if (themeFiles.components.includes(component)) {
        return getImportString(`${PATHS.themeStyles}/${theme}/${component}`);
      }
      return getImportString(`${PATHS.componentStyles}/${component}/style`);
    });
    const resultTemplate = render(themeTemplate, {
      variablesImport: variablesImportList.join(endOfLine),
      componentsImport: componentsImportList.join(endOfLine),
    });
    writeThemeFile(theme, resultTemplate);
  });
};

createDefaultTheme();
createCustomThemes();
