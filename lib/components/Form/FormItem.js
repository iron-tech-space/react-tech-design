import 'antd/es/form/style';
import _Form from 'antd/es/form';
import 'antd/es/switch/style';
import _Switch from 'antd/es/switch';
import 'antd/es/radio/style';
import _Radio from 'antd/es/radio';
import 'antd/es/input-number/style';
import _InputNumber from 'antd/es/input-number';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/divider/style';
import _Divider from 'antd/es/divider';
import 'antd/es/button/style';
import _Button from 'antd/es/button';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
// import Select from '../Select/Select';

import { getObjectExcludedProps, getValueFromMultiSelect, getValueFromSingleSelect } from "../utils/baseUtils";
import { withStore, DatePickerHOC, TypographyTitle, TypographyText, TypographyDate } from "./HOCs";
// import FileManager from "../FileManager/FileManager";
import Modal from "../Modal/Modal";
import ConfigLoader from "../Table/ConfigLoader";
import locale from 'antd/es/date-picker/locale/ru_RU';
import Select from "../Select/Select";

var excludeProps = ['child', 'componentType', 'field'];
var noAntItemTypes = ['Title', 'Text', 'Divider', 'Button', 'LocalTable', 'ServerTable', 'InfinityTable'];

var FormItem = function FormItem(props) {
	var child = props.child,
	    field = props.field;

	var antFormItemProps = getObjectExcludedProps(props, excludeProps);

	// Если тип элемента Select -> добавить доп свойства к Form.Item
	if (child && child.componentType && (child.componentType === 'SingleSelect' || child.componentType === 'MultiSelect')) {
		antFormItemProps.valuePropName = 'defaultSelectedRowKeys';
		antFormItemProps.getValueFromEvent = child.componentType === 'SingleSelect' ? getValueFromSingleSelect : getValueFromMultiSelect;
		antFormItemProps.trigger = 'onChangeKeys';
	} else if (child && child.componentType && child.componentType === 'SelectTable') {}
	// antFormItemProps.getValueFromEvent = getValueFromSelectTable;
	// antFormItemProps.trigger = 'onRowClick';


	// console.log('FormItem props => ', props);

	var getItem = function getItem() {
		if (child) {
			// const childProps = getObjectExcludedProps(child, ['componentType']);
			var childProps = _extends({}, child);
			// console.log('FormItem childProps => ', childProps);
			var Component = void 0;
			var placeholder = void 0;
			switch (child.componentType) {
				case 'Button':
					antFormItemProps.trigger = 'onClick';
					Component = withStore(_Button, antFormItemProps);
					// console.log('Props field => ', field);
					// const onClick = (e) => childProps.onClick && childProps.onClick(e, field); onClick={onClick}
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Title':
					Component = withStore(TypographyTitle, antFormItemProps);
					return React.createElement(Component, _extends({}, childProps, { componentType: child.componentType }));
				case 'Text':
					Component = withStore(TypographyText, antFormItemProps);
					return React.createElement(Component, _extends({}, childProps, { componentType: true }));
				case 'Divider':
					Component = withStore(_Divider, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Checkbox':
					Component = withStore(_Checkbox, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'DatePicker':
					Component = withStore(DatePickerHOC(_DatePicker), antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Выберите дату';
					var style = _extends({ width: '100%' }, childProps && childProps.style); // locale={locale}
					return React.createElement(Component, _extends({}, childProps, { style: style, placeholder: placeholder }));
				case 'DateText':
					Component = withStore(TypographyDate, antFormItemProps);
					return React.createElement(Component, childProps);
				case 'Input':
					Component = withStore(_Input, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'Search':
					Component = withStore(_Input.Search, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Поиск';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'TextArea':
					Component = withStore(_Input.TextArea, antFormItemProps);
					return React.createElement(Component, childProps);
				case 'Password':
					Component = withStore(_Input.Password, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите пароль';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'InputNumber':
					Component = withStore(_InputNumber, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return React.createElement(Component, _extends({}, childProps, { style: { width: '100%' }, placeholder: placeholder }));
				case 'Radio':
					Component = withStore(_Radio, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'RadioButton':
					Component = withStore(_Radio.Button, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Switch':
					Component = withStore(_Switch, antFormItemProps);
					return React.createElement(Component, childProps);
				case "RadioGroup":
					Component = withStore(_Radio.Group, antFormItemProps);
					return React.createElement(Component, childProps);
				// case 'SingleSelect':
				case 'Select':
					Component = withStore(Select, antFormItemProps);
					return React.createElement(Component, childProps);
				// return <Select {...childProps} name={antFormItemProps.name}/>;
				//'infinity', 'serverSide', 'localSide'
				case 'Table':
					return React.createElement(ConfigLoader, _extends({}, childProps, { name: props.name, componentType: child.componentType }));
				// case 'FileManager':
				// 	return <FileManager {...childProps} name={props.name} />;
				case 'Modal':
					return React.createElement(Modal, _extends({}, childProps, { name: props.name }));
				case 'Custom':
					Component = withStore(child.render, antFormItemProps);
					return React.createElement(Component, childProps);
				default:
					return null;
			}
		}
	};

	if (!antFormItemProps.label) return React.createElement(
		_Form.Item,
		_extends({}, antFormItemProps, { noStyle: true }),
		getItem()
	);else return React.createElement(
		_Form.Item,
		antFormItemProps,
		getItem()
	);
};

FormItem.propTypes = {
	child: PropTypes.object.isRequired
};

export default FormItem;