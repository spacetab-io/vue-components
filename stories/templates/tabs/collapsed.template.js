export const template = `
  <div class="storybook-components storybook-components--tabs">
    <st-tabs-collapsed :tabs="tabs"
                       v-model="selectedTabId" />
    <div class="section">
      Selected tab data:<br> 
      {{ getTabById(selectedTabId) }}  
    </div>
  </div>
`;
