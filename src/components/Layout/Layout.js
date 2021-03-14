import React from 'react';
import {rtPrefix} from '../utils/variables';

/** Компонент обертка со всеми пропрами div */
const Layout = props => {

    const getCls = () => {
        let cls = [`${rtPrefix}-layout`];
        props.className && cls.push(props.className);
        return cls.join(' ');
    };

    return (
        <div {...props} className={getCls()}>
            {props.children}
        </div>
    );
};

export default Layout;
