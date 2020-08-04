import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import ResizeObserver from 'resize-observer-polyfill';
import calculateNodeHeight from './calculateNodeHeight';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function onNextFrame(cb: () => void) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId: number) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  autosize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface TextAreaState {
  textareaStyles?: React.CSSProperties;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  nextFrameActionId: number;
  resizeObserver: ResizeObserver | null;

  state = {
    textareaStyles: {},
  };

  private textAreaRef: HTMLTextAreaElement;

  componentDidMount() {
    this.resizeTextarea();
    this.updateResizeObserverHook();
  }

  componentDidUpdate(prevProps: TextAreaProps) {
    // Re-render with the new content then recalculate the height as required.
    if (prevProps.value !== this.props.value) {
      this.resizeOnNextFrame();
    }
    this.updateResizeObserverHook();
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  resizeOnNextFrame = () => {
    if (this.nextFrameActionId) {
      clearNextFrameAction(this.nextFrameActionId);
    }
    this.nextFrameActionId = onNextFrame(this.resizeTextarea);
  };

  // We will update hooks if `autosize` prop change
  updateResizeObserverHook() {
    if (!this.resizeObserver && this.props.autosize) {
      // Add resize observer
      this.resizeObserver = new ResizeObserver(this.resizeOnNextFrame);
      this.resizeObserver.observe(this.textAreaRef);
    } else if (this.resizeObserver && !this.props.autosize) {
      // Remove resize observer
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  focus() {
    this.textAreaRef.focus();
  }

  blur() {
    this.textAreaRef.blur();
  }

  resizeTextarea = () => {
    const { autosize } = this.props;
    if (!autosize || !this.textAreaRef) {
      return;
    }
    const { minRows, maxRows } = autosize as AutoSizeType;
    const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
    this.setState({ textareaStyles });
  };

  handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  saveTextAreaRef = (textArea: HTMLTextAreaElement) => {
    this.textAreaRef = textArea;
  };

  renderTextArea = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, disabled } = this.props;
    const { ...props } = this.props;
    const otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autosize']);
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
    });

    const style = {
      ...props.style,
      ...this.state.textareaStyles,
    };
    // Fix https://github.com/ant-design/ant-design/issues/6776
    // Make sure it could be reset when using form.getFieldDecorator
    if ('value' in otherProps) {
      otherProps.value = otherProps.value || '';
    }
    return (
      <textarea
        {...otherProps}
        className={cls}
        style={style}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleTextareaChange}
        ref={this.saveTextAreaRef}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTextArea}</ConfigConsumer>;
  }
}

polyfill(TextArea);

export default TextArea;
