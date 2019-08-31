export const template = `
  <div class="storybook-components storybook-components--tooltip"
       style="margin-top: 100px; text-align: center;">
    <button v-tooltip=" {
              content,
              classes,
              targetClasses,
              html,
              delay,
              placement,
              trigger,
              show,
              offset,
              container,
              boundariesElement,
              template,
              arrowSelector,
              innerSelector,
              autoHide,
              hideOnTargetClick,
              loadingClass,
              loadingContent,
              popperOptions,
            }">
      Button
    </button>
  </div>
`;
