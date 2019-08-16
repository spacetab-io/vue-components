import { iconsList } from '../../utils/props-options';

const iconsPreviewElements = iconsList.reduce((acc, icon) => {
  acc += `
    <li class="icon-list__item">
      <span>${icon}</span>
      <st-icon name="${icon}" :style="iconStyle"></st-icon>
    </li>
  `;
  return acc;
}, '');

export const template = `
  <div class="storybook-components storybook-components--icon">
    <ul class="icon-list">
      ${iconsPreviewElements}
    </ul>
  </div>
`;
