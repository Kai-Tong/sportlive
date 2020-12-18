/**
 * @description z-index 管理器
 * @author fangzhicong
 */
import Editor from '../index';
export default class ZIndex {
    private tier;
    private baseZIndex;
    get(tierName?: string): number;
    init(editor: Editor): void;
}
