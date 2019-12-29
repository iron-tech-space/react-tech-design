import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography as AntTypography,
} from 'antd';
import {getObjectExcludedProps} from '../utils/baseUtils';
import { getISO, toFormat } from "../..";

const excludeProps = ['componentType', 'setDateStore'];


const Typography = props => {

    const {label, value, format, componentType } = props;

    switch (componentType) {
        case 'Title':
            return (
                <AntTypography.Title {...getObjectExcludedProps(props, excludeProps)}>
                    {label || value}
                </AntTypography.Title>
            );
        case 'Text':
            return (
                <AntTypography.Text {...getObjectExcludedProps(props, excludeProps)}>
                    {label || value}
                </AntTypography.Text>
            );
        case 'DateText':
            const _value = value ? (format ? toFormat(value, format) : getISO(value)) : null;
            // console.log("DateText", _value);
            return (
                <AntTypography.Text {...getObjectExcludedProps(props, excludeProps)}>
                    {label || _value}
                </AntTypography.Text>
            );

        default:
            return null;
    }

};

Typography.propTypes = {

};

export default Typography;
