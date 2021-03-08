import React from 'react';
import PropTypes from 'prop-types';
import { getObjectExcludedProps } from "../utils/baseUtils";
import {renderClassicByName} from "../declarative";
const excludeProps = ['child', 'componentType', 'field'];
const FormItem = (props) => {

	const {child, field} = props;
	let antFormItemProps = getObjectExcludedProps(props, excludeProps);
	if (child)
		return renderClassicByName(child.componentType)
			({itemProps: {...antFormItemProps}, ...child, field})
	else
		return null;
};

FormItem.propTypes = {
	child: PropTypes.object.isRequired
};

export default FormItem;
