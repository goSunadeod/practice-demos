(() => { "use strict"; function e(e, n) { if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function") } function n(e, n) { for (var t = 0; t < n.length; t++) { var o = n[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o) } } function t(e, t, o) { return t && n(e.prototype, t), o && n(e, o), e } var o = new (function () { function n(t) { var o = t.model; e(this, n), this.className = "Apple", this.model = o } return t(n, [{ key: "getModel", value: function () { return this.model } }]), n }())({ model: "IphoneX" }).getModel(); console.log(o) })();