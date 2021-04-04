var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
import PropTypes from "prop-types";

var BodyCell = function BodyCell(props) {
  var column = props.column,
      rowData = props.rowData,
      rowIndex = props.rowIndex,
      restProps = _objectWithoutProperties(props, ["column", "rowData", "rowIndex"]);

  if (column && column.cellComponent) {
    // console.log('BodyCell => ', restProps);
    return React.createElement(
      "td",
      _extends({}, restProps, { style: _extends({}, restProps.style, { padding: 0 }) }),
      React.createElement(column.cellComponent, {
        column: column,
        cellData: restProps.title,
        rowData: rowData,
        rowIndex: rowIndex
      })
    );
  } else {
    return React.createElement("td", restProps);
  }
};

BodyCell.propTypes = {};

export default BodyCell;