/*
 * @Author: your name
 * @Date: 2021-11-24 16:34:50
 * @LastEditTime: 2021-11-24 16:51:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /study-slate/insertText.ts
 */
export function insertText(root, text, path) {
    const domSelection = window.getSelection()
    console.log('domSelection', domSelection, domSelection.isCollapsed, domSelection.anchorNode, domSelection.anchorOffset, JSON.stringify(domSelection))
    // 获取指定path的element
    var node = getNodeByPath(root, path);
    if (domSelection.isCollapsed) {
        if (text) {
            const before = node.text.slice(0, domSelection.anchorOffset)
            const after = node.text.slice(domSelection.anchorOffset)
            node.text = before + text + after

        }
    } else {
        // TODO 如果光标选中一个范围
    }
    // console.log(root[0].children[0] === node, root[0].children[0], node)

}
function getNodeByPath(root, path) {
    // return root[0].children[0]
    var node = root;
    // console.log(window.root === root)
    for (var i = 0; i < path.length; i++) {
        const p = path[i]
        node = node[p] || node.children[p];
    }
    // console.log(node)
    return node;
}
export function getString(root) {
    let str = ''
    let nodes = root.children || root
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.text) {
            str = str + node.text
        } else {
            str = str + getString(node)
        }
    }
    return str
}


// var root = [{ type: 'p', children: [{ text: '大橘' }, { type: 'p', children: [{ text: '大橘' }, { type: 'p', children: [{ text: '大橘' }, { type: 'p', children: [{ text: '大橘' }] }] }] }] }];
// insertText(root, '大橘aa', [0, 0]);
// console.log(JSON.stringify(root));
// console.log(getString(root))