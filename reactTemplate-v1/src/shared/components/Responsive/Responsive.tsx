import { ReactElement, useEffect, useState, useRef, Ref } from 'react';

type Size = (num: number) => number;

export interface ResponsiveProps<T extends HTMLElement> {
  minWidth?: number;
  maxWidth: number;
  children: (size: Size, ref: Ref<T>) => ReactElement;
}

export interface UseResponsiveParams {
  minWidth?: number;
  maxWidth: number;
}

const getRatio = (clientWidth: number, minWidth: number, maxWidth: number) => {
  return (clientWidth >= minWidth ? (clientWidth <= maxWidth ? clientWidth : maxWidth) : minWidth) / maxWidth;
};

export function useResponsive<T extends HTMLElement>({ minWidth = 0, maxWidth }: UseResponsiveParams) {
  const [ratio, setRatio] = useState(1);
  const containerRef = useRef<T | null>(null);

  const handleWindowResize = () => {
    if (!!containerRef.current) {
      const nextRatio = getRatio(containerRef.current.clientWidth, minWidth, maxWidth);
      if (ratio !== nextRatio) {
        setRatio(nextRatio);
      }
    }
  };

  const setRef: Ref<T> = c => {
    containerRef.current = c;
  };

  const setSize: Size = num => {
    return num * ratio;
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    size: setSize,
    ref: setRef,
  };
}

export function Responsive<T extends HTMLElement>({ children, minWidth = 0, maxWidth }: ResponsiveProps<T>) {
  const { size: setSize, ref: setRef } = useResponsive({ minWidth, maxWidth });

  return children(setSize, setRef);
}
