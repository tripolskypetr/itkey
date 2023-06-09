import React from 'react';

import { Translate } from 'react-declarative';

const locale = {
    // 'lorem ipsum': 'Hello world!',
};

const translate = new Translate(locale);

window.Translate = translate;

Object.assign(React, {
    createElement: translate.createElement,
});
