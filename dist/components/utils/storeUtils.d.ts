import { StoreProps } from "../core/wrappers";
export declare const getExtraData: (item: {
    name: string;
    extraData?: string | undefined;
}, props: any) => any;
export declare const mapStateToProps: (store: any, ownProps: StoreProps) => any;
export declare const mapDispatchToProps: (dispatch: any) => {
    setDataStore: (path: any, row: any) => {
        type: string;
        payload: {
            path: any;
            row: any;
        };
    };
};
