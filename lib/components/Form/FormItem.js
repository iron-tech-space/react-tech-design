var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { getObjectExcludedProps } from "../utils/baseUtils";
import { renderClassicByName } from "../declarative";
var excludeProps = ['child', 'componentType', 'field'];
var FormItem = function FormItem(props) {
	var child = props.child,
	    field = props.field;

	var antFormItemProps = getObjectExcludedProps(props, excludeProps);
	if (child) return renderClassicByName(child.componentType)(_extends({ itemProps: _extends({}, antFormItemProps) }, child, { field: field }));else return null;
};

FormItem.propTypes = {
	child: PropTypes.object.isRequired
};

export default FormItem;