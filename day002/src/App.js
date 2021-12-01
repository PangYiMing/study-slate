import './App.css';
import { useState, useEffect } from 'react'
import { getString, insertText } from './insertText'
window.root = [{ type: 'p', children: [{ text: '' }] }]
function App() {
  // 记录我们输入的内容
  const [txt, setTxt] = useState('')
  // 光标的offset
  const [txtOffset, setTxtOffset] = useState(0)
  // 负责注册监听beforeinput事件，并阻止默认事件。在监听中修改window.root，并在里面更新txt和txtO,最后清除光标，防止txt更新导致光标闪动。
  useEffect(() => {
    const input = document.getElementById('editor');

    input.addEventListener('beforeinput', updateValue);
    function updateValue(e) {
      e.preventDefault()
      e.stopPropagation()
      insertText(window.root, e.data, [0, 0])
      // console.log(e.data, window.root)
      const getText = getString(window.root)
      const { anchorOffset } = window.getSelection()
      setTxtOffset(anchorOffset + e.data.length)
      setTxt(getText)
      window.getSelection().removeAllRanges()
    }
    return () => {
      input.removeEventListener('beforeinput', updateValue);
    }
  }, [])

  // 监听txtOffset，并且用setBaseAndExtent更新光标位置，使用setTimeout是因为要在页面渲染后，再改变光标位置
  useEffect(() => {
    const { anchorNode } = window.getSelection()
    setTimeout(() => {
      if (!anchorNode) {
        return
      }
      let dom = anchorNode
      if (dom.childNodes && dom.childNodes[0]) {
        dom = dom.childNodes[0]
      }
      window.getSelection().setBaseAndExtent(
        dom, txtOffset, dom, txtOffset)
    })
  }, [txtOffset])


  return (
    <div className="App">
      这是一个demo编辑器
      <div id='editor' contentEditable onInput={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e)
        return
      }}>

        {txt}
      </div>
    </div>
  );
}

export default App;
