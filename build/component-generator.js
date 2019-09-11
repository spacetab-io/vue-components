const readline = require('readline');
const fs = require('fs');
const GeneratorLogger = require('./utils/generator-logger');
const render = require('json-templater/string');
const printEol = require('./utils/print-eol');

const logger = new GeneratorLogger();
const generatorLogger = new GeneratorLogger('Component Generator');

const DIRECTORIES = {
    generator: {
        templates: {
            component: './build/generator-templates/component/',
            story: './build/generator-templates/story/',
        },
    },
    variables: './src/assets/scss/components/',
    components: './src/components/',
    stories: {
        root: './stories/',
        documentation: './stories/documentation/',
        pages: './stories/pages/',
        templates: './stories/templates/',
    },
};

const pathGenerator = {
    stories: {
        index: {
            dir: () => `${DIRECTORIES.stories.root}`,
            file: () => `${pathGenerator.stories.index.dir()}index.stories.js`,
        },
        page: {
            dir: (name) => `${DIRECTORIES.stories.pages}${name}/`,
            file: (name) => `${pathGenerator.stories.page.dir(name)}default.stories.js`,
        },
        template: {
            dir: (name) => `${DIRECTORIES.stories.templates}${name}/`,
            file: (name) => `${pathGenerator.stories.template.dir(name)}default.template.js`,
        },
        documentation: {
            dir: () => `${DIRECTORIES.stories.documentation}`,
            file: (name) => `${pathGenerator.stories.documentation.dir()}${name}.md`,
        },
    },
    component: {
        dir: (name) => `${DIRECTORIES.components}${name}/`,
        script: (name) => `${pathGenerator.component.dir(name)}script.ts`,
        style: (name) => `${pathGenerator.component.dir(name)}style.scss`,
        template: (name) => `${pathGenerator.component.dir(name)}template.html`,
        vue: (name) => `${pathGenerator.component.dir(name)}index.vue`,
        variables: {
            dir: (name) => `${DIRECTORIES.variables}${name}/`,
            file: (name) => `${pathGenerator.component.variables.dir(name)}_variables.scss`,
        },
        index: {
          dir: () => `${DIRECTORIES.components}`,
          file: () => `${pathGenerator.component.index.dir()}index.js`,
        },
    },
};

const currentComponents = fs.readdirSync(DIRECTORIES.components);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const config = {
    scss: {
        variables: true,
    },
    stories: {
        render: true,
        documentation: true,
    },
    componentPascalName: '',
    componentName: '',
};

const askComponentName = () => {
    printEol();
    logger.info('Enter component name in kebab-case');
    rl.question('  > ', (componentName) => {
        componentName.toLowerCase();

        if (componentName.indexOf('st-') === 0) {
            componentName = componentName.slice(3);
        }

        if (currentComponents.includes(componentName)) {
            logger.fail(`[ERROR] Component with name "${componentName}" is already exists`);
            askComponentName();
            return;
        }

        config.componentName = componentName;
        generatorLogger.success(`File ${pathGenerator.component.script(componentName)} will be generated`);
        generatorLogger.success(`File ${pathGenerator.component.style(componentName)} will be generated`);
        generatorLogger.success(`File ${pathGenerator.component.template(componentName)} will be generated`);
        askComponentNamePascal();
    });
};

const askComponentNamePascal = () => {
    printEol();
    logger.info(`Enter component name in PascalCase (default: ${kebab2Pascal(config.componentName)})`);
    rl.question('  > ', (componentName) => {
        if (componentName === '') {
            componentName = kebab2Pascal(config.componentName);
        }

        if (componentName.indexOf('St') === 0) {
            componentName = componentName.slice(2);
        }

        if (componentName.indexOf('-') > -1 || componentName.indexOf('_') > -1) {
            logger.fail(`[ERROR] Component name not in pascal case - "${componentName}"`);
            askComponentNamePascal();
            return;
        }

        config.componentPascalName = componentName;
        generatorLogger.success(`Component PascalName stored`);
        askIsNeedStoriesPage();
    });
};

const askIsNeedStoriesPage = () => {
    askTrueFalse('Do you need stories page?', true, (answer) => {
        config.stories.render = answer;

        const storiesPagePath = pathGenerator.stories.page.file(config.componentName);
        const templatesPagePath = pathGenerator.stories.template.file(config.componentName);
        if (answer) {
            generatorLogger.success(`File ${storiesPagePath} will be generated`);
            generatorLogger.success(`File ${templatesPagePath} will be generated`);
        } else {
            generatorLogger.fail(`File ${storiesPagePath} will not be generated`);
            generatorLogger.fail(`File ${templatesPagePath} will not be generated`);
        }

        generateComponent();
        generateStory();

        rl.close();
        process.exit();
    });
};

