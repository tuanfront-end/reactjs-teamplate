import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'shared';
import { number, optionsKnob, select } from '@storybook/addon-knobs';
import getOptions from 'stories/utils/getOptions';
import defaultColors from 'shared/themes/defaultColors';

export default {
  title: 'UI Base/ActivityIndicator',
  component: ActivityIndicator,
};

export const WithProps = () => {
  const sizeType = optionsKnob(
    'Size Type',
    getOptions<('css style' | 'number')[]>(['css style', 'number']),
    'css style',
    {
      display: 'inline-radio',
    },
  );
  const size =
    sizeType === 'css style'
      ? select(
          'Radius',
          getOptions<ActivityIndicatorProps['size'][]>(['large', 'medium', 'small']),
          'large',
        )
      : number('Radius', 10, { range: true, min: 0, max: 100 });
  const color = select('Color', getOptions(defaultColors), 'primary');

  return <ActivityIndicator size={size} color={color} />;
};
