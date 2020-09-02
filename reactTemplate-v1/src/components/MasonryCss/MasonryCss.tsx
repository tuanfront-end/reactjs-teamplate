import React, { ReactNode, FC, Children, CSSProperties } from 'react';
import { View } from 'shared';
import styles from './MasonryCss.module.scss';

export interface MasonryCssProps {
  /** #### React children */
  children: ReactNode;
  /** #### Css column-width — https://developer.mozilla.org/docs/Web/CSS/column-width */
  columnWidth?: number;
  /** #### Css column-count — https://developer.mozilla.org/docs/Web/CSS/column-count */
  columnCount?: number;
  /** #### Css column-gap — https://developer.mozilla.org/docs/Web/CSS/column-gap */
  columnGap?: number;
}

const MasonryCss: FC<MasonryCssProps> = ({ children, columnWidth = 300, columnCount = 3, columnGap = 30 }) => {
  const colStyles: CSSProperties = { marginBottom: columnGap };
  const renderChildren = () => {
    return Array.isArray(children) ? (
      Children.map(children, child => (
        <div className={styles.col} style={colStyles}>
          {child}
        </div>
      ))
    ) : (
      <div className={styles.col} style={colStyles}>
        {children}
      </div>
    );
  };

  return (
    <View className={styles.container} style={{ columnCount, columnWidth, columnGap }}>
      {renderChildren()}
    </View>
  );
};

export default MasonryCss;
