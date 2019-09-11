export const template = `
    <div>
        {{ value }}
        <br>
        <st-datepicker :year-range-start="yearRangeStart"
                       :monthRangeStart="monthRangeStart"
                       :is-range="false"
                       :month-visible="panelsCount"
                       :disabled-from="disabledFrom"
                       :disabled-to="disabledTo"
                       :disabled-before="disabledBefore"
                       :disabled-after="disabledAfter"
                       :now="now"
                       v-model="value"></st-datepicker>
    </div>
`;
