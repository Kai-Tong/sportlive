/**
 * @description 上传的核心方法
 * @author wangfupeng
 */
import { DicType } from '../../config/index';
declare type PostOptionType = {
    timeout?: number;
    formData?: FormData;
    headers?: DicType;
    withCredentials?: boolean;
    onTimeout?: Function;
    onProgress?: Function;
    beforeSend?: Function;
    onError?: Function;
    onFail?: Function;
    onSuccess: Function;
};
/**
 * 发送 post 请求（用于文件上传）
 * @param url url
 * @param option 配置项
 */
declare function post(url: string, option: PostOptionType): XMLHttpRequest | string;
export default post;
