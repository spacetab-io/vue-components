export const template = `
  <div class="storybook-components storybook-components--popover">
    <st-popover :trigger="trigger"
                :title="title"
                :content="content"
                :width="width"
                :placement="placement"
                :disabled="disabled"
                :value="value"
                :offset="offset"
                :transition="transition"
                :visible-arrow="visibleArrow"
                :popper-options="popperOptions"
                :popper-class="popperClass"
                :open-delay="openDelay"
                :tabindex="tabindex" />
  </div>
`;
