import React, { PureComponent, CSSProperties, ReactNode } from 'react';
import offset from './offset';

export interface StickyProps {
  children: ReactNode | ((isSticky: boolean) => ReactNode);
  offsetTop: number;
  containerSelector: string;
  zIndex: number;
  stickyEnableRange: number[];
  onChange: (isSticky: boolean) => void;
}

interface StickyState {
  isEnableSticky: boolean;
  targetHeight: number;
  innerPosition: string;
  containerMeasure: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  isLong: boolean;
  innerTop: number;
}

type StickyDefaultProps = Pick<StickyProps, 'offsetTop' | 'containerSelector' | 'zIndex' | 'stickyEnableRange' | 'onChange'>;

export class Sticky extends PureComponent<StickyProps, StickyState> {
  private $container!: HTMLElement;
  private $inner!: HTMLElement;
  private prevScrollY!: number;
  private isPrevSticky!: boolean;

  public static defaultProps: StickyDefaultProps = {
    offsetTop: 0,
    containerSelector: 'body',
    zIndex: 10,
    stickyEnableRange: [0, Infinity],
    onChange: () => {},
  };

  public state: StickyState = {
    isEnableSticky: false,
    targetHeight: Infinity,
    innerPosition: 'static',
    containerMeasure: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    isLong: false,
    innerTop: 0,
  };

  public componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  private getContainerSelector = () => {
    const { containerSelector } = this.props;
    return this.$container.closest(containerSelector);
  };

  private handleWindowResize = () => {
    const { stickyEnableRange } = this.props;
    const [min, max] = stickyEnableRange;
    this.setState({
      isEnableSticky: window.innerWidth >= min && window.innerWidth <= max,
    });
  };

  private handleWindowScroll = async () => {
    const { onChange } = this.props;
    const { isEnableSticky } = this.state;
    const isSticky = this.checkSticky();
    const $containerSelector = this.getContainerSelector();
    const { innerHeight: windowHeight } = window;
    if (this.$container && this.$inner && isEnableSticky) {
      const { clientHeight: innerHeight } = this.$inner;
      const containerMeasure = this.$container.getBoundingClientRect();
      const targetHeight = $containerSelector ? $containerSelector.clientHeight : Infinity;
      await this.setState({
        containerMeasure: {
          top: containerMeasure.top,
          left: containerMeasure.left,
          width: containerMeasure.width,
          height: innerHeight,
        },
        targetHeight,
        isLong: innerHeight > windowHeight,
      });
      if (innerHeight > windowHeight) {
        this.handleLong();
      } else {
        this.handleShort();
      }
      if (this.isPrevSticky !== isSticky) {
        onChange(isSticky);
      }
      this.isPrevSticky = isSticky;
    }
  };

  private checkWrapBottom = () => {
    const { offsetTop } = this.props;
    const $containerSelector = this.getContainerSelector();
    const { containerMeasure, isLong } = this.state;
    const targetHeight = $containerSelector ? $containerSelector.clientHeight : Infinity;
    return (
      containerMeasure.top - containerMeasure.height + (isLong ? containerMeasure.height - window.innerHeight + offsetTop : 0) - offsetTop <
      targetHeight * -1 - (this.getContainerSelectorOffsetTop() - this.getContainerOffsetTop())
    );
  };

  private handleLong = () => {
    const { scrollY } = window;
    if (this.prevScrollY > scrollY) {
      this.handleLongScrollUp(scrollY);
    } else {
      this.handleLongScrollDown(scrollY);
    }
    this.prevScrollY = scrollY;
  };

  private getInnerTop = () => {
    const innerMeasure = this.$inner.getBoundingClientRect();
    const innerTop = innerMeasure.top || -1;
    return innerTop;
  };

  private getInnerOffsetTop = () => {
    return offset(this.$inner).top;
  };

  private getContainerOffsetTop = () => {
    return offset(this.$container).top;
  };

  private getContainerSelectorOffsetTop = () => {
    const $containerSelector = this.getContainerSelector();
    return $containerSelector ? offset($containerSelector).top : 0;
  };

  private getContainerSelectorOffsetBottom = () => {
    const $containerSelector = this.getContainerSelector();
    return $containerSelector ? Math.trunc(offset($containerSelector).top + $containerSelector.clientHeight) : 0;
  };

  private getInnerPositionTop = () => {
    if (this.$container && this.$inner) {
      return this.getInnerOffsetTop() - this.getContainerOffsetTop();
    }
    return 0;
  };

  private handleLongScrollUp = async (scrollY: number) => {
    const { offsetTop } = this.props;
    const { containerMeasure, innerPosition } = this.state;
    const isTop = containerMeasure.top > offsetTop;
    const innerTop = this.getInnerTop();
    if (isTop) {
      this.setState({
        innerPosition: 'static',
      });
    } else {
      if (
        containerMeasure.top <= innerTop &&
        (innerPosition === 'fixedBottom' ||
          (innerPosition === 'absoluteBottom' && scrollY + window.innerHeight <= this.getContainerSelectorOffsetBottom()))
      ) {
        await this.setState({
          innerPosition: 'absoluteCenter',
        });
      }
      this.setInnerPositionFixedTop();
    }
  };

