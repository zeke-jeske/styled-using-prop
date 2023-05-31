"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
/**
 * This HOC creates a new component whose props are a little bit different from the original. The
 * `className` prop, instead of being passed directly to the old component's `className`, is passed
 * as the specified property instead. An additional `_className` prop is added to the component,
 * which allows you to still set the real `className` prop of the old component.
 */
function classNameTranslation(Component, prop) {
    return (_a) => {
        var { className: theCustomClassName, _className: actualClassName } = _a, otherProps = __rest(_a, ["className", "_className"]);
        const passedProps = Object.assign({ [prop]: theCustomClassName, className: actualClassName }, otherProps);
        return react_1.default.createElement(Component, Object.assign({}, passedProps));
    };
}
/**
 * This HOC essentially reverses the effect of `classNameTranslation`. It takes a component that has
 * the `className` and `_className` props, and returns a component that has the `className` and the
 * specified property instead. The specified property will be passed to the old component's
 * `className` prop, while the `className` prop will be passed to the old component's `_className`
 * prop.
 */
function reverseClassNameTranslation(Component, prop) {
    return (_a) => {
        var { className: actualClassName } = _a, _b = prop, theCustomClassName = _a[_b], otherProps = __rest(_a, ["className", typeof _b === "symbol" ? _b : _b + ""]);
        const intermediateProps = Object.assign({ className: theCustomClassName, actualClassName }, otherProps);
        return react_1.default.createElement(Component, Object.assign({}, intermediateProps));
    };
}
/**
 * Mimics the effects of styled components' `styled` function, but using a different property name
 * instead of `className`.
 *
 * @param Component the component to style
 * @param prop the name of the property to use instead of `className`
 */
function styledWithProp(Component, prop) {
    return (...templateParams) => reverseClassNameTranslation((0, styled_components_1.default)(classNameTranslation(Component, prop))(...templateParams), prop);
}
exports.default = styledWithProp;
