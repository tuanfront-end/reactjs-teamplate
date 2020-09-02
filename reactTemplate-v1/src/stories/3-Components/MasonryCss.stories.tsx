import React from 'react';
import { View, Text } from 'shared';
import { number } from '@storybook/addon-knobs';
import { range } from 'ramda';
import MasonryCss from 'components/MasonryCss/MasonryCss';

export default {
  title: 'General/MasonryCss',
  component: MasonryCss,
};

export const Default = () => {
  const items = number('Items', 8, { range: true, min: 5, max: 20 });
  return (
    <View container>
      <MasonryCss>
        {range(0, items).map((_, index) => (
          <Text key={String(index)} tagName="h3" tachyons="pa5" backgroundColor="gray1" style={{ height: 50 * (index + 1) }}>
            Item {index + 1}
          </Text>
        ))}
      </MasonryCss>
    </View>
  );
};
