export const template = `
  <div class="storybook-components storybook-components--input">
    <st-input :placeholder="placeholder"
              :disabled="disabled"
              :loading="loading"
              :size="size"
              :type="type"
              :pattern="pattern"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :clea-icon-as-suffix-icon="clearIconAsSuffixIcon"
              :focus-after-clear="focusAfterClear"
              :required="required"
              :clearable="clearable"
              :readonly="readonly"
              :maxlength="maxlength" />
  </div>
`;