const askTrueFalse = (question, defaultChoice = true, callback) => {
    const agreeChoices = ['y', 'yes'];
    const disagreeChoices = ['n', 'no', 'not'];
    const allowedChoices = agreeChoices.concat(disagreeChoices);

    logger.info(`${question} (Y)N`);
    rl.question('  > ', (answer) => {
        answer = answer.toLowerCase();

        if (answer === '') {
            callback(true);
        }

        if (!allowedChoices.includes(answer)) {
            logger.fail(`[ERROR] Answer "${answer}" is not allowed. Try Y or N`);
            askTrueFalse(question, defaultChoice, callback);
            return;
        }

        callback(agreeChoices.includes(answer));
    });
};

const generateComponent = () => {
    const name = config.componentName;
    const pascalName = config.componentPascalName;

    renderFileFromTemplate(
        DIRECTORIES.generator.templates.component + 'vue-file.template.txt',
        pathGenerator.component.vue(name),
    );

    renderFileFromTemplate(
        DIRECTORIES.generator.templates.component + 'script-file.template.txt',
        pathGenerator.component.script(name),
        {
            COMPONENT_NAME: `St${pascalName}`,
        },
    );

    renderFileFromTemplate(
        DIRECTORIES.generator.templates.component + 'style-file.template.txt',
        pathGenerator.component.style(name),
        {
            KEBAB_COMPONENT_NAME: name,
        },
    );

    renderFileFromTemplate(
        DIRECTORIES.generator.templates.component + 'template-file.template.txt',
        pathGenerator.component.template(name),
        {
            KEBAB_COMPONENT_NAME: name,
        },
    );

    if (config.scss.variables) {
        renderFileFromTemplate(
            DIRECTORIES.generator.templates.component + 'variables-file.template.txt',
            pathGenerator.component.variables.file(name),
        );
    }

    renderIndexComponentsFile();
};

generateStory = () => {
    if (!config.stories.render) {
        return;
    }

    const name = config.componentName;
    const pascalName = config.componentPascalName;

    let componentName = config.componentName.replace('-', ' ');
    let letter = componentName.slice(1).toUpperCase();
    componentName = letter + componentName;

    renderFileFromTemplate(
        `${DIRECTORIES.generator.templates.story}documentation-file.template.txt`,
        pathGenerator.stories.documentation.file(name),
        {
            COMPONENT_NAME: componentName,
        },
    );

    renderFileFromTemplate(
        `${DIRECTORIES.generator.templates.story}page-file.template.txt`,
        pathGenerator.stories.page.file(name),
        {
            PASCAL_NAME: pascalName,
            KEBAB_NAME: name,
        },
    );

    renderFileFromTemplate(
        `${DIRECTORIES.generator.templates.story}template-file.template.txt`,
        pathGenerator.stories.template.file(name),
        {
            KEBAB_NAME: name,
        },
    );
};

const renderIndexComponentsFile = () => {
  const components = fs.readdirSync(DIRECTORIES.components).filter(item => item.indexOf('.') === -1);

  const formatted = components.map(item => ({
    kebabName: item,
    pascalName: getComponentNameByKebab(item),
  }));

  const COMPONENTS_IMPORTS = formatted.map(item => `import ${item.pascalName} from './${item.kebabName}/index.vue';`).join('\n');
  const COMPONENTS_LIST = formatted.map(item => `  ${item.pascalName},`).join('\n');

  renderFileFromTemplate(
    `${DIRECTORIES.generator.templates.component}index-file.template.txt`,
    pathGenerator.component.index.file(),
    {
      COMPONENTS_IMPORTS,
      COMPONENTS_LIST,
    },
  );
};

const getComponentNameByKebab = (name) => {
    const scriptFilePath = pathGenerator.component.script(name);

    const fileContents = fs.readFileSync(scriptFilePath, { encoding: 'utf8' });
    const regexp = new RegExp(/export default class (.*) extends Vue/);
    const regResult = regexp.exec(fileContents.toString('utf8'));

    return regResult[1];
};

const renderFileFromTemplate = (templatePath, outputFilePath, options = {}) => {
    const outputSlice = outputFilePath.split('/');
    outputSlice.pop();

    try {
        fs.mkdirSync(outputSlice.join('/'));
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }

    const template = fs.readFileSync(templatePath, { encoding: 'utf8' }).toString('utf8');
    const rendered = render(template, options);
    fs.writeFileSync(outputFilePath, rendered, { encoding: 'utf8' });
    logger.success(`File ${outputFilePath} is generated`)
};

const kebab2Pascal = (str) => {
    str += '';
    str = str.split('-');

    const upper = ( str ) => {
        return str.slice(0,1).toUpperCase() + str.slice(1,str.length);
    };

    for(let i=0; i<str.length; i++){
        const str2 = str[i].split('/');
        for(let j=0; j<str2.length; j++){
            str2[j] = upper(str2[j]);
        }
        str[i] = str2.join('');
    }
    return str.join('');
};

askComponentName();
