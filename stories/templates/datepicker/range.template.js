export const template = `
    <div>
        {{ value }}
        <br>
        <st-datepicker :key="dpKey"
                       is-range
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
                       v-model="value"></st-datepicker>
    </div>
`;
