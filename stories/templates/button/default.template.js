export const template = `
  <div class="storybook-components storybook-components--button">
    <div class="section">
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size"
                 :round="view === 'round'" 
                 :plain="view === 'plain'">Default</st-button>
    </div>
    <div class="section">
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size"
                 type="primary"
                 :round="view === 'round'" 
                 :plain="view === 'plain'">Primary</st-button>
    </div>
    <div class="section">
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size"
                 type="secondary"
                 :round="view === 'round'"
                 :plain="view === 'plain'">Secondary</st-button>
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size" 
                 type="secondary"
                 :round="view === 'round'" 
                 :plain="view === 'plain'" 
                 cancel>Secondary Cancel</st-button>
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size"
                 type="secondary"
                 :round="view === 'round'"
                 :plain="view === 'plain'"
                 remove>Secondary Delete</st-button>
    </div>
    <div class="section">
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size" 
                 type="success"
                 :round="view === 'round'" 
                 :plain="view === 'plain'">Success</st-button>
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size" 
                 type="info"
                 :round="view === 'round'" 
                 :plain="view === 'plain'">Info</st-button>
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size" 
                 type="warning"
                 :round="view === 'round'" 
                 :plain="view === 'plain'">Warning</st-button>
      <st-button :disabled="disabled"
                 :loading="loading"
                 :size="size" 
                 type="danger"
                 :round="view === 'round'" 
                 :plain="view === 'plain'">Danger</st-button>
    </div>
  </div>
`;