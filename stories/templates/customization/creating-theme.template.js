export const template = `
  <div class="storybook-customization">
    <h2>Creating a theme</h2>
    <h3>Prepare theme files</h3>
    <div>
      1. Create folders for your theme:
      <pre><code>
        src/themes/%theme_name%/assets // your theme's assets
        src/themes/%theme_name%/components  // your theme's components
      </code></pre>
      
      2. Create a theme's style file.
      <pre>
      <span class="storybook-customization__file-link">src/themes/%theme_name%/assets/theme.scss</span>
        <code class="language-scss">
          // Define new variables for your theme
          $st-color-turquoise: #40E0D0 !default;
          $st-color-orangered: #FF4500 !default;
          
          // Or, redefine default theme's variables
          $st-color-primary: $st-color-orangered !default;
          $st-color-secondary: $st-color-turquoise !default;
          $st-border-width: 2px !default;
          
          @import "../../../../assets/scss/theme";
        </code>
      </pre>
    </div>
    
    <h3>Create a custom component</h3>
    <div>
      1. Create component's index.vue file 
      <pre>
      <span class="storybook-customization__file-link">src/themes/%theme_name%/components/%component_name%/index.vue</span>
      </pre>
      2. You can create your own component or extend one of default's. 
      In this example we will extend the default's Icon component.
      <pre><code class="language-txt">
        For example check file:
        src/themes/example/components/icon/index.vue
      </code></pre>
    </div>
    
    <h3>Create component's story page</h3>
    <div>
      1. Import your component in <i>index.stories.js</span>.
      <pre>
      <span class="storybook-customization__file-link">stories/themes/%theme_name%/index.stories.js</span>
        <code class="language-js">
          import Vue from 'vue';
          import StCustomComponent from '../components/%component_name%/index.vue';
          import documentationFile from '../../../../../stories/documentation/%component_name%.md';
          
          Vue.component('st-custom-component', StCustomComponent);
        </code>
      </pre>
      
      2. Create a documentation, a story and a template files.
      <pre>
      <span class="storybook-customization__file-link">stories/themes/%theme_name%/documentation/%component_name%.md</span>
        <code class="language-md">
          # Documentation
  
          ## Attributes
          component's attributes here
        </code>
      </pre>
      
      <pre>
      <span class="storybook-customization__file-link">stories/themes/%theme_name%/pages/%component_name%/default.stories.js</span>
        <code class="language-js">
          import { storiesOf } from '@storybook/vue';
          import { template } from '../../templates/%component_name%/default.template';
          
          storiesOf('Themes: %ThemeName%|%ComponentName%', module).add(
            'Default',
            () => ({
              template: template,
            }),
            {
              notes: { 
                markdown: documentationFile,
              },
            },
        </code>
      </pre>

      <pre>
      <span class="storybook-customization__file-link">stories/themes/%theme_name%/templates/%component_name%/default.template.js</span>
        <code class="language-txt">
          For example check file:
          stories/themes/example/templates/icon/default.template.js
        </code>
      </pre>
    </div>
  </div>
`;