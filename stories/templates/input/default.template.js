export const template = `
  <div class="storybook-components storybook-components--input">
    <st-input :placeholder="placeholder"
              :disabled="disabled"
              :loading="loading"
              :size="size"
              :type="type"
              :pattern="pattern"
              :prefixIcon="prefixIcon"
              :suffixIcon="suffixIcon"
              :clearIconAsSuffixIcon="clearIconAsSuffixIcon"
              :required="required"
              :clearable="clearable"
              :readonly="readonly"
              :maxlength="maxlength" />
  </div>
`;