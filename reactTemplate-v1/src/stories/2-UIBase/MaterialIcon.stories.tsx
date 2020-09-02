import React from 'react';
import { MaterialIcon, View } from 'shared';
import materialIcon from 'stories/utils/materialIcon';
import { select, number, optionsKnob } from '@storybook/addon-knobs';
import getOptions from 'stories/utils/getOptions';
import defaultColors from 'shared/themes/defaultColors';

export default {
  title: 'UI Base/MaterialIcon',
  component: MaterialIcon,
};

export const Default = () => {
  const column = number('Column', 10, { range: true, min: 4, max: 20 });
  const size = number('Size', 30, { range: true, min: 5, max: 50 });
  const color = select('Color', getOptions(defaultColors), 'dark2');
  const type = optionsKnob('Type', getOptions(['filled', 'outlined']), 'filled', { display: 'inline-radio' });
  return (
    <View gridEqual colXs={column}>
      {materialIcon.map(name => (
        <MaterialIcon name={name} size={size} color={color} type={type} />
      ))}
    </View>
  );
};
