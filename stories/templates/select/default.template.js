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
           :show-arrow-icon="showArrowIcon"
           :clear-icon-as-arrow-icon="clearIconAsArrowIcon"
           :option-class="optionClass">
</st-select>
`;
