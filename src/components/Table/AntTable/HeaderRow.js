import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

const HeaderRow =  props => {
    const headerRowRef = useRef();
    const {headerHeight, setHeaderHeight, ...restProps} = props;
    useEffect(() => {

        const newHeight = headerRowRef && headerRowRef.current && headerRowRef.current.clientHeight;
        if(headerHeight !== newHeight) {
            // console.log('Row height', newHeight) //clientHeight
            setHeaderHeight(newHeight)
        }
    })
    return (
        <tr {...restProps} ref={headerRowRef}/>
    );
};

HeaderRow.propTypes = {
    headerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setHeaderHeight: PropTypes.func,
}

export default HeaderRow;
