/**
 * @description 图片相关的配置
 * @author wangfupeng
 */
import { EMPTY_FN } from '../utils/const';
export declare type UploadImageHooksType = {
    before?: Function;
    success?: Function;
    fail?: Function;
    error?: Function;
    timeout?: Function;
    customInsert?: Function;
};
declare const _default: {
    showLinkImg: boolean;
    linkImgCallback: typeof EMPTY_FN;
    uploadImgServer: string;
    uploadImgShowBase64: boolean;
    uploadImgMaxSize: number;
    uploadImgMaxLength: number;
    uploadFileName: string;
    uploadImgParams: {};
    uploadImgParamsWithUrl: boolean;
    uploadImgHeaders: {};
    uploadImgHooks: {};
    uploadImgTimeout: number;
    withCredentials: boolean;
    customUploadImg: null;
};
export default _default;
