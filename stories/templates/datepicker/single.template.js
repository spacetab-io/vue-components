export const template = `
  <div>
    {{ value }}
    <br>
    <st-datepicker :key="dpKey"
                   :month-visible="panelsCount"
                   :disabled-from="disabledFrom"
                   :disabled-to="disabledTo"
                   :disabled-ranges="disabledRanges"
                   :navigation-type="navigationType"
                   :input-format="inputFormat"
                   :trigger-type="triggerType"
                   :popper-arrow-visible="popperArrowVisible"
                   :clearable="clearable"
                   :popper-placement="popperPlacement"
                   :now="now"
                   :placeholder="placeholder"
                   :prefix-icon="prefixIcon"
                   :suffix-icon="suffixIcon"
                   v-model="value" />
  </div>
`;
