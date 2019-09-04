export const template = `
<div>
  <st-button type="primary" @click="callNotification" >Call notification</st-button>
  <st-notifications-group :position="position" />
</div>
`;
