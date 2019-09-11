export const template = `
<div class="storybook-components storybook-components--badge">
  <div class="section">
    Create your own:<br>
    <st-badge :text="text" :icon="icon" :type="type" :fill="fill" :round="round" />
  </div>
  
  <div class="section">
    Examples:<br>
    <st-badge text="Block badge/f" fill="full" :round="round" />
    <st-badge text="Block badge/h" fill="half" :round="round" />
    <st-badge text="Block badge/n" fill="none" :round="round" />
    <br>  
    <br>
    <st-badge text="Info badge/f" type="info" fill="full" :round="round" />
    <st-badge text="Info badge/h" type="info" fill="half" :round="round" />
    <st-badge text="Info badge/n" type="info" fill="none" :round="round" />
    <br>
    <st-badge text="Cancel badge/f" type="cancel" fill="full" :round="round" />
    <st-badge text="Cancel badge/h" type="cancel" fill="half" :round="round" />
    <st-badge text="Cancel badge/n" type="cancel" fill="none" :round="round" />
    <br>
    <st-badge text="Success badge/f" type="success" fill="full" :round="round" />
    <st-badge text="Success badge/h" type="success" fill="half" :round="round" />
    <st-badge text="Success badge/n" type="success" fill="none" :round="round" />
    <br>
    <st-badge text="Warning badge/f" type="warning" fill="full" :round="round" />
    <st-badge text="Warning badge/h" type="warning" fill="half" :round="round" />
    <st-badge text="Warning badge/n" type="warning" fill="none" :round="round" />
    <br>
    <st-badge text="Error badge/f" type="error" fill="full" :round="round" />
    <st-badge text="Error badge/h" type="error" fill="half" :round="round" />
    <st-badge text="Error badge/n" type="error" fill="none" :round="round" />
  </div> 
</div>
`;
