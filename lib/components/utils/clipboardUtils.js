import 'antd/es/notification/style';
import _notification from 'antd/es/notification';


export var copyTextToClipboard = function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		openNotificationWithIcon('success', 'Успешно', '[' + text + '] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
	}, function (err) {
		openNotificationWithIcon('error', 'Ошибка', '[' + text + '] \u041D\u0415 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
	});
};

var fallbackCopyTextToClipboard = function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		if (successful) {
			openNotificationWithIcon('success', 'Успешно', '[' + text + '] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
		} else {
			openNotificationWithIcon('error', 'Ошибка', '[' + text + '] \u041D\u0415 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
		}
	} catch (err) {
		openNotificationWithIcon('error', 'Ошибка', '[' + text + '] \u041D\u0415 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
	}
	document.body.removeChild(textArea);
};

var openNotificationWithIcon = function openNotificationWithIcon(type, title, msg) {
	_notification[type]({
		message: title,
		description: msg
	});
};