import * as React from 'react';
import * as PropTypes from 'prop-types';
import Animate from 'rc-animate';
import classNames from 'classnames';
import ScrollNumber from './ScrollNumber';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export { ScrollNumberProps } from './ScrollNumber';

export interface BadgeProps {
  /** Number to show in badge */
  count?: React.ReactNode;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: string;
  offset?: [number | string, number | string];
  title?: string;
}

export default class Badge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
  };

  static propTypes = {
    count: PropTypes.node,
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number,
  };

  getBadgeClassName(prefixCls: string) {
    const { className, status, children } = this.props;
    return classNames(className, prefixCls, {
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    }) as string;
  }

  isZero() {
    const numberedDispayCount = this.getNumberedDispayCount();
    return numberedDispayCount === '0' || numberedDispayCount === 0;
  }

  isDot() {
    const { dot, status } = this.props;
    const isZero = this.isZero();
    return (dot && !isZero) || status;
  }

  isHidden() {
    const { showZero } = this.props;
    const displayCount = this.getDispayCount();
    const isZero = this.isZero();
    const isDot = this.isDot();
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    return (isEmpty || (isZero && !showZero)) && !isDot;
  }

  getNumberedDispayCount() {
    const { count, overflowCount } = this.props;
    const displayCount =
      (count as number) > (overflowCount as number) ? `${overflowCount}+` : count;
    return displayCount as string | number | null;
  }

  getDispayCount() {
    const isDot = this.isDot();
    // dot mode don't need count
    if (isDot) {
      return '';
    }
    return this.getNumberedDispayCount();
  }

  getScrollNumberTitle() {
    const { title, count } = this.props;
    if (title) {
      return title;
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined;
  }

  getStyleWithOffset() {
    const { offset, style } = this.props;
    return offset
      ? {
          right: -parseInt(offset[0] as string, 10),
          marginTop: offset[1],
          ...style,
        }
      : style;
  }

  renderStatusText(prefixCls: string) {
    const { text } = this.props;
    const hidden = this.isHidden();
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  }

  renderDispayComponent() {
    const { count } = this.props;
    const customNode = count as React.ReactElement<any>;
    if (!customNode || typeof customNode !== 'object') {
      return undefined;
    }
    return React.cloneElement(customNode, {
      style: {
        ...this.getStyleWithOffset(),
        ...(customNode.props && customNode.props.style),
      },
    });
  }

  renderBadgeNumber(prefixCls: string, scrollNumberPrefixCls: string) {
    const { count, status } = this.props;

    const displayCount = this.getDispayCount();
    const isDot = this.isDot();
    const hidden = this.isHidden();

    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-multiple-words`]:
        !isDot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
    });

    return hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        displayComponent={this.renderDispayComponent()} // <Badge status="success" count={<Icon type="xxx" />}></Badge>
        title={this.getScrollNumberTitle()}
        style={this.getStyleWithOffset()}
        key="scrollNumber"
      />
    );
  }

  renderBadge = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      count,
      showZero,
      prefixCls: customizePrefixCls,
      scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
      overflowCount,
      className,
      style,
      children,
      dot,
      status,
      text,
      offset,
      title,
      ...restProps
    } = this.props;

    const prefixCls = getPrefixCls('badge', customizePrefixCls);
    const scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);

    const scrollNumber = this.renderBadgeNumber(prefixCls, scrollNumberPrefixCls);
    const statusText = this.renderStatusText(prefixCls);

    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: !!status,
      [`${prefixCls}-status-${status}`]: !!status,
    });

    // <Badge status="success" />
    if (!children && status) {
      return (
        <span
          {...restProps}
          className={this.getBadgeClassName(prefixCls)}
          style={this.getStyleWithOffset()}
        >
          <span className={statusCls} />
          <span className={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }

    return (
      <span {...restProps} className={this.getBadgeClassName(prefixCls)}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBadge}</ConfigConsumer>;
  }
}
