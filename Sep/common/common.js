function log() {
    var e, t = [];
    log = function () {
        foreach(arguments, function (e) {
            t.push(JSON.stringify(e))
        }), $(function () {
            e || (e = $("<div>").css({
                position: "absolute",
                backgroundColor: "#e8e8e8",
                color: "#0000FF",
                wordWrap: "break-word",
                wordBreak: "break-all",
                zIndex: "9999",
                width: "100%",
                left: 0,
                top: 0
            }).appendTo("body")), e.html(t.join(" "))
        })
    }, applyFn(log, arguments)
}
function DUMP_FN() {
}
function inFrame() {
    return window !== parent
}
function ready(e) {
    document.body ? e() : document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, !1), e()
    }, !1)
}
function applyFn(e, t) {
    return ("function" == typeof e || void 0) && e.apply(e, t)
}
function arraySlice(e, t, n) {
    return Array.prototype.slice.call(e, t, n)
}
function lambda(e) {
    var t = arraySlice(arguments, 1);
    return function () {
        var n = t;
        return arguments.length && (n = t.concat(arraySlice(arguments))), applyFn(e, n)
    }
}
function foreach(e, t) {
    for (var n in e)if (e.hasOwnProperty(n) && applyFn(t, [e[n], n]))return !0
}
function joinObj(e) {
    if (arguments.length > 1) {
        var t = arraySlice(arguments, 1);
        foreach(t, function (t) {
            foreach(t, function (t, n) {
                e[n] = t
            })
        })
    }
    return e
}
function Timer(e, t) {
    if (!(this instanceof Timer))return new Timer(e, t);
    var n = {fn: e, delay: t || 100};
    return {
        begin: function (e) {
            this.clear(), n.delay >= 0 && (this._timer = setTimeout(n.fn, e || n.delay))
        }, clear: function () {
            clearTimeout(this._timer)
        }
    }
}
function stringify(e) {
    var t = [], n = "", i = Object.prototype.toString.apply(e);
    if ("[object Array]" === i) {
        for (var r = 0; r < e.length; r++)n = stringify(e[r]), "undefined" == typeof n && (n = "null"), t.push(n);
        n = "[" + t.join(",") + "]"
    } else if ("[object Date]" === i)n = '"' + new Date(e.getTime() + 60 * e.getTimezoneOffset() * 1e3).format("yyyy-MM-ddThh:mm:ss.SSSZ") + '"'; else if ("[object RegExp]" === i)n = "{}"; else if ("[object Function]" === i)n = void 0; else if ("[object Object]" === i) {
        for (var r in e) {
            var o = typeof e[r];
            e.hasOwnProperty(r) && "function" !== o && "undefined" !== o && t.push('"' + r + '":' + stringify(e[r]))
        }
        n = "{" + t.join(",") + "}"
    } else n = "[object String]" === i ? '"' + e + '"' : "[object Null]" === i || isNaN(e) && void 0 !== e || e === 1 / 0 || e === -(1 / 0) ? "null" : e;
    return n
}
function parse(str) {
    return str && "string" == typeof str && /[[{(.]/.test(str) ? eval("(" + str + ")") : str
}
function clone(e) {
    return parse(stringify(e))
}
function loader(e, t) {
    var n, i = {
        replace: t && t.replace || "CaLlBacK",
        charset: t && t.charset || "UTF-8",
        timeout: t && t.timeout || 2e3,
        loading: t && t.loading,
        success: t && t.success,
        error: t && t.error,
        jsonpName: t && t.jsonpName
    };
    if (n = i.jsonpName ? i.jsonpName : "callback_" + (new Date).getTime() + Math.random().toFixed(3).split(".")[1], !window[n] || !window[n].loading) {
        var r = document.createElement("script");
        r.type = "text/javascript", r.charset = i.charset, r.src = i.jsonpName ? e : e.replace(i.replace, n), document.head.appendChild(r), "function" == typeof i.loading && i.loading(), function (e, t, n, i, r) {
            var o = function () {
                n && (o.abort ? applyFn(r, arguments) : (clearTimeout(o.timeoutTimer), applyFn(i, arguments)), delete window[o.cbName].loading, /callback_/.test(o.cbName) && delete window[o.cbName], n.parentNode.removeChild(n), n = i = r = t = o = null)
            };
            o = o.bind(o), window[e] = o, o.loading = !0, o.cbName = e, o.timeout = t, o.timeoutTimer = setTimeout(function () {
                "function" == typeof window[e] && (window[e].abort = !0, window[e]())
            }, t)
        }(n, i.timeout, r, i.success, i.error)
    }
}
function loaderData(e, t) {
    var n = search.append(e, {t: (new Date).getTime()});
    loader(n, t)
}
function Query(e, t, n) {
    if (!(this instanceof Query))return new Query(e, t, n);
    if (!e)return this;
    var i = t || document, r = [];
    if ("string" == typeof t && (i = document.querySelector(t)), "string" == typeof e) {
        if (/\</.test(e)) {
            var o = document.createElement("div");
            o.innerHTML = e;
            for (var a = 0; a < o.childNodes.length; a++)r.push(o.childNodes[a])
        } else if (i)try {
            var s = i["querySelector" + (n ? "All" : "")].call(i, e);
            n ? s.length && (r = arraySlice(s)) : s && r.push(s)
        } catch (l) {
        }
    } else e instanceof Query ? r = e : "nodeType" in e && r.push(e);
    for (var a = 0; a < r.length; a++)this[a] = r[a];
    return this.length = r.length, this
}
function Tpl(e) {
    function t(e, i, o, a) {
        var s = "", l = i && i.replace(/ .*$/, "") || a, u = i && i.replace(l + " ", "") || a, c = this.scopes[this.scopes.length - 1];
        switch (l) {
            case"#each":
                var d = "this" === u ? c.ds : c.ds[u], p = r(d);
                p.type = 1, this.scopes.push(p);
                for (var h in d)d.hasOwnProperty(h) && (this.scopes[this.scopes.length - 1].index = h, s += o.replace(/{{([^}]+?)}}/g, t.bind(this)));
                break;
            case"/each":
                this.scopes.pop();
                break;
            default:
                var f = c.ds;
                1 === c.type && (f = f[c.index]);
                "this" === u && f + "" || f[u] + "" || "";
                s = n({key: u, index: c.index, ds: f})
        }
        return s
    }

    function n(e) {
        var t = "";
        switch (e.key) {
            case"this":
                t = e.ds;
                break;
            case"index":
                t = e.index;
                break;
            default:
                t = i(e.ds[e.key] || "")
        }
        return t
    }

    function i(e) {
        var t = e + "", n = "", i = {
            "&": "&#38;",
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "/": "&#47;"
        };
        return n = t.replace(/[&"'<>\/]/g, function (e) {
            return i[e]
        })
    }

    function r(e) {
        return {ds: e, type: e.length > -1 ? 1 : 0, index: 0}
    }

    function o(e) {
        return this.data = e, this.scopes = [r(e)], this.tpl.replace(/{{(#each.+?)}}(.*?)(?={{\/each}})|{{([^}]+?)}}/g, t.bind(this))
    }

    function a(e) {
        return this.tpl = e.replace(/^\s*|\s*$/gm, "").replace(/[\r\n]+/gm, ""), this
    }

    return a.prototype = {
        constructor: a, compile: function (e) {
            var t = o.call(this, e);
            return delete this.data, delete this.scopes, t
        }, render: function (e, t) {
            Query(e).html(this.compile(t))
        }
    }, new a(e)
}
function cutFactory(e) {
    function t(e) {
        o.innerHTML = e + i.padding;
        var a = n(), s = a.gap, l = a.percent, u = e.length, c = +(u * l).toFixed(0);
        return s > 0 && s < i.fontSize && (r--, c -= 1), 0 >= s || !r ? e + i.padding : t(e.substring(0, c))
    }

    function n() {
        var e = o.offsetWidth, t = o.scrollWidth, n = t - e, i = Math.floor(e / t * 1e3) / 1e3;
        return {gap: n, percent: i}
    }

    var i = {
        padding: e.padding || "...",
        classList: e.classList || [],
        style: e.style || {},
        retry: e.retry || 4,
        debug: e.debug
    }, r = 0, o = document.createElement("span");
    o.className = i.classList.join(" ");
    var a = [];
    for (var s in i.style)i.style.hasOwnProperty(s) && a.push(s + ":" + i.style[s]);
    o.style.cssText = "position:absolute;left:0;top:0;background:transparent;color:transparent;height:100%;white-space:nowrap;overflow:visible;border:0;" + (i.debug ? "background:white;color:red;" : "") + a.join(";");
    var l = document.createElement("div");
    l.appendChild(o), l.style.cssText = "width:99%;min-height:50px;line-height:50px;position:absolute;left:3px;top:3px;overflow:hidden;outline:0;background:transparent;" + (i.debug ? "outline:1px solid red;background:black;" : ""), document.body.appendChild(l);
    var u = window.getComputedStyle(o);
    return i.fontSize = parseFloat(u.fontSize) || 16, function (e) {
        r = i.retry, o.innerHTML = e;
        var a = {flag: !1, cut: "", all: e, last: e};
        return n().gap && (a.flag = !0, a.last = a.cut = t(e)), a
    }
}
function AutoHide(e) {
    if (!(this instanceof AutoHide))return new AutoHide(e);
    var t = {$dom: Query(e.dom), delay: e.delay, beforeShow: e.beforeShow, afterHide: e.afterHide}, n = function (e) {
        applyFn(t.beforeShow), t.$dom.show(), r.begin(e)
    }, i = function () {
        applyFn(t.afterHide), r.clear(), t.$dom.hide()
    }, r = new Timer(i, t.delay);
    return {show: n, hide: i}
}
function Marquee(e) {
    var t = function (e) {
        e.height = e.height || "99%", e.width = e.width || "98%", e.el.innerHTML = '<marquee width="' + e.width + '" height="' + e.height + '" scrollamount="4">' + e.all + "</marquee>"
    };
    if (this instanceof Marquee) {
        var n = this;
        return function (e) {
            var i = e && Query.isDOM(e.el), r = n.last;
            r && i && Query.isEqualNode(e.el, r.el) && /\<marquee[^>]*>/.test(r.el.innerHTML) || (r && (r.el && "" !== r.el.innerHTML && /\<marquee[^>]*>/.test(r.el.innerHTML) && (r.el.innerHTML = r.text || ""), n.last = null), i && (n.last = {
                el: e.el,
                text: e["short"] || e.el.innerText || e.el.textContent || e.el.innerHTML
            }, t(e)))
        }
    }
    var i = e && Query.isDOM(e.el);
    Marquee.last && i && Query.isEqualNode(e.el, Marquee.last.el) && /\<marquee[^>]*>/.test(Marquee.last.el.innerHTML) || (Marquee.last && (Marquee.last.el && "" !== Marquee.last.el.innerHTML && /\<marquee[^>]*>/.test(Marquee.last.el.innerHTML) && (Marquee.last.el.innerHTML = Marquee.last.text || ""), Marquee.last = null), i && (Marquee.last = {
        el: e.el,
        text: e["short"] || e.el.innerText || e.el.textContent || e.el.innerHTML
    }, t(e)))
}
function Toast(e) {
    function t() {
        var e = Query("<div>").css({
            position: "absolute",
            width: "100%",
            left: "0",
            top: "80%",
            "z-index": "999",
            "text-align": "center",
            background: "transparent"
        });
        return Query("<div class=content>").css({
            display: "inline-block",
            "font-family": "黑体",
            "font-size": "28px",
            color: "#F1F1F1",
            padding: ".1em 2em",
            "min-height": "1.1em",
            "border-radius": "18px",
            "background-color": "rgba(0, 0, 0, .5)"
        }).appendTo(e), e
    }

    function n(e, t) {
        Query(".content", t).html(e)
    }

    function i() {
        s && (o = Toast.dom, a = Toast.autoHide), o || (o = Query(l.create()), o.appendTo("body"), a = new AutoHide({
            dom: o,
            delay: l.delay
        })), s && (Toast.dom = o, Toast.autoHide = a)
    }

    function r(e) {
        var t = "number" == typeof(e && e.delay) ? e.delay : l.delay, n = e && e.msg || l.msg;
        i(), n && t ? (l.setMsg(n, o[0]), a.show(t)) : a.hide()
    }

    var o, a, s = !(this instanceof Toast), l = {
        delay: e && e.delay >= 0 ? e.delay : -1,
        msg: e && e.msg || "",
        create: e && e.create || t,
        setMsg: e && e.setMsg || n
    };
    return s ? void r.apply(null, arguments) : r
}
function Common() {
    function e(e) {
        return "function" != typeof e ? Query.apply(null, arguments) : void ready(e)
    }

    var t = {
        substringOneLine: function (e, t) {
            if (e && "string" == typeof e && t > 0 && e.length > t) {
                var n = e.substring(0, t), i = /[\x00-\xff]/g, r = 0;
                if (n.replace(i, function () {
                        r++
                    }), r /= 2, r > 0) {
                    for (var o = "", a = e.split(""), s = t; s < a.length; s++)r -= a[s].charCodeAt(0) <= 255 ? .5 : 1, r >= 0 ? o += a[s] : s = 10 * a.length;
                    if (n += o, n.length === e.length)return ""
                }
                return n
            }
            return ""
        }, substringElLength: function (e, t, n) {
            this.substringElLengthFns || (this.substringElLengthFns = {});
            var i = "key_" + t + "_" + n, r = this.substringElLengthFns[i];
            return r || (r = this.substringElLengthFns[i] = cutFactory({style: {"font-size": t, width: n}})), r(e)
        }, focusTo: function (e) {
            if (e) {
                this.hideFocus();
                var t = this;
                "undefined" != typeof PAGE_INFO && foreach(PAGE_INFO, function (t) {
                    return t.key === e ? (window.ACTIVE_OBJECT = t, !0) : void 0
                });
                var n, i, r, o;
                if (window.ACTIVE_OBJECT && ACTIVE_OBJECT.marquee && ACTIVE_OBJECT.marquee.length && (n = ACTIVE_OBJECT.wholeMsg, n && ACTIVE_OBJECT.marquee && ACTIVE_OBJECT.marquee[0] && (i = t(ACTIVE_OBJECT.marquee[1])[0], r = ACTIVE_OBJECT.marquee[2], o = ACTIVE_OBJECT.marquee[3])), Marquee({
                        all: n,
                        el: i,
                        width: r,
                        height: o
                    }), window.ACTIVE_OBJECT) {
                    var a = t("#" + ACTIVE_OBJECT.key);
                    if (a.length) {
                        var s = ACTIVE_OBJECT.focusImg && ACTIVE_OBJECT.focusImg[0];
                        if (s && "." !== s) {
                            var l = a.css(), u = t("#divImgBorder");
                            u.length || (u = t("<div>").attr("id", "divImgBorder").css({
                                position: "absolute",
                                visibility: "hidden",
                                zIndex: 30
                            }), u.html('<img style="width:0; height:0;">'), document.body.appendChild(u[0]));
                            var c = t("img", u[0]);
                            u.hide();
                            var d = t("#divYellowBorder");
                            d.length || (d = t("<div>").attr("id", "divYellowBorder").css({
                                position: "absolute",
                                visibility: "hidden",
                                zIndex: 30
                            }), d.html('<img style="width:0; height:0;">'), document.body.appendChild(d[0]));
                            var p = t("img", d[0]);
                            d.hide(), "#" === s ? (p.css({
                                width: l.width,
                                height: l.height
                            }), d.css({
                                left: parseInt(l.left) - 4 + "px",
                                top: parseInt(l.top) - 4 + "px"
                            }), d.show()) : (c.css({width: l.width, height: l.height}), c[0].src = s, u.css({
                                left: l.left,
                                top: l.top
                            }), u.show())
                        } else this.showFocus(a)
                    }
                }
            }
        }, hideFocus: function () {
            this(".focusBorder").removeClass("focusBorder"), this("#divImgBorder").hide()
        }, showFocus: function (e) {
            e ? this(e).addClass("focusBorder") : this("#divImgBorder").show()
        }, forward: function (e) {
            this.addBackUrl(window.location.href), this.redirect(e)
        }, redirect: function (e) {
            var t = search.append(e, {POSITIVE: ""});
            this.setUrl(t)
        }, back: function () {
            var e = this.getBackUrl(!0);
            e || (e = this.getConstant("page").home), this.setUrl(e)
        }, isBack: function () {
            return null === search.get("POSITIVE")
        }, setUrl: function (e) {
            window.location.href = e
        }, getGlobalData: function (e) {
            var t = __ls.getItem(e);
            return null !== t && "null" !== t && "undefined" != typeof t && "undefined" !== t && "" !== t ? t : void 0
        }, saveGlobalData: function (e, t) {
            "undefined" == typeof t ? __ls.removeItem(e) : __ls.setItem(e, t)
        }, addBackUrl: function (e) {
            var t = "G_BACK_URL_LIST", n = this.getGlobalData(t) || "[]";
            n = JSON.parse(n);
            var i = search.append(e, {POSITIVE: null});
            i = search.append(i, {pos: null}), n.push(i), this.saveGlobalData(t, JSON.stringify(n))
        }, getBackUrl: function (e) {
            var t = "", n = "G_BACK_URL_LIST", i = this.getGlobalData(n) || "[]";
            return i = JSON.parse(i), i.length && (t = i.pop(), e && this.saveGlobalData(n, JSON.stringify(i))), t
        }, emptyBackUrl: function () {
            var e = "G_BACK_URL_LIST";
            this.saveGlobalData(e, "[]")
        }, initPageInfo: function (e, t, n) {
            var i = {};
            if (this.isBack()) {
                var r = parse(this.getGlobalData(e)) || {};
                this.saveGlobalData(e, void 0), foreach(t, function (e) {
                    var t = r[e];
                    "undefined" == typeof t && (t = n && n[e]), i[e] = t
                })
            } else foreach(t, function (e) {
                i[e] = n && n[e]
            });
            return i
        }, savePageInfo: function (e, t) {
            this.saveGlobalData(e, JSON.stringify(t))
        }, keypressOption: {}, keyPressSetting: function (e) {
            function t(e, t) {
                return function () {
                    var n = keyTool.keyRespond(e);
                    return n || (n = applyFn(t)), n
                }
            }

            foreach(e, function (e, n) {
                this.keypressOption[n] = t(n, e)
            }.bind(this))
        }, getConstant: function () {
            var e = parent.CONSTANT || {};
            return this.getConstant = function (t) {
                return e[t] || ""
            }, this.getConstant.apply(this, arguments)
        }, getUserId: function () {
            return this.getConstant("userId")
        }, getBindId: function () {
            return this.getConstant("bindId")
        }, epgDomain: function () {
            return this.getConstant("epgDomain")
        }, initPage: function () {
            inFrame() && parent.initPage(), window.PAGE_INFO && foreach(PAGE_INFO, function (e) {
                foreach(e, function (e) {
                    "#" != e && ((new Image).src = e)
                })
            }), window.reservation && (reservation.init({
                beforeShow: function () {
                    applyFn(window.handleReservationShow), window.ACTIVE_OBJECT && ("menu" === ACTIVE_OBJECT.key ? menu.blur() : ($.getElem("divImgBorder").style.visibility = "hidden", $.getElem("divYellowBorder").style.visibility = "hidden"))
                }, afterHide: function () {
                    window.ACTIVE_OBJECT && ("menu" === ACTIVE_OBJECT.key ? menu.focus() : ($.getElem("divImgBorder").style.visibility = "visible", $.getElem("divYellowBorder").style.visibility = "visible")), applyFn(window.handleReservationHide)
                }
            }), reservation.fetch())
        }, loader4CategoryContentList: function (e, t, n) {
            var i = "callback_categoryContentList_";
            n || (n = {}), n.jsonpName = i + t;
            var r = this.getConstant("serverUrl") + "dataSource/CategoryContents/" + e + "/index_" + t + ".js";
            "function" != typeof categoryContentListCallback && (window.categoryContentListCallback = function (e) {
                var t = e.rangeMin / 100, n = i + t;
                applyFn(window[n], arguments)
            }), loaderData(r, n)
        }, loader4GuidanceContents: function (e, t) {
            var n = "callback_guidanceContents_";
            t || (t = {}), t.jsonpName = n + e;
            var i = this.getConstant("serverUrl") + "dataSource/GuidanceContents/" + e + "/index.js";
            "function" != typeof GuidanceContentListCallback && (window.GuidanceContentListCallback = function () {
                var e = t.jsonpName;
                applyFn(window[e], arguments)
            }), loaderData(i, t)
        }, getPic: function (e, t) {
            var n = "";
            return foreach(t, function (t) {
                return foreach(e, function (e) {
                    return e.picType == t ? (n = e.picPath, !0) : void 0
                })
            }), n && (n = this.getConstant("picServerUrl") + n), n
        }, gotoDetail: function (e, t, n) {
            var i = "";
            switch (e.contentType) {
                case"0":
                    i = $.getConstant("page").detailVod.replace("{categoryId}", e.categoryId).replace("{contentId}", e.contentId);
                    break;
                case"2":
                    i = $.getConstant("page").detailSeries.replace("{categoryId}", e.categoryId).replace("{contentId}", e.contentId);
                    break;
                case"3":
                    var r = new RegExp("^/?" + $.getConstant("siteNameOnline"));
                    i = $.getConstant("siteUrl") + (e.url || "").replace(r, "");
                    break;
                case"4":
                    i = $.getConstant("baseUrl") + e.url;
                    break;
                case"5":
                    $.playLiveOrRec(e.channelNum);
                    break;
                case"6":
                    $.playLiveOrRec(e.channelNum, e.startTime, e.endTime);
                    break;
                case"7":
                    i = $.getConstant("page").detailXileiju.replace("{categoryId}", e.categoryId).replace("{contentId}", e.contentId)
            }
            i && (applyFn(n), t ? $.redirect(i) : $.forward(i))
        }, callSizeLivePlay: function (e, t, n, i, r) {
            var o = MP.mediaType.TYPE_CHANNEL, a = r;
            window.mp = initMiniMp(e, t, n, i, o, a), mp.play(r), topic.pub("callSizeLivePlay")
        }, playLiveOrRec: function (e, t, n, i) {
            var r = $.getConstant("page"), o = "";
            o = t && n ? r.playTvod : r.playChannel;
            var a = {channelNum: e, startTime: t, endTime: n};
            "undefined" != typeof i && (a.playTime = i), o = search.append(o, a), dirInPlayControl() ? $.redirect(o) : $.forward(o)
        }, playVideo: function (e, t, n, i, r, o, a) {
            var s = $.getConstant("page"), l = s.playVod;
            n && (l = s.playSeries);
            var u = {
                contentId: e,
                categoryId: t,
                seriesId: n || "",
                mediaType: i || 1,
                cycle: r || 0,
                multiVod: o || 0
            };
            a > -1 && (u.playTime = a), l = search.append(l, u), dirInPlayControl() ? $.redirect(l) : $.forward(l)
        }, playVideoByTime: function (e, t, n, i) {
            $.playVideo(e, t, n, null, null, null, i)
        }, recodeData: function (e, t, n) {
            var i = (document.referrer || "").split("?")[0];
            "undefined" == typeof n && (n = "index"), "zt" == t ? $.VS.zt(e) : $.VS.page(i, window.location.href.split("?")[0], n)
        }
    };
    return foreach(Query, function (e, n) {
        t[n] = e
    }), joinObj(e, t), e.VS = initVS(e.getConstant("dcUrl"), e.getUserId(), e.getConstant("stbId")), e
}
function initVS(e, t, n) {
    return {
        url: e, userId: t, stbId: n, first: !Authentication.CTCGetConfig("firstBoot"), firstBoot: function () {
            if (!this.first)return !1;
            this.first = !1, Authentication.CTCSetConfig("firstBoot", "2");
            var e = "login";
            return this.send({
                analysistype: e,
                MAC: Authentication.CUGetConfig("mac"),
                stbModel: Authentication.CUGetConfig("STBType")
            }), !0
        }, vodPlay: function (e, t, n, i) {
            var r = "vodbegin";
            this.send({vodid: e, times: t, vodname: n, analysistype: r, colid: i})
        }, serialPlay: function (e, t, n, i) {
            var r = "vodseriesbegin";
            this.send({vodid: e, times: t, vodname: n, analysistype: r, colid: i})
        }, tvodPlay: function (e, t, n, i) {
            var r = "tvodbegin";
            this.send({tvodchno: e, tvodtimes: t, tvodname: n, analysistype: r, tvodbegintime: i})
        }, vodQuit: function (e, t) {
            var n = "vodend";
            this.send({analysistype: n, quittype: "osd"}, !0)
        }, livePlay: function (e) {
            var t = "channelcontinuebegin";
            this.send({channelid: e, analysistype: t})
        }, liveContinue: function (e) {
            var t = "channelstate";
            this.send({channelid: e, analysistype: t})
        }, liveQuit: function () {
            var e = "access";
            this.send({analysistype: e, url: "osd"}, !0)
        }, page: function (e, t, n) {
            if (!this.firstBoot()) {
                var i = "access";
                this.send({analysistype: i, referpage: e, refer: !0, url: t, columnid: n})
            }
        }, zt: function (e) {
            var t = "zt";
            this.send({analysistype: t, spName: e})
        }, getDcBaseInfo: function () {
            var e = {
                userid: this.userId,
                stbid: this.stbId,
                stbtype: 2,
                processtype: "MapInfoProcess",
                version: 2,
                time: (new Date).format("yyyyMMddhhmmss")
            };
            return e
        }, send: function (e, t) {
            var n = search.append(this.url, joinObj(this.getDcBaseInfo(), e)), i = new XMLHttpRequest;
            i.open("GET", n, !t), i.send()
        }
    }
}
function initMiniMp(e, t, n, i, r, o) {
    return new MP(r, {left: e, top: t, width: n, height: i, videoDisplayMode: 0})
}
function dirInPlayControl(e) {
    return e || (e = window.location.href), /\/playControl\//.test(e)
}
function keyEvent(e) {
    var t = e.keyCode || e.which, n = {
        8: "KEY_RETURN",
        13: "KEY_OK",
        33: "KEY_PAGEUP",
        34: "KEY_PAGEDOWN",
        37: "KEY_LEFT",
        38: "KEY_UP",
        39: "KEY_RIGHT",
        40: "KEY_DOWN",
        48: "KEY_0",
        49: "KEY_1",
        50: "KEY_2",
        51: "KEY_3",
        52: "KEY_4",
        53: "KEY_5",
        54: "KEY_6",
        55: "KEY_7",
        56: "KEY_8",
        57: "KEY_9",
        106: "KEY_DELETE",
        269: "KEY_DELETE",
        271: "KEY_DELETE",
        280: "KEY_DELETE",
        257: "KEY_CHANNEL_UP",
        258: "KEY_CHANNEL_DOWN",
        259: "KEY_VOLUME_UP",
        260: "KEY_VOLUME_DOWN",
        261: "KEY_MUTE",
        263: "KEY_PAUSE_PLAY",
        264: "KEY_FAST_FORWARD",
        265: "KEY_FAST_REWIND",
        270: "KEY_STOP",
        275: "KEY_LIVE_BROADCAST",
        1108: "KEY_LIVE_BROADCAST",
        276: "KEY_REVIEW",
        1110: "KEY_REVIEW",
        277: "KEY_DIBBLING",
        1109: "KEY_DIBBLING",
        278: "KEY_INFORMATION",
        1112: "KEY_INFORMATION",
        768: "EVENT_UTILITY"
    }, i = n[t];
    $.getConstant("isTest") && Toast({delay: 3e3, msg: "按键值:" + t + " " + i});
    var r = $.keypressOption[i], o = applyFn(r);
    return o && e.preventDefault && e.preventDefault(), !0
}
function getDefaultKeysMap() {
    function e() {
        pluginTool.add("g_num", {
            key: "g_num", level: 9, show: function (t) {
                e.showMsg(t)
            }, hide: DUMP_FN
        });
        for (var e = {
            max: 3, nums: [], delay: 2e3, press: function (e) {
                this.nums.length >= this.max && (this.nums = []), this.nums.push(e), this.timer.begin(), this.toast({msg: this.nums.join("")})
            }, showMsg: function (e) {
                this.toast({msg: e, delay: 5e3})
            }, init: function () {
                return this.timer = new Timer(function () {
                    var e = this.nums.join("");
                    parent.channelMap && parent.channelMap[e] ? (this.nums = [], $.playLiveOrRec(e)) : (this.nums.length = this.max, this.toast({
                        msg: "无此频道" + e,
                        delay: this.delay
                    }))
                }.bind(this), this.delay), this.toast = new Toast({
                    delay: this.delay, create: function () {
                        var t = $("<div>").css({
                            position: "absolute",
                            width: "100%",
                            left: "0",
                            top: "5%",
                            "z-index": "10000",
                            "text-align": "right",
                            background: "transparent"
                        });
                        return $("<div class=content>").css({
                            display: "inline-block",
                            "font-family": "微软雅黑",
                            "font-size": "72px",
                            color: "red",
                            padding: ".1em 2em",
                            "min-height": "1.1em"
                        }).appendTo(t), e.dom = t, t
                    }, setMsg: function (e, t) {
                        var n = $(".content", t);
                        e.length > this.max, n.html(e)
                    }.bind(this)
                }), this
            }
        }.init(), t = {}, n = 0; 10 > n; n++) {
            var i = "KEY_" + n;
            t[i] = lambda(e.press.bind(e), n)
        }
        return t
    }

    function t(e) {
        if ("undefined" != typeof ACTIVE_OBJECT && null != ACTIVE_OBJECT) {
            var t = ACTIVE_OBJECT[e];
            if ("function" == typeof t)t.apply(null, ACTIVE_OBJECT.args); else {
                var n = ACTIVE_OBJECT[e];
                n && $("#" + n).length && $.focusTo(n)
            }
        }
    }

    var n = e(), i = {
        KEY_RETURN: function () {
            return $.back(), !0
        }, KEY_OK: function () {
            return t("pressOk"), !0
        }, KEY_PAGEUP: function () {
            return t("pressPageUp"), !0
        }, KEY_PAGEDOWN: function () {
            return t("pressPageDown"), !0
        }, KEY_UP: function () {
            return t("pressUp"), !0
        }, KEY_LEFT: function () {
            return t("pressLeft"), !0
        }, KEY_RIGHT: function () {
            return t("pressRight"), !0
        }, KEY_DOWN: function () {
            return t("pressDown"), !0
        }, KEY_VOLUME_UP: function () {
            return !0
        }, KEY_VOLUME_DOWN: function () {
            return !0
        }, KEY_MUTE: function () {
            return !0
        }, KEY_FAST_REWIND: function () {
            return !0
        }, KEY_FAST_FORWARD: function () {
            return !0
        }, KEY_PAUSE_PLAY: function () {
            return !0
        }, KEY_STOP: function () {
            return !0
        }, KEY_CHANNEL_UP: function () {
            return !0
        }, KEY_CHANNEL_DOWN: function () {
            return !0
        }, KEY_LIVE_BROADCAST: function () {
            var e = $.getConstant("page").red, t = window.location.href;
            return t.indexOf(e) > -1 ? !0 : ($.emptyBackUrl(), void $.redirect(e))
        }, KEY_REVIEW: function () {
            var e = $.getConstant("page").green, t = window.location.href;
            return t.indexOf(e) > -1 ? !0 : ($.emptyBackUrl(), void $.redirect(e))
        }, KEY_DIBBLING: function () {
            $.emptyBackUrl();
            var e = $.getConstant("page").yellow;
            $.redirect(e)
        }, KEY_INFORMATION: function () {
            $.emptyBackUrl();
            var e = $.getConstant("page").blue;
            $.redirect(e)
        }, EVENT_UTILITY: function () {
            var e = Utility.getEvent(), t = parse(e);
            switch (t.type) {
                case"EVENT_GO_CHANNEL":
                case"EVENT_MEDIA_BEGINING":
                    topic.pub("media.begin");
                    break;
                case"EVENT_MEDIA_ERROR":
                    topic.pub("media.error");
                    break;
                case"EVENT_MEDIA_END":
                    topic.pub("media.end");
                    break;
                case"EVENT_PLAYMODE_CHANGE":
                    topic.pub("media.playmode.change");
                    break;
                case"EVENT_REMINDER":
            }
            return !0
        }, KEY_DELETE: function () {
            return !0
        }, DEFULT: function () {
            return !0
        }
    };
    return joinObj({}, n, i)
}
!function () {
    function e() {
        var e = Authentication.CUGetConfig("EPGDomain");
        return /(http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/)(iptvepg\/)?/.test(e), RegExp.$1
    }

    var t = /10:4000/.test(window.location.host) || /file:/.test(window.location.protocol), n = "http://10.128.4.14:9999/", i = "http://10.128.4.14:3000/", r = "http://10.128.4.15:9080/EPGDataAnalysis/ReciveServlet";
    t && (n = "http://10.128.4.14:9999/", i = "http://10.128.4.14:3000/"), /^((?:https|http)?:\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}.*\/)pub\/([A-Za-z1-9_-]+\/)([A-Za-z1-9_-]+\/).*$/.exec(window.location.href.split("?")[0]);
    var o = RegExp.$1, a = RegExp.$2, s = RegExp.$3, l = "jldxgdHD/", u = "pub/", c = /HW/.test(a) ? "huawei" : "zte", d = "huawei" == c ? "1100000141" : "1100000002", p = Authentication.CTCGetConfig("UserID");
    window.CONSTANT = {
        isTest: t,
        serverUrl: o + u,
        baseUrl: o + u + a,
        siteUrl: o + u + a + s,
        resources: o + u + "resources/",
        stbName: a,
        siteName: s,
        siteNameOnline: l,
        mongoDBUrl: n,
        reservationUrl: i,
        dcUrl: r,
        node: c,
        nodeId: d,
        picServerUrl: o + "pic/",
        epgDomain: e(),
        epgDomainHome: RegExp.$2,
        userId: p,
        bindId: "0432002" + c + "_" + p,
        stbId: Authentication.CUGetConfig("STBID")
    }, CONSTANT.page = {
        home: CONSTANT.siteUrl + "homeFlat/index.html?POSITIVE",
        search: CONSTANT.siteUrl + "searchFlat/index.html",
        red: CONSTANT.siteUrl + "channelListFlat/index.html",
        green: CONSTANT.siteUrl + "channelListFlat/index.html",
        yellow: CONSTANT.siteUrl + "homeFlat/index.html?pos=KEY_DIBBLING",
        blue: CONSTANT.siteUrl + "homeFlat/index.html?pos=KEY_INFORMATION",
        detailVod: CONSTANT.siteUrl + "detailPageFlat/vod/index.html?categoryId={categoryId}&contentId={contentId}",
        detailSeries: CONSTANT.siteUrl + "detailPageFlat/series/index.html?categoryId={categoryId}&contentId={contentId}",
        detailXileiju: CONSTANT.siteUrl + "detailPageFlat/xilieju/index.html?categoryId={categoryId}&contentId={contentId}",
        playVod: CONSTANT.resources + "playControl/vod.html",
        playTvod: CONSTANT.resources + "playControl/tvod.html",
        playChannel: CONSTANT.resources + "playControl/channel.html",
        playSeries: CONSTANT.resources + "playControl/series.html"
    }
}(), Date.prototype.format = function (e) {
    !e && (e = "yyyy-MM-dd hh:mm:ss");
    var t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3)
    };
    /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").slice(-RegExp.$1.length))), /(W)/.test(e) && (e = e.replace(RegExp.$1, ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][this.getDay()])), /(S+)/.test(e) && (e = e.replace(RegExp.$1, ("00" + this.getMilliseconds()).slice(-3).slice(0, RegExp.$1.length)));
    for (var n in t)t.hasOwnProperty(n) && new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, ("00" + t[n]).slice(-RegExp.$1.length)));
    return e
}, "function" == typeof Function.prototype.bind || (Function.prototype.bind = function (e) {
    var t = this;
    return function () {
        return t.apply(e, arguments)
    }
}), "function" == typeof Function.prototype.before || (Function.prototype.before = function (e) {
    var t = this;
    return function () {
        return applyFn(e, arguments), t.apply(t, arguments)
    }
}), "function" == typeof Function.prototype.after || (Function.prototype.after = function (e) {
    var t = this;
    return function () {
        var n = t.apply(t, arguments);
        return applyFn(e, arguments), n
    }
}), !window.JSON && (window.JSON = {}), "function" == typeof JSON.stringify || (JSON.stringify = stringify), "function" == typeof JSON.parse || (JSON.parse = parse);
var search = {
    get: function (e, t) {
        var n = (t || window.location.search || "").replace(/[^?]*\?/, "");
        if (e && "*" !== e) {
            var i = new RegExp("(^|&)" + e + "(?:=([^&]*))*(&|$)", "i"), r = n.match(i);
            return r && r[2]
        }
        var o = {};
        return n && foreach(n.split("&"), function (e) {
            var t = e.split("=");
            t[0] && ("null" === t[1] ? t[1] = null : "undefined" === t[1] && (t[1] = void 0), o[t[0]] = t[1])
        }), o
    }, toUrl: function (e) {
        var t = [];
        return foreach(e, function (e, n) {
            "undefined" == typeof e || "" === e ? t.push(n) : null !== e && t.push(n + "=" + e)
        }), t.join("&")
    }, append: function (e, t) {
        var n = e || window.location.href, i = this.get("", n.split("?")[1] || "?"), r = t;
        "string" != typeof t && "number" != typeof t || (r = this.get("", "" + t)), foreach(r, function (e, t) {
            i[t] = e
        });
        var o = this.toUrl(i);
        return n = n.replace(/\?.*$|$/, o ? "?" + o : "")
    }
};
Query.isDOM = function (e) {
    return "function" == typeof HTMLElement ? this.isDOM = function (e) {
        return !!(e instanceof HTMLElement)
    } : this.isDOM = function (e) {
        return !(!e || "undefined" == typeof e || 1 !== e.nodeType || "string" != typeof e.nodeName)
    }, this.isDOM(e)
}, Query.isEqualNode = function (e, t) {
    return "isEqualNode" in document.documentElement ? this.isEqualNode = function (e, t) {
        return e === t
    } : this.isEqualNode = function (e, t) {
        if (this.isDOM(e) && this.isDOM(t))try {
            var n = e.nodeName === t.nodeName && e.nodeType === t.nodeType && e.nodeValue === t.nodeValue && e.innerHTML === t.innerHTML;
            return n ? this.isDOM(e.previousSibling) && this.isDOM(t.previousSibling) ? _isEqualNode(e.previousSibling, t.previousSibling) : e.previousSibling === t.previousSibling : !!n
        } catch (i) {
            return !1
        }
        return !1
    }, this.isEqualNode(e, t)
}, Query.prototype = {
    constructor: Query, isDOM: Query.isDOM, length: 0, item: function (e) {
        return Query(this[e])
    }, first: function () {
        return this.item(0)
    }, last: function () {
        return this.item(this.length - 1)
    }, hide: function () {
        for (var e = 0; e < this.length; e++) {
            var t = this[e];
            t && t.style && (t.style.visibility = "hidden")
        }
        return this
    }, show: function () {
        for (var e = 0; e < this.length; e++) {
            var t = this[e];
            t && t.style && (t.style.display = "", t.style.visibility = "visible")
        }
        return this
    }, html: function (e) {
        var t = this[0];
        if (t) {
            if ("undefined" == typeof e)return t.innerHTML || "";
            for (var n = 0; n < this.length; n++)this[n].innerHTML = e
        }
    }, attr: function (e, t) {
        if (this.length)if (1 === arguments.length) {
            if ("string" == typeof e)return this[0].getAttribute(e);
            for (var n = 0; n < this.length; n++)for (var i in e)if (e.hasOwnProperty(i)) {
                var t = e[i];
                null === t ? this[n].removeAttribute(i) : ("undefined" == typeof t && (t = ""), this[n].setAttribute(i, e[i]))
            }
        } else for (var n = 0; n < this.length; n++)this[n].setAttribute(e, t);
        return this
    }, addClass: function (e) {
        var t = !1;
        return "classList" in document.documentElement && (t = !0), this.addClass = function (e) {
            var n = "string" == typeof e ? "" === e ? [] : e.split(" ") : e;
            if (n && n.length)for (var i = 0; i < this.length; i++) {
                var r = this[i];
                if (r) {
                    var o = [];
                    t || (o = r.className ? r.className.split(" ") : []);
                    for (var a in n)n.hasOwnProperty(a) && (t ? r.classList.add(n[a]) : o.push(n[a]));
                    t || (r.className = o.join(" "))
                }
            }
            return this
        }, this.addClass.apply(this, arguments)
    }, removeClass: function (e) {
        var t = !1;
        return "classList" in document.documentElement && (t = !0), this.removeClass = function (e) {
            for (var n = "string" == typeof e ? "" === e ? [] : e.split(" ") : e, i = 0; i < this.length; i++) {
                var r = this[i];
                if (n && n.length) {
                    if (r)if (t)for (var o in n)n.hasOwnProperty(o) && r.classList.remove(n[o]); else {
                        var a = r.className ? r.className.split(" ") : [], s = {};
                        for (var l in n)s[n[l]] = 1;
                        var u = [];
                        for (var l in a) {
                            var c = a[l];
                            s[c] || u.push(c)
                        }
                        r.className = u.join(" ")
                    }
                } else r && r.className && (r.className = "")
            }
            return this
        }, this.removeClass.apply(this, arguments)
    }, css: function () {
        function e() {
            var e = arguments[0], n = arguments[1];
            if (!arguments.length)return t.call(this, this[0]);
            if (1 === arguments.length) {
                if ("string" == typeof e) {
                    var i = t.call(this, this[0]);
                    return i && i[e]
                }
                for (var r = /%|px/, o = 0; o < this.length; o++)for (var a in e)if (e.hasOwnProperty(a)) {
                    var s = e[a], l = {width: 1, height: 1, left: 1, top: 1, right: 1, bottom: 1};
                    l[a] && (r.test(s) || (s += "px")), this[o].style[a] = s
                }
            } else for (var o = 0; o < this.length; o++)this[o].style[e] = n;
            return this
        }

        var t;
        return t = window.getComputedStyle ? function (e) {
            return this.isDOM(e) ? document.defaultView.getComputedStyle(e, null) : void 0
        } : function (e) {
            return this.isDOM(e) ? e.style : void 0
        }, this.css = e, e.apply(this, arguments)
    }, appendTo: function (e) {
        var t = Query(e)[0];
        if (t)for (var n = 0; n < this.length; n++) {
            var i = this[n];
            t.appendChild(i)
        }
        return this
    }, remove: function () {
        for (var e = 0; e < this.length; e++) {
            var t = this[e];
            t.remove ? t.remove() : t.parentNode.removeChild(t)
        }
        return this
    }
};
var topic = {
    namespace: {"default": []}, pub: function (e) {
        e || (e = "default");
        var t = this.namespace[e], n = arraySlice(arguments, 1);
        foreach(t, function (e) {
            applyFn(e, n)
        })
    }, sub: function (e, t) {
        e || (e = "default"), this.namespace[e] || (this.namespace[e] = []), this.namespace[e].push(t)
    }, rm: function (e, t) {
        e || (e = "default"), this.namespace[e] || (this.namespace[e] = []);
        var n = -1;
        foreach(this.namespace[e], function (e, i) {
            return t == e ? (n = i, !0) : void 0
        }), n > -1 && this.namespace[e].splice(n, 1)
    }
}, $ = new Common, __ls = function () {
    var e = function (e, t) {
        localStorage.setItem(e, t)
    }, t = function (e) {
        return localStorage.getItem(e)
    }, n = function (e) {
        localStorage.removeItem(e)
    };
    return inFrame() && (e = function (e, t) {
        applyFn(parent.setItem, [e, t])
    }, t = function (e) {
        return applyFn(parent.getItem, [e])
    }, n = function (e) {
        applyFn(parent.removeItem, [e])
    }), {setItem: e, getItem: t, removeItem: n}
}(), keyTool = {
    keyRespond: function (e) {
        var t = this.keyRespondObj, n = t && "function" == typeof t[e] && t[e]();
        if (!n) {
            var i = this.silenceKeyRespondObj;
            n = i && "function" == typeof i[e] && i[e]()
        }
        return n
    }, keyRespondObj: {}, setKeyRespond: function (e) {
        this.keyRespondObj = joinObj({}, e)
    }, silenceKeyRespondObj: {}, setSilenceKeyRespond: function (e) {
        this.silenceKeyRespondObj = joinObj({}, e)
    }
}, pluginTool = {
    _plugins: {
        demoPlugin: {
            key: "demoPlugin", level: 9, keysMap: {
                KEY_0: function () {
                }
            }, silenceKeys: [], show: DUMP_FN, hide: DUMP_FN
        }
    }, _defaultPlauins: {}, add: function (e, t) {
        if (this._plugins[e] = t, 1 === t.level) {
            this._defaultPlauins[e] = t;
            var n = {};
            for (var i in this._defaultPlauins) {
                var r = this._defaultPlauins[i];
                if (r && r.keysMap && r.silenceKeys) {
                    var o = {};
                    for (var a in r.silenceKeys) {
                        var e = r.silenceKeys[a];
                        o[e] = r.keysMap[e]
                    }
                    joinObj(n, o)
                }
            }
            keyTool.setSilenceKeyRespond(joinObj({}, n))
        }
    }, get: function (e) {
        return this._plugins[e]
    }, activeKey: "", takeover: "", active: function (e) {
        var t = this._plugins[e];
        if (t) {
            if (this.activeKey !== e) {
                var n = this._plugins[this.activeKey];
                n && n.takeover && n.takeover() ? (this.takeover = this.activeKey, this.get(this.activeKey).blur()) : n && n.hide && n.hide(), keyTool.setKeyRespond(t.keysMap), this.activeKey = e
            }
            return e
        }
    }, deactive: function () {
        if (this.activeKey)if (this.takeover) {
            var e = this.takeover;
            this.takeover = "", this.active(e), this.get(e).focus()
        } else this.activeKey = "", keyTool.setKeyRespond({})
    }
}, getFTPFilePath = function () {
    function e(e) {
        for (var i = "", r = 1, o = e.length - 7 <= 0 ? 0 : e.length - 8; o < e.length; o++)r *= n(e.charAt(o)) % 9 + 1;
        for (var o = 1; o < e.length; o++)i += t(e.charAt(o), (n(e.charAt(o - 1)) % 9 + o) * r * o);
        return i
    }

    function t(e, t) {
        var r = n(e) + t;
        return r %= 122, 65 > r && (r += 65), r > 122 && (r = 122 - r % 122), r > 90 && 97 > r && (r = t % 2 == 0 ? 90 - r % 90 : 97 + r % 90), i(r)
    }

    function n(e) {
        return parseInt(e, 10) + 48
    }

    function i(e) {
        return {
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            97: "a",
            98: "b",
            99: "c",
            100: "d",
            101: "e",
            102: "f",
            103: "g",
            104: "h",
            105: "i",
            106: "j",
            107: "k",
            108: "l",
            109: "m",
            110: "n",
            111: "o",
            112: "p",
            113: "q",
            114: "r",
            115: "s",
            116: "t",
            117: "u",
            118: "v",
            119: "w",
            120: "x",
            121: "y",
            122: "z"
        }[e]
    }

    return function (t, n) {
        for (var i = [], r = "", o = t.length; o > 0; o -= 4)i.push(t.substring(o > 4 ? o - 4 : 0, o));
        for (var a = e(t), o = i.length - 1; o > 0; o--)r += i[o] + "/";
        return r = r + a + i[0] + "." + n
    }
}();
$.keyPressSetting(getDefaultKeysMap()), pluginTool.add("g_volume", function () {
    function e(e) {
        $(".progress", i[0]).css({width: (e || 1) + "%"}), $(".num", i[0]).html(e), 0 === e ? (i.addClass("silence"), t(!0)) : (i.removeClass("silence"), t(!1))
    }

    function t(e) {
        s(), e ? r.show() : r.hide()
    }

    var n, i, r, o = "g_volume", a = 1, s = function () {
        if (!i) {
            var e = $("<div>");
            e.html('<!-- 音量 --><div class="volumePanelState"></div><div class="volumePanel"><div class="icon"></div><div class="groove"><div class="progress"></div></div><div class="num"></div></div>'), e.appendTo("body"), i = $(".volumePanel"), n = AutoHide({
                dom: i,
                delay: 3e3,
                beforeShow: function () {
                    pluginTool.active(o)
                },
                afterHide: function () {
                    pluginTool.deactive()
                }
            }), r = $(".volumePanelState")
        }
    }, l = function () {
        s(), n.show()
    }, u = function () {
        n && n.hide()
    };
    return {
        key: o, level: a, show: l, hide: u, keysMap: {
            KEY_VOLUME_UP: function () {
                if (window.mp) {
                    l();
                    var t = mp.getVolume();
                    t += 5, 100 >= t && t >= 0 && (mp.setVolume(t), e(t))
                }
                return !0
            }, KEY_VOLUME_DOWN: function () {
                if (window.mp) {
                    l();
                    var t = mp.getVolume();
                    t -= 5, 100 >= t && t >= 0 && (mp.setVolume(t), e(t))
                }
                return !0
            }, KEY_MUTE: function () {
                if (window.mp) {
                    u();
                    var e = !mp.getMuteFlag();
                    mp.setMuteFlag(e), t(e)
                }
                return !0
            }, KEY_RETURN: function () {
                return u(), !0
            }
        }, silenceKeys: ["KEY_VOLUME_UP", "KEY_VOLUME_DOWN", "KEY_MUTE"], init: function () {
            return window.mp ? ($(function () {
                s();
                var n = mp.getVolume(), i = mp.getMuteFlag();
                !n && (i = !0), e(n), t(i)
            }), !0) : !1
        }, hideMute: function () {
            t(!1)
        }
    }
}()), topic.sub("callSizeLivePlay", function () {
    pluginTool.get("g_volume").init(), mp.stop = mp.stop.bind(mp).after(function () {
        pluginTool.get("g_volume").hideMute()
    })
});
var syncLoading = [];
dirInPlayControl() && syncLoading.push('<script src="' + $.getConstant("resources") + 'jsFlat/epg-reserve/js/index.js"></script>'), syncLoading.length && document.write(syncLoading.join("")), inFrame() ? parent.document.onkeypress = keyEvent : document.onkeypress = keyEvent;