import React from 'react';
import {rtPrefix} from '../../utils/variables';
import PropTypes from "prop-types";

const Layout = props => {

    let itemProps = {};
    Object.keys(props).forEach((key) =>
        key !== 'children' ? (itemProps[key] = props[key]) : null
    );

    const getCls = () => {
        let cls = [`${rtPrefix}-layout`];
        itemProps.className && cls.push(itemProps.className);
        return cls.join(' ');
    };

    return (
        <div {...itemProps} className={getCls()}>
            {props.children}
        </div>
    );
};

Layout.propTypes = {
    /** Строка класса */
    className: PropTypes.string,

    /** Объект стиля */
    style: PropTypes.object,
};

export default Layout;
