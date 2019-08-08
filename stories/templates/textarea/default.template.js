export const template = `
  <div class="storybook-components storybook-components--input">
    <st-textarea :disabled="disabled"
                 :loading="loading"
                 :size="size"
                 :resizable="resizable"
                 :placeholder="placeholder"
                 :required="required"
                 :readonly="readonly"
                 :minlength="minlength"
                 :maxlength="maxlength"
                 :autofocus="autofocus"
                 :rows="rows"
                 :cols="cols" />
  </div>
`;