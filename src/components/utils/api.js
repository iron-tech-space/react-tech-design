import { notification } from "antd";
import { notificationError } from "./baseUtils";

export const executeRequest = (request) => (options) => request(options)
    .then(response => {
        notification.success({
            message: "Сохранение прошло успешно"
        });
    })
    .catch(error => notificationError(error, 'Ошибка при сохранении') );