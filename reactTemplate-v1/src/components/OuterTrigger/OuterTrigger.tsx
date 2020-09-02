import React, { ReactNode, useEffect, useRef } from 'react';
import { View } from 'shared';

export type OuterTriggerOnClick = () => void;

export interface OuterTriggerProps {
  /** #### React children */
  children: ReactNode;
  /** #### Sự kiện khi click ra ngoài phần tử được bao */
  onClick: OuterTriggerOnClick;
}

export function useOuterTrigger(onClick: OuterTriggerOnClick) {
  const containerRef = useRef<HTMLElement | null>(null);

  const handleWindowClick = (event: MouseEvent) => {
    if (!containerRef.current?.contains(event.target as Node)) {
      onClick();
    }
  };

  const setRef = (c: HTMLElement | null) => {
    containerRef.current = c;
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setRef,
  };
}

export default function OuterTrigger({ children, onClick }: OuterTriggerProps) {
  const { setRef } = useOuterTrigger(onClick);

  return <View ref={setRef}>{children}</View>;
}
