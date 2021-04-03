var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

var HeaderRow = function HeaderRow(props) {
    var headerRowRef = useRef();

    var headerHeight = props.headerHeight,
        setHeaderHeight = props.setHeaderHeight,
        restProps = _objectWithoutProperties(props, ['headerHeight', 'setHeaderHeight']);

    useEffect(function () {

        var newHeight = headerRowRef && headerRowRef.current && headerRowRef.current.clientHeight;
        if (headerHeight !== newHeight) {
            // console.log('Row height', newHeight) //clientHeight
            setHeaderHeight(newHeight);
        }
    });
    return React.createElement('tr', _extends({}, restProps, { ref: headerRowRef }));
};

HeaderRow.propTypes = {
    headerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setHeaderHeight: PropTypes.func
};

export default HeaderRow;