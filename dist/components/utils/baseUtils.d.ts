export function useMounted(): boolean;
export function noop(): void;
export function flatten(arrayOfArrays: any): any;
export function getTableRowObjects(data: any): any;
export function getTableRowKeys(data: any, rowKey: any): any;
export function findNodeByRowKey(data: any, rowKey: any, rowValue: any): {};
export function generateUUID(): any;
export function getValueFromSingleSelect(name: any, keys: any): any;
export function getValueFromMultiSelect(name: any, keys: any): any;
export function getValueFromSelectTable(rows: any): any;
export function getObjectExcludedProps(object: any, exclude: any): {};
export function notificationError(error: any, message: any): void;
export function dispatchToStore({ dispatch, setDataStore, value, extraData }: {
    dispatch: any;
    setDataStore: any;
    value: any;
    extraData: any;
}): void;
export function dispatchToStoreEx({ dispatch, path, type, value }: {
    dispatch: any;
    path: any;
    type: any;
    value: any;
}): void;
export function getSortBy(clientSortBy: any, serverSortBy: any, dataIndex: any): any[];
