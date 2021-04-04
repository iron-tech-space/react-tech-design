import React from "react";
import PropTypes from "prop-types";
import ColumnResizer from "react-base-table/lib/ColumnResizer";
import { rtPrefix } from "../../utils/variables";

const HeaderCell = (props) => {
    // console.log('HeaderCell => ', props);

    const { column, onResize, ...restProps } = props;

    if (!column)
        return <th {...restProps} />;

    const { width, resizable, headerRenderer } = column;

    if (!width)
        return <th {...restProps} />;

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
        return (
            <th {...restProps}>
                {restProps.children}
                {resizable &&
                <ColumnResizer
                    className={`${rtPrefix}-column-resizer`}
                    column={{ width: width, maxWidth: 1000 }}
                    onResize={onResize}
                />}
            </th>
        );
    // }
};

HeaderCell.propTypes = {
    onResize: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizable: PropTypes.bool
};

export default HeaderCell;
