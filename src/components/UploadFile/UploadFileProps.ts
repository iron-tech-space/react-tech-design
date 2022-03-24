import { Request } from "../core/interfaces";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { ButtonProps, TooltipProps } from "antd";
import { StoreProps } from "../core/wrappers";

interface IDataObject {
    [key:string]: string | null
}

export interface UploadFileProps extends StoreProps{
    /** Функция запроса для отправки файла с данным на сервер */
    requestUploadFile: Request,

    /** Данные, прикрепляемые к файлу */
    dataObject?: any | IDataObject ,

    /** Функция, вызываемая при удачной загрузке файла */
    onCompletedUpload?: (file: UploadFile) => void,

    /** Функция, вызываемая при НЕ удачной загрузке файла */
    onFailedUpload?: (file: UploadFile) => void,

    /** Ant Props для [Upload](https://ant.design/components/upload/) компонента */
    uploadProps?: UploadProps,

    /** Ant Props для [Tooltip](https://ant.design/components/tooltip/) компонента */
    toolTipProps?: TooltipProps,

    /** Ant Props для [Button](https://ant.design/components/button/) компонента */
    buttonProps?: ButtonProps,
}
