import icons from '../../../src/assets/icons/icons';

const iconsList = icons.reduce((acc, icon) => {
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
      ${iconsList}
    </ul>
  </div>
`;