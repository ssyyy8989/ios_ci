/*!
 * Swipe 2.0.6
 *
 * Brad Birdsall & Felix Liu
 * Copyright 2015, MIT License
 *
 */! function (a, b) {
    "function" == typeof define && define.amd ? define([], function () {
        return a.Swipe = b()
    }) : "object" == typeof exports ? module.exports = b() : a.Swipe = b()
}(this, function () {
    function Swipe(c, d) {
        "use strict";

        function e() {
            u = y.children, x = u.length, u.length < 2 && (d.continuous = !1), t.transitions && d.continuous && u.length <
                3 && (y.appendChild(u[0].cloneNode(!0)), y.appendChild(y.children[1].cloneNode(!0)), u = y.children), v =
                new Array(u.length), w = c.getBoundingClientRect().width || c.offsetWidth, y.style.width = u.length * w *
                2 + "px";
            for (var a = u.length; a--;) {
                var b = u[a];
                b.style.width = w + "px", b.setAttribute("data-index", a), t.transitions && (b.style.left = a * -w +
                    "px", k(a, z > a ? -w : a > z ? w : 0, 0))
            }
            d.continuous && t.transitions && (k(h(z - 1), -w, 0), k(h(z + 1), w, 0)), t.transitions || (y.style.left =
                z * -w + "px"), c.style.visibility = "visible"
        }
        function f() {
            d.continuous ? j(z - 1) : z && j(z - 1)
        }
        function g() {
            d.continuous ? j(z + 1) : z < u.length - 1 && j(z + 1)
        }
        function h(a) {
            return (u.length + a % u.length) % u.length
        }
        function i() {
            var a = z;
            return a >= x && (a -= x), a
        }
        function j(a, b) {
            if (z !== a) {
                if (t.transitions) {
                    var c = Math.abs(z - a) / (z - a);
                    if (d.continuous) {
                        var e = c;
                        c = -v[h(a)] / w, c !== e && (a = -c * u.length + a)
                    }
                    for (var f = Math.abs(z - a) - 1; f--;) k(h((a > z ? a : z) - f - 1), w * c, 0);
                    a = h(a), k(z, w * c, b || A), k(a, 0, b || A), d.continuous && k(h(a - c), -(w * c), 0)
                } else a = h(a), m(z * -w, a * -w, b || A);
                z = a, s(d.callback && d.callback(i(), u[z]))
            }
        }
        function k(a, b, c) {
            l(a, b, c), v[a] = b
        }
        function l(a, b, c) {
            var d = u[a],
                e = d && d.style;
            e && (e.webkitTransitionDuration = e.MozTransitionDuration = e.msTransitionDuration = e.OTransitionDuration =
                e.transitionDuration = c + "ms", e.webkitTransform = "translate(" + b + "px,0)translateZ(0)", e.msTransform =
                e.MozTransform = e.OTransform = "translateX(" + b + "px)")
        }
        function m(a, b, c) {
            if (!c) return void(y.style.left = b + "px");
            var e = +new Date,
                f = setInterval(function () {
                    var g = +new Date - e;
                    return g > c ? (y.style.left = b + "px", D && n(), d.transitionEnd && d.transitionEnd.call(event, i(),
                        u[z]), void clearInterval(f)) : void(y.style.left = (b - a) * (Math.floor(g / c * 100) / 100) +
                        a + "px")
                }, 4)
        }
        function n() {
            B = setTimeout(g, D)
        }
        function o() {
            D = 0, clearTimeout(B)
        }
        function p() {
            o(), D = d.auto || 0, n()
        }
        function q(a) {
            return /^mouse/.test(a.type)
        }
        var r = function () {}, s = function (a) {
                setTimeout(a || r, 0)
            }, t = {
                addEventListener: !! a.addEventListener,
                touch: "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch,
                transitions: function (a) {
                    var b = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
                    for (var c in b) if (void 0 !== a.style[b[c]]) return !0;
                    return !1
                }(b.createElement("swipe"))
            };
        if (c) {
            var u, v, w, x, y = c.children[0];
            d = d || {};
            var z = parseInt(d.startSlide, 10) || 0,
                A = d.speed || 300;
            d.continuous = void 0 !== d.continuous ? d.continuous : !0, d.autoRestart = void 0 !== d.autoRestart ? d.autoRestart : !
                1;
            var B, C, D = d.auto || 0,
                E = {}, F = {}, G = {
                    handleEvent: function (a) {
                        switch (a.type) {
                        case "mousedown":
                        case "touchstart":
                            this.start(a);
                            break;
                        case "mousemove":
                        case "touchmove":
                            this.move(a);
                            break;
                        case "mouseup":
                        case "mouseleave":
                        case "touchend":
                            s(this.end(a));
                            break;
                        case "webkitTransitionEnd":
                        case "msTransitionEnd":
                        case "oTransitionEnd":
                        case "otransitionend":
                        case "transitionend":
                            s(this.transitionEnd(a));
                            break;
                        case "resize":
                            s(e)
                        }
                        d.stopPropagation && a.stopPropagation()
                    },
                    start: function (a) {
                        var b;
                        q(a) ? (b = a, a.preventDefault()) : b = a.touches[0], E = {
                            x: b.pageX,
                            y: b.pageY,
                            time: +new Date
                        }, C = void 0, F = {}, q(a) ? (y.addEventListener("mousemove", this, !1), y.addEventListener(
                            "mouseup", this, !1), y.addEventListener("mouseleave", this, !1)) : (y.addEventListener(
                            "touchmove", this, !1), y.addEventListener("touchend", this, !1))
                    },
                    move: function (a) {
                        var b;
                        if (q(a)) b = a;
                        else {
                            if (a.touches.length > 1 || a.scale && 1 !== a.scale) return;
                            d.disableScroll && a.preventDefault(), b = a.touches[0]
                        }
                        F = {
                            x: b.pageX - E.x,
                            y: b.pageY - E.y
                        }, "undefined" == typeof C && (C = !! (C || Math.abs(F.x) < Math.abs(F.y))), C || (a.preventDefault(),
                            o(), d.continuous ? (l(h(z - 1), F.x + v[h(z - 1)], 0), l(z, F.x + v[z], 0), l(h(z + 1), F.x +
                            v[h(z + 1)], 0)) : (F.x = F.x / (!z && F.x > 0 || z === u.length - 1 && F.x < 0 ? Math.abs(
                            F.x) / w + 1 : 1), l(z - 1, F.x + v[z - 1], 0), l(z, F.x + v[z], 0), l(z + 1, F.x + v[z + 1],
                            0)))
                    },
                    end: function (a) {
                        var b = +new Date - E.time,
                            c = Number(b) < 250 && Math.abs(F.x) > 20 || Math.abs(F.x) > w / 2,
                            e = !z && F.x > 0 || z === u.length - 1 && F.x < 0;
                        d.continuous && (e = !1);
                        var f = F.x < 0;
                        C || (c && !e ? (f ? (d.continuous ? (k(h(z - 1), -w, 0), k(h(z + 2), w, 0)) : k(z - 1, -w, 0),
                            k(z, v[z] - w, A), k(h(z + 1), v[h(z + 1)] - w, A), z = h(z + 1)) : (d.continuous ? (k(h(z +
                            1), w, 0), k(h(z - 2), -w, 0)) : k(z + 1, w, 0), k(z, v[z] + w, A), k(h(z - 1), v[h(z - 1)] +
                            w, A), z = h(z - 1)), d.callback && d.callback(i(), u[z])) : d.continuous ? (k(h(z - 1), -w,
                            A), k(z, 0, A), k(h(z + 1), w, A)) : (k(z - 1, -w, A), k(z, 0, A), k(z + 1, w, A))), q(a) ?
                            (y.removeEventListener("mousemove", G, !1), y.removeEventListener("mouseup", G, !1), y.removeEventListener(
                            "mouseleave", G, !1)) : (y.removeEventListener("touchmove", G, !1), y.removeEventListener(
                            "touchend", G, !1))
                    },
                    transitionEnd: function (a) {
                        parseInt(a.target.getAttribute("data-index"), 10) === z && ((D || d.autoRestart) && p(), d.transitionEnd &&
                            d.transitionEnd.call(a, i(), u[z]))
                    }
                };
            return e(), D && n(), t.addEventListener ? (t.touch && y.addEventListener("touchstart", G, !1), d.draggable &&
                y.addEventListener("mousedown", G, !1), t.transitions && (y.addEventListener("webkitTransitionEnd", G, !
                1), y.addEventListener("msTransitionEnd", G, !1), y.addEventListener("oTransitionEnd", G, !1), y.addEventListener(
                "otransitionend", G, !1), y.addEventListener("transitionend", G, !1)), a.addEventListener("resize", G, !
                1)) : a.onresize = function () {
                e()
            }, {
                setup: function () {
                    e()
                },
                slide: function (a, b) {
                    o(), j(a, b)
                },
                prev: function () {
                    o(), f()
                },
                next: function () {
                    o(), g()
                },
                restart: function () {
                    p()
                },
                stop: function () {
                    o()
                },
                getPos: function () {
                    return i()
                },
                getNumSlides: function () {
                    return x
                },
                kill: function () {
                    o(), y.style.width = "", y.style.left = "";
                    for (var b = u.length; b--;) {
                        var c = u[b];
                        c.style.width = "", c.style.left = "", t.transitions && l(b, 0, 0)
                    }
                    t.addEventListener ? (y.removeEventListener("touchstart", G, !1), y.removeEventListener("mousedown",
                        G, !1), y.removeEventListener("webkitTransitionEnd", G, !1), y.removeEventListener(
                        "msTransitionEnd", G, !1), y.removeEventListener("oTransitionEnd", G, !1), y.removeEventListener(
                        "otransitionend", G, !1), y.removeEventListener("transitionend", G, !1), a.removeEventListener(
                        "resize", G, !1)) : a.onresize = null
                }
            }
        }
    }
    var a = this,
        b = a.document;
    return (a.jQuery || a.Zepto) && ! function (a) {
        a.fn.Swipe = function (b) {
            return this.each(function () {
                a(this).data("Swipe", new Swipe(a(this)[0], b))
            })
        }
    }(a.jQuery || a.Zepto), Swipe
});