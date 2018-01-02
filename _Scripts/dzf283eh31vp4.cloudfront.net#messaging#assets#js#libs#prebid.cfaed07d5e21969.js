/* jshint ignore:start */
/* prebid.cfaed07d5e21969.js v0.21.0
 Updated : 2017-04-07 */
!(function(e) {
    function t(n) {
        if (r[n])
            return r[n].exports;
        var i = r[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
})([(function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    function i() {
        for (var e = 0; e < m.que.length; e++)
            if (d(m.que[e].called) === _)
                try {
                    m.que[e].call(), m.que[e].called = !0
                } catch (t) {
                    v.logError("Error processing command :", "prebid.cfaed07d5e21969.js", t)
                }
    }
    function o(e) {
        var t = m._bidsRequested.map((function(e) {
            return e.bids.map((function(e) {
                return e.placementCode
            }))
        })).reduce(l.flatten).filter(l.uniques);
        return v.contains(t, e) ? !0 : (v.logError('The "' + e + '" placement is not defined.'), void 0)
    }
    function a() {
        m._bidsRequested = [], m._bidsReceived = m._bidsReceived.filter((function(e) {
            return !m._adUnitCodes.includes(e.adUnitCode)
        }))
    }
    function s(e, t, r) {
        e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = t, e.defaultView.frameElement.height = r)
    }
    var u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = r(1),
        l = r(2),
        f = r(4);
    r(20);
    var p = r(11),
        g = r(14),
        b = r(49),
        m = c.getGlobal(),
        y = r(3),
        v = r(2),
        h = r(13),
        T = r(5),
        S = r(12),
        I = r(16),
        w = r(8),
        E = r(50),
        A = r(51),
        j = "function",
        _ = "undefined",
        O = "object",
        C = y.EVENTS.BID_WON,
        B = y.EVENTS.SET_TARGETING,
        x = !1,
        N = [],
        R = {
            bidWon: o
        };
    m._bidsRequested = [], m._bidsReceived = [], m._adUnitCodes = [], m._winningBids = [], m._adsReceived = [], m._sendAllBids = !1, m.bidderSettings = m.bidderSettings || {}, m.bidderTimeout = m.bidderTimeout || 3e3, m.cbTimeout = m.cbTimeout || 200, m.timeoutBuffer = 200, m.logging = m.logging || !1, m.publisherDomain = m.publisherDomain || window.location.origin, m.libLoaded = !0, m.version = "v0.21.0", v.logInfo("Prebid.js v0.21.0 loaded"), m.adUnits = m.adUnits || [], m.que.push = function(e) {
        if (("undefined" == typeof e ? "undefined" : d(e)) === j)
            try {
                e.call()
            } catch (t) {
                v.logError("Error processing command :" + t.message)
            }
        else
            v.logError("Commands written into pbjs.que.push must wrapped in a function")
    }, m.getAdserverTargetingForAdUnitCodeStr = function(e) {
        if (v.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments), e) {
            var t = m.getAdserverTargetingForAdUnitCode(e);
            return v.transformAdServerTargetingObj(t)
        }
        v.logMessage("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode")
    }, m.getAdserverTargetingForAdUnitCode = function(e) {
        return m.getAdserverTargeting(e)[e]
    }, m.getAdserverTargeting = function(e) {
        return v.logInfo("Invoking pbjs.getAdserverTargeting", arguments), A.getAllTargeting(e).map((function(e) {
            return n({}, Object.keys(e)[0], e[Object.keys(e)[0]].map((function(e) {
                return n({}, Object.keys(e)[0], e[Object.keys(e)[0]].join(", "))
            })).reduce((function(e, t) {
                return u(t, e)
            }), {}))
        })).reduce((function(e, t) {
            var r = Object.keys(t)[0];
            return e[r] = u({}, e[r], t[r]), e
        }), {})
    }, m.getBidResponses = function() {
        v.logInfo("Invoking pbjs.getBidResponses", arguments);
        var e = m._bidsReceived.filter(l.adUnitsFilter.bind(this, m._adUnitCodes)),
            t = e && e.length && e[e.length - 1].requestId;
        return e.map((function(e) {
            return e.adUnitCode
        })).filter(l.uniques).map((function(r) {
            return e.filter((function(e) {
                return e.requestId === t && e.adUnitCode === r
            }))
        })).filter((function(e) {
            return e && e[0] && e[0].adUnitCode
        })).map((function(e) {
            return n({}, e[0].adUnitCode, {
                bids: e
            })
        })).reduce((function(e, t) {
            return u(e, t)
        }), {})
    }, m.getBidResponsesForAdUnitCode = function(e) {
        var t = m._bidsReceived.filter((function(t) {
            return t.adUnitCode === e
        }));
        return {
            bids: t
        }
    }, m.setTargetingForGPTAsync = function() {
        return v.logInfo("Invoking pbjs.setTargetingForGPTAsync", arguments), l.isGptPubadsDefined() ? (A.resetPresetTargeting(), A.setTargeting(A.getAllTargeting()), w.emit(B), void 0) : (v.logError("window.googletag is not defined on the page"), void 0)
    }, m.setTargetingForAst = function() {
        return v.logInfo("Invoking pbjs.setTargetingForAn", arguments), A.isApntagDefined() ? (A.setTargetingForAst(), w.emit(B), void 0) : (v.logError("window.apntag is not defined on the page"), void 0)
    }, m.allBidsAvailable = function() {
        return v.logInfo("Invoking pbjs.allBidsAvailable", arguments), h.bidsBackAll()
    }, m.renderAd = function(e, t) {
        if (v.logInfo("Invoking pbjs.renderAd", arguments), v.logMessage("Calling renderAd with adId :" + t), e && t)
            try {
                var r = m._bidsReceived.find((function(e) {
                    return e.adId === t
                }));
                if (r) {
                    m._winningBids.push(r), w.emit(C, r);
                    var n = r.height,
                        i = r.width,
                        o = r.adUrl,
                        a = r.ad;
                    e === document || "video" === r.mediaType ? v.logError("Error trying to write ad. Ad render call ad id " + t + " was prevented from writing to the main document.") : a ? (l.isSrcdocSupported(e) ? e.defaultView.frameElement.srcdoc = a : (e.write(a), e.close()), s(e, i, n)) : o ? (e.write('<IFRAME SRC="' + o + '" FRAMEBORDER="0" SCROLLING="no" MARGINHEIGHT="0" MARGINWIDTH="0" TOPMARGIN="0" LEFTMARGIN="0" ALLOWTRANSPARENCY="true" WIDTH="' + i + '" HEIGHT="' + n + '"></IFRAME>'), e.close(), s(e, i, n)) : v.logError("Error trying to write ad. No ad for bid response id: " + t)
                } else
                    v.logError("Error trying to write ad. Cannot find ad by given id : " + t)
            } catch (u) {
                v.logError("Error trying to write ad Id :" + t + " to the page:" + u.message)
            }
        else
            v.logError("Error trying to write ad Id :" + t + " to the page. Missing document or adId")
    }, m.removeAdUnit = function(e) {
        if (v.logInfo("Invoking pbjs.removeAdUnit", arguments), e)
            for (var t = 0; t < m.adUnits.length; t++)
                m.adUnits[t].code === e && m.adUnits.splice(t, 1)
    }, m.clearAuction = function() {
        x = !1, v.logMessage("Prebid auction cleared"), N.length && N.shift()()
    }, m.requestBids = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.bidsBackHandler,
            r = e.timeout,
            n = e.adUnits,
            i = e.adUnitCodes;
        w.emit("requestBids");
        var o = m.cbTimeout = r || m.bidderTimeout;
        n = n || m.adUnits, v.logInfo("Invoking pbjs.requestBids", arguments), i && i.length ? n = n.filter((function(e) {
            return i.includes(e.code)
        })) : i = n && n.map((function(e) {
            return e.code
        }));
        var s = n.filter(f.videoAdUnit).filter(f.hasNonVideoBidder);
        if (s.forEach((function(e) {
            v.logError("adUnit " + e.code + " has 'mediaType' set to 'video' but contains a bidder that doesn't support video. No Prebid demand requests will be triggered for this adUnit.");
            for (var t = 0; t < n.length; t++)
                n[t].code === e.code && n.splice(t, 1)
        })), x)
            return N.push((function() {
                m.requestBids({
                    bidsBackHandler: t,
                    timeout: o,
                    adUnits: n,
                    adUnitCodes: i
                })
            })), void 0;
        if (x = !0, m._adUnitCodes = i, h.externalCallbackReset(), a(), !n || 0 === n.length)
            return v.logMessage("No adUnits configured. No bids requested."), ("undefined" == typeof t ? "undefined" : d(t)) === j && h.addOneTimeCallback(t, !1), h.executeCallback(), void 0;
        var u = !0,
            c = h.executeCallback.bind(h, u),
            l = setTimeout(c, o);
        ("undefined" == typeof t ? "undefined" : d(t)) === j && h.addOneTimeCallback(t, l), T.callBids({
            adUnits: n,
            adUnitCodes: i,
            cbTimeout: o
        }), 0 === m._bidsRequested.length && h.executeCallback()
    }, m.addAdUnits = function(e) {
        v.logInfo("Invoking pbjs.addAdUnits", arguments), v.isArray(e) ? (e.forEach((function(e) {
            return e.transactionId = v.generateUUID()
        })), m.adUnits.push.apply(m.adUnits, e)) : ("undefined" == typeof e ? "undefined" : d(e)) === O && (e.transactionId = v.generateUUID(), m.adUnits.push(e))
    }, m.onEvent = function(e, t, r) {
        return v.logInfo("Invoking pbjs.onEvent", arguments), v.isFn(t) ? r && !R[e].call(null, r) ? (v.logError('The id provided is not valid for event "' + e + '" and no handler was set.'), void 0) : (w.on(e, t, r), void 0) : (v.logError('The event handler provided is not a function and was not set on event "' + e + '".'), void 0)
    }, m.offEvent = function(e, t, r) {
        v.logInfo("Invoking pbjs.offEvent", arguments), (!r || R[e].call(null, r)) && w.off(e, t, r)
    }, m.addCallback = function(e, t) {
        v.logInfo("Invoking pbjs.addCallback", arguments);
        var r = null;
        return e && t && ("undefined" == typeof t ? "undefined" : d(t)) === j ? (r = v.getUniqueIdentifierStr, h.addCallback(r, t, e), r) : (v.logError("error registering callback. Check method signature"), r)
    }, m.removeCallback = function() {
        return null
    }, m.registerBidAdapter = function(e, t) {
        v.logInfo("Invoking pbjs.registerBidAdapter", arguments);
        try {
            T.registerBidAdapter(e(), t)
        } catch (r) {
            v.logError("Error registering bidder adapter : " + r.message)
        }
    }, m.registerAnalyticsAdapter = function(e) {
        v.logInfo("Invoking pbjs.registerAnalyticsAdapter", arguments);
        try {
            T.registerAnalyticsAdapter(e)
        } catch (t) {
            v.logError("Error registering analytics adapter : " + t.message)
        }
    }, m.bidsAvailableForAdapter = function(e) {
        v.logInfo("Invoking pbjs.bidsAvailableForAdapter", arguments), m._bidsRequested.find((function(t) {
            return t.bidderCode === e
        })).bids.map((function(t) {
            return u(t, S.createBid(1), {
                bidderCode: e,
                adUnitCode: t.placementCode
            })
        })).map((function(e) {
            return m._bidsReceived.push(e)
        }))
    }, m.createBid = function(e) {
        return v.logInfo("Invoking pbjs.createBid", arguments), S.createBid(e)
    }, m.addBidResponse = function(e, t) {
        v.logInfo("Invoking pbjs.addBidResponse", arguments), h.addBidResponse(e, t)
    }, m.loadScript = function(e, t, r) {
        v.logInfo("Invoking pbjs.loadScript", arguments), I.loadScript(e, t, r)
    }, m.enableAnalytics = function(e) {
        e && !v.isEmpty(e) ? (v.logInfo("Invoking pbjs.enableAnalytics for: ", e), T.enableAnalytics(e)) : v.logError("pbjs.enableAnalytics should be called with option {}")
    }, m.aliasBidder = function(e, t) {
        v.logInfo("Invoking pbjs.aliasBidder", arguments), e && t ? T.aliasBidAdapter(e, t) : v.logError("bidderCode and alias must be passed as arguments", "pbjs.aliasBidder")
    }, m.setPriceGranularity = function(e) {
        if (v.logInfo("Invoking pbjs.setPriceGranularity", arguments), !e)
            return v.logError("Prebid Error: no value passed to `setPriceGranularity()`"), void 0;
        if ("string" == typeof e)
            h.setPriceGranularity(e);
        else if ("object" === ("undefined" == typeof e ? "undefined" : d(e))) {
            if (!g.isValidePriceConfig(e))
                return v.logError("Invalid custom price value passed to `setPriceGranularity()`"), void 0;
            h.setCustomPriceBucket(e), h.setPriceGranularity(y.GRANULARITY_OPTIONS.CUSTOM), v.logMessage("Using custom price granularity")
        }
    }, m.enableSendAllBids = function() {
        m._sendAllBids = !0
    }, m.getAllWinningBids = function() {
        return m._winningBids
    }, m.buildMasterVideoTagFromAdserverTag = function(e, t) {
        v.logInfo("Invoking pbjs.buildMasterVideoTagFromAdserverTag", arguments);
        var r = p.parse(e);
        if (0 === m._bidsReceived.length)
            return e;
        var n = "";
        if ("dfp" !== t.adserver.toLowerCase())
            return v.logError("Only DFP adserver is supported"), void 0;
        var i = E.dfpAdserver(t, r);
        return i.verifyAdserverTag() || v.logError("Invalid adserverTag, required google params are missing in query string"), i.appendQueryParams(), n = p.format(i.urlComponents)
    }, m.setBidderSequence = function(e) {
        e === y.ORDER.RANDOM && T.setBidderSequence(y.ORDER.RANDOM)
    }, m.getHighestCpmBids = function(e) {
        return A.getWinningBids(e)
    }, m.que.push((function() {
        return b.listenMessagesFromCreative()
    })), i()
}), (function(e, t) {
    "use strict";
    function r() {
        return window.pbjs
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getGlobal = r, window.pbjs = window.pbjs || {}, window.pbjs.que = window.pbjs.que || []
}), (function(e, t, r) {
    "use strict";
    function n() {
        return B() + Math.random().toString(16).substr(2)
    }
    function i() {
        return window.console && window.console.log
    }
    function o(e, t, r) {
        return r.indexOf(e) === t
    }
    function a(e, t) {
        return e.concat(t)
    }
    function s(e) {
        return pbjs._bidsRequested.map((function(t) {
            return t.bids.find((function(t) {
                return t.bidId === e
            }))
        })).find((function(e) {
            return e
        }))
    }
    function u(e) {
        return Object.keys(e)
    }
    function d(e, t) {
        return e[t]
    }
    function c() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : pbjs.adUnits;
        return e.map((function(e) {
            return e.bids.map((function(e) {
                return e.bidder
            })).reduce(a, [])
        })).reduce(a).filter(o)
    }
    function l() {
        return window.googletag && t.isFn(window.googletag.pubads) && t.isFn(window.googletag.pubads().getSlots) ? !0 : void 0
    }
    function f(e, t) {
        return e.cpm === t.cpm ? e.timeToRespond > t.timeToRespond ? t : e : e.cpm < t.cpm ? t : e
    }
    function p(e) {
        for (var t = e.length; t > 0;) {
            var r = Math.floor(Math.random() * t);
            t--;
            var n = e[t];
            e[t] = e[r], e[r] = n
        }
        return e
    }
    function g(e, t) {
        return e.includes(t && t.placementCode || t && t.adUnitCode)
    }
    function b(e) {
        return !!e.defaultView && "srcdoc" in e.defaultView.frameElement && !/firefox/i.test(navigator.userAgent)
    }
    function m(e) {
        return JSON.parse(JSON.stringify(e))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.uniques = o, t.flatten = a, t.getBidRequest = s, t.getKeys = u, t.getValue = d, t.getBidderCodes = c, t.isGptPubadsDefined = l, t.getHighestCpm = f, t.shuffle = p, t.adUnitsFilter = g, t.isSrcdocSupported = b, t.cloneJson = m;
    var v = r(3),
        h = "object",
        T = "string",
        S = "number",
        I = !1,
        w = "Array",
        E = "String",
        A = "Function",
        j = "Number",
        _ = Object.prototype.toString,
        O = null;
    try {
        O = console.info.bind(window.console)
    } catch (C) {}
    t.replaceTokenInString = function(e, t, r) {
        return this._each(t, (function(t, n) {
            t = void 0 === t ? "" : t;
            var i = r + n.toUpperCase() + r,
                o = new RegExp(i, "g");
            e = e.replace(o, t)
        })), e
    };
    var B = (function() {
        var e = 0;
        return function() {
            return e++, e
        }
    })();
    t.getUniqueIdentifierStr = n, t.generateUUID = function P(e) {
        return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, P)
    }, t.getBidIdParameter = function(e, t) {
        return t && t[e] ? t[e] : ""
    }, t.tryAppendQueryString = function(e, t, r) {
        return r ? e += t + "=" + encodeURIComponent(r) + "&" : e
    }, t.parseQueryStringParameters = function(e) {
        var t = "";
        for (var r in e)
            e.hasOwnProperty(r) && (t += r + "=" + encodeURIComponent(e[r]) + "&");
        return t
    }, t.transformAdServerTargetingObj = function(e) {
        return e && Object.getOwnPropertyNames(e).length > 0 ? u(e).map((function(t) {
            return t + "=" + encodeURIComponent(d(e, t))
        })).join("&") : ""
    }, t.parseSizesInput = function(e) {
        var t = [];
        if (("undefined" == typeof e ? "undefined" : y(e)) === T) {
            var r = e.split(","),
                n = /^(\d)+x(\d)+$/i;
            if (r)
                for (var i in r)
                    U(r, i) && r[i].match(n) && t.push(r[i])
        } else if (("undefined" == typeof e ? "undefined" : y(e)) === h) {
            var o = e.length;
            if (o > 0)
                if (2 === o && y(e[0]) === S && y(e[1]) === S)
                    t.push(this.parseGPTSingleSizeArray(e));
                else
                    for (var a = 0; o > a; a++)
                        t.push(this.parseGPTSingleSizeArray(e[a]))
        }
        return t
    }, t.parseGPTSingleSizeArray = function(e) {
        return !this.isArray(e) || 2 !== e.length || isNaN(e[0]) || isNaN(e[1]) ? void 0 : e[0] + "x" + e[1]
    }, t.getTopWindowLocation = function() {
        var e = void 0;
        try {
            e = window.top.location
        } catch (t) {
            e = window.location
        }
        return e
    }, t.getTopWindowUrl = function() {
        var e = void 0;
        try {
            e = this.getTopWindowLocation().href
        } catch (t) {
            e = ""
        }
        return e
    }, t.logWarn = function(e) {
        N() && console.warn && console.warn("WARNING: " + e)
    }, t.logInfo = function(e, t) {
        N() && i() && O && (t && 0 !== t.length || (t = ""), O("INFO: " + e + ("" === t ? "" : " : params : "), t))
    }, t.logMessage = function(e) {
        N() && i() && console.log("MESSAGE: " + e)
    }, t.hasConsoleLogger = i;
    var x = (function(e) {
            return e ? window.console.error ? "error" : "log" : ""
        })(i()),
        N = function() {
            return pbjs.logging === !1 && I === !1 && (pbjs.logging = "TRUE" === R(v.DEBUG_MODE).toUpperCase(), I = !0), !!pbjs.logging
        };
    t.debugTurnedOn = N, t.logError = function(e, t, r) {
        var n = t || "ERROR";
        N() && i() && console[x](console, n + ": " + e, r || "")
    }, t.createInvisibleIframe = function() {
        var e = document.createElement("iframe");
        return e.id = n(), e.height = 0, e.width = 0, e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", e.frameBorder = "0", e.src = "about:blank", e.style.display = "none", e
    };
    var R = function(e) {
        var t = "[\\?&]" + e + "=([^&#]*)",
            r = new RegExp(t),
            n = r.exec(window.location.search);
        return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
    };
    t.hasValidBidRequest = function(e, t, r) {
        function n(e, r) {
            r === t[o] && (i = !0)
        }
        for (var i = !1, o = 0; o < t.length; o++)
            if (i = !1, this._each(e, n), !i)
                return this.logError("Params are missing for bid request. One of these required paramaters are missing: " + t, r), !1;
        return !0
    }, t.addEventHandler = function(e, t, r) {
        e.addEventListener ? e.addEventListener(t, r, !0) : e.attachEvent && e.attachEvent("on" + t, r)
    }, t.isA = function(e, t) {
        return _.call(e) === "[object " + t + "]"
    }, t.isFn = function(e) {
        return this.isA(e, A)
    }, t.isStr = function(e) {
        return this.isA(e, E)
    }, t.isArray = function(e) {
        return this.isA(e, w)
    }, t.isNumber = function(e) {
        return this.isA(e, j)
    }, t.isEmpty = function(e) {
        if (!e)
            return !0;
        if (this.isArray(e) || this.isStr(e))
            return !(e.length > 0);
        for (var t in e)
            if (hasOwnProperty.call(e, t))
                return !1;
        return !0
    }, t.isEmptyStr = function(e) {
        return this.isStr(e) && (!e || 0 === e.length)
    }, t._each = function(e, t) {
        if (!this.isEmpty(e)) {
            if (this.isFn(e.forEach))
                return e.forEach(t, this);
            var r = 0,
                n = e.length;
            if (n > 0)
                for (; n > r; r++)
                    t(e[r], r, e);
            else
                for (r in e)
                    hasOwnProperty.call(e, r) && t.call(this, e[r], r)
        }
    }, t.contains = function(e, t) {
        if (this.isEmpty(e))
            return !1;
        if (this.isFn(e.indexOf))
            return -1 !== e.indexOf(t);
        for (var r = e.length; r--;)
            if (e[r] === t)
                return !0;
        return !1
    }, t.indexOf = (function() {
        return Array.prototype.indexOf ? Array.prototype.indexOf : void 0
    })(), t._map = function(e, t) {
        if (this.isEmpty(e))
            return [];
        if (this.isFn(e.map))
            return e.map(t);
        var r = [];
        return this._each(e, (function(n, i) {
            r.push(t(n, i, e))
        })), r
    };
    var U = function(e, t) {
        return e.hasOwnProperty ? e.hasOwnProperty(t) : "undefined" != typeof e[t] && e.constructor.prototype[t] !== e[t]
    };
    t.createTrackPixelHtml = function(e) {
        if (!e)
            return "";
        var t = encodeURI(e),
            r = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
        return r += '<img src="' + t + '"></div>'
    }, t.createTrackPixelIframeHtml = function(e) {
        return e ? '<iframe frameborder="0" allowtransparency="true" marginheight="0" marginwidth="0" width="0" hspace="0" vspace="0" height="0" style="height:0p;width:0p;display:none;" scrolling="no" src="' + encodeURI(e) + '"></iframe>' : ""
    }, t.getIframeDocument = function(e) {
        if (e) {
            var t = void 0;
            try {
                t = e.contentWindow ? e.contentWindow.document : e.contentDocument.document ? e.contentDocument.document : e.contentDocument
            } catch (r) {
                this.logError("Cannot get iframe document", r)
            }
            return t
        }
    }, t.getValueString = function(e, t, r) {
        return void 0 === t || null === t ? r : this.isStr(t) ? t : this.isNumber(t) ? t.toString() : (this.logWarn("Unsuported type for param: " + e + " required type: String"), void 0)
    }
}), (function(e) {
    e.exports = {
        JSON_MAPPING: {
            PL_CODE: "code",
            PL_SIZE: "sizes",
            PL_BIDS: "bids",
            BD_BIDDER: "bidder",
            BD_ID: "paramsd",
            BD_PL_ID: "placementId",
            ADSERVER_TARGETING: "adserverTargeting",
            BD_SETTING_STANDARD: "standard"
        },
        REPO_AND_VERSION: "prebid_prebid_0.21.0",
        DEBUG_MODE: "pbjs_debug",
        STATUS: {
            GOOD: 1,
            NO_BID: 2
        },
        CB: {
            TYPE: {
                ALL_BIDS_BACK: "allRequestedBidsBack",
                AD_UNIT_BIDS_BACK: "adUnitBidsBack",
                BID_WON: "bidWon",
                REQUEST_BIDS: "requestBids"
            }
        },
        objectType_function: "function",
        objectType_undefined: "undefined",
        objectType_object: "object",
        objectType_string: "string",
        objectType_number: "number",
        EVENTS: {
            AUCTION_INIT: "auctionInit",
            AUCTION_END: "auctionEnd",
            BID_ADJUSTMENT: "bidAdjustment",
            BID_TIMEOUT: "bidTimeout",
            BID_REQUESTED: "bidRequested",
            BID_RESPONSE: "bidResponse",
            BID_WON: "bidWon",
            SET_TARGETING: "setTargeting",
            REQUEST_BIDS: "requestBids"
        },
        EVENT_ID_PATHS: {
            bidWon: "adUnitCode"
        },
        ORDER: {
            RANDOM: "random"
        },
        GRANULARITY_OPTIONS: {
            LOW: "low",
            MEDIUM: "medium",
            HIGH: "high",
            AUTO: "auto",
            DENSE: "dense",
            CUSTOM: "custom"
        },
        TARGETING_KEYS: ["hb_bidder", "hb_adid", "hb_pb", "hb_size", "hb_deal"]
    }
}), (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.hasNonVideoBidder = t.videoAdUnit = void 0;
    {
        var n = r(5),
            i = (t.videoAdUnit = function(e) {
                return "video" === e.mediaType
            }, function(e) {
                return !n.videoAdapters.includes(e.bidder)
            });
        t.hasNonVideoBidder = function(e) {
            return e.bids.filter(i).length
        }
    }
}), (function(e, t, r) {
    "use strict";
    function n(e) {
        var t = e.bidderCode,
            r = e.requestId,
            n = e.bidderRequestId,
            i = e.adUnits;
        return i.map((function(e) {
            return e.bids.filter((function(e) {
                return e.bidder === t
            })).map((function(t) {
                var i = e.sizes;
                if (e.sizeMapping) {
                    var a = s.mapSizes(e);
                    if ("" === a)
                        return "";
                    i = a
                }
                return o({}, t, {
                    placementCode: e.code,
                    mediaType: e.mediaType,
                    transactionId: e.transactionId,
                    sizes: i,
                    bidId: d.getUniqueIdentifierStr(),
                    bidderRequestId: n,
                    requestId: r
                })
            }))
        })).reduce(a.flatten, []).filter((function(e) {
            return "" !== e
        }))
    }
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        a = r(2),
        s = r(6),
        u = r(7),
        d = r(2),
        c = r(3),
        l = r(8),
        f = {};
    t.bidderRegistry = f;
    var p = {},
        g = null;
    t.callBids = function(e) {
        var t = e.adUnits,
            r = e.cbTimeout,
            i = d.generateUUID(),
            o = Date.now(),
            s = {
                timestamp: o,
                requestId: i
            };
        l.emit(c.EVENTS.AUCTION_INIT, s);
        var u = a.getBidderCodes(t);
        g === c.ORDER.RANDOM && (u = a.shuffle(u)), u.forEach((function(e) {
            var a = f[e];
            if (a) {
                var s = d.getUniqueIdentifierStr(),
                    u = {
                        bidderCode: e,
                        requestId: i,
                        bidderRequestId: s,
                        bids: n({
                            bidderCode: e,
                            requestId: i,
                            bidderRequestId: s,
                            adUnits: t
                        }),
                        start: (new Date).getTime(),
                        auctionStart: o,
                        timeout: r
                    };
                u.bids && 0 !== u.bids.length && (d.logMessage("CALLING BIDDER ======= " + e), pbjs._bidsRequested.push(u), l.emit(c.EVENTS.BID_REQUESTED, u), a.callBids(u))
            } else
                d.logError("Adapter trying to be called which does not exist: " + e + " adaptermanager.callBids")
        }))
    }, t.registerBidAdapter = function(e, t) {
        e && t ? i(e.callBids) === c.objectType_function ? f[t] = e : d.logError("Bidder adaptor error for bidder code: " + t + "bidder must implement a callBids() function") : d.logError("bidAdaptor or bidderCode not specified")
    }, t.aliasBidAdapter = function(e, t) {
        var r = f[t];
        if (("undefined" == typeof r ? "undefined" : i(r)) === c.objectType_undefined) {
            var n = f[e];
            if (("undefined" == typeof n ? "undefined" : i(n)) === c.objectType_undefined)
                d.logError('bidderCode "' + e + '" is not an existing bidder.', "adaptermanager.aliasBidAdapter");
            else
                try {
                    var o = null;
                    n instanceof u.BaseAdapter ? d.logError(e + " bidder does not currently support aliasing.", "adaptermanager.aliasBidAdapter") : (o = n.createNew(), o.setBidderCode(t), this.registerBidAdapter(o, t))
                } catch (a) {
                    d.logError(e + " bidder does not currently support aliasing.", "adaptermanager.aliasBidAdapter")
                }
        } else
            d.logMessage('alias name "' + t + '" has been already specified.')
    }, t.registerAnalyticsAdapter = function(e) {
        var t = e.adapter,
            r = e.code;
        t && r ? i(t.enableAnalytics) === c.objectType_function ? (t.code = r, p[r] = t) : d.logError('Prebid Error: Analytics adaptor error for analytics "' + r + '"\n        analytics adapter must implement an enableAnalytics() function') : d.logError("Prebid Error: analyticsAdapter or analyticsCode not specified")
    }, t.enableAnalytics = function(e) {
        d.isArray(e) || (e = [e]), d._each(e, (function(e) {
            var t = p[e.provider];
            t ? t.enableAnalytics(e) : d.logError("Prebid Error: no analytics adapter found in registry for\n        " + e.provider + ".")
        }))
    }, t.setBidderSequence = function(e) {
        g = e
    };
    var b = r(9);
    t.registerBidAdapter(new b, "aol");
    var m = r(15);
    t.registerBidAdapter(new m, "appnexus");
    var y = r(18);
    t.registerBidAdapter(new y, "rubicon");
    var v = r(19);
    t.registerBidAdapter(new v, "pubmatic"), t.videoAdapters = []
}), (function(e, t, r) {
    "use strict";
    function n(e) {
        if (e && e.__esModule)
            return e;
        var t = {};
        if (null != e)
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e, t
    }
    function i(e) {
        if (!o(e.sizeMapping))
            return e.sizes;
        var t = a();
        if (!t) {
            var r = e.sizeMapping.reduce((function(e, t) {
                return e.minWidth < t.minWidth ? t : e
            }));
            return r.sizes ? r.sizes : e.sizes
        }
        var n = "",
            i = e.sizeMapping.find((function(e) {
                return t > e.minWidth
            }));
        return i && i.sizes ? (n = i.sizes, d.logMessage("AdUnit : " + e.code + " resized based on device width to : " + n)) : d.logMessage("AdUnit : " + e.code + " not mapped to any sizes for device width. This request will be suppressed."), n
    }
    function o(e) {
        return d.isArray(e) && e.length > 0 ? !0 : (d.logInfo("No size mapping defined"), !1)
    }
    function a(e) {
        var t = e || c || window,
            r = t.document;
        return t.innerWidth ? t.innerWidth : r.body.clientWidth ? r.body.clientWidth : r.documentElement.clientWidth ? r.documentElement.clientWidth : 0
    }
    function s(e) {
        c = e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.setWindow = t.getScreenWidth = t.mapSizes = void 0;
    var u = r(2),
        d = n(u),
        c = void 0;
    t.mapSizes = i, t.getScreenWidth = a, t.setWindow = s
}), (function(e, t) {
    "use strict";
    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    {
        var n = (function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        })();
        t.BaseAdapter = (function() {
            function e(t) {
                r(this, e), this.code = t
            }
            return n(e, [{
                key: "getCode",
                value: function() {
                    return this.code
                }
            }, {
                key: "setCode",
                value: function(e) {
                    this.code = e
                }
            }, {
                key: "callBids",
                value: function() {
                    throw "adapter implementation must override callBids method"
                }
            }]), e
        })()
    }
}), (function(e, t, r) {
    "use strict";
    var n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        i = r(2),
        o = r(3),
        a = Array.prototype.slice,
        s = Array.prototype.push,
        u = i._map(o.EVENTS, (function(e) {
            return e
        })),
        d = o.EVENT_ID_PATHS,
        c = [];
    e.exports = (function() {
        function e(e, t) {
            i.logMessage("Emitting event for: " + e);
            var n = t[0] || {},
                o = d[e],
                a = n[o],
                u = r[e] || {
                    que: []
                },
                l = i._map(u, (function(e, t) {
                    return t
                })),
                f = [];
            c.push({
                eventType: e,
                args: n,
                id: a
            }), a && i.contains(l, a) && s.apply(f, u[a].que), s.apply(f, u.que), i._each(f, (function(e) {
                if (e)
                    try {
                        e.apply(null, t)
                    } catch (r) {
                        i.logError("Error executing handler:", "events.js", r)
                    }
            }))
        }
        function t(e) {
            return i.contains(u, e)
        }
        var r = {},
            o = {};
        return o.on = function(e, n, o) {
            if (t(e)) {
                var a = r[e] || {
                    que: []
                };
                o ? (a[o] = a[o] || {
                    que: []
                }, a[o].que.push(n)) : a.que.push(n), r[e] = a
            } else
                i.logError("Wrong event name : " + e + " Valid event names :" + u)
        }, o.emit = function(t) {
            var r = a.call(arguments, 1);
            e(t, r)
        }, o.off = function(e, t, n) {
            var o = r[e];
            i.isEmpty(o) || i.isEmpty(o.que) && i.isEmpty(o[n]) || n && (i.isEmpty(o[n]) || i.isEmpty(o[n].que)) || (n ? i._each(o[n].que, (function(e) {
                var r = o[n].que;
                e === t && r.splice(i.indexOf.call(r, e), 1)
            })) : i._each(o.que, (function(e) {
                var r = o.que;
                e === t && r.splice(i.indexOf.call(r, e), 1)
            })), r[e] = o)
        }, o.get = function() {
            return r
        }, o.getEvents = function() {
            var e = [];
            return i._each(c, (function(t) {
                var r = n({}, t);
                e.push(r)
            })), e
        }, o
    })()
}), (function(e, t, r) {
    "use strict";
    function n(e, t) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(t)
            }
        }))
    }
    var i = n(["", "://", "/pubapi/3.0/", "/", "/", "/", "/ADTECH;v=2;cmd=bid;cors=yes;alias=", "", ";misc=", ""], ["", "://", "/pubapi/3.0/", "/", "/", "/", "/ADTECH;v=2;cmd=bid;cors=yes;alias=", "", ";misc=", ""]),
        o = r(2),
        a = r(10).ajax,
        s = r(12),
        u = r(13),
        d = function() {
            function e(e) {
                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; t > n; n++)
                    r[n - 1] = arguments[n];
                return function() {
                    for (var t = arguments.length, n = Array(t), i = 0; t > i; i++)
                        n[i] = arguments[i];
                    var o = n[n.length - 1] || {},
                        a = [e[0]];
                    return r.forEach((function(t, r) {
                        var i = Number.isInteger(t) ? n[t] : o[t];
                        a.push(i, e[r + 1])
                    })), a.join("")
                }
            }
            function t(e) {
                var t = e.params,
                    r = t.server,
                    n = t.region || "us",
                    i = void 0;
                return p.hasOwnProperty(n) || (o.logWarn("Unknown region '" + n + "' for AOL bidder."), n = "us"), i = r ? r : p[n], t.region = n, l({
                    protocol: "https:" === document.location.protocol ? "https" : "http",
                    host: i,
                    network: t.network,
                    placement: parseInt(t.placement),
                    pageid: t.pageId || 0,
                    sizeid: t.sizeId || 0,
                    alias: t.alias || o.getUniqueIdentifierStr(),
                    bidfloor: "undefined" != typeof t.bidFloor ? ";bidfloor=" + t.bidFloor.toString() : "",
                    misc: (new Date).getTime()
                })
            }
            function r(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = s.createBid(2, e);
                r.bidderCode = f, r.reason = t.nbr, r.raw = t, u.addBidResponse(e.placementCode, r)
            }
            function n(e, t) {
                var n = void 0;
                try {
                    n = t.seatbid[0].bid[0]
                } catch (i) {
                    return r(e, t), void 0
                }
                var a = void 0;
                if (n.ext && n.ext.encp)
                    a = n.ext.encp;
                else if (a = n.price, null === a || isNaN(a))
                    return o.logError("Invalid price in bid response", f, e), r(e, t), void 0;
                var d = n.adm;
                t.ext && t.ext.pixels && (d += t.ext.pixels);
                var c = s.createBid(1, e);
                c.bidderCode = f, c.ad = d, c.cpm = a, c.width = n.w, c.height = n.h, c.creativeId = n.crid, c.pubapiId = t.id, c.currencyCode = t.cur, n.dealid && (c.dealId = n.dealid), u.addBidResponse(e.placementCode, c)
            }
            function d(e) {
                o._each(e.bids, (function(e) {
                    var i = t(e);
                    a(i, (function(t) {
                        if (c && pbjs.bidderSettings && pbjs.bidderSettings.aol && "function" == typeof pbjs.bidderSettings.aol.bidCpmAdjustment && o.logWarn("bidCpmAdjustment is active for the AOL adapter. As of Prebid 0.14, AOL can bid in net – please contact your accounts team to enable."), c = !1, !t && t.length <= 0)
                            return o.logError("Empty bid response", f, e), r(e, t), void 0;
                        try {
                            t = JSON.parse(t)
                        } catch (i) {
                            return o.logError("Invalid JSON in bid response", f, e), r(e, t), void 0
                        }
                        n(e, t)
                    }), null, {
                        withCredentials: !0
                    })
                }))
            }
            var c = !0,
                l = e(i, "protocol", "host", "network", "placement", "pageid", "sizeid", "alias", "bidfloor", "misc"),
                f = "aol",
                p = {
                    us: "adserver-us.adtech.advertising.com",
                    eu: "adserver-eu.adtech.advertising.com",
                    as: "adserver-as.adtech.advertising.com"
                };
            return {
                callBids: d
            }
        };
    e.exports = d
}), (function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        try {
            !(function() {
                var d = void 0,
                    c = !1,
                    l = n.method || (r ? "POST" : "GET"),
                    f = "object" === ("undefined" == typeof t ? "undefined" : o(t)) ? t : {
                        success: function() {
                            s.logMessage("xhr success")
                        },
                        error: function(e) {
                            s.logError("xhr error", null, e)
                        }
                    };
                if ("function" == typeof t && (f.success = t), window.XMLHttpRequest ? (d = new window.XMLHttpRequest, void 0 === d.responseType && (c = !0)) : c = !0, c ? (d = new window.XDomainRequest, d.onload = function() {
                    f.success(d.responseText, d)
                }, d.onerror = function() {
                    f.error("error", d)
                }, d.ontimeout = function() {
                    f.error("timeout", d)
                }, d.onprogress = function() {
                    s.logMessage("xhr onprogress")
                }) : d.onreadystatechange = function() {
                    if (d.readyState === u) {
                        var e = d.status;
                        e >= 200 && 300 > e || 304 === e ? f.success(d.responseText, d) : f.error(d.statusText, d)
                    }
                }, "GET" === l && r) {
                    var p = a.parse(e);
                    i(p.search, r), e = a.format(p)
                }
                d.open(l, e), c || (n.withCredentials && (d.withCredentials = !0), n.preflight && d.setRequestHeader("X-Requested-With", "XMLHttpRequest"), d.setRequestHeader("Content-Type", n.contentType || "text/plain")), d.send("POST" === l && r)
            })()
        } catch (d) {
            s.logError("xhr construction", d)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    t.ajax = n;
    var a = r(11),
        s = r(2),
        u = 4
}), (function(e, t) {
    "use strict";
    function r(e) {
        return e ? e.replace(/^\?/, "").split("&").reduce((function(e, t) {
            var r = t.split("="),
                n = a(r, 2),
                i = n[0],
                o = n[1];
            return /\[\]$/.test(i) ? (i = i.replace("[]", ""), e[i] = e[i] || [], e[i].push(o)) : e[i] = o || "", e
        }), {}) : {}
    }
    function n(e) {
        return Object.keys(e).map((function(t) {
            return Array.isArray(e[t]) ? e[t].map((function(e) {
                return t + "[]=" + e
            })).join("&") : t + "=" + e[t]
        })).join("&")
    }
    function i(e) {
        var t = document.createElement("a");
        return t.href = decodeURIComponent(e), {
            protocol: (t.protocol || "").replace(/:$/, ""),
            hostname: t.hostname,
            port: +t.port,
            pathname: t.pathname.replace(/^(?!\/)/, "/"),
            search: r(t.search || ""),
            hash: (t.hash || "").replace(/^#/, ""),
            host: t.host
        }
    }
    function o(e) {
        return (e.protocol || "http") + "://" + (e.host || e.hostname + (e.port ? ":" + e.port : "")) + (e.pathname || "") + (e.search ? "?" + n(e.search || "") : "") + (e.hash ? "#" + e.hash : "")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = (function() {
        function e(e, t) {
            var r = [],
                n = !0,
                i = !1,
                o = void 0;
            try {
                for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0)
                    ;
            } catch (u) {
                i = !0, o = u
            } finally {
                try {
                    !n && s["return"] && s["return"]()
                } finally {
                    if (i)
                        throw o
                }
            }
            return r
        }
        return function(t, r) {
            if (Array.isArray(t))
                return t;
            if (Symbol.iterator in Object(t))
                return e(t, r);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    })();
    t.parseQS = r, t.formatQS = n, t.parse = i, t.format = o
}), (function(e, t, r) {
    "use strict";
    function n(e, t) {
        function r() {
            switch (o) {
            case 0:
                return "Pending";
            case 1:
                return "Bid available";
            case 2:
                return "Bid returned empty or error response";
            case 3:
                return "Bid timed out"
            }
        }
        var n = t && t.bidId || i.getUniqueIdentifierStr(),
            o = e || 0;
        this.bidderCode = "", this.width = 0, this.height = 0, this.statusMessage = r(), this.adId = n, this.getStatusCode = function() {
            return o
        }, this.getSize = function() {
            return this.width + "x" + this.height
        }
    }
    var i = r(2);
    t.createBid = function() {
        return new (Function.prototype.bind.apply(n, [null].concat(Array.prototype.slice.call(arguments))))
    }
}), (function(e, t, r) {
    "use strict";
    function n() {
        return (new Date).getTime()
    }
    function i(e) {
        return e.bidderCode
    }
    function o(e) {
        return e.bidder
    }
    function a(e) {
        var t = this,
            r = pbjs._bidsRequested.map((function(r) {
                return r.bids.filter(T.adUnitsFilter.bind(t, pbjs._adUnitCodes)).filter((function(t) {
                    return t.placementCode === e
                }))
            })).reduce(T.flatten, []).map((function(e) {
                return "indexExchange" === e.bidder ? e.sizes.length : 1
            })).reduce(s, 0),
            n = pbjs._bidsReceived.filter((function(t) {
                return t.adUnitCode === e
            })).length;
        return r === n
    }
    function s(e, t) {
        return e + t
    }
    function u() {
        var e = pbjs._bidsRequested.map((function(e) {
                return e.bids
            })).reduce(T.flatten, []).filter(T.adUnitsFilter.bind(this, pbjs._adUnitCodes)).map((function(e) {
                return "indexExchange" === e.bidder ? e.sizes.length : 1
            })).reduce((function(e, t) {
                return e + t
            }), 0),
            t = pbjs._bidsReceived.filter(T.adUnitsFilter.bind(this, pbjs._adUnitCodes)).length;
        return e === t
    }
    function d(e, t) {
        return pbjs._bidsRequested.find((function(r) {
                return r.bids.filter((function(r) {
                    return r.bidder === e && r.placementCode === t
                })).length > 0
            })) || {
                start: null,
                requestId: null
            }
    }
    function c(e, t) {
        var r = {},
            n = pbjs.bidderSettings;
        if (t && n) {
            var i = m();
            l(r, i, t)
        }
        return e && t && n && n[e] && n[e][I.JSON_MAPPING.ADSERVER_TARGETING] ? (l(r, n[e], t), t.alwaysUseBid = n[e].alwaysUseBid, t.sendStandardTargeting = n[e].sendStandardTargeting) : B[e] && (l(r, B[e], t), t.alwaysUseBid = B[e].alwaysUseBid, t.sendStandardTargeting = B[e].sendStandardTargeting), r
    }
    function l(e, t, r) {
        var n = t[I.JSON_MAPPING.ADSERVER_TARGETING];
        return r.size = r.getSize(), E._each(n, (function(n) {
            var i = n.key,
                o = n.val;
            if (e[i] && E.logWarn("The key: " + i + " is getting ovewritten"), E.isFn(o))
                try {
                    o = o(r)
                } catch (a) {
                    E.logError("bidmanager", "ERROR", a)
                }
            ("undefined" == typeof t.suppressEmptyKeys || t.suppressEmptyKeys !== !0) && "hb_deal" !== i || !E.isEmptyStr(o) && null !== o && void 0 !== o ? e[i] = o : E.logInfo("suppressing empty key '" + i + "' from adserver targeting")
        })), e
    }
    function f(e) {
        var t = [e];
        p(_.byAdUnit, t)
    }
    function p(e, t) {
        var r = this;
        E.isArray(e) && e.forEach((function(e) {
            var n = t || pbjs._adUnitCodes,
                i = [pbjs._bidsReceived.filter(T.adUnitsFilter.bind(r, n)).reduce(g, {})];
            e.apply(pbjs, i)
        }))
    }
    function g(e, t) {
        return e[t.adUnitCode] || (e[t.adUnitCode] = {
            bids: []
        }), e[t.adUnitCode].bids.push(t), e
    }
    function b(e) {
        var t = e.bidderCode,
            r = e.cpm;
        if (t && pbjs.bidderSettings && pbjs.bidderSettings[t] && v(pbjs.bidderSettings[t].bidCpmAdjustment) === j)
            try {
                r = pbjs.bidderSettings[t].bidCpmAdjustment.call(null, e.cpm, h({}, e))
            } catch (n) {
                E.logError("Error during bid adjustment", "bidmanager.js", n)
            }
        r >= 0 && (e.cpm = r)
    }
    function m() {
        var e = pbjs.bidderSettings;
        return e[I.JSON_MAPPING.BD_SETTING_STANDARD] || (e[I.JSON_MAPPING.BD_SETTING_STANDARD] = {
            adserverTargeting: [{
                key: "hb_bidder",
                val: function(e) {
                    return e.bidderCode
                }
            }, {
                key: "hb_adid",
                val: function(e) {
                    return e.adId
                }
            }, {
                key: "hb_pb",
                val: function(e) {
                    return O === I.GRANULARITY_OPTIONS.AUTO ? e.pbAg : O === I.GRANULARITY_OPTIONS.DENSE ? e.pbDg : O === I.GRANULARITY_OPTIONS.LOW ? e.pbLg : O === I.GRANULARITY_OPTIONS.MEDIUM ? e.pbMg : O === I.GRANULARITY_OPTIONS.HIGH ? e.pbHg : O === I.GRANULARITY_OPTIONS.CUSTOM ? e.pbCg : void 0
                }
            }, {
                key: "hb_size",
                val: function(e) {
                    return e.size
                }
            }, {
                key: "hb_deal",
                val: function(e) {
                    return e.dealId
                }
            }]
        }), e[I.JSON_MAPPING.BD_SETTING_STANDARD]
    }
    function y() {
        return m()[I.JSON_MAPPING.ADSERVER_TARGETING]
    }
    var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        h = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        T = r(2),
        S = r(14),
        I = r(3),
        w = I.EVENTS.AUCTION_END,
        E = r(2),
        A = r(8),
        j = "function",
        _ = {
            byAdUnit: [],
            all: [],
            oneTime: null,
            timer: !1
        },
        O = I.GRANULARITY_OPTIONS.MEDIUM,
        C = void 0,
        B = {};
    t.setCustomPriceBucket = function(e) {
        C = e
    }, t.getTimedOutBidders = function() {
        return pbjs._bidsRequested.map(i).filter(T.uniques).filter((function(e) {
            return pbjs._bidsReceived.map(o).filter(T.uniques).indexOf(e) < 0
        }))
    }, t.bidsBackAll = function() {
        return u()
    }, t.addBidResponse = function(e, r) {
        if (!e)
            return E.logWarn("No adUnitCode supplied to addBidResponse, response discarded"), void 0;
        if (r) {
            var i = d(r.bidderCode, e),
                o = i.requestId,
                s = i.start;
            if (h(r, {
                requestId: o,
                responseTimestamp: n(),
                requestTimestamp: s,
                cpm: r.cpm || 0,
                bidder: r.bidderCode,
                adUnitCode: e
            }), r.timeToRespond = r.responseTimestamp - r.requestTimestamp, r.timeToRespond > pbjs.cbTimeout + pbjs.timeoutBuffer) {
                var l = !0;
                t.executeCallback(l)
            }
            A.emit(I.EVENTS.BID_ADJUSTMENT, r), A.emit(I.EVENTS.BID_RESPONSE, r);
            var p = S.getPriceBucketString(r.cpm, C);
            r.pbLg = p.low, r.pbMg = p.med, r.pbHg = p.high, r.pbAg = p.auto, r.pbDg = p.dense, r.pbCg = p.custom;
            var g = {};
            r.bidderCode && (r.cpm > 0 || r.dealId) && (g = c(r.bidderCode, r)), r.adserverTargeting = g, pbjs._bidsReceived.push(r)
        }
        r && r.adUnitCode && a(r.adUnitCode) && f(r.adUnitCode), u() && t.executeCallback()
    }, t.getKeyValueTargetingPairs = function() {
        return c.apply(void 0, arguments)
    }, t.setPriceGranularity = function(e) {
        var t = I.GRANULARITY_OPTIONS;
        Object.keys(t).filter((function(r) {
            return e === t[r]
        })) ? O = e : (E.logWarn("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default."), O = I.GRANULARITY_OPTIONS.MEDIUM)
    }, t.registerDefaultBidderSetting = function(e, t) {
        B[e] = t
    }, t.executeCallback = function(e) {
        if (!e && _.timer && clearTimeout(_.timer), _.all.called !== !0 && (p(_.all), _.all.called = !0, e)) {
            var r = t.getTimedOutBidders();
            r.length && A.emit(I.EVENTS.BID_TIMEOUT, r)
        }
        if (_.oneTime) {
            A.emit(w);
            try {
                p([_.oneTime])
            } catch (n) {
                E.logError("Error executing bidsBackHandler", null, n)
            } finally {
                _.oneTime = null, _.timer = !1, pbjs.clearAuction()
            }
        }
    }, t.externalCallbackReset = function() {
        _.all.called = !1
    }, t.addOneTimeCallback = function(e, t) {
        _.oneTime = e, _.timer = t
    }, t.addCallback = function(e, t, r) {
        t.id = e, I.CB.TYPE.ALL_BIDS_BACK === r ? _.all.push(t) : I.CB.TYPE.AD_UNIT_BIDS_BACK === r && _.byAdUnit.push(t)
    }, A.on(I.EVENTS.BID_ADJUSTMENT, (function(e) {
        b(e)
    })), t.adjustBids = function() {
        return b.apply(void 0, arguments)
    }, t.getStandardBidderAdServerTargeting = y
}), (function(e, t) {
    "use strict";
    function r(e, t) {
        var r = 0;
        return r = parseFloat(e), isNaN(r) && (r = ""), {
            low: "" === r ? "" : n(e, s),
            med: "" === r ? "" : n(e, u),
            high: "" === r ? "" : n(e, d),
            auto: "" === r ? "" : n(e, l),
            dense: "" === r ? "" : n(e, c),
            custom: "" === r ? "" : n(e, t)
        }
    }
    function n(e, t) {
        var r = "";
        if (!i(t))
            return r;
        var n = t.buckets.reduce((function(e, t) {
                return e.max > t.max ? e : t
            }), {
                max: 0
            }),
            s = t.buckets.find((function(t) {
                if (e > n.max) {
                    var i = t.precision || a;
                    r = t.max.toFixed(i)
                } else if (e <= t.max && e >= t.min)
                    return t
            }));
        return s && (r = o(e, s.increment, s.precision)), r
    }
    function i(e) {
        if (!e || !e.buckets || !Array.isArray(e.buckets))
            return !1;
        var t = !0;
        return e.buckets.forEach((function(e) {
            "undefined" != typeof e.min && e.max && e.increment || (t = !1)
        })), t
    }
    function o(e, t, r) {
        r || (r = a);
        var n = 1 / t;
        return (Math.floor(e * n) / n).toFixed(r)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = 2,
        s = {
            buckets: [{
                min: 0,
                max: 5,
                increment: .5
            }]
        },
        u = {
            buckets: [{
                min: 0,
                max: 20,
                increment: .1
            }]
        },
        d = {
            buckets: [{
                min: 0,
                max: 20,
                increment: .01
            }]
        },
        c = {
            buckets: [{
                min: 0,
                max: 3,
                increment: .01
            }, {
                min: 3,
                max: 8,
                increment: .05
            }, {
                min: 8,
                max: 20,
                increment: .5
            }]
        },
        l = {
            buckets: [{
                min: 0,
                max: 5,
                increment: .05
            }, {
                min: 5,
                max: 10,
                increment: .1
            }, {
                min: 10,
                max: 20,
                increment: .5
            }]
        };
    t.getPriceBucketString = r, t.isValidePriceConfig = i
}), (function(e, t, r) {
    "use strict";
    var n,
        i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        o = r(2),
        a = r(3),
        s = r(2),
        u = r(16),
        d = r(13),
        c = r(12),
        l = r(17);
    n = function f() {
        function e(e, t) {
            var r = s.getBidIdParameter("placementId", e.params),
                n = s.getBidIdParameter("memberId", e.params),
                o = s.getBidIdParameter("member", e.params),
                a = s.getBidIdParameter("invCode", e.params),
                u = s.getBidIdParameter("query", e.params),
                d = s.getBidIdParameter("referrer", e.params),
                c = s.getBidIdParameter("alt_referrer", e.params),
                l = "http" + ("https:" === document.location.protocol ? "s://secure.adnxs.com/jpt?" : "://ib.adnxs.com/jpt?");
            l = s.tryAppendQueryString(l, "callback", "pbjs.handleAnCB"), l = s.tryAppendQueryString(l, "callback_uid", t), l = s.tryAppendQueryString(l, "psa", "0"), l = s.tryAppendQueryString(l, "id", r), o ? l = s.tryAppendQueryString(l, "member", o) : n && (l = s.tryAppendQueryString(l, "member", n), s.logMessage('appnexus.callBids: "memberId" will be deprecated soon. Please use "member" instead')), l = s.tryAppendQueryString(l, "code", a);
            var f = "",
                p = s.parseSizesInput(e.sizes),
                g = p.length;
            if (g > 0 && (f = "size=" + p[0], g > 1)) {
                f += "&promo_sizes=";
                for (var b = 1; g > b; b++)
                    f += p[b] += ",";
                f && "," === f.charAt(f.length - 1) && (f = f.slice(0, f.length - 1))
            }
            f && (l += f + "&");
            var m = s.parseQueryStringParameters(u);
            m && (l += m);
            var y = i({}, e.params);
            delete y.placementId, delete y.memberId, delete y.invCode, delete y.query, delete y.referrer, delete y.alt_referrer, delete y.member;
            var v = s.parseQueryStringParameters(y);
            return v && (l += v), "" === d && (d = s.getTopWindowUrl()), l = s.tryAppendQueryString(l, "referrer", d), l = s.tryAppendQueryString(l, "alt_referrer", c), l.lastIndexOf("&") === l.length - 1 && (l = l.substring(0, l.length - 1)), s.logMessage("jpt request built: " + l), e.startTime = (new Date).getTime(), l
        }
        var t = l.createNew("appnexus"),
            r = !1;
        return t.callBids = function(t) {
            for (var r = t.bids, n = 0; n < r.length; n++) {
                var i = r[n],
                    o = i.bidId;
                u.loadScript(e(i, o))
            }
        }, pbjs.handleAnCB = function(e) {
            var t;
            if (e && e.callback_uid) {
                var n,
                    i = e.callback_uid,
                    u = "",
                    l = o.getBidRequest(i);
                l && (t = l.bidder, u = l.placementCode, l.status = a.STATUS.GOOD), s.logMessage("JSONP callback function called for ad ID: " + i);
                var f = [];
                if (e.result && e.result.cpm && 0 !== e.result.cpm) {
                    n = parseInt(e.result.cpm, 10), n /= 1e4;
                    var p = e.result.creative_id;
                    f = c.createBid(1, l), f.creative_id = p, f.bidderCode = t, f.cpm = n, f.adUrl = e.result.ad, f.width = e.result.width, f.height = e.result.height, f.dealId = e.result.deal_id, d.addBidResponse(u, f)
                } else
                    s.logMessage("No prebid response from AppNexus for placement code " + u), f = c.createBid(2, l), f.bidderCode = t, d.addBidResponse(u, f);
                if (!r) {
                    var g = s.createInvisibleIframe();
                    g.src = "//acdn.adnxs.com/ib/static/usersync/v3/async_usersync.html";
                    try {
                        document.body.appendChild(g)
                    } catch (b) {
                        s.logError(b)
                    }
                    r = !0
                }
            } else
                s.logMessage("No prebid response for placement %%PLACEMENT%%")
        }, {
            callBids: t.callBids,
            setBidderCode: t.setBidderCode,
            createNew: f.createNew,
            buildJPTCall: e
        }
    }, n.createNew = function() {
        return new n
    }, e.exports = n
}), (function(e, t, r) {
    "use strict";
    function n(e, t) {
        var r = document.createElement("script");
        r.type = "text/javascript", r.async = !0, t && "function" == typeof t && (r.readyState ? r.onreadystatechange = function() {
            ("loaded" === r.readyState || "complete" === r.readyState) && (r.onreadystatechange = null, t())
        } : r.onload = function() {
            t()
        }), r.src = e;
        var n = document.getElementsByTagName("head");
        n = n.length ? n : document.getElementsByTagName("body"), n.length && (n = n[0], n.insertBefore(r, n.firstChild))
    }
    var i = r(2),
        o = {};
    t.loadScript = function(e, t, r) {
        return e ? (r ? o[e] ? t && "function" == typeof t && (o[e].loaded ? t() : o[e].callbacks.push(t)) : (o[e] = {
            loaded: !1,
            callbacks: []
        }, t && "function" == typeof t && o[e].callbacks.push(t), n(e, (function() {
            o[e].loaded = !0;
            try {
                for (var t = 0; t < o[e].callbacks.length; t++)
                    o[e].callbacks[t]()
            } catch (r) {
                i.logError("Error executing callback", "adloader.js:loadScript", r)
            }
        }))) : n(e, t), void 0) : (i.logError("Error attempting to request empty URL", "adloader.js:loadScript"), void 0)
    }, t.trackPixel = function(e) {
        var t = void 0,
            r = void 0;
        return e && "string" == typeof e ? (t = e.indexOf("?") > 0 ? "&" : "?", r = e + t + "rnd=" + Math.floor(1e7 * Math.random()), (new Image).src = r, r) : (i.logMessage("Missing or invalid pixelUrl."), void 0)
    }
}), (function(e, t) {
    "use strict";
    function r(e) {
        function t(e) {
            i = e
        }
        function r() {
            return i
        }
        function n() {}
        var i = e;
        return {
            callBids: n,
            setBidderCode: t,
            getBidderCode: r
        }
    }
    t.createNew = function(e) {
        return new r(e)
    }
}), (function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    function i(e) {
        if (e && e.__esModule)
            return e;
        var t = {};
        if (null != e)
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t["default"] = e, t
    }
    function o() {
        return "pbjs_lite_" + pbjs.version
    }
    function a() {
        function e(e) {
            var t = e.bids || [];
            t.forEach((function(t) {
                function o(e) {
                    try {
                        y.logMessage("XHR callback function called for ad ID: " + t.bidId), i(e, t)
                    } catch (r) {
                        "string" == typeof r ? y.logWarn(r + " when processing rubicon response for placement code " + t.placementCode) : y.logError("Error processing rubicon response for placement code " + t.placementCode, null, r), s()
                    }
                }
                function a(e, t) {
                    y.logError("Request for rubicon responded with:", t.status, e), s()
                }
                function s() {
                    var e = p["default"].createBid(h.STATUS.NO_BID, t);
                    e.bidderCode = t.bidder, b["default"].addBidResponse(t.placementCode, e)
                }
                try {
                    "video" === t.mediaType ? v.ajax(I, {
                        success: o,
                        error: a
                    }, r(t, e), {
                        withCredentials: !0
                    }) : v.ajax(n(t), {
                        success: o,
                        error: a
                    }, void 0, {
                        withCredentials: !0
                    })
                } catch (u) {
                    y.logError("Error sending rubicon request for placement code " + t.placementCode, null, u), s()
                }
            }))
        }
        function t() {
            return [window.screen.width, window.screen.height].join("x")
        }
        function r(e, r) {
            e.startTime = (new Date).getTime();
            var n = e.params;
            if (!n || "object" !== d(n.video))
                throw "Invalid Video Bid";
            var i = void 0;
            if (n.video.playerWidth && n.video.playerHeight)
                i = [n.video.playerWidth, n.video.playerHeight];
            else {
                if (!(Array.isArray(e.sizes) && e.sizes.length > 0 && Array.isArray(e.sizes[0]) && e.sizes[0].length > 1))
                    throw "Invalid Video Bid - No size provided";
                i = e.sizes[0]
            }
            var a = {
                    page_url: n.referrer ? n.referrer : y.getTopWindowUrl(),
                    resolution: t(),
                    account_id: n.accountId,
                    integration: o(),
                    timeout: r.timeout - (Date.now() - r.auctionStart + w),
                    stash_creatives: !0,
                    ae_pass_through_parameters: n.video.aeParams,
                    slots: []
                },
                s = {
                    site_id: n.siteId,
                    zone_id: n.zoneId,
                    position: n.position || "btf",
                    floor: .01,
                    element_id: e.placementCode,
                    name: e.placementCode,
                    language: n.video.language,
                    width: i[0],
                    height: i[1]
                };
            if (!n.video.size_id)
                throw "Invalid Video Bid - Invalid Ad Type!";
            return s.size_id = n.video.size_id, n.inventory && "object" === d(n.inventory) && (s.inventory = n.inventory), n.keywords && Array.isArray(n.keywords) && (s.keywords = n.keywords), n.visitor && "object" === d(n.visitor) && (s.visitor = n.visitor), a.slots.push(s), JSON.stringify(a)
        }
        function n(e) {
            e.startTime = (new Date).getTime();
            var r = e.params,
                n = r.accountId,
                i = r.siteId,
                s = r.zoneId,
                u = r.position,
                c = r.floor,
                l = r.keywords,
                f = r.visitor,
                p = r.inventory,
                g = r.userId,
                b = r.referrer;
            c = (c = parseFloat(c)) > .01 ? c : .01, u = u || "btf";
            var m = a.masSizeOrdering(Array.isArray(e.params.sizes) ? e.params.sizes.map((function(e) {
                return (E[e] || "").split("x")
            })) : e.sizes);
            if (m.length < 1)
                throw "no valid sizes";
            if (!/^\d+$/.test(n))
                throw "invalid accountId provided";
            var v = ["account_id", n, "site_id", i, "zone_id", s, "size_id", m[0], "alt_size_ids", m.slice(1).join(",") || void 0, "p_pos", u, "rp_floor", c, "tk_flint", o(), "p_screen_res", t(), "kw", l, "tk_user_key", g];
            return null !== f && "object" === ("undefined" == typeof f ? "undefined" : d(f)) && y._each(f, (function(e, t) {
                return v.push("tg_v." + t, e)
            })), null !== p && "object" === ("undefined" == typeof p ? "undefined" : d(p)) && y._each(p, (function(e, t) {
                return v.push("tg_i." + t, e)
            })), v.push("rand", Math.random(), "rf", b ? b : y.getTopWindowUrl()), v.reduce((function(e, t, r) {
                return r % 2 === 0 && void 0 !== v[r + 1] ? e + t + "=" + encodeURIComponent(v[r + 1]) + "&" : e
            }), S + "?").slice(0, -1)
        }
        function i(e, t) {
            var r = JSON.parse(e),
                n = r.ads,
                i = t.placementCode;
            if ("object" !== ("undefined" == typeof r ? "undefined" : d(r)) || "ok" !== r.status)
                throw "bad response";
            if ("video" === t.mediaType && "object" === ("undefined" == typeof n ? "undefined" : d(n)) && (n = n[i]), !Array.isArray(n) || n.length < 1)
                throw "invalid ad response";
            n = n.sort(c), n.forEach((function(e) {
                if ("ok" !== e.status)
                    throw "bad ad status";
                var r = p["default"].createBid(h.STATUS.GOOD, t);
                if (r.creative_id = e.ad_id, r.bidderCode = t.bidder, r.cpm = e.cpm || 0, r.dealId = e.deal, "video" === t.mediaType)
                    r.width = t.params.video.playerWidth, r.height = t.params.video.playerHeight, r.vastUrl = e.creative_depot_url, r.descriptionUrl = e.impression_id, r.impression_id = e.impression_id;
                else {
                    r.ad = f(e.script, e.impression_id);
                    var n = E[e.size_id].split("x").map((function(e) {
                            return Number(e)
                        })),
                        i = u(n, 2);
                    r.width = i[0], r.height = i[1]
                }
                r.rubiconTargeting = (Array.isArray(e.targeting) ? e.targeting : []).reduce((function(e, t) {
                    return e[t.key] = t.values[0], e
                }), {
                    rpfl_elemid: t.placementCode
                });
                try {
                    b["default"].addBidResponse(t.placementCode, r)
                } catch (o) {
                    y.logError("Error from addBidResponse", null, o)
                }
            }))
        }
        function c(e, t) {
            return (t.cpm || 0) - (e.cpm || 0)
        }
        var f = function(e, t) {
            return "<html>\n<head><script type='text/javascript'>inDapIF=true;</script></head>\n<body style='margin : 0; padding: 0;'>\n<!-- Rubicon Project Ad Tag -->\n<div data-rp-impression-id='" + t + "'>\n<script type='text/javascript'>" + e + "</script>\n</div>\n</body>\n</html>"
        };
        return s(l.createNew(T), {
            callBids: e,
            createNew: a.createNew
        })
    }
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        u = (function() {
            function e(e, t) {
                var r = [],
                    n = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0)
                        ;
                } catch (u) {
                    i = !0, o = u
                } finally {
                    try {
                        !n && s["return"] && s["return"]()
                    } finally {
                        if (i)
                            throw o
                    }
                }
                return r
            }
            return function(t, r) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, r);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        })(),
        d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = r(17),
        l = i(c),
        f = r(12),
        p = n(f),
        g = r(13),
        b = n(g),
        m = r(2),
        y = i(m),
        v = r(10),
        h = r(3),
        T = "rubicon",
        S = "//fastlane.rubiconproject.com/a/api/fastlane.json",
        I = "//fastlane-adv.rubiconproject.com/v1/auction/video",
        w = 500,
        E = {
            1: "468x60",
            2: "728x90",
            8: "120x600",
            9: "160x600",
            10: "300x600",
            15: "300x250",
            16: "336x280",
            19: "300x100",
            43: "320x50",
            44: "300x50",
            48: "300x300",
            54: "300x1050",
            55: "970x90",
            57: "970x250",
            58: "1000x90",
            59: "320x80",
            61: "1000x1000",
            65: "640x480",
            67: "320x480",
            68: "1800x1000",
            72: "320x320",
            73: "320x160",
            83: "480x300",
            94: "970x310",
            96: "970x210",
            101: "480x320",
            102: "768x1024",
            113: "1000x300",
            117: "320x100",
            125: "800x250",
            126: "200x600"
        };
    y._each(E, (function(e, t) {
        return E[e] = t
    })), a.masSizeOrdering = function(e) {
        var t = [15, 2, 9];
        return y.parseSizesInput(e).reduce((function(e, t) {
            var r = parseInt(E[t], 10);
            return r && e.push(r), e
        }), []).sort((function(e, r) {
            var n = t.indexOf(e),
                i = t.indexOf(r);
            return n > -1 || i > -1 ? -1 === n ? 1 : -1 === i ? -1 : n - i : e - r
        }))
    }, a.createNew = function() {
        return new a
    }, e.exports = a
}), (function(e, t, r) {
    "use strict";
    var n = r(2),
        i = r(12),
        o = r(13),
        a = function() {
            function e(e) {
                a = e.bids, u = [];
                for (var r = 0; r < a.length; r++) {
                    var n = a[r];
                    s = s || n.params.publisherId, u.push(n.params.adSlot)
                }
                t()
            }
            function t() {
                d = n.createInvisibleIframe();
                var e = document.getElementsByTagName("head")[0];
                e.insertBefore(d, e.firstChild);
                var t = n.getIframeDocument(d);
                t.write(r()), t.close()
            }
            function r() {
                var e = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><base target="_top" /><script>inDapIF=true;</script></head>';
                e += "<body>", e += "<script>", e += 'window.pm_pub_id  = "%%PM_PUB_ID%%";window.pm_optimize_adslots     = [%%PM_OPTIMIZE_ADSLOTS%%];window.pm_async_callback_fn = "window.parent.pbjs.handlePubmaticCallback";', e += "</script>";
                var t = {};
                return t.PM_PUB_ID = s, t.PM_OPTIMIZE_ADSLOTS = u.map((function(e) {
                    return "'" + e + "'"
                })).join(","), e += '<script src="https://ads.pubmatic.com/AdServer/js/gshowad.js"></script>', e += "<script>", e += "</script>", e += "</body></html>", e = n.replaceTokenInString(e, t, "%%")
            }
            var a,
                s,
                u = [],
                d = void 0;
            return pbjs.handlePubmaticCallback = function() {
                var e = {},
                    t = {};
                try {
                    e = d.contentWindow.bidDetailsMap, t = d.contentWindow.progKeyValueMap
                } catch (r) {
                    n.logError(r, "Error parsing Pubmatic response")
                }
                var s,
                    u,
                    c,
                    l,
                    f,
                    p = e || {},
                    g = t || {};
                for (s = 0; s < a.length; s++) {
                    var b;
                    l = a[s].params, u = p[l.adSlot] || {}, g[l.adSlot] && -1 === g[l.adSlot].indexOf("=") && (g[l.adSlot] = g[l.adSlot].replace(/([a-z]+);(.[^;]*)/gi, "$1=$2")), c = (g[l.adSlot] || "").split(";").reduce((function(e, t) {
                        var r = t.split("=");
                        return e[r[0]] = r[1], e
                    }), {}), "1" === c.bidstatus ? (f = c.bidid.split("@")[1].split("x"), b = i.createBid(1), b.bidderCode = "pubmatic", b.adSlot = l.adSlot, b.cpm = Number(c.bid), b.ad = unescape(u.creative_tag), b.ad += n.createTrackPixelIframeHtml(decodeURIComponent(u.tracking_url)), b.width = f[0], b.height = f[1], b.dealId = c.wdeal, o.addBidResponse(a[s].placementCode, b)) : (b = i.createBid(2), b.bidderCode = "pubmatic", o.addBidResponse(a[s].placementCode, b))
                }
            }, {
                callBids: e
            }
        };
    e.exports = a
}), (function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var i = r(21),
        o = n(i),
        a = r(46),
        s = n(a);
    Array.prototype.find || o["default"](), Array.prototype.includes || s["default"](), Number.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}), (function(e, t, r) {
    "use strict";
    var n = r(22),
        i = r(26);
    e.exports = function() {
        var e = i();
        return n(Array.prototype, {
            find: e
        }, {
            find: function() {
                return Array.prototype.find !== e
            }
        }), e
    }
}), (function(e, t, r) {
    "use strict";
    var n = r(23),
        i = r(25),
        o = "function" == typeof Symbol && "symbol" == typeof Symbol(),
        a = Object.prototype.toString,
        s = function(e) {
            return "function" == typeof e && "[object Function]" === a.call(e)
        },
        u = function() {
            var e = {};
            try {
                Object.defineProperty(e, "x", {
                    enumerable: !1,
                    value: e
                });
                for (var t in e)
                    return !1;
                return e.x === e
            } catch (r) {
                return !1
            }
        },
        d = Object.defineProperty && u(),
        c = function(e, t, r, n) {
            (!(t in e) || s(n) && n()) && (d ? Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: r,
                writable: !0
            }) : e[t] = r)
        },
        l = function(e, t) {
            var r = arguments.length > 2 ? arguments[2] : {},
                a = n(t);
            o && (a = a.concat(Object.getOwnPropertySymbols(t))), i(a, (function(n) {
                c(e, n, t[n], r[n])
            }))
        };
    l.supportsDescriptors = !!d, e.exports = l
}), (function(e, t, r) {
    "use strict";
    var n = Object.prototype.hasOwnProperty,
        i = Object.prototype.toString,
        o = Array.prototype.slice,
        a = r(24),
        s = Object.prototype.propertyIsEnumerable,
        u = !s.call({
            toString: null
        }, "toString"),
        d = s.call((function() {}), "prototype"),
        c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        l = function(e) {
            var t = e.constructor;
            return t && t.prototype === e
        },
        f = {
            $console: !0,
            $external: !0,
            $frame: !0,
            $frameElement: !0,
            $frames: !0,
            $innerHeight: !0,
            $innerWidth: !0,
            $outerHeight: !0,
            $outerWidth: !0,
            $pageXOffset: !0,
            $pageYOffset: !0,
            $parent: !0,
            $scrollLeft: !0,
            $scrollTop: !0,
            $scrollX: !0,
            $scrollY: !0,
            $self: !0,
            $webkitIndexedDB: !0,
            $webkitStorageInfo: !0,
            $window: !0
        },
        p = (function() {
            if ("undefined" == typeof window)
                return !1;
            for (var e in window)
                try {
                    if (!f["$" + e] && n.call(window, e) && null !== window[e] && "object" == typeof window[e])
                        try {
                            l(window[e])
                        } catch (t) {
                            return !0
                        }
                } catch (t) {
                    return !0
                }
            return !1
        })(),
        g = function(e) {
            if ("undefined" == typeof window || !p)
                return l(e);
            try {
                return l(e)
            } catch (t) {
                return !1
            }
        },
        b = function(e) {
            var t = null !== e && "object" == typeof e,
                r = "[object Function]" === i.call(e),
                o = a(e),
                s = t && "[object String]" === i.call(e),
                l = [];
            if (!t && !r && !o)
                throw new TypeError("Object.keys called on a non-object");
            var f = d && r;
            if (s && e.length > 0 && !n.call(e, 0))
                for (var p = 0; p < e.length; ++p)
                    l.push(String(p));
            if (o && e.length > 0)
                for (var b = 0; b < e.length; ++b)
                    l.push(String(b));
            else
                for (var m in e)
                    f && "prototype" === m || !n.call(e, m) || l.push(String(m));
            if (u)
                for (var y = g(e), v = 0; v < c.length; ++v)
                    y && "constructor" === c[v] || !n.call(e, c[v]) || l.push(c[v]);
            return l
        };
    b.shim = function() {
        if (Object.keys) {
            var e = (function() {
                return 2 === (Object.keys(arguments) || "").length
            })(1, 2);
            if (!e) {
                var t = Object.keys;
                Object.keys = function(e) {
                    return a(e) ? t(o.call(e)) : t(e)
                }
            }
        } else
            Object.keys = b;
        return Object.keys || b
    }, e.exports = b
}), (function(e) {
    "use strict";
    var t = Object.prototype.toString;
    e.exports = function(e) {
        var r = t.call(e),
            n = "[object Arguments]" === r;
        return n || (n = "[object Array]" !== r && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === t.call(e.callee)), n
    }
}), (function(e) {
    var t = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString;
    e.exports = function(e, n, i) {
        if ("[object Function]" !== r.call(n))
            throw new TypeError("iterator must be a function");
        var o = e.length;
        if (o === +o)
            for (var a = 0; o > a; a++)
                n.call(i, e[a], a, e);
        else
            for (var s in e)
                t.call(e, s) && n.call(i, e[s], s, e)
    }
}), (function(e, t, r) {
    "use strict";
    e.exports = function() {
        var e = Array.prototype.find && 1 !== [, 1].find((function() {
            return !0
        }));
        return e ? Array.prototype.find : r(27)
    }
}), (function(e, t, r) {
    "use strict";
    var n = r(28);
    e.exports = function(e) {
        var t = n.ToObject(this),
            r = n.ToInteger(n.ToLength(t.length));
        if (!n.IsCallable(e))
            throw new TypeError("Array#find: predicate must be a function");
        if (0 === r)
            return void 0;
        for (var i, o = arguments[1], a = 0; r > a; a++)
            if (i = t[a], n.Call(e, o, [i, a, t]))
                return i;
        return void 0
    }
}), (function(e, t, r) {
    "use strict";
    var n = Object.prototype.toString,
        i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator,
        o = i ? Symbol.prototype.toString : n,
        a = r(29),
        s = r(30),
        u = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1,
        d = r(31),
        c = r(32),
        l = r(33),
        f = r(34),
        p = r(35),
        g = parseInt,
        b = r(40),
        m = b.call(Function.call, String.prototype.slice),
        y = b.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i),
        v = b.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i),
        h = ["", "​", "￾"].join(""),
        T = new RegExp("[" + h + "]", "g"),
        S = b.call(Function.call, RegExp.prototype.test, T),
        I = /^[-+]0x[0-9a-f]+$/i,
        w = b.call(Function.call, RegExp.prototype.test, I),
        E = ["	\n\f\r   ᠎    ", "         　\u2028", "\u2029﻿"].join(""),
        A = new RegExp("(^[" + E + "]+)|([" + E + "]+$)", "g"),
        j = b.call(Function.call, String.prototype.replace),
        _ = function(e) {
            return j(e, A, "")
        },
        O = r(42),
        C = r(44),
        B = d(d({}, O), {
            Call: function(e, t) {
                var r = arguments.length > 2 ? arguments[2] : [];
                if (!this.IsCallable(e))
                    throw new TypeError(e + " is not a function");
                return e.apply(t, r)
            },
            ToPrimitive: p,
            ToNumber: function(e) {
                var t = f(e) ? e : p(e, "number");
                if ("symbol" == typeof t)
                    throw new TypeError("Cannot convert a Symbol value to a number");
                if ("string" == typeof t) {
                    if (y(t))
                        return this.ToNumber(g(m(t, 2), 2));
                    if (v(t))
                        return this.ToNumber(g(m(t, 2), 8));
                    if (S(t) || w(t))
                        return 0 / 0;
                    var r = _(t);
                    if (r !== t)
                        return this.ToNumber(r)
                }
                return Number(t)
            },
            ToInt16: function(e) {
                var t = this.ToUint16(e);
                return t >= 32768 ? t - 65536 : t
            },
            ToInt8: function(e) {
                var t = this.ToUint8(e);
                return t >= 128 ? t - 256 : t
            },
            ToUint8: function(e) {
                var t = this.ToNumber(e);
                if (a(t) || 0 === t || !s(t))
                    return 0;
                var r = c(t) * Math.floor(Math.abs(t));
                return l(r, 256)
            },
            ToUint8Clamp: function(e) {
                var t = this.ToNumber(e);
                if (a(t) || 0 >= t)
                    return 0;
                if (t >= 255)
                    return 255;
                var r = Math.floor(e);
                return t > r + .5 ? r + 1 : r + .5 > t ? r : r % 2 !== 0 ? r + 1 : r
            },
            ToString: function(e) {
                if ("symbol" == typeof e)
                    throw new TypeError("Cannot convert a Symbol value to a string");
                return String(e)
            },
            ToObject: function(e) {
                return this.RequireObjectCoercible(e), Object(e)
            },
            ToPropertyKey: function(e) {
                var t = this.ToPrimitive(e, String);
                return "symbol" == typeof t ? o.call(t) : this.ToString(t)
            },
            ToLength: function(e) {
                var t = this.ToInteger(e);
                return 0 >= t ? 0 : t > u ? u : t
            },
            CanonicalNumericIndexString: function(e) {
                if ("[object String]" !== n.call(e))
                    throw new TypeError("must be a string");
                if ("-0" === e)
                    return -0;
                var t = this.ToNumber(e);
                return this.SameValue(this.ToString(t), e) ? t : void 0
            },
            RequireObjectCoercible: O.CheckObjectCoercible,
            IsArray: Array.isArray || function(e) {
                return "[object Array]" === n.call(e)
            },
            IsConstructor: function(e) {
                return "function" == typeof e && !!e.prototype
            },
            IsExtensible: function(e) {
                return Object.preventExtensions ? f(e) ? !1 : Object.isExtensible(e) : !0
            },
            IsInteger: function(e) {
                if ("number" != typeof e || a(e) || !s(e))
                    return !1;
                var t = Math.abs(e);
                return Math.floor(t) === t
            },
            IsPropertyKey: function(e) {
                return "string" == typeof e || "symbol" == typeof e
            },
            IsRegExp: function(e) {
                if (!e || "object" != typeof e)
                    return !1;
                if (i) {
                    var t = e[Symbol.match];
                    if ("undefined" != typeof t)
                        return O.ToBoolean(t)
                }
                return C(e)
            },
            SameValueZero: function(e, t) {
                return e === t || a(e) && a(t)
            },
            GetV: function(e, t) {
                if (!this.IsPropertyKey(t))
                    throw new TypeError("Assertion failed: IsPropertyKey(P) is not true");
                var r = this.ToObject(e);
                return r[t]
            },
            GetMethod: function(e, t) {
                if (!this.IsPropertyKey(t))
                    throw new TypeError("Assertion failed: IsPropertyKey(P) is not true");
                var r = this.GetV(e, t);
                if (null == r)
                    return void 0;
                if (!this.IsCallable(r))
                    throw new TypeError(t + "is not a function");
                return r
            },
            Get: function(e, t) {
                if ("Object" !== this.Type(e))
                    throw new TypeError("Assertion failed: Type(O) is not Object");
                if (!this.IsPropertyKey(t))
                    throw new TypeError("Assertion failed: IsPropertyKey(P) is not true");
                return e[t]
            },
            Type: function(e) {
                return "symbol" == typeof e ? "Symbol" : O.Type(e)
            },
            SpeciesConstructor: function(e, t) {
                if ("Object" !== this.Type(e))
                    throw new TypeError("Assertion failed: Type(O) is not Object");
                var r = e.constructor;
                if ("undefined" == typeof r)
                    return t;
                if ("Object" !== this.Type(r))
                    throw new TypeError("O.constructor is not an Object");
                var n = i && Symbol.species ? r[Symbol.species] : void 0;
                if (null == n)
                    return t;
                if (this.IsConstructor(n))
                    return n;
                throw new TypeError("no constructor found")
            }
        });
    delete B.CheckObjectCoercible, e.exports = B
}), (function(e) {
    e.exports = Number.isNaN || function(e) {
        return e !== e
    }
}), (function(e) {
    var t = Number.isNaN || function(e) {
        return e !== e
    };
    e.exports = Number.isFinite || function(e) {
        return "number" == typeof e && !t(e) && 1 / 0 !== e && e !== -1 / 0
    }
}), (function(e) {
    var t = Object.prototype.hasOwnProperty;
    e.exports = Object.assign || function(e, r) {
        for (var n in r)
            t.call(r, n) && (e[n] = r[n]);
        return e
    }
}), (function(e) {
    e.exports = function(e) {
        return e >= 0 ? 1 : -1
    }
}), (function(e) {
    e.exports = function(e, t) {
        var r = e % t;
        return Math.floor(r >= 0 ? r : r + t)
    }
}), (function(e) {
    e.exports = function(e) {
        return null === e || "function" != typeof e && "object" != typeof e
    }
}), (function(e, t, r) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator,
        i = r(36),
        o = r(37),
        a = r(38),
        s = r(39),
        u = function(e, t) {
            if ("undefined" == typeof e || null === e)
                throw new TypeError("Cannot call method on " + e);
            if ("string" != typeof t || "number" !== t && "string" !== t)
                throw new TypeError('hint must be "string" or "number"');
            var r,
                n,
                a,
                s = "string" === t ? ["toString", "valueOf"] : ["valueOf", "toString"];
            for (a = 0; a < s.length; ++a)
                if (r = e[s[a]], o(r) && (n = r.call(e), i(n)))
                    return n;
            throw new TypeError("No default value")
        },
        d = function(e, t) {
            var r = e[t];
            if (null !== r && "undefined" != typeof r) {
                if (!o(r))
                    throw new TypeError(r + " returned for property " + t + " of object " + e + " is not a function");
                return r
            }
        };
    e.exports = function(e, t) {
        if (i(e))
            return e;
        var r = "default";
        arguments.length > 1 && (t === String ? r = "string" : t === Number && (r = "number"));
        var o;
        if (n && (Symbol.toPrimitive ? o = d(e, Symbol.toPrimitive) : s(e) && (o = Symbol.prototype.valueOf)), "undefined" != typeof o) {
            var c = o.call(e, r);
            if (i(c))
                return c;
            throw new TypeError("unable to convert exotic object to primitive")
        }
        return "default" === r && (a(e) || s(e)) && (r = "string"), u(e, "default" === r ? "number" : r)
    }
}), (function(e) {
    e.exports = function(e) {
        return null === e || "function" != typeof e && "object" != typeof e
    }
}), (function(e) {
    "use strict";
    var t = Function.prototype.toString,
        r = /^\s*class /,
        n = function(e) {
            try {
                var n = t.call(e),
                    i = n.replace(/\/\/.*\n/g, ""),
                    o = i.replace(/\/\*[.\s\S]*\*\//g, ""),
                    a = o.replace(/\n/gm, " ").replace(/ {2}/g, " ");
                return r.test(a)
            } catch (s) {
                return !1
            }
        },
        i = function(e) {
            try {
                return n(e) ? !1 : (t.call(e), !0)
            } catch (r) {
                return !1
            }
        },
        o = Object.prototype.toString,
        a = "[object Function]",
        s = "[object GeneratorFunction]",
        u = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
    e.exports = function(e) {
        if (!e)
            return !1;
        if ("function" != typeof e && "object" != typeof e)
            return !1;
        if (u)
            return i(e);
        if (n(e))
            return !1;
        var t = o.call(e);
        return t === a || t === s
    }
}), (function(e) {
    "use strict";
    var t = Date.prototype.getDay,
        r = function(e) {
            try {
                return t.call(e), !0
            } catch (r) {
                return !1
            }
        },
        n = Object.prototype.toString,
        i = "[object Date]",
        o = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
    e.exports = function(e) {
        return "object" != typeof e || null === e ? !1 : o ? r(e) : n.call(e) === i
    }
}), (function(e) {
    "use strict";
    var t = Object.prototype.toString,
        r = "function" == typeof Symbol && "symbol" == typeof Symbol();
    if (r) {
        var n = Symbol.prototype.toString,
            i = /^Symbol\(.*\)$/,
            o = function(e) {
                return "symbol" != typeof e.valueOf() ? !1 : i.test(n.call(e))
            };
        e.exports = function(e) {
            if ("symbol" == typeof e)
                return !0;
            if ("[object Symbol]" !== t.call(e))
                return !1;
            try {
                return o(e)
            } catch (r) {
                return !1
            }
        }
    } else
        e.exports = function() {
            return !1
        }
}), (function(e, t, r) {
    var n = r(41);
    e.exports = Function.prototype.bind || n
}), (function(e) {
    var t = "Function.prototype.bind called on incompatible ",
        r = Array.prototype.slice,
        n = Object.prototype.toString,
        i = "[object Function]";
    e.exports = function(e) {
        var o = this;
        if ("function" != typeof o || n.call(o) !== i)
            throw new TypeError(t + o);
        for (var a, s = r.call(arguments, 1), u = function() {
                if (this instanceof a) {
                    var t = o.apply(this, s.concat(r.call(arguments)));
                    return Object(t) === t ? t : this
                }
                return o.apply(e, s.concat(r.call(arguments)))
            }, d = Math.max(0, o.length - s.length), c = [], l = 0; d > l; l++)
            c.push("$" + l);
        if (a = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(u), o.prototype) {
            var f = function() {};
            f.prototype = o.prototype, a.prototype = new f, f.prototype = null
        }
        return a
    }
}), (function(e, t, r) {
    "use strict";
    var n = r(29),
        i = r(30),
        o = r(32),
        a = r(33),
        s = r(37),
        u = r(43),
        d = {
            ToPrimitive: u,
            ToBoolean: function(e) {
                return Boolean(e)
            },
            ToNumber: function(e) {
                return Number(e)
            },
            ToInteger: function(e) {
                var t = this.ToNumber(e);
                return n(t) ? 0 : 0 !== t && i(t) ? o(t) * Math.floor(Math.abs(t)) : t
            },
            ToInt32: function(e) {
                return this.ToNumber(e) >> 0
            },
            ToUint32: function(e) {
                return this.ToNumber(e) >>> 0
            },
            ToUint16: function(e) {
                var t = this.ToNumber(e);
                if (n(t) || 0 === t || !i(t))
                    return 0;
                var r = o(t) * Math.floor(Math.abs(t));
                return a(r, 65536)
            },
            ToString: function(e) {
                return String(e)
            },
            ToObject: function(e) {
                return this.CheckObjectCoercible(e), Object(e)
            },
            CheckObjectCoercible: function(e, t) {
                if (null == e)
                    throw new TypeError(t || "Cannot call method on " + e);
                return e
            },
            IsCallable: s,
            SameValue: function(e, t) {
                return e === t ? 0 === e ? 1 / e === 1 / t : !0 : n(e) && n(t)
            },
            Type: function(e) {
                return null === e ? "Null" : "undefined" == typeof e ? "Undefined" : "function" == typeof e || "object" == typeof e ? "Object" : "number" == typeof e ? "Number" : "boolean" == typeof e ? "Boolean" : "string" == typeof e ? "String" : void 0
            }
        };
    e.exports = d
}), (function(e, t, r) {
    "use strict";
    var n = Object.prototype.toString,
        i = r(36),
        o = r(37),
        a = {
            "[[DefaultValue]]": function(e, t) {
                var r = t || ("[object Date]" === n.call(e) ? String : Number);
                if (r === String || r === Number) {
                    var a,
                        s,
                        u = r === String ? ["toString", "valueOf"] : ["valueOf", "toString"];
                    for (s = 0; s < u.length; ++s)
                        if (o(e[u[s]]) && (a = e[u[s]](), i(a)))
                            return a;
                    throw new TypeError("No default value")
                }
                throw new TypeError("invalid [[DefaultValue]] hint supplied")
            }
        };
    e.exports = function(e, t) {
        return i(e) ? e : a["[[DefaultValue]]"](e, t)
    }
}), (function(e, t, r) {
    "use strict";
    var n = r(45),
        i = RegExp.prototype.exec,
        o = Object.getOwnPropertyDescriptor,
        a = function(e) {
            try {
                var t = e.lastIndex;
                return e.lastIndex = 0, i.call(e), !0
            } catch (r) {
                return !1
            } finally {
                e.lastIndex = t
            }
        },
        s = Object.prototype.toString,
        u = "[object RegExp]",
        d = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
    e.exports = function(e) {
        if (!e || "object" != typeof e)
            return !1;
        if (!d)
            return s.call(e) === u;
        var t = o(e, "lastIndex"),
            r = t && n(t, "value");
        return r ? a(e) : !1
    }
}), (function(e, t, r) {
    var n = r(40);
    e.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
}), (function(e, t, r) {
    "use strict";
    var n = r(22),
        i = r(47);
    e.exports = function() {
        var e = i();
        return Array.prototype.includes !== e && n(Array.prototype, {
            includes: e
        }), e
    }
}), (function(e, t, r) {
    "use strict";
    var n = r(48);
    e.exports = function() {
        return Array.prototype.includes || n
    }
}), (function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(28),
            i = Number.isNaN || function(e) {
                return e !== e
            },
            o = Number.isFinite || function(e) {
                return "number" == typeof e && t.isFinite(e)
            },
            a = Array.prototype.indexOf;
        e.exports = function(e) {
            var t = arguments.length > 1 ? n.ToInteger(arguments[1]) : 0;
            if (a && !i(e) && o(t) && "undefined" != typeof e)
                return a.apply(this, arguments) > -1;
            var r = n.ToObject(this),
                s = n.ToLength(r.length);
            if (0 === s)
                return !1;
            for (var u = t >= 0 ? t : Math.max(0, s + t); s > u;) {
                if (n.SameValueZero(e, r[u]))
                    return !0;
                u += 1
            }
            return !1
        }
    }).call(t, (function() {
        return this
    })())
}), (function(e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    function i() {
        addEventListener("message", o, !1)
    }
    function o(e) {
        var t = e.message ? "message" : "data",
            r = {};
        try {
            r = JSON.parse(e[t])
        } catch (n) {
            return
        }
        if (r.adId) {
            var i = pbjs._bidsReceived.find((function(e) {
                return e.adId === r.adId
            }));
            "Prebid Request" === r.message && (a(i, r.adServerDomain, e.source), d["default"].emit(l, i))
        }
    }
    function a(e, t, r) {
        var n = e.adId,
            i = e.ad,
            o = e.adUrl,
            a = e.width,
            u = e.height;
        n && (s(e), r.postMessage(JSON.stringify({
            message: "Prebid Response",
            ad: i,
            adUrl: o,
            adId: n,
            width: a,
            height: u
        }), t))
    }
    function s(e) {
        var t = e.adUnitCode,
            r = e.width,
            n = e.height,
            i = document.getElementById(window.googletag.pubads().getSlots().find((function(e) {
                return e.getAdUnitPath() === t || e.getSlotElementId() === t
            })).getSlotElementId()).querySelector("iframe");
        i.width = "" + r, i.height = "" + n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.listenMessagesFromCreative = i;
    var u = r(8),
        d = n(u),
        c = r(3),
        l = c.EVENTS.BID_WON
}), (function(e, t, r) {
    "use strict";
    var n = r(11),
        i = function(e) {
            this.name = e.adserver, this.code = e.code, this.getWinningBidByCode = function() {
                var e = this,
                    t = pbjs._bidsReceived.find((function(t) {
                        return t.adUnitCode === e.code
                    }));
                return t
            }
        };
    t.dfpAdserver = function(e, t) {
        var r = new i(e);
        r.urlComponents = t;
        var o = {
                env: "vp",
                gdfp_req: "1",
                impl: "s",
                unviewed_position_start: "1"
            },
            a = ["output", "iu", "sz", "url", "correlator", "description_url", "hl"],
            s = function(e) {
                return encodeURIComponent(n.formatQS(e))
            };
        return r.appendQueryParams = function() {
            var e = r.getWinningBidByCode();
            this.urlComponents.search.description_url = encodeURIComponent(e.descriptionUrl), this.urlComponents.search.cust_params = s(e.adserverTargeting), this.urlComponents.search.correlator = Date.now()
        }, r.verifyAdserverTag = function() {
            for (var e in o)
                if (!this.urlComponents.search.hasOwnProperty(e) || this.urlComponents.search[e] !== o[e])
                    return !1;
            for (var t in a)
                if (!this.urlComponents.search.hasOwnProperty(a[t]))
                    return !1;
            return !0
        }, r
    }
}), (function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    function i() {
        var e = p.getWinningBids(),
            t = o();
        return e = e.map((function(e) {
            return n({}, e.adUnitCode, Object.keys(e.adserverTargeting).filter((function(r) {
                return "undefined" == typeof e.sendStandardTargeting || e.sendStandardTargeting || -1 === t.indexOf(r)
            })).map((function(t) {
                return n({}, t.substring(0, 20), [e.adserverTargeting[t]])
            })))
        }))
    }
    function o() {
        return c.getStandardBidderAdServerTargeting().map((function(e) {
            return e.key
        })).concat(f.TARGETING_KEYS).filter(d.uniques)
    }
    function a(e) {
        var t = o();
        return pbjs._bidsReceived.filter(d.adUnitsFilter.bind(this, e)).map((function(e) {
            return e.alwaysUseBid ? n({}, e.adUnitCode, Object.keys(e.adserverTargeting).map((function(r) {
                return t.indexOf(r) > -1 ? void 0 : n({}, r.substring(0, 20), [e.adserverTargeting[r]])
            })).filter((function(e) {
                return e
            }))) : void 0
        })).filter((function(e) {
            return e
        }))
    }
    function s(e) {
        var t = f.TARGETING_KEYS;
        return pbjs._bidsReceived.filter(d.adUnitsFilter.bind(this, e)).map((function(e) {
            return e.adserverTargeting ? n({}, e.adUnitCode, u(e, t.filter((function(t) {
                return "undefined" != typeof e.adserverTargeting[t]
            })))) : void 0
        })).filter((function(e) {
            return e
        }))
    }
    function u(e, t) {
        return t.map((function(t) {
            return n({}, (t + "_" + e.bidderCode).substring(0, 20), [e.adserverTargeting[t]])
        }))
    }
    var d = r(2),
        c = r(13),
        l = r(2),
        f = r(3),
        p = t,
        g = [];
    p.resetPresetTargeting = function() {
        d.isGptPubadsDefined() && window.googletag.pubads().getSlots().forEach((function(e) {
            g.forEach((function(t) {
                pbjs.adUnits.find((function(r) {
                    (r.code === e.getAdUnitPath() || r.code === e.getSlotElementId()) && e.setTargeting(t, null)
                }))
            }))
        }))
    }, p.getAllTargeting = function(e) {
        var t = e && e.length ? [e] : pbjs._adUnitCodes,
            r = i(t).concat(a(t)).concat(pbjs._sendAllBids ? s(t) : []);
        return r.map((function(e) {
            Object.keys(e).map((function(t) {
                e[t].map((function(e) {
                    -1 === g.indexOf(Object.keys(e)[0]) && (g = Object.keys(e).concat(g))
                }))
            }))
        })), r
    }, p.setTargeting = function(e) {
        window.googletag.pubads().getSlots().forEach((function(t) {
            e.filter((function(e) {
                return Object.keys(e)[0] === t.getAdUnitPath() || Object.keys(e)[0] === t.getSlotElementId()
            })).forEach((function(e) {
                return e[Object.keys(e)[0]].forEach((function(e) {
                    e[Object.keys(e)[0]].map((function(r) {
                        return l.logMessage("Attempting to set key value for slot: " + t.getSlotElementId() + " key: " + Object.keys(e)[0] + " value: " + r), r
                    })).forEach((function(r) {
                        t.setTargeting(Object.keys(e)[0], r)
                    }))
                }))
            }))
        }))
    }, p.getWinningBids = function(e) {
        var t = e ? [e] : pbjs._adUnitCodes;
        return pbjs._bidsReceived.filter((function(e) {
            return t.includes(e.adUnitCode)
        })).filter((function(e) {
            return e.cpm > 0
        })).map((function(e) {
            return e.adUnitCode
        })).filter(d.uniques).map((function(e) {
            return pbjs._bidsReceived.filter((function(t) {
                return t.adUnitCode === e ? t : null
            })).reduce(d.getHighestCpm, {
                adUnitCode: e,
                cpm: 0,
                adserverTargeting: {},
                timeToRespond: 0
            })
        }))
    }, p.setTargetingForAst = function() {
        var e = pbjs.getAdserverTargeting();
        Object.keys(e).forEach((function(t) {
            return Object.keys(e[t]).forEach((function(r) {
                if (l.logMessage("Attempting to set targeting for targetId: " + t + " key: " + r + " value: " + e[t][r]), l.isStr(e[t][r]) || l.isArray(e[t][r])) {
                    var n = {},
                        i = "hb_adid",
                        o = r.substring(0, i.length) === i ? r.toUpperCase() : r;
                    n[o] = e[t][r], window.apntag.setKeywords(t, n)
                }
            }))
        }))
    }, p.isApntagDefined = function() {
        return window.apntag && l.isFn(window.apntag.setKeywords) ? !0 : void 0
    }
})]);

/* jshint ignore:end */
