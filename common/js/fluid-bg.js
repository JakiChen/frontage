/*
 * Copyright (c) 2012 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

/*
 ** Copyright (c) 2012 The Khronos Group Inc.
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a
 ** copy of this software and/or associated documentation files (the
 ** "Materials"), to deal in the Materials without restriction, including
 ** without limitation the rights to use, copy, modify, merge, publish,
 ** distribute, sublicense, and/or sell copies of the Materials, and to
 ** permit persons to whom the Materials are furnished to do so, subject to
 ** the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included
 ** in all copies or substantial portions of the Materials.
 **
 ** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 ** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 ** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 ** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 ** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 ** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 ** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
 */

/*
 * Copyright (c) 2012 Brandon Jones, Colin MacKenzie IV
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

(function (e) {
    function i(e) {
        var t = document.createEvent("CustomEvent");
        t.initCustomEvent("fullscreenchange", !0, !1, null), document.dispatchEvent(t)
    }

    function s(e) {
        var t = document.createEvent("CustomEvent");
        t.initCustomEvent("fullscreenerror", !0, !1, null), document.dispatchEvent(t)
    }

    function u(e) {
        var t = document.createEvent("CustomEvent");
        t.initCustomEvent("pointerlockchange", !0, !1, null), document.dispatchEvent(t)
    }

    function a(e) {
        var t = document.createEvent("CustomEvent");
        t.initCustomEvent("pointerlockerror", !0, !1, null), document.dispatchEvent(t)
    }
    var t = (e.HTMLElement || e.Element).prototype,
        n, r = e.GameShim = {
            supports: {
                fullscreen: !0,
                pointerLock: !0,
                gamepad: !0,
                highResTimer: !0
            }
        };
    (function () {
        var e = 0,
            t = ["webkit", "moz", "ms", "o"],
            r;
        for (r = 0; r < t.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[t[r] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
        for (r = 0; r < t.length && !window.cancelAnimationFrame; ++r) window.cancelAnimationFrame = window[t[r] + "CancelAnimationFrame"] || window[t[r] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
            var r = Date.now(),
                i = Math.max(0, 16 - (r - e)),
                s = window.setTimeout(function () {
                    t(r + i)
                }, i);
            return e = r + i, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
            clearTimeout(e)
        }), window.animationStartTime || (n = function () {
            for (r = 0; r < t.length; ++r)
                if (window[t[r] + "AnimationStartTime"]) return function () {
                    return window[t[r] + "AnimationStartTime"]
                };
            return function () {
                return Date.now()
            }
        }(), Object.defineProperty(window, "animationStartTime", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: n
        }))
    })(), document.hasOwnProperty("fullscreenEnabled") || (n = function () {
        return "webkitIsFullScreen" in document ? function () {
            return webkitRequestFullScreen in document
        } : "mozFullScreenEnabled" in document ? function () {
            return document.mozFullScreenEnabled
        } : (r.supports.fullscreen = !1, function () {
            return !1
        })
    }(), Object.defineProperty(document, "fullscreenEnabled", {
        enumerable: !0,
        configurable: !1,
        writeable: !1,
        get: n
    })), document.hasOwnProperty("fullscreenElement") || (n = function () {
        var e = 0,
            t = ["webkitCurrentFullScreenElement", "webkitFullscreenElement", "mozFullScreenElement"];
        for (; e < t.length; e++)
            if (t[e] in document) return function () {
                return document[t[e]]
            };
        return function () {
            return null
        }
    }(), Object.defineProperty(document, "fullscreenElement", {
        enumerable: !0,
        configurable: !1,
        writeable: !1,
        get: n
    })), document.addEventListener("webkitfullscreenchange", i, !1), document.addEventListener("mozfullscreenchange", i, !1), document.addEventListener("webkitfullscreenerror", s, !1), document.addEventListener("mozfullscreenerror", s, !1), t.requestFullscreen || (t.requestFullscreen = function () {
        return t.webkitRequestFullScreen ? function () {
            this.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        } : t.mozRequestFullScreen ? function () {
            this.mozRequestFullScreen()
        } : function () {}
    }()), document.exitFullscreen || (document.exitFullscreen = function () {
        return document.webkitExitFullscreen || document.mozCancelFullScreen || function () {}
    }());
    var o = e.MouseEvent.prototype;
    "movementX" in o || Object.defineProperty(o, "movementX", {
        enumerable: !0,
        configurable: !1,
        writeable: !1,
        get: function () {
            return this.webkitMovementX || this.mozMovementX || 0
        }
    }), "movementY" in o || Object.defineProperty(o, "movementY", {
        enumerable: !0,
        configurable: !1,
        writeable: !1,
        get: function () {
            return this.webkitMovementY || this.mozMovementY || 0
        }
    }), navigator.pointer || (navigator.pointer = navigator.webkitPointer || navigator.mozPointer), document.addEventListener("webkitpointerlockchange", u, !1), document.addEventListener("webkitpointerlocklost", u, !1), document.addEventListener("mozpointerlockchange", u, !1), document.addEventListener("mozpointerlocklost", u, !1), document.addEventListener("webkitpointerlockerror", a, !1), document.addEventListener("mozpointerlockerror", a, !1), document.hasOwnProperty("pointerLockElement") || (n = function () {
        return "webkitPointerLockElement" in document ? function () {
            return document.webkitPointerLockElement
        } : "mozPointerLockElement" in document ? function () {
            return document.mozPointerLockElement
        } : function () {
            return null
        }
    }(), Object.defineProperty(document, "pointerLockElement", {
        enumerable: !0,
        configurable: !1,
        writeable: !1,
        get: n
    })), t.requestPointerLock || (t.requestPointerLock = function () {
        return t.webkitRequestPointerLock ? function () {
            this.webkitRequestPointerLock()
        } : t.mozRequestPointerLock ? function () {
            this.mozRequestPointerLock()
        } : navigator.pointer ? function () {
            var e = this;
            navigator.pointer.lock(e, u, a)
        } : (r.supports.pointerLock = !1, function () {})
    }()), document.exitPointerLock || (document.exitPointerLock = function () {
        return document.webkitExitPointerLock || document.mozExitPointerLock || function () {
            if (navigator.pointer) {
                var e = this;
                navigator.pointer.unlock()
            }
        }
    }()), navigator.gamepads || (n = function () {
        if ("webkitGamepads" in navigator) return function () {
            return navigator.webkitGamepads
        };
        if ("mozGamepads" in navigator) return function () {
            return navigator.mozGamepads
        };
        r.supports.gamepad = !1;
        var e = [];
        return function () {
            return e
        }
    }(), Object.defineProperty(navigator, "gamepads", {
        enumerable: !0,
        configurable: !1,
        writeable: !1,
        get: n
    })), window.performance || (window.performance = {}), window.performance.timing || (window.performance.timing = {
        navigationStart: Date.now()
    }), window.performance.now || (window.performance.now = function () {
        return window.performance.webkitNow ? window.performance.webkitNow : (r.supports.highResTimer = !1, function () {
            return Date.now() - window.performance.timing.navigationStart
        })
    }())
})(typeof exports != "undefined" ? global : window), define("game-shim", function () {}), define("engine/loader", ["require", "exports", "module"], function (e, t, n) {
        function r(e) {
            this.root = e || "", this.resources = {}
        }
        return r.prototype = {
            load: function (e, t, n, r) {
                function a(e, n) {
                    u.resources[e] = n, i--, i === 0 ? t && t(u) : r && r(s, i, o)
                }

                function f(e, t) {
                    i--, o++, u.resources[e] = null, t.src = e, n && n(u, t)
                }
                var i = 0,
                    s = 0,
                    o = 0,
                    u = this;
                for (var l = 0; l < e.length; l++) {
                    var c = e[l];
                    if (c in this.resources) continue;
                    i++, s++, /\.(jpe?g|gif|png)$/.test(c) ? this._loadImage(c, a, f) : /\.(og(g|a)|mp3)$/.test(c) ? this._loadAudio(c, a, f) : /\.json$/.test(c) ? this._loadJSON(c, a, f) : /\.(bin|raw)/.test(c) ? this._loadBin(c, a, f) : this._loadData(c, a, f)
                }
                i === 0 && t ? window.setTimeout(function () {
                    t(this)
                }, 1) : r && r(s, i, o)
            },
            _loadImage: function (e, t, n) {
                var r = this,
                    i = document.createElement("img");
                i.onload = function () {
                    t(e, i)
                }, i.onerror = function (t) {
                    n(e, t)
                }, i.src = this.root + e
            },
            _loadJSON: function (e, t, n) {
                var r = new XMLHttpRequest,
                    i = this;
                r.open("GET", e, !0), r.onload = function () {
                    try {
                        var r = JSON.parse(this.response);
                        t(e, r)
                    } catch (i) {
                        n(e, i)
                    }
                }, r.onerror = function (t) {
                    t(e, t)
                }, r.send()
            },
            _loadBin: function (e, t, n) {
                var r = new XMLHttpRequest,
                    i = this;
                r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function (n) {
                    t(e, this.response)
                }, r.onerror = function (t) {
                    t(e, t)
                }, r.send()
            },
            _loadData: function (e, t, n) {
                var r = new XMLHttpRequest,
                    i = this;
                r.open("GET", e, !0), r.onload = function (n) {
                    t(e, this.response)
                }, r.onerror = function (t) {
                    t(e, t)
                }, r.send()
            },
            _success: function (e, t) {},
            _error: function (e, t) {}
        }, r
    }), define("engine/clock", ["require", "exports", "module"], function (e, t, n) {
        var r = t,
            i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        r.Clock = function () {
            this.running = !1, this.interval = null, this.t0 = this.now(), this.t = 0, this.maxdt = .25
        }, r.Clock.prototype = {
            tick: function () {
                var e = this.now(),
                    t = (e - this.t0) / 1e3;
                this.t0 = e, this.t += t, t < this.maxdt && t > 0 && this.ontick(t)
            },
            start: function (e) {
                this.running = !0;
                var t = this,
                    n;
                i ? i(n = function () {
                    t.tick(), t.running && i(n, e)
                }, e) : this.interval = window.setInterval(function () {
                    t.tick()
                }, 1), this.t0 = this.now()
            },
            stop: function () {
                this.interval && (window.clearInterval(this.interval), this.interval = null), this.running = !1
            },
            now: function () {
                return window.performance.now()
            },
            ontick: function (e) {}
        }, r.fixedstep = function (e, t, n) {
            var r = 0,
                i = 0;
            return function (s) {
                r += s;
                while (r >= e) t(e, i), r -= e, s -= e, i += e;
                n(s, i)
            }
        }
    }), define("engine/utils", ["require", "exports", "module"], function (e, t, n) {
        var r = t;
        r.extend = function () {
            var t = arguments[0],
                n, r, i, s, o;
            for (n = 1; n < arguments.length; n++) {
                r = arguments[n];
                for (i in r) t[i] = r[i]
            }
            return t
        }, r.debounce = function (e, t) {
            function s() {
                e.apply(i, n)
            }
            var n, r, i;
            return function () {
                i = this, n = arguments, clearTimeout(r), r = setTimeout(s, t)
            }
        }, r.clamp = function (t, n, r) {
            return t < n ? n : t > r ? r : t
        }, r.getHashValue = function (e, t) {
            var n = window.location.hash.match("[#,]+" + e + "(=([^,]*))?");
            return n ? n.length == 3 && n[2] != null ? n[2] : !0 : t
        }
    }), define("engine/input", ["require", "exports", "module", "engine/utils"], function (e, t, n) {
        var r = t,
            i = e("engine/utils").clamp,
            s = navigator.userAgent.toLowerCase(),
            o = /mobile|android|ip(ad|od|hone)|windows phone/.test(s),
            u = function (e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            };
        r.Handler = function (t) {
            this.mouseMove = u(this.mouseMove, this), this.mouseDown = u(this.mouseDown, this), this.mouseUp = u(this.mouseUp, this), this.deviceOrientation = u(this.deviceOrientation, this), this.touchMove = u(this.touchMove, this), this.touchStart = u(this.touchStart, this), this.touchEnd = u(this.touchEnd, this), this.targetElement = t, this.offset = {
                x: 0,
                y: 0
            }, this.mouse = {
                down: !1,
                x: 0,
                y: 0
            }, this.orientation = {
                x: 0,
                y: 0,
                z: 0
            }, this.width = 0, this.height = 0, this.reset()
        }, r.Handler.prototype = {
            addEvent: function () {
                this.updateOffset(), o ? (window.addEventListener("deviceorientation", this.deviceOrientation), document.addEventListener("touchmove", this.touchMove), this.targetElement.addEventListener("touchstart", this.touchStart), this.targetElement.addEventListener("touchend", this.touchEnd)) : (document.addEventListener("mousemove", this.mouseMove), this.targetElement.addEventListener("mousedown", this.mouseDown), this.targetElement.addEventListener("mouseup", this.mouseUp))
            },
            removeEvent: function () {
                this.updateOffset(), o ? (window.removeEventListener("deviceorientation", this.deviceOrientation), document.removeEventListener("touchmove", this.touchMove), this.targetElement.removeEventListener("touchstart", this.touchStart), this.targetElement.removeEventListener("touchend", this.touchEnd)) : (document.removeEventListener("mousemove", this.mouseMove), this.targetElement.removeEventListener("mousedown", this.mouseDown), this.targetElement.removeEventListener("mouseup", this.mouseUp))
            },
            updateOffset: function () {
                var e = this.targetElement.getBoundingClientRect();
                this.width = e.width, this.height = e.height, this.offset = {
                    x: e.left,
                    y: e.top,
                    px: 0,
                    py: 0
                }
            },
            reset: function () {
                this.mouse = {
                    down: !1,
                    x: 0,
                    y: 0
                }
            },
            deviceOrientation: function (e) {
                this.orientation.x = e.beta, this.orientation.y = e.gamma, this.orientation.z = e.alpha
            },
            touchStart: function (e) {
                var t = e.touches[0];
                this.mouse.down = !0, this.mouse.x = t.clientX - this.offset.x, this.mouse.y = t.clientY - this.offset.y
            },
            touchEnd: function () {
                this.mouse.down = !1, this.hasFocus && this.onClick && this.onClick(this.mouse.x, this.mouse.y)
            },
            touchMove: function (e) {
                var t = e.touches[0];
                this.mouse.x = t.clientX - this.offset.x, this.mouse.y = t.clientY - this.offset.y
            },
            mouseDown: function () {
                this.mouse.down = !0
            },
            mouseUp: function () {
                this.mouse.down = !1, this.hasFocus && this.onClick && this.onClick(this.mouse.x, this.mouse.y)
            },
            mouseMove: function (e) {
                var t = e.clientX,
                    n = e.clientY;
                this.mouse.x = i(t - this.offset.x, 0, this.width), this.mouse.y = i(n - this.offset.y, 0, this.height)
            }
        }
    }), define("engine/gl/shader", ["require", "exports", "module"], function (e, t, n) {
        function r(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t
        }

        function i(e, t, n) {
            this.gl = e, this.program = this.makeProgram(t, n), this.uniformLocations = {}, this.uniformValues = {}, this.uniformNames = [], this.attributeLocations = {}
        }
        i.prototype = {
            use: function () {
                this.gl.useProgram(this.program)
            },
            prepareUniforms: function (e) {
                this.uniformNames = r(e);
                for (var t = 0; t < this.uniformNames.length; t++) {
                    var n = this.uniformNames[t];
                    this.uniformLocations[n] = this.gl.getUniformLocation(this.program, n)
                }
            },
            uniforms: function (e) {
                this.uniformNames.length === 0 && this.prepareUniforms(e);
                for (var t = 0; t < this.uniformNames.length; t++) {
                    var n = this.uniformNames[t],
                        r = this.uniformLocations[n],
                        i = e[n];
                    if (r === null) continue;
                    if (i.uniform) i.equals(this.uniformValues[n]) || (i.uniform(r), i.set(this.uniformValues, n));
                    else if (i.length) {
                        var s = this.uniformValues[n];
                        if (s !== undefined) {
                            for (var o = 0, u = i.length; o < u; o++)
                                if (i[o] != s[o]) break;
                            if (o != u)
                                for (o = 0, u = i.length; o < u; o++) s[o] = i[o]
                        } else this.uniformValues[n] = new Float32Array(i);
                        switch (i.length) {
                            case 2:
                                this.gl.uniform2fv(r, i);
                                break;
                            case 3:
                                this.gl.uniform3fv(r, i);
                                break;
                            case 4:
                                this.gl.uniform4fv(r, i);
                                break;
                            case 9:
                                this.gl.uniformMatrix3fv(r, !1, i);
                                break;
                            case 16:
                                this.gl.uniformMatrix4fv(r, !1, i)
                        }
                    } else i != this.uniformValues[n] && (this.gl.uniform1f(r, i), this.uniformValues[n] = i)
                }
            },
            getUniformLocation: function (e) {
                return this.uniformLocations[e] === undefined && (this.uniformLocations[e] = this.gl.getUniformLocation(this.program, e)), this.uniformLocations[e]
            },
            getAttribLocation: function (e) {
                if (!(e in this.attributeLocations)) {
                    var t = this.gl.getAttribLocation(this.program, e);
                    if (t < 0) throw "undefined attribute " + e;
                    this.attributeLocations[e] = t
                }
                return this.attributeLocations[e]
            },
            makeShader: function (e, t) {
                var n = this.gl.createShader(e);
                this.gl.shaderSource(n, t), this.gl.compileShader(n);
                if (!this.gl.getShaderParameter(n, this.gl.COMPILE_STATUS)) throw console.log(this.gl.getShaderInfoLog(n), e, t), 'Compiler exception: "' + this.gl.getShaderInfoLog(n) + '"';
                return n
            },
            makeProgram: function (e, t) {
                var n = this.makeShader(this.gl.VERTEX_SHADER, e),
                    r = this.makeShader(this.gl.FRAGMENT_SHADER, t),
                    i = this.gl.createProgram();
                this.gl.attachShader(i, n), this.gl.attachShader(i, r), this.gl.linkProgram(i);
                if (!this.gl.getProgramParameter(i, this.gl.LINK_STATUS)) throw "Linker exception: " + this.gl.getProgramInfoLog(i);
                return i
            }
        }, t.Shader = i, t.Manager = function (t, n, r) {
            this.gl = t, this.resources = n, this.shaders = [], r = r || {};
            this.prefix = r.prefix || window.fluid.shaderDir
        }, t.Manager.prototype = {
            includeExpression: /#include "([^"]+)"/g,
            preprocess: function (e, t) {
                return t.replace(this.includeExpression, function (e, t) {
                    return this.getSource(t)
                }.bind(this))
            },
            getSource: function (e) {
                var t = this.resources[this.prefix + e];
                if (t == null) throw "shader not found: " + e;
                return this.preprocess(e, t)
            },
            get: function (e, t) {
                t || (t = e), t += ".frag", e += ".vertex";
                var n = t + ";" + e;
                return n in this.shaders || (this.shaders[n] = new i(this.gl, this.getSource(e), this.getSource(t))), this.shaders[n]
            }
        }
    }), define("engine/gl/geometry", ["require", "exports", "module"], function (e, t, n) {
        t.grid = function (e) {
            var t = new Float32Array(e * e * 6 * 3),
                n = 0,
                r = e * .5;
            for (var i = 0; i < e; i++)
                for (var s = 0; s < e; s++) t[n++] = s / e, t[n++] = 0, t[n++] = i / e, t[n++] = s / e, t[n++] = 0, t[n++] = (i + 1) / e, t[n++] = (s + 1) / e, t[n++] = 0, t[n++] = (i + 1) / e, t[n++] = s / e, t[n++] = 0, t[n++] = i / e, t[n++] = (s + 1) / e, t[n++] = 0, t[n++] = (i + 1) / e, t[n++] = (s + 1) / e, t[n++] = 0, t[n++] = i / e;
            return t
        }, t.wireFrame = function (e) {
            var t = new Float32Array(e.length * 2),
                n = e.length / 9;
            for (var r = 0; r < n; r++)
                for (var i = 0; i < 3; i++) {
                    var s = (i + 1) % 3;
                    for (var o = 0; o < 3; o++) t[r * 18 + i * 3 + o] = e[r * 9 + i * 3 + o], t[r * 18 + i * 3 + 9 + o] = e[r * 9 + s * 3 + o]
                }
            return t
        }, t.screen_quad = function (t, n) {
            return t = t || 1, n = n || t, new Float32Array([-t, n, 0, -t, -n, 0, t, -n, 0, -t, n, 0, t, -n, 0, t, n, 0])
        }, t.cube = function (t) {
            return t = t || 1, new Float32Array([t, t, t, t, -t, t, -t, -t, t, t, t, t, -t, -t, t, -t, t, t, -t, t, -t, -t, -t, -t, t, t, -t, t, t, -t, -t, -t, -t, t, -t, -t, -t, t, t, -t, -t, -t, -t, t, -t, -t, t, t, -t, -t, t, -t, -t, -t, t, t, t, t, t, -t, t, -t, -t, t, t, t, t, -t, -t, t, -t, t, t, t, t, -t, t, t, -t, t, -t, t, t, -t, t, t, t, -t, t, -t, -t, -t, -t, -t, -t, t, t, -t, t, -t, -t, -t, t, -t, t, t, -t, -t])
        }
    }), define("engine/gl/texture", ["require", "exports", "module", "../utils"], function (e, t, n) {
        var r = e("../utils").extend;
        t.Texture2D = function (t, n, r) {
            this.gl = t, this.texture = t.createTexture(), this.unit = -1, this.bound = !1, this.bindTexture(), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE), t.texImage2D(t.TEXTURE_2D, 0, r.internalformat || r.format || t.RGBA, r.format || t.RGBA, r.type || t.UNSIGNED_BYTE, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, r.mag_filter || t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, r.min_filter || t.LINEAR_MIPMAP_LINEAR), t.texParameterf(t.TEXTURE_2D, t.TEXTURE_WRAP_S, r.wrap_s || t.REPEAT), t.texParameterf(t.TEXTURE_2D, t.TEXTURE_WRAP_T, r.wrap_t || t.REPEAT), r.mipmap !== !1 && t.generateMipmap(t.TEXTURE_2D)
        }, t.Texture2D.prototype = {
            bindTexture: function (e) {
                e !== undefined && (this.gl.activeTexture(this.gl.TEXTURE0 + e), this.unit = e), this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.bound = !0
            },
            unbindTexture: function () {
                this.gl.activeTexture(this.gl.TEXTURE0 + this.unit), this.gl.bindTexture(this.gl.TEXTURE_2D, null), this.unit = -1, this.bound = !1
            },
            uniform: function (e) {
                this.gl.uniform1i(e, this.unit)
            },
            equals: function (e) {
                return this.unit === e
            },
            set: function (e, t) {
                e[t] = this.unit
            }
        }, t.FBO = function (t, n, r, i, s) {
            this.width = n, this.height = r, this.gl = t, this.framebuffer = t.createFramebuffer(), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer), this.texture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.texture), t.texImage2D(t.TEXTURE_2D, 0, s || t.RGBA, n, r, 0, s || t.RGBA, i || t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), this.depth = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.depth), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, n, r), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.depth), this.supported = t.checkFramebufferStatus(t.FRAMEBUFFER) === t.FRAMEBUFFER_COMPLETE, t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), this.unit = -1
        }, t.FBO.prototype = r({}, t.Texture2D.prototype, {
            bind: function () {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer)
            },
            unbind: function () {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
            }
        })
    }), define("engine/gl/mesh", ["require", "exports", "module"], function (e, t, n) {
        var r = function (e, t) {
            this.gl = e, this.ibo = t.ibo, this.vbo = t.vbo || new i(e, t.vertex), this.mode = t.mode || e.TRIANGLES;
            if (this.ibo) switch (this.ibo.byteLength / this.ibo.length) {
                case 1:
                    this.iboType = e.UNSIGNED_BYTE;
                    break;
                case 2:
                    this.iboType = e.UNSIGNED_SHORT;
                    break;
                case 4:
                    this.iboType = e.UNSIGNED_LONG;
                    break;
                default:
                    this.iboType = e.UNSIGNED_SHORT
            } else this.iboType = 0;
            this.setAttributes(t.attributes)
        };
        r.prototype = {
            setAttributes: function (e) {
                var t = Object.keys(e);
                this.attributes = [], this.vertexSize = 0;
                for (var n = 0; n < t.length; n++) {
                    var r = t[n],
                        i = e[r],
                        s = {
                            name: r,
                            size: i.size || 3,
                            type: i.type || this.gl.FLOAT,
                            stride: i.stride || 0,
                            offset: i.offset || 0,
                            normalized: !!i.normalized
                        };
                    this.vertexSize += s.size, this.attributes.push(s)
                }
            },
            bindAttributes: function (e) {
                for (var t = 0; t < this.attributes.length; t++) {
                    var n = this.attributes[t],
                        r = e.getAttribLocation(n.name);
                    this.gl.enableVertexAttribArray(r), this.gl.vertexAttribPointer(r, n.size, n.type, n.normalized, n.stride, n.offset)
                }
            },
            draw: function (e) {
                e.use(), this.vbo.bind(), this.bindAttributes(e), this.ibo ? (this.ibo.bind(), this.gl.drawElements(this.mode, this.ibo.length, this.iboType, 0)) : this.gl.drawArrays(this.mode, 0, this.vbo.length / this.vertexSize), this.vbo.unbind()
            }
        }, t.Mesh = r;
        var i = function (e, t, n, r) {
            this.gl = e, this.target = n || e.ARRAY_BUFFER, this.buffer = e.createBuffer(), this.bind(), e.bufferData(e.ARRAY_BUFFER, t, r || e.STATIC_DRAW), this.unbind(), this.length = t.length, this.btyeLength = t.byteLength
        };
        i.prototype = {
            bind: function () {
                this.gl.bindBuffer(this.target, this.buffer)
            },
            unbind: function () {
                this.gl.bindBuffer(this.target, null)
            },
            free: function (e) {
                this.gl.deleteBuffer(this.buffer), delete this.buffer
            }
        }, t.Buffer = i
    }), WebGLDebugUtils = function () {
        function i(e) {
            if (r == null) {
                r = {};
                for (var t in e) typeof e[t] == "number" && (r[e[t]] = t)
            }
        }

        function s() {
            if (r == null) throw "WebGLDebugUtils.init(ctx) not called"
        }

        function o(e) {
            return s(), r[e] !== undefined
        }

        function u(e) {
            s();
            var t = r[e];
            return t !== undefined ? t : "*UNKNOWN WebGL ENUM (0x" + e.toString(16) + ")"
        }

        function a(e, t, r) {
            var i = n[e];
            return i !== undefined && i[t] ? u(r) : r === null ? "null" : r === undefined ? "undefined" : r.toString()
        }

        function f(e, t) {
            var n = "";
            for (var r = 0; r < t.length; ++r) n += (r == 0 ? "" : ", ") + a(e, r, t[r]);
            return n
        }

        function l(e, t, n) {
            e.__defineGetter__(n, function () {
                return t[n]
            }), e.__defineSetter__(n, function (e) {
                t[n] = e
            })
        }

        function c(e, t) {
            var n = e[t];
            return function () {
                var t = n.apply(e, arguments);
                return t
            }
        }

        function h(e, n, r) {
            function o(e, t) {
                return function () {
                    r && r(t, arguments);
                    var i = e[t].apply(e, arguments),
                        o = e.getError();
                    return o != 0 && (s[o] = !0, n(o, t, arguments)), i
                }
            }
            i(e), n = n || function (e, n, r) {
                var i = "";
                for (var s = 0; s < r.length; ++s) i += (s == 0 ? "" : ", ") + a(n, s, r[s]);
                t("WebGL error " + u(e) + " in " + n + "(" + i + ")")
            };
            var s = {},
                f = {};
            for (var c in e) typeof e[c] == "function" ? f[c] = o(e, c) : l(f, e, c);
            return f.getError = function () {
                for (var t in s)
                    if (s.hasOwnProperty(t) && s[t]) return s[t] = !1, t;
                return e.NO_ERROR
            }, f
        }

        function p(e) {
            var t = e.getParameter(e.MAX_VERTEX_ATTRIBS),
                n = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, n);
            for (var r = 0; r < t; ++r) e.disableVertexAttribArray(r), e.vertexAttribPointer(r, 4, e.FLOAT, !1, 0, 0), e.vertexAttrib1f(r, 0);
            e.deleteBuffer(n);
            var i = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
            for (var r = 0; r < i; ++r) e.activeTexture(e.TEXTURE0 + r), e.bindTexture(e.TEXTURE_CUBE_MAP, null), e.bindTexture(e.TEXTURE_2D, null);
            e.activeTexture(e.TEXTURE0), e.useProgram(null), e.bindBuffer(e.ARRAY_BUFFER, null), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindRenderbuffer(e.RENDERBUFFER, null), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.DITHER), e.disable(e.SCISSOR_TEST), e.blendColor(0, 0, 0, 0), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(-1), e.colorMask(!0, !0, !0, !0), e.cullFace(e.BACK), e.depthFunc(e.LESS), e.depthMask(!0), e.depthRange(0, 1), e.frontFace(e.CCW), e.hint(e.GENERATE_MIPMAP_HINT, e.DONT_CARE), e.lineWidth(1), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.UNPACK_COLORSPACE_CONVERSION_WEBGL && e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.polygonOffset(0, 0), e.sampleCoverage(1, !1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilMask(4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT);
            while (e.getError());
        }

        function d(e) {
            function m(e) {
                return typeof e == "function" ? e : function (t) {
                    e.handleEvent(t)
                }
            }

            function b(e) {
                var t = e.addEventListener;
                e.addEventListener = function (n, r, i) {
                    switch (n) {
                        case "webglcontextlost":
                            g(r);
                            break;
                        case "webglcontextrestored":
                            y(r);
                            break;
                        default:
                            t.apply(e, arguments)
                    }
                }
            }

            function w(e) {
                return e instanceof WebGLBuffer || e instanceof WebGLFramebuffer || e instanceof WebGLProgram || e instanceof WebGLRenderbuffer || e instanceof WebGLShader || e instanceof WebGLTexture
            }

            function E(e) {
                for (var t = 0; t < e.length; ++t) {
                    var n = e[t];
                    if (w(n)) return n.__webglDebugContextLostId__ == s
                }
                return !0
            }

            function S() {
                var e = Object.keys(v);
                for (var t = 0; t < e.length; ++t) delete v[e]
            }

            function x() {
                ++c, o || f == c && e.loseContext()
            }

            function T(e, t) {
                var n = e[t];
                return function () {
                    x();
                    if (!o) {
                        var t = n.apply(e, arguments);
                        return t
                    }
                }
            }

            function N() {
                for (var e = 0; e < a.length; ++e) {
                    var n = a[e];
                    n instanceof WebGLBuffer ? t.deleteBuffer(n) : n instanceof WebGLFramebuffer ? t.deleteFramebuffer(n) : n instanceof WebGLProgram ? t.deleteProgram(n) : n instanceof WebGLRenderbuffer ? t.deleteRenderbuffer(n) : n instanceof WebGLShader ? t.deleteShader(n) : n instanceof WebGLTexture && t.deleteTexture(n)
                }
            }

            function C(e) {
                return {
                    statusMessage: e,
                    preventDefault: function () {
                        h = !0
                    }
                }
            }

            function k(e) {
                for (var r in e) typeof e[r] == "function" ? n[r] = T(e, r) : l(n, e, r);
                n.getError = function () {
                    x();
                    if (!o) {
                        var e;
                        while (e = t.getError()) v[e] = !0
                    }
                    for (var e in v)
                        if (v[e]) return delete v[e], e;
                    return n.NO_ERROR
                };
                var i = ["createBuffer", "createFramebuffer", "createProgram", "createRenderbuffer", "createShader", "createTexture"];
                for (var u = 0; u < i.length; ++u) {
                    var f = i[u];
                    n[f] = function (t) {
                        return function () {
                            x();
                            if (o) return null;
                            var n = t.apply(e, arguments);
                            return n.__webglDebugContextLostId__ = s, a.push(n), n
                        }
                    }(e[f])
                }
                var c = ["getActiveAttrib", "getActiveUniform", "getBufferParameter", "getContextAttributes", "getAttachedShaders", "getFramebufferAttachmentParameter", "getParameter", "getProgramParameter", "getProgramInfoLog", "getRenderbufferParameter", "getShaderParameter", "getShaderInfoLog", "getShaderSource", "getTexParameter", "getUniform", "getUniformLocation", "getVertexAttrib"];
                for (var u = 0; u < c.length; ++u) {
                    var f = c[u];
                    n[f] = function (t) {
                        return function () {
                            return x(), o ? null : t.apply(e, arguments)
                        }
                    }(n[f])
                }
                var h = ["isBuffer", "isEnabled", "isFramebuffer", "isProgram", "isRenderbuffer", "isShader", "isTexture"];
                for (var u = 0; u < h.length; ++u) {
                    var f = h[u];
                    n[f] = function (t) {
                        return function () {
                            return x(), o ? !1 : t.apply(e, arguments)
                        }
                    }(n[f])
                }
                return n.checkFramebufferStatus = function (t) {
                    return function () {
                        return x(), o ? n.FRAMEBUFFER_UNSUPPORTED : t.apply(e, arguments)
                    }
                }(n.checkFramebufferStatus), n.getAttribLocation = function (t) {
                    return function () {
                        return x(), o ? -1 : t.apply(e, arguments)
                    }
                }(n.getAttribLocation), n.getVertexAttribOffset = function (t) {
                    return function () {
                        return x(), o ? 0 : t.apply(e, arguments)
                    }
                }(n.getVertexAttribOffset), n.isContextLost = function () {
                    return o
                }, n
            }
            var t, n, r = [],
                i = [],
                n = {},
                s = 1,
                o = !1,
                u = 0,
                a = [],
                f = 0,
                c = 0,
                h = !1,
                d = 0,
                v = {};
            e.getContext = function (r) {
                return function () {
                    var i = r.apply(e, arguments);
                    if (i instanceof WebGLRenderingContext) {
                        if (i != t) {
                            if (t) throw "got different context";
                            t = i, n = k(t)
                        }
                        return n
                    }
                    return i
                }
            }(e.getContext);
            var g = function (e) {
                    r.push(m(e))
                },
                y = function (e) {
                    i.push(m(e))
                };
            return b(e), e.loseContext = function () {
                if (!o) {
                    o = !0, f = 0, ++s;
                    while (t.getError());
                    S(), v[t.CONTEXT_LOST_WEBGL] = !0;
                    var n = C("context lost"),
                        i = r.slice();
                    setTimeout(function () {
                        for (var t = 0; t < i.length; ++t) i[t](n);
                        d >= 0 && setTimeout(function () {
                            e.restoreContext()
                        }, d)
                    }, 0)
                }
            }, e.restoreContext = function () {
                o && i.length && setTimeout(function () {
                    if (!h) throw "can not restore. webglcontestlost listener did not call event.preventDefault";
                    N(), p(t), o = !1, c = 0, h = !1;
                    var e = i.slice(),
                        n = C("context restored");
                    for (var r = 0; r < e.length; ++r) e[r](n)
                }, 0)
            }, e.loseContextInNCalls = function (e) {
                if (o) throw "You can not ask a lost contet to be lost";
                f = c + e
            }, e.getNumCalls = function () {
                return c
            }, e.setRestoreTimeout = function (e) {
                d = e
            }, e
        }
        var e = function (e) {
                window.console && window.console.log && window.console.log(e)
            },
            t = function (t) {
                window.console && window.console.error ? window.console.error(t) : e(t)
            },
            n = {
                enable: {
                    0: !0
                },
                disable: {
                    0: !0
                },
                getParameter: {
                    0: !0
                },
                drawArrays: {
                    0: !0
                },
                drawElements: {
                    0: !0,
                    2: !0
                },
                createShader: {
                    0: !0
                },
                getShaderParameter: {
                    1: !0
                },
                getProgramParameter: {
                    1: !0
                },
                getVertexAttrib: {
                    1: !0
                },
                vertexAttribPointer: {
                    2: !0
                },
                bindTexture: {
                    0: !0
                },
                activeTexture: {
                    0: !0
                },
                getTexParameter: {
                    0: !0,
                    1: !0
                },
                texParameterf: {
                    0: !0,
                    1: !0
                },
                texParameteri: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                texImage2D: {
                    0: !0,
                    2: !0,
                    6: !0,
                    7: !0
                },
                texSubImage2D: {
                    0: !0,
                    6: !0,
                    7: !0
                },
                copyTexImage2D: {
                    0: !0,
                    2: !0
                },
                copyTexSubImage2D: {
                    0: !0
                },
                generateMipmap: {
                    0: !0
                },
                bindBuffer: {
                    0: !0
                },
                bufferData: {
                    0: !0,
                    2: !0
                },
                bufferSubData: {
                    0: !0
                },
                getBufferParameter: {
                    0: !0,
                    1: !0
                },
                pixelStorei: {
                    0: !0,
                    1: !0
                },
                readPixels: {
                    4: !0,
                    5: !0
                },
                bindRenderbuffer: {
                    0: !0
                },
                bindFramebuffer: {
                    0: !0
                },
                checkFramebufferStatus: {
                    0: !0
                },
                framebufferRenderbuffer: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                framebufferTexture2D: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                getFramebufferAttachmentParameter: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                getRenderbufferParameter: {
                    0: !0,
                    1: !0
                },
                renderbufferStorage: {
                    0: !0,
                    1: !0
                },
                clear: {
                    0: !0
                },
                depthFunc: {
                    0: !0
                },
                blendFunc: {
                    0: !0,
                    1: !0
                },
                blendFuncSeparate: {
                    0: !0,
                    1: !0,
                    2: !0,
                    3: !0
                },
                blendEquation: {
                    0: !0
                },
                blendEquationSeparate: {
                    0: !0,
                    1: !0
                },
                stencilFunc: {
                    0: !0
                },
                stencilFuncSeparate: {
                    0: !0,
                    1: !0
                },
                stencilMaskSeparate: {
                    0: !0
                },
                stencilOp: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                stencilOpSeparate: {
                    0: !0,
                    1: !0,
                    2: !0,
                    3: !0
                },
                cullFace: {
                    0: !0
                },
                frontFace: {
                    0: !0
                }
            },
            r = null;
        return {
            init: i,
            mightBeEnum: o,
            glEnumToString: u,
            glFunctionArgToString: a,
            glFunctionArgsToString: f,
            makeDebugContext: h,
            makeLostContextSimulatingCanvas: d,
            resetToInitialState: p
        }
    }(), define("engine/gl/_webgl-debug", function () {}), define("engine/gl/context", ["require", "exports", "module", "./mesh", "./texture", "../utils", "./shader", "./_webgl-debug"], function (e, t, n) {
        function u(e, t, n) {
            window.console && window.console.error && console.error(n, t)
        }
        var r = e("./mesh"),
            i = e("./texture"),
            s = e("../utils").extend,
            o = e("./shader");
        e("./_webgl-debug"), t.Context = function (e, t) {
            this.gl = e, this.resources = t, this.shaderManager = new o.Manager(t)
        }, t.Context.prototype = {
            getBuffer: function (e, t, n) {
                var i = this.resources[e];
                new r.Buffer(this.gl, i, t, n)
            },
            getFBO: function () {},
            getTexture: function (e, t) {
                var n = this.resources[e];
                return new i.Texture2D(this.gl, n, t)
            },
            getShader: function (e) {}
        }, t.initialize = function (e, t, n) {
            var r = "Try upgrading to the latest version of firefox or chrome.";
            n = n || u;
            if (!e.getContext) {
                n(e, "canvas is not supported by your browser. " + r, "no-canvas");
                return
            }
            var i = s({
                    alpha: !1,
                    depth: !0,
                    stencil: !1,
                    antialias: !0,
                    premultipliedAlpha: !1,
                    preserveDrawingBuffer: !1
                }, t.context),
                o = t.extensions || {},
                a = e.getContext("webgl", i);
            if (a == null) {
                a = e.getContext("experimental-webgl", i);
                if (a == null) {
                    n(e, "webgl is not supported by your browser. " + r, "no-webgl");
                    return
                }
            }
            if (t.vertex_texture_units && a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < t.vertex_texture_units) {
                n(e, "This application needs at least two vertex texture units which are not supported by your browser. " + r, "no-vertext-texture-units");
                return
            }
            if (o.texture_float && a.getExtension("OES_texture_float") == null) {
                n(e, "This application needs float textures which is not supported by your browser. " + r, "no-OES_texture_float");
                return
            }
            return o.standard_derivatives && a.getExtension("OES_standard_derivatives") == null && n(e, "This application need the standard deriviates extensions for WebGL which is not supported by your Browser." + r, "no-OES_standard_derivatives"), window.WebGLDebugUtils && t.debug && (t.log_all ? a = WebGLDebugUtils.makeDebugContext(a, undefined, function () {
                console.log.apply(console, arguments)
            }) : a = WebGLDebugUtils.makeDebugContext(a), console.log("running in debug context")), i.depth ? a.enable(a.DEPTH_TEST) : a.disable(a.DEPTH_TEST), a.enable(a.CULL_FACE), a.lost = !1, e.addEventListener("webglcontextlost", function () {
                n(e, "Lost webgl context!", "context-lost"), a.lost = !0
            }, !1), a
        }
    }),
    function (e, t) {
        typeof exports == "object" ? module.exports = t(global) : typeof define == "function" && define.amd ? define("gl-matrix", [], function () {
            return t(e)
        }) : t(e)
    }(this, function (e) {
        function i(e) {
            return r = e, r
        }

        function s() {
            return r = typeof Float32Array != "undefined" ? Float32Array : Array, r
        }
        var t = 1e-6,
            n = {};
        (function () {
            if (typeof Float32Array != "undefined") {
                var e = new Float32Array(1),
                    t = new Int32Array(e.buffer);
                n.invsqrt = function (n) {
                    var r = n * .5;
                    e[0] = n;
                    var i = 1.5;
                    t[0] = 1597463007 - (t[0] >> 1);
                    var s = e[0];
                    return s * (i - r * s * s)
                }
            } else n.invsqrt = function (e) {
                return 1 / Math.sqrt(e)
            }
        })();
        var r = null;
        s();
        var o = {};
        o.create = function (e) {
            var t = new r(3);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2]) : t[0] = t[1] = t[2] = 0, t
        }, o.createFrom = function (e, t, n) {
            var i = new r(3);
            return i[0] = e, i[1] = t, i[2] = n, i
        }, o.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
        }, o.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t
        }, o.add = function (e, t, n) {
            return !n || e === n ? (e[0] += t[0], e[1] += t[1], e[2] += t[2], e) : (n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n)
        }, o.subtract = function (e, t, n) {
            return !n || e === n ? (e[0] -= t[0], e[1] -= t[1], e[2] -= t[2], e) : (n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n)
        }, o.multiply = function (e, t, n) {
            return !n || e === n ? (e[0] *= t[0], e[1] *= t[1], e[2] *= t[2], e) : (n[0] = e[0] * t[0], n[1] = e[1] * t[1], n[2] = e[2] * t[2], n)
        }, o.negate = function (e, t) {
            return t || (t = e), t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t
        }, o.scale = function (e, t, n) {
            return !n || e === n ? (e[0] *= t, e[1] *= t, e[2] *= t, e) : (n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n)
        }, o.normalize = function (e, t) {
            t || (t = e);
            var n = e[0],
                r = e[1],
                i = e[2],
                s = Math.sqrt(n * n + r * r + i * i);
            return s ? s === 1 ? (t[0] = n, t[1] = r, t[2] = i, t) : (s = 1 / s, t[0] = n * s, t[1] = r * s, t[2] = i * s, t) : (t[0] = 0, t[1] = 0, t[2] = 0, t)
        }, o.cross = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = t[0],
                u = t[1],
                a = t[2];
            return n[0] = i * a - s * u, n[1] = s * o - r * a, n[2] = r * u - i * o, n
        }, o.length = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            return Math.sqrt(t * t + n * n + r * r)
        }, o.squaredLength = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            return t * t + n * n + r * r
        }, o.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }, o.direction = function (e, t, n) {
            n || (n = e);
            var r = e[0] - t[0],
                i = e[1] - t[1],
                s = e[2] - t[2],
                o = Math.sqrt(r * r + i * i + s * s);
            return o ? (o = 1 / o, n[0] = r * o, n[1] = i * o, n[2] = s * o, n) : (n[0] = 0, n[1] = 0, n[2] = 0, n)
        }, o.lerp = function (e, t, n, r) {
            return r || (r = e), r[0] = e[0] + n * (t[0] - e[0]), r[1] = e[1] + n * (t[1] - e[1]), r[2] = e[2] + n * (t[2] - e[2]), r
        }, o.dist = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1],
                i = t[2] - e[2];
            return Math.sqrt(n * n + r * r + i * i)
        };
        var u = null,
            a = new r(4);
        o.unproject = function (e, t, n, r, i) {
            i || (i = e), u || (u = d.create());
            var s = u,
                o = a;
            return o[0] = (e[0] - r[0]) * 2 / r[2] - 1, o[1] = (e[1] - r[1]) * 2 / r[3] - 1, o[2] = 2 * e[2] - 1, o[3] = 1, d.multiply(n, t, s), d.inverse(s) ? (d.multiplyVec4(s, o), o[3] === 0 ? null : (i[0] = o[0] / o[3], i[1] = o[1] / o[3], i[2] = o[2] / o[3], i)) : null
        };
        var f = o.createFrom(1, 0, 0),
            l = o.createFrom(0, 1, 0),
            c = o.createFrom(0, 0, 1),
            h = o.create();
        o.rotationTo = function (e, t, n) {
            n || (n = v.create());
            var r = o.dot(e, t),
                i = h;
            if (r >= 1) v.set(m, n);
            else if (r < 1e-6 - 1) o.cross(f, e, i), o.length(i) < 1e-6 && o.cross(l, e, i), o.length(i) < 1e-6 && o.cross(c, e, i), o.normalize(i), v.fromAngleAxis(Math.PI, i, n);
            else {
                var s = Math.sqrt((1 + r) * 2),
                    u = 1 / s;
                o.cross(e, t, i), n[0] = i[0] * u, n[1] = i[1] * u, n[2] = i[2] * u, n[3] = s * .5, v.normalize(n)
            }
            return n[3] > 1 ? n[3] = 1 : n[3] < -1 && (n[3] = -1), n
        }, o.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + "]"
        };
        var p = {};
        p.create = function (e) {
            var t = new r(9);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8]) : t[0] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = 0, t
        }, p.createFrom = function (e, t, n, i, s, o, u, a, f) {
            var l = new r(9);
            return l[0] = e, l[1] = t, l[2] = n, l[3] = i, l[4] = s, l[5] = o, l[6] = u, l[7] = a, l[8] = f, l
        }, p.determinant = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3],
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[7],
                f = e[8];
            return t * (f * s - o * a) + n * (-f * i + o * u) + r * (a * i - s * u)
        }, p.inverse = function (e, t) {
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[3],
                o = e[4],
                u = e[5],
                a = e[6],
                f = e[7],
                l = e[8],
                c = l * o - u * f,
                h = -l * s + u * a,
                d = f * s - o * a,
                v = n * c + r * h + i * d,
                m;
            return v ? (m = 1 / v, t || (t = p.create()), t[0] = c * m, t[1] = (-l * r + i * f) * m, t[2] = (u * r - i * o) * m, t[3] = h * m, t[4] = (l * n - i * a) * m, t[5] = (-u * n + i * s) * m, t[6] = d * m, t[7] = (-f * n + r * a) * m, t[8] = (o * n - r * s) * m, t) : null
        }, p.multiply = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = e[4],
                a = e[5],
                f = e[6],
                l = e[7],
                c = e[8],
                h = t[0],
                p = t[1],
                d = t[2],
                v = t[3],
                m = t[4],
                g = t[5],
                y = t[6],
                b = t[7],
                w = t[8];
            return n[0] = h * r + p * o + d * f, n[1] = h * i + p * u + d * l, n[2] = h * s + p * a + d * c, n[3] = v * r + m * o + g * f, n[4] = v * i + m * u + g * l, n[5] = v * s + m * a + g * c, n[6] = y * r + b * o + w * f, n[7] = y * i + b * u + w * l, n[8] = y * s + b * a + w * c, n
        }, p.multiplyVec2 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1];
            return n[0] = r * e[0] + i * e[3] + e[6], n[1] = r * e[1] + i * e[4] + e[7], n
        }, p.multiplyVec3 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1],
                s = t[2];
            return n[0] = r * e[0] + i * e[3] + s * e[6], n[1] = r * e[1] + i * e[4] + s * e[7], n[2] = r * e[2] + i * e[5] + s * e[8], n
        }, p.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
        }, p.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t && Math.abs(e[4] - n[4]) < t && Math.abs(e[5] - n[5]) < t && Math.abs(e[6] - n[6]) < t && Math.abs(e[7] - n[7]) < t && Math.abs(e[8] - n[8]) < t
        }, p.identity = function (e) {
            return e || (e = p.create()), e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
        }, p.transpose = function (e, t) {
            if (!t || e === t) {
                var n = e[1],
                    r = e[2],
                    i = e[5];
                return e[1] = e[3], e[2] = e[6], e[3] = n, e[5] = e[7], e[6] = r, e[7] = i, e
            }
            return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t
        }, p.toMat4 = function (e, t) {
            return t || (t = d.create()), t[15] = 1, t[14] = 0, t[13] = 0, t[12] = 0, t[11] = 0, t[10] = e[8], t[9] = e[7], t[8] = e[6], t[7] = 0, t[6] = e[5], t[5] = e[4], t[4] = e[3], t[3] = 0, t[2] = e[2], t[1] = e[1], t[0] = e[0], t
        }, p.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + "]"
        };
        var d = {};
        d.create = function (e) {
            var t = new r(16);
            return e && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t
        }, d.createFrom = function (e, t, n, i, s, o, u, a, f, l, c, h, p, d, v, m) {
            var g = new r(16);
            return g[0] = e, g[1] = t, g[2] = n, g[3] = i, g[4] = s, g[5] = o, g[6] = u, g[7] = a, g[8] = f, g[9] = l, g[10] = c, g[11] = h, g[12] = p, g[13] = d, g[14] = v, g[15] = m, g
        }, d.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, d.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t && Math.abs(e[4] - n[4]) < t && Math.abs(e[5] - n[5]) < t && Math.abs(e[6] - n[6]) < t && Math.abs(e[7] - n[7]) < t && Math.abs(e[8] - n[8]) < t && Math.abs(e[9] - n[9]) < t && Math.abs(e[10] - n[10]) < t && Math.abs(e[11] - n[11]) < t && Math.abs(e[12] - n[12]) < t && Math.abs(e[13] - n[13]) < t && Math.abs(e[14] - n[14]) < t && Math.abs(e[15] - n[15]) < t
        }, d.identity = function (e) {
            return e || (e = d.create()), e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }, d.transpose = function (e, t) {
            if (!t || e === t) {
                var n = e[1],
                    r = e[2],
                    i = e[3],
                    s = e[6],
                    o = e[7],
                    u = e[11];
                return e[1] = e[4], e[2] = e[8], e[3] = e[12], e[4] = n, e[6] = e[9], e[7] = e[13], e[8] = r, e[9] = s, e[11] = e[14], e[12] = i, e[13] = o, e[14] = u, e
            }
            return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t
        }, d.determinant = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3],
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[7],
                f = e[8],
                l = e[9],
                c = e[10],
                h = e[11],
                p = e[12],
                d = e[13],
                v = e[14],
                m = e[15];
            return p * l * u * i - f * d * u * i - p * o * c * i + s * d * c * i + f * o * v * i - s * l * v * i - p * l * r * a + f * d * r * a + p * n * c * a - t * d * c * a - f * n * v * a + t * l * v * a + p * o * r * h - s * d * r * h - p * n * u * h + t * d * u * h + s * n * v * h - t * o * v * h - f * o * r * m + s * l * r * m + f * n * u * m - t * l * u * m - s * n * c * m + t * o * c * m
        }, d.inverse = function (e, t) {
            t || (t = e);
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[3],
                o = e[4],
                u = e[5],
                a = e[6],
                f = e[7],
                l = e[8],
                c = e[9],
                h = e[10],
                p = e[11],
                d = e[12],
                v = e[13],
                m = e[14],
                g = e[15],
                y = n * u - r * o,
                b = n * a - i * o,
                w = n * f - s * o,
                E = r * a - i * u,
                S = r * f - s * u,
                x = i * f - s * a,
                T = l * v - c * d,
                N = l * m - h * d,
                C = l * g - p * d,
                k = c * m - h * v,
                L = c * g - p * v,
                A = h * g - p * m,
                O = y * A - b * L + w * k + E * C - S * N + x * T,
                M;
            return O ? (M = 1 / O, t[0] = (u * A - a * L + f * k) * M, t[1] = (-r * A + i * L - s * k) * M, t[2] = (v * x - m * S + g * E) * M, t[3] = (-c * x + h * S - p * E) * M, t[4] = (-o * A + a * C - f * N) * M, t[5] = (n * A - i * C + s * N) * M, t[6] = (-d * x + m * w - g * b) * M, t[7] = (l * x - h * w + p * b) * M, t[8] = (o * L - u * C + f * T) * M, t[9] = (-n * L + r * C - s * T) * M, t[10] = (d * S - v * w + g * y) * M, t[11] = (-l * S + c * w - p * y) * M, t[12] = (-o * k + u * N - a * T) * M, t[13] = (n * k - r * N + i * T) * M, t[14] = (-d * E + v * b - m * y) * M, t[15] = (l * E - c * b + h * y) * M, t) : null
        }, d.toRotationMat = function (e, t) {
            return t || (t = d.create()), t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, d.toMat3 = function (e, t) {
            return t || (t = p.create()), t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t
        }, d.toInverseMat3 = function (e, t) {
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[8],
                f = e[9],
                l = e[10],
                c = l * o - u * f,
                h = -l * s + u * a,
                d = f * s - o * a,
                v = n * c + r * h + i * d,
                m;
            return v ? (m = 1 / v, t || (t = p.create()), t[0] = c * m, t[1] = (-l * r + i * f) * m, t[2] = (u * r - i * o) * m, t[3] = h * m, t[4] = (l * n - i * a) * m, t[5] = (-u * n + i * s) * m, t[6] = d * m, t[7] = (-f * n + r * a) * m, t[8] = (o * n - r * s) * m, t) : null
        }, d.multiply = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = e[4],
                a = e[5],
                f = e[6],
                l = e[7],
                c = e[8],
                h = e[9],
                p = e[10],
                d = e[11],
                v = e[12],
                m = e[13],
                g = e[14],
                y = e[15],
                b = t[0],
                w = t[1],
                E = t[2],
                S = t[3];
            return n[0] = b * r + w * u + E * c + S * v, n[1] = b * i + w * a + E * h + S * m, n[2] = b * s + w * f + E * p + S * g, n[3] = b * o + w * l + E * d + S * y, b = t[4], w = t[5], E = t[6], S = t[7], n[4] = b * r + w * u + E * c + S * v, n[5] = b * i + w * a + E * h + S * m, n[6] = b * s + w * f + E * p + S * g, n[7] = b * o + w * l + E * d + S * y, b = t[8], w = t[9], E = t[10], S = t[11], n[8] = b * r + w * u + E * c + S * v, n[9] = b * i + w * a + E * h + S * m, n[10] = b * s + w * f + E * p + S * g, n[11] = b * o + w * l + E * d + S * y, b = t[12], w = t[13], E = t[14], S = t[15], n[12] = b * r + w * u + E * c + S * v, n[13] = b * i + w * a + E * h + S * m, n[14] = b * s + w * f + E * p + S * g, n[15] = b * o + w * l + E * d + S * y, n
        }, d.multiplyVec3 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1],
                s = t[2];
            return n[0] = e[0] * r + e[4] * i + e[8] * s + e[12], n[1] = e[1] * r + e[5] * i + e[9] * s + e[13], n[2] = e[2] * r + e[6] * i + e[10] * s + e[14], n
        }, d.multiplyVec4 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1],
                s = t[2],
                o = t[3];
            return n[0] = e[0] * r + e[4] * i + e[8] * s + e[12] * o, n[1] = e[1] * r + e[5] * i + e[9] * s + e[13] * o, n[2] = e[2] * r + e[6] * i + e[10] * s + e[14] * o, n[3] = e[3] * r + e[7] * i + e[11] * s + e[15] * o, n
        }, d.translate = function (e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2],
                o, u, a, f, l, c, h, p, d, v, m, g;
            return !n || e === n ? (e[12] = e[0] * r + e[4] * i + e[8] * s + e[12], e[13] = e[1] * r + e[5] * i + e[9] * s + e[13], e[14] = e[2] * r + e[6] * i + e[10] * s + e[14], e[15] = e[3] * r + e[7] * i + e[11] * s + e[15], e) : (o = e[0], u = e[1], a = e[2], f = e[3], l = e[4], c = e[5], h = e[6], p = e[7], d = e[8], v = e[9], m = e[10], g = e[11], n[0] = o, n[1] = u, n[2] = a, n[3] = f, n[4] = l, n[5] = c, n[6] = h, n[7] = p, n[8] = d, n[9] = v, n[10] = m, n[11] = g, n[12] = o * r + l * i + d * s + e[12], n[13] = u * r + c * i + v * s + e[13], n[14] = a * r + h * i + m * s + e[14], n[15] = f * r + p * i + g * s + e[15], n)
        }, d.scale = function (e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2];
            return !n || e === n ? (e[0] *= r, e[1] *= r, e[2] *= r, e[3] *= r, e[4] *= i, e[5] *= i, e[6] *= i, e[7] *= i, e[8] *= s, e[9] *= s, e[10] *= s, e[11] *= s, e) : (n[0] = e[0] * r, n[1] = e[1] * r, n[2] = e[2] * r, n[3] = e[3] * r, n[4] = e[4] * i, n[5] = e[5] * i, n[6] = e[6] * i, n[7] = e[7] * i, n[8] = e[8] * s, n[9] = e[9] * s, n[10] = e[10] * s, n[11] = e[11] * s, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15], n)
        }, d.rotate = function (e, t, n, r) {
            var i = n[0],
                s = n[1],
                o = n[2],
                u = Math.sqrt(i * i + s * s + o * o),
                a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M;
            return u ? (u !== 1 && (u = 1 / u, i *= u, s *= u, o *= u), a = Math.sin(t), f = Math.cos(t), l = 1 - f, c = e[0], h = e[1], p = e[2], d = e[3], v = e[4], m = e[5], g = e[6], y = e[7], b = e[8], w = e[9], E = e[10], S = e[11], x = i * i * l + f, T = s * i * l + o * a, N = o * i * l - s * a, C = i * s * l - o * a, k = s * s * l + f, L = o * s * l + i * a, A = i * o * l + s * a, O = s * o * l - i * a, M = o * o * l + f, r ? e !== r && (r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15]) : r = e, r[0] = c * x + v * T + b * N, r[1] = h * x + m * T + w * N, r[2] = p * x + g * T + E * N, r[3] = d * x + y * T + S * N, r[4] = c * C + v * k + b * L, r[5] = h * C + m * k + w * L, r[6] = p * C + g * k + E * L, r[7] = d * C + y * k + S * L, r[8] = c * A + v * O + b * M, r[9] = h * A + m * O + w * M, r[10] = p * A + g * O + E * M, r[11] = d * A + y * O + S * M, r) : null
        }, d.rotateX = function (e, t, n) {
            var r = Math.sin(t),
                i = Math.cos(t),
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[7],
                f = e[8],
                l = e[9],
                c = e[10],
                h = e[11];
            return n ? e !== n && (n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e, n[4] = s * i + f * r, n[5] = o * i + l * r, n[6] = u * i + c * r, n[7] = a * i + h * r, n[8] = s * -r + f * i, n[9] = o * -r + l * i, n[10] = u * -r + c * i, n[11] = a * -r + h * i, n
        }, d.rotateY = function (e, t, n) {
            var r = Math.sin(t),
                i = Math.cos(t),
                s = e[0],
                o = e[1],
                u = e[2],
                a = e[3],
                f = e[8],
                l = e[9],
                c = e[10],
                h = e[11];
            return n ? e !== n && (n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e, n[0] = s * i + f * -r, n[1] = o * i + l * -r, n[2] = u * i + c * -r, n[3] = a * i + h * -r, n[8] = s * r + f * i, n[9] = o * r + l * i, n[10] = u * r + c * i, n[11] = a * r + h * i, n
        }, d.rotateZ = function (e, t, n) {
            var r = Math.sin(t),
                i = Math.cos(t),
                s = e[0],
                o = e[1],
                u = e[2],
                a = e[3],
                f = e[4],
                l = e[5],
                c = e[6],
                h = e[7];
            return n ? e !== n && (n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e, n[0] = s * i + f * r, n[1] = o * i + l * r, n[2] = u * i + c * r, n[3] = a * i + h * r, n[4] = s * -r + f * i, n[5] = o * -r + l * i, n[6] = u * -r + c * i, n[7] = a * -r + h * i, n
        }, d.frustum = function (e, t, n, r, i, s, o) {
            o || (o = d.create());
            var u = t - e,
                a = r - n,
                f = s - i;
            return o[0] = i * 2 / u, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = i * 2 / a, o[6] = 0, o[7] = 0, o[8] = (t + e) / u, o[9] = (r + n) / a, o[10] = -(s + i) / f, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = -(s * i * 2) / f, o[15] = 0, o
        }, d.perspective = function (e, t, n, r, i) {
            var s = n * Math.tan(e * Math.PI / 360),
                o = s * t;
            return d.frustum(-o, o, -s, s, n, r, i)
        }, d.ortho = function (e, t, n, r, i, s, o) {
            o || (o = d.create());
            var u = t - e,
                a = r - n,
                f = s - i;
            return o[0] = 2 / u, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = 2 / a, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = -2 / f, o[11] = 0, o[12] = -(e + t) / u, o[13] = -(r + n) / a, o[14] = -(s + i) / f, o[15] = 1, o
        }, d.lookAt = function (e, t, n, r) {
            r || (r = d.create());
            var i, s, o, u, a, f, l, c, h, p, v = e[0],
                m = e[1],
                g = e[2],
                y = n[0],
                b = n[1],
                w = n[2],
                E = t[0],
                S = t[1],
                x = t[2];
            return v === E && m === S && g === x ? d.identity(r) : (l = v - E, c = m - S, h = g - x, p = 1 / Math.sqrt(l * l + c * c + h * h), l *= p, c *= p, h *= p, i = b * h - w * c, s = w * l - y * h, o = y * c - b * l, p = Math.sqrt(i * i + s * s + o * o), p ? (p = 1 / p, i *= p, s *= p, o *= p) : (i = 0, s = 0, o = 0), u = c * o - h * s, a = h * i - l * o, f = l * s - c * i, p = Math.sqrt(u * u + a * a + f * f), p ? (p = 1 / p, u *= p, a *= p, f *= p) : (u = 0, a = 0, f = 0), r[0] = i, r[1] = u, r[2] = l, r[3] = 0, r[4] = s, r[5] = a, r[6] = c, r[7] = 0, r[8] = o, r[9] = f, r[10] = h, r[11] = 0, r[12] = -(i * v + s * m + o * g), r[13] = -(u * v + a * m + f * g), r[14] = -(l * v + c * m + h * g), r[15] = 1, r)
        }, d.fromRotationTranslation = function (e, t, n) {
            n || (n = d.create());
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = r + r,
                a = i + i,
                f = s + s,
                l = r * u,
                c = r * a,
                h = r * f,
                p = i * a,
                v = i * f,
                m = s * f,
                g = o * u,
                y = o * a,
                b = o * f;
            return n[0] = 1 - (p + m), n[1] = c + b, n[2] = h - y, n[3] = 0, n[4] = c - b, n[5] = 1 - (l + m), n[6] = v + g, n[7] = 0, n[8] = h + y, n[9] = v - g, n[10] = 1 - (l + p), n[11] = 0, n[12] = t[0], n[13] = t[1], n[14] = t[2], n[15] = 1, n
        }, d.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + "]"
        };
        var v = {};
        v.create = function (e) {
            var t = new r(4);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]) : t[0] = t[1] = t[2] = t[3] = 0, t
        }, v.createFrom = function (e, t, n, i) {
            var s = new r(4);
            return s[0] = e, s[1] = t, s[2] = n, s[3] = i, s
        }, v.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, v.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t
        }, v.identity = function (e) {
            return e || (e = v.create()), e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
        };
        var m = v.identity();
        v.calculateW = function (e, t) {
                var n = e[0],
                    r = e[1],
                    i = e[2];
                return !t || e === t ? (e[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i)), e) : (t[0] = n, t[1] = r, t[2] = i, t[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i)), t)
            }, v.dot = function (e, t) {
                return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
            }, v.inverse = function (e, t) {
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = n * n + r * r + i * i + s * s,
                    u = o ? 1 / o : 0;
                return !t || e === t ? (e[0] *= -u, e[1] *= -u, e[2] *= -u, e[3] *= u, e) : (t[0] = -e[0] * u, t[1] = -e[1] * u, t[2] = -e[2] * u, t[3] = e[3] * u, t)
            }, v.conjugate = function (e, t) {
                return !t || e === t ? (e[0] *= -1, e[1] *= -1, e[2] *= -1, e) : (t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = e[3], t)
            }, v.length = function (e) {
                var t = e[0],
                    n = e[1],
                    r = e[2],
                    i = e[3];
                return Math.sqrt(t * t + n * n + r * r + i * i)
            }, v.normalize = function (e, t) {
                t || (t = e);
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = Math.sqrt(n * n + r * r + i * i + s * s);
                return o === 0 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t) : (o = 1 / o, t[0] = n * o, t[1] = r * o, t[2] = i * o, t[3] = s * o, t)
            }, v.add = function (e, t, n) {
                return !n || e === n ? (e[0] += t[0], e[1] += t[1], e[2] += t[2], e[3] += t[3], e) : (n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n)
            }, v.multiply = function (e, t, n) {
                n || (n = e);
                var r = e[0],
                    i = e[1],
                    s = e[2],
                    o = e[3],
                    u = t[0],
                    a = t[1],
                    f = t[2],
                    l = t[3];
                return n[0] = r * l + o * u + i * f - s * a, n[1] = i * l + o * a + s * u - r * f, n[2] = s * l + o * f + r * a - i * u, n[3] = o * l - r * u - i * a - s * f, n
            }, v.multiplyVec3 = function (e, t, n) {
                n || (n = t);
                var r = t[0],
                    i = t[1],
                    s = t[2],
                    o = e[0],
                    u = e[1],
                    a = e[2],
                    f = e[3],
                    l = f * r + u * s - a * i,
                    c = f * i + a * r - o * s,
                    h = f * s + o * i - u * r,
                    p = -o * r - u * i - a * s;
                return n[0] = l * f + p * -o + c * -a - h * -u, n[1] = c * f + p * -u + h * -o - l * -a, n[2] = h * f + p * -a + l * -u - c * -o, n
            }, v.scale = function (e, t, n) {
                return !n || e === n ? (e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= t, e) : (n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n)
            }, v.toMat3 = function (e, t) {
                t || (t = p.create());
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = n + n,
                    u = r + r,
                    a = i + i,
                    f = n * o,
                    l = n * u,
                    c = n * a,
                    h = r * u,
                    d = r * a,
                    v = i * a,
                    m = s * o,
                    g = s * u,
                    y = s * a;
                return t[0] = 1 - (h + v), t[1] = l + y, t[2] = c - g, t[3] = l - y, t[4] = 1 - (f + v), t[5] = d + m, t[6] = c + g, t[7] = d - m, t[8] = 1 - (f + h), t
            }, v.toMat4 = function (e, t) {
                t || (t = d.create());
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = n + n,
                    u = r + r,
                    a = i + i,
                    f = n * o,
                    l = n * u,
                    c = n * a,
                    h = r * u,
                    p = r * a,
                    v = i * a,
                    m = s * o,
                    g = s * u,
                    y = s * a;
                return t[0] = 1 - (h + v), t[1] = l + y, t[2] = c - g, t[3] = 0, t[4] = l - y, t[5] = 1 - (f + v), t[6] = p + m, t[7] = 0, t[8] = c + g, t[9] = p - m, t[10] = 1 - (f + h), t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
            }, v.slerp = function (e, t, n, r) {
                r || (r = e);
                var i = e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3],
                    s, o, u, a;
                return Math.abs(i) >= 1 ? (r !== e && (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3]), r) : (s = Math.acos(i), o = Math.sqrt(1 - i * i), Math.abs(o) < .001 ? (r[0] = e[0] * .5 + t[0] * .5, r[1] = e[1] * .5 + t[1] * .5, r[2] = e[2] * .5 + t[2] * .5, r[3] = e[3] * .5 + t[3] * .5, r) : (u = Math.sin((1 - n) * s) / o, a = Math.sin(n * s) / o, r[0] = e[0] * u + t[0] * a, r[1] = e[1] * u + t[1] * a, r[2] = e[2] * u + t[2] * a, r[3] = e[3] * u + t[3] * a, r))
            }, v.fromRotationMatrix = function (e, t) {
                t || (t = v.create());
                var n = e[0] + e[4] + e[8],
                    r;
                if (n > 0) r = Math.sqrt(n + 1), t[3] = .5 * r, r = .5 / r, t[0] = (e[7] - e[5]) * r, t[1] = (e[2] - e[6]) * r, t[2] = (e[3] - e[1]) * r;
                else {
                    var i = v.fromRotationMatrix.s_iNext = v.fromRotationMatrix.s_iNext || [1, 2, 0],
                        s = 0;
                    e[4] > e[0] && (s = 1), e[8] > e[s * 3 + s] && (s = 2);
                    var o = i[s],
                        u = i[o];
                    r = Math.sqrt(e[s * 3 + s] - e[o * 3 + o] - e[u * 3 + u] + 1), t[s] = .5 * r, r = .5 / r, t[3] = (e[u * 3 + o] - e[o * 3 + u]) * r, t[o] = (e[o * 3 + s] + e[s * 3 + o]) * r, t[u] = (e[u * 3 + s] + e[s * 3 + u]) * r
                }
                return t
            }, p.toQuat4 = v.fromRotationMatrix,
            function () {
                var e = p.create();
                v.fromAxes = function (t, n, r, i) {
                    return e[0] = n[0], e[3] = n[1], e[6] = n[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = t[0], e[5] = t[1], e[8] = t[2], v.fromRotationMatrix(e, i)
                }
            }(), v.identity = function (e) {
                return e || (e = v.create()), e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
            }, v.fromAngleAxis = function (e, t, n) {
                n || (n = v.create());
                var r = e * .5,
                    i = Math.sin(r);
                return n[3] = Math.cos(r), n[0] = i * t[0], n[1] = i * t[1], n[2] = i * t[2], n
            }, v.toAngleAxis = function (e, t) {
                t || (t = e);
                var r = e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
                if (r > 0) {
                    t[3] = 2 * Math.acos(e[3]);
                    var i = n.invsqrt(r);
                    t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i
                } else t[3] = 0, t[0] = 1, t[1] = 0, t[2] = 0;
                return t
            }, v.str = function (e) {
                return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
            };
        var g = {};
        g.create = function (e) {
            var t = new r(2);
            return e ? (t[0] = e[0], t[1] = e[1]) : (t[0] = 0, t[1] = 0), t
        }, g.createFrom = function (e, t) {
            var n = new r(2);
            return n[0] = e, n[1] = t, n
        }, g.add = function (e, t, n) {
            return n || (n = t), n[0] = e[0] + t[0], n[1] = e[1] + t[1], n
        }, g.subtract = function (e, t, n) {
            return n || (n = t), n[0] = e[0] - t[0], n[1] = e[1] - t[1], n
        }, g.multiply = function (e, t, n) {
            return n || (n = t), n[0] = e[0] * t[0], n[1] = e[1] * t[1], n
        }, g.divide = function (e, t, n) {
            return n || (n = t), n[0] = e[0] / t[0], n[1] = e[1] / t[1], n
        }, g.scale = function (e, t, n) {
            return n || (n = e), n[0] = e[0] * t, n[1] = e[1] * t, n
        }, g.dist = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1];
            return Math.sqrt(n * n + r * r)
        }, g.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t
        }, g.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t
        }, g.negate = function (e, t) {
            return t || (t = e), t[0] = -e[0], t[1] = -e[1], t
        }, g.normalize = function (e, t) {
            t || (t = e);
            var n = e[0] * e[0] + e[1] * e[1];
            return n > 0 ? (n = Math.sqrt(n), t[0] = e[0] / n, t[1] = e[1] / n) : t[0] = t[1] = 0, t
        }, g.cross = function (e, t, n) {
            var r = e[0] * t[1] - e[1] * t[0];
            return n ? (n[0] = n[1] = 0, n[2] = r, n) : r
        }, g.length = function (e) {
            var t = e[0],
                n = e[1];
            return Math.sqrt(t * t + n * n)
        }, g.squaredLength = function (e) {
            var t = e[0],
                n = e[1];
            return t * t + n * n
        }, g.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1]
        }, g.direction = function (e, t, n) {
            n || (n = e);
            var r = e[0] - t[0],
                i = e[1] - t[1],
                s = r * r + i * i;
            return s ? (s = 1 / Math.sqrt(s), n[0] = r * s, n[1] = i * s, n) : (n[0] = 0, n[1] = 0, n[2] = 0, n)
        }, g.lerp = function (e, t, n, r) {
            return r || (r = e), r[0] = e[0] + n * (t[0] - e[0]), r[1] = e[1] + n * (t[1] - e[1]), r
        }, g.str = function (e) {
            return "[" + e[0] + ", " + e[1] + "]"
        };
        var y = {};
        y.create = function (e) {
            var t = new r(4);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]) : t[0] = t[1] = t[2] = t[3] = 0, t
        }, y.createFrom = function (e, t, n, i) {
            var s = new r(4);
            return s[0] = e, s[1] = t, s[2] = n, s[3] = i, s
        }, y.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, y.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t
        }, y.identity = function (e) {
            return e || (e = y.create()), e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
        }, y.transpose = function (e, t) {
            if (!t || e === t) {
                var n = e[1];
                return e[1] = e[2], e[2] = n, e
            }
            return t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t
        }, y.determinant = function (e) {
            return e[0] * e[3] - e[2] * e[1]
        }, y.inverse = function (e, t) {
            t || (t = e);
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[3],
                o = n * s - i * r;
            return o ? (o = 1 / o, t[0] = s * o, t[1] = -r * o, t[2] = -i * o, t[3] = n * o, t) : null
        }, y.multiply = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3];
            return n[0] = r * t[0] + i * t[2], n[1] = r * t[1] + i * t[3], n[2] = s * t[0] + o * t[2], n[3] = s * t[1] + o * t[3], n
        }, y.rotate = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = Math.sin(t),
                a = Math.cos(t);
            return n[0] = r * a + i * u, n[1] = r * -u + i * a, n[2] = s * a + o * u, n[3] = s * -u + o * a, n
        }, y.multiplyVec2 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1];
            return n[0] = r * e[0] + i * e[1], n[1] = r * e[2] + i * e[3], n
        }, y.scale = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = t[0],
                a = t[1];
            return n[0] = r * u, n[1] = i * a, n[2] = s * u, n[3] = o * a, n
        }, y.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
        };
        var b = {};
        return b.create = function (e) {
            var t = new r(4);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]) : (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t
        }, b.createFrom = function (e, t, n, i) {
            var s = new r(4);
            return s[0] = e, s[1] = t, s[2] = n, s[3] = i, s
        }, b.add = function (e, t, n) {
            return n || (n = t), n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n
        }, b.subtract = function (e, t, n) {
            return n || (n = t), n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n
        }, b.multiply = function (e, t, n) {
            return n || (n = t), n[0] = e[0] * t[0], n[1] = e[1] * t[1], n[2] = e[2] * t[2], n[3] = e[3] * t[3], n
        }, b.divide = function (e, t, n) {
            return n || (n = t), n[0] = e[0] / t[0], n[1] = e[1] / t[1], n[2] = e[2] / t[2], n[3] = e[3] / t[3], n
        }, b.scale = function (e, t, n) {
            return n || (n = e), n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n
        }, b.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, b.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t
        }, b.negate = function (e, t) {
            return t || (t = e), t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t
        }, b.length = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3];
            return Math.sqrt(t * t + n * n + r * r + i * i)
        }, b.squaredLength = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3];
            return t * t + n * n + r * r + i * i
        }, b.lerp = function (e, t, n, r) {
            return r || (r = e), r[0] = e[0] + n * (t[0] - e[0]), r[1] = e[1] + n * (t[1] - e[1]), r[2] = e[2] + n * (t[2] - e[2]), r[3] = e[3] + n * (t[3] - e[3]), r
        }, b.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
        }, e && (e.glMatrixArrayType = r, e.MatrixArray = r, e.setMatrixArrayType = i, e.determineMatrixArrayType = s, e.glMath = n, e.vec2 = g, e.vec3 = o, e.vec4 = b, e.mat2 = y, e.mat3 = p, e.mat4 = d, e.quat4 = v), {
            glMatrixArrayType: r,
            MatrixArray: r,
            setMatrixArrayType: i,
            determineMatrixArrayType: s,
            glMath: n,
            vec2: g,
            vec3: o,
            vec4: b,
            mat2: y,
            mat3: p,
            mat4: d,
            quat4: v
        }
    }), define("compute", ["require", "exports", "module"], function (e, t, n) {
        function r(e, t) {
            this.gl = e, this.shader = t.shader, this.mesh = t.mesh, this.uniforms = t.uniforms, this.outputFBO = t.output, this.blend = t.blend, this.nobind = t.nobind, this.nounbind = t.nounbind
        }
        r.prototype.run = function () {
            this.outputFBO && !this.nobind && this.outputFBO.bind();
            var e = 0,
                t;
            for (var n in this.uniforms) this.uniforms.hasOwnProperty(n) && (t = this.uniforms[n], t.bindTexture && !t.bound && t.bindTexture(e++));
            this.shader.use(), this.shader.uniforms(this.uniforms), this.blend === "add" ? (this.gl.blendFunc(gl.SRC_ALPHA, gl.ONE), this.gl.enable(gl.BLEND)) : this.gl.disable(gl.BLEND), this.mesh.draw(this.shader), this.outputFBO && !this.nounbind && this.outputFBO.unbind();
            for (n in this.uniforms) this.uniforms.hasOwnProperty(n) && (t = this.uniforms[n], t.bindTexture && t.bound && t.unbindTexture())
        }, t.Kernel = r
    }), define("fluid-main", ["require", "exports", "module", "game-shim", "engine/loader", "engine/clock", "engine/input", "engine/utils", "engine/gl/shader", "engine/gl/geometry", "engine/gl/texture", "engine/gl/mesh", "engine/gl/context", "gl-matrix", "compute"], function (e, t, n) {
        e("game-shim");
        var r = e("engine/loader"),
            i = e("engine/clock").Clock,
            s = e("engine/input").Handler,
            o = e("engine/utils").debounce,
            u = e("engine/gl/shader").Manager,
            a = e("engine/gl/geometry"),
            f = e("engine/gl/texture").FBO,
            l = e("engine/gl/mesh").Mesh,
            c = e("engine/gl/context"),
            h = e("gl-matrix"),
            p = e("compute").Kernel,
            d = function () {
                var e = function (e) {
                        this.options = e || {}, this.x = this.options.x || 0, this.y = this.options.y || 0, this.px = this.options.px || 0, this.py = this.options.py || 0, this.size = this.options.size || 1, this.dt = this.options.dt || 0, this.update = this.options.update || function () {}
                    },
                    t = document.getElementById(window.fluid.stage),
                    n = c.initialize(t, {
                        context: {
                            depth: !1
                        },
                        debug: !1,
                        extensions: {
                            texture_float: !0
                        }
                    }, this.fail),
                    d = {
                        iterations: 16,
                        mouse_force: window.fluid.isSP ? .4 : .2,
                        resolution: .25,
                        cursor_size: Math.max(window.innerWidth, window.innerHeight) * (window.fluid.isSP ? .1 : .05),
                        step: 1 / 30,
                        redMax: .98,
                        redMin: 0,
                        redRate: window.fluid.isSP ? .04 : .02,
                        greenMax: .96,
                        greenMin: 0,
                        greenRate: window.fluid.isSP ? .1 : .05,
                        blueMax: .94,
                        blueMin: 0,
                        blueRate: window.fluid.isSP ? .3 : .3
                    },
                    v = new i(t),
                    m = new s(t),
                    g = new r,
                    y = g.resources,
                    b = new u(n, y),
                    w = 0,
                    E = 0,
                    S = navigator.userAgent.toLowerCase(),
                    x = /mobile|android|ip(ad|od|hone)|windows phone/.test(S),
                    T = h.vec2,
                    N, C;
                window.gl = n;
                var k = function () {
                    var e = window.fluid.shaderDir;
                    n && g.load([e + "advect.frag", e + "addForce.frag", e + "divergence.frag", e + "jacobi.frag", e + "subtractPressureGradient.frag", e + "visualize.frag", e + "cursor.vertex", e + "boundary.vertex", e + "kernel.vertex"], function (e) {
                        return function () {
                            return e.init()
                        }
                    }(this))
                };
                return k.prototype.fail = function (e, t, n) {
                    console.log("Fluid Background initializing failed.");
                }, k.prototype.hasFloatLuminanceFBOSupport = function () {
                    var e = new f(n, 32, 32, C, n.LUMINANCE);
                    return e.supported
                }, k.prototype.init = function () {
                    window.fluidBg.ready = true;
                    n.clearColor(1.0, 1.0, 1.0, 1.0);
                    n.clearDepth(1.0);
                    n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT);
                    n.getExtension("OES_texture_float_linear");
                    if (x) {
                        var e = n.getExtension("OES_texture_half_float");
                        e ? C = e.HALF_FLOAT_OES : C = n.FLOAT
                    } else C = n.FLOAT; /*window.addEventListener("resize",o(this.resize,250)),*/
                    this.resize()
                }, k.prototype.resize = function () {
                    var e = t.getBoundingClientRect();
                    w = e.width * d.resolution, E = e.height * d.resolution, m.updateOffset(), k.prototype.setup(w, E, N), x && (t.setAttribute("style", "width:99.8%"), setTimeout(function () {
                        t.setAttribute("style", "width:100%")
                    }, 10))
                }, k.prototype.setup = function (r, i, s) {
                    t.width = r, t.height = i;
                    var o = .25;
                    x && (o = .15), n.viewport(0, 0, r, i), n.lineWidth(1);
                    var u = 1 / t.width,
                        c = 1 / t.height,
                        h = T.create([u, c]),
                        g = T.create([1, t.width / t.height]),
                        y = new l(n, {
                            vertex: a.screen_quad(1 - u * 2, 1 - c * 2),
                            attributes: {
                                position: {}
                            }
                        }),
                        w = new l(n, {
                            vertex: a.screen_quad(1, 1),
                            attributes: {
                                position: {}
                            }
                        }),
                        E = new l(n, {
                            mode: n.LINES,
                            vertex: new Float32Array([-1 + u * 0, -1 + c * 0, -1 + u * 0, -1 + c * 2, 1 - u * 0, -1 + c * 0, 1 - u * 0, -1 + c * 2, -1 + u * 0, 1 - c * 0, -1 + u * 0, 1 - c * 2, 1 - u * 0, 1 - c * 0, 1 - u * 0, 1 - c * 2, -1 + u * 0, 1 - c * 0, -1 + u * 2, 1 - c * 0, -1 + u * 0, -1 + c * 0, -1 + u * 2, -1 + c * 0, 1 - u * 0, 1 - c * 0, 1 - u * 2, 1 - c * 0, 1 - u * 0, -1 + c * 0, 1 - u * 2, -1 + c * 0]),
                            attributes: {
                                position: {
                                    size: 2,
                                    stride: 16,
                                    offset: 0
                                },
                                offset: {
                                    size: 2,
                                    stride: 16,
                                    offset: 8
                                }
                            }
                        }),
                        S = new f(n, r, i, C),
                        N = new f(n, r, i, C),
                        k = new f(n, r, i, C, s),
                        L = new f(n, r, i, C, s),
                        A = new f(n, r, i, C, s),
                        O = new p(n, {
                            shader: b.get("kernel", "advect"),
                            mesh: y,
                            uniforms: {
                                px: h,
                                px1: g,
                                scale: 1,
                                velocity: S,
                                source: S,
                                dt: d.step
                            },
                            output: N
                        }),
                        M = new p(n, {
                            shader: b.get("boundary", "advect"),
                            mesh: E,
                            uniforms: {
                                px: h,
                                scale: -1,
                                velocity: S,
                                source: S,
                                dt: 1 / 60
                            },
                            output: N
                        }),
                        _ = new l(n, {
                            vertex: a.screen_quad(u * d.cursor_size * 2, c * d.cursor_size * 2),
                            attributes: {
                                position: {}
                            }
                        }),
                        D = new p(n, {
                            shader: b.get("cursor", "addForce"),
                            mesh: _,
                            blend: "add",
                            uniforms: {
                                px: h,
                                force: T.create([.5, .2]),
                                center: T.create([.1, .4]),
                                scale: T.create([d.cursor_size * u, d.cursor_size * c])
                            },
                            output: N
                        }),
                        P = new p(n, {
                            shader: b.get("kernel", "divergence"),
                            mesh: w,
                            uniforms: {
                                velocity: N,
                                px: h
                            },
                            output: k
                        }),
                        H = new p(n, {
                            shader: b.get("kernel", "jacobi"),
                            mesh: w,
                            nounbind: !0,
                            uniforms: {
                                pressure: L,
                                divergence: k,
                                alpha: -.2,
                                beta: .25,
                                px: h
                            },
                            output: A
                        }),
                        B = new p(n, {
                            shader: b.get("boundary", "jacobi"),
                            mesh: E,
                            nounbind: !0,
                            nobind: !0,
                            uniforms: {
                                pressure: L,
                                divergence: k,
                                alpha: -1,
                                beta: o,
                                px: h
                            },
                            output: A
                        }),
                        j = new p(n, {
                            shader: b.get("kernel", "subtractPressureGradient"),
                            mesh: w,
                            uniforms: {
                                scale: 1,
                                pressure: L,
                                velocity: N,
                                px: h
                            },
                            output: S
                        }),
                        F = new p(n, {
                            shader: b.get("boundary", "subtractPressureGradient"),
                            mesh: E,
                            uniforms: {
                                scale: -1,
                                pressure: L,
                                velocity: N,
                                px: h
                            },
                            output: S
                        }),
                        I = new p(n, {
                            shader: b.get("kernel", "visualize"),
                            mesh: w,
                            uniforms: {
                                velocity: S,
                                pressure: L,
                                px: h,
                                redMax: d.redMax,
                                redMin: d.redMin,
                                redRate: d.redRate,
                                greenMax: d.greenMax,
                                greenMin: d.greenMin,
                                greenRate: d.greenRate,
                                blueMax: d.blueMax,
                                blueMin: d.blueMin,
                                blueRate: d.blueRate
                            },
                            output: null
                        }),
                        q = Math.PI * 2,
                        R = .5 * r,
                        U = .5 * i,
                        z = 1;
                    x && (z = .6);
                    var W = [new e({
                        update: function (e) {
                            this.x = m.mouse.x * d.resolution, this.y = m.mouse.y * d.resolution
                        }
                    }), new e({
                        dt: (.6 + (Math.random() * .05 - .1)) * q,
                        x: R,
                        y: U,
                        px: R,
                        py: U,
                        vecx: .3,
                        vecy: .3,
                        update: function (e) {
                            this.x += this.options.vecx, this.y += Math.sin(this.dt) * this.options.vecy, this.size = Math.abs(Math.cos(this.dt)) * z, this.dt = (this.dt + e * .1) % q * z, this.x < 0 ? (this.x = 0, this.options.vecx = 1) : this.x > r && (this.x = r, this.options.vecx = -1), this.y < 0 ? (this.y = 0, this.options.vecy = 1) : this.y > i && (this.y = i, this.options.vecy = -1)
                        }
                    })];
                    v.ontick = function (e) {
                        O.uniforms.dt = d.step * .1, O.run(), T.set([d.cursor_size * u, d.cursor_size * c], D.uniforms.scale);
                        for (var t = 0, n = W.length; t < n; t++) {
                            var r = W[t],
                                i, s;
                            r.update(e);
                            if (r.x === 0 && r.y === 0) continue;
                            T.set([(r.x - r.px) * u * d.cursor_size * d.mouse_force * r.size, -(r.y - r.py) * c * d.cursor_size * d.mouse_force * r.size], D.uniforms.force), T.set([r.x * u * 2 - 1, (r.y * c * 2 - 1) * -1], D.uniforms.center), D.run(), r.px = r.x, r.py = r.y
                        }
                        M.run(), P.run();
                        var o = L,
                            a = A,
                            f = o;
                        for (var t = 0; t < d.iterations; t++) {
                            H.uniforms.pressure = B.uniforms.pressure = o, H.outputFBO = B.outputFBO = a, H.run(), B.run(), f = o, o = a, a = f;
                        }
                        j.run(), F.run(), I.run()
                    }
                }, k.prototype.start = function () {
                    v.start(), m.addEvent()
                }, k.prototype.stop = function () {
                    v.stop(), m.removeEvent()
                }, k
            }();
        d.ready = false;
        window.fluidBg = d
    }), require(["fluid-main"]);
