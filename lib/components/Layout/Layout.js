var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { rtPrefix } from '../utils/variables';

/** Компонент обертка со всеми пропрами div */
var Layout = function Layout(props) {

    var getCls = function getCls() {
        var cls = [rtPrefix + '-layout'];
        props.className && cls.push(props.className);
        return cls.join(' ');
    };

    return React.createElement(
        'div',
        _extends({}, props, { className: getCls() }),
        props.children
    );
};

export default Layout;