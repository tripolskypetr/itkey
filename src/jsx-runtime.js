const React = require('react');

const factory = (type, props) => {
    if (window.Translate) {
        return window.Translate.jss(type, props);
    }
    return React.createElement(type, props);
};

module.exports = {
    Fragment: React.Fragment,
    jsx: factory,
    jsxs: factory,
};
