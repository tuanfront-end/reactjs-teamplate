import React, { FC } from 'react';
import { View, Sticky, HeaderBase, Text, Button } from 'shared';
import Navigation from '../Navigation/Navigation';

const Header: FC = () => {
  return (
    <View tagName="header">
      <View height={20} />
      <Sticky>
        <HeaderBase
          style={{ height: 60, paddingLeft: 40, paddingRight: 40 }}
          backgroundColor="light"
          Left={<Text tagName="h2">Logo</Text>}
          Right={
            <View tachyons={['flex', 'items-center']}>
              <Navigation
                menu={[
                  { id: 'home', label: 'Home', href: '/' },
                  { id: 'feature', label: 'Feature', href: '/' },
                  { id: 'pricing', label: 'Pricing', href: '/' },
                ]}
              />
              <View>
                <Button radius="round" tachyons={['mr3']} nightModeBlacklist="color">
                  Login
                </Button>
                <Button radius="round" backgroundColor="gray2" color="dark2">
                  Signup
                </Button>
              </View>
            </View>
          }
        />
      </Sticky>
      <View height={20} />
    </View>
  );
};

export default Header;
