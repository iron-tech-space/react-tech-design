import React, {useEffect, useRef} from 'react';

export const SelectContainer = (props) => {
	const {handleOpen, handleClose, isOpened, className} = props;
	const node = useRef(null);

	useEffect(() => {
		window.addEventListener('mousedown', handleMouseClick, false);
		return () => {
			window.removeEventListener('mousedown', handleMouseClick, false);
		};
	}, []);

	const handleMouseClick = (e) => {
		node && node.current.contains(e.target) && !isOpened
			? handleOpen()
			: handleClose();
	};

	return (
		<div
			className={`select-container ${className}`}
			style={{position: 'relative'}}
			ref={node}
		>
			{props.children}
		</div>
	);
};
