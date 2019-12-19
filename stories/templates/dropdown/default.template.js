export const template = `
  <st-dropdown :placement="placement"
               :trigger="trigger"
               :arrow-visible="arrowVisible"
               :with-border="withBorder"
               :width="width"
               :value="value"
               :disabled="disabled"
               :force-show="forceShow"
               :append-to-body="appendToBody"
               :delay-on-mouse-over="delayOnMouseOver"
               :delay-on-mouse-out="delayOnMouseOut">
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
