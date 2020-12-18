/**
 * @description 标题
 * @author wangfupeng
 */
import DropListMenu from '../menu-constructors/DropListMenu';
import Editor from '../../editor/index';
import { MenuActive } from '../menu-constructors/Menu';
declare class Head extends DropListMenu implements MenuActive {
    constructor(editor: Editor);
    /**
     * 执行命令
     * @param value value
     */
    command(value: string): void;
    /**
     * 尝试改变菜单激活（高亮）状态
     */
    tryChangeActive(): void;
}
export default Head;
