export const template = `
  <st-checkbox v-model="isChecked"
               :disabled="disabled"
               :readonly="readonly"
               :indeterminate="indeterminate">
    {{ innerText }}
  </st-checkbox>
`;
