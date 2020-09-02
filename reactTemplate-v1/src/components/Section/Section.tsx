import React, { FC, ReactNode } from 'react';
import { View, classNames } from 'shared';
import styles from './Section.module.scss';

export interface SectionProps {
  children: ReactNode;
  backgroundColor?: string;
  backgroundType?: 'full' | 'left' | 'right';
}

const Section: FC<SectionProps> = ({ children, backgroundColor, backgroundType = 'full' }) => {
  return (
    <View tagName="section" className={styles.container}>
      <View className={classNames(styles.background, styles[backgroundType])} style={{ backgroundColor }} />
      {children}
    </View>
  );
};

export default Section;
