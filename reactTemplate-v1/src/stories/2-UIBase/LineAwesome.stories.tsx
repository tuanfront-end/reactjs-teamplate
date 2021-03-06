import React from 'react';
import { LineAwesome, View } from 'shared';
import lineAwesome from 'stories/utils/lineAwesome';
import { select, number } from '@storybook/addon-knobs';
import getOptions from 'stories/utils/getOptions';
import defaultColors from 'shared/themes/defaultColors';

export default {
  title: 'UI Base/LineAwesome',
  component: LineAwesome,
};

export const Default = () => {
  const column = number('Column', 10, { range: true, min: 4, max: 20 });
  const size = number('Size', 30, { range: true, min: 5, max: 50 });
  const color = select('Color', getOptions(defaultColors), 'dark2');
  return (
    <View gridEqual colXs={column}>
      {lineAwesome.map(name => (
        <LineAwesome name={name} size={size} color={color} />
      ))}
    </View>
  );
};
