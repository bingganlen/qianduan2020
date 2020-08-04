/**
 * vmc.simple.slide v1.0.1
 * 维米客响应式JQuery图片轮播插件
 * 维米客网页工作室 Vomoc Studio
 * www.vomoc.com
 * vomoc@qq.com
 * 2017/03/14
 **/
;(function ($, undefined) {
    var dataKey = 'vomoc';

    $.fn.vmcSimpleSlide = function (settings) {
        var run = $.type(settings) === 'string',
            args = [].slice.call(arguments, 1);
        if (!this.length) return;
        return this.each(function () {
            var $element = $(this),
                instance = $element.data(dataKey);
            if (run && settings.charAt(0) !== '_' && instance) {
                vmcSimpleSlide.prototype[settings] && vmcSimpleSlide.prototype[settings].apply(instance, args);
            } else if (!run && !instance) {
                instance = new vmcSimpleSlide($element, settings);
                instance._init();
                $element.data(dataKey, instance);
            }
        });
    };

    var vmcSimpleSlide = function ($element, settings) {
        var the = this;
        // 配置
        the.options = $.extend({}, the.options, settings);
        // 原dom
        the.original = $element.children().first();
        // 父层节点
        the.parent = $element;
        // 替换dom
        the.elem = null;
        // 项数组，存放新的li
        the.items = [];
        // 说明文档数组
        the.summaries = [];
        // 动画播放状态
        the.animateStatus = false;
        // 计时器
        the.timer = null;
        // 当前项索引
        the.index = 0;
        // 宽度
        the.width = 0;
        // 高度
        the.height = 0;
        // 是否自动播放
        the.auto = the.options.auto;
        // 是否小于IE9
        the.tinyIE = navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE', '')) < 9;
    };

    vmcSimpleSlide.prototype.options = {
        // 数据
        data: [],
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
        duration: 4000,
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

    /**
     * 初始化
     * @private
     */
    vmcSimpleSlide.prototype._init = function () {
        var the = this,
            $original = the.original,
            opts = the.options;

        the.elem = $('<div>')
            .addClass('vmc-simple-slide-wrap');

        var $move = $('<ul>')
            .addClass('vmc-simple-slide');

        // 整理项
        $original.children().each(function () {
            var $dom = $(this),
                imgSrc = $dom.find('img').attr('src');
            var $item = $('<li>')
                .addClass('vmc-simple-slide-item')
                .css({backgroundImage: 'url(' + imgSrc + ')'});
            if (the.tinyIE) {
                var $img = $('<img>')
                    .addClass('vmc-simple-slide-img')
                    .attr('src', imgSrc);
                $item.append($img);
            }
            the.items.push($item);
            the.summaries.push($dom.attr('title'));
        });

        // 侧边翻页按钮
        var $pageButtons = $('<div>')
            .addClass('vmc-simple-slide-page-buttons')
            .toggle(opts.showSideButton);
        var $pageNext = $('<div>')
            .addClass('vmc-simple-slide-page-button next')
            .on('click', function () {
                the._next();
            });
        var $pagePrev = $('<div>')
            .addClass('vmc-simple-slide-page-button prev')
            .on('click', function () {
                the._prev();
            });
        $pageButtons
            .append($pageNext)
            .append($pagePrev);


        // 底部圆点按钮
        var $handleButtons = $('<ul>')
            .addClass('vmc-simple-slide-handle-buttons')
            .toggle(opts.showBottomButton)
            .on('click', 'li', function () {
                the._goto($(this).index());
            });
        for (var i = 0; i < the.items.length; i++) {
            var $button = $('<li>')
                .addClass('vmc-simple-slide-handle-button');
            $handleButtons.append($button);
        }

        // 文字显示层
        var $textMask = $('<div>')
            .addClass('vmc-simple-slide-summary-mask');
        var $text = $('<div>')
            .addClass('vmc-simple-slide-summary');


        $move.append(the.items[the.index]);
        the.elem.append($move);
        the.elem.append($handleButtons);
        the.elem.append($pageButtons);
        the.elem.append($textMask);
        the.elem.append($text);
        $original.replaceWith(the.elem);

        the._setSize();
        the._setHandleButtons(the.index);
        the._setSummary(the.index);
        the._auto();

        // 窗体大小变化
        $(window).on('resize', function () {
            the._setSize();
            $move.stop(true, true);
        });

        // 鼠标进入停止自动播放
        the.elem.on('mouseenter', function () {
            $pageButtons.children().addClass('hover');
            if (opts.hoverStop) {
                clearTimeout(the.timer);
                the.auto = false;
            }
        }).on('mouseleave', function () {
            $pageButtons.children().removeClass('hover');
            if (opts.hoverStop) {
                the.auto = the.options.auto;
                the._auto();
            }
        });
    };

    /**
     * 下一张
     * @private
     */
    vmcSimpleSlide.prototype._next = function () {
        var the = this;
        var index = the.index + 1;
        index = index >= the.items.length ? 0 : index;
        the._play(index, 'right');
    };

    /**
     * 上一张
     * @private
     */
    vmcSimpleSlide.prototype._prev = function () {
        var the = this;
        var index = the.index - 1;
        index = index < 0 ? the.items.length - 1 : index;
        the._play(index, 'left');
    };

    /**
     * 跳转到指定张
     * @param index 跳转目标图片索引
     * @private
     */
    vmcSimpleSlide.prototype._goto = function (index) {
        var the = this;
        index = index > the.items.length - 1 ? the.items.length - 1 : index;
        index = index < 0 ? 0 : index;
        if (index > the.index) {
            the._play(index, 'right');
        } else if (index < the.index) {
            the._play(index, 'left');
        }
    };

    /**
     * 播放
     * @param index 目标图片索引
     * @param direction 方向 left|right
     * @private
     */
    vmcSimpleSlide.prototype._play = function (index, direction) {
        var the = this,
            $move = the.elem.children('.vmc-simple-slide'),
            opts = the.options;

        clearTimeout(the.timer);

        if (!the.animateStatus && the.items.length > 1) {
            the.animateStatus = true;

            // 设置当前园标
            the._setHandleButtons(index);
            // 设置说明文本
            the._setSummary(index);

            if (direction === 'left') {
                // 上一张
                $move
                    .stop(true, false)
                    .prepend(the.items[index])
                    .css({marginLeft: -the.width})
                    .animate({marginLeft: 0}, opts.speed, function () {
                        the.items[the.index].remove();
                        the.index = index;
                        the.animateStatus = false;
                        the._auto();
                    });
            } else {
                // 下一张
                $move
                    .stop(true, false)
                    .append(the.items[index])
                    .animate({marginLeft: -the.width}, opts.speed, function () {
                        $move.css({marginLeft: 0});
                        the.items[the.index].remove();
                        the.index = index;
                        the.animateStatus = false;
                        the._auto();
                    });
            }
        }
    };

    /**
     * 自动播放
     * @private
     */
    vmcSimpleSlide.prototype._auto = function () {
        var the = this,
            opts = the.options;
        if (the.auto) {
            the.timer = setTimeout(function () {
                if (opts.autoPlayDirection === 'right') {
                    the._next();
                } else {
                    the._prev();
                }
            }, opts.duration);
        }
    };

    /**
     * 获取显示尺寸
     * @private
     */
    vmcSimpleSlide.prototype._setSize = function () {
        var the = this,
            opts = the.options;
        the.width = opts.width === 'auto' ? the.parent.width() : opts.width;
        the.height = opts.height === 'auto' ? the.parent.height() : opts.height;
        the.width = the.width < opts.minWidth ? opts.minWidth : the.width;
        the.height = the.height < opts.minHeight ? opts.minHeight : the.height;

        the.elem.height(the.height).width(the.width);
        for (var i = 0; i < the.items.length; i++) {
            the.items[i].height(the.height).width(the.width);
        }
    };

    /**
     * 设置圆点状态
     * @param index 当前展示图片索引
     * @private
     */
    vmcSimpleSlide.prototype._setHandleButtons = function (index) {
        this.elem
            .find('.vmc-simple-slide-handle-buttons')
            .children()
            .removeClass('active')
            .eq(index)
            .addClass('active');
    };

    /**
     * 设置说明文本
     * @param index 当前展示图片索引
     * @private
     */
    vmcSimpleSlide.prototype._setSummary = function (index) {
        var summary = this.summaries[index] || '';
        var isShow = $.type(this.options.showSummary) === 'boolean' ? this.options.showSummary : !!summary;
        var $summary = this.elem.children('.vmc-simple-slide-summary');

        if (this.options.summaryIsHtml) {
            $summary.html(summary);
        } else {
            $summary.html($('<div>').addClass('text').text(summary));
        }

        this.elem
            .children('.vmc-simple-slide-summary-mask,.vmc-simple-slide-summary')
            .toggle(isShow);
    };

    /**
     * 重新渲染尺寸
     */
    vmcSimpleSlide.prototype.reSize = function () {
        this._setSize();
    };

})(jQuery);
