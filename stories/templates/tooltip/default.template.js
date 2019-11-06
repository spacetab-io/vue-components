export const template = `
<div>
    <h2 style="margin: 0;">With raw content property passed</h2>  
    <st-tooltip trigger="hover"
                :raw-content="rawContent">
        <div style="display: inline-flex;">Hover on this reference element.</div>
    </st-tooltip>
  
    <br><br><br>
  
    <h2 style="margin: 0;">Without raw content property</h2>
    <st-tooltip trigger="hover">
        <div slot="reference" style="display: inline-flex;">Hover on this reference element</div>
        <div v-html="htmlDecoded"></div>
    </st-tooltip>
</div>
`;
