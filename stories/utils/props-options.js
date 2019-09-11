import icons from '../../src/assets/icons/_icons.generated';

export const withoutCustomEntity = array => array.filter(item => item !== 'custom');

// Size Options
export const sizeOptions = {
  '-': '',
  mini: 'mini',
  small: 'small',
  medium: 'medium',
  large: 'large',
  'extra-Large': 'extra-large'
};

// Icons
export const iconsList = [
  '',
  ...icons,
];
