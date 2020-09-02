import React from 'react';
import { TextUnderline, View } from 'shared';
import { text, number, color, select } from '@storybook/addon-knobs';
import getOptions from 'stories/utils/getOptions';
import defaultColors from 'shared/themes/defaultColors';

export default {
  title: 'UI Base/TextUnderline',
  component: TextUnderline,
};

export const Default = () => {
  const size = number('Size', 60, { range: true, min: 20, max: 100 });
  const lineSize = number('Line Size', 20, { range: true, min: 20, max: 100 });
  const lineBottomSpace = number('Line Bottom Space', 40, { range: true, min: 20, max: 100 });
  const lineColor = color('Line Color', '#94fbd1');
  const colorProps = select('Color', getOptions(defaultColors), 'dark2');
  const children = text('Children', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit');
  return (
    <View>
      <TextUnderline size={size} lineSize={lineSize} lineBottomSpace={lineBottomSpace} lineColor={lineColor} color={colorProps}>
        {children}
      </TextUnderline>
    </View>
  );
};
