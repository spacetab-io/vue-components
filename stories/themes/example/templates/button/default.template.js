export const template = `
  <div class="storybook-components storybook-components--button">
    <div class="section">
      <st-example-button :disabled="disabled"
                         :loading="loading"
                         :size="size"
                         :round="view === 'round'" 
                         :plain="view === 'plain'">Default</st-example-button>
    </div>
  </div>
`;