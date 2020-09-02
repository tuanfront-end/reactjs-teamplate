import React, { ReactNode } from 'react';
import { Select as AntSelect } from 'antd';
import styles from './Select.module.scss';
import { SelectProps as AntSelectProps } from 'antd/lib/select';
import { classNames } from 'shared';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends AntSelectProps<string> {
  data: Option[];
  renderOption?: (item: Option, index: number) => ReactNode;
  dropdownClassName?: string;
}

export default function Select({ data = [], renderOption, className, dropdownClassName, ...rest }: SelectProps) {
  const _renderOption = (item: Option, index: number) => {
    return (
      <AntSelect.Option key={item.value} value={item.value}>
        {renderOption ? renderOption(item, index) : item.label}
      </AntSelect.Option>
    );
  };
  return (
    <AntSelect {...rest} dropdownClassName={classNames(styles.dropdown, dropdownClassName)} className={classNames(styles.container, className)}>
      {data?.length && data.map(_renderOption)}
    </AntSelect>
  );
}
