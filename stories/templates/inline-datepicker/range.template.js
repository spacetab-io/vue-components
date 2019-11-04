export const template = `
    <div>
        {{ value }}
        <br>
        <st-datepicker :year-range-start="yearRangeStart"
                       :month-range-start="monthRangeStart"
                       :is-range="true"
                       :month-visible="panelsCount"
                       :disabled-from="disabledFrom"
                       :disabled-to="disabledTo"
                       :disabled-before="disabledBefore"
                       :disabled-after="disabledAfter"
                       :now="now"
                       v-model="value"></st-datepicker>
    </div>
`;
