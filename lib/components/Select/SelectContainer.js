import React, { useEffect, useRef } from 'react';

export var SelectContainer = function SelectContainer(props) {
	var handleOpen = props.handleOpen,
	    handleClose = props.handleClose,
	    isOpened = props.isOpened,
	    className = props.className;

	var node = useRef(null);

	useEffect(function () {
		window.addEventListener('mousedown', handleMouseClick, false);
		return function () {
			window.removeEventListener('mousedown', handleMouseClick, false);
		};
	}, []);

	var handleMouseClick = function handleMouseClick(e) {
		node && node.current.contains(e.target) && !isOpened ? handleOpen() : handleClose();
	};

	return React.createElement(
		'div',
		{
			className: 'select-container ' + className,
			style: { position: 'relative' },
			ref: node
		},
		props.children
	);
};