(() => {
  // node_modules/@studio-freight/lenis/dist/lenis.mjs
  function t(t2, e2, i2, s2) {
    if ("a" === i2 && !s2)
      throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof e2 ? t2 !== e2 || !s2 : !e2.has(t2))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i2 ? s2 : "a" === i2 ? s2.call(t2) : s2 ? s2.value : e2.get(t2);
  }
  function e(t2, e2, i2, s2, o2) {
    if ("m" === s2)
      throw new TypeError("Private method is not writable");
    if ("a" === s2 && !o2)
      throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof e2 ? t2 !== e2 || !o2 : !e2.has(t2))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s2 ? o2.call(t2, i2) : o2 ? o2.value = i2 : e2.set(t2, i2), i2;
  }
  var i;
  var s;
  var o;
  var r;
  function n(t2, e2, i2) {
    return Math.max(t2, Math.min(e2, i2));
  }
  var Animate = class {
    advance(t2) {
      if (!this.isRunning)
        return;
      let e2 = false;
      if (this.lerp)
        this.value = (i2 = this.value, s2 = this.to, o2 = 60 * this.lerp, r2 = t2, function(t3, e3, i3) {
          return (1 - i3) * t3 + i3 * e3;
        }(i2, s2, 1 - Math.exp(-o2 * r2))), Math.round(this.value) === this.to && (this.value = this.to, e2 = true);
      else {
        this.currentTime += t2;
        const i3 = n(0, this.currentTime / this.duration, 1);
        e2 = i3 >= 1;
        const s3 = e2 ? 1 : this.easing(i3);
        this.value = this.from + (this.to - this.from) * s3;
      }
      var i2, s2, o2, r2;
      this.onUpdate?.(this.value, e2), e2 && this.stop();
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t2, e2, { lerp: i2 = 0.1, duration: s2 = 1, easing: o2 = (t3) => t3, onStart: r2, onUpdate: n2 }) {
      this.from = this.value = t2, this.to = e2, this.lerp = i2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, r2?.(), this.onUpdate = n2;
    }
  };
  var Dimensions = class {
    constructor({ wrapper: t2, content: e2, autoResize: i2 = true } = {}) {
      if (this.wrapper = t2, this.content = e2, i2) {
        const t3 = /* @__PURE__ */ function(t4, e3) {
          let i3;
          return function() {
            let s2 = arguments, o2 = this;
            clearTimeout(i3), i3 = setTimeout(function() {
              t4.apply(o2, s2);
            }, e3);
          };
        }(this.resize, 250);
        this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(t3), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(t3), this.contentResizeObserver.observe(this.content);
      }
      this.resize();
    }
    destroy() {
      this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect();
    }
    resize = () => {
      this.onWrapperResize(), this.onContentResize();
    };
    onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    };
    onContentResize = () => {
      this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
    };
    get limit() {
      return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
    }
  };
  var Emitter = class {
    constructor() {
      this.events = {};
    }
    emit(t2, ...e2) {
      let i2 = this.events[t2] || [];
      for (let t3 = 0, s2 = i2.length; t3 < s2; t3++)
        i2[t3](...e2);
    }
    on(t2, e2) {
      return this.events[t2]?.push(e2) || (this.events[t2] = [e2]), () => {
        this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
      };
    }
    off(t2, e2) {
      this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
    }
    destroy() {
      this.events = {};
    }
  };
  var VirtualScroll = class {
    constructor(t2, { wheelMultiplier: e2 = 1, touchMultiplier: i2 = 2, normalizeWheel: s2 = false }) {
      this.element = t2, this.wheelMultiplier = e2, this.touchMultiplier = i2, this.normalizeWheel = s2, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    on(t2, e2) {
      return this.emitter.on(t2, e2);
    }
    destroy() {
      this.emitter.destroy(), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    onTouchStart = (t2) => {
      const { clientX: e2, clientY: i2 } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = e2, this.touchStart.y = i2, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    };
    onTouchMove = (t2) => {
      const { clientX: e2, clientY: i2 } = t2.targetTouches ? t2.targetTouches[0] : t2, s2 = -(e2 - this.touchStart.x) * this.touchMultiplier, o2 = -(i2 - this.touchStart.y) * this.touchMultiplier;
      this.touchStart.x = e2, this.touchStart.y = i2, this.lastDelta = { x: s2, y: o2 }, this.emitter.emit("scroll", { deltaX: s2, deltaY: o2, event: t2 });
    };
    onTouchEnd = (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    };
    onWheel = (t2) => {
      let { deltaX: e2, deltaY: i2 } = t2;
      this.normalizeWheel && (e2 = n(-100, e2, 100), i2 = n(-100, i2, 100)), e2 *= this.wheelMultiplier, i2 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e2, deltaY: i2, event: t2 });
    };
  };
  var Lenis = class {
    constructor({ wrapper: t2 = window, content: e2 = document.documentElement, wheelEventsTarget: n2 = t2, eventsTarget: l = n2, smoothWheel: h = true, syncTouch: a = false, syncTouchLerp: c = 0.075, touchInertiaMultiplier: u = 35, duration: p, easing: d = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: m = !p && 0.1, infinite: v = false, orientation: g = "vertical", gestureOrientation: f = "vertical", touchMultiplier: w = 1, wheelMultiplier: S = 1, normalizeWheel: y = false, autoResize: T = true } = {}) {
      i.set(this, false), s.set(this, false), o.set(this, false), r.set(this, false), this.onVirtualScroll = ({ deltaX: t3, deltaY: e3, event: i2 }) => {
        if (i2.ctrlKey)
          return;
        const s2 = i2.type.includes("touch"), o2 = i2.type.includes("wheel");
        if (this.options.syncTouch && s2 && "touchstart" === i2.type)
          return void this.reset();
        const r2 = 0 === t3 && 0 === e3, n3 = "vertical" === this.options.gestureOrientation && 0 === e3 || "horizontal" === this.options.gestureOrientation && 0 === t3;
        if (r2 || n3)
          return;
        let l2 = i2.composedPath();
        if (l2 = l2.slice(0, l2.indexOf(this.rootElement)), l2.find((t4) => {
          var e4, i3, r3, n4;
          return (null === (e4 = t4.hasAttribute) || void 0 === e4 ? void 0 : e4.call(t4, "data-lenis-prevent")) || s2 && (null === (i3 = t4.hasAttribute) || void 0 === i3 ? void 0 : i3.call(t4, "data-lenis-prevent-touch")) || o2 && (null === (r3 = t4.hasAttribute) || void 0 === r3 ? void 0 : r3.call(t4, "data-lenis-prevent-wheel")) || (null === (n4 = t4.classList) || void 0 === n4 ? void 0 : n4.contains("lenis"));
        }))
          return;
        if (this.isStopped || this.isLocked)
          return void i2.preventDefault();
        if (this.isSmooth = this.options.syncTouch && s2 || this.options.smoothWheel && o2, !this.isSmooth)
          return this.isScrolling = false, void this.animate.stop();
        i2.preventDefault();
        let h2 = e3;
        "both" === this.options.gestureOrientation ? h2 = Math.abs(e3) > Math.abs(t3) ? e3 : t3 : "horizontal" === this.options.gestureOrientation && (h2 = t3);
        const a2 = s2 && this.options.syncTouch, c2 = s2 && "touchend" === i2.type && Math.abs(h2) > 5;
        c2 && (h2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h2, Object.assign({ programmatic: false }, a2 ? { lerp: c2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
      }, this.onNativeScroll = () => {
        if (!this.__preventNextScrollEvent && !this.isScrolling) {
          const t3 = this.animatedScroll;
          this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t3), this.emit();
        }
      }, window.lenisVersion = "1.0.36", t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: e2, wheelEventsTarget: n2, eventsTarget: l, smoothWheel: h, syncTouch: a, syncTouchLerp: c, touchInertiaMultiplier: u, duration: p, easing: d, lerp: m, infinite: v, gestureOrientation: f, orientation: g, touchMultiplier: w, wheelMultiplier: S, normalizeWheel: y, autoResize: T }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: e2, autoResize: T }), this.toggleClass("lenis", true), this.velocity = 0, this.isLocked = false, this.isStopped = false, this.isSmooth = a || h, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, { passive: false }), this.virtualScroll = new VirtualScroll(l, { touchMultiplier: w, wheelMultiplier: S, normalizeWheel: y }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
      this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, { passive: false }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClass("lenis", false), this.toggleClass("lenis-smooth", false), this.toggleClass("lenis-scrolling", false), this.toggleClass("lenis-stopped", false), this.toggleClass("lenis-locked", false);
    }
    on(t2, e2) {
      return this.emitter.on(t2, e2);
    }
    off(t2, e2) {
      return this.emitter.off(t2, e2);
    }
    setScroll(t2) {
      this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
    }
    resize() {
      this.dimensions.resize();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.animate.stop();
    }
    start() {
      this.isStopped = false, this.reset();
    }
    stop() {
      this.isStopped = true, this.animate.stop(), this.reset();
    }
    raf(t2) {
      const e2 = t2 - (this.time || t2);
      this.time = t2, this.animate.advance(1e-3 * e2);
    }
    scrollTo(t2, { offset: e2 = 0, immediate: i2 = false, lock: s2 = false, duration: o2 = this.options.duration, easing: r2 = this.options.easing, lerp: l = !o2 && this.options.lerp, onComplete: h, force: a = false, programmatic: c = true } = {}) {
      if (!this.isStopped && !this.isLocked || a) {
        if (["top", "left", "start"].includes(t2))
          t2 = 0;
        else if (["bottom", "right", "end"].includes(t2))
          t2 = this.limit;
        else {
          let i3;
          if ("string" == typeof t2 ? i3 = document.querySelector(t2) : (null == t2 ? void 0 : t2.nodeType) && (i3 = t2), i3) {
            if (this.options.wrapper !== window) {
              const t3 = this.options.wrapper.getBoundingClientRect();
              e2 -= this.isHorizontal ? t3.left : t3.top;
            }
            const s3 = i3.getBoundingClientRect();
            t2 = (this.isHorizontal ? s3.left : s3.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t2) {
          if (t2 += e2, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = n(0, t2, this.limit), i2)
            return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), void (null == h || h(this));
          if (!c) {
            if (t2 === this.targetScroll)
              return;
            this.targetScroll = t2;
          }
          this.animate.fromTo(this.animatedScroll, t2, { duration: o2, easing: r2, lerp: l, onStart: () => {
            s2 && (this.isLocked = true), this.isScrolling = true;
          }, onUpdate: (t3, e3) => {
            this.isScrolling = true, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), e3 || this.emit(), e3 && (this.reset(), this.emit(), null == h || h(this), this.__preventNextScrollEvent = true, requestAnimationFrame(() => {
              delete this.__preventNextScrollEvent;
            }));
          } });
        }
      }
    }
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    get limit() {
      return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? (t2 = this.animatedScroll, e2 = this.limit, (t2 % e2 + e2) % e2) : this.animatedScroll;
      var t2, e2;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isSmooth() {
      return t(this, i, "f");
    }
    set isSmooth(s2) {
      t(this, i, "f") !== s2 && (e(this, i, s2, "f"), this.toggleClass("lenis-smooth", s2));
    }
    get isScrolling() {
      return t(this, s, "f");
    }
    set isScrolling(i2) {
      t(this, s, "f") !== i2 && (e(this, s, i2, "f"), this.toggleClass("lenis-scrolling", i2));
    }
    get isStopped() {
      return t(this, o, "f");
    }
    set isStopped(i2) {
      t(this, o, "f") !== i2 && (e(this, o, i2, "f"), this.toggleClass("lenis-stopped", i2));
    }
    get isLocked() {
      return t(this, r, "f");
    }
    set isLocked(i2) {
      t(this, r, "f") !== i2 && (e(this, r, i2, "f"), this.toggleClass("lenis-locked", i2));
    }
    get className() {
      let t2 = "lenis";
      return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), this.isSmooth && (t2 += " lenis-smooth"), t2;
    }
    toggleClass(t2, e2) {
      this.rootElement.classList.toggle(t2, e2), this.emitter.emit("className change", this);
    }
  };
  i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();

  // main.js
  console.log("lenis");
  var lenis;
  if (Webflow.env("editor") === void 0) {
    let raf = function(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });
    requestAnimationFrame(raf);
  }
  $("[data-lenis-start]").on("click", function() {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function() {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function() {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
})();
