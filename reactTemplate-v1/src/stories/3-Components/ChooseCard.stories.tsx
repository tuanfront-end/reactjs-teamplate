import React from 'react';
import ChooseCard from 'components/ChooseCard/ChooseCard';
import { text } from '@storybook/addon-knobs';
import { View } from 'shared';
import { action } from '@storybook/addon-actions';

export default {
  title: 'General/ChooseCard',
  component: ChooseCard,
};

export const Default = () => {
  const title = text('Title', `Lorem ipsum dolor sit amet`);
  const uri = text('Uri', 'https://images.pexels.com/photos/4679168/pexels-photo-4679168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  const buttonText = text('Button Text', 'Choose Card');
  return (
    <View gridEqual colXs={1} colSm={2} colMd={3}>
      <ChooseCard title={title} uri={uri} buttonText={buttonText} onClick={action('onClick')} />
      <ChooseCard title={title} uri={uri} buttonText={buttonText} onClick={action('onClick')} />
      <ChooseCard title={title} uri={uri} buttonText={buttonText} onClick={action('onClick')} />
    </View>
  );
};
