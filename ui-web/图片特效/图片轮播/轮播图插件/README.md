# vmc.simple.slide 简单的JQuery响应式幻灯片(图片轮播)插件

### 带丰富转场效果的轮播图插件 [点击这里](https://github.com/vomoc/vmc.slide)

## 演示

[demo](https://vomoc.github.io/vmc.simple.slide/test/)

## 使用

```
// 引用
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="vmc.simple.slide.min.js"></script>
```

```
// HTML
<div class="box" id="slide">
    <ul>
        <li title="这里输入图片相关文字"><img src="demo1.jpg"></li>
        <li><img src="demo2.jpg"></li>
        <li><img src="demo3.jpg"></li>
    </ul>
</div>
```

```
// 选项
var option = {
     // 宽度 auto|number
     width: 'auto',
     // 高度 auto|number
     height: 'auto',
     // 最小宽度 number
     minWidth: 0,
     // 最小高度 number
     minHeight: 0,
     // 自动播放 true|false
     auto: true,
     // 自动播放方向，可选值right|left
     autoPlayDirection: 'right',
     // 图片停留时长（毫秒）
     duration: 1000,
     // 转场效果时长（毫秒）
     speed: 600,
     // 显示侧边翻页按钮 true|false
     showSideButton: true,
     // 显示底部圆点按钮 true|false
     showBottomButton: true,
     // 显示文本内容，可选值true|false|auto
     showSummary: 'auto',
     // 文本是否html true|false
     summaryIsHtml: false,
     // 鼠标悬停，停止播放 true|false
     hoverStop: true
};

$('#slide').vmcSimpleSlide(options);
```

## 选项 options

#### width 宽度
- 类型：String/Int
- 可能值：'auto'/number，为'auto'时，宽度继承父层元素宽度
- 默认值：auto

#### height 高度
- 类型：String/Int
- 可能值：auto/number，为'auto'时，高度继承父层元素高度
- 默认值：auto

#### minWidth 最小宽度
- 类型：Int
- 默认值：0

#### minHeight 最小高度
- 类型：Int
- 默认值：0

#### auto 自动播放
- 类型：Boolean
- 默认值：true

#### autoPlayDirection 自动播放方向
- 类型：String
- 可能值：right/left
- 默认值：right

#### duration 图片停留时长（毫秒）
- 类型：Int
- 默认值：4000

#### speed 转场效果时长（毫秒）
- 类型：Int
- 默认值：600

#### showSideButton 显示侧边翻页按钮
- 类型：Boolean
- 默认值：true

#### showBottomButton 显示底部圆点按钮
- 类型：Boolean
- 默认值：true

#### showSummary 显示文本内容
- 类型：Boolean/String
- 可能值：true/false/'auto'，为'auto'时，标签title属性不为空才显示
- 默认值：true

#### summaryIsHtml 文本是否html
- 类型：Boolean
- 默认值：true

#### hoverStop 鼠标悬停，停止播放
- 类型：Boolean
- 默认值：true


## 方法 method

#### reSize 重置尺寸
```
// 示例
$('#slide').vmcSimpleSlide('reSize');
```