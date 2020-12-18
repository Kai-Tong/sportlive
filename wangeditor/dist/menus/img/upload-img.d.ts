/**
 * @description 上传图片
 * @author wangfupeng
 */
import Editor from '../../editor/index';
declare class UploadImg {
    private editor;
    constructor(editor: Editor);
    /**
     * 提示信息
     * @param alertInfo alert info
     * @param debugInfo debug info
     */
    private alert;
    /**
     * 往编辑区域插入图片
     * @param src 图片地址
     */
    insertImg(src: string): void;
    /**
     * 上传图片
     * @param files 文件列表
     */
    uploadImg(files: FileList | File[]): void;
}
export default UploadImg;
