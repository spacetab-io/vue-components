export const template = `
    <div>
        {{ value }}
        <br>
        <st-datepicker :month-visible="panelsCount"
                       :disabled-from="disabledFrom"
                       :disabled-to="disabledTo"
                       :navigation-type="navigationType"
                       inline
                       :now="now"
                       v-model="value"></st-datepicker>
    </div>
`;
