/**
 * @description 工具函数集合
 * @author wangfupeng
 */
export declare const UA: {
    _ua: string;
    isWebkit: () => boolean;
    isIE: () => boolean;
};
/**
 * 获取随机石
 * @param prefix 前缀
 */
export declare function getRandom(prefix?: string): string;
/**
 * 替换 html 特殊字符
 * @param html html 字符串
 */
export declare function replaceHtmlSymbol(html: string): string;
export declare function replaceSpecialSymbol(value: string): string;
/**
 * 遍历对象或数组，执行回调函数
 * @param obj 对象或数组
 * @param fn 回调函数 (key, val) => {...}
 */
export declare function forEach(obj: Object | [], fn: Function): void;
/**
 * 遍历类数组
 * @param fakeArr 类数组
 * @param fn 回调函数
 */
export declare function arrForEach(fakeArr: any, fn: Function): void;
/**
 * 节流
 * @param fn 函数
 * @param interval 间隔时间，毫秒
 */
export declare function throttle(fn: Function, interval?: number): Function;
/**
 * 防抖
 * @param fn 函数
 * @param delay 间隔时间，毫秒
 */
export declare function debounce(fn: Function, delay?: number): Function;
/**
 * isFunction 是否是函数
 * @param fn 函数
 */
export declare function isFunction(fn: any): boolean;
/**
 * 引用与非引用值 深拷贝方法
 * @param data
 */
export declare function deepClone(data: any): any;
