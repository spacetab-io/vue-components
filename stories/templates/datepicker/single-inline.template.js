export const template = `
    <div>
        {{ value }}
        <br>
        <st-datepicker :month-visible="panelsCount"
                       :disabled-from="disabledFrom"
                       :disabled-to="disabledTo"
                       :disabled-ranges="disabledBefore"
                       :navigation-type="navigationType"
                       inline
                       :now="now"
                       v-model="value"></st-datepicker>
    </div>
`;
