/**
 * vmc.simple.slide v1.0.1
 * 维米客响应式JQuery图片轮播插件
 * 维米客网页工作室 Vomoc Studio
 * www.vomoc.com
 * vomoc@qq.com
 * 2017/03/14
 **/
;(function ($, undefined) {
    var dataKey = "vomoc";
    $.fn.vmcSimpleSlide = function (settings) {
        var run = $.type(settings) === "string", args = [].slice.call(arguments, 1);
        if (!this.length) {
            return
        }
        return this.each(function () {
            var $element = $(this), instance = $element.data(dataKey);
            if (run && settings.charAt(0) !== "_" && instance) {
                vmcSimpleSlide.prototype[settings] && vmcSimpleSlide.prototype[settings].apply(instance, args)
            } else {
                if (!run && !instance) {
                    instance = new vmcSimpleSlide($element, settings);
                    instance._init();
                    $element.data(dataKey, instance)
                }
            }
        })
    };
    var vmcSimpleSlide = function ($element, settings) {
        var the = this;
        the.options = $.extend({}, the.options, settings);
        the.original = $element.children().first();
        the.parent = $element;
        the.elem = null;
        the.items = [];
        the.summaries = [];
        the.animateStatus = false;
        the.timer = null;
        the.index = 0;
        the.width = 0;
        the.height = 0;
        the.auto = the.options.auto;
        the.tinyIE = navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9
    };
    vmcSimpleSlide.prototype.options = {
        data: [],
        width: "auto",
        height: "auto",
        minWidth: 0,
        minHeight: 0,
        auto: true,
        autoPlayDirection: "right",
        duration: 4000,
        speed: 600,
        showSideButton: true,
        showBottomButton: true,
        showSummary: "auto",
        summaryIsHtml: false,
        hoverStop: true
    };
    vmcSimpleSlide.prototype._init = function () {
        var the = this, $original = the.original, opts = the.options;
        the.elem = $("<div>").addClass("vmc-simple-slide-wrap");
        var $move = $("<ul>").addClass("vmc-simple-slide");
        $original.children().each(function () {
            var $dom = $(this), imgSrc = $dom.find("img").attr("src");
            var $item = $("<li>").addClass("vmc-simple-slide-item").css({backgroundImage: "url(" + imgSrc + ")"});
            if (the.tinyIE) {
                var $img = $("<img>").addClass("vmc-simple-slide-img").attr("src", imgSrc);
                $item.append($img)
            }
            the.items.push($item);
            the.summaries.push($dom.attr("title"))
        });
        var $pageButtons = $("<div>").addClass("vmc-simple-slide-page-buttons").toggle(opts.showSideButton);
        var $pageNext = $("<div>").addClass("vmc-simple-slide-page-button next").on("click", function () {
            the._next()
        });
        var $pagePrev = $("<div>").addClass("vmc-simple-slide-page-button prev").on("click", function () {
            the._prev()
        });
        $pageButtons.append($pageNext).append($pagePrev);
        var $handleButtons = $("<ul>").addClass("vmc-simple-slide-handle-buttons").toggle(opts.showBottomButton).on("click", "li", function () {
            the._goto($(this).index())
        });
        for (var i = 0; i < the.items.length; i++) {
            var $button = $("<li>").addClass("vmc-simple-slide-handle-button");
            $handleButtons.append($button)
        }
        var $textMask = $("<div>").addClass("vmc-simple-slide-summary-mask");
        var $text = $("<div>").addClass("vmc-simple-slide-summary");
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
        $(window).on("resize", function () {
            the._setSize();
            $move.stop(true, true)
        });
        the.elem.on("mouseenter", function () {
            $pageButtons.children().addClass("hover");
            if (opts.hoverStop) {
                clearTimeout(the.timer);
                the.auto = false
            }
        }).on("mouseleave", function () {
            $pageButtons.children().removeClass("hover");
            if (opts.hoverStop) {
                the.auto = the.options.auto;
                the._auto()
            }
        })
    };
    vmcSimpleSlide.prototype._next = function () {
        var the = this;
        var index = the.index + 1;
        index = index >= the.items.length ? 0 : index;
        the._play(index, "right")
    };
    vmcSimpleSlide.prototype._prev = function () {
        var the = this;
        var index = the.index - 1;
        index = index < 0 ? the.items.length - 1 : index;
        the._play(index, "left")
    };
    vmcSimpleSlide.prototype._goto = function (index) {
        var the = this;
        index = index > the.items.length - 1 ? the.items.length - 1 : index;
        index = index < 0 ? 0 : index;
        if (index > the.index) {
            the._play(index, "right")
        } else {
            if (index < the.index) {
                the._play(index, "left")
            }
        }
    };
    vmcSimpleSlide.prototype._play = function (index, direction) {
        var the = this, $move = the.elem.children(".vmc-simple-slide"), opts = the.options;
        clearTimeout(the.timer);
        if (!the.animateStatus && the.items.length > 1) {
            the.animateStatus = true;
            the._setHandleButtons(index);
            the._setSummary(index);
            if (direction === "left") {
                $move.stop(true, false).prepend(the.items[index]).css({marginLeft: -the.width}).animate({marginLeft: 0}, opts.speed, function () {
                    the.items[the.index].remove();
                    the.index = index;
                    the.animateStatus = false;
                    the._auto()
                })
            } else {
                $move.stop(true, false).append(the.items[index]).animate({marginLeft: -the.width}, opts.speed, function () {
                    $move.css({marginLeft: 0});
                    the.items[the.index].remove();
                    the.index = index;
                    the.animateStatus = false;
                    the._auto()
                })
            }
        }
    };
    vmcSimpleSlide.prototype._auto = function () {
        var the = this, opts = the.options;
        if (the.auto) {
            the.timer = setTimeout(function () {
                if (opts.autoPlayDirection === "right") {
                    the._next()
                } else {
                    the._prev()
                }
            }, opts.duration)
        }
    };
    vmcSimpleSlide.prototype._setSize = function () {
        var the = this, opts = the.options;
        the.width = opts.width === "auto" ? the.parent.width() : opts.width;
        the.height = opts.height === "auto" ? the.parent.height() : opts.height;
        the.width = the.width < opts.minWidth ? opts.minWidth : the.width;
        the.height = the.height < opts.minHeight ? opts.minHeight : the.height;
        the.elem.height(the.height).width(the.width);
        for (var i = 0;
             i < the.items.length; i++) {
            the.items[i].height(the.height).width(the.width)
        }
    };
    vmcSimpleSlide.prototype._setHandleButtons = function (index) {
        this.elem.find(".vmc-simple-slide-handle-buttons").children().removeClass("active").eq(index).addClass("active")
    };
    vmcSimpleSlide.prototype._setSummary = function (index) {
        var summary = this.summaries[index] || "";
        var isShow = $.type(this.options.showSummary) === "boolean" ? this.options.showSummary : !!summary;
        var $summary = this.elem.children(".vmc-simple-slide-summary");
        if (this.options.summaryIsHtml) {
            $summary.html(summary)
        } else {
            $summary.html($("<div>").addClass("text").text(summary))
        }
        this.elem.children(".vmc-simple-slide-summary-mask,.vmc-simple-slide-summary").toggle(isShow)
    };
    vmcSimpleSlide.prototype.reSize = function () {
        this._setSize()
    }
})(jQuery);