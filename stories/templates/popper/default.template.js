export const template = `
<div style="width: 100%; height: 500px; display: flex; justify-content: center; align-items: center">
  <st-popper ref="popper"
             :key="key"
             :delay-on-mouse-over="delayOnMouseOver"
             :delay-on-mouse-out="delayOnMouseOut"
             :trigger="trigger"
             :with-border="withBorder"
             :arrow-visible="arrowVisible"
             :width="width"
             :disabled="disabled"
             :force-show="forceShow"
             :append-to-body="appendToBody"
             v-model="value"
             :placement="placement">
    <div class="content">
      {{ key }} Lorem ipsum dolor sit amet
      <hr>
      <st-button type="success">Success</st-button>
    </div>
    <div style="display: inline-flex;" slot="reference">
      {{ trigger }} me | placement {{ placement }}
    </div>
    </st-popper>
</div>
`;
