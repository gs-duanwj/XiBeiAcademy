(function(a,e){var b=a.telerik;b.scripts.push("telerik.window.js");function d(f){return f&&!(/^([a-z]+:)?\/\//i).test(f)}function c(f){if(a.browser.msie&&a.browser.version<7){f.find(".t-resize-e,.t-resize-w").css("height",f.height()).end().find(".t-resize-n,.t-resize-s").css("width",f.width()).end().find(".t-overlay").css({width:f.width(),height:f.height()})}}b.fx.zoom=function(f){this.element=f};b.fx.zoom.prototype={play:function(i,g){var f=this.element.show();var j=f.find("> .t-window-content");var h={width:j.width(),height:j.height(),left:parseInt(f.css("left"))||0,top:parseInt(f.css("top"))||0};f.css({left:h.left+20,top:h.top+20}).animate({left:h.left,top:h.top},i.openDuration);j.css({width:h.width-40,height:h.height-40}).animate({width:h.width,height:h.height},i.openDuration,function(){if(g){g()}})},rewind:function(i,g){var f=this.element;var j=f.find("> .t-window-content");var h={width:j.width(),height:j.height(),left:parseInt(f.css("left")),top:parseInt(f.css("top"))};j.animate({width:h.width-40,height:h.height-40},i.closeDuration);f.animate({left:h.left+20,top:h.top+20},i.closeDuration,function(){f.css({left:h.left,top:h.top}).hide();setTimeout(function(){j.css({width:h.width,height:h.height})},0);if(g){g()}})}};b.fx.zoom.defaults=function(){return{list:[{name:"zoom"}],openDuration:"fast",closeDuration:"fast"}};b.window=function(g,j){this.element=g;var f=a(g),h=a.extend({},j);delete h.title;delete h.content;a.extend(this,h);if(!f.is(".t-window")){f.addClass("t-widget t-window");b.window.create(g,j)}if(!f.is("body")){var i;if(f.is(":visible")){i=f.offset();f.css({top:i.top,left:i.left})}else{f.css({visibility:"hidden",display:""});i=f.offset();f.css({top:i.top,left:i.left}).css({visibility:"visible",display:"none"})}f.toggleClass("t-rtl",f.closest(".t-rtl").length>0).appendTo(document.body)}this.bringToTop();f.bind("mousedown",a.proxy(this.bringToTop,this));if(this.modal&&f.is(":visible")){this.overlay(true).css({opacity:0.5,zIndex:parseInt(f.css("zIndex"),10)-1})}var k=".t-window-titlebar .t-link";f.delegate(k,"mouseenter",b.hover).delegate(k,"mouseleave",b.leave).delegate(k,"click",a.proxy(this.windowActionHandler,this));if(this.resizable){f.delegate(".t-window-titlebar","dblclick",a.proxy(this.toggleMaximization,this)).append(b.window.getResizeHandlesHtml());c(f);(function(o){function m(q){var p=a(o.element);o.initialCursorPosition=p.offset();o.resizeDirection=/t-resize-([nesw]+)/gi.exec(q.$draggable[0].className)[1];o.resizeElement=p.find("> .t-window-content");o.initialSize={width:o.resizeElement.width(),height:o.resizeElement.height()};o.outlineSize={left:o.resizeElement.outerWidth()-o.resizeElement.width()+p.outerWidth()-p.width(),top:o.resizeElement.outerHeight()-o.resizeElement.height()+p.outerHeight()-p.height()+p.find("> .t-window-titlebar").outerHeight()};a('<div class="t-overlay" />').appendTo(o.element);p.find(".t-resize-handle").not(q.$draggable).hide();a(document.body).css("cursor",q.$draggable.css("cursor"))}function l(q){var p=a(o.element);var r={e:function(){var s=b.touchLocation(q),t=s.x-o.initialCursorPosition.left-o.outlineSize.left;o.resizeElement.width((t<o.minWidth?o.minWidth:(o.maxWidth&&t>o.maxWidth)?o.maxWidth:t))},s:function(){var t=b.touchLocation(q),s=t.y-o.initialCursorPosition.top-o.outlineSize.top;o.resizeElement.height((s<o.minHeight?o.minHeight:(o.maxHeight&&s>o.maxHeight)?o.maxHeight:s))},w:function(){var s=b.touchLocation(q),u=o.initialCursorPosition.left+o.initialSize.width;p.css("left",s.x>(u-o.minWidth)?u-o.minWidth:s.x<(u-o.maxWidth)?u-o.maxWidth:s.x);var t=u-s.x;o.resizeElement.width((t<o.minWidth?o.minWidth:(o.maxWidth&&t>o.maxWidth)?o.maxWidth:t))},n:function(){var t=b.touchLocation(q),u=o.initialCursorPosition.top+o.initialSize.height;p.css("top",t.y>(u-o.minHeight)?u-o.minHeight:t.y<(u-o.maxHeight)?u-o.maxHeight:t.y);var s=u-t.y;o.resizeElement.height((s<o.minHeight?o.minHeight:(o.maxHeight&&s>o.maxHeight)?o.maxHeight:s))}};a.each(o.resizeDirection.split(""),function(){r[this]()});c(p);if(a.browser.msie&&parseInt(a.browser.version)>=9){p[0].style.cssText=p[0].style.cssText}b.trigger(o.element,"resize")}function n(q){var p=a(o.element);p.find(".t-overlay").remove().end().find(".t-resize-handle").not(q.$draggable).show();a(document.body).css("cursor","");if(q.keyCode==27){c(p);p.css(o.initialCursorPosition);o.resizeElement.css(o.initialSize)}return false}new b.draggable({owner:o.element,selector:".t-resize-handle",scope:o.element.id+"-resizing",distance:0,start:m,drag:l,stop:n})})(this)}if(this.draggable){(function(o){function m(r){var p=a(o.element),s=b.touchLocation(r);o.initialWindowPosition=p.position();o.startPosition={left:s.x-o.initialWindowPosition.left,top:s.y-o.initialWindowPosition.top};var q=p.find(".t-window-actions");if(q.length>0){if(o.isRtl==e){o.isRtl=a(o.element).closest(".t-rtl").length>0}o.minLeftPosition=q.outerWidth()+parseInt(q.css(o.isRtl?"left":"right"),10)-p.outerWidth()}else{o.minLeftPosition=20-p.outerWidth()}a(".t-resize-handle",o.element).hide();a('<div class="t-overlay" />').appendTo(o.element);a(document.body).css("cursor",r.$draggable.css("cursor"))}function l(q){var r=b.touchLocation(q),p={left:Math.max(r.x-o.startPosition.left,o.minLeftPosition),top:Math.max(r.y-o.startPosition.top,0)};a(o.element).css(p)}function n(p){a(o.element).find(".t-resize-handle").show().end().find(".t-overlay").remove();a(document.body).css("cursor","");if(p.keyCode==27){p.$draggable.closest(".t-window").css(o.initialWindowPosition)}return false}new b.draggable({owner:o.element,selector:".t-window-titlebar",scope:o.element.id+"-moving",start:m,drag:l,stop:n})})(this)}b.bind(this,{open:this.onOpen,activated:this.onActivate,close:this.onClose,refresh:this.onRefresh,resize:this.onResize,error:this.onError,load:this.onLoad,move:this.onMove});a(window).resize(a.proxy(this.onDocumentResize,this));if(d(this.contentUrl)){this.ajaxRequest()}};b.window.prototype={overlay:function(h){var g=a("body > .t-overlay"),f=this.element;if(g.length==0){g=a('<div class="t-overlay" />').toggle(h).insertBefore(f)}else{g.insertBefore(f).toggle(h)}this.positionOverlay(g);return g},positionOverlay:function(g){var f=a(document);if(a.browser.msie&&a.browser.version<7){g.css({width:f.width()-21,height:f.height(),position:"absolute"})}else{if((/ipad/gi).test(navigator.appVersion)){g.css({width:f.width(),height:f.height(),position:"absolute"})}}},overlayOnClose:function(g){var f=this;var i=a(".t-window").filter(function(){var o=a(this);return this!==f.element&&o.is(":visible")&&o.data("tWindow").modal});var n=f.modal&&i.length==0;var l=f.modal?f.overlay(true):a(e);if(n){if(f.effects.list.length>0&&f.effects.list[0].name!="toggle"){l.fadeOut(f.effects.closeDuration,function(){if(g){l.remove()}})}else{if(g){l.remove()}else{l.hide()}}}else{if(i.length>0){var m=parseInt(a(".t-overlay").css("zIndex"),10);var h=0;var k;i.each(function(p,o){var q=parseInt(a(o).css("zIndex"),10);if(q>=h){h=q;k=a(o)}});var j=k.data("tWindow");j.overlay(true).css("zIndex",h-1)}}},windowActionHandler:function(h){var f=a(h.target).closest(".t-link").find(".t-icon"),g=this;a.each({"t-close":this.close,"t-maximize":this.maximize,"t-restore":this.restore,"t-refresh":this.refresh},function(i,j){if(f.hasClass(i)){h.preventDefault();j.call(g);return false}})},center:function(){var f=a(this.element),g=a(window);f.css({left:g.scrollLeft()+Math.max(0,(g.width()-f.width())/2),top:g.scrollTop()+Math.max(0,(g.height()-f.height())/2)});return this},title:function(g){var f=a(".t-window-titlebar > .t-window-title",this.element);if(!g){return f.text()}f.text(g);return this},content:function(g){var f=a("> .t-window-content",this.element);if(!g){return f.html()}f.html(g);return this},bringToTop:function(){var g=0,f=this;a(".t-window").each(function(){var h=a(this);var i=h.css("zIndex");if(!isNaN(i)){g=Math.max(parseInt(i,10),g)}if(this!=f.element&&h.find(".t-window-content > iframe").length>0){h.find(".t-window-content").append("<div class='t-overlay' />")}});a(f.element).css("zIndex",g+2).find(".t-window-content > .t-overlay").remove();return f},open:function(g){var f=a(this.element);this.bringToTop();if(!b.trigger(this.element,"open")){if(this.modal){var h=this.overlay(false).css("zIndex",parseInt(f.css("zIndex"),10)-1);if(this.effects.list.length>0&&this.effects.list[0].name!="toggle"){h.css("opacity",0).show().animate({opacity:0.5},this.effects.openDuration)}else{h.css("opacity",0.5).show()}}if(!f.is(":visible")){b.fx.play(this.effects,f,{},function(){b.trigger(f[0],"activated")})}}if(this.isMaximized){a("html, body").css("overflow","hidden")}return this},close:function(){var f=a(this.element);if(f.is(":visible")){if(!b.trigger(this.element,"close")){this.overlayOnClose();b.fx.rewind(this.effects,f,null,function(){f.hide()})}}if(this.isMaximized){a("html, body").css("overflow","")}return this},toggleMaximization:function(f){if(f&&a(f.target).closest(".t-link").length>0){return}this[this.isMaximized?"restore":"maximize"]()},restore:function(){if(!this.isMaximized){return}a(this.element).css({position:"absolute",left:this.restorationSettings.left,top:this.restorationSettings.top}).find("> .t-window-content").css({width:this.restorationSettings.width,height:this.restorationSettings.height}).end().find(".t-resize-handle").show().end().find(".t-window-titlebar .t-restore").addClass("t-maximize").removeClass("t-restore");a("html, body").css("overflow","");this.isMaximized=false;b.trigger(this.element,"resize");return this},maximize:function(g){if(this.isMaximized){return}var f=a(this.element),h=f.find("> .t-window-content");this.restorationSettings={left:f.position().left,top:f.position().top,width:h.width(),height:h.height()};f.css({left:0,top:0,position:"fixed"}).find(".t-resize-handle").hide().end().find(".t-window-titlebar .t-maximize").addClass("t-restore").removeClass("t-maximize");a("html, body").css("overflow","hidden");this.isMaximized=true;this.onDocumentResize();return this},onDocumentResize:function(){if(!this.isMaximized){return}var f=a(this.element),g=f.find("> .t-window-content");g.css({width:a(window).width()-(g.outerWidth()-g.width()+f.outerWidth()-f.width()),height:a(window).height()-(g.outerHeight()-g.height()+f.outerHeight()-f.height()+f.find("> .t-window-titlebar").outerHeight())});c(f);b.trigger(f,"resize")},refresh:function(){if(d(this.contentUrl)){this.ajaxRequest()}else{var f=a(this.element).find("> .t-window-content > iframe")[0];if(f){f.src=f.src}}return this},ajaxRequest:function(h,f){var g=setTimeout(function(){a(".t-refresh",this.element).addClass("t-loading")},100);a.ajax({type:"GET",url:h||this.contentUrl,dataType:"html",data:f||{},cache:false,error:a.proxy(function(j,i){if(b.ajaxError(this.element,"error",j,i)){return}},this),complete:function(){clearTimeout(g);a(".t-refresh",this.element).removeClass("t-loading")},success:a.proxy(function(i,j){a(".t-window-content",this.element).html(i);b.trigger(this.element,"refresh")},this)})},destroy:function(){a(this.element).remove();this.overlayOnClose(true)}};a.extend(b.window,{create:function(){var g,h,f;if(a.isPlainObject(arguments[0])){h=arguments[0]}else{g=arguments[0];h=a.extend({html:g.innerHTML},arguments[1])}h=a.extend({title:"",html:"",actions:["Close"],visible:true},h);f=h.contentUrl;var i=new b.stringBuilder().catIf('<div class="t-widget t-window">',!g).cat('<div class="t-window-titlebar t-header">').cat('&nbsp;<span class="t-window-title">').cat(h.title).cat("</span>").cat('<div class="t-window-actions t-header">');a.map(h.actions,function(j){i.cat('<a href="#" class="t-link">').cat('<span class="t-icon t-').cat(j.toLowerCase()).cat('">').cat(j).cat("</span></a>")});i.cat("</div></div>").cat('<div class="t-window-content t-content" style="');if(h.width){i.cat("width:").cat(h.width).cat("px;")}if(h.height){i.cat("height:").cat(h.height).cat("px;")}if(typeof(h.scrollable)!=typeof(e)&&h.scrollable===false){i.cat("overflow:hidden;")}i.cat('">').catIf(h.html,!f||(f&&d(f))).catIf('<iframe src="',f,'" title="',h.title,'" frameborder="0" style="border:0;width:100%;height:100%;">This page requires frames in order to show content</iframe>',f&&!d(f)).cat("</div>").catIf("</div>",!g);if(g){a(g).css("display",h.visible?"":"none").html(i.string())}else{delete h.title;return a(i.string()).css("display",h.visible?"":"none").appendTo(document.body).eq(0).tWindow(h)}},getResizeHandlesHtml:function(){var f=new b.stringBuilder();a.each("n e s w se sw ne nw".split(" "),function(g,h){f.cat('<div class="t-resize-handle t-resize-').cat(h).catIf(" t-icon",h=="se").cat('"></div>')});return f.string()}});a.fn.tWindow=function(f){return b.create(this,{name:"tWindow",init:function(g,h){return new b.window(g,h)},success:function(h){var i=h.element,g=a(i);if(g.is(":visible")){b.trigger(i,"open");b.trigger(i,"activated")}},options:f})};a.fn.tWindow.defaults={effects:{list:[{name:"zoom"},{name:"property",properties:["opacity"]}],openDuration:"fast",closeDuration:"fast"},modal:false,resizable:true,draggable:true,minWidth:50,minHeight:50}})(jQuery);