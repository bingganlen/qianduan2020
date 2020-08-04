---
order: 99
title:
  zh-CN: 文本域
  en-US: TextArea
debug: true
---

## zh-CN

用于多行输入。

## en-US

For multi-line input.

````jsx
import { Input, Button } from 'antd';

const { TextArea } = Input;

const defaultValue = 'autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。ending';

class Demo extends React.Component {
  state = {
    autoResize: false,
  }

  render() {
    const { autoResize } = this.state;

    return (
      <div>
        <Button onClick={() => this.setState({ autoResize: !autoResize })}>
          Auto Resize: {String(autoResize)}
        </Button>
        <TextArea rows={4} autosize={autoResize} defaultValue={defaultValue} />
      </div>
    );
  }
}


ReactDOM.render(<Demo />, mountNode);
````
