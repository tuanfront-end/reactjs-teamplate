import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ListItem from 'components/ListItem/ListItem';
import { View } from 'shared';

export default {
  title: 'General/ListItem',
  component: ListItem,
};

export const WithProps = () => {
  const textLeft = text('Text Left', 'Text left');
  const textRight = text('Text Right', '20');
  const isActive = boolean('Active', false);
  const arrowEnabled = boolean('Arrow Enabled', true);
  return (
    <View tachyons="w-50">
      <ListItem textLeft={textLeft} textRight={textRight} isActive={isActive} arrowEnabled={arrowEnabled} onClick={action('onClick')} />
    </View>
  );
};
