var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { rtPrefix } from '../../utils/variables';
import PropTypes from "prop-types";

var Layout = function Layout(props) {

    var itemProps = {};
    Object.keys(props).forEach(function (key) {
        return key !== 'children' ? itemProps[key] = props[key] : null;
    });

    var getCls = function getCls() {
        var cls = [rtPrefix + '-layout'];
        itemProps.className && cls.push(itemProps.className);
        return cls.join(' ');
    };

    return React.createElement(
        'div',
        _extends({}, itemProps, { className: getCls() }),
        props.children
    );
};

Layout.propTypes = {
    /** Строка класса */
    className: PropTypes.string,

    /** Объект стиля */
    style: PropTypes.object
};

export default Layout;