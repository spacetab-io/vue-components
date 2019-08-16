export const template = `
    <div class="radio-group">
        <st-radio v-for="(option, index) in options"
                  :key="index"
                  v-model="data"
                  :label="option"
                  :disabled="disabled"
                  :option="option"></st-radio>
    </div>
`;
