export const template = `
    <div class="radio-group">
        <st-radio v-for="(option, index) in options"
                  :key="index"
                  v-model="data"
                  name="radio-group"
                  :label="option"
                  :disabled="disabled"
                  :readonly="readonly"
                  :option="option"></st-radio>
    </div>
`;
