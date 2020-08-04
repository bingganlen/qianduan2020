import * as React from 'react';
import * as moment from 'moment';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import warning from '../_util/warning';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import defaultLocale from './locale/en_US';
import interopDefault from '../_util/interopDefault';
import Icon from '../icon';

export function generateShowHourMinuteSecond(format: string) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1,
    showMinute: format.indexOf('m') > -1,
    showSecond: format.indexOf('s') > -1,
  };
}

export interface TimePickerProps {
  className?: string;
  size?: 'large' | 'default' | 'small';
  value?: moment.Moment;
  defaultValue?: moment.Moment | moment.Moment[];
  open?: boolean;
  format?: string;
  onChange?: (time: moment.Moment, timeString: string) => void;
  onOpenChange?: (open: boolean) => void;
  onAmPmChange?: (ampm: 'AM' | 'PM') => void;
  disabled?: boolean;
  placeholder?: string;
  prefixCls?: string;
  hideDisabledOptions?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  style?: React.CSSProperties;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  addon?: Function;
  use12Hours?: boolean;
  focusOnOpen?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  allowEmpty?: boolean;
  allowClear?: boolean;
  inputReadOnly?: boolean;
  clearText?: string;
  defaultOpenValue?: moment.Moment;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
  suffixIcon?: React.ReactNode;
}

export interface TimePickerLocale {
  placeholder: string;
}

class TimePicker extends React.Component<TimePickerProps, any> {
  static defaultProps = {
    align: {
      offset: [0, -2],
    },
    disabled: false,
    disabledHours: undefined,
    disabledMinutes: undefined,
    disabledSeconds: undefined,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    transitionName: 'slide-up',
    focusOnOpen: true,
  };

  static getDerivedStateFromProps(nextProps: TimePickerProps) {
    if ('value' in nextProps) {
      return { value: nextProps.value };
    }
    return null;
  }

  private timePickerRef: typeof RcTimePicker;

  constructor(props: TimePickerProps) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
          'see: https://u.ant.design/time-picker-value',
      );
    }
    this.state = {
      value,
    };

    warning(
      !('allowEmpty' in props),
      '`allowEmpty` in TimePicker is deprecated. Please use `allowClear` instead.',
    );
  }

  handleChange = (value: moment.Moment) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange, format = 'HH:mm:ss' } = this.props;
    if (onChange) {
      onChange(value, (value && value.format(format)) || '');
    }
  };

  handleOpenClose = ({ open }: { open: boolean }) => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  saveTimePicker = (timePickerRef: typeof RcTimePicker) => {
    this.timePickerRef = timePickerRef;
  };

  focus() {
    this.timePickerRef.focus();
  }

  blur() {
    this.timePickerRef.blur();
  }

  getDefaultFormat() {
    const { format, use12Hours } = this.props;
    if (format) {
      return format;
    } else if (use12Hours) {
      return 'h:mm:ss a';
    }
    return 'HH:mm:ss';
  }

  getAllowClear() {
    const { allowClear, allowEmpty } = this.props;
    if ('allowClear' in this.props) {
      return allowClear;
    }
    return allowEmpty;
  }

  renderInputIcon(prefixCls: string) {
    const { suffixIcon } = this.props;
    const clockIcon = (suffixIcon &&
      (React.isValidElement<{ className?: string }>(suffixIcon) ? (
        React.cloneElement(suffixIcon, {
          className: classNames(suffixIcon.props.className, `${prefixCls}-clock-icon`),
        })
      ) : (
        <span className={`${prefixCls}-clock-icon`}>{suffixIcon}</span>
      ))) || <Icon type="clock-circle" className={`${prefixCls}-clock-icon`} />;

    return <span className={`${prefixCls}-icon`}>{clockIcon}</span>;
  }

  renderClearIcon(prefixCls: string) {
    const {} = this.props;

    const clearIcon = <Icon type="close-circle" className={`${prefixCls}-clear`} theme="filled" />;

    return clearIcon;
  }

  renderTimePicker = (locale: TimePickerLocale) => (
    <ConfigConsumer>
      {({ getPopupContainer: getContextPopupContainer, getPrefixCls }: ConfigConsumerProps) => {
        const {
          getPopupContainer,
          prefixCls: customizePrefixCls,
          className,
          addon,
          placeholder,
          ...props
        } = this.props;
        const { size } = props;
        const pickerProps = omit(props, ['defaultValue', 'suffixIcon', 'allowEmpty', 'allowClear']);

        const format = this.getDefaultFormat();
        const prefixCls = getPrefixCls('time-picker', customizePrefixCls);
        const pickerClassName = classNames(className, {
          [`${prefixCls}-${size}`]: !!size,
        });

        const pickerAddon = (panel: React.ReactElement<any>) =>
          addon ? <div className={`${prefixCls}-panel-addon`}>{addon(panel)}</div> : null;

        return (
          <RcTimePicker
            {...generateShowHourMinuteSecond(format)}
            {...pickerProps}
            allowEmpty={this.getAllowClear()}
            prefixCls={prefixCls}
            getPopupContainer={getPopupContainer || getContextPopupContainer}
            ref={this.saveTimePicker}
            format={format}
            className={pickerClassName}
            value={this.state.value}
            placeholder={placeholder === undefined ? locale.placeholder : placeholder}
            onChange={this.handleChange}
            onOpen={this.handleOpenClose}
            onClose={this.handleOpenClose}
            addon={pickerAddon}
            inputIcon={this.renderInputIcon(prefixCls)}
            clearIcon={this.renderClearIcon(prefixCls)}
          />
        );
      }}
    </ConfigConsumer>
  );

  render() {
    return (
      <LocaleReceiver componentName="TimePicker" defaultLocale={defaultLocale}>
        {this.renderTimePicker}
      </LocaleReceiver>
    );
  }
}

polyfill(TimePicker);

export default TimePicker;
