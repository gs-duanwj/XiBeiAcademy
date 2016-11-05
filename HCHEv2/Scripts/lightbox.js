/**
 * jQuery Lightbox Plugin (balupton edition) - Lightboxes for jQuery
 * Copyright (C) 2008 Benjamin Arthur Lupton
 * http://jquery.com/plugins/project/jquerylightbox_bal
 *
 * This file is part of jQuery Lightbox (balupton edition).
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with jQuery Lightbox (balupton edition).  If not, see <http://www.gnu.org/licenses/>.
 */
(function ($) {
    if (typeof $.log === "undefined") {
        if (!$.browser.safari && typeof window.console !== "undefined" && typeof window.console.log === "function") {
            $.log = function () {
                var args = [];
                for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i])
                }
                window.console.log.apply(window.console, args)
            };
            $.console = {
                log: $.log,
                debug: window.console.debug || $.log,
                warn: window.console.warn || $.log,
                error: window.console.error || $.log,
                trace: window.console.trace || $.log
            }
        } else {
            $.log = function () { };
            $.console = {
                log: $.log,
                debug: $.log,
                warn: $.log,
                error: alert,
                trace: $.log
            }
        }
    }
    $.params_to_json = $.params_to_json ||
	function (params) {
	    params = String(params);
	    params = params.substring(params.indexOf("?") + 1);
	    params = params.replace(/\+/g, "%20");
	    if (params.substring(0, 1) === "{" && params.substring(params.length - 1) === "}") {
	        return eval(decodeURIComponent(params))
	    }
	    params = params.split(/\&|\&amp\;/);
	    var json = {};
	    for (var i = 0, n = params.length; i < n; ++i) {
	        var param = params[i] || null;
	        if (param === null) {
	            continue
	        }
	        param = param.split("=");
	        if (param === null) {
	            continue
	        }
	        var key = param[0] || null;
	        if (key === null) {
	            continue
	        }
	        if (typeof param[1] === "undefined") {
	            continue
	        }
	        var value = param[1];
	        key = decodeURIComponent(key);
	        value = decodeURIComponent(value);
	        try {
	            value = eval(value)
	        } catch (e) { }
	        var keys = key.split(".");
	        if (keys.length === 1) {
	            json[key] = value
	        } else {
	            var path = "";
	            for (ii in keys) {
	                key = keys[ii];
	                path += "." + key;
	                eval("json" + path + " = json" + path + " || {}")
	            }
	            eval("json" + path + " = value")
	        }
	    }
	    return json
	};
    $.LightboxClass = function () {
        this.construct()
    };
    $.fn.lightbox = function (options) {
        $.Lightbox = $.Lightbox || new $.LightboxClass();
        if ($.Lightbox.ie6 && !$.Lightbox.ie6_support) {
            return this
        }
        options = $.extend({
            start: false,
            events: true
        }, options);
        var group = $(this);
        if (options.events) {
            $(group).unbind("click").click(function () {
                var obj = $(this);
                if (!$.Lightbox.init($(obj)[0], group)) {
                    return false
                }
                if (!$.Lightbox.start()) {
                    return false
                }
                return false
            });
            $(group).addClass("lightbox-enabled")
        }
        if (options.start) {
            var obj = $(this);
            if (!$.Lightbox.init($(obj)[0], group)) {
                return this
            }
            if (!$.Lightbox.start()) {
                return this
            }
        }
        return this
    };
    $.extend($.LightboxClass.prototype, {
        images: {
            list: [],
            image: false,
            prev: function (image) {
                if (typeof image === "undefined") {
                    image = this.active();
                    if (!image) {
                        return image
                    }
                }
                if (this.first(image)) {
                    return false
                }
                return this.get(image.index - 1)
            },
            next: function (image) {
                if (typeof image === "undefined") {
                    image = this.active();
                    if (!image) {
                        return image
                    }
                }
                if (this.last(image)) {
                    return false
                }
                return this.get(image.index + 1)
            },
            first: function (image) {
                if (typeof image === "undefined") {
                    return this.get(0)
                }
                return image.index === 0
            },
            last: function (image) {
                if (typeof image === "undefined") {
                    return this.get(this.size() - 1)
                }
                return image.index === this.size() - 1
            },
            single: function () {
                return this.size() === 1
            },
            size: function () {
                return this.list.length
            },
            empty: function () {
                return this.size() === 0
            },
            clear: function () {
                this.list = [];
                this.image = false
            },
            active: function (image) {
                if (typeof image === "undefined") {
                    return this.image
                }
                if (image !== false) {
                    image = this.get(image);
                    if (!image) {
                        return image
                    }
                }
                this.image = image;
                return true
            },
            add: function (obj) {
                if (obj[0]) {
                    for (var i = 0; i < obj.length; i++) {
                        this.add(obj[i])
                    }
                    return true
                }
                var image = this.create(obj);
                if (!image) {
                    return image
                }
                image.index = this.size();
                this.list.push(image);
                return true
            },
            create: function (obj) {
                var image = {
                    src: "",
                    title: "",
                    description: "",
                    name: "",
                    index: -1,
                    color: null,
                    width: null,
                    height: null,
                    image: true
                };
                if (obj.image) {
                    image.src = obj.src || image.src;
                    image.title = obj.title || image.title;
                    image.description = obj.description || image.description;
                    image.name = obj.name || image.name;
                    image.color = obj.color || image.color;
                    image.width = obj.width || image.width;
                    image.height = obj.height || image.height;
                    image.index = obj.index || image.index
                } else {
                    if (obj.tagName) {
                        obj = $(obj);
                        if (obj.attr("src") || obj.attr("href")) {
                            image.src = obj.attr("src") || obj.attr("href");
                            image.title = obj.attr("title") || obj.attr("alt") || image.title;
                            image.name = obj.attr("name") || "";
                            image.color = obj.css("backgroundColor");
                            var s = image.title.indexOf(": ");
                            if (s > 0) {
                                image.description = image.title.substring(s + 2) || image.description;
                                image.title = image.title.substring(0, s) || image.title
                            }
                        } else {
                            image = false
                        }
                    } else {
                        image = false
                    }
                }
                if (!image) {
                    $.console.error("We dont know what we have:", obj);
                    return false
                }
                return image
            },
            get: function (image) {
                if (typeof image === "undefined" || image === null) {
                    return this.active()
                } else {
                    if (typeof image === "number") {
                        image = this.list[image] || false
                    } else {
                        image = this.create(image);
                        if (!image) {
                            return false
                        }
                        var f = false;
                        for (var i = 0; i < this.size() ; i++) {
                            var c = this.list[i];
                            if (c.src === image.src && c.title === image.title && c.description === image.description) {
                                f = c
                            }
                        }
                        image = f
                    }
                }
                if (!image) {
                    $.console.error("The desired image does not exist: ", image, this.list);
                    return false
                }
                return image
            },
            debug: function () {
                return $.Lightbox.debug(arguments)
            }
        },
        constructed: false,
        compressed: null,
        src: null,
        baseurl: null,
        files: {
            compressed: {
                js: {
                    lightbox: "/Scripts/jquery.lightbox.min.js",
                    colorBlend: "js/jquery.color.min.js"
                },
                css: {
                    lightbox: "/Content/jquery.lightbox.css"
                }
            },
            uncompressed: {
                js: {
                    lightbox: "js/jquery.lightbox.js",
                    colorBlend: "js/jquery.color.js"
                },
                css: {
                    lightbox: "css/jquery.lightbox.css"
                }
            },
            images: {
                prev: "/Images/lightbox/prev.gif",
                next: "/Images/lightbox/next.gif",
                blank: "/Images/lightbox/blank.gif",
                loading: "/Images/lightbox/loading.gif"
            }
        },
        text: {
            image: "\u56fe\u7247",
            of: "\u5171",
            close: "\u5173\u95ed X",
            closeInfo: "\u60a8\u53ef\u4ee5\u70b9\u51fb\u56fe\u7247\u5916\u7684\u4efb\u4f55\u533a\u57df\u8fdb\u884c\u5173\u95ed",
            download: "\u4e0b\u8f7d",
            help: {
                close: "\u70b9\u51fb\u5173\u95ed",
                interact: "\u9f20\u6807\u7ecf\u8fc7\u7684\u6548\u679c"
            },
            about: {
                text: "jQuery Lightbox\u63d2\u4ef6\uff08balupton\u7248\uff09",
                title: "\u83b7GNU Affero General Public License\u8bb8\u53ef",
                link: "http://jquery.com/plugins/project/jquerylightbox_bal"
            }
        },
        keys: {
            close: "c",
            prev: "p",
            next: "n"
        },
        handlers: {
            show: null
        },
        opacity: 0.9,
        padding: null,
        speed: 400,
        rel: "lightbox",
        auto_relify: true,
        auto_scroll: "follow",
        auto_resize: true,
        ie6: null,
        ie6_support: true,
        ie6_upgrade: true,
        colorBlend: null,
        download_link: true,
        show_helper_text: true,
        show_linkback: true,
        show_info: "auto",
        show_extended_info: "auto",
        options: ["show_helper_text", "auto_scroll", "auto_resize", "download_link", "show_info", "show_extended_info", "ie6_support", "ie6_upgrade", "colorBlend", "baseurl", "files", "text", "show_linkback", "keys", "opacity", "padding", "speed", "rel", "auto_relify"],
        construct: function (options) {
            var initial = typeof this.constructed === "undefined" || this.constructed === false;
            this.constructed = true;
            var domReady = initial;
            options = options || {};
            var prepend = function (item, value) {
                if (typeof item === "object") {
                    for (var i in item) {
                        item[i] = prepend(item[i], value)
                    }
                } else {
                    if (typeof value === "array") {
                        for (var i = 0, n = item.length; i < n; ++i) {
                            item[i] = prepend(item[i], value)
                        }
                    } else {
                        item = value + item
                    }
                }
                return item
            };
            if (initial && (typeof options.files === "undefined")) {
                this.compressed = null;
                var $script = $("script[src*=" + this.files.compressed.js.lightbox + "]:first");
                if ($script.length !== 0) {
                    $.extend(true, this.files, this.files.compressed);
                    this.compressed = true
                } else {
                    $script = $("script[src*=" + this.files.uncompressed.js.lightbox + "]:first");
                    if ($script.length !== 0) {
                        $.extend(true, this.files, this.files.uncompressed);
                        this.compressed = false
                    } else { }
                } if (this.compressed === null) {
                    $.console.error("Lightbox was not able to find it's javascript script tag necessary for auto-inclusion.");
                    domReady = false
                } else {
                    this.src = $script.attr("src");
                    this.baseurl = this.src.substring(0, this.src.indexOf(this.files.js.lightbox));
                    this.files = prepend(this.files, this.baseurl);
                    options = $.extend(options, $.params_to_json(this.src))
                }
            } else {
                if (typeof options.files === "object") {
                    options.files = prepend(options.files, this.baseurl)
                } else {
                    domReady = false
                }
            }
            for (var i in this.options) {
                var name = this.options[i];
                if ((typeof options[name] === "object") && (typeof this[name] === "object")) {
                    this[name] = $.extend(true, this[name], options[name])
                } else {
                    if (typeof options[name] !== "undefined") {
                        this[name] = options[name]
                    }
                }
            }
            delete i;
            if (initial && navigator.userAgent.indexOf("MSIE 6") >= 0) {
                this.ie6 = true
            } else {
                this.ie6 = false
            }
            if (domReady || typeof options.download_link !== "undefined" || typeof options.colorBlend !== "undefined" || typeof options.files === "object" || typeof options.text === "object" || typeof options.show_linkback !== "undefined" || typeof options.scroll_with !== "undefined") {
                $(function () {
                    $.Lightbox.domReady()
                })
            }
            return true
        },
        domReady: function () {
            var bodyEl = document.getElementsByTagName($.browser.safari ? "head" : "body")[0];
            var stylesheets = this.files.css;
            var scripts = this.files.js;
            if (this.ie6 && this.ie6_upgrade) {
                scripts.ie6 = "http://www.savethedevelopers.org/say.no.to.ie.6.js"
            }
            if (this.colorBlend === true && typeof $.colorBlend === "undefined") {
                this.colorBlend = true
            } else {
                this.colorBlend = typeof $.colorBlend !== "undefined";
                delete scripts.colorBlend
            }
            for (stylesheet in stylesheets) {
                var linkEl = document.createElement("link");
                linkEl.type = "text/css";
                linkEl.rel = "stylesheet";
                linkEl.media = "screen";
                linkEl.href = stylesheets[stylesheet];
                linkEl.id = "lightbox-stylesheet-" + stylesheet.replace(/[^a-zA-Z0-9]/g, "");
                $("#" + linkEl.id).remove();
                bodyEl.appendChild(linkEl)
            }
            for (script in scripts) {
                var scriptEl = document.createElement("script");
                scriptEl.type = "text/javascript";
                scriptEl.src = scripts[script];
                scriptEl.id = "lightbox-script-" + script.replace(/[^a-zA-Z0-9]/g, "");
                $("#" + scriptEl.id).remove();
                bodyEl.appendChild(scriptEl)
            }
            delete scripts;
            delete stylesheets;
            delete bodyEl;
            $("#lightbox,#lightbox-overlay").remove();
            $("body").append('<div id="lightbox-overlay"><div id="lightbox-overlay-text">' + (this.show_linkback ? '<p><span id="lightbox-overlay-text-about"><a href="#" title="' + this.text.about.title + '">' + "" + "</a></span></p><p>&nbsp;</p>" : "") + (this.show_helper_text ? '<p><span id="lightbox-overlay-text-close">' + this.text.help.close + '</span><br/>&nbsp;<span id="lightbox-overlay-text-interact">' + this.text.help.interact + "</span></p>" : "") + '</div></div><div id="lightbox"><div id="lightbox-imageBox"><div id="lightbox-imageContainer"><img id="lightbox-image" /><div id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + this.files.images.loading + '" /></a></div></div></div><div id="lightbox-infoBox"><div id="lightbox-infoContainer"><div id="lightbox-infoHeader"><span id="lightbox-caption">' + (this.download_link ? '<a href="#" title="' + this.text.download + '" id="lightbox-caption-title"></a>' : '<span id="lightbox-caption-title"></span>') + '<span id="lightbox-caption-seperator"></span><span id="lightbox-caption-description"></span></span></div><div id="lightbox-infoFooter"><span id="lightbox-currentNumber"></span><span id="lightbox-close"><a href="#" id="lightbox-close-button" title="' + this.text.closeInfo + '">' + this.text.close + '</a></span></div><div id="lightbox-infoContainer-clear"></div></div></div></div>');
            this.resizeBoxes();
            this.repositionBoxes();
            $("#lightbox,#lightbox-overlay,#lightbox-overlay-text-interact").hide();
            if (this.ie6 && this.ie6_support) {
                $("#lightbox-overlay").css({
                    position: "absolute",
                    top: "0px",
                    left: "0px"
                })
            }
            $.each(this.files.images, function () {
                var preloader = new Image();
                preloader.onload = function () {
                    preloader.onload = null;
                    preloader = null
                };
                preloader.src = this
            });
            $(window).unbind("resize").resize(function () {
                $.Lightbox.resizeBoxes("resized")
            });
            if (this.scroll === "follow") {
                $(window).scroll(function () {
                    $.Lightbox.repositionBoxes()
                })
            }
            $("#lightbox-nav-btnPrev").unbind().hover(function () {
                $(this).css({
                    background: "url(" + $.Lightbox.files.images.prev + ") left 45% no-repeat"
                })
            }, function () {
                $(this).css({
                    background: "transparent url(" + $.Lightbox.files.images.blank + ") no-repeat"
                })
            }).click(function () {
                $.Lightbox.showImage($.Lightbox.images.prev());
                return false
            });
            $("#lightbox-nav-btnNext").unbind().hover(function () {
                $(this).css({
                    background: "url(" + $.Lightbox.files.images.next + ") right 45% no-repeat"
                })
            }, function () {
                $(this).css({
                    background: "transparent url(" + $.Lightbox.files.images.blank + ") no-repeat"
                })
            }).click(function () {
                $.Lightbox.showImage($.Lightbox.images.next());
                return false
            });
            if (this.show_linkback) {
                $("#lightbox-overlay-text-about a").click(function () {
                    window.open($.Lightbox.text.about.link);
                    return false
                })
            }
            $("#lightbox-overlay-text-close").unbind().hover(function () {
                $("#lightbox-overlay-text-interact").fadeIn()
            }, function () {
                $("#lightbox-overlay-text-interact").fadeOut()
            });
            $("#lightbox-caption-title").click(function () {
                window.open($(this).attr("href"));
                return false
            });
            $("#lightbox-overlay, #lightbox, #lightbox-loading-link, #lightbox-btnClose").unbind().click(function () {
                $.Lightbox.finish();
                return false
            });
            if (this.auto_relify) {
                this.relify()
            }
            return true
        },
        relify: function () {
            var groups = {};
            var groups_n = 0;
            var orig_rel = this.rel;
            $.each($("[rel*=" + orig_rel + "]"), function (index, obj) {
                var rel = $(obj).attr("rel");
                if (rel === orig_rel) {
                    rel = groups_n
                }
                if (typeof groups[rel] === "undefined") {
                    groups[rel] = [];
                    groups_n++
                }
                groups[rel].push(obj)
            });
            $.each(groups, function (index, group) {
                $(group).lightbox()
            });
            return true
        },
        init: function (image, images) {
            if (typeof images === "undefined") {
                images = image;
                image = 0
            }
            this.images.clear();
            if (!this.images.add(images)) {
                return false
            }
            if (this.images.empty()) {
                $.console.warn("WARNING", "Lightbox started, but no images: ", image, images);
                return false
            }
            if (!this.images.active(image)) {
                return false
            }
            return true
        },
        start: function () {
            this.visible = true;
            if (this.scroll === "disable") {
                $(document.body).css("overflow", "hidden")
            }
            $("embed, object, select").css("visibility", "hidden");
            this.resizeBoxes("general");
            this.repositionBoxes({
                speed: 0
            });
            $("#lightbox-infoFooter").hide();
            $("#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-infoBox").hide();
            $("#lightbox-overlay").css("opacity", this.opacity).fadeIn(400, function () {
                $("#lightbox").fadeIn(300);
                if (!$.Lightbox.showImage($.Lightbox.images.active())) {
                    $.Lightbox.finish();
                    return false
                }
            });
            return true
        },
        finish: function () {
            $("#lightbox").hide();
            $("#lightbox-overlay").fadeOut(function () {
                $("#lightbox-overlay").hide()
            });
            $("embed, object, select").css({
                visibility: "visible"
            });
            this.images.active(false);
            if (this.scroll === "disable") {
                $(document.body).css("overflow", "visible")
            }
            this.visible = false
        },
        resizeBoxes: function (type) {
            if (type !== "transition") {
                var $body = $(this.ie6 ? document.body : document);
                $("#lightbox-overlay").css({
                    width: $body.width(),
                    height: $body.height()
                });
                delete $body
            }
            switch (type) {
                case "general":
                    return true;
                    break;
                case "resized":
                    if (this.auto_resize === false) {
                        this.repositionBoxes({
                            nHeight: nHeight,
                            speed: this.speed
                        });
                        return true
                    }
                case "transition":
                default:
                    break
            }
            var image = this.images.active();
            if (!image || !image.width || !this.visible) {
                return false
            }
            var iWidth = image.width;
            var iHeight = image.height;
            var wWidth = $(window).width();
            var wHeight = $(window).height();
            if (this.auto_resize !== false) {
                var maxWidth = Math.floor(wWidth * (4 / 5));
                var maxHeight = Math.floor(wHeight * (4 / 5));
                var resizeRatio;
                while (iWidth > maxWidth || iHeight > maxHeight) {
                    if (iWidth > maxWidth) {
                        resizeRatio = maxWidth / iWidth;
                        iWidth = maxWidth;
                        iHeight = Math.floor(iHeight * resizeRatio)
                    }
                    if (iHeight > maxHeight) {
                        resizeRatio = maxHeight / iHeight;
                        iHeight = maxHeight;
                        iWidth = Math.floor(iWidth * resizeRatio)
                    }
                }
            }
            var cWidth = $("#lightbox-imageBox").width();
            var cHeight = $("#lightbox-imageBox").height();
            var nWidth = (iWidth + (this.padding * 2));
            var nHeight = (iHeight + (this.padding * 2));
            var dWidth = cWidth - nWidth;
            var dHeight = cHeight - nHeight;
            $("#lightbox-nav-btnPrev,#lightbox-nav-btnNext").css("height", nHeight);
            $("#lightbox-infoBox").css("width", nWidth);
            if (type === "transition") {
                if (dWidth === 0 && dHeight === 0) {
                    this.pause(this.speed / 3);
                    this.showImage(null, 3)
                } else {
                    $("#lightbox-image").width(iWidth).height(iHeight);
                    $("#lightbox-imageBox").animate({
                        width: nWidth,
                        height: nHeight
                    }, this.speed, function () {
                        $.Lightbox.showImage(null, 3)
                    })
                }
            } else {
                $("#lightbox-image").animate({
                    width: iWidth,
                    height: iHeight
                }, this.speed);
                $("#lightbox-imageBox").animate({
                    width: nWidth,
                    height: nHeight
                }, this.speed)
            }
            this.repositionBoxes({
                nHeight: nHeight,
                speed: this.speed
            });
            return true
        },
        repositioning: false,
        reposition_failsafe: false,
        repositionBoxes: function (options) {
            if (this.repositioning) {
                this.reposition_failsafe = true;
                return null
            }
            this.repositioning = true;
            options = $.extend({}, options);
            options.callback = options.callback || null;
            options.speed = options.speed || "slow";
            var pageScroll = this.getPageScroll();
            var nHeight = options.nHeight || parseInt($("#lightbox").height(), 10);
            var nTop = pageScroll.yScroll + ($(window).height() - nHeight) / 2.5;
            var nLeft = pageScroll.xScroll;
            var css = {
                left: nLeft,
                top: nTop
            };
            if (options.speed) {
                $("#lightbox").animate(css, "slow", function () {
                    if ($.Lightbox.reposition_failsafe) {
                        $.Lightbox.repositioning = $.Lightbox.reposition_failsafe = false;
                        $.Lightbox.repositionBoxes(options)
                    } else {
                        $.Lightbox.repositioning = false;
                        if (options.callback) {
                            options.callback()
                        }
                    }
                })
            } else {
                $("#lightbox").css(css);
                if (this.reposition_failsafe) {
                    this.repositioning = this.reposition_failsafe = false;
                    this.repositionBoxes(options)
                } else {
                    this.repositioning = false
                }
            }
            return true
        },
        visible: false,
        showImage: function (image, step) {
            image = this.images.get(image);
            if (!image) {
                return image
            }
            step = step || 1;
            var skipped_step_1 = step > 1 && this.images.active().src !== image.src;
            var skipped_step_2 = step > 2 && $("#lightbox-image").attr("src") !== image.src;
            if (skipped_step_1 || skipped_step_2) {
                $.console.info("We wanted to skip a few steps: ", image, step, skipped_step_1, skipped_step_2);
                step = 1
            }
            switch (step) {
                case 1:
                    this.KeyboardNav_Disable();
                    $("#lightbox-loading").show();
                    $("#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-infoBox").hide();
                    $("#lightbox-imageBox").unbind();
                    if (!this.images.active(image)) {
                        return false
                    }
                    if (image.width && image.height) {
                        this.showImage(null, 2)
                    } else {
                        var preloader = new Image();
                        preloader.onload = function () {
                            image.width = preloader.width;
                            image.height = preloader.height;
                            $.Lightbox.showImage(null, 2);
                            preloader.onload = null;
                            preloader = null
                        };
                        preloader.src = image.src
                    }
                    break;
                case 2:
                    $("#lightbox-image").attr("src", image.src);
                    if (typeof this.padding === "undefined" || this.padding === null || isNaN(this.padding)) {
                        this.padding = parseInt($("#lightbox-imageContainer").css("padding-left"), 10) || parseInt($("#lightbox-imageContainer").css("padding"), 10) || 0
                    }
                    if (this.colorBlend) {
                        $("#lightbox-overlay").animate({
                            backgroundColor: image.color
                        }, this.speed * 2);
                        $("#lightbox-imageBox").css("borderColor", image.color)
                    }
                    this.resizeBoxes("transition");
                    break;
                case 3:
                    $("#lightbox-loading").hide();
                    $("#lightbox-image").fadeIn(this.speed * 1.5, function () {
                        $.Lightbox.showImage(null, 4)
                    });
                    this.preloadNeighbours();
                    if (this.handlers.show !== null) {
                        this.handlers.show(image)
                    }
                    break;
                case 4:
                    var $title = $("#lightbox-caption-title").html(image.title || "");
                    if (this.download_link) {
                        $title.attr("href", this.download_link ? image.src : "")
                    }
                    delete $title;
                    $("#lightbox-caption-seperator").html(image.description ? ": " : "");
                    $("#lightbox-caption-description").html(image.description || "&nbsp;");
                    if (this.images.size() > 1) {
                        $("#lightbox-currentNumber").html(this.text.image + "&nbsp;" + (image.index + 1) + "&nbsp;" + this.text.of + "&nbsp;" + this.images.size())
                    } else {
                        $("#lightbox-currentNumber").html("&nbsp;")
                    }
                    $("#lightbox-imageBox").unbind("mouseover").mouseover(function () {
                        $("#lightbox-infoBox:not(:visible)").stop().slideDown("fast")
                    });
                    $("#lightbox-infoBox").unbind("mouseover").mouseover(function () {
                        $("#lightbox-infoFooter:not(:visible)").stop().slideDown("fast")
                    });
                    if (this.show_extended_info === true) {
                        $("#lightbox-imageBox").trigger("mouseover");
                        $("#lightbox-infoBox").trigger("mouseover")
                    } else {
                        if (this.show_info === true) {
                            $("#lightbox-imageBox").trigger("mouseover")
                        }
                    }
                    $("#lightbox-nav-btnPrev, #lightbox-nav-btnNext").css({
                        background: "transparent url(" + this.files.images.blank + ") no-repeat"
                    });
                    if (!this.images.first(image)) {
                        $("#lightbox-nav-btnPrev").show()
                    }
                    if (!this.images.last(image)) {
                        $("#lightbox-nav-btnNext").show()
                    }
                    $("#lightbox-nav").show();
                    this.KeyboardNav_Enable();
                    break;
                default:
                    $.console.error("Don't know what to do: ", image, step);
                    return this.showImage(image, 1)
            }
            return true
        },
        preloadNeighbours: function () {
            if (this.images.single() || this.images.empty()) {
                return true
            }
            var image = this.images.active();
            if (!image) {
                return image
            }
            var prev = this.images.prev(image);
            var objNext;
            if (prev) {
                objNext = new Image();
                objNext.src = prev.src
            }
            var next = this.images.next(image);
            if (next) {
                objNext = new Image();
                objNext.src = next.src
            }
        },
        KeyboardNav_Enable: function () {
            $(document).keydown(function (objEvent) {
                $.Lightbox.KeyboardNav_Action(objEvent)
            })
        },
        KeyboardNav_Disable: function () {
            $(document).unbind("keydown")
        },
        KeyboardNav_Action: function (objEvent) {
            objEvent = objEvent || window.event;
            var keycode = objEvent.keyCode;
            var escapeKey = objEvent.DOM_VK_ESCAPE || 27;
            var key = String.fromCharCode(keycode).toLowerCase();
            if (key === this.keys.close || keycode === escapeKey) {
                return $.Lightbox.finish()
            }
            if (key === this.keys.prev || keycode === 37) {
                return $.Lightbox.showImage($.Lightbox.images.prev())
            }
            if (key === this.keys.next || keycode === 39) {
                return $.Lightbox.showImage($.Lightbox.images.next())
            }
            return true
        },
        getPageScroll: function () {
            var xScroll, yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
                xScroll = self.pageXOffset
            } else {
                if (document.documentElement && document.documentElement.scrollTop) {
                    yScroll = document.documentElement.scrollTop;
                    xScroll = document.documentElement.scrollLeft
                } else {
                    if (document.body) {
                        yScroll = document.body.scrollTop;
                        xScroll = document.body.scrollLeft
                    }
                }
            }
            var arrayPageScroll = {
                xScroll: xScroll,
                yScroll: yScroll
            };
            return arrayPageScroll
        },
        pause: function (ms) {
            var date = new Date();
            var curDate = null;
            do {
                curDate = new Date()
            } while (curDate - date < ms)
        }
    });
    if (typeof $.Lightbox === "undefined") {
        $.Lightbox = new $.LightboxClass()
    }
})(jQuery);