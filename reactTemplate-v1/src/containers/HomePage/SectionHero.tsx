import React, { FC } from 'react';
import { View, Text, Space, Button, IcomoonUltimate, useResponsive, TextUnderline } from 'shared';
import Section from 'components/Section/Section';

const SectionHero: FC = () => {
  const { size, ref } = useResponsive({ maxWidth: 600 });
  return (
    <Section>
      <View container>
        <View row tachyons={['items-center']}>
          <View columns={[12, 12, 5, 5]}>
            <View ref={ref}>
              <Text tagName="h2" color="dark1" size={size(76)}>
                With{' '}
                <TextUnderline lineSize={size(30)} lineBottomSpace={size(55)} lineColor="#94fbd1">
                  DrawTool
                </TextUnderline>
                . Design is really simple!
              </Text>
              <Space size={size(40)} />
              <Text size={18} color="dark3">
                We created DrawTool with the goal of making it fun and effortless to create your designs. Expect epic and sophisticated results
                without any need for technical expertise!
              </Text>
              <Space size={size(40)} />
            </View>
            <View gridEqual colXs={1} colMd={2} gapXs={10}>
              <Button block radius="round" size="large" backgroundColor="secondary" nightModeBlacklist="color" tachyons="mb3">
                Create Your Design
              </Button>
              <Button block radius="round" size="large" backgroundColor="gray3" color="dark2" tachyons="mb3">
                <View tachyons={['flex', 'items-center', 'justify-center']}>
                  <Text>Tutorial</Text>
                  <IcomoonUltimate name="play3" tachyons="ml3" size={22} color="tertiary" />
                </View>
              </Button>
            </View>
          </View>
          <View columns={[12, 12, 7, 7]}>
            <img src="https://cdn.designbold.com/web/db2019/main/images/new-icon/home-hero.svg" alt="" />
          </View>
        </View>
      </View>
    </Section>
  );
};

export default SectionHero;
