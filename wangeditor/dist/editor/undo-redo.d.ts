/**
 * @description 撤销 undo redo操作
 * @author lkw
 */
import Editor from './index';
/**
 * 撤销类
 */
declare class Undo {
    undoStack: string[];
    redoStack: string[];
    private undoString;
    /**
     * 操作标示 true | false
     * (因撤销操作需要使用html方法赋值,所以使用falg的方式区分撤销操作状态,屏蔽change的记录行为)
     * 记录撤销操作的状态,true为操作中,false为未在操作,默认值为false
     * 当值为true时,说明撤销操作正在进行,此时onchange事件不进行撤销文本的记录
     * 当值为false是,说明未在执行撤销操作,此时onchange正常记录撤销文本,推入undo栈
     */
    private flag;
    editor: Editor;
    constructor(editor: Editor);
    undo(): string;
    redo(): string;
    afterChange(): false | undefined;
}
export default Undo;
