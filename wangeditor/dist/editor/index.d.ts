/**
 * @description 编辑器 class
 * @author wangfupeng
 */
import { DomElement } from '../utils/dom-core';
import { ConfigType } from '../config';
import SelectionAndRangeAPI from './selection';
import CommandAPI from './command';
import Text from '../text/index';
import Menus from '../menus/index';
import Undo from './undo-redo';
import ZIndex from './z-index';
declare class Editor {
    static menuConstructors: {
        [key: string]: Function;
    };
    static $: Function;
    id: string;
    toolbarSelector: string;
    textSelector: string | undefined;
    config: ConfigType;
    $toolbarElem: DomElement;
    $textContainerElem: DomElement;
    $textElem: DomElement;
    toolbarElemId: string;
    textElemId: string;
    isFocus: boolean;
    selection: SelectionAndRangeAPI;
    cmd: CommandAPI;
    txt: Text;
    menus: Menus;
    i18next: any;
    highlight: any;
    undo: Undo;
    zIndex: ZIndex;
    private beforeDestroyHooks;
    /**
     * 构造函数
     * @param toolbarSelector 工具栏 DOM selector
     * @param textSelector 文本区域 DOM selector
     */
    constructor(toolbarSelector: string, textSelector?: string);
    /**
     * 初始化选区
     * @param newLine 新建一行
     */
    initSelection(newLine?: boolean): void;
    /**
     * 创建编辑器实例
     */
    create(): void;
    change(): void;
    /**
     * 提供给用户添加销毁前的钩子函数
     * @param fn 钩子函数
     */
    beforeDestroy(fn: Function): Editor;
    /**
     * 销毁当前编辑器实例
     */
    destroy(): void;
    /**
     * 将编辑器设置为全屏
     */
    fullScreen(): void;
    /**
     * 将编辑器退出全屏
     */
    unFullScreen(): void;
}
export default Editor;
