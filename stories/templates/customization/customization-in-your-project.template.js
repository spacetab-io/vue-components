export const template = `
  <div class="storybook-customization">
    <h2>Customization in your project</h2>
    <h3>Via vue.config.js (vue-cli)</h3>
    <div>
      1. Install sass-loader.
      <pre><code class="language-sh">
        npm install sass sass-loader
      </code></pre>
  
      2. Create a .scss file, import @spacetab/vue-components theme file, modify variables you want to. 
      <br>If you already have a style file with your local variables you can use it.
      <pre><code class="language-scss">
        // src/assets/scss/var.scss
        @import '~@spacetab/vue-components/src/assets/scss/theme';
        
        // The variables you want to modify
        $st-color-success: green;
        // Also you can modify components' variables
        $st-button-danger-color: red;
      </code></pre>
      
      3. Setup <i>vue.config.js</i> file.
      <pre><code class="language-javascript">
        module.exports = {
          css: {
            loaderOptions: {
              sass: {
                data: \`@import "~@/assets/scss/var.scss"\`,
              },
            },
          },
        }    
      </code></pre>
    </div>
  </div>
`;