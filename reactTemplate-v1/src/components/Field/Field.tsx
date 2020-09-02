import React, { ReactNode, CSSProperties } from 'react';
import Label from './Label';
import styles from './Field.module.scss';

interface FieldProps {
  label?: string;
  note?: string;
  isLabelTagName?: boolean;
  children: ReactNode;
  renderError?: (item: { tintcolor: string }) => ReactNode;
  horizontal?: boolean;
  spaceBetween?: boolean;
  reverse?: boolean;
  required?: boolean;
  boxed?: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  inline?: boolean;
}

function Field({
  label = '',
  note = '',
  isLabelTagName = true,
  children,
  horizontal = false,
  spaceBetween = false,
  reverse = false,
  required = false,
  boxed = false,
  inline = false,
  containerClassName = '',
  containerStyle = {},
  renderError = () => null,
}: FieldProps) {
  const horizontalClass: string = horizontal ? styles.horizontal : '';
  const spaceBetweenClass: string = spaceBetween ? styles.spaceBetween : '';
  const reverseClass: string = reverse ? styles.reverse : '';
  const boxedClass: string = boxed ? styles.boxed : '';
  return (
    <div
      className={`${styles.container} ${boxedClass} ${containerClassName}`.trim()}
      style={{ ...containerStyle, display: inline ? 'inline-block' : '' }}
    >
      <Label isLabelTagName={isLabelTagName} className={`${styles.labelWrap} ${horizontalClass} ${spaceBetweenClass} ${reverseClass}`.trim()}>
        {!!label && (
          <span className={styles.label}>
            {label}
            {required ? <span>*</span> : ''}
          </span>
        )}
        {!!note && <span className={styles.note}>{note}</span>}
        {children}
      </Label>
      <div className={styles.message}>{renderError({ tintcolor: '#fc636b' })}</div>
    </div>
  );
}

export default Field;
