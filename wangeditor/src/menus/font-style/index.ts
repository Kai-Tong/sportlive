/**
 * @description 字体样式 FontStyle
 * @author dyl
 *
 */

import DropListMenu from '../menu-constructors/DropListMenu'
import $ from '../../utils/dom-core'
import Editor from '../../editor/index'
import { MenuActive } from '../menu-constructors/Menu'
import FontStyleList from './FontStyleList'

class FontStyle extends DropListMenu implements MenuActive {
    constructor(editor: Editor) {
        const $elem = $(
            `<div class="w-e-menu">
                <i class="w-e-icon-font"></i>
            </div>`
        )
        let fontStyleList = new FontStyleList(editor.config.fontNames)
        const fontListConf = {
            width: 100,
            title: '设置字体',
            type: 'list',
            list: fontStyleList.getItemList(),
            clickHandler: (value: string) => {
                // this 是指向当前的 FontStyle 对象
                this.command(value)
            },
        }
        super($elem, editor, fontListConf)
    }

    /**
     * 执行命令
     * @param value value
     */
    public command(value: string): void {
        const editor = this.editor
        editor.cmd.do('fontName', value)
    }

    /**
     * 尝试修改菜单激活状态
     * ?字体是否需要有激活状态这个操作?
     */
    public tryChangeActive(): void {
        // const editor = this.editor
        // const cmdValue = editor.cmd.queryCommandValue('fontName')
        // if (menusConfig.fontNames.indexOf(cmdValue) >= 0) {
        //     this.active()
        // } else {
        //     this.unActive()
        // }
    }
}

export default FontStyle
