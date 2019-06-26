"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LensImpl = /** @class */ (function () {
    function LensImpl(_get, _set) {
        this._get = _get;
        this._set = _set;
    }
    LensImpl.prototype.k = function (key) {
        return this.compose(lens(function (t) { return (!t ? undefined : t[key]); }, function (v) { return function (t) {
            var copied = copy(t);
            copied[key] = v;
            return copied;
        }; }));
    };
    LensImpl.prototype.compose = function (other) {
        var _this = this;
        return lens(function (t) { return other._get(_this._get(t)); }, function (v) { return function (t) { return _this._set(other._set(v)(_this._get(t)))(t); }; });
    };
    LensImpl.prototype.get = function () {
        var _this = this;
        if (arguments.length) {
            var f_1 = arguments[0];
            return function (t) { return f_1(_this._get(t)); };
        }
        else {
            return this._get;
        }
    };
    LensImpl.prototype.set = function (modifier) {
        var _this = this;
        if (typeof modifier === 'function') {
            return function (t) { return _this._set(modifier(_this._get(t)))(t); };
        }
        else {
            return this._set(modifier);
        }
    };
    return LensImpl;
}());
exports.LensImpl = LensImpl;
function copy(x) {
    if (Array.isArray(x)) {
        return x.slice();
    }
    else if (x && typeof x === 'object') {
        return Object.keys(x).reduce(function (res, k) {
            res[k] = x[k];
            return res;
        }, {});
    }
    else {
        return x;
    }
}
function proxify(impl) {
    return new Proxy(impl, {
        get: function (target, prop) {
            if (typeof target[prop] !== 'undefined') {
                return target[prop];
            }
            return target.k(prop);
        }
    });
}
function lens() {
    if (arguments.length) {
        return proxify(new LensImpl(arguments[0], arguments[1]));
    }
    else {
        return lens(function (t) { return t; }, function (v) { return function (_) { return v; }; });
    }
}
exports.lens = lens;
function prism() {
    return lens.apply(undefined, arguments);
}
exports.prism = prism;
