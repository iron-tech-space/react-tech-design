import React from 'react';
import PropTypes from 'prop-types';
import ColumnResizer from 'react-base-table/lib/ColumnResizer'

const HeaderCell = (props) => {
    const { onResize, width, resizable, ...restProps } = props;
    if (!width)
        return <th {...restProps} />;
    return (
        <th {...restProps}>
            {restProps.children}
            {resizable &&
                <ColumnResizer
                    className={'BaseTable__column-resizer'}
                    column={{ width: width, maxWidth: 1000 }}
                    onResize={onResize}
                /> }
        </th>
    );
}

HeaderCell.propTypes = {
    onResize: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizable: PropTypes.bool
};

export default HeaderCell;
