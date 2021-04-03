import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import React from "react";
import PropTypes from "prop-types";


var BodyCell = function BodyCell(props) {
    return React.createElement(
        _Typography.Text,
        { ellipsis: true, style: { width: '100%' }, className: 'rt-table-cell' },
        props.cellData
    );
};

BodyCell.propTypes = {};

export default BodyCell;