import React, { FC } from 'react';
import { View, Text, ViewProps } from 'shared';
import styles from './SectionTitle.module.scss';

export interface SectionTitleProps extends ViewProps {
  title: string;
  text?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title, text, ...rest }) => {
  return (
    <View {...rest}>
      <Text tagName="h2" className={styles.title}>
        {title}
      </Text>
      {!!text && <Text className={styles.text}>{text}</Text>}
    </View>
  );
};

export default SectionTitle;
