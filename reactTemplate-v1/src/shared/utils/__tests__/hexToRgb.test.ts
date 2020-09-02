import { RGBColor } from 'react-color';
import hexToRgb from '../hexToRgb';

describe('hexToRgb', () => {
  it('color: #f00', () => {
    const received: Omit<RGBColor, 'a'> = {
      r: 255,
      g: 0,
      b: 0,
    };
    const expected = hexToRgb('#f00');
    expect(received).toEqual(expected);
  });
  it('color: #345563', () => {
    const received: Omit<RGBColor, 'a'> = {
      r: 52,
      g: 85,
      b: 99,
    };
    const expected = hexToRgb('#345563');
    expect(received).toEqual(expected);
  });
});
