import {notification} from 'antd';

export const copyTextToClipboard = text => {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(
		function() {
			openNotificationWithIcon(
				'success',
				'Успешно',
				`[${text}] успешно копирован в буфер обмена`
			);
		},
		function(err) {
			openNotificationWithIcon(
				'error',
				'Ошибка',
				`[${text}] НЕ успешно копирован в буфер обмена`
			);
		}
	);
};

const fallbackCopyTextToClipboard = text => {
	let textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		let successful = document.execCommand('copy');
		if (successful) {
			openNotificationWithIcon(
				'success',
				'Успешно',
				`[${text}] успешно копирован в буфер обмена`
			);
		} else {
			openNotificationWithIcon(
				'error',
				'Ошибка',
				`[${text}] НЕ успешно копирован в буфер обмена`
			);
		}
	} catch (err) {
		openNotificationWithIcon(
			'error',
			'Ошибка',
			`[${text}] НЕ успешно копирован в буфер обмена`
		);
	}
	document.body.removeChild(textArea);
};

const openNotificationWithIcon = (type, title, msg) => {
	notification[type]({
		message: title,
		description: msg
	});
};
