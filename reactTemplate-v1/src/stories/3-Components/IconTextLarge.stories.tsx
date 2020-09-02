import React from 'react';
import IconTextLarge from 'components/IconTextLarge/IconTextLarge';
import { text, select, color } from '@storybook/addon-knobs';
import { View, LineAwesomeName } from 'shared';
import Section from 'components/Section/Section';
import getOptions from 'stories/utils/getOptions';
import lineAwesome from 'stories/utils/lineAwesome';

export default {
  title: 'General/IconTextLarge',
  component: IconTextLarge,
};

export const Default = () => {
  const title = text('Title', `Lorem ipsum dolor sit amet`);
  const iconName = select('Icon Name', getOptions<LineAwesomeName[]>(lineAwesome), 'bicycle');
  const iconColor = color('Icon Color', '#FD9B9B');
  const textProp = text(
    'Button Text',
    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni doloremque hic quos. Id tempore excepturi provident eveniet laudantium quisquam.`,
  );
  return (
    <Section backgroundColor="#fcf3ec">
      <View tachyons={['ph5', 'w-50']}>
        <IconTextLarge title={title} iconName={iconName} text={textProp} iconColor={iconColor} />
      </View>
    </Section>
  );
};
