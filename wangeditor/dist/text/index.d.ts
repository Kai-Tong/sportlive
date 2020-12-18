/**
 * @description 编辑区域，入口文件
 * @author wangfupeng
 */
import Editor from '../editor/index';
import { NodeListType } from './getChildrenJSON';
declare type TextEventHooks = {
    changeEvents: Function[];
    dropEvents: Function[];
    clickEvents: Function[];
    keyupEvents: Function[];
    tabUpEvents: Function[];
    tabDownEvents: Function[];
    enterUpEvents: Function[];
    enterDownEvents: Function[];
    deleteUpEvents: Function[];
    deleteDownEvents: Function[];
    pasteEvents: Function[];
    linkClickEvents: Function[];
    codeClickEvents: Function[];
    textScrollEvents: Function[];
    toolbarClickEvents: Function[];
    imgClickEvents: Function[];
    imgDragBarMouseDownEvents: Function[];
    tableClickEvents: Function[];
    menuClickEvents: Function[];
    dropListMenuHoverEvents: Function[];
    splitLineEvents: Function[];
};
declare class Text {
    editor: Editor;
    eventHooks: TextEventHooks;
    constructor(editor: Editor);
    /**
     * 初始化
     */
    init(): void;
    /**
     * 切换placeholder
     */
    togglePlaceholder(): void;
    /**
     * 清空内容
     */
    clear(): void;
    /**
     * 设置/获取 html
     * @param val html 字符串
     */
    html(val?: string): void | string;
    /**
     * 获取 json 格式的数据
     */
    getJSON(): NodeListType;
    /**
     * 获取/设置 字符串内容
     * @param val text 字符串
     */
    text(val?: string): void | string;
    /**
     * 追加 html 内容
     * @param html html 字符串
     */
    append(html: string): void;
    /**
     * 每一步操作，都实时保存选区范围
     */
    private _saveRange;
    /**
     * 绑定事件，事件会触发钩子函数
     */
    private _bindEventHooks;
}
export default Text;
