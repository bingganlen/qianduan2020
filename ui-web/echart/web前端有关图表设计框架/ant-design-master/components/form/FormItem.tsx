import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import Row from '../grid/row';
import Col, { ColProps } from '../grid/col';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import { tuple } from '../_util/type';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');

export interface FormItemProps {
  prefixCls?: string;
  className?: string;
  id?: string;
  label?: React.ReactNode;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  validateStatus?: (typeof ValidateStatuses)[number];
  hasFeedback?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  colon?: boolean;
}

function intersperseSpace<T>(list: Array<T>): Array<T | string> {
  return list.reduce((current, item) => [...current, ' ', item], []).slice(1);
}

export interface FormItemContext {
  vertical: boolean;
}

export default class FormItem extends React.Component<FormItemProps, any> {
  static defaultProps = {
    hasFeedback: false,
    colon: true,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(ValidateStatuses),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool,
  };

  static contextTypes = {
    vertical: PropTypes.bool,
  };

  context: FormItemContext;

  helpShow = false;

  componentDidMount() {
    warning(
      this.getControls(this.props.children, true).length <= 1,
      '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' +
        'while there are more than one `getFieldDecorator` in it.',
    );
  }

  getHelpMessage() {
    const { help } = this.props;
    if (help === undefined && this.getOnlyControl()) {
      const errors = this.getField().errors;
      if (errors) {
        return intersperseSpace(
          errors.map((e: any, index: number) => {
            let node: React.ReactElement<any> | null = null;

            if (React.isValidElement(e)) {
              node = e;
            } else if (React.isValidElement(e.message)) {
              node = e.message;
            }

            return node ? React.cloneElement(node, { key: index }) : e.message;
          }),
        );
      }
      return '';
    }
    return help;
  }

