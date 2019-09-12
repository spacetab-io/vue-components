export const template = `
  <div class="storybook-components storybook-components--tabs">
    <st-tabs :tabs="tabs"
             @select="changeActiveTab" 
             @close="closeTab" />
    <div class="section">
      Selected tab data:<br> 
      {{ getTabById(activeTabId) }}  
    </div>
  </div>
`;
