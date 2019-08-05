export const template = `
  <div class="storybook-customization">
    <h2>Creating a new component</h2>

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
      
      3. Import component's styles file in themes
      <b>Important!</b> Import them in every theme.
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%.theme.scss</span>
      <code class="language-scss">
          @import "../../../components/%component_name%/style";
        </code>
      </pre>
    </div>
      
    <h3>Create component's story page</h3>
    <div>
      1. Import your component in index.stories.js.
      <pre>
      <span class="storybook-customization__file-link">stories/index.stories.js</span>
        <code class="language-js">
          import StComponentName from '../src/components/%component_name%/index.vue';
          Vue.component('st-component-name', StCol);
        </code>
      </pre>
      
      2. Create a documentation, a story and a template files.
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