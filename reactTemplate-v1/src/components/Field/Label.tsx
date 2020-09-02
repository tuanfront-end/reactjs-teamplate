import React, { ReactNode, HTMLAttributes } from 'react';

interface LabelProps extends HTMLAttributes<HTMLElement> {
  isLabelTagName?: boolean;
  children: ReactNode;
}

function Label({ isLabelTagName = true, children, ...rest }: LabelProps) {
  if (isLabelTagName) {
    return <label {...rest}>{children}</label>;
  }
  return <div {...rest}>{children}</div>;
}

export default Label;
