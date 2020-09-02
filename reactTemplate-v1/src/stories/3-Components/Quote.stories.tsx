import React from 'react';
import Quote from 'components/Quote/Quote';
import { text, color } from '@storybook/addon-knobs';

export default {
  title: 'General/Quote',
  component: Quote,
};

export const Default = () => {
  const quote = text(
    'Quote',
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque odit repellat incidunt soluta aliquam id voluptatibus provident dolores, ab laboriosam maxime impedit consequatur vero ullam. Officiis fugiat qui facilis, quod magnam nesciunt nihil accusantium accusamus reprehenderit aliquid labore maxime ullam, sapiente harum eum sequi a repellat voluptatem repudiandae explicabo architecto!`,
  );
  const cite = text('Cite', 'Wiloke');
  const iconBackgroundColor = color('Icon Background Color', '#FDF1E7');

  return <Quote quote={quote} cite={cite} iconBackgroundColor={iconBackgroundColor} />;
};
