import React, { useEffect, useRef } from 'react';
import { rtPrefix } from '../utils/variables';

var SelectContainer = function SelectContainer(props) {
	var handleOpen = props.handleOpen,
	    handleClose = props.handleClose,
	    isOpened = props.isOpened,
	    className = props.className;

	var node = useRef(null);

	useEffect(function () {
		window.addEventListener('mousedown', handleMouseClick.bind(isOpened, isOpened), false);
		return function () {
			window.removeEventListener('mousedown', handleMouseClick.bind(isOpened, isOpened), false);
		};
	}, []);

	var handleMouseClick = function handleMouseClick(isOpened, e) {
		console.log("node && node.current.contains(e.target) => ", e.target);
		// console.log("isOpened => ", isOpened);
		if (node && node.current.contains(e.target)) {
			handleOpen();
		} else {
			handleClose();
		}
	};

	var handleMouseClickdiv = function handleMouseClickdiv(e) {
		console.log("handleMouseClickdiv => ", e.target);
	};
	var onBlur = function onBlur(e) {
		console.log("onBlur => ", e.target);
	};

	return React.createElement(
		'div',
		{
			className: rtPrefix + '-select ' + className,
			style: { position: 'relative' },
			onClick: handleMouseClickdiv,
			onBlur: onBlur,
			ref: node
		},
		props.children
	);
};

SelectContainer.defaultProps = {
	className: ''
};

export { SelectContainer };