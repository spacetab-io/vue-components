export const template = `
<st-select v-model="value" 
           :options="options"
           :multiple="multiple"
           :placeholder="placeholder"
           :loading="loading"
           :disabled="disabled" 
           :readonly="readonly"
           :required="required"
           :clearable="clearable"
           :prefix-icon="prefixIcon"
           :suffix-icon="suffixIcon"></st-select>
`;
