export const template = `
  <div class="storybook-customization">
    <h2>Creating a theme</h2>
    
    <h3>Prepare theme files</h3>
    <div>
      1. Create a theme folder
      <pre>
      <span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%</span>
      </pre> 
    </div>
    
    <h3>Theme customizing example</h3>
    <div>
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
      
      2. Prepare theme's styles file to use it. Run command:
      <pre>
        <code class="language-sh">
          npm run generator:themes
        </code>
      </pre>
      It will generate your theme's file
      <pre><span class="storybook-customization__file-link">src/assets/scss/themes/%theme_name%.theme.scss</span></pre>
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
