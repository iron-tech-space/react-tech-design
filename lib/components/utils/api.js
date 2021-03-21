import "antd/es/notification/style";
import _notification from "antd/es/notification";

import { notificationError } from "./baseUtils";

export var executeRequest = function executeRequest(request) {
    return function (options) {
        return request(options).then(function (response) {
            _notification.success({
                message: "Сохранение прошло успешно"
            });
        }).catch(function (error) {
            return notificationError(error, 'Ошибка при сохранении');
        });
    };
};