import React from "react";
import PropTypes from "prop-types";

const BodyCell = props => {

  const {column, rowData, rowIndex, ...restProps} = props;

  if(column && column.cellComponent) {
    // console.log('BodyCell => ', restProps);
    return (
      <td {...restProps} style={{...restProps.style, padding: 0}}>
        <column.cellComponent
          column={column}
          cellData={restProps.title}
          rowData={rowData}
          rowIndex={rowIndex}
        />
      </td>
    )
  } else {
    return <td {...restProps}/>;
  }

};

BodyCell.propTypes = {

};

export default BodyCell;