  private setInnerPositionFixedTop = () => {
    const { offsetTop } = this.props;
    const { innerPosition } = this.state;
    const innerTop = this.getInnerTop();
    this.setState({
      innerTop: this.getInnerPositionTop(),
    });
    if (innerTop >= offsetTop && innerPosition === 'absoluteCenter') {
      this.setState({
        innerPosition: 'fixedTop',
      });
    }
  };

  private handleLongScrollDown = (scrollY: number) => {
    const { containerMeasure, innerPosition } = this.state;
    const isBottom = Math.trunc(scrollY + window.innerHeight) >= Math.trunc(this.getInnerOffsetTop() + containerMeasure.height);
    const isWrapBottom = this.checkWrapBottom();
    if (innerPosition === 'fixedTop') {
      this.setState({
        innerPosition: 'absoluteCenter',
      });
    }
    if (isWrapBottom) {
      this.setState({
        innerPosition: 'absoluteBottom',
      });
    } else if (isBottom) {
      this.setState({
        innerPosition: 'fixedBottom',
        innerTop: this.getInnerPositionTop(),
      });
    }
  };

  private getShortPosition = (containerMeasure: StickyState['containerMeasure']) => {
    const { offsetTop } = this.props;
    if (containerMeasure.top <= offsetTop) {
      if (this.checkWrapBottom()) {
        return 'absoluteBottom';
      }
      return 'fixedTop';
    }
    return 'static';
  };

  private handleShort = () => {
    const { containerMeasure } = this.state;
    this.setState({
      innerPosition: this.getShortPosition(containerMeasure),
    });
  };

  private getInnerStyle = (): CSSProperties => {
    const { offsetTop, zIndex } = this.props;
    const { targetHeight, innerPosition, containerMeasure, isLong, innerTop } = this.state;
    const topForAbsoluteBottom = targetHeight - containerMeasure.height + (this.getContainerSelectorOffsetTop() - this.getContainerOffsetTop());
    if (isLong) {
      switch (innerPosition) {
        case 'static':
          return {};
        case 'fixedTop':
          return {
            position: 'fixed',
            top: offsetTop,
            width: containerMeasure.width,
            zIndex,
          };
        case 'absoluteCenter':
          return {
            position: 'absolute',
            top: innerTop,
            width: containerMeasure.width,
            zIndex,
          };
        case 'absoluteBottom':
          return {
            position: 'absolute',
            top: topForAbsoluteBottom,
            width: containerMeasure.width,
            zIndex,
          };
        case 'fixedBottom':
          return {
            position: 'fixed',
            bottom: 0,
            width: containerMeasure.width,
            zIndex,
          };
        default:
          return {};
      }
    }
    switch (innerPosition) {
      case 'static':
        return {};
      case 'absoluteBottom':
        return {
          position: 'absolute',
          top: topForAbsoluteBottom,
          width: containerMeasure.width,
          zIndex,
        };
      case 'fixedTop':
        return {
          position: 'fixed',
          top: offsetTop,
          width: containerMeasure.width,
          zIndex,
        };
      default:
        return {};
    }
  };

  private getContainerStyle = (): CSSProperties => {
    const { innerPosition, containerMeasure } = this.state;
    if (innerPosition === 'static') {
      return {
        minHeight: containerMeasure.height,
      };
    }
    return {
      position: 'relative',
      minHeight: containerMeasure.height,
    };
  };

  private checkSticky = () => {
    const { innerPosition } = this.state;
    return innerPosition.search(/fixedTop|fixedBottom/g) !== -1;
  };

  private setContainerRef = (c: HTMLElement | null) => {
    if (c) {
      this.$container = c;
    }
  };

  private setInnerRef = (c: HTMLElement | null) => {
    if (c) {
      this.$inner = c;
    }
  };

  private renderHackGetHeightWhenInnerContentMargin = () => {
    return <div style={{ fontSize: 0, visibility: 'hidden' }}>.</div>;
  };

  private renderChildren = () => {
    const { children } = this.props;
    const isSticky = this.checkSticky();
    // @ts-ignore
    return typeof children === 'function' ? children(isSticky) : children;
  };

  public render() {
    const { isEnableSticky } = this.state;
    const containerStyle = isEnableSticky ? this.getContainerStyle() : {};
    const innerStyle = isEnableSticky ? this.getInnerStyle() : {};
    return (
      <div ref={this.setContainerRef} style={containerStyle}>
        <div ref={this.setInnerRef} style={innerStyle}>
          {this.renderHackGetHeightWhenInnerContentMargin()}
          <>{this.renderChildren()}</>
          {this.renderHackGetHeightWhenInnerContentMargin()}
        </div>
      </div>
    );
  }
}
