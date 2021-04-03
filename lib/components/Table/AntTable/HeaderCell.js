function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import ColumnResizer from 'react-base-table/lib/ColumnResizer';

var HeaderCell = function HeaderCell(props) {
    var onResize = props.onResize,
        width = props.width,
        resizable = props.resizable,
        restProps = _objectWithoutProperties(props, ['onResize', 'width', 'resizable']);

    if (!width) return React.createElement('th', restProps);
    return React.createElement(
        'th',
        restProps,
        restProps.children,
        resizable && React.createElement(ColumnResizer, {
            className: 'BaseTable__column-resizer',
            column: { width: width, maxWidth: 1000 },
            onResize: onResize
        })
    );
};

HeaderCell.propTypes = {
    onResize: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizable: PropTypes.bool
};

export default HeaderCell;