import React from 'react';
import { ProgressLoader } from 'shared';
import { boolean } from '@storybook/addon-knobs';

export default {
  title: 'UI Base/ProgressLoader',
  component: ProgressLoader,
};

export const WithProps = () => {
  const run = boolean('Run', false);
  const done = boolean('Done', false);

  if (!run) {
    return null;
  }

  return <ProgressLoader done={done} />;
};
