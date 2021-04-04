function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
import PropTypes from "prop-types";
import ColumnResizer from "react-base-table/lib/ColumnResizer";
import { rtPrefix } from "../../utils/variables";

var HeaderCell = function HeaderCell(props) {
    // console.log('HeaderCell => ', props);

    var column = props.column,
        onResize = props.onResize,
        restProps = _objectWithoutProperties(props, ["column", "onResize"]);

    if (!column) return React.createElement("th", restProps);

    var width = column.width,
        resizable = column.resizable,
        headerRenderer = column.headerRenderer;


    if (!width) return React.createElement("th", restProps);

    // if (headerRenderer) {
    //     let childNode
    //     if( typeof headerRenderer === 'function') {
    //         childNode = headerRenderer()
    //     }
    //     else {
    //         childNode = headerRenderer
    //     }
    //
    //     return (
    //         <th {...restProps}>
    //             {childNode}
    //             {resizable &&
    //             <ColumnResizer
    //                 className={`${rtPrefix}-column-resizer`}
    //                 column={{ width: width, maxWidth: 1000 }}
    //                 onResize={onResize}
    //             />}
    //         </th>
    //     );
    // } else {
    return React.createElement(
        "th",
        restProps,
        restProps.children,
        resizable && React.createElement(ColumnResizer, {
            className: rtPrefix + "-column-resizer",
            column: { width: width, maxWidth: 1000 },
            onResize: onResize
        })
    );
    // }
};

HeaderCell.propTypes = {
    onResize: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizable: PropTypes.bool
};

export default HeaderCell;