export const template = `
  <div class="storybook-components storybook-components--tabs">
    <st-tabs :tabs="tabs"
             v-model="selectedTabId" />
    <div class="section">
      Selected tab data:<br> 
      {{ getTabById(selectedTabId) }}  
    </div>
  </div>
`;
