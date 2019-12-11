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
           :prefix-icon="prefixIcon || void 0"
           :suffix-icon="suffixIcon || void 0"
           :clear-icon-as-suffix-icon="clearIconAsSuffixIcon">
</st-select>
`;
