import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';
import React from 'react';
import PropTypes from 'prop-types';

import { getObjectExcludedProps } from '../utils/baseUtils';
import { getISO, toFormat } from "../..";

var excludeProps = ['componentType', 'setDateStore'];

var Typography = function Typography(props) {
    var label = props.label,
        value = props.value,
        format = props.format,
        componentType = props.componentType;


    switch (componentType) {
        case 'Title':
            return React.createElement(
                _Typography.Title,
                getObjectExcludedProps(props, excludeProps),
                label || value
            );
        case 'Text':
            return React.createElement(
                _Typography.Text,
                getObjectExcludedProps(props, excludeProps),
                label || value
            );
        case 'DateText':
            var _value = value ? format ? toFormat(value, format) : getISO(value) : null;
            // console.log("DateText", _value);
            return React.createElement(
                _Typography.Text,
                getObjectExcludedProps(props, excludeProps),
                label || _value
            );

        default:
            return null;
    }
};

Typography.propTypes = {};

export default Typography;