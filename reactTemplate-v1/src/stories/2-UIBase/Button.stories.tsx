import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button, ButtonProps, View, IcomoonUltimate, Text, Size } from 'shared';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import getOptions from 'stories/utils/getOptions';
import getWithStylesProps, { generalGroup } from 'stories/utils/getWithStylesProps';

export default {
  title: 'UI Base/Button',
  component: Button,
};

const getButtonProps = (): Omit<ButtonProps, 'children' | 'radius'> => ({
  size: select(
    'Size',
    getOptions<Size[]>(['extra-small', 'small', 'medium', 'large']),
    'medium',
  ),
  loading: boolean('Loading', false),
  fontSize: number('Font Size', undefined as any),
  disabled: boolean('Disabled', false),
  onClick: action('onClick'),
});

export const WithStyles = () => {
  return (
    <Button {...getWithStylesProps()} onClick={action('onClick')}>
      {text('Children', 'Button', generalGroup)}
    </Button>
  );
};

export const WithProps = () => {
  return (
    <Button radius="round" {...getButtonProps()}>
      {text('Children', 'Button')}
    </Button>
  );
};

export const WithChildrenNode = () => {
  return (
    <Button {...getButtonProps()}>
      <View tachyons={['flex', 'items-center']}>
        <IcomoonUltimate name="facebook" tachyons="mr2" />
        <Text>{text('Children', 'Button')}</Text>
      </View>
    </Button>
  );
};
