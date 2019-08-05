export const template = `
  <div class="storybook-customization">
    <h2>Creating a theme</h2>
    
    <h3>Prepare theme files</h3>
    <div>
      1. Create a theme folder
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%</span>
      </pre> 
      
      2. Create a theme file
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%.theme.scss</span>
      </pre> 
    </div>
    
    <h3>Theme customizing example</h3>
    <div>
      <b>[!] We have an example of custom theme - it is theme with name "Example". You can find it here:</b>
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/example.theme.scss</span>
      </pre> 
      
      1. Redefine default theme's variables
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%/_variables.scss</span>
        <code class="language-scss">
          // Define new variables for your theme
          $st-color-turquoise: #40E0D0 !default;
          $st-color-orangered: #FF4500 !default;
          
          // Or, redefine default theme's variables
          $st-color-primary: $st-color-orangered !default;
          $st-color-secondary: $st-color-turquoise !default;
          $st-border-width: 2px !default;
          
          @import "../../utils/variables";
        </code>
      </pre>
      
      2. Prepare theme's styles file to use it
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%.theme.scss</span>
        <code class="language-scss">
          // General things
          @import "./example/variables";
          
          // Components
          @import "../../../components/%component_name%/style"; // Import component's default style file if you don't want to change it
          @import "./example/%component_name%"; // Import component's custom style file if you want to change it
        </code>
      </pre>
    </div>
    
    <h3>Use your theme in your projects</h3>
    <div>
      <pre>
        <code class="language-scss">
          // src/assets/scss/var.scss
          @import '~@spacetab/vue-components/src/assets/scss/themes/%theme_name%.theme.scss';
          
          // The variables you want to modify
          $st-color-success: green;
          // Also you can modify components' variables
          $st-button-danger-color: red;
        </code>
      </pre>    
    </div>
  </div>
`;