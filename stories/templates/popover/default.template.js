export const template = `
  <div class="storybook-components storybook-components--popover"
       style="margin-top: 100px; text-align: center;">
    <st-popover :open="open"
                :disabled="disabled"
                :placement="placement"
                :delay="delay"
                :trigger="trigger"
                :offset="offset"
                :container="container"
                :boundaries-element="boundariesElement"
                :popper-options="popperOptions"
                :popover-class="popoverClass"
                :popover-base-class="popoverBaseClass"
                :popover-wrapper-class="popoverWrapperClass"
                :popover-arrow-class="popoverArrowClass"
                :popover-inner-class="popoverInnerClass"
                :auto-hide="autoHide"
                :handle-resize="handleResize"
                :open-group="openGroup"
                :open-class="openClass">
      <template v-slot:reference>
        Click me
      </template>

      Hi! I am popover!
    </st-popover>
  </div>
`;
