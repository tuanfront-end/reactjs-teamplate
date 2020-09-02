import React, { FC } from 'react';
import { View } from 'shared';
import { Link } from 'react-router-dom';
import { PathName } from 'routes/types';
import styles from './Navigation.module.scss';

export interface MenuItem {
  id: string;
  label: string;
  href: PathName;
  subMenu?: MenuItem[];
}

export interface NavigationProps {
  menu: MenuItem[];
}

const Navigation: FC<NavigationProps> = ({ menu }) => {
  const renderMenu = (menu: MenuItem[], className: string) => {
    return (
      <View tagName="ul" className={className}>
        {menu.map(menuItem => {
          return (
            <View tagName="li" key={menuItem.id}>
              <Link to={menuItem.href}>{menuItem.label}</Link>
              {!!menuItem.subMenu && renderMenu(menuItem.subMenu, styles.subMenu)}
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View tagName="nav" className={styles.container}>
      {renderMenu(menu, styles.menu)}
    </View>
  );
};

export default Navigation;
