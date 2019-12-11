export const template = `
  <st-dropdown :readonly="readonly"
               :disabled="disabled">
    <st-button slot="reference"
               type="success"
               :disabled="disabled">
      Dropdown reference slot
    </st-button>
    <template v-slot:default="dropdownProps">
      <st-dropdown-option v-for="i in 4"
                          :readonly="readonly"
                          :disabled="disabled">
        Option {{ i }}
      </st-dropdown-option>
      <st-dropdown-option disabled>Option 5</st-dropdown-option>
    </template>
  </st-dropdown>
`;
