export const template = `
  <div class="storybook-customization">
    <h2>Creating a new component [with generator]</h2>

    <h3>Create component</h3>
    <div>
      1. Run next command in your terminal:
      <pre>
        <code class="language-sh">
          npm run generator:component
        </code>
      </pre>
      
      2. Follow generator's steps.    
    </div>
    
    <h2>Creating a new component [manually]</h2>
    <h3>Create component</h3>
    <div>
      1. Create component's files 
      <pre>
      <span class="storybook-customization__file-link">src/components/%component_name%/template.html</span>
      
      <span class="storybook-customization__file-link">src/components/%component_name%/script.ts</span>
      
      <span class="storybook-customization__file-link">src/components/%component_name%/style.scss</span>
      
      <span class="storybook-customization__file-link">src/components/%component_name%/index.vue</span>
      </pre>
      
      2. Import template and script files in index.vue
      <pre>
      <span class="storybook-customization__file-link">src/components/%component_name%/index.vue</span>
        <code class="language-vue">
          // template src="./template.html"
          // script lang="ts" src="./script.ts"
        </code>
      </pre>
      
      3. Import component's styles file in themes via terminal
      <pre>
        <code class="language-sh">
          npm run generator:themes
        </code>
      </pre>
    </div>
    
    <h3>Import component</h3>
    <div>
      Import your component in next files:
      <pre>
      <span class="storybook-customization__file-link">src/components/index.js</span>
      
      <span class="storybook-customization__file-link">src/index.ts</span>
      </pre>    
    </div>
      
    <h3>Create component's story page</h3>
    <div>
      1. Create a documentation, a story and a template files.
      <pre>
      <span class="storybook-customization__file-link">stories/documentation/%component_name%.md</span>
        <code class="language-md">
          # Documentation
  
          ## Attributes
          component's attributes here
        </code>
      </pre>
      
      <pre>
      <span class="storybook-customization__file-link">stories/pages/%component_name%/default.stories.js</span>
        <code class="language-js">
          import { storiesOf } from '@storybook/vue';
          import { template } from '../../templates/%component_name%/default.template';
          
          import componentDocumentation from '../../documentation/%component_name%.md';
          
          storiesOf('Components|%ComponentName%', module).add(
            'Default',
            () => ({
              template: template,
              props: { // props should be here, useful for stories }
            }),
            {
              notes: { 
                markdown: componentDocumentation,
              },
            },
        </code>
      </pre>
  
      <pre>
      <span class="storybook-customization__file-link">stories/templates/%component_name%/default.template.js</span>
        <code class="language-js">
          export const template = 
            // div class="storybook-components storybook-components--%component_name%"
            // template here
            // /div
          ;
        </code>
      </pre>
    </div>
  </div>
`;
