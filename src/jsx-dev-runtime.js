const React = require('react');

const factory = (type, props) => {
    if (window.Translate) {
        const children = Array.isArray(props?.children) ? props?.children : [props?.children];
        return window.Translate.createElement(type, props, ...children);
    }
    return React.createElement(type, props);
};

module.exports = {
    Fragment: React.Fragment,
    jsxDEV: factory,
};
