﻿//jia 0915+
if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
    var browser = navigator.appName
    var b_version = navigator.appVersion
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");
}
//jia+ 0915 end
(function (a) {
	try {
		if (document.execCommand) {
			document.execCommand("BackgroundImageCache", false, true)
		}
	} catch (v) {}
	var r = /\d/;
	var av = /\s+/;
	var au = parseInt(a.browser.version.substring(0, 5).replace(".", ""));
	var F = a.browser.mozilla && au >= 180 && au <= 191;
	var s = /d{1,4}|M{1,4}|yy(?:yy)?|([Hhmstf])\1*|"[^"]*"|'[^']*'/g;
	var T = (navigator.userAgent.search(/like\sMac\sOS\sX;.*Mobile\/\S+/) != -1);
	var U = (navigator.userAgent.search(/4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/) != -1);
	var at = (function() {
		var e = new a.Event("triggerHandlerTest");
		a("<div />").triggerHandler(e);
		return !e.isDefaultPrevented()
	})();
	var b = a.telerik = {
		create: function(ay, az) {
			var e = az.name;
			var ax = a.extend({}, a.fn[e].defaults, az.options);
			return ay.each(function() {
				var aA = a(this);
				ax = a.meta ? a.extend({}, ax, aA.data()) : ax;
				if (!aA.data(e)) {
					var aB = az.init(this, ax);
					aA.data(e, aB);
					b.trigger(this, "load");
					if (az.success) {
						az.success(aB)
					}
				}
			})
		},
		toJson: function(e) {
			function ay(az) {
				return "[" + a.map(az, ax).join(",") + "]"
			}
			function ax(aA) {
				var aB = [];
				for (var az in aA) {
					var aC = aA[az];
					if (a.isArray(aC)) {
						aB.push('"' + az + '":' + ay(aC))
					} else {
						if (typeof aC != "object") {
							aB.push('"' + az + '":"' + (aC == null ? "" : aC) + '"')
						} else {
							aB.push('"' + az + '":' + ax(aC))
						}
					}
				}
				return "{" + aB.join(",") + "}"
			}
			if (a.isArray(e)) {
				return ay(e)
			} else {
				return ax(e)
			}
		},
		delegate: function(e, ax) {
			return function(ay) {
				ax.apply(e, [ay, this])
			}
		},
		stop: function(ax, e) {
			return function(ay) {
				ay.stopPropagation();
				ax.apply(e || this, arguments)
			}
		},
		stopAll: function(ax, e) {
			return function(ay) {
				ay.preventDefault();
				ay.stopPropagation();
				ax.apply(e || this, arguments)
			}
		},
		bind: function(ax, ay) {
			var e = a(ax.element ? ax.element : ax);
			a.each(ay, function(az) {
				if (a.isFunction(this)) {
					e.bind(az, this)
				}
			})
		},
		preventDefault: function(ax) {
			ax.preventDefault()
		},
		hover: function() {
			a(this).addClass("t-state-hover")
		},
		leave: function() {
			a(this).removeClass("t-state-hover")
		},
		buttonHover: function() {
			a(this).addClass("t-button-hover")
		},
		buttonLeave: function() {
			a(this).removeClass("t-button-hover")
		},
		stringBuilder: function() {
			this.buffer = []
		},
		ajaxError: function(e, ax, aA, az) {
			var ay = this.trigger(e, ax, {
				XMLHttpRequest: aA,
				textStatus: az
			});
			if (!ay) {
				if (az == "error" && aA.status != "0") {
					alert("Error! The requested URL returned " + aA.status + " - " + aA.statusText)
				}
				if (az == "timeout") {
					alert("Error! Server timeout.")
				}
			}
			return ay
		},
		trigger: function(ay, az, ax) {
			ax = a.extend(ax || {}, new a.Event(az));
			if (at) {
				a(ay).triggerHandler(ax)
			} else {
				ax.stopPropagation();
				a(ay).trigger(ax)
			}
			return ax.isDefaultPrevented()
		},
		getType: function(e) {
			if (e instanceof Date) {
				return "date"
			}
			if (typeof e === "number") {
				return "number"
			}
			return "object"
		},
		formatString: function() {
			var aC = arguments[0];
			for (var ay = 0, az = arguments.length - 1; ay < az; ay++) {
				var aB = new RegExp("\\{" + ay + "(:([^\\}]+))?\\}", "gm");
				var e = arguments[ay + 1];
				var ax = this.formatters[this.getType(e)];
				if (ax) {
					var aA = aB.exec(aC);
					if (aA) {
						e = ax(e, aA[2])
					}
				}
				aC = aC.replace(aB, function() {
					return e
				})
			}
			return "共" + Math.ceil(arguments[3] / arguments[4]) + "页";
		},
		getElementZIndex: function(e) {
			var ax;
			a(e).parents().andSelf().each(function() {
				ax = a(this).css("zIndex");
				if (Number(ax)) {
					ax = Number(ax) + 1;
					return false
				}
			});
			return ax == "auto" ? 1 : ax
		},
		scrollbarWidth: function() {
			var e = document.createElement("div"),
				ax;
			e.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1";
			e.innerHTML = "&nbsp;";
			document.body.appendChild(e);
			ax = e.offsetWidth - e.scrollWidth;
			document.body.removeChild(e);
			return ax
		},
		lastIndexOf: function(az, e) {
			var ax = e.length;
			for (var ay = az.length - 1; ay > -1; ay--) {
				if (az.substr(ay, ax) == e) {
					return ay
				}
			}
			return -1
		},
		caretPos: function(e) {
			var ax = -1;
			if (document.selection) {
				ax = Math.abs(e.document.selection.createRange().moveStart("character", -e.value.length))
			} else {
				if (e.selectionStart !== undefined) {
					ax = e.selectionStart
				}
			}
			return ax
		},
		encode: function(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00a0/g, "&nbsp;").replace(/'/g, "&#39;")
		},
		formatters: {},
		fx: {},
		cultureInfo: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			abbrDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			shortestDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			abbrMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			longTime: "h:mm:ss tt",
			longDate: "dddd, MMMM dd, yyyy",
			shortDate: "M/d/yyyy",
			shortTime: "h:mm tt",
			fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
			generalDateShortTime: "M/d/yyyy h:mm tt",
			generalDateTime: "M/d/yyyy h:mm:ss tt",
			sortableDateTime: "yyyy'-'MM'-'ddTHH':'mm':'ss",
			universalSortableDateTime: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
			monthYear: "MMMM, yyyy",
			monthDay: "MMMM dd",
			today: "today",
			tomorrow: "tomorrow",
			yesterday: "yesterday",
			next: "next",
			last: "last",
			year: "year",
			month: "month",
			week: "week",
			day: "day",
			am: "AM",
			pm: "PM",
			dateSeparator: "/",
			timeSeparator: ":",
			firstDayOfWeek: 0,
			currencydecimaldigits: 2,
			currencydecimalseparator: ".",
			currencygroupseparator: ",",
			currencygroupsize: 3,
			currencynegative: 0,
			currencypositive: 0,
			currencysymbol: "$",
			numericdecimaldigits: 2,
			numericdecimalseparator: ".",
			numericgroupseparator: ",",
			numericgroupsize: 3,
			numericnegative: 1,
			percentdecimaldigits: 2,
			percentdecimalseparator: ".",
			percentgroupseparator: ",",
			percentgroupsize: 3,
			percentnegative: 0,
			percentpositive: 0,
			percentsymbol: "%"
		},
		patterns: {
			numeric: {
				negative: ["(n)", "-n", "- n", "n-", "n -"]
			},
			currency: {
				positive: ["*n", "n*", "* n", "n *"],
				negative: ["(*n)", "-*n", "*-n", "*n-", "(n*)", "-n*", "n-*", "n*-", "-n *", "-* n", "n *-", "* n-", "* -n", "n- *", "(* n)", "(n *)"]
			},
			percent: {
				positive: ["n *", "n*", "*n"],
				negative: ["-n *", "-n*", "-*n"]
			}
		}
	};
	var C, S;
	if (Array.prototype.filter !== undefined) {
		C = function(e, ax) {
			return e.filter(ax)
		}
	} else {
		C = function(e, az) {
			var aA = [],
				ay = e.length;
			for (var ax = 0; ax < ay; ax++) {
				var aB = e[ax];
				if (az(aB, ax, e)) {
					aA[aA.length] = aB
				}
			}
			return aA
		}
	}
	if (Array.prototype.map !== undefined) {
		S = function(e, ax) {
			return e.map(ax)
		}
	} else {
		S = function(e, ax) {
			var az = e.length,
				aA = new Array(az);
			for (var ay = 0; ay < az; ay++) {
				aA[ay] = ax(e[ay], ay, e)
			}
			return aA
		}
	}
	b.dropDown = function(e) {
		a.extend(this, e);
		this.$element = a(new b.stringBuilder().cat("<div ").catIf(e.attr, e.attr).cat('><ul class="t-reset"></ul></div>').string()).addClass("t-popup t-group").hide();
		this.$element.delegate(".t-reset > .t-item", "mouseenter", b.hover).delegate(".t-reset > .t-item", "mouseleave", b.leave).delegate(".t-reset > .t-item", "click", a.proxy(function(ax) {
			if (this.onClick) {
				this.onClick(a.extend(ax, {
					item: a(ax.target).closest(".t-item")[0]
				}))
			}
		}, this));
		this.$element.tScrollable()
	};
	b.dropDown.prototype = {
		_html: function(ax, aC) {
			var aA = new b.stringBuilder();
			if (ax) {
				for (var aB = 0, aD = ax.length; aB < aD; aB++) {
					var aE = "&nbsp;",
						ay = ax[aB];
					if (ay) {
						if (ay.Text !== undefined) {
							aE = ay.Text
						} else {
							aE = ay
						}
						if (aC) {
							aE = b.encode(aE)
						}
						if (!aE || !aE.replace(av, "")) {
							aE = "&nbsp;"
						}
					}
					var az = {
						html: aE,
						dataItem: ay
					};
					if (this.onItemCreate) {
						this.onItemCreate(az)
					}
					aA.cat('<li unselectable="on" class="t-item">').cat(az.html).cat("</li>")
				}
			}
			return aA.string()
		},
		open: function(ay) {
			if (this.onOpen) {
				this.onOpen()
			}
			if (this.isOpened() || !this.$items) {
				return
			}
			var e = this.$element,
				az;
			if (!e.parent()[0]) {
				e.hide().appendTo(document.body)
			}
			if (e[0].style.width == "") {
				az = ay.outerWidth ? ay.outerWidth - 2 : 0
			} else {
				az = parseInt(this.attr ? a("<div" + this.attr + "></div>")[0].style.width : e[0].style.width)
			}
			e.css("overflowY", "auto").css("width", az);
			var ax = ay.offset;
			ax.top += ay.outerHeight;
			if (T) {
				if (!document.body.scrollLeft && !U) {
					ax.left -= window.pageXOffset
				}
				if (!document.body.scrollTop && !U) {
					ax.top -= window.pageYOffset
				}
			}
			b.fx._wrap(e).css(a.extend({
				position: "absolute",
				zIndex: ay.zIndex
			}, ax));
			if (F) {
				e.css("overflow", "hidden")
			}
			e.parent().show();
			b.fx.play(this.effects, e, {
				direction: "bottom"
			}, a.proxy(function() {
				e.css("overflow", "auto");
				var aA = this.$items.filter(".t-state-selected");
				if (aA.length) {
					this.scrollTo(aA[0])
				}
			}, this))
		},
		close: function(az) {
			if (!this.isOpened()) {
				return
			}
			var ax = this.$element;
			var ay = this.$items;
			if (F) {
				ax.css("overflow", "hidden")
			}
			b.fx.rewind(this.effects, ax, {
				direction: "bottom"
			}, function() {
				if (F) {
					ax.css("overflow", "auto")
				}
				if (ay) {
					ay.removeClass("t-state-hover")
				}
				if (ax.parent(".t-animation-container")[0]) {
					ax.parent().hide()
				}
			})
		},
		dataBind: function(az, aC) {
			az = az || [];
			var e = this.$element,
				aA = e[0].style.height,
				aB = aA && aA != "auto" ? aA : "200px",
				ay = e.find("> ul");
			ay[0].innerHTML = this._html(az, aC);
			var ax = this.$items = ay.children();
			e.css("height", ax.length > 10 ? aB : "auto")
		},
		highlight: function(e) {
			return a(e).addClass("t-state-selected").siblings().removeClass("t-state-selected").end().index()
		},
		isOpened: function() {
			return this.$element.is(":visible")
		},
		scrollTo: function(aA) {
			if (!aA) {
				return
			}
			var aC = aA.offsetTop;
			var aB = aA.offsetHeight;
			var ax = this.$element[0];
			var az = ax.scrollTop;
			var ay = ax.clientHeight;
			var e = aC + aB;
			ax.scrollTop = az > aC ? aC : e > (az + ay) ? e - ay : az
		}
	};
	b.datetime = function() {
		if (arguments.length == 0) {
			this.value = new Date()
		} else {
			if (arguments.length == 1) {
				this.value = new Date(arguments[0])
			} else {
				if (arguments.length == 3) {
					this.value = new Date(arguments[0], arguments[1], arguments[2])
				} else {
					if (arguments.length == 6) {
						this.value = new Date(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
					} else {
						this.value = new Date(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
					}
				}
			}
		}
		return this
	};
	a.extend(b.datetime, {
		msPerMinute: 60000,
		msPerDay: 86400000,
		add: function(e, aA) {
			var ay = e.timeOffset();
			var ax = new b.datetime(e.time() + aA);
			var az = ax.timeOffset() - ay;
			return new b.datetime(ax.time() + az * b.datetime.msPerMinute)
		},
		subtract: function(e, ax) {
			ax = new b.datetime(ax).toDate();
			var ay = e.time() - ax;
			var az = e.timeOffset() - ax.timeOffset();
			return ay - (az * b.datetime.msPerMinute)
		},
		firstDayOfMonth: function(e) {
			return new b.datetime(0).hours(e.hours()).minutes(e.minutes()).seconds(e.seconds()).milliseconds(e.milliseconds()).year(e.year(), e.month(), 1)
		},
		firstVisibleDay: function(e) {
			var ax = b.cultureInfo.firstDayOfWeek;
			var ay = new b.datetime(e.year(), e.month(), 0, e.hours(), e.minutes(), e.seconds(), e.milliseconds());
			while (ay.day() != ax) {
				b.datetime.modify(ay, -1 * b.datetime.msPerDay)
			}
			return ay
		},
		modify: function(e, aA) {
			var ay = e.timeOffset();
			var ax = new b.datetime(e.time() + aA);
			var az = ax.timeOffset() - ay;
			e.time(ax.time() + az * b.datetime.msPerMinute)
		},
		pad: function(e) {
			if (e < 10) {
				return "0" + e
			}
			return e
		},
		standardFormat: function(e) {
			var ax = b.cultureInfo;
			var ay = {
				d: ax.shortDate,
				D: ax.longDate,
				F: ax.fullDateTime,
				g: ax.generalDateShortTime,
				G: ax.generalDateTime,
				m: ax.monthDay,
				M: ax.monthDay,
				s: ax.sortableDateTime,
				t: ax.shortTime,
				T: ax.longTime,
				u: ax.universalSortableDateTime,
				y: ax.monthYear,
				Y: ax.monthYear
			};
			return ay[e]
		},
		format: function(ax, aB) {
			var aD = b.cultureInfo;
			var e = ax.getDate();
			var az = ax.getDay();
			var aF = ax.getMonth();
			var aI = ax.getFullYear();
			var aC = ax.getHours();
			var aE = ax.getMinutes();
			var aH = ax.getSeconds();
			var aA = ax.getMilliseconds();
			var aG = b.datetime.pad;
			var ay = {
				d: e,
				dd: aG(e),
				ddd: aD.abbrDays[az],
				dddd: aD.days[az],
				M: aF + 1,
				MM: aG(aF + 1),
				MMM: aD.abbrMonths[aF],
				MMMM: aD.months[aF],
				yy: aG(aI % 100),
				yyyy: aI,
				h: aC % 12 || 12,
				hh: aG(aC % 12 || 12),
				H: aC,
				HH: aG(aC),
				m: aE,
				mm: aG(aE),
				s: aH,
				ss: aG(aH),
				f: Math.floor(aA / 100),
				ff: Math.floor(aA / 10),
				fff: aA,
				tt: aC < 12 ? aD.am : aD.pm
			};
			aB = aB || "G";
			aB = b.datetime.standardFormat(aB) ? b.datetime.standardFormat(aB) : aB;
			return aB.replace(s, function(aJ) {
				return aJ in ay ? ay[aJ] : aJ.slice(1, aJ.length - 1)
			})
		},
		parse: function(ax) {
			var ay = ax.value;
			var e = ax.format;
			if (ay && ay.value) {
				return ay
			}
			e = b.datetime.standardFormat(e) ? b.datetime.standardFormat(e) : e;
			if (r.test(ay)) {
				return b.datetime.parseMachineDate({
					value: ay,
					format: e,
					shortYearCutOff: ax.shortYearCutOff,
					baseDate: ax.baseDate,
					AM: b.cultureInfo.am,
					PM: b.cultureInfo.pm
				})
			}
			return b.datetime.parseByToken ? b.datetime.parseByToken(ay, ax.today) : null
		},
		parseMachineDate: function(aS) {
			var e = aS.AM,
				aT = aS.PM,
				aX = aS.value,
				aE = aS.format,
				ax = aS.baseDate,
				aV = aS.shortYearCutOff || 30,
				aZ = -1,
				aQ = -1,
				aC = -1,
				aI = 0,
				aP = 0,
				aU = 0,
				aO = 0,
				aJ, aK, aL = false,
				aN = function(a0) {
					return (aF + 1 < aE.length && aE.charAt(aF + 1) == a0)
				},
				aM = function(a1) {
					var a0 = 0;
					while (aN(a1)) {
						a0++;
						aF++
					}
					return a0
				},
				aH = function(a2) {
					var a0 = new RegExp("^\\d{1," + a2 + "}");
					var a1 = aX.substr(aA).match(a0);
					if (a1) {
						aA += a1[0].length;
						return parseInt(a1[0], 10)
					} else {
						return -1
					}
				},
				aG = function(a1) {
					for (var a0 = 0; a0 < a1.length; a0++) {
						if (aX.substr(aA, a1[a0].length) == a1[a0]) {
							aA += a1[a0].length;
							return a0 + 1
						}
					}
					return -1
				},
				ay = function() {
					if (aX.charAt(aA) == aE.charAt(aF)) {
						aA++;
						return true
					} else {
						return false
					}
				},
				aR = function(a0) {
					return a0 === -1 ? 0 : a0
				},
				az = 0,
				aA = 0,
				aY = aX.length;
			for (var aF = 0, aD = aE.length; aF < aD; aF++) {
				if (aA == aY) {
					break
				}
				if (aL) {
					ay();
					if (aE.charAt(aF) == "'") {
						aL = false
					}
				} else {
					switch (aE.charAt(aF)) {
					case "d":
						az = aM("d");
						aC = az <= 1 ? aH(2) : aG(b.cultureInfo[az == 3 ? "days" : "abbrDays"]);
						break;
					case "M":
						az = aM("M");
						aQ = az <= 1 ? aH(2) : aG(b.cultureInfo[az == 3 ? "months" : "abbrMonths"]);
						aQ -= 1;
						break;
					case "y":
						az = aM("y");
						aZ = aH(az <= 1 ? 2 : 4);
						if (aZ < 0 || aZ.toString().length <= az) {
							return null
						}
						break;
					case "H":
						az = aM("H");
						aI = aR(aH(2));
						break;
					case "h":
						aM("h");
						aI = aR(aH(2));
						break;
					case "m":
						aM("m");
						aP = aR(aH(2));
						break;
					case "s":
						aM("s");
						aU = aR(aH(2));
						break;
					case "f":
						az = aM("f");
						aO = aR(aH(az <= 0 ? 1 : az + 1));
						break;
					case "t":
						az = aM("t");
						e = az > 0 ? e : "a";
						aT = az > 0 ? aT : "p";
						var aW = aX.substr(aA).toLowerCase();
						aJ = aW.indexOf(e.toLowerCase()) != -1;
						aK = aW.indexOf(aT.toLowerCase()) != -1;
						aA += aK ? aT.length : aJ ? e.length : 0;
						break;
					case "'":
						ay();
						aL = true;
						break;
					default:
						if (!ay()) {
							return null
						}
					}
				}
			}
			var aB = new b.datetime();
			if (aZ != -1 && aZ < 100) {
				aZ += aB.year() - aB.year() % 100 + (aZ <= aV ? 0 : -100)
			}
			aI = (aK && aI < 12) ? aI + 12 : aI == 12 && aJ ? 0 : aI;
			if (ax == undefined) {
				if (aZ == -1) {
					aZ = aB.year()
				}
				aB = new b.datetime(aZ, aQ, aC, aI, aP, aU, aO);
				if (aB.year() != aZ || aB.month() != aQ || aB.date() != aC) {
					return null
				}
			} else {
				aB = new b.datetime(aZ != -1 ? aZ : ax.year(), aQ != -1 ? aQ : ax.month(), aC != -1 ? aC : ax.date(), aI, aP, aU, aO);
				if ((aZ != -1 && aB.year() != aZ) || (aQ != -1 && aB.month() != (aQ)) || (aC != -1 && aB.date() != aC) || (aI != -1 && aB.hours() != aI) || (aP != -1 && aB.minutes() != aP) || (aU != -1 && aB.seconds() != aU) || (aO != -1 && aB.milliseconds() != aO)) {
					return null
				}
			}
			return aB
		}
	});
	b.datetime.prototype = {
		year: function() {
			if (arguments.length == 0) {
				return this.value.getFullYear()
			} else {
				if (arguments.length == 1) {
					this.value.setFullYear(arguments[0])
				} else {
					this.value.setFullYear(arguments[0], arguments[1], arguments[2])
				}
			}
			return this
		},
		timeOffset: function() {
			return this.value.getTimezoneOffset()
		},
		day: function() {
			return this.value.getDay()
		},
		toDate: function() {
			return this.value
		},
		addMonth: function(e) {
			this.month(this.month() + e)
		},
		addYear: function(e) {
			this.year(this.year() + e)
		}
	};
	a.each(["Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds", "Time"], function(e, ax) {
		b.datetime.prototype[ax.toLowerCase()] = function() {
			if (arguments.length == 1) {
				this.value["set" + ax](arguments[0])
			} else {
				return this.value["get" + ax]()
			}
			return this
		}
	});
	var p = /[0#?]/;
	var am = /n|p|c/i;

	function aj(ay, ax) {
		var e = Math.pow(10, ax || 0);
		return Math.round(ay * e) / e
	}
	function ai(e) {
		return e.split("").reverse().join("")
	}
	function L(aF, aA, e) {
		var aB = 0,
			aC = 0,
			az = aA.length,
			aG = aF.length,
			ax = new b.stringBuilder();
		while (aB < az && aC < aG && aA.substring(aB).search(p) >= 0) {
			if (aA.charAt(aB).match(p)) {
				ax.cat(aF.charAt(aC++))
			} else {
				ax.cat(aA.charAt(aB))
			}
			aB++
		}
		ax.catIf(aF.substring(aC), aC < aG && e).catIf(aA.substring(aB), aB < az);
		var aD = ai(ax.string()),
			aH;
		if (aD.indexOf("#") > -1) {
			aH = aD.indexOf("0")
		}
		if (aH > -1) {
			var ay = aD.slice(0, aH),
				aE = aD.slice(aH, aD.length);
			aD = ay.replace(/#/g, "") + aE.replace(/#/g, "0")
		} else {
			aD = aD.replace(/#/g, "")
		}
		if (aD.indexOf(",") == 0) {
			aD = aD.replace(/,/g, "")
		}
		return e ? aD : ai(aD)
	}
	b.formatNumber = function(aN, aB, az, aX, aC, aD, aR, aL, a1, aF) {
		if (!aB) {
			return aN
		}
		var a2, ay, aM, a4, aY = aN < 0;
		aB = aB.split(":");
		aB = aB.length > 1 ? aB[1].replace("}", "") : aB[0];
		var aE = p.test(aB) && !am.test(aB);
		if (aE) {
			aB = aB.split(";");
			ay = aB[0];
			aM = aB[1];
			a4 = aB[2];
			aB = (aY && aM ? aM : ay).indexOf("%") != -1 ? "p" : "n"
		}
		switch (aB.toLowerCase().charAt(0)) {
		case "d":
			return Math.round(aN).toString();
		case "c":
			a2 = "currency";
			break;
		case "n":
			a2 = "numeric";
			break;
		case "p":
			a2 = "percent";
			if (!aF) {
				aN = Math.abs(aN) * 100
			}
			break;
		default:
			return aN.toString()
		}
		var aK = aB.match(r);
		if (aK) {
			az = parseInt(aK[0], 10)
		}
		var a5 = function(a9, a6, a8) {
				for (var a7 = a9.length; a7 < a6; a7++) {
					a9 = a8 ? ("0" + a9) : (a9 + "0")
				}
				return a9
			};
		var e = function(a8, a6, a7) {
				if (aC && a7 != 0) {
					var a9 = new RegExp("(-?[0-9]+)([0-9]{" + a7 + "})");
					while (a9.test(a8)) {
						a8 = a8.replace(a9, "$1" + a6 + "$2")
					}
				}
				return a8
			};
		var ax = ax || b.cultureInfo,
			aQ = b.patterns,
			a3;
		az = az || az === 0 ? az : ax[a2 + "decimaldigits"];
		aX = aX !== a3 ? aX : ax[a2 + "decimalseparator"];
		aC = aC !== a3 ? aC : ax[a2 + "groupseparator"];
		aD = aD || aD == 0 ? aD : ax[a2 + "groupsize"];
		aL = aL || aL === 0 ? aL : ax[a2 + "negative"];
		aR = aR || aR === 0 ? aR : ax[a2 + "positive"];
		a1 = a1 || ax[a2 + "symbol"];
		var aA, aI, aT;
		if (aE) {
			var a0 = (aY && aM ? aM : ay).split("."),
				aJ = a0[0],
				aU = a0.length > 1 ? a0[1] : "",
				aH = b.lastIndexOf(aU, "0"),
				aG = b.lastIndexOf(aU, "#");
			az = (aG > aH ? aG : aH) + 1
		}
		var aW = aj(aN, az);
		aN = isFinite(aW) ? aW : aN;
		if (aN.toString().toLowerCase().indexOf("e") > -1) {
			aN = aN.toFixed(az)
		}
		var aZ = aN.toString().split(".");
		aI = aZ[0];
		aI = aY ? aI.replace("-", "") : aI;
		aT = aZ.length > 1 ? aZ[1] : "";
		if (aA) {
			if (!aY) {
				aT = a5(aT, aA, false);
				aI += aT.slice(0, aA);
				aT = aT.substr(aA)
			} else {
				aI = a5(aI, aA + 1, true);
				aT = aI.slice(aA, aI.length) + aT;
				aI = aI.slice(0, aA)
			}
		}
		var aV = aT.length;
		if (az < 1 || (aE && aH == -1 && aV === 0)) {
			aT = ""
		} else {
			aT = aV > az ? aT.slice(0, az) : a5(aT, az, false)
		}
		var aS;
		if (aE) {
			if (aI == 0) {
				aI = ""
			}
			aI = L(ai(aI), ai(aJ), true).replace(/,/g, "");
			aI = aJ.indexOf(",") != -1 ? e(aI, aC, aD) : aI;
			aT = aT && aU ? L(aT, aU) : "";
			aS = aN === 0 && a4 ? a4 : (aY && !aM ? "-" : "") + aI + (aT.length > 0 ? aX + aT : "")
		} else {
			aI = e(aI, aC, aD);
			aQ = aQ[a2];
			var aP = aY ? aQ.negative[aL] : a1 ? aQ.positive[aR] : null;
			var aO = aI + (aT.length > 0 ? aX + aT : "");
			aS = aP ? aP.replace("n", aO).replace("*", a1) : aO
		}
		return aS
	};
	a.extend(b.formatters, {
		date: b.datetime.format,
		number: b.formatNumber
	});
	b.scripts = [];
	var P = [];

	function ah(ax, e) {
		var az = b.scripts;
		ax = a.grep(ax, function(aA) {
			aA = aA.toLowerCase().replace(".min", "");
			if (aA.indexOf("jquery-") > -1 || (aA.indexOf("jquery.validate") > -1 && a.fn.validate) || aA.indexOf("telerik.common") > -1) {
				return false
			}
			var aC = false;
			for (var aB = 0; aB < az.length; aB++) {
				var aD = az[aB];
				if (aA.indexOf(aD) > -1) {
					aC = true;
					break
				}
			}
			return !aC
		});
		var ay = function(aA) {
				if (aA) {
					a.ajax({
						url: aA,
						dataType: "script",
						cache: !a.browser.msie,
						success: function() {
							ay(ax.shift())
						}
					})
				} else {
					e();
					P.shift();
					if (P.length) {
						P[0]()
					}
				}
			};
		ay(ax.shift())
	}
	b.load = function(ax, e) {
		P.push(function() {
			ah(ax, e)
		});
		if (P.length == 1) {
			ah(ax, e)
		}
	};
	b.stringBuilder.prototype = {
		cat: function(e) {
			this.buffer.push(e);
			return this
		},
		rep: function(ay, e) {
			for (var ax = 0; ax < e; ax++) {
				this.cat(ay)
			}
			return this
		},
		catIf: function() {
			var e = arguments;
			if (e[e.length - 1]) {
				for (var ax = 0, ay = e.length - 1; ax < ay; ax++) {
					this.cat(e[ax])
				}
			}
			return this
		},
		string: function() {
			return this.buffer.join("")
		}
	};
	b.isTouch = "ontouchstart" in window;
	var W = "mousemove",
		an = "mousedown",
		x = "mouseup";
	if (b.isTouch) {
		W = "touchmove";
		an = "touchstart";
		x = "touchend"
	}
	a.extend(a.fn, {
		tScrollable: function(e) {
			a(this).each(function() {
				if (b.isTouch || (e && e.force)) {
					new ak(this)
				}
			})
		}
	});

	function ak(e) {
		this.element = e;
		this.wrapper = a(e);
		this._horizontalScrollbar = a('<div class="t-touch-scrollbar" />');
		this._verticalScrollbar = this._horizontalScrollbar.clone();
		this._scrollbars = this._horizontalScrollbar.add(this._verticalScrollbar);
		this._startProxy = a.proxy(this._start, this);
		this._stopProxy = a.proxy(this._stop, this);
		this._dragProxy = a.proxy(this._drag, this);
		this._create()
	}
	b.touchLocation = function(ax) {
		return {
			idx: 0,
			x: ax.pageX,
			y: ax.pageY
		}
	};
	b.eventTarget = function(ax) {
		return ax.target
	};
	b.eventCurrentTarget = function(ax) {
		return ax.currentTarget
	};
	if (b.isTouch) {
		b.touchLocation = function(ay, az) {
			var ax = ay.changedTouches || ay.originalEvent.changedTouches;
			if (az) {
				var aA = null;
				w(ax, function(e, aB) {
					if (az == aB.identifier) {
						aA = {
							idx: aB.identifier,
							x: aB.pageX,
							y: aB.pageY
						}
					}
				});
				return aA
			} else {
				if (ay.type in {
					touchstart: {},
					touchmove: {},
					touchend: {},
					touchcancel: {}
				}) {
					return {
						idx: ax[0].identifier,
						x: ax[0].pageX,
						y: ax[0].pageY
					}
				} else {
					return {
						idx: 0,
						x: ay.pageX,
						y: ay.pageY
					}
				}
			}
		};
		b.eventTarget = function(ax) {
			var ay = "originalEvent" in ax ? ax.originalEvent.changedTouches : "changedTouches" in ax ? ax.changedTouches : null;
			return ay ? document.elementFromPoint(ay[0].clientX, ay[0].clientY) : null
		};
		b.eventCurrentTarget = b.eventTarget
	}
	b.zoomLevel = function() {
		return b.isTouch ? (document.documentElement.clientWidth / window.innerWidth) : 1
	};
	ak.prototype = {
		_create: function() {
			this.wrapper.css("overflow", "hidden").bind(an, a.proxy(this._wait, this))
		},
		_wait: function(ax) {
			var ay = b.touchLocation(ax);
			this.start = {
				x: ay.x + this.wrapper.scrollLeft(),
				y: ay.y + this.wrapper.scrollTop()
			};
			a(document).bind(W, this._startProxy).bind(x, this._stopProxy)
		},
		_start: function(ay) {
			var ax = b.touchLocation(ay);
			this._dragged = false;
			if (this.start.x - ax.x > 10 || this.start.y - ax.y > 10) {
				ay.preventDefault();
				this._dragged = true;
				a(document).unbind(W, this._startProxy).bind(W, this._dragProxy);
				var aD = this.wrapper.innerWidth(),
					az = this.wrapper.innerHeight(),
					aA = this.wrapper.offset(),
					aC = this.wrapper.attr("scrollWidth"),
					aB = this.wrapper.attr("scrollHeight");
				if (aC > aD) {
					this._horizontalScrollbar.appendTo(document.body).css({
						width: Math.floor((aD / aC) * aD),
						left: this.wrapper.scrollLeft() + aA.left + parseInt(this.wrapper.css("borderLeftWidth")),
						top: aA.top + this.wrapper.innerHeight() + parseInt(this.wrapper.css("borderTopWidth")) - this._horizontalScrollbar.outerHeight()
					})
				}
				if (aB > az) {
					this._verticalScrollbar.appendTo(document.body).css({
						height: Math.floor((az / aB) * az),
						top: this.wrapper.scrollTop() + aA.top + parseInt(this.wrapper.css("borderTopWidth")),
						left: aA.left + this.wrapper.innerWidth() + parseInt(this.wrapper.css("borderLeftWidth")) - this._verticalScrollbar.outerWidth()
					})
				}
				this._scrollbars.stop().fadeTo(200, 0.5)
			}
		},
		_drag: function(ay) {
			if (!this._dragged) {
				ay.preventDefault()
			}
			var ax = b.touchLocation(ay),
				aB = this.wrapper.offset(),
				aC = aB.left + parseInt(this.wrapper.css("borderLeftWidth")),
				aD = aB.top + parseInt(this.wrapper.css("borderTopWidth")),
				az = this.start.x - ax.x,
				aF = this.start.y - ax.y,
				aA = Math.max(aC, aC + az),
				aE = Math.max(aD, aD + aF);
			aA = Math.min(aC + this.wrapper.innerWidth() - this._horizontalScrollbar.outerWidth() - this._horizontalScrollbar.outerHeight(), aA);
			aE = Math.min(aD + this.wrapper.innerHeight() - this._verticalScrollbar.outerHeight() - this._verticalScrollbar.outerWidth(), aE);
			this._horizontalScrollbar.css("left", aA);
			this._verticalScrollbar.css("top", aE);
			this.wrapper.scrollLeft(az).scrollTop(aF)
		},
		_stop: function() {
			a(document).unbind(W, this._startProxy).unbind(W, this._dragProxy).unbind(x, this._stopProxy);
			this._scrollbars.stop().fadeTo(400, 0)
		}
	};
	var Z = function(ax, az, ay) {
			if (az.length == 0 && ay) {
				ay();
				return null
			}
			var e = ax.list.length;
			return function() {
				if (--e == 0 && ay) {
					ay()
				}
			}
		};
	a.extend(b.fx, {
		_wrap: function(e) {
			if (!e.parent().hasClass("t-animation-container")) {
				e.wrap(a("<div/>").addClass("t-animation-container").css({
					width: e.outerWidth(),
					height: e.outerHeight()
				}))
			}
			return e.parent()
		},
		play: function(ay, aD, aC, az) {
			var e = Z(ay, aD, az);
			if (e === null) {
				return
			}
			aD.stop(false, true);
			for (var aA = 0, aB = ay.list.length; aA < aB; aA++) {
				var ax = new b.fx[ay.list[aA].name](aD);
				if (!aD.data("effect-" + aA)) {
					ax.play(a.extend(ay.list[aA], {
						openDuration: ay.openDuration,
						closeDuration: ay.closeDuration
					}, aC), e);
					aD.data("effect-" + aA, ax)
				}
			}
		},
		rewind: function(ay, aC, aB, az) {
			var e = Z(ay, aC, az);
			if (e === null) {
				return
			}
			for (var aA = ay.list.length - 1; aA >= 0; aA--) {
				var ax = aC.data("effect-" + aA) || new b.fx[ay.list[aA].name](aC);
				ax.rewind(a.extend(ay.list[aA], {
					openDuration: ay.openDuration,
					closeDuration: ay.closeDuration
				}, aB), e);
				aC.data("effect-" + aA, null)
			}
		}
	});
	b.fx.toggle = function(e) {
		this.element = e.stop(false, true)
	};
	b.fx.toggle.prototype = {
		play: function(ax, e) {
			this.element.show();
			if (e) {
				e()
			}
		},
		rewind: function(ax, e) {
			this.element.hide();
			if (e) {
				e()
			}
		}
	};
	b.fx.toggle.defaults = function() {
		return {
			list: [{
				name: "toggle"
			}]
		}
	};
	b.fx.slide = function(e) {
		this.element = e;
		this.animationContainer = b.fx._wrap(e)
	};
	b.fx.slide.prototype = {
		play: function(aC, aA) {
			var ay = this.animationContainer;
			this.element.css("display", "block").stop();
			ay.css({
				display: "block",
				overflow: "hidden"
			});
			var aD = this.element.outerWidth();
			var aB = this.element.outerHeight();
			var e = aC.direction == "bottom" ? "marginTop" : "marginLeft";
			var ax = aC.direction == "bottom" ? -aB : -aD;
			ay.css({
				width: aD,
				height: aB
			});
			var az = {};
			az[e] = 0;
			this.element.css("width", this.element.width()).each(function() {
				this.style.cssText = this.style.cssText
			}).css(e, ax).animate(az, {
				queue: false,
				duration: aC.openDuration,
				easing: "linear",
				complete: function() {
					ay.css("overflow", "");
					if (aA) {
						aA()
					}
				}
			})
		},
		rewind: function(az, ay) {
			var ax = this.animationContainer;
			this.element.stop(false, true);
			ax.css({
				overflow: "hidden"
			});
			var e;
			switch (az.direction) {
			case "bottom":
				e = {
					marginTop: -this.element.outerHeight()
				};
				break;
			case "right":
				e = {
					marginLeft: -this.element.outerWidth()
				};
				break
			}
			this.element.animate(e, {
				queue: false,
				duration: az.closeDuration,
				easing: "linear",
				complete: function() {
					ax.css({
						display: "none",
						overflow: ""
					});
					if (ay) {
						ay()
					}
				}
			})
		}
	};
	b.fx.slide.defaults = function() {
		return {
			list: [{
				name: "slide"
			}],
			openDuration: "fast",
			closeDuration: "fast"
		}
	};
	b.fx.property = function(e) {
		this.element = e
	};
	b.fx.property.prototype = {
		_animate: function(aA, ax, aB, ay) {
			var aC = {
				overflow: "hidden"
			},
				az = {},
				e = this.element;
			a.each(aA, function(aD, aE) {
				var aF;
				switch (aE) {
				case "height":
				case "width":
					aF = e[aE]();
					break;
				case "opacity":
					aF = 1;
					break;
				default:
					aF = e.css(aE);
					break
				}
				aC[aE] = aB ? aF : 0;
				az[aE] = aB ? 0 : aF
			});
			e.css(aC).show().animate(az, {
				queue: false,
				duration: ax,
				easing: "linear",
				complete: function() {
					if (aB) {
						e.hide()
					}
					a.each(az, function(aD) {
						az[aD] = ""
					});
					e.css(a.extend({
						overflow: ""
					}, az));
					if (ay) {
						ay()
					}
				}
			})
		},
		play: function(ax, e) {
			this._animate(ax.properties, ax.openDuration, false, e)
		},
		rewind: function(ax, e) {
			this._animate(ax.properties, ax.closeDuration, true, e)
		}
	};
	b.fx.property.defaults = function() {
		return {
			list: [{
				name: "property",
				properties: arguments
			}],
			openDuration: "fast",
			closeDuration: "fast"
		}
	};
	a(document).ready(function() {
		if (a.browser.msie && typeof(Sys) != "undefined" && typeof(Sys.Mvc) != "undefined" && typeof(Sys.Mvc.FormContext) != "undefined") {
			var e = function(ax, ay) {
					return a.grep(ax.getElementsByTagName("*"), function(az) {
						return az.name == ay
					})
				};
			if (Sys.Mvc.FormContext) {
				Sys.Mvc.FormContext.$F = Sys.Mvc.FormContext._getFormElementsWithName = e
			}
		}
	});
	var B = a.extend,
		ac = a.proxy,
		ap = a.type,
		N = a.isFunction,
		O = a.isPlainObject,
		M = a.isEmptyObject,
		w = a.each,
		X = a.noop;

	function A() {
		this._isPrevented = false
	}
	A.prototype = {
		preventDefault: function() {
			this._isPrevented = true
		},
		isDefaultPrevented: function() {
			return this._isPrevented
		}
	};

	function j() {}
	j.extend = function(ay) {
		var e = function() {},
			aB = this,
			az = ay && ay.init ? ay.init : function() {
				aB.apply(this, arguments)
			},
			aA;
		e.prototype = aB.prototype;
		aA = az.fn = az.prototype = B(new e, ay);
		for (var ax in aA) {
			if (typeof aA[ax] === "object") {
				aA[ax] = B(true, {}, e.prototype[ax], ay[ax])
			}
		}
		aA.constructor = az;
		az.extend = aB.extend;
		return az
	};
	a.telerik.Class = j;
	var Y = j.extend({
		init: function() {
			this._events = {}
		},
		bind: function(e, az) {
			var aC = this,
				aA, ax = a.isArray(e) ? e : [e],
				aB, ay;
			for (aA = 0, aB = ax.length; aA < aB; aA++) {
				e = ax[aA];
				handler = a.isFunction(az) ? az : az[e];
				if (handler) {
					ay = aC._events[e] || [];
					ay.push(handler);
					aC._events[e] = ay
				}
			}
			return aC
		},
		trigger: function(ax, aB) {
			var aC = this,
				ay = aC._events[ax],
				e = B(aB, new A()),
				az, aA;
			if (ay) {
				for (az = 0, aA = ay.length; az < aA; az++) {
					ay[az].call(aC, e)
				}
			}
			return e.isDefaultPrevented()
		},
		unbind: function(e, ay) {
			var aB = this,
				ax = aB._events[e],
				az, aA;
			if (ax) {
				if (ay) {
					for (az = 0, aA = ax.length; az < aA; az++) {
						if (ax[az] === ay) {
							ax.splice(az, 1)
						}
					}
				} else {
					aB._events[e] = []
				}
			}
			return aB
		}
	});
	var k = {
		selector: function(e) {
			return a.isFunction(e) ? e : G(e)
		},
		asc: function(e) {
			var ax = this.selector(e);
			return function(ay, az) {
				ay = ax(ay);
				az = ax(az);
				return ay > az ? 1 : (ay < az ? -1 : 0)
			}
		},
		desc: function(e) {
			var ax = this.selector(e);
			return function(ay, az) {
				ay = ax(ay);
				az = ax(az);
				return ay < az ? 1 : (ay > az ? -1 : 0)
			}
		},
		create: function(e) {
			return k[e.dir.toLowerCase()](e.field)
		},
		combine: function(e) {
			return function(ax, ay) {
				var aB = e[0](ax, ay),
					az, aA;
				for (az = 1, aA = e.length; az < aA; az++) {
					aB = aB || e[az](ax, ay)
				}
				return aB
			}
		}
	};
	var D = {
		create: function(aA) {
			var aB, aC, az, aF, aD, ax, ay = [],
				e, aE;
			aA = aA || [];
			for (aB = 0, aC = aA.length; aB < aC; aB++) {
				az = aA[aB];
				if (typeof az.value === "string" && !az.caseSensitive) {
					e = function(aG) {
						return typeof aG === "string" ? aG.toLowerCase() : aG
					}
				} else {
					e = function(aG) {
						return aG
					}
				}
				aF = D.selector(az.field, e);
				aD = D.operator(az.operator);
				ax = aD(aF, e(az.value));
				ay.push(ax)
			}
			aE = D.combine(ay);
			return function(aG) {
				return D.execute(aE, aG)
			}
		},
		selector: function(ay, ax) {
			if (ay) {
				if (N(ay)) {
					return ay
				} else {
					var e = G(ay);
					return function(aA) {
						var aB = e(aA);
						if (typeof aB === "string") {
							var az = /^\/Date\((.*?)\)\/$/.exec(aB);
							if (az) {
								aB = new Date(parseInt(az[1]));
								return aB
							}
						}
						return ax(aB)
					}
				}
			}
			return function(az) {
				return ax(az)
			}
		},
		execute: function(az, e) {
			var ax, ay = e.length,
				aA, aB = [];
			for (ax = 0; ax < ay; ax++) {
				aA = e[ax];
				if (az(aA)) {
					aB.push(aA)
				}
			}
			return aB
		},
		combine: function(e) {
			return function(az) {
				var aA = true,
					ax = 0,
					ay = e.length;
				while (aA && ax < ay) {
					aA = e[ax++](az)
				}
				return aA
			}
		},
		operator: function(ax) {
			if (!ax) {
				return D.eq
			}
			if (a.isFunction(ax)) {
				return ax
			}
			ax = ax.toLowerCase();
			operatorStrings = D.operatorStrings;
			for (var e in operatorStrings) {
				if (a.inArray(ax, operatorStrings[e]) > -1) {
					ax = e;
					break
				}
			}
			return D[ax]
		},
		operatorStrings: {
			eq: ["eq", "==", "isequalto", "equals", "equalto", "equal"],
			neq: ["neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "not", "ne"],
			lt: ["lt", "<", "islessthan", "lessthan", "less"],
			lte: ["lte", "<=", "islessthanorequalto", "lessthanequal", "le"],
			gt: ["gt", ">", "isgreaterthan", "greaterthan", "greater"],
			gte: ["gte", ">=", "isgreaterthanorequalto", "greaterthanequal", "ge"],
			startswith: ["startswith"],
			endswith: ["endswith"],
			contains: ["contains", "substringof"]
		},
		eq: function(e, ax) {
			return function(az) {
				var ay = e(az);
				return ay > ax ? false : (ax > ay ? false : true)
			}
		},
		neq: function(e, ax) {
			return function(ay) {
				return e(ay) != ax
			}
		},
		lt: function(e, ax) {
			return function(ay) {
				return e(ay) < ax
			}
		},
		lte: function(e, ax) {
			return function(ay) {
				return e(ay) <= ax
			}
		},
		gt: function(e, ax) {
			return function(ay) {
				return e(ay) > ax
			}
		},
		gte: function(e, ax) {
			return function(ay) {
				return e(ay) >= ax
			}
		},
		startswith: function(e, ax) {
			return function(ay) {
				return e(ay).indexOf(ax) == 0
			}
		},
		endswith: function(e, ax) {
			return function(az) {
				var ay = e(az);
				return ay.lastIndexOf(ax) == ay.length - (ax || "").length
			}
		},
		contains: function(e, ax) {
			return function(ay) {
				return e(ay).indexOf(ax) > -1
			}
		}
	};
	var ad = function(e) {
			return new ad.fn.init(e)
		};
	b.query = ad;
	ad.expandSort = function(az, ay) {
		var e = typeof az === "string" ? {
			field: az,
			dir: ay
		} : az,
			ax = a.isArray(e) ? e : (e !== undefined ? [e] : []);
		return a.grep(ax, function(aA) {
			return !!aA.dir
		})
	};
	ad.expandFilter = function(e) {
		return e = a.isArray(e) ? e : [e]
	};
	ad.expandAggregates = function(e) {
		return e = a.isArray(e) ? e : [e]
	};
	ad.expandGroup = function(az, ay) {
		var e = typeof az === "string" ? {
			field: az,
			dir: ay
		} : az,
			ax = a.isArray(e) ? e : (e !== undefined ? [e] : []);
		return a.map(ax, function(aA) {
			return {
				field: aA.field,
				dir: aA.dir || "asc",
				aggregates: aA.aggregates
			}
		})
	};
	ad.fn = ad.prototype = {
		init: function(e) {
			this.data = e || [];
			return this
		},
		toArray: function() {
			return this.data
		},
		skip: function(e) {
			return new ad(this.data.slice(e))
		},
		take: function(e) {
			return new ad(this.data.slice(0, e))
		},
		orderBy: function(ay) {
			var ax = this.data.slice(0),
				e = a.isFunction(ay) || !ay ? k.asc(ay) : ay.compare;
			return new ad(ax.sort(e))
		},
		orderByDescending: function(e) {
			return new ad(this.data.slice(0).sort(k.desc(e)))
		},
		sort: function(az, ay) {
			var aA, aB, ax = ad.expandSort(az, ay),
				e = [];
			if (ax.length) {
				for (aA = 0, aB = ax.length; aA < aB; aA++) {
					e.push(k.create(ax[aA]))
				}
				return this.orderBy({
					compare: k.combine(e)
				})
			}
			return this
		},
		filter: function(e) {
			var ax = D.create(ad.expandFilter(e));
			return new ad(ax(this.data))
		},
		where: function(e) {
			return ad(C(this.data, e))
		},
		select: function(e) {
			return ad(S(this.data, e))
		},
		concat: function(e) {
			return ad(this.data.concat(e.data))
		},
		count: function() {
			return this.data.length
		},
		any: function(ay) {
			if (a.isFunction(ay)) {
				for (var e = 0, ax = this.data.length; e < ax; e++) {
					if (ay(this.data[e], e)) {
						return true
					}
				}
				return false
			}
			return !!this.data.length
		},
		group: function(ay, e) {
			ay = ad.expandGroup(ay || []);
			e = e || this.data;
			var aA = this,
				az = new ad(aA.data),
				ax;
			if (ay.length > 0) {
				ax = ay[0];
				az = az.groupBy(ax).select(function(aC) {
					var aB = new ad(e).filter([{
						field: aC.field,
						operator: "eq",
						value: aC.value
					}]);
					return {
						field: aC.field,
						value: aC.value,
						items: ay.length > 1 ? new ad(aC.items).group(ay.slice(1), aB.toArray()).toArray() : aC.items,
						hasSubgroups: ay.length > 1,
						aggregates: aB.aggregate(ax.aggregates)
					}
				})
			}
			return az
		},
		groupBy: function(az) {
			if (M(az) || !this.data.length) {
				return new ad([])
			}
			var aA = az.field,
				aH = this.sort(aA, az.dir || "asc").toArray(),
				e = c(aA),
				aE, aC = e.get(aH[0], aA),
				ax = {},
				aB = {
					field: aA,
					value: aC,
					items: []
				},
				ay, aD, aF, aG = [aB];
			for (aD = 0, aF = aH.length; aD < aF; aD++) {
				aE = aH[aD];
				ay = e.get(aE, aA);
				if (aC !== ay) {
					aC = ay;
					ax = {};
					aB = {
						field: aA,
						value: aC,
						items: []
					};
					aG.push(aB)
				}
				aB.items.push(aE)
			}
			return new ad(aG)
		},
		aggregate: function(e) {
			var ax, ay, az = {};
			for (ax = 0, ay = this.data.length; ax < ay; ax++) {
				f(az, e, this.data[ax], ax, ay)
			}
			return az
		}
	};

	function f(e, ay, aE, aD, aG) {
		ay = ay || [];
		var aC, ax, aB, aA, aF = ay.length;
		for (aC = 0; aC < aF; aC++) {
			ax = ay[aC];
			aB = ax.aggregate;
			var az = ax.field;
			e[az] = e[az] || {};
			e[az][aB] = E[aB.toLowerCase()](e[az][aB], aE, c(az), aD, aG)
		}
	}
	var E = {
		sum: function(ax, ay, e) {
			return ax = (ax || 0) + e.get(ay)
		},
		count: function(ax, ay, e) {
			return (ax || 0) + 1
		},
		average: function(ax, az, e, ay, aA) {
			ax = (ax || 0) + e.get(az);
			if (ay == aA - 1) {
				ax = ax / aA
			}
			return ax
		},
		max: function(ax, ay, e) {
			var ax = (ax || 0),
				az = e.get(ay);
			if (ax < az) {
				ax = az
			}
			return ax
		},
		min: function(ax, ay, e) {
			var az = e.get(ay),
				ax = (ax || az);
			if (ax > az) {
				ax = az
			}
			return ax
		}
	};
	ad.fn.init.prototype = ad.fn;
	var ap = a.type,
		ar = "UPDATED",
		aa = "PRISTINE",
		n = "CREATED",
		u = "DESTROYED";

	function y(ax, az) {
		if (ax === az) {
			return true
		}
		var ay = ap(ax),
			aA = ap(az),
			e;
		if (ay !== aA) {
			return false
		}
		if (ay === "date") {
			return ax.getTime() === az.getTime()
		}
		if (ay !== "object" && ay !== "array") {
			return false
		}
		for (e in ax) {
			if (!y(ax[e], az[e])) {
				return false
			}
		}
		return true
	}
	var G = function(e, ax) {
			e = e || "";
			if (e && e.charAt(0) !== "[") {
				e = "." + e
			}
			if (ax) {
				return new Function("d", "return " + aw(e.split(".")))
			}
			return new Function("d", "return d" + e)
		},
		al = function(e) {
			return new Function("d,value", "d." + e + "=value")
		},
		c = function(e) {
			return {
				get: G(e),
				set: al(e)
			}
		};
	var aw = function(aB) {
			var aC = "d",
				ay, ax, az, aA, e = 1;
			for (ax = 0, az = aB.length; ax < az; ax++) {
				aA = aB[ax];
				if (aA !== "") {
					ay = aA.indexOf("[");
					if (ay != 0) {
						if (ay == -1) {
							aA = "." + aA
						} else {
							e++;
							aA = "." + aA.substring(0, ay) + " || {})" + aA.substring(ay)
						}
					}
					e++;
					aC += aA + ((ax < az - 1) ? " || {})" : ")")
				}
			}
			return new Array(e).join("(") + aC
		};
	var V = Y.extend({
		init: function(e) {
			var ax = this;
			Y.fn.init.call(ax);
			ax.state = aa;
			ax._accessors = {};
			ax._modified = false;
			ax.data = B(true, {}, e);
			ax.pristine = B(true, {}, e);
			if (ax.id() === undefined) {
				ax.state = n;
				ax.data.__id = ax.guid()
			}
		},
		guid: function() {
			var ax = "",
				e, ay;
			for (e = 0; e < 32; e++) {
				ay = Math.random() * 16 | 0;
				if (e == 8 || e == 12 || e == 16 || e == 20) {
					ax += "-"
				}
				ax += (e == 12 ? 4 : (e == 16 ? (ay & 3 | 8) : ay)).toString(16)
			}
			return ax
		},
		accessor: function(ax) {
			var e = this._accessors;
			return e[ax] = e[ax] || c(ax)
		},
		get: function(ax) {
			var ay = this,
				e = ay.accessor(ax);
			return e.get(ay.data)
		},
		set: function(ay, aA) {
			var az = this,
				ax, aB = {},
				e;
			if (typeof ay === "string") {
				aB[ay] = aA
			} else {
				aB = ay
			}
			az._modified = false;
			for (ax in aB) {
				e = az.accessor(ax);
				aA = aB[ax];
				if (!y(aA, e.get(az.data))) {
					e.set(az.data, aA);
					az._modified = true
				}
			}
			if (az._modified) {
				az.state = az.isNew() ? n : ar;
				az.trigger("change")
			}
		},
		isNew: function() {
			return this.state === n
		},
		destroy: function() {
			this.state = u
		},
		changes: function() {
			var ay = null,
				ax, aA = this,
				e = aA.data,
				az = aA.pristine;
			for (ax in e) {
				if (ax !== "__id" && !y(az[ax], e[ax])) {
					ay = ay || {};
					ay[ax] = e[ax]
				}
			}
			return ay
		}
	});
	V.define = function(az) {
		var ay, aA = az || {},
			ax = aA.id || "id",
			aB, e;
		if (a.isFunction(ax)) {
			e = ax;
			aB = ax
		} else {
			e = G(ax);
			aB = al(ax)
		}
		ax = function(aC, aD) {
			if (aD === undefined) {
				return aC.__id || e(aC)
			} else {
				aB(aC, aD)
			}
		};
		aA.id = function(aC) {
			return ax(this.data, aC)
		};
		ay = V.extend(aA);
		ay.id = ax;
		return ay
	};
	V.UPDATED = ar;
	V.PRISTINE = aa;
	V.CREATED = n;
	V.DESTROYED = u;
	var m = "create",
		ae = "read",
		aq = "update",
		t = "destroy",
		h = "change",
		z = "error",
		o = [m, ae, aq, t],
		I = function(e) {
			return e
		};

	function ab(e, az) {
		var aC = new ad(e),
			az = az || {},
			aA = az.page,
			aB = az.pageSize,
			ay = az.group,
			aD = ad.expandSort(az.sort).concat(ad.expandGroup(ay || [])),
			aE, ax = az.filter;
		if (ax) {
			aC = aC.filter(ax);
			aE = aC.toArray().length
		}
		if (aD) {
			aC = aC.sort(aD)
		}
		if (aA !== undefined && aB !== undefined) {
			aC = aC.skip((aA - 1) * aB).take(aB)
		}
		if (ay) {
			aC = aC.group(ay, e)
		}
		return {
			total: aE,
			data: aC.toArray()
		}
	}
	function g(ax, az) {
		var aA = new ad(ax),
			az = az || {},
			e = az.aggregates,
			ay = az.filter;
		if (ay) {
			aA = aA.filter(ay)
		}
		return aA.aggregate(e)
	}
	var R = j.extend({
		init: function(e) {
			this.data = e.data
		},
		read: function(e) {
			e.success(this.data)
		},
		update: X
	});
	var ag = j.extend({
		init: function(e) {
			var ax = this;
			e = ax.options = B({}, ax.options, e);
			w(o, function(ay, az) {
				if (typeof e[az] === "string") {
					e[az] = {
						url: e[az]
					}
				}
			});
			ax.cache = e.cache ? d.create(e.cache) : {
				find: X,
				add: X
			};
			ax.dialect = e.dialect
		},
		options: {
			dialect: {
				read: I,
				update: I,
				destroy: I,
				create: I
			}
		},
		create: function(e) {
			a.ajax(this.setup(e, m))
		},
		read: function(ay) {
			var aB = this,
				aA, ax, az, e = aB.cache;
			ay = aB.setup(ay, ae);
			aA = ay.success || X;
			ax = ay.error || X;
			az = e.find(ay.data);
			if (az !== undefined) {
				aA(az)
			} else {
				ay.success = function(aC) {
					e.add(ay.data, aC);
					aA(aC)
				};
				a.ajax(ay)
			}
		},
		update: function(e) {
			a.ajax(this.setup(e, aq))
		},
		destroy: function(e) {
			a.ajax(this.setup(e, t))
		},
		setup: function(ay, aA) {
			ay = ay || {};
			var az = this,
				ax = az.options[aA],
				e = N(ax.data) ? ax.data() : ax.data;
			ay = B(true, {}, ax, ay);
			ay.data = az.dialect[aA](B(e, ay.data));
			return ay
		}
	});
	d.create = function(e) {
		var ax = {
			inmemory: function() {
				return new d()
			},
			localstorage: function() {
				return new Q()
			}
		};
		if (O(e) && N(e.find)) {
			return e
		}
		if (e === true) {
			return new d()
		}
		return ax[e]()
	};

	function d() {
		this._store = {}
	}
	d.prototype = {
		add: function(ax, e) {
			if (ax !== undefined) {
				this._store[stringify(ax)] = e
			}
		},
		find: function(e) {
			return this._store[stringify(e)]
		},
		clear: function() {
			this._store = {}
		},
		remove: function(e) {
			delete this._store[stringify(e)]
		}
	};

	function Q() {
		this._store = window.localStorage
	}
	Q.prototype = {
		add: function(ax, e) {
			if (ax != undefined) {
				this._store.setItem(stringify(ax), stringify(e))
			}
		},
		find: function(e) {
			return a.parseJSON(this._store.getItem(stringify(e)))
		},
		clear: function() {
			this._store.clear()
		},
		remove: function(e) {
			this._store.removeItem(stringify(e))
		}
	};
	var q = Y.extend({
		init: function(ay) {
			var az = this,
				e, ax, aA;
			ay = az.options = B({}, az.options, ay);
			B(az, {
				_map: {},
				_models: {},
				_data: [],
				_view: [],
				_pageSize: ay.pageSize,
				_page: ay.page || (ay.pageSize ? 1 : undefined),
				_sort: ay.sort,
				_filter: ay.filter,
				_group: ay.group,
				_aggregates: ay.aggregates
			});
			Y.fn.init.call(az);
			ax = ay.model;
			aA = ay.transport;
			if (ax === undefined) {
				ax = {}
			} else {
				if (O(ax)) {
					ay.model = ax = V.define(ax)
				}
			}
			e = ax.id;
			az._deserializer = B({
				data: I,
				total: function(aB) {
					return aB.length
				},
				status: function(aB) {
					return aB.status
				},
				groups: function(aB) {
					return aB
				},
				aggregates: function(aB) {
					return {}
				}
			}, ay.deserializer);
			if (aA) {
				az.transport = N(aA.read) ? aA : new ag(aA)
			} else {
				az.transport = new R({
					data: ay.data
				})
			}
			if (e) {
				az.find = function(aB) {
					return az._data[az._map[aB]]
				};
				az.id = function(aB) {
					return e(aB)
				}
			} else {
				az.find = az.at
			}
			az.bind([z, h, m, t, aq], ay)
		},
		options: {
			data: [],
			serverSorting: false,
			serverPaging: false,
			serverFiltering: false,
			serverGrouping: false,
			serverAggregates: false,
			autoSync: false,
			sendAllFields: true,
			batch: {
				mode: "multiple"
			}
		},
		model: function(e) {
			var ay = this,
				ax = e && ay._models[e];
			if (!ax) {
				ax = new ay.options.model(ay.find(e));
				ay._models[ax.id()] = ax;
				ax.bind(h, function() {
					ay.trigger(aq, {
						model: ax
					})
				})
			}
			return ax
		},
		_idMap: function(e) {
			var aB = this,
				ax = aB.id,
				ay, az, aA = {};
			if (ax) {
				for (ay = 0, az = e.length; ay < az; ay++) {
					aA[ax(e[ay])] = ay
				}
			}
			aB._map = aA
		},
		_byState: function(aB, aA) {
			var ay = this._models,
				az = [],
				ax, aA = aA || I,
				e;
			for (e in ay) {
				ax = ay[e];
				if (ax.state === aB) {
					az.push(aA(ax))
				}
			}
			return az
		},
		_createdModels: function() {
			return this._byState(V.CREATED, function(e) {
				return e.data
			})
		},
		_updatedModels: function() {
			var ax = this,
				e = ax.options.sendAllFields;
			return ax._byState(V.UPDATED, function(ay) {
				if (e) {
					return ay.data
				}
				return ay.changes()
			})
		},
		_destroyedModels: function() {
			var ax = this,
				e = ax.options;
			return ax._byState(V.DESTROYED, function(az) {
				var ay = {};
				if (e.sendAllFields) {
					return az.data
				}
				e.model.id(ay, az.id());
				return ay
			})
		},
		sync: function() {
			var aB = this,
				aD, ax, ay, e = aB.options.batch,
				az, aC = aB.transport,
				aA = aB._promises = [];
			aD = aB._updatedModels();
			ax = aB._createdModels();
			ay = aB._destroyedModels();
			if (e === false) {
				az = "multiple"
			} else {
				if ((e.mode || "multiple") === "multiple") {
					az = "single"
				}
			}
			if (az) {
				aB._send(ax, ac(aC.create, aC), az);
				aB._send(aD, ac(aC.update, aC), az);
				aB._send(ay, ac(aC.destroy, aC), az)
			} else {
				aB._send({
					created: ax,
					updated: aD,
					destroyed: ay
				}, ac(aC.update, aC), "single")
			}
			a.when.apply(null, aA).then(function() {
				aB.trigger(h)
			})
		},
		_syncSuccess: function(aA, e) {
			var aD = this,
				aC, aB, az = aD._models,
				ay = aD._map,
				ax = aD._deserializer;
			if (!ax.status(e)) {
				return aD.error({
					data: aA
				})
			}
			a.each(aA, function(aE, aF) {
				delete az[aD.id(aF)]
			});
			e = ax.data(e);
			a.each(e, function(aE, aF) {
				aC = aA[aE];
				if (aC) {
					aB = aD.id(aC);
					aE = ay[aB];
					if (aE >= 0) {
						aD._data[aE] = aF
					}
				}
			});
			aD._idMap(aD._data)
		},
		_syncError: function(ax, e) {
			this.error({
				data: ax
			})
		},
		_send: function(e, az, aA) {
			var aD = this,
				ay, aB = aD._promises,
				aC = ac(aD._syncSuccess, aD, e),
				ax = ac(aD._syncError, aD, e);
			if (e.length == 0) {
				return
			}
			if (aA === "multiple") {
				for (ay = 0, length = e.length; ay < length; ay++) {
					aB.push(az({
						data: e[ay],
						success: aC,
						error: ax
					}))
				}
			} else {
				aB.push(az({
					data: e,
					success: aC,
					error: ax
				}))
			}
			return aB
		},
		create: function(ax, aA) {
			var az = this,
				e = az._data,
				ay = az.model();
			if (typeof ax !== "number") {
				aA = ax;
				ax = undefined
			}
			ay.set(aA);
			ax = ax !== undefined ? ax : e.length;
			e.splice(ax, 0, ay.data);
			az._idMap(e);
			az.trigger(m, {
				model: ay
			});
			return ay
		},
		read: function(e) {
			var ay = this,
				ax = B(e, {
					page: ay._page,
					pageSize: ay._pageSize,
					sort: ay._sort,
					filter: ay._filter,
					group: ay._group,
					aggregates: ay._aggregates
				});
			ay.transport.read({
				data: ax,
				success: ac(ay.success, ay),
				error: ac(ay.error, ay)
			})
		},
		update: function(e, az) {
			var ay = this,
				ax = ay.model(e);
			if (ax) {
				ax.set(az)
			}
		},
		destroy: function(e) {
			var ay = this,
				ax = ay.model(e);
			if (ax) {
				ay._data.splice(ay._map[e], 1);
				ay._idMap(ay._data);
				ax.destroy();
				ay.trigger(t, {
					model: ax
				})
			}
		},
		error: function() {
			this.trigger(z, arguments)
		},
		success: function(e) {
			var aB = this,
				az = {},
				aA, aC = V ? aB._updatedModels() : [],
				ax = aB.options.serverGrouping === true && aB._group && aB._group.length > 0,
				ay = aB._models;
			aB._total = aB._deserializer.total(e);
			if (aB._aggregates && aB.options.serverAggregates) {
				aB._aggregateResult = aB._deserializer.aggregates(e)
			}
			if (ax) {
				e = aB._deserializer.groups(e)
			} else {
				e = aB._deserializer.data(e)
			}
			aB._data = e;
			a.each(aC, function() {
				var aD = aB.id(this);
				a.each(e, function() {
					if (aD === aB.id(this)) {
						delete ay[aD]
					}
				})
			});
			if (aB.options.serverPaging !== true) {
				az.page = aB._page;
				az.pageSize = aB._pageSize
			}
			if (aB.options.serverSorting !== true) {
				az.sort = aB._sort
			}
			if (aB.options.serverFiltering !== true) {
				az.filter = aB._filter
			}
			if (aB.options.serverGrouping !== true) {
				az.group = aB._group
			}
			if (aB.options.serverAggregates !== true) {
				az.aggregates = aB._aggregates;
				aB._aggregateResult = g(e, az)
			}
			aA = ab(e, az);
			aB._view = aA.data;
			if (aA.total !== undefined && !aB.options.serverFiltering) {
				aB._total = aA.total
			}
			aB._idMap(e);
			aB.trigger(h)
		},
		changes: function(e) {
			var ay = this,
				ax = ay._models[e];
			if (ax && ax.state === V.UPDATED) {
				return ax.changes()
			}
		},
		hasChanges: function(e) {
			var az = this,
				ax, ay = az._models,
				e;
			if (e === undefined) {
				for (e in ay) {
					if (ay[e].state !== V.PRISTINE) {
						return true
					}
				}
				return false
			}
			ax = ay[e];
			return !!ax && ax.state === V.UPDATED
		},
		at: function(e) {
			return this._data[e]
		},
		data: function(e) {
			if (e !== undefined) {
				this._data = e
			} else {
				return this._data
			}
		},
		view: function() {
			return this._view
		},
		query: function(e) {
			var az = this,
				e = e,
				ay, ax = az.options.serverSorting || az.options.serverPaging || az.options.serverFiltering || az.options.serverGrouping || az.options.serverAggregates;
			if (e !== undefined) {
				az._pageSize = e.pageSize;
				az._page = e.page;
				az._sort = e.sort;
				az._filter = e.filter;
				az._group = e.group;
				az._aggregates = e.aggregates;
				if (e.sort) {
					az._sort = e.sort = ad.expandSort(e.sort)
				}
				if (e.filter) {
					az._filter = e.filter = ad.expandFilter(e.filter)
				}
				if (e.group) {
					az._group = e.group = ad.expandGroup(e.group)
				}
				if (e.aggregates) {
					az._aggregates = e.aggregates = ad.expandAggregates(e.aggregates)
				}
			}
			if (ax || (az._data === undefined || az._data.length == 0)) {
				az.read(e)
			} else {
				ay = ab(az._data, e);
				if (ay.total !== undefined && !az.options.serverFiltering) {
					az._total = ay.total
				}
				az._view = ay.data;
				az._aggregateResult = g(az._data, e);
				az.trigger(h)
			}
		},
		fetch: function() {
			var e = this;
			e.query({
				page: e.page(),
				pageSize: e.pageSize(),
				sort: e.sort(),
				filter: e.filter(),
				group: e.group(),
				aggregate: e.aggregate()
			})
		},
		page: function(ax) {
			var e = this;
			if (ax !== undefined) {
				ax = Math.max(Math.min(Math.max(ax, 1), e._totalPages()), 1);
				e.query({
					page: ax,
					pageSize: e.pageSize(),
					sort: e.sort(),
					filter: e.filter(),
					group: e.group(),
					aggregates: e.aggregate()
				});
				return
			}
			return e._page
		},
		pageSize: function(ax) {
			var e = this;
			if (ax !== undefined) {
				e.query({
					page: e.page(),
					pageSize: ax,
					sort: e.sort(),
					filter: e.filter(),
					group: e.group(),
					aggregates: e.aggregate()
				});
				return
			}
			return e._pageSize
		},
		sort: function(ax) {
			var e = this;
			if (ax !== undefined) {
				e.query({
					page: e.page(),
					pageSize: e.pageSize(),
					sort: ax,
					filter: e.filter(),
					group: e.group(),
					aggregates: e.aggregate()
				});
				return
			}
			return this._sort
		},
		filter: function(ax) {
			var e = this;
			if (ax !== undefined) {
				e.query({
					page: e.page(),
					pageSize: e.pageSize(),
					sort: e.sort(),
					filter: ax,
					group: e.group(),
					aggregates: e.aggregate()
				});
				return
			}
			return e._filter
		},
		group: function(ax) {
			var e = this;
			if (ax !== undefined) {
				e.query({
					page: e.page(),
					pageSize: e.pageSize(),
					sort: e.sort(),
					filter: e.filter(),
					group: ax,
					aggregates: e.aggregate()
				});
				return
			}
			return e._group
		},
		total: function() {
			return this._total
		},
		aggregate: function(ax) {
			var e = this;
			if (ax !== undefined) {
				e.query({
					page: e.page(),
					pageSize: e.pageSize(),
					sort: e.sort(),
					filter: ax,
					group: e.group(),
					aggregates: ax
				});
				return
			}
			return e._aggregates
		},
		aggregates: function() {
			return this._aggregateResult
		},
		_totalPages: function() {
			var ax = this,
				e = ax.pageSize() || ax.total();
			return Math.ceil((ax.total() || 0) / e)
		}
	});
	q.create = function(az) {
		az = a.isArray(az) ? {
			data: az
		} : az;
		var ax = az || {},
			e = ax.data,
			ay = ax.fields,
			aB = ax.table,
			aA = ax.select;
		if (ay) {
			if (!e) {
				if (aB) {
					e = K(aB, ay)
				} else {
					if (aA) {
						e = J(aA, ay)
					}
				}
			} else {
				if (aA) {
					af(e, aA, ay)
				}
			}
		}
		ax.data = e;
		return ax instanceof q ? ax : new q(ax)
	};

	function J(aD, ax) {
		var aB = a(aD)[0].children,
			aA, az, e = [],
			aC, ay;
		for (aA = 0, az = aB.length; aA < az; aA++) {
			aC = {};
			ay = aB[aA];
			aC[ax[0].field] = ay.text;
			aC[ax[1].field] = ay.value;
			e.push(aC)
		}
		return e
	}
	function af(e, aF, ay) {
		var az = G(ay[0].field),
			aA = G(ay[1].field),
			aC = e.length,
			aE = [],
			aB = 0;
		for (; aB < aC; aB++) {
			var aD = "<option",
				ax = e[aB],
				aG = az(ax),
				aH = aA(ax);
			if (aH || aH === 0) {
				aD += " value=" + aH
			}
			aD += ">";
			if (aG || aG === 0) {
				aD += aG
			}
			aD += "</option>";
			aE.push(aD)
		}
		aF.html(aE.join(""))
	}
	function K(aH, aC) {
		var aI = a(aH)[0].tBodies[0],
			aG = aI ? aI.rows : [],
			aF, aE, aB, aA = aC.length,
			ay = [],
			ax, aD, e, az;
		for (aF = 0, aE = aG.length; aF < aE; aF++) {
			aD = {};
			az = true;
			ax = aG[aF].cells;
			for (aB = 0; aB < aA; aB++) {
				e = ax[aB];
				if (e.nodeName.toLowerCase() !== "th") {
					az = false;
					aD[aC[aB].field] = e.innerHTML
				}
			}
			if (!az) {
				ay.push(aD)
			}
		}
		return ay
	}
	b.DataSource = q;
	b.Model = V;
	b.getter = G;
	b.setter = al;
	var ao = {
		paramName: "data",
		useWithBlock: true,
		begin: "<#",
		end: "#>",
		render: function(aA, e) {
			var ay, az, ax = "";
			for (ay = 0, az = e.length; ay < az; ay++) {
				ax += aA(e[ay])
			}
			return ax
		},
		compile: function(aF, aB) {
			var aE = B({}, this, aB),
				aC = aE.paramName,
				e = aE.begin,
				ay = aE.end,
				aG = aE.useWithBlock,
				aA = "var o='',e = $.telerik.htmlEncode;",
				ax = /\${([^}]*)}/g,
				az = new RegExp(e + "=(.+?)" + ay, "g"),
				aD = new RegExp("'(?=[^" + ay[0] + "]*" + ay + ")", "g");
			aA += aG ? "with(" + aC + "){" : "";
			aA += "o+='";
			aA += aF.replace(/[\r\t\n]/g, " ").replace(aD, "\t").split("'").join("\\'").split("\t").join("'").replace(ax, "';o+=e($1);o+='").replace(az, "';o+=$1;o+='").split(e).join("';").split(ay).join("o+='");
			aA += aG ? "'}" : "';";
			aA += "return o;";
			return new Function(aC, aA)
		}
	};

	function H(e) {
		return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	a.telerik.template = a.proxy(ao.compile, ao);
	a.telerik.htmlEncode = H;
	var l = Y.extend({
		init: function(e, ax) {
			var ay = this;
			Y.fn.init.call(ay);
			ay.element = a(e);
			ay.options = B(true, {}, ay.options, ax)
		}
	});
	a.telerik.Component = l
})(jQuery);
(function(a, bS) {
	var al = document,
		b = a.telerik,
		Q = b.Class,
		b2 = b.Component,
		ac = b.DataSource,
		y = b.template,
		av = function() {
			return b.formatString.apply(b, arguments)
		},
		aW = a.map,
		aA = a.grep,
		am = a.each,
		aX = Math,
		bk = a.proxy,
		ay = b.getter,
		ap = a.extend,
		bR = b.trigger,
		aa = "dataBinding";
	var bH = function(ce) {
			var cb = "d",
				cf = false,
				Y = "var o,e=$.telerik.htmlEncode;",
				X = /\${([^}]*)}/g,
				cd, cc, ca;
			if (a.isFunction(ce)) {
				if (ce.length === 2) {
					return function(cg) {
						return ce(a, {
							data: cg
						}).join("")
					}
				}
				return ce
			}
			Y += cf ? "with(" + cb + "){" : "";
			Y += "o=";
			cd = ce.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(X, "#=e($1)#").replace(/\\#/g, "__SHARP__").split("#");
			for (ca = 0; ca < cd.length; ca++) {
				cc = cd[ca];
				if (ca % 2 === 0) {
					Y += "'" + cc.split("'").join("\\'") + "'"
				} else {
					if (cc.charAt(0) === "=") {
						Y += "+(" + cc.substring(1) + ")+"
					} else {
						Y += ";" + cc + ";o+="
					}
				}
			}
			Y += cf ? ";}" : ";";
			Y += "return o;";
			Y = Y.replace(/__SHARP__/g, "#");
			return new Function(cb, Y)
		};
	var c = "above",
		d = 10,
		k = "area",
		x = 1,
		p = "bar",
		q = 0.8,
		r = 1.5,
		s = 0.4,
		z = "below",
		A = "#000",
		B = "bottom",
		L = "center",
		M = "change",
		P = "circle",
		S = "click",
		T = "clip",
		W = "column",
		Z = 3,
		ab = "dataBound",
		af = "12px sans-serif",
		ag = 400,
		ah = 6,
		ai = 600,
		ak = aX.PI / 180,
		at = "fadeIn",
		az = "glass",
		aB = "height",
		aD = "horizontal",
		aE = "k",
		aH = 600,
		aI = "insideBase",
		aJ = "insideEnd",
		aK = "interpolate",
		aO = "left",
		aQ = "line",
		aR = 8,
		aS = "linear",
		aY = Number.MAX_VALUE,
		a0 = -Number.MAX_VALUE,
		a1 = "mousemove.tracking",
		a2 = "mouseover",
		a3 = "none",
		a5 = "object",
		a6 = "onMinorTicks",
		a8 = "outside",
		a9 = "outsideEnd",
		a7 = "_outline",
		ba = "pie",
		bb = 70,
		bj = "primary",
		bl = "radial",
		bn = "right",
		br = "roundedBevel",
		bs = "scatter",
		bt = "scatterLine",
		bx = "seriesClick",
		bD = "square",
		bG = "swing",
		bP = "top",
		bM = 150,
		bN = 5,
		bO = 100,
		bQ = "triangle",
		bT = "undefined",
		bW = "vertical",
		bY = "verticalLine",
		bX = "verticalArea",
		b3 = "width",
		b1 = "#fff",
		b4 = "x",
		b7 = "y",
		b8 = "zero",
		b9 = 0.2;
	var F = [p, W, aQ, bY, k, bX],
		b5 = [bs, bt];
	var N = b2.extend({
		init: function(Y, cd) {
			var X = this,
				ca, cc, cb;
			b2.fn.init.call(X, Y);
			ca = ad({}, X.options, cd);
			cb = ca.theme;
			cc = cb ? N.themes[cb] || N.themes[cb.toLowerCase()] : {};
			g(ca, cc);
			X.options = ad({}, cc, ca);
			h(X.options);
			X.bind([ab, bx], X.options);
			a(Y).addClass("k-chart");
			if (cd && cd.dataSource) {
				X.dataSource = ac.create(cd.dataSource).bind(M, bk(X._onDataChanged, X));
				if (ca.autoBind) {
					X.dataSource.fetch()
				}
			}
			X._redraw();
			X._attachEvents()
		},
		options: {
			name: "Chart",
			chartArea: {},
			title: {
				visible: true
			},
			legend: {
				visible: true
			},
			valueAxis: {
				type: "Numeric"
			},
			categoryAxis: {
				categories: []
			},
			autoBind: true,
			seriesDefaults: {
				type: W,
				data: [],
				bar: {
					gap: r,
					spacing: s
				},
				column: {
					gap: r,
					spacing: s
				},
				line: {
					width: 4
				},
				labels: {}
			},
			series: [],
			tooltip: {
				visible: false
			},
			transitions: true
		},
		refresh: function() {
			var X = this;
			g(X.options);
			if (X.dataSource) {
				X.dataSource.read()
			} else {
				X._redraw()
			}
		},
		redraw: function() {
			var X = this;
			g(X.options);
			X._redraw()
		},
		_redraw: function() {
			var X = this,
				cb = X.options,
				Y = X.element,
				ca = X._model = X._getModel(),
				cc = X._plotArea = ca._plotArea,
				ce = X._supportsSVG() ? N.SVGView : N.VMLView,
				cd = X._view = ce.fromModel(ca);
			Y.css("position", "relative");
			X._viewElement = cd.renderTo(Y[0]);
			X._tooltip = new bL(Y, cb.tooltip);
			X._highlight = new aC(cd, X._viewElement)
		},
		svg: function() {
			var X = this._getModel(),
				Y = N.SVGView.fromModel(X);
			return Y.render()
		},
		_getModel: function() {
			var X = this,
				cb = X.options,
				Y = X.element,
				ca = new bo(ad({
					width: Y.width() || ai,
					height: Y.height() || ag,
					transitions: cb.transitions
				}, cb.chartArea)),
				cc;
			if (cb.title && cb.title.visible && cb.title.text) {
				ca.append(new bK(cb.title))
			}
			cc = ca._plotArea = X._createPlotArea();
			if (cb.legend.visible) {
				ca.append(new aP(cc.options.legend))
			}
			ca.append(cc);
			ca.reflow();
			return ca
		},
		_createPlotArea: function() {
			var Y = this,
				cd = Y.options,
				cg = cd.series,
				cb, cc = cg.length,
				ca, X = [],
				ch = [],
				ce = [],
				cf;
			for (cb = 0; cb < cc; cb++) {
				ca = cg[cb];
				if (aF(ca.type, F)) {
					X.push(ca)
				} else {
					if (aF(ca.type, b5)) {
						ch.push(ca)
					} else {
						if (ca.type === ba) {
							ce.push(ca)
						}
					}
				}
			}
			if (ce.length > 0) {
				cf = new bf(ce, cd)
			} else {
				if (ch.length > 0) {
					cf = new b6(ch, cd)
				} else {
					cf = new H(X, cd)
				}
			}
			return cf
		},
		_supportsSVG: bF,
		_attachEvents: function() {
			var X = this,
				Y = X.element;
			Y.bind(S, bk(X._click, X));
			Y.bind(a2, bk(X._mouseOver, X))
		},
		_getPoint: function(cb) {
			var X = this,
				cd = X._model,
				ca = X._eventCoordinates(cb),
				cf = cb.target.id,
				Y = cd.idMap[cf],
				cc = cd.idMapMetadata[cf],
				ce;
			if (Y) {
				if (Y.getNearestPoint && cc) {
					ce = Y.getNearestPoint(ca.x, ca.y, cc.seriesIx)
				} else {
					ce = Y
				}
			}
			return ce
		},
		_eventCoordinates: function(X) {
			var Y = this.element,
				ca = Y.offset(),
				cb = parseInt(Y.css("paddingLeft"), 10),
				cc = parseInt(Y.css("paddingTop"), 10),
				cd = a(window);
			return ({
				x: X.clientX - ca.left - cb + cd.scrollLeft(),
				y: X.clientY - ca.top - cc + cd.scrollTop()
			})
		},
		_click: function(Y) {
			var X = this,
				ca = X._getPoint(Y);
			if (ca) {
				X.trigger(bx, {
					value: ca.value,
					category: ca.category,
					series: ca.series,
					dataItem: ca.dataItem,
					element: a(Y.target)
				})
			}
		},
		_mouseOver: function(Y) {
			var X = this,
				cc = X._tooltip,
				ca = X._highlight,
				cd, cb;
			if (!ca || ca.element === Y.target) {
				return
			}
			cb = X._getPoint(Y);
			if (cb) {
				X._activePoint = cb;
				cd = ad({}, X.options.tooltip, cb.options.tooltip);
				if (cd.visible) {
					cc.show(cb)
				}
				ca.show(cb);
				a(al.body).bind(a1, bk(X._mouseMove, X))
			}
		},
		_mouseMove: function(ca) {
			var X = this,
				cf = X._tooltip,
				cb = X._highlight,
				Y = X._eventCoordinates(ca),
				cd = X._activePoint,
				cg, cc, ce;
			if (X._plotArea.box.containsPoint(Y.x, Y.y)) {
				if (cd && (cd.series.type === aQ || cd.series.type === k)) {
					cc = cd.owner;
					ce = cc.getNearestPoint(Y.x, Y.y, cd.seriesIx);
					if (ce && ce != cd) {
						X._activePoint = ce;
						cg = ad({}, X.options.tooltip, cd.options.tooltip);
						if (cg.visible) {
							cf.show(ce)
						}
						cb.show(ce)
					}
				}
			} else {
				a(al.body).unbind(a1);
				delete X._activePoint;
				cf.hide();
				cb.hide()
			}
		},
		_onDataChanged: function() {
			var ca = this,
				cf = ca.options,
				ch = cf.series,
				Y = cf.categoryAxis,
				cc = ca.dataSource.view(),
				cg, X, cb, ck;
			for (var ci = 0, cj = ch.length; ci < cj; ci++) {
				cb = ch[ci];
				if (cb.field || (cb.xField && cb.yField)) {
					cb.data = [];
					cb.dataItems = []
				}
			}
			for (var cd = 0, ce = cc.length; cd < ce; cd++) {
				cg = cc[cd];
				if (Y.field) {
					X = ay(Y.field, true)(cg);
					if (cd === 0) {
						Y.categories = [X]
					} else {
						Y.categories.push(X)
					}
				}
				for (var ci = 0, cj = ch.length; ci < cj; ci++) {
					cb = ch[ci];
					if (cb.field) {
						ck = ay(cb.field, true)(cg)
					} else {
						if (cb.xField && cb.yField) {
							ck = [ay(cb.xField, true)(cg), ay(cb.yField, true)(cg)]
						} else {
							ck = bS
						}
					}
					if (aj(ck)) {
						if (cd === 0) {
							cb.data = [ck];
							cb.dataItems = [cg]
						} else {
							cb.data.push(ck);
							cb.dataItems.push(cg)
						}
					}
				}
			}
			ca.trigger(ab);
			ca._redraw()
		}
	});
	var bi = Q.extend({
		init: function(Y, ca) {
			var X = this;
			X.x = bq(Y, Z);
			X.y = bq(ca, Z)
		}
	});
	var C = Q.extend({
		init: function(Y, cb, ca, cc) {
			var X = this;
			X.x1 = Y || 0;
			X.x2 = ca || 0;
			X.y1 = cb || 0;
			X.y2 = cc || 0
		},
		width: function() {
			return this.x2 - this.x1
		},
		height: function() {
			return this.y2 - this.y1
		},
		translate: function(Y, ca) {
			var X = this;
			X.x1 += Y;
			X.x2 += Y;
			X.y1 += ca;
			X.y2 += ca;
			return X
		},
		move: function(cb, cc) {
			var X = this,
				Y = X.height(),
				ca = X.width();
			X.x1 = cb;
			X.y1 = cc;
			X.x2 = X.x1 + ca;
			X.y2 = X.y1 + Y;
			return X
		},
		wrap: function(Y) {
			var X = this;
			X.x1 = aX.min(X.x1, Y.x1);
			X.y1 = aX.min(X.y1, Y.y1);
			X.x2 = aX.max(X.x2, Y.x2);
			X.y2 = aX.max(X.y2, Y.y2);
			return X
		},
		snapTo: function(ca, X) {
			var Y = this;
			if (X == b4 || !X) {
				Y.x1 = ca.x1;
				Y.x2 = ca.x2
			}
			if (X == b7 || !X) {
				Y.y1 = ca.y1;
				Y.y2 = ca.y2
			}
			return Y
		},
		alignTo: function(cd, ca) {
			var Y = this,
				cb = Y.height(),
				ce = Y.width(),
				X = ca == bP || ca == B ? b7 : b4,
				cc = X == b7 ? cb : ce;
			if (ca == bP || ca == aO) {
				Y[X + 1] = cd[X + 1] - cc
			} else {
				Y[X + 1] = cd[X + 2]
			}
			Y.x2 = Y.x1 + ce;
			Y.y2 = Y.y1 + cb;
			return Y
		},
		shrink: function(ca, Y) {
			var X = this;
			X.x2 -= ca;
			X.y2 -= Y;
			return X
		},
		expand: function(Y, X) {
			this.shrink(-Y, -X);
			return this
		},
		pad: function(Y) {
			var X = this,
				ca = ax(Y);
			X.x1 -= ca.left;
			X.x2 += ca.right;
			X.y1 -= ca.top;
			X.y2 += ca.bottom;
			return X
		},
		unpad: function(Y) {
			var X = this,
				ca = ax(Y);
			ca.left = -ca.left;
			ca.top = -ca.top;
			ca.right = -ca.right;
			ca.bottom = -ca.bottom;
			return X.pad(ca)
		},
		clone: function() {
			var X = this;
			return new C(X.x1, X.y1, X.x2, X.y2)
		},
		center: function() {
			var X = this;
			return {
				x: X.x1 + X.width() / 2,
				y: X.y1 + X.height() / 2
			}
		},
		containsPoint: function(Y, ca) {
			var X = this;
			return Y >= X.x1 && Y <= X.x2 && ca >= X.y1 && ca <= X.y2
		},
		points: function() {
			var X = this;
			return [new bi(X.x1, X.y1), new bi(X.x2, X.y1), new bi(X.x2, X.y2), new bi(X.x1, X.y2)]
		}
	});
	var bw = Q.extend({
		init: function(Y, ca, cc, X) {
			var cb = this;
			cb.c = Y;
			cb.r = ca;
			cb.startAngle = cc;
			cb.angle = X
		},
		clone: function() {
			var X = this;
			return new bw(X.c, X.r, X.startAngle, X.angle)
		},
		expand: function(X) {
			this.r += X;
			return this
		},
		middle: function() {
			return this.startAngle + this.angle / 2
		},
		radius: function(X) {
			this.r = X;
			return this
		},
		point: function(X) {
			var cc = this,
				cb = X * ak,
				Y = aX.cos(cb),
				ca = aX.sin(cb),
				cd = cc.c.x - (Y * cc.r),
				ce = cc.c.y - (ca * cc.r);
			return new bi(cd, ce)
		}
	});
	var O = Q.extend({
		init: function(Y) {
			var X = this;
			X.children = [];
			X.options = ad({}, X.options, Y)
		},
		reflow: function(cd) {
			var cb = this,
				Y = cb.children,
				X, cc, ca;
			for (cc = 0; cc < Y.length; cc++) {
				ca = Y[cc];
				ca.reflow(cd);
				X = X ? X.wrap(ca.box) : ca.box.clone()
			}
			cb.box = X
		},
		getViewElements: function(cc) {
			var ca = this,
				cd = [],
				X = ca.children,
				Y = X.length;
			for (var cb = 0; cb < Y; cb++) {
				cd.push.apply(cd, X[cb].getViewElements(cc))
			}
			return cd
		},
		registerId: function(Y, ca) {
			var X = this,
				cb;
			cb = X.getRoot();
			if (cb) {
				cb.idMap[Y] = X;
				if (ca) {
					cb.idMapMetadata[Y] = ca
				}
			}
		},
		translateChildren: function(ca, cb) {
			var cc = this,
				X = cc.children,
				Y = X.length,
				cd;
			for (cd = 0; cd < Y; cd++) {
				X[cd].box.translate(ca, cb)
			}
		},
		append: function() {
			var X = this,
				Y, ca = arguments.length;
			e(X.children, arguments);
			for (Y = 0; Y < ca; Y++) {
				arguments[Y].parent = X
			}
		},
		getRoot: function() {
			var X = this,
				Y = X.parent;
			return Y ? Y.getRoot() : null
		}
	});
	var bo = O.extend({
		init: function(X) {
			var Y = this;
			Y.idMap = {};
			Y.idMapMetadata = {};
			O.fn.init.call(Y, X)
		},
		options: {
			width: ai,
			height: ag,
			background: b1,
			border: {
				color: A,
				width: 0
			},
			margin: ax(5),
			zIndex: -1
		},
		reflow: function() {
			var cc = this,
				cb = cc.options,
				X = cc.children,
				Y = new C(0, 0, cb.width, cb.height);
			cc.box = Y.unpad(cb.margin);
			for (var ca = 0; ca < X.length; ca++) {
				X[ca].reflow(Y);
				Y = D(Y, X[ca].box)
			}
		},
		getViewElements: function(cd) {
			var cc = this,
				cb = cc.options,
				X = cb.border || {},
				Y = cc.box.clone().pad(cb.margin).unpad(X.width),
				ca = [cd.createRect(Y, {
					stroke: X.width ? X.color : "",
					strokeWidth: X.width,
					dashType: X.dashType,
					fill: cb.background,
					zIndex: cb.zIndex
				})];
			return ca.concat(O.fn.getViewElements.call(cc, cd))
		},
		getRoot: function() {
			return this
		}
	});
	var E = O.extend({
		init: function(X) {
			O.fn.init.call(this, X)
		},
		options: {
			align: aO,
			vAlign: bP,
			margin: {},
			padding: {},
			border: {
				color: A,
				width: 0
			},
			background: "",
			width: 0,
			height: 0,
			visible: true
		},
		reflow: function(ch) {
			var cd = this,
				ca, cc, cf = cd.options,
				cb = cd.children,
				ce = ax(cf.margin),
				cg = ax(cf.padding),
				X = cf.border,
				Y = X.width;
			O.fn.reflow.call(cd, ch);
			if (cb.length === 0) {
				ca = cd.box = new C(0, 0, cf.width, cf.height)
			} else {
				ca = cd.box
			}
			cc = cd.contentBox = ca.clone();
			ca.pad(cg).pad(Y).pad(ce);
			cd.align(ch, b4, cf.align);
			cd.align(ch, b7, cf.vAlign);
			cd.paddingBox = ca.clone().unpad(ce).unpad(Y);
			cd.translateChildren(ca.x1 - cc.x1 + ce.left + Y + cg.left, ca.y1 - cc.y1 + ce.top + Y + cg.top)
		},
		align: function(cg, Y, X) {
			var cd = this,
				ca = cd.box,
				cb = Y + 1,
				cc = Y + 2,
				cf = Y === b4 ? b3 : aB,
				ce = ca[cf]();
			if (aF(X, [aO, bP])) {
				ca[cb] = cg[cb];
				ca[cc] = ca[cb] + ce
			} else {
				if (aF(X, [bn, B])) {
					ca[cc] = cg[cc];
					ca[cb] = ca[cc] - ce
				} else {
					if (X == L) {
						ca[cb] = cg[cb] + (cg[cf]() - ce) / 2;
						ca[cc] = ca[cb] + ce
					}
				}
			}
		},
		hasBox: function() {
			var X = this.options;
			return X.border.width || X.background
		},
		getViewElements: function(cd, cc) {
			var Y = this,
				cb = Y.options;
			if (!cb.visible) {
				return []
			}
			var X = cb.border || {},
				ca = [];
			if (Y.hasBox()) {
				ca.push(cd.createRect(Y.paddingBox, ad({
					id: cb.id,
					stroke: X.width ? X.color : "",
					strokeWidth: X.width,
					dashType: X.dashType,
					strokeOpacity: cb.opacity,
					fill: cb.background,
					fillOpacity: cb.opacity,
					animation: cb.animation,
					zIndex: cb.zIndex
				}, cc)))
			}
			return ca.concat(O.fn.getViewElements.call(Y, cd))
		}
	});
	var bI = O.extend({
		init: function(X, Y) {
			var ca = this;
			O.fn.init.call(ca, Y);
			ca.content = X;
			ca.reflow(new C())
		},
		options: {
			font: af,
			color: A,
			align: aO,
			vAlign: ""
		},
		reflow: function(cb) {
			var cc = this,
				Y = cc.options,
				ca = Y.size = aZ(cc.content, {
					font: Y.font
				}, Y.rotation);
			cc.baseline = ca.baseline;
			if (Y.align == aO) {
				cc.box = new C(cb.x1, cb.y1, cb.x1 + ca.width, cb.y1 + ca.height)
			} else {
				if (Y.align == bn) {
					cc.box = new C(cb.x2 - ca.width, cb.y1, cb.x2, cb.y1 + ca.height)
				} else {
					if (Y.align == L) {
						var X = (cb.width() - ca.width) / 2;
						cc.box = new C(bq(cb.x1 + X, Z), cb.y1, bq(cb.x2 - X, Z), cb.y1 + ca.height)
					}
				}
			}
			if (Y.vAlign == L) {
				var X = (cb.height() - ca.height) / 2;
				cc.box = new C(cc.box.x1, cb.y1 + X, cc.box.x2, cb.y2 - X)
			} else {
				if (Y.vAlign == B) {
					cc.box = new C(cc.box.x1, cb.y2 - ca.height, cc.box.x2, cb.y2)
				} else {
					if (Y.vAlign == bP) {
						cc.box = new C(cc.box.x1, cb.y1, cc.box.x2, cb.y1 + ca.height)
					}
				}
			}
		},
		getViewElements: function(ca) {
			var Y = this,
				X = Y.options;
			O.fn.getViewElements.call(this, ca);
			return [ca.createText(Y.content, ad({}, X, {
				x: Y.box.x1,
				y: Y.box.y1,
				baseline: Y.baseline
			}))]
		}
	});
	var bJ = E.extend({
		init: function(X, Y) {
			var cb = this,
				ca;
			E.fn.init.call(cb, Y);
			Y = cb.options;
			if (!Y.template) {
				X = Y.format ? av(Y.format, X) : X
			}
			ca = new bI(X, ad({}, Y, {
				align: aO,
				vAlign: bP
			}));
			cb.append(ca);
			if (cb.hasBox()) {
				ca.options.id = bU()
			}
			cb.reflow(new C())
		}
	});
	var w = O.extend({
		init: function(Y, ca) {
			var X = this;
			O.fn.init.call(X, ca);
			X.append(new bJ(Y, X.options))
		},
		options: {
			position: a9,
			margin: ax(3),
			padding: ax(4),
			color: A,
			background: "",
			border: {
				width: 1,
				color: ""
			},
			aboveAxis: true,
			isVertical: false,
			animation: {
				type: at,
				delay: aH
			},
			zIndex: 1
		},
		reflow: function(ce) {
			var Y = this,
				cc = Y.options,
				cb = cc.isVertical,
				X = cc.aboveAxis,
				cf = Y.children[0],
				ca = cf.box,
				cd = cf.options.padding;
			cf.options.align = cb ? L : aO;
			cf.options.vAlign = cb ? bP : L;
			if (cc.position == aJ) {
				if (cb) {
					cf.options.vAlign = bP;
					if (!X && ca.height() < ce.height()) {
						cf.options.vAlign = B
					}
				} else {
					cf.options.align = X ? bn : aO
				}
			} else {
				if (cc.position == L) {
					cf.options.vAlign = L;
					cf.options.align = L
				} else {
					if (cc.position == aI) {
						if (cb) {
							cf.options.vAlign = X ? B : bP
						} else {
							cf.options.align = X ? aO : bn
						}
					} else {
						if (cc.position == a9) {
							if (cb) {
								if (X) {
									ce = new C(ce.x1, ce.y1 - ca.height(), ce.x2, ce.y1)
								} else {
									ce = new C(ce.x1, ce.y2, ce.x2, ce.y2 + ca.height())
								}
							} else {
								cf.options.align = L;
								if (X) {
									ce = new C(ce.x2 + ca.width(), ce.y1, ce.x2, ce.y2)
								} else {
									ce = new C(ce.x1 - ca.width(), ce.y1, ce.x1, ce.y2)
								}
							}
						}
					}
				}
			}
			if (cb) {
				cd.left = cd.right = (ce.width() - cf.contentBox.width()) / 2
			} else {
				cd.top = cd.bottom = (ce.height() - cf.contentBox.height()) / 2
			}
			cf.reflow(ce)
		}
	});
	var bK = O.extend({
		init: function(X) {
			var Y = this;
			O.fn.init.call(Y, X);
			Y.append(new bJ(Y.options.text, ad({}, Y.options, {
				vAlign: Y.options.position
			})))
		},
		options: {
			text: "",
			color: A,
			position: bP,
			align: L,
			margin: ax(5),
			padding: ax(5)
		},
		reflow: function(X) {
			var Y = this;
			O.fn.reflow.call(Y, X);
			Y.box.snapTo(X, b4)
		}
	});
	var aP = O.extend({
		init: function(Y) {
			var X = this;
			O.fn.init.call(X, Y);
			X.createLabels()
		},
		options: {
			position: bn,
			items: [],
			labels: {},
			offsetX: 0,
			offsetY: 0,
			margin: ax(10),
			padding: ax(5),
			border: {
				color: A,
				width: 0
			},
			background: "",
			zIndex: 1
		},
		createLabels: function() {
			var cc = this,
				ca = cc.options.items,
				X = ca.length,
				cb, cd, Y;
			for (Y = 0; Y < X; Y++) {
				cd = ca[Y].name;
				cb = new bI(cd, cc.options.labels);
				cc.append(cb)
			}
		},
		reflow: function(cb) {
			var Y = this,
				ca = Y.options,
				X = Y.children.length;
			if (X === 0) {
				Y.box = cb.clone();
				return
			}
			if (ca.position == "custom") {
				Y.customLayout(cb);
				return
			}
			if (ca.position == bP || ca.position == B) {
				Y.horizontalLayout(cb)
			} else {
				Y.verticalLayout(cb)
			}
		},
		getViewElements: function(cn) {
			var ci = this,
				ca = ci.children,
				cl = ci.options,
				cf = cl.items,
				cc = cf.length,
				ck = ci.markerSize(),
				cd = cn.createGroup({
					zIndex: cl.zIndex
				}),
				X = cl.border || {},
				cm, cj, ch, cb, cg, Y, ce;
			e(cd.children, O.fn.getViewElements.call(ci, cn));
			for (ce = 0; ce < cc; ce++) {
				cb = cf[ce].color;
				cg = ca[ce];
				cj = new C();
				Y = cg.box;
				ch = ch ? ch.wrap(Y) : Y.clone();
				cj.x1 = Y.x1 - ck * 2;
				cj.x2 = cj.x1 + ck;
				if (cl.position == bP || cl.position == B) {
					cj.y1 = Y.y1 + ck / 2
				} else {
					cj.y1 = Y.y1 + (Y.height() - ck) / 2
				}
				cj.y2 = cj.y1 + ck;
				cd.children.push(cn.createRect(cj, {
					fill: cb,
					stroke: cb
				}))
			}
			if (ca.length > 0) {
				cm = ax(cl.padding);
				cm.left += ck * 2;
				ch.pad(cm);
				cd.children.unshift(cn.createRect(ch, {
					stroke: X.width ? X.color : "",
					strokeWidth: X.width,
					dashType: X.dashType,
					fill: cl.background
				}))
			}
			return [cd]
		},
		verticalLayout: function(ck) {
			var ce = this,
				cj = ce.options,
				X = ce.children,
				Y = X.length,
				cc = X[0].box.clone(),
				ch, ci, cf = ax(cj.margin),
				cg = ce.markerSize() * 2,
				cb, ca;
			for (ca = 1; ca < Y; ca++) {
				cb = ce.children[ca];
				cb.box.alignTo(ce.children[ca - 1].box, B);
				cc.wrap(cb.box)
			}
			if (cj.position == aO) {
				ch = ck.x1 + cg + cf.left;
				ci = (ck.y2 - cc.height()) / 2;
				cc.x2 += cg + cf.left + cf.right
			} else {
				ch = ck.x2 - cc.width() - cf.right;
				ci = (ck.y2 - cc.height()) / 2;
				cc.translate(ch, ci);
				cc.x1 -= cg + cf.left
			}
			ce.translateChildren(ch + cj.offsetX, ci + cj.offsetY);
			var cd = cc.width();
			cc.x1 = aX.max(ck.x1, cc.x1);
			cc.x2 = cc.x1 + cd;
			cc.y1 = ck.y1;
			cc.y2 = ck.y2;
			ce.box = cc
		},
		horizontalLayout: function(cm) {
			var cf = this,
				ck = cf.options,
				ca = cf.children,
				cb = ca.length,
				X = ca[0].box.clone(),
				ch = cf.markerSize() * 3,
				ci, cj, cg = ax(ck.margin),
				Y = ca[0].box.width() + ch,
				cl = cm.width(),
				cd, ce = 0,
				cc;
			for (cc = 1; cc < cb; cc++) {
				cd = ca[cc];
				Y += cd.box.width() + ch;
				if (Y > cl - ch) {
					cd.box = new C(X.x1, X.y2, X.x1 + cd.box.width(), X.y2 + cd.box.height());
					Y = cd.box.width() + ch;
					ce = cd.box.y1
				} else {
					cd.box.alignTo(ca[cc - 1].box, bn);
					cd.box.y2 = ce + cd.box.height();
					cd.box.y1 = ce;
					cd.box.translate(ch, 0)
				}
				X.wrap(cd.box)
			}
			ci = (cm.width() - X.width() + ch) / 2;
			if (ck.position === bP) {
				cj = cm.y1 + cg.top;
				X.y2 = cm.y1 + X.height() + cg.top + cg.bottom;
				X.y1 = cm.y1
			} else {
				cj = cm.y2 - X.height() - cg.bottom;
				X.y1 = cm.y2 - X.height() - cg.top - cg.bottom;
				X.y2 = cm.y2
			}
			cf.translateChildren(ci + ck.offsetX, cj + ck.offsetY);
			X.x1 = cm.x1;
			X.x2 = cm.x2;
			cf.box = X
		},
		customLayout: function(cf) {
			var cc = this,
				ce = cc.options,
				X = cc.children,
				Y = X.length,
				cb = X[0].box.clone(),
				cd = cc.markerSize() * 2,
				ca;
			for (ca = 1; ca < Y; ca++) {
				cb = cc.children[ca].box;
				cb.alignTo(cc.children[ca - 1].box, B);
				cb.wrap(cb)
			}
			cc.translateChildren(ce.offsetX + cd, ce.offsetY);
			cc.box = cf
		},
		markerSize: function() {
			var Y = this,
				X = Y.children;
			if (X.length > 0) {
				return X[0].box.height() / 2
			} else {
				return 0
			}
		}
	});
	var m = O.extend({
		init: function(Y) {
			var X = this;
			O.fn.init.call(X, Y);
			X.createLabels();
			X.createTitle()
		},
		options: {
			labels: {
				visible: true,
				rotation: 0,
				mirror: false,
				step: 1
			},
			line: {
				width: 1,
				color: A
			},
			title: {
				visible: true,
				position: L
			},
			majorTickType: a8,
			majorTickSize: 4,
			minorTickType: a3,
			minorTickSize: 3,
			axisCrossingValue: 0,
			minorGridLines: {
				visible: false,
				width: 1,
				color: A
			},
			margin: 5
		},
		createLabels: function() {
			var Y = this,
				cf = Y.options,
				X = cf.isVertical ? bn : L,
				cc = ad({}, cf.labels, {
					align: X,
					zIndex: cf.zIndex
				}),
				cg = cc.step;
			Y.labels = [];
			if (cc.visible) {
				var cd = Y.getLabelsCount(),
					ce, cb, ca;
				for (ca = 0; ca < cd; ca += cg) {
					ce = Y.getLabelText(ca);
					if (cc.template) {
						labelTemplate = y(cc.template);
						ce = labelTemplate({
							value: ce
						})
					}
					cb = new bJ(ce, cc);
					Y.append(cb);
					Y.labels.push(cb)
				}
			}
		},
		getLabelsCount: function() {},
		getLabelText: function(X) {},
		lineBox: function() {
			var X = this,
				ce = X.options,
				cb = X.box,
				cc = ce.isVertical,
				cd = ce.labels.mirror,
				Y = cd ? cb.x1 : cb.x2,
				ca = cd ? cb.y2 : cb.y1;
			if (cc) {
				return new C(Y, cb.y1, Y, cb.y2)
			}
			return new C(cb.x1, ca, cb.x2, ca)
		},
		createTitle: function() {
			var X = this,
				Y = X.options,
				cb = ad({
					rotation: Y.isVertical ? -90 : 0,
					text: "",
					zIndex: 1
				}, Y.title),
				ca;
			if (cb.visible && cb.text) {
				ca = new bJ(cb.text, cb);
				X.append(ca);
				X.title = ca
			}
		},
		renderTicks: function(ce) {
			var X = this,
				cc = X.options,
				cb = cc.labels.mirror,
				Y = X.lineBox(),
				ca = X.getMajorTickPositions(),
				cd = [];
			if (cc.majorTickType.toLowerCase() === a8) {
				cd = cd.concat(aW(ca, function(cf) {
					return {
						pos: cf,
						size: cc.majorTickSize,
						width: cc.line.width,
						color: cc.line.color
					}
				}))
			}
			if (cc.minorTickType.toLowerCase() === a8) {
				cd = cd.concat(aW(X.getMinorTickPositions(), function(cf) {
					if (cc.majorTickType.toLowerCase() !== a3) {
						if (!aF(cf, ca)) {
							return {
								pos: cf,
								size: cc.minorTickSize,
								width: cc.line.width,
								color: cc.line.color
							}
						}
					} else {
						return {
							pos: cf,
							size: cc.minorTickSize,
							width: cc.line.width,
							color: cc.line.color
						}
					}
				}))
			}
			return aW(cd, function(cf) {
				var cg = cb ? Y.x2 : Y.x2 - cf.size,
					ch = cb ? Y.y1 - cf.size : Y.y1;
				if (cc.isVertical) {
					return ce.createLine(cg, cf.pos, cg + cf.size, cf.pos, {
						strokeWidth: cf.width,
						stroke: cf.color
					})
				} else {
					return ce.createLine(cf.pos, ch, cf.pos, ch + cf.size, {
						strokeWidth: cf.width,
						stroke: cf.color
					})
				}
			})
		},
		getActualTickSize: function() {
			var X = this,
				Y = X.options,
				ca = 0;
			if (Y.majorTickType != a3 && Y.minorTickType != a3) {
				ca = aX.max(Y.majorTickSize, Y.minorTickSize)
			} else {
				if (Y.majorTickType != a3) {
					ca = Y.majorTickSize
				} else {
					if (Y.minorTickType != a3) {
						ca = Y.minorTickSize
					}
				}
			}
			return ca
		},
		renderPlotBands: function(ci) {
			var X = this,
				cb = X.options,
				cd = cb.plotBands || [],
				ca = cb.isVertical,
				ce = [],
				cc = X.parent,
				cf, cg, Y, ch;
			if (cd.length) {
				ce = aW(cd, function(cj) {
					Y = aj(cj.from) ? cj.from : a0;
					ch = aj(cj.to) ? cj.to : aY;
					cj.from = aX.min(Y, ch);
					cj.to = aX.max(Y, ch);
					cf = ca ? cc.axisX.lineBox() : cc.axisX.getSlot(cj.from, cj.to);
					cg = ca ? cc.axisY.getSlot(cj.from, cj.to) : cc.axisY.lineBox();
					return ci.createRect(new C(cf.x1, cg.y1, cf.x2, cg.y2), {
						fill: cj.color,
						fillOpacity: cj.opacity,
						zIndex: -1
					})
				})
			}
			return ce
		},
		reflowAxis: function(Y, ci) {
			var X = this,
				ch = X.options,
				cc = ch.isVertical,
				ce = X.labels,
				ca = ce.length,
				cj = X.getActualTickSize() + ch.margin,
				cf = 0,
				cg = 0,
				ck = X.title,
				cd, cb;
			for (cb = 0; cb < ca; cb++) {
				cd = ce[cb];
				cf = aX.max(cf, cd.box.height());
				cg = aX.max(cg, cd.box.width())
			}
			if (ck) {
				if (cc) {
					cg += ck.box.width()
				} else {
					cf += ck.box.height()
				}
			}
			if (cc) {
				X.box = new C(Y.x1, Y.y1, Y.x1 + cg + cj, Y.y2)
			} else {
				X.box = new C(Y.x1, Y.y1, Y.x2, Y.y1 + cf + cj)
			}
			X.arrangeTitle();
			X.arrangeLabels(cg, cf, ci)
		},
		arrangeLabels: function(cn, cm, cs) {
			var X = this,
				cr = X.options,
				ci = cr.labels.step,
				cg = X.labels,
				cb = cr.isVertical,
				cl = X.lineBox(),
				cp = cr.labels.mirror,
				cu = X.getMajorTickPositions(),
				cv = X.getActualTickSize(),
				ce = X.getActualTickSize() + cr.margin,
				cd, ck, ca;
			for (ca = 0; ca < cg.length; ca++) {
				var cc = cg[ca],
					ct = ci * ca,
					ch = cb ? cc.box.height() : cc.box.width(),
					cf = cu[ct] - (ch / 2),
					Y, cq, co, cj;
				if (cb) {
					if (cs == a6) {
						Y = cu[ct];
						cq = cu[ct + 1];
						co = Y + (cq - Y) / 2;
						cf = co - (ch / 2)
					}
					cj = cl.x2;
					if (cp) {
						cj += ce
					} else {
						cj -= ce + cc.box.width()
					}
					cd = cc.box.move(cj, cf)
				} else {
					if (cs == a6) {
						Y = cu[ct];
						cq = cu[ct + 1]
					} else {
						Y = cf;
						cq = cf + ch
					}
					ck = cl.y1;
					if (cp) {
						ck -= ce + cc.box.height()
					} else {
						ck += ce
					}
					cd = new C(Y, ck, cq, ck + cc.box.height())
				}
				cc.reflow(cd)
			}
		},
		arrangeTitle: function() {
			var X = this,
				cb = X.options,
				ca = cb.labels.mirror,
				Y = cb.isVertical,
				cc = X.title;
			if (cc) {
				if (Y) {
					cc.options.align = ca ? bn : aO;
					cc.options.vAlign = cc.options.position
				} else {
					cc.options.align = cc.options.position;
					cc.options.vAlign = ca ? bP : B
				}
				cc.reflow(X.box)
			}
		}
	});
	var a4 = m.extend({
		init: function(ce, cd, cc) {
			var X = this,
				Y = X.initDefaults(ce, cd, cc),
				cb, ca;
			m.fn.init.call(X, Y)
		},
		options: {
			min: 0,
			max: 1,
			isVertical: true,
			majorGridLines: {
				visible: true,
				width: 1,
				color: A
			},
			zIndex: 1
		},
		initDefaults: function(cf, ce, cd) {
			var cc = this,
				ca = cc.autoAxisMin(cf, ce),
				Y = cc.autoAxisMax(cf, ce),
				X = cc.autoMajorUnit(ca, Y),
				cb = {
					majorUnit: X
				},
				cg;
			if (ca < 0) {
				ca -= X
			}
			if (Y > 0) {
				Y += X
			}
			cb.min = au(ca, X);
			cb.max = K(Y, X);
			if (cd) {
				cg = aj(cd.min) || aj(cd.max);
				if (cg) {
					if (cd.min === cd.max) {
						if (cd.min > 0) {
							cd.min = 0
						} else {
							cd.max = 1
						}
					}
				}
				if (cd.majorUnit) {
					cb.min = au(cb.min, cd.majorUnit);
					cb.max = K(cb.max, cd.majorUnit)
				} else {
					if (cg) {
						cd = ad(cb, cd);
						cb.majorUnit = cc.autoMajorUnit(cd.min, cd.max)
					}
				}
			}
			return ad(cb, cd)
		},
		range: function() {
			var X = this.options;
			return {
				min: X.min,
				max: X.max
			}
		},
		reflow: function(X) {
			this.reflowAxis(X)
		},
		getViewElements: function(cd) {
			var X = this,
				cc = X.options,
				Y = O.fn.getViewElements.call(X, cd),
				ca = X.lineBox(),
				cb;
			if (cc.line.width > 0) {
				cb = {
					strokeWidth: cc.line.width,
					stroke: cc.line.color,
					dashType: cc.line.dashType,
					zIndex: cc.zIndex
				};
				if (cc.isVertical) {
					Y.push(cd.createLine(ca.x1, ca.y1, ca.x1, ca.y2, cb))
				} else {
					Y.push(cd.createLine(ca.x1, ca.y1, ca.x2, ca.y1, cb))
				}
				e(Y, X.renderTicks(cd));
				e(Y, X.renderPlotBands(cd))
			}
			return Y
		},
		autoMajorUnit: function(ca, Y) {
			var X = Y - ca;
			if (X == 0) {
				if (Y == 0) {
					return 0.1
				}
				X = aX.abs(Y)
			}
			var cc = aX.pow(10, aX.floor(aX.log(X) / aX.log(10))),
				cb = bq((X / cc), ah),
				cd = 1;
			if (cb < 1.904762) {
				cd = 0.2
			} else {
				if (cb < 4.761904) {
					cd = 0.5
				} else {
					if (cb < 9.523809) {
						cd = 1
					} else {
						cd = 2
					}
				}
			}
			return bq(cc * cd, ah)
		},
		autoAxisMax: function(cb, ca) {
			if (cb == 0 && ca == 0) {
				return 1
			}
			var X;
			if (cb <= 0 && ca <= 0) {
				ca = cb == ca ? 0 : ca;
				var Y = aX.abs((ca - cb) / ca);
				if (Y > b9) {
					return 0
				}
				X = ca - ((cb - ca) / 2)
			} else {
				cb = cb == ca ? 0 : cb;
				X = ca
			}
			return X
		},
		autoAxisMin: function(cb, ca) {
			if (cb == 0 && ca == 0) {
				return 0
			}
			var X;
			if (cb >= 0 && ca >= 0) {
				cb = cb == ca ? 0 : cb;
				var Y = (ca - cb) / ca;
				if (Y > b9) {
					return 0
				}
				X = cb - ((ca - cb) / 2)
			} else {
				ca = cb == ca ? 0 : ca;
				X = cb
			}
			return X
		},
		getDivisions: function(ca) {
			var X = this.options,
				Y = X.max - X.min;
			return aX.floor(bq(Y / ca, Z)) + 1
		},
		getTickPositions: function(cl) {
			var X = this,
				cf = X.options,
				cb = cf.isVertical,
				cc = X.lineBox(),
				cd = cb ? cc.height() : cc.width(),
				ci = cf.max - cf.min,
				cj = cd / ci,
				ck = cl * cj,
				Y = X.getDivisions(cl),
				cg = cc[cb ? "y2" : "x1"],
				ce = cb ? -1 : 1,
				ch = [],
				ca;
			for (ca = 0; ca < Y; ca++) {
				ch.push(bq(cg, Z));
				cg = cg + ck * ce
			}
			return ch
		},
		getMajorTickPositions: function() {
			var X = this;
			return X.getTickPositions(X.options.majorUnit)
		},
		getMinorTickPositions: function() {
			var X = this;
			return X.getTickPositions(X.options.majorUnit / 5)
		},
		lineBox: function() {
			var X = this,
				ce = X.options,
				cb = ce.isVertical,
				cd = cb ? "height" : "width",
				cc = X.labels,
				Y = m.fn.lineBox.call(X),
				cf = 0,
				ca = 0;
			if (cc.length > 1) {
				cf = cc[0].box[cd]() / 2;
				ca = aN(cc).box[cd]() / 2
			}
			if (cb) {
				return new C(Y.x1, Y.y1 + cf, Y.x1, Y.y2 - ca)
			} else {
				return new C(Y.x1 + cf, Y.y1, Y.x2 - ca, Y.y1)
			}
		},
		getSlot: function(X, ca) {
			var Y = this,
				cf = Y.options,
				cb = cf.isVertical,
				ck = cb ? b7 : b4,
				cc = Y.lineBox(),
				ce = cc[ck + 1],
				cd = cb ? cc.height() : cc.width(),
				ci = cd / (cf.max - cf.min),
				X = aj(X) ? X : cf.axisCrossingValue,
				ca = aj(ca) ? ca : cf.axisCrossingValue,
				X = aX.max(aX.min(X, cf.max), cf.min),
				ca = aX.max(aX.min(ca, cf.max), cf.min),
				cg, ch, cj = new C(cc.x1, cc.y1, cc.x1, cc.y1);
			if (cb) {
				cg = ce + ci * (cf.max - aX.max(X, ca));
				ch = ce + ci * (cf.max - aX.min(X, ca))
			} else {
				cg = ce + ci * (aX.min(X, ca) - cf.min);
				ch = ce + ci * (aX.max(X, ca) - cf.min)
			}
			cj[ck + 1] = cg;
			cj[ck + 2] = ch;
			return cj
		},
		getLabelsCount: function() {
			return this.getDivisions(this.options.majorUnit)
		},
		getLabelText: function(X) {
			var Y = this.options;
			return bq(Y.min + (X * Y.majorUnit), ah)
		}
	});
	var J = m.extend({
		options: {
			categories: [],
			isVertical: false,
			majorGridLines: {
				visible: false,
				width: 1,
				color: A
			},
			zIndex: 1
		},
		range: function() {
			return {
				min: 0,
				max: this.options.categories.length
			}
		},
		reflow: function(X) {
			this.reflowAxis(X, a6)
		},
		getViewElements: function(ce) {
			var X = this,
				cd = X.options,
				ca = cd.line,
				cb = X.lineBox(),
				Y = O.fn.getViewElements.call(X, ce),
				cc;
			if (ca.width > 0) {
				cc = {
					strokeWidth: ca.width,
					stroke: ca.color,
					dashType: ca.dashType,
					zIndex: ca.zIndex
				};
				Y.push(ce.createLine(cb.x1, cb.y1, cb.x2, cb.y2, cc));
				e(Y, X.renderTicks(ce));
				e(Y, X.renderPlotBands(ce))
			}
			return Y
		},
		getTickPositions: function(cb) {
			var X = this,
				cc = X.options,
				ca = cc.isVertical,
				cf = ca ? X.box.height() : X.box.width(),
				cg = cf / cb,
				cd = ca ? X.box.y1 : X.box.x1,
				ce = [],
				Y;
			for (Y = 0; Y < cb; Y++) {
				ce.push(bq(cd, Z));
				cd += cg
			}
			ce.push(ca ? X.box.y2 : X.box.x2);
			return ce
		},
		getMajorTickPositions: function() {
			var X = this;
			return X.getTickPositions(X.options.categories.length)
		},
		getMinorTickPositions: function() {
			var X = this;
			return X.getTickPositions(X.options.categories.length * 2)
		},
		getSlot: function(ca, ck) {
			var X = this,
				ce = X.options,
				cb = ce.isVertical,
				Y = aX.max(1, ce.categories.length),
				ca = aX.min(aX.max(0, ca), Y),
				ck = aj(ck) ? ck : ca,
				ck = aX.max(aX.min(Y, ck), ca),
				cd = X.lineBox(),
				ch = cb ? cd.height() : cd.width(),
				ci = cb ? cd.y1 : cd.x1,
				cj = ch / Y,
				cf = ci + (ca * cj),
				cg = cf + cj,
				cc = ck - ca;
			if (cc > 0 || (ca == ck && Y == ca)) {
				cg = cf + (cc * cj)
			}
			return cb ? new C(cd.x2, cf, cd.x2, cg) : new C(cf, cd.y1, cg, cd.y1)
		},
		getLabelsCount: function() {
			return this.options.categories.length
		},
		getLabelText: function(X) {
			var Y = this.options;
			return aj(Y.categories[X]) ? Y.categories[X] : ""
		}
	});
	var U = O.extend({
		init: function(Y) {
			var X = this;
			O.fn.init.call(X, Y)
		},
		options: {
			isVertical: false,
			gap: 0,
			spacing: 0
		},
		reflow: function(Y) {
			var cc = this,
				ch = cc.options,
				cg = ch.isVertical,
				X = cg ? b7 : b4,
				cb = cc.children,
				ce = ch.gap,
				cl = ch.spacing,
				cd = cb.length,
				cj = cd + ce + (cl * (cd - 1)),
				ck = (cg ? Y.height() : Y.width()) / cj,
				ci = Y[X + 1] + ck * (ce / 2),
				ca, cf;
			for (cf = 0; cf < cd; cf++) {
				ca = (cb[cf].box || Y).clone();
				ca[X + 1] = ci;
				ca[X + 2] = ci + ck;
				cb[cf].reflow(ca);
				if (cf < cd - 1) {
					ci += (ck * cl)
				}
				ci += ck
			}
		}
	});
	var bE = O.extend({
		init: function(X) {
			var Y = this;
			O.fn.init.call(Y, X)
		},
		options: {
			isVertical: true,
			isReversed: false
		},
		reflow: function(cl) {
			var ch = this,
				cf = ch.options,
				ce = cf.isVertical,
				cg = ce ? b4 : b7,
				ci = ce ? b7 : b4,
				cj = cl[ci + 2],
				ca = ch.children,
				X = ch.box = new C(),
				cb = ca.length,
				ck, cd;
			if (cf.isReversed) {
				ck = ce ? B : aO
			} else {
				ck = ce ? bP : bn
			}
			for (cd = 0; cd < cb; cd++) {
				var cc = ca[cd],
					Y = cc.box.clone();
				Y.snapTo(cl, cg);
				if (cc.options) {
					cc.options.stackBase = cj
				}
				if (cd == 0) {
					X = ch.box = Y.clone()
				} else {
					Y.alignTo(ca[cd - 1].box, ck)
				}
				cc.reflow(Y);
				X.wrap(Y)
			}
		}
	});
	var o = O.extend({
		init: function(ca, Y) {
			var X = this;
			X.value = ca;
			X.options.id = bU();
			O.fn.init.call(X, Y)
		},
		options: {
			color: b1,
			border: {
				width: 1
			},
			isVertical: true,
			overlay: {
				gradient: az
			},
			aboveAxis: true,
			labels: {
				visible: false
			},
			animation: {
				type: p
			},
			opacity: 1
		},
		render: function() {
			var X = this,
				cd = X.value,
				cc = X.options,
				Y = cc.labels,
				cb = cd,
				ca;
			if (X._rendered) {
				return
			} else {
				X._rendered = true
			}
			if (Y.visible && cd) {
				if (Y.template) {
					ca = y(Y.template);
					cb = ca({
						dataItem: X.dataItem,
						category: X.category,
						value: X.value,
						series: X.series
					})
				}
				X.append(new w(cb, ad({
					isVertical: cc.isVertical,
					id: bU()
				}, cc.labels)))
			}
		},
		reflow: function(cc) {
			this.render();
			var X = this,
				cb = X.options,
				Y = X.children,
				ca = Y[0];
			X.box = cc;
			if (ca) {
				ca.options.aboveAxis = cb.aboveAxis;
				ca.reflow(cc)
			}
		},
		getViewElements: function(ch) {
			var X = this,
				cf = X.options,
				cc = cf.isVertical,
				ce = cc ? 0 : 90,
				Y = cf.border.width > 0 ? {
					stroke: X.getBorderColor(),
					strokeWidth: cf.border.width,
					dashType: cf.border.dashType
				} : {},
				ca = X.box,
				cg = ad({
					id: cf.id,
					fill: cf.color,
					normalAngle: ce,
					aboveAxis: cf.aboveAxis,
					fillOpacity: cf.opacity,
					strokeOpacity: cf.opacity,
					stackBase: cf.stackBase,
					animation: cf.animation
				}, Y),
				cb = [],
				cd = X.children[0];
			if (cf.overlay) {
				cg.overlay = ad({
					rotation: ce
				}, cf.overlay)
			}
			cb.push(ch.createRect(ca, cg));
			e(cb, O.fn.getViewElements.call(X, ch));
			X.registerId(cf.id);
			if (cd) {
				X.registerId(cd.options.id)
			}
			return cb
		},
		getOutlineElement: function(cc, ca) {
			var X = this,
				Y = X.box,
				cb = X.options.id + a7;
			X.registerId(cb);
			ca = ad({}, ca, {
				id: cb
			});
			return cc.createRect(Y, ca)
		},
		getBorderColor: function() {
			var X = this,
				cb = X.options,
				ca = cb.color,
				Y = cb.border.color;
			if (!aj(Y)) {
				Y = new V(ca).brightness(q).toHex()
			}
			return Y
		},
		tooltipAnchor: function(ce, cd) {
			var Y = this,
				cc = Y.options,
				ca = Y.box,
				cb = cc.isVertical,
				X = cc.aboveAxis,
				cf, cg;
			if (cb) {
				cf = ca.x2 + bN;
				cg = X ? ca.y1 : ca.y2 - cd
			} else {
				if (cc.isStacked) {
					cf = ca.x2 - ce;
					cg = ca.y1 - cd - bN
				} else {
					cf = ca.x2 + bN;
					cg = ca.y1
				}
			}
			return new bi(cf, cg)
		},
		formatPointValue: function(X) {
			var Y = this;
			return Y.owner.formatPointValue(Y.value, X)
		}
	});
	var G = O.extend({
		init: function(ca, Y) {
			var X = this;
			O.fn.init.call(X, Y);
			X.plotArea = ca;
			X.valueAxisRanges = {};
			X.points = [];
			X.categoryPoints = [];
			X.seriesPoints = [];
			X.render()
		},
		options: {
			series: [],
			invertAxes: false,
			isStacked: false
		},
		render: function() {
			var X = this;
			X.traverseDataPoints(bk(X.addValue, X))
		},
		addValue: function(cg, X, Y, cd, ce) {
			var cb = this,
				cc, ca = cb.categoryPoints[Y],
				cf = cb.seriesPoints[ce];
			if (!ca) {
				cb.categoryPoints[Y] = ca = []
			}
			if (!cf) {
				cb.seriesPoints[ce] = cf = []
			}
			cb.updateRange(cg, Y, cd);
			cc = cb.createPoint(cg, X, Y, cd, ce);
			if (cc) {
				cc.category = X;
				cc.series = cd;
				cc.seriesIx = ce;
				cc.owner = cb;
				cc.dataItem = cd.dataItems ? cd.dataItems[Y] : {
					value: cg
				}
			}
			cb.points.push(cc);
			cf.push(cc);
			ca.push(cc)
		},
		updateRange: function(cd, ca, cc) {
			var cb = this,
				X = cc.axis || bj,
				Y = cb.valueAxisRanges[X];
			if (aj(cd)) {
				Y = cb.valueAxisRanges[X] = Y || {
					min: aY,
					max: a0
				};
				Y.min = aX.min(Y.min, cd);
				Y.max = aX.max(Y.max, cd)
			}
		},
		seriesValueAxis: function(X) {
			return this.plotArea.namedValueAxes[(X || {}).axis || bj]
		},
		reflow: function(ch) {
			var ca = this,
				cd = ca.options,
				cc = cd.invertAxes,
				ce = ca.plotArea,
				cg = 0,
				Y = ca.categorySlots = [],
				cb = ca.points,
				X = ce.categoryAxis,
				ci, cf;
			ca.traverseDataPoints(function(cr, ck, cl, cn) {
				ci = ca.seriesValueAxis(cn);
				cf = cb[cg++];
				if (cf && cf.plotValue) {
					cr = cf.plotValue
				}
				var cm = X.getSlot(cl),
					cs = ci.getSlot(cr),
					cp = cc ? cs : cm,
					cq = cc ? cm : cs,
					co = new C(cp.x1, cq.y1, cp.x2, cq.y2),
					cj = cr >= ci.options.axisCrossingValue;
				if (cf) {
					cf.options.aboveAxis = cj;
					cf.reflow(co)
				}
				if (!Y[cl]) {
					Y[cl] = cm
				}
			});
			ca.reflowCategories(Y);
			ca.box = ch
		},
		reflowCategories: function() {},
		traverseDataPoints: function(X) {
			var cb = this,
				cf = cb.options,
				cg = cf.series,
				Y = cb.plotArea.options.categoryAxis.categories || [],
				cc = I(cg),
				ca, ch, ci, cd, ce;
			for (ca = 0; ca < cc; ca++) {
				for (ch = 0; ch < cg.length; ch++) {
					cd = Y[ca];
					ce = cg[ch];
					ci = ce.data[ca];
					X(ci, cd, ca, ce, ch)
				}
			}
		},
		formatPointValue: function(Y, X) {
			return av(X, Y)
		}
	});
	var v = G.extend({
		init: function(ca, Y) {
			var X = this;
			X._categoryTotalsPos = [];
			X._categoryTotalsNeg = [];
			G.fn.init.call(X, ca, Y)
		},
		render: function() {
			var X = this;
			G.fn.render.apply(X);
			X.computeAxisRanges()
		},
		createPoint: function(cm, ca, cb, cj, ck) {
			var Y = this,
				ch = Y.options,
				cc = Y.children,
				ce = Y.options.isStacked,
				cf = ad({}, cj.labels);
			if (ce) {
				if (cf.position == a9) {
					cf.position = aJ
				}
			}
			var X = new o(cm, ad({}, {
				isVertical: !ch.invertAxes,
				overlay: cj.overlay,
				labels: cf,
				isStacked: ce
			}, cj));
			var cd = cc[cb];
			if (!cd) {
				cd = new U({
					isVertical: ch.invertAxes,
					gap: ch.gap,
					spacing: ch.spacing
				});
				Y.append(cd)
			}
			if (ce) {
				var cl = cd.children[0],
					ci, cg;
				if (!cl) {
					cl = new O();
					cd.append(cl);
					ci = new bE({
						isVertical: !ch.invertAxes
					});
					cg = new bE({
						isVertical: !ch.invertAxes,
						isReversed: true
					});
					cl.append(ci, cg)
				} else {
					ci = cl.children[0];
					cg = cl.children[1]
				}
				if (cm > 0) {
					ci.append(X)
				} else {
					cg.append(X)
				}
			} else {
				cd.append(X)
			}
			return X
		},
		updateRange: function(ce, X, cb) {
			var Y = this,
				ca = Y.options.isStacked,
				cd = Y._categoryTotalsPos,
				cc = Y._categoryTotalsNeg;
			if (aj(ce)) {
				if (ca) {
					aG(ce > 0 ? cd : cc, X, ce)
				} else {
					G.fn.updateRange.apply(Y, arguments)
				}
			}
		},
		computeAxisRanges: function() {
			var Y = this,
				ca = Y.options.isStacked,
				X;
			if (ca) {
				X = Y.options.series[0].axis || bj;
				Y.valueAxisRanges[X] = {
					min: bB(Y._categoryTotalsNeg.concat(0)),
					max: bA(Y._categoryTotalsPos.concat(0))
				}
			}
		},
		seriesValueAxis: function(ca) {
			var X = this,
				Y = X.options;
			return G.fn.seriesValueAxis.call(X, Y.isStacked ? X.options.series[0] : ca)
		},
		reflowCategories: function(X) {
			var Y = this,
				ca = Y.children,
				cb = ca.length,
				cc;
			for (cc = 0; cc < cb; cc++) {
				ca[cc].reflow(X[cc])
			}
		}
	});
	var by = E.extend({
		init: function(Y) {
			var X = this;
			E.fn.init.call(X, Y)
		},
		options: {
			type: bD,
			align: L,
			vAlign: L
		},
		getViewElements: function(cf, cd) {
			var cb = this,
				cc = cb.options,
				ce = cc.type,
				X = cb.paddingBox,
				Y = E.fn.getViewElements.call(cb, cf, cd)[0],
				ca = X.width() / 2;
			if (!Y) {
				return []
			}
			if (ce === bQ) {
				Y = cf.createPolyline([new bi(X.x1 + ca, X.y1), new bi(X.x1, X.y2), new bi(X.x2, X.y2)], true, Y.options)
			} else {
				if (ce === P) {
					Y = cf.createCircle([bq(X.x1 + ca, Z), bq(X.y1 + X.height() / 2, Z)], ca, Y.options)
				}
			}
			return [Y]
		}
	});
	var aV = O.extend({
		init: function(ca, X) {
			var Y = this;
			Y.value = ca;
			b0.fn.init.call(Y, X)
		},
		options: {
			aboveAxis: true,
			isVertical: true,
			markers: {
				visible: true,
				background: b1,
				size: aR,
				type: P,
				border: {
					width: 2
				},
				opacity: 1
			},
			labels: {
				visible: false,
				position: c,
				margin: ax(3),
				padding: ax(4),
				animation: {
					type: at,
					delay: aH
				}
			}
		},
		render: function() {
			var cf = this,
				ce = cf.options,
				cd = ce.markers,
				X = ce.labels,
				cb = cd.background,
				cc = ad({}, cd.border),
				ca = cf.value;
			if (cf._rendered) {
				return
			} else {
				cf._rendered = true
			}
			if (!aj(cc.color)) {
				cc.color = new V(cb).brightness(q).toHex()
			}
			cf.marker = new by({
				id: bU(),
				visible: cd.visible,
				type: cd.type,
				width: cd.size,
				height: cd.size,
				background: cb,
				border: cc,
				opacity: cd.opacity
			});
			cf.append(cf.marker);
			if (X.visible) {
				if (X.template) {
					var Y = y(X.template);
					ca = Y({
						dataItem: cf.dataItem,
						category: cf.category,
						value: cf.value,
						series: cf.series
					})
				} else {
					if (X.format) {
						ca = cf.formatPointValue(X.format)
					}
				}
				cf.label = new bJ(ca, ad({
					id: bU(),
					align: L,
					vAlign: L,
					margin: {
						left: 5,
						right: 5
					}
				}, X, {
					format: ""
				}));
				cf.append(cf.label)
			}
		},
		markerBox: function() {
			return this.marker.box
		},
		reflow: function(cd) {
			var cc = this,
				cb = cc.options,
				ca = cb.isVertical,
				X = cb.aboveAxis,
				Y;
			cc.render();
			cc.box = cd;
			Y = cd.clone();
			if (ca) {
				if (X) {
					Y.y1 -= Y.height()
				} else {
					Y.y2 += Y.height()
				}
			} else {
				if (X) {
					Y.x1 += Y.width()
				} else {
					Y.x2 -= Y.width()
				}
			}
			cc.marker.reflow(Y);
			cc.reflowLabel(Y)
		},
		reflowLabel: function(X) {
			var cd = this,
				cc = cd.options,
				cb = cd.marker,
				ca = cd.label,
				Y = cc.labels.position;
			if (ca) {
				Y = Y === c ? bP : Y;
				Y = Y === z ? B : Y;
				ca.reflow(X);
				ca.box.alignTo(cb.box, Y);
				ca.reflow(ca.box)
			}
		},
		getViewElements: function(cb) {
			var X = this,
				ca = X.marker,
				Y = X.label;
			X.registerId(ca.options.id);
			if (Y) {
				X.registerId(Y.options.id)
			}
			return O.fn.getViewElements.call(X, cb)
		},
		getOutlineElement: function(cc, ca) {
			var X = this,
				Y = X.marker,
				cb = X.marker.options.id + a7;
			X.registerId(cb);
			ca = ad({}, ca, {
				id: cb
			});
			return Y.getViewElements(cc, ad(ca, {
				fill: Y.options.border.color,
				fillOpacity: 1,
				strokeOpacity: 0
			}))[0]
		},
		tooltipAnchor: function(cc, cb) {
			var ca = this,
				Y = ca.marker.box,
				X = ca.options.aboveAxis;
			return new bi(Y.x2 + bN, X ? Y.y1 - cb : Y.y2)
		},
		formatPointValue: function(X) {
			var Y = this;
			return Y.owner.formatPointValue(Y.value, X)
		}
	});
	var aU = {
		splitSegments: function(ck) {
			var X = this,
				cd = X.options,
				cg = cd.series,
				cj = X.seriesPoints,
				Y, ci, ch = cj.length,
				ca, cb, ce, cf, cc = [];
			for (ci = 0; ci < ch; ci++) {
				ca = cj[ci];
				cf = ca.length;
				Y = cg[ci];
				cb = [];
				for (pointIx = 0; pointIx < cf; pointIx++) {
					ce = ca[pointIx];
					if (ce) {
						pointCenter = ce.markerBox().center();
						cb.push(new bi(pointCenter.x, pointCenter.y))
					} else {
						if (Y.missingValues !== aK) {
							if (cb.length > 1) {
								cc.push(X.createSegment(bU(), ck, cb, Y, ci))
							}
							cb = []
						}
					}
				}
				if (cb.length > 1) {
					cc.push(X.createSegment(bU(), ck, cb, Y, ci))
				}
			}
			return cc
		},
		createSegment: function(X, cc, Y, ca, cb) {
			this.registerId(X, {
				seriesIx: cb
			});
			return cc.createPolyline(Y, false, {
				id: X,
				stroke: ca.color,
				strokeWidth: ca.width,
				strokeOpacity: ca.opacity,
				fill: "",
				dashType: ca.dashType
			})
		},
		getNearestPoint: function(cl, cm, ck) {
			var Y = this,
				cc = Y.options.invertAxes,
				X = cc ? b7 : b4,
				cj = cc ? cm : cl,
				ch = Y.seriesPoints[ck],
				ce = aY,
				ci = ch.length,
				ca, cf, cg, cd, cb;
			for (cb = 0; cb < ci; cb++) {
				ca = ch[cb];
				if (ca && aj(ca.value) && ca.value !== null) {
					cf = ca.box;
					cg = aX.abs(cf.center()[X] - cj);
					if (cg < ce) {
						cd = ca;
						ce = cg
					}
				}
			}
			return cd
		}
	};
	var aT = G.extend({
		init: function(ca, Y) {
			var X = this;
			X._stackAxisRange = {
				min: aY,
				max: a0
			};
			X._categoryTotals = [];
			G.fn.init.call(X, ca, Y)
		},
		render: function() {
			var X = this;
			G.fn.render.apply(X);
			X.computeAxisRanges()
		},
		createPoint: function(cj, X, Y, cg, ch) {
			var cb = this,
				cd = cb.options,
				cc = cd.isStacked,
				ca = cb.categoryPoints[Y],
				ci, ce = 0;
			if (!aj(cj) || cj === null) {
				if (cc || cg.missingValues === b8) {
					cj = 0
				} else {
					return null
				}
			}
			var cf = new aV(cj, ad({
				isVertical: !cd.invertAxes,
				markers: {
					border: {
						color: cg.color
					}
				}
			}, cg));
			if (cc) {
				ci = aN(ca);
				if (ci) {
					ce = ci.plotValue
				}
				cf.plotValue = cj + ce
			}
			cb.append(cf);
			return cf
		},
		updateRange: function(ce, X, cb) {
			var Y = this,
				ca = Y.options.isStacked,
				cc = Y._stackAxisRange,
				cd = Y._categoryTotals;
			if (aj(ce)) {
				if (ca) {
					aG(cd, X, ce);
					cc.min = aX.min(cc.min, bB(cd));
					cc.max = aX.max(cc.max, bA(cd))
				} else {
					G.fn.updateRange.apply(Y, arguments)
				}
			}
		},
		computeAxisRanges: function() {
			var Y = this,
				ca = Y.options.isStacked,
				X, cb = Y._categoryTotals;
			if (ca) {
				X = Y.options.series[0].axis || bj;
				Y.valueAxisRanges[X] = Y._stackAxisRange
			}
		},
		getViewElements: function(cc) {
			var X = this,
				Y = G.fn.getViewElements.call(X, cc),
				ca = cc.createGroup({
					animation: {
						type: T
					}
				}),
				cb = X.splitSegments(cc);
			ca.children = cb.concat(Y);
			return [ca]
		}
	});
	ad(aT.fn, aU);
	var l = aT.extend({
		splitSegments: function(co) {
			var Y = this,
				cj = Y.options,
				cm = Y.plotArea,
				cd = Y.options.invertAxes,
				cl = aT.fn.splitSegments.call(Y, co),
				ch = [],
				X = cm.categoryAxis.lineBox(),
				ca = cd ? X.x1 : X.y1,
				ck, ci = cl.length,
				cn = 0,
				cg, cb, ce, cf, cc;
			for (cc = 0; cc < ci; cc++) {
				line = cl[cc].clone();
				cg = line.points;
				cf = line.options;
				cn = cf.seriesIx;
				if (cf.stack && cn != 0) {
					if (cn > 0) {
						ck = cl[cc - 1].clone().points.reverse();
						line.points = cg.concat(ck)
					}
				} else {
					if (cg.length > 1) {
						cb = cg[0];
						ce = aN(cg);
						if (cd) {
							cg.unshift(new bi(ca, cb.y));
							cg.push(new bi(ca, ce.y))
						} else {
							cg.unshift(new bi(cb.x, ca));
							cg.push(new bi(ce.x, ca))
						}
					}
				}
				ch.push(line)
			}
			return ch
		},
		createSegment: function(Y, cd, ca, cb, cc) {
			var X = ad({}, {
				color: cb.color,
				opacity: cb.opacity
			}, cb.line);
			this.registerId(Y, {
				seriesIx: cc
			});
			return cd.createPolyline(ca, true, {
				id: Y,
				stroke: X.color,
				strokeWidth: X.width,
				strokeOpacity: X.opacity,
				dashType: X.dashType,
				fillOpacity: cb.opacity,
				fill: cb.color,
				seriesIx: cc,
				stack: cb.stack
			})
		}
	});
	var bu = O.extend({
		init: function(ca, Y) {
			var X = this;
			O.fn.init.call(X, Y);
			X.plotArea = ca;
			X.xAxisRanges = {};
			X.yAxisRanges = {};
			X.points = [];
			X.seriesPoints = [];
			X.render()
		},
		options: {
			series: [],
			tooltip: {
				format: "{0}, {1}"
			},
			labels: {
				format: "{0}, {1}"
			}
		},
		render: function() {
			var X = this;
			X.traverseDataPoints(bk(X.addValue, X))
		},
		addValue: function(cd, Y) {
			var X = this,
				ca, cb = Y.seriesIx,
				cc = X.seriesPoints[cb];
			X.updateRange(cd, Y.series);
			if (!cc) {
				X.seriesPoints[cb] = cc = []
			}
			ca = X.createPoint(cd, Y.series, cb);
			if (ca) {
				ap(ca, Y)
			}
			X.points.push(ca);
			cc.push(ca)
		},
		updateRange: function(ca, Y) {
			var X = this,
				cb = ca.x,
				ce = ca.y,
				cc = Y.xAxis || bj,
				cf = Y.yAxis || bj,
				cd = X.xAxisRanges[cc],
				cg = X.yAxisRanges[cf];
			if (aj(cb)) {
				cd = X.xAxisRanges[cc] = cd || {
					min: aY,
					max: a0
				};
				cd.min = aX.min(cd.min, cb);
				cd.max = aX.max(cd.max, cb)
			}
			if (aj(ce)) {
				cg = X.yAxisRanges[cf] = cg || {
					min: aY,
					max: a0
				};
				cg.min = aX.min(cg.min, ce);
				cg.max = aX.max(cg.max, ce)
			}
		},
		createPoint: function(cc, ca, cb) {
			var X = this,
				Y;
			if (!aj(cc.x) || !aj(cc.y)) {
				return null
			}
			Y = new aV(cc, ad({
				markers: {
					border: {
						color: ca.color
					},
					opacity: ca.opacity
				},
				tooltip: {
					format: X.options.tooltip.format
				},
				labels: {
					format: X.options.labels.format
				}
			}, ca));
			X.append(Y);
			return Y
		},
		seriesAxes: function(Y) {
			var X = this.plotArea,
				ca = Y.xAxis || bj,
				cb = Y.yAxis || bj;
			return {
				x: X.namedXAxes[ca],
				y: X.namedYAxes[cb]
			}
		},
		reflow: function(ce) {
			var X = this,
				ca = X.plotArea,
				Y = X.points,
				cc = 0,
				cb, cd;
			X.traverseDataPoints(function(cj, cf) {
				cb = Y[cc++];
				cd = X.seriesAxes(cf.series);
				var ch = cd.x.getSlot(cj.x, cj.x),
					ci = cd.y.getSlot(cj.y, cj.y),
					cg = new C(ch.x1, ci.y1, ch.x2, ci.y2);
				if (cb) {
					cb.reflow(cg)
				}
			});
			X.box = ce
		},
		getViewElements: function(cb) {
			var X = this,
				Y = O.fn.getViewElements.call(X, cb),
				ca = cb.createGroup({
					animation: {
						type: T
					}
				});
			ca.children = Y;
			return [ca]
		},
		traverseDataPoints: function(X) {
			var Y = this,
				cc = Y.options,
				cf = cc.series,
				ce = 0,
				cg, ca, cb, ch, cd;
			for (cg = 0; cg < cf.length; cg++) {
				ca = cf[cg];
				for (ce = 0; ce < ca.data.length; ce++) {
					cd = ca.data[ce] || [];
					cb = ca.dataItems;
					ch = {
						x: cd[0],
						y: cd[1]
					};
					X(ch, {
						pointIx: ce,
						series: ca,
						seriesIx: cg,
						dataItem: cb ? cb[ce] : ch,
						owner: Y
					})
				}
			}
		},
		formatPointValue: function(Y, X) {
			return av(X, Y.x, Y.y)
		}
	});
	var bv = bu.extend({
		getViewElements: function(cc) {
			var X = this,
				Y = bu.fn.getViewElements.call(X, cc),
				ca = cc.createGroup({
					animation: {
						type: T
					}
				}),
				cb = X.splitSegments(cc);
			ca.children = cb.concat(Y);
			return [ca]
		}
	});
	ad(bv.fn, aU);
	var bg = O.extend({
		init: function(cb, Y, X) {
			var ca = this;
			ca.value = cb;
			ca.sector = Y;
			O.fn.init.call(ca, X)
		},
		options: {
			color: b1,
			overlay: {
				gradient: br
			},
			border: {
				width: 0.5
			},
			labels: {
				visible: false,
				distance: 35,
				font: af,
				margin: ax(0.5),
				align: P,
				zIndex: 1,
				position: a9
			},
			animation: {
				type: ba
			},
			highlight: {
				visible: true,
				border: {
					width: 1
				}
			}
		},
		render: function() {
			var cc = this,
				cb = cc.options,
				X = cb.labels,
				ca = cc.value,
				Y;
			if (cc._rendered) {
				return
			} else {
				cc._rendered = true
			}
			if (X.template) {
				Y = y(X.template);
				ca = Y({
					dataItem: cc.dataItem,
					category: cc.category,
					value: cc.value,
					series: cc.series,
					percentage: cc.percentage
				})
			}
			if (X.visible) {
				cc.label = new bJ(ca, ad({}, X, {
					id: bU(),
					align: L,
					vAlign: "",
					animation: {
						type: at,
						delay: cc.categoryIx * bb
					}
				}));
				cc.append(cc.label);
				cc.registerId(cc.label.options.id)
			}
		},
		reflow: function(Y) {
			var X = this;
			X.render();
			X.box = Y;
			Y.clone();
			X.reflowLabel()
		},
		reflowLabel: function() {
			var ch = this,
				cg = ch.sector.clone(),
				cf = ch.options,
				Y = ch.label,
				cc = cf.labels,
				cb = cc.distance,
				ce, ci, X = cg.middle(),
				cd, ca;
			if (Y) {
				ca = Y.box.height();
				cd = Y.box.width();
				if (cc.position == L) {
					cg.r = aX.abs((cg.r - ca) / 2) + ca;
					ce = cg.point(X);
					Y.reflow(new C(ce.x, ce.y - ca / 2, ce.x, ce.y))
				} else {
					if (cc.position == aJ) {
						cg.r = cg.r - ca / 2;
						ce = cg.point(X);
						Y.reflow(new C(ce.x, ce.y - ca / 2, ce.x, ce.y))
					} else {
						ce = cg.clone().expand(cb).point(X);
						if (ce.x >= cg.c.x) {
							ci = ce.x + cd;
							Y.orientation = bn
						} else {
							ci = ce.x - cd;
							Y.orientation = aO
						}
						Y.reflow(new C(ci, ce.y - ca, ce.x, ce.y))
					}
				}
			}
		},
		getViewElements: function(cf) {
			var ce = this,
				cd = ce.sector,
				cb = ce.options,
				Y = cb.border || {},
				X = Y.width > 0 ? {
					stroke: Y.color,
					strokeWidth: Y.width,
					dashType: Y.dashType
				} : {},
				ca = [],
				cc = cb.overlay;
			if (cc) {
				cc = ad({}, cb.overlay, {
					r: cd.r,
					cx: cd.c.x,
					cy: cd.c.y
				})
			}
			if (ce.value !== 0) {
				ca.push(cf.createSector(cd, ad({
					id: cb.id,
					fill: cb.color,
					overlay: cc,
					fillOpacity: cb.opacity,
					strokeOpacity: cb.opacity,
					animation: ad(cb.animation, {
						delay: ce.categoryIx * bb
					})
				}, X)))
			}
			e(ca, O.fn.getViewElements.call(ce, cf));
			return ca
		},
		getOutlineElement: function(ce, cb) {
			var cd = this,
				ca = cd.options.highlight || {},
				X = ca.border || {},
				cc = cd.options.id + a7,
				Y;
			cd.registerId(cc);
			cb = ad({}, cb, {
				id: cc
			});
			if (cd.value !== 0) {
				Y = ce.createSector(cd.sector, ad({}, cb, {
					fill: ca.color,
					fillOpacity: ca.opacity,
					strokeOpacity: X.opacity,
					strokeWidth: X.width,
					stroke: X.color
				}))
			}
			return Y
		},
		tooltipAnchor: function(cd, cc) {
			var ce = cd / 2,
				X = cc / 2,
				Y = aX.sqrt((ce * ce) + (X * X)),
				ca = this.sector.clone().expand(Y + bN),
				cb = ca.point(ca.middle());
			return new bi(cb.x - ce, cb.y - X)
		},
		formatPointValue: function(X) {
			var Y = this;
			return Y.owner.formatPointValue(Y.value, X)
		}
	});
	var be = O.extend({
		init: function(ca, Y) {
			var X = this;
			O.fn.init.call(X, Y);
			X.plotArea = ca;
			X.segments = [];
			X.seriesPoints = [];
			X.render()
		},
		options: {
			startAngle: 90,
			padding: 60,
			connectors: {
				width: 1,
				color: "#939393",
				padding: 4
			}
		},
		render: function() {
			var X = this;
			X.traverseDataPoints(bk(X.addValue, X))
		},
		traverseDataPoints: function(ca) {
			var cb = this,
				cl = cb.options,
				cc = cb.plotArea.options.seriesColors || [],
				co = cl.startAngle,
				cd = cc.length,
				cm = cl.series,
				ci, cf, cg, ce, cn, X, ch, Y, cq, cj, cp, ck;
			for (cn = 0; cn < cm.length; cn++) {
				cg = cm[cn];
				ci = cg.dataItems;
				ch = cg.data;
				cp = cb.pointsTotal(ch);
				Y = 360 / cp;
				for (ck = 0; ck < ch.length; ck++) {
					ce = cb.pointData(cg, ck);
					cq = ce.value;
					X = bq(cq * Y, ah);
					cf = ce.category;
					cj = ch.length != 1 && !! ce.explode;
					cg.color = ce.color ? ce.color : cc[ck % cd];
					ca(cq, new bw(null, 0, co, X), {
						owner: cb,
						category: cf,
						categoryIx: ck,
						series: cg,
						seriesIx: cn,
						dataItem: ci ? ci[ck] : {
							value: ce
						},
						percentage: cq / cp,
						explode: cj,
						currentData: ce
					});
					co += X
				}
			}
		},
		addValue: function(cc, ca, Y) {
			var X = this,
				cb;
			cb = new bg(cc, ca, Y.series);
			cb.options.id = bU();
			ap(cb, Y);
			X.append(cb);
			X.segments.push(cb)
		},
		pointValue: function(X) {
			return aj(X.value) ? X.value : X
		},
		pointData: function(cb, ca) {
			var X = this,
				Y = cb.data[ca];
			return {
				value: X.pointValue(Y),
				category: X.pointGetter(cb, ca, "category"),
				color: X.pointGetter(cb, ca, "color"),
				explode: X.pointGetter(cb, ca, "explode")
			}
		},
		pointGetter: function(cb, Y, ca) {
			var cd = cb[ca + "Field"],
				X = cb.data[Y],
				cc = X[ca];
			if (cd && cb.dataItems) {
				return ay(cd, true)(cb.dataItems[Y])
			} else {
				return aj(cc) ? cc : ""
			}
		},
		pointsTotal: function(Y) {
			var X = this,
				cb = Y.length,
				cc = 0,
				ca;
			for (ca = 0; ca < cb; ca++) {
				cc += X.pointValue(Y[ca])
			}
			return cc
		},
		reflow: function(cp) {
			var ca = this,
				ci = ca.options,
				X = cp.clone(),
				cf = aX.min(X.width(), X.height()),
				co = 5,
				cj = ci.padding > cf / 2 - co ? cf / 2 - co : ci.padding,
				cg = new C(X.x1, X.y1, X.x1 + cf, X.y1 + cf),
				ch = cg.center(),
				Y = X.center(),
				cn = ca.segments,
				cb = cn.length,
				ce = [],
				ck = [],
				cd, cm, cl, cc;
			cg.translate(Y.x - ch.x, Y.y - ch.y);
			for (cc = 0; cc < cb; cc++) {
				cm = cn[cc];
				cl = cm.sector;
				cl.r = cf / 2 - cj;
				cl.c = new bi(cl.r + cg.x1 + cj, cl.r + cg.y1 + cj);
				if (cm.explode) {
					cl.c = cl.clone().radius(cl.r * 0.15).point(cl.middle())
				}
				cm.reflow(cg);
				cd = cm.label;
				if (cd) {
					if (cd.options.position === a9) {
						if (cd.orientation === bn) {
							ck.push(cd)
						} else {
							ce.push(cd)
						}
					}
				}
			}
			if (ce.length > 0) {
				ce.sort(ca.labelComparator(true));
				ca.leftLabelsReflow(ce)
			}
			if (ck.length > 0) {
				ck.sort(ca.labelComparator(false));
				ca.rightLabelsReflow(ck)
			}
			ca.box = cg
		},
		leftLabelsReflow: function(ca) {
			var X = this,
				Y = X.distanceBetweenLabels(ca);
			X.distributeLabels(Y, ca)
		},
		rightLabelsReflow: function(ca) {
			var X = this,
				Y = X.distanceBetweenLabels(ca);
			X.distributeLabels(Y, ca)
		},
		distanceBetweenLabels: function(ce) {
			var X = this,
				ci = X.segments[0],
				ch = ci.sector,
				cc = ce[0].box,
				cg, Y = ce.length - 1,
				cb = [],
				ca, cf = ch.r + ci.options.labels.distance,
				cd;
			ca = bq(cc.y1 - (ch.c.y - cf - cc.height() - cc.height() / 2));
			cb.push(ca);
			for (cd = 0; cd < Y; cd++) {
				cc = ce[cd].box;
				cg = ce[cd + 1].box;
				ca = bq(cg.y1 - cc.y2);
				cb.push(ca)
			}
			ca = bq(ch.c.y + cf - ce[Y].box.y2 - ce[Y].box.height() / 2);
			cb.push(ca);
			return cb
		},
		distributeLabels: function(ca, cc) {
			var X = this,
				Y = ca.length,
				ce, cd, cf, cb;
			for (cb = 0; cb < Y; cb++) {
				cd = cf = cb;
				ce = -ca[cb];
				while (ce > 0 && (cd >= 0 || cf < Y)) {
					ce = X._takeDistance(ca, cb, --cd, ce);
					ce = X._takeDistance(ca, cb, ++cf, ce)
				}
			}
			X.reflowLabels(ca, cc)
		},
		_takeDistance: function(cb, Y, cc, X) {
			if (cb[cc] > 0) {
				var ca = aX.min(cb[cc], X);
				X -= ca;
				cb[cc] -= ca;
				cb[Y] += ca
			}
			return X
		},
		reflowLabels: function(cc, ch) {
			var cb = this,
				cl = cb.segments,
				ck = cl[0],
				cj = ck.sector,
				ci = ch.length,
				cg = ck.options.labels,
				cf = cg.distance,
				ca = cj.c.y - (cj.r + cf) - ch[0].box.height(),
				ce, Y, X, cd;
			cc[0] += 2;
			for (cd = 0; cd < ci; cd++) {
				ce = ch[cd];
				ca += cc[cd];
				X = ce.box;
				Y = cb.hAlignLabel(X.x2, cj.clone().expand(cf), ca, ca + X.height(), ce.orientation == bn);
				if (ce.orientation == bn) {
					if (cg.align !== P) {
						Y = cj.r + cj.c.x + cf
					}
					ce.reflow(new C(Y + X.width(), ca, Y, ca))
				} else {
					if (cg.align !== P) {
						Y = cj.c.x - cj.r - cf
					}
					ce.reflow(new C(Y - X.width(), ca, Y, ca))
				}
				ca += X.height()
			}
		},
		getViewElements: function(cu) {
			var cb = this,
				cl = cb.options,
				cd = cl.connectors,
				cp = cb.segments,
				cc, cn, ce = cp.length,
				cr = 4,
				X, cj = [],
				cm, co, cq, ci, ch;
			for (ch = 0; ch < ce; ch++) {
				co = cp[ch];
				cn = co.sector;
				X = cn.middle();
				ci = co.label;
				cq = {
					seriesId: co.seriesIx
				};
				if (ci) {
					cm = [];
					if (ci.options.position === a9 && co.value !== 0) {
						var Y = ci.box,
							ca = cn.c,
							ct = cn.point(X),
							ck = new bi(Y.x1, Y.center().y),
							cs, cg, cf;
						ct = cn.clone().expand(cd.padding).point(X);
						cm.push(ct);
						if (ci.orientation == bn) {
							cg = new bi(Y.x1 - cd.padding, Y.center().y);
							cf = aM(ca, ct, ck, cg);
							ck = new bi(cg.x - cr, cg.y);
							cf = cf || ck;
							cf.x = aX.min(cf.x, ck.x);
							if (cb.pointInCircle(cf, cn.c, cn.r + cr) || cf.x < cn.c.x) {
								cs = cn.c.x + cn.r + cr;
								if (co.options.labels.align !== W) {
									if (cs < ck.x) {
										cm.push(new bi(cs, ct.y))
									} else {
										cm.push(new bi(ct.x + cr * 2, ct.y))
									}
								} else {
									cm.push(new bi(cs, ct.y))
								}
								cm.push(new bi(ck.x, cg.y))
							} else {
								cf.y = cg.y;
								cm.push(cf)
							}
						} else {
							cg = new bi(Y.x2 + cd.padding, Y.center().y);
							cf = aM(ca, ct, ck, cg);
							ck = new bi(cg.x + cr, cg.y);
							cf = cf || ck;
							cf.x = aX.max(cf.x, ck.x);
							if (cb.pointInCircle(cf, cn.c, cn.r + cr) || cf.x > cn.c.x) {
								cs = cn.c.x - cn.r - cr;
								if (co.options.labels.align !== W) {
									if (cs > ck.x) {
										cm.push(new bi(cs, ct.y))
									} else {
										cm.push(new bi(ct.x - cr * 2, ct.y))
									}
								} else {
									cm.push(new bi(cs, ct.y))
								}
								cm.push(new bi(ck.x, cg.y))
							} else {
								cf.y = cg.y;
								cm.push(cf)
							}
						}
						cm.push(cg);
						cc = cu.createPolyline(cm, false, {
							id: bU(),
							stroke: cd.color,
							strokeWidth: cd.width,
							animation: {
								type: at,
								delay: co.categoryIx * bb
							}
						});
						cj.push(cc);
						co.registerId(cc.options.id, cq)
					}
					co.registerId(ci.options.id, cq)
				}
				co.registerId(co.options.id, cq)
			}
			e(cj, O.fn.getViewElements.call(cb, cu));
			return cj
		},
		labelComparator: function(X) {
			X = (X) ? -1 : 1;
			return function(Y, ca) {
				Y = (Y.parent.sector.middle() + 270) % 360;
				ca = (ca.parent.sector.middle() + 270) % 360;
				return (Y - ca) * X
			}
		},
		hAlignLabel: function(cb, cd, cf, cg, ca) {
			var X = cd.c.x,
				Y = cd.c.y,
				cc = cd.r,
				ce = aX.min(aX.abs(Y - cf), aX.abs(Y - cg));
			if (ce > cc) {
				return cb
			} else {
				return X + aX.sqrt((cc * cc) - (ce * ce)) * (ca ? 1 : -1)
			}
		},
		pointInCircle: function(Y, X, ca) {
			return bC(X.x - Y.x) + bC(X.y - Y.y) < bC(ca)
		},
		formatPointValue: function(Y, X) {
			return av(X, Y)
		}
	});
	var bh = O.extend({
		init: function(ca, X) {
			var Y = this;
			O.fn.init.call(Y, X);
			Y.series = ca;
			Y.charts = [];
			Y.options.legend.items = [];
			Y.axes = [];
			Y.render()
		},
		options: {
			series: [],
			plotArea: {
				margin: {}
			},
			background: "",
			border: {
				color: A,
				width: 0
			},
			legend: {}
		},
		appendChart: function(X) {
			var Y = this;
			Y.charts.push(X);
			Y.addToLegend(X);
			Y.append(X)
		},
		addToLegend: function(X) {
			var cc = X.options.series,
				Y = cc.length,
				ca = [],
				cb;
			for (cb = 0; cb < Y; cb++) {
				ca.push({
					name: cc[cb].name || "",
					color: cc[cb].color
				})
			}
			e(this.options.legend.items, ca)
		},
		reflow: function(cb) {
			var ca = this,
				Y = ca.options.plotArea,
				X = ax(Y.margin);
			ca.box = cb.clone();
			ca.box.unpad(X);
			if (ca.axes.length > 0) {
				ca.reflowAxes();
				ca.box = ca.axisBox()
			}
			ca.reflowCharts()
		},
		axisCrossingValues: function(X, Y) {
			var cd = X.options,
				ca = [].concat(cd.axisCrossingValue),
				ce = Y.length - ca.length,
				cb = ca[0] || 0,
				cc;
			for (cc = 0; cc < ce; cc++) {
				ca.push(cb)
			}
			return ca
		},
		alignAxisTo: function(X, cb, Y, cc) {
			var ca = X.getSlot(Y, Y),
				cd = cb.getSlot(cc, cc);
			X.reflow(X.box.translate(cd.x1 - ca.x1, cd.y1 - ca.y1))
		},
		alignAxes: function(ci, cl) {
			var cd = this,
				cg = ci[0],
				cj = cl[0],
				ch = cd.axisCrossingValues(cg, cl),
				ck = cd.axisCrossingValues(cj, ci),
				cc, ce, cf, ca, X, Y, cb;
			for (cb = 0; cb < cl.length; cb++) {
				X = cl[cb];
				cd.alignAxisTo(X, cg, ck[cb], ch[cb]);
				if (X.lineBox().x1 === cg.lineBox().x1) {
					if (cc) {
						X.reflow(X.box.alignTo(cc.box, aO).translate(-X.options.margin, 0))
					}
					cc = X
				}
				if (X.lineBox().x2 === cg.lineBox().x2) {
					if (!X._mirrored) {
						X.options.labels.mirror = !X.options.labels.mirror;
						X._mirrored = true
					}
					cd.alignAxisTo(X, cg, ck[cb], ch[cb]);
					if (ce) {
						X.reflow(X.box.alignTo(ce.box, bn).translate(X.options.margin, 0))
					}
					ce = X
				}
			}
			for (cb = 0; cb < ci.length; cb++) {
				X = ci[cb];
				cd.alignAxisTo(X, cj, ch[cb], ck[cb]);
				if (X.lineBox().y1 === cj.lineBox().y1) {
					if (!X._mirrored) {
						X.options.labels.mirror = !X.options.labels.mirror;
						X._mirrored = true
					}
					cd.alignAxisTo(X, cj, ch[cb], ck[cb]);
					if (cf) {
						X.reflow(X.box.alignTo(cf.box, bP).translate(0, -X.options.margin))
					}
					cf = X
				}
				if (X.lineBox().y2 === cj.lineBox().y2) {
					if (ca) {
						X.reflow(X.box.alignTo(ca.box, B).translate(0, X.options.margin))
					}
					ca = X
				}
			}
		},
		axisBox: function() {
			var cc = this,
				X = cc.axes,
				Y = X[0].box.clone(),
				ca, cb = X.length;
			for (ca = 1; ca < cb; ca++) {
				Y.wrap(X[ca].box)
			}
			return Y
		},
		shrinkAxes: function() {
			var ch = this,
				ca = ch.box,
				Y = ch.axisBox(),
				cg = Y.height() - ca.height(),
				cf = Y.width() - ca.width(),
				X = ch.axes,
				cb, cd, cc, ce = X.length;
			for (cc = 0; cc < ce; cc++) {
				cb = X[cc];
				cd = cb.options.isVertical;
				cb.reflow(cb.box.shrink(cd ? 0 : cf, cd ? cg : 0))
			}
		},
		shrinkAdditionalAxes: function(cj, cl) {
			var ch = this,
				Y = ch.axes,
				ci = cj[0],
				ck = cl[0],
				X = ci.lineBox().clone().wrap(ck.lineBox()),
				cf, cg, ca, cc, ce, cb, cd = Y.length;
			for (cb = 0; cb < cd; cb++) {
				ca = Y[cb];
				cc = ca.options.isVertical;
				ce = ca.lineBox();
				cf = aX.max(0, ce.x2 - X.x2) + aX.max(0, X.x1 - ce.x1);
				cg = aX.max(0, ce.y2 - X.y2) + aX.max(0, X.y1 - ce.y1);
				ca.reflow(ca.box.shrink(cc ? 0 : cf, cc ? cg : 0))
			}
		},
		fitAxes: function() {
			var cg = this,
				X = cg.axes,
				ca = cg.box,
				Y = cg.axisBox(),
				ce = ca.x1 - Y.x1,
				cf = ca.y1 - Y.y1,
				cb, cc, cd = X.length;
			for (cc = 0; cc < cd; cc++) {
				cb = X[cc];
				cb.reflow(cb.box.translate(ce, cf))
			}
		},
		reflowAxes: function() {
			var cb = this,
				X = cb.axes,
				cc = aA(X, (function(ce) {
					return !ce.options.isVertical
				})),
				cd = aA(X, (function(ce) {
					return ce.options.isVertical
				})),
				Y, ca = X.length;
			for (Y = 0; Y < ca; Y++) {
				X[Y].reflow(cb.box)
			}
			cb.alignAxes(cc, cd);
			cb.shrinkAdditionalAxes(cc, cd);
			cb.alignAxes(cc, cd);
			cb.shrinkAxes();
			cb.alignAxes(cc, cd);
			cb.fitAxes()
		},
		reflowCharts: function() {
			var cc = this,
				Y = cc.charts,
				ca = Y.length,
				X = cc.box,
				cb;
			for (cb = 0; cb < ca; cb++) {
				Y[cb].reflow(X)
			}
			cc.box = X
		},
		renderGridLines: function(ck, X, cj) {
			var ch = X.options,
				cc = ch.isVertical,
				Y = X.getSlot(ch.axisCrossingValue),
				ci = bq(Y[cc ? "y1" : "x1"]),
				cd = cj.lineBox(),
				cf = cd[cc ? "x1" : "y1"],
				ce = cd[cc ? "x2" : "y2"],
				cg = X.getMajorTickPositions(),
				cb = [],
				ca = function(cm, cl) {
					return {
						pos: cm,
						options: cl
					}
				};
			if (ch.majorGridLines.visible) {
				cb = aW(cg, function(cl) {
					return ca(cl, ch.majorGridLines)
				})
			}
			if (ch.minorGridLines.visible) {
				cb = cb.concat(aW(X.getMinorTickPositions(), function(cl) {
					if (ch.majorGridLines.visible) {
						if (!aF(cl, cg)) {
							return ca(cl, ch.minorGridLines)
						}
					} else {
						return ca(cl, ch.minorGridLines)
					}
				}))
			}
			return aW(cb, function(cm) {
				var cl = {
					strokeWidth: cm.options.width,
					stroke: cm.options.color,
					dashType: cm.options.dashType
				},
					cn = bq(cm.pos);
				if (ci === cn) {
					return null
				}
				if (cc) {
					return ck.createLine(cf, cn, ce, cn, cl)
				} else {
					return ck.createLine(cn, cf, cn, ce, cl)
				}
			})
		},
		getViewElements: function(ch) {
			var cg = this,
				cf = cg.options.plotArea,
				Y = cg.axisY,
				X = cg.axisX,
				ce = Y ? cg.renderGridLines(ch, Y, X) : [],
				cd = X ? cg.renderGridLines(ch, X, Y) : [],
				cb = O.fn.getViewElements.call(cg, ch),
				ca = cf.border || {},
				cc = [ch.createRect(cg.box, {
					fill: cf.background,
					zIndex: -1
				}), ch.createRect(cg.box, {
					stroke: ca.width ? ca.color : "",
					strokeWidth: ca.width,
					fill: "",
					zIndex: 0,
					dashType: ca.dashType
				})];
			return [].concat(ce, cd, cb, cc)
		}
	});
	var H = bh.extend({
		init: function(cb, Y) {
			var ca = this,
				X = ad({}, ca.options, Y);
			ca.namedValueAxes = {};
			ca.valueAxisRangeTracker = new n(X.valueAxis);
			if (cb.length > 0) {
				ca.invertAxes = aF(cb[0].type, [p, bY, bX])
			}
			bh.fn.init.call(ca, cb, Y)
		},
		options: {
			categoryAxis: {
				categories: []
			},
			valueAxis: {}
		},
		render: function() {
			var X = this,
				Y = X.series;
			X.createBarChart(aA(Y, function(ca) {
				return aF(ca.type, [p, W])
			}));
			X.createLineChart(aA(Y, function(ca) {
				return aF(ca.type, [aQ, bY])
			}));
			X.createAreaChart(aA(Y, function(ca) {
				return aF(ca.type, [k, bX])
			}));
			X.createAxes()
		},
		appendChart: function(ca) {
			var cc = this,
				cb = cc.options,
				cd = ca.options.series,
				X = cb.categoryAxis.categories,
				Y = aX.max(0, I(cd) - X.length);
			e(X, new Array(Y));
			cc.valueAxisRangeTracker.update(ca.valueAxisRanges);
			bh.fn.appendChart.call(cc, ca)
		},
		createBarChart: function(cc) {
			if (cc.length === 0) {
				return
			}
			var cb = this,
				ca = cb.options,
				Y = cc[0],
				X = new v(cb, {
					series: cc,
					invertAxes: cb.invertAxes,
					isStacked: Y.stack,
					gap: Y.gap,
					spacing: Y.spacing
				});
			cb.appendChart(X)
		},
		createLineChart: function(cc) {
			if (cc.length === 0) {
				return
			}
			var cb = this,
				ca = cb.options,
				X = cc[0],
				Y = new aT(cb, {
					invertAxes: cb.invertAxes,
					isStacked: X.stack,
					series: cc
				});
			cb.appendChart(Y)
		},
		createAreaChart: function(cc) {
			if (cc.length === 0) {
				return
			}
			var cb = this,
				ca = cb.options,
				Y = cc[0],
				X = new l(cb, {
					invertAxes: cb.invertAxes,
					isStacked: Y.stack,
					series: cc
				});
			cb.appendChart(X)
		},
		createAxes: function() {
			var cf = this,
				ce = cf.options,
				ch, cc = cf.invertAxes,
				ca = ce.categoryAxis.categories.length,
				cb = new J(ad({
					isVertical: cc,
					axisCrossingValue: cc ? ca : 0
				}, ce.categoryAxis)),
				X, Y, cd = cf.namedValueAxes,
				ci = [].concat(ce.valueAxis),
				cg;
			am(ci, function() {
				Y = this.name || bj;
				ch = cf.valueAxisRangeTracker.query(Y);
				X = cd[Y] = new a4(ch.min, ch.max, ad({
					isVertical: !cc
				}, this));
				cf.axes.push(X);
				cf.append(X)
			});
			cg = cd[bj] || cf.axes[0];
			cf.axisX = cc ? cg : cb;
			cf.axisY = cc ? cb : cg;
			cf.categoryAxis = cb;
			cf.axes.push(cb);
			cf.append(cf.categoryAxis)
		}
	});
	var n = Q.extend({
		init: function(X) {
			var Y = this;
			Y.axisRanges = {}, Y.axisOptions = [].concat(X), Y.defaultRange = {
				min: 0,
				max: 1
			}
		},
		update: function(cc) {
			var ch = this,
				cb = ch.axisRanges,
				ca = ch.axisOptions,
				cg, cd, ce, X, Y, cf = ca.length;
			if (!cc) {
				return
			}
			for (ce = 0; ce < cf; ce++) {
				X = ca[ce];
				Y = X.name || bj;
				cg = cb[Y];
				cd = cc[Y];
				if (cd) {
					cb[Y] = cg = cg || {
						min: aY,
						max: a0
					};
					cg.min = aX.min(cg.min, cd.min);
					cg.max = aX.max(cg.max, cd.max)
				}
			}
		},
		query: function(X) {
			var Y = this;
			return Y.axisRanges[X] || ad({}, Y.defaultRange)
		}
	});
	var b6 = bh.extend({
		init: function(cb, Y) {
			var ca = this,
				X = ad({}, ca.options, Y);
			ca.namedXAxes = {};
			ca.namedYAxes = {};
			ca.xAxisRangeTracker = new n(X.xAxis);
			ca.yAxisRangeTracker = new n(X.yAxis);
			bh.fn.init.call(ca, cb, Y)
		},
		options: {
			xAxis: {},
			yAxis: {}
		},
		render: function() {
			var X = this,
				Y = X.series;
			X.createScatterChart(aA(Y, function(ca) {
				return ca.type === bs
			}));
			X.createScatterLineChart(aA(Y, function(ca) {
				return ca.type === bt
			}));
			X.createAxes()
		},
		appendChart: function(X) {
			var Y = this;
			Y.xAxisRangeTracker.update(X.xAxisRanges);
			Y.yAxisRangeTracker.update(X.yAxisRanges);
			bh.fn.appendChart.call(Y, X)
		},
		createScatterChart: function(Y) {
			var X = this;
			if (Y.length > 0) {
				X.appendChart(new bu(X, {
					series: Y
				}))
			}
		},
		createScatterLineChart: function(Y) {
			var X = this;
			if (Y.length > 0) {
				X.appendChart(new bv(X, {
					series: Y
				}))
			}
		},
		createXYAxis: function(cd, cb) {
			var ce = this,
				Y = cd.name || bj,
				cc = cb ? ce.namedYAxes : ce.namedXAxes,
				ca = cb ? ce.yAxisRanges : ce.xAxisRanges,
				cg = cb ? ce.yAxisRangeTracker : ce.xAxisRangeTracker,
				cf = cg.query(Y),
				cd = ad({}, cd, {
					isVertical: cb
				}),
				X = new a4(cf.min, cf.max, cd);
			cc[Y] = X;
			ce.append(X);
			ce.axes.push(X)
		},
		createAxes: function() {
			var Y = this,
				X = Y.options,
				ca = [].concat(X.xAxis),
				cb = [].concat(X.yAxis);
			am(ca, function() {
				Y.createXYAxis(this, false)
			});
			am(cb, function() {
				Y.createXYAxis(this, true)
			});
			Y.axisX = Y.namedXAxes.primary || Y.namedXAxes[ca[0].name];
			Y.axisY = Y.namedYAxes.primary || Y.namedYAxes[cb[0].name]
		}
	});
	var bf = bh.extend({
		render: function() {
			var X = this,
				Y = X.series;
			X.createPieChart(Y)
		},
		createPieChart: function(cb) {
			var ca = this,
				X = cb[0],
				Y = new be(ca, {
					series: cb,
					padding: X.padding,
					startAngle: X.startAngle,
					connectors: X.connectors
				});
			ca.appendChart(Y)
		},
		addToLegend: function(X) {
			var cc = this,
				cb = cc.options,
				cd = X.segments,
				Y = cd.length,
				ca;
			for (ca = 0; ca < Y; ca++) {
				cb.legend.items.push({
					name: cd[ca].category,
					color: cd[ca].options.color
				})
			}
		}
	});
	var b0 = Q.extend({
		init: function(Y) {
			var X = this;
			X.children = [];
			X.options = ad({}, X.options, Y)
		},
		render: function() {
			return this.template(this)
		},
		renderContent: function() {
			var Y = this,
				cb = "",
				cc = Y.sortChildren(),
				X = cc.length,
				ca;
			for (ca = 0; ca < X; ca++) {
				cb += cc[ca].render()
			}
			return cb
		},
		sortChildren: function() {
			var Y = this,
				X = Y.children,
				cb, ca;
			for (ca = 0, cb = X.length; ca < cb; ca++) {
				X[ca]._childIndex = ca
			}
			return X.slice(0).sort(Y.compareChildren)
		},
		compareChildren: function(X, ca) {
			var Y = X.options.zIndex || 0,
				cb = ca.options.zIndex || 0;
			if (Y !== cb) {
				return Y - cb
			}
			return X._childIndex - ca._childIndex
		},
		renderAttr: function(X, Y) {
			return aj(Y) ? " " + X + "='" + Y + "' " : ""
		}
	});
	var bZ = b0.extend({
		init: function(X) {
			var Y = this;
			b0.fn.init.call(Y, X);
			Y.definitions = {};
			Y.decorators = [];
			Y.animations = []
		},
		renderDefinitions: function() {
			var cb = this,
				Y = cb.definitions,
				X, ca = "";
			for (X in Y) {
				if (Y.hasOwnProperty(X)) {
					ca += Y[X].render()
				}
			}
			return ca
		},
		decorate: function(ca) {
			var cd = this,
				Y = cd.decorators,
				cb, cc = Y.length,
				X;
			for (cb = 0; cb < cc; cb++) {
				X = Y[cb];
				cd._decorateChildren(X, ca);
				ca = X.decorate.call(X, ca)
			}
			return ca
		},
		_decorateChildren: function(Y, ca) {
			var cd = this,
				X = ca.children,
				cb, cc = X.length;
			for (cb = 0; cb < cc; cb++) {
				cd._decorateChildren(Y, X[cb]);
				X[cb] = Y.decorate.call(Y, X[cb])
			}
		},
		setupAnimations: function() {
			var X = this.animations,
				ca, Y = X.length;
			for (ca = 0; ca < Y; ca++) {
				X[ca].setup()
			}
		},
		playAnimations: function() {
			var Y = this,
				X;
			while (X = Y.animations.shift()) {
				X.play()
			}
		},
		buildGradient: function(cb) {
			var cd = this,
				X = cd._gradientCache,
				ca, cc, Y;
			if (!X) {
				X = cd._gradientCache = []
			}
			if (cb) {
				ca = aw(cb);
				cc = X[ca];
				Y = N.Gradients[cb.gradient];
				if (!cc && Y) {
					cc = ad({
						id: bU()
					}, Y, cb);
					X[ca] = cc
				}
			}
			return cc
		}
	});

	function bF() {
		return al.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
	}
	var u = Q.extend({
		init: function(X) {
			this.view = X
		},
		decorate: function(ca) {
			var Y = this,
				cb = Y.view,
				X = ca.options.animation;
			if (X && cb.options.transitions) {
				if (X.type === p) {
					cb.animations.push(new t(ca))
				}
			}
			return ca
		}
	});
	var bd = Q.extend({
		init: function(X) {
			this.view = X
		},
		decorate: function(ca) {
			var Y = this,
				cb = Y.view,
				X = ca.options.animation;
			if (X && X.type === ba && cb.options.transitions) {
				cb.animations.push(new bc(ca, X))
			}
			return ca
		}
	});
	var ar = Q.extend({
		init: function(X) {
			this.view = X
		},
		decorate: function(ca) {
			var Y = this,
				cc = Y.view,
				cb = cc.options,
				X = ca.options.animation;
			if (X && X.type === at && cb.transitions) {
				cc.animations.push(new aq(ca, X))
			}
			return ca
		}
	});
	var an = Q.extend({
		init: function(Y, ca) {
			var X = this;
			X.options = ad({}, X.options, ca);
			X.element = Y
		},
		options: {
			duration: aH,
			easing: bG
		},
		play: function() {
			var X = this,
				cg = X.options,
				ce = X.element,
				Y = cg.delay || 0,
				ci = +new Date() + Y,
				cb = cg.duration,
				cf = ci + cb,
				ca = al.getElementById(ce.options.id),
				cc = jQuery.easing[cg.easing],
				cj, ch, cd;
			setTimeout(function() {
				var ck = function() {
						cj = +new Date();
						ch = cj > cf ? 1 : (cj - ci) / cb;
						cd = cc(ch, cj - ci, 0, 1, cb);
						X.step(cd);
						ce.refresh(ca);
						if (cj < cf) {
							bm(ck, ca)
						}
					};
				ck()
			}, Y)
		},
		setup: function() {},
		step: function(X) {}
	});
	var aq = an.extend({
		options: {
			duration: 200,
			easing: aS
		},
		setup: function() {
			var X = this,
				Y = X.element.options;
			X.targetFillOpacity = Y.fillOpacity;
			X.targetStrokeOpacity = Y.strokeOpacity;
			Y.fillOpacity = Y.strokeOpacity = 0
		},
		step: function(ca) {
			var X = this,
				Y = X.element.options;
			Y.fillOpacity = ca * X.targetFillOpacity;
			Y.strokeOpacity = ca * X.targetStrokeOpacity
		}
	});
	var ao = an.extend({
		options: {
			size: 0,
			easing: aS
		},
		setup: function() {
			var X = this,
				Y = X.element.points;
			Y[1].x = Y[2].x = Y[0].x
		},
		step: function(cb) {
			var X = this,
				Y = X.options,
				cc = aL(0, Y.size, cb),
				ca = X.element.points;
			ca[1].x = ca[2].x = ca[0].x + cc
		}
	});
	var bm = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(X, Y) {
		setTimeout(X, d)
	};
	var t = an.extend({
		options: {
			easing: bG
		},
		setup: function() {
			var Y = this,
				cb = Y.element,
				ce = cb.points,
				cd = cb.options,
				ca = cd.normalAngle === 0 ? b7 : b4,
				cf = cd.stackBase,
				X = cd.aboveAxis,
				cg, cc = Y.endState = {
					top: ce[0].y,
					right: ce[1].x,
					bottom: ce[3].y,
					left: ce[0].x
				};
			if (ca === b7) {
				cg = aj(cf) ? cf : X ? cc.bottom : cc.top
			} else {
				cg = aj(cf) ? cf : X ? cc.left : cc.right
			}
			Y.startPosition = cg;
			bV(ce, ca, cg)
		},
		step: function(cc) {
			var X = this,
				cd = X.startPosition,
				ca = X.endState,
				Y = X.element,
				cb = Y.points;
			if (Y.options.normalAngle === 0) {
				cb[0].y = cb[1].y = aL(cd, ca.top, cc);
				cb[2].y = cb[3].y = aL(cd, ca.bottom, cc)
			} else {
				cb[0].x = cb[3].x = aL(cd, ca.left, cc);
				cb[1].x = cb[2].x = aL(cd, ca.right, cc)
			}
		}
	});
	var bc = an.extend({
		options: {
			easing: "easeOutElastic",
			duration: aH
		},
		setup: function() {
			var X = this,
				Y = X.element.circleSector;
			X.endRadius = Y.r;
			Y.r = 0
		},
		step: function(ca) {
			var X = this,
				Y = X.endRadius,
				cb = X.element.circleSector;
			cb.r = aL(0, Y, ca)
		}
	});
	var aC = Q.extend({
		init: function(ca, cb, Y) {
			var X = this;
			X.options = ad({}, X.options, Y);
			X.view = ca;
			X.viewElement = cb
		},
		options: {
			fill: b1,
			fillOpacity: 0.2,
			stroke: b1,
			strokeWidth: 1,
			strokeOpacity: 0.2
		},
		show: function(cb) {
			var Y = this,
				cc = Y.view,
				cd = Y.viewElement,
				ca, X;
			Y.hide();
			if (cb.getOutlineElement) {
				ca = cb.getOutlineElement(cc, Y.options);
				if (ca) {
					X = cc.renderElement(ca);
					cd.appendChild(X);
					Y.element = X;
					Y.visible = true
				}
			}
		},
		hide: function() {
			var Y = this,
				X = Y.element;
			if (X) {
				if (X.parentNode) {
					X.parentNode.removeChild(X)
				}
				delete Y.element;
				Y.visible = false
			}
		}
	});
	var bL = Q.extend({
		init: function(X, Y) {
			var ca = this;
			ca.options = ad({}, ca.options, Y);
			Y = ca.options;
			ca.chartElement = X;
			ca.chartPadding = {
				top: parseInt(X.css("paddingTop"), 10),
				left: parseInt(X.css("paddingLeft"), 10)
			};
			ca.template = bL.template;
			if (!ca.template) {
				ca.template = bL.template = bH("<div style='display:none; position: absolute; font: #= d.font #;border-radius: 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px;border: #= d.border.width #px solid;opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);padding: 2px 6px; white-space: nowrap; z-index: 1000;'></div>")
			}
			ca.element = a(ca.template(ca.options)).appendTo(X)
		},
		options: {
			background: A,
			color: b1,
			border: {
				width: 3
			},
			opacity: 1,
			animation: {
				duration: bM
			}
		},
		show: function(X) {
			var Y = this;
			Y.point = X;
			Y.showTimeout = setTimeout(bk(Y._show, Y), bO)
		},
		_show: function() {
			var cg = this,
				ce = cg.point,
				cb = cg.element,
				cd = cg.options,
				Y = cg.chartPadding,
				X, cf, ca, ch, ci, cc;
			if (!ce) {
				return
			}
			ca = ce.value.toString();
			ch = ad({}, cg.options, ce.options.tooltip);
			if (ch.template) {
				cf = y(ch.template);
				ca = cf({
					value: ce.value,
					category: ce.category,
					series: ce.series,
					dataItem: ce.dataItem,
					percentage: ce.percentage
				})
			} else {
				if (ch.format) {
					ca = ce.formatPointValue(ch.format)
				}
			}
			cb.html(ca);
			X = ce.tooltipAnchor(cb.outerWidth(), cb.outerHeight());
			ci = bq(X.y + Y.top) + "px";
			cc = bq(X.x + Y.left) + "px";
			if (!cg.visible) {
				cg.element.css({
					top: ci,
					left: cc
				})
			}
			cg.element.css({
				backgroundColor: ch.background,
				borderColor: ch.border.color || ce.options.color,
				color: ch.color,
				opacity: ch.opacity,
				borderWidth: ch.border.width
			}).stop(true, true).show().animate({
				left: cc,
				top: ci
			}, cd.animation.duration);
			cg.visible = true
		},
		hide: function() {
			var X = this;
			clearTimeout(X.showTimeout);
			if (X.visible) {
				X.element.fadeOut();
				X.point = null;
				X.visible = false
			}
		}
	});

	function K(Y, X) {
		return bq(aX.ceil(Y / X) * X, ah)
	}
	function au(Y, X) {
		return bq(aX.floor(Y / X) * X, ah)
	}
	function bq(ca, Y) {
		var X = aX.pow(10, Y || 0);
		return aX.round(ca * X) / X
	}
	function aZ(cn, ck, ci) {
		var cl = aw(ck),
			ca = cn + cl + ci,
			Y = aZ.cache[ca];
		if (Y) {
			return Y
		}
		var ce = aZ.measureBox,
			X = aZ.baselineMarker.cloneNode(false);
		if (!ce) {
			ce = aZ.measureBox = a("<div style='position: absolute; top: -4000px; left: -4000px;line-height: normal; visibility: hidden;' />").appendTo(al.body)[0]
		}
		for (var cm in ck) {
			ce.style[cm] = ck[cm]
		}
		ce.innerHTML = cn;
		ce.appendChild(X);
		var cj = {
			width: ce.offsetWidth - x,
			height: ce.offsetHeight,
			baseline: X.offsetTop + x
		};
		if (ci) {
			var co = cj.width,
				cd = cj.height,
				cb = co / 2,
				cc = cd / 2,
				cf = bp(0, 0, cb, cc, ci),
				cg = bp(co, 0, cb, cc, ci),
				ch = bp(co, cd, cb, cc, ci);
			r4 = bp(0, cd, cb, cc, ci);
			cj.normalWidth = co;
			cj.normalHeight = cd;
			cj.width = aX.max(cf.x, cg.x, ch.x, r4.x) - aX.min(cf.x, cg.x, ch.x, r4.x);
			cj.height = aX.max(cf.y, cg.y, ch.y, r4.y) - aX.min(cf.y, cg.y, ch.y, r4.y)
		}
		aZ.cache[ca] = cj;
		return cj
	}
	aZ.cache = {};
	aZ.baselineMarker = a("<div style='display: inline-block; vertical-align: baseline;width: " + x + "px; height: " + x + "px;zoom: 1; *display: inline; overflow: hidden;' />")[0];

	function aw(ca) {
		var X = [];
		for (var Y in ca) {
			X.push(Y + ca[Y])
		}
		return X.sort().join(" ")
	}
	function bp(cc, cd, Y, ca, X) {
		var cb = X * ak;
		return {
			x: Y + (cc - Y) * aX.cos(cb) + (cd - ca) * aX.sin(cb),
			y: ca - (cc - Y) * aX.sin(cb) + (cd - ca) * aX.cos(cb)
		}
	}
	function D(cg, ci) {
		if (cg.x1 == ci.x1 && cg.y1 == ci.y1 && cg.x2 == ci.x2 && cg.y2 == ci.y2) {
			return ci
		}
		var X = aX.min(cg.x1, ci.x1),
			Y = aX.max(cg.x1, ci.x1),
			ca = aX.min(cg.x2, ci.x2),
			cb = aX.max(cg.x2, ci.x2),
			cc = aX.min(cg.y1, ci.y1),
			cd = aX.max(cg.y1, ci.y1),
			ce = aX.min(cg.y2, ci.y2),
			cf = aX.max(cg.y2, ci.y2),
			ch = [];
		ch[0] = new C(Y, cc, ca, cd);
		ch[1] = new C(X, cd, Y, ce);
		ch[2] = new C(ca, cd, cb, ce);
		ch[3] = new C(Y, ce, ca, cf);
		if (cg.x1 == X && cg.y1 == cc || ci.x1 == X && ci.y1 == cc) {
			ch[4] = new C(X, cc, Y, cd);
			ch[5] = new C(ca, ce, cb, cf)
		} else {
			ch[4] = new C(ca, cc, cb, cd);
			ch[5] = new C(X, ce, Y, cf)
		}
		return a.grep(ch, function(cj) {
			return cj.height() > 0 && cj.width() > 0
		})[0]
	}
	function bB(X) {
		return bz(X).min
	}
	function bA(X) {
		return bz(X).max
	}
	function bz(X) {
		var cc = aY,
			cb = a0,
			Y, ca = X.length,
			cd;
		for (Y = 0; Y < ca; Y++) {
			cd = X[Y];
			if (aj(cd)) {
				cc = aX.min(cc, cd);
				cb = aX.max(cb, cd)
			}
		}
		return {
			min: cc,
			max: cb
		}
	}
	function ax(Y) {
		var X = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};
		if (typeof(Y) === "number") {
			X[bP] = X[bn] = X[B] = X[aO] = Y
		} else {
			X[bP] = Y[bP] || 0;
			X[bn] = Y[bn] || 0;
			X[B] = Y[B] || 0;
			X[aO] = Y[aO] || 0
		}
		return X
	}
	function aF(Y, X) {
		return a.inArray(Y, X) != -1
	}
	function aN(X) {
		return X[X.length - 1]
	}
	function ad(X) {
		var Y = 1,
			ca = arguments.length;
		for (Y = 1; Y < ca; Y++) {
			ae(X, arguments[Y])
		}
		return X
	}
	function ae(X, cd) {
		var ca, cc, cb, Y;
		for (ca in cd) {
			cc = cd[ca];
			cb = typeof cc;
			if (cb === a5 && cc !== null && cc.constructor !== Array) {
				Y = X[ca];
				if (typeof(Y) === a5) {
					X[ca] = Y || {}
				} else {
					X[ca] = {}
				}
				ae(X[ca], cc)
			} else {
				if (cb !== bT) {
					X[ca] = cc
				}
			}
		}
		return X
	}
	function aM(X, Y, ca, cb) {
		var cc, cf = (cb.x - ca.x) * (X.y - ca.y) - (cb.y - ca.y) * (X.x - ca.x),
			cd = (cb.y - ca.y) * (Y.x - X.x) - (cb.x - ca.x) * (Y.y - X.y),
			ce;
		if (cd != 0) {
			ce = (cf / cd);
			cc = new bi(X.x + ce * (Y.x - X.x), X.y + ce * (Y.y - X.y))
		}
		return cc
	}
	function e(X, Y) {
		[].push.apply(X, Y)
	}
	function aL(ca, X, Y) {
		return bq(ca + (X - ca) * Y, Z)
	}
	function j(cb, cg) {
		var cc = cb.series,
			ca, ce = cc.length,
			cf, cd = cb.seriesDefaults,
			X = ad({}, cb.seriesDefaults),
			ch = cg ? ad({}, cg.seriesDefaults) : {},
			Y = ad({}, ch);
		R(X);
		R(Y);
		for (ca = 0; ca < ce; ca++) {
			cf = cc[ca].type || cb.seriesDefaults.type;
			cc[ca] = ad({}, Y, ch[cf], {
				tooltip: cb.tooltip
			}, X, cd[cf], cc[ca])
		}
	}
	function R(X) {
		delete X.bar;
		delete X.column;
		delete X.line;
		delete X.verticalLine;
		delete X.pie;
		delete X.area;
		delete X.verticalArea;
		delete X.scatter;
		delete X.scatterLine
	}
	function h(ca) {
		var cb = ca.series,
			Y, cc = cb.length,
			X = ca.seriesColors || [];
		for (Y = 0; Y < cc; Y++) {
			cb[Y].color = cb[Y].color || X[Y % X.length]
		}
	}
	function f(X, ca) {
		var Y = ad({}, (ca || {}).axisDefaults);
		am(["category", "value", "x", "y"], function() {
			var cc = this + "Axis",
				cb = [].concat(X[cc]);
			cb = a.map(cb, function(ce) {
				var cd = (ce || {}).color;
				return ad({}, Y, Y[cc], X.axisDefaults, {
					line: {
						color: cd
					},
					labels: {
						color: cd
					},
					title: {
						color: cd
					}
				}, ce)
			});
			X[cc] = cb.length > 1 ? cb : cb[0]
		})
	}
	function g(X, Y) {
		f(X, Y);
		j(X, Y)
	}
	function aG(Y, X, ca) {
		Y[X] = (Y[X] || 0) + ca
	}
	function aj(X) {
		return typeof X !== bT
	}
	var bU = (function() {
		var X = 1;
		return function() {
			X = ((X >>> 1) ^ (-(X & 1) & 3489660929)) >>> 0;
			return aE + X.toString(16)
		}
	})();
	var V = function(cf) {
			var Y = this,
				ca = V.formats,
				ce, cd, cc, cb, X;
			if (arguments.length === 1) {
				cf = Y.resolveColor(cf);
				for (cb = 0; cb < ca.length; cb++) {
					ce = ca[cb].re;
					cd = ca[cb].process;
					cc = ce.exec(cf);
					if (cc) {
						X = cd(cc);
						Y.r = X[0];
						Y.g = X[1];
						Y.b = X[2]
					}
				}
			} else {
				Y.r = arguments[0];
				Y.g = arguments[1];
				Y.b = arguments[2]
			}
			Y.r = Y.normalizeByte(Y.r);
			Y.g = Y.normalizeByte(Y.g);
			Y.b = Y.normalizeByte(Y.b)
		};
	V.prototype = {
		toHex: function() {
			var Y = this,
				cb = Y.padDigit,
				cc = Y.r.toString(16),
				ca = Y.g.toString(16),
				X = Y.b.toString(16);
			return "#" + cb(cc) + cb(ca) + cb(X)
		},
		resolveColor: function(X) {
			X = X || A;
			if (X.charAt(0) == "#") {
				X = X.substr(1, 6)
			}
			X = X.replace(/ /g, "");
			X = X.toLowerCase();
			X = V.namedColors[X] || X;
			return X
		},
		normalizeByte: function(X) {
			return (X < 0 || isNaN(X)) ? 0 : ((X > 255) ? 255 : X)
		},
		padDigit: function(X) {
			return (X.length === 1) ? "0" + X : X
		},
		brightness: function(ca) {
			var X = this,
				Y = aX.round;
			X.r = Y(X.normalizeByte(X.r * ca));
			X.g = Y(X.normalizeByte(X.g * ca));
			X.b = Y(X.normalizeByte(X.b * ca));
			return X
		}
	};
	V.formats = [{
		re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
		process: function(X) {
			return [parseInt(X[1], 10), parseInt(X[2], 10), parseInt(X[3], 10)]
		}
	}, {
		re: /^(\w{2})(\w{2})(\w{2})$/,
		process: function(X) {
			return [parseInt(X[1], 16), parseInt(X[2], 16), parseInt(X[3], 16)]
		}
	}, {
		re: /^(\w{1})(\w{1})(\w{1})$/,
		process: function(X) {
			return [parseInt(X[1] + X[1], 16), parseInt(X[2] + X[2], 16), parseInt(X[3] + X[3], 16)]
		}
	}];
	V.namedColors = {
		aqua: "00ffff",
		azure: "f0ffff",
		beige: "f5f5dc",
		black: "000000",
		blue: "0000ff",
		brown: "a52a2a",
		coral: "ff7f50",
		cyan: "00ffff",
		darkblue: "00008b",
		darkcyan: "008b8b",
		darkgray: "a9a9a9",
		darkgreen: "006400",
		darkorange: "ff8c00",
		darkred: "8b0000",
		dimgray: "696969",
		fuchsia: "ff00ff",
		gold: "ffd700",
		goldenrod: "daa520",
		gray: "808080",
		green: "008000",
		greenyellow: "adff2f",
		indigo: "4b0082",
		ivory: "fffff0",
		khaki: "f0e68c",
		lightblue: "add8e6",
		lightgrey: "d3d3d3",
		lightgreen: "90ee90",
		lightpink: "ffb6c1",
		lightyellow: "ffffe0",
		lime: "00ff00",
		limegreen: "32cd32",
		linen: "faf0e6",
		magenta: "ff00ff",
		maroon: "800000",
		mediumblue: "0000cd",
		navy: "000080",
		olive: "808000",
		orange: "ffa500",
		orangered: "ff4500",
		orchid: "da70d6",
		pink: "ffc0cb",
		plum: "dda0dd",
		purple: "800080",
		red: "ff0000",
		royalblue: "4169e1",
		salmon: "fa8072",
		silver: "c0c0c0",
		skyblue: "87ceeb",
		slateblue: "6a5acd",
		slategray: "708090",
		snow: "fffafa",
		steelblue: "4682b4",
		tan: "d2b48c",
		teal: "008080",
		tomato: "ff6347",
		turquoise: "40e0d0",
		violet: "ee82ee",
		wheat: "f5deb3",
		white: "ffffff",
		whitesmoke: "f5f5f5",
		yellow: "ffff00",
		yellowgreen: "9acd32"
	};
	N.Gradients = {
		glass: {
			type: aS,
			rotation: 0,
			stops: [{
				offset: 0,
				color: b1,
				opacity: 0
			}, {
				offset: 0.1,
				color: b1,
				opacity: 0
			}, {
				offset: 0.25,
				color: b1,
				opacity: 0.3
			}, {
				offset: 0.92,
				color: b1,
				opacity: 0
			}, {
				offset: 1,
				color: b1,
				opacity: 0
			}]
		},
		sharpBevel: {
			type: bl,
			stops: [{
				offset: 0,
				color: b1,
				opacity: 0.55
			}, {
				offset: 0.65,
				color: b1,
				opacity: 0
			}, {
				offset: 0.95,
				color: b1,
				opacity: 0
			}, {
				offset: 0.95,
				color: b1,
				opacity: 0.25
			}]
		},
		roundedBevel: {
			type: bl,
			stops: [{
				offset: 0.33,
				color: b1,
				opacity: 0.06
			}, {
				offset: 0.83,
				color: b1,
				opacity: 0.2
			}, {
				offset: 0.95,
				color: b1,
				opacity: 0
			}]
		}
	};

	function bV(X, cb, cc) {
		var Y, ca = X.length;
		for (Y = 0; Y < ca; Y++) {
			X[Y][cb] = cc
		}
	}
	function I(ca) {
		var cb = ca.length,
			X = 0,
			Y;
		for (Y = 0; Y < cb; Y++) {
			X = aX.max(X, ca[Y].data.length)
		}
		return X
	}
	function bC(X) {
		return X * X
	}
	jQuery.extend(jQuery.easing, {
		easeOutElastic: function(cc, Y, cb, ca) {
			var ce = 1.70158,
				cd = 0,
				X = ca;
			if (cc === 0) {
				return cb
			}
			if (cc === 1) {
				return cb + ca
			}
			if (!cd) {
				cd = 0.5
			}
			if (X < aX.abs(ca)) {
				X = ca;
				ce = cd / 4
			} else {
				ce = cd / (2 * aX.PI) * aX.asin(ca / X)
			}
			return X * aX.pow(2, -10 * cc) * aX.sin((cc * 1 - ce) * (1.1 * aX.PI) / cd) + ca + cb
		}
	});
	b.scripts.push("telerik.chart.js");
	b.chart = function(cb, cc) {
		var cd = this,
			X, Y, ca = {};
		cd.element = cb;
		b.bind(cd.element, {
			load: cc.onLoad,
			error: cc.onError,
			dataBinding: cc.onDataBinding
		});
		ad(cc, {
			dataBound: cc.onDataBound,
			seriesClick: cc.onSeriesClick
		});
		cd._chart = X = new N(cb, ap({
			autoBind: false
		}, cc));
		Y = X.dataSource;
		if (Y) {
			Y.bind("error", function(ch, cg, cf) {
				var ce = bR(cb, "error", {
					XMLHttpRequest: ch
				});
				if (!ce) {
					alert("Error! Data binding failed. Unexpected server response - see console.")
				}
			});
			a(cd.element).bind("load", function() {
				if (!bR(cb, aa, ca)) {
					X.dataSource.query(ca.data || {})
				}
			})
		}
		cd.options = X.options
	};
	b.chart.prototype = {
		rebind: function(X) {
			this._ajaxRequest(X)
		},
		refresh: function() {
			var Y = this,
				X = Y._chart;
			X.options = Y.options;
			g(X.options);
			if (X.dataSource) {
				Y._ajaxRequest()
			} else {
				X._redraw()
			}
		},
		_ajaxRequest: function(X) {
			var Y = {};
			if (!bR(this.element, aa, Y)) {
				this._chart.dataSource.read(ap(Y.data || {}, X))
			}
		},
		refresh: function() {
			var Y = this,
				X = Y._chart;
			X.options = Y.options;
			X.refresh()
		},
		svg: function() {
			return this._chart.svg()
		}
	};
	a.fn.tChart = function(X) {
		return b.create(this, {
			name: "tChart",
			init: function(Y, ca) {
				return new b.chart(Y, ca)
			},
			options: X
		})
	};
	a.fn.tChart.defaults = {};
	b.chart.Chart = N;
	ad(N, {
		COORD_PRECISION: Z,
		CLIP: T,
		DEFAULT_WIDTH: ai,
		DEFAULT_HEIGHT: ag,
		DEFAULT_FONT: af,
		defined: aj,
		template: bH,
		rotatePoint: bp,
		round: bq,
		supportsSVG: bF,
		uniqueId: bU,
		Box2D: C,
		Point2D: bi,
		Sector: bw,
		Text: bI,
		BarLabel: w,
		ChartElement: O,
		RootElement: bo,
		BoxElement: E,
		TextBox: bJ,
		NumericAxis: a4,
		CategoryAxis: J,
		Bar: o,
		BarChart: v,
		ShapeElement: by,
		LinePoint: aV,
		LineChart: aT,
		AreaChart: l,
		ClusterLayout: U,
		StackLayout: bE,
		Title: bK,
		Legend: aP,
		CategoricalPlotArea: H,
		PiePlotArea: bf,
		XYPlotArea: b6,
		Tooltip: bL,
		Highlight: aC,
		PieSegment: bg,
		PieChart: be,
		ViewElement: b0,
		ScatterChart: bu,
		ScatterLineChart: bv,
		ViewBase: bZ,
		deepExtend: ad,
		Color: V,
		measureText: aZ,
		ExpandAnimation: ao,
		BarAnimation: t,
		BarAnimationDecorator: u,
		PieAnimation: bc,
		PieAnimationDecorator: bd,
		FadeAnimation: aq,
		FadeAnimationDecorator: ar,
		categoriesCount: I
	})
})(jQuery);
(function() {
	var a = jQuery,
		b = a.telerik,
		g = b.Class,
		f = b.chart.Chart,
		d = f.BarAnimationDecorator,
		u = f.PieAnimationDecorator,
		r = f.FadeAnimationDecorator,
		e = f.Box2D,
		v = f.Point2D,
		q = f.ExpandAnimation,
		T = f.ViewBase,
		U = f.ViewElement,
		k = f.deepExtend,
		o = f.defined,
		Q = f.template,
		S = f.uniqueId,
		z = f.round,
		p = document,
		s = Math;
	var h = f.CLIP,
		j = f.COORD_PRECISION,
		n = f.DEFAULT_WIDTH,
		m = f.DEFAULT_HEIGHT,
		l = f.DEFAULT_FONT,
		t = "none",
		w = "radial",
		A = "square",
		C = "http://www.w3.org/2000/svg",
		B = {
			dot: [1.5, 3.5],
			dash: [4, 3.5],
			longdash: [8, 3.5],
			dashdot: [3.5, 3.5, 1.5, 3.5],
			longdashdot: [8, 3.5, 1.5, 3.5],
			longdashdotdot: [8, 3.5, 1.5, 3.5, 1.5, 3.5]
		},
		R = "undefined";
	var P = T.extend({
		init: function(V) {
			var W = this;
			T.fn.init.call(W, V);
			W.decorators.push(new K(W), new G(W), new d(W), new u(W), new E(W), new r(W));
			W.template = P.template;
			if (!W.template) {
				W.template = P.template = Q("<svg xmlns='" + C + "' version='1.1' width='#= d.options.width #px' height='#= d.options.height #px' style='position: relative; display: block;'>#= d.renderDefinitions() ##= d.renderContent() #</svg>")
			}
		},
		options: {
			width: n,
			height: m,
			idPrefix: ""
		},
		renderTo: function(V) {
			var W = this,
				X;
			W.setupAnimations();
			x(V, W.render());
			X = V.firstChild;
			W.alignToScreen(X);
			W.playAnimations();
			return X
		},
		renderDefinitions: function() {
			var W = this,
				V = T.fn.renderDefinitions.call(W);
			return V.length > 0 ? "<defs>" + V + "</defs>" : ""
		},
		renderElement: function(W) {
			var V = p.createElement("div"),
				W;
			x(V, "<svg xmlns='" + C + "' version='1.1'>" + W.render() + "</svg>");
			W = V.firstChild.firstChild;
			return W
		},
		createGroup: function(V) {
			return this.decorate(new H(V))
		},
		createText: function(V, W) {
			return this.decorate(new O(V, W))
		},
		createRect: function(V, W) {
			return this.decorate(new I(V.points(), true, W))
		},
		createLine: function(W, Y, X, Z, V) {
			return this.decorate(new I([new v(W, Y), new v(X, Z)], false, V))
		},
		createPolyline: function(X, V, W) {
			return this.decorate(new I(X, V, W))
		},
		createCircle: function(V, X, W) {
			return this.decorate(new D(V, X, W))
		},
		createSector: function(W, V) {
			return this.decorate(new N(W, V))
		},
		createGradient: function(V) {
			if (V.type === w) {
				return new M(V)
			} else {
				return new J(V)
			}
		},
		alignToScreen: function(X) {
			try {
				var V = X.getScreenCTM ? X.getScreenCTM() : null
			} catch (W) {}
			if (V) {
				var Y = -V.e % 1,
					aa = -V.f % 1,
					Z = X.style;
				if (Y !== 0 || aa !== 0) {
					Z.left = Y + "px";
					Z.top = aa + "px"
				}
			}
		}
	});
	P.fromModel = function(V) {
		var W = new P(V.options);
		[].push.apply(W.children, V.getViewElements(W));
		return W
	};
	var O = U.extend({
		init: function(V, W) {
			var X = this;
			U.fn.init.call(X, W);
			X.content = V;
			X.template = O.template;
			if (!X.template) {
				X.template = O.template = Q("<text #= d.renderAttr(\"id\", d.options.id) # x='#= Math.round(d.options.x) #' y='#= Math.round(d.options.y + d.options.baseline) #' fill-opacity='#= d.options.fillOpacity #' #= d.options.rotation ? d.renderRotation() : '' # style='font: #= d.options.font #' fill='#= d.options.color #'>#= d.content #</text>")
			}
		},
		options: {
			x: 0,
			y: 0,
			baseline: 0,
			font: l,
			size: {
				width: 0,
				height: 0
			},
			fillOpacity: 1
		},
		refresh: function(V) {
			var W = this.options;
			a(V).attr({
				"fill-opacity": W.fillOpacity
			})
		},
		clone: function() {
			var V = this;
			return new O(V.content, k({}, V.options))
		},
		renderRotation: function() {
			var ad = this,
				Z = ad.options,
				ac = Z.size,
				V = z(Z.x + ac.normalWidth / 2, j),
				W = z(Z.y + ac.normalHeight / 2, j),
				aa = z(Z.x + ac.width / 2, j),
				ab = z(Z.y + ac.height / 2, j),
				X = z(aa - V, j),
				Y = z(ab - W, j);
			return "transform='translate(" + X + "," + Y + ") rotate(" + Z.rotation + "," + V + "," + W + ")'"
		}
	});
	var L = U.extend({
		init: function(V) {
			var W = this;
			U.fn.init.call(W, V);
			W.template = L.template;
			if (!W.template) {
				W.template = L.template = Q("<path #= d.renderAttr(\"id\", d.options.id) #d='#= d.renderPoints() #' #= d.renderAttr(\"stroke\", d.options.stroke) # #= d.renderAttr(\"stroke-width\", d.options.strokeWidth) ##= d.renderDashType() # stroke-linecap='#= d.renderLinecap() #' stroke-linejoin='round' fill-opacity='#= d.options.fillOpacity #' stroke-opacity='#= d.options.strokeOpacity #' fill='#= d.options.fill || \"none\" #'></path>")
			}
		},
		options: {
			fill: "",
			fillOpacity: 1,
			strokeOpacity: 1
		},
		refresh: function(V) {
			var W = this.options;
			a(V).attr({
				d: this.renderPoints(),
				"fill-opacity": W.fillOpacity,
				"stroke-opacity": W.strokeOpacity
			})
		},
		clone: function() {
			var V = this;
			return new L(k({}, V.options))
		},
		renderPoints: function() {},
		renderDashType: function() {
			var W = this,
				V = W.options;
			return y(V.dashType, V.strokeWidth)
		},
		renderLinecap: function() {
			var V = this.options.dashType;
			return (V && V != "solid") ? "butt" : "square"
		}
	});
	var I = L.extend({
		init: function(Y, V, X) {
			var W = this;
			L.fn.init.call(W, X);
			W.points = Y;
			W.closed = V
		},
		renderPoints: function() {
			var Y = this,
				Z = Y.points,
				X, V = Z.length,
				W = Z[0],
				aa = "M" + Y._print(W);
			for (X = 1; X < V; X++) {
				aa += " " + Y._print(Z[X])
			}
			if (Y.closed) {
				aa += " z"
			}
			return aa
		},
		clone: function() {
			var V = this;
			return new I(k([], V.points), V.closed, k({}, V.options))
		},
		_print: function(X) {
			var W = this,
				Z = W.options.strokeWidth,
				Y = Z && Z % 2 !== 0,
				V = Y ? c : s.round;
			return V(X.x) + " " + V(X.y)
		}
	});
	var N = L.extend({
		init: function(V, W) {
			var X = this;
			L.fn.init.call(X, W);
			X.pathTemplate = N.pathTemplate;
			if (!X.pathTemplate) {
				X.pathTemplate = N.pathTemplate = Q("M #= d.firstPoint.x # #= d.firstPoint.y # A#= d.r # #= d.r # 0 #= d.isReflexAngle ? '1' : '0' #,1 #= d.secondPoint.x # #= d.secondPoint.y # L #= d.cx # #= d.cy # z")
			}
			X.circleSector = V || {}
		},
		options: {
			fill: "",
			fillOpacity: 1,
			strokeOpacity: 1,
			strokeLineCap: A
		},
		clone: function() {
			var V = this;
			return new N(k({}, V.circleSector), k({}, V.options))
		},
		renderPoints: function() {
			var ad = this,
				V = ad.circleSector,
				ae = V.startAngle,
				Y = V.angle + ae,
				Y = (Y - ae) == 360 ? Y - 0.001 : Y,
				aa = (Y - ae) > 180,
				ab = s.max(V.r, 0),
				W = V.c.x,
				X = V.c.y,
				Z = V.point(ae),
				ac = V.point(Y);
			return ad.pathTemplate({
				firstPoint: Z,
				secondPoint: ac,
				isReflexAngle: aa,
				r: ab,
				cx: W,
				cy: X
			})
		}
	});
	var D = U.extend({
		init: function(V, Y, X) {
			var W = this;
			U.fn.init.call(W, X);
			W.center = V;
			W.radius = Y;
			W.template = D.template;
			if (!W.template) {
				W.template = D.template = Q("<circle #= d.renderAttr(\"id\", d.options.id) # cx='#= d.center[0] #' cy='#= d.center[1] #' r='#= d.radius #' #= d.renderAttr(\"stroke\", d.options.stroke) # #= d.renderAttr(\"stroke-width\", d.options.strokeWidth) #fill-opacity='#= d.options.fillOpacity #' stroke-opacity='#= d.options.strokeOpacity #'  fill='#= d.options.fill || \"none\" #'></circle>")
			}
		},
		options: {
			fill: "",
			fillOpacity: 1,
			strokeOpacity: 1
		}
	});
	var H = U.extend({
		init: function(W) {
			var V = this;
			U.fn.init.call(V, W);
			V.template = H.template;
			if (!V.template) {
				V.template = H.template = Q('<g#= d.renderAttr("id", d.options.id) ##= d.renderAttr("clip-path", d.options.clipPath) #>#= d.renderContent() #</g>')
			}
		}
	});
	var F = U.extend({
		init: function(W) {
			var V = this;
			U.fn.init.call(V, W);
			V.template = F.template;
			if (!V.template) {
				V.template = F.template = Q('<clipPath#= d.renderAttr("id", d.options.id) #>#= d.renderContent() #</clipPath>')
			}
		}
	});
	var J = U.extend({
		init: function(W) {
			var V = this;
			U.fn.init.call(V, W);
			V.template = J.template;
			V.stopTemplate = J.stopTemplate;
			if (!V.template) {
				V.template = J.template = Q("<linearGradient id='#= d.options.id #' gradientTransform='rotate(#= d.options.rotation #)'> #= d.renderStops() #</linearGradient>");
				V.stopTemplate = J.stopTemplate = Q("<stop offset='#= Math.round(d.offset * 100) #%' style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />")
			}
		},
		options: {
			id: "",
			rotation: 0
		},
		renderStops: function() {
			var W = this,
				aa = W.options.stops,
				ab = W.stopTemplate,
				X, Y = aa.length,
				V, Z = "";
			for (X = 0; X < Y; X++) {
				V = aa[X];
				Z += ab(V)
			}
			return Z
		}
	});
	var M = U.extend({
		init: function(W) {
			var V = this;
			U.fn.init.call(V, W);
			V.template = M.template;
			V.stopTemplate = M.stopTemplate;
			if (!V.template) {
				V.template = M.template = Q("<radialGradient id='#= d.options.id #' cx='#= d.options.cx #' cy='#= d.options.cy #' fx='#= d.options.cx #' fy='#= d.options.cy #' r='#= d.options.r #' gradientUnits='userSpaceOnUse'>#= d.renderStops() #</radialGradient>");
				V.stopTemplate = M.stopTemplate = Q("<stop offset='#= Math.round(d.offset * 100) #%' style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />")
			}
		},
		options: {
			id: "",
			rotation: 0
		},
		renderStops: function() {
			var W = this,
				aa = W.options.stops,
				ab = W.stopTemplate,
				Y = aa.length,
				V, Z = "",
				X;
			for (X = 0; X < Y; X++) {
				V = aa[X];
				Z += ab(V)
			}
			return Z
		}
	});

	function K(V) {
		this.view = V
	}
	K.prototype = {
		decorate: function(W) {
			var V = this,
				ab = V.view,
				Z = W.options,
				Y = Z.id,
				X, aa;
			if (Z.overlay) {
				W.options.id = S();
				X = ab.createGroup();
				aa = W.clone();
				X.children.push(W, aa);
				aa.options.id = Y;
				aa.options.fill = Z.overlay;
				return X
			} else {
				return W
			}
		}
	};

	function G(V) {
		this.view = V
	}
	G.prototype = {
		decorate: function(W) {
			var V = this,
				X = W.options;
			X.fill = V.getPaint(X.fill);
			return W
		},
		getPaint: function(aa) {
			var V = this,
				ab = V.view,
				W = ab.definitions,
				Y, Z, X;
			if (aa && o(aa.gradient)) {
				Y = ab.buildGradient(aa);
				if (Y) {
					Z = Y.id;
					X = W[Z];
					if (!X) {
						X = ab.createGradient(Y);
						W[Z] = X
					}
					return "url(#" + X.options.id + ")"
				} else {
					return t
				}
			} else {
				return aa
			}
		}
	};
	var E = g.extend({
		init: function(V) {
			this.view = V;
			this.clipId = S()
		},
		decorate: function(ab) {
			var Z = this,
				ad = Z.view,
				W = Z.clipId,
				ac = ad.options,
				V = ab.options.animation,
				aa = ad.definitions,
				X = aa[W],
				Y;
			if (V && V.type === h && ac.transitions) {
				if (!X) {
					X = new F({
						id: W
					});
					Y = ad.createRect(new e(0, 0, ac.width, ac.height), {
						id: S()
					});
					X.children.push(Y);
					aa[W] = X;
					ad.animations.push(new q(Y, {
						size: ac.width
					}))
				}
				ab.options.clipPath = "url(#" + W + ")"
			}
			return ab
		}
	});

	function c(V) {
		return s.round(V) + 0.5
	}
	function y(V, Z) {
		var Y = [],
			V = V ? V.toLowerCase() : null,
			W, X;
		if (V && V != "solid" && Z) {
			W = B[V];
			for (X = 0; X < W.length; X++) {
				Y.push(W[X] * Z)
			}
			return "stroke-dasharray='" + Y.join(" ") + "' "
		}
		return ""
	}
	function x(V, W) {
		V.innerHTML = W
	}(function() {
		var X = "<svg xmlns='" + C + "'></svg>",
			W = p.createElement("div"),
			V = typeof DOMParser != R;
		W.innerHTML = X;
		if (V && W.firstChild.namespaceURI != C) {
			x = function(Z, ac) {
				var ab = new DOMParser(),
					Y = ab.parseFromString(ac, "text/xml"),
					aa = p.adoptNode(Y.documentElement);
				Z.innerHTML = "";
				Z.appendChild(aa)
			}
		}
	})();
	k(f, {
		SVGView: P,
		SVGText: O,
		SVGPath: L,
		SVGLine: I,
		SVGSector: N,
		SVGCircle: D,
		SVGGroup: H,
		SVGClipPath: F,
		SVGLinearGradient: J,
		SVGRadialGradient: M,
		SVGOverlayDecorator: K,
		SVGGradientDecorator: G,
		SVGClipAnimationDecorator: E
	})
})(jQuery);
(function() {
	var a = jQuery,
		b = a.telerik,
		k = b.Class,
		j = b.chart.Chart,
		m = j.Color,
		h = j.Box2D,
		y = j.Point2D,
		c = j.BarAnimationDecorator,
		x = j.PieAnimationDecorator,
		t = j.FadeAnimationDecorator,
		s = j.ExpandAnimation,
		F = j.ViewBase,
		G = j.ViewElement,
		n = j.deepExtend,
		D = j.template,
		E = j.uniqueId,
		A = j.rotatePoint,
		B = j.round,
		C = j.supportsSVG,
		r = document,
		v = Math;
	var d = "#000",
		l = j.CLIP,
		q = j.DEFAULT_WIDTH,
		p = j.DEFAULT_HEIGHT,
		o = j.DEFAULT_FONT,
		w = "object",
		z = "radial";
	var V = F.extend({
		init: function(W) {
			var X = this;
			F.fn.init.call(X, W);
			X.decorators.push(new P(X), new L(X), new c(X), new x(X), new I(X));
			if (!u()) {
				X.decorators.push(new t(X))
			}
			X.template = V.template;
			if (!X.template) {
				X.template = V.template = D("<div style='width:#= d.options.width #px; height:#= d.options.height #px; position: relative;'>#= d.renderContent() #</div>")
			}
		},
		options: {
			width: q,
			height: p
		},
		renderTo: function(W) {
			var X = this;
			if (r.namespaces) {
				r.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML")
			}
			X.setupAnimations();
			W.innerHTML = X.render();
			X.playAnimations();
			return W.firstChild
		},
		renderElement: function(X) {
			var W = r.createElement("div"),
				X;
			W.style.display = "none";
			r.body.appendChild(W);
			W.innerHTML = X.render();
			X = W.firstChild;
			r.body.removeChild(W);
			return X
		},
		createText: function(W, X) {
			return this.decorate((X && X.rotation) ? new R(W, X) : new U(W, X))
		},
		createRect: function(W, X) {
			return this.decorate(new N(W.points(), true, X))
		},
		createLine: function(X, Z, Y, aa, W) {
			return this.decorate(new N([new y(X, Z), new y(Y, aa)], false, W))
		},
		createPolyline: function(Y, W, X) {
			return this.decorate(new N(Y, W, X))
		},
		createCircle: function(W, Y, X) {
			return this.decorate(new H(W, Y, X))
		},
		createSector: function(X, W) {
			return this.decorate(new S(X, W))
		},
		createGroup: function(W) {
			return this.decorate(new M(W))
		},
		createGradient: function(W) {
			return new O(W)
		}
	});
	V.fromModel = function(W) {
		var X = new V(W.options);
		[].push.apply(X.children, W.getViewElements(X));
		return X
	};
	var U = G.extend({
		init: function(W, X) {
			var Y = this;
			G.fn.init.call(Y, X);
			Y.content = W;
			Y.template = U.template;
			if (!Y.template) {
				Y.template = U.template = D("<kvml:textbox #= d.renderAttr(\"id\", d.options.id) # style='position: absolute; left: #= d.options.x #px; top: #= d.options.y #px; font: #= d.options.font #; color: #= d.options.color #; visibility: #= d.renderVisibility() #; white-space: nowrap;'>#= d.content #</kvml:textbox>")
			}
		},
		options: {
			x: 0,
			y: 0,
			font: o,
			color: d,
			fillOpacity: 1
		},
		refresh: function(W) {
			a(W).css("visibility", this.renderVisibility())
		},
		clone: function() {
			var W = this;
			return new U(W.content, n({}, W.options))
		},
		renderVisibility: function() {
			return this.options.fillOpacity > 0 ? "visible" : "hidden"
		}
	});
	var R = G.extend({
		init: function(W, X) {
			var Y = this;
			G.fn.init.call(Y, X);
			Y.content = W;
			Y.template = R.template;
			if (!Y.template) {
				Y.template = R.template = D("<kvml:shape #= d.renderAttr(\"id\", d.options.id) # style='position: absolute; top: 0px; left: 0px; width: 1px; height: 1px;' stroked='false' coordsize='1,1'>#= d.renderPath() #<kvml:fill color='#= d.options.color #' /><kvml:textpath on='true' style='font: #= d.options.font #;' fitpath='false' string='#= d.content #' /></kvml:shape>")
			}
		},
		options: {
			x: 0,
			y: 0,
			font: o,
			color: d,
			size: {
				width: 0,
				height: 0
			}
		},
		renderPath: function() {
			var ad = this,
				aa = ad.options,
				ae = aa.size.width,
				Z = aa.size.height,
				X = aa.x + ae / 2,
				Y = aa.y + Z / 2,
				W = -aa.rotation,
				ab = A(aa.x, Y, X, Y, W),
				ac = A(aa.x + ae, Y, X, Y, W);
			return "<kvml:path textpathok='true' v='m " + B(ab.x) + "," + B(ab.y) + " l " + B(ac.x) + "," + B(ac.y) + "' />"
		}
	});
	var T = G.extend({
		init: function(W) {
			var X = this;
			G.fn.init.call(X, W);
			X.template = T.template;
			if (!X.template) {
				X.template = T.template = D('<kvml:stroke on=\'#= !!d.options.stroke #\' #= d.renderAttr("color", d.options.stroke) ##= d.renderAttr("weight", d.options.strokeWidth) ##= d.renderAttr("dashstyle", d.options.dashType) ##= d.renderAttr("opacity", d.options.strokeOpacity) # />')
			}
		}
	});
	var K = G.extend({
		init: function(W) {
			var X = this;
			G.fn.init.call(X, W);
			X.template = K.template;
			if (!X.template) {
				X.template = K.template = D('<kvml:fill on=\'#= !!d.options.fill #\' #= d.renderAttr("color", d.options.fill) ##= d.renderAttr("weight", d.options.fillWidth) ##= d.renderAttr("opacity", d.options.fillOpacity) # />')
			}
		}
	});
	var Q = G.extend({
		init: function(W) {
			var X = this;
			G.fn.init.call(X, W);
			X.template = Q.template;
			if (!X.template) {
				X.template = Q.template = D("<kvml:shape #= d.renderAttr(\"id\", d.options.id) # style='position:absolute; width:1px; height:1px;' coordorigin='0 0' coordsize='1 1'><kvml:path v='#= d.renderPoints() # e' />#= d.fill.render() + d.stroke.render() #</kvml:shape>")
			}
			X.stroke = new T(X.options);
			X.fill = new K(X.options)
		},
		options: {
			fill: "",
			fillOpacity: 1,
			strokeOpacity: 1
		},
		render: function() {
			var W = this;
			W.fill.options.fillOpacity = W.options.fillOpacity;
			W.stroke.options.strokeOpacity = W.options.strokeOpacity;
			return G.fn.render.call(W)
		},
		renderPoints: function() {},
		refresh: function(W) {
			var ab = this,
				Z = ab.options,
				Y = a(W),
				aa = Y[0].parentNode;
			if (aa) {
				Y.find("path")[0].v = this.renderPoints();
				try {
					Y.find("fill")[0].opacity = Z.fillOpacity;
					Y.find("stroke")[0].opacity = Z.strokeOpacity
				} catch (X) {}
				aa.style.cssText = aa.style.cssText
			}
		}
	});
	var N = Q.extend({
		init: function(Z, W, Y) {
			var X = this;
			Q.fn.init.call(X, Y);
			X.points = Z;
			X.closed = W
		},
		renderPoints: function() {
			var Y = this,
				Z = Y.points,
				X, W = Z.length,
				aa = "m " + Y._print(Z[0]);
			if (W > 1) {
				aa += " l ";
				for (X = 1; X < W; X++) {
					aa += Y._print(Z[X]);
					if (X < W - 1) {
						aa += ", "
					}
				}
			}
			if (Y.closed) {
				aa += " x"
			}
			return aa
		},
		clone: function() {
			var W = this;
			return new N(n([], W.points), W.closed, n({}, W.options))
		},
		_print: function(W) {
			return v.round(W.x) + "," + v.round(W.y)
		}
	});
	var S = Q.extend({
		init: function(W, X) {
			var Y = this;
			Q.fn.init.call(Y, X);
			Y.pathTemplate = S.pathTemplate;
			if (!Y.pathTemplate) {
				Y.pathTemplate = S.pathTemplate = D("M #= d.cx # #= d.cy # AE #= d.cx # #= d.cy # #= d.r # #= d.r # #= d.sa # #= d.a # X E")
			}
			Y.circleSector = W
		},
		renderPoints: function() {
			var ac = this,
				X = ac.circleSector,
				aa = v.max(B(X.r), 0),
				Y = B(X.c.x),
				Z = B(X.c.y),
				ab = -B((X.startAngle + 180) * 65535),
				W = -B(X.angle * 65536);
			return ac.pathTemplate({
				r: aa,
				cx: Y,
				cy: Z,
				sa: ab,
				a: W
			})
		},
		clone: function() {
			var W = this;
			return new S(n({}, W.circleSector), n({}, W.options))
		}
	});
	var H = G.extend({
		init: function(W, Z, Y) {
			var X = this;
			G.fn.init.call(X, Y);
			X.center = W;
			X.radius = Z;
			X.template = H.template;
			if (!X.template) {
				X.template = H.template = D("<kvml:oval #= d.renderAttr(\"id\", d.options.id) # style='position:absolute; width:#= d.radius * 2 #px; height:#= d.radius * 2 #px; top:#= d.center[1] - d.radius #px; left:#= d.center[0] - d.radius #px;'>#= d.fill.render() + d.stroke.render() #</kvml:oval>")
			}
			X.stroke = new T(X.options);
			X.fill = new K(X.options)
		},
		options: {
			fill: ""
		}
	});
	var M = G.extend({
		init: function(X) {
			var W = this;
			G.fn.init.call(W, X);
			W.template = M.template;
			if (!W.template) {
				W.template = M.template = D("<div #= d.renderAttr(\"id\", d.options.id) #style='position: absolute; white-space: nowrap;'>#= d.renderContent() #</div>")
			}
		}
	});
	var J = G.extend({
		init: function(W, Y) {
			var X = this;
			G.fn.init.call(X, Y);
			X.template = J.template;
			X.clipTemplate = J.clipTemplate;
			if (!X.template) {
				X.template = J.template = D("<div #= d.renderAttr(\"id\", d.options.id) #style='position:absolute; width:#= d.box.width() #px; height:#= d.box.height() #px; top:#= d.box.y1 #px; left:#= d.box.x1 #px; clip:#= d._renderClip() #;' >#= d.renderContent() #</div>");
				X.clipTemplate = J.clipTemplate = D("rect(#= d.points[0].y #px #= d.points[1].x #px #= d.points[2].y #px #= d.points[0].x #px)")
			}
			X.box = W;
			X.points = W.points()
		},
		clone: function() {
			var W = this;
			return new J(W.box, n({}, W.options))
		},
		refresh: function(W) {
			a(W).css(l, this._renderClip())
		},
		_renderClip: function() {
			return this.clipTemplate(this)
		}
	});
	var O = G.extend({
		init: function(X) {
			var W = this;
			G.fn.init.call(W, X);
			W.template = O.template;
			if (!W.template) {
				W.template = O.template = D("<kvml:fill type='gradient' angle='#= 270 - d.options.rotation #' colors='#= d.renderColors() #' opacity='#= d.options.opacity #' />")
			}
		},
		options: {
			rotation: 0,
			opacity: 1
		},
		renderColors: function() {
			var X = this,
				aa = X.options,
				ad = aa.stops,
				W, Y, Z = ad.length,
				ab = [],
				ac = v.round;
			for (Y = 0; Y < Z; Y++) {
				W = ad[Y];
				ab.push(ac(W.offset * 100) + "% " + W.color)
			}
			return ab.join(",")
		}
	});

	function P(W) {
		this.view = W
	}
	P.prototype = {
		decorate: function(W) {
			var X = W.options,
				Z = this.view,
				Y;
			if (X.overlay) {
				Y = Z.buildGradient(n({}, X.overlay, {
					_overlayFill: X.fill
				}))
			}
			if (!Y || Y.type === z) {
				return W
			}
			delete X.overlay;
			X.fill = n(g(X.fill, Y), {
				opacity: X.fillOpacity
			});
			return W
		}
	};

	function L(W) {
		this.view = W
	}
	L.prototype = {
		decorate: function(X) {
			var W = this,
				aa = W.view,
				Z = X.options,
				Y = Z.fill;
			if (Y) {
				if (Y.gradient) {
					Y = aa.buildGradient(Y)
				}
				if (typeof Y === w) {
					X.fill = aa.createGradient(Y)
				}
			}
			return X
		}
	};
	var I = k.extend({
		init: function(W) {
			this.view = W
		},
		decorate: function(Z) {
			var Y = this,
				ab = Y.view,
				aa = ab.options,
				W = Z.options.animation,
				X;
			if (W && W.type === l && aa.transitions) {
				X = new J(new h(0, 0, 0, aa.height), {
					id: E()
				});
				ab.animations.push(new s(X, {
					size: aa.width
				}));
				X.children.push(Z);
				return X
			} else {
				return Z
			}
		}
	});

	function u() {
		return a.browser.msie && !C() && typeof window.performance !== "undefined"
	}
	function f(Y, ab, W) {
		var Z = new m(Y),
			ac = new m(ab),
			ad = e(Z.r, ac.r, W),
			aa = e(Z.g, ac.g, W),
			X = e(Z.b, ac.b, W);
		return new m(ad, aa, X).toHex()
	}
	function e(W, Y, X) {
		return v.round(X * Y + (1 - X) * W)
	}
	function g(W, X) {
		var ab = X.stops,
			ad = ab.length,
			Z = n({}, X),
			Y, ac, aa;
		Z.stops = [];
		for (Y = 0; Y < ad; Y++) {
			ac = ab[Y];
			aa = Z.stops[Y] = n({}, ab[Y]);
			aa.color = f(W, ac.color, ac.opacity);
			aa.opacity = 0
		}
		return Z
	}
	n(j, {
		VMLView: V,
		VMLText: U,
		VMLRotatedText: R,
		VMLStroke: T,
		VMLFill: K,
		VMLPath: Q,
		VMLLine: N,
		VMLSector: S,
		VMLCircle: H,
		VMLGroup: M,
		VMLClipRect: J,
		VMLLinearGradient: O,
		VMLOverlayDecorator: P,
		VMLClipAnimationDecorator: I,
		blendColors: f,
		blendGradient: g
	})
})(jQuery);
(function() {
	var a = $.telerik,
		d = a.chart.Chart,
		e = d.deepExtend;
	var c = "#000",
		m = "#fff",
		g = "Arial,Helvetica,sans-serif",
		h = "11px " + g,
		j = "12px " + g,
		k = "16px " + g,
		f = {
			overlay: null
		};
	var b = {
		title: {
			font: k
		},
		legend: {
			labels: {
				font: j
			}
		},
		seriesDefaults: {
			labels: {
				font: h
			},
			area: {
				opacity: 0.4,
				markers: {
					size: 6,
					visible: false
				}
			},
			verticalArea: {
				opacity: 0.4,
				markers: {
					size: 6,
					visible: false
				}
			}
		},
		axisDefaults: {
			labels: {
				font: j
			},
			title: {
				font: k,
				margin: 5
			}
		},
		tooltip: {
			font: j
		}
	};
	var l = {};
	l.black = e({}, b, {
		title: {
			color: m
		},
		legend: {
			labels: {
				color: m
			}
		},
		seriesDefaults: {
			labels: {
				color: m
			},
			line: {
				markers: {
					background: "#3d3d3d"
				}
			},
			verticalLine: {
				markers: {
					background: "#3d3d3d"
				}
			},
			scatter: {
				markers: {
					background: "#3d3d3d"
				}
			},
			scatterLine: {
				markers: {
					background: "#3d3d3d"
				}
			}
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#f9a319", "#1edee2", "#9eda29", "#ffce00", "#dd007f"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#919191"
			},
			labels: {
				color: m
			},
			majorGridLines: {
				color: "#636363"
			},
			minorGridLines: {
				color: "#464646"
			},
			title: {
				color: m
			}
		}
	});
	l["default"] = e({}, b, {
		chartArea: {
			background: ""
		},
		seriesColors: ["#f6921e", "#d6de23", "#8bc53f", "#26a9e0", "#9e1f63"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			majorGridLines: {
				color: "#aaaaaa"
			},
			minorGridLines: {
				color: "#cccccc"
			},
			line: {
				color: "#828282"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.forest = e({}, b, {
		title: {
			color: "#3c4c30"
		},
		legend: {
			labels: {
				color: "#3c4c30"
			}
		},
		seriesDefaults: {
			labels: {
				color: "#3c4c30"
			},
			verticalLine: {
				markers: {
					background: "#d3e0c2"
				}
			},
			line: {
				markers: {
					background: "#d3e0c2"
				}
			},
			scatter: {
				markers: {
					background: "#d3e0c2"
				}
			},
			scatterLine: {
				markers: {
					background: "#d3e0c2"
				}
			}
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#4d7924", "#6dba3a", "#efab22", "#f05a28", "#603813"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			majorGridLines: {
				color: "#a7bc75"
			},
			minorGridLines: {
				color: "#cad7ac"
			},
			line: {
				color: "#5a8533"
			},
			labels: {
				color: "#3c4c30"
			},
			title: {
				color: "#3c4c30"
			}
		},
		tooltip: {
			background: "#D3E0C2",
			color: c
		}
	});
	l.hay = e({}, b, {
		title: {
			color: "#3c4c30"
		},
		legend: {
			labels: {
				color: "#3c4c30"
			}
		},
		seriesDefaults: {
			labels: {
				color: "#3c4c30"
			}
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#205b02", "#61c407", "#9cd65f", "#bbbe94", "#323323"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			majorGridLines: {
				color: "#bfbdac"
			},
			minorGridLines: {
				color: "#d9d7cd"
			},
			line: {
				color: "#898772"
			},
			labels: {
				color: "#3c4c30"
			},
			title: {
				color: "#3c4c30"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.metro = e({}, b, {
		seriesDefaults: {
			bar: f,
			pie: f,
			column: f,
			pie: f
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#25a0da", "#309b46", "#d8e404", "#e61e26", "#313131"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			majorGridLines: {
				color: "#b4b4b4"
			},
			line: {
				color: "#b4b4b4"
			},
			minorGridLines: {
				color: "#d2d2d2"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.office2007 = e({}, b, {
		chartArea: {
			background: ""
		},
		seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			majorGridLines: {
				color: "#bdcce2"
			},
			minorGridLines: {
				color: "#d7e0ee"
			},
			line: {
				color: "#688CAF"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.office2010black = e({}, b, {
		title: {
			color: m
		},
		legend: {
			labels: {
				color: m
			}
		},
		seriesDefaults: {
			labels: {
				color: m
			},
			verticalLine: {
				markers: {
					background: "#6f6f6f"
				}
			},
			line: {
				markers: {
					background: "#6f6f6f"
				}
			},
			scatter: {
				markers: {
					background: "#6f6f6f"
				}
			},
			scatterLine: {
				markers: {
					background: "#6f6f6f"
				}
			}
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#999999"
			},
			labels: {
				color: m
			},
			majorGridLines: {
				color: "#888888"
			},
			minorGridLines: {
				color: "#7c7c7c"
			},
			title: {
				color: m
			}
		},
		tooltip: {
			background: "#6F6F6F",
			color: m
		}
	});
	l.office2010blue = e({}, b, {
		title: {
			color: "#384E73"
		},
		legend: {
			labels: {
				color: "#384E73"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#384E73"
			}
		},
		seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#8ba0bc"
			},
			labels: {
				color: "#384e73"
			},
			majorGridLines: {
				color: "#d1dbe5"
			},
			minorGridLines: {
				color: "#e3e9ef"
			},
			title: {
				color: "#384e73"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.office2010silver = e({}, b, {
		title: {
			color: "#3b3b3b"
		},
		legend: {
			labels: {
				color: "#3b3b3b"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#3b3b3b"
			}
		},
		seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#a4abb2"
			},
			labels: {
				color: "#3b3b3b"
			},
			majorGridLines: {
				color: "#dbdfe4"
			},
			minorGridLines: {
				color: "#e9ecef"
			},
			title: {
				color: "#3b3b3b"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.outlook = e({}, b, {
		chartArea: {
			background: ""
		},
		seriesColors: ["#231f20", "#1b75bb", "#7da5e0", "#f9ec31", "#faaf40"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#5d8cc9"
			},
			majorGridLines: {
				color: "#aac3e8"
			},
			minorGridLines: {
				color: "#ccdbf1"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.simple = e({}, b, {
		title: {
			color: "#606060"
		},
		legend: {
			labels: {
				color: "#606060"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#606060"
			}
		},
		seriesColors: ["#231f20", "#404041", "#58595b", "#808184", "#929497"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#828282"
			},
			majorGridLines: {
				color: "#d1d1d1"
			},
			minorGridLines: {
				color: "#e3e3e3"
			},
			labels: {
				color: "#606060"
			},
			title: {
				color: "#606060"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.sitefinity = e({}, b, {
		chartArea: {
			background: ""
		},
		seriesColors: ["#a2d5e2", "#95b979", "#f9d67b", "#ea9d73", "#f19ca8", "#d06c6c"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#636363"
			},
			majorGridLines: {
				color: "#919191"
			},
			minorGridLines: {
				color: "#a1a1a1"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.sunset = e({}, b, {
		title: {
			color: "#854324"
		},
		legend: {
			labels: {
				color: "#854324"
			}
		},
		seriesDefaults: {
			labels: {
				color: "#854324"
			}
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#3f1c12", "#ba3b01", "#d95a1a", "#e7931e", "#f9bc12"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#b7836a"
			},
			labels: {
				color: "#854324"
			},
			majorGridLines: {
				color: "#cebab1"
			},
			minorGridLines: {
				color: "#e2d6d0"
			},
			title: {
				color: "#854324"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.telerik = e({}, b, {
		chartArea: {
			background: ""
		},
		seriesColors: ["#7e7e7e", "#cbcbcb", "#a2ea8b", "#63ac39", "#000000"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#828282"
			},
			majorGridLines: {
				color: "#c6c6c6"
			},
			minorGridLines: {
				color: "#b4b4b4"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.transparent = e({}, b, {
		seriesDefaults: {
			opacity: 0.6,
			verticalLine: {
				markers: {
					background: ""
				}
			},
			line: {
				markers: {
					background: ""
				}
			},
			scatter: {
				markers: {
					background: ""
				}
			},
			scatterLine: {
				markers: {
					background: ""
				}
			}
		},
		chartArea: {
			background: ""
		},
		seriesColors: ["#f2f2f2", "#4d4d4d", "#d4d4d4", "#0d0d0d", "#999999"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#828282"
			},
			majorGridLines: {
				color: "#828282"
			},
			minorGridLines: {
				color: "#b4b4b4"
			}
		},
		tooltip: {
			background: m,
			color: c,
			opacity: 0.7
		}
	});
	l.vista = e({}, b, {
		title: {
			color: "#333333"
		},
		legend: {
			labels: {
				color: "#333333"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#333333"
			}
		},
		seriesColors: ["#83abc0", "#64d6f4", "#3399ff", "#03597a", "#000000"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#a7bac5"
			},
			majorGridLines: {
				color: "#d3d3d3"
			},
			labels: {
				color: "#333333"
			},
			minorGridLines: {
				color: "#e5e5e5"
			},
			title: {
				color: "#333333"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.web20 = e({}, b, {
		title: {
			color: "#001454"
		},
		legend: {
			labels: {
				color: "#001454"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#001454"
			}
		},
		seriesColors: ["#0e4302", "#64ba36", "#a0beea", "#3460b9", "#2c4072"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#708dc3"
			},
			majorGridLines: {
				color: "#cfd9e7"
			},
			labels: {
				color: "#001454"
			},
			minorGridLines: {
				color: "#e2e8f1"
			},
			title: {
				color: "#001454"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.webblue = e({}, b, {
		title: {
			color: "#0d202b"
		},
		legend: {
			labels: {
				color: "#0d202b"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#0d202b"
			}
		},
		seriesColors: ["#a2b3c7", "#76c8e8", "#358db0", "#426682", "#2d3d4f"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#708dc3"
			},
			majorGridLines: {
				color: "#d0d8dd"
			},
			labels: {
				color: "#0d202b"
			},
			minorGridLines: {
				color: "#e2e8f1"
			},
			title: {
				color: "#0d202b"
			}
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	l.windows7 = e({}, b, {
		title: {
			color: "#4c607a"
		},
		legend: {
			labels: {
				color: "#4c607a"
			}
		},
		chartArea: {
			background: ""
		},
		seriesDefaults: {
			labels: {
				color: "#4c607a"
			}
		},
		seriesColors: ["#a5b3c5", "#82afe5", "#358db0", "#03597a", "#152435"],
		categoryAxis: {
			majorGridLines: {
				visible: true
			}
		},
		axisDefaults: {
			line: {
				color: "#a5b3c5"
			},
			majorGridLines: {
				color: "#dae2e8"
			},
			labels: {
				color: "#4c607a"
			},
			minorGridLines: {
				color: "#e9eef1"
			},
			title: {
				color: "#4c607a"
			}
		},
		tooltip: {
			background: m,
			color: c
		},
		tooltip: {
			background: m,
			color: c
		}
	});
	d.themes = l;
	d.prototype.options.theme = "default"
})(jQuery);
(function(a) {
	var b = a.telerik;
	var e = /\s+/;
	b.scripts.push("telerik.list.js");
	b.list = {
		htmlBuilder: function(j, h, l) {
			var o, n, k = j.id,
				m = j.name,
				g = new b.stringBuilder(),
				f = a(j);
			if (l) {
				n = f.find("option:selected").text();
				o = f.val()
			} else {
				n = j.value
			}
			function p() {
				return a(['<div class="t-widget', h, 't-header"></div>'].join(" "))
			}
			this.render = function() {
				f.wrap(p()).hide();
				var q = a('<div class="t-dropdown-wrap t-state-default"></div>').insertBefore(f);
				this.text({
					builder: g,
					text: n,
					id: k,
					name: m
				}).appendTo(q);
				a('<span class="t-select"><span class="t-icon t-arrow-down">select</span></span>').appendTo(q);
				if (l) {
					g.buffer = [];
					a(g.cat('<input style="display:none;" type="text" ').catIf('value="', o, '" ', o).catIf('name="', m, '" ', m).cat("/>").string()).insertAfter(q)
				}
			};
			this.text = function(q) {
				return a(['<span class="t-input">', q.text || "&nbsp;", "</span>"].join(""))
			}
		},
		initialize: function() {
			this.previousValue = this.value();
			b.bind(this, {
				dataBinding: this.onDataBinding,
				dataBound: this.onDataBound,
				error: this.onError,
				open: this.onOpen,
				close: this.onClose,
				valueChange: this.onChange,
				load: this.onLoad
			})
		},
		common: function() {
			this.open = function() {
				if (!this.loader.isAjax() && (!this.data || this.data.length == 0)) {
					return
				}
				var f = this.$wrapper || this.$element,
					g = this.dropDown,
					h = g.$element.css("z-index");
				var j = {
					offset: f.offset(),
					outerHeight: f.outerHeight(),
					outerWidth: f.outerWidth(),
					zIndex: h && h != "auto" ? h : b.getElementZIndex(f[0])
				};
				if (g.$items) {
					g.open(j)
				} else {
					this.fill(function() {
						g.open(j)
					})
				}
			};
			this.close = function() {
				this.dropDown.close()
			};
			this.dataBind = function(f, o) {
				this.data = f = (f || []);
				var k = -1,
					m = f.length,
					n = this.placeholder;
				if (n && f[0] && f[0].Text !== n) {
					var g = [{
						Text: n,
						Value: ""
					}];
					for (var j = 0; j < m; j++) {
						g.push(f[j])
					}
					this.data = f = g
				}
				for (var h = 0; h < m; h++) {
					var l = f[h];
					if (l) {
						if (l.Selected) {
							k = h
						}
					}
				}
				this.dropDown.dataBind(f, this.encoded);
				if (k != -1) {
					this.index = k;
					this.select(k)
				}
				if (!o) {
					this.text("");
					this.$element.val("");
					if (this.filteredDataIndexes) {
						this.filteredDataIndexes = null
					}
				}
			};
			this.highlight = function(f) {
				var k = function(l) {
						var m = l.dropDown;
						l.close();
						if (!m.$items) {
							m.dataBind(l.data, l.encoded)
						}
						m.$items.removeClass("t-state-selected").eq(h).addClass("t-state-selected")
					};
				var h = -1;
				if (!this.data) {
					return h
				}
				if (!isNaN(f - 0)) {
					if (f > -1 && f < this.data.length) {
						h = f;
						k(this)
					}
				} else {
					if (a.isFunction(f)) {
						for (var g = 0, j = this.data.length; g < j; g++) {
							if (f(this.data[g])) {
								h = g;
								break
							}
						}
						if (h != -1) {
							k(this)
						}
					} else {
						h = this.dropDown.highlight(f)
					}
				}
				return h
			}
		},
		filtering: function() {
			this.filter = function(g) {
				g.isFiltered = true;
				var p = true,
					h = g.data,
					m = g.$text[0],
					s = m.value,
					t = g.trigger,
					j = g.dropDown;
				s = this.multiple(s);
				if (s.length < g.minChars) {
					return
				}
				var l = g.filter;
				if (g.loader.isAjax()) {
					if (g.cache && h && h.length > 0) {
						g.filters[l](g, h, s);
						var k = g.filteredDataIndexes;
						if ((k && k.length > 0) || (l == 0 && g.selectedIndex != -1)) {
							p = false
						}
					}
					if (p) {
						var q = {};
						q[g.queryString.text] = s;
						g.loader.ajaxRequest(function(v) {
							var x = g.trigger;
							var w = g.dropDown;
							if (v && v.length == 0) {
								w.close();
								w.dataBind();
								return
							}
							g.data = v;
							b.trigger(g.element, "dataBound");
							g.filters[l](g, v, s);
							var u = w.$items;
							if (u.length > 0) {
								if (!w.isOpened()) {
									x.open()
								}
								g.filtering.autoFill(g, u.first().text())
							} else {
								x.close()
							}
						}, {
							data: q
						})
					}
				} else {
					p = false;
					g.filters[l](g, g.data, s)
				}
				if (!p) {
					var f = j.$items;
					if (!f) {
						return
					}
					var n = f.length,
						r = g.selectedIndex;
					var o = l == 0 ? r != -1 ? f[r].innerText || f[r].textContent : "" : f.length > 0 ? f.first().text() : "";
					this.autoFill(g, o);
					if (n == 0) {
						t.close()
					} else {
						if (!j.isOpened()) {
							t.open()
						}
					}
				}
			};
			this.multiple = function(f) {
				return f
			}
		},
		filters: function() {
			this.filters = [function f(h, j, m) {
				if (!j || j.length == 0) {
					return
				}
				var k = h.dropDown;
				var g = k.$items;
				if (!g || g.length == 0 || h.loader.isAjax()) {
					k.dataBind(j, h.encoded);
					g = k.$items
				}
				for (var l = 0, o = j.length; l < o; l++) {
					if (j[l].Text.slice(0, m.length).toLowerCase() == m.toLowerCase()) {
						var n = g[l];
						h.selectedIndex = l;
						k.highlight(n);
						k.scrollTo(n);
						return
					}
				}
				g.removeClass("t-state-selected");
				h.selectedIndex = -1;
				b.list.highlightFirstOnFilter(h, g)
			},
			c(false, function(g, h) {
				return h.slice(0, g.length).toLowerCase() == g.toLowerCase()
			}), c(true, function(g, h) {
				return h && h.toLowerCase().indexOf(g.toLowerCase()) != -1
			})]
		},
		loader: function(g) {
			this.ajaxError = false;
			this.component = g;
			this.isAjax = function() {
				return g.ajax || g.ws || g.onDataBinding
			};

			function f(h, j) {
				var k = {
					url: (g.ajax || g.ws)["selectUrl"],
					type: "POST",
					data: {},
					dataType: "text",
					error: function(m, l) {
						g.loader.ajaxError = true;
						if (b.ajaxError(g.element, "error", m, l)) {
							return
						}
					},
					complete: a.proxy(function() {
						this.hideBusy()
					}, g.loader),
					success: function(l, n, o) {
						try {
							l = eval("(" + l + ")")
						} catch (m) {
							if (!b.ajaxError(g.element, "error", o, "parseeror")) {
								alert("Error! The requested URL did not return JSON.")
							}
							g.loader.ajaxError = true;
							return
						}
						l = l.d || l;
						if (h) {
							h.call(g, l)
						}
					}
				};
				a.extend(k, j);
				if (g.ws) {
					k.data = b.toJson(k.data);
					k.contentType = "application/json; charset=utf-8"
				}
				return k
			}
			this.ajaxRequest = function(h, k) {
				var j = {};
				if (b.trigger(g.element, "dataBinding", j)) {
					return
				}
				if (g.ajax || g.ws) {
					this.showBusy();
					a.ajax(f(h, {
						data: a.extend({}, k ? k.data : {}, j.data)
					}))
				} else {
					if (h) {
						h.call(g, g.data)
					}
				}
			}, this.showBusy = function() {
				this.busyTimeout = setTimeout(a.proxy(function() {
					this.component.$wrapper.find("> .t-dropdown-wrap .t-icon").addClass("t-loading")
				}, this), 100)
			}, this.hideBusy = function() {
				clearTimeout(this.busyTimeout);
				this.component.$wrapper.find("> .t-dropdown-wrap .t-icon").removeClass("t-loading")
			}
		},
		trigger: function(f) {
			this.component = f;
			this.change = function() {
				var g = f.previousValue;
				var h = f.value();
				if (g == undefined || h != g) {
					b.trigger(f.element, "valueChange", {
						value: h
					})
				}
				f.previousValue = h
			};
			this.open = function() {
				var g = f.dropDown;
				if ((g.$items && g.$items.length > 0) && !g.isOpened() && !b.trigger(f.element, "open")) {
					f.open()
				}
			};
			this.close = function() {
				var g = f.dropDown;
				if ((g.$element.is(":animated") || g.isOpened()) && !b.trigger(f.element, "close")) {
					f.close()
				}
			}
		},
		retrieveData: function(l) {
			var j = [];
			var g = a(l).find("option");
			for (var h = 0, k = g.length; h < k; h++) {
				var f = g.eq(h);
				j[h] = {
					Text: f.text(),
					Value: f.val(),
					Selected: f.is(":selected")
				}
			}
			return j
		},
		highlightFirstOnFilter: function(g, f) {
			if (g.highlightFirst) {
				f.first().addClass("t-state-selected");
				g.dropDown.scrollTo(f[0])
			}
		},
		moveToEnd: function(f) {
			if (f.createTextRange) {
				var g = f.createTextRange();
				g.moveStart("textedit", 1);
				g.select()
			}
		},
		selection: function(g, j, f) {
			if (g.createTextRange) {
				var h = g.createTextRange();
				h.collapse(true);
				h.moveStart("character", j);
				h.moveEnd("character", f - j);
				h.select()
			} else {
				if (g.selectionStart) {
					g.selectionStart = j;
					g.selectionEnd = f
				}
			}
		},
		updateTextAndValue: function(f, g, j) {
			f.text(g);
			var h = j === null ? g : j;
			f.$element.val(h)
		},
		getZIndex: function(f) {
			var g = "auto";
			a(f).parents().andSelf().each(function() {
				g = a(this).css("zIndex");
				if (Number(g)) {
					g = Number(g) + 1;
					return false
				}
			});
			return g
		},
		keycodes: [8, 9, 13, 27, 37, 38, 39, 40, 35, 36]
	};

	function c(g, f) {
		return function(j, k, n) {
			if (!k || k.length == 0) {
				return
			}
			var l = a.map(k, function(p, o) {
				var q = p.Text;
				if (f(n, q !== undefined ? q : p)) {
					return o
				}
			});
			var m = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + n.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", g ? "ig" : "i");
			j.filteredDataIndexes = l;
			j.selectedIndex = -1;
			j.dropDown.onItemCreate = function(o) {
				if (n) {
					o.html = o.html.replace(m, "<strong>$1</strong>")
				}
			};
			j.dropDown.dataBind(a.map(l, function(p, o) {
				return k[p]
			}), j.encoded);
			var h = j.dropDown.$items;
			h.removeClass("t-state-selected");
			b.list.highlightFirstOnFilter(j, h)
		}
	}
	function d(g, f, k) {
		if (!g || !f) {
			return null
		}
		var l = k.length;
		k = k.toLowerCase();
		for (var h = 0, j = g.length; h < j; h++) {
			if (g[h].Text.slice(0, l).toLowerCase() == k) {
				return f[h]
			}
		}
	}
	b.dropDownList = function(l, p) {
		if (p && p.enabled === undefined) {
			p.enabled = !a(l).is("[disabled]")
		}
		a.extend(this, p);
		var m = l.nodeName.toLowerCase() == "select";
		if (m && !this.data) {
			this.data = b.list.retrieveData(l);
			new b.list.htmlBuilder(l, "t-dropdown", m).render();
			l = l.previousSibling
		}
		var j = "";
		this.element = l;
		var r = this;
		var f = this.$element = a(l).closest("form").bind("reset", function() {
			setTimeout(function() {
				r.value(l.value)
			})
		}).end();
		this.loader = new b.list.loader(this);
		this.trigger = new b.list.trigger(this);
		this.$wrapper = f.closest(".t-dropdown");
		var g = this.$text = this.$wrapper.find("> .t-dropdown-wrap > .t-input");
		if (!this.$wrapper.attr("tabIndex")) {
			this.$wrapper.attr("tabIndex", 0)
		}
		this.dropDown = new b.dropDown({
			attr: this.dropDownAttr,
			effects: this.effects,
			onClick: a.proxy(function(t) {
				this.select(t.item);
				this.trigger.change();
				this.trigger.close();
				this.$wrapper.focus()
			}, this)
		});
		this.dropDown.$element.css("direction", this.$wrapper.closest(".t-rtl").length ? "rtl" : "");
		var s = function(v) {
				var t = "class",
					u = f.attr(t);
				if ((v.attrName && v.attrName == "class") || (v.propertyName && v.propertyName == "className")) {
					var w = f.prev(".t-dropdown-wrap");
					var x = /\b(t-state-[\w]+)\b/.exec(w.attr(t));
					if (!(x && x[0])) {
						x = ""
					} else {
						x = x[0]
					}
					if (u != w.attr(t)) {
						w.attr(t, u).addClass("t-dropdown-wrap " + x)
					}
				}
			};
		if (a.browser.msie && ((trim_Version == "MSIE8.0" || trim_Version == "MSIE7.0"))) {//jia 0915 add IE surport attachEvent
			l.attachEvent("onpropertychange", s)
		} else {
			f.bind("DOMAttrModified", s)
		}
		this.fill = function(t, w) {
			function x(z) {
				var C, D = z.selectedValue || z.value();
				if (D) {
					C = function(E) {
						return D == (E.Value || E.Text)
					}
				} else {
					var y = z.dropDown.$items,
						A = z.index,
						B = y.filter(".t-state-selected").length;
					C = A != -1 && A < y.length ? A : B > 0 ? B - 1 : 0
				}
				z.select(C)
			}
			var u = this.dropDown,
				v = this.loader;
			if (!u.$items && !v.ajaxError) {
				if (v.isAjax()) {
					w = w || {};
					v.ajaxRequest(function(y) {
						this.dataBind(y, true);
						x(this);
						b.trigger(this.element, "dataBound");
						this.trigger.change();
						if (t) {
							t()
						}
					}, w)
				} else {
					this.dataBind(this.data);
					x(this);
					if (t) {
						t()
					}
				}
			}
		};
		this.enable = function() {
			var t = this.$wrapper.removeClass("t-state-disabled");
			if (!t.data("events")) {
				this.$wrapper.removeClass("t-state-disabled").bind({
					keydown: a.proxy(n, this),
					keypress: a.proxy(o, this),
					click: a.proxy(function(v) {
						var w = this.trigger;
						var u = this.dropDown;
						this.$wrapper.focus();
						if (u.isOpened()) {
							w.close()
						} else {
							if (!u.$items) {
								this.fill(w.open)
							} else {
								w.open()
							}
						}
					}, this),
					focus: a.proxy(function() {
						this.$wrapper.find(".t-dropdown-wrap").addClass("t-state-focused").removeClass("t-state-default")
					}, this),
					blur: a.proxy(function() {
						this.$wrapper.find(".t-dropdown-wrap").addClass("t-state-default").removeClass("t-state-focused")
					}, this)
				})
			}
			f.removeAttr("disabled")
		};
		this.disable = function() {
			f.attr("disabled", "disabled");
			this.$wrapper.addClass("t-state-disabled").unbind()
		};
		this.reload = function() {
			this.dropDown.$items = null;
			if (arguments.length) {
				this.fill(arguments[0], arguments[1])
			} else {
				this.fill()
			}
		};
		this.select = function(u) {
			var t = this.highlight(u);
			if (t != -1) {
				this.selectedIndex = t;
				b.list.updateTextAndValue(this, this.data[t].Text, this.data[t].Value)
			}
			return t
		};
		this.text = function(t) {
			if (t !== undefined) {
				if (this.encoded) {
					t = b.encode(t)
				}
				this.$text.html(t && t.replace(e, "") ? t : "&nbsp;")
			} else {
				return this.$text.html()
			}
		};
		this.value = function(u) {
			if (u !== undefined) {
				var t = this.select(function(v) {
					return u == v.Value
				});
				if (t == -1) {
					t = this.select(function(v) {
						return u == v.Text
					})
				}
				if (t != -1) {
					this.previousValue = this.$element.val()
				}
			} else {
				return this.$element.val()
			}
		};
		b.list.common.call(this);
		b.list.initialize.call(this);
		a(document.documentElement).bind("mousedown", a.proxy(function(u) {
			var t = this.dropDown.$element;
			var v = t && t.parent().length > 0;
			if (a.contains(this.$wrapper[0], u.target) || (v && a.contains(t.parent()[0], u.target))) {
				return
			}
			this.trigger.change();
			this.trigger.close()
		}, this));
		this[this.enabled ? "enable" : "disable"]();

		function q() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(a.proxy(function() {
				j = ""
			}, this), this.delay)
		}
		function n(y) {
			var B = this.trigger;
			var x = this.dropDown;
			var A = y.keyCode || y.which;
			if (y.altKey && (A == 38 || A == 40)) {
				var w = A == 38 ? B.close : B.open;
				if (!x.$items) {
					this.fill(w)
				} else {
					w()
				}
				return
			}
			if (A > 34 && A < 41) {
				y.preventDefault();
				if (!x.$items) {
					this.fill();
					return
				}
				var u = x.$items,
					v = a(u[this.selectedIndex]);
				var t = (A == 35) ? u.last() : (A == 36) ? u.first() : (A == 37 || A == 38) ? v.prev() : (A == 39 || A == 40) ? v.next() : [];
				if (t.length) {
					var z = t[0];
					this.select(z);
					x.scrollTo(z);
					if (!x.isOpened()) {
						B.change()
					}
				}
			}
			if (A == 8) {
				a.proxy(q, this)();
				y.preventDefault();
				j = j.slice(0, -1)
			}
			if (A == 9 || A == 13 || A == 27) {
				B.change();
				B.close()
			}
		}
		function o(u) {
			var t = this.dropDown;
			var v = u.keyCode || u.charCode;
			if (v == 0 || a.inArray(v, b.list.keycodes) != -1 || u.ctrlKey || u.altKey || u.shiftKey) {
				return
			}
			if (!t.$items) {
				this.fill(a.proxy(function() {
					h(v)
				}, this));
				return
			}
			h(v)
		}
		var h = a.proxy(function h(v) {
			var t = this.dropDown;
			var w = j;
			w += String.fromCharCode(v);
			if (w) {
				var u = d(this.data, t.$items, w);
				if (u) {
					this.select(u);
					t.scrollTo(u)
				}
				j = w
			}
			a.proxy(q, this)()
		}, this);
		if (r.cascadeTo) {
			var k = a("#" + r.cascadeTo).attr("disabled", "disabled");
			r.$element.bind("valueChange", a.proxy(function() {
				var u = k.data("tDropDownList");
				if (u) {
					var v = [],
						t = {};
					t[r.$element.attr("name")] = r.value();
					if (u.loader.isAjax()) {
						if (r.placeholder) {
							v[0] = {
								Text: r.placeholder,
								Value: ""
							}
						}
						u.dataBind(v)
					}
					u.select(0);
					u.disable();
					if (r.value() === "" && r.placeholder) {
						u.$element.trigger("valueChange");
						return
					}
					u.reload(function() {
						var w = v[0] ? 1 : 0;
						if (u.data[w]) {
							u.enable()
						}
					}, {
						data: t
					})
				}
			}, r))
		}
	};
	a.fn.tDropDownList = function(f) {
		return b.create(this, {
			name: "tDropDownList",
			init: function(g, h) {
				return new b.dropDownList(g, h)
			},
			options: f
		})
	};
	a.fn.tDropDownList.defaults = {
		effects: b.fx.slide.defaults(),
		accessible: false,
		index: 0,
		delay: 500,
		encoded: true
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.autocomplete.js");
	b.autocomplete = function(d, f) {
		a.extend(this, f);
		var c = this.$element = a(d).addClass("t-widget t-autocomplete t-input").attr("autocomplete", "off").bind("paste", a.proxy(function(j) {
			g(this)
		}, this));
		this.$text = c;
		this.element = d;
		this.trigger = new b.list.trigger(this);
		this.trigger.change = function() {
			var k = this.component.text();
			var j = this.component.previousValue;
			if (j == undefined || k != j) {
				b.trigger(this.component.element, "valueChange", {
					value: k
				})
			}
			this.component.previousValue = k
		};
		this.loader = new b.list.loader(this);
		this.loader.showBusy = function() {
			this.busyTimeout = setTimeout(a.proxy(function() {
				this.component.$element.addClass("t-loading")
			}, this), 100)
		};
		this.loader.hideBusy = function() {
			clearTimeout(this.busyTimeout);
			this.component.$element.removeClass("t-loading")
		};
		this.filtering = new b.list.filtering(this);
		this.filtering.autoFill = function(j, n) {
			if (j.autoFill && (j.lastKeyCode != 8 && j.lastKeyCode != 46)) {
				var m = j.$text[0],
					v = m.value,
					r = j.separator,
					k = b.caretPos(m),
					q = j.multiple;
				var o = q && r ? b.lastIndexOf(v.substring(0, k), r) : -1;
				var t = o != -1 ? o + r.length : 0;
				var l = v.substring(t, k);
				var p = n.toLowerCase().indexOf(l.toLowerCase());
				if (p != -1) {
					var u = n.substring(p + l.length);
					if (q) {
						var s = v.split(r),
							w = h(m, r);
						s[w] = l + u;
						m.value = s.join(r) + (j.multiple && w != 0 && w == s.length - 1 ? r : "")
					} else {
						m.value = l + u
					}
					b.list.selection(m, k, k + u.length)
				}
			}
		};
		this.enable = function() {
			c.removeClass("t-state-disabled").removeAttr("disabled")
		};
		this.disable = function() {
			c.addClass("t-state-disabled").attr("disabled", "disabled")
		};
		this.filtering.multiple = a.proxy(function(j) {
			if (this.multiple) {
				j = j.split(this.separator);
				j = j[h(this.$text[0], this.separator)]
			}
			return j
		}, this);
		this.dropDown = new b.dropDown({
			attr: this.dropDownAttr,
			effects: this.effects,
			onClick: a.proxy(function(j) {
				this.select(j.item);
				this.trigger.change();
				this.trigger.close()
			}, this)
		});
		this.dropDown.$element.css("direction", c.closest(".t-rtl").length ? "rtl" : "");
		this.fill = function(j) {
			function l(s) {
				var r = s.highlightFirst ? k.$items.first() : null;
				if (r) {
					r.addClass("t-state-selected")
				}
			}
			var m = this.loader;
			var k = this.dropDown;
			var n = this.minChars;
			var p = this.text();
			var q = p.length;
			if (!k.$items && !m.ajaxError) {
				if ((m.isAjax() || this.onDataBinding) && q >= n) {
					var o = {};
					o[this.queryString.text] = p;
					m.ajaxRequest(function(r) {
						this.dataBind(r, true);
						l(this);
						b.trigger(this.element, "dataBound");
						this.trigger.change();
						if (j) {
							j()
						}
					}, {
						data: o
					})
				} else {
					this.dataBind(this.data, true);
					l(this);
					if (j) {
						j()
					}
				}
			}
		};
		this.text = function() {
			if (arguments.length > 0) {
				this.previousValue = arguments[0]
			}
			return this.$text.val.apply(this.$text, arguments)
		};
		this.value = function() {
			return this.text.apply(this, arguments)
		};
		this.select = function(n) {
			var m = this.highlight(n);
			if (m == -1) {
				return m
			}
			var l = this.filteredDataIndexes;
			var o = (l && l.length) > 0 ? l[m] : m;
			var n = this.data[o];
			var k = n.Text ? n.Text : n;
			var q = k;
			if (this.multiple) {
				var j = this.$element;
				var p = this.separator;
				var r = h(j[0], p);
				q = j.val().split(p);
				q[r] = k;
				q = q.join(p) + (r == q.length - 1 ? p : "")
			}
			this.$text.val(q)
		};
		b.list.common.call(this);
		b.list.filters.call(this);
		b.list.initialize.call(this);
		this.dataBind = function(j, k) {
			this.data = j = (j || []);
			this.dropDown.dataBind(j, this.encoded);
			if (!k) {
				this.$text.val("")
			}
		};
		c.bind({
			focus: a.proxy(function(j) {
				j.stopPropagation()
			}, this),
			keydown: a.proxy(e, this),
			keypress: a.proxy(function(j) {
				var k = j.keyCode || j.charCode;
				if (k == 0 || a.inArray(k, b.list.keycodes) != -1 || j.ctrlKey) {
					return true
				}
			}, this)
		});
		a(document.documentElement).bind("mousedown", a.proxy(function(k) {
			var j = this.dropDown.$element.parent();
			var l = j.length;
			if ((!l && d !== k.target) || (l && !a.contains(d, k.target) && !a.contains(j[0], k.target))) {
				this.trigger.change();
				this.trigger.close()
			}
		}, this));

		function h(j, k) {
			return j.value.substring(0, b.caretPos(j)).split(k).length - 1
		}
		function g(j) {
			clearTimeout(j.timeout);
			j.timeout = setTimeout(function() {
				j.filtering.filter(j)
			}, j.delay)
		}
		function e(p) {
			var u = this.trigger;
			var o = this.dropDown;
			var r = p.keyCode || p.which;
			this.lastKeyCode = r;
			if (!p.shiftKey && r > 36 && r < 41 && r != 37 && r != 39) {
				p.preventDefault();
				if (o.isOpened()) {
					if (!o.$items) {
						this.fill()
					}
					var l = o.$items;
					var m = l.filter(".t-state-selected:first");
					var k = [];
					if (r == 38) {
						var t = m.prev();
						k = t.length ? t : l.last()
					} else {
						if (r == 40) {
							var s = m.next();
							k = s.length ? s : l.first()
						}
					}
					if (k.length) {
						var q = k[0];
						this.highlight(q);
						o.scrollTo(q);
						this.filtering.autoFill(this, k.text())
					}
				}
				return
			}
			if (r == 8 || r == 46) {
				var j = this.$element;
				if (j.val() != "") {
					g(this)
				}
				setTimeout(a.proxy(function() {
					if (j.val() == "") {
						u.close()
					}
				}, this), 0);
				return
			}
			if (r == 13) {
				if (o.isOpened()) {
					p.preventDefault()
				}
				if (o.$items) {
					var n = o.$items.filter(".t-state-selected:first");
					if (n.length > 0) {
						this.select(n[0])
					}
				}
				u.change();
				u.close();
				b.list.moveToEnd(this.element);
				return
			}
			if (r == 27 || r == 9) {
				clearTimeout(this.timeout);
				u.change();
				u.close();
				return
			}
			g(this)
		}
	};
	a.fn.tAutoComplete = function(c) {
		return b.create(this, {
			name: "tAutoComplete",
			init: function(d, e) {
				return new b.autocomplete(d, e)
			},
			options: c
		})
	};
	a.fn.tAutoComplete.defaults = {
		encoded: true,
		effects: b.fx.slide.defaults(),
		filter: 1,
		delay: 200,
		minChars: 1,
		cache: true,
		autoFill: false,
		highlightFirst: false,
		queryString: {
			text: "text"
		},
		multiple: false,
		separator: ", "
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		e = /{0:?/,
		c = /{0:?(\S|\s)*}/;
	b.scripts.push("telerik.calendar.js");

	function d(h, g, f) {
		var j = new b.datetime();
		if (h) {
			j = new b.datetime(h)
		}
		if (g > j.value) {
			j = new b.datetime(g)
		} else {
			if (f < j.value) {
				j = new b.datetime(f)
			}
		}
		return b.datetime.firstDayOfMonth(j)
	}
	a.extend(b, {
		calendar: function(f, k) {
			this.element = f;
			a.extend(this, k);
			var j = new b.datetime(this.minDate);
			var h = new b.datetime(this.maxDate);
			this.currentView = b.calendar.views[0];
			this.viewedMonth = d(this.selectedDate, this.minDate, this.maxDate);
			var g = new b.stringBuilder().cat('<a href="#" class="t-link t-nav-prev').catIf(" t-state-disabled", this.currentView.compare(this.viewedMonth, j, false) <= 0).cat('">').cat('<span class="t-icon t-arrow-prev"></span></a><a href="#" class="t-link t-nav-fast">').cat(this.currentView.title(this.viewedMonth)).cat("</a>").cat('<a href="#" class="t-link t-nav-next').catIf(" t-state-disabled", this.currentView.compare(this.viewedMonth, h, true) >= 0).cat('"><span class="t-icon t-arrow-next"></span></a>');
			a(".t-header", this.element).html(g.string());
			a(".t-nav-next:not(.t-state-disabled)", f).live("click", a.proxy(this.navigateToFuture, this));
			a(".t-nav-prev:not(.t-state-disabled)", f).live("click", a.proxy(this.navigateToPast, this));
			a(".t-nav-fast:not(.t-state-disabled)", f).live("click", a.proxy(this.navigateUp, this));
			a(".t-link.t-state-disabled", f).live("click", b.preventDefault);
			a("td:not(.t-state-disabled):has(.t-link)", f).live("mouseenter", b.hover).live("mouseleave", b.leave).live("click", a.proxy(this.navigateDown, this));
			b.bind(this, {
				change: this.onChange,
				load: this.onLoad
			});
			this._footer(this.todayFormat)
		}
	});
	b.calendar.prototype = {
		stopAnimation: false,
		updateSelection: function() {
			var g = b.datetime.firstDayOfMonth(this.viewedMonth).toDate();
			var h = new b.datetime(g).date(32).date(0).toDate();
			if (this.selectedDate === null || !b.calendar.isInRange(this.selectedDate, g, h)) {
				var k = d(this.selectedDate, this.minDate, this.maxDate);
				this.goToView(0, k)
			}
			var j = this;
			var f = a(".t-content td:not(.t-other-month)", this.element).removeClass("t-state-selected");
			if (this.selectedDate !== null) {
				f.filter(function() {
					return (parseInt(a(this).text(), 10) == j.selectedDate.getDate())
				}).addClass("t-state-selected")
			}
		},
		value: function() {
			if (arguments.length == 0) {
				return this.selectedDate
			}
			if (arguments.length == 1) {
				this.selectedDate = arguments[0] === null ? null : new Date(arguments[0].value ? arguments[0].value : arguments[0])
			} else {
				if (arguments.length > 1) {
					this.selectedDate = new Date(arguments[0], arguments[1], arguments[2])
				}
			}
			this.updateSelection();
			return this
		},
		overlay: function(g) {
			if (!g) {
				return a(".t-overlay", this.element).remove()
			}
			var f = a("<div/>").addClass("t-overlay").css({
				opacity: 0,
				width: this.element.offsetWidth,
				height: this.element.offsetHeight,
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 3,
				backgroundColor: "#fff"
			});
			a(this.element).find(".t-header").after(f)
		},
		goToView: function(j, h) {
			if (j < 0 || b.calendar.views.length <= j) {
				return
			}
			var g = new b.datetime(this.minDate);
			var f = new b.datetime(this.maxDate);
			if (typeof h != "undefined") {
				h = h.value ? h : new b.datetime(h);
				this.viewedMonth = b.datetime.firstDayOfMonth(h)
			}
			this.currentView = b.calendar.views[j];
			a(".t-nav-prev", this.element).toggleClass("t-state-disabled", this.currentView.compare(h, g, false) <= 0);
			a(".t-nav-next", this.element).toggleClass("t-state-disabled", this.currentView.compare(h, f, true) >= 0);
			a(".t-nav-fast", this.element).html(this.currentView.title(h)).toggleClass("t-state-disabled", j == b.calendar.views.length - 1);
			a(".t-content", this.element).html(this.currentView.body(h, g, f, this.selectedDate ? new b.datetime(this.selectedDate) : null, this.urlFormat, this.dates)).toggleClass("t-meta-view", j == 1 || j == 2);
			return this
		},
		navigateVertically: function(w, v, t, u) {
			v = new b.datetime(v);
			this.viewedMonth = b.datetime.firstDayOfMonth(v);
			this.currentView = b.calendar.views[w];
			this.overlay(true);
			var l = new b.datetime(this.minDate);
			var h = new b.datetime(this.maxDate);
			var n = a(".t-content", this.element);
			var r = n.outerWidth();
			var p = n.outerHeight();
			var o = n.css("font-size");
			var q = n.css("line-height");
			if (q === "normal") {
				q = parseInt(o) * 1.5
			}
			n.find("td").removeClass("t-state-hover");
			a(".t-nav-fast", this.element).html(this.currentView.title(v)).toggleClass("t-state-disabled", w == b.calendar.views.length - 1);
			a(".t-nav-prev", this.element).toggleClass("t-state-disabled", this.currentView.compare(this.viewedMonth, l, false) <= 0);
			a(".t-nav-next", this.element).toggleClass("t-state-disabled", this.currentView.compare(this.viewedMonth, h, true) >= 0);
			var m = a('<table class="t-content" cellspacing="0"></table>').html(this.currentView.body(v, l, h, this.selectedDate ? new b.datetime(this.selectedDate) : null, this.urlFormat, this.dates)).toggleClass("t-meta-view", w == 1 || w == 2);
			var k = this;
			var j = {
				fontSize: o,
				lineHeight: q,
				top: 0,
				left: 0,
				width: r,
				height: p,
				opacity: 1
			};
			var s;
			if (t) {
				s = b.fx._wrap(n).css({
					overflow: "hidden",
					position: "relative"
				});
				m.wrap(a("<div/>").addClass("t-animation-container").css(a.extend({
					position: "absolute",
					zIndex: 1,
					fontSize: 1,
					lineHeight: 1,
					width: u.outerWidth(),
					height: u.outerHeight(),
					opacity: 0
				}, u.position()))).parent().insertAfter(n);
				if (!this.stopAnimation) {
					m.parent().animate({
						fontSize: o,
						lineHeight: q,
						top: 0,
						left: 0,
						width: r,
						height: p,
						opacity: 1
					}, "normal", function() {
						a(k.element).find(".t-header").after(m);
						s.remove();
						k.overlay(false)
					})
				} else {
					n.remove();
					a(k.element).find(".t-header").after(m);
					s.remove();
					k.overlay(false)
				}
			} else {
				m.insertBefore(n);
				s = b.fx._wrap(m).css({
					overflow: "hidden",
					position: "relative"
				});
				var g;
				if (w != 0) {
					g = b.calendar.views[w].verticalDate(this.viewedMonth)
				}
				var f = {
					top: (Math.floor(g / 4) * p) / 3,
					left: ((g % 4) * r) / 4
				};
				n.wrap(a("<div/>").addClass("t-animation-container").css(a.extend({
					position: "absolute"
				}, j))).parent().insertAfter(m);
				if (!this.stopAnimation) {
					n.parent().animate(a.extend({
						fontSize: 1,
						lineHeight: 1,
						width: 48,
						height: 54,
						opacity: 0
					}, f), "normal", function() {
						a(k.element).find(".t-header").after(m);
						s.remove();
						k.overlay(false)
					})
				} else {
					n.remove();
					a(k.element).find(".t-header").after(m);
					s.remove();
					k.overlay(false)
				}
			}
			b.trigger(this.element, "navigate", {
				direction: t
			})
		},
		navigateHorizontally: function(o, n, g) {
			n = new b.datetime(n);
			var k = new b.datetime(this.minDate);
			var h = new b.datetime(this.maxDate);
			this.viewedMonth = b.datetime.firstDayOfMonth(b.calendar.fitDateToRange(n, k, h));
			this.currentView = b.calendar.views[o];
			a(".t-nav-fast", this.element).html(this.currentView.title(n)).toggleClass("t-state-disabled", o == b.calendar.views.length - 1);
			a(".t-nav-prev", this.element).toggleClass("t-state-disabled", this.currentView.compare(this.viewedMonth, k, false) <= 0);
			a(".t-nav-next", this.element).toggleClass("t-state-disabled", this.currentView.compare(this.viewedMonth, h, true) >= 0);
			this.overlay(true);
			var l = a('<table class="t-content" cellspacing="0"></table>').html(this.currentView.body(n, k, h, this.selectedDate ? new b.datetime(this.selectedDate) : null, this.urlFormat, this.dates)).toggleClass("t-meta-view", o == 1 || o == 2);
			var m = a(".t-content", this.element);
			var p = m.outerWidth();
			m.add(l).css({
				width: p,
				"float": "left"
			});
			var f = b.fx._wrap(m).css({
				position: "relative",
				width: p * 2,
				"float": "left",
				left: (g ? 0 : -200)
			});
			l[g ? "insertAfter" : "insertBefore"](m);
			var j = this;
			if (!this.stopAnimation) {
				f.animate({
					left: (g ? -200 : 0)
				}, "normal", function() {
					a(j.element).find(".t-header").after(l);
					f.remove();
					j.overlay(false)
				})
			} else {
				m.remove();
				a(j.element).find(".t-header").after(l);
				f.remove();
				j.overlay(false)
			}
			b.trigger(this.element, "navigate", {
				direction: g
			})
		},
		navigateUp: function(g) {
			if (g) {
				g.preventDefault()
			}
			var f = this.currentView.index;
			this.navigateVertically(f + 1, this.viewedMonth.toDate(), false)
		},
		navigateDown: function(k, o, p) {
			var f = a(a(k.target).hasClass("t-input") ? o : k.target);
			var g = f.text();
			var h = p || this.currentView.index;
			var l = f.attr("href");
			if (l && (l.charAt(l.length - 1) == "#")) {
				k.preventDefault()
			}
			if (h == 0) {
				var j = parseInt(g, 10);
				var m = this.viewedMonth.month();
				if (f.parent().hasClass("t-other-month")) {
					m += (j < 15 ? 1 : -1)
				}
				var n = new Date(this.viewedMonth.year(), m, j);
				if (!this.selectedDate || (this.selectedDate > n || n > this.selectedDate)) {
					if (b.trigger(this.element, "change", {
						previousDate: this.selectedDate,
						date: n
					})) {
						return this
					}
					this.selectedDate = n
				}
				this.updateSelection()
			} else {
				if (h != 0) {
					b.calendar.views[h].verticalDate(this.viewedMonth, g)
				}
				this.viewedMonth = b.calendar.fitDateToRange(this.viewedMonth, new b.datetime(this.minDate), new b.datetime(this.maxDate));
				this.navigateVertically(h - 1, this.viewedMonth.toDate(), true, f.add(f.parent()).filter("td"))
			}
		},
		navigateToPast: function(g) {
			if (g) {
				g.preventDefault()
			}
			var f = this.currentView.index;
			if (f == 0) {
				this.viewedMonth.date(1).date(-1)
			} else {
				this.viewedMonth.addYear(-Math.pow(10, f - 1))
			}
			this.navigateHorizontally(f, this.viewedMonth.toDate(), false)
		},
		navigateToFuture: function(g) {
			if (g) {
				g.preventDefault()
			}
			var f = this.currentView.index;
			if (f == 0) {
				this.viewedMonth.date(32).date(1)
			} else {
				this.viewedMonth.addYear(Math.pow(10, f - 1))
			}
			this.navigateHorizontally(f, this.viewedMonth.toDate(), true)
		},
		_footer: function(g) {
			var j = this,
				f = j.footer,
				k = new Date(),
				h = a.telerik.datetime.format(k, g || "d");
			if (!f) {
				j.footer = f = a('<div style="display:none" class="t-footer"><a href="#" class="t-link t-nav-today"></a></div>');
				a(j.element).append(f);
				f.find("a").click(function(l) {
					l.preventDefault();
					if (!j.selectedDate || (j.selectedDate > k || k > j.selectedDate)) {
						if (!b.trigger(j.element, "change", {
							previousDate: j.selectedDate,
							date: k
						})) {
							j.selectedDate = k;
							j.updateSelection()
						}
					}
				})
			}
			f.find("a").attr("title", h).html(h);
			f.toggle( !! g)
		}
	};
	a.fn.tCalendar = function(f) {
		return b.create(this, {
			name: "tCalendar",
			init: function(g, h) {
				return new b.calendar(g, h)
			},
			options: f
		})
	};
	a.fn.tCalendar.defaults = {
		selectedDate: null,
		minDate: new Date(1899, 11, 31),
		maxDate: new Date(2100, 0, 1)
	};
	a.extend(b.calendar, {
		views: [{
			index: 0,
			title: function(f) {
				return new b.stringBuilder().cat(b.cultureInfo.months[f.month()]).cat(" ").cat(f.year()).string()
			},
			body: function(x, q, p, s, w, j) {
				var n = (new b.stringBuilder()).cat("<thead><tr>");
				var m = b.cultureInfo.firstDayOfWeek,
					l = b.cultureInfo.days,
					f = b.cultureInfo.abbrDays,
					u = b.cultureInfo.shortestDays;
				l = l.slice(m).concat(l.slice(0, m));
				f = f.slice(m).concat(f.slice(0, m));
				u = u.slice(m).concat(u.slice(0, m));
				for (var o = 0; o < 7; o++) {
					n.cat('<th scope="col" abbr="').cat(f[o]).cat('" title="').cat(l[o]).cat('">').cat(u[o]).cat("</th>")
				}
				n.cat("</tr></thead><tbody>");
				var h = b.datetime.firstVisibleDay(x);
				var r = x.month();
				var t = s === null ? false : x.year() == s.year();
				var g;
				for (var y = 0; y < 6; y++) {
					n.cat("<tr>");
					for (var k = 0; k < 7; k++) {
						g = h.month() != r ? "t-other-month" : (t && h.month() == s.month() && h.date() == s.date()) ? " t-state-selected" : "";
						n.cat("<td").catIf(' class="' + g + '"', g).cat(">");
						if (b.calendar.isInRange(h.toDate(), q.toDate(), p.toDate())) {
							n.cat('<a href="');
							var v = "#";
							if (w) {
								v = b.calendar.formatUrl(w, h);
								if (j && !b.calendar.isInCollection(h, j)) {
									v = "#"
								}
							}
							n.cat(v).cat('" class="t-link').cat(v != "#" ? " t-action-link" : "").cat('" title="').cat(b.datetime.format(h.toDate(), b.cultureInfo.longDate)).cat('">').cat(h.date()).cat("</a>")
						} else {
							n.cat("&nbsp;")
						}
						n.cat("</td>");
						b.datetime.modify(h, b.datetime.msPerDay)
					}
					n.cat("</tr>")
				}
				n.cat("</tbody>");
				return n.string()
			},
			compare: function(f, j) {
				var m;
				var g = f.month();
				var h = f.year();
				var k = j.month();
				var l = j.year();
				if (h > l) {
					m = 1
				} else {
					if (h < l) {
						m = -1
					} else {
						m = g == k ? 0 : g > k ? 1 : -1
					}
				}
				return m
			},
			firstLastDay: function(g, h, f) {
				return h ? b.datetime.firstDayOfMonth(g) : new b.datetime(g.year(), g.month() + 1, 0)
			},
			navCheck: function(f, g, h) {
				if (h) {
					return new b.datetime(g.year(), g.month() + 1, g.date()).value - f.value <= 0
				} else {
					return this.compare(f, g) === -1
				}
			}
		}, {
			index: 1,
			title: function(f) {
				return f.year()
			},
			body: function(h, g, f) {
				return b.calendar.metaView(true, h, function() {
					var l = [];
					var m = 0;
					var j = 11;
					if (g.year() == f.year()) {
						m = g.month();
						j = f.month()
					} else {
						if (h.year() == g.year()) {
							m = g.month()
						} else {
							if (h.year() == f.year()) {
								j = f.month()
							}
						}
					}
					for (var k = 0; k < 12; k++) {
						if (k >= m && k <= j) {
							l.push(b.cultureInfo.abbrMonths[k])
						} else {
							l.push("&nbsp;")
						}
					}
					return l
				})
			},
			compare: function(f, g) {
				return f.year() > g.year() ? 1 : f.year() < g.year() ? -1 : 0
			},
			verticalDate: function(g, f) {
				if (!f) {
					return g.month()
				}
				g.month(a.inArray(f, b.cultureInfo.abbrMonths))
			},
			firstLastDay: function(f, g) {
				return new b.datetime(f.year(), g ? 0 : 11, 1)
			},
			navCheck: function(f, g, h) {
				var j = this.compare(f, g);
				return h ? j == 1 : j == -1
			}
		}, {
			index: 2,
			title: function(g) {
				var f = g.year() - g.year() % 10;
				return f + "-" + (f + 9)
			},
			body: function(h, g, f) {
				return b.calendar.metaView(false, h, function() {
					var m = [];
					var l = g.year();
					var k = f.year();
					var n = h.year() - h.year() % 10 - 1;
					for (var j = 0; j < 12; j++) {
						m.push(n + j >= l && n + j <= k ? n + j : "&nbsp;")
					}
					return m
				})
			},
			compare: function(g, h, f) {
				var l = g.year();
				var k = (l - l % 10);
				var j = (l - l % 10 + 9);
				return b.calendar.check(k, j, h, f)
			},
			verticalDate: function(g, f) {
				if (!f) {
					return g.year() % 10 + 1
				}
				g.year(f)
			},
			firstLastDay: function(f, g) {
				return new b.datetime(f.year() - f.year() % 10 + (g ? 0 : 9), 0, 1)
			},
			navCheck: function(f, g, h) {
				var j = this.compare(g, f, h);
				return h ? j == -1 : j == 1
			}
		}, {
			index: 3,
			title: function(g) {
				var f = g.year() - g.year() % 100;
				return f + "-" + (f + 99)
			},
			body: function(h, g, f) {
				return b.calendar.metaView(false, h, function() {
					var j = h.year() - h.year() % 100;
					var m = [];
					for (var l = -1; l < 11; l++) {
						var k = j + l * 10;
						if ((k + 10) >= g.year() && k <= f.year()) {
							m.push(k + "-<br />" + (k + 9) + "&nbsp;")
						} else {
							m.push("&nbsp;<br />&nbsp;")
						}
					}
					return m
				})
			},
			compare: function(g, h, f) {
				var l = g.year();
				var k = (l - l % 100);
				var j = (l - l % 100 + 99);
				return b.calendar.check(k, j, h, f)
			},
			verticalDate: function(g, f) {
				if (!f) {
					return Math.ceil(g.year() / 10) % 10 + 1
				}
				g.year(f.substring(0, f.indexOf("-")))
			},
			firstLastDay: function(f, g) {
				return g ? new b.datetime(f.year() - (f.year() % 100), 0, 1) : new b.datetime(f.year() - (f.year() % 100) + 99, 0, 1)
			},
			navCheck: function(f, g, h) {
				var j = this.compare(g, f, h);
				return h ? j == -1 : j == 1
			}
		}],
		check: function(j, k, h, g) {
			var f = function(l) {
					return l < h.year() ? -1 : l > h.year() ? 1 : 0
				};
			return g ? f(k) : f(j)
		},
		html: function(l, j, h, g, k, f) {
			l = l || new b.datetime();
			h = h || new b.datetime(a.fn.tCalendar.defaults.minDate);
			g = g || new b.datetime(a.fn.tCalendar.defaults.maxDate);
			return new b.stringBuilder().cat('<div class="t-widget t-calendar">').cat('<div class="t-header">').cat('<a href="#" class="t-link t-nav-prev">').cat('<span class="t-icon t-arrow-prev"></span></a><a href="#" class="t-link t-nav-fast">').cat(b.calendar.views[0].title(l)).cat("</a>").cat('<a href="#" class="t-link t-nav-next"><span class="t-icon t-arrow-next"></span></a>').cat("</div>").cat('<table class="t-content" cellspacing="0">').cat(b.calendar.views[0].body(l, h, g, j, k, f)).cat("</table></div>").string()
		},
		metaView: function(k, m, g) {
			var h = new b.stringBuilder();
			var f = g();
			h.cat("<tr>");
			for (var j = 0, l = f.length; j < l; j++) {
				h.catIf("</tr><tr>", j > 0 && j % 4 == 0).cat("<td").catIf(' class="t-other-month"', (j == 0 || j == l - 1) && k == false).cat(">");
				if (f[j] !== "&nbsp;" && f[j] !== "&nbsp;<br />&nbsp;") {
					h.cat('<a href="#" class="t-link">').cat(f[j]).cat("</a>")
				} else {
					h.cat(f[j])
				}
				h.cat("</td>")
			}
			h.cat("</tr>");
			return h.string()
		},
		isInRange: function(g, l, j) {
			if (!g) {
				return false
			}
			var f = new Date(g.getFullYear(), g.getMonth(), g.getDate());
			var k = new Date(l.getFullYear(), l.getMonth(), l.getDate());
			var h = new Date(j.getFullYear(), j.getMonth(), j.getDate());
			return k - f <= 0 && h - f >= 0
		},
		fitDateToRange: function(f, h, g) {
			if (f.value < h.value) {
				f = new b.datetime(h.value)
			}
			if (f.value > g.value) {
				f = new b.datetime(g.value)
			}
			return f
		},
		isInCollection: function(f, g) {
			var j = g[f.year()];
			if (j) {
				var h = j[f.month()];
				if (h && a.inArray(f.date(), h) != -1) {
					return true
				}
			}
			return false
		},
		findTarget: function(k, n, g, l) {
			k = k.value ? k : new b.datetime(k);
			var j = function(p, q) {
					return a.grep(p, function(r) {
						return a(r).children().eq(0).text().indexOf(q) > -1
					})[0]
				};
			var m = l ? "last" : "first";
			var h = a(".t-content:" + m + " td:has(> .t-link)", g).removeClass("t-state-focus");
			var f;
			if (n == 0) {
				f = a(j(h.filter(":not(.t-other-month)"), k.date()))
			} else {
				if (n == 1) {
					f = a(j(h, b.cultureInfo.abbrMonths[k.month()]))
				} else {
					if (n == 2 || n == 3) {
						var o = k.year();
						f = a(j(h, n == 2 ? o : o - (o % 10)));
						if (f.length == 0 && n == 3) {
							f = a(j(h, o - (o % 10) + 99))
						}
					}
				}
			}
			return f
		},
		focusDate: function(g, j, f, h) {
			b.calendar.findTarget(g, j, f, h).addClass("t-state-focus")
		},
		formatUrl: function(j, f) {
			var h = j.match(c);
			if (h) {
				h = h[0];
				var g = h === "{0}" ? b.cultureInfo.generalDateTime : h.replace(e, "").replace("}", "");
				return j.replace(h, b.datetime.format(f.toDate(), g))
			}
			return j
		}
	})
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.combobox.js");
	b.combobox = function(j, p) {
		if (p && p.enabled === undefined) {
			p.enabled = !a(j).is("[disabled]")
		}
		a.extend(this, p);
		var m = j.nodeName.toLowerCase() == "input" && j.type.toLowerCase() == "text";
		var l = j.nodeName.toLowerCase() == "select";
		if ((m || l) && !a(j).parent().hasClass("t-combobox")) {
			if (l && !this.data) {
				this.data = b.list.retrieveData(j)
			}
			var k = new b.list.htmlBuilder(j, "t-combobox", l);
			k.text = function(v) {
				var u = v.builder;
				u.buffer = [];
				return a(u.cat('<input class="t-input" autocomplete="off" type="text" ').catIf('value="', v.text, '" ', v.text).catIf('name="', v.name, '-input" ', v.name).cat("/>").string())
			};
			k.render();
			if (l) {
				j = j.previousSibling
			}
		}
		this.element = j;
		var r = this;
		var d = this.$element = a(j).closest("form").bind("reset", function() {
			setTimeout(function() {
				r.value(j.value)
			})
		}).end();
		this.loader = new b.list.loader(this);
		this.trigger = new b.list.trigger(this);
		var g = this.$wrapper = d.closest(".t-combobox");
		var e = this.$wrapper.find(".t-select");
		var f = this.$text = this.$wrapper.find("> .t-dropdown-wrap > .t-input").attr("autocomplete", "off").bind("paste", a.proxy(function(u) {
			setTimeout(a.proxy(function() {
				this.$element.val(u.target.value);
				q(this)
			}, this), 0)
		}, this));
		var t = function(w) {
				var u = "class",
					v = d.attr(u) || "";
				if ((w.attrName && w.attrName == u) || (w.propertyName && w.propertyName == "className")) {
					if (v != f.attr(u)) {
						f.attr(u, v).addClass("t-input")
					}
				}
			};
		if (a.browser.msie && ((trim_Version == "MSIE8.0" || trim_Version == "MSIE7.0"))) {//jia 0915 add IE surport
			j.attachEvent("onpropertychange", t)
		} else {
			d.bind("DOMAttrModified", t)
		}
		d.closest("form").bind("reset", a.proxy(function(u) {
			var v = this;
			window.setTimeout(function() {
				if (d.val() != "") {
					v.value(d.val())
				} else {
					v.highlight(0);
					v.selectedIndex = 0
				}
			}, 1)
		}, this));
		this.filtering = new b.list.filtering(this);
		this.filtering.autoFill = function(u, y) {
			if (u.autoFill && (u.lastKeyCode != 8 && u.lastKeyCode != 46)) {
				var x = u.$text[0];
				var v = b.caretPos(x);
				var w = x.value.substring(0, v);
				var z = y.toLowerCase().indexOf(w.toLowerCase());
				if (z != -1) {
					var A = y.substring(z + w.length);
					x.value = w + A;
					b.list.selection(x, v, v + A.length)
				}
			}
		};
		this.dropDown = new b.dropDown({
			attr: this.dropDownAttr,
			effects: this.effects,
			onOpen: a.proxy(function() {
				var u = this.data;
				var v = this.dropDown;
				if (u.length == 0) {
					return
				}
				var x = this.$text.val();
				var w = this.selectedIndex;
				if (w != -1 && this.isFiltered) {
					if (x == u[w].Text) {
						this.filteredDataIndexes = [];
						v.onItemCreate = null;
						if (this.filter) {
							v.dataBind(this.data, this.encoded)
						}
						this.select(v.$items[w])
					} else {
						this.filters[this.filter](this, this.data, x)
					}
					this.isFiltered = false
				}
			}, this),
			onClick: a.proxy(function(u) {
				this.select(u.item);
				this.trigger.change();
				this.trigger.close();
				f.focus()
			}, this)
		});
		this.dropDown.$element.css("direction", g.closest(".t-rtl").length ? "rtl" : "");
		this.enable = function() {
			g.removeClass("t-state-disabled");
			f.removeAttr("disabled");
			d.removeAttr("disabled");
			if (!e.data("events")) {
				e.bind("click", a.proxy(s, this))
			}
		};
		this.disable = function() {
			g.addClass("t-state-disabled");
			f.attr("disabled", "disabled");
			d.attr("disabled", "disabled");
			e.unbind("click")
		};
		this[this.enabled ? "enable" : "disable"]();
		this.fill = function(u, y) {
			function C(F) {
				var J = F.selectedValue || F.value();
				if (J) {
					F.value(J);
					return
				}
				var D = v.$items;
				var H = F.index;
				var E = D.filter(".t-state-selected");
				var I = E.length;
				var G = H != -1 && H < D.length ? D[H] : I > 0 ? E[I - 1] : null;
				if (G) {
					F.select(G)
				} else {
					F.selectedIndex = -1;
					if (F.highlightFirst) {
						F.highlight(D[0])
					}
				}
			}
			var w = this.loader;
			var v = this.dropDown;
			var x = this.minChars;
			var A = this.text();
			var B = A.length;
			if (!v.$items && !w.ajaxError) {
				if ((w.isAjax() || this.onDataBinding) && B >= x) {
					y = y || {};
					var z = a.extend({}, y);
					z[this.queryString.text] = A;
					w.ajaxRequest(function(D) {
						this.dataBind(D, true);
						C(this);
						b.trigger(this.element, "dataBound");
						this.trigger.change();
						if (u) {
							u()
						}
					}, {
						data: z
					})
				} else {
					this.dataBind(this.data, true);
					C(this);
					if (u) {
						u()
					}
				}
			}
		};
		this.reload = function() {
			this.dropDown.$items = null;
			if (arguments.length) {
				this.fill(arguments[0], arguments[1])
			} else {
				this.fill()
			}
		};
		this.select = function(x) {
			var w = this.highlight(x);
			if (w != -1) {
				var v = this.filteredDataIndexes;
				this.selectedIndex = (v && v.length) > 0 ? v[w] : w;
				var u = this.data[this.selectedIndex];
				b.list.updateTextAndValue(this, u.Text, u.Value)
			}
			return w
		};
		this.text = function() {
			return this.$text.val.apply(this.$text, arguments)
		};
		this.value = function() {
			if (arguments.length) {
				var v = arguments[0];
				var u = this.select(function(w) {
					return v == (w.Value || w.Text)
				});
				if (u == -1) {
					this.selectedIndex = u;
					this.$element.val(v);
					this.text(v)
				}
				this.previousValue = this.$element.val()
			} else {
				return this.$element.val()
			}
		};
		b.list.common.call(this);
		b.list.filters.call(this);
		b.list.initialize.call(this);
		a(document.documentElement).bind("mousedown", a.proxy(function(w) {
			var u = this.dropDown.$element;
			var x = u && u.parent().length > 0;
			if (a.contains(this.$wrapper[0], w.target) || (x && a.contains(u.parent()[0], w.target))) {
				return
			}
			if (this._textChanged) {
				this._textChanged = false;
				var v = c(this.data, this.$text.val());
				if (v) {
					this.selectedIndex = v.index;
					this.text(v.dataItem.Text);
					this.$element.val(v.dataItem.Value || v.dataItem.Text)
				}
			}
			this.trigger.change();
			this.trigger.close()
		}, this));
		this.$text.bind({
			keydown: a.proxy(n, this),
			keypress: a.proxy(o, this),
			focus: a.proxy(function(w) {
				if (this.openOnFocus) {
					var x = this.trigger;
					var v = this.dropDown;
					if (!v.$items) {
						this.fill(x.open)
					} else {
						x.open()
					}
				}
				var u = this.$text;
				clearTimeout(this.selectTextTimeout);
				this.selectTextTimeout = window.setTimeout(function() {
					b.list.selection(u[0], 0, u.val().length)
				}, 130)
			}, this),
			blur: a.proxy(function() {
				clearTimeout(this.selectTextTimeout)
			}, this)
		});

		function s(v) {
			var u = this.dropDown,
				w = this.trigger;
			this.loader.ajaxError = false;
			if (!u.isOpened()) {
				if (!u.$items) {
					this.fill(w.open)
				} else {
					w.open()
				}
				f[0].focus()
			} else {
				w.close()
			}
		}
		function q(u) {
			clearTimeout(u.timeout);
			u.timeout = setTimeout(function() {
				u.filtering.filter(u)
			}, u.delay)
		}
		function n(z) {
			var C = this.trigger;
			var y = this.dropDown;
			var A = z.keyCode || z.which;
			this.lastKeyCode = A;
			if (z.altKey) {
				if (A == 38 || A == 40) {
					var w = A == 38 ? C.close : C.open;
					if (!y.$items) {
						this.fill(w)
					} else {
						w()
					}
				}
				return
			}
			if (!z.shiftKey && (A == 38 || A == 40)) {
				z.preventDefault();
				var B = a.proxy(function() {
					var E = y.$items,
						F = E.filter(".t-state-selected:first");
					var D = F.length == 0 || E.length == 1 || this.selectedIndex == -1 ? E.first() : (A == 38) ? F.prev() : (A == 40) ? F.next() : [];
					if (D.length) {
						var G = D[0];
						this.select(G);
						y.scrollTo(G);
						if (!y.isOpened()) {
							C.change()
						}
					}
				}, this);
				if (!y.$items) {
					if (this.index != -1 || this.value() || this.selectedValue) {
						B = null
					}
					this.fill(B);
					return
				}
				B();
				return
			}
			if (A == 8 || A == 46 || (z.ctrlKey && A == 88)) {
				var v = this.$text;
				if (v.val() != "") {
					q(this)
				}
				setTimeout(a.proxy(function() {
					if (v.val() == "") {
						this.selectedIndex = -1;
						this.$element.val("")
					} else {
						this.$element.val(this.$text.val())
					}
				}, this), 0);
				return
			}
			if (A == 13) {
				if (y.isOpened()) {
					z.preventDefault();
					var u = y.$items.filter(".t-state-selected:first");
					if (u.length > 0) {
						this.select(u[0])
					} else {
						this.$element.val(this.$text.val())
					}
					C.change();
					C.close();
					b.list.moveToEnd(this.$text[0])
				}
				return
			}
			if (A == 27 || A == 9) {
				clearTimeout(this.timeout);
				var x = c(this.data, this.$text.val());
				if (x) {
					this.selectedIndex = x.index;
					this.text(x.dataItem.Text);
					this.$element.val(x.dataItem.Value || x.dataItem.Text)
				}
				C.change();
				C.close();
				if (A == 27) {
					this.$text.blur()
				}
				return
			}
			q(this)
		}
		function o(u) {
			this._textChanged = true;
			var v = u.keyCode || u.charCode;
			if (!u.shiftKey && (v == 0 || a.inArray(v, b.list.keycodes) != -1 || u.ctrlKey)) {
				return true
			}
			setTimeout(a.proxy(function() {
				this.$element.val(this.$text.val())
			}, this), 0)
		}
		if (r.cascadeTo) {
			var h = a("#" + r.cascadeTo).attr("disabled", "disabled");
			r.$element.bind("valueChange", a.proxy(function() {
				var u = h.data("tComboBox");
				if (u) {
					var w = [],
						v = {};
					v[r.$element.attr("name")] = r.value();
					if (u.loader.isAjax()) {
						if (r.placeholder) {
							w[0] = {
								Text: r.placeholder,
								Value: ""
							}
						}
						u.dataBind(w)
					}
					u.select(0);
					u.disable();
					if (r.value() === "" && r.placeholder) {
						u.$element.trigger("valueChange");
						return
					}
					u.reload(function() {
						var x = w[0] ? 1 : 0;
						if (u.data[x]) {
							u.enable()
						}
					}, v)
				}
			}, r))
		}
	};

	function c(d, g) {
		if (!g) {
			return
		}
		if (d) {
			for (var f = 0, h = d.length; f < h; f++) {
				var e = d[f],
					j = e.Text;
				if (j == g) {
					return {
						dataItem: e,
						index: f
					}
				}
			}
		}
	}
	a.fn.tComboBox = function(d) {
		return b.create(this, {
			name: "tComboBox",
			init: function(e, f) {
				return new b.combobox(e, f)
			},
			options: d
		})
	};
	a.fn.tComboBox.defaults = {
		encoded: true,
		openOnFocus: false,
		effects: b.fx.slide.defaults(),
		index: -1,
		autoFill: true,
		highlightFirst: true,
		filter: 0,
		delay: 200,
		minChars: 0,
		cache: true,
		queryString: {
			text: "text"
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.datepicker.js");
	var f = null,
		d = (navigator.userAgent.search(/like\sMac\sOS\sX;.*Mobile\/\S+/) != -1),
		e = (navigator.userAgent.search(/4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/) != -1);
	b.datetime.parseByToken = function(q, o) {
		if (q === null || q === "") {
			return null
		}
		o = o || new b.datetime();
		var j = null;
		var n = null;
		var p = null;
		var l = 0;
		var k = function(r) {
				var s = null;
				if (r && q.substring(l, l + r.length).toLowerCase() == r.toLowerCase()) {
					s = r
				}
				return s
			};
		var m = function() {
				var r = null;
				a.each(["days", "abbrDays", "months", "abbrMonths"], function(s, t) {
					if (r !== null) {
						return
					}
					a.each(b.cultureInfo[t], function(u, v) {
						if (r !== null) {
							return
						}
						r = k(v)
					});
					p = t
				});
				return r
			};
		var g = function() {
				var s;
				var t = function(v, u) {
						o[u ? "date" : "month"](o[u ? "date" : "month"]() + (s != 0 ? ((s + ((s > 0 ? 1 : -1) * v)) % v) : 0) + (n ? (j == b.cultureInfo.next ? 1 : -1) * v : 0))
					};
				var r = a.inArray(n || j, b.cultureInfo[p]);
				if (p.toLowerCase().indexOf("day") > -1) {
					s = (r == 0 ? 7 : r) - o.day();
					t(7, true)
				} else {
					s = r - o.month();
					t(12, false)
				}
			};
		var h = function() {
				var s = function(u) {
						var t;
						switch (n) {
						case "year":
							t = u == 1 ? 1 : 0;
							break;
						case "month":
							t = u == 2 ? 1 : 0;
							break;
						case "week":
							t = u == 3 ? 7 : 0;
							break;
						case "day":
							t = u == 3 ? 1 : 0;
							break
						}
						return t
					};
				var r = (j == b.cultureInfo.next ? 1 : -1);
				o.year(o.year() + s(1) * r, o.month() + s(2) * r, o.date() + s(3) * r)
			};
		a.each(["today", "tomorrow", "yesterday", "next", "last"], function(r, s) {
			if (j !== null) {
				return
			}
			j = k(b.cultureInfo[s])
		});
		if (j !== null) {
			l += j.length;
			if (/[^\s\d]\s+[^\s\d]/i.test(q)) {
				l++;
				a.each(["year", "month", "week", "day"], function(r, s) {
					if (n !== null) {
						return
					}
					n = k(b.cultureInfo[s])
				});
				p = null;
				if (n === null) {
					n = m()
				}
				if (n === null) {
					return null
				}
			} else {
				switch (j) {
				case b.cultureInfo.today:
					break;
				case b.cultureInfo.tomorrow:
					o.date(o.date() + 1);
					break;
				case b.cultureInfo.yesterday:
					o.date(o.date() - 1);
					break;
				default:
					o = null;
					break
				}
				return o
			}
		} else {
			j = m();
			if (j != null) {
				g();
				return o
			} else {
				return null
			}
		}
		if (p !== null) {
			g()
		} else {
			h()
		}
		return o
	};

	function c(g, k, j, h) {
		if (k) {
			g = new Date(k)
		}
		if (j > g) {
			g = new Date(j)
		} else {
			if (h < g) {
				g = new Date(h)
			}
		}
		return g
	}
	b.dateView = function(g) {
		a.extend(this, g);
		this.isValueChanged = false;
		this.focusedValue = c(new Date(), this.selectedValue, this.minValue, this.maxValue);
		this.$calendar = this._createSharedCalendar()
	};
	b.dateView.prototype = {
		_createSharedCalendar: function() {
			if (!f) {
				f = a(b.calendar.html(new b.datetime(this.focusedValue), this.selectedValue ? new b.datetime(this.selectedValue) : null, new b.datetime(this.minValue), new b.datetime(this.maxValue))).hide().addClass("t-popup t-datepicker-calendar").appendTo(document.body).tCalendar({
					selectedValue: this.selectedValue,
					minDate: this.minValue,
					maxDate: this.maxValue
				});
				if (a.browser.msie && parseInt(a.browser.version) < 7) {
					f.prepend('<iframe src="javascript:\'\';" style="position:absolute; width: 100%; height: 190px; border: 0; top: 0; left: 0; opacity: 0; filter:alpha(opacity=0);"></iframe>')
				}
				b.fx._wrap(f).css("display", "none");
				if (a.browser.msie && a.browser.version <= 6) {
					a('<iframe class="t-iframe-overlay" src="javascript:false;"></iframe>').prependTo(f).height(f.height())
				}
			}
			return f
		},
		_getCalendar: function() {
			return f.data("tCalendar")
		},
		_reassignSharedCalendar: function() {
			var g = this._getCalendar();
			if (f.data("associatedDateView") != this) {
				f.stop(true, true);
				this.focusedValue = c(this.focusedValue, this.selectedValue, this.minValue, this.maxValue);
				g.minDate = this.minValue;
				g.maxDate = this.maxValue;
				g.selectedValue = this.selectedValue;
				g.goToView(0, this.focusedValue);
				g._footer(this.todayFormat);
				f.unbind("change").bind("change", a.proxy(function(h) {
					var k = this.selectedValue;
					var j = new b.datetime(h.date);
					if (k !== null) {
						j.hours(k.getHours()).minutes(k.getMinutes()).seconds(k.getSeconds()).milliseconds(k.getMilliseconds())
					}
					this.onChange(j.toDate())
				}, this)).unbind("navigate").bind("navigate", a.proxy(function(h) {
					var j = this.focusedValue;
					var k = g.viewedMonth;
					var l = g.currentView.index;
					j.setFullYear(k.year(), k.month(), j.getDate());
					b.calendar.focusDate(j, l, f, h.direction)
				}, this)).data("associatedDateView", this);
				g.value(this.selectedValue);
				b.calendar.focusDate(this.focusedValue, g.currentView.index, f)
			}
		},
		open: function(k) {
			if (this.isOpened()) {
				return
			}
			this._reassignSharedCalendar();
			var j = this.isRtl;
			var g = this.$calendar;
			elementPosition = k.offset;
			elementPosition.top += k.outerHeight;
			if (d) {
				if (!document.body.scrollLeft && !e) {
					elementPosition.left -= window.pageXOffset
				}
				if (!document.body.scrollTop && !e) {
					elementPosition.top -= window.pageYOffset
				}
			}
			if (j) {
				elementPosition.left -= (f.outerWidth() || f.parent().outerWidth()) - k.outerWidth
			}
			b.fx._wrap(f).css(a.extend({
				position: "absolute",
				direction: j ? "rtl" : "",
				display: f.is(":visible") ? "" : "none"
			}, elementPosition));
			var h = this._getCalendar();
			var l = h.currentView.index;
			if (!f.is(":visible") && h.viewedMonth.value - this.focusedValue != 0) {
				h.goToView(l, this.focusedValue).value(this.selectedValue)
			}
			b.calendar.focusDate(this.focusedValue, h.currentView.index, f);
			b.fx._wrap(g).css("zIndex", k.zIndex).show();
			b.fx.play(this.effects, g, {
				direction: "bottom"
			})
		},
		close: function() {
			if (this.isOpened()) {
				b.fx.rewind(this.effects, this.$calendar, {
					direction: "bottom"
				}, function() {
					if (f) {
						b.fx._wrap(f).hide()
					}
				})
			}
		},
		isOpened: function() {
			return f && f.data("associatedDateView") == this && f.is(":visible")
		},
		value: function(j) {
			if (j === undefined) {
				return this.selectedValue
			}
			var h = j === null;
			var g = this._getCalendar();
			if (!h) {
				j = j.value ? new Date(j.value) : j
			}
			g.value(j);
			this.selectedValue = j;
			if (h) {
				j = new Date()
			}
			this.focusedValue = new Date(j);
			b.calendar.focusDate(j, g.currentView.index, f)
		},
		navigate: function(m) {
			if (this.isOpened() && a(".t-overlay", f).length > 0) {
				return
			}
			var n;
			var o = false;
			var g = this.$calendar;
			var j = this._getCalendar();
			var s = j.viewedMonth;
			var k = j.currentView;
			var t = k.index;
			var l = new b.datetime(this.focusedValue);
			var p = function(u, w, v) {
					if (!a(u, g).hasClass("t-state-disabled")) {
						if ("navigateUp" == w) {
							t += 1
						}
						n = v || false;
						j[w]();
						return true
					} else {
						return false
					}
				};
			var q = function() {
					var u = b.calendar.findTarget(l, t, g, false)[0];
					j.navigateDown(m, u, t);
					t = t == 0 ? 0 : t - 1;
					n = true
				};
			var r = function(u, x, w) {
					var v = !w ? -1 : 1;
					if (!p(u, x, w)) {
						return false
					}
					if (t == 0) {
						l.addMonth(v)
					} else {
						l.addYear(v * (t == 1 ? 1 : t == 2 ? 10 : 100))
					}
					return true
				};
			var h = b.datepicker.adjustDate;
			if (g.is(":visible") && !m.shiftKey) {
				o = true;
				switch (m.keyCode) {
				case 37:
					if (m.ctrlKey) {
						if (!r(".t-nav-prev", "navigateToPast")) {
							return
						}
					} else {
						h(t, l, -1, -1);
						if (k.navCheck(l, s, false)) {
							if (!p(".t-nav-prev", "navigateToPast")) {
								return
							}
						}
					}
					break;
				case 38:
					if (m.ctrlKey) {
						p(".t-nav-fast", "navigateUp")
					} else {
						h(t, l, -7, -4);
						if (k.navCheck(l, s, false)) {
							if (!p(".t-nav-prev", "navigateToPast")) {
								return
							}
						}
					}
					break;
				case 39:
					if (m.ctrlKey) {
						if (!r(".t-nav-next", "navigateToFuture", true)) {
							return
						}
					} else {
						h(t, l, 1, 1);
						if (k.navCheck(l, s, true)) {
							if (!p(".t-nav-next", "navigateToFuture", true)) {
								return
							}
						}
					}
					break;
				case 40:
					if (m.ctrlKey) {
						q()
					} else {
						h(t, l, 7, 4);
						if (k.navCheck(l, s, true)) {
							if (!p(".t-nav-next", "navigateToFuture", true)) {
								return
							}
						}
					}
					break;
				case 33:
					if (!r(".t-nav-prev", "navigateToPast")) {
						return
					}
					break;
				case 34:
					if (!r(".t-nav-next", "navigateToFuture", true)) {
						return
					}
					break;
				case 35:
					l = b.calendar.views[t].firstLastDay(l, false, j);
					break;
				case 36:
					l = b.calendar.views[t].firstLastDay(l, true, j);
					break;
				case 13:
					m.stopPropagation();
					if (t == 0) {
						this.onChange(this.focusedValue)
					} else {
						q()
					}
					break;
				default:
					o = false;
					break
				}
			}
			if (o) {
				m.preventDefault();
				l = b.calendar.fitDateToRange(l, new b.datetime(this.minValue), new b.datetime(this.maxValue));
				b.calendar.focusDate(l.toDate(), t, g, n);
				this.focusedValue = l.toDate()
			}
		}
	};
	a.each(["min", "max"], a.proxy(function(g, h) {
		b.dateView.prototype[h] = function(k) {
			var j = h + "Value";
			if (k === undefined) {
				return this[j]
			}
			this[j] = new Date(k.value ? k.value : k);
			if (f.data("associatedDateView") === this) {
				f.data("associatedDateView", null);
				this._reassignSharedCalendar()
			}
		}
	}, this));
	b.datepicker = function(k, l) {
		a.extend(this, l);
		if (k.nodeName.toLowerCase() !== "input" && k.type.toLowerCase() !== "text") {
			throw "Target element is not a INPUT"
		}
		this.element = k;
		var g = this.$element = a(k).addClass("t-input").attr("autocomplete", "off").bind({
			keydown: a.proxy(this._keydown, this),
			focus: a.proxy(function(o) {
				if (this.openOnFocus) {
					this._open()
				}
				this.$element.removeClass("t-state-error")
			}, this),
			blur: a.proxy(function(o) {
				this._bluring = setTimeout(a.proxy(function() {
					if (g.val() && this.parse(g.val()) === null) {
						this.$element.addClass("t-state-error")
					}
					if (!this.dateView.isOpened() && this.dateView === this.dateView.$calendar.data("associatedDateView")) {
						this._update(g.val())
					}
				}, this), 100)
			}, this)
		});
		if (!g.parent().hasClass("t-picker-wrap")) {
			g.wrap('<div class="t-widget t-datepicker"><div class="t-picker-wrap"></div></div>');
			if (l.showButton) {
				var h = new b.stringBuilder(),
					m = l.buttonTitle;
				a(h.cat('<span class="t-select">').cat('<span class="t-icon t-icon-calendar" ').catIf('title="', m).catIf(m, m).cat('"></span></span>').string()).insertAfter(g)
			}
		}
		this.dateView = new b.dateView({
			todayFormat: this.todayFormat,
			selectedValue: this.selectedValue,
			minValue: this.minValue,
			maxValue: this.maxValue,
			effects: this.effects,
			isRtl: g.closest(".t-rtl").length,
			onChange: a.proxy(function(o) {
				this._update(o);
				this._close()
			}, this)
		});
		this.dateView.$calendar.bind("click", a.proxy(function(o) {
			o.stopPropagation();
			clearTimeout(this._bluring);
			if (this.dateView !== this.dateView.$calendar.data("associatedDateView")) {
				return
			}
			if (o.target.parentNode.className.indexOf("t-state-selected") != -1) {
				this._close()
			}
			window.setTimeout(function() {
				g.focus()
			}, 1)
		}, this));
		this.inputValue = g.val();
		var n = this.selectedValue || this.inputValue;
		if (n) {
			this._value(this.parse(n))
		}
		var j = this.enabled ? a.proxy(this._togglePopup, this) : b.preventDefault;
		this.$wrapper = g.closest(".t-datepicker").find(".t-icon").bind("click", j).end();
		a(document.documentElement).bind("mousedown", a.proxy(function(p) {
			var q = this.$element.val();
			if (q != this.inputValue) {
				this._update(q)
			}
			if (!f) {
				return
			}
			var o = f.data("associatedDateView");
			if (!o || o != this.dateView) {
				return
			}
			if (!a.contains(this.$wrapper[0], p.target) && !a.contains(f[0], p.target)) {
				this._close()
			}
		}, this));
		b.bind(this, {
			open: this.onOpen,
			close: this.onClose,
			valueChange: this.onChange,
			load: this.onLoad
		})
	};
	b.datepicker.prototype = {
		_togglePopup: function() {
			if (this.dateView.isOpened()) {
				this._close()
			} else {
				this.element.focus();
				this._open()
			}
		},
		_close: function() {
			if (!f.is(":animated") && this.dateView.isOpened()) {
				this._trigger("close")
			}
		},
		_open: function() {
			if (!this.dateView.isOpened()) {
				this._trigger("open")
			}
		},
		_trigger: function(g) {
			if (!b.trigger(this.element, g)) {
				this[g]()
			}
		},
		_update: function(l) {
			l = this.parse(l);
			if (l != null) {
				if (l - this.minValue <= 0) {
					l = this.minValue
				} else {
					if (l - this.maxValue >= 0) {
						l = this.maxValue
					}
				}
			}
			var k = this.selectedValue,
				h = k ? b.datetime.format(k, this.format) : "",
				j = l ? b.datetime.format(l, this.format) : "";
			this._value(l);
			if (j != h) {
				var g = {
					previousValue: k,
					value: l,
					previousDate: k,
					date: l
				};
				if (b.trigger(this.element, "valueChange", g)) {
					this._value(k)
				}
			}
		},
		_keydown: function(g) {
			var h = g.keyCode;
			if (h == 9 || (h == 13 && this.inputValue != this.$element.val())) {
				this._update(this.$element.val());
				this._close()
			} else {
				if (h == 27) {
					this._close()
				} else {
					if (g.altKey) {
						if (h == 40) {
							this._open()
						} else {
							if (h == 38) {
								this._close()
							}
						}
					} else {
						this.dateView.navigate(g)
					}
				}
			}
		},
		enable: function() {
			this.$element.attr("disabled", false);
			this.$wrapper.removeClass("t-state-disabled").find(".t-icon").unbind("click").bind("click", a.proxy(this._togglePopup, this))
		},
		disable: function(g) {
			this.$element.attr("disabled", true);
			this.$wrapper.addClass("t-state-disabled").find(".t-icon").unbind("click").bind("click", b.preventDefault)
		},
		_value: function(j) {
			var h = this.$element.val();
			var g = j === null;
			this.selectedValue = j;
			this.dateView.value(j);
			if (!g) {
				h = b.datetime.format(j, this.format)
			}
			this.inputValue = h;
			this.$element.toggleClass("t-state-error", g && h != "").val(h)
		},
		value: function(h) {
			if (h === undefined) {
				return this.selectedValue
			}
			var g = this.parse(h);
			g = b.datepicker.isInRange(g, this.minValue, this.maxValue) ? g : null;
			if (g === null) {
				this.$element.removeClass("t-state-error").val("")
			}
			this._value(g);
			return this
		},
		showPopup: function() {
			this.open()
		},
		hidePopup: function() {
			this.close()
		},
		open: function() {
			var g = this.$element;
			this.dateView.open({
				offset: g.offset(),
				outerHeight: g.outerHeight(),
				outerWidth: g.outerWidth(),
				zIndex: b.getElementZIndex(g[0])
			})
		},
		close: function() {
			this.dateView.close()
		},
		parse: function(j, g) {
			if (j === null || j.getDate) {
				return j
			}
			var h = b.datetime.parse({
				value: j,
				format: g || this.format,
				shortYearCutOff: this.shortYearCutOff
			});
			return h != null ? h.toDate() : null
		}
	};
	a.each(["min", "max"], a.proxy(function(g, h) {
		b.datepicker.prototype[h] = function(m) {
			var l = h + "Value";
			if (m === undefined) {
				return this[l]
			}
			var k = this.parse(m);
			if (k !== null) {
				var j = this[l];
				this[l] = k;
				if (this.minValue > this.maxValue) {
					this[l] = j;
					return
				}
				this.dateView[h](k)
			}
		}
	}, this));
	a.extend(b.datepicker, {
		adjustDate: function(k, g, h, j) {
			if (k == 0) {
				b.datetime.modify(g, b.datetime.msPerDay * h)
			} else {
				if (k == 1) {
					g.addMonth(j)
				} else {
					g.addYear((k == 2 ? j : 10 * j))
				}
			}
		},
		isInRange: function(g, j, h) {
			if (!g) {
				return false
			}
			return j - g <= 0 && h - g >= 0
		}
	});
	a.fn.tDatePicker = function(g) {
		return b.create(this, {
			name: "tDatePicker",
			init: function(h, j) {
				return new b.datepicker(h, j)
			},
			options: g
		})
	};
	a.fn.tDatePicker.defaults = {
		effects: b.fx.slide.defaults(),
		selectedValue: null,
		format: b.cultureInfo.shortDate,
		minValue: new Date(1899, 11, 31),
		maxValue: new Date(2100, 0, 1),
		shortYearCutOff: 30,
		showButton: true,
		buttonTitle: "Open the calendar",
		enabled: true,
		openOnFocus: false
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.timepicker.js");
	b.timeView = function(d) {
		a.extend(this, d);
		var c = this.dropDown = new b.dropDown({
			attr: this.dropDownAttr,
			effects: this.effects,
			onClick: function(f) {
				var g = f.item;
				d.onChange(g.innerText || g.textContent)
			}
		});
		c.$element.addClass("t-time-popup").css("direction", this.isRtl ? "rtl" : "")
	};
	b.timeView.prototype = {
		_ensureItems: function() {
			if (!this.dropDown.$items) {
				this.bind()
			}
		},
		open: function(c) {
			this._ensureItems();
			this.dropDown.open(c)
		},
		close: function() {
			this.dropDown.close()
		},
		bind: function() {
			var g = b.timeView.getTimeMilliseconds;
			var d = [];
			var e = this.format;
			var j = this.interval;
			var p = new b.datetime(this.minValue);
			var m = g(p);
			var l = g(this.maxValue);
			var k = j * b.datetime.msPerMinute;
			var n = parseInt(b.datetime.msPerDay / (j * b.datetime.msPerMinute));
			if (m != l) {
				var o = m < l ? l - m : l + b.datetime.msPerDay - m;
				n = parseInt(o / k) + 1
			}
			var c = b.datetime.add;
			var f = b.datetime.format;
			for (var h = 0; h < n; h++) {
				d[h] = f(p.toDate(), e);
				p = c(p, k)
			}
			if (g(p) - k - l != 0 && m != l && d[n - 1] != f(this.maxValue, e)) {
				d[n] = f(this.maxValue, e)
			}
			this.dropDown.dataBind(d)
		},
		isOpened: function() {
			return this.dropDown.isOpened()
		},
		value: function(e) {
			this._ensureItems();
			var d = this.dropDown;
			if (e === undefined) {
				return d.$items.filter(".t-state-selected").text()
			}
			var c = d.$items;
			if (!c) {
				return
			}
			c.removeClass("t-state-selected");
			if (e) {
				d.highlight(a.grep(c, function(f) {
					return (f.innerText || f.textContent) == e
				}))
			}
		},
		navigate: function(h) {
			var j = h.keyCode || h.which;
			if (j == 38 || j == 40) {
				h.preventDefault()
			}
			this._ensureItems();
			var g = this.dropDown;
			var d = g.$items;
			var f = d.filter(".t-state-selected");
			var c = f.length == 0 || d.length == 1 ? d.first() : (j == 38) ? f.prev() : (j == 40) ? f.next() : [];
			if (c.length) {
				var k = c.text();
				g.scrollTo(c[0]);
				g.highlight(c[0]);
				if (!g.isOpened()) {
					this.onChange(k)
				} else {
					this.onNavigateWithOpenPopup(k)
				}
			}
		}
	};
	a.each(["min", "max"], a.proxy(function(c, d) {
		b.timeView.prototype[d] = function(f) {
			var e = d + "Value";
			if (f === undefined) {
				return this[e]
			}
			this[e] = new Date(f.value ? f.value : f);
			this.bind()
		}
	}, this));
	a.extend(b.timeView, {
		isInRange: function(k, e, d) {
			if (k === null) {
				return true
			}
			var c = b.timeView.getTimeMilliseconds;
			var h = b.datetime.msPerDay;
			var j = c(k);
			var g = c(e);
			var f = c(d);
			j = g > j ? j + h : j;
			f = g > f ? f + h : f;
			return g - f == 0 || j >= g && j <= f
		},
		getTimeMilliseconds: function(c) {
			c = c.value ? c : new b.datetime(c);
			return ((c.hours() * 60) + c.minutes()) * b.datetime.msPerMinute + c.seconds() * 1000 + c.milliseconds()
		}
	});
	b.timepicker = function(f, g) {
		a.extend(this, g);
		if (f.nodeName.toLowerCase() !== "input" && f.type.toLowerCase() !== "text") {
			throw "Target element is not a INPUT"
		}
		this.element = f;
		var c = this.$element = a(f).addClass("t-input").attr("autocomplete", "off").bind({
			keydown: a.proxy(this._keydown, this),
			focus: a.proxy(function(k) {
				if (this.openOnFocus) {
					this._open()
				}
				this.$element.removeClass("t-state-error")
			}, this),
			blur: a.proxy(function(k) {
				this._bluring = setTimeout(a.proxy(function() {
					if (c.val() && this.parse(c.val()) === null) {
						this.$element.addClass("t-state-error")
					}
					this._update(c.val())
				}, this), 100)
			}, this)
		});
		if (!c.parent().hasClass("t-picker-wrap")) {
			c.wrap('<div class="t-widget t-timepicker"><div class="t-picker-wrap"></div></div>');
			if (g.showButton) {
				var d = new b.stringBuilder(),
					h = g.buttonTitle;
				a(d.cat('<span class="t-select">').cat('<span class="t-icon t-icon-clock" ').catIf('title="', h).catIf(h, h).cat('"></span></span>').string()).insertAfter(c)
			}
		}
		this.timeView = new b.timeView({
			effects: this.effects,
			dropDownAttr: this.dropDownAttr,
			format: this.format,
			interval: this.interval,
			isRtl: c.closest(".t-rtl").length,
			minValue: this.minValue,
			maxValue: this.maxValue,
			onNavigateWithOpenPopup: a.proxy(function(k) {
				this.$element.val(k)
			}, this),
			onChange: a.proxy(function(k) {
				clearTimeout(this._bluring);
				if (k != this.inputValue) {
					this._update(k)
				}
				this._close();
				window.setTimeout(function() {
					c.focus()
				}, 1)
			}, this)
		});
		this.inputValue = c.val();
		var j = this.selectedValue || this.inputValue;
		if (j) {
			this._value(this.parse(j))
		}
		var e = this.enabled ? a.proxy(this._togglePopup, this) : b.preventDefault;
		this.$wrapper = c.closest(".t-timepicker").find(".t-icon").bind("click", e).end();
		a(document.documentElement).bind("mousedown", a.proxy(function(l) {
			var n = this.$element.val();
			if (n != this.inputValue) {
				this._update(n)
			}
			var k = this.timeView.dropDown.$element;
			var m = k && k.parent().length > 0;
			if (!m || a.contains(this.$wrapper[0], l.target) || a.contains(k.parent()[0], l.target)) {
				return
			}
			this._close()
		}, this));
		b.bind(this, {
			open: this.onOpen,
			close: this.onClose,
			valueChange: this.onChange,
			load: this.onLoad
		})
	};
	b.timepicker.prototype = {
		_close: function() {
			var c = this.timeView.dropDown;
			if (!c.$element.is(":animated") && c.isOpened()) {
				this._trigger("close")
			}
		},
		_open: function() {
			if (!this.timeView.isOpened()) {
				this._trigger("open")
			}
		},
		_trigger: function(c) {
			if (!b.trigger(this.element, c)) {
				this[c]()
			}
		},
		_togglePopup: function() {
			if (this.timeView.isOpened()) {
				this._close()
			} else {
				this.element.focus();
				this._open()
			}
		},
		_update: function(m) {
			var j = this.minValue,
				g = this.maxValue,
				m = this.parse(m),
				l = this.selectedValue;
			if (m != null && !b.timeView.isInRange(m, j, g)) {
				var e = b.timeView.getTimeMilliseconds,
					k = e(m),
					h = Math.abs(e(j) - k),
					f = Math.abs(e(g) - k);
				m = new Date(h < f ? j : g)
			}
			var c = l ? b.datetime.format(l, this.format) : "",
				d = m ? b.datetime.format(m, this.format) : "";
			this._value(m);
			if (d != c) {
				if (b.trigger(this.element, "valueChange", {
					previousValue: l,
					value: m
				})) {
					this._value(l)
				}
			}
		},
		_value: function(e) {
			var d = this.$element.val();
			var c = e === null;
			this.selectedValue = e;
			this.timeView.value(c ? null : b.datetime.format(e, this.format));
			if (!c) {
				d = b.datetime.format(e, this.format)
			}
			this.inputValue = d;
			this.$element.toggleClass("t-state-error", c && d != "").val(d)
		},
		_keydown: function(c) {
			var d = c.keyCode || c.which;
			if (c.altKey) {
				if (d == 40) {
					this._open()
				} else {
					if (d == 38) {
						this._close()
					}
				}
				return
			}
			if (!c.shiftKey && (d === 38 || d === 40)) {
				this.timeView.navigate(c);
				return
			}
			if (d == 9 || d == 13 || d == 27) {
				this._update(this.$element.val());
				this._close()
			}
		},
		enable: function() {
			this.$element.attr("disabled", false);
			this.$wrapper.removeClass("t-state-disabled").find(".t-icon").unbind("click").bind("click", a.proxy(this._togglePopup, this))
		},
		disable: function(c) {
			this.$element.attr("disabled", true);
			this.$wrapper.addClass("t-state-disabled").find(".t-icon").unbind("click").bind("click", b.preventDefault)
		},
		value: function(d) {
			if (d === undefined) {
				return this.selectedValue
			}
			var c = this.parse(d);
			c = b.timeView.isInRange(c, this.minValue, this.maxValue) ? c : null;
			if (c === null) {
				this.$element.removeClass("t-state-error").val("")
			}
			this._value(c);
			return this
		},
		parse: function(d) {
			if (d === null || d.getDate) {
				return d
			}
			var c = b.datetime.parse({
				AM: b.cultureInfo.am,
				PM: b.cultureInfo.pm,
				value: d,
				format: this.format,
				baseDate: this.selectedValue ? new b.datetime(this.selectedValue) : new b.datetime()
			});
			return c != null ? c.toDate() : null
		},
		open: function() {
			var c = this.$element;
			this.timeView.open({
				offset: c.offset(),
				outerHeight: c.outerHeight(),
				outerWidth: c.outerWidth(),
				zIndex: b.getElementZIndex(c[0])
			})
		},
		close: function() {
			this.timeView.close()
		}
	};
	a.each(["min", "max"], a.proxy(function(c, d) {
		b.timepicker.prototype[d] = function(g) {
			var f = d + "Value";
			if (g === undefined) {
				return this[f]
			}
			var e = this.parse(g);
			if (e !== null) {
				this[f] = e;
				this.timeView[d](e)
			}
		}
	}, this));
	a.fn.tTimePicker = function(c) {
		return b.create(this, {
			name: "tTimePicker",
			init: function(d, e) {
				return new b.timepicker(d, e)
			},
			options: c
		})
	};
	a.fn.tTimePicker.defaults = {
		effects: b.fx.slide.defaults(),
		minValue: new b.datetime().hours(0).minutes(0).seconds(0).toDate(),
		maxValue: new b.datetime().hours(0).minutes(0).seconds(0).toDate(),
		selectedValue: null,
		format: b.cultureInfo.shortTime,
		interval: 30,
		showButton: true,
		buttonTitle: "Open the calendar",
		enabled: true,
		openOnFocus: false
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts = b.scripts || [];
	b.scripts.push("telerik.datetimepicker.js");

	function c(f, e) {
		var d = new b.stringBuilder();
		return d.cat('<span class="t-icon t-icon-').cat(f).cat('" ').catIf('title="', e).catIf(e, e).cat('"></span>').string()
	}
	b.datetimepicker = function(e, f) {
		a.extend(this, f);
		if (e.nodeName.toLowerCase() !== "input" && e.type.toLowerCase() !== "text") {
			throw "Target element is not a INPUT"
		}
		this.element = e;
		var d = this.$element = a(e).addClass("t-input").attr("autocomplete", "off").bind({
			keydown: a.proxy(this._keydown, this),
			focus: a.proxy(function(j) {
				this.$element.removeClass("t-state-error")
			}, this),
			blur: a.proxy(function(j) {
				this._bluring = setTimeout(a.proxy(function() {
					if (d.val() && this.parse(d.val()) === null) {
						this.$element.addClass("t-state-error")
					}
					if (!this.dateView.isOpened() && this.dateView === this.dateView.$calendar.data("associatedDateView")) {
						this._update(d.val())
					}
				}, this), 100)
			}, this)
		});
		if (!d.parent().hasClass("t-picker-wrap")) {
			d.wrap('<div class="t-widget t-datetimepicker"><div class="t-picker-wrap"></div></div>');
			if (f.showCalendarButton || f.showTimeButton) {
				a(new b.stringBuilder().cat('<span class="t-select">').catIf(c("calendar", f.calendarButtonTitle), f.showCalendarButton).cat(c("clock", f.timeButtonTitle), f.showTimeButton).cat("</span>").string()).insertAfter(d)
			}
		}
		this.$wrapper = d.closest(".t-datetimepicker").find(".t-icon-clock").bind("click", this.enabled ? a.proxy(this._toggleTimeView, this) : b.preventDefault).end().find(".t-icon-calendar").bind("click", this.enabled ? a.proxy(this._toggleDateView, this) : b.preventDefault).end();
		this.timeView = new b.timeView({
			effects: this.effects,
			dropDownAttr: this.dropDownAttr,
			format: this.timeFormat,
			interval: this.interval,
			isRtl: d.closest(".t-rtl").length,
			minValue: this.startTimeValue,
			maxValue: this.endTimeValue,
			onNavigateWithOpenPopup: a.proxy(function(k) {
				var j = this.parse(k, this.timeFormat);
				this.$element.val(b.datetime.format(j, this.format))
			}, this),
			onChange: a.proxy(function(j) {
				clearTimeout(this._bluring);
				this._update(this.parse(j, this.timeFormat));
				this._close("time");
				window.setTimeout(function() {
					d.focus()
				}, 1)
			}, this)
		});
		this.dateView = new b.dateView({
			selectedValue: this.selectedValue,
			minValue: this.minValue,
			maxValue: this.maxValue,
			effects: this.effects,
			isRtl: d.closest(".t-rtl").length,
			onChange: a.proxy(function(j) {
				this._update(j);
				this._close("date")
			}, this)
		});
		this.dateView.$calendar.bind("click", a.proxy(function(j) {
			j.stopPropagation();
			clearTimeout(this._bluring);
			if (this.dateView !== this.dateView.$calendar.data("associatedDateView")) {
				return
			}
			if (j.target.parentNode.className.indexOf("t-state-selected") != -1) {
				this._close("date")
			}
			window.setTimeout(function() {
				d.focus()
			}, 1)
		}, this));
		this.inputValue = d.val();
		var h = this.selectedValue || this.inputValue;
		if (h) {
			var g = this.parse(h);
			this.dateView.selectedValue = g;
			this._value(this.parse(h))
		}
		a(document.documentElement).bind("mousedown", a.proxy(function(m) {
			var p = this.$element.val();
			if (p != this.inputValue) {
				this._update(p)
			}
			var j = this.dateView.$calendar;
			if (!j) {
				return
			}
			var k = this.timeView.dropDown.$element;
			var n = k && k.parent().length > 0;
			var l = j.data("associatedDateView");
			var o = m.target;
			if (a.contains(this.$wrapper[0], o) || (l && l == this.dateView && a.contains(j[0], o)) || (n && a.contains(k.parent()[0], o))) {
				return
			}
			this._close("date");
			this._close("time")
		}, this));
		b.bind(this, {
			open: this.onOpen,
			close: this.onClose,
			valueChange: this.onChange,
			load: this.onLoad
		})
	};
	b.datetimepicker.prototype = {
		_update: function(h) {
			h = this.parse(h);
			if (h != null) {
				if (h - this.minValue <= 0) {
					h = this.minValue
				} else {
					if (h - this.maxValue >= 0) {
						h = this.maxValue
					}
				}
			}
			var g = this.selectedValue,
				e = g ? b.datetime.format(g, this.format) : "",
				f = h ? b.datetime.format(h, this.format) : "";
			this._value(h);
			if (f != e) {
				var d = {
					previousValue: g,
					value: h
				};
				if (b.trigger(this.element, "valueChange", d)) {
					this._value(g)
				}
			}
		},
		_value: function(f) {
			var e = this.$element.val();
			var d = f === null;
			this.selectedValue = f;
			this.timeView.value(d ? null : b.datetime.format(f, this.timeFormat));
			this.dateView.value(f);
			if (!d) {
				e = b.datetime.format(f, this.format)
			}
			this.inputValue = e;
			this.$element.toggleClass("t-state-error", d && e != "").val(e)
		},
		_open: function(d) {
			if (!this[d == "time" ? "timeView" : "dateView"].isOpened()) {
				this._trigger(d, "open")
			}
		},
		_close: function(f) {
			var d = this.dateView;
			var e = this.timeView.dropDown;
			if ((f == "time" && !e.$element.is(":animated") && e.isOpened()) || (!d.$calendar.is(":animated") && d.isOpened())) {
				this._trigger(f, "close")
			}
		},
		_trigger: function(e, d) {
			if (!b.trigger(this.element, d, {
				popup: e
			})) {
				this[d](e)
			}
		},
		_keydown: function(d) {
			var g = d.keyCode,
				f = this.dateView.isOpened();
			if (g == 9 || g == 27 || (g == 13 && this.inputValue != this.$element.val())) {
				this._update(this.$element.val());
				this._close("date");
				this._close("time");
				return
			}
			if (d.altKey) {
				if (g == 40) {
					this._close(f ? "date" : "time");
					this._open(f ? "time" : "date")
				} else {
					if (g == 38) {
						this._close(f ? "date" : "time")
					}
				}
				return
			}
			if (f) {
				this.dateView.navigate(d);
				return
			}
			if (this.timeView.isOpened() && (g === 38 || g === 40)) {
				this.timeView.navigate(d);
				return
			}
		},
		_toggleDateView: function() {
			if (this.dateView.isOpened()) {
				this._close("date")
			} else {
				this.element.focus();
				this._open("date");
				this._close("time")
			}
		},
		_toggleTimeView: function() {
			if (this.timeView.isOpened()) {
				this._close("time")
			} else {
				this.element.focus();
				this._open("time");
				this._close("date")
			}
		},
		enable: function() {
			this.$element.attr("disabled", false);
			this.$wrapper.removeClass("t-state-disabled").find(".t-icon-clock").unbind("click").bind("click", a.proxy(this._toggleTimeView, this)).end().find(".t-icon-calendar").unbind("click").bind("click", a.proxy(this._toggleDateView, this))
		},
		disable: function(d) {
			this.$element.attr("disabled", true);
			this.$wrapper.addClass("t-state-disabled").find(".t-icon").unbind("click").bind("click", b.preventDefault)
		},
		open: function(e) {
			var d = this.$element;
			var f = {
				offset: d.offset(),
				outerHeight: d.outerHeight(),
				outerWidth: d.outerWidth(),
				zIndex: b.getElementZIndex(d[0])
			};
			this[e == "time" ? "timeView" : "dateView"].open(f)
		},
		close: function(d) {
			this[d == "time" ? "timeView" : "dateView"].close()
		},
		value: function(e) {
			if (e === undefined) {
				return this.selectedValue
			}
			var d = this.parse(e);
			d = b.datepicker.isInRange(d, this.minValue, this.maxValue) ? d : null;
			if (d === null) {
				this.$element.removeClass("t-state-error").val("")
			}
			this._value(d);
			return this
		},
		parse: function(f, d) {
			if (f === null || f.getDate) {
				return f
			}
			d = d || this.format;
			var e = b.datetime.parse({
				AM: b.cultureInfo.am,
				PM: b.cultureInfo.pm,
				value: f,
				format: d,
				baseDate: this.selectedValue ? new b.datetime(this.selectedValue) : new b.datetime()
			});
			return e != null ? e.toDate() : null
		}
	};
	a.each(["min", "max"], a.proxy(function(d, e) {
		b.datetimepicker.prototype[e] = function(j) {
			var h = e + "Value";
			if (j === undefined) {
				return this[h]
			}
			var g = this.parse(j);
			if (g !== null) {
				var f = this[h];
				this[h] = g;
				if (this.minValue > this.maxValue) {
					this[h] = f;
					return
				}
				this.dateView[e](g)
			}
		}
	}, this));
	a.each(["startTime", "endTime"], a.proxy(function(d, e) {
		b.datetimepicker.prototype[e] = function(h) {
			var g = e + "Value";
			if (h === undefined) {
				return this[g]
			}
			var f = this.parse(h, b.cultureInfo.shortTime);
			if (f !== null) {
				this[g] = f;
				e == "startTime" ? this.timeView.min(f) : this.timeView.max(f)
			}
		}
	}, this));
	a.fn.tDateTimePicker = function(d) {
		a.fn.tDateTimePicker.defaults.timeFormat = b.cultureInfo.shortTime;
		return b.create(this, {
			name: "tDateTimePicker",
			init: function(e, f) {
				return new b.datetimepicker(e, f)
			},
			options: d
		})
	};
	a.fn.tDateTimePicker.defaults = {
		effects: b.fx.slide.defaults(),
		selectedValue: null,
		format: b.cultureInfo.generalDateShortTime,
		focusedDate: new b.datetime(),
		minValue: new Date(1899, 11, 31),
		maxValue: new Date(2100, 0, 1),
		startTimeValue: new b.datetime().hours(0).minutes(0).seconds(0).toDate(),
		endTimeValue: new b.datetime().hours(0).minutes(0).seconds(0).toDate(),
		calendarButtonTitle: "Open the calendar",
		timeButtonTitle: "Open the time view",
		showCalendarButton: true,
		showTimeButton: true,
		shortYearCutOff: 30,
		enabled: true,
		interval: 30
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		n = function() {},
		e = {},
		g = {},
		c = {},
		j = {
			owner: [null]
		},
		m = b.isTouch ? "touchend" : "mouseup",
		k = b.isTouch ? "touchstart" : "mousedown",
		l = b.isTouch ? "touchmove" : "mousemove",
		f = {
			scope: "default",
			drop: n,
			over: n,
			out: n,
			owner: document.body
		},
		d = {
			distance: 5,
			cursorAt: {
				left: 10,
				top: b.isTouch ? -40 / b.zoomLevel() : 10
			},
			scope: "default",
			start: n,
			drag: n,
			stop: n,
			destroy: n,
			owner: document.body,
			cue: function() {
				return a("<span />")
			}
		};
	b.scripts.push("telerik.draganddrop.js");

	function o(q) {
		var r = 0,
			p;
		for (p in q) {
			q.hasOwnProperty(p) && r++
		}
		return r
	}
	function h(p, r) {
		var q = {
			owner: [null]
		};
		a.each(r, function() {
			var t = this,
				s = t.owner;
			if (s && a.contains(s, p)) {
				q = a.extend(q, t);
				q.selector && (q.owner = a(p).closest(q.selector)[0]);
				return false
			}
		});
		return q
	}
	b.droppable = function(p) {
		a.extend(this, f, p);
		a(this.owner).delegate(this.selector, "mouseenter", a.proxy(this._over, this)).delegate(this.selector, m, a.proxy(this._drop, this)).delegate(this.selector, "mouseleave", a.proxy(this._out, this));
		if (!(this.scope in g)) {
			g[this.scope] = [this]
		} else {
			g[this.scope].push(this)
		}
	};
	b.droppable.prototype = {
		_over: function(p) {
			this._raise(p, this.over)
		},
		_out: function(p) {
			this._raise(p, this.out)
		},
		_drop: function(p) {
			this._raise(p, a.proxy(function(q) {
				this.drop(q);
				q.destroy(q)
			}, this))
		},
		_raise: function(r, p) {
			var q = e[this.scope],
				s = a(b.eventCurrentTarget(r)).closest(this.selector);
			if (q) {
				p(a.extend(r, q, {
					$droppable: s
				}))
			}
		}
	};
	b.dragCue = function(p) {
		return a('<div class="t-header t-drag-clue" />').html(p).prepend('<span class="t-icon t-drag-status t-denied" />').appendTo(document.body)
	};
	b.dragCueStatus = function(p, q) {
		p.find(".t-drag-status").attr("class", "t-icon t-drag-status").addClass(q)
	};
	b.draggable = function(p) {
		a.extend(this, d, p);
		a(this.owner).delegate(this.selector, k, a.proxy(this._wait, this)).delegate(this.selector, "dragstart", b.preventDefault);
		this._startProxy = a.proxy(this._start, this);
		this._destroyProxy = a.proxy(this._destroy, this);
		this._stopProxy = a.proxy(this._stop, this);
		this._dragProxy = a.proxy(this._drag, this)
	};
	b.draggable.get = function(p) {
		return e[p]
	};
	b.draggable.prototype = {
		_raise: function(r, p) {
			var q = e[this.scope];
			if (q) {
				return p(a.extend(r, q))
			}
		},
		_startDrag: function(r, q) {
			r = a(r);
			this.$target = r;
			if (q) {
				this._startPosition = q
			} else {
				var p = r.offset();
				this._startPosition = {
					x: p.left,
					y: p.top
				}
			}
			a(document).bind(l + "." + this.scope, this._startProxy).bind(m + "." + this.scope, this._destroyProxy)
		},
		_wait: function(p) {
			if (b.isTouch) {
				p.stopImmediatePropagation()
			}
			this._startDrag(p.currentTarget, b.touchLocation(p));
			a(document.documentElement).trigger(k, p);
			if (!b.isTouch) {
				return false
			}
		},
		_start: function(r) {
			var s = b.touchLocation(r),
				t = this._startPosition.x - s.x,
				u = this._startPosition.y - s.y;
			var q = Math.sqrt((t * t) + (u * u));
			if (q >= this.distance) {
				if (b.isTouch) {
					r.stopImmediatePropagation();
					r.preventDefault()
				}
				var p = c[this.selector];
				if (!p) {
					p = c[this.selector] = this.cue({
						$draggable: this.$target
					})
				}
				a(document).unbind("." + this.scope).bind(l + "." + this.scope, this._dragProxy).bind(m + "." + this.scope, this._stopProxy).bind("keydown." + this.scope, this._stopProxy).bind("selectstart." + this.scope, false);
				e[this.scope] = {
					$cue: p.css({
						position: "absolute",
						left: s.x + this.cursorAt.left,
						top: s.y + this.cursorAt.top
					}),
					$draggable: this.$target,
					destroy: this._destroyProxy
				};
				if (this._raise(r, this.start) === false) {
					this._destroy(r)
				}
			}
		},
		_drag: function(s) {
			if (b.isTouch) {
				s.stopImmediatePropagation()
			}
			var v = b.touchLocation(s);
			if (b.isTouch && o(g)) {
				var r = b.eventTarget(s);
				if (r) {
					var q = g[this.scope],
						w = h(r, q),
						t = w.owner,
						u = j.owner,
						p = u != t;
					if (p) {
						if (u != null && "_out" in j) {
							j._out(s)
						}
						if (t && a.contains(t, r) && "_over" in w) {
							w._over(s)
						}
						j = w
					}
				}
			}
			this._raise(s, this.drag);
			e[this.scope].$cue.css({
				left: v.x + this.cursorAt.left,
				top: v.y + this.cursorAt.top
			})
		},
		_stop: function(s) {
			if (b.isTouch) {
				s.stopImmediatePropagation()
			}
			if (s.type == m || s.keyCode == 27) {
				a(document).unbind("." + this.scope)
			}
			if (b.isTouch && o(g)) {
				var r = b.eventTarget(s);
				if (r) {
					var q = g[this.scope],
						t = h(r, q);
					if (t.owner && "_drop" in t) {
						j = {
							owner: [null]
						};
						t._drop(s)
					}
				}
			}
			if (this._raise(s, this.stop) === false) {
				this._destroy(s)
			} else {
				var p = e[this.scope];
				if (p) {
					p.$cue.animate(p.$draggable.offset(), "fast", this._destroyProxy)
				}
			}
		},
		_destroy: function(p) {
			a(document).unbind("." + this.scope);
			this._raise(p, this.destroy);
			e[this.scope] = null;
			c[this.selector] = null
		}
	}
})(jQuery);
(function(a, e) {
	var b = a.telerik;
	b.scripts.push("telerik.window.js");

	function d(f) {
		return f && !(/^([a-z]+:)?\/\//i).test(f)
	}
	function c(f) {
		if (a.browser.msie && a.browser.version < 7) {
			f.find(".t-resize-e,.t-resize-w").css("height", f.height()).end().find(".t-resize-n,.t-resize-s").css("width", f.width()).end().find(".t-overlay").css({
				width: f.width(),
				height: f.height()
			})
		}
	}
	b.fx.zoom = function(f) {
		this.element = f
	};
	b.fx.zoom.prototype = {
		play: function(j, g) {
			var f = this.element.show();
			var k = f.find("> .t-window-content");
			var h = {
				width: k.width(),
				height: k.height(),
				left: parseInt(f.css("left")) || 0,
				top: parseInt(f.css("top")) || 0
			};
			f.css({
				left: h.left + 20,
				top: h.top + 20
			}).animate({
				left: h.left,
				top: h.top
			}, j.openDuration);
			k.css({
				width: h.width - 40,
				height: h.height - 40
			}).animate({
				width: h.width,
				height: h.height
			}, j.openDuration, function() {
				if (g) {
					g()
				}
			})
		},
		rewind: function(j, g) {
			var f = this.element;
			var k = f.find("> .t-window-content");
			var h = {
				width: k.width(),
				height: k.height(),
				left: parseInt(f.css("left")),
				top: parseInt(f.css("top"))
			};
			k.animate({
				width: h.width - 40,
				height: h.height - 40
			}, j.closeDuration);
			f.animate({
				left: h.left + 20,
				top: h.top + 20
			}, j.closeDuration, function() {
				f.css({
					left: h.left,
					top: h.top
				}).hide();
				setTimeout(function() {
					k.css({
						width: h.width,
						height: h.height
					})
				}, 0);
				if (g) {
					g()
				}
			})
		}
	};
	b.fx.zoom.defaults = function() {
		return {
			list: [{
				name: "zoom"
			}],
			openDuration: "fast",
			closeDuration: "fast"
		}
	};
	b.window = function(g, k) {
		this.element = g;
		var f = a(g),
			h = a.extend({}, k);
		delete h.title;
		delete h.content;
		a.extend(this, h);
		if (!f.is(".t-window")) {
			f.addClass("t-widget t-window");
			b.window.create(g, k)
		}
		if (!f.is("body")) {
			var j;
			if (f.is(":visible")) {
				j = f.offset();
				f.css({
					top: j.top,
					left: j.left
				})
			} else {
				f.css({
					visibility: "hidden",
					display: ""
				});
				j = f.offset();
				f.css({
					top: j.top,
					left: j.left
				}).css({
					visibility: "visible",
					display: "none"
				})
			}
			f.toggleClass("t-rtl", f.closest(".t-rtl").length > 0).appendTo(document.body)
		}
		this.bringToTop();
		f.bind("mousedown", a.proxy(this.bringToTop, this));
		if (this.modal && f.is(":visible")) {
			this.overlay(true).css({
				opacity: 0.5,
				zIndex: parseInt(f.css("zIndex"), 10) - 1
			})
		}
		var l = ".t-window-titlebar .t-link";
		f.delegate(l, "mouseenter", b.hover).delegate(l, "mouseleave", b.leave).delegate(l, "click", a.proxy(this.windowActionHandler, this));
		if (this.resizable) {
			f.delegate(".t-window-titlebar", "dblclick", a.proxy(this.toggleMaximization, this)).append(b.window.getResizeHandlesHtml());
			c(f);
			(function(p) {
				function n(r) {
					var q = a(p.element);
					p.initialCursorPosition = q.offset();
					p.resizeDirection = /t-resize-([nesw]+)/gi.exec(r.$draggable[0].className)[1];
					p.resizeElement = q.find("> .t-window-content");
					p.initialSize = {
						width: p.resizeElement.width(),
						height: p.resizeElement.height()
					};
					p.outlineSize = {
						left: p.resizeElement.outerWidth() - p.resizeElement.width() + q.outerWidth() - q.width(),
						top: p.resizeElement.outerHeight() - p.resizeElement.height() + q.outerHeight() - q.height() + q.find("> .t-window-titlebar").outerHeight()
					};
					a('<div class="t-overlay" />').appendTo(p.element);
					q.find(".t-resize-handle").not(r.$draggable).hide();
					a(document.body).css("cursor", r.$draggable.css("cursor"))
				}
				function m(r) {
					var q = a(p.element);
					var s = {
						e: function() {
							var t = b.touchLocation(r),
								u = t.x - p.initialCursorPosition.left - p.outlineSize.left;
							p.resizeElement.width((u < p.minWidth ? p.minWidth : (p.maxWidth && u > p.maxWidth) ? p.maxWidth : u))
						},
						s: function() {
							var u = b.touchLocation(r),
								t = u.y - p.initialCursorPosition.top - p.outlineSize.top;
							p.resizeElement.height((t < p.minHeight ? p.minHeight : (p.maxHeight && t > p.maxHeight) ? p.maxHeight : t))
						},
						w: function() {
							var t = b.touchLocation(r),
								v = p.initialCursorPosition.left + p.initialSize.width;
							q.css("left", t.x > (v - p.minWidth) ? v - p.minWidth : t.x < (v - p.maxWidth) ? v - p.maxWidth : t.x);
							var u = v - t.x;
							p.resizeElement.width((u < p.minWidth ? p.minWidth : (p.maxWidth && u > p.maxWidth) ? p.maxWidth : u))
						},
						n: function() {
							var u = b.touchLocation(r),
								v = p.initialCursorPosition.top + p.initialSize.height;
							q.css("top", u.y > (v - p.minHeight) ? v - p.minHeight : u.y < (v - p.maxHeight) ? v - p.maxHeight : u.y);
							var t = v - u.y;
							p.resizeElement.height((t < p.minHeight ? p.minHeight : (p.maxHeight && t > p.maxHeight) ? p.maxHeight : t))
						}
					};
					a.each(p.resizeDirection.split(""), function() {
						s[this]()
					});
					c(q);
					if (a.browser.msie && parseInt(a.browser.version) >= 9) {
						q[0].style.cssText = q[0].style.cssText
					}
					b.trigger(p.element, "resize")
				}
				function o(r) {
					var q = a(p.element);
					q.find(".t-overlay").remove().end().find(".t-resize-handle").not(r.$draggable).show();
					a(document.body).css("cursor", "");
					if (r.keyCode == 27) {
						c(q);
						q.css(p.initialCursorPosition);
						p.resizeElement.css(p.initialSize)
					}
					return false
				}
				new b.draggable({
					owner: p.element,
					selector: ".t-resize-handle",
					scope: p.element.id + "-resizing",
					distance: 0,
					start: n,
					drag: m,
					stop: o
				})
			})(this)
		}
		if (this.draggable) {
			(function(p) {
				function n(s) {
					var q = a(p.element),
						t = b.touchLocation(s);
					p.initialWindowPosition = q.position();
					p.startPosition = {
						left: t.x - p.initialWindowPosition.left,
						top: t.y - p.initialWindowPosition.top
					};
					var r = q.find(".t-window-actions");
					if (r.length > 0) {
						if (p.isRtl == e) {
							p.isRtl = a(p.element).closest(".t-rtl").length > 0
						}
						p.minLeftPosition = r.outerWidth() + parseInt(r.css(p.isRtl ? "left" : "right"), 10) - q.outerWidth()
					} else {
						p.minLeftPosition = 20 - q.outerWidth()
					}
					a(".t-resize-handle", p.element).hide();
					a('<div class="t-overlay" />').appendTo(p.element);
					a(document.body).css("cursor", s.$draggable.css("cursor"))
				}
				function m(r) {
					var s = b.touchLocation(r),
						q = {
							left: Math.max(s.x - p.startPosition.left, p.minLeftPosition),
							top: Math.max(s.y - p.startPosition.top, 0)
						};
					a(p.element).css(q)
				}
				function o(q) {
					a(p.element).find(".t-resize-handle").show().end().find(".t-overlay").remove();
					a(document.body).css("cursor", "");
					if (q.keyCode == 27) {
						q.$draggable.closest(".t-window").css(p.initialWindowPosition)
					}
					return false
				}
				new b.draggable({
					owner: p.element,
					selector: ".t-window-titlebar",
					scope: p.element.id + "-moving",
					start: n,
					drag: m,
					stop: o
				})
			})(this)
		}
		b.bind(this, {
			open: this.onOpen,
			activated: this.onActivate,
			close: this.onClose,
			refresh: this.onRefresh,
			resize: this.onResize,
			error: this.onError,
			load: this.onLoad,
			move: this.onMove
		});
		a(window).resize(a.proxy(this.onDocumentResize, this));
		if (d(this.contentUrl)) {
			this.ajaxRequest()
		}
	};
	b.window.prototype = {
		overlay: function(h) {
			var g = a("body > .t-overlay"),
				f = this.element;
			if (g.length == 0) {
				g = a('<div class="t-overlay" />').toggle(h).insertBefore(f)
			} else {
				g.insertBefore(f).toggle(h)
			}
			this.positionOverlay(g);
			return g
		},
		positionOverlay: function(g) {
			var f = a(document);
			if (a.browser.msie && a.browser.version < 7) {
				g.css({
					width: f.width() - 21,
					height: f.height(),
					position: "absolute"
				})
			} else {
				if ((/ipad/gi).test(navigator.appVersion)) {
					g.css({
						width: f.width(),
						height: f.height(),
						position: "absolute"
					})
				}
			}
		},
		overlayOnClose: function(g) {
			var f = this;
			var j = a(".t-window").filter(function() {
				var p = a(this);
				return this !== f.element && p.is(":visible") && p.data("tWindow").modal
			});
			var o = f.modal && j.length == 0;
			var m = f.modal ? f.overlay(true) : a(e);
			if (o) {
				if (f.effects.list.length > 0 && f.effects.list[0].name != "toggle") {
					m.fadeOut(f.effects.closeDuration, function() {
						if (g) {
							m.remove()
						}
					})
				} else {
					if (g) {
						m.remove()
					} else {
						m.hide()
					}
				}
			} else {
				if (j.length > 0) {
					var n = parseInt(a(".t-overlay").css("zIndex"), 10);
					var h = 0;
					var l;
					j.each(function(q, p) {
						var r = parseInt(a(p).css("zIndex"), 10);
						if (r >= h) {
							h = r;
							l = a(p)
						}
					});
					var k = l.data("tWindow");
					k.overlay(true).css("zIndex", h - 1)
				}
			}
		},
		windowActionHandler: function(h) {
			var f = a(h.target).closest(".t-link").find(".t-icon"),
				g = this;
			a.each({
				"t-close": this.close,
				"t-maximize": this.maximize,
				"t-restore": this.restore,
				"t-refresh": this.refresh
			}, function(j, k) {
				if (f.hasClass(j)) {
					h.preventDefault();
					k.call(g);
					return false
				}
			})
		},
		center: function() {
			var f = a(this.element),
				g = a(window);
			f.css({
				left: g.scrollLeft() + Math.max(0, (g.width() - f.width()) / 2),
				top: g.scrollTop() + Math.max(0, (g.height() - f.height()) / 2)
			});
			return this
		},
		title: function(g) {
			var f = a(".t-window-titlebar > .t-window-title", this.element);
			if (!g) {
				return f.text()
			}
			f.text(g);
			return this
		},
		content: function(g) {
			var f = a("> .t-window-content", this.element);
			if (!g) {
				return f.html()
			}
			f.html(g);
			return this
		},
		bringToTop: function() {
			var g = 0,
				f = this;
			a(".t-window").each(function() {
				var h = a(this);
				var j = h.css("zIndex");
				if (!isNaN(j)) {
					g = Math.max(parseInt(j, 10), g)
				}
				if (this != f.element && h.find(".t-window-content > iframe").length > 0) {
					h.find(".t-window-content").append("<div class='t-overlay' />")
				}
			});
			a(f.element).css("zIndex", g + 2).find(".t-window-content > .t-overlay").remove();
			return f
		},
		open: function(g) {
			var f = a(this.element);
			this.bringToTop();
			if (!b.trigger(this.element, "open")) {
				if (this.modal) {
					var h = this.overlay(false).css("zIndex", parseInt(f.css("zIndex"), 10) - 1);
					if (this.effects.list.length > 0 && this.effects.list[0].name != "toggle") {
						h.css("opacity", 0).show().animate({
							opacity: 0.5
						}, this.effects.openDuration)
					} else {
						h.css("opacity", 0.5).show()
					}
				}
				if (!f.is(":visible")) {
					b.fx.play(this.effects, f, {}, function() {
						b.trigger(f[0], "activated")
					})
				}
			}
			if (this.isMaximized) {
				a("html, body").css("overflow", "hidden")
			}
			return this
		},
		close: function() {
			var f = a(this.element);
			if (f.is(":visible")) {
				if (!b.trigger(this.element, "close")) {
					this.overlayOnClose();
					b.fx.rewind(this.effects, f, null, function() {
						f.hide()
					})
				}
			}
			if (this.isMaximized) {
				a("html, body").css("overflow", "")
			}
			return this
		},
		toggleMaximization: function(f) {
			if (f && a(f.target).closest(".t-link").length > 0) {
				return
			}
			this[this.isMaximized ? "restore" : "maximize"]()
		},
		restore: function() {
			if (!this.isMaximized) {
				return
			}
			a(this.element).css({
				position: "absolute",
				left: this.restorationSettings.left,
				top: this.restorationSettings.top
			}).find("> .t-window-content").css({
				width: this.restorationSettings.width,
				height: this.restorationSettings.height
			}).end().find(".t-resize-handle").show().end().find(".t-window-titlebar .t-restore").addClass("t-maximize").removeClass("t-restore");
			a("html, body").css("overflow", "");
			this.isMaximized = false;
			b.trigger(this.element, "resize");
			return this
		},
		maximize: function(g) {
			if (this.isMaximized) {
				return
			}
			var f = a(this.element),
				h = f.find("> .t-window-content");
			this.restorationSettings = {
				left: f.position().left,
				top: f.position().top,
				width: h.width(),
				height: h.height()
			};
			f.css({
				left: 0,
				top: 0,
				position: "fixed"
			}).find(".t-resize-handle").hide().end().find(".t-window-titlebar .t-maximize").addClass("t-restore").removeClass("t-maximize");
			a("html, body").css("overflow", "hidden");
			this.isMaximized = true;
			this.onDocumentResize();
			return this
		},
		onDocumentResize: function() {
			if (!this.isMaximized) {
				return
			}
			var f = a(this.element),
				g = f.find("> .t-window-content");
			g.css({
				width: a(window).width() - (g.outerWidth() - g.width() + f.outerWidth() - f.width()),
				height: a(window).height() - (g.outerHeight() - g.height() + f.outerHeight() - f.height() + f.find("> .t-window-titlebar").outerHeight())
			});
			c(f);
			b.trigger(f, "resize")
		},
		refresh: function() {
			if (d(this.contentUrl)) {
				this.ajaxRequest()
			} else {
				var f = a(this.element).find("> .t-window-content > iframe")[0];
				if (f) {
					f.src = f.src
				}
			}
			return this
		},
		ajaxRequest: function(h, f) {
			var g = setTimeout(function() {
				a(".t-refresh", this.element).addClass("t-loading")
			}, 100);
			a.ajax({
				type: "GET",
				url: h || this.contentUrl,
				dataType: "html",
				data: f || {},
				cache: false,
				error: a.proxy(function(k, j) {
					if (b.ajaxError(this.element, "error", k, j)) {
						return
					}
				}, this),
				complete: function() {
					clearTimeout(g);
					a(".t-refresh", this.element).removeClass("t-loading")
				},
				success: a.proxy(function(j, k) {
					a(".t-window-content", this.element).html(j);
					b.trigger(this.element, "refresh")
				}, this)
			})
		},
		destroy: function() {
			a(this.element).remove();
			this.overlayOnClose(true)
		}
	};
	a.extend(b.window, {
		create: function() {
			var g, h, f;
			if (a.isPlainObject(arguments[0])) {
				h = arguments[0]
			} else {
				g = arguments[0];
				h = a.extend({
					html: g.innerHTML
				}, arguments[1])
			}
			h = a.extend({
				title: "",
				html: "",
				actions: ["Close"],
				visible: true
			}, h);
			f = h.contentUrl;
			var j = new b.stringBuilder().catIf('<div class="t-widget t-window">', !g).cat('<div class="t-window-titlebar t-header">').cat('&nbsp;<span class="t-window-title">').cat(h.title).cat("</span>").cat('<div class="t-window-actions t-header">');
			a.map(h.actions, function(k) {
				j.cat('<a href="#" class="t-link">').cat('<span class="t-icon t-').cat(k.toLowerCase()).cat('">').cat(k).cat("</span></a>")
			});
			j.cat("</div></div>").cat('<div class="t-window-content t-content" style="');
			if (h.width) {
				j.cat("width:").cat(h.width).cat("px;")
			}
			if (h.height) {
				j.cat("height:").cat(h.height).cat("px;")
			}
			if (typeof(h.scrollable) != typeof(e) && h.scrollable === false) {
				j.cat("overflow:hidden;")
			}
			j.cat('">').catIf(h.html, !f || (f && d(f))).catIf('<iframe src="', f, '" title="', h.title, '" frameborder="0" style="border:0;width:100%;height:100%;">This page requires frames in order to show content</iframe>', f && !d(f)).cat("</div>").catIf("</div>", !g);
			if (g) {
				a(g).css("display", h.visible ? "" : "none").html(j.string())
			} else {
				delete h.title;
				return a(j.string()).css("display", h.visible ? "" : "none").appendTo(document.body).eq(0).tWindow(h)
			}
		},
		getResizeHandlesHtml: function() {
			var f = new b.stringBuilder();
			a.each("n e s w se sw ne nw".split(" "), function(g, h) {
				f.cat('<div class="t-resize-handle t-resize-').cat(h).catIf(" t-icon", h == "se").cat('"></div>')
			});
			return f.string()
		}
	});
	a.fn.tWindow = function(f) {
		return b.create(this, {
			name: "tWindow",
			init: function(g, h) {
				return new b.window(g, h)
			},
			success: function(h) {
				var j = h.element,
					g = a(j);
				if (g.is(":visible")) {
					b.trigger(j, "open");
					b.trigger(j, "activated")
				}
			},
			options: f
		})
	};
	a.fn.tWindow.defaults = {
		effects: {
			list: [{
				name: "zoom"
			}, {
				name: "property",
				properties: ["opacity"]
			}],
			openDuration: "fast",
			closeDuration: "fast"
		},
		modal: false,
		resizable: true,
		draggable: true,
		minWidth: 50,
		minHeight: 50
	}
})(jQuery);
(function(a, p) {
	var b = a.telerik,
		k = a.telerik.query;
	b.scripts.push("telerik.imagebrowser.js");
	b.imageBrowser = function(v, z) {
		this.element = v;
		this.wrapper = a(v);
		var w = z.filter || "*.png,*.gif,*.jpg,*.jpeg";
		var y = z.localization;
		this.wrapper.append('<div class="t-floatwrap"><div class="t-widget t-combobox t-header t-breadcrumbs"><div class="t-dropdown-wrap t-state-default"><input type="text" class="t-input" /><div class="t-breadcrumbs-wrap"/><span class="t-select t-header"><span class="t-icon t-arrow-down">select</span></span></div></div><div class="t-widget t-combobox t-dropdown-wrap t-search-wrap" /></div>').append(o(y, z.uploadUrl, z.createDirectoryUrl, z.deleteFileUrl || z.deleteDirectoryUrl)).append('<ul id="t-editor-image-list" class="t-reset t-floats t-tiles" />');
		var s = this.wrapper.find(".t-breadcrumbs");
		var x = this.wrapper.find(".t-tiles");
		var A = this.wrapper.find(".t-search-wrap");
		if (z.uploadUrl) {
			this.wrapper.find(".t-upload input").tUpload({
				async: {
					saveUrl: z.uploadUrl,
					autoUpload: true
				},
				multiple: false,
				onUpload: function(B) {
					var D = new RegExp(("(" + w.split(",").join(")|(") + ")").replace(/\*\./g, ".*."), "i");
					var C = B.files[0].name;
					if (D.test(C)) {
						B.data = {
							path: s.val()
						};
						x.trigger("t:upload", [{
							name: C
						}, function() {
							B.preventDefault()
						}])
					} else {
						B.preventDefault();
						alert(b.formatString(y.invalidFileType, C, w))
					}
				},
				onError: function(B) {
					B.preventDefault();
					x.trigger("t:error", [B.files[0]]);
					var C = B.XMLHttpRequest;
					if (b.ajaxError(z.element, "error", C, C.statusText)) {
						return
					}
				},
				onSuccess: function(B) {
					x.trigger("t:completeFile", [a.extend(B.response, {
						path: s.val()
					})])
				}
			})
		}
		new b.searchBox(A[0]);
		new b.fileListView(x[0], {
			thumbnailUrl: z.thumbUrl,
			localization: y
		});
		var u = new b.dropDown({
			effects: b.fx.slide.defaults(),
			onClick: function(B) {
				a(v).find(".t-tiles-arrange a span:first").html(a(B.item).text());
				u.close();
				s.trigger("t:change")
			}
		});
		var q = [{
			Text: y.orderByName,
			Value: "name"
		}, {
			Text: y.orderBySize,
			Value: "size"
		}];
		u.dataBind(q);
		this.wrapper.find(".t-tiles-arrange a").click(function(C) {
			C.preventDefault();
			var B = a(this);
			u.open({
				offset: B.offset(),
				outerHeight: B.outerHeight(),
				outerWidth: B.outerWidth(),
				zIndex: b.getElementZIndex(this)
			})
		}).end().delegate(".t-button:not(.t-state-disabled):has(.t-delete)", "click", function() {
			var B = x.find(".t-state-selected");
			if (B.length && confirm(b.formatString(y.deleteFile, B.find("strong").text()))) {
				a.ajax({
					type: "POST",
					url: B.data("kind") == "f" ? z.deleteFileUrl : z.deleteDirectoryUrl,
					data: {
						path: B.data("url")
					},
					error: function(D, C) {
						if (b.ajaxError(z.element, "error", D, C)) {
							return
						}
					},
					success: function() {
						x.trigger("t:delete");
						a(v).find(".t-delete").parent().addClass("t-state-disabled")
					}
				})
			}
		}).delegate(".t-button:not(.t-state-disabled):has(.t-addfolder)", "click", function() {
			x.trigger("t:createDirectory", [function(B) {
				a.ajax({
					type: "POST",
					url: z.createDirectoryUrl,
					data: {
						path: s.val(),
						name: B
					},
					error: function(D, C) {
						x.trigger("t:errorDirectory", {
							name: B
						});
						if (b.ajaxError(z.element, "error", D, C)) {
							return
						}
					},
					success: function() {
						x.trigger("t:completeDirectory", {
							path: s.val(),
							name: B
						})
					}
				})
			}])
		});
		a(document.documentElement).bind("mousedown", function(B) {
			var C = u.$element[0];
			if (!a.contains(C, B.target)) {
				u.close()
			}
		});
		var t = new b.dataSource({
			error: function(D, C) {
				var B = b.trigger(z.element, "error", {
					XMLHttpRequest: D,
					textStatus: C
				});
				if (!B) {
					if (C == "error") {
						if (D.status == "404") {
							alert(z.localization.directoryNotFound)
						} else {
							if (D.status != "0") {
								alert("Error! The requested URL returned " + D.status + " - " + D.statusText)
							}
						}
					} else {
						if (C == "timeout") {
							alert("Error! Server timeout.")
						}
					}
				}
			},
			url: z.selectUrl,
			callback: function(C) {
				a(v).find(".t-delete").parent().addClass("t-state-disabled");
				if (!s.val()) {
					new b.breadcrumbs(s[0], {
						path: C.Path,
						roots: C.ContentPaths
					})
				}
				s.val(C.Path).trigger("t:refresh");
				var B = a(v).find(".t-tiles-arrange a span:first").text();
				var E = a.map(q, function(F) {
					if (F.Text == B) {
						return F.Value
					}
				})[0];
				var D = A.val();
				x.trigger("t:refresh", [C, E, D])
			}
		});
		A.bind("t:change", function() {
			s.trigger("t:change")
		});
		t.get({
			path: ""
		});
		x.bind("t:select", function(B) {
			if (B.kind == "d") {
				t.get({
					path: B.url
				})
			} else {
				z.apply(B)
			}
		}).bind("t:change", function(B) {
			var C = a(v).find(".t-delete").parent().addClass("t-state-disabled");
			if (B.kind == "f") {
				var D = B.url;
				if (z.imageUrl) {
					D = z.imageUrl + "?path=" + D
				}
				a(v).parent().find("#t-editor-image-url").val(D)
			}
			if ((B.kind == "f" && z.deleteFileUrl) || (B.kind == "d" && z.deleteDirectoryUrl)) {
				C.removeClass("t-state-disabled")
			}
		});
		s.bind("t:change", function() {
			var B = a(this).val();
			if (!B.match(/\/$/)) {
				B = B + "/"
			}
			t.get({
				path: B
			})
		})
	};

	function o(v, u, s, t) {
		var x = !u ? "" : '<div class="t-widget t-upload"><div class="t-button t-button-icontext t-button-bare t-upload-button"><span class="t-icon t-add"></span>' + v.uploadFile + '<input type="file" name="file" /></div></div>',
			q = !s ? "" : '<button type="button" class="t-button t-button-icon t-button-bare"><span class="t-icon t-addfolder"></span></button>',
			w = !t ? "" : '<button type="button" class="t-button t-button-icon t-button-bare t-state-disabled"><span class="t-icon t-delete"></span></button>&nbsp;';
		return '<div class="t-widget t-toolbar t-floatwrap"><div class="t-toolbar-wrap">' + x + q + w + '</div><div class="t-tiles-arrange">' + v.orderBy + ' <a href="#" class="t-link"><span>' + v.orderByName + '</span><span class="t-icon t-arrow-down"></span></a></div></div>'
	}
	b.fileInfoReader = function(q) {
		this._thumbnailUrl = q.thumbnailUrl || ""
	};
	b.fileInfoReader.prototype = {
		read: function(s, q) {
			return q[s] || q[(s.charAt(0).toUpperCase() + s.substring(1))]
		},
		directories: function(q) {
			return this.read("directories", q)
		},
		files: function(q) {
			return this.read("files", q)
		},
		thumbUrl: function(s, q) {
			return this._thumbnailUrl + "/?path=" + s + encodeURIComponent(q)
		},
		size: function(q) {
			var t = this.read("size", q);
			if (!t) {
				return ""
			}
			var s = " bytes";
			if (t >= 1073741824) {
				s = " GB";
				t /= 1073741824
			} else {
				if (t >= 1048576) {
					s = " MB";
					t /= 1048576
				} else {
					if (t >= 1024) {
						s = " KB";
						t /= 1024
					}
				}
			}
			return Math.round(t * 100) / 100 + s
		},
		name: function(q) {
			return this.read("name", q)
		},
		path: function(q) {
			return this.read("path", q)
		},
		concatPaths: function(s, q) {
			if (s === p || !s.match(/\/$/)) {
				s = (s || "") + "/"
			}
			return s + encodeURIComponent(q)
		}
	};
	b.fileListView = function(q, s) {
		this.element = q;
		this.wrapper = a(q);
		this._localization = s.localization;
		this._reader = s.reader || new b.fileInfoReader({
			thumbnailUrl: s.thumbnailUrl
		});
		this._pageSize = s.pageSize || 20;
		this.wrapper.bind({
			"t:refresh": a.proxy(this._refresh, this),
			"t:upload": a.proxy(this._upload, this),
			"t:completeDirectory": a.proxy(this._completeDirectory, this),
			"t:delete": a.proxy(this._delete, this),
			"t:errorFile": a.proxy(this._errorFile, this),
			"t:errorDirectory": a.proxy(this._errorDirectory, this),
			"t:createDirectory": a.proxy(this._createDirectory, this),
			scroll: a.proxy(this._scroll, this)
		}).delegate("li[data-url]:not(.t-tile-empty)", "click", a.proxy(this._click, this)).delegate("li[data-url]:not(.t-tile-empty)", "dblclick", a.proxy(this._dblclick, this))
	};

	function g(q) {
		return '<li class="t-tile" data-filename="' + q.name + '"><div class="t-thumb"><span class="t-icon t-loading"></span></div><strong>' + q.name + "</strong></li>"
	}
	function d(q) {
		return '<li class="t-tile-empty"><strong>' + q + "</strong></li>"
	}
	function e(q) {
		return '<li class="t-tile" data-filename="' + q.name + '" data-thumburl="' + q.thumbUrl + '" data-url="' + q.url + '" data-kind="' + q.kind + '"><div class="t-thumb"><span class="t-icon t-loading"></span></div><strong>' + q.name + '</strong><span class="t-filesize">' + q.size + "</span>";
		"</li>"
	}
	function c(q) {
		return '<li class="t-tile" data-url="' + q.url + '" data-kind="' + q.kind + '"><div class="t-thumb"><span class="t-icon t-folder"></span></div><strong>' + q.name + "</strong></li>"
	}
	function h(q) {
		return '<li class="t-tile" data-kind="d"><div class="t-thumb"><span class="t-icon t-folder"></span></div><input class="t-input" value="' + q + '" /></li>'
	}
	function f(t) {
		var q = a(t);
		var s = a("<img />", {
			alt: q.data("filename")
		}).hide().bind("load", function() {
			a(this).prev().remove().end().addClass("t-image").fadeIn()
		});
		q.find(".t-loading").after(s);
		s.attr("src", q.data("thumburl"));
		t.loaded = true
	}
	if (a.browser.msie && parseFloat(a.browser.version) < 8) {
		var j = function(q) {
				return q.offsetTop
			}
	} else {
		var j = function(q) {
				return q.offsetTop - a(q).height()
			}
	}
	var l = /(\:|\^|\$|\/|\.|\+|\||\(|\)|\[|\]|\{|\}|\\)/g,
		n = /\*/g,
		m = /\?/g;

	function r(q) {
		return new RegExp(q.replace(l, "\\$1").replace(n, ".*").replace(m, ".?"), "ig")
	}
	b.fileListView.prototype = {
		bindTo: function(q, w, u) {
			this._filter = u;
			var x = this._reader;
			this.wrapper.empty();
			var s = k(this._reader.directories(q) || []);
			var t = k(this._reader.files(q) || []);
			if (u) {
				var z = function(A) {
						return r(u).test(x.name(A))
					};
				s = s.where(z);
				t = t.where(z)
			}
			var y = function(A) {
					return x[w](A)
				};
			this._data = this._process(this._reader.path(q), s.orderBy(y), t.orderBy(y));
			var v = this._data.select(function(A) {
				return A.kind == "f" ? e(A) : c(A)
			}).toArray().join("");
			this.wrapper.append(v);
			this._tiles = this.wrapper.find("li[data-kind=f]");
			this._scroll();
			this._asEmpty()
		},
		_asEmpty: function() {
			if (!this._data.any() && !this._filter) {
				this.wrapper.append(d(this._localization.emptyFolder))
			}
		},
		_completeFile: function(q, u) {
			var t = this._reader.name(q);
			var v = this._reader.path(q);
			var s = a(e({
				kind: "f",
				thumbUrl: this._reader.thumbUrl(v, t),
				url: this._reader.concatPaths(v, t),
				name: t,
				size: this._reader.size(q)
			}));
			this.wrapper.find("li").eq(this.fileIndex(u)).replaceWith(s);
			f(s[0]);
			s.click()
		},
		_completeDirectory: function(s, q) {
			var u = this._reader.name(q);
			var v = this._reader.path(q);
			var t = a(c({
				kind: "d",
				url: this._reader.concatPaths(v, u),
				name: u
			}));
			this.wrapper.find("li").eq(this.directoryIndex(u)).replaceWith(t)
		},
		_delete: function() {
			var s = this.wrapper.find(".t-state-selected");
			if (s.length) {
				var q = this._data.toArray();
				q.splice(s.index(), 1);
				this._data = k(q);
				s.remove();
				this._scroll();
				this._asEmpty()
			}
		},
		_scroll: function(q) {
			clearTimeout(this._timeout);
			this._timeout = setTimeout(a.proxy(function() {
				var s = this.wrapper.outerHeight();
				var u = this.wrapper.scrollTop();
				var t = u + s;
				this._tiles.each(function() {
					var w = j(this);
					var v = w + this.offsetHeight;
					if ((w >= u && w < t) || (v >= u && v < t)) {
						f(this)
					}
					if (w > t) {
						return false
					}
				});
				this._tiles = this._tiles.filter(function() {
					return !this.loaded
				})
			}, this), 250)
		},
		_upload: function(s, u, y) {
			var v = u.name;
			var t = this.fileIndex(v);
			if (t > -1 && !confirm(b.formatString(this._localization.overwriteFile, v))) {
				y()
			} else {
				this.wrapper.find(".t-tile-empty").remove();
				var x = a(g(u));
				if (t > -1) {
					x.data("existing", true);
					this.wrapper.find("li").eq(t).replaceWith(x)
				} else {
					var w = this.wrapper.find("li[data-kind=f]:first");
					if (w.length) {
						w.before(x)
					} else {
						this.wrapper.append(x)
					}
					var q = this._data.toArray();
					q.splice(x.index(), 0, {
						name: v,
						kind: "f"
					})
				}
				this.wrapper.scrollTop(x.attr("offsetTop") - this.element.offsetHeight);
				this.wrapper.one("t:completeFile", a.proxy(function(z, A) {
					this._completeFile(A, v)
				}, this))
			}
		},
		_nameDirectory: function() {
			var u = "New folder";
			var s = this._data.where(function(v) {
				return v.kind == "d" && v.name.indexOf(u) > -1
			}).select(function(v) {
				return v.name
			}).toArray();
			if (a.inArray(u, s) > -1) {
				var t = 2;
				do {
					var q = u + " (" + t + ")";
					t++
				} while (a.inArray(q, s) > -1);
				u = q
			}
			return u
		},
		_createDirectory: function(t, q) {
			var x = this._nameDirectory();
			var w = a(h(x));
			var u = this.wrapper.find("li[data-kind=f]:first");
			if (u.length) {
				u.before(w)
			} else {
				this.wrapper.append(w)
			}
			var s = this._data.toArray();
			var v = w.addClass("t-state-selected").siblings().removeClass("t-state-selected").end().find("input").keydown(function(y) {
				if (y.keyCode == 13) {
					this.blur()
				}
			}).blur(a.proxy(function(y) {
				var z = a.trim(y.target.value);
				if (!z || this._data.any(function(A) {
					return A.kind == "d" && A.name.toLowerCase() == z.toLowerCase()
				})) {
					z = this._nameDirectory()
				}
				s.splice(w.index(), 0, {
					name: z,
					kind: "d"
				});
				a(y.target).replaceWith("<strong>" + z + "</strong>");
				q(z)
			}, this));
			setTimeout(function() {
				v.select()
			});
			this.wrapper.find(".t-tile-empty").remove();
			this.wrapper.scrollTop(w.attr("offsetTop") - this.element.offsetHeight)
		},
		_errorFile: function(q, s) {
			var t = this.fileIndex(s.name);
			if (t > -1) {
				var u = this.wrapper.find("li").eq(t);
				if (u.data("existing")) {
					var v = a(e(this._data.toArray()[t]));
					u.replaceWith(v);
					f(v[0])
				} else {
					u.remove();
					this._data.toArray().splice(t, 1)
				}
				this._asEmpty()
			}
		},
		_errorDirectory: function(s, q) {
			var t = this.directoryIndex(q.name);
			if (t > -1) {
				this.wrapper.find("li").eq(t).remove();
				this._data.toArray().splice(t, 1);
				this._asEmpty()
			}
		},
		fileIndex: function(q) {
			return this._index("f", q)
		},
		directoryIndex: function(q) {
			return this._index("d", q)
		},
		_index: function(s, t) {
			var u = -1,
				q = this._data ? this._data.toArray() : [];
			t = t.toLowerCase();
			a.each(q, function(v, w) {
				if (w.kind == s && w.name.toLowerCase() == t) {
					u = v;
					return false
				}
			});
			return u
		},
		_raise: function(s, t) {
			var q = a(s.currentTarget);
			b.trigger(this.wrapper, t, {
				kind: q.data("kind"),
				url: q.data("url")
			})
		},
		_click: function(q) {
			a(q.currentTarget).addClass("t-state-selected").siblings().removeClass("t-state-selected");
			this._raise(q, "t:change")
		},
		_dblclick: function(q) {
			if (document.selection && document.selection.empty) {
				document.selection.empty()
			}
			this._raise(q, "t:select")
		},
		_refresh: function(s, q, u, t) {
			this.bindTo(q, u, t)
		},
		_process: function(t, q, s) {
			var u = this._reader;
			var q = q.select(function(v) {
				return {
					url: u.concatPaths(t, u.name(v)),
					name: u.name(v),
					kind: "d"
				}
			});
			var s = s.select(function(v) {
				var w = u.name(v);
				return {
					url: u.concatPaths(t, w),
					name: w,
					kind: "f",
					thumbUrl: u.thumbUrl(t, w),
					size: u.size(v)
				}
			});
			return q.concat(s)
		}
	};
	b.dataSource = function(q) {
		this._url = q.url;
		this._callback = q.callback;
		this._error = q.error
	};
	b.dataSource.prototype = {
		_complete: function(q) {
			if (this._callback) {
				this._callback(q)
			}
		},
		get: function(q) {
			a.ajax({
				type: "POST",
				url: this._url,
				data: q,
				success: a.proxy(this._complete, this),
				error: this._error
			})
		}
	};
	b.breadcrumbs = function(s, t) {
		this.element = s;
		this.wrapper = a(s);
		this._gap = t.gap || 50;
		this._initPaths(t.path);
		var q = new b.dropDown({
			effects: b.fx.slide.defaults(),
			onClick: a.proxy(function(u) {
				var v = a(u.item).text();
				q.close();
				this._initPaths(v);
				a(s).val(v).trigger("t:change")
			}, this)
		});
		q.dataBind(t.roots);
		this.wrapper.delegate("input", "focus", a.proxy(this._focus, this)).delegate("input", "blur", a.proxy(this._blur, this)).delegate("input", "keydown", a.proxy(function(u) {
			if (u.keyCode == 13) {
				this._blur()
			}
		}, this)).delegate("a:not(.t-first)", "click", b.stopAll(this._click, this)).delegate(".t-select", "click", function() {
			var u = a(s);
			q.open({
				offset: u.offset(),
				outerHeight: u.outerHeight(),
				outerWidth: u.outerWidth(),
				zIndex: b.getElementZIndex(this)
			})
		}).bind("t:refresh", a.proxy(this.refresh, this));
		a(document.documentElement).bind("mousedown", function(u) {
			var v = q.$element[0];
			if (!a.contains(v, u.target)) {
				q.close()
			}
		});
		this.value(t.path)
	};
	b.breadcrumbs.prototype = {
		_initPaths: function(q) {
			this._basePath = (q || "").replace(/\/{2,}/g, "/").replace(/\/$/, "");
			q = this._basePath.split("/");
			q.pop();
			this._root = q.join("/")
		},
		_html: function() {
			var q = this._basePath.split("/").length - 1;
			var s = this.value();
			if (s === p || !s.match(/^\//)) {
				s = "/" + (s || "")
			}
			return '<div class="t-dropdown-wrap t-state-default"><input type="text" class="t-input" /><div class="t-breadcrumbs-wrap">' + a.map(s.split("/"), function(u, t) {
				if (u && t >= q) {
					return '<a class="t-link" href="#">' + u + "</a>"
				}
			}).join('<span class="t-icon t-arrow-next">&gt;</span>') + '</div><span class="t-select t-header"><span class="t-icon t-arrow-down">select</span></span></div>'
		},
		_path: function(q) {
			return this._root + "/" + a.map(q, function(s) {
				return a(s).text()
			}).join("/")
		},
		_update: function(s) {
			s = s.charAt(0) === "/" ? s : "/" + s;
			var q = this.value() != s;
			this.value(s);
			if (q) {
				this.wrapper.trigger("t:change")
			}
		},
		value: function(q) {
			if (q !== p) {
				this.wrapper.val(q.replace(/\/{2,}/g, "/"));
				this.refresh()
			} else {
				return this.wrapper.val()
			}
		},
		_click: function(q) {
			this._update(this._path(a(q.target).prevAll("a").andSelf()))
		},
		refresh: function() {
			this.wrapper.empty().append(this._html());
			var s = this.wrapper.width() - this._gap;
			var q = this.wrapper.find("a");
			q.each(function(u) {
				var t = a(this);
				if (t.parent().width() > s) {
					if (u == q.length - 1) {
						t.width(s)
					} else {
						t.prev().andSelf().hide()
					}
				}
			})
		},
		_focus: function() {
			var q = this.wrapper.find(".t-breadcrumbs-wrap").hide().end().find("input").val(this.value());
			setTimeout(function() {
				q.select()
			})
		},
		_blur: function() {
			var q = this.wrapper.find("input").val().replace(/\/{2,}/g, "/");
			if (!q || q.toLowerCase().indexOf(this._basePath.toLowerCase()) < 0) {
				q = this._basePath
			}
			this._update(q)
		}
	};
	b.searchBox = function(q) {
		this.element = q;
		this.wrapper = a(q);
		this.wrapper.delegate("input", "focus", a.proxy(this._focus, this)).delegate("input", "blur", a.proxy(this._blur, this)).delegate("input", "keydown", a.proxy(function(s) {
			if (s.keyCode == 13) {
				this._blur()
			}
		}, this)).delegate("a", "click", b.stopAll(this._click, this));
		this._render()
	};
	b.searchBox.prototype = {
		_render: function() {
			var q = '<label for="t-imagebrowser-search">Search</label><input type="text" id="t-imagebrowser-search" class="t-input" /><a href="#" class="t-icon t-search">search</a>';
			this.wrapper.empty().append(a(q))
		},
		_focus: function() {
			this.wrapper.find("label").hide()
		},
		_blur: function() {
			this._update(this.wrapper.find("input").val());
			if (this.value() == "") {
				this.wrapper.find("label").show()
			}
		},
		_update: function(s) {
			var q = this.value() != s;
			this.value(s);
			if (q) {
				this.wrapper.trigger("t:change")
			}
		},
		value: function(q) {
			if (q !== p) {
				this.wrapper.val(q)
			} else {
				return this.wrapper.val()
			}
		},
		_click: function() {
			this._blur()
		}
	}
})(jQuery);
(function(a) {
	var v, b = a.telerik,
		q = /\.([^\.]+)$/;
	b.scripts.push("telerik.upload.js");
	b.upload = function(x, y) {
		a.extend(this, y);
		this.element = x;
		this.name = x.name;
		var w = a(x);
		this.wrapper = w.closest(".t-upload");
		if (this.wrapper.length == 0) {
			this.wrapper = this._wrapInput(w)
		}
		this._setActiveInput(w);
		this.toggle(this.enabled);
		w.closest("form").bind({
			submit: a.proxy(this._onParentFormSubmit, this),
			reset: a.proxy(this._onParentFormReset, this)
		});
		if (this.async.saveUrl != v) {
			this._module = this._getSupportsFormData() ? new d(this) : new m(this)
		} else {
			this._module = new t(this)
		}
		if (this._getSupportsDrop()) {
			this._setupDropZone()
		}
		this.wrapper.delegate(".t-upload-action", "click", a.proxy(this._onFileAction, this)).delegate(".t-upload-selected", "click", a.proxy(this._onUploadSelected, this)).delegate(".t-file", "t:progress", a.proxy(this._onFileProgress, this)).delegate(".t-file", "t:upload-success", a.proxy(this._onUploadSuccess, this)).delegate(".t-file", "t:upload-error", a.proxy(this._onUploadError, this));
		b.bind(this.wrapper, {
			load: this.onLoad,
			select: this.onSelect,
			upload: this.onUpload,
			success: this.onSuccess,
			error: this.onError,
			complete: this.onComplete,
			cancel: this.onCancel,
			remove: this.onRemove
		});
		var z = a(this.wrapper).data("tUpload", this);
		a(x).bind("load", function() {
			b.trigger(z, "load")
		})
	};
	b.upload.prototype = {
		enable: function() {
			this.toggle(true)
		},
		disable: function() {
			this.toggle(false)
		},
		toggle: function(w) {
			w = typeof w === "undefined" ? w : !w;
			this.wrapper.toggleClass("t-state-disabled", w)
		},
		_addInput: function(w) {
			w.insertAfter(this.element).data("tUpload", this);
			a(this.element).hide().removeAttr("id");
			this._setActiveInput(w)
		},
		_setActiveInput: function(w) {
			var x = this.wrapper;
			this.element = w;
			w.attr("multiple", this._getSupportsMultiple() ? this.multiple : false).attr("autocomplete", "off").click(function(y) {
				if (x.hasClass("t-state-disabled")) {
					y.preventDefault()
				}
			}).change(a.proxy(this._onInputChange, this))
		},
		_onInputChange: function(w) {
			var z = this,
				x = a(w.target),
				y = b.trigger(z.wrapper, "select", {
					files: l(x)
				});
			if (!y) {
				x.trigger("t:select")
			} else {
				z._addInput(x.clone().val(""))
			}
		},
		_onDrop: function(y) {
			var x = y.originalEvent.dataTransfer,
				w = x.files;
			r(y);
			if (w.length > 0) {
				var z = b.trigger(this.wrapper, "select", {
					files: e(w)
				});
				if (!z) {
					a(".t-dropzone", this.wrapper).trigger("t:select", [w])
				}
			}
		},
		_enqueueFile: function(A, w) {
			var z = a(".t-upload-files", this.wrapper);
			if (z.length == 0) {
				z = a("<ul class='t-upload-files t-reset'></ul>").appendTo(this.wrapper);
				if (!this.showFileList) {
					z.hide()
				}
			}
			var x = a(".t-file", z);
			var y = a("<li class='t-file'><span class='t-icon'></span><span class='t-filename' title='" + A + "'>" + A + "</span></li>").appendTo(z).data(w);
			if (!this.multiple) {
				x.trigger("t:remove")
			}
			return y
		},
		_removeFileEntry: function(x) {
			var y = x.closest(".t-upload-files"),
				w;
			x.remove();
			w = a(".t-file", y);
			if (w.find("> .t-fail").length === w.length) {
				this._hideUploadButton()
			}
			if (w.length == 0) {
				y.remove()
			}
		},
		_setFileAction: function(y, w) {
			var x = {
				remove: "t-delete",
				cancel: "t-cancel",
				retry: "t-retry"
			};
			if (!x.hasOwnProperty(w)) {
				return
			}
			this._clearFileAction(y);
			y.append(this._renderAction(x[w], this.localization[w]).addClass("t-upload-action"))
		},
		_setFileState: function(x, z) {
			var A = {
				uploading: {
					cssClass: "t-loading",
					text: this.localization.statusUploading
				},
				uploaded: {
					cssClass: "t-success",
					text: this.localization.statusUploaded
				},
				failed: {
					cssClass: "t-fail",
					text: this.localization.statusFailed
				}
			};
			var w = A[z];
			if (w) {
				var y = x.children(".t-icon").text(w.text);
				y[0].className = "t-icon " + w.cssClass
			}
		},
		_renderAction: function(w, x) {
			if (w != "") {
				return a("<button type='button' class='t-button t-button-icontext'><span class='t-icon " + w + "'></span>" + x + "</button>")
			} else {
				return a("<button type='button' class='t-button'>" + x + "</button>")
			}
		},
		_clearFileAction: function(w) {
			w.find(".t-upload-action").remove()
		},
		_onFileAction: function(x) {
			if (!this.wrapper.hasClass("t-state-disabled")) {
				var w = a(x.target).closest(".t-upload-action"),
					A = w.find(".t-icon"),
					z = w.closest(".t-file"),
					y = {
						files: z.data("fileNames")
					};
				if (A.hasClass("t-delete")) {
					if (!b.trigger(this.wrapper, "remove", y)) {
						z.trigger("t:remove", y.data)
					}
				} else {
					if (A.hasClass("t-cancel")) {
						b.trigger(this.wrapper, "cancel", y);
						z.trigger("t:cancel");
						this._checkAllComplete()
					} else {
						if (A.hasClass("t-retry")) {
							z.trigger("t:retry")
						}
					}
				}
			}
			return false
		},
		_onUploadSelected: function() {
			this.wrapper.trigger("t:saveSelected");
			return false
		},
		_onFileProgress: function(w, x) {
			var y = a(".t-progress-status", w.target);
			if (y.length == 0) {
				y = a("<span class='t-progress'><span class='t-progress-status' style='width: 0;'></span></span>").appendTo(a(".t-filename", w.target)).find(".t-progress-status")
			}
			y.width(x + "%")
		},
		_onUploadSuccess: function(w, y, z) {
			var x = g(w);
			this._setFileState(x, "uploaded");
			b.trigger(this.wrapper, "success", {
				files: x.data("fileNames"),
				response: y,
				operation: "upload",
				XMLHttpRequest: z
			});
			if (this._supportsRemove()) {
				this._setFileAction(x, "remove")
			} else {
				this._clearFileAction(x)
			}
			this._checkAllComplete()
		},
		_onUploadError: function(w, z) {
			var x = g(w);
			this._setFileState(x, "failed");
			this._setFileAction(x, "retry");
			var y = b.trigger(this.wrapper, "error", {
				operation: "upload",
				files: x.data("fileNames"),
				XMLHttpRequest: z
			});
			o("Server response: " + z.responseText);
			if (!y) {
				this._alert("Error! Upload failed. Unexpected server response - see console.")
			}
			this._checkAllComplete()
		},
		_showUploadButton: function() {
			var w = a(".t-upload-selected", this.wrapper);
			if (w.length == 0) {
				w = this._renderAction("", this.localization.uploadSelectedFiles).addClass("t-upload-selected")
			}
			this.wrapper.append(w)
		},
		_hideUploadButton: function() {
			a(".t-upload-selected", this.wrapper).remove()
		},
		_onParentFormSubmit: function() {
			var y = this,
				w = y.element;
			w.trigger("t:abort");
			if (!w.value) {
				var x = a(w);
				x.attr("disabled", "disabled");
				window.setTimeout(function() {
					x.removeAttr("disabled")
				}, 0)
			}
		},
		_onParentFormReset: function() {
			a(".t-upload-files", this.wrapper).remove()
		},
		_getSupportsFormData: function() {
			return typeof(FormData) != "undefined"
		},
		_getSupportsMultiple: function() {
			return !a.browser.opera
		},
		_getSupportsDrop: function() {
			var z = this._getUserAgent().toLowerCase(),
				w = /chrome/.test(z),
				x = !w && /safari/.test(z),
				y = x && /windows/.test(z);
			return !y && this._getSupportsFormData() && (this.async.saveUrl != v)
		},
		_getUserAgent: function() {
			return navigator.userAgent
		},
		_setupDropZone: function() {
			a(".t-upload-button", this.wrapper).wrap("<div class='t-dropzone'></div>");
			var w = a(".t-dropzone", this.wrapper).append(a("<em>" + this.localization.dropFilesHere + "</em>")).bind({
				dragenter: r,
				dragover: function(x) {
					x.preventDefault()
				},
				drop: a.proxy(this._onDrop, this)
			});
			c(w, function() {
				w.addClass("t-dropzone-hovered")
			}, function() {
				w.removeClass("t-dropzone-hovered")
			});
			c(a(document), function() {
				w.addClass("t-dropzone-active")
			}, function() {
				w.removeClass("t-dropzone-active")
			})
		},
		_supportsRemove: function() {
			return this.async.removeUrl != v
		},
		_submitRemove: function(x, w, z, y) {
			var A = a.extend(w, f());
			A.fileNames = x;
			a.ajax({
				type: "POST",
				dataType: "json",
				url: this.async.removeUrl,
				traditional: true,
				data: A,
				success: z,
				error: y
			})
		},
		_alert: function(w) {
			alert(w)
		},
		_wrapInput: function(w) {
			w.wrap("<div class='t-widget t-upload'><div class='t-button t-upload-button'></div></div>");
			w.closest(".t-button").append("<span>" + this.localization.select + "</span>");
			return w.closest(".t-upload")
		},
		_checkAllComplete: function() {
			if (a(".t-file .t-icon.t-loading", this.wrapper).length == 0) {
				b.trigger(this.wrapper, "complete")
			}
		}
	};
	a.fn.tUpload = function(w) {
		return b.create(this, {
			name: "tUpload",
			init: function(x, y) {
				return new b.upload(x, y)
			},
			options: w
		})
	};
	a.fn.tUpload.defaults = {
		enabled: true,
		multiple: true,
		showFileList: true,
		async: {},
		localization: {
			select: "Select...",
			cancel: "Cancel",
			retry: "Retry",
			remove: "Remove",
			uploadSelectedFiles: "Upload files",
			dropFilesHere: "drop files here to upload",
			statusUploading: "uploading",
			statusUploaded: "uploaded",
			statusFailed: "failed"
		}
	};
	var t = function(w) {
			this.name = "syncUploadModule";
			this.element = w.wrapper;
			this.upload = w;
			this.element.bind("t:select", a.proxy(this.onSelect, this)).bind("t:remove", a.proxy(this.onRemove, this)).closest("form").attr("enctype", "multipart/form-data").attr("encoding", "multipart/form-data")
		};
	t.prototype = {
		onSelect: function(w) {
			var z = this.upload;
			var y = a(w.target);
			z._addInput(y.clone().val(""));
			var x = z._enqueueFile(k(y), {
				relatedInput: y
			});
			z._setFileAction(x, "remove")
		},
		onRemove: function(w) {
			var x = g(w);
			x.data("relatedInput").remove();
			this.upload._removeFileEntry(x)
		}
	};
	var m = function(w) {
			this.name = "iframeUploadModule";
			this.element = w.wrapper;
			this.upload = w;
			this.iframes = [];
			this.element.bind("t:select", a.proxy(this.onSelect, this)).bind("t:cancel", a.proxy(this.onCancel, this)).bind("t:retry", a.proxy(this.onRetry, this)).bind("t:remove", a.proxy(this.onRemove, this)).bind("t:saveSelected", a.proxy(this.onSaveSelected, this)).bind("t:abort", a.proxy(this.onAbort, this))
		};
	b.upload._frameId = 0;
	m.prototype = {
		onSelect: function(w) {
			var z = this.upload,
				y = a(w.target);
			var x = this.prepareUpload(y);
			if (z.async.autoUpload) {
				this.performUpload(x)
			} else {
				if (z._supportsRemove()) {
					this.upload._setFileAction(x, "remove")
				}
				z._showUploadButton()
			}
		},
		prepareUpload: function(B) {
			var C = this.upload;
			var w = a(C.element);
			var A = C.async.saveField || B.attr("name");
			C._addInput(B.clone().val(""));
			B.attr("name", A);
			var z = this.createFrame(C.name + "_" + b.upload._frameId++);
			this.registerFrame(z);
			var y = this.createForm(C.async.saveUrl, z.attr("name")).append(w);
			var x = C._enqueueFile(k(B), {
				frame: z,
				relatedInput: w,
				fileNames: l(B)
			});
			z.data({
				form: y,
				file: x
			});
			return x
		},
		performUpload: function(y) {
			var x = {
				files: y.data("fileNames")
			},
				A = y.data("frame"),
				C = this.upload;
			if (!b.trigger(C.wrapper, "upload", x)) {
				C._hideUploadButton();
				A.appendTo(document.body);
				var z = A.data("form").appendTo(document.body);
				x.data = a.extend({}, x.data, f());
				for (var B in x.data) {
					var w = z.find("input[name='" + B + "']");
					if (w.length == 0) {
						w = a("<input>", {
							type: "hidden",
							name: B
						}).prependTo(z)
					}
					w.val(x.data[B])
				}
				C._setFileAction(y, "cancel");
				C._setFileState(y, "uploading");
				A.one("load", a.proxy(this.onIframeLoad, this));
				z[0].submit()
			} else {
				C._removeFileEntry(A.data("file"));
				this.cleanupFrame(A);
				this.unregisterFrame(A)
			}
		},
		onSaveSelected: function(w) {
			var x = this;
			a(".t-file", this.element).each(function() {
				var y = a(this),
					z = n(y);
				if (!z) {
					x.performUpload(y)
				}
			})
		},
		onIframeLoad: function(w) {
			var x = a(w.target);
			try {
				var y = x.contents().text()
			} catch (w) {
				y = "Error trying to get server response: " + w
			}
			this.processResponse(x, y)
		},
		processResponse: function(y, A) {
			var x = y.data("file"),
				z = this,
				w = {
					responseText: A
				};
			u(A, function(B) {
				a.extend(w, {
					statusText: "OK",
					status: "200"
				});
				x.trigger("t:upload-success", [B, w]);
				z.cleanupFrame(y);
				z.unregisterFrame(y)
			}, function() {
				a.extend(w, {
					statusText: "error",
					status: "500"
				});
				x.trigger("t:upload-error", [w])
			})
		},
		onCancel: function(w) {
			var x = a(w.target).data("frame");
			this.stopFrameSubmit(x);
			this.cleanupFrame(x);
			this.unregisterFrame(x);
			this.upload._removeFileEntry(x.data("file"))
		},
		onRetry: function(w) {
			var x = g(w);
			this.performUpload(x)
		},
		onRemove: function(x, w) {
			var y = g(x);
			var z = y.data("frame");
			if (z) {
				this.unregisterFrame(z);
				this.upload._removeFileEntry(y);
				this.cleanupFrame(z)
			} else {
				p(y, this.upload, w)
			}
		},
		onAbort: function() {
			var w = this.element,
				x = this;
			a.each(this.iframes, function() {
				a("input", this.data("form")).appendTo(w);
				x.stopFrameSubmit(this[0]);
				this.data("form").remove();
				this.remove()
			});
			this.iframes = []
		},
		createFrame: function(w) {
			return a("<iframe name='" + w + "' id='" + w + "' style='display:none;' />")
		},
		createForm: function(w, x) {
			return a("<form enctype='multipart/form-data' method='POST' action='" + w + "' target='" + x + "'/>")
		},
		stopFrameSubmit: function(w) {
			if (typeof(w.stop) != "undefined") {
				w.stop()
			} else {
				if (w.document) {
					w.document.execCommand("Stop");
					w.contentWindow.location.href = w.contentWindow.location.href
				}
			}
		},
		registerFrame: function(w) {
			this.iframes.push(w)
		},
		unregisterFrame: function(w) {
			this.iframes = a.grep(this.iframes, function(x) {
				return x.attr("name") != w.attr("name")
			})
		},
		cleanupFrame: function(x) {
			var w = x.data("form");
			x.data("file").data("frame", null);
			setTimeout(function() {
				w.remove();
				x.remove()
			}, 1)
		}
	};
	var d = function(w) {
			this.name = "formDataUploadModule";
			this.element = w.wrapper;
			this.upload = w;
			this.element.bind("t:select", a.proxy(this.onSelect, this)).bind("t:cancel", a.proxy(this.onCancel, this)).bind("t:remove", a.proxy(this.onRemove, this)).bind("t:retry", a.proxy(this.onRetry, this)).bind("t:saveSelected", a.proxy(this.onSaveSelected, this)).bind("t:abort", a.proxy(this.onAbort, this))
		};
	d.prototype = {
		onSelect: function(w, A) {
			var C = this.upload,
				z = this,
				B = a(w.target),
				y = A ? e(A) : this.getInputFiles(B),
				x = this.prepareUpload(B, y);
			a.each(x, function() {
				if (C.async.autoUpload) {
					z.performUpload(this)
				} else {
					if (C._supportsRemove()) {
						C._setFileAction(this, "remove")
					}
					C._showUploadButton()
				}
			})
		},
		prepareUpload: function(y, x) {
			var w = this.enqueueFiles(x);
			if (y.is("input")) {
				a.each(w, function() {
					a(this).data("relatedInput", y)
				});
				y.data("relatedFileEntries", w);
				this.upload._addInput(y.clone().val(""))
			}
			return w
		},
		enqueueFiles: function(w) {
			var B = this.upload;
			fileEntries = [];
			for (var z = 0; z < w.length; z++) {
				var x = w[z],
					A = x.name;
				var y = B._enqueueFile(A, {
					fileNames: [x]
				});
				y.data("formData", this.createFormData(w[z]));
				fileEntries.push(y)
			}
			return fileEntries
		},
		getInputFiles: function(w) {
			return l(w)
		},
		performUpload: function(x) {
			var A = this.upload,
				y = x.data("formData"),
				w = {
					files: x.data("fileNames")
				};
			if (!b.trigger(this.element, "upload", w)) {
				A._setFileAction(x, "cancel");
				A._hideUploadButton();
				w.data = a.extend({}, w.data, f());
				for (var z in w.data) {
					y.append(z, w.data[z])
				}
				A._setFileState(x, "uploading");
				this.postFormData(this.upload.async.saveUrl, y, x)
			} else {
				this.removeFileEntry(x)
			}
		},
		onSaveSelected: function(w) {
			var x = this;
			a(".t-file", this.element).each(function() {
				var y = a(this),
					z = n(y);
				if (!z) {
					x.performUpload(y)
				}
			})
		},
		onCancel: function(w) {
			var x = g(w);
			this.stopUploadRequest(x);
			this.removeFileEntry(x)
		},
		onRetry: function(w) {
			var x = g(w);
			this.performUpload(x)
		},
		onRemove: function(x, w) {
			var y = g(x);
			if (y.children(".t-icon").is(".t-success")) {
				p(y, this.upload, w)
			} else {
				this.removeFileEntry(y)
			}
		},
		postFormData: function(z, w, x) {
			var A = new XMLHttpRequest(),
				y = this;
			x.data("request", A);
			A.addEventListener("load", function(B) {
				y.onRequestSuccess.call(y, B, x)
			}, false);
			A.addEventListener("error", function(B) {
				y.onRequestError.call(y, B, x)
			}, false);
			A.upload.addEventListener("progress", function(B) {
				y.onRequestProgress.call(y, B, x)
			}, false);
			A.open("POST", z);
			A.send(w)
		},
		createFormData: function(w) {
			var x = new FormData(),
				y = this.upload;
			x.append(y.async.saveField || y.name, w.rawFile);
			return x
		},
		onRequestSuccess: function(w, x) {
			var z = w.target,
				y = this;
			u(z.responseText, function(A) {
				x.trigger("t:upload-success", [A, z]);
				x.trigger("t:progress", [100]);
				y.cleanupFileEntry(x)
			}, function() {
				x.trigger("t:upload-error", [z])
			})
		},
		onRequestError: function(w, x) {
			var y = w.target;
			x.trigger("t:upload-error", [y])
		},
		cleanupFileEntry: function(w) {
			var x = w.data("relatedInput"),
				y = true;
			if (x) {
				a.each(x.data("relatedFileEntries"), function() {
					if (this.parent().length > 0 && this[0] != w[0]) {
						y = y && this.children(".t-icon").is(".t-success")
					}
				});
				if (y) {
					x.remove()
				}
			}
			w.data("formData", null)
		},
		removeFileEntry: function(w) {
			this.cleanupFileEntry(w);
			this.upload._removeFileEntry(w)
		},
		onRequestProgress: function(w, x) {
			var y = Math.round(w.loaded * 100 / w.total);
			x.trigger("t:progress", [y])
		},
		stopUploadRequest: function(w) {
			w.data("request").abort()
		}
	};

	function k(w) {
		return a.map(l(w), function(x) {
			return x.name
		}).join(", ")
	}
	function l(w) {
		var x = w[0];
		if (x.files) {
			return e(x.files)
		} else {
			return [{
				name: s(x.value),
				extension: h(x.value),
				size: null
			}]
		}
	}
	function e(w) {
		return a.map(w, function(x) {
			return j(x)
		})
	}
	function j(x) {
		var w = x.name || x.fileName;
		return {
			name: w,
			extension: h(w),
			size: x.size || x.fileSize,
			rawFile: x
		}
	}
	function h(w) {
		var x = w.match(q);
		return x ? x[0] : ""
	}
	function s(w) {
		var x = w.lastIndexOf("\\");
		return (x != -1) ? w.substr(x + 1) : w
	}
	function p(x, C, w) {
		if (!C._supportsRemove()) {
			return
		}
		var z = x.data("fileNames");
		var y = a.map(z, function(D) {
			return D.name
		});
		C._submitRemove(y, w, function B(D, E, F) {
			C._removeFileEntry(x);
			b.trigger(C.wrapper, "success", {
				operation: "remove",
				files: z,
				response: D,
				XMLHttpRequest: F
			})
		}, function A(F, E, E) {
			var D = b.trigger(C.wrapper, "error", {
				operation: "remove",
				files: z,
				XMLHttpRequest: F
			});
			o("Server response: " + F.responseText);
			if (!D) {
				C._alert("Error! Remove operation failed. Unexpected response - see console.")
			}
		})
	}
	function u(x, A, z) {
		try {
			var y = a.parseJSON(x)
		} catch (w) {
			z();
			return
		}
		A(y)
	}
	function r(w) {
		w.stopPropagation();
		w.preventDefault()
	}
	function c(w, z, A) {
		var x, y;
		w.bind("dragenter", function(B) {
			z();
			y = new Date();
			if (!x) {
				x = setInterval(function() {
					var C = new Date() - y;
					if (C > 100) {
						A();
						clearInterval(x);
						x = null
					}
				}, 100)
			}
		}).bind("dragover", function(B) {
			y = new Date()
		})
	}
	function n(w) {
		return w.children(".t-icon").is(".t-loading, .t-success, .t-fail")
	}
	function o(w) {
		if (typeof(console) != "undefined" && console.log) {
			console.log(w)
		}
	}
	function g(w) {
		return a(w.target).closest(".t-file")
	}
	function f() {
		var w = {};
		a("input[name^='__RequestVerificationToken']").each(function() {
			w[this.name] = this.value
		});
		return w
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.editor.js");

	function aw(a8) {
		var a9 = {};
		for (var a7 = 0; a7 < a8.length; a7++) {
			a9[a8[a7]] = true
		}
		return a9
	}
	var y = aw("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(",")),
		g = "div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,pre,script,table,tbody,td,tfoot,th,thead,tr,ul".split(","),
		f = aw(g),
		ac = "span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var".split(","),
		ab = aw(ac),
		D = aw("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected".split(","));
	var aA = function(a7) {
			if (a7.nodeType == 1) {
				a7.normalize()
			}
		};
	if (a.browser.msie && parseInt(a.browser.version) >= 8) {
		aA = function(a8) {
			if (a8.nodeType == 1 && a8.firstChild) {
				var a9 = a8.firstChild,
					a7 = a9;
				while (a7 = a7.nextSibling) {
					if (a7.nodeType == 3 && a9.nodeType == 3) {
						a7.nodeValue = a9.nodeValue + a7.nodeValue;
						w.remove(a9)
					}
					a9 = a7
				}
			}
		}
	}
	function F(a8) {
		var a7 = 0;
		while (a8 = a8.previousSibling) {
			a7++
		}
		return a7
	}
	function al(a7) {
		return a7 && a7.nodeValue !== null && a7.data !== null
	}
	function aj(a9, a8) {
		try {
			return !al(a9) && (a.contains(a9, al(a8) ? a8.parentNode : a8) || a8.parentNode == a9)
		} catch (a7) {
			return false
		}
	}
	function ak(a8, a7) {
		return aj(a8, a7) || a8 == a7
	}
	function E(a8, a7) {
		if (aj(a8, a7)) {
			while (a7 && a7.parentNode != a8) {
				a7 = a7.parentNode
			}
		}
		return a7
	}
	function S(a7) {
		return al(a7) ? a7.length : a7.childNodes.length
	}
	function aR(a8, a9) {
		var a7 = a8.cloneNode(false);
		a8.deleteData(a9, a8.length);
		a7.deleteData(0, a9);
		w.insertAfter(a7, a8)
	}
	function e(a9, a7) {
		for (var a8 in a7) {
			var ba = a9[a8];
			if (a8 == "float") {
				ba = a9[a.support.cssFloat ? "cssFloat" : "styleFloat"]
			}
			if (typeof ba == "object") {
				if (!e(ba, a7[a8])) {
					return false
				}
			} else {
				if (ba != a7[a8]) {
					return false
				}
			}
		}
		return true
	}
	var a5 = /^\s+$/;
	var aK = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
	var u = ("color,padding-left,padding-right,padding-top,padding-bottom,background-color,background-attachment,background-image,background-position,background-repeat,border-top-style,border-top-width,border-top-color,border-bottom-style,border-bottom-width,border-bottom-color,border-left-style,border-left-width,border-left-color,border-right-style,border-right-width,border-right-color,font-family,font-size,font-style,font-variant,font-weight,line-height").split(",");
	var w = {
		blockParentOrBody: function(a7) {
			return w.parentOfType(a7, g) || a7.ownerDocument.body
		},
		normalize: aA,
		toHex: function(a7) {
			var a8 = aK.exec(a7);
			if (!a8) {
				return a7
			}
			return "#" + a.map(a8.slice(1), function(a9) {
				return a9 = parseInt(a9).toString(16), a9.length > 1 ? a9 : "0" + a9
			}).join("")
		},
		encode: function(a7) {
			return a7.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00a0/g, "&nbsp;")
		},
		name: function(a7) {
			return a7.nodeName.toLowerCase()
		},
		significantChildNodes: function(a7) {
			return a.grep(a7.childNodes, function(a8) {
				return a8.nodeType != 3 || !w.isWhitespace(a8)
			})
		},
		lastTextNode: function(a8) {
			if (a8.nodeType == 3) {
				return a8
			}
			var a9 = null;
			for (var a7 = a8.lastChild; a7; a7 = a7.previousSibling) {
				if (a9 = w.lastTextNode(a7)) {
					return a9
				}
			}
			return a9
		},
		is: function(a7, a8) {
			return w.name(a7) == a8
		},
		isMarker: function(a7) {
			return a7.className == "t-marker"
		},
		isWhitespace: function(a7) {
			return a5.test(a7.nodeValue)
		},
		isBlock: function(a7) {
			return f[w.name(a7)]
		},
		isEmpty: function(a7) {
			return y[w.name(a7)]
		},
		isInline: function(a7) {
			return ab[w.name(a7)]
		},
		scrollTo: function(a7) {
			a7.ownerDocument.body.scrollTop = a(al(a7) ? a7.parentNode : a7).offset().top
		},
		insertAt: function(a8, a7, a9) {
			a8.insertBefore(a7, a8.childNodes[a9] || null)
		},
		insertBefore: function(a7, a8) {
			if (a8.parentNode) {
				return a8.parentNode.insertBefore(a7, a8)
			} else {
				return a8
			}
		},
		insertAfter: function(a7, a8) {
			return a8.parentNode.insertBefore(a7, a8.nextSibling)
		},
		remove: function(a7) {
			a7.parentNode.removeChild(a7)
		},
		trim: function(a9) {
			for (var a7 = a9.childNodes.length - 1; a7 >= 0; a7--) {
				var a8 = a9.childNodes[a7];
				if (al(a8)) {
					if (a8.nodeValue.replace(/\ufeff/g, "").length == 0) {
						w.remove(a8)
					}
					if (w.isWhitespace(a8)) {
						w.insertBefore(a8, a9)
					}
				} else {
					if (a8.className != "t-marker") {
						w.trim(a8);
						if (a8.childNodes.length == 0 && !w.isEmpty(a8)) {
							w.remove(a8)
						}
					}
				}
			}
			return a9
		},
		parentOfType: function(a7, a8) {
			do {
				a7 = a7.parentNode
			} while (a7 && !(w.ofType(a7, a8)));
			return a7
		},
		ofType: function(a7, a8) {
			return a.inArray(w.name(a7), a8) >= 0
		},
		changeTag: function(bc, bd) {
			var bb = w.create(bc.ownerDocument, bd);
			var a8 = bc.attributes;
			for (var a9 = 0; a9 < a8.length; a9++) {
				var a7 = a8[a9];
				if (a7.specified) {
					var ba = a7.nodeName;
					var be = a7.nodeValue;
					if (ba == "class") {
						bb.className = be
					} else {
						if (ba == "style") {
							bb.style.cssText = bc.style.cssText
						} else {
							bb.setAttribute(ba, be)
						}
					}
				}
			}
			while (bc.firstChild) {
				bb.appendChild(bc.firstChild)
			}
			w.insertBefore(bb, bc);
			w.remove(bc);
			return bb
		},
		wrap: function(a7, a8) {
			w.insertBefore(a8, a7);
			a8.appendChild(a7);
			return a8
		},
		unwrap: function(a7) {
			var a8 = a7.parentNode;
			while (a7.firstChild) {
				a8.insertBefore(a7.firstChild, a7)
			}
			a8.removeChild(a7)
		},
		create: function(a8, a9, a7) {
			return w.attr(a8.createElement(a9), a7)
		},
		attr: function(a8, a7) {
			a7 = a.extend({}, a7);
			if (a7 && "style" in a7) {
				w.style(a8, a7.style);
				delete a7.style
			}
			return a.extend(a8, a7)
		},
		style: function(a7, a8) {
			a(a7).css(a8 || {})
		},
		unstyle: function(a8, a9) {
			for (var a7 in a9) {
				if (a7 == "float") {
					a7 = a.support.cssFloat ? "cssFloat" : "styleFloat"
				}
				a8.style[a7] = ""
			}
			if (a8.style.cssText == "") {
				a8.removeAttribute("style")
			}
		},
		inlineStyle: function(a9, ba, a8) {
			var bb = w.create(a9, ba, a8);
			a9.body.appendChild(bb);
			var a7 = a(bb);
			var bc = a.map(u, function(bd) {
				if (a.browser.msie && bd == "line-height" && a7.css(bd) == "1px") {
					return "line-height:1.5"
				} else {
					return bd + ":" + a7.css(bd)
				}
			}).join(";");
			a7.remove();
			return bc
		},
		removeClass: function(bb, a9) {
			var a8 = " " + bb.className + " ",
				a7 = a9.split(" ");
			for (var ba = 0; ba < a7.length; ba++) {
				a8 = a8.replace(" " + a7[ba] + " ", " ")
			}
			a8 = a.trim(a8);
			if (a8.length) {
				bb.className = a8
			} else {
				bb.removeAttribute("class")
			}
		},
		commonAncestor: function() {
			var a8 = arguments.length;
			if (!a8) {
				return null
			}
			if (a8 == 1) {
				return arguments[0]
			}
			var bf = [];
			var bc = Infinity;
			for (var ba = 0; ba < a8; ba++) {
				var a7 = [];
				var bd = arguments[ba];
				while (bd) {
					a7.push(bd);
					bd = bd.parentNode
				}
				bf.push(a7.reverse());
				bc = Math.min(bc, a7.length)
			}
			if (a8 == 1) {
				return bf[0][0]
			}
			var be = null;
			for (ba = 0; ba < bc; ba++) {
				var a9 = bf[0][ba];
				for (var bb = 1; bb < a8; bb++) {
					if (a9 != bf[bb][ba]) {
						return be
					}
				}
				be = a9
			}
			return be
		}
	};
	var J = "xx-small,x-small,small,medium,large,x-large,xx-large".split(","),
		aF = /"/g,
		n = /<br[^>]*>/i,
		A = /<p><\/p>/i;

	function x(bb) {
		var ba = [];
		var bc = {
			"telerik:script": {
				start: function(bd) {
					ba.push("<script");
					a7(bd);
					ba.push(">")
				},
				end: function() {
					ba.push("</script>")
				}
			},
			b: {
				start: function() {
					ba.push("<strong>")
				},
				end: function() {
					ba.push("</strong>")
				}
			},
			i: {
				start: function() {
					ba.push("<em>")
				},
				end: function() {
					ba.push("</em>")
				}
			},
			u: {
				start: function() {
					ba.push('<span style="text-decoration:underline;">')
				},
				end: function() {
					ba.push("</span>")
				}
			},
			font: {
				start: function(bf) {
					ba.push('<span style="');
					var bd = bf.getAttribute("color");
					var bg = J[bf.getAttribute("size")];
					var be = bf.getAttribute("face");
					if (bd) {
						ba.push("color:");
						ba.push(w.toHex(bd));
						ba.push(";")
					}
					if (be) {
						ba.push("font-face:");
						ba.push(be);
						ba.push(";")
					}
					if (bg) {
						ba.push("font-size:");
						ba.push(bg);
						ba.push(";")
					}
					ba.push('">')
				},
				end: function(bd) {
					ba.push("</span>")
				}
			}
		};

		function a7(bp) {
			var bt = [],
				bg = bp.attributes,
				bu = a.trim;
			if (w.is(bp, "img")) {
				var bw = bp.style.width,
					bk = bp.style.height,
					bd = a(bp);
				if (bw) {
					bd.attr("width", parseInt(bw));
					w.unstyle(bp, {
						width: undefined
					})
				}
				if (bk) {
					bd.attr("height", parseInt(bk));
					w.unstyle(bp, {
						height: undefined
					})
				}
			}
			for (var bl = 0, bm = bg.length; bl < bm; bl++) {
				var be = bg[bl];
				var bo = be.nodeName;
				if (be.specified || (bo == "value" && bp.value != "") || (bo == "type" && be.nodeValue == "text")) {
					if (bo.indexOf("_moz") < 0 && bo != "complete") {
						bt.push(be)
					}
				}
			}
			if (!bt.length) {
				return
			}
			bt.sort(function(bx, by) {
				return bx.nodeName > by.nodeName ? 1 : bx.nodeName < by.nodeName ? -1 : 0
			});
			for (var bl = 0, bm = bt.length; bl < bm; bl++) {
				var be = bt[bl];
				var bf = be.nodeName;
				var bh = be.nodeValue;
				ba.push(" ");
				ba.push(bf);
				ba.push('="');
				if (bf == "style") {
					var bi = bu(bh || bp.style.cssText).split(";");
					for (var bj = 0, bn = bi.length; bj < bn; bj++) {
						var bq = bi[bj];
						if (bq.length) {
							var bs = bq.split(":");
							var br = bu(bs[0].toLowerCase()),
								bv = bu(bs[1]);
							if (br == "font-size-adjust" || br == "font-stretch") {
								continue
							}
							if (br.indexOf("color") >= 0) {
								bv = w.toHex(bv)
							}
							if (br.indexOf("font") >= 0) {
								bv = bv.replace(aF, "'")
							}
							ba.push(br);
							ba.push(":");
							ba.push(bv);
							ba.push(";")
						}
					}
				} else {
					if (bf == "src" || bf == "href") {
						ba.push(bp.getAttribute(bf, 2))
					} else {
						ba.push(D[bf] ? bf : bh)
					}
				}
				ba.push('"')
			}
		}
		function a9(be, bf) {
			for (var bd = be.firstChild; bd; bd = bd.nextSibling) {
				a8(bd, bf)
			}
		}
		function a8(be, bi) {
			var bf = be.nodeType;
			if (bf == 1) {
				var bj = w.name(be);
				if (bj == "" || (be.attributes._moz_dirty && w.is(be, "br"))) {
					return
				}
				var bd = bc[bj];
				if (bd) {
					bd.start(be);
					a9(be);
					bd.end(be);
					return
				}
				ba.push("<");
				ba.push(bj);
				a7(be);
				if (y[bj]) {
					ba.push(" />")
				} else {
					ba.push(">");
					a9(be, bi || w.is(be, "pre"));
					ba.push("</");
					ba.push(bj);
					ba.push(">")
				}
			} else {
				if (bf == 3) {
					var bk = be.nodeValue;
					if (!bi && a.support.leadingWhitespace) {
						var bg = be.parentNode;
						var bh = be.previousSibling;
						if (!bh) {
							bh = (w.isInline(bg) ? bg : be).previousSibling
						}
						if (!bh || bh.innerHTML == "" || w.isBlock(bh)) {
							bk = bk.replace(/^[\r\n\v\f\t ]+/, "")
						}
						bk = bk.replace(/ +/, " ")
					}
					ba.push(w.encode(bk))
				} else {
					if (bf == 4) {
						ba.push("<![CDATA[");
						ba.push(be.data);
						ba.push("]]>")
					} else {
						if (bf == 8) {
							if (be.data.indexOf("[CDATA[") < 0) {
								ba.push("<!--");
								ba.push(be.data);
								ba.push("-->")
							} else {
								ba.push("<!");
								ba.push(be.data);
								ba.push(">")
							}
						}
					}
				}
			}
		}
		a9(bb);
		ba = ba.join("");
		if (ba.replace(n, "").replace(A, "") == "") {
			return ""
		}
		return ba
	}
	var aT = 0,
		aS = 1,
		B = 2,
		C = 3;

	function v(a7) {
		var a8 = a7.startContainer;
		return a8.nodeType == 9 ? a8 : a8.ownerDocument
	}
	function aO(a7) {
		if (a.browser.msie && a.browser.version < 9) {
			return new a4(a7.document)
		}
		return a7.getSelection()
	}
	function aN(a8) {
		var a7 = v(a8);
		return aM(a7)
	}
	function aM(a7) {
		return aO(a6(a7))
	}
	function a6(a7) {
		return a7.defaultView || a7.parentWindow
	}
	function aQ(a9, a7, ba) {
		function a8(bd) {
			var bc = a9.cloneRange();
			bc.collapse(bd);
			bc[bd ? "setStartBefore" : "setEndAfter"](a7);
			var bb = bc.extractContents();
			if (ba) {
				bb = w.trim(bb)
			}
			w[bd ? "insertBefore" : "insertAfter"](bb, a7)
		}
		a8(true);
		a8(false)
	}
	function aP(a8) {
		var a7 = aI.image(a8);
		if (a7) {
			a8.setStartAfter(a7);
			a8.setEndAfter(a7)
		}
		var a9 = aN(a8);
		a9.removeAllRanges();
		a9.addRange(a8)
	}
	function a3(a7) {
		a.extend(this, {
			ownerDocument: a7,
			startContainer: a7,
			endContainer: a7,
			commonAncestorContainer: a7,
			startOffset: 0,
			endOffset: 0,
			collapsed: true
		})
	}
	a3.prototype = {
		setStart: function(a7, a8) {
			this.startContainer = a7;
			this.startOffset = a8;
			a2(this);
			H(this, true)
		},
		setEnd: function(a7, a8) {
			this.endContainer = a7;
			this.endOffset = a8;
			a2(this);
			H(this, false)
		},
		setStartBefore: function(a7) {
			this.setStart(a7.parentNode, F(a7))
		},
		setStartAfter: function(a7) {
			this.setStart(a7.parentNode, F(a7) + 1)
		},
		setEndBefore: function(a7) {
			this.setEnd(a7.parentNode, F(a7))
		},
		setEndAfter: function(a7) {
			this.setEnd(a7.parentNode, F(a7) + 1)
		},
		selectNode: function(a7) {
			this.setStartBefore(a7);
			this.setEndAfter(a7)
		},
		selectNodeContents: function(a7) {
			this.setStart(a7, 0);
			this.setEnd(a7, a7[a7.nodeType === 1 ? "childNodes" : "nodeValue"].length)
		},
		collapse: function(a7) {
			if (a7) {
				this.setEnd(this.startContainer, this.startOffset)
			} else {
				this.setStart(this.endContainer, this.endOffset)
			}
		},
		deleteContents: function() {
			var a8 = this.cloneRange();
			if (this.startContainer != this.commonAncestorContainer) {
				this.setStartAfter(E(this.commonAncestorContainer, this.startContainer))
			}
			this.collapse(true);
			(function a7(a9) {
				while (a9.next()) {
					a9.hasPartialSubtree() ? a7(a9.getSubtreeIterator()) : a9.remove()
				}
			})(new aH(a8))
		},
		cloneContents: function() {
			var a8 = v(this);
			return (function a7(ba) {
				for (var bb, a9 = a8.createDocumentFragment(); bb = ba.next();) {
					bb = bb.cloneNode(!ba.hasPartialSubtree());
					if (ba.hasPartialSubtree()) {
						bb.appendChild(a7(ba.getSubtreeIterator()))
					}
					a9.appendChild(bb)
				}
				return a9
			})(new aH(this))
		},
		extractContents: function() {
			var a9 = this.cloneRange();
			if (this.startContainer != this.commonAncestorContainer) {
				this.setStartAfter(E(this.commonAncestorContainer, this.startContainer))
			}
			this.collapse(true);
			var ba = this;
			var a7 = v(this);
			return (function a8(bc) {
				for (var bd, bb = a7.createDocumentFragment(); bd = bc.next();) {
					bc.hasPartialSubtree() ? bd = bd.cloneNode(false) : bc.remove(ba.originalRange);
					if (bc.hasPartialSubtree()) {
						bd.appendChild(a8(bc.getSubtreeIterator()))
					}
					bb.appendChild(bd)
				}
				return bb
			})(new aH(a9))
		},
		insertNode: function(a7) {
			if (al(this.startContainer)) {
				if (this.startOffset != this.startContainer.nodeValue.length) {
					aR(this.startContainer, this.startOffset)
				}
				w.insertAfter(a7, this.startContainer)
			} else {
				w.insertAt(this.startContainer, a7, this.startOffset)
			}
			this.setStart(this.startContainer, this.startOffset)
		},
		cloneRange: function() {
			return a.extend(new a3(this.ownerDocument), {
				startContainer: this.startContainer,
				endContainer: this.endContainer,
				commonAncestorContainer: this.commonAncestorContainer,
				startOffset: this.startOffset,
				endOffset: this.endOffset,
				collapsed: this.collapsed,
				originalRange: this
			})
		},
		toString: function() {
			var a8 = this.startContainer.nodeName,
				a7 = this.endContainer.nodeName;
			return [a8 == "#text" ? this.startContainer.nodeValue : a8, "(", this.startOffset, ") : ", a7 == "#text" ? this.endContainer.nodeValue : a7, "(", this.endOffset, ")"].join("")
		}
	};

	function r(bc, a8, be, ba) {
		if (bc == a8) {
			return ba - be
		}
		var a7 = a8;
		while (a7 && a7.parentNode != bc) {
			a7 = a7.parentNode
		}
		if (a7) {
			return F(a7) - be
		}
		a7 = bc;
		while (a7 && a7.parentNode != a8) {
			a7 = a7.parentNode
		}
		if (a7) {
			return ba - F(a7) - 1
		}
		var bb = w.commonAncestor(bc, a8);
		var bd = bc;
		while (bd && bd.parentNode != bb) {
			bd = bd.parentNode
		}
		if (!bd) {
			bd = bb
		}
		var a9 = a8;
		while (a9 && a9.parentNode != bb) {
			a9 = a9.parentNode
		}
		if (!a9) {
			a9 = bb
		}
		if (bd == a9) {
			return 0
		}
		return F(a9) - F(bd)
	}
	function H(a8, a9) {
		function a7(bb) {
			try {
				return r(bb.startContainer, bb.endContainer, bb.startOffset, bb.endOffset) < 0
			} catch (ba) {
				return true
			}
		}
		if (a7(a8)) {
			if (a9) {
				a8.commonAncestorContainer = a8.endContainer = a8.startContainer;
				a8.endOffset = a8.startOffset
			} else {
				a8.commonAncestorContainer = a8.startContainer = a8.endContainer;
				a8.startOffset = a8.endOffset
			}
			a8.collapsed = true
		}
	}
	function a2(a8) {
		a8.collapsed = a8.startContainer == a8.endContainer && a8.startOffset == a8.endOffset;
		var a7 = a8.startContainer;
		while (a7 && a7 != a8.endContainer && !aj(a7, a8.endContainer)) {
			a7 = a7.parentNode
		}
		a8.commonAncestorContainer = a7
	}
	function t(a7) {
		if (a.browser.msie && a.browser.version < 9) {
			return new a3(a7)
		}
		return a7.createRange()
	}
	function aH(a7) {
		a.extend(this, {
			range: a7,
			_current: null,
			_next: null,
			_end: null
		});
		if (a7.collapsed) {
			return
		}
		var a8 = a7.commonAncestorContainer;
		this._next = a7.startContainer == a8 && !al(a7.startContainer) ? a7.startContainer.childNodes[a7.startOffset] : E(a8, a7.startContainer);
		this._end = a7.endContainer == a8 && !al(a7.endContainer) ? a7.endContainer.childNodes[a7.endOffset] : E(a8, a7.endContainer).nextSibling
	}
	aH.prototype = {
		hasNext: function() {
			return !!this._next
		},
		next: function() {
			var a7 = this._current = this._next;
			this._next = this._current && this._current.nextSibling != this._end ? this._current.nextSibling : null;
			if (al(this._current)) {
				if (this.range.endContainer == this._current) {
					(a7 = a7.cloneNode(true)).deleteData(this.range.endOffset, a7.length - this.range.endOffset)
				}
				if (this.range.startContainer == this._current) {
					(a7 = a7.cloneNode(true)).deleteData(0, this.range.startOffset)
				}
			}
			return a7
		},
		traverse: function(a7) {
			function a9() {
				this._current = this._next;
				this._next = this._current && this._current.nextSibling != this._end ? this._current.nextSibling : null;
				return this._current
			}
			var a8;
			while (a8 = a9.call(this)) {
				if (this.hasPartialSubtree()) {
					this.getSubtreeIterator().traverse(a7)
				} else {
					a7(a8)
				}
			}
			return a8
		},
		remove: function(bc) {
			var ba = this.range.startContainer == this._current;
			var a9 = this.range.endContainer == this._current;
			if (al(this._current) && (ba || a9)) {
				var be = ba ? this.range.startOffset : 0;
				var a8 = a9 ? this.range.endOffset : this._current.length;
				var a7 = a8 - be;
				if (bc && (ba || a9)) {
					if (this._current == bc.startContainer && be <= bc.startOffset) {
						bc.startOffset -= a7
					}
					if (this._current == bc.endContainer && a8 <= bc.endOffset) {
						bc.endOffset -= a7
					}
				}
				this._current.deleteData(be, a7)
			} else {
				var bd = this._current.parentNode;
				if (bc && (this.range.startContainer == bd || this.range.endContainer == bd)) {
					var bb = F(this._current);
					if (bd == bc.startContainer && bb <= bc.startOffset) {
						bc.startOffset -= 1
					}
					if (bd == bc.endContainer && bb < bc.endOffset) {
						bc.endOffset -= 1
					}
				}
				w.remove(this._current)
			}
		},
		hasPartialSubtree: function() {
			return !al(this._current) && (ak(this._current, this.range.startContainer) || ak(this._current, this.range.endContainer))
		},
		getSubtreeIterator: function() {
			var a7 = this.range.cloneRange();
			a7.selectNodeContents(this._current);
			if (ak(this._current, this.range.startContainer)) {
				a7.setStart(this.range.startContainer, this.range.startOffset)
			}
			if (ak(this._current, this.range.endContainer)) {
				a7.setEnd(this.range.endContainer, this.range.endOffset)
			}
			return new aH(a7)
		}
	};

	function a4(a7) {
		this.ownerDocument = a7;
		this.rangeCount = 1
	}
	a4.prototype = {
		addRange: function(a7) {
			var a8 = this.ownerDocument.body.createTextRange();
			c(a8, a7, false);
			c(a8, a7, true);
			a8.select()
		},
		removeAllRanges: function() {
			this.ownerDocument.selection.empty()
		},
		getRangeAt: function() {
			var bg, bd = new a3(this.ownerDocument),
				be = this.ownerDocument.selection,
				a8;
			try {
				bg = be.createRange();
				a8 = bg.item ? bg.item(0) : bg.parentElement();
				if (a8.ownerDocument != this.ownerDocument) {
					return bd
				}
			} catch (ba) {
				return bd
			}
			if (be.type == "Control") {
				bd.selectNode(bg.item(0))
			} else {
				d(bg, bd, true);
				d(bg, bd, false);
				if (bd.startContainer.nodeType == 9) {
					bd.setStart(bd.endContainer, bd.startOffset)
				}
				if (bd.endContainer.nodeType == 9) {
					bd.setEnd(bd.startContainer, bd.endOffset)
				}
				if (bg.compareEndPoints("StartToEnd", bg) == 0) {
					bd.collapse(false)
				}
				var bf = bd.startContainer,
					a9 = bd.endContainer,
					a7 = this.ownerDocument.body;
				if (!bd.collapsed && bd.startOffset == 0 && bd.endOffset == S(bd.endContainer) && !(bf == a9 && al(bf) && bf.parentNode == a7)) {
					var bc = false,
						bb = false;
					while (F(bf) == 0 && bf == bf.parentNode.firstChild && bf != a7) {
						bf = bf.parentNode;
						bc = true
					}
					while (F(a9) == S(a9.parentNode) - 1 && a9 == a9.parentNode.lastChild && a9 != a7) {
						a9 = a9.parentNode;
						bb = true
					}
					if (bf == a7 && a9 == a7 && bc && bb) {
						bd.setStart(bf, 0);
						bd.setEnd(a9, S(a7))
					}
				}
			}
			return bd
		}
	};

	function c(bg, bd, be) {
		var a9 = bd[be ? "startContainer" : "endContainer"];
		var bc = bd[be ? "startOffset" : "endOffset"],
			bf = 0;
		var a7 = al(a9) ? a9 : a9.childNodes[bc] || null;
		var a8 = al(a9) ? a9.parentNode : a9;
		if (a9.nodeType == 3 || a9.nodeType == 4) {
			bf = bc
		}
		var bb = a8.insertBefore(w.create(bd.ownerDocument, "a"), a7);
		var ba = bd.ownerDocument.body.createTextRange();
		ba.moveToElementText(bb);
		w.remove(bb);
		ba[be ? "moveStart" : "moveEnd"]("character", bf);
		ba.collapse(false);
		bg.setEndPoint(be ? "StartToStart" : "EndToStart", ba)
	}
	function d(bd, ba, bb) {
		var a8 = w.create(ba.ownerDocument, "a"),
			a7 = bd.duplicate();
		a7.collapse(bb);
		var a9 = a7.parentElement();
		do {
			a9.insertBefore(a8, a8.previousSibling);
			a7.moveToElementText(a8)
		} while (a7.compareEndPoints(bb ? "StartToStart" : "StartToEnd", bd) > 0 && a8.previousSibling);
		a7.setEndPoint(bb ? "EndToStart" : "EndToEnd", bd);
		var bc = a8.nextSibling;
		if (!bc) {
			bc = a8.previousSibling;
			if (bc && al(bc)) {
				ba.setEnd(bc, bc.nodeValue.length);
				w.remove(a8)
			} else {
				ba.selectNodeContents(a9);
				w.remove(a8);
				ba.endOffset -= 1
			}
			return
		}
		w.remove(a8);
		if (al(bc)) {
			ba[bb ? "setStart" : "setEnd"](bc, a7.text.length)
		} else {
			ba[bb ? "setStartBefore" : "setEndBefore"](bc)
		}
	}
	function aG(a7) {
		this.enumerate = function() {
			var a8 = [];

			function a9(ba) {
				if (w.is(ba, "img") || (ba.nodeType == 3 && !w.isWhitespace(ba))) {
					a8.push(ba)
				} else {
					ba = ba.firstChild;
					while (ba) {
						a9(ba);
						ba = ba.nextSibling
					}
				}
			}
			new aH(a7).traverse(a9);
			return a8
		}
	}
	function aW(a7) {
		return new aG(a7).enumerate()
	}
	function l(bb) {
		var a8 = [];
		for (var a9 = 0, ba = bb.length; a9 < ba; a9++) {
			var a7 = w.parentOfType(bb[a9], g);
			if (a7 && a.inArray(a7, a8) < 0) {
				a8.push(a7)
			}
		}
		return a8
	}
	function R(a8) {
		var a7 = [];
		new aH(a8).traverse(function(a9) {
			if (a9.className == "t-marker") {
				a7.push(a9)
			}
		});
		return a7
	}
	function aJ(ba) {
		var bb = v(ba);
		this.body = bb.body;
		this.html = this.body.innerHTML;

		function a7(be) {
			var bg = 0,
				bd = be.nodeType;
			while (be = be.previousSibling) {
				var bf = be.nodeType;
				if (bf != 3 || bd != bf) {
					bg++
				}
				bd = bf
			}
			return bg
		}
		function a9(bd, be) {
			if (bd.nodeType == 3) {
				while ((bd = bd.previousSibling) && bd.nodeType == 3) {
					be += bd.nodeValue.length
				}
			}
			return be
		}
		function a8(bd) {
			var be = [];
			while (bd != bb) {
				be.push(a7(bd));
				bd = bd.parentNode
			}
			return be
		}
		function bc(bi, bj, bh, bd) {
			var bf = bb,
				be = bh.length,
				bg = bd;
			while (be--) {
				bf = bf.childNodes[bh[be]]
			}
			while (bf.nodeType == 3 && bf.nodeValue.length < bg) {
				bg -= bf.nodeValue.length;
				bf = bf.nextSibling
			}
			bi[bj ? "setStart" : "setEnd"](bf, bg)
		}
		this.startContainer = a8(ba.startContainer);
		this.endContainer = a8(ba.endContainer);
		this.startOffset = a9(ba.startContainer, ba.startOffset);
		this.endOffset = a9(ba.endContainer, ba.endOffset);
		this.toRange = function() {
			var bd = ba.cloneRange();
			bc(bd, true, this.startContainer, this.startOffset);
			bc(bd, false, this.endContainer, this.endOffset);
			return bd
		}
	}
	function ax() {
		var a7;
		this.addCaret = function(a8) {
			a7 = w.create(v(a8), "span", {
				className: "t-marker"
			});
			a8.insertNode(a7);
			a8.selectNode(a7);
			return a7
		};
		this.removeCaret = function(bc) {
			var bb = a7.previousSibling;
			var bd = 0;
			if (bb) {
				bd = al(bb) ? bb.nodeValue.length : F(bb)
			}
			var a8 = a7.parentNode;
			var a9 = bb ? F(bb) : 0;
			w.remove(a7);
			aA(a8);
			var ba = a8.childNodes[a9];
			if (al(ba)) {
				bc.setStart(ba, bd)
			} else {
				if (ba) {
					var be = w.lastTextNode(ba);
					if (be) {
						bc.setStart(be, be.nodeValue.length)
					} else {
						bc[bb ? "setStartAfter" : "setStartBefore"](ba)
					}
				} else {
					if (!a.browser.msie && a8.innerHTML == "") {
						a8.innerHTML = '<br _moz_dirty="" />'
					}
					bc.selectNodeContents(a8)
				}
			}
			bc.collapse(true)
		};
		this.add = function(a9, a8) {
			if (a8 && a9.collapsed) {
				this.addCaret(a9);
				a9 = aI.expand(a9)
			}
			var ba = a9.cloneRange();
			ba.collapse(false);
			this.end = w.create(v(a9), "span", {
				className: "t-marker"
			});
			ba.insertNode(this.end);
			ba = a9.cloneRange();
			ba.collapse(true);
			this.start = this.end.cloneNode(true);
			ba.insertNode(this.start);
			a9.setStartBefore(this.start);
			a9.setEndAfter(this.end);
			aA(a9.commonAncestorContainer);
			return a9
		};
		this.remove = function(bf) {
			var bi = this.start,
				ba = this.end;
			aA(bf.commonAncestorContainer);
			while (!bi.nextSibling && bi.parentNode) {
				bi = bi.parentNode
			}
			while (!ba.previousSibling && ba.parentNode) {
				ba = ba.parentNode
			}
			var bh = (bi.previousSibling && bi.previousSibling.nodeType == 3) && (bi.nextSibling && bi.nextSibling.nodeType == 3);
			var bg = (ba.previousSibling && ba.previousSibling.nodeType == 3) && (ba.nextSibling && ba.nextSibling.nodeType == 3);
			bi = bi.nextSibling;
			ba = ba.previousSibling;
			var a8 = false;
			var a9 = false;
			if (bi == this.end) {
				a9 = !! this.start.previousSibling;
				bi = ba = this.start.previousSibling || this.end.nextSibling;
				a8 = true
			}
			w.remove(this.start);
			w.remove(this.end);
			if (bi == null || ba == null) {
				bf.selectNodeContents(bf.commonAncestorContainer);
				bf.collapse(true);
				return
			}
			var bk = a8 ? al(bi) ? bi.nodeValue.length : bi.childNodes.length : 0;
			var bc = al(ba) ? ba.nodeValue.length : ba.childNodes.length;
			if (bi.nodeType == 3) {
				while (bi.previousSibling && bi.previousSibling.nodeType == 3) {
					bi = bi.previousSibling;
					bk += bi.nodeValue.length
				}
			}
			if (ba.nodeType == 3) {
				while (ba.previousSibling && ba.previousSibling.nodeType == 3) {
					ba = ba.previousSibling;
					bc += ba.nodeValue.length
				}
			}
			var bj = F(bi),
				bl = bi.parentNode;
			var bb = F(ba),
				bd = ba.parentNode;
			for (var bm = bi; bm.previousSibling; bm = bm.previousSibling) {
				if (bm.nodeType == 3 && bm.previousSibling.nodeType == 3) {
					bj--
				}
			}
			for (var be = ba; be.previousSibling; be = be.previousSibling) {
				if (be.nodeType == 3 && be.previousSibling.nodeType == 3) {
					bb--
				}
			}
			aA(bl);
			if (bi.nodeType == 3) {
				bi = bl.childNodes[bj]
			}
			aA(bd);
			if (ba.nodeType == 3) {
				ba = bd.childNodes[bb]
			}
			if (a8) {
				if (bi.nodeType == 3) {
					bf.setStart(bi, bk)
				} else {
					bf[a9 ? "setStartAfter" : "setStartBefore"](bi)
				}
				bf.collapse(true)
			} else {
				if (bi.nodeType == 3) {
					bf.setStart(bi, bk)
				} else {
					bf.setStartBefore(bi)
				}
				if (ba.nodeType == 3) {
					bf.setEnd(ba, bc)
				} else {
					bf.setEndAfter(ba)
				}
			}
			if (a7) {
				this.removeCaret(bf)
			}
		}
	}
	var m = /[\u0009-\u000d]|\u0020|\u00a0|\ufeff|\.|,|;|:|!|\(|\)|\?/;
	var aI = {
		nodes: function(a8) {
			var a7 = aW(a8);
			if (!a7.length) {
				a8.selectNodeContents(a8.commonAncestorContainer);
				a7 = aW(a8);
				if (!a7.length) {
					a7 = w.significantChildNodes(a8.commonAncestorContainer)
				}
			}
			return a7
		},
		image: function(a8) {
			var a7 = [];
			new aH(a8).traverse(function(a9) {
				if (w.is(a9, "img")) {
					a7.push(a9)
				}
			});
			if (a7.length == 1) {
				return a7[0]
			}
		},
		expand: function(bb) {
			var bc = bb.cloneRange();
			var bd = bc.startContainer.childNodes[bc.startOffset == 0 ? 0 : bc.startOffset - 1];
			var a9 = bc.endContainer.childNodes[bc.endOffset];
			if (!al(bd) || !al(a9)) {
				return bc
			}
			var a8 = bd.nodeValue;
			var a7 = a9.nodeValue;
			if (a8 == "" || a7 == "") {
				return bc
			}
			var be = a8.split("").reverse().join("").search(m);
			var ba = a7.search(m);
			if (be == 0 || ba == 0) {
				return bc
			}
			ba = ba == -1 ? a7.length : ba;
			be = be == -1 ? 0 : a8.length - be;
			bc.setStart(bd, be);
			bc.setEnd(a9, ba);
			return bc
		},
		isExpandable: function(bc) {
			var bb = bc.startContainer;
			var a9 = v(bc);
			if (bb == a9 || bb == a9.body) {
				return false
			}
			var bd = bc.cloneRange();
			var bf = bb.nodeValue;
			if (!bf) {
				return false
			}
			var a8 = bf.substring(0, bd.startOffset);
			var a7 = bf.substring(bd.startOffset);
			var be = 0,
				ba = 0;
			if (a8 != "") {
				be = a8.split("").reverse().join("").search(m)
			}
			if (a7 != "") {
				ba = a7.search(m)
			}
			return be != 0 && ba != 0
		}
	};

	function q(a8) {
		var a9 = new aJ(a8.range);
		var a7 = new ax();
		this.formatter = a8.formatter;
		this.getRange = function() {
			return a9.toRange()
		};
		this.lockRange = function(ba) {
			return a7.add(this.getRange(), ba)
		};
		this.releaseRange = function(ba) {
			a7.remove(ba);
			aP(ba)
		};
		this.undo = function() {
			a9.body.innerHTML = a9.html;
			aP(a9.toRange())
		};
		this.redo = function() {
			this.exec()
		};
		this.exec = function() {
			var ba = this.lockRange(true);
			this.formatter.editor = this.editor;
			this.formatter.toggle(ba);
			this.releaseRange(ba)
		}
	}
	function Q(a9, a8) {
		var a7 = a9.body;
		this.redo = function() {
			a7.innerHTML = a8.html;
			aP(a8.toRange())
		};
		this.undo = function() {
			a7.innerHTML = a9.html;
			aP(a9.toRange())
		}
	}
	function ah(a7) {
		q.call(this, a7);
		this.managesUndoRedo = true;
		this.exec = function() {
			var a8 = this.editor;
			var a9 = a8.getRange();
			var ba = new aJ(a9);
			a8.clipboard.paste(a7.value || "");
			a8.undoRedoStack.push(new Q(ba, new aJ(a8.getRange())));
			a8.focus()
		}
	}
	function ai() {
		aX.call(this);
		var a7, a8 = "";
		this.command = function(a9) {
			return new ah(a9)
		};
		this.update = function(a9, bb) {
			var ba = a9.data("tSelectBox");
			ba.close();
			ba.value(a8)
		};
		this.init = function(a9, ba) {
			a7 = ba.editor;
			a8 = a7.localization.insertHtml;
			a9.tSelectBox({
				data: a7.insertHtml,
				title: a8,
				onItemCreate: function(bb) {
					bb.html = '<span unselectable="on">' + bb.dataItem.Text + "</span>"
				},
				onChange: function(bb) {
					aX.exec(a7, "insertHtml", bb.value)
				},
				highlightFirst: false
			}).find(".t-input").html(a7.localization.insertHtml)
		}
	}
	function aZ() {
		var a8 = [],
			a7 = -1;
		this.push = function(a9) {
			a8 = a8.slice(0, a7 + 1);
			a7 = a8.push(a9) - 1
		};
		this.undo = function() {
			if (this.canUndo()) {
				a8[a7--].undo()
			}
		};
		this.redo = function() {
			if (this.canRedo()) {
				a8[++a7].redo()
			}
		};
		this.canUndo = function() {
			return a7 >= 0
		};
		this.canRedo = function() {
			return a7 != a8.length - 1
		}
	}
	function aY(a7) {
		this.keydown = function(a8) {
			var ba = a7.keyboard;
			var a9 = ba.isTypingKey(a8);
			if (a9 && !ba.typingInProgress()) {
				var bb = a7.getRange();
				this.startRestorePoint = new aJ(bb);
				ba.startTyping(a.proxy(function() {
					a7.selectionRestorePoint = this.endRestorePoint = new aJ(a7.getRange());
					a7.undoRedoStack.push(new Q(this.startRestorePoint, this.endRestorePoint))
				}, this));
				return true
			}
			return false
		};
		this.keyup = function(a8) {
			var a9 = a7.keyboard;
			if (a9.typingInProgress()) {
				a9.endTyping();
				return true
			}
			return false
		}
	}
	function aV(a7) {
		var a8 = false;
		this.createUndoCommand = function() {
			this.endRestorePoint = new aJ(a7.getRange());
			a7.undoRedoStack.push(new Q(this.startRestorePoint, this.endRestorePoint));
			this.startRestorePoint = this.endRestorePoint
		};
		this.changed = function() {
			if (this.startRestorePoint) {
				return this.startRestorePoint.html != a7.body.innerHTML
			}
			return false
		};
		this.keydown = function(a9) {
			var ba = a7.keyboard;
			if (ba.isModifierKey(a9)) {
				if (ba.typingInProgress()) {
					ba.endTyping(true)
				}
				this.startRestorePoint = new aJ(a7.getRange());
				return true
			}
			if (ba.isSystem(a9)) {
				a8 = true;
				if (this.changed()) {
					a8 = false;
					this.createUndoCommand()
				}
				return true
			}
			return false
		};
		this.keyup = function(a9) {
			if (a8 && this.changed()) {
				a8 = false;
				this.createUndoCommand(a9);
				return true
			}
			return false
		}
	}
	function am(a7) {
		var bd = false;
		var bc;
		var ba;

		function a8(be) {
			return (be >= 48 && be <= 90) || (be >= 96 && be <= 111) || (be >= 186 && be <= 192) || (be >= 219 && be <= 222)
		}
		this.toolFromShortcut = function(bi, be) {
			var bf = String.fromCharCode(be.keyCode);
			for (var bh in bi) {
				var bg = bi[bh];
				if ((bg.key == bf || bg.key == be.keyCode) && !! bg.ctrl == be.ctrlKey && !! bg.alt == be.altKey && !! bg.shift == be.shiftKey) {
					return bh
				}
			}
		};
		this.isTypingKey = function(be) {
			var bf = be.keyCode;
			return (a8(bf) && !be.ctrlKey && !be.altKey) || bf == 32 || bf == 13 || bf == 8 || (bf == 46 && !be.shiftKey && !be.ctrlKey && !be.altKey)
		};
		this.isModifierKey = function(be) {
			var bf = be.keyCode;
			return (bf == 17 && !be.shiftKey && !be.altKey) || (bf == 16 && !be.ctrlKey && !be.altKey) || (bf == 18 && !be.ctrlKey && !be.shiftKey)
		};
		this.isSystem = function(be) {
			return be.keyCode == 46 && be.ctrlKey && !be.altKey && !be.shiftKey
		};
		this.startTyping = function(be) {
			ba = be;
			bd = true
		};

		function bb() {
			bd = false;
			if (ba) {
				ba()
			}
		}
		this.endTyping = function(be) {
			this.clearTimeout();
			if (be) {
				bb()
			} else {
				bc = window.setTimeout(bb, 1000)
			}
		};
		this.typingInProgress = function() {
			return bd
		};
		this.clearTimeout = function() {
			window.clearTimeout(bc)
		};

		function a9(be, bg) {
			for (var bf = 0; bf < a7.length; bf++) {
				if (a7[bf][bg](be)) {
					break
				}
			}
		}
		this.keydown = function(be) {
			a9(be, "keydown")
		};
		this.keyup = function(be) {
			a9(be, "keyup")
		}
	}
	function o(a8) {
		var a7 = [new ay()];

		function a9(be) {
			var bc = w.create(a8.document, "div");
			bc.innerHTML = be;
			var bd = a8.document.createDocumentFragment();
			while (bc.firstChild) {
				bd.appendChild(bc.firstChild)
			}
			return bd
		}
		function ba(bc) {
			return /<(div|p|ul|ol|table|h[1-6])/i.test(bc)
		}
		this.oncut = function(bc) {
			var bd = new aJ(a8.getRange());
			setTimeout(function() {
				a8.undoRedoStack.push(new Q(bd, new aJ(a8.getRange())))
			})
		};
		this.onpaste = function(be) {
			var bg = a8.getRange();
			var bh = new aJ(bg);
			var bc = w.create(a8.document, "div", {
				className: "t-paste-container",
				innerHTML: "\ufeff"
			});
			a8.body.appendChild(bc);
			if (a8.body.createTextRange) {
				be.preventDefault();
				var bf = a8.createRange();
				bf.selectNodeContents(bc);
				a8.selectRange(bf);
				var bi = a8.body.createTextRange();
				bi.moveToElementText(bc);
				a(a8.body).unbind("paste");
				bi.execCommand("Paste");
				a(a8.body).bind("paste", arguments.callee)
			} else {
				var bd = a8.createRange();
				bd.selectNodeContents(bc);
				aP(bd)
			}
			setTimeout(function() {
				aP(bg);
				w.remove(bc);
				if (bc.lastChild && w.is(bc.lastChild, "br")) {
					w.remove(bc.lastChild)
				}
				var bj = {
					html: bc.innerHTML
				};
				b.trigger(a8.element, "paste", bj);
				a8.clipboard.paste(bj.html, true);
				a8.undoRedoStack.push(new Q(bh, new aJ(a8.getRange())));
				aL(a8)
			})
		};

		function bb(bc, be) {
			if (bc) {
				return w.parentOfType(be, ["p", "ul", "ol"]) || be.parentNode
			}
			var bf = be.parentNode;
			var bd = be.ownerDocument.body;
			if (w.isInline(bf)) {
				while (bf.parentNode != bd && !w.isBlock(bf.parentNode)) {
					bf = bf.parentNode
				}
			}
			return bf
		}
		this.paste = function(bh, be) {
			var bi, bj;
			for (bi = 0, bj = a7.length; bi < bj; bi++) {
				if (a7[bi].applicable(bh)) {
					bh = a7[bi].clean(bh)
				}
			}
			if (be) {
				bh = bh.replace(/(<br>(\s|&nbsp;)*)+(<\/?(div|p|li|col|t))/ig, "$3");
				bh = bh.replace(/<(a|span)[^>]*><\/\1>/ig, "")
			}
			bh = bh.replace(/^<li/i, "<ul><li").replace(/li>$/g, "li></ul>");
			var bc = ba(bh);
			var bm = a8.getRange();
			bm.deleteContents();
			if (bm.startContainer == a8.document) {
				bm.selectNodeContents(a8.body)
			}
			var bk = new ax();
			var bd = bk.addCaret(bm);
			var bl = bb(bc, bd);
			var bn = false;
			if (!/body|td/.test(w.name(bl)) && (bc || w.isInline(bl))) {
				bm.selectNode(bd);
				aQ(bm, bl, true);
				bn = true
			}
			var bf = a9(bh);
			if (bf.firstChild && bf.firstChild.className === "t-paste-container") {
				var bg = [];
				for (bi = 0, bj = bf.childNodes.length; bi < bj; bi++) {
					bg.push(bf.childNodes[bi].innerHTML)
				}
				bf = a9(bg.join("<br />"))
			}
			bm.insertNode(bf);
			bl = bb(bc, bd);
			if (bn) {
				while (bd.parentNode != bl) {
					w.unwrap(bd.parentNode)
				}
				w.unwrap(bd.parentNode)
			}
			aA(bm.commonAncestorContainer);
			bd.style.display = "inline";
			w.scrollTo(bd);
			bk.removeCaret(bm);
			aP(bm)
		}
	}
	function ay() {
		var a9 = [/<\?xml[^>]*>/gi, "", /<!--(.|\n)*?-->/g, "", /&quot;/g, "'", /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6]|hr|p|div|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|address|pre|form|blockquote|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, "$1", /<br><br>/g, "<BR><BR>", /<br>/g, " ", /<table([^>]*)>(\s|&nbsp;)+<t/gi, "<table$1><t", /<tr[^>]*>(\s|&nbsp;)*<\/tr>/gi, "", /<tbody[^>]*>(\s|&nbsp;)*<\/tbody>/gi, "", /<table[^>]*>(\s|&nbsp;)*<\/table>/gi, "", /<BR><BR>/g, "<br>", /^\s*(&nbsp;)+/gi, "", /(&nbsp;|<br[^>]*>)+\s*$/gi, "", /mso-[^;"]*;?/ig, "", /<(\/?)b(\s[^>]*)?>/ig, "<$1strong$2>", /<(\/?)i(\s[^>]*)?>/ig, "<$1em$2>", /<\/?(meta|link|style|o:|v:|x:)[^>]*>((?:.|\n)*?<\/(meta|link|style|o:|v:|x:)[^>]*>)?/ig, "", /style=(["|'])\s*\1/g, ""];
		this.applicable = function(bb) {
			return /class="?Mso|style="[^"]*mso-/i.test(bb)
		};

		function a8(bb) {
			if (/^[\u2022\u00b7\u00a7\u00d8o]\u00a0+/.test(bb)) {
				return "ul"
			}
			if (/^\s*\w+[\.\)]\u00a0{2,}/.test(bb)) {
				return "ol"
			}
		}
		function a7(bd) {
			var bn = w.create(document, "div", {
				innerHTML: bd
			});
			var bb = a(g.join(","), bn);
			var bg = -1,
				bh, bi = {
					ul: {},
					ol: {}
				},
				bj = bn;
			for (var be = 0; be < bb.length; be++) {
				var bm = bb[be];
				var bd = bm.innerHTML.replace(/<\/?\w+[^>]*>/g, "").replace(/&nbsp;/g, "\u00a0");
				var bo = a8(bd);
				if (!bo || w.name(bm) != "p") {
					if (bm.innerHTML == "") {
						w.remove(bm)
					} else {
						bi = {
							ul: {},
							ol: {}
						};
						bj = bn;
						bg = -1
					}
					continue
				}
				var bl = parseFloat(bm.style.marginLeft || 0);
				var bk = bi[bo][bl];
				if (bl > bg || !bk) {
					bk = w.create(document, bo);
					if (bj == bn) {
						w.insertBefore(bk, bm)
					} else {
						bj.appendChild(bk)
					}
					bi[bo][bl] = bk
				}
				if (bh != bo) {
					for (var bf in bi) {
						for (var bc in bi[bf]) {
							if (a.contains(bk, bi[bf][bc])) {
								delete bi[bf][bc]
							}
						}
					}
				}
				w.remove(bm.firstChild);
				bj = w.create(document, "li", {
					innerHTML: bm.innerHTML
				});
				bk.appendChild(bj);
				w.remove(bm);
				bg = bl;
				bh = bo
			}
			return bn.innerHTML
		}
		function ba(bb) {
			return bb.replace(/<a([^>]*)>\s*<\/a>/ig, function(bc, bd) {
				if (!bd || bd.indexOf("href") < 0) {
					return ""
				}
				return bc
			})
		}
		this.clean = function(bb) {
			for (var bc = 0, bd = a9.length; bc < bd; bc += 2) {
				bb = bb.replace(a9[bc], a9[bc + 1])
			}
			bb = ba(bb);
			bb = a7(bb);
			bb = bb.replace(/\s+class="?[^"\s>]*"?/ig, "");
			return bb
		}
	}
	function ad(a7) {
		function a8(bd) {
			var be = 0,
				a9 = 0,
				ba = 0,
				bc = bd.parentNode;
			for (var bb = bc.firstChild; bb; bb = bb.nextSibling) {
				if (bb != bd) {
					if (bb.className == "t-marker") {
						ba++
					} else {
						if (bb.nodeType == 3) {
							be++
						} else {
							a9++
						}
					}
				}
			}
			if (ba > 1 && bc.firstChild.className == "t-marker" && bc.lastChild.className == "t-marker") {
				return 0
			} else {
				return a9 + be
			}
		}
		this.findSuitable = function(ba, a9) {
			if (!a9 && a8(ba) > 0) {
				return null
			}
			return w.parentOfType(ba, a7[0].tags)
		};
		this.findFormat = function(bc) {
			for (var ba = 0; ba < a7.length; ba++) {
				var bb = bc;
				var bd = a7[ba].tags;
				var a9 = a7[ba].attr;
				if (bb && w.ofType(bb, bd) && e(bb, a9)) {
					return bb
				}
				while (bb) {
					bb = w.parentOfType(bb, bd);
					if (bb && e(bb, a9)) {
						return bb
					}
				}
			}
			return null
		};
		this.isFormatted = function(ba) {
			for (var a9 = 0; a9 < ba.length; a9++) {
				if (this.findFormat(ba[a9])) {
					return true
				}
			}
			return false
		}
	}
	function ae(a8, ba) {
		this.finder = new ad(a8);
		var a7 = a.extend({}, a8[0].attr, ba);
		var a9 = a8[0].tags[0];

		function bb(bc) {
			return w.wrap(bc, w.create(bc.ownerDocument, a9, a7))
		}
		this.activate = function(bd, bc) {
			if (this.finder.isFormatted(bc)) {
				this.split(bd);
				this.remove(bc)
			} else {
				this.apply(bc)
			}
		};
		this.toggle = function(bd) {
			var bc = aW(bd);
			if (bc.length > 0) {
				this.activate(bd, bc)
			}
		};
		this.apply = function(bh) {
			var bd = [];
			for (var be = 0, bf = bh.length; be < bf; be++) {
				var bg = bh[be];
				var bc = this.finder.findSuitable(bg);
				if (bc) {
					w.attr(bc, a7)
				} else {
					bc = bb(bg)
				}
				bd.push(bc)
			}
			this.consolidate(bd)
		};
		this.remove = function(bf) {
			for (var bd = 0, be = bf.length; bd < be; bd++) {
				var bc = this.finder.findFormat(bf[bd]);
				if (bc) {
					if (a7 && a7.style) {
						w.unstyle(bc, a7.style);
						if (!bc.style.cssText) {
							w.unwrap(bc)
						}
					} else {
						w.unwrap(bc)
					}
				}
			}
		};
		this.split = function(bg) {
			var bf = aW(bg);
			if (bf.length > 0) {
				for (var bd = 0, be = bf.length; bd < be; bd++) {
					var bc = this.finder.findFormat(bf[bd]);
					if (bc) {
						aQ(bg, bc, true)
					}
				}
			}
		};
		this.consolidate = function(be) {
			while (be.length > 1) {
				var bd = be.pop();
				var bc = be[be.length - 1];
				if (bd.previousSibling && bd.previousSibling.className == "t-marker") {
					bc.appendChild(bd.previousSibling)
				}
				if (bd.tagName == bc.tagName && bd.previousSibling == bc && bd.style.cssText == bc.style.cssText) {
					while (bd.firstChild) {
						bc.appendChild(bd.firstChild)
					}
					w.remove(bd)
				}
			}
		}
	}
	function U(a7, ba) {
		ad.call(this, a7);

		function a9(bk) {
			var bc = bk.attributes,
				bo = a.trim;
			if (!bc) {
				return
			}
			for (var bg = 0, bh = bc.length; bg < bh; bg++) {
				var bb = bc[bg],
					bj = bb.nodeName,
					bd = bb.nodeValue;
				if (bb.specified && bj == "style") {
					var be = bo(bd || bk.style.cssText).split(";");
					for (var bf = 0, bi = be.length; bf < bi; bf++) {
						var bl = be[bf];
						if (bl.length) {
							var bn = bl.split(":");
							var bm = bo(bn[0].toLowerCase()),
								bp = bo(bn[1]);
							if (bm != ba) {
								continue
							}
							return bm.indexOf("color") >= 0 ? w.toHex(bp) : bp
						}
					}
				}
			}
			return
		}
		function a8(be) {
			var bb = a(al(be) ? be.parentNode : be);
			var bf = bb.parents().andSelf();
			for (var bc = 0, bd = bf.length; bc < bd; bc++) {
				var bg = ba == "className" ? bf[bc].className : a9(bf[bc]);
				if (bg) {
					return bg
				}
			}
			return "inherit"
		}
		this.getFormat = function(bd) {
			var be = a8(bd[0]);
			for (var bb = 1, bc = bd.length; bb < bc; bb++) {
				if (be != a8(bd[bb])) {
					return ""
				}
			}
			return be
		};
		this.isFormatted = function(bb) {
			return this.getFormat(bb) !== ""
		}
	}
	function V(a7, a9, a8) {
		ae.call(this, a7, a9);
		this.finder = new U(a7, a8);
		this.activate = function(bc, bb) {
			this.split(bc);
			if (a8) {
				var ba = a8.replace(/-([a-z])/, function(bd, be) {
					return be.toUpperCase()
				});
				this[a9.style[ba] == "inherit" ? "remove" : "apply"](bb)
			} else {
				this.apply(bb)
			}
		}
	}
	function ag(a7) {
		return a7.collapsed && !aI.isExpandable(a7)
	}
	function af(a7) {
		P.call(this, a.extend(a7, {
			finder: new ad(a7.format),
			formatter: function() {
				return new ae(a7.format)
			}
		}));
		this.willDelayExecution = ag
	}
	function K(a9) {
		aX.call(this, a9);
		var ba = a.browser.msie ? "tSelectBox" : "tComboBox",
			a8 = [{
				tags: ["span"]
			}],
			a7 = new U(a8, a9.cssAttr);
		this.command = function(bb) {
			return new N(a.extend(bb, {
				formatter: function() {
					var bc = {};
					bc[a9.domAttr] = bb.value;
					return new V(a8, {
						style: bc
					}, a9.cssAttr)
				}
			}))
		};
		this.willDelayExecution = ag;
		this.update = function(bb, be, bg) {
			var bd = bb.data(ba);
			bd.close();
			var bf = bg.getPending(this.name);
			var bc = (bf && bf.params) ? bf.params.value : a7.getFormat(be);
			bd.value(bc)
		};
		this.init = function(bb, bd) {
			var bc = bd.editor;
			bb[ba]({
				data: bc[a9.name],
				onChange: function(be) {
					aX.exec(bc, a9.name, be.value)
				},
				onItemCreate: function(be) {
					be.html = '<span unselectable="on" style="display:block;">' + be.dataItem.Text + "</span>"
				},
				highlightFirst: false
			});
			bb.data(ba).value("inherit")
		}
	}
	function p(a8) {
		aX.call(this, a8);
		var a7 = [{
			tags: ac
		}];
		this.update = function(a9) {
			a9.data("tColorPicker").close()
		};
		this.command = function(a9) {
			return new N(a.extend(a9, {
				formatter: function() {
					var ba = {};
					ba[a8.domAttr] = a9.value;
					return new V(a7, {
						style: ba
					}, a8.cssAttr)
				}
			}))
		};
		this.willDelayExecution = ag;
		this.init = function(a9, bb) {
			var ba = bb.editor;
			a9.tColorPicker({
				selectedColor: "#000000",
				onChange: function(bc) {
					aX.exec(ba, a8.name, bc.value)
				}
			})
		}
	}
	function aU() {
		aX.call(this);
		var a8 = [{
			tags: ["span"]
		}],
			a7 = new U(a8, "className");
		this.command = function(a9) {
			return new N(a.extend(a9, {
				formatter: function() {
					return new V(a8, {
						className: a9.value
					})
				}
			}))
		};
		this.update = function(a9, bb) {
			var ba = a9.data("tSelectBox");
			ba.close();
			ba.value(a7.getFormat(bb))
		};
		this.init = function(a9, bb) {
			var ba = bb.editor;
			a9.tSelectBox({
				data: ba.style,
				title: ba.localization.style,
				onItemCreate: function(bc) {
					var bd = w.inlineStyle(ba.document, "span", {
						className: bc.dataItem.Value
					});
					bc.html = '<span unselectable="on" style="display:block;' + bd + '">' + bc.html + "</span>"
				},
				onChange: function(bc) {
					aX.exec(ba, "style", bc.value)
				}
			})
		}
	}
	function h(a8) {
		function a7(bc, ba) {
			for (var bb = 0; bb < ba.length; bb++) {
				var a9 = ba[bb];
				if (a9 == null || !ak(bc, a9)) {
					return false
				}
			}
			return true
		}
		this.findSuitable = function(bb) {
			var bc = [];
			for (var ba = 0; ba < bb.length; ba++) {
				var a9 = w.ofType(bb[ba], a8[0].tags) ? bb[ba] : w.parentOfType(bb[ba], a8[0].tags);
				if (!a9) {
					return []
				}
				if (a.inArray(a9, bc) < 0) {
					bc.push(a9)
				}
			}
			for (var ba = 0; ba < bc.length; ba++) {
				if (a7(bc[ba], bc)) {
					return [bc[ba]]
				}
			}
			return bc
		};
		this.findFormat = function(bc) {
			for (var ba = 0; ba < a8.length; ba++) {
				var bb = bc;
				var bd = a8[ba].tags;
				var a9 = a8[ba].attr;
				while (bb) {
					if (w.ofType(bb, bd) && e(bb, a9)) {
						return bb
					}
					bb = bb.parentNode
				}
			}
			return null
		};
		this.getFormat = function(bc) {
			var a9 = a.proxy(function(be) {
				return this.findFormat(al(be) ? be.parentNode : be)
			}, this),
				bd = a9(bc[0]);
			if (!bd) {
				return ""
			}
			for (var ba = 1, bb = bc.length; ba < bb; ba++) {
				if (bd != a9(bc[ba])) {
					return ""
				}
			}
			return bd.nodeName.toLowerCase()
		};
		this.isFormatted = function(ba) {
			for (var a9 = 0; a9 < ba.length; a9++) {
				if (!this.findFormat(ba[a9])) {
					return false
				}
			}
			return true
		}
	}
	function j(a8, a9) {
		var a7 = new h(a8);

		function ba(bi, bd, bg) {
			var be = bg.length == 1 ? w.blockParentOrBody(bg[0]) : w.commonAncestor.apply(null, bg);
			if (w.isInline(be)) {
				be = w.blockParentOrBody(be)
			}
			var bc = w.significantChildNodes(be);
			var bh = F(bc[0]);
			var bj = w.create(be.ownerDocument, bi, bd);
			for (var bf = 0; bf < bc.length; bf++) {
				var bb = bc[bf];
				if (w.isBlock(bb)) {
					w.attr(bb, bd);
					if (bj.childNodes.length) {
						w.insertBefore(bj, bb);
						bj = bj.cloneNode(false)
					}
					bh = F(bb) + 1;
					continue
				}
				bj.appendChild(bb)
			}
			if (bj.firstChild) {
				w.insertAt(be, bj, bh)
			}
		}
		this.apply = function(bf) {
			var bc = w.is(bf[0], "img") && bf.length == 1 ? [bf[0]] : a7.findSuitable(bf);
			var bd = bc.length ? M(w.name(bc[0]), a8) : a8[0];
			if (!bd) {
				bd = a8[0]
			}
			var bg = bd.tags[0];
			var bb = a.extend({}, bd.attr, a9);
			if (bc.length) {
				for (var be = 0; be < bc.length; be++) {
					w.attr(bc[be], bb)
				}
			} else {
				ba(bg, bb, bf)
			}
		};
		this.remove = function(bf) {
			for (var bc = 0, bd = bf.length; bc < bd; bc++) {
				var bb = a7.findFormat(bf[bc]);
				if (bb) {
					if (w.ofType(bb, ["p", "img", "li"])) {
						var be = M(w.name(bb), a8);
						if (be.attr.style) {
							w.unstyle(bb, be.attr.style)
						}
						if (be.attr.className) {
							w.removeClass(bb, be.attr.className)
						}
					} else {
						w.unwrap(bb)
					}
				}
			}
		};
		this.toggle = function(bc) {
			var bb = aI.nodes(bc);
			if (a7.isFormatted(bb)) {
				this.remove(bb)
			} else {
				this.apply(bb)
			}
		}
	}
	function T(a8, a9) {
		var a7 = new h(a8);
		this.apply = function(bg) {
			var ba = l(bg);
			var bb = a8[0].tags[0];
			if (ba.length) {
				for (var bd = 0, be = ba.length; bd < be; bd++) {
					if (w.is(ba[bd], "li")) {
						var bf = ba[bd].parentNode;
						var bc = new at(bf.nodeName.toLowerCase(), bb);
						var bh = this.editor.createRange();
						bh.selectNode(ba[bd]);
						bc.toggle(bh)
					} else {
						w.changeTag(ba[bd], bb)
					}
				}
			} else {
				new j(a8, a9).apply(bg)
			}
		};
		this.toggle = function(bb) {
			var ba = aW(bb);
			if (!ba.length) {
				bb.selectNodeContents(bb.commonAncestorContainer);
				ba = aW(bb);
				if (!ba.length) {
					ba = w.significantChildNodes(bb.commonAncestorContainer)
				}
			}
			this.apply(ba)
		}
	}
	function N(a7) {
		a7.formatter = a7.formatter();
		q.call(this, a7)
	}
	function k(a7) {
		P.call(this, a.extend(a7, {
			finder: new h(a7.format),
			formatter: function() {
				return new j(a7.format)
			}
		}))
	}
	function L() {
		aX.call(this);
		var a7 = new h([{
			tags: g
		}]);
		this.command = function(a8) {
			return new N(a.extend(a8, {
				formatter: function() {
					return new T([{
						tags: [a8.value]
					}], {})
				}
			}))
		};
		this.update = function(a8, ba) {
			var a9 = a8.data("tSelectBox");
			a9.close();
			a9.value(a7.getFormat(ba))
		};
		this.init = function(a8, ba) {
			var a9 = ba.editor;
			a8.tSelectBox({
				data: a9.formatBlock,
				title: a9.localization.formatBlock,
				onItemCreate: function(bb) {
					var bc = bb.dataItem.Value;
					bb.html = "<" + bc + ' unselectable="on" style="margin: .3em 0;' + w.inlineStyle(a9.document, bc) + '">' + bb.dataItem.Text + "</" + bc + ">"
				},
				onChange: function(bb) {
					aX.exec(a9, "formatBlock", bb.value)
				},
				highlightFirst: false
			})
		}
	}
	function aD(a7) {
		q.call(this, a7);
		this.exec = function() {
			var bk = this.getRange(),
				ba = v(bk),
				bi, bj, bg, bb = a.browser.msie ? "" : '<br _moz_dirty="" />',
				bh, bf, be, bd, bl, a8 = "p,h1,h2,h3,h4,h5,h6".split(","),
				bn = w.parentOfType(bk.startContainer, a8),
				bc = w.parentOfType(bk.endContainer, a8),
				bm = (bn && !bc) || (!bn && bc);
			bk.deleteContents();
			bf = w.create(ba, "a");
			bk.insertNode(bf);
			aA(bf.parentNode);
			be = w.parentOfType(bf, ["li"]);
			bd = w.parentOfType(bf, "h1,h2,h3,h4,h5,h6".split(","));
			if (be) {
				bl = bk.cloneRange();
				bl.selectNode(be);
				if (aW(bl).length == 0) {
					bh = w.create(ba, "p");
					if (be.nextSibling) {
						aQ(bl, be.parentNode)
					}
					w.insertAfter(bh, be.parentNode);
					w.remove(be.parentNode.childNodes.length == 1 ? be.parentNode : be);
					bh.innerHTML = bb;
					bg = bh
				}
			} else {
				if (bd && !bf.nextSibling) {
					bh = w.create(ba, "p");
					w.insertAfter(bh, bd);
					bh.innerHTML = bb;
					w.remove(bf);
					bg = bh
				}
			}
			if (!bg) {
				if (!(be || bd)) {
					new j([{
						tags: ["p"]
					}]).apply([bf])
				}
				bk.selectNode(bf);
				bi = w.parentOfType(bf, [be ? "li" : bd ? w.name(bd) : "p"]);
				aQ(bk, bi, bm);
				bj = bi.previousSibling;
				if (w.is(bj, "li") && bj.firstChild && !w.is(bj.firstChild, "br")) {
					bj = bj.firstChild
				}
				bg = bi.nextSibling;
				if (w.is(bg, "li") && bg.firstChild && !w.is(bg.firstChild, "br")) {
					bg = bg.firstChild
				}
				w.remove(bi);

				function a9(bo) {
					if (bo.firstChild && w.is(bo.firstChild, "br")) {
						w.remove(bo.firstChild)
					}
					if (al(bo) && bo.nodeValue == "") {
						bo = bo.parentNode
					}
					if (bo && !w.is(bo, "img")) {
						while (bo.firstChild && bo.firstChild.nodeType == 1) {
							bo = bo.firstChild
						}
						if (bo.innerHTML == "") {
							bo.innerHTML = bb
						}
					}
				}
				a9(bj);
				a9(bg);
				aA(bj)
			}
			aA(bg);
			if (w.is(bg, "img")) {
				bk.setStartBefore(bg)
			} else {
				bk.selectNodeContents(bg)
			}
			bk.collapse(true);
			w.scrollTo(bg);
			aP(bk)
		}
	}
	function az(a7) {
		q.call(this, a7);
		this.exec = function() {
			var ba = this.getRange();
			ba.deleteContents();
			var a8 = w.create(v(ba), "br");
			ba.insertNode(a8);
			aA(a8.parentNode);
			if (!a.browser.msie && (!a8.nextSibling || w.isWhitespace(a8.nextSibling))) {
				var a9 = a8.cloneNode(true);
				a9.setAttribute("_moz_dirty", "");
				w.insertAfter(a9, a8)
			}
			ba.setStartAfter(a8);
			ba.collapse(true);
			aP(ba)
		}
	}
	function ar(a7) {
		var a8 = [a7 == "ul" ? "ol" : "ul", a7];
		h.call(this, [{
			tags: a8
		}]);
		this.isFormatted = function(bc) {
			var ba = [],
				a9;
			for (var bb = 0; bb < bc.length; bb++) {
				if ((a9 = this.findFormat(bc[bb])) && w.name(a9) == a7) {
					ba.push(a9)
				}
			}
			if (ba.length < 1) {
				return false
			}
			if (ba.length != bc.length) {
				return false
			}
			for (bb = 0; bb < ba.length; bb++) {
				if (ba[bb] != a9) {
					return false
				}
			}
			return true
		};
		this.findSuitable = function(ba) {
			var a9 = w.parentOfType(ba[0], a8);
			if (a9 && w.name(a9) == a7) {
				return a9
			}
			return null
		}
	}
	function at(ba, bc) {
		var a8 = new ar(ba);

		function bd(bg, bi) {
			var bf = w.create(bg.ownerDocument, "li");
			for (var be = 0; be < bi.length; be++) {
				var bh = bi[be];
				if (w.is(bh, "li")) {
					bg.appendChild(bh);
					continue
				}
				if (w.is(bh, "ul") || w.is(bh, "ol")) {
					while (bh.firstChild) {
						bg.appendChild(bh.firstChild)
					}
					continue
				}
				if (w.is(bh, "td")) {
					while (bh.firstChild) {
						bf.appendChild(bh.firstChild)
					}
					bg.appendChild(bf);
					bh.appendChild(bg);
					bg = bg.cloneNode(false);
					bf = bf.cloneNode(false);
					continue
				}
				bf.appendChild(bh);
				if (w.isBlock(bh)) {
					bg.appendChild(bf);
					w.unwrap(bh);
					bf = bf.cloneNode(false)
				}
			}
			if (bf.firstChild) {
				bg.appendChild(bf)
			}
		}
		function a7(bg, bf) {
			for (var be = 0; be < bf.length; be++) {
				if (ak(bg, bf[be])) {
					return true
				}
			}
			return false
		}
		function a9(be, bf) {
			if (be.className == "t-marker") {
				var bg = be.nextSibling;
				if (bg && w.isBlock(bg)) {
					return false
				}
				bg = be.previousSibling;
				if (bg && w.isBlock(bg)) {
					return false
				}
			}
			return a7(be, bf) || w.isInline(be) || be.nodeType == 3
		}
		this.split = function(bk) {
			var bi = aW(bk);
			if (bi.length) {
				var bl = w.parentOfType(bi[0], ["li"]);
				var be = w.parentOfType(bi[bi.length - 1], ["li"]);
				bk.setStartBefore(bl);
				bk.setEndAfter(be);
				for (var bg = 0, bh = bi.length; bg < bh; bg++) {
					var bf = a8.findFormat(bi[bg]);
					if (bf) {
						var bj = a(bf).parents("ul,ol");
						if (bj[0]) {
							aQ(bk, bj.last()[0], true)
						} else {
							aQ(bk, bf, true)
						}
					}
				}
			}
		};
		this.apply = function(bm) {
			var bh = bm.length == 1 ? w.parentOfType(bm[0], ["ul", "ol"]) : w.commonAncestor.apply(null, bm);
			if (!bh) {
				bh = w.parentOfType(bm[0], ["td"]) || bm[0].ownerDocument.body
			}
			if (w.isInline(bh)) {
				bh = w.blockParentOrBody(bh)
			}
			var be = [];
			var bi = a8.findSuitable(bm);
			if (!bi) {
				bi = new ar(ba == "ul" ? "ol" : "ul").findSuitable(bm)
			}
			var bg = w.significantChildNodes(bh);
			if (!bg.length) {
				bg = bm
			}
			if (/table|tbody/.test(w.name(bh))) {
				bg = a.map(bm, function(bo) {
					return w.parentOfType(bo, ["td"])
				})
			}
			for (var bj = 0; bj < bg.length; bj++) {
				var bf = bg[bj];
				var bl = w.name(bf);
				if (a9(bf, bm) && (!bi || !ak(bi, bf))) {
					if (bi && (bl == "ul" || bl == "ol")) {
						a.each(bf.childNodes, function() {
							be.push(this)
						});
						w.remove(bf)
					} else {
						be.push(bf)
					}
				}
			}
			if (be.length == bg.length && bh != bm[0].ownerDocument.body && !/table|tbody|tr|td/.test(w.name(bh))) {
				be = [bh]
			}
			if (!bi) {
				bi = w.create(bh.ownerDocument, ba);
				w.insertBefore(bi, be[0])
			}
			bd(bi, be);
			if (!w.is(bi, ba)) {
				w.changeTag(bi, ba)
			}
			var bn = bi.previousSibling;
			while (bn && (bn.className == "t-marker" || (bn.nodeType == 3 && w.isWhitespace(bn)))) {
				bn = bn.previousSibling
			}
			if (bn && w.name(bn) == ba) {
				while (bi.firstChild) {
					bn.appendChild(bi.firstChild)
				}
				w.remove(bi);
				bi = bn
			}
			var bk = bi.nextSibling;
			while (bk && (bk.className == "t-marker" || (bk.nodeType == 3 && w.isWhitespace(bk)))) {
				bk = bk.nextSibling
			}
			if (bk && w.name(bk) == ba) {
				while (bi.lastChild) {
					bk.insertBefore(bi.lastChild, bk.firstChild)
				}
				w.remove(bi)
			}
		};

		function bb(bj) {
			var bi = a(bj).parents("ul,ol"),
				bg, bh, be, bf;
			if (bi[0]) {
				bf = function(bk) {
					w.insertBefore(bk, bi.last()[0])
				}
			} else {
				bf = function(bk) {
					w.insertBefore(bk, bj)
				}
			}
			for (bg = bj.firstChild; bg; bg = bg.nextSibling) {
				bh = w.create(bj.ownerDocument, bc || "p");
				while (bg.firstChild) {
					be = bg.firstChild;
					if (w.isBlock(be)) {
						if (bh.firstChild) {
							bf(bh);
							bh = w.create(bj.ownerDocument, bc || "p")
						}
						bf(be)
					} else {
						bh.appendChild(be)
					}
				}
				if (bh.firstChild) {
					bf(bh)
				}
			}
			if (bi[0]) {
				bi.last().remove()
			}
			w.remove(bj)
		}
		this.remove = function(bh) {
			var be;
			for (var bf = 0, bg = bh.length; bf < bg; bf++) {
				if (be = a8.findFormat(bh[bf])) {
					bb(be)
				}
			}
		};
		this.toggle = function(bg) {
			var bf = aW(bg),
				be = bg.commonAncestorContainer;
			if (!bf.length) {
				bg.selectNodeContents(be);
				bf = aW(bg);
				if (!bf.length) {
					var bh = be.ownerDocument.createTextNode("");
					bg.startContainer.appendChild(bh);
					bf = [bh];
					bg.selectNode(bh.parentNode)
				}
			}
			if (a8.isFormatted(bf)) {
				this.split(bg);
				this.remove(bf)
			} else {
				this.apply(bf)
			}
		}
	}
	function aq(a7) {
		a7.formatter = new at(a7.tag);
		q.call(this, a7)
	}
	function au(a7) {
		P.call(this, a.extend(a7, {
			finder: new ar(a7.tag)
		}));
		this.command = function(a8) {
			return new aq(a.extend(a8, {
				tag: a7.tag
			}))
		}
	}
	function ao() {
		this.findSuitable = function(a7) {
			return w.parentOfType(a7, ["a"])
		}
	}
	function ap() {
		this.finder = new ao();
		this.apply = function(bd, a8) {
			var bc = aW(bd);
			if (a8.innerHTML != undefined) {
				var bb = R(bd);
				var a9 = v(bd);
				bd.deleteContents();
				var a7 = w.create(a9, "a", a8);
				bd.insertNode(a7);
				if (bb.length > 1) {
					w.insertAfter(bb[bb.length - 1], a7);
					w.insertAfter(bb[1], a7);
					w[bc.length > 0 ? "insertBefore" : "insertAfter"](bb[0], a7)
				}
			} else {
				var ba = new ae([{
					tags: ["a"]
				}], a8);
				ba.finder = this.finder;
				ba.apply(bc)
			}
		}
	}
	function a0(a7) {
		a7.formatter = {
			toggle: function(a8) {
				new ae([{
					tags: ["a"]
				}]).remove(aW(a8))
			}
		};
		q.call(this, a7)
	}
	function an(a9) {
		q.call(this, a9);
		var a7;
		this.async = true;
		var a8 = new ap();
		this.exec = function() {
			var bh = this.getRange();
			var bd = bh.collapsed;
			bh = this.lockRange(true);
			var bg = aW(bh);
			var bf = null;
			var bi = this;

			function bb(bk) {
				var bl = a("#t-editor-link-url", be.element).val();
				if (bl && bl != "http://") {
					a7 = {
						href: bl
					};
					var bo = a("#t-editor-link-title", be.element).val();
					if (bo) {
						a7.title = bo
					}
					var bn = a("#t-editor-link-text", be.element).val();
					if (bn !== bf) {
						a7.innerHTML = bn
					}
					var bm = a("#t-editor-link-target", be.element).is(":checked");
					if (bm) {
						a7.target = "_blank"
					}
					a8.apply(bh, a7)
				}
				bc(bk);
				if (bi.change) {
					bi.change()
				}
			}
			function bc(bk) {
				bk.preventDefault();
				be.destroy();
				a6(v(bh)).focus();
				bi.releaseRange(bh)
			}
			var ba = bg.length ? a8.finder.findSuitable(bg[0]) : null;
			var bj = bg.length <= 1 || (bg.length == 2 && bd);
			var be = b.window.create(a.extend({}, this.editor.dialogOptions, {
				title: "Insert link",
				html: new a.telerik.stringBuilder().cat('<div class="t-editor-dialog">').cat("<ol>").cat('<li class="t-form-text-row"><label for="t-editor-link-url">Web address</label><input type="text" class="t-input" id="t-editor-link-url"/></li>').catIf('<li class="t-form-text-row"><label for="t-editor-link-text">Text</label><input type="text" class="t-input" id="t-editor-link-text"/></li>', bj).cat('<li class="t-form-text-row"><label for="t-editor-link-title">Tooltip</label><input type="text" class="t-input" id="t-editor-link-title"/></li>').cat('<li class="t-form-checkbox-row"><input type="checkbox" id="t-editor-link-target"/><label for="t-editor-link-target">Open link in new window</label></li>').cat("</ol>").cat('<div class="t-button-wrapper">').cat('<button class="t-dialog-insert t-button">Insert</button>').cat("&nbsp;or&nbsp;").cat('<a href="#" class="t-dialog-close t-link">Close</a>').cat("</div>").cat("</div>").string(),
				onClose: bc
			})).hide().find(".t-dialog-insert").click(bb).end().find(".t-dialog-close").click(bc).end().find(".t-form-text-row input").keydown(function(bk) {
				if (bk.keyCode == 13) {
					bb(bk)
				} else {
					if (bk.keyCode == 27) {
						bc(bk)
					}
				}
			}).end().find("#t-editor-link-url").val(ba ? ba.getAttribute("href", 2) : "http://").end().find("#t-editor-link-text").val(bg.length > 0 ? (bg.length == 1 ? bg[0].nodeValue : bg[0].nodeValue + bg[1].nodeValue) : "").end().find("#t-editor-link-title").val(ba ? ba.title : "").end().find("#t-editor-link-target").attr("checked", ba ? ba.target == "_blank" : false).end().show().data("tWindow").center();
			if (bj && bg.length > 0) {
				bf = a("#t-editor-link-text", be.element).val()
			}
			a("#t-editor-link-url", be.element).focus().select()
		}, this.redo = function() {
			var ba = this.lockRange(true);
			a8.apply(ba, a7);
			this.releaseRange(ba)
		}
	}
	function a1(a9) {
		aX.call(this, a.extend(a9, {
			command: a0
		}));
		var a8 = new ad([{
			tags: ["a"]
		}]),
			a7 = this.init;
		this.init = function(ba, bb) {
			a7.call(this, ba, bb);
			ba.addClass("t-state-disabled")
		};
		this.update = function(ba, bb) {
			ba.toggleClass("t-state-disabled", !a8.isFormatted(bb)).removeClass("t-state-hover")
		}
	}
	function W(a9) {
		q.call(this, a9);
		this.async = true;
		var a7;

		function a8(ba, bb) {
			if (a7.src && a7.src != "http://") {
				if (!ba) {
					ba = w.create(v(bb), "img", a7);
					ba.onload = ba.onerror = function() {
						ba.removeAttribute("complete");
						ba.removeAttribute("width");
						ba.removeAttribute("height")
					};
					bb.deleteContents();
					bb.insertNode(ba);
					bb.setStartAfter(ba);
					bb.setEndAfter(ba);
					aP(bb);
					return true
				} else {
					w.attr(ba, a7)
				}
			}
			return false
		}
		this.redo = function() {
			var ba = this.lockRange();
			if (!a8(aI.image(ba), ba)) {
				this.releaseRange(ba)
			}
		};
		this.exec = function() {
			var bh = this.lockRange();
			var bb = false;
			var bg = aI.image(bh);
			var bi = this;

			function bc(bk) {
				a7 = {
					src: a("#t-editor-image-url", be.element).val(),
					alt: a("#t-editor-image-title", be.element).val()
				};
				bb = a8(bg, bh);
				bd(bk);
				if (bi.change) {
					bi.change()
				}
			}
			function bd(bk) {
				bk.preventDefault();
				be.destroy();
				a6(v(bh)).focus();
				if (!bb) {
					bi.releaseRange(bh)
				}
			}
			var bf = this.editor.fileBrowser;
			var bj = bf && bf.selectUrl !== undefined;

			function ba() {
				if (bj) {
					new b.imageBrowser(a(this).find(".t-image-browser"), a.extend(bf, {
						apply: bc,
						element: bi.editor.element,
						localization: bi.editor.localization
					}))
				}
			}
			var be = b.window.create(a.extend({
				width: 750
			}, this.editor.dialogOptions, {
				title: "Insert image",
				html: new a.telerik.stringBuilder().cat('<div class="t-editor-dialog">').catIf('<div class="t-image-browser"></div>', bj).cat("<ol>").cat('<li class="t-form-text-row"><label for="t-editor-image-url">Web address</label><input type="text" class="t-input" id="t-editor-image-url"/></li>').cat('<li class="t-form-text-row"><label for="t-editor-image-title">Tooltip</label><input type="text" class="t-input" id="t-editor-image-title"/></li>').cat("</ol>").cat('<div class="t-button-wrapper">').cat('<button class="t-dialog-insert t-button">Insert</button>').cat("&nbsp;or&nbsp;").cat('<a href="#" class="t-dialog-close t-link">Close</a>').cat("</div>").cat("</div>").string(),
				onClose: bd,
				onActivate: ba
			})).hide().find(".t-dialog-insert").click(bc).end().find(".t-dialog-close").click(bd).end().find(".t-form-text-row input").keydown(function(bk) {
				if (bk.keyCode == 13) {
					bc(bk)
				} else {
					if (bk.keyCode == 27) {
						bd(bk)
					}
				}
			}).end().toggleClass("t-imagebrowser", bj).find("#t-editor-image-url").val(bg ? bg.getAttribute("src", 2) : "http://").end().find("#t-editor-image-title").val(bg ? bg.alt : "").end().show().data("tWindow").center();
			a("#t-editor-image-url", be.element).focus().select()
		}
	}
	b.selectbox = function(ba, bc) {
		var be;
		var a7 = a(ba).attr("tabIndex", 0);
		var a8 = a7.find(".t-input");
		var a9 = this.dropDown = new b.dropDown({
			effects: b.fx.slide.defaults(),
			onItemCreate: bc.onItemCreate,
			onClick: function(bg) {
				bd(bc.data[a(bg.item).index()].Value);
				bc.onChange({
					value: be
				})
			}
		});

		function bb() {
			if (!a9.$items) {
				a9.dataBind(bc.data)
			}
		}
		function bf(bg) {
			a8.html(bg ? bg : "&nbsp;")
		}
		function bd(bi) {
			bb();
			var bh = -1;
			for (var bg = 0, bj = bc.data.length; bg < bj; bg++) {
				if (bc.data[bg].Value == bi) {
					bh = bg;
					break
				}
			}
			if (bh != -1) {
				a9.$items.removeClass("t-state-selected").eq(bh).addClass("t-state-selected");
				bf(a(a9.$items[bh]).text());
				be = bc.data[bh].Value
			}
		}
		this.value = function(bg) {
			if (bg == undefined) {
				return be
			}
			bd(bg);
			if (be != bg) {
				bf(bc.title || bg)
			}
		};
		this.close = function() {
			a9.close()
		};
		bf(bc.title || a8.text());
		a7.click(function(bg) {
			bb();
			if (a9.isOpened()) {
				a9.close()
			} else {
				a9.open({
					offset: a7.offset(),
					outerHeight: a7.outerHeight(),
					outerWidth: a7.outerWidth(),
					zIndex: b.getElementZIndex(a7[0])
				})
			}
		}).find("*").attr("unselectable", "on").end().keydown(function(bg) {
			var bh = bg.keyCode,
				bk, bj, bi;
			if (bh === 40) {
				if (!a9.isOpened()) {
					a7.click()
				} else {
					bk = a9.$items.filter(".t-state-selected");
					if (!bk[0]) {
						bi = a9.$items.first()
					} else {
						bi = bk.next()
					}
					if (bi[0]) {
						bk.removeClass("t-state-selected");
						bi.addClass("t-state-selected")
					}
				}
				bg.preventDefault()
			} else {
				if (bh === 38) {
					if (a9.isOpened()) {
						bk = a9.$items.filter(".t-state-selected");
						bj = bk.prev();
						if (bj[0]) {
							bk.removeClass("t-state-selected");
							bj.addClass("t-state-selected")
						}
					}
					bg.preventDefault()
				} else {
					if (bh == 13) {
						bk = a9.$items.filter(".t-state-selected");
						if (bk[0]) {
							bk.click()
						}
						bg.preventDefault()
					} else {
						if (bg.keyCode == 9 || bg.keyCode == 39 || bg.keyCode == 37) {
							a9.close()
						}
					}
				}
			}
		});
		if (a.browser.msie) {
			a7.focus(function() {
				a7.css("outline", "1px dotted #000")
			}).blur(function() {
				a7.css("outline", "")
			})
		}
		a9.$element.css("direction", a7.closest(".t-rtl").length > 0 ? "rtl" : "");
		a(document.documentElement).bind("mousedown", a.proxy(function(bh) {
			var bg = a9.$element;
			var bi = bg && bg.parent().length > 0;
			if (bi && !a.contains(ba, bh.target) && !a.contains(bg.parent()[0], bh.target)) {
				a9.close()
			}
		}, this))
	};
	a.fn.tSelectBox = function(a7) {
		return b.create(this, {
			name: "tSelectBox",
			init: function(a8, a9) {
				return new b.selectbox(a8, a9)
			},
			options: a7
		})
	};
	a.fn.tSelectBox.defaults = {
		effects: b.fx.slide.defaults()
	};
	b.colorpicker = function(a8, a9) {
		var ba = this;
		ba.element = a8;
		var a7 = a(a8);
		a.extend(ba, a9);
		a7.attr("tabIndex", 0).click(a.proxy(ba.click, ba)).keydown(function(bb) {
			var bd = ba.popup(),
				bf, bc, be;
			if (bb.keyCode == 40) {
				if (!bd.is(":visible")) {
					ba.open()
				} else {
					bf = bd.find(".t-state-selected");
					if (bf[0]) {
						bc = bf.next()
					} else {
						bc = bd.find("li:first")
					}
					if (bc[0]) {
						bf.removeClass("t-state-selected");
						bc.addClass("t-state-selected")
					}
				}
				bb.preventDefault()
			} else {
				if (bb.keyCode == 38) {
					if (bd.is(":visible")) {
						bf = bd.find(".t-state-selected");
						be = bf.prev();
						if (be[0]) {
							bf.removeClass("t-state-selected");
							be.addClass("t-state-selected")
						}
					}
					bb.preventDefault()
				} else {
					if (bb.keyCode == 9 || bb.keyCode == 39 || bb.keyCode == 37) {
						ba.close()
					} else {
						if (bb.keyCode == 13) {
							bd.find(".t-state-selected").click();
							bb.preventDefault()
						}
					}
				}
			}
		}).find("*").attr("unselectable", "on");
		if (a.browser.msie) {
			a7.focus(function() {
				a7.css("outline", "1px dotted #000")
			}).blur(function() {
				a7.css("outline", "")
			})
		}
		if (ba.selectedColor) {
			a7.find(".t-selected-color").css("background-color", this.selectedColor)
		}
		a(a8.ownerDocument.documentElement).bind("mousedown", a.proxy(function(bb) {
			if (!a(bb.target).closest(".t-colorpicker-popup").length) {
				this.close()
			}
		}, ba));
		b.bind(ba, {
			change: ba.onChange,
			load: ba.onLoad
		})
	};
	b.colorpicker.prototype = {
		select: function(a7) {
			if (a7) {
				a7 = w.toHex(a7);
				if (!b.trigger(this.element, "change", {
					value: a7
				})) {
					this.value(a7);
					this.close()
				}
			} else {
				b.trigger(this.element, "change", {
					value: this.selectedColor
				})
			}
		},
		open: function() {
			var a8 = this.popup();
			var a7 = a(this.element);
			var a9 = a7.offset();
			a9.top += a7.outerHeight();
			if (a7.closest(".t-rtl").length) {
				a9.left -= a8.outerWidth() - a7.outerWidth()
			}
			var ba = "auto";
			a7.parents().andSelf().each(function() {
				ba = a(this).css("zIndex");
				if (Number(ba)) {
					ba = Number(ba) + 1;
					return false
				}
			});
			b.fx._wrap(a8).css(a.extend({
				position: "absolute",
				zIndex: ba
			}, a9));
			a8.find(".t-item").bind("click", a.proxy(function(bc) {
				var bb = a(bc.currentTarget, bc.target.ownerDocument).find("div").css("background-color");
				this.select(bb)
			}, this));
			b.fx.play(this.effects, a8, {
				direction: "bottom"
			})
		},
		close: function() {
			if (!this.$popup) {
				return
			}
			b.fx.rewind(this.effects, this.$popup, {
				direction: "bottom"
			}, a.proxy(function() {
				if (this.$popup) {
					w.remove(this.$popup[0].parentNode);
					this.$popup = null
				}
			}, this))
		},
		toggle: function() {
			if (!this.$popup || !this.$popup.is(":visible")) {
				this.open()
			} else {
				this.close()
			}
		},
		click: function(a7) {
			if (a(a7.target).closest(".t-tool-icon").length > 0) {
				this.select()
			} else {
				this.toggle()
			}
		},
		value: function(a7) {
			if (!a7) {
				return this.selectedColor
			}
			a7 = w.toHex(a7);
			this.selectedColor = a7;
			a(".t-selected-color", this.element).css("background-color", a7)
		},
		popup: function() {
			if (!this.$popup) {
				this.$popup = a(b.colorpicker.buildPopup(this)).hide().appendTo(document.body).find("*").attr("unselectable", "on").end()
			}
			return this.$popup
		}
	};
	a.extend(b.colorpicker, {
		buildPopup: function(a7) {
			var ba = new b.stringBuilder();
			ba.cat('<div class="t-popup t-group t-colorpicker-popup">').cat('<ul class="t-reset">');
			var a9 = a7.data;
			var a8 = (a7.value() || "").substring(1);
			for (var bb = 0, bc = a9.length; bb < bc; bb++) {
				ba.cat('<li class="t-item').catIf(" t-state-selected", a9[bb] == a8).cat('"><div style="background-color:#').cat(a9[bb]).cat('"></div></li>')
			}
			ba.cat("</ul></div>");
			return ba.string()
		}
	});
	a.fn.tColorPicker = function(a7) {
		return b.create(this, {
			name: "tColorPicker",
			init: function(a8, a9) {
				return new b.colorpicker(a8, a9)
			},
			options: a7
		})
	};
	a.fn.tColorPicker.defaults = {
		data: "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7".split(","),
		selectedColor: null,
		effects: b.fx.slide.defaults()
	};

	function X(a7, a9) {
		var a8 = w.name(a7) != "td" ? "marginLeft" : "paddingLeft";
		if (a9 === undefined) {
			return a7.style[a8] || 0
		} else {
			if (a9 > 0) {
				a7.style[a8] = a9 + "px"
			} else {
				a7.style[a8] = "";
				if (a7.style.cssText == "") {
					a7.removeAttribute("style")
				}
			}
		}
	}
	function Z() {
		var a7 = new h([{
			tags: g
		}]);
		this.apply = function(bg) {
			var bb = a7.findSuitable(bg);
			if (bb.length) {
				var bj = [];
				for (var bd = 0; bd < bb.length; bd++) {
					if (w.is(bb[bd], "li")) {
						if (a(bb[bd]).index() == 0) {
							bj.push(bb[bd].parentNode)
						} else {
							if (a.inArray(bb[bd].parentNode, bj) < 0) {
								bj.push(bb[bd])
							}
						}
					} else {
						bj.push(bb[bd])
					}
				}
				while (bj.length) {
					var ba = bj.shift();
					if (w.is(ba, "li")) {
						var bh = ba.parentNode;
						var a8 = a(ba).prev("li");
						var a9 = a8.find("ul,ol").last();
						var bf = a(ba).children("ul,ol")[0];
						if (bf && a8[0]) {
							if (a9[0]) {
								a9.append(ba);
								a9.append(a(bf).children());
								w.remove(bf)
							} else {
								a8.append(bf);
								bf.insertBefore(ba, bf.firstChild)
							}
						} else {
							bf = a8.children("ul,ol")[0];
							if (!bf) {
								bf = w.create(ba.ownerDocument, w.name(bh));
								a8.append(bf)
							}
							while (ba && ba.parentNode == bh) {
								bf.appendChild(ba);
								ba = bj.shift()
							}
						}
					} else {
						var be = parseInt(X(ba)) + 30;
						X(ba, be);
						for (var bi = 0; bi < bj.length; bi++) {
							if (a.contains(ba, bj[bi])) {
								bj.splice(bi, 1)
							}
						}
					}
				}
			} else {
				var bc = new j([{
					tags: g
				}], {
					style: {
						marginLeft: 30
					}
				});
				bc.apply(bg)
			}
		};
		this.remove = function(bf) {
			var bc = a7.findSuitable(bf),
				bg;
			for (var bd = 0; bd < bc.length; bd++) {
				var a8 = a(bc[bd]);
				if (a8.is("li")) {
					var a9 = a8.parent();
					var ba = a9.parent();
					if (ba.is("li,ul,ol") && !X(a9[0])) {
						if (bg && a.contains(bg, ba[0])) {
							continue
						}
						var bb = a8.nextAll("li");
						if (bb.length) {
							a(a9[0].cloneNode(false)).appendTo(a8).append(bb)
						}
						if (ba.is("li")) {
							a8.insertAfter(ba)
						} else {
							a8.appendTo(ba)
						}
						if (!a9.children("li").length) {
							a9.remove()
						}
						continue
					} else {
						if (bg == a9[0]) {
							continue
						}
						bg = a9[0]
					}
				} else {
					bg = bc[bd]
				}
				var be = parseInt(X(bg)) - 30;
				X(bg, be)
			}
		}
	}
	function Y(a7) {
		a7.formatter = {
			toggle: function(a8) {
				new Z().apply(aI.nodes(a8))
			}
		};
		q.call(this, a7)
	}
	function aB(a7) {
		a7.formatter = {
			toggle: function(a8) {
				new Z().remove(aI.nodes(a8))
			}
		};
		q.call(this, a7)
	}
	function aC() {
		aX.call(this, {
			command: aB
		});
		var a8 = new h([{
			tags: g
		}]),
			a7 = this.init;
		this.init = function(a9, ba) {
			a7.call(this, a9, ba);
			a9.addClass("t-state-disabled")
		};
		this.update = function(a9, bd) {
			var be = a8.findSuitable(bd),
				bb, bc;
			for (var ba = 0; ba < be.length; ba++) {
				bb = X(be[ba]);
				if (!bb) {
					bc = a(be[ba]).parents("ul,ol").length;
					bb = (w.is(be[ba], "li") && (bc > 1 || X(be[ba].parentNode))) || (w.ofType(be[ba], ["ul", "ol"]) && bc > 0)
				}
				if (bb) {
					a9.removeClass("t-state-disabled");
					return
				}
			}
			a9.addClass("t-state-disabled").removeClass("t-state-hover")
		}
	}
	function aE(a7) {
		this.editor = a7;
		this.formats = []
	}
	aE.prototype = {
		apply: function(bd) {
			if (!this.hasPending()) {
				return
			}
			var bb = new ax();
			bb.addCaret(bd);
			var a7 = bd.startContainer.childNodes[bd.startOffset];
			var be = a7.previousSibling;
			if (!be.nodeValue) {
				be = be.previousSibling
			}
			bd.setStart(be, be.nodeValue.length - 1);
			bb.add(bd);
			if (aW(bd).length == 0) {
				bb.remove(bd);
				bd.collapse(true);
				this.editor.selectRange(bd);
				return
			}
			var bf = bb.end.previousSibling.previousSibling;
			var bc, a9 = this.formats;
			for (var ba = 0; ba < a9.length; ba++) {
				bc = a9[ba];
				var a8 = bc.command(a.extend({
					range: bd
				}, bc.params));
				a8.editor = this.editor;
				a8.exec();
				bd.selectNode(bf)
			}
			bb.remove(bd);
			if (bf.parentNode) {
				bd.setStart(bf, 1);
				bd.collapse(true)
			}
			this.clear();
			this.editor.selectRange(bd)
		},
		hasPending: function() {
			return this.formats.length > 0
		},
		isPending: function(a7) {
			return !!this.getPending(a7)
		},
		getPending: function(a7) {
			var a8 = this.formats;
			for (var a9 = 0; a9 < a8.length; a9++) {
				if (a8[a9].name == a7) {
					return a8[a9]
				}
			}
			return
		},
		toggle: function(a7) {
			var a8 = this.formats;
			for (var a9 = 0; a9 < a8.length; a9++) {
				if (a8[a9].name == a7.name) {
					if (a8[a9].params && a8[a9].params.value != a7.params.value) {
						a8[a9].params.value = a7.params.value
					} else {
						a8.splice(a9, 1)
					}
					return
				}
			}
			a8.push(a7)
		},
		clear: function() {
			this.formats = []
		}
	};

	function s(a7, bb) {
		a7.hide();
		var ba = a("<iframe />", {
			src: 'javascript:"<html></html>"',
			frameBorder: "0"
		}).css("display", "").addClass("t-content").insertBefore(a7)[0];
		var bc = ba.contentWindow || ba;
		var a8 = bc.document || ba.contentDocument;
		var a9 = a7.val().replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/ig, "$1").replace(/[\r\n\v\f\t ]+/ig, " ");
		if (!a9.length && a.browser.mozilla) {
			a9 = '<br _moz_dirty="true" />'
		}
		a8.designMode = "On";
		a8.open();
		a8.write(new b.stringBuilder().cat("<!DOCTYPE html><html><head>").cat('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />').cat('<style type="text/css">').cat("html,body{padding:0;margin:0;font-family:Verdana,Geneva,sans-serif;background:#fff;}").cat("html{font-size:100%}body{font-size:.75em;line-height:1.5;padding-top:1px;margin-top:-1px;").catIf("direction:rtl;", a7.closest(".t-rtl").length).cat("}").cat("h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}").cat("p{margin:0 0 1em;padding:0 .2em}.t-marker{display:none;}.t-paste-container{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}").cat("ul,ol{padding-left:2.5em}").cat("a{color:#00a}").cat("code{font-size:1.23em}").cat("</style>").cat(a.map(bb, function(bd) {
			return ['<link type="text/css" href="', bd, '" rel="stylesheet"/>'].join("")
		}).join("")).cat('</head><body spellcheck="false">').cat(a9).cat("</body></html>").string());
		a8.close();
		return bc
	}
	function aL(a7) {
		b.trigger(a7.element, "selectionChange")
	}
	var I = ".t-colorpicker,a.t-tool-icon:not(.t-state-disabled),.t-selectbox, .t-combobox .t-input";

	function aa(a7) {
		var a8 = true;
		a7.window = s(a(a7.textarea), a7.stylesheets);
		a7.document = a7.window.contentDocument || a7.window.document;
		a7.body = a7.document.body;
		a(a7.document).bind({
			keydown: function(a9) {
				if (a9.keyCode === 121) {
					setTimeout(function() {
						var bc = a(a7.element).attr("tabIndex");
						a(a7.element).attr("tabIndex", bc || 0).focus().find(I).first().focus();
						if (!bc && bc !== 0) {
							a(a7.element).removeAttr("tabIndex")
						}
					}, 100);
					a9.preventDefault();
					return
				}
				var bb = a7.keyboard.toolFromShortcut(a7.tools, a9);
				if (bb) {
					a9.preventDefault();
					if (!/undo|redo/.test(bb)) {
						a7.keyboard.endTyping(true)
					}
					a7.exec(bb);
					return false
				}
				if (a7.keyboard.isTypingKey(a9) && a7.pendingFormats.hasPending()) {
					if (a8) {
						a8 = false
					} else {
						var ba = a7.getRange();
						a7.pendingFormats.apply(ba);
						a7.selectRange(ba)
					}
				}
				a7.keyboard.clearTimeout();
				a7.keyboard.keydown(a9)
			},
			keyup: function(a9) {
				var bb = [8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];
				if (a.browser.mozilla && a9.keyCode == 8) {
					G(a7, a9)
				}
				if (a.inArray(a9.keyCode, bb) > -1 || (a9.keyCode == 65 && a9.ctrlKey && !a9.altKey && !a9.shiftKey)) {
					a7.pendingFormats.clear();
					aL(a7)
				}
				if (a7.keyboard.isTypingKey(a9)) {
					if (a7.pendingFormats.hasPending()) {
						var ba = a7.getRange();
						a7.pendingFormats.apply(ba);
						a7.selectRange(ba)
					}
				} else {
					a8 = true
				}
				a7.keyboard.keyup(a9)
			},
			mousedown: function(a9) {
				a7.pendingFormats.clear();
				var ba = a(a9.target);
				if (!a.browser.gecko && a9.which == 2 && ba.is("a[href]")) {
					window.open(ba.attr("href"), "_new")
				}
			},
			mouseup: function() {
				aL(a7)
			}
		});
		a(a7.window).bind("blur", function() {
			var a9 = a7.textarea.value,
				ba = a7.encodedValue();
			a7.update(ba);
			if (ba != a9) {
				b.trigger(a7.element, "change")
			}
		});
		a(a7.body).bind("cut paste", function(a9) {
			a7.clipboard["on" + a9.type](a9)
		})
	}
	b.editor = function(bb, be) {
		if (/Mobile.*Safari/.test(navigator.userAgent)) {
			return
		}
		var bf = this;
		this.element = bb;
		var a7 = a(bb);
		a7.closest("form").bind("submit", function() {
			bf.update()
		});
		a.extend(this, be);
		b.bind(this, {
			load: this.onLoad,
			selectionChange: this.onSelectionChange,
			change: this.onChange,
			execute: this.onExecute,
			error: this.onError,
			paste: this.onPaste
		});
		for (var bd in this.tools) {
			this.tools[bd].name = bd.toLowerCase()
		}
		this.textarea = a7.find("textarea").attr("autocomplete", "off")[0];
		aa(this);
		this.keyboard = new am([new aY(this), new aV(this)]);
		this.clipboard = new o(this);
		this.pendingFormats = new aE(this);
		this.undoRedoStack = new aZ();

		function bh(bi) {
			var bj = a.grep(bi.className.split(" "), function(bk) {
				return !/^t-(widget|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(bk)
			});
			return bj[0] ? bj[0].substring(2) : "custom"
		}
		function a8(bi, bj) {
			if (!bj.key) {
				return bi
			}
			return new b.stringBuilder().cat(bi).cat(" (").catIf("Ctrl + ", bj.ctrl).catIf("Shift + ", bj.shift).catIf("Alt + ", bj.alt).cat(bj.key).cat(")").string()
		}
		var bg = ".t-editor-toolbar > li > *",
			a9 = ".t-editor-button .t-tool-icon",
			bc = a9 + ":not(.t-state-disabled)",
			ba = a9 + ".t-state-disabled";
		a7.find(".t-combobox .t-input").keydown(function(bj) {
			var bi = a(this).closest(".t-combobox").data("tComboBox"),
				bk = bj.keyCode;
			if (bk == 39 || bk == 37) {
				bi.close()
			} else {
				if (bk == 40) {
					if (!bi.dropDown.isOpened()) {
						bj.stopImmediatePropagation();
						bi.open()
					}
				}
			}
		});
		a7.delegate(bc, "mouseenter", b.hover).delegate(bc, "mouseleave", b.leave).delegate(a9, "mousedown", b.preventDefault).delegate(I, "keydown", function(bi) {
			if (bi.keyCode == 39) {
				a(this).closest("li").nextAll("li:has(" + I + ")").first().find(I).focus()
			} else {
				if (bi.keyCode == 37) {
					a(this).closest("li").prevAll("li:has(" + I + ")").last().find(I).focus()
				} else {
					if (bi.keyCode == 27) {
						bf.focus()
					}
				}
			}
		}).delegate(bc, "click", b.stopAll(function(bi) {
			bf.exec(bh(this))
		})).delegate(ba, "click", function(bi) {
			bi.preventDefault()
		}).find(bg).each(function() {
			var bm = bh(this),
				bl = bf.tools[bm],
				bj = bf.localization[bm],
				bi = a(this);
			if (!bl) {
				return
			}
			if (bm == "fontSize" || bm == "fontName") {
				var bk = bf.localization[bm + "Inherit"] || av[bm + "Inherit"];
				bf[bm][0].Text = bk;
				bi.find("input").val(bk).end().find("span.t-input").text(bk).end()
			}
			bl.init(bi, {
				title: a8(bj, bl),
				editor: bf
			})
		}).end().bind("selectionChange", function() {
			var bj = bf.getRange();
			var bi = aW(bj);
			if (!bi.length) {
				bi = [bj.startContainer]
			}
			a7.find(bg).each(function() {
				var bk = bf.tools[bh(this)];
				if (bk) {
					bk.update(a(this), bi, bf.pendingFormats)
				}
			})
		});
		a(document).bind("DOMNodeInserted", function(bi) {
			if (a.contains(bi.target, bf.element) || bf.element == bi.target) {
				bf.textarea.value = bf.value();
				a(bf.element).find("iframe").remove();
				aa(bf)
			}
		}).bind("mousedown", function(bi) {
			try {
				if (bf.keyboard.typingInProgress()) {
					bf.keyboard.endTyping(true)
				}
				if (!bf.selectionRestorePoint) {
					bf.selectionRestorePoint = new aJ(bf.getRange())
				}
			} catch (bi) {}
		})
	};

	function G(a8, a7) {
		var ba = a8.getRange(),
			bb = ba.startContainer;
		if (bb == a8.body.firstChild || !w.isBlock(bb) || (bb.childNodes.length > 0 && !(bb.childNodes.length == 1 && w.is(bb.firstChild, "br")))) {
			return
		}
		var a9 = bb.previousSibling;
		while (a9 && !w.isBlock(a9)) {
			a9 = a9.previousSibling
		}
		if (!a9) {
			return
		}
		var bd = a8.document.createTreeWalker(a9, NodeFilter.SHOW_TEXT, null, false);
		var bc;
		while (bc = bd.nextNode()) {
			a9 = bc
		}
		ba.setStart(a9, al(a9) ? a9.nodeValue.length : 0);
		ba.collapse(true);
		aP(ba);
		w.remove(bb);
		a7.preventDefault()
	}
	a.extend(b.editor, {
		BlockFormatFinder: h,
		BlockFormatter: j,
		Dom: w,
		FormatCommand: N,
		GenericCommand: Q,
		GreedyBlockFormatter: T,
		GreedyInlineFormatFinder: U,
		GreedyInlineFormatter: V,
		ImageCommand: W,
		IndentCommand: Y,
		IndentFormatter: Z,
		InlineFormatFinder: ad,
		InlineFormatter: ae,
		InsertHtmlCommand: ah,
		Keyboard: am,
		LinkCommand: an,
		LinkFormatFinder: ao,
		LinkFormatter: ap,
		ListCommand: aq,
		ListFormatFinder: ar,
		ListFormatter: at,
		MSWordFormatCleaner: ay,
		Marker: ax,
		NewLineCommand: az,
		OutdentCommand: aB,
		ParagraphCommand: aD,
		PendingFormats: aE,
		RangeEnumerator: aG,
		RangeUtils: aI,
		RestorePoint: aJ,
		SystemHandler: aV,
		TypingHandler: aY,
		UndoRedoStack: aZ,
		UnlinkCommand: a0
	});
	b.editor.prototype = {
		value: function(a8) {
			var a7 = this.body;
			if (a8 === undefined) {
				return x(a7)
			}
			this.pendingFormats.clear();
			a8 = a8.replace(/<!\[CDATA\[(.*)?\]\]>/g, "<!--[CDATA[$1]]-->");
			a8 = a8.replace(/<script([^>]*)>(.*)?<\/script>/ig, "<telerik:script $1>$2</telerik:script>");
			if (a.browser.mozilla) {
				a8 = a8.replace(/<p([^>]*)>(\s*)?<\/p>/ig, '<p $1><br _moz_dirty="" /></p>')
			}
			if (a.browser.msie && parseInt(a.browser.version) < 9) {
				a8 = "<br/>" + a8;
				var ba = "originalsrc",
					a9 = "originalhref";
				a8 = a8.replace(/href\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, a9 + '="$1"');
				a8 = a8.replace(/src\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, ba + '="$1"');
				a7.innerHTML = a8;
				w.remove(a7.firstChild);
				a(a7).find("telerik\\:script,script,link,img,a").each(function() {
					var bb = this;
					if (bb[a9]) {
						bb.setAttribute("href", bb[a9]);
						bb.removeAttribute(a9)
					}
					if (bb[ba]) {
						bb.setAttribute("src", bb[ba]);
						bb.removeAttribute(ba)
					}
				})
			} else {
				a7.innerHTML = a8;
				if (a.browser.msie) {
					aA(a7)
				}
			}
			this.selectionRestorePoint = null;
			this.update()
		},
		focus: function() {
			this.window.focus()
		},
		update: function(a7) {
			this.textarea.value = a7 || this.encoded ? this.encodedValue() : this.value()
		},
		encodedValue: function() {
			return w.encode(this.value())
		},
		createRange: function(a7) {
			return t(a7 || this.document)
		},
		getSelection: function() {
			return aM(this.document)
		},
		selectRange: function(a7) {
			this.focus();
			var a8 = this.getSelection();
			a8.removeAllRanges();
			a8.addRange(a7)
		},
		getRange: function() {
			var a8 = this.getSelection();
			var a7 = a8.rangeCount > 0 ? a8.getRangeAt(0) : this.createRange();
			if (a7.startContainer == this.document && a7.endContainer == this.document && a7.startOffset == 0 && a7.endOffset == 0) {
				a7.setStart(this.body, 0);
				a7.collapse(true)
			}
			return a7
		},
		selectedHtml: function() {
			return x(this.getRange().cloneContents())
		},
		paste: function(a7) {
			this.clipboard.paste(a7)
		},
		exec: function(ba, bb) {
			var bc, a7, a9, bd = "";
			ba = ba.toLowerCase();
			if (!this.keyboard.typingInProgress()) {
				this.focus();
				bc = this.getRange();
				a7 = this.document.body
			}
			for (a9 in this.tools) {
				if (a9.toLowerCase() == ba) {
					bd = this.tools[a9];
					break
				}
			}
			if (bd) {
				bc = this.getRange();
				if (!/undo|redo/i.test(ba) && bd.willDelayExecution(bc)) {
					this.pendingFormats.toggle({
						name: ba,
						params: bb,
						command: bd.command
					});
					aL(this);
					return
				}
				var a8 = bd.command ? bd.command(a.extend({
					range: bc
				}, bb)) : null;
				b.trigger(this.element, "execute", {
					name: ba,
					command: a8
				});
				if (/undo|redo/i.test(ba)) {
					this.undoRedoStack[ba]()
				} else {
					if (a8) {
						if (!a8.managesUndoRedo) {
							this.undoRedoStack.push(a8)
						}
						a8.editor = this;
						a8.exec();
						if (a8.async) {
							a8.change = a.proxy(function() {
								aL(this)
							}, this);
							return
						}
					}
				}
				aL(this)
			}
		}
	};
	a.fn.tEditor = function(a7) {
		return b.create(this, {
			name: "tEditor",
			init: function(a8, a9) {
				return new b.editor(a8, a9)
			},
			options: a7
		})
	};
	var O = {
		bold: [{
			tags: ["strong"]
		}, {
			tags: ["span"],
			attr: {
				style: {
					fontWeight: "bold"
				}
			}
		}],
		italic: [{
			tags: ["em"]
		}, {
			tags: ["span"],
			attr: {
				style: {
					fontStyle: "italic"
				}
			}
		}],
		underline: [{
			tags: ["span"],
			attr: {
				style: {
					textDecoration: "underline"
				}
			}
		}],
		strikethrough: [{
			tags: ["del"]
		}, {
			tags: ["span"],
			attr: {
				style: {
					textDecoration: "line-through"
				}
			}
		}],
		superscript: [{
			tags: ["sup"]
		}],
		subscript: [{
			tags: ["sub"]
		}],
		justifyLeft: [{
			tags: g,
			attr: {
				style: {
					textAlign: "left"
				}
			}
		}, {
			tags: ["img"],
			attr: {
				style: {
					"float": "left"
				}
			}
		}],
		justifyCenter: [{
			tags: g,
			attr: {
				style: {
					textAlign: "center"
				}
			}
		}, {
			tags: ["img"],
			attr: {
				style: {
					display: "block",
					marginLeft: "auto",
					marginRight: "auto"
				}
			}
		}],
		justifyRight: [{
			tags: g,
			attr: {
				style: {
					textAlign: "right"
				}
			}
		}, {
			tags: ["img"],
			attr: {
				style: {
					"float": "right"
				}
			}
		}],
		justifyFull: [{
			tags: g,
			attr: {
				style: {
					textAlign: "justify"
				}
			}
		}]
	};

	function M(a9, a7) {
		for (var a8 = 0; a8 < a7.length; a8++) {
			if (a.inArray(a9, a7[a8].tags) >= 0) {
				return a7[a8]
			}
		}
	}
	function aX(a7) {
		a.extend(this, a7);
		this.init = function(a8, a9) {
			a8.attr({
				unselectable: "on",
				title: a9.title
			})
		};
		this.command = function(a8) {
			return new a7.command(a8)
		};
		this.update = function() {};
		this.willDelayExecution = function() {
			return false
		}
	}
	aX.exec = function(a7, a8, a9) {
		a7.exec(a8, {
			value: a9
		})
	};

	function P(a7) {
		aX.call(this, a7);
		this.command = function(a8) {
			return new N(a.extend(a8, {
				formatter: a7.formatter
			}))
		};
		this.update = function(a8, bc, bd) {
			var bb = bd.isPending(this.name),
				ba = a7.finder.isFormatted(bc),
				a9 = bb ? !ba : ba;
			a8.toggleClass("t-state-active", a9)
		}
	}
	var z = function() {
			return {
				isFormatted: function() {
					return false
				}
			}
		};
	var av = {
		bold: "Bold",
		italic: "Italic",
		underline: "Underline",
		strikethrough: "Strikethrough",
		superscript: "Superscript",
		subscript: "Subscript",
		justifyCenter: "Center text",
		justifyLeft: "Align text left",
		justifyRight: "Align text right",
		justifyFull: "Justify",
		insertUnorderedList: "Insert unordered list",
		insertOrderedList: "Insert ordered list",
		indent: "Indent",
		outdent: "Outdent",
		createLink: "Insert hyperlink",
		unlink: "Remove hyperlink",
		insertImage: "Insert image",
		insertHtml: "Insert HTML",
		fontName: "Select font family",
		fontNameInherit: "(inherited font)",
		fontSize: "Select font size",
		fontSizeInherit: "(inherited size)",
		formatBlock: "Format",
		style: "Styles",
		emptyFolder: "Empty Folder",
		uploadFile: "Upload",
		orderBy: "Arrange by:",
		orderBySize: "Size",
		orderByName: "Name",
		invalidFileType: 'The selected file "{0}" is not valid. Supported file types are {1}.',
		deleteFile: 'Are you sure you want to delete "{0}"?',
		overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
		directoryNotFound: "A directory with this name was not found."
	};
	a.fn.tEditor.defaults = {
		localization: av,
		formats: O,
		encoded: true,
		stylesheets: [],
		dialogOptions: {
			modal: true,
			resizable: false,
			draggable: true,
			effects: {
				list: [{
					name: "toggle"
				}]
			}
		},
		fontName: [{
			Text: av.fontNameInherit,
			Value: "inherit"
		}, {
			Text: "Arial",
			Value: "Arial,Helvetica,sans-serif"
		}, {
			Text: "Courier New",
			Value: "'Courier New',Courier,monospace"
		}, {
			Text: "Georgia",
			Value: "Georgia,serif"
		}, {
			Text: "Impact",
			Value: "Impact,Charcoal,sans-serif"
		}, {
			Text: "Lucida Console",
			Value: "'Lucida Console',Monaco,monospace"
		}, {
			Text: "Tahoma",
			Value: "Tahoma,Geneva,sans-serif"
		}, {
			Text: "Times New Roman",
			Value: "'Times New Roman',Times,serif"
		}, {
			Text: "Trebuchet MS",
			Value: "'Trebuchet MS',Helvetica,sans-serif"
		}, {
			Text: "Verdana",
			Value: "Verdana,Geneva,sans-serif"
		}],
		fontSize: [{
			Text: av.fontSizeInherit,
			Value: "inherit"
		}, {
			Text: "1 (8pt)",
			Value: "xx-small"
		}, {
			Text: "2 (10pt)",
			Value: "x-small"
		}, {
			Text: "3 (12pt)",
			Value: "small"
		}, {
			Text: "4 (14pt)",
			Value: "medium"
		}, {
			Text: "5 (18pt)",
			Value: "large"
		}, {
			Text: "6 (24pt)",
			Value: "x-large"
		}, {
			Text: "7 (36pt)",
			Value: "xx-large"
		}],
		formatBlock: [{
			Text: "Paragraph",
			Value: "p"
		}, {
			Text: "Quotation",
			Value: "blockquote"
		}, {
			Text: "Heading 1",
			Value: "h1"
		}, {
			Text: "Heading 2",
			Value: "h2"
		}, {
			Text: "Heading 3",
			Value: "h3"
		}, {
			Text: "Heading 4",
			Value: "h4"
		}, {
			Text: "Heading 5",
			Value: "h5"
		}, {
			Text: "Heading 6",
			Value: "h6"
		}],
		tools: {
			bold: new af({
				key: "B",
				ctrl: true,
				format: O.bold
			}),
			italic: new af({
				key: "I",
				ctrl: true,
				format: O.italic
			}),
			underline: new af({
				key: "U",
				ctrl: true,
				format: O.underline
			}),
			strikethrough: new af({
				format: O.strikethrough
			}),
			superscript: new af({
				format: O.superscript
			}),
			subscript: new af({
				format: O.subscript
			}),
			undo: {
				key: "Z",
				ctrl: true
			},
			redo: {
				key: "Y",
				ctrl: true
			},
			insertLineBreak: new aX({
				key: 13,
				shift: true,
				command: az
			}),
			insertParagraph: new aX({
				key: 13,
				command: aD
			}),
			justifyCenter: new k({
				format: O.justifyCenter
			}),
			justifyLeft: new k({
				format: O.justifyLeft
			}),
			justifyRight: new k({
				format: O.justifyRight
			}),
			justifyFull: new k({
				format: O.justifyFull
			}),
			insertUnorderedList: new au({
				tag: "ul"
			}),
			insertOrderedList: new au({
				tag: "ol"
			}),
			createLink: new aX({
				key: "K",
				ctrl: true,
				command: an
			}),
			unlink: new a1({
				key: "K",
				ctrl: true,
				shift: true
			}),
			insertImage: new aX({
				command: W
			}),
			indent: new aX({
				command: Y
			}),
			outdent: new aC(),
			insertHtml: new ai(),
			style: new aU(),
			fontName: new K({
				cssAttr: "font-family",
				domAttr: "fontFamily",
				name: "fontName"
			}),
			fontSize: new K({
				cssAttr: "font-size",
				domAttr: "fontSize",
				name: "fontSize"
			}),
			formatBlock: new L(),
			foreColor: new p({
				cssAttr: "color",
				domAttr: "color",
				name: "foreColor"
			}),
			backColor: new p({
				cssAttr: "background-color",
				domAttr: "backgroundColor",
				name: "backColor"
			})
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		f = [8, 9, 37, 38, 39, 40, 46, 35, 36, 44],
		g = ["font-family", "font-size", "font-stretch", "font-style", "font-weight", "line-height", "color", "text-align", "text-decoration", "text-transform"];
	b.scripts.push("telerik.textbox.js");

	function e(j) {
		var l = {};
		for (var h = 0, k = g.length; h < k; h++) {
			var m = g[h],
				n = j.css(m);
			if (n) {
				if (g[h] != "font-style" && n != "normal") {
					l[m] = n
				}
			}
		}
		return l
	}
	b.textbox = function(l, n) {
		if (l.nodeName.toLowerCase() !== "input" && l.type.toLowerCase() !== "text") {
			throw "Target element is not a INPUT"
		}
		var o = this;
		a.extend(o, n);
		o.element = l;
		var h = o.$element = a(l).bind({
			keydown: a.proxy(o._keydown, o),
			keypress: a.proxy(o._keypress, o)
		}).bind("paste", a.proxy(o._paste, o));
		h.closest("form").bind("reset", a.proxy(o._onParentFormReset, o));
		var j = new b.stringBuilder();
		if (l.parentNode.nodeName.toLowerCase() !== "div") {
			h.addClass("t-input").wrap(a('<div class="t-widget t-numerictextbox"></div>'));
			if (o.showIncreaseButton) {
				j.cat('<a class="t-link t-icon t-arrow-up" href="#" tabindex="-1" title="').cat(o.increaseButtonTitle).cat('">Increment</a>')
			}
			if (o.showDecreaseButton) {
				j.cat('<a class="t-link t-icon t-arrow-down" href="#" tabindex="-1" title="').cat(o.decreaseButtonTitle).cat('">Decrement</a>')
			}
			if (j.buffer.length > 0) {
				a(j.string()).insertAfter(h)
			}
		}
		o.$wrapper = h.closest(".t-numerictextbox").find(".t-arrow-up, .t-arrow-down").bind({
			click: b.preventDefault,
			dragstart: b.preventDefault
		}).end().bind({
			focusin: a.proxy(o._focus, o),
			focusout: a.proxy(o._blur, o)
		});
		o.enabled = !h.is("[disabled]");
		j.buffer = [];
		j.cat("[ |").cat(o.groupSeparator).catIf("|" + o.symbol, o.symbol).cat("]");
		o.replaceRegExp = new RegExp(j.string(), "g");
		var m = h.attr("value"),
			k = h.attr("class").replace("t-input", "").replace("input-validation-error", "");
		j.buffer = [];
		j.cat('<div class="t-formatted-value').catIf(" t-state-empty", m == "" && o.enabled).catIf(k, k).cat('">').cat(m || (o.enabled ? o.text : "")).cat("</div>");
		o.$text = a(j.string()).insertBefore(h).css(e(h)).click(function(p) {
			if (o.enabled) {
				l.focus()
			}
		});
		o._blur();
		o[o.enabled ? "enable" : "disable"]();
		o.numFormat = o.numFormat === undefined ? o.type.charAt(0) : o.numFormat;
		o.step = o.parse(o.step);
		o.val = o.parse(o.val);
		o.minValue = o.parse(o.minValue);
		o.maxValue = o.parse(o.maxValue);
		o.decimals = {
			"190": ".",
			"188": ","
		};
		o.specialDecimals = {
			"110": o.separator
		};
		o.value(m || o.val);
		b.bind(o, {
			load: o.onLoad,
			valueChange: o.onChange
		})
	};
	b.textbox.prototype = {
		_paste: function(h) {
			setTimeout(a.proxy(function() {
				var k = h.target.value;
				if (k == "-") {
					return true
				}
				var j = this.parse(k);
				if (j || j == 0) {
					this._update(j)
				}
			}, this))
		},
		_keydown: function(n) {
			setTimeout(a.proxy(function() {
				h.toggleClass("t-state-error", !this.inRange(this.parse(h.val()), this.minValue, this.maxValue))
			}, this));
			var r = n.keyCode,
				h = this.$element,
				o = h[0],
				z = h.val(),
				v = this.separator,
				u = d(o),
				y = u.start,
				p = u.end,
				w = z ? z.indexOf(v) : -1,
				j = w === -1;
			if (!j && y !== -1) {
				if (w >= y && w < p) {
					j = true
				}
			}
			var x = this.specialDecimals[r];
			if (x) {
				if (j) {
					var q, t;
					if (y != -1) {
						q = y;
						t = p
					} else {
						var k = b.caretPos(o);
						q = k;
						t = k
					}
					h.val(z.slice(0, q) + x + z.slice(t, z.length));
					if (a.browser.msie) {
						if (o.createTextRange) {
							var s = o.createTextRange();
							s.moveStart("textedit", 1);
							s.select()
						}
					}
				}
				return false
			}
			var l = this.decimals[r];
			if (l) {
				if (l === v && this.digits > 0 && j) {
					return true
				} else {
					n.preventDefault()
				}
			}
			if (r == 13 || r == 9) {
				this._update(this.parse(h.val()));
				return true
			}
			if (r == 38 || r == 40) {
				var m = r == 38 ? 1 : -1;
				this._modify(m * this.step);
				return true
			}
			if (r == 222) {
				n.preventDefault()
			}
		},
		_keypress: function(h) {
			var j = h.target,
				l = h.keyCode || h.which;
			if (l == 0 || a.inArray(l, f) != -1 || h.ctrlKey || (h.shiftKey && l == 45)) {
				return true
			}
			var k;
			if (this.minValue === null || this.minValue < 0) {
				if (d(j).start === 0 || (b.caretPos(j) === 0 && j.value.indexOf("-") === -1)) {
					k = true
				}
			}
			if ((k && String.fromCharCode(l) == "-") || this.inRange(l, 48, 57)) {
				return true
			}
			h.preventDefault()
		},
		_focus: function() {
			if (this.enabled) {
				this._showTextBoxValue();
				this.$text.hide();
				var h = this.$element[0];
				this._focusing = setTimeout(function() {
					h.focus();
					if (a.browser.msie) {
						h.select()
					} else {
						h.selectionStart = 0;
						h.selectionEnd = h.value.length
					}
				}, 0)
			}
		},
		_blur: function() {
			clearTimeout(this._focusing);
			this.$element.removeClass("t-state-error");
			if (this.enabled) {
				this.$text.show();
				this._hideTextBoxValue()
			}
			var j = this.minValue,
				h = this.maxValue,
				k = this.parse(this.$element.val());
			if (k != null) {
				if (j != null && k < j) {
					k = j
				} else {
					if (h != null && k > h) {
						k = h
					}
				}
				k = parseFloat(k.toFixed(this.digits))
			}
			this._update(k)
		},
		_clearTimer: function(h) {
			clearTimeout(this.timeout);
			clearInterval(this.timer);
			clearInterval(this.acceleration)
		},
		_stepper: function(h, k) {
			if (h.which == 1) {
				var j = this.step;
				this._modify(k * j);
				this.timeout = setTimeout(a.proxy(function() {
					this.timer = setInterval(a.proxy(function() {
						this._modify(k * j)
					}, this), 80);
					this.acceleration = setInterval(function() {
						j += 1
					}, 1000)
				}, this), 200)
			}
		},
		_modify: function(k) {
			var l = this.parse(this.element.value),
				j = this.minValue,
				h = this.maxValue;
			l = l ? l + k : k;
			if (j !== null && l < j) {
				l = j
			} else {
				if (h !== null && l > h) {
					l = h
				}
			}
			this._update(parseFloat(l.toFixed(this.digits)))
		},
		_update: function(j) {
			var h = this.val;
			this._value(j);
			if (h != j) {
				if (b.trigger(this.element, "valueChange", {
					oldValue: h,
					newValue: j
				})) {
					this._value(h)
				}
			}
		},
		_value: function(l) {
			var j = (typeof l === "number") ? l : this.parse(l),
				k = this.enabled ? this.text : "",
				h = j === null;
			if (j != null) {
				j = parseFloat(j.toFixed(this.digits))
			}
			this.val = j;
			this.$element.val(h ? "" : this.formatEdit(j));
			this.$text.html(h ? k : this.format(j));
			this.$text.toggleClass("t-state-empty", h)
		},
		_hideTextBoxValue: function() {
			var h = this.$element;
			if (this.enabled) {
				setTimeout(function() {
					h.css("color", h.css("background-color"))
				});
				if (a.browser.opera) {
					h.css({
						color: h.css("background-color"),
						"text-indent": "-4444px"
					})
				}
			} else {
				if (!a.browser.msie) {
					h.css({
						color: h.css("background-color"),
						"text-indent": "-4444px"
					})
				} else {
					h.css({
						color: h.css("background-color"),
						"letter-spacing": "1000px"
					})
				}
			}
		},
		_showTextBoxValue: function() {
			var h = this.$element,
				j = this.$text;
			if (this.enabled) {
				setTimeout(function() {
					h.css({
						color: j.css("color"),
						"text-indent": "",
						"letter-spacing": ""
					})
				})
			} else {
				if (!a.browser.msie) {
					h.css({
						color: j.css("background-color"),
						"text-indent": "0px"
					})
				} else {
					h.css({
						color: j.css("background-color"),
						"letter-spacing": "0px"
					})
				}
			}
		},
		_onParentFormReset: function() {
			var h = this;
			window.setTimeout(function() {
				h._value(h.$element.val())
			}, 1)
		},
		enable: function() {
			var h = this.$wrapper.find(".t-arrow-up, .t-arrow-down"),
				j = a.proxy(this._clearTimer, this);
			this.enabled = true;
			this.$element.removeAttr("disabled");
			if (!this.val && this.val != 0) {
				this.$text.addClass("t-state-empty").html(this.text)
			} else {
				this._hideTextBoxValue()
			}
			this.$wrapper.removeClass("t-state-disabled");
			h.unbind("mouseup").unbind("mouseout").unbind("dblclick").bind({
				mouseup: j,
				mouseout: j,
				dblclick: j
			});
			var k = "mousedown";
			h.eq(0).unbind(k).bind(k, a.proxy(function(l) {
				this._stepper(l, 1)
			}, this));
			h.eq(1).unbind(k).bind(k, a.proxy(function(l) {
				this._stepper(l, -1)
			}, this))
		},
		disable: function() {
			var h = this;
			h.enabled = false;
			h.$wrapper.addClass("t-state-disabled").find(".t-icon").unbind("mousedown").bind("mousedown", b.preventDefault);
			h.$element.attr("disabled", "disabled");
			h.$text.css("color", "");
			if (!h.val && h.val != 0) {
				h.$text.html("")
			} else {
				h._hideTextBoxValue()
			}
		},
		value: function(j) {
			if (j === undefined) {
				return this.parse(this.element.value)
			}
			var h = (typeof j === "number") ? j : this.parse(j);
			if (!this.inRange(h, this.minValue, this.maxValue)) {
				h = null
			}
			this._value(h)
		},
		formatEdit: function(j) {
			var h = this.separator;
			if (j.toString().toLowerCase().indexOf("e") > -1) {
				j = j.toFixed(this.digits)
			}
			if (j && h != ".") {
				j = j.toString().replace(".", h)
			}
			return j
		},
		format: function(h) {
			return b.formatNumber(h, this.numFormat, this.digits, this.separator, this.groupSeparator, this.groupSize, this.positive, this.negative, this.symbol, true)
		},
		inRange: function(h, k, j) {
			return h === null || ((k !== null ? h >= k : true) && (j !== null ? h <= j : true))
		},
		parse: function(m) {
			var k = null,
				l = this.separator;
			if (m || m == "0") {
				if (typeof m == typeof 1) {
					return m
				}
				if (m.toLowerCase().indexOf("e") > -1 && !isNaN(Number(m))) {
					m = Number(m);
					m = m.toFixed(this.digits).replace(".", l)
				}
				m = m.replace(this.replaceRegExp, "");
				if (l && l != ".") {
					m = m.replace(l, ".")
				}
				var h = b.patterns[this.type].negative[this.negative].replace(/(\(|\))/g, "\\$1").replace("*", "").replace("n", "([\\d|\\.]*)"),
					j = new RegExp(h);
				if (j.test(m)) {
					k = -parseFloat(j.exec(m)[1])
				} else {
					k = parseFloat(m)
				}
			}
			return isNaN(k) ? null : k
		}
	};
	a.fn.tTextBox = function(j) {
		var k = "numeric";
		if (j && j.type) {
			k = j.type
		}
		var h = a.fn.tTextBox.defaults[k];
		h.digits = b.cultureInfo[k + "decimaldigits"];
		h.separator = b.cultureInfo[k + "decimalseparator"];
		h.groupSeparator = b.cultureInfo[k + "groupseparator"];
		h.groupSize = b.cultureInfo[k + "groupsize"];
		h.positive = b.cultureInfo[k + "positive"];
		h.negative = b.cultureInfo[k + "negative"];
		h.symbol = b.cultureInfo[k + "symbol"];
		j = a.extend({}, h, j);
		j.type = k;
		return this.each(function() {
			var l = a(this);
			j = a.meta ? a.extend({}, j, l.data()) : j;
			if (!l.data("tTextBox")) {
				l.data("tTextBox", new b.textbox(this, j));
				b.trigger(this, "load")
			}
		})
	};
	var c = {
		val: null,
		text: "",
		step: 1,
		inputAttributes: "",
		increaseButtonTitle: "Increase value",
		decreaseButtonTitle: "Decrease value",
		showIncreaseButton: true,
		showDecreaseButton: true
	};
	a.fn.tTextBox.defaults = {
		numeric: a.extend(c, {
			minValue: -100,
			maxValue: 100
		}),
		currency: a.extend(c, {
			minValue: 0,
			maxValue: 1000
		}),
		percent: a.extend(c, {
			minValue: 0,
			maxValue: 100
		})
	};

	function d(h) {
		var m = -1,
			l = -1;
		if (document.selection) {
			var k = h.document.selection.createRange().text,
				j = k.length;
			if (j > 0) {
				m = h.value.indexOf(k);
				l = j
			}
		} else {
			if (h.selectionStart !== undefined) {
				var o = h.selectionStart,
					n = h.selectionEnd;
				if (o != n) {
					m = o;
					l = n
				}
			}
		}
		return {
			start: m,
			end: l
		}
	}
})(jQuery);
(function(a, o) {
	var h = {
		TAB: 9,
		ENTER: 13,
		ESC: 27,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SPACEBAR: 32,
		PAGEUP: 33,
		PAGEDOWN: 34,
		F12: 123
	};
	var b = a.telerik;
	var k = /"+\\\/Date\((.*?)\)\\\/"+/g;
	var l = "tr:not(.t-grouping-row,.t-group-footer,.t-detail-row,.t-no-data,.t-footer-template):visible",
		d = ">td:not(.t-group-cell,.t-hierarchy-cell):visible",
		f = l + d + ":first",
		g = "t-state-focused";
	b.scripts.push("telerik.grid.js");

	function n(p) {
		return new Function("data", ("var p=[];with(data){p.push('" + unescape(p).replace(/[\r\t\n]/g, " ").replace(/'(?=[^#]*#>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g, "',$1,'").split("<#").join("');").split("#>").join("p.push('") + "');}return p.join('');"))
	}
	function e(p) {
		return (p != null ? p + "" : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	function j(r, t, s) {
		var p = a("<col />").css("width", t[s].width),
			u, v, q = 0;
		for (u = 0, v = t.length; u < v; u++) {
			if (u >= s && q) {
				break
			}
			if (!t[u].hidden) {
				q++
			}
		}
		if (u > s) {
			r.eq(q - 1).before(p)
		} else {
			r.eq(q - 1).after(p)
		}
	}
	b.grid = function(q, w) {
		var r = this;
		this.element = q;
		this.groups = [];
		this.editing = {};
		this.filterBy = "";
		this.groupBy = "";
		this.orderBy = "";
		a.extend(this, w);
		this.sorted = a.grep(this.columns, function(B) {
			return B.order
		});
		this.$tbody = a("> .t-grid-content > table > tbody", q);
		this.scrollable = this.$tbody.length > 0;
		this.$headerWrap = a("> .t-grid-header > .t-grid-header-wrap", q);
		this.$footerWrap = a("> .t-grid-footer > .t-grid-footer-wrap", q);
		if (!this.scrollable) {
			this.$tbody = a("> table > tbody", q);
			this.$header = a("> table > thead > tr", q);
			this.$footer = a("> table > tfoot", q)
		} else {
			a("> .t-grid-content", q).tScrollable();
			this.$header = a("> .t-grid-header > .t-grid-header-wrap > table > tbody > tr", q);
			this.$footer = a("> .t-grid-footer", q);
			var t = a(q).closest(".t-rtl").length;
			if (t) {
				if (a.browser.webkit || (a.browser.mozilla && parseInt(a.browser.version, 10) < 2)) {
					a(q).addClass("t-grid-rightscroll")
				}
			}
			var x = this.$headerWrap.add(this.$footerWrap),
				y = b.scrollbarWidth(),
				z = x.parent();
			var u = (/iphone|ipad|android/gi).test(navigator.appVersion);
			if (u) {
				z.css("padding", "0");
				x.css({
					width: "auto",
					"border-width": 0
				})
			} else {
				if (!t) {
					z.css("padding-right", y)
				} else {
					z.css("padding-left", y)
				}
				if (y == 0) {
					x.css("border-width", 0)
				}
			}
			a("> .t-grid-content", q).bind("scroll", function() {
				if (r.pageOnScroll) {
					var B = this.scrollTop + this.clientHeight;
					if (B === this.scrollHeight && r.currentPage < r.totalPages() && !r._pagingInProgress) {
						r._pagingInProgress = true;
						r.pageTo(r.currentPage + 1)
					}
				}
				x.scrollLeft(this.scrollLeft)
			})
		}
		if (this.rowTemplate) {
			this.rowTemplate = n(this.rowTemplate)
		}
		this.$tbody.delegate(".t-hierarchy-cell .t-plus, .t-hierarchy-cell .t-minus", "click", b.stopAll(function(E) {
			var B = a(E.target);
			var F = B.hasClass("t-plus");
			B.toggleClass("t-minus", F).toggleClass("t-plus", !F);
			var C = B.closest("tr.t-master-row");
			if (this.detail && !C.next().hasClass("t-detail-row")) {
				var D = 0;
				a.each(this.columns, function() {
					if (!this.hidden) {
						D++
					}
				});
				a(new b.stringBuilder().cat('<tr class="t-detail-row').catIf(" t-alt", C.hasClass("t-alt")).cat('">').rep('<td class="t-group-cell"></td>', C.find(".t-group-cell").length).cat('<td class="t-hierarchy-cell"></td>').cat('<td class="t-detail-cell" colspan="').cat(D).cat('">').cat(this.displayDetails(this.dataItem(C))).cat("</td></tr>").string()).insertAfter(C)
			}
			b.trigger(this.element, F ? "detailViewExpand" : "detailViewCollapse", {
				masterRow: C[0],
				detailRow: C.next(".t-detail-row")[0]
			});
			C.next().toggle(F)
		}, this));
		this.$pager = a("> .t-grid-pager .t-pager", q);
		var p = new b.dropDown({
			effects: b.fx.slide.defaults(),
			onClick: a.proxy(function(B) {
				this.changePageSize(a(B.item).text());
				p.close()
			}, this)
		});
		a(q).delegate(".t-button", "click", a.proxy(function(B) {
			this._command(B)
		}, this));
		p.dataBind(w.pageSizesInDropDown || []);
		a(document.documentElement).bind("mousedown", function(B) {
			var C = p.$element[0];
			if (!a.contains(C, B.target)) {
				p.close()
			}
		});
		this.$pager.delegate(".t-state-disabled", "click", b.preventDefault).delegate(".t-link:not(.t-state-disabled)", "mouseenter", b.hover).delegate(".t-link:not(.t-state-disabled)", "mouseleave", b.leave).delegate("input[type=text]", "keydown", a.proxy(this.pagerKeyDown, this)).delegate(".t-page-size .t-dropdown-wrap", "click", function() {
			var B = a(this);
			p.open({
				offset: B.offset(),
				outerHeight: B.outerHeight(),
				outerWidth: B.outerWidth(),
				zIndex: b.getElementZIndex(this)
			})
		});
		a("> .t-grid-pager", q).delegate(".t-refresh", "click", a.proxy(this.refreshClick, this));
		a(q).delegate(".t-button", "hover", b.preventDefault);
		if (this.sort) {
			this.$header.delegate("a.t-link", "hover", function() {
				a(this).toggleClass("t-state-hover")
			})
		}
		var v = "tr:not(.t-grouping-row,.t-detail-row,.t-no-data,.t-group-footer,:has(>.t-edit-container))";
		if (this.selectable) {
			var A = this.$tbody[0];
			this.$tbody.delegate(v, "click", function(B) {
				if (this.parentNode == A) {
					r.rowClick(B)
				}
			}).delegate(v, "hover", function(B) {
				if (this.parentNode == A) {
					if (B.type == "mouseenter") {
						a(this).addClass("t-state-hover")
					} else {
						a(this).removeClass("t-state-hover")
					}
				}
			})
		}
		if (this.isAjax() || this.operationMode === "client") {
			this.$pager.delegate(".t-link:not(.t-state-disabled)", "click", b.stop(this.pagerClick, this));
			if (this.sort) {
				this.$header.delegate("a.t-link", "click", b.stop(this.headerClick, this))
			}
		}
		for (var s = 0; s < this.plugins.length; s++) {
			b[this.plugins[s]].initialize(this)
		}
		b.bind(this, {
			columnResize: this.onColumnResize,
			columnReorder: this.onColumnReorder,
			command: this.onCommand,
			complete: this.onComplete,
			"delete": this.onDelete,
			detailViewExpand: this.onDetailViewExpand,
			detailViewCollapse: this.onDetailViewCollapse,
			dataBinding: this.onDataBinding,
			dataBound: this.onDataBound,
			edit: this.onEdit,
			error: this.onError,
			load: this.onLoad,
			rowSelect: this.onRowSelect,
			rowDataBound: this.onRowDataBound,
			save: this.onSave,
			submitChanges: this.onSubmitChanges
		});
		this.initializeColumns();
		if (this.keyboardNavigation) {
			this.initializeNavigation()
		}
		if (this.isAjax() || this.operationMode === "client") {
			this._dataSource()
		}
		if (this.columnContextMenu) {
			this.initializeContextMenu()
		}
	};
	b.grid.prototype = {
		initializeNavigation: function() {
			var s = this,
				p = a(s.element).attr("tabIndex", 0),
				q = "keydown",
				r = a.proxy(s._keyDown, s);
			s._initNavigationMouseEvents();
			p.bind({
				focus: function(u) {
					var t = s.current();
					if (t) {
						t.addClass(g)
					} else {
						if (t = s.$tbody.find("td." + g).eq(0), t.length) {
							s._current = t
						} else {
							s.current(p.find(f))
						}
					}
				},
				focusin: function(t) {
					var u = a(t.target).closest("td");
					if (u.parent().hasClass("t-grid-new-row")) {
						s.current(u)
					}
				},
				focusout: function() {
					if (s._current) {
						s._current.removeClass(g)
					}
				},
				keydown: r
			});
			if (s.editing && s.editing.mode == "PopUp") {
				p.bind("edit", function(t) {
					a(t.form).bind(q, r)
				});
				a("#" + s.formId() + ":visible").bind(q, r)
			}
			if (s.pageOnScroll) {
				p.bind("dataBinding", function() {
					var u = s.current(),
						v = u ? u.parent().index(l) - 1 : 0,
						t = u ? u.index() : 0;
					p.one("dataBound", function() {
						var w = s.$tbody.find(l);
						s._focusGridElement();
						if (s._current) {
							s._current.removeClass(g)
						}
						s._current = w.eq(v).children().eq(t).addClass(g)
					})
				})
			}
		},
		_onCommand: function(p) {
			if (p.row) {
				p.dataItem = this.dataItem(p.row)
			}
			return b.trigger(this.element, "command", p)
		},
		_onComplete: function(p) {
			return b.trigger(this.element, "complete", p)
		},
		_command: function(r) {
			var q = a(r.currentTarget);
			var s = q.closest(".t-grid")[0];
			if (q.is(".t-ajax") && s == this.element) {
				var t = /t-grid-([^\s]*)/.exec(q.attr("class"));
				if (t) {
					t = t[1]
				}
				var p = {
					name: t,
					row: q.closest("tr")[0]
				};
				r.preventDefault();
				if (this._onCommand(p)) {
					return
				}
				a.ajax(this.ajaxOptions({
					url: q.attr("href"),
					data: p.data || {},
					success: a.proxy(function(u) {
						try {
							u = eval("(" + u + ")")
						} catch (v) {
							if (!b.ajaxError(this.element, "error", xhr, "parsererror")) {
								alert("Error! The requested URL did not return JSON.")
							}
							return
						}
						this._onComplete({
							name: t,
							response: u
						})
					}, this)
				}))
			}
		},
		_keyDown: function(v) {
			var G = this,
				x = a(G.element),
				F = G.$tbody,
				A = x.closest(".t-rtl").length,
				B = v.keyCode,
				u = "dataBound",
				t = a.proxy(G.current, G),
				s = t(),
				C = G.$pager.length > 0,
				r = G.selectable,
				D = F.has("tr>td>.t-grid-select").length > 0,
				E = a(v.target),
				p = !E.is(":button,a,:input,a>.t-icon"),
				w = G.editRow,
				z = false,
				q;
			if (!s) {
				if (G.editing && G.editing.mode == "PopUp") {
					s = G._current = x.find(f)
				} else {
					return
				}
			}
			q = s.index();
			if (!a.browser.msie) {
				p = p && E[0] === x[0]
			}
			if (p) {
				if (C && h.PAGEDOWN == B) {
					if (!G.pageOnScroll) {
						x.one(u, function() {
							t(x.find(f));
							G._focusGridElement()
						})
					}
					if (G.currentPage < G.totalPages()) {
						G.pageTo(G.currentPage + 1)
					}
					z = true
				} else {
					if (C && h.PAGEUP == B) {
						if (!G.pageOnScroll) {
							x.one(u, function() {
								t(x.find(f));
								G._focusGridElement()
							});
							if (G.currentPage > 1) {
								G.pageTo(Math.max(G.currentPage - 1, 1))
							}
						}
						z = true
					} else {
						if (h.UP === B) {
							t(s ? s.parent().prevAll(l).last().children(":eq(" + q + "),:eq(0)").last() : x.find(f));
							z = true
						} else {
							if (h.DOWN === B) {
								t(s ? s.parent().nextAll(l).first().children(":eq(" + q + "),:eq(0)").last() : x.find(f));
								z = true
							} else {
								if (h.LEFT === B) {
									if (s) {
										if (A) {
											s = s.nextAll(":visible:first")
										} else {
											s = s.prevAll(":not(.t-group-cell, .t-hierarchy-cell):visible:first")
										}
									} else {
										s = x.find(f)
									}
									t(s);
									z = true
								} else {
									if (h.RIGHT === B) {
										if (s) {
											if (A) {
												s = s.prevAll(":not(.t-group-cell, .t-hierarchy-cell):visible:first")
											} else {
												s = s.nextAll(":visible:first")
											}
										} else {
											s = x.find(f)
										}
										t(s);
										z = true
									} else {
										if ((r || D) && h.SPACEBAR == B) {
											z = true;
											var y = s.parent().find(".t-grid-select:first").andSelf();
											if (D && y[1]) {
												location.href = y[1].href
											} else {
												if (r) {
													y.click()
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (!z && w && !E.is(":button,a,a>.t-icon")) {
				z = G._handleEditing(v)
			}
			if (z) {
				v.preventDefault();
				v.stopPropagation()
			}
		},
		_handleEditing: function(s) {
			var J = this,
				D = s.keyCode,
				H = s.shiftKey,
				E, r = a.proxy(J.current, J),
				p = a.proxy(J._clearInputSelection, J),
				w = a.proxy(J._focusGridElement, J),
				q = r(),
				u = a(J.element),
				I = J.$tbody,
				F = q.parent(),
				G = F.index(),
				K, x = false,
				t = "td.t-grid-edit-cell",
				v = ":input:visible:first",
				y = J.isAjax(),
				B = F.closest("tr.t-grid-new-row")[0],
				A = J.editing.mode === "InCell",
				C = J.editing.mode === "PopUp",
				z = F.closest("tr.t-grid-edit-row")[0] || (C && a("#" + J.formId() + ":visible").length);
			if (h.ENTER == D || h.F12 == D) {
				x = true;
				if (z) {
					if (a(s.target).is("textarea")) {
						x = false;
						return
					}
					p(q.find(v)[0]);
					if (A) {
						K = J.validate();
						if (!K) {
							q.find(v).focus();
							return
						}
						if (q.is(t)) {
							J.saveCell(q[0])
						} else {
							F.find(t).each(function() {
								J.saveCell(this)
							});
							J.editCell(q[0])
						}
						if (J.valid) {
							w()
						}
					} else {
						if (y) {
							u.one("dataBound", function() {
								var L = a(this).data("tGrid");
								L._current = L.$tbody.children().eq(G).find(d).eq(0);
								w()
							});
							if (C) {
								a(".t-grid-update,.t-grid-insert", "#" + J.formId()).click()
							} else {
								if (B) {
									J.insertRow(F)
								} else {
									J.updateRow(F)
								}
							}
						} else {
							if (J.validate()) {
								if (C) {
									F = a("#" + J.formId())
								}
								F.find(".t-grid-update,.t-grid-insert").click()
							}
						}
					}
				} else {
					if (A) {
						I.find(t).each(function() {
							J.saveCell(this)
						});
						J.editCell(q[0])
					} else {
						if (y) {
							J.editRow(F);
							r(F.children().eq(0));
							if (C) {
								F = a("#" + J.formId())
							}
							F.find(v).focus()
						} else {
							location.href = F.find(".t-grid-edit:first").attr("href")
						}
					}
				}
			} else {
				if (h.ESC == D && z) {
					x = true;
					p(q.find(v)[0]);
					if (A && q.is(t)) {
						J.cancelCell(q);
						w()
					} else {
						if (y) {
							if (C) {
								a(".t-grid-cancel", "#" + this.formId()).click()
							} else {
								J.cancelRow(F)
							}
							r(F.find(d).eq(0));
							w()
						} else {
							if (C) {
								F = a("#" + J.formId())
							}
							location.href = F.find(".t-grid-cancel:first").attr("href")
						}
					}
				} else {
					if (A && h.TAB == D) {
						if (z) {
							p(q.find(v)[0]);
							J.saveCell(q);
							if (J.valid) {
								w()
							} else {
								q.find(v).focus();
								return true
							}
							x = true
						}
						E = H ? q.prevAll(":not(.t-group-cell, .t-hierarchy-cell):visible:first") : q.nextAll(":visible:first");
						if (!E.length) {
							E = q.parent()[H ? "prevAll" : "nextAll"](l).children(H ? ":not(.t-group-cell, .t-hierarchy-cell):visible:last" : ":not(.t-group-cell, .t-hierarchy-cell):visible:first")
						}
						r(E);
						if (J.keyboardNavigation.editOnTab && E.length) {
							J.editCell(E[0]);
							setTimeout(function() {
								if (E.hasClass("t-grid-edit-cell")) {
									E.find(v).focus()
								}
							});
							x = true
						}
					}
				}
			}
			return x
		},
		_initNavigationMouseEvents: function() {
			var z = this,
				y = z.$tbody,
				w = l + d,
				p = a.browser,
				q = "click",
				t = "mousedown",
				r, x, s, u = ".t-grid-edit-row",
				v = ":button,a,:input,a>.t-icon";
			if (p.msie) {
				y.delegate(w, q, function(A) {
					x = a(A.target), s = a(A.currentTarget), r = z._current;
					if (s.closest("tbody")[0] !== y[0]) {
						return
					}
					if (x.is(v)) {
						if (!(r && !s.parent().is(u))) {
							if (r) {
								r.removeClass(g)
							}
							z._current = s
						}
					} else {
						if (r && r[0] === s[0]) {
							z._current = null
						}
						z.current(s);
						A.preventDefault()
					}
				})
			} else {
				y.delegate(w, t, function(A) {
					x = a(A.target), s = a(A.currentTarget), r = z._current;
					if (s.closest("tbody")[0] !== y[0]) {
						return
					}
					if (x.is(v)) {
						if (!(r && !s.parent().is(u))) {
							if (r) {
								r.removeClass(g)
							}
							z._current = s
						}
					} else {
						z.current(s)
					}
				})
			}
		},
		_clearInputSelection: function(q) {
			if (!q || a(q).is(":checkbox, :radio")) {
				return
			}
			var p = a.browser,
				r;
			if (p.msie && parseInt(p.version) == 8) {
				r = q.createTextRange();
				r.moveStart("textedit", 1);
				r.select()
			}
		},
		_focusGridElement: function() {
			var p = a.browser;
			if (p.msie && parseInt(p.version) < 9) {
				a("body", document).focus()
			}
			this.element.focus()
		},
		current: function(q) {
			var r = this,
				p = r._current;
			if (q !== o && q.length) {
				if (!p || p[0] !== q[0]) {
					q.addClass(g);
					if (p) {
						p.removeClass(g)
					}
					r._current = q;
					r._scrollTo(q.parent()[0])
				}
			} else {
				return r._current
			}
		},
		_scrollTo: function(t) {
			var q = this.$tbody.closest("div.t-grid-content")[0];
			if (!t || !q) {
				return
			}
			var v = t.offsetTop,
				u = t.offsetHeight,
				s = q.scrollTop,
				r = q.clientHeight,
				p = v + u;
			q.scrollTop = s > v ? v : p > (s + r) ? p - r : s
		},
		_transformParams: function(p) {
			var u = this,
				t = u._isServerOperation(),
				s = {},
				q = u.filterBy || "",
				r = u.orderBy || "";
			if (t) {
				if (p.page) {
					s[u.queryString.page] = p.page
				}
				if (p.pageSize) {
					s[u.queryString.size] = p.pageSize
				}
				if (r !== "") {
					s[u.queryString.orderBy] = r
				}
				if (q !== "") {
					s[u.queryString.filter] = q
				}
				if (u.groupBy) {
					s[u.queryString.groupBy] = u.groupBy
				}
				if (p.aggregates && p.aggregates.length) {
					s.aggregates = a.map(u.columns, function(v) {
						if (v.aggregates) {
							return v.member + "-" + v.aggregates.join("-")
						}
					}).join("~")
				}
			}
			delete p.page;
			delete p.pageSize;
			delete p.sort;
			delete p.filter;
			delete p.group;
			delete p.aggregates;
			if (u.ws) {
				s = b.toJson(a.extend(p, {
					state: s
				}))
			} else {
				s = a.extend(s, p)
			}
			return s
		},
		_dataSourceOptions: function() {
			var s = this,
				r = this.pageSize > 0,
				q, p = s.data || [];
			remoteOperations = s._isServerOperation(), aggregates = a.map(s.columns || [], function(t) {
				return a.map(t.aggregates || [], function(u) {
					return {
						field: t.member,
						aggregate: u
					}
				})
			}), deserializer = {
				translateGroup: function(t) {
					return {
						value: t.Key,
						hasSubgroups: t.HasSubgroups,
						aggregates: t.Aggregates,
						items: t.HasSubgroups ? a.map(t.Items, a.proxy(this.translateGroup, this)) : t.Items
					}
				},
				flatGroups: function(t) {
					if (t.HasSubgroups) {
						return this.flatGroups(t.Items)
					}
					return t.Items
				},
				convert: function(t) {
					return t.d || t
				},
				mergeChanges: function(t, B, v) {
					var x, y, A, z = [],
						w, u = s.dataSource;
					a.each(v, function(D, C) {
						for (y = 0, A = t.length; y < A; y++) {
							if (C === u.id(t[y])) {
								t.splice(y, 1);
								break
							}
						}
					});
					a.each(B, function(C, D) {
						x = u.id(this);
						w = false;
						for (y = 0, A = t.length; y < A; y++) {
							if (x === u.id(t[y])) {
								a.extend(true, t[y], D);
								w = true;
								break
							}
						}
						if (!w) {
							z.push(D)
						}
					});
					return t.concat(z)
				},
				data: function(u) {
					var v = s.dataSource,
						t = v.data(),
						x = v.page() - 1,
						y = v.pageSize(),
						w = s.deletedIds || [];
					s.deletedIds = [];
					if (u) {
						u = this.convert(u);
						u = !a.isArray(u) ? u.data || u.Data : u;
						if (t && t.length && !remoteOperations && v.id) {
							if (u.length && typeof u[0].HasSubgroups != "undefined" && !remoteOperations) {
								u = a.map(u, a.proxy(this.flatGroups, this))
							}
							return this.mergeChanges(t, u, w)
						}
					}
					return u
				},
				total: function(t) {
					if (t) {
						t = this.convert(t);
						return !a.isArray(t) ? t.total || t.Total || 0 : t.length
					}
					return 0
				},
				groups: function(t) {
					t = this.data(t);
					return a.map(t, a.proxy(this.translateGroup, this))
				},
				aggregates: function(t) {
					t = this.convert(t);
					return t.aggregates || {}
				}
			};
			q = {
				serverSorting: remoteOperations,
				serverPaging: remoteOperations,
				serverFiltering: remoteOperations,
				serverGrouping: remoteOperations,
				serverAggregates: remoteOperations,
				page: r ? s.currentPage : o,
				pageSize: r ? s.pageSize : o,
				aggregates: s.aggregates || aggregates,
				error: a.proxy(function(t) {
					var v = t[0],
						u = t[1];
					if (b.ajaxError(this.element, "error", v, u)) {
						return
					}
				}, this),
				group: a.map(s.groups || [], function(t) {
					return {
						field: t.member,
						dir: t.order,
						aggregates: aggregates
					}
				}),
				sort: a.map(s.sorted, function(t) {
					return {
						field: t.member,
						dir: t.order
					}
				}),
				filter: a.map(a.grep(s.columns, function(t) {
					return t.filters
				}), function(t) {
					return a.map(t.filters, function(v) {
						var x = v.value;
						if (t.type == "Number") {
							x = parseFloat(x)
						} else {
							if (t.type == "Date") {
								if (typeof x === "string") {
									var u = /^\/Date\((.*?)\)\/$/.exec(x);
									if (u) {
										x = new Date(parseInt(u[1]))
									} else {
										var w = t.format ? /\{0(:([^\}]+))?\}/.exec(t.format)[2] : b.cultureInfo.shortDate;
										x = b.datetime.parse({
											value: x,
											format: w
										}).toDate()
									}
								}
							}
						}
						return {
							field: t.member,
							operator: v.operator,
							value: x
						}
					})
				})
			};
			if (remoteOperations || (s.isAjax() && !p.length)) {
				a.extend(q, {
					transport: {
						dialect: {
							read: a.proxy(s._transformParams, this)
						},
						read: {
							type: "POST",
							dataType: "text",
							dataFilter: function(t, u) {
								t = eval("(" + t.replace(k, "new Date($1)") + ")");
								s._onComplete({
									name: "dataBinding",
									response: t
								});
								return t
							},
							contentType: s.ws ? "application/json; charset=utf-8" : o,
							complete: a.proxy(s.hideBusy, s)
						}
					},
					deserializer: deserializer
				})
			} else {
				if (p.length) {
					a.extend(q, {
						data: {
							data: s.data,
							total: s.total || p.length
						},
						deserializer: deserializer
					})
				}
			}
			return q
		},
		_dataSource: function() {
			var r = this,
				q = r._dataSourceOptions(),
				p = q.data;
			r.dataSource = new b.DataSource(q);
			if (p && p.data) {
				r._convertInitialData(p.data)
			}
			r.dataSource.bind("change", a.proxy(r._dataChange, r))
		},
		_convertInitialData: function(p) {
			var u = this;
			if (!u._isServerOperation() && p && p.length) {
				u.dataSource.read();
				var v = u.dataSource.view();
				if (v.length && v[0].hasSubgroups != o) {
					var t = [],
						q = function(w) {
							if (w.hasSubgroups) {
								return q(w.items)
							}
							return w.items
						};
					for (var r = 0, s = v.length; r < s; r++) {
						t = t.concat(q(v[r]))
					}
					u.data = t
				} else {
					u.data = v
				}
			}
		},
		_mapAggregates: function(p) {
			var r = {};
			for (var q in p) {
				r[q.replace(/^\w/, function(s) {
					return s.toUpperCase()
				})] = p[q]
			}
			return r
		},
		rowClick: function(r) {
			var q = a(r.target);
			if (!q.is(":button,a,input,select,textarea,option,a>.t-icon")) {
				r.stopPropagation();
				var p = q.closest("tr").addClass("t-state-selected").siblings().removeClass("t-state-selected").end();
				b.trigger(this.element, "rowSelect", {
					row: p[0]
				})
			}
		},
		$rows: function() {
			return this.$tbody.find("> tr:not(.t-grouping-row,.t-detail-row)")
		},
		expandRow: function(p) {
			a(p).find("> td .t-plus, > td .t-expand").click()
		},
		collapseRow: function(p) {
			a(p).find("> td .t-minus, > td .t-collapse").click()
		},
		headerClick: function(p) {
			p.preventDefault();
			this.toggleOrder(this.$columns().index(a(p.target).closest("th")));
			this.sort(this.sortExpr())
		},
		refreshClick: function(p, q) {
			if (a(q).is(".t-loading")) {
				return
			}
			if (this.isAjax()) {
				p.preventDefault();
				if (!this._isServerOperation()) {
					this.dataSource.data([])
				}
				this.ajaxRequest()
			}
		},
		sort: function(p) {
			this.orderBy = p;
			this.ajaxRequest()
		},
		columnFromTitle: function(q) {
			q = a.trim(q);
			var p = a.grep(this.$columns(), function(r) {
				return a.trim(a(r).text()) == q
			})[0];
			if (p) {
				return this.columns[this.$columns().index(p)]
			}
			return a.grep(this.columns, function(r) {
				return r.title == q
			})[0]
		},
		columnFromMember: function(q) {
			var p = a.grep(this.columns, function(r) {
				return r.member == q
			})[0];
			if (!p) {
				p = a.grep(this.columns, function(r) {
					var s = "." + r.member;
					return q.substr(q.length - s.length) == s
				})[0]
			}
			return p
		},
		toggleOrder: function(p) {
			p = typeof p == "number" ? this.columns[p] : p;
			var q = "asc";
			if (p.order == "asc") {
				q = "desc"
			} else {
				if (p.order == "desc") {
					q = null
				}
			}
			p.order = q;
			var r = a.inArray(p, this.sorted);
			if (this.sortMode == "single" && r < 0) {
				a.each(this.sorted, function() {
					this.order = null
				});
				this.sorted = []
			}
			if (r < 0 && q) {
				this.sorted.push(p)
			}
			if (!q) {
				this.sorted.splice(r, 1)
			}
		},
		sortExpr: function() {
			return a.map(this.sorted, function(p) {
				return p.member + "-" + p.order
			}).join("~")
		},
		pagerKeyDown: function(p) {
			if (p.keyCode == 13) {
				var q = this.sanitizePage(a(p.target).val());
				if (q != this.currentPage) {
					this.pageTo(q)
				} else {
					a(p.target).val(q)
				}
				p.preventDefault()
			}
		},
		isAjax: function() {
			return this.ajax || this.ws || this.onDataBinding
		},
		url: function(p) {
			return (this.ajax || this.ws)[p]
		},
		pagerClick: function(q) {
			q.preventDefault();
			var p = a(q.target).closest(".t-link");
			var t = this.currentPage;
			var u = p.find(".t-icon");
			if (u.hasClass("t-arrow-next")) {
				t++
			} else {
				if (u.hasClass("t-arrow-last")) {
					t = this.totalPages()
				} else {
					if (u.hasClass("t-arrow-prev")) {
						t--
					} else {
						if (u.hasClass("t-arrow-first")) {
							t = 1
						} else {
							var s = p.text();
							if (s == "...") {
								var r = p.parent().children().index(p);
								if (r == 0) {
									t = parseInt(p.next().text()) - 1
								} else {
									t = parseInt(p.prev().text()) + 1
								}
							} else {
								t = parseInt(s)
							}
						}
					}
				}
			}
			this.pageTo(isFinite(t) ? t : this.currentPage)
		},
		changePageSize: function(q) {
			var p = parseInt(q, 10);
			if (isNaN(p) || p < 1) {
				return this.pageSize
			}
			p = Math.max(p, 1);
			this.currentPage = 1;
			this.pageSize = p;
			if (this.isAjax()) {
				this.ajaxRequest()
			} else {
				this.serverRequest()
			}
		},
		pageTo: function(p) {
			this.currentPage = p;
			if (this.isAjax()) {
				this.ajaxRequest()
			} else {
				this.serverRequest()
			}
		},
		_dataChange: function() {
			var q = this.dataSource;
			if (!this._clientBindingInProgress) {
				this.total = q.total()
			}
			this.aggregates = q.aggregates();
			var p = q.view();
			if (this.pageOnScroll && this._pagingInProgress === true) {
				p = (this.data || []).concat(p);
				this._pagingInProgress = false
			}
			this._current = null;
			this._populate(p)
		},
		_populate: function(p) {
			this.data = [];
			this.bindTo(p);
			this.bindFooter();
			this.updatePager();
			this.updateSorting();
			b.trigger(this.element, "dataBound");
			b.trigger(this.element, "repaint")
		},
		ajaxOptions: function(p) {
			var q = {
				type: "POST",
				dataType: "text",
				dataFilter: function(s, t) {
					return s.replace(k, "new Date($1)")
				},
				error: a.proxy(function(t, s) {
					if (b.ajaxError(this.element, "error", t, s)) {
						return
					}
				}, this),
				complete: a.proxy(this.hideBusy, this),
				success: a.proxy(function(s, u, v) {
					try {
						s = eval("(" + s + ")")
					} catch (t) {
						if (!b.ajaxError(this.element, "error", v, "parsererror")) {
							alert("Error! The requested URL did not return JSON.")
						}
						return
					}
					if (p.commandName) {
						this._onComplete({
							name: p.commandName,
							response: s
						})
					}
					s = s.d || s;
					if (p.hasErrors && p.hasErrors(s)) {
						if (!b.trigger(this.element, "error", {
							XMLHttpRequest: v,
							textStatus: "modelstateerror",
							modelState: s.modelState
						})) {
							p.displayErrors(s)
						}
						return
					}
					this.dataSource.success(s)
				}, this)
			};
			a.extend(q, p);
			var r = this.ws ? q.data.state = {} : q.data;
			if (this._isServerOperation()) {
				r[this.queryString.page] = this.currentPage;
				r[this.queryString.size] = this.pageSize;
				r[this.queryString.groupBy] = this.groupBy;
				r[this.queryString.filter] = (this.filterBy || "").replace(/\"/g, '\\"')
			}
			r[this.queryString.orderBy] = this.orderBy || "";
			r[this.queryString.aggregates] = a.map(this.columns, function(s) {
				if (s.aggregates) {
					return s.member + "-" + s.aggregates.join("-")
				}
			}).join("~");
			if (this.ws) {
				q.data = b.toJson(q.data);
				q.contentType = "application/json; charset=utf-8"
			}
			return q
		},
		showBusy: function() {
			this.busyTimeout = setTimeout(a.proxy(function() {
				a("> .t-grid-pager .t-status .t-icon", this.element).addClass("t-loading")
			}, this), 100)
		},
		hideBusy: function() {
			clearTimeout(this.busyTimeout);
			a("> .t-grid-pager .t-status .t-icon", this.element).removeClass("t-loading")
		},
		serverRequest: function() {
			if (this.operationMode === "client") {
				this.ajaxRequest()
			} else {
				location.href = b.formatString(unescape(this.urlFormat), this.currentPage, this.orderBy || "~", this.groupBy || "~", encodeURIComponent(this.filterBy) || "~", this.pageSize || "~")
			}
		},
		_isServerOperation: function() {
			return this.operationMode !== "client"
		},
		ajaxRequest: function(p) {
			var v = this,
				u = v.pageSize > 0,
				t = v.pageSize,
				r = v.currentPage,
				q = a.map(v.columns, function(w) {
					return a.map(w.aggregates || [], function(x) {
						return {
							field: w.member,
							aggregate: x
						}
					})
				});
			if (r > 1 && v.pageOnScroll && !v._pagingInProgress) {
				t = r * v.pageSize;
				r = 1
			}
			var s = {
				page: r,
				sortedColumns: v.sorted,
				filteredColumns: a.grep(v.columns, function(w) {
					return w.filters
				})
			};
			if (b.trigger(v.element, "dataBinding", s)) {
				return
			}
			if (!v.ajax && !v.ws && this.operationMode !== "client") {
				return
			}
			if (v.dataSource.transport.options && v.dataSource.transport.options.read) {
				v.dataSource.transport.options.read.url = this.url("selectUrl")
			}
			if (v._isServerOperation()) {
				v.showBusy()
			}
			v.dataSource.query(a.extend({
				page: r,
				pageSize: u ? t : o,
				sort: a.map(v.sorted, function(w) {
					return {
						field: w.member,
						dir: w.order
					}
				}),
				filter: a.map(a.grep(v.columns, function(w) {
					return w.filters
				}), function(w) {
					return a.map(w.filters, function(y) {
						var A = y.value;
						if (w.type == "Number") {
							A = parseFloat(A)
						} else {
							if (w.type == "Date") {
								if (typeof A === "string") {
									var x = /^\/Date\((.*?)\)\/$/.exec(A);
									if (x) {
										A = new Date(parseInt(x[1]))
									} else {
										var z = w.format ? /\{0(:([^\}]+))?\}/.exec(w.format)[2] : b.cultureInfo.shortDate;
										A = b.datetime.parse({
											value: A,
											format: z
										}).toDate()
									}
								}
							}
						}
						return {
							field: w.member,
							operator: y.operator,
							value: A
						}
					})
				}),
				group: a.map(v.groups, function(w) {
					return {
						field: w.member,
						dir: w.order,
						aggregates: q
					}
				}),
				aggregates: q
			}, a.extend({}, s.data, p)))
		},
		valueFor: function(p) {
			if (p.type == "Date") {
				return new Function("data", "var value = data." + p.member + '; if (!value) return null; return value instanceof Date? value : new Date(parseInt(value.replace(/\\/Date\\((.*?)\\)\\//, "$1")));')
			}
			return new Function("data", "return data" + (p.member ? "." + p.member : "") + ";")
		},
		displayFor: function(q) {
			var t = this.localization,
				s = this;
			if (q.commands) {
				var p = a.map(q.commands, function(v) {
					return b.grid.ButtonBuilder.create(a.extend({
						text: t[v.name]
					}, v))
				});
				return function(v) {
					return a.map(p, function(w) {
						return w.build(a.extend({}, v, {
							__page: s.currentPage,
							__orderBy: s.orderBy || "",
							__filter: s.filterBy || "",
							__groupBy: s.groupBy || ""
						}))
					}).join("")
				}
			}
			if (!q.template) {
				var u = q.value ||
				function() {
					return ""
				};
				var r = u = !q.data ? u : function(v) {
						var x = q.value(v),
							z = q.data,
							A = "",
							w, y;
						for (w = 0, y = z.length; w < y; w++) {
							if (x == z[w].Value) {
								return z[w].Text
							}
						}
						return A
					};
				if (q.format || q.type == "Date") {
					u = function(v) {
						var w = r(v);
						return w == null ? "" : b.formatString(q.format || "{0:G}", w)
					}
				}
				return q.encoded === false ? u : function(v) {
					return e(u(v))
				}
			}
			return n(q.template)
		},
		insertFor: function(p) {
			return this.displayFor(p)
		},
		editFor: function(p) {
			return this.displayFor(p)
		},
		initializeColumns: function() {
			a.each(this.columns, a.proxy(function(r, s) {
				if (s.member !== o) {
					s.value = this.valueFor(s)
				} else {
					s.readonly = true
				}
				s.insert = this.insertFor(s);
				s.edit = this.editFor(s);
				s.display = this.displayFor(s);
				if (s.footerTemplate) {
					s.footer = n(s.footerTemplate)
				}
				if (s.groupFooterTemplate) {
					this.showGroupFooter = true;
					s.groupFooter = n(s.groupFooterTemplate)
				}
				s.groupHeader = n("<#= Title #>: <#= Key #>");
				if (s.groupHeaderTemplate) {
					s.groupHeader = n(s.groupHeaderTemplate)
				}
			}, this));
			var q = this.columns.length - 1;
			while (q >= 0) {
				var p = this.columns[q];
				if (p.hidden) {
					q--;
					continue
				}
				if (!p.attr) {
					p.attr = ' class="t-last"';
					break
				} else {
					if (p.attr.indexOf("class") == -1) {
						p.attr += ' class="t-last"';
						break
					} else {
						p.attr = p.attr.replace('class="', 'class="t-last ');
						break
					}
				}
				q--
			}
			if (this.detail) {
				this.displayDetails = n(this.detail.template)
			}
		},
		bindData: function(s, v, u) {
			Array.prototype.push.apply(this.data, s);
			var t = this.pageOnScroll ? s.length : Math.min(this.pageSize, s.length);
			var q = this.columns.length;
			t = this.pageSize ? t : s.length;
			if (a.browser.msie) {
				a(this.element).find(".t-grid-content colgroup:first col").css("display", "")
			}
			for (var y = 0; y < t; y++) {
				var p = a.trim((this.detail ? "t-master-row" : "") + (y % 2 == 1 ? " t-alt" : ""));
				if (p) {
					v.cat('<tr class="').cat(p).cat('">')
				} else {
					v.cat("<tr>")
				}
				v.rep('<td class="t-group-cell"></td>', u).catIf('<td class="t-hierarchy-cell"><a class="t-icon t-plus" href="#" /></td>', this.detail);
				if (this.rowTemplate) {
					v.cat('<td colspan="').cat(q).cat('">').cat(this.rowTemplate(s[y])).cat("</td>")
				} else {
					for (var w = 0, x = this.columns.length; w < x; w++) {
						var r = this.columns[w];
						v.cat("<td").cat(r.attr).cat(">").cat(r.display(s[y]));
						v.cat("</td>")
					}
				}
				v.cat("</tr>")
			}
		},
		normalizeColumns: function() {},
		dataItem: function(p) {
			return (this.data || [])[this.$tbody.find("> tr:not(.t-grouping-row,.t-detail-row,.t-grid-new-row,.t-group-footer)").index(a(p))]
		},
		_colspan: function() {
			return this.groups.length + a.grep(this.columns, function(p) {
				return !p.hidden
			}).length + (this.detail ? 1 : 0)
		},
		bindTo: function(q) {
			var r = new b.stringBuilder();
			var p = this._colspan();
			if (q && q.length) {
				this.normalizeColumns(p);
				if (typeof q[0].hasSubgroups != "undefined") {
					for (var s = 0, t = q.length; s < t; s++) {
						this.bindGroup(q[s], p, r, 0)
					}
				} else {
					this.bindData(q, r)
				}
			} else {
			   
				r.cat("<tr class='t-no-data'>").cat("<td colspan='").cat(p).cat("'>").cat(this.noRecordsTemplate ? this.noRecordsTemplate : this.localization.noRecords).cat("</td></tr>")
			}
			this.$tbody.html(r.string());
			if (this.onRowDataBound) {
				var u = jQuery.grep(this.$tbody[0].rows, function(v) {
					return !a(v).is(".t-grouping-row, .t-group-footer, .t-footer-template")
				});
				for (var s = 0, t = this.data.length; s < t; s++) {
					b.trigger(this.element, "rowDataBound", {
						row: u[s],
						dataItem: this.data[s]
					})
				}
			}
		},
		updatePager: function() {
			var s = this.totalPages(this.total);
			var p = this.currentPage;
			var r = this.pageSize;
			this.$pager.find(".t-arrow-next").parent().add(this.$pager.find(".t-arrow-last").parent()).toggleClass("t-state-disabled", p >= s).removeClass("t-state-hover");
			this.$pager.find(".t-arrow-prev").parent().add(this.$pager.find(".t-arrow-first").parent()).toggleClass("t-state-disabled", p == 1).removeClass("t-state-hover");
			var q = this.localization;
			this.$pager.find(".t-page-i-of-n").each(function() {
				this.innerHTML = new b.stringBuilder().cat(q.page).cat('<input type="text" value="').cat(p).cat('" /> ').cat(b.formatString(q.pageOf, s)).string()
			});
			this.$pager.find(".t-page-size").each(function() {
				var t = '<div style="width: 50px;" class="t-dropdown t-header"><div class="t-dropdown-wrap t-state-default"><span class="t-input">' + r + '</span><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div></div>';
				this.innerHTML = t
			});
			this.$pager.find(".t-numeric").each(a.proxy(function(u, t) {
				this.numericPager(t, p, s)
			}, this));
			//this.$pager.parent().find(".t-status-text").text(b.formatString(q.displayingItems, this.firstItemInPage(), this.lastItemInPage(), this.total, pageSize))//jia zs控制当前第几页
		},
		numericPager: function(u, p, x) {
			var r = 10;
			var s = 1;
			if (p > r) {
				var w = (p % r);
				s = (w == 0) ? (p - r) + 1 : (p - w) + 1
			}
			var q = (s + r) - 1;
			q = Math.min(q, x);
			var v = new b.stringBuilder();
			if (s > 1) {
				v.cat('<a class="t-link">...</a>')
			}
			for (var t = s; t <= q; t++) {
				if (t == p) {
					v.cat('<span class="t-state-active">').cat(t).cat("</span>")
				} else {
					v.cat('<a class="t-link">').cat(t).cat("</a>")
				}
			}
			if (q < x) {
				v.cat('<a class="t-link">...</a>')
			}
			u.innerHTML = v.string()
		},
		$columns: function() {
			return this.$header.find("th:not(.t-hierarchy-cell,.t-group-cell)")
		},
		updateSorting: function() {
			this.sorted = [];
			a.each(this.orderBy.split("~"), a.proxy(function(p, r) {
				var s = r.split("-");
				var q = this.columnFromMember(s[0]);
				if (q) {
					q.order = s[1];
					this.sorted.push(q)
				}
			}, this));
			this.$columns().each(a.proxy(function(t, s) {
				var r = this.columns[t].order;
				var q = a(s).children("a.t-link");
				var p = q.children(".t-icon");
				if (!r) {
					p.hide()
				} else {
					if (p.length == 0) {
						p = a('<span class="t-icon"/>').appendTo(q)
					}
					p.toggleClass("t-arrow-up", r == "asc").toggleClass("t-arrow-down", r == "desc").html("(" + (r == "asc" ? this.localization.sortedAsc : this.localization.sortedDesc) + ")").show()
				}
			}, this))
		},
		sanitizePage: function(q) {
			var p = parseInt(q, 10);
			if (isNaN(p) || p < 1) {
				return this.currentPage
			}
			return Math.min(p, this.totalPages())
		},
		totalPages: function() {
			return Math.ceil(this.total / this.pageSize)
		},
		firstItemInPage: function() {
			var p = this;
			return p.total > 0 ? p.pageOnScroll ? 1 : (p.currentPage - 1) * p.pageSize + 1 : 0
		},
		lastItemInPage: function() {
			return Math.min(this.currentPage * this.pageSize, this.total)
		},
		dataBind: function(p) {
			var q = this;
			if (!q.dataSource) {
				q._dataSource()
			} else {
				if (p && p.length) {
					q.dataSource._group = a.map(q.groups, function(r) {
						return {
							field: r.member,
							dir: r.order,
							aggregates: aggregates
						}
					})
				}
			}
			q._clientBindingInProgress = true;
			try {
				q.dataSource.success(p || [])
			} finally {
				q._clientBindingInProgress = false
			}
		},
		bindFooter: function() {
			var s = this,
				p = s.$footer.find("td:not(.t-group-cell,.t-hierarchy-cell)"),
				q = s.aggregates,
				r = {
					Sum: 0,
					Count: 0,
					Average: 0,
					Max: 0,
					Min: 0
				};
			a.each(s.columns, function(t) {
				if (this.footer) {
					p.eq(t).html(this.footer(s._mapAggregates(q[this.member] || r)))
				}
			})
		},
		rebind: function(p) {
			var q = this;
			q.sorted = [];
			q.orderBy = "";
			q.filterBy = "";
			q.currentPage = 1;
			a.each(q.columns, function() {
				this.order = null;
				this.filters = null
			});
			a(".t-filter-options", q.element).find('input[type="text"], select').val("").removeClass("t-state-error").end().find("div.t-formatted-value").html("");
			a(".t-grid-filter", q.element).removeClass("t-active-filter");
			if (this.isAjax()) {
				q.data = []
			}
			if (!q._isServerOperation()) {
				q._dataSource()
			}
			q.ajaxRequest(p)
		},
		hideColumn: function(t) {
			var E = this,
				v = E.columns,
				u, s, F, B = E.$tbody.children("tr"),
				z, A, r, x, D = 0,
				q = a.browser,
				y = q.msie && parseInt(q.version) === 8,
				C, p, w = E.editing.mode;
			if (typeof t === "number") {
				t = v[t]
			} else {
				t = E.columnFromMember(t)
			}
			u = a.inArray(t, a.grep(v, function(G) {
				return !G.hidden
			}));
			if (u < 0 || !t) {
				return
			}
			s = a("col:not(.t-group-col,.t-hierarchy-col)", E.$header.parent().prev());
			if (E.scrollable) {
				s.eq(u).remove();
				s = a("col:not(.t-group-col,.t-hierarchy-col)", E.$tbody.prev())
			}
			F = s.eq(u).remove()[0].style.width;
			E.$columns().filter(":visible").eq(u).hide();
			E.$footer.find("td:not(.t-group-cell):visible").eq(u).hide();
			for (x = 0, z = B.length; x < z; x++) {
				A = B.eq(x);
				if (A.is(".t-grouping-row,.t-detail-row")) {
					r = A.children(":not(.t-group-cell):first,.t-detail-cell").last();
					r.attr("colspan", parseInt(r.attr("colspan"), 10) - 1)
				} else {
					if (A.hasClass("t-grid-edit-row")) {
						if (w === "InLine" && !E.isAjax()) {
							r = A.children(".t-edit-container");
							r.attr("colspan", parseInt(r.attr("colspan"), 10) - 1);
							r.find("col").eq(u).remove();
							A = r.find("tr:first")
						} else {
							if (w === "InForm") {
								r = A.children().first();
								r.attr("colspan", parseInt(r.attr("colspan"), 10) - 1);
								continue
							}
						}
					}
					A.children("td:not(.t-group-cell,.t-hierarchy-cell):visible").eq(u).hide()
				}
			}
			for (x = 0, z = s.length; x < z; x++) {
				if (x != u) {
					if (s[x].style.width) {
						D += parseInt(s[x].style.width)
					} else {
						D = 0;
						break
					}
				}
			}
			C = a(">table,>.t-grid-header table,>.t-grid-content>table", E.element);
			if (D) {
				C.width(D)
			}
			if (y) {
				C.css("display", "inline-table");
				setTimeout(function() {
					C.css("display", "table")
				}, 1)
			}
			t.hidden = true;
			t.width = F;
			p = t.attr;
			if (!p || p.indexOf("style") < 0) {
				p = (p || "") + ' style="display:none" '
			} else {
				p = t.attr.replace(/(style="(.*)?display):([^;]*)/i, "$1:none");
				if (p === t.attr) {
					p = p.replace(/(style=")/i, "$1display:none;")
				}
			}
			t.attr = p;
			b.trigger(E.element, "repaint")
		},
		showColumn: function(r) {
			var A = this,
				s, t = A.columns,
				q, x = A.$tbody.children("tr"),
				y = a(">table,>.t-grid-header table,>.t-grid-content>table", A.element),
				w, p, u, v;
			if (typeof r === "number") {
				r = t[r]
			} else {
				r = A.columnFromMember(r)
			}
			s = a.inArray(r, t);
			if (!r || !r.hidden) {
				return
			}
			q = a("col:not(.t-group-col,.t-hierarchy-col)", A.$header.parent().prev());
			j(q, t, s);
			if (A.scrollable) {
				q = a("col:not(.t-group-col,.t-hierarchy-col)", A.$tbody.prev());
				j(q, t, s)
			}
			A.$columns().eq(s).show();
			A.$footer.find("td:not(.t-group-cell)").eq(s).show();
			for (u = 0, v = x.length; u < v; u++) {
				w = x.eq(u);
				if (w.is(".t-grouping-row,.t-detail-row")) {
					p = w.children(":not(.t-group-cell):first,.t-detail-cell").last();
					p.attr("colspan", parseInt(p.attr("colspan"), 10) + 1)
				} else {
					if (w.hasClass("t-grid-edit-row")) {
						if (A.editing.mode === "InLine" && !A.isAjax()) {
							p = w.children(".t-edit-container");
							p.attr("colspan", parseInt(p.attr("colspan"), 10) + 1);
							j(p.find(">form>table>colgroup>col"), t, s);
							w = p.find("tr:first")
						} else {
							if (A.editing.mode === "InForm") {
								p = w.children().first();
								p.attr("colspan", parseInt(p.attr("colspan"), 10) + 1);
								continue
							}
						}
					}
					w.children("td:not(.t-group-cell,.t-hierarchy-cell)").eq(s).show()
				}
			}
			if (!r.width) {
				y.width("")
			} else {
				var z = parseInt(r.width, 10);
				for (u = 0, v = q.length; u < v; u++) {
					z += parseInt(q[u].style.width, 10)
				}
				y.width(z)
			}
			r.hidden = false;
			delete r.width;
			if (r.attr) {
				r.attr = r.attr.replace(/(style="(.*)?)(display\s*:\s*none)\s*;?/i, "$1")
			}
			b.trigger(A.element, "repaint")
		},
		initializeContextMenu: function() {
			var v = this,
				s, r = b.fx.slide.defaults(),
				q = a.grep(v.columns, function(w) {
					return w.title !== "" && w.includeInContextMenu !== false
				}),
				t = v.element.id + "_contextMenu",
				u, p;
			a(document).bind("mouseup", function(w) {
				if (u && w.which != 3 && a(w.target).closest("#" + t).length == 0) {
					b.fx.rewind(r, u.find(".t-group"), {
						direction: "bottom"
					}, function() {
						u.remove()
					})
				}
			});
			v.$header.closest(".t-grid-header").bind("contextmenu", function(w) {
				if (u && u.is(":visible")) {
					b.fx.rewind(r, u.find(".t-group"), {
						direction: "bottom"
					});
					u.remove()
				}
				s = new b.stringBuilder();
				s.cat('<div class="t-animation-container t-menu t-menu-context" id="' + t + '" style="display:none">').cat('<ul class="t-group">');
				a.each(q, function() {
					s.cat('<li class="t-item"><label class="t-link">').cat('<input type="checkbox" data-field="' + a.inArray(this, v.columns) + '"').catIf(' checked="checked"', !this.hidden).cat("/>").cat(this.title).cat("</label></li>")
				});
				s.cat("</ul></div>");
				u = a(s.string()).delegate("[type=checkbox]", "change", function() {
					var x = a(this),
						y;
					v[x.is(":checked") ? "showColumn" : "hideColumn"](x.data("field"));
					y = u.find(":checked");
					y.attr("disabled", y.length == 1)
				}).appendTo(document.body);
				p = u.find(":checked");
				p.attr("disabled", p.length == 1);
				u.css({
					left: w.clientX + a(document).scrollLeft(),
					top: w.clientY + a(document).scrollTop()
				});
				b.fx.play(r, u.find(".t-group"), {
					direction: "bottom"
				});
				return false
			})
		}
	};
	b.grid.ButtonBuilder = function(p) {
		var r = /class="([^"]*)"/i;
		this.classNames = ["t-button"];
		var q = r.exec(p.attr);
		if (q) {
			this.classNames.push(q[1]);
			p.attr = a.trim(p.attr.replace(r, ""))
		}
		if (p.name) {
			this.classNames.push("t-grid-" + p.name)
		}
		if (p.ajax) {
			this.classNames.push("t-ajax")
		}
		this.url = p.url ? n(unescape(p.url)) : function() {
			return "#"
		};
		this.content = function() {
			return p.text || ""
		};
		this.build = function(s) {
			return '<a href="' + this.url(s) + '" class="' + this.classNames.join(" ") + '" ' + (p.attr || "") + ">" + this.content() + "</a>"
		}
	};
	b.grid.ButtonBuilder.create = function(p) {
		return new(c[p.buttonType])(p)
	};

	function m(q, p) {
		return '<span class="t-icon t-' + q + '"' + (p ? p : "") + "></span>"
	}
	b.grid.ImageButtonBuilder = function(p) {
		b.grid.ButtonBuilder.call(this, p);
		this.classNames.push("t-button-icon");
		this.content = function() {
			return m(p.name, p.imageAttr)
		}
	};
	b.grid.ImageTextButtonBuilder = function(p) {
		b.grid.ButtonBuilder.call(this, p);
		this.classNames.push("t-button-icontext");
		this.content = function() {
			return '<span class="t-icon t-' + p.name + '"' + (p.imageAttr ? p.imageAttr : "") + "></span>" + p.text
		}
	};
	b.grid.BareImageButtonBuilder = function(p, q) {
		b.grid.ImageButtonBuilder.call(this, p, q);
		this.classNames.push("t-button-icon", "t-button-bare")
	};
	var c = {
		Text: b.grid.ButtonBuilder,
		ImageAndText: b.grid.ImageTextButtonBuilder,
		Image: b.grid.ImageButtonBuilder,
		BareImage: b.grid.BareImageButtonBuilder
	};
	a.fn.tGrid = function(p) {
		return b.create(this, {
			name: "tGrid",
			init: function(q, r) {
				return new b.grid(q, r)
			},
			options: p,
			success: function(q) {
				if (q.$tbody.find("tr.t-no-data").length) {
					q.ajaxRequest()
				}
			}
		})
	};
	a.fn.tGrid.defaults = {
		columns: [],
		plugins: [],
		currentPage: 1,
		pageSize: 10,
		localization: {
			addNew: "Add new record",
			"delete": "Delete",
			cancel: "Cancel",
			insert: "Insert",
			update: "Update",
			select: "Select",
			pageOf: "of {0}",
			displayingItems: "显示项目 {0} - {1} of {2}",
			edit: "Edit",
			//noRecords: "No records to display.",
			noRecords: "暂无数据",//jia+
			page: "Page ",
			filter: "Filter",
			filterClear: "Clear Filter",
			filterShowRows: "Show rows with value that",
			filterAnd: "And",
			filterStringEq: "Is equal to",
			filterStringNe: "Is not equal to",
			filterStringStartsWith: "Starts with",
			filterStringSubstringOf: "Contains",
			filterStringEndsWith: "Ends with",
			filterNumberEq: "Is equal to",
			filterNumberNe: "Is not equal to",
			filterNumberLt: "Is less than",
			filterNumberLe: "Is less than or equal to",
			filterNumberGt: "Is greater than",
			filterNumberGe: "Is greater than or equal to",
			filterDateEq: "Is equal to",
			filterDateNe: "Is not equal to",
			filterDateLt: "Is before",
			filterDateLe: "Is before or equal to",
			filterDateGt: "Is after",
			filterDateGe: "Is after or equal to",
			filterEnumEq: "Is equal to",
			filterEnumNe: "Is not equal to",
			filterForeignKeyEq: "Is equal to",
			filterForeignKeyNe: "Is not equal to",
			filterBoolIsTrue: "is true",
			filterBoolIsFalse: "is false",
			filterSelectValue: "-Select value-",
			filterOpenPopupHint: "Open the calendar popup",
			groupHint: "Drag a column header and drop it here to group by that column",
			deleteConfirmation: "Are you sure you want to delete this record?",
			sortedAsc: "sorted ascending",
			sortedDesc: "sorted descending",
			ungroup: "ungroup"
		},
		queryString: {
			page: "page",
			size: "size",
			orderBy: "orderBy",
			groupBy: "groupBy",
			filter: "filter",
			aggregates: "aggregates"
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	var d = 3;
	var c = 0;
	b.scripts.push("telerik.grid.grouping.js");
	b.grouping = {};

	function e(f, g) {
		return f.find("div").filter(function() {
			var h = a(this);
			if (h.children(".t-link").contents().filter(function() {
				if (a(this).text() === g) {
					return a(this)
				}
			}).length) {
				return a(this)
			}
		})
	}
	b.grouping.initialize = function(k) {
		a.extend(k, b.grouping.implementation);
		k.$groupDropCue = a('<div class="t-grouping-dropclue"/>');
		k.$groupHeader = a("> .t-grouping-header", k.element);

		function l() {
			var n = a.map(k.$groupHeader.find(".t-group-indicator"), function(p) {
				var o = a(p);
				var q = o.offset().left;
				var r = o.outerWidth();
				return {
					left: q,
					right: q + r,
					width: r,
					$group: o
				}
			});
			return {
				first: n[0],
				all: n,
				last: n[n.length - 1]
			}
		}
		function h(q) {
			var A = q.$cue.text(),
				z = b.eventTarget(q),
				w = b.touchLocation(q);
			if (!a.contains(k.element, z) || !a(z).closest(".t-grouping-header").length || (k.groupFromTitle(A) && q.$draggable.closest(".t-header").length)) {
				k.$groupDropCue.remove();
				return
			}
			var n = a(k.element),
				o = n.find("> .t-grid-toolbar"),
				B = o.outerHeight() + d,
				y = l(),
				s = n.closest(".t-rtl").length;
			if (!y.all.length) {
				var u = s ? o.width() - c : c;
				k.$groupDropCue.css({
					top: B,
					left: u
				}).appendTo(k.$groupHeader);
				return
			}
			var r = y.first;
			var t = y.last;
			var v = parseInt(r.$group.css("marginLeft"));
			var x = parseInt(r.$group.css("marginRight"));
			var p = a.grep(y.all, function(C) {
				return w.x >= C.left - v - x && w.x <= C.right
			})[0];
			if (!p && r) {
				if (!s && w.x < r.left) {
					p = r
				} else {
					if (s && w.x < t.left) {
						p = t
					}
				}
			}
			if (s) {
				if (p) {
					k.$groupDropCue.css({
						top: B,
						left: p.$group.position().left - v + c
					}).insertAfter(p.$group)
				} else {
					k.$groupDropCue.css({
						top: B,
						left: o.width() - c
					}).prependTo(k.$groupHeader)
				}
			} else {
				if (p) {
					k.$groupDropCue.css({
						top: B,
						left: p.$group.position().left - v + c
					}).insertBefore(p.$group)
				} else {
					k.$groupDropCue.css({
						top: B,
						left: t.$group.position().left + t.$group.outerWidth() + x + c
					}).appendTo(k.$groupHeader)
				}
			}
		}
		function f(p) {
			if (p.$draggable.hasClass("t-header")) {
				var n = k.columnFromTitle(p.$draggable.text());
				return b.dragCue(n ? n.title : "")
			} else {
				var q = a(".t-link", p.$draggable);
				var o = q.text().substr(a(".t-icon", q).text().length);
				var n = k.columnFromTitle(o);
				return b.dragCue(n ? n.title : o)
			}
		}
		function m(n) {
			var o = n.$cue.text();
			k.$groupDropCue.remove();
			if (n.$draggable.is(".t-group-indicator") && n.keyCode != 27) {
				k.unGroup(o);
				return false
			}
		}
		function g(n) {
			n.$cue.remove()
		}
		if (k.$groupHeader.length) {
			new b.draggable({
				owner: k.$header,
				selector: ".t-header:not(.t-group-cell,.t-hierarchy-cell)",
				scope: k.element.id + "-grouping",
				cue: f,
				start: function(o) {
					var n = k.columnFromTitle(o.$draggable.text());
					return !!n.member && n.groupable !== false
				},
				stop: m,
				drag: h,
				destroy: g
			});
			new b.draggable({
				owner: k.$groupHeader,
				selector: ".t-group-indicator",
				scope: k.element.id + "-grouping",
				cue: f,
				stop: m,
				drag: h,
				destroy: g
			});
			new b.droppable({
				owner: k.element,
				selector: ".t-grouping-header",
				scope: k.element.id + "-grouping",
				over: function(n) {
					b.dragCueStatus(n.$cue, "t-add")
				},
				out: function(n) {
					b.dragCueStatus(n.$cue, "t-denied")
				},
				drop: function(o) {
					var s = o.$cue.text();
					var p = k.groupFromTitle(s);
					var q = a.inArray(p, k.groups);
					var r = k.$groupHeader.find("div").index(k.$groupDropCue);
					var n = q - r;
					if (!p || (k.$groupDropCue.is(":visible") && n != 0 && n != -1)) {
						k.group(s, r)
					}
					k.$groupDropCue.remove()
				}
			})
		}
		if (k.isAjax()) {
			k.$groupHeader.delegate(".t-button", b.isTouch ? "touchend" : "click", function(o) {
				o.preventDefault();
				var p = a(this).parent().find(".t-link");
				var n = p.text().substr(a(".t-icon", p).text().length);
				k.unGroup(n)
			}).delegate(".t-link", b.isTouch ? "touchend" : "click", function(o) {
				o.preventDefault();
				var q = a(this);
				var n = q.text().substr(a(".t-icon", q).text().length);
				var p = k.groupFromTitle(n);
				p.order = p.order == "asc" ? "desc" : "asc";
				k.group(p.title)
			})
		}
		k.$groupHeader.delegate(".t-group-indicator", "mouseenter", function() {
			k.$currentGroupItem = a(this)
		}).delegate(".t-group-indicator", "mouseleave", function() {
			k.$currentGroupItem = null
		});
		k.$tbody.delegate(".t-grouping-row .t-collapse, .t-grouping-row .t-expand", "click", b.stop(function(p) {
			p.preventDefault();
			var n = a(this),
				o = n.closest("tr");
			if (n.hasClass("t-collapse")) {
				k.collapseGroup(o)
			} else {
				k.expandGroup(o)
			}
		}));
		k.groupFromTitle = function(n) {
			return a.grep(k.groups, function(o) {
				return o.title == n
			})[0]
		};
		k.expandGroup = function(p) {
			var n = a(p);
			var o = n.find(".t-group-cell").length;
			n.nextAll("tr").each(function(r, t) {
				var q = a(t);
				var s = q.find(".t-group-cell").length;
				if (s <= o) {
					return false
				}
				if (s == o + 1 && !q.hasClass("t-detail-row")) {
					q.show();
					if (q.hasClass("t-grouping-row") && q.find(".t-icon").hasClass("t-collapse")) {
						k.expandGroup(q)
					}
					if (q.hasClass("t-master-row") && q.find(".t-icon").hasClass("t-minus")) {
						q.next().show()
					}
				}
			});
			n.find(".t-icon").addClass("t-collapse").removeClass("t-expand")
		};
		k.collapseGroup = function(q) {
			var n = a(q),
				o = n.find(".t-group-cell").length,
				p = 1;
			n.nextAll("tr").each(function() {
				var r = a(this),
					s = r.find(".t-group-cell").length;
				if (r.hasClass("t-grouping-row")) {
					p++
				} else {
					if (r.hasClass("t-group-footer")) {
						p--
					}
				}
				if (s <= o || (r.hasClass("t-group-footer") && p < 0)) {
					return false
				}
				r.hide()
			});
			n.find(".t-icon").addClass("t-expand").removeClass("t-collapse")
		};
		k.group = function(s, r) {
			if (this.groups.length == 0 && this.isAjax()) {
				k.$groupHeader.empty()
			}
			var p = a.grep(k.groups, function(t) {
				return t.title == s
			})[0];
			if (!p) {
				var o = k.columnFromTitle(s);
				p = {
					order: "asc",
					member: o.member,
					title: s
				};
				k.groups.push(p)
			}
			if (r >= 0) {
				k.groups.splice(a.inArray(p, k.groups), 1);
				k.groups.splice(r, 0, p)
			}
			k.groupBy = a.map(k.groups, function(t) {
				return t.member + "-" + t.order
			}).join("~");
			if (this.isAjax()) {
				var n = e(this.$groupHeader, s);
				if (n.length == 0) {
					var q = new a.telerik.stringBuilder().cat('<div class="t-group-indicator">').cat('<a href="#" class="t-link"><span class="t-icon" />').cat(s).cat("</a>").cat('<a class="t-button t-button-icon t-button-bare"><span class="t-icon t-group-delete">').cat(k.localization.ungroup).cat("</span></a>").cat("</div>").string();
					n = a(q).appendTo(this.$groupHeader)
				}
				if (this.$groupDropCue.is(":visible")) {
					n.insertBefore(this.$groupDropCue)
				}
				n.find(".t-link .t-icon").toggleClass("t-arrow-up-small", p.order == "asc").toggleClass("t-arrow-down-small", p.order == "desc").html("(" + (p.order == "asc" ? k.localization.sortedAsc : k.localization.sortedDesc) + ")");
				this.ajaxRequest()
			} else {
				this.serverRequest()
			}
		};
		k.unGroup = function(o) {
			var n = k.groupFromTitle(o);
			k.groups.splice(a.inArray(n, k.groups), 1);
			if (k.groups.length == 0) {
				k.$groupHeader.html(k.localization.groupHint)
			}
			k.groupBy = a.map(k.groups, function(p) {
				return p.member + "-" + p.order
			}).join("~");
			if (k.isAjax()) {
				e(k.$groupHeader, o).remove();
				k.ajaxRequest()
			} else {
				k.serverRequest()
			}
		};
		k.normalizeColumns = function(o) {
			var r = k.groups.length;
			var q = o - k.$tbody.parent().find(" > colgroup > col").length;
			if (q == 0) {
				return
			}
			var n = k.$tbody.parent().add(k.$headerWrap.find("table")).add(k.$footer.find("table"));
			if (a.browser.msie) {
				if (q > 0) {
					a(new b.stringBuilder().rep('<col class="t-group-col" />', q).string()).prependTo(n.find("colgroup"));
					a(new b.stringBuilder().rep('<th class="t-group-cell t-header">&nbsp;</th>', q).string()).insertBefore(n.find("th.t-header:first"));
					a(new b.stringBuilder().rep('<td class="t-group-cell">&nbsp;</td>', q).string()).insertBefore(n.find("tr.t-footer-template > td:first"))
				} else {
					n.find("th:lt(" + Math.abs(q) + "), tr.t-footer-template > td:lt(" + Math.abs(q) + ")").remove().end().find("col:lt(" + Math.abs(q) + ")").remove()
				}
				var p = [];
				var s = 0;
				a("table, .t-grid-bottom", k.element).each(function() {
					p.push(this.parentNode)
				}).appendTo(a("<div />")).each(function() {
					p[s++].appendChild(this)
				})
			} else {
				n.find("col.t-group-col").remove();
				a(new b.stringBuilder().rep('<col class="t-group-col" />', r).string()).prependTo(n.find("colgroup"));
				n.find("th.t-group-cell").remove();
				n.find("tr.t-footer-template > td.t-group-cell").remove();
				a(new b.stringBuilder().rep('<th class="t-group-cell t-header">&nbsp;</th>', r).string()).insertBefore(n.find("th.t-header:first"));
				a(new b.stringBuilder().rep('<td class="t-group-cell">&nbsp;</td>', r).string()).insertBefore(n.find("tr.t-footer-template > td:first"))
			}
		};

		function j(q, o) {
			var r = o,
				n, p;
			for (n = 0, p = q.length; n < p; n++) {
				if (o == q[n].Value) {
					return q[n].Text
				}
			}
			return o
		}
		k.bindGroup = function(p, n, s, w) {
			var r = k.groups[w];
			var u = p.value;
			var o = a.grep(k.columns, function(y) {
				return r.member == y.member
			})[0],
				q;
			if (o && (o.format || o.type == "Date")) {
				q = /^\/Date\((.*?)\)\/$/.exec(u);
				if (q) {
					u = new Date(parseInt(q[1]))
				}
				u = b.formatString(o.format || "{0:G}", u)
			}
			s.cat('<tr class="t-grouping-row">').rep('<td class="t-group-cell"></td>', w).cat('<td colspan="').cat(n - w).cat('"><p class="t-reset"><a class="t-icon t-collapse" href="#"></a>');
			if (o) {
				var x = !o.data ? u : j(o.data, u);
				s.cat(o.groupHeader(a.extend({
					Title: r.title,
					Key: x
				}, k._mapAggregates(p.aggregates[o.member]))))
			} else {
				s.cat(r.title + ": " + u)
			}
			s.cat("</p></td></tr>");
			if (p.hasSubgroups) {
				for (var t = 0, v = p.items.length; t < v; t++) {
					k.bindGroup(p.items[t], n, s, w + 1)
				}
			} else {
				k.bindData(p.items, s, w + 1)
			}
			if (k.showGroupFooter) {
				s.cat('<tr class="t-group-footer">').rep('<td class="t-group-cell"></td>', k.groups.length).rep('<td class="t-hierarchy-cell"></td>', k.detail ? 1 : 0);
				a.each(k.columns, function() {
					s.cat("<td");
					s.catIf(' style="display:none;"', this.hidden);
					s.cat(">");
					if (this.groupFooter) {
						s.cat(this.groupFooter(k._mapAggregates(p.aggregates[this.member])))
					}
					s.cat("</td>")
				});
				s.cat("</tr>")
			}
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	var c = /'/ig;
	var d = b.fx.slide.defaults();
	b.scripts.push("telerik.grid.filtering.js");

	function e(g) {
		if (!g.format) {
			return b.cultureInfo.shortDate
		}
		return /\{0(:([^\}]+))?\}/.exec(g.format)[2]
	}
	function f(g, h) {
		if (g.type == "Date") {
			return b.formatString(g.format || "{0:G}", new Date(parseInt(h.replace(/\/Date\((.*?)\)\//, "$1"))))
		}
		return h
	}
	b.filtering = {};
	b.filtering.initialize = function(g) {
		a.extend(g, b.filtering.implementation);
		g.filterBy = g.filterExpr();
		a("> .t-grid-content", g.element).bind("scroll", function() {
			g.hideFilter()
		});
		a(document).click(function(h) {
			if (h.which != 3) {
				g.hideFilter()
			}
		});
		g.$header.find(".t-grid-filter").click(a.proxy(g.showFilter, g)).hover(function() {
			a(this).toggleClass("t-state-hover")
		})
	};
	b.filtering.implementation = {
		createFilterCommands: function(j, g) {
			var h = [];
			a.each(this.localization, function(l, n) {
				var m = "filter" + (g.data ? "ForeignKey" : g.type);
				var k = l.indexOf(m);
				if (k > -1) {
					h.push({
						key: l.substring(k + m.length).toLowerCase(),
						value: n
					})
				}
			});
			if (g.type == "String") {
				if (h[0].key !== "eq") {
					h.push(h.shift())
				}
			}
			j.cat('<select class="t-filter-operator">');
			a.each(h, function(l, k) {
				j.cat('<option value="').cat(k.key).cat('">').cat(k.value).cat("</option>")
			});
			j.cat("</select>")
		},
		createTypeSpecificInput: function(j, g, h, k) {
			if (g.data) {
				j.cat("<div><select><option>").cat(this.localization.filterSelectValue).cat("</option>");
				a.each(g.data, function() {
					j.cat('<option value="').cat(this.Value).cat('">').cat(this.Text).cat("</option>")
				});
				j.cat("</select></div>")
			} else {
				if (g.type == "Date") {
					j.cat('<div class="t-widget t-datepicker"><div class="t-picker-wrap">').cat('<input class="t-input" id="').cat(h).cat('" type="text" value="" />').cat('<span class="t-select"><label class="t-icon t-icon-calendar" for="').cat(h).cat('" title="').cat(this.localization.filterOpenPopupHint).cat('" /></span></div></div>')
				} else {
					if (g.type == "Boolean") {
						j.cat('<div><input type="radio" style="width:auto;display:inline" id="').cat(h + k).cat('" name="').cat(h).cat('" value="').cat(k).cat('" />').cat('<label style="display:inline" for="').cat(h + k).cat('">').cat(this.localization[k ? "filterBoolIsTrue" : "filterBoolIsFalse"]).cat("</label></div>")
					} else {
						if (g.type == "Enum") {
							j.cat("<div><select><option>").cat(this.localization.filterSelectValue).cat("</option>");
							a.each(g.values, function(l, m) {
								j.cat('<option value="').cat(m).cat('">').cat(l).cat("</option>")
							});
							j.cat("</select></div>")
						} else {
							if (g.type == "Number") {
								j.cat('<div class="t-widget t-numerictextbox">').cat('<input class="t-input" name="').cat(h).cat('" id="').cat(h).cat('" type="text" value=""/>').cat("</div>")
							} else {
								j.cat('<input type="text" />')
							}
						}
					}
				}
			}
		},
		createFilterMenu: function(h) {
			var k = new b.stringBuilder();
			k.cat('<div class="t-animation-container"><div class="t-filter-options t-group t-popup" style="display:none">').cat('<button class="t-button t-button-icontext t-button-expand t-clear-button"><span class="t-icon t-clear-filter"></span>').cat(this.localization.filterClear).cat('</button><div class="t-filter-help-text">').cat(this.localization.filterShowRows).cat("</div>");
			var j = a(this.element).attr("id") + h.member;
			if (h.type == "Boolean") {
				this.createTypeSpecificInput(k, h, j, true);
				this.createTypeSpecificInput(k, h, j, false)
			} else {
				this.createFilterCommands(k, h);
				this.createTypeSpecificInput(k, h, j + "first");
				k.cat('<div class="t-filter-help-text">').cat(this.localization.filterAnd).cat("</div>");
				this.createFilterCommands(k, h);
				this.createTypeSpecificInput(k, h, j + "second")
			}
			k.cat('<button class="t-button t-button-icontext t-button-expand t-filter-button"><span class="t-icon t-filter"></span>').cat(this.localization.filter).cat("</button></div></div>");
			var g = a(k.string());
			a.each(h.filters || [], function(l) {
				g.find(".t-filter-operator:eq(" + l + ")").val(this.operator).end().find(":text:eq(" + l + "),select:not(.t-filter-operator):eq(" + l + ")").val(f(h, this.value));
				if (h.type == "Boolean") {
					g.find(":radio[id$=" + this.value + "]").attr("checked", true)
				}
			});
			return g.appendTo(this.element).find(".t-datepicker .t-input").each(function() {
				a(this).tDatePicker({
					format: e(h)
				})
			}).end().find(".t-numerictextbox .t-input").each(function() {
				a(this).tTextBox({
					type: "numeric",
					minValue: null,
					maxValue: null,
					numFormat: "",
					groupSeparator: ""
				})
			}).end()
		},
		showFilter: function(l) {
			l.stopPropagation();
			var g = a(l.target).closest(".t-grid-filter");
			this.hideFilter(function() {
				return this.parentNode != g[0]
			});
			var h = g.data("filter");
			if (!h) {
				var j = this.columns[this.$columns().index(g.parent())];
				h = this.createFilterMenu(j).data("column", j).click(function(t) {
					t.stopPropagation();
					if (a(t.target).parents(".t-datepicker").length == 0) {
						a(".t-datepicker .t-input", this).each(function() {
							a(this).data("tDatePicker").hidePopup()
						})
					}
				}).find(".t-filter-button").click(a.proxy(this.filterClick, this)).end().find(".t-clear-button").click(a.proxy(this.clearClick, this)).end().find("input[type=text]").keydown(a.proxy(function(t) {
					if (t.keyCode == 13) {
						this.filterClick(t)
					}
				}, this)).end();
				g.data("filter", h)
			}
			var r = 0;
			a(this.element).find("> .t-grouping-header, > .t-grid-toolbar").add(this.$header).each(function() {
				r += this.offsetHeight
			});
			var q = {
				top: r
			};
			var n = a(this.element).closest(".t-rtl").length;
			var m = this.$headerWrap.scrollLeft();
			var s = !n ? -m - 1 : m - 1;
			g.parent().add(g.parent().prevAll("th")).each(function() {
				if (a(this).css("display") != "none") {
					s += this.offsetWidth
				}
			});
			var o = s - g.outerWidth();
			var p = h.outerWidth() || h.find(".t-group").outerWidth();
			if (o + p > this.$header.closest(".t-grid-header").innerWidth()) {
				o = s - p + 1
			}
			if (n) {
				var k = ((a.browser.mozilla && parseInt(a.browser.version, 10) < 2) || a.browser.webkit) ? 18 : 0;
				q.right = o + k
			} else {
				q.left = o
			}
			h.css(q);
			b.fx[h.find(".t-filter-options").is(":visible") ? "rewind" : "play"](d, h.find(".t-filter-options"), {
				direction: "bottom"
			})
		},
		hideFilter: function(g) {
			g = g ||
			function() {
				return true
			};
			a(".t-grid .t-animation-container").find(".t-datepicker .t-input").each(function() {
				a(this).data("tDatePicker").hidePopup()
			}).end().find(".t-filter-options").filter(g).each(function() {
				b.fx.rewind(d, a(this), {
					direction: "bottom"
				})
			})
		},
		clearClick: function(j) {
			j.preventDefault();
			var g = a(j.target);
			var h = g.closest(".t-animation-container").data("column");
			h.filters = null;
			g.closest(".t-filter-options").find(".t-numerictextbox .t-input").each(function() {
				a(this).data("tTextBox").value("")
			}).end().find("input").removeAttr("checked").removeClass("t-state-error").not(":radio").val("").end().end().find("select").removeClass("t-state-error").find("option:first").attr("selected", "selected");
			this.filter(this.filterExpr());
			this.hideFilter()
		},
		filterClick: function(j) {
			j.preventDefault();
			var g = a(j.target);
			var h = g.closest(".t-animation-container").data("column");
			h.filters = [];
			var k = false;
			g.closest(".t-filter-options").find("input[type=text]:visible,select:not(.t-filter-operator)").each(a.proxy(function(m, n) {
				var l = a(n);
				var r = a.trim(l.val());
				if (!r) {
					l.removeClass("t-state-error");
					return true
				}
				var q = this.isValidFilterValue(h, r);
				l.toggleClass("t-state-error", !q);
				if (!q) {
					k = true;
					return true
				}
				var o = l.data("tTextBox");
				if (o) {
					r = o.value()
				}
				var p = l.prev("select").val() || l.parent().prev("select").val() || l.parent().parent().prev("select").val();
				if (r != this.localization.filterSelectValue) {
					h.filters.push({
						operator: p,
						value: r
					})
				}
			}, this));
			g.parent().find("input:checked").each(a.proxy(function(m, n) {
				var l = a(n);
				var o = a(n).attr("value");
				if (h.type === "Boolean" && o && typeof o === "string") {
					o = o.toLowerCase().indexOf("true") > -1 ? true : false
				}
				h.filters.push({
					operator: "eq",
					value: o
				})
			}, this));
			if (!k) {
				if (h.filters.length > 0) {
					this.filter(this.filterExpr())
				} else {
					h.filters = null
				}
				this.hideFilter()
			}
		},
		isValidFilterValue: function(g, j) {
			if (g.type == "Date") {
				var h;
				if (j.indexOf("Date(") > -1) {
					h = new Date(parseInt(j.replace(/^\/Date\((.*?)\)\/$/, "$1")))
				} else {
					h = b.datetime.parse({
						value: j,
						format: e(g)
					})
				}
				return h != undefined
			}
			return true
		},
		encodeFilterValue: function(g, j) {
			switch (g.type) {
			case "String":
				return "'" + j.replace(c, "''") + "'";
			case "Date":
				var h;
				if (j.indexOf("Date(") > -1) {
					h = new Date(parseInt(j.replace(/^\/Date\((.*?)\)\/$/, "$1")))
				} else {
					h = b.datetime.parse({
						value: j,
						format: e(g)
					}).toDate()
				}
				return "datetime'" + b.formatString("{0:yyyy-MM-ddTHH-mm-ss}", h) + "'"
			}
			return j
		},
		filterExpr: function() {
			var l = [];
			for (var h = 0; h < this.columns.length; h++) {
				var g = this.columns[h];
				if (g.filters) {
					for (var k = 0; k < g.filters.length; k++) {
						var j = g.filters[k];
						l.push(new b.stringBuilder().cat(g.member).cat("~").cat(j.operator).cat("~").cat(this.encodeFilterValue(g, j.value)).string())
					}
				}
			}
			return l.join("~and~")
		},
		filter: function(g) {
			this.currentPage = 1;
			this.filterBy = g;
			if (this.isAjax()) {
				this.$columns().each(a.proxy(function(j, h) {
					a(".t-grid-filter", h).toggleClass("t-active-filter", !! this.columns[j].filters)
				}, this));
				this.ajaxRequest()
			} else {
				this.serverRequest()
			}
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.grid.resizing.js");
	b.resizing = {};
	b.resizing.initialize = function(j) {
		var c, d = a('<div class="t-grid-resize-indicator" />'),
			k, f, e, m = 3;

		function g(r, s) {
			a("th, th .t-grid-filter, th .t-link", r).add(document.body).css("cursor", s)
		}
		function l(r) {
			var s = 0;
			a("> .t-grouping-header, > .t-grid-top", r).each(function() {
				s += this.offsetHeight
			});
			return s
		}
		function o(s) {
			var t = 0;
			a(".t-resize-handle", j.element).each(function() {
				t += a(this).data("th").outerWidth();
				a(this).css("left", t - m)
			});
			t = -j.$tbody.closest(".t-grid-content").scrollLeft();
			s.prevAll("th").add(s).each(function() {
				t += this.offsetWidth
			});
			var r = j.scrollable ? a(".t-grid-content", j.element) : a("tbody", j.element);
			var u = r.attr(j.scrollable ? "clientWidth" : "offsetWidth");
			if (t >= u) {
				d.remove()
			} else {
				d.css({
					left: t,
					top: l(j.element),
					height: s.outerHeight() + r.attr(j.scrollable ? "clientHeight" : "offsetHeight")
				});
				if (!d.parent().length) {
					d.appendTo(j.element)
				}
			}
		}
		function p(t) {
			var r = t.$draggable.data("th"),
				u = a.inArray(r[0], r.parent().children(":visible")),
				s = j.$tbody.parent();
			if (!j.scrollable) {
				c = s.children("colgroup").find("col:eq(" + u + ")")
			} else {
				c = j.$header.parent().prev().find("col:eq(" + u + ")").add(s.children("colgroup").find("col:eq(" + u + ")")).add(j.$footerWrap.find(">table>colgroup>col:eq(" + u + ")"))
			}
			e = t.pageX;
			f = r.outerWidth();
			k = j.$tbody.outerWidth()
		}
		function h(r) {
			r.$draggable.dragCalled = true;
			var s = f + r.pageX - e;
			if (s > 10) {
				c.css("width", s);
				if (j.scrollable) {
					j.$tbody.parent().add(j.$headerWrap.find("table")).add(j.$footer.find("table")).css("width", k + r.pageX - e)
				}
				o(r.$draggable.data("th"))
			}
		}
		function q(s) {
			d.remove();
			g(j.element, "");
			if (s.$draggable.dragCalled) {
				var r = s.$draggable.data("th");
				var t = r.outerWidth();
				if (j.onColumnResize && t != f) {
					b.trigger(j.element, "columnResize", {
						column: j.columns[j.$columns().index(r)],
						oldWidth: f,
						newWidth: t
					})
				}
			}
			return false
		}
		function n() {
			var t = 0,
				u = j.element.id + "-column-resizing",
				r;
			var s = b.draggable.get(u);
			if (s) {
				s.destroy()
			}
			j.$headerWrap.add(j.element).find("> .t-resize-handle").remove();
			j.$header.find(".t-header:visible").each(function() {
				t += this.offsetWidth;
				var v = a(this);
				a('<div class="t-resize-handle" />').css({
					left: t - m,
					top: j.scrollable ? 0 : l(j.element),
					width: m * 2
				}).appendTo(j.scrollable ? j.$headerWrap : j.element).data("th", v).mousedown(function() {
					o(v);
					r = a(this);
					g(j.element, r.css("cursor"))
				})
			});
			a(document).mouseup(function() {
				if (r) {
					q({
						$draggable: r
					});
					r = null
				}
			});
			new b.draggable({
				owner: j.element,
				selector: ".t-resize-handle",
				scope: u,
				distance: 0,
				start: p,
				drag: h,
				stop: q
			})
		}
		n();
		a(j.element).one("mouseenter", n).bind("repaint", n)
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.grid.reordering.js");
	b.reordering = {};
	b.reordering.initialize = function(c) {
		c.$reorderDropCue = a('<div class="t-reorder-cue"><div class="t-icon t-arrow-down"></div><div class="t-icon t-arrow-up"></div></div>');
		var d = c.$header.children("th").length - 1;
		var f = function(h, g) {
				var k = a.inArray(g, c.columns);
				c.columns.splice(k, 1);
				c.columns.splice(h, 0, g);
				e(c.$columns(), k, h);
				e(c.$tbody.parent().find("> colgroup > col:not(.t-group-col,.t-hierarchy-col)"), k, h);
				e(c.$headerWrap.find("table").find("> colgroup > col:not(.t-group-col,.t-hierarchy-col)"), k, h);
				var j = c.$footer.find("table");
				e(j.find("> colgroup > col:not(.t-group-col,.t-hierarchy-col)"), k, h);
				e(j.find("> tbody > tr.t-footer-template > td:not(.t-group-cell,.t-hierarchy-cell)").add(c.$footer.find("tr.t-footer-template > td:not(.t-group-cell,.t-hierarchy-cell)")), k, h);
				a.each(c.$tbody.children(), function() {
					e(a(this).find(" > td:not(.t-group-cell, .t-hierarchy-cell, .t-detail-cell)"), k, h)
				})
			};
		c.reorderColumn = f;

		function e(k, l, j) {
			var h = k.eq(l);
			var g = k.eq(j);
			h[l > j ? "insertBefore" : "insertAfter"](g)
		}
		new b.draggable({
			owner: c.$header[0],
			selector: ".t-header:not(.t-group-cell,.t-hierarchy-cell)",
			scope: c.element.id + "-reodering",
			cue: function(h) {
				var g = c.columnFromTitle(h.$draggable.text());
				return b.dragCue(g ? g.title : "")
			},
			destroy: function(g) {
				g.$cue.remove()
			}
		});
		new b.droppable({
			owner: c.$header[0],
			scope: c.element.id + "-reodering",
			selector: ".t-header:not(.t-group-cell,.t-hierarchy-cell)",
			over: function(g) {
				var h = a.trim(g.$draggable.text()) == a.trim(g.$droppable.text());
				b.dragCueStatus(g.$cue, h ? "t-denied" : "t-add");
				var j = 0;
				a("> .t-grid-top, > .t-grouping-header", c.element).each(function() {
					j += a(this).outerHeight()
				});
				if (!h) {
					c.$reorderDropCue.css({
						height: g.$droppable.outerHeight(),
						top: j,
						left: function() {
							return g.$droppable.position().left + ((g.$droppable.index() > g.$draggable.index()) ? g.$droppable.outerWidth() : 0)
						}
					}).appendTo(c.element)
				}
			},
			out: function(g) {
				c.$reorderDropCue.remove();
				b.dragCueStatus(g.$cue, "t-denied")
			},
			drop: function(h) {
				c.$reorderDropCue.remove();
				if (h.$cue.find(".t-drag-status").is(".t-add")) {
					var g = c.columnFromTitle(a.trim(h.$draggable.text()));
					var j = c.$columns().index(h.$droppable.closest(".t-header"));
					b.trigger(c.element, "columnReorder", {
						column: g,
						oldIndex: a.inArray(g, c.columns),
						newIndex: j
					});
					f(j, g);
					b.trigger(c.element, "repaint")
				}
			}
		})
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		e = /^\/Date\((.*?)\)\/$/,
		d = /[0#?]/,
		j = /[npc?]/;
	b.scripts.push("telerik.grid.editing.js");
	var n = function(q) {
			this.formId = q;
			this._isBuild = false;
			var p = "tUnobtrusiveValidation";
			var o = "tUnobtrusiveContainer";
			var r = this.unobtrusive = {
				adapters: [],
				parseElement: function(t, x) {
					var s = a(t),
						u = s.parents("form")[0],
						y, w, v;
					if (!u) {
						return
					}
					y = r.validationInfo(u);
					y.options.rules[t.name] = w = {};
					y.options.messages[t.name] = v = {};
					a.each(this.adapters, function() {
						var B = "data-val-" + this.name,
							z = s.attr(B),
							A = {};
						if (z !== undefined) {
							B += "-";
							a.each(this.params, function() {
								A[this] = s.attr(B + this)
							});
							this.adapt({
								element: t,
								form: u,
								message: z,
								params: A,
								rules: w,
								messages: v
							})
						}
					});
					if (!x) {
						y.attachValidation()
					}
				},
				parse: function(s) {
					a(s).find(":input[data-val=true]").each(function() {
						r.parseElement(this, true)
					});
					a(s).each(function() {
						var t = r.validationInfo(this);
						if (t) {
							t.attachValidation()
						}
					})
				},
				onError: function(t, u) {
					var s = a(this).find("[data-valmsg-for='" + u[0].name + "']"),
						v = a.parseJSON(s.attr("data-valmsg-replace")) !== false;
					s.removeClass("field-validation-valid").addClass("field-validation-error");
					t.data(o, s);
					if (v) {
						s.empty();
						t.removeClass("input-validation-error").appendTo(s)
					} else {
						t.hide()
					}
				},
				onErrors: function(t, v) {
					var s = a(this).find("[data-valmsg-summary=true]"),
						u = s.find("ul");
					if (u && u.length && v.errorList.length) {
						u.empty();
						s.addClass("validation-summary-errors").removeClass("validation-summary-valid");
						a.each(v.errorList, function() {
							a("<li />").html(this.message).appendTo(u)
						})
					}
				},
				onSuccess: function(t) {
					var s = t.data(o),
						u = a.parseJSON(s.attr("data-valmsg-replace"));
					if (s) {
						s.addClass("field-validation-valid").removeClass("field-validation-error");
						t.removeData(o);
						if (u) {
							s.empty()
						}
					}
				},
				validationInfo: function(t) {
					var s = a(t),
						u = s.data(p);
					if (!u) {
						u = {
							options: {
								errorClass: "input-validation-error",
								errorElement: "span",
								errorPlacement: a.proxy(r.onError, t),
								invalidHandler: a.proxy(r.onErrors, t),
								messages: {},
								rules: {},
								success: a.proxy(r.onSuccess, t)
							},
							attachValidation: function() {
								s.validate(this.options)
							},
							validate: function() {
								s.validate();
								return s.valid()
							}
						};
						s.data(p, u)
					}
					return u
				}
			}
		};
	n.prototype = {
		build: function() {
			if (this._isBuild) {
				return
			}
			this._isBuild = true;
			var o = [];

			function r(t, u, v) {
				t.rules[u] = v;
				if (t.message) {
					t.messages[u] = t.message
				}
			}
			function s(t) {
				return t.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
			}
			function q(t) {
				return t.substr(0, t.lastIndexOf(".") + 1)
			}
			function p(u, t) {
				if (u.indexOf("*.") === 0) {
					u = u.replace("*.", t)
				}
				return u
			}
			o = this.unobtrusive.adapters;
			o.add = function(t, v, u) {
				if (!u) {
					u = v;
					v = []
				}
				this.push({
					name: t,
					params: v,
					adapt: u
				});
				return this
			};
			o.addBool = function(t, u) {
				return this.add(t, function(v) {
					r(v, u || t, true)
				})
			};
			o.addMinMax = function(t, y, v, x, w, u) {
				return this.add(t, [w || "min", u || "max"], function(B) {
					var A = B.params.min,
						z = B.params.max;
					if (A && z) {
						r(B, x, [A, z])
					} else {
						if (A) {
							r(B, y, A)
						} else {
							if (z) {
								r(B, v, z)
							}
						}
					}
				})
			};
			o.addSingleVal = function(t, u, v) {
				return this.add(t, [u || "val"], function(w) {
					r(w, v || t, w.params[u])
				})
			};
			o.addSingleVal("accept", "exts").addSingleVal("regex", "pattern");
			o.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
			o.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
			o.add("equalto", ["other"], function(u) {
				var t = a(u.form).find(":input[name=" + u.params.other + "]")[0];
				r(u, "equalTo", t)
			});
			o.add("required", function(t) {
				if (t.element.tagName.toUpperCase() !== "INPUT" || t.element.type.toUpperCase() !== "CHECKBOX") {
					r(t, "required", true)
				}
			});
			o.add("remote", ["url", "type", "additionalfields"], function(t) {
				var v = {
					url: t.params.url,
					type: t.params.type || "GET",
					data: {}
				},
					u = q(t.element.name);
				a.each(s(t.params.additionalfields || t.element.name), function(x, w) {
					var y = p(w, u);
					v.data[y] = function() {
						return a(t.form).find(":input[name='" + y + "']").val()
					}
				});
				r(t, "remote", v)
			});
			if (a.validator.unobtrusive && a.validator.unobtrusive.adapters) {
				a.extend(o, a.validator.unobtrusive.adapters)
			}
			a.validator.addMethod("regex", function(w, t, v) {
				if (this.optional(t)) {
					return true
				}
				var u = new RegExp(v).exec(w);
				return u && u.index == 0 && u[0].length == w.length
			});
			a.validator.addMethod("number", function(w, u) {
				var v = b.cultureInfo.numericgroupsize;
				if (v) {
					var t = new b.stringBuilder();
					t.cat("^-?(?:\\d+|\\d{1,").cat(v).cat("}(?:").cat(b.cultureInfo.numericgroupseparator).cat("\\d{").cat(v).cat("})+)(?:\\").cat(b.cultureInfo.numericdecimalseparator).cat("\\d+)?$");
					return this.optional(u) || (t && new RegExp(t.string()).test(w))
				}
				return this.optional(u) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(w)
			})
		},
		parse: function() {
			this.build();
			this.unobtrusive.parse(this.formId)
		}
	};
	var h = function(o) {
			this.validationMetaData = o
		};
	h.prototype = {
		build: function(D) {
			a.validator.addMethod("regex", function(H, E, G) {
				if (this.optional(E)) {
					return true
				}
				var F = new RegExp(G).exec(H);
				return F && F.index == 0 && F[0].length == H.length
			});
			a.validator.addMethod("number", function(H, F) {
				var G = b.cultureInfo.numericgroupsize;
				var E = new b.stringBuilder();
				E.cat("^-?(?:\\d+|\\d{1,").cat(G).cat("}(?:").cat(b.cultureInfo.numericgroupseparator).cat("\\d{").cat(G).cat("})+)(?:\\").cat(b.cultureInfo.numericdecimalseparator).cat("\\d+)?$");
				return this.optional(F) || new RegExp(E.string()).test(H)
			});

			function o(G, F, E) {
				G.range = [F, E]
			}
			function p(E, F) {
				E.regex = F
			}
			function q(E) {
				E.required = true
			}
			function r(F, E) {
				F.maxlength = E
			}
			function s(E, G, F) {
				E[G] = F
			}
			function u(H) {
				var F = {};
				for (var E = 0; E < H.length; E++) {
					var G = H[E];
					F[G.FieldName] = "#" + G.ValidationMessageId
				}
				return F
			}
			function t(L) {
				var H = {};
				for (var E = 0; E < L.length; E++) {
					var I = L[E];
					var J = {};
					H[I.FieldName] = J;
					var M = I.ValidationRules;
					for (var F = 0; F < M.length; F++) {
						var K = M[F];
						if (K.ErrorMessage) {
							var G = K.ValidationType;
							switch (K.ValidationType) {
							case "regularExpression":
								G = "regex";
								break;
							case "stringLength":
								G = "maxlength";
								break
							}
							J[G] = K.ErrorMessage
						}
					}
				}
				return H
			}
			function v(J) {
				var K = J.ValidationRules;
				var H = {};
				for (var E = 0; E < K.length; E++) {
					var I = K[E];
					switch (I.ValidationType) {
					case "range":
						var G = (typeof(I.ValidationParameters.minimum) == "undefined") ? I.ValidationParameters.min : I.ValidationParameters.minimum;
						var F = (typeof(I.ValidationParameters.maximum) == "undefined") ? I.ValidationParameters.max : I.ValidationParameters.maximum;
						o(H, G, F);
						break;
					case "regularExpression":
					case "regex":
						p(H, I.ValidationParameters.pattern);
						break;
					case "required":
						q(H);
						break;
					case "stringLength":
						r(H, I.ValidationParameters.maximumLength);
						break;
					case "length":
						r(H, I.ValidationParameters.max);
						break;
					default:
						s(H, I.ValidationType, I.ValidationParameters);
						break
					}
				}
				return H
			}
			function w(I) {
				var G = {};
				for (var F = 0; F < I.length; F++) {
					var H = I[F];
					var E = H.FieldName;
					G[E] = v(H)
				}
				return G
			}
			var C = a("#" + D.FormId);
			var y = D.Fields;
			var B = w(y);
			var z = u(y);
			var x = t(y);
			var A = {
				errorClass: "input-validation-error",
				errorElement: "span",
				errorPlacement: function(F, E) {
					var G = z[E.attr("name")];
					if (G) {
						a(G).empty().removeClass("field-validation-valid").addClass("field-validation-error");
						F.removeClass("input-validation-error").attr("_for_validation_message", G).appendTo(G)
					}
				},
				messages: x,
				rules: B,
				success: function(E) {
					a(E.attr("_for_validation_message")).empty().addClass("field-validation-valid").removeClass("field-validation-error")
				}
			};
			C.validate(A)
		},
		parse: function() {
			this.build(this.validationMetaData)
		}
	};
	b.editing = {};

	function c(o) {
		a(o || document.body).find("div.t-grid").each(function() {
			var p = a(this).data("tGrid");
			if (p && p.cancel) {
				p.cancel()
			}
		})
	}
	function f(q, r, p) {
		for (var o in r) {
			if (a.isPlainObject(r[o])) {
				f(q, r[o], p ? p + "." + o : o)
			} else {
				q[p ? p + "." + o : o] = r[o]
			}
		}
	}
	function m(s) {
		for (var r in s) {
			var q = r.indexOf(".");
			if (q > -1) {
				var p = r.substring(0, q);
				var o = s[p] || {};
				o[r.substring(q + 1)] = s[r];
				s[p] = m(o);
				delete s[r]
			}
		}
		return s
	}
	function k(o) {
		var q, r, p;
		for (q in o) {
			r = o[q];
			if (typeof r === "string") {
				p = e.exec(r);
				if (p) {
					o[q] = new Date(parseInt(p[1]))
				}
			} else {
				if (a.isPlainObject(r)) {
					k(r)
				}
			}
		}
	}
	function l(o, u, t) {
		var v = {};
		for (var w = 0, q = 0; w < o.length; w++) {
			var p = o[w];
			k(p);
			if (t(p)) {
				for (var s in p) {
					var x = p[s],
						r = u + "[" + q + "]." + s;
					if (a.isPlainObject(x)) {
						f(v, x, r)
					} else {
						v[r] = x
					}
				}
				q++
			}
		}
		return v
	}
	b.editing.initialize = function(u) {
		a.extend(u, this.implementation);
		var o = a(u.element);
		u.modelBinder = new b.grid.ModelBinder();
		u.formViewBinder = new b.grid.FormViewBinder({
			date: function(y, z) {
				var w = u.columnFromMember(y);
				var x = w ? w.format : "";
				return b.formatString(x || "{0:G}", z)
			}
		});
		if (u.isAjax()) {
			u.serializeData = function(w, y, x) {
				if (!x) {
					x = function() {
						return true
					}
				}
				w = l(w, y, x);
				return u._convert(w)
			};
			if (u.editing.mode == "InCell") {
				k(u.editing.defaultDataItem || {});
				u.changeLog = new b.grid.ChangeLog(u.pageSize || (u.data && u.data.length) || 0);
				a(u.element).bind("dataBound", function() {
					u.changeLog.clear();
					u.valid = true;
					u.td = null
				});
				u.cellEditor = new b.grid.CellEditor({
					columns: u.columns,
					cellIndex: function(w) {
						return u.cellIndex(w)
					},
					id: u.formId(),
					bind: a.proxy(u.formViewBinder.bind, u.formViewBinder),
					validate: a.proxy(u.validation, u)
				});
				o.delegate(".t-grid-save-changes:not(.t-state-disabled)", "click", b.stopAll(function(w) {
					u.submitChanges()
				}));
				o.delegate(".t-grid-cancel-changes", "click", b.stopAll(function(w) {
					u.cancelChanges()
				}));
				u.hasChanges = function() {
					return u.changeLog.dirty()
				};
				u.updatedDataItems = function() {
					return a.grep(u.changeLog.updated, function(w) {
						return w != undefined
					})
				};
				u.insertedDataItems = function() {
					return u.changeLog.inserted
				};
				u.deletedDataItems = function() {
					return a.grep(u.changeLog.deleted, function(w) {
						return w != undefined
					})
				};
				u.submitChanges = function() {
					u._onCommand({
						name: "submitChanges"
					});
					if (u.changeLog.dirty()) {
						u._validateForm(function() {
							var y = u.changeLog.inserted;
							var z = a.grep(u.changeLog.updated, function(B) {
								return B != undefined
							});
							var x = a.grep(u.changeLog.deleted, function(B) {
								return B != undefined
							});
							var w = {};
							if (b.trigger(u.element, "submitChanges", {
								inserted: y,
								updated: z,
								deleted: x,
								values: w
							})) {
								return
							}
							var A = u.ws ? {
								inserted: a.map(y, function(B) {
									return u._convert(B)
								}),
								updated: a.map(z, function(B) {
									return u._convert(B)
								}),
								deleted: a.map(x, function(B) {
									return u._convert(B)
								})
							} : u.changeLog.serialize(y, z, x);
							u.sendValues(a.extend(A, w), "updateUrl", "submitChanges")
						})
					}
				};
				u.cancelChanges = function() {
					u._onCommand({
						name: "cancelChanges"
					});
					u.changeLog.clear();
					u.valid = true;
					u.td = null;
					u.ajaxRequest()
				};
				u.cellIndex = function(w) {
					return a(w).parent().find("td:not(.t-group-cell,.t-hierarchy-cell)").index(w)
				};
				u.rowIndex = function(w) {
					return a(w).parent().find("tr:not(.t-detail-row,.t-grouping-row)").index(w)
				};
				var r;
				u.valid = true;
				u.editCell = function(F) {
					var x = u.columns[u.cellIndex(F)];
					if (u.valid && (x && !x.readonly)) {
						u.td = F;
						if (u.form().length) {
							a.data(u.form()[0], "validator", null)
						}
						F = a(F);
						var G = F.parent();
						var B = u.rowIndex(G);
						var z = u.changeLog.get(B) || u.dataItem(G);
						r = F.find(".t-dirty");
						u.cellEditor.edit(F, z);
						b.trigger(u.element, "edit", {
							mode: G.hasClass("t-grid-new-row") ? "insert" : "edit",
							form: u.form()[0],
							dataItem: z,
							cell: F[0]
						})
					} else {
						if (u.keyboardNavigation) {
							var F = a(F),
								y = F.closest(".t-grid-content", u.element);
							if (y.length > 0) {
								var w = F.outerWidth(),
									D = F.position().left,
									E = y.scrollLeft(),
									A = y.outerWidth();
								if (D > E && D + w > A) {
									var C = E + b.scrollbarWidth() + D + w - A;
									y.scrollLeft(C)
								}
							}
						}
					}
				};
				u.saveCell = function(w) {
					u.valid = false;
					u._validateForm(function() {
						u.valid = true;
						w = a(w);
						var z = w.parent();
						var x = u.changeLog.get(u.rowIndex(z)) || u.dataItem(z);
						var A = m(u.modelBinder.bind(w));
						var y = false;
						if (b.trigger(u.element, "save", {
							mode: z.hasClass("t-grid-new-row") ? "insert" : "edit",
							dataItem: x,
							values: A,
							form: u.form()[0],
							cell: w[0]
						})) {
							return
						}
						if (z.hasClass("t-grid-new-row")) {
							u.changeLog.insert(u.rowIndex(z), A)
						} else {
							y = u.changeLog.update(u.rowIndex(z), x, A)
						}
						u.cellEditor.display(w, a.extend(true, {}, x, A));
						if (y || z.hasClass("t-grid-new-row")) {
							r = a('<span class="t-dirty" />')
						}
						if (r && r.length) {
							r.prependTo(u.td)
						}
						u.td = null
					})
				};
				u.cancelCell = function(y) {
					y = a(y);
					var z = y.parent(),
						x = u.rowIndex(z),
						w = u.changeLog.get(x) || u.dataItem(z);
					u.valid = true;
					u.cellEditor.display(y, w);
					if (r && r.length) {
						r.prependTo(u.td)
					}
					u.td = null
				};
				u.td = null;
				u.$tbody.delegate("tr:not(.t-grouping-row,.t-no-data,.t-footer-template,.t-group-footer) > td:not(.t-detail-cell,.t-grid-edit-cell,.t-group-cell,.t-hierarchy-cell)", u.editing.beginEdit || "click", function(w) {
					if (a(this).closest("tbody")[0] == u.$tbody[0]) {
						u.editCell(this)
					}
				});
				a(document).mousedown(function(w) {
					if (u.td && !a.contains(u.td, w.target) && u.td != w.target && !a(w.target).closest(".t-animation-container").length) {
						u.saveCell(u.td)
					}
				})
			} else {
				if (u.editing.beginEdit) {
					u.$tbody.delegate("tr:not(.t-detail-row,.t-grouping-row,.t-grid-edit-row,.t-group-footer)", u.editing.beginEdit, function(w) {
						if (!a(w.target).is(":button,a,:input,a>.t-icon")) {
							u.editRow(a(this))
						}
					})
				}
			}
			o.delegate(".t-grid-edit", "click", b.stopAll(function(w) {
				u.editRow(a(this).closest("tr"))
			})).delegate(".t-grid-delete", "click", b.stopAll(function(w) {
				u.deleteRow(a(this).closest("tr"))
			})).delegate(".t-grid-add", "click", b.stopAll(function(w) {
				u.addRow()
			}))
		} else {
			o.delegate(".t-grid-delete", "click", b.stop(function(w) {
				if (u.editing.confirmDelete !== false && !confirm(u.localization.deleteConfirmation)) {
					w.preventDefault()
				}
			}));
			u.validation()
		}
		u.errorView = new b.grid.ErrorView();
		var p = new b.grid.DataCellBuilder({
			columns: u.columns,
			rowTemplate: u.rowTemplate
		});
		var q = a.grep(u.columns, function(w) {
			return w.commands && a.grep(w.commands, function(x) {
				return x.name == "edit"
			})[0]
		})[0];
		if (!q) {
			q = {
				commands: [{
					name: "edit",
					buttonType: "Text"
				}]
			};
			q.insert = u.insertFor(q);
			q.edit = u.editFor(q)
		}
		var t = new b.grid.FormContainerBuilder({
			html: function() {
				return unescape(u.editing.editor)
			},
			insert: function() {
				return q.insert()
			},
			edit: function() {
				return q.edit()
			}
		});
		var s = u.editing.mode;
		var v = function() {
				return (u.groups || []).length
			};
		if (s == "InLine") {
			u.rowEditor = new b.grid.Editor({
				id: u.formId(),
				cancel: p.display,
				edit: p.edit,
				insert: p.insert,
				groups: v,
				details: u.detail
			})
		} else {
			if (s == "InForm") {
				u.rowEditor = new b.grid.Editor({
					id: u.formId(),
					cancel: p.display,
					groups: v,
					details: u.detail,
					edit: function() {
						return '<td colspan="' + a.grep(u.columns, function(w) {
							return !w.hidden
						}).length + '">' + t.edit() + "</td>"
					},
					insert: function() {
						return '<td colspan="' + a.grep(u.columns, function(w) {
							return !w.hidden
						}).length + '">' + t.insert() + "</td>"
					}
				})
			} else {
				if (s == "PopUp") {
					u.rowEditor = new b.grid.PopUpEditor({
						id: u.formId(),
						edit: t.edit,
						container: u.element,
						settings: u.editing.popup,
						insert: t.insert,
						editTitle: u.localization.edit,
						insertTitle: u.localization.insert
					})
				} else {
					p = new b.grid.CellBuilder({
						columns: u.columns
					});
					u.rowEditor = new b.grid.Editor({
						id: u.formId(),
						cancel: p.display,
						edit: p.edit,
						insert: p.insert,
						groups: v,
						details: u.detail
					})
				}
			}
		}
		if (!u.keyboardNavigation) {
			o.delegate(":input:not(.t-button):not(textarea)", "keydown", b.stop(function(w) {
				if (w.keyCode == 13 || w.keyCode == 27) {
					w.preventDefault();
					var x = {
						13: ".t-grid-update, .t-grid-insert",
						27: ".t-grid-cancel"
					};
					a(this).closest("tr").find(x[w.keyCode]).click()
				}
			}))
		}
	};
	b.editing.implementation = {
		editFor: function(p) {
			var s = this.localization;
			if (p.commands) {
				var q = a.grep(p.commands, function(u) {
					return u.name == "edit"
				})[0];
				if (q) {
					var t = b.grid.ButtonBuilder.create(a.extend({
						text: s.update
					}, q, {
						name: "update"
					}));
					var o = b.grid.ButtonBuilder.create(a.extend({
						text: s.cancel
					}, q, {
						name: "cancel"
					}));
					var r = t.build() + o.build();
					return function() {
						return r
					}
				} else {
					return function() {
						return ""
					}
				}
			} else {
				if (!p.readonly && p.editor) {
					return function() {
						return unescape(p.editor)
					}
				}
			}
			return this.displayFor(p)
		},
		insertFor: function(p) {
			var t = this.localization;
			if (p.commands) {
				var q = a.grep(p.commands, function(u) {
					return u.name == "edit"
				})[0];
				if (q) {
					var s = b.grid.ButtonBuilder.create(a.extend({
						text: t.insert
					}, q, {
						name: "insert"
					}));
					var o = b.grid.ButtonBuilder.create(a.extend({
						text: t.cancel
					}, q, {
						name: "cancel"
					}));
					var r = s.build() + o.build();
					return function() {
						return r
					}
				} else {
					return function() {
						return ""
					}
				}
			} else {
				return this.editFor(p)
			}
		},
		insertRow: function(o) {
			var w = this;
			if (a.isPlainObject(o)) {
				var q = a.extend(true, {}, w.editing.defaultDataItem, o);
				if (this.editing.mode != "InCell") {
					k(q);
					w.sendValues(q, "insertUrl", "insert")
				} else {
					w.changeLog.insert(q);
					var s = (w.groups || []).length + 1,
						r = w.detail,
						x = a('<tr class="t-grid-new-row">' + new Array(s).join('<td class="t-group-cell" />') + ((r) ? '<td class="t-hierarchy-cell"/>' : "") + "</tr>"),
						p = w.columns,
						v, t, u;
					w.$tbody.prepend(x);
					x.closest("table").wrap(function() {
						if (!a(this).parent().is("form")) {
							return g(w.formId())
						}
					});
					for (t = 0, u = p.length; t < u; t++) {
						v = a("<td>").appendTo(x);
						w.cellEditor.display(v, q);
						if (!p[t].readonly) {
							v.prepend('<span class="t-dirty" />')
						}
					}
				}
				return
			}
			var x = (o.data("tr") || o)[0];
			this._onCommand({
				name: "insert",
				row: x
			});
			w._validateForm(function() {
				var y = w.extractValues(o);
				if (b.trigger(w.element, "save", {
					mode: "insert",
					values: y,
					form: w.form()[0]
				})) {
					return
				}
				w.sendValues(y, "insertUrl", "insert")
			})
		},
		_validateForm: function(o) {
			var p = this.form();
			if (p.length) {
				var q = p.validate();
				if (q) {
					q.settings.submitHandler = function() {
						o();
						q.settings.submitHandler = a.noop
					};
					p.submit()
				}
			}
		},
		_rowForData: function(w) {
			var v = this,
				o = (v.changeLog ? v.changeLog.inserted : []).concat(v.data || []),
				q = [];
			w = w ? w : {};
			for (var t in v.dataKeys) {
				q.push(v.valueFor({
					member: t
				}))
			}
			for (var r = 0, u = o.length; r < u; r++) {
				var s = q.length - 1,
					p = q[s];
				while (p && p(w) === p(o[r])) {
					p = q[--s]
				}
				if (s < 0) {
					return v.$tbody.find(">tr:not(.t-grouping-row,.t-group-footer,.t-detail-row,.t-no-data,.t-footer-template)").eq(r)
				}
			}
		},
		updateRow: function(o) {
			var x = this;
			if (a.isPlainObject(o)) {
				var z = o;
				if (this.editing.mode != "InCell") {
					k(z);
					x.sendValues(z, "updateUrl", "update")
				} else {
					o = x._rowForData(z);
					if (!o) {
						return
					}
					var v = x.rowIndex(o),
						q = x.changeLog,
						t = q.get(v) || x.dataItem(o),
						p = o.find("td:not(.t-hierarchy-cell,.t-group-cell)"),
						s = {},
						w, r;
					for (var u in z) {
						s[u] = z[u];
						r = x.columnFromMember(u);
						if (r && !r.readonly && q.update(v, t, s)) {
							w = p.eq(a.inArray(r, x.columns));
							x.cellEditor.display(w, s);
							w.prepend('<span class="t-dirty" />')
						}
					}
					o.closest("table").wrap(function() {
						if (!a(this).parent().is("form")) {
							return g(x.formId())
						}
					})
				}
				return
			}
			var y = (o.data("tr") || o)[0];
			this._onCommand({
				name: "update",
				row: y
			});
			x._validateForm(function() {
				var A = x.dataItem(y);
				var B = x.extractValues(o, (x.editing.mode != "InCell" || !x.ws));
				if (b.trigger(x.element, "save", {
					mode: "edit",
					dataItem: A,
					values: B,
					form: x.form()[0]
				})) {
					return
				}
				if (x.editing.mode == "InCell") {
					B = a.extend(A, B)
				}
				k(B);
				x.sendValues(B, "updateUrl", "update")
			})
		},
		deleteRow: function(o) {
			var q = a.isPlainObject(o),
				p, s, r = this;
			if (q) {
				p = o;
				o = r._rowForData(o);
				p = a.extend({}, this.dataItem(o), p);
				if (r.editing.mode != "InCell") {
					if (!r._isServerOperation() && r.dataSource) {
						r.deletedIds.push(r.dataSource.id(p))
					}
					k(p);
					r.sendValues(p, "deleteUrl", "delete")
				} else {
					r.changeLog.erase(r.rowIndex(o), p);
					if (!r._isServerOperation() && r.dataSource && p) {
						r.deletedIds.push(r.dataSource.id(p))
					}
					o.next("tr.t-detail-row").remove();
					r.cancelRow(o);
					o.hide()
				}
				return
			}
			p = this.dataItem(o);
			this._onCommand({
				name: "delete",
				row: o[0]
			});
			if (this.editing.mode != "InCell") {
				s = this.extractValues(o, true);
				if (b.trigger(this.element, "delete", {
					row: o[0],
					dataItem: p,
					values: s
				})) {
					return
				}
				if (!this._isServerOperation() && this.dataSource) {
					this.deletedIds.push(this.dataSource.id(p))
				}
				if (this.editing.confirmDelete === false || confirm(this.localization.deleteConfirmation)) {
					this.sendValues(s, "deleteUrl", "delete")
				}
			} else {
				if (!o.hasClass("t-grid-new-row")) {
					s = this.extractValues(o, true)
				}
				if (b.trigger(this.element, "delete", {
					row: o[0],
					dataItem: p,
					values: s
				})) {
					return
				}
				if (this.editing.confirmDelete === false || confirm(this.localization.deleteConfirmation)) {
					this.changeLog.erase(this.rowIndex(o), p);
					if (this.td && a.contains(o[0], this.td)) {
						this.td = null;
						this.valid = true
					}
					if (!this._isServerOperation() && this.dataSource && p) {
						this.deletedIds.push(this.dataSource.id(p))
					}
					o.next("tr.t-detail-row").remove();
					this.cancelRow(o);
					o.hide()
				}
			}
		},
		editRow: function(o) {
			var r = this.dataItem(o);
			this._onCommand({
				name: "edit",
				row: o[0]
			});
			if (this.editing.mode != "InCell") {
				c(a(this.element).closest(".t-edit-form")[0]);
				var q = this.rowEditor.edit(o, r);
				var s = this.form();
				s.undelegate(".t-grid-update", "click").delegate(".t-grid-update", "click", b.stopAll(a.proxy(function() {
					this.updateRow(q)
				}, this))).undelegate(".t-grid-cancel", "click").delegate(".t-grid-cancel", "click", b.stopAll(a.proxy(function() {
					this.cancelRow(o)
				}, this)));
				this.formViewBinder.bind(q, r);
				b.trigger(this.element, "edit", {
					mode: "edit",
					form: s[0],
					dataItem: r
				});
				this.validation()
			} else {
				if (this.valid) {
					var v = this.rowEditor.edit(o, r);
					var p = v.find("td:not(.t-hierarchy-cell,.t-group-cell)");
					var u = o.find(":input:visible:enabled:first");
					this.td = u.closest("td")[0];
					if (!this.td) {
						var t = 0;
						a.each(this.columns, function(x, w) {
							if (!w.hidden && !w.readonly) {
								t = x;
								return false
							}
						});
						this.td = p[t]
					}
					u.focus();
					this.validation()
				}
			}
		},
		form: function() {
			return a("#" + this.formId())
		},
		addRow: function() {
			var r = a.extend(true, {}, this.editing.defaultDataItem);
			this._onCommand({
				name: "add"
			});
			if (this.editing.mode != "InCell") {
				c(a(this.element).closest(".t-edit-form")[0]);
				var q = this.rowEditor.insert(this.$tbody, r);
				var s = this.form();
				s.undelegate(".t-grid-insert", "click").delegate(".t-grid-insert", "click", b.stopAll(a.proxy(function() {
					this.insertRow(q)
				}, this))).undelegate(".t-grid-cancel", "click").delegate(".t-grid-cancel", "click", b.stopAll(a.proxy(function() {
					this.cancelRow(q)
				}, this)));
				b.trigger(this.element, "edit", {
					mode: "insert",
					form: s[0],
					dataItem: r
				});
				this.validation()
			} else {
				if (this.valid) {
					var w = this.rowEditor.insert(this.$tbody, r);
					var p = w.find("td:not(.t-hierarchy-cell,.t-group-cell)");
					var v = w.find(":input:enabled:visible:first");
					this.changeLog.insert(r);
					this.td = v.closest("td")[0];
					if (!this.td) {
						var u = 0;
						a.each(this.columns, function(y, x) {
							if (!x.hidden && !x.readonly) {
								u = y;
								return false
							}
						});
						this.td = p[u]
					}
					for (var t = this.columns.length - 1; t >= 0; t--) {
						if (!this.columns[t].readonly) {
							var o = p.eq(t);
							if (o[0] != this.td) {
								o.prepend('<span class="t-dirty" />')
							}
						}
					}
					b.trigger(this.element, "edit", {
						mode: "insert",
						form: this.form()[0],
						dataItem: r,
						cell: this.td
					});
					this.validation();
					v.focus()
				}
			}
			if (this.editing.mode != "PopUp") {
				this.$tbody.find(" > tr.t-no-data").hide()
			}
		},
		extractValues: function(o, r) {
			var t = this.modelBinder.bind(o);
			if (r) {
				var p = this.dataItem(o.data("tr") || o);
				for (var q in this.dataKeys) {
					var s = this.valueFor({
						member: q
					})(p);
					if (s instanceof Date) {
						s = b.formatString("{0:G}", s)
					}
					t[this.ws ? q : this.dataKeys[q]] = s
				}
			}
			return t
		},
		cancelRow: function(o) {
			if (!o.length) {
				return
			}
			var q = (o.data("tr") || o)[0];
			var p = this.dataItem(o);
			this._onCommand({
				name: "cancel",
				row: q
			});
			this.rowEditor.cancel(o, p);
			if (o.is(".t-grid-new-row")) {
				if (!this.changeLog || !this.changeLog.inserted.length) {
					this.$tbody.find(" > tr.t-no-data").show()
				}
				return
			}
			b.trigger(this.element, "rowDataBound", {
				row: o[0],
				dataItem: p
			})
		},
		validate: function() {
			var o = this.form();
			if (o.length) {
				var q = o.validate();
				var p = q.form();
				if (q.pendingRequest) {
					q.formSubmitted = true;
					return false
				}
				return p
			}
			return true
		},
		cancel: function() {
			this.cancelRow(this.$tbody.find(">.t-grid-edit-row"))
		},
		_dataSource: function() {
			var s = this,
				q = this._dataSourceOptions(),
				o = q.data,
				r = [],
				p = [];
			a.each(s.dataKeys, function(t, u) {
				r.push(u);
				p.push(b.getter(t))
			});
			if (s.isAjax()) {
				a.extend(true, q, {
					model: b.Model.define({
						id: function(t, v) {
							var u;
							if (v === undefined) {
								return a.map(p, function(w) {
									return w(t)
								}).join("-")
							} else {
								u = v.split("-");
								a.each(r, function(w, x) {
									t[x] = u[w]
								})
							}
						}
					})
				})
			}
			s.dataSource = new b.DataSource(q);
			if (o && o.data) {
				s._convertInitialData(o.data)
			}
			s.dataSource.bind("change", a.proxy(s._dataChange, s))
		},
		_convert: function(v) {
			for (var q in v) {
				var u = v[q],
					o, p;
				if (u instanceof Date) {
					o = this.columnFromMember(q);
					p = "{0:G}";
					if (o && o.format) {
						p = o.format
					}
					v[q] = this.ws ? "\\/Date(" + u.getTime() + ")\\/" : b.formatString(p, u)
				}
				if (typeof u === "number") {
					var r = "numeric",
						t = {
							n: r,
							p: "percent",
							c: "currency",
							"#": r,
							"0": r
						};
					o = this.columnFromMember(q), p = (o && o.format ? o.format : "N").toLowerCase(), u = u.toString();
					var s = p.match(j) || p.match(d);
					v[q] = s ? u.replace(".", b.cultureInfo[t[s] + "decimalseparator"]) : u
				}
				if (u == undefined) {
					delete v[q]
				}
				if (a.isPlainObject(u)) {
					this._convert(u)
				}
			}
			return v
		},
		sendValues: function(s, q, o) {
			if (this.editing.mode != "InCell" || !this.ws) {
				this._convert(s);
				for (var p in this.dataKeys) {
					var r = this.valueFor({
						member: p
					})(s);
					if (r != undefined) {
						s[this.ws ? p : this.dataKeys[p]] = r
					}
				}
			}
			this.showBusy();
			a.ajax(this.ajaxOptions({
				data: this.ws ? (this.editing.mode == "InCell" ? s : {
					value: s
				}) : s,
				url: this.url(q),
				hasErrors: a.proxy(this.hasErrors, this),
				commandName: o,
				displayErrors: a.proxy(this.displayErrors, this)
			}))
		},
		displayErrors: function(o) {
			this.errorView.bind(a("#" + this.formId()), o.modelState)
		},
		hasErrors: function(o) {
			var p = o.modelState;
			var q = false;
			if (p) {
				a.each(p, function(r, s) {
					if ("errors" in s) {
						q = true;
						return false
					}
				})
			}
			return q
		},
		formId: function() {
			return a(this.element).attr("id") + "form"
		},
		validation: function() {
			this.validator().parse()
		},
		validator: function() {
			if (this.validationMetadata) {
				return new h(this.validationMetadata)
			} else {
				return new n("#" + this.formId())
			}
		}
	};
	b.grid.ModelBinder = function() {
		this.binders = {
			":input.t-autocomplete": function() {
				return a(this).val()
			},
			".t-numerictextbox :input": function() {
				return a(this).data("tTextBox").value()
			},
			":input[name]:not(.t-input, :radio, :button),:radio:checked": function() {
				return a(this).val()
			},
			":checkbox": function() {
				return a(this).is(":checked")
			},
			".t-datepicker :input": function() {
				return a(this).data("tDatePicker").value()
			},
			".t-timepicker :input": function() {
				return a(this).data("tTimePicker").value()
			},
			".t-datetimepicker :input": function() {
				return a(this).data("tDateTimePicker").value()
			},
			".t-editor textarea:hidden": function() {
				var o = a(this).closest(".t-editor").data("tEditor");
				if (o.encoded) {
					return o.encodedValue()
				}
				return o.value()
			}
		};
		this.bind = function(o) {
			var p = {};
			a.each(this.binders, function(r, q) {
				o.find(r).each(function() {
					if (!this.disabled) {
						p[this.name] = q.call(this)
					}
				})
			});
			return p
		}
	};
	b.grid.FormViewBinder = function(o) {
		this.converters = o || {};
		this.binders = {
			':input:not(:radio):not([type="file"])': function(r) {
				if (typeof r == "boolean") {
					r = r + ""
				}
				a(this).val(r)
			},
			":checkbox": function(r) {
				a(this).attr("checked", r == true)
			},
			":radio": function(s) {
				var r = a(this).val();
				if (typeof s == "boolean") {
					r = r.toLowerCase()
				}
				if (r == s.toString()) {
					a(this).attr("checked", true)
				}
			}
		};

		function q(r) {
			return function(s) {
				a(this).data(r).value(s)
			}
		}
		function p() {
			return function(r) {
				a(this).closest(".t-editor").data("tEditor").value(r)
			}
		}
		this.binders[".t-numerictextbox :input"] = q("tTextBox");
		this.binders[".t-dropdown :input:hidden"] = q("tDropDownList");
		this.binders[".t-datepicker :input"] = q("tDatePicker");
		this.binders[".t-datetimepicker :input"] = q("tDateTimePicker");
		this.binders[".t-timepicker :input"] = q("tTimePicker");
		this.binders[".t-slider :input"] = q("tSlider");
		this.binders[".t-combobox :input:hidden"] = q("tComboBox");
		this.binders[".t-editor textarea:hidden"] = p();
		this.evaluate = function(w, s) {
			if (s != null) {
				var y = w,
					t = false,
					v = s.split(".");
				while (v.length) {
					var u = v.shift();
					if (u.indexOf("[") > -1) {
						y = new Function("d", "try { return d." + u + "}catch(e){}")(y);
						if (y != null) {
							t = true
						} else {
							y = w
						}
					} else {
						if (y != null && typeof(y[u]) != "undefined") {
							y = y[u];
							t = true
						} else {
							if (t) {
								t = false;
								break
							}
						}
					}
				}
				if (t && !a.isPlainObject(y)) {
					var r = e.exec(y);
					if (r) {
						y = new Date(parseInt(r[1]))
					}
					var x = b.getType(y);
					if (x in this.converters) {
						y = this.converters[x](s, y)
					}
					return y
				}
			}
		};
		this.bind = function(r, s) {
			var t;
			a.each(this.binders, a.proxy(function(v, u) {
				r.find(v).each(a.proxy(function(x, w) {
					var y = this.evaluate(s, w.name);
					if (y != t) {
						u.call(w, y)
					}
				}, this))
			}, this))
		}
	};
	b.grid.CellBuilder = function(p) {
		function o(q, s) {
			var r = 0;
			a.each(p.columns, function(u, t) {
				if (!t.readonly && !t.hidden) {
					r = u;
					return false
				}
			});
			return a.map(p.columns, function(u, v) {
				var t;
				if (v == 0 && s == "insert") {
					t = "t-grid-edit-cell"
				} else {
					if (v == p.columns.length - 1) {
						t = "t-last"
					}
				}
				return "<td " + (u.attr ? u.attr : "") + (t ? ' class="' + t + '"' : "") + ">" + u[v == r ? s : "display"](q) + "</td>"
			}).join("")
		}
		this.edit = function(q) {
			return o(q, "edit")
		};
		this.insert = function(q) {
			return o(q, "insert")
		};
		this.display = function(q) {
			return o(q, "display")
		}
	};
	b.grid.DataCellBuilder = function(p) {
		function o(q, r) {
			return a.map(p.columns, function(s, t) {
				return "<td " + (s.attr ? s.attr : "") + (t == p.columns.length - 1 ? ' class="t-last">' : ">") + s[r](q) + "</td>"
			}).join("")
		}
		this.edit = function(q) {
			return o(q, "edit")
		};
		this.insert = function(q) {
			return o(q, "insert")
		};
		this.display = function(q) {
			if (p.rowTemplate) {
				return '<td colspan="' + p.columns.length + '">' + p.rowTemplate(q) + "</td>"
			}
			return o(q, "display")
		}
	};
	b.grid.FormContainerBuilder = function(p) {
		function o(q) {
			return '<div class="t-edit-form-container">' + p.html() + p[q]() + "</div>"
		}
		this.edit = function() {
			return o("edit")
		};
		this.insert = function() {
			return o("insert")
		}
	};

	function g(o) {
		return a("<form />", {
			id: o
		}).addClass("t-edit-form").submit(b.preventDefault)
	}
	b.grid.PopUpEditor = function(q) {
		var r;

		function o() {
			var s = r.data("tWindow");
			s && s.close();
			r.remove()
		}
		function p(s, t) {
			var u = q.settings;
			r = a("<div />", {
				id: q.container.id + "PopUp"
			}).appendTo(q.container).css({
				top: 0,
				left: "50%",
				marginLeft: -90
			}).tWindow(u).find(".t-window-content").append(q[t](s)).wrapInner(g(q.id)).end();
			a(q.container).one("dataBound", o);
			r.find(".t-close").click(b.stopAll(o)).end().data("tWindow").open().title((u && u.title) ? u.title : q[t + "Title"]);
			return r
		}
		this.edit = function(t, s) {
			t.addClass("t-grid-edit-row");
			return p(s, "edit").data("tr", t)
		};
		this.insert = function(t, s) {
			return p(s, "insert")
		};
		this.cancel = function(s) {
			s.removeClass("t-grid-edit-row");
			o()
		}
	};
	b.grid.Editor = function(q) {
		var o = q.groups ||
		function() {
			return 0
		};

		function p(u, r, s) {
			var t = u.find(".t-group-cell,.t-hierarchy-cell");
			u.addClass("t-grid-edit-row").empty().append(t).append(q[s](r)).closest("table").wrap(function() {
				if (!a(this).parent().is("form")) {
					return g(q.id)
				}
			})
		}
		this.cancel = function(s, r) {
			if (s.is(".t-grid-new-row")) {
				s.remove()
			} else {
				p(s, r, "cancel");
				s.removeClass("t-grid-edit-row")
			}
		};
		this.insert = function(r, s) {
			var t = '<tr class="t-grid-new-row">' + new Array(o() + 1).join('<td class="t-group-cell" />') + ((q.details) ? '<td class="t-hierarchy-cell"/>' : "") + "</tr>";
			var u = a(t);
			r.prepend(u);
			p(u, s, "insert");
			return u
		};
		this.edit = function(s, r) {
			p(s, r, "edit");
			return s
		}
	};
	b.grid.CellEditor = function(o) {
		this.edit = function(s, r) {
			var p = o.columns[o.cellIndex(s)];
			if (!p.readonly) {
				s.parent().addClass("t-grid-edit-row").end().empty().html(p.edit(r)).closest("table").wrap(function() {
					if (!a(this).parent().is("form")) {
						return g(o.id)
					}
				});
				o.bind(s, r);
				o.validate();
				s.find(":input:visible:first").trigger("focusin").focus();
				s.addClass("t-grid-edit-cell");
				if (a.browser.msie && a.browser.version < 9) {
					var q = s.closest(".t-grid-content");
					q.scrollLeft(q.scrollLeft())
				}
			}
			return !p.readonly
		};
		this.display = function(r, q) {
			var p = o.columns[o.cellIndex(r)];
			r.removeClass("t-grid-edit-cell").empty().html(p.display(q)).parent().removeClass("t-grid-edit-row")
		}
	};
	b.grid.ChangeLog = function(o) {
		this.insert = function(p, r) {
			if (r == undefined) {
				r = p;
				this.inserted.splice(0, 0, r)
			} else {
				var q = this.inserted[p];
				if (q === undefined) {
					this.inserted.splice(0, 0, r)
				} else {
					a.extend(q, r)
				}
			}
		};
		this.get = function(p) {
			var q = this.inserted[p];
			if (this.inserted[p]) {
				return q
			}
			return this.updated[p - this.inserted.length]
		};
		this.update = function(r, u, w) {
			r = r - this.inserted.length;
			var s = this.updated[r] || u || {};
			var q = false;
			for (var t in w) {
				var v = s[t],
					p = w[t];
				if (v instanceof Date) {
					if (p instanceof Date && p.getTime() !== v.getTime()) {
						q = true
					}
				} else {
					if (p !== v) {
						q = true
					}
				}
			}
			if (q) {
				this.updated[r] = a.extend({}, s, w)
			}
			return q
		};
		this.erase = function(p, s) {
			var q = this.inserted[p];
			if (q) {
				this.inserted.splice(p, 1)
			} else {
				p = p - this.inserted.length;
				var r = this.updated[p];
				if (r) {
					delete this.updated[p]
				}
				this.deleted[p] = s
			}
		};
		this.clear = function() {
			this.updated = new Array(o);
			this.deleted = new Array(o);
			this.inserted = []
		};
		this.serialize = function(q, r, p) {
			return a.extend({}, l(q, "inserted", function() {
				return true
			}), l(r, "updated", function(s) {
				return s !== undefined
			}), l(p, "deleted", function(s) {
				return s !== undefined
			}))
		};
		this.dirty = function() {
			if (this.inserted.length) {
				return true
			}
			for (var p = 0; p < this.updated.length; p++) {
				if (this.updated[p]) {
					return true
				}
			}
			for (p = 0; p < this.deleted.length; p++) {
				if (this.deleted[p]) {
					return true
				}
			}
			return false
		};
		this.clear()
	};
	b.grid.ErrorView = function() {
		this.bind = function(o, p) {
			o.find("span[id$=_validationMessage]").removeClass("field-validation-error").addClass("field-validation-valid").html("").end().find(".input-validation-error").removeClass("input-validation-error").addClass("valid");
			a.each(p, function(q, s) {
				if ("errors" in s && s.errors[0]) {
					var r = q;
					q = q.replace(".", "_");
					o.find("#" + q + '_validationMessage, [data-valmsg-for="' + r + '"]').html(s.errors[0]).removeClass("field-validation-valid").addClass("field-validation-error").end().find("#" + q).removeClass("valid").addClass("input-validation-error")
				}
			})
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		c = {
			single: 0,
			multi: 1
		};
	b.scripts.push("telerik.panelbar.js");
	a.extend(b, {
		panelbar: function(g, h) {
			this.element = g;
			a.extend(this, h);
			var e = a(g),
				d = e.find("li.t-state-active > .t-content"),
				f = ".t-item:not(.t-state-disabled) > .t-link";
			e.delegate(f, "click", a.proxy(this._click, this)).delegate(f, "mouseenter", b.hover).delegate(f, "mouseleave", b.leave).delegate(".t-item.t-state-disabled > .t-link", "click", b.preventDefault);
			b.bind(this, {
				expand: this.onExpand,
				collapse: this.onCollapse,
				select: a.proxy(function(j) {
					if (j.target == this.element && this.onSelect) {
						a.proxy(this.onSelect, this.element)(j)
					}
				}, this),
				error: this.onError,
				load: this.onLoad
			});
			if (this.contentUrls) {
				e.find("> .t-item").each(a.proxy(function(j, k) {
					a(k).find(".t-link").data("ContentUrl", this.contentUrls[j])
				}, this))
			}
			if (d.length > 0 && d.is(":empty")) {
				this.expand(d.parent())
			}
		}
	});
	b.panelbar.prototype = {
		expand: function(d) {
			a(d).each(a.proxy(function(f, g) {
				var e = a(g);
				if (!e.hasClass(".t-state-disabled") && e.find("> .t-group, > .t-content").length > 0) {
					if (this.expandMode == c.single && this._collapseAllExpanded(e)) {
						return
					}
					this._toggleItem(e, false, null)
				}
			}, this))
		},
		collapse: function(d) {
			a(d).each(a.proxy(function(f, g) {
				var e = a(g);
				if (!e.hasClass(".t-state-disabled") && e.find("> .t-group, > .t-content").is(":visible")) {
					this._toggleItem(e, true, null)
				}
			}, this))
		},
		toggle: function(e, d) {
			a(e).each(function() {
				a(this).toggleClass("t-state-default", d).toggleClass("t-state-disabled", !d)
			})
		},
		enable: function(d) {
			this.toggle(d, true)
		},
		disable: function(d) {
			this.toggle(d, false)
		},
		_click: function(j) {
			var g = a(j.target),
				k = this.element;
			if (g.closest(".t-widget")[0] != k) {
				return
			}
			var f = g.closest(".t-link"),
				d = f.closest(".t-item");
			a(".t-state-selected", k).removeClass("t-state-selected");
			f.addClass("t-state-selected");
			if (b.trigger(k, "select", {
				item: d[0]
			})) {
				j.preventDefault()
			}
			var h = d.find("> .t-content, > .t-group"),
				l = f.attr("href"),
				m = f.data("ContentUrl") || (l && (l.charAt(l.length - 1) == "#" || l.indexOf("#" + k.id + "-") != -1));
			if (m || h.length > 0) {
				j.preventDefault()
			} else {
				return
			}
			if (this.expandMode == c.single) {
				if (this._collapseAllExpanded(d)) {
					return
				}
			}
			if (h.length != 0) {
				var n = h.is(":visible");
				if (!b.trigger(k, !n ? "expand" : "collapse", {
					item: d[0]
				})) {
					this._toggleItem(d, n, j)
				}
			}
		},
		_toggleItem: function(f, j, h) {
			var g = f.find("> .t-group");
			if (g.length) {
				this._toggleGroup(g, j);
				if (h != null) {
					h.preventDefault()
				}
			} else {
				var k = f.parent().children().index(f),
					d = f.find("> .t-content");
				if (d.length) {
					if (h != null) {
						h.preventDefault()
					}
					if (!d.is(":empty")) {
						this._toggleGroup(d, j)
					} else {
						this._ajaxRequest(f, d, j)
					}
				}
			}
		},
		_toggleGroup: function(d, e) {
			if (d.is(":visible") != e || d.data("animating")) {
				return
			}
			d.data("animating", true).parent().toggleClass("t-state-default", e).toggleClass("t-state-active", !e).find("> .t-link > .t-icon").toggleClass("t-arrow-up", !e).toggleClass("t-panelbar-collapse", !e).toggleClass("t-arrow-down", e).toggleClass("t-panelbar-expand", e);
			b.fx[!e ? "play" : "rewind"](this.effects, d, null, function() {
				d.data("animating", false)
			})
		},
		_collapseAllExpanded: function(d) {
			if (d.find("> .t-link").hasClass("t-header")) {
				if (d.find("> .t-content, > .t-group").is(":visible") || d.find("> .t-content, > .t-group").length == 0) {
					return true
				} else {
					a(this.element).children().find("> .t-content, > .t-group").filter(function() {
						return a(this).is(":visible")
					}).each(a.proxy(function(f, e) {
						this._toggleGroup(a(e), true)
					}, this))
				}
			}
		},
		_ajaxRequest: function(d, f, h) {
			var k = d.find(".t-panelbar-collapse, .t-panelbar-expand"),
				e = d.find(".t-link"),
				j = setTimeout(function() {
					k.addClass("t-loading")
				}, 100),
				g = {};
			a.ajax({
				type: "GET",
				cache: false,
				url: e.data("ContentUrl") || e.attr("href"),
				dataType: "html",
				data: g,
				error: a.proxy(function(m, l) {
					if (b.ajaxError(this.element, "error", m, l)) {
						return
					}
				}, this),
				complete: function() {
					clearTimeout(j);
					k.removeClass("t-loading")
				},
				success: a.proxy(function(l, m) {
					f.html(l);
					this._toggleGroup(f, h)
				}, this)
			})
		}
	};
	a.fn.tPanelBar = function(d) {
		return b.create(this, {
			name: "tPanelBar",
			init: function(e, f) {
				return new b.panelbar(e, f)
			},
			options: d
		})
	};
	a.fn.tPanelBar.defaults = {
		effects: b.fx.property.defaults("height")
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.menu.js");
	b.menu = function(e, f) {
		this.element = e;
		this.nextItemZIndex = 100;
		a.extend(this, f);
		a(".t-item:not(.t-state-disabled)", e).live("mouseenter", b.delegate(this, this.mouseenter)).live("mouseleave", b.delegate(this, this.mouseleave)).live("click", b.delegate(this, this.click));
		a(".t-item:not(.t-state-disabled) > .t-link", e).live("mouseenter", b.hover).live("mouseleave", b.leave);
		a(".t-item.t-state-disabled", e).live("click", function() {
			return false
		});
		a(document).click(b.delegate(this, this.documentClick));
		b.bind(this, {
			select: this.onSelect,
			open: this.onOpen,
			close: this.onClose,
			load: this.onLoad
		})
	};

	function d(e) {
		var f = e.parent();
		return {
			direction: f.hasClass("t-menu") ? f.hasClass("t-menu-vertical") ? "right" : "bottom" : "right"
		}
	}
	function c(h, f) {
		try {
			return a.contains(h, f)
		} catch (g) {
			return false
		}
	}
	b.menu.prototype = {
		toggle: function(f, e) {
			a(f).each(function() {
				a(this).toggleClass("t-state-default", e).toggleClass("t-state-disabled", !e)
			})
		},
		enable: function(e) {
			this.toggle(e, true)
		},
		disable: function(e) {
			this.toggle(e, false)
		},
		open: function(e) {
			var f = this;
			a(e).each(function() {
				var g = a(this);
				clearTimeout(g.data("timer"));
				g.data("timer", setTimeout(function() {
					var h = g.find(".t-group:first");
					if (h.length) {
						b.fx.play(f.effects, h, d(g));
						g.css("z-index", f.nextItemZIndex++)
					}
				}, 100))
			})
		},
		close: function(e) {
			var f = this;
			a(e).each(function(h, j) {
				var g = a(j);
				clearTimeout(g.data("timer"));
				g.data("timer", setTimeout(function() {
					var k = g.find(".t-group:first");
					if (k.length) {
						b.fx.rewind(f.effects, k, d(g), function() {
							g.css("zIndex", "");
							if (a(f.element).find(".t-group:visible").length == 0) {
								f.nextItemZIndex = 100
							}
						});
						k.find(".t-group").stop(false, true)
					}
				}, 100))
			})
		},
		mouseenter: function(g, h) {
			var f = a(h);
			if (!this.openOnClick || this.clicked) {
				if (!c(h, g.relatedTarget)) {
					this.triggerEvent("open", f);
					this.open(f);
					var j = f.parent().closest(".t-item")[0];
					if (j && !c(j, g.relatedTarget)) {
						this.mouseenter(g, j)
					}
				}
			}
			if (this.openOnClick && this.clicked) {
				this.triggerEvent("close", f);
				f.siblings().each(a.proxy(function(e, k) {
					this.close(a(k))
				}, this))
			}
		},
		mouseleave: function(g, h) {
			if (!this.openOnClick && !c(h, g.relatedTarget)) {
				var f = a(h);
				this.triggerEvent("close", f);
				this.close(f);
				var j = f.parent().closest(".t-item")[0];
				if (j && !c(j, g.relatedTarget)) {
					this.mouseleave(g, j)
				}
			}
		},
		click: function(g, h) {
			g.stopPropagation();
			var f = a(h);
			if (f.hasClass("t-state-disabled")) {
				g.preventDefault();
				return
			}
			if (b.trigger(this.element, "select", {
				item: f[0]
			})) {
				g.preventDefault();
				return
			}
			if (!f.parent().hasClass("t-menu") || !this.openOnClick) {
				return
			}
			g.preventDefault();
			this.clicked = true;
			this.triggerEvent("open", f);
			this.open(f)
		},
		documentClick: function(f, g) {
			if (a.contains(this.element, f.target)) {
				return
			}
			if (this.clicked) {
				this.clicked = false;
				a(this.element).children(".t-item").each(a.proxy(function(e, h) {
					this.close(a(h))
				}, this))
			}
		},
		hasChildren: function(e) {
			return e.find(".t-group:first").length
		},
		triggerEvent: function(f, e) {
			if (this.hasChildren(e)) {
				b.trigger(this.element, f, {
					item: e[0]
				})
			}
		}
	};
	a.fn.tMenu = function(e) {
		return b.create(this, {
			name: "tMenu",
			init: function(f, g) {
				return new b.menu(f, g)
			},
			options: e
		})
	};
	a.fn.tMenu.defaults = {
		orientation: "horizontal",
		effects: b.fx.slide.defaults(),
		openOnClick: false
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		k = b.isTouch ? "touchstart" : "mousedown",
		m = 3;
	b.scripts.push("telerik.slider.js");
	b.slider = function(q, r) {
		r = r || {};
		var p = a(q);
		q.type = "text";
		this.element = q;
		r.val = n(l(p.val()) || n(r.val));
		r.distance = r.maxValue - r.minValue;
		a.extend(this, r);
		r.position = this.orientation == "horizontal" ? "left" : "bottom";
		r.size = this.orientation == "horizontal" ? "width" : "height";
		r.outerSize = this.orientation == "horizontal" ? "outerWidth" : "outerHeight";
		r.orientation = this.orientation;
		d(q, r);
		this.wrapper = p.closest(".t-slider");
		this.trackDiv = this.wrapper.find(".t-slider-track");
		b.slider.setTrackDivWidth(this.wrapper, r);
		this.maxSelection = this.trackDiv[r.size]();
		var u = this.maxSelection / ((this.maxValue - this.minValue) / this.smallStep);
		var s = b.slider.calculateItemsWidth(this.wrapper, r, Math.floor(this.distance / this.smallStep));
		if (r.tickPlacement != "none" && u >= 2) {
			this.trackDiv.before(e(r));
			b.slider.setItemsWidth(this.wrapper, this.trackDiv, s, r);
			b.slider.setItemsTitle(this.wrapper, r);
			b.slider.setItemsLargeTick(this.wrapper, r)
		}
		b.slider.calculateSteps.call(this, s);
		var t = {
			element: q,
			dragHandle: this.wrapper.find(".t-draghandle"),
			orientation: r.orientation,
			size: r.size,
			outerSize: r.outerSize,
			position: r.position,
			owner: this
		};
		this._setValueInRange(r.val);
		this[r.enabled ? "enable" : "disable"]();
		new b.slider.Selection(t);
		this._drag = new b.slider.Drag(t);
		this.keyMap = {
			37: h(r.smallStep),
			40: h(r.smallStep),
			39: j(r.smallStep),
			38: j(r.smallStep),
			35: o(r.maxValue),
			36: o(r.minValue),
			33: j(r.largeStep),
			34: h(r.largeStep)
		};
		b.bind(this, {
			slide: this.onSlide,
			change: this.onChange,
			load: this.onLoad
		})
	};
	a.extend(b.slider, {
		setTrackDivWidth: function(s, p) {
			var q = s.find(".t-slider-track");
			var r = n(q.css(p.position)) * 2;
			q[p.size]((s[p.size]() - 2) - r)
		},
		setItemsWidth: function(y, x, v, u) {
			var s = Math.floor(u.distance / u.smallStep),
				r = y.find(".t-tick"),
				w = 0,
				t = x[u.size](),
				p = a.extend([], v);
			if (u.orientation == "horizontal") {
				for (var q = 0; q < r.length - 2; q++) {
					a(r[q + 1])[u.size](p[q])
				}
			} else {
				p = p.reverse();
				for (var q = 2; q < r.length; q++) {
					a(r[q - 1])[u.size](p[q])
				}
			}
			if (u.orientation == "horizontal") {
				a(r[0]).addClass("t-first")[u.size](p[s]);
				a(r[r.length - 1]).addClass("t-last")[u.size](p[s - 1])
			} else {
				a(r[r.length - 1]).addClass("t-first")[u.size](p[0]);
				a(r[0]).addClass("t-last")[u.size](p[1])
			}
			if (u.distance % u.smallStep != 0 && u.orientation == "vertical") {
				for (var q = 0; q < p.length; q++) {
					w += v[q]
				}
				y.find(".t-slider-items").css("padding-top", 29 + (t - w))
			}
		},
		setItemsTitle: function(t, r) {
			var q = t.find(".t-tick"),
				s = r.minValue;
			if (r.orientation == "horizontal") {
				for (var p = 0; p < q.length; p++) {
					a(q[p]).attr("title", b.formatString(r.tooltip.format || "{0}", n(s)));
					s += r.smallStep
				}
			} else {
				for (var p = q.length - 1; p >= 0; p--) {
					a(q[p]).attr("title", b.formatString(r.tooltip.format || "{0}", n(s)));
					s += r.smallStep
				}
			}
		},
		setItemsLargeTick: function(u, s) {
			if ((1000 * s.largeStep) % (1000 * s.smallStep) == 0) {
				var r = u.find(".t-tick"),
					q = {},
					t = n(s.largeStep / s.smallStep);
				if (s.orientation == "horizontal") {
					for (var p = 0; p < r.length; p = n(p + t)) {
						q = a(r[p]);
						q.addClass("t-tick-large").html(a("<span class='t-label'></span>").html(q.attr("title")))
					}
				} else {
					for (var p = r.length - 1; p >= 0; p = n(p - t)) {
						q = a(r[p]);
						q.addClass("t-tick-large").html(a("<span class='t-label'></span>").html(q.attr("title")));
						if (p != 0 && p != r.length - 1) {
							q.css("line-height", q[s.size]() + "px")
						}
					}
				}
			}
		},
		calculateItemsWidth: function(w, s, q) {
			var v = parseFloat(w.find(".t-slider-track").css(s.size)) + 1,
				t = v / s.distance;
			if ((s.distance / s.smallStep) - Math.floor(s.distance / s.smallStep) > 0) {
				v -= ((s.distance % s.smallStep) * t)
			}
			var r = v / q,
				u = [];
			for (var p = 0; p < q - 1; p++) {
				u[p] = r
			}
			u[q - 1] = u[q] = r / 2;
			return this.roundWidths(u)
		},
		roundWidths: function(q) {
			var p = 0;
			for (i = 0; i < q.length; i++) {
				p += (q[i] - Math.floor(q[i]));
				q[i] = Math.floor(q[i])
			}
			p = Math.round(p);
			return this.addAdditionalSize(p, q)
		},
		addAdditionalSize: function(p, r) {
			if (p == 0) {
				return r
			}
			var s = parseFloat(r.length - 1) / parseFloat(p == 1 ? p : p - 1);
			for (var q = 0; q < p; q++) {
				r[parseInt(Math.round(s * q))] += 1
			}
			return r
		},
		getValueFromPosition: function(s, p, t) {
			var v = Math.max(t.smallStep * (t.maxSelection / t.distance), 0),
				u = 0,
				q = (v / 2);
			if (t.orientation == "horizontal") {
				u = s - p.startPoint
			} else {
				u = p.startPoint - s
			}
			if (t.maxSelection - ((parseInt(t.maxSelection % v) - 3) / 2) < u) {
				return t.maxValue
			}
			for (var r = 0; r < t._pixelStepsArray.length; r++) {
				if (Math.abs(t._pixelStepsArray[r] - u) - 1 <= q) {
					return n(t._valuesArray[r])
				}
			}
		},
		getDragableArea: function(t, p, s) {
			var q = t.offset().left,
				r = t.offset().top;
			return {
				startPoint: s == "horizontal" ? q : r + p,
				endPoint: s == "horizontal" ? q + p : r
			}
		},
		calculateSteps: function(s) {
			var u = this,
				v = u.minValue,
				t = 0,
				q = Math.ceil(u.distance / u.smallStep),
				p = 1;
			q += (u.distance / u.smallStep) % 1 == 0 ? 1 : 0;
			s.splice(0, 0, s.pop() * 2);
			s.splice(q, 1, s.pop() * 2);
			u._pixelStepsArray = [t];
			u._valuesArray = [v];
			if (q == 0) {
				return
			}
			while (p < q) {
				t += (s[p - 1] + s[p]) / 2;
				u._pixelStepsArray[p] = t;
				u._valuesArray[p] = v += u.smallStep;
				p++
			}
			var r = u.distance % u.smallStep == 0 ? q - 1 : q;
			u._pixelStepsArray[r] = u.maxSelection;
			u._valuesArray[r] = u.maxValue
		}
	});

	function j(p) {
		return function(q) {
			return q + p
		}
	}
	function h(p) {
		return function(q) {
			return q - p
		}
	}
	function o(p) {
		return function() {
			return p
		}
	}
	function l(p) {
		return p.replace(b.cultureInfo.numericdecimalseparator, ".")
	}
	function n(q) {
		(q + "").replace(b.cultureInfo.numericdecimalseparator, ".");
		q = parseFloat(q, 10);
		var p = Math.pow(10, m || 0);
		return Math.round(q * p) / p
	}
	b.slider.prototype = {
		enable: function() {
			this.wrapper.removeAttr("disabled").removeClass("t-state-disabled").addClass("t-state-default");
			var p = a.proxy(function(s) {
				if (a(s.target).hasClass("t-draghandle")) {
					return
				}
				this._drag.start(s)
			}, this);
			this.wrapper.find(".t-tick").bind(k, p).end().find(".t-slider-track").bind(k, p);
			var r = a.proxy(function(s) {
				this._setValueInRange(this._nextValueByIndex(this._valueIndex + (s * 1)))
			}, this);
			if (this.showButtons) {
				var q = a.proxy(function(s, t) {
					if (s.which == 1) {
						r(t);
						this.timeout = setTimeout(a.proxy(function() {
							this.timer = setInterval(function() {
								r(t)
							}, 60)
						}, this), 200)
					}
				}, this);
				this.wrapper.find(".t-button").unbind("mousedown").unbind("mouseup").bind("mouseup", a.proxy(function(s) {
					this._clearTimer()
				}, this)).unbind("mouseover").bind("mouseover", function(s) {
					a(s.currentTarget).addClass("t-state-hover")
				}).unbind("mouseout").bind("mouseout", a.proxy(function(s) {
					a(s.currentTarget).removeClass("t-state-hover");
					this._clearTimer()
				}, this)).eq(0).bind("mousedown", a.proxy(function(s) {
					q(s, 1);
					s.preventDefault()
				}, this)).end().eq(1).bind("mousedown", a.proxy(function(s) {
					q(s, -1);
					s.preventDefault()
				}, this))
			}
			this.wrapper.find(".t-draghandle").bind({
				keydown: a.proxy(this._keydown, this)
			});
			this.enabled = true
		},
		disable: function() {
			this.wrapper.attr("disabled", "disabled").removeClass("t-state-default").addClass("t-state-disabled");
			var p = b.preventDefault;
			this.wrapper.find(".t-button").unbind("mousedown").bind("mousedown", p).unbind("mouseup").bind("mouseup", p).unbind("mouseleave").bind("mouseleave", p).unbind("mouseover").bind("mouseover", p);
			this.wrapper.find(".t-tick").unbind(k).end().find(".t-slider-track").unbind(k);
			this.wrapper.find(".t-draghandle").unbind("keydown").bind("keydown", p);
			this.enabled = false
		},
		_nextValueByIndex: function(q) {
			var p = this._valuesArray.length;
			return this._valuesArray[Math.max(0, Math.min(q, p - 1))]
		},
		_update: function(q) {
			var p = this.value() != q;
			this.value(q);
			if (p) {
				b.trigger(this.element, "change", {
					value: this.val
				})
			}
		},
		value: function(p) {
			p = n(p);
			if (isNaN(p)) {
				return this.val
			}
			if (p >= this.minValue && p <= this.maxValue) {
				if (this.val != p) {
					a(this.element).attr("value", n(l(b.formatString("{0:N}", p))));
					this.val = p;
					this.refresh()
				}
			}
		},
		refresh: function() {
			b.trigger(this.element, "t:moveSelection", {
				value: this.val
			})
		},
		_clearTimer: function(p) {
			clearTimeout(this.timeout);
			clearInterval(this.timer)
		},
		_keydown: function(p) {
			if (p.keyCode in this.keyMap) {
				this._setValueInRange(this.keyMap[p.keyCode](this.val));
				p.preventDefault()
			}
		},
		_setValueInRange: function(p) {
			p = n(p);
			if (isNaN(p)) {
				this._update(this.minValue);
				return
			}
			p = Math.max(p, this.minValue);
			p = Math.min(p, this.maxValue);
			this._update(p)
		}
	};
	b.slider.Selection = function(s) {
		var p = a(s.element),
			t = s.owner;

		function r(z) {
			var y = z - t.minValue,
				v = t._valueIndex = Math.ceil(n(y / t.smallStep)),
				w = t._pixelStepsArray[v],
				x = t.trackDiv.find(".t-slider-selection"),
				u = parseInt(s.dragHandle[s.outerSize]() / 2, 10) + 1;
			x[s.size](w);
			s.dragHandle.css(s.position, w - u)
		}
		r(t.val);
		var q = function(u) {
				r(n(u.value))
			};
		p.bind({
			change: q,
			slide: q,
			"t:moveSelection": q
		})
	};
	b.slider.Drag = function(p) {
		p.dragHandleSize = p.dragHandle[p.outerSize]();
		a.extend(this, p);
		this.draggable = new b.draggable({
			distance: 0,
			owner: p.dragHandle,
			scope: p.element.id,
			start: a.proxy(this._start, this),
			drag: a.proxy(this.drag, this),
			stop: a.proxy(this.stop, this)
		})
	};
	b.slider.Drag.prototype = {
		start: function(p) {
			var q = b.touchLocation(p);
			this.draggable._startDrag(p.currentTarget, q);
			this.draggable._start(p);
			this.draggable._drag(p)
		},
		_start: function(p) {
			if (!this.owner.enabled) {
				return false
			}
			a(this.element).unbind("mouseover");
			this.val = n(a(this.element).val());
			this.dragableArea = b.slider.getDragableArea(this.owner.trackDiv, this.owner.maxSelection, this.orientation);
			this.step = Math.max(this.owner.smallStep * (this.owner.maxSelection / this.owner.distance), 0);
			this.selectionStart = this.owner.selectionStart;
			this.selectionEnd = this.owner.selectionEnd;
			this.oldVal = this.val;
			this.format = this.owner.tooltip.format || "{0}";
			if (this.type) {
				this.owner._setZIndex(this.type)
			}
			if (this.owner.tooltip.enabled) {
				this.tooltipDiv = a("<div class='t-widget t-tooltip'><!-- --></div>").appendTo(document.body);
				if (this.type) {
					var r = b.formatString(this.format, this.selectionStart),
						q = b.formatString(this.format, this.selectionEnd);
					this.tooltipDiv.html(r + " - " + q)
				} else {
					var s = "t-callout-";
					if (this.orientation == "horizontal") {
						if (this.owner.tickPlacement == "topLeft") {
							s += "n"
						} else {
							s += "s"
						}
					} else {
						if (this.owner.tickPlacement == "topLeft") {
							s += "w"
						} else {
							s += "e"
						}
					}
					this.tooltipInnerDiv = "<div class='t-callout " + s + "'><!-- --></div>";
					this.tooltipDiv.html(b.formatString(this.owner.tooltip.format || "{0}", this.val) + this.tooltipInnerDiv)
				}
				this.moveTooltip()
			}
		},
		drag: function(p) {
			var s = b.touchLocation(p);
			if (this.orientation == "horizontal") {
				this.val = this.horizontalDrag(s.x)
			} else {
				this.val = this.verticalDrag(s.y)
			}
			if (this.oldVal != this.val) {
				this.oldVal = this.val;
				if (this.type) {
					if (this.type == "firstHandle") {
						if (this.val < this.selectionEnd) {
							this.selectionStart = this.val
						} else {
							this.selectionStart = this.selectionEnd = this.val
						}
					} else {
						if (this.val > this.selectionStart) {
							this.selectionEnd = this.val
						} else {
							this.selectionStart = this.selectionEnd = this.val
						}
					}
					b.trigger(this.element, "slide", {
						values: [this.selectionStart, this.selectionEnd]
					});
					if (this.owner.tooltip.enabled) {
						var r = b.formatString(this.format, this.selectionStart),
							q = b.formatString(this.format, this.selectionEnd);
						this.tooltipDiv.html(r + " - " + q)
					}
				} else {
					b.trigger(this.element, "slide", {
						value: this.val
					});
					if (this.owner.tooltip.enabled) {
						this.tooltipDiv.html(b.formatString(this.format, this.val) + this.tooltipInnerDiv)
					}
				}
				if (this.owner.tooltip.enabled) {
					this.moveTooltip()
				}
			}
		},
		stop: function(p) {
			if (b.isTouch) {
				p.preventDefault()
			}
			if (p.keyCode == 27) {
				this.owner.refresh()
			} else {
				if (this.type) {
					this.owner._update(this.selectionStart, this.selectionEnd)
				} else {
					this.owner._update(this.val)
				}
			}
			if (this.owner.tooltip.enabled) {
				this.tooltipDiv.remove()
			}
			a(this.element).bind("mouseover");
			return false
		},
		moveTooltip: function() {
			var w = this,
				x = 0,
				t = 0,
				u = 4,
				p = w.tooltipDiv.find(".t-callout");
			if (w.type) {
				var r = w.owner.wrapper.find(".t-draghandle"),
					s = r.eq(0).offset(),
					v = r.eq(1).offset();
				if (w.orientation == "horizontal") {
					x = v.top;
					t = s.left + ((v.left - s.left) / 2)
				} else {
					x = s.top + ((v.top - s.top) / 2);
					t = v.left
				}
			} else {
				var q = w.dragHandle.offset();
				x = q.top;
				t = q.left
			}
			if (w.orientation == "horizontal") {
				t -= Math.round((w.tooltipDiv.outerWidth() - w.dragHandle[w.outerSize]()) / 2);
				x -= w.tooltipDiv.outerHeight() + p.height() + u
			} else {
				x -= Math.round((w.tooltipDiv.outerHeight() - w.dragHandle[w.outerSize]()) / 2);
				t -= w.tooltipDiv.outerWidth() + p.width() + u
			}
			w.tooltipDiv.css({
				top: x,
				left: t
			})
		},
		horizontalDrag: function(q) {
			var p = 0;
			if (this.dragableArea.startPoint < q && q < this.dragableArea.endPoint) {
				p = b.slider.getValueFromPosition(q, this.dragableArea, this.owner)
			} else {
				if (q >= this.dragableArea.endPoint) {
					p = this.owner.maxValue
				} else {
					p = this.owner.minValue
				}
			}
			return p
		},
		verticalDrag: function(q) {
			var p = 0;
			if (this.dragableArea.startPoint > q && q > this.dragableArea.endPoint) {
				p = b.slider.getValueFromPosition(q, this.dragableArea, this.owner)
			} else {
				if (q <= this.dragableArea.endPoint) {
					p = this.owner.maxValue
				} else {
					p = this.owner.minValue
				}
			}
			return p
		}
	};

	function g(r, q) {
		var p = a(q),
			s = r.orientation == "horizontal" ? " t-slider-horizontal" : " t-slider-vertical",
			u;
		if (r.tickPlacement == "bottomRight") {
			u = " t-slider-bottomright"
		} else {
			if (r.tickPlacement == "topLeft") {
				u = " t-slider-topleft"
			}
		}
		var t = r.style ? r.style : p.attr("style");
		return new b.stringBuilder().cat("<div class='t-widget t-slider").cat(s).catIf(" ", p.attr("class"), p.attr("class")).cat("'").catIf(" style='", t, "'", t).cat(">").cat("<div class='t-slider-wrap").catIf(" t-slider-buttons", r.showButtons).catIf(u, u).cat("'></div></div>").string()
	}
	function c(r, s) {
		var p, q = r.orientation == "horizontal";
		if (s == "increase") {
			p = q ? "t-arrow-next" : "t-arrow-up"
		} else {
			p = q ? "t-arrow-prev" : "t-arrow-down"
		}
		return new b.stringBuilder().cat("<a ").cat("class='t-button ").cat("t-button-" + s).cat("'><span class='t-icon ").cat(p).cat("' title='").cat(r[s + "ButtonTitle"]).cat("'>").cat(r[s + "ButtonTitle"]).cat("</span></a>").string()
	}
	function e(p) {
		return new b.stringBuilder().cat("<ul class='t-reset t-slider-items'>").rep("<li class='t-tick'>&nbsp;</li>", (Math.floor((p.distance / p.smallStep).toFixed(3), 10) + 1)).cat("</ul>").string()
	}
	function f(p) {
		var q = p.is("input") ? 1 : 2;
		return new b.stringBuilder().cat("<div class='t-slider-track'>").cat("<div class='t-slider-selection'><!-- --></div>").cat("<a href='javascript:void(0)' class='t-draghandle' title='Drag'>Drag</a>").catIf("<a href='javascript:void(0)' class='t-draghandle t-draghandle1' title='Drag'>Drag</a>", q > 1).cat("</div>").string()
	}
	function d(q, r) {
		var p = a(q);
		p.val(r.val);
		p.wrap(g(r, q)).hide();
		if (r.showButtons) {
			p.before(c(r, "increase")).before(c(r, "decrease"))
		}
		p.before(f(p))
	}
	a.fn.tSlider = function(p) {
		return b.create(this, {
			name: "tSlider",
			init: function(q, r) {
				return new b.slider(q, r)
			},
			options: p
		})
	};
	a.fn.tSlider.defaults = {
		enabled: true,
		minValue: 0,
		maxValue: 10,
		smallStep: 1,
		largeStep: 5,
		showButtons: true,
		increaseButtonTitle: "Increase",
		decreaseButtonTitle: "Decrease",
		orientation: "horizontal",
		tickPlacement: "both",
		tooltip: {
			enabled: true,
			format: "{0}"
		}
	};
	b.rangeSlider = function(q, t) {
		var p = a(q),
			r = a(q).find("input");
		t = t || {};
		r[0].type = "text";
		r[1].type = "text";
		t.selectionStart = n(l(r.eq(0).val()) || t.selectionStart);
		t.selectionEnd = n(l(r.eq(1).val()) || t.selectionEnd);
		this.values(t.selectionStart, t.selectionEnd);
		this.element = q;
		t.distance = t.maxValue - t.minValue;
		a.extend(this, t);
		t.position = this.orientation == "horizontal" ? "left" : "bottom";
		t.size = this.orientation == "horizontal" ? "width" : "height";
		t.outerSize = this.orientation == "horizontal" ? "outerWidth" : "outerHeight";
		d(q, t);
		this.wrapper = p.closest(".t-slider");
		this.trackDiv = this.wrapper.find(".t-slider-track");
		b.slider.setTrackDivWidth(this.wrapper, t);
		this.maxSelection = this.trackDiv[t.size]();
		var w = this.maxSelection / ((this.maxValue - this.minValue) / this.smallStep);
		var u = b.slider.calculateItemsWidth(this.wrapper, t, Math.floor(this.distance / this.smallStep));
		if (t.tickPlacement != "none" && w >= 2) {
			this.trackDiv.before(e(t));
			b.slider.setItemsWidth(this.wrapper, this.trackDiv, u, t);
			b.slider.setItemsTitle(this.wrapper, t);
			b.slider.setItemsLargeTick(this.wrapper, t)
		}
		b.slider.calculateSteps.call(this, u);
		this._correctValues(this.selectionStart, this.selectionEnd);
		var s = {
			element: q,
			type: "firstHandle",
			dragHandle: this.wrapper.find(".t-draghandle:first"),
			orientation: t.orientation,
			size: t.size,
			outerSize: t.outerSize,
			position: t.position,
			owner: this
		};
		this._firstHandleDrag = new b.slider.Drag(s);
		new b.rangeSlider.Selection(s);
		var v = {
			element: q,
			type: "lastHandle",
			outerSize: t.outerSize,
			dragHandle: this.wrapper.find(".t-draghandle:last"),
			orientation: t.orientation,
			size: t.size,
			position: t.position,
			owner: this
		};
		this._lastHandleDrag = new b.slider.Drag(v);
		this[t.enabled ? "enable" : "disable"]();
		this.keyMap = {
			37: h(t.smallStep),
			40: h(t.smallStep),
			39: j(t.smallStep),
			38: j(t.smallStep),
			35: o(t.maxValue),
			36: o(t.minValue),
			33: j(t.largeStep),
			34: h(t.largeStep)
		};
		b.bind(this, {
			slide: this.onSlide,
			change: this.onChange,
			load: this.onLoad
		})
	};
	b.rangeSlider.prototype = {
		enable: function() {
			this.wrapper.removeAttr("disabled").removeClass("t-state-disabled").addClass("t-state-default");
			var p = a.proxy(function(r) {
				if (a(r.target).hasClass("t-draghandle")) {
					return
				}
				var s = b.touchLocation(r),
					t = this.orientation == "horizontal" ? s.x : s.y,
					q = b.slider.getDragableArea(this.trackDiv, this.maxSelection, this.orientation),
					u = b.slider.getValueFromPosition(t, q, this);
				if (u < this.selectionStart) {
					this._firstHandleDrag.start(r)
				} else {
					if (u > this.selectionEnd) {
						this._lastHandleDrag.start(r)
					} else {
						if (u - this.selectionStart <= this.selectionEnd - u) {
							this._firstHandleDrag.start(r)
						} else {
							this._lastHandleDrag.start(r)
						}
					}
				}
			}, this);
			this.wrapper.find(".t-tick").bind(k, p).end().find(".t-slider-track").bind(k, p);
			this.wrapper.find(".t-draghandle").eq(0).bind({
				keydown: a.proxy(function(q) {
					this._keydown(q, true)
				}, this)
			}).end().eq(1).bind({
				keydown: a.proxy(function(q) {
					this._keydown(q, false)
				}, this)
			});
			this.enabled = true
		},
		disable: function() {
			this.wrapper.attr("disabled", "disabled").removeClass("t-state-default").addClass("t-state-disabled");
			this.wrapper.find(".t-tick").unbind(k).end().find(".t-slider-track").unbind(k);
			this.wrapper.find(".t-draghandle").unbind("keydown").bind("keydown", b.preventDefault);
			this.enabled = false
		},
		_keydown: function(p, q) {
			var s = this.selectionStart,
				r = this.selectionEnd;
			if (p.keyCode in this.keyMap) {
				if (q) {
					s = this.keyMap[p.keyCode](s);
					if (s > r) {
						r = s
					}
				} else {
					r = this.keyMap[p.keyCode](r);
					if (r < s) {
						s = r
					}
				}
				this._setValueInRange(s, r);
				p.preventDefault()
			}
		},
		_update: function(r, q) {
			var s = this.values();
			var p = s[0] != r || s[1] != q;
			this.values(r, q);
			if (p) {
				b.trigger(this.element, "change", {
					values: [r, q]
				})
			}
		},
		values: function(q, p) {
			var r = [this.selectionStart, this.selectionEnd];
			q = n(q);
			if (isNaN(q)) {
				return r
			}
			p = n(p);
			if (isNaN(p)) {
				return r
			}
			if (q >= this.minValue && q <= this.maxValue && p >= this.minValue && p <= this.maxValue && q <= p) {
				if (this.selectionStart != q || this.selectionEnd != p) {
					a(this.element).find("input").eq(0).attr("value", n(l(b.formatString("{0:N}", q)))).end().eq(1).attr("value", n(l(b.formatString("{0:N}", p))));
					this.selectionStart = q;
					this.selectionEnd = p;
					this.refresh()
				}
			}
		},
		refresh: function() {
			b.trigger(this.element, "t:moveSelection", {
				values: [this.selectionStart, this.selectionEnd]
			});
			if (this.selectionStart == this.maxValue && this.selectionEnd == this.maxValue) {
				this._setZIndex("firstHandle")
			}
		},
		_setValueInRange: function(q, p) {
			q = Math.max(q, this.minValue);
			q = Math.min(q, this.maxValue);
			p = Math.max(p, this.minValue);
			p = Math.min(p, this.maxValue);
			if (this.selectionStart == this.maxValue && this.selectionEnd == this.maxValue) {
				this._setZIndex("firstHandle")
			}
			this._update(q, p)
		},
		_correctValues: function(q, p) {
			if (q >= p) {
				this._setValueInRange(p, q)
			} else {
				this._setValueInRange(q, p)
			}
		},
		_setZIndex: function(s) {
			var p = this.wrapper.find(".t-draghandle"),
				q = p.eq(0),
				r = p.eq(1),
				t = "z-index";
			if (s == "firstHandle") {
				q.css(t, "1");
				r.css(t, "")
			} else {
				q.css(t, "");
				r.css(t, "1")
			}
		}
	};
	b.rangeSlider.Selection = function(s) {
		var t = s.owner;

		function r(C) {
			var B = C[0] - t.minValue,
				y = C[1] - t.minValue,
				A = Math.ceil(n(B / t.smallStep)),
				x = Math.ceil(n(y / t.smallStep)),
				z = t._pixelStepsArray[A],
				w = t._pixelStepsArray[x],
				u = t.wrapper.find(".t-draghandle"),
				v = parseInt(u.eq(0)[s.outerSize]() / 2, 10) + 1;
			u.eq(0).css(s.position, z - v).end().eq(1).css(s.position, w - v);
			q(z, w)
		}
		function q(y, w) {
			var u = 0,
				x = 0,
				v = t.trackDiv.find(".t-slider-selection");
			u = Math.abs(y - w);
			x = y < w ? y : w;
			v[s.size](u);
			v.css(s.position, x - 1)
		}
		r(t.values());
		var p = function(u) {
				r(u.values)
			};
		a(t.element).bind({
			change: p,
			slide: p,
			"t:moveSelection": p
		})
	};
	a.fn.tRangeSlider = function(p) {
		return b.create(this, {
			name: "tRangeSlider",
			init: function(q, r) {
				return new b.rangeSlider(q, r)
			},
			options: p
		})
	};
	a.fn.tRangeSlider.defaults = {
		enabled: true,
		minValue: 0,
		maxValue: 10,
		smallStep: 1,
		largeStep: 5,
		selectionStart: 0,
		selectionEnd: 10,
		orientation: "horizontal",
		tickPlacement: "both",
		tooltip: {
			enabled: true,
			format: "{0}"
		}
	}
})(jQuery);
(function(a) {
	var b = a.telerik,
		j = 7,
		h = /^\d+px$/i,
		g = /^\d+(\.\d+)?%$/i;
	b.scripts.push("telerik.splitter.js");

	function d(k) {
		return g.test(k)
	}
	function e(k) {
		return h.test(k)
	}
	function c(k) {
		return !d(k) && !e(k)
	}
	b.splitter = function(m, o) {
		this.element = m;
		var k = this.$element = a(m),
			r = this;
		a.extend(this, o);
		var p = this.orientation.toLowerCase() != "vertical" ? "horizontal" : "vertical",
			q = this.panes;
		this.orientation = p;
		b.bind(this, {
			load: this.onLoad,
			expand: this.onExpand,
			collapse: this.onCollapse,
			contentLoad: this.onContentLoad,
			resize: function(t) {
				t.stopPropagation();
				r.resize.call(r, t);
				if (a.isFunction(r.onResize)) {
					r.onResize.call(m, t)
				}
			}
		});
		a(window).resize(function() {
			k.trigger("resize")
		});
		var s = ".t-splitbar-draggable-" + p,
			n = ".t-splitbar .t-icon:not(.t-resize-handle)";
		var l = function(t) {
				return function(w) {
					var v = a(w.target),
						u;
					if (v.closest(".t-splitter")[0] != m) {
						return
					}
					if (v.is(".t-" + t + "-prev")) {
						u = v.parent().prev()
					} else {
						u = v.parent().next()
					}
					if (!b.trigger(m, t, {
						pane: u[0]
					})) {
						r[t](u[0])
					}
				}
			};
		k.addClass("t-widget").addClass("t-splitter").children().addClass("t-pane").each(a.proxy(function(u, v) {
			var t = a(v);
			t.data("pane", q ? q[u] : {}).toggleClass("t-scrollable", q ? q[u].scrollable !== false : true);
			this.ajaxRequest(t)
		}, this)).end().trigger("resize").delegate(s, "mouseenter", function() {
			a(this).addClass("t-splitbar-" + p + "-hover")
		}).delegate(s, "mouseleave", function() {
			a(this).removeClass("t-splitbar-" + p + "-hover")
		}).delegate(n, "mouseenter", b.hover).delegate(n, "mouseleave", b.leave).delegate(".t-splitbar .t-collapse-next, .t-splitbar .t-collapse-prev", "click", l("collapse")).delegate(".t-splitbar .t-expand-next, .t-splitbar .t-expand-prev", "click", l("expand")).delegate(".t-splitbar", "dblclick", function(v) {
			var t = a(v.target),
				w = function(y, x) {
					if (!b.trigger(m, y, {
						pane: x[0]
					})) {
						r[y](x[0])
					}
				};
			if (t.closest(".t-splitter")[0] != m) {
				return
			}
			var u = t.children(".t-icon:not(.t-resize-handle)");
			if (u.length !== 1) {
				return
			}
			if (u.is(".t-collapse-prev")) {
				w("collapse", t.prev())
			} else {
				if (u.is(".t-collapse-next")) {
					w("collapse", t.next())
				} else {
					if (u.is(".t-expand-prev")) {
						w("expand", t.prev())
					} else {
						if (u.is(".t-expand-next")) {
							w("expand", t.next())
						}
					}
				}
			}
		}).parent().closest(".t-splitter").bind("resize", function() {
			k.trigger("resize")
		});
		this.resizing = new b.splitter.PaneResizing(this)
	};

	function f(k, l) {
		return function(m, o) {
			var n = a(m).data("pane");
			if (arguments.length == 1) {
				return n[k]
			}
			n[k] = o;
			if (l) {
				this.$element.trigger("resize")
			}
		}
	}
	b.splitter.prototype = {
		toggle: function(q, l) {
			var q = a(q),
				s = q.prev(".t-splitbar"),
				o = q.next(".t-splitbar"),
				r = q.data("pane"),
				t = q.prevAll(".t-pane:first").data("pane"),
				n = q.nextAll(".t-pane:first").data("pane"),
				p = this.orientation,
				m = "t-splitbar-" + p + "-hover",
				k = "t-splitbar-draggable-" + p;
			if (arguments.length == 1) {
				l = r.collapsed === undefined ? false : r.collapsed
			}
			s.toggleClass(k, l && r.resizable !== false && (!t || t.resizable !== false)).removeClass(m).find(l ? ".t-expand-next" : ".t-collapse-next").toggleClass("t-expand-next", !l).toggleClass("t-collapse-next", l);
			o.toggleClass(k, l && r.resizable !== false && (!n || n.resizable !== false)).removeClass(m).find(l ? ".t-expand-prev" : ".t-collapse-prev").toggleClass("t-expand-prev", !l).toggleClass("t-collapse-prev", l);
			r.collapsed = !l;
			this.$element.trigger("resize")
		},
		collapse: function(k) {
			this.toggle(k, false)
		},
		expand: function(k) {
			this.toggle(k, true)
		},
		size: f("size", true),
		minSize: f("minSize"),
		maxSize: f("maxSize"),
		ajaxOptions: function(k, l) {
			var m = this;
			return a.extend({
				type: "POST",
				dataType: "html",
				success: function(n) {
					k.html(n);
					b.trigger(m.element, "contentLoad", {
						pane: k[0]
					})
				}
			}, l)
		},
		ajaxRequest: function(m, o, l) {
			var k = a(m),
				n = k.data("pane");
			if (o || n.contentUrl) {
				k.append("<span class='t-icon t-loading t-pane-loading' />");
				a.ajax(this.ajaxOptions(k, {
					url: o || n.contentUrl,
					data: l || {}
				}))
			}
		},
		resize: function() {
			var k = this.$element,
				u = k.children(":not(.t-splitbar):not(.t-ghost-splitbar)"),
				r = this.orientation == "horizontal",
				C = k.children(".t-splitbar").length,
				A = r ? "width" : "height",
				E = k[A]();
			if (C === 0) {
				C = u.length - 1;
				for (var q = 0; q < C; q++) {
					var l = u.eq(q),
						w = l.data("pane"),
						t = l.next().data("pane");
					if (!t) {
						continue
					}
					var s = (w.resizable !== false) && (t.resizable !== false),
						B = new b.stringBuilder();
					B.catIconIf = function(G, F) {
						if (F) {
							this.cat("<div class='t-icon ").cat(G).cat("' />")
						}
						return this
					};
					B.cat("<div class='t-splitbar t-state-default t-splitbar-").cat(this.orientation).catIf(" t-splitbar-draggable-", this.orientation, s && !w.collapsed && !t.collapsed).cat("'>").catIconIf("t-collapse-prev", w.collapsible && !w.collapsed).catIconIf("t-expand-prev", w.collapsible && w.collapsed).catIconIf("t-resize-handle", s).catIconIf("t-collapse-next", t.collapsible && !t.collapsed).catIconIf("t-expand-next", t.collapsible && t.collapsed).cat("</div>");
					l.after(B.string())
				}
			}
			E -= j * C;
			var y = 0,
				x = 0,
				n = a();
			u.css({
				position: "absolute",
				top: 0
			})[A](function() {
				var F = a(this).data("pane"),
					G;
				if (!F.collapsed && F.size && F.size.indexOf("NaN") != -1) {
					return false
				} else {
					if (F.collapsed) {
						G = 0
					} else {
						if (c(F.size)) {
							n = n.add(this);
							return
						} else {
							G = parseInt(F.size, 10);
							if (d(F.size)) {
								G = Math.floor(G * E / 100)
							}
						}
					}
					x++;
					y += G;
					return G
				}
			});
			E -= y;
			var o = n.length,
				p = Math.floor(E / o);
			n.slice(0, o - 1).css(A, p).end().eq(o - 1).css(A, E - (o - 1) * p);
			var D = 0,
				m = r ? "height" : "width",
				v = r ? "left" : "top",
				z = r ? "offsetWidth" : "offsetHeight";
			k.children().css(m, k[m]()).each(function(G, F) {
				F.style[v] = Math.floor(D) + "px";
				D += F[z]
			})
		}
	};
	b.splitter.PaneResizing = function(k) {
		this.owner = k;
		new b.draggable({
			distance: 0,
			owner: k.element,
			selector: ".t-splitbar-draggable-horizontal, .t-splitbar-draggable-vertical",
			scope: k.element.id,
			start: a.proxy(this.start, this),
			drag: a.proxy(this.drag, this),
			stop: a.proxy(this.stop, this)
		})
	};
	b.splitter.PaneResizing.prototype = {
		start: function(l) {
			if (b.isTouch) {
				l.stopImmediatePropagation()
			}
			var A = l.$draggable,
				u = A.prev(),
				r = A.next(),
				v = u.data("pane"),
				s = r.data("pane"),
				m = this.owner.orientation === "horizontal",
				z = m ? "width" : "height",
				y = m ? "offsetWidth" : "offsetHeight",
				k = m ? "height" : "width",
				n = b.touchLocation(l);
			this.positioningProperty = m ? "left" : "top";
			this.mousePositioningProperty = m ? "x" : "y";
			this.previousPane = u;
			this.nextPane = r;
			this.initialSplitBarPosition = parseInt(A[0].style[this.positioningProperty]);
			this.initialMousePosition = n[this.mousePositioningProperty];
			this.ghostSplitBar = a("<div class='t-ghost-splitbar t-ghost-splitbar-" + this.owner.orientation + " t-state-default' />").css(k, l.$draggable[k]()).css(this.positioningProperty, this.initialSplitBarPosition).appendTo(this.owner.$element);
			var t = parseInt(u[0].style[this.positioningProperty]),
				o = parseInt(r[0].style[this.positioningProperty]) + r[0][y] - j,
				C = this.owner.$element.css(z),
				B = function(E) {
					var D = parseInt(E, 10);
					return (e(E) ? D : (C * D) / 100) || 0
				},
				x = B(v.minSize),
				w = B(v.maxSize) || o - t,
				q = B(s.minSize),
				p = B(s.maxSize) || o - t;
			this.maxSize = Math.min(o - q, t + w);
			this.minSize = Math.max(t + x, o - p);
			a(document.body).css("cursor", A.css("cursor"))
		},
		drag: function(k) {
			if (b.isTouch) {
				k.stopImmediatePropagation()
			}
			var l = b.touchLocation(k),
				m = Math.min(this.maxSize, Math.max(this.minSize, this.initialSplitBarPosition + (l[this.mousePositioningProperty] - this.initialMousePosition)));
			this.ghostSplitBar.toggleClass("t-restricted-size-" + this.owner.orientation, m == this.maxSize || m == this.minSize)[0].style[this.positioningProperty] = m + "px"
		},
		stop: function(k) {
			if (b.isTouch) {
				k.stopImmediatePropagation()
			}
			if (k.keyCode !== 27) {
				var m = parseInt(this.ghostSplitBar[0].style[this.positioningProperty]),
					n = this.owner.orientation === "horizontal",
					u = n ? "width" : "height",
					t = n ? "offsetWidth" : "offsetHeight",
					q = this.previousPane.data("pane"),
					o = this.nextPane.data("pane"),
					r = m - parseInt(this.previousPane[0].style[this.positioningProperty]),
					p = parseInt(this.nextPane[0].style[this.positioningProperty]) + this.nextPane[0][t] - m - j,
					v = this.owner.$element[u](),
					s = !b.isTouch || (b.isTouch && !isNaN(r) && !isNaN(p));
				v -= j * this.owner.$element.children(".t-splitbar").length;
				var l = this.owner.$element.children(".t-pane").filter(function() {
					return c(a(this).data("pane").size)
				}).length;
				if (!c(q.size) || l > 1) {
					if (c(q.size)) {
						l--
					}
					q.size = r + "px"
				}
				if (!c(o.size) || l > 1) {
					o.size = p + "px"
				}
			}
			this.ghostSplitBar.remove();
			if (k.keyCode !== 27 && s) {
				this.owner.$element.trigger("resize")
			}
			a(document.body).css("cursor", "");
			return false
		}
	};
	a.fn.tSplitter = function(k) {
		return b.create(this, {
			name: "tSplitter",
			init: function(l, m) {
				return new b.splitter(l, m)
			},
			options: k
		})
	};
	a.fn.tSplitter.defaults = {
		orientation: "horizontal"
	}
})(jQuery);
(function(a) {
	var b = a.telerik;
	b.scripts.push("telerik.tabstrip.js");
	b.tabstrip = function(e, g) {
		this.element = e;
		var d = a(e);
		this.$contentElements = d.find("> .t-content");
		a.extend(this, g);
		if (this.contentUrls) {
			d.find(".t-tabstrip-items > .t-item").each(a.proxy(function(j, k) {
				a(k).find(".t-link").data("ContentUrl", this.contentUrls[j])
			}, this))
		}
		var f = ".t-tabstrip-items > .t-item:not(.t-state-disabled)";
		d.delegate(f, "mouseenter", b.hover).delegate(f, "mouseleave", b.leave).delegate(f, g.activateEvent, b.delegate(this, this._click)).delegate(".t-tabstrip-items > .t-state-disabled .t-link", "click", b.preventDefault);
		b.bind(this, {
			select: a.proxy(function(j) {
				if (j.target == this.element && this.onSelect) {
					a.proxy(this.onSelect, this.element)(j)
				}
			}, this),
			contentLoad: this.onContentLoad,
			error: this.onError,
			load: this.onLoad
		});
		var h = d.find("li.t-state-active"),
			c = a(this.getContentElement(h.parent().children().index(h)));
		if (c.length > 0 && c[0].childNodes.length == 0) {
			this.activateTab(h.eq(0))
		}
	};
	a.extend(b.tabstrip.prototype, {
		select: function(c) {
			a(c).each(a.proxy(function(e, f) {
				var d = a(f);
				if (d.is(".t-state-disabled,.t-state-active")) {
					return
				}
				this.activateTab(d)
			}, this))
		},
		enable: function(c) {
			a(c).addClass("t-state-default").removeClass("t-state-disabled")
		},
		disable: function(c) {
			a(c).removeClass("t-state-default").removeClass("t-state-active").addClass("t-state-disabled")
		},
		reload: function(c) {
			var d = this;
			a(c).each(function() {
				var e = a(this),
					f = e.find(".t-link").data("ContentUrl");
				if (f) {
					d.ajaxRequest(e, a(d.getContentElement(e.index())), null, f)
				}
			})
		},
		_click: function(g, h) {
			var d = a(h),
				f = d.find(".t-link"),
				j = f.attr("href"),
				c = a(this.getContentElement(d.index()));
			if (d.is(".t-state-disabled,.t-state-active")) {
				g.preventDefault();
				return
			}
			if (b.trigger(this.element, "select", {
				item: d[0],
				contentElement: c[0]
			})) {
				g.preventDefault()
			} else {
				var k = f.data("ContentUrl") || (j && (j.charAt(j.length - 1) == "#" || j.indexOf("#" + this.element.id + "-") != -1));
				if (!j || k || (c.length > 0 && c[0].childNodes.length == 0)) {
					g.preventDefault()
				} else {
					return
				}
				if (this.activateTab(d)) {
					g.preventDefault()
				}
			}
		},
		activateTab: function(e) {
			var h = e.parent().children().removeClass("t-state-active").addClass("t-state-default").index(e);
			e.removeClass("t-state-default").addClass("t-state-active");
			var d = this.$contentElements;
			if (d.length == 0) {
				return false
			}
			var f = d.filter(".t-state-active");
			var c = a(this.getContentElement(h));
			var k = this;
			if (c.length == 0) {
				f.removeClass("t-state-active");
				b.fx.rewind(k.effects, f, {});
				return false
			}
			var g = c.is(":empty"),
				j = function() {
					c.addClass("t-state-active");
					b.fx.play(k.effects, c, {})
				};
			f.removeClass("t-state-active").stop(false, true);
			b.fx.rewind(k.effects, f, {}, function() {
				if (e.hasClass("t-state-active")) {
					if (!g) {
						j()
					} else {
						k.ajaxRequest(e, c, function() {
							if (e.hasClass("t-state-active")) {
								j()
							}
						})
					}
				}
			});
			return true
		},
		getSelectedTabIndex: function() {
			return a(this.element).find("li.t-state-active").index()
		},
		getContentElement: function(f) {
			if (isNaN(f - 0)) {
				return
			}
			var c = this.$contentElements,
				e = new RegExp("-" + (f + 1) + "$");
			for (var d = 0, g = c.length; d < g; d++) {
				if (e.test(c[d].id)) {
					return c[d]
				}
			}
		},
		ajaxRequest: function(d, c, f, k) {
			if (d.find(".t-loading").length) {
				return
			}
			var e = d.find(".t-link"),
				g = {},
				j = null,
				h = setTimeout(function() {
					j = a('<span class="t-icon t-loading"></span>').prependTo(e)
				}, 100);
			a.ajax({
				type: "GET",
				cache: false,
				url: k || e.data("ContentUrl") || e.attr("href"),
				dataType: "html",
				data: g,
				error: a.proxy(function(m, l) {
					if (b.ajaxError(this.element, "error", m, l)) {
						return
					}
				}, this),
				complete: function() {
					clearTimeout(h);
					if (j !== null) {
						j.remove()
					}
				},
				success: a.proxy(function(l, m) {
					c.html(l);
					if (f) {
						f.call(this, c)
					}
					b.trigger(this.element, "contentLoad", {
						item: d[0],
						contentElement: c[0]
					})
				}, this)
			})
		}
	});
	a.fn.tTabStrip = function(c) {
		return b.create(this, {
			name: "tTabStrip",
			init: function(d, e) {
				return new b.tabstrip(d, e)
			},
			options: c
		})
	};
	a.fn.tTabStrip.defaults = {
		activateEvent: "click",
		effects: b.fx.toggle.defaults()
	}
})(jQuery);
(function(a, j) {
	var b = a.telerik,
		c = a.extend,
		f = ">.t-group,>.t-animation-container>.t-group",
		h = "t-treeview",
		g;
	b.scripts.push("telerik.treeview.js");

	function d(m) {
		m.find(".t-plus").each(function() {
			var n = a(this.parentNode);
			n.parent().data("loaded", n.next(".t-group").length > 0)
		})
	}
	function l(n) {
		var r = n.find(">div"),
			o = n.find(">ul"),
			q = r.find(">.t-icon"),
			m = r.find(">.t-in"),
			p;
		if (n.hasClass("t-treeview")) {
			return
		}
		if (!r.length) {
			r = a("<div />").prependTo(n)
		}
		if (!q.length && o.length) {
			q = a("<span class='t-icon' />").prependTo(r)
		} else {
			if (!o.length || !o.children().length) {
				q.remove();
				o.remove()
			}
		}
		if (!m.length) {
			m = a("<span class='t-in' />").appendTo(r)[0];
			currentNode = r[0].nextSibling;
			m = r.find(".t-in")[0];
			while (currentNode && currentNode.nodeName.toLowerCase() != "ul") {
				p = currentNode;
				currentNode = currentNode.nextSibling;
				m.appendChild(p)
			}
		}
	}
	var e = {
		wrapperCssClass: function(m, o) {
			var p = "t-item",
				n = o.itemIndex;
			if (m.isFirstLevel && n == 0) {
				p += " t-first"
			}
			if (n == m.itemsCount - 1) {
				p += " t-last"
			}
			return p
		},
		cssClass: function(m, p) {
			var q = "",
				o = p.itemIndex,
				n = m.itemsCount - 1;
			if (m.isFirstLevel && o == 0) {
				q += "t-top "
			}
			if (o == 0 && o != n) {
				q += "t-top"
			} else {
				if (o == n) {
					q += "t-bot"
				} else {
					q += "t-mid"
				}
			}
			return q
		},
		toggleButtonClass: function(m) {
			var n = "t-icon";
			if (m.isExpanded !== true) {
				n += " t-plus"
			} else {
				n += " t-minus"
			}
			if (m.enabled === false) {
				n += "-disabled"
			}
			return n
		}
	};

	function k(n, m, o) {
		var q = n.find(">div"),
			p = n.find(">ul");
		if (n.hasClass("t-treeview")) {
			return
		}
		if (!o) {
			o = {
				isExpanded: !(p.css("display") == "none"),
				itemIndex: n.index(),
				enabled: !q.find(">.t-in").hasClass("t-state-disabled")
			}
		}
		if (!m) {
			m = {
				isFirstLevel: n.parent().parent().hasClass(h),
				itemsCount: n.parent().children().length
			}
		}
		n.removeClass("t-first t-last").addClass(e.wrapperCssClass(m, o));
		q.removeClass("t-top t-mid t-bot").addClass(e.cssClass(m, o));
		if (p.length) {
			q.find(">.t-icon").removeClass("t-plus t-minus t-plus-disabled t-minus-disabled").addClass(e.toggleButtonClass(o));
			p.addClass("t-group")
		}
	}
	g = b.treeview = function(o, p) {
		this.element = o;
		var m = a(o);
		a.extend(this, p);
		var n = ".t-in:not(.t-state-selected,.t-state-disabled)";
		a(".t-in.t-state-selected", o).live("mouseenter", b.preventDefault);
		m.delegate(n, "mouseenter", b.hover).delegate(n, "mouseleave", b.leave).delegate(n, "click", b.delegate(this, this.nodeSelect)).delegate("div:not(.t-state-disabled) .t-in", "dblclick", b.delegate(this, this.nodeClick)).delegate(":checkbox", "click", a.proxy(this.checkboxClick, this)).delegate(".t-plus, .t-minus", b.isTouch ? "touchend" : "click", b.delegate(this, this.nodeClick));
		if (this.isAjax()) {
			d(m)
		}
		if (this.dragAndDrop) {
			b.bind(this, {
				nodeDragStart: this.onNodeDragStart,
				nodeDragging: this.onNodeDragging,
				nodeDragCancelled: this.onNodeDragCancelled,
				nodeDrop: this.onNodeDrop,
				nodeDropped: this.onNodeDropped
			});
			(function(v) {
				var q = a("<div class='t-drop-clue' />");
				var r;

				function t(w) {
					if (b.trigger(v.element, "nodeDragStart", {
						item: w.$draggable.closest(".t-item")[0]
					})) {
						return false
					}
					q.appendTo(v.element)
				}
				function s(y) {
					var H;
					r = a(b.eventTarget(y));
					if (v.dragAndDrop.dropTargets && r.closest(v.dragAndDrop.dropTargets).length > 0) {
						H = "t-add"
					} else {
						if (!a.contains(v.element, r[0])) {
							H = "t-denied"
						} else {
							if (a.contains(y.$draggable.closest(".t-item")[0], r[0])) {
								H = "t-denied"
							} else {
								H = "t-insert-middle";
								q.css("visibility", "visible");
								var z = r.closest(".t-top,.t-mid,.t-bot");
								if (z.length) {
									var E = z.outerHeight(),
										F = z.offset().top,
										D = r.closest(".t-in"),
										x = E / (D.length > 0 ? 4 : 2),
										G = b.touchLocation(y),
										C = G.y < (F + x),
										B = (F + E - x) < G.y,
										w = D.length > 0 && !C && !B;
									z.siblings(".t-top,.t-mid,.t-bot").children(".t-state-hover").removeClass("t-state-hover");
									D.toggleClass("t-state-hover", w);
									q.css("visibility", w ? "hidden" : "visible");
									if (w) {
										H = "t-add"
									} else {
										var A = z.position();
										A.top += C ? 0 : E;
										q.css(A)[C ? "prependTo" : "appendTo"](r.closest(".t-item").find("> div:first"));
										if (C && z.hasClass("t-top")) {
											H = "t-insert-top"
										}
										if (B && z.hasClass("t-bot")) {
											H = "t-insert-bottom"
										}
									}
								}
							}
						}
					}
					b.trigger(v.element, "nodeDragging", {
						pageY: y.pageY,
						pageX: y.pageX,
						dropTarget: r[0],
						status: H.substring(2),
						setStatusClass: function(I) {
							H = I
						},
						item: y.$draggable.closest(".t-item")[0]
					});
					if (H.indexOf("t-insert") != 0) {
						q.css("visibility", "hidden")
					}
					b.dragCueStatus(y.$cue, H)
				}
				function u(y) {
					if (y.keyCode == 27) {
						b.trigger(v.element, "nodeDragCancelled", {
							item: y.$draggable.closest(".t-item")[0]
						})
					} else {
						var x = "over",
							w, E = b.eventTarget(y);
						if (q.css("visibility") == "visible") {
							x = q.prevAll(".t-in").length > 0 ? "after" : "before";
							w = q.closest(".t-item").find("> div")
						} else {
							if (r) {
								w = r.closest(".t-top,.t-mid,.t-bot")
							}
						}
						var A = !y.$cue.find(".t-drag-status").hasClass("t-denied"),
							z = b.trigger(v.element, "nodeDrop", {
								isValid: A,
								dropTarget: E,
								destinationItem: w.parent()[0],
								dropPosition: x,
								item: y.$draggable.closest(".t-item")[0]
							});
						if (!A) {
							return false
						}
						if (z || !a.contains(v.element, E)) {
							return !z
						}
						var D = y.$draggable.closest(".t-top,.t-mid,.t-bot");
						var B = D.parent();
						var C = D.closest(".t-group");
						if (a.contains(B[0], E)) {
							return false
						}
						if (B.hasClass("t-last")) {
							B.removeClass("t-last").prev().addClass("t-last").find("> div").removeClass("t-top t-mid").addClass("t-bot")
						}
						if (q.css("visibility") == "visible") {
							w.parent()[x](B)
						} else {
							var F = w.next(".t-group");
							if (F.length === 0) {
								F = a('<ul class="t-group" />').appendTo(w.parent());
								if (!v.isAjax()) {
									w.prepend('<span class="t-icon t-minus" />')
								} else {
									F.hide();
									v.nodeToggle(null, w.parent(), true);
									F.show()
								}
							}
							F.append(B);
							if (w.find("> .t-icon").hasClass("t-plus")) {
								v.nodeToggle(null, w.parent(), true)
							}
						}
						k(B);
						k(B.prev());
						k(B.next());
						if (C.children().length === 0) {
							C.prev("div").find(".t-plus,.t-minus").remove();
							C.remove()
						}
						if (b.isTouch) {
							w.children(".t-in").removeClass("t-state-hover")
						}
						b.trigger(v.element, "nodeDropped", {
							destinationItem: w.closest(".t-item")[0],
							dropPosition: x,
							item: D.parent(".t-item")[0]
						});
						return false
					}
				}
				new b.draggable({
					owner: v.element,
					selector: "div:not(.t-state-disabled) .t-in",
					scope: v.element.id,
					cue: function(w) {
						return b.dragCue(b.encode(w.$draggable.text()))
					},
					start: t,
					drag: s,
					stop: u,
					destroy: function(w) {
						q.remove();
						w.$cue.remove()
					}
				})
			})(this)
		}
		b.bind(this, {
			expand: this.onExpand,
			collapse: this.onCollapse,
			select: a.proxy(function(q) {
				if (q.target == this.element && this.onSelect) {
					a.proxy(this.onSelect, this.element)(q)
				}
			}, this),
			checked: this.onChecked,
			error: this.onError,
			load: this.onLoad,
			dataBinding: this.onDataBinding,
			dataBound: this.onDataBound
		})
	};
	g.prototype = {
		expand: function(m) {
			a(m, this.element).each(a.proxy(function(p, q) {
				var n = a(q);
				var o = n.find("> .t-group, > .t-content");
				if ((o.length > 0 && !o.is(":visible")) || (this.isAjax() && n.data("loaded") === false)) {
					this.nodeToggle(null, n)
				}
			}, this))
		},
		collapse: function(m) {
			a(m, this.element).each(a.proxy(function(p, q) {
				var n = a(q),
					o = n.find("> .t-group, > .t-content");
				if (o.length > 0 && o.is(":visible")) {
					this.nodeToggle(null, n)
				}
			}, this))
		},
		enable: function(m) {
			this.toggle(m, true)
		},
		disable: function(m) {
			this.toggle(m, false)
		},
		toggle: function(n, m) {
			a(n, this.element).each(a.proxy(function(q, s) {
				var o = a(s),
					r = !o.find("> .t-group, > .t-content").is(":visible");
				if (!m) {
					this.collapse(o);
					r = true
				}
				o.find("> div > .t-in").toggleClass("t-state-default", m).toggleClass("t-state-disabled", !m).end().find("> div > .t-icon").toggleClass("t-plus", r && m).toggleClass("t-plus-disabled", r && !m).toggleClass("t-minus", !r && m).toggleClass("t-minus-disabled", !r && !m);
				var p = o.find("> div > .t-checkbox > :checkbox");
				if (m) {
					p.removeAttr("disabled")
				} else {
					p.attr("disabled", "disabled")
				}
			}, this))
		},
		reload: function(m) {
			var n = this;
			a(m).each(function() {
				var o = a(this);
				o.find(".t-group").remove();
				n.ajaxRequest(o)
			})
		},
		shouldNavigate: function(n) {
			var m = a(n).closest(".t-item").find("> .t-content, > .t-group");
			var o = a(n).attr("href");
			return !((o && (o.charAt(o.length - 1) == "#" || o.indexOf("#" + this.element.id + "-") != -1)) || (m.length > 0 && m.children().length == 0))
		},
		nodeSelect: function(n, o) {
			if (!this.shouldNavigate(o)) {
				n.preventDefault()
			}
			var m = a(o);
			if (!m.hasClass(".t-state-selected") && !b.trigger(this.element, "select", {
				item: m.closest(".t-item")[0]
			})) {
				a(".t-in", this.element).removeClass("t-state-hover t-state-selected");
				m.addClass("t-state-selected")
			}
		},
		nodeToggle: function(o, m, q) {
			if (m.find(".t-minus").length == 0 && m.find(".t-plus").length == 0) {
				return
			}
			if (o != null) {
				o.preventDefault()
			}
			if (m.data("animating") || m.find("> div > .t-in").hasClass("t-state-disabled")) {
				return
			}
			m.data("animating", !q);
			var n = m.find(">.t-group, >.t-content, >.t-animation-container>.t-group, >.t-animation-container>.t-content"),
				p = !n.is(":visible");
			if (n.children().length > 0 && m.data("loaded") !== false) {
				if (!b.trigger(this.element, p ? "expand" : "collapse", {
					item: m[0]
				})) {
					m.find("> div > .t-icon").toggleClass("t-minus", p).toggleClass("t-plus", !p);
					if (!q) {
						b.fx[p ? "play" : "rewind"](this.effects, n, {
							direction: "bottom"
						}, function() {
							m.data("animating", false)
						})
					} else {
						n[p ? "show" : "hide"]()
					}
				} else {
					m.data("animating", false)
				}
			} else {
				if (p && this.isAjax() && (n.length == 0 || m.data("loaded") === false)) {
					if (!b.trigger(this.element, p ? "expand" : "collapse", {
						item: m[0]
					})) {
						this.ajaxRequest(m)
					} else {
						m.data("animating", false)
					}
				}
			}
		},
		nodeClick: function(o, p) {
			var m = a(p),
				n = m.closest(".t-item");
			if (m.hasClass("t-plus-disabled") || m.hasClass("t-minus-disabled")) {
				return
			}
			this.nodeToggle(o, n)
		},
		isAjax: function() {
			return this.ajax || this.ws || this.onDataBinding
		},
		url: function(m) {
			return (this.ajax || this.ws)[m]
		},
		ajaxOptions: function(m, p) {
			var q = {
				type: "POST",
				dataType: "text",
				error: a.proxy(function(s, r) {
					if (b.ajaxError(this.element, "error", s, r)) {
						return
					}
					if (r == "parsererror") {
						alert("Error! The requested URL did not return JSON.")
					}
				}, this),
				success: a.proxy(function(r) {
					r = eval("(" + r + ")");
					r = r.d || r;
					this.dataBind(m, r)
				}, this),
				complete: function() {
					m.data("animating", false)
				}
			};
			q = a.extend(q, p);
			var o = this.ws ? q.data.node = {} : q.data;
			if (m.hasClass("t-item")) {
				o[this.queryString.value] = this.getItemValue(m);
				o[this.queryString.text] = this.getItemText(m);
				var n = m.find(".t-checkbox:first :checkbox");
				if (n.length) {
					o[this.queryString.checked] = n.is(":checked")
				}
			}
			if (this.ws) {
				q.data = b.toJson(q.data);
				q.contentType = "application/json; charset=utf-8"
			}
			return q
		},
		ajaxRequest: function(m) {
			m = m || a(this.element);
			var n = {
				item: m[0]
			};
			if (b.trigger(this.element, "dataBinding", n) || (!this.ajax && !this.ws)) {
				return
			}
			m.data("loadingIconTimeout", setTimeout(function() {
				m.find("> div > .t-icon").addClass("t-loading")
			}, 100));
			a.ajax(this.ajaxOptions(m, {
				data: a.extend({}, n.data),
				url: this.url("selectUrl")
			}))
		},
		bindTo: function(m) {
			this.dataBind(this.element, m)
		},
		dataBind: function(m, n) {
			m = a(m);
			var p = m.find("> .t-group"),
				o = this.element,
				t = m.find("> div > .t-icon"),
				s = n.length > 0;
			if (n.length == 0) {
				t.remove();
				p.remove();
				b.trigger(o, "dataBound", {
					item: m[0]
				});
				return
			} else {
				if (t.length == 0) {
					m.find("> div").prepend('<span class="t-icon t-plus" />')
				}
			}
			var q = new b.stringBuilder(),
				v = p.length == 0,
				r = m.find('> div > .t-checkbox :input[name="' + o.id + '_checkedNodes.Index"]').val();
			if (!r && m[0] != o) {
				var w = m.parentsUntil(".t-treeview", ".t-item").andSelf().map(function(z, y) {
					return a(y).index()
				});
				r = Array.prototype.join.call(w, ":")
			}
			var u = (v ? m.eq(0).is(".t-treeview") ? true : n[0].Expanded : false);
			g.getGroupHtml({
				data: n,
				html: q,
				isAjax: this.isAjax(),
				isFirstLevel: m.hasClass("t-treeview"),
				showLines: this.showLines,
				showCheckBoxes: this.showCheckBox,
				groupLevel: r,
				isExpanded: u,
				renderGroup: v,
				elementId: o.id
			});
			if (p.length > 0 && m.data("loaded") === false) {
				a(q.string()).prependTo(p)
			} else {
				if (p.length > 0 && m.data("loaded") !== false) {
					p.html(q.string())
				} else {
					if (p.length == 0) {
						p = a(q.string()).appendTo(m)
					}
				}
			}
			m.data("animating", true);
			b.fx.play(this.effects, p, {
				direction: "bottom"
			}, function() {
				m.data("animating", false)
			});
			clearTimeout(m.data("loadingIconTimeout"));
			if (m.hasClass("t-item")) {
				m.data("loaded", true).find(".t-icon:first").removeClass("t-loading").removeClass("t-plus").addClass("t-minus")
			}
			if (this.isAjax()) {
				d(m)
			}
			b.trigger(o, "dataBound", {
				item: m[0]
			})
		},
		checkboxClick: function(m) {
			var n = a(m.target),
				o = n.is(":checked");
			var p = b.trigger(this.element, "checked", {
				item: n.closest(".t-item")[0],
				checked: o
			});
			if (!p) {
				this.nodeCheck(n, o)
			} else {
				m.preventDefault()
			}
		},
		nodeCheck: function(n, m) {
			a(n, this.element).each(a.proxy(function(s, u) {
				var p = a(u).closest(".t-item"),
					o = a("> div > .t-checkbox", p),
					q = this.element.id + "_checkedNodes",
					t = o.find(':input[name="' + q + '.Index"]').val(),
					r = o.find(":checkbox");
				o.find("[type=hidden]").filter(function() {
					return (a(this).attr("name").indexOf(q + "[" + t + "].") > -1)
				}).remove();
				r.attr("value", m ? "True" : "False");
				if (m) {
					r.attr("checked", "checked");
					a(g.getNodeInputsHtml(this.getItemValue(p), this.getItemText(p), q, t)).appendTo(o)
				} else {
					r.attr("checked", false)
				}
			}, this))
		},
		getItemText: function(m) {
			return a(m).find("> div > .t-in").text()
		},
		getItemValue: function(m) {
			return a(m).find('>div>:input[name="itemValue"]').val() || this.getItemText(m)
		},
		findByText: function(m) {
			return a(this.element).find(".t-in").filter(function(o, n) {
				return a(n).text() == m
			}).closest(".t-item")
		},
		findByValue: function(m) {
			return a(this.element).find("input[name='itemValue']").filter(function(o, n) {
				return a(n).val() == m
			}).closest(".t-item")
		},
		_insertNode: function(w, s, x, n, t) {
			var y = this,
				z = n.children().length + 1,
				u = a.isArray(w),
				m = u || a.isPlainObject(w),
				o = {
					showCheckBoxes: y.showCheckBox,
					isFirstLevel: x.hasClass(h),
					isExpanded: true,
					itemsCount: z
				},
				v, r, q = new b.stringBuilder();
			if (m) {
				if (u) {
					for (r = 0; r < w.length; r++) {
						g.getItemHtml(c({
							html: q,
							itemIndex: s + r,
							item: w[r]
						}, o))
					}
				} else {
					g.getItemHtml(c({
						html: q,
						itemIndex: s,
						item: w
					}, o))
				}
				v = a(q.string())
			} else {
				v = a(w);
				if (n.children()[s - 1] == v[0]) {
					return v
				}
				if (v.closest(".t-treeview")[0] == y.element) {
					y.remove(v)
				}
			}
			if (!n.length) {
				var p = new b.stringBuilder();
				g.getGroupHtml(c({
					html: p,
					renderGroup: true
				}, o));
				n = a(p.string()).appendTo(x)
			}
			t(v, n);
			if (x.hasClass("t-item")) {
				l(x);
				k(x)
			}
			if (!m) {
				k(v)
			}
			k(v.prev());
			k(v.next());
			return v
		},
		insertAfter: function(n, o) {
			var m = o.parent();
			return this._insertNode(n, o.index() + 1, m.parent(), m, function(q, p) {
				q.insertAfter(o)
			})
		},
		insertBefore: function(n, o) {
			var m = o.parent();
			return this._insertNode(n, o.index(), m.parent(), m, function(q, p) {
				q.insertBefore(o)
			})
		},
		append: function(n, o) {
			o = a(o || this.element);
			var m = o.find(f);
			return this._insertNode(n, m.children().length, o, m, function(q, p) {
				q.appendTo(p)
			})
		},
		remove: function(n) {
			n = a(n);
			var q = this,
				o = n.parent().parent(),
				p = n.prev(),
				m = n.next();
			n.remove();
			if (o.hasClass("t-item")) {
				l(o);
				k(o)
			}
			k(p);
			k(m)
		}
	};
	a.extend(g, {
		getNodeInputsHtml: function(o, n, m, p) {
			return new b.stringBuilder().cat('<input type="hidden" value="').cat(o).cat('" name="' + m + "[").cat(p).cat('].Value" class="t-input">').cat('<input type="hidden" value="').cat(n).cat('" name="' + m + "[").cat(p).cat('].Text" class="t-input">').string()
		},
		getItemHtml: function(w) {
			var s = w.item,
				p = w.html,
				r = w.isFirstLevel,
				o = w.groupLevel,
				t = w.itemIndex,
				u = w.itemsCount,
				m = new b.stringBuilder().cat(o).catIf(":", o).cat(t).string(),
				x = function(y) {
					var z;
					if (typeof y != "undefined") {
						for (z in y) {
							p.cat(" ").cat(z).cat('="').cat(y[z]).cat('"')
						}
					}
				},
				q = s.HtmlAttributes || s.htmlAttributes || {};
			p.cat('<li class="t-item').catIf(" t-first", r && t == 0).catIf(" t-last", t == u - 1).cat('">').cat('<div class="').catIf("t-top ", r && t == 0).catIf("t-top", t != u - 1 && t == 0).catIf("t-mid", t != u - 1 && t != 0).catIf("t-bot", t == u - 1).catIf(" " + q["class"], q["class"]).cat('"');
			delete q["class"];
			x(q);
			p.cat(">");
			if ((w.isAjax && s.LoadOnDemand) || (s.Items && s.Items.length > 0)) {
				p.cat('<span class="t-icon').catIf(" t-plus", s.Expanded !== true).catIf(" t-minus", s.Expanded === true).catIf("-disabled", s.Enabled === false).cat('"></span>')
			}
			if (w.showCheckBoxes && s.Checkable !== false) {
				var n = w.elementId + "_checkedNodes";
				p.cat('<span class="t-checkbox">').cat('<input type="hidden" value="').cat(m).cat('" name="').cat(n).cat(".Index").cat('" class="t-input"/>').cat('<input type="checkbox" value="').cat(s.Checked === true ? "True" : "False").cat('" class="t-input').cat('" name="').cat(n).cat("[").cat(m).cat('].Checked"').catIf(' disabled="disabled"', s.Enabled === false).catIf(' checked="checked"', s.Checked).cat("/>");
				if (s.Checked) {
					p.cat(g.getNodeInputsHtml(s.Value, s.Text, n, m))
				}
				p.cat("</span>")
			}
			var v = s.NavigateUrl || s.Url;
			p.cat(v ? '<a href="' + v + '" class="t-link ' : '<span class="').cat("t-in").catIf(" t-state-disabled", s.Enabled === false).catIf(" t-state-selected", s.Selected === true).cat('">');
			if (s.ImageUrl != null) {
				p.cat("<img");
				x(a.extend({
					alt: "",
					"class": "t-image",
					src: s.ImageUrl
				}, s.ImageHtmlAttributes || s.imageHtmlAttributes || {}));
				p.cat(" />")
			}
			if (s.SpriteCssClasses != null) {
				p.cat('<span class="t-sprite ').cat(s.SpriteCssClasses).cat('"></span>')
			}
			p.catIf(s.Text, s.Encoded === false).catIf(s.Text.replace(/</g, "&lt;").replace(/>/g, "&gt;"), s.Encoded !== false).cat(v ? "</a>" : "</span>");
			if (s.Value) {
				p.cat('<input type="hidden" class="t-input" name="itemValue" value="').cat(s.Value).cat('" />')
			}
			p.cat("</div>");
			if (s.Items && s.Items.length > 0) {
				g.getGroupHtml({
					data: s.Items,
					html: p,
					isAjax: w.isAjax,
					isFirstLevel: false,
					showCheckBoxes: w.showCheckBoxes,
					groupLevel: m,
					isExpanded: s.Expanded,
					elementId: w.elementId
				})
			}
			p.cat("</li>")
		},
		getGroupHtml: function(s) {
			var m = s.data,
				o = s.html,
				u = s.showLines,
				q = s.isFirstLevel,
				t = s.renderGroup;
			if (t !== false) {
				o.cat('<ul class="t-group').catIf(" t-treeview-lines", q && (typeof u == typeof j || u)).cat('"').catIf(' style="display:none"', s.isExpanded !== true).cat(">")
			}
			if (m && m.length > 0) {
				var n = g.getItemHtml;
				for (var p = 0, r = m.length; p < r; p++) {
					n({
						item: m[p],
						html: o,
						isAjax: s.isAjax,
						isFirstLevel: q,
						showCheckBoxes: s.showCheckBoxes,
						groupLevel: s.groupLevel,
						itemIndex: p,
						itemsCount: r,
						elementId: s.elementId
					})
				}
			}
			if (t !== false) {
				o.cat("</ul>")
			}
		}
	});
	a.fn.tTreeView = function(m) {
		return b.create(this, {
			name: "tTreeView",
			init: function(n, o) {
				return new g(n, o)
			},
			options: m,
			success: function(n) {
				if (n.isAjax() && a(n.element).find(".t-item").length == 0) {
					n.ajaxRequest()
				}
			}
		})
	};
	a.fn.tTreeView.defaults = {
		effects: b.fx.property.defaults("height"),
		queryString: {
			text: "Text",
			value: "Value",
			checked: "Checked"
		}
	}
})(jQuery);