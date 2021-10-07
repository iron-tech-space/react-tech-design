export function AddFolderModal(...args: any[]): {
    type: string;
    title: string;
    requestSaveRow: any;
    width: number;
    form: {
        name: string;
        labelCol: {
            span: number;
        };
        wrapperCol: {
            span: number;
        };
        processBeforeSaveForm: (rawValues: any) => any;
        loadInitData: (callBack: any, row: any) => void;
        body: ({
            componentType: string;
            label: string;
            name: string;
            rules: {
                message: string;
                required: boolean;
            }[];
            child: {
                componentType: string;
                widthControl?: undefined;
                heightPopup?: undefined;
                expandColumnKey?: undefined;
                rowRender?: undefined;
                nodeAssociated?: undefined;
                expandDefaultAll?: undefined;
                requestLoadRows?: undefined;
                requestLoadDefault?: undefined;
            };
        } | {
            componentType: string;
            label: string;
            name: string;
            child: {
                componentType: string;
                widthControl: number;
                heightPopup: number;
                expandColumnKey: string;
                rowRender: string;
                nodeAssociated: boolean;
                expandDefaultAll: boolean;
                requestLoadRows: (info: any) => any;
                requestLoadDefault: any;
            };
            rules?: undefined;
        } | {
            componentType?: undefined;
            label?: undefined;
            name?: undefined;
            rules?: undefined;
            child?: undefined;
        })[];
    };
};
export function EditFolderModal(...args: any[]): {
    type: string;
    title: string;
    requestSaveRow: any;
    width: number;
    form: {
        name: string;
        labelCol: {
            span: number;
        };
        wrapperCol: {
            span: number;
        };
        processBeforeSaveForm: (rawValues: any) => any;
        loadInitData: (callBack: any, row: any) => void;
        body: ({
            componentType: string;
            label: string;
            name: string;
            rules: {
                message: string;
                required: boolean;
            }[];
            child: {
                componentType: string;
                widthControl?: undefined;
                heightPopup?: undefined;
                expandColumnKey?: undefined;
                rowRender?: undefined;
                nodeAssociated?: undefined;
                expandDefaultAll?: undefined;
                requestLoadRows?: undefined;
                requestLoadDefault?: undefined;
            };
        } | {
            componentType: string;
            label: string;
            name: string;
            child: {
                componentType: string;
                widthControl: number;
                heightPopup: number;
                expandColumnKey: string;
                rowRender: string;
                nodeAssociated: boolean;
                expandDefaultAll: boolean;
                requestLoadRows: (info: any) => any;
                requestLoadDefault: any;
            };
            rules?: undefined;
        } | {
            componentType?: undefined;
            label?: undefined;
            name?: undefined;
            rules?: undefined;
            child?: undefined;
        })[];
    };
};
export function EditFileModal(...args: any[]): {
    type: string;
    title: string;
    requestSaveRow: any;
    width: number;
    form: {
        name: string;
        labelCol: {
            span: number;
        };
        wrapperCol: {
            span: number;
        };
        processBeforeSaveForm: (rawValues: any) => any;
        loadInitData: (callBack: any, row: any) => void;
        body: ({
            componentType: string;
            label: string;
            name: string;
            rules: {
                message: string;
                required: boolean;
            }[];
            child: {
                componentType: string;
                widthControl?: undefined;
                heightPopup?: undefined;
                expandColumnKey?: undefined;
                rowRender?: undefined;
                nodeAssociated?: undefined;
                expandDefaultAll?: undefined;
                requestLoadRows?: undefined;
                requestLoadDefault?: undefined;
            };
        } | {
            componentType: string;
            label: string;
            name: string;
            child: {
                componentType: string;
                widthControl: number;
                heightPopup: number;
                expandColumnKey: string;
                rowRender: string;
                nodeAssociated: boolean;
                expandDefaultAll: boolean;
                requestLoadRows: (info: any) => any;
                requestLoadDefault: any;
            };
            rules?: undefined;
        } | {
            componentType?: undefined;
            label?: undefined;
            name?: undefined;
            rules?: undefined;
            child?: undefined;
        })[];
    };
};