  getControls(children: React.ReactNode, recursively: boolean) {
    let controls: React.ReactElement<any>[] = [];
    const childrenArray = React.Children.toArray(children);
    for (let i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }

      const child = childrenArray[i] as React.ReactElement<any>;
      if (
        child.type &&
        ((child.type as any) === FormItem || (child.type as any).displayName === 'FormItem')
      ) {
        continue;
      }
      if (!child.props) {
        continue;
      }
      if (FIELD_META_PROP in child.props) {
        // And means FIELD_DATA_PROP in child.props, too.
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(this.getControls(child.props.children, recursively));
      }
    }
    return controls;
  }

  getOnlyControl() {
    const child = this.getControls(this.props.children, false)[0];
    return child !== undefined ? child : null;
  }

  getChildProp(prop: string) {
    const child = this.getOnlyControl() as React.ReactElement<any>;
    return child && child.props && child.props[prop];
  }

  getId() {
    return this.getChildProp('id');
  }

  getMeta() {
    return this.getChildProp(FIELD_META_PROP);
  }

  getField() {
    return this.getChildProp(FIELD_DATA_PROP);
  }

  onHelpAnimEnd = (_key: string, helpShow: boolean) => {
    this.helpShow = helpShow;
    if (!helpShow) {
      this.setState({});
    }
  };

  renderHelp(prefixCls: string) {
    const help = this.getHelpMessage();
    const children = help ? (
      <div className={`${prefixCls}-explain`} key="help">
        {help}
      </div>
    ) : null;
    if (children) {
      this.helpShow = !!children;
    }
    return (
      <Animate
        transitionName="show-help"
        component=""
        transitionAppear
        key="help"
        onEnd={this.onHelpAnimEnd}
      >
        {children}
      </Animate>
    );
  }

  renderExtra(prefixCls: string) {
    const { extra } = this.props;
    return extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
  }

  getValidateStatus() {
    const onlyControl = this.getOnlyControl();
    if (!onlyControl) {
      return '';
    }
    const field = this.getField();
    if (field.validating) {
      return 'validating';
    }
    if (field.errors) {
      return 'error';
    }
    const fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success';
    }
    return '';
  }

  renderValidateWrapper(
    prefixCls: string,
    c1: React.ReactNode,
    c2: React.ReactNode,
    c3: React.ReactNode,
  ) {
    const props = this.props;
    const onlyControl = this.getOnlyControl;
    const validateStatus =
      props.validateStatus === undefined && onlyControl
        ? this.getValidateStatus()
        : props.validateStatus;

    let classes = `${prefixCls}-item-control`;
    if (validateStatus) {
      classes = classNames(`${prefixCls}-item-control`, {
        'has-feedback': props.hasFeedback || validateStatus === 'validating',
        'has-success': validateStatus === 'success',
        'has-warning': validateStatus === 'warning',
        'has-error': validateStatus === 'error',
        'is-validating': validateStatus === 'validating',
      });
    }

    let iconType = '';
    switch (validateStatus) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      case 'error':
        iconType = 'close-circle';
        break;
      case 'validating':
        iconType = 'loading';
        break;
      default:
        iconType = '';
        break;
    }

    const icon =
      props.hasFeedback && iconType ? (
        <span className={`${prefixCls}-item-children-icon`}>
          <Icon type={iconType} theme={iconType === 'loading' ? 'outlined' : 'filled'} />
        </span>
      ) : null;

    return (
      <div className={classes}>
        <span className={`${prefixCls}-item-children`}>
          {c1}
          {icon}
        </span>
        {c2}
        {c3}
      </div>
    );
  }

  renderWrapper(prefixCls: string, children: React.ReactNode) {
    const { wrapperCol } = this.props;
    const className = classNames(
      `${prefixCls}-item-control-wrapper`,
      wrapperCol && wrapperCol.className,
    );
    return (
      <Col {...wrapperCol} className={className} key="wrapper">
        {children}
      </Col>
    );
  }

  isRequired() {
    const { required } = this.props;
    if (required !== undefined) {
      return required;
    }
    if (this.getOnlyControl()) {
      const meta = this.getMeta() || {};
      const validate = meta.validate || [];

      return validate
        .filter((item: any) => !!item.rules)
        .some((item: any) => {
          return item.rules.some((rule: any) => rule.required);
        });
    }
    return false;
  }

  // Resolve duplicated ids bug between different forms
  // https://github.com/ant-design/ant-design/issues/7351
  onLabelClick = (e: any) => {
    const { label } = this.props;
    const id = this.props.id || this.getId();
    if (!id) {
      return;
    }
    const controls = document.querySelectorAll(`[id="${id}"]`);
    if (controls.length !== 1) {
      // Only prevent in default situation
      // Avoid preventing event in `label={<a href="xx">link</a>}``
      if (typeof label === 'string') {
        e.preventDefault();
      }
      const formItemNode = ReactDOM.findDOMNode(this) as Element;
      const control = formItemNode.querySelector(`[id="${id}"]`) as HTMLElement;
      if (control && control.focus) {
        control.focus();
      }
    }
  };

  renderLabel(prefixCls: string) {
    const { label, labelCol, colon, id } = this.props;
    const context = this.context;
    const required = this.isRequired();

    const labelColClassName = classNames(`${prefixCls}-item-label`, labelCol && labelCol.className);
    const labelClassName = classNames({
      [`${prefixCls}-item-required`]: required,
    });

    let labelChildren = label;
    // Keep label is original where there should have no colon
    const haveColon = colon && !context.vertical;
    // Remove duplicated user input colon
    if (haveColon && typeof label === 'string' && (label as string).trim() !== '') {
      labelChildren = (label as string).replace(/[：|:]\s*$/, '');
    }

    return label ? (
      <Col {...labelCol} className={labelColClassName} key="label">
        <label
          htmlFor={id || this.getId()}
          className={labelClassName}
          title={typeof label === 'string' ? label : ''}
          onClick={this.onLabelClick}
        >
          {labelChildren}
        </label>
      </Col>
    ) : null;
  }

  renderChildren(prefixCls: string) {
    const { children } = this.props;
    return [
      this.renderLabel(prefixCls),
      this.renderWrapper(
        prefixCls,
        this.renderValidateWrapper(
          prefixCls,
          children,
          this.renderHelp(prefixCls),
          this.renderExtra(prefixCls),
        ),
      ),
    ];
  }

  renderFormItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, style, colon, className } = this.props;
    const prefixCls = getPrefixCls('form', customizePrefixCls);
    const children = this.renderChildren(prefixCls);
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: this.helpShow,
      [`${prefixCls}-item-no-colon`]: !colon,
      [`${className}`]: !!className,
    };
    return (
      <Row className={classNames(itemClassName)} style={style}>
        {children}
      </Row>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderFormItem}</ConfigConsumer>;
  }
}
