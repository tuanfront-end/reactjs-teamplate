import React, { FC, DOMAttributes } from 'react';
import { View, Text } from 'shared';
import styles from './ChooseCard.module.scss';

export interface ChooseCardProps {
  /** #### Đường dẫn ảnh */
  uri: string;
  /** #### Thuộc tính title của card giống html */
  title: string;
  /** #### Sự kiện bấm vào cả card */
  onClick?: DOMAttributes<HTMLDivElement>['onClick'];
  /** #### Text của button */
  buttonText: string;
  /** #### Width của ảnh */
  imgWidth?: number | string;
  /** #### Height của ảnh */
  imgHeight?: number | string;
}

const ChooseCard: FC<ChooseCardProps> = ({ uri, title, buttonText, onClick, imgWidth, imgHeight }) => {
  return (
    <View className={styles.container} title={title} tachyons="relative" backgroundColor="light">
      <View tachyons="pointer" onClick={onClick}>
        {!!uri ? (
          <img className={styles.img} src={uri} alt={title} width={imgWidth} height={imgHeight} />
        ) : (
          <View backgroundColor="light" tachyons={['pa3', 'pv5', 'tc']}>
            <Text tagName="h2">Blank Template</Text>
            <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, error?</Text>
          </View>
        )}
        <View className={styles.edit} tachyons={['absolute', 'absolute--fill', 'z-4', 'pa3', 'flex', 'items-end', 'justify-center']}>
          <View className={styles.editBtn} backgroundColor="light" tachyons="tc">
            <Text color="dark2">{buttonText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChooseCard;
