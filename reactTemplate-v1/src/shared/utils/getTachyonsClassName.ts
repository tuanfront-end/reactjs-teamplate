import { Tachyons } from 'shared/types/Tachyons';
import { ThemeOverrides } from 'shared/components/ThemeContext/ThemeContext';

const tachyonsDirection = (selector: Tachyons) => {
  if (selector.search(/^ml/g) !== -1) {
    return selector.replace('ml', 'mr');
  }
  if (selector.search(/^mr/g) !== -1) {
    return selector.replace('mr', 'ml');
  }
  if (selector.search(/^pl/g) !== -1) {
    return selector.replace('pl', 'pr');
  }
  if (selector.search(/^pr/g) !== -1 && selector.search(/^pre/g) === -1) {
    return selector.replace('pr', 'pl');
  }
  if (selector.search(/^tl/g) !== -1) {
    return selector.replace('tl', 'tr');
  }
  if (selector.search(/^tr/g) !== -1) {
    return selector.replace('tr', 'tl');
  }
  if (selector.search(/^left/g) !== -1) {
    return selector.replace('left', 'right');
  }
  if (selector.search(/^right/g) !== -1) {
    return selector.replace('right', 'left');
  }
  if (selector.search(/^fl$/g) !== -1) {
    return selector.replace('fl', 'fr');
  }
  if (selector.search(/^fr$/g) !== -1) {
    return selector.replace('fr', 'fl');
  }
  if (selector.search(/^bl(-|$)/g) !== -1) {
    return selector.replace('bl', 'br');
  }
  if (selector.search(/^br(-|$)/g) !== -1) {
    return selector.replace('br', 'bl');
  }
  if (selector.search(/^br--left/g) !== -1) {
    return selector.replace('br--left', 'br--right');
  }
  if (selector.search(/^br--right/g) !== -1) {
    return selector.replace('br--right', 'br--left');
  }
  return selector;
};

const getTachyonsClassName = (tachyons?: Tachyons | Tachyons[], direction?: ThemeOverrides['direction'], globalDirection?: boolean) => {
  if (!tachyons) {
    return '';
  }
  if (!globalDirection) {
    return typeof tachyons === 'string' ? tachyons : tachyons?.join(' ');
  }
  if (typeof tachyons === 'string') {
    return direction === 'ltr' ? tachyons : tachyonsDirection(tachyons);
  }
  return direction === 'ltr' ? tachyons?.join(' ') : tachyons?.map(tachyonsDirection).join(' ');
};

export default getTachyonsClassName;
