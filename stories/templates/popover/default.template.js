export const template = `
  <div class="storybook-components storybook-components--popover">
    <st-popover :trigger="trigger"
                :open-delay="openDelay"
                :close-delay="closeDelay"
                :title="title"
                :disabled="disabled"
                :content="content"
                :popper-class="popperClass"
                :width="width"
                :visible-arrow="visibleArrow"
                :arrow-offset="arrowOffset"
                :transition="transition"
                :tabindex="tabindex">
      <template v-slot:reference>
        Кликни по мне
      </template>
    </st-popover>
  </div>
`;
